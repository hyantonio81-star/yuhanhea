import { Hono } from 'hono'
import { recordAudit } from '../audit.js'
import type { SuiteVariables } from '../auth.js'
import { runAssistantSession } from '../assistant/runSession.js'
import { checkAssistantRateLimit } from '../assistant/rateLimit.js'
import { checkCooldown } from '../reminderPolicy.js'
import { payoutToErpStub, spendToErpLedger } from '../erpBridge.js'
import { applyToolApproval, rejectToolApproval } from '../assistant/toolApprovalApply.js'
import { appendOutbox, listOutboxRecent, listOutboxSince, resetOutboxToPending } from '../store/outbox.js'
import { listToolApprovals } from '../store/toolApprovalStore.js'
import { listAuditEntries } from '../store/auditRepository.js'
import { idempotentReplay, idempotentStore } from '../idempotencyHttp.js'
import { fireFinanceWebhook } from '../financeWebhook.js'
import { fireReminderWebhook } from '../reminderWebhook.js'
import { getSecurityStatus, postSecurityScanUpload } from '../securityStub.js'
import { suiteLog } from '../logging.js'

function newEventId(): string {
  return `evt_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`
}

const P = {
  reminders: '/crm/reminders',
  spend: '/erp/finance/spend-commit',
  payouts: '/erp/finance/payouts',
  brief: (id: string) => `/campaigns/${id}/briefs`,
  videoJobs: '/video-jobs',
} as const

export const v1 = new Hono<{ Variables: SuiteVariables }>()

v1.get('/audit', (c) => {
  const tenant = c.req.query('tenant_id') ?? undefined
  const limit = Math.min(200, Math.max(1, Number(c.req.query('limit') ?? 50)))
  const entries = listAuditEntries(tenant, limit)
  return c.json({ entries })
})

v1.get('/events', (c) => {
  const limit = Math.min(200, Math.max(1, Number(c.req.query('limit') ?? 50)))
  const sinceId = Number(c.req.query('since_id') ?? 0)
  if (sinceId > 0) {
    const events = listOutboxSince(sinceId, limit)
    return c.json({ events })
  }
  const events = listOutboxRecent(limit)
  return c.json({ events })
})

v1.get('/crm/local-markets/:id/insights', (c) => {
  const id = c.req.param('id')
  const tenant_id = c.req.query('tenant_id') ?? 'tnt_demo'
  const summary =
    id === 'lmk_demo_02'
      ? '경쟁사 가격 인하 감지 — 프로모션 대응 검토 권장'
      : '주말 프로모션 여유 재고 약 12% — 로컬 캠페인 슬롯 여유'
  recordAudit({ trace_id: c.get('traceId'), tenant_id, kind: 'crm_get_local_insights', detail: { local_market_id: id } })
  return c.json({
    local_market_id: id,
    tenant_id,
    summary,
    updated_at: new Date().toISOString(),
  })
})

v1.post('/crm/reminders', async (c) => {
  const raw = await c.req.text()
  const replay = idempotentReplay(c, P.reminders, raw)
  if (replay) return replay

  let body: {
    tenant_id?: string
    contact_id?: string
    local_market_id?: string
    fire_at?: string
    channel?: 'push' | 'sms' | 'email'
    consent_token_ref?: string
  }
  try {
    body = raw ? (JSON.parse(raw) as typeof body) : {}
  } catch {
    return c.json({ error: 'invalid_json' }, 400)
  }

  const tenant_id = body.tenant_id ?? 'tnt_demo'
  if (!body.contact_id || !body.fire_at || !body.channel || !body.local_market_id) {
    return c.json({ error: 'missing_fields', need: ['contact_id', 'fire_at', 'channel', 'local_market_id'] }, 400)
  }
  if (!body.consent_token_ref) {
    return c.json({ error: 'consent_required' }, 400)
  }
  const cd = checkCooldown(tenant_id, body.contact_id, body.channel)
  if (!cd.ok) {
    return c.json({ error: 'cooldown', retry_after_ms: cd.retry_after_ms }, 429)
  }
  const event_id = newEventId()
  const event = {
    type: 'ReminderScheduled' as const,
    event_id,
    tenant_id,
    contact_id: body.contact_id,
    local_market_id: body.local_market_id,
    fire_at: body.fire_at,
    channel: body.channel,
    consent_token_ref: body.consent_token_ref,
  }
  recordAudit({
    trace_id: c.get('traceId'),
    tenant_id,
    kind: 'ReminderScheduled',
    detail: { event_id, contact_id: body.contact_id },
  })
  appendOutbox({ kind: 'ReminderScheduled', tenant_id, payload: event })
  fireReminderWebhook(event)

  const responseJson = JSON.stringify({ accepted: true, event })
  idempotentStore(c, P.reminders, raw, 202, responseJson)
  return c.json(JSON.parse(responseJson) as { accepted: boolean; event: typeof event }, 202)
})

v1.post('/assistant/sessions', async (c) => {
  const body = (await c.req.json()) as {
    trace_id?: string
    tenant_id?: string
    user_id?: string
    messages?: { role: string; content: string }[]
  }
  const trace_id = body.trace_id ?? c.get('traceId')
  const tenant_id = body.tenant_id ?? 'tnt_demo'

  const rl = checkAssistantRateLimit(tenant_id, body.user_id)
  if (!rl.ok) {
    return c.json({ error: 'rate_limit', retry_after_ms: rl.retry_after_ms, limit: rl.limit }, 429)
  }

  const msgs = body.messages?.length ? body.messages : [{ role: 'user', content: '' }]
  const out = await runAssistantSession({ messages: msgs, tenant_id, trace_id })

  const audit = recordAudit({
    trace_id,
    tenant_id,
    kind: 'assistant_session',
    detail: {
      user_id: body.user_id,
      mode: out.mode,
      tool_calls: out.tool_calls,
      last_message: msgs.filter((m) => m.role === 'user').at(-1)?.content?.slice(0, 200),
    },
  })

  return c.json({
    trace_id,
    audit_id: audit.audit_id,
    reply: out.reply,
    tool_calls: out.tool_calls,
    mode: out.mode,
  })
})

v1.get('/assistant/tools', (c) =>
  c.json({
    tools: [
      'crm_get_visits',
      'crm_get_local_insights',
      'mkt_schedule_campaign',
      'mart_create_video_job',
      'crm_schedule_reminder',
    ],
  }),
)

v1.get('/assistant/tool-approvals', (c) => {
  const tenant_id = c.req.query('tenant_id') ?? undefined
  const status = c.req.query('status') ?? 'pending'
  const limit = Math.min(200, Math.max(1, Number(c.req.query('limit') ?? 50)))
  const items = listToolApprovals({ tenant_id, status, limit })
  return c.json({ items })
})

v1.post('/assistant/tool-approvals/:id/approve', async (c) => {
  const adminKey = process.env.BFF_ADMIN_KEY?.trim()
  if (!adminKey) return c.json({ error: 'admin_disabled' }, 404)
  if (c.req.header('x-bff-admin-key') !== adminKey) return c.json({ error: 'unauthorized' }, 401)
  const id = Number(c.req.param('id'))
  if (!Number.isInteger(id) || id < 1) return c.json({ error: 'invalid_id' }, 400)
  const r = applyToolApproval(id)
  if (!r.ok) {
    if (r.error === 'not_found') return c.json({ error: 'not_found' }, 404)
    return c.json({ error: r.error }, 400)
  }
  suiteLog('info', 'tool_approval_approved', { trace_id: c.get('traceId'), approval_id: id })
  return c.json({ ok: true, id, status: 'approved' })
})

v1.post('/assistant/tool-approvals/:id/reject', async (c) => {
  const adminKey = process.env.BFF_ADMIN_KEY?.trim()
  if (!adminKey) return c.json({ error: 'admin_disabled' }, 404)
  if (c.req.header('x-bff-admin-key') !== adminKey) return c.json({ error: 'unauthorized' }, 401)
  const id = Number(c.req.param('id'))
  if (!Number.isInteger(id) || id < 1) return c.json({ error: 'invalid_id' }, 400)
  let note: string | undefined
  try {
    const body = (await c.req.json()) as { note?: string }
    note = body.note
  } catch {
    note = undefined
  }
  if (!rejectToolApproval(id, note)) return c.json({ error: 'not_pending_or_not_found' }, 400)
  suiteLog('info', 'tool_approval_rejected', { trace_id: c.get('traceId'), approval_id: id })
  return c.json({ ok: true, id, status: 'rejected' })
})

v1.post('/campaigns/:campaignId/briefs', async (c) => {
  const campaignId = c.req.param('campaignId')
  const raw = await c.req.text()
  const replay = idempotentReplay(c, P.brief(campaignId), raw)
  if (replay) return replay

  let body: { tenant_id?: string; brief_json?: Record<string, unknown> }
  try {
    body = raw ? (JSON.parse(raw) as typeof body) : {}
  } catch {
    return c.json({ error: 'invalid_json' }, 400)
  }

  const tenant_id = body.tenant_id ?? 'tnt_demo'
  const event_id = newEventId()
  const event = {
    type: 'CampaignBriefPublished' as const,
    event_id,
    tenant_id,
    campaign_id: campaignId,
    brief_json: body.brief_json ?? {},
  }
  recordAudit({
    trace_id: c.get('traceId'),
    tenant_id,
    kind: 'CampaignBriefPublished',
    detail: { event_id, campaign_id: campaignId },
  })
  appendOutbox({ kind: 'CampaignBriefPublished', tenant_id, payload: event })

  const responseJson = JSON.stringify({ accepted: true, event })
  idempotentStore(c, P.brief(campaignId), raw, 202, responseJson)
  return c.json(JSON.parse(responseJson) as { accepted: boolean; event: typeof event }, 202)
})

v1.post('/video-jobs', async (c) => {
  const raw = await c.req.text()
  const replay = idempotentReplay(c, P.videoJobs, raw)
  if (replay) return replay

  let body: { tenant_id?: string; campaign_id?: string; brief_json?: Record<string, unknown> }
  try {
    body = raw ? (JSON.parse(raw) as typeof body) : {}
  } catch {
    return c.json({ error: 'invalid_json' }, 400)
  }

  const tenant_id = body.tenant_id ?? 'tnt_demo'
  const video_job_id = `vj_${newEventId().slice(4)}`
  const res = {
    video_job_id,
    status: 'queued' as const,
    campaign_id: body.campaign_id ?? 'cmp_unknown',
    tenant_id,
  }
  recordAudit({ trace_id: c.get('traceId'), tenant_id, kind: 'video_job_created', detail: res })
  appendOutbox({ kind: 'VideoJobQueued', tenant_id, payload: res })

  const responseJson = JSON.stringify(res)
  idempotentStore(c, P.videoJobs, raw, 201, responseJson)
  return c.json(JSON.parse(responseJson) as typeof res, 201)
})

v1.patch('/video-jobs/:videoJobId', async (c) => {
  const videoJobId = c.req.param('videoJobId')
  const body = (await c.req.json()) as {
    tenant_id?: string
    status?: string
    creative_asset_id?: string
    campaign_id?: string
  }
  const tenant_id = body.tenant_id ?? 'tnt_demo'

  if (body.status === 'published' && body.creative_asset_id && body.campaign_id) {
    const event_id = newEventId()
    const event = {
      type: 'VideoJobCompleted' as const,
      event_id,
      tenant_id,
      video_job_id: videoJobId,
      campaign_id: body.campaign_id,
      creative_asset_id: body.creative_asset_id,
    }
    recordAudit({
      trace_id: c.get('traceId'),
      tenant_id,
      kind: 'VideoJobCompleted',
      detail: { event_id, video_job_id: videoJobId },
    })
    appendOutbox({ kind: 'VideoJobCompleted', tenant_id, payload: event })
    return c.json({ ok: true, video_job_id: videoJobId, status: body.status, event })
  }

  return c.json({ ok: true, video_job_id: videoJobId, status: body.status ?? 'updated' })
})

v1.post('/erp/finance/spend-commit', async (c) => {
  const raw = await c.req.text()
  const replay = idempotentReplay(c, P.spend, raw)
  if (replay) return replay

  let body: {
    tenant_id?: string
    period?: string
    amount_cents?: number
    spend_category?: string
    campaign_id?: string
    department_code?: string
  }
  try {
    body = raw ? (JSON.parse(raw) as typeof body) : {}
  } catch {
    return c.json({ error: 'invalid_json' }, 400)
  }

  if (!body.period || body.amount_cents == null || !body.spend_category) {
    return c.json({ error: 'missing_fields', need: ['period', 'amount_cents', 'spend_category'] }, 400)
  }
  const tenant_id = body.tenant_id ?? 'tnt_demo'
  const event_id = newEventId()
  const event = {
    type: 'MarketingSpendCommitted' as const,
    event_id,
    tenant_id,
    period: body.period,
    amount_cents: body.amount_cents,
    spend_category: body.spend_category,
    campaign_id: body.campaign_id,
    department_code: body.department_code,
  }
  const erp_ledger = spendToErpLedger({
    event_id,
    fiscal_period: body.period,
    department_code: body.department_code,
    campaign_id: body.campaign_id,
    amount_cents: body.amount_cents,
    spend_category: body.spend_category,
  })
  recordAudit({
    trace_id: c.get('traceId'),
    tenant_id,
    kind: 'MarketingSpendCommitted',
    detail: { event_id, erp_ledger },
  })
  appendOutbox({ kind: 'MarketingSpendCommitted', tenant_id, payload: { event, erp_ledger } })
  fireFinanceWebhook('MarketingSpendCommitted', tenant_id, { event, erp_ledger })

  const responseJson = JSON.stringify({ accepted: true, event, erp_ledger })
  idempotentStore(c, P.spend, raw, 202, responseJson)
  return c.json(JSON.parse(responseJson) as { accepted: boolean; event: typeof event; erp_ledger: typeof erp_ledger }, 202)
})

v1.get('/security/status', (c) => getSecurityStatus(c))

v1.post('/security/scan-upload', async (c) => postSecurityScanUpload(c))

v1.post('/erp/finance/payouts', async (c) => {
  const raw = await c.req.text()
  const replay = idempotentReplay(c, P.payouts, raw)
  if (replay) return replay

  let body: {
    tenant_id?: string
    payout_batch_id?: string
    currency?: string
    total_amount_cents?: number
    line_items?: { payee_ref: string; amount_cents: number; coa_code: string }[]
  }
  try {
    body = raw ? (JSON.parse(raw) as typeof body) : {}
  } catch {
    return c.json({ error: 'invalid_json' }, 400)
  }

  if (!body.payout_batch_id || !body.currency || body.total_amount_cents == null || !body.line_items?.length) {
    return c.json(
      { error: 'missing_fields', need: ['payout_batch_id', 'currency', 'total_amount_cents', 'line_items'] },
      400,
    )
  }
  const tenant_id = body.tenant_id ?? 'tnt_demo'
  const event_id = newEventId()
  const event = {
    type: 'PayoutApproved' as const,
    event_id,
    tenant_id,
    payout_batch_id: body.payout_batch_id,
    currency: body.currency,
    total_amount_cents: body.total_amount_cents,
    line_items: body.line_items,
  }
  const erp_ledger = payoutToErpStub({
    event_id,
    payout_batch_id: body.payout_batch_id,
    currency: body.currency,
    total_amount_cents: body.total_amount_cents,
    line_items: body.line_items,
  })
  recordAudit({
    trace_id: c.get('traceId'),
    tenant_id,
    kind: 'PayoutApproved',
    detail: { event_id, erp_ledger },
  })
  appendOutbox({ kind: 'PayoutApproved', tenant_id, payload: { event, erp_ledger } })
  fireFinanceWebhook('PayoutApproved', tenant_id, { event, erp_ledger })

  const responseJson = JSON.stringify({ accepted: true, event, erp_ledger })
  idempotentStore(c, P.payouts, raw, 202, responseJson)
  return c.json(JSON.parse(responseJson) as { accepted: boolean; event: typeof event; erp_ledger: typeof erp_ledger }, 202)
})

v1.post('/admin/outbox/:id/retry', async (c) => {
  const adminKey = process.env.BFF_ADMIN_KEY?.trim()
  if (!adminKey) return c.json({ error: 'admin_disabled' }, 404)
  if (c.req.header('x-bff-admin-key') !== adminKey) return c.json({ error: 'unauthorized' }, 401)
  const id = Number(c.req.param('id'))
  if (!Number.isInteger(id) || id < 1) return c.json({ error: 'invalid_id' }, 400)
  const r = resetOutboxToPending(id)
  if (!r.ok) {
    if (r.error === 'not_found') return c.json({ error: 'not_found' }, 404)
    if (r.error === 'no_db') return c.json({ error: 'no_db' }, 503)
    return c.json({ error: r.error }, 400)
  }
  suiteLog('warn', 'outbox_replay_requested', { trace_id: c.get('traceId'), outbox_id: id })
  return c.json({ ok: true, outbox_id: id, status: 'pending' })
})
