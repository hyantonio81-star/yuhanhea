/**
 * BFF 호출 클라이언트. `VITE_SUITE_BFF_KEY`는 빌드에 포함되므로 프로덕션에서는 쓰지 말고
 * 서버 프록시·짧은 만료 JWT 등으로 대체하는 것을 권장합니다.
 */
import { publishSuiteEvent } from './mockBus'
import type {
  CampaignBriefPublished,
  MarketingSpendCommitted,
  PayoutApproved,
  ReminderScheduled,
  SuiteEvent,
  VideoJobCompleted,
} from './events'

function getBase(): string {
  return (import.meta.env.VITE_SUITE_BFF_BASE as string | undefined)?.trim() ?? ''
}

function getKey(): string | undefined {
  const k = (import.meta.env.VITE_SUITE_BFF_KEY as string | undefined)?.trim()
  return k || undefined
}

function getJwt(): string | undefined {
  const j = (import.meta.env.VITE_SUITE_BFF_JWT as string | undefined)?.trim()
  return j || undefined
}

export function suiteBffEnabled(): boolean {
  return getBase().length > 0
}

function url(path: string): string {
  const b = getBase().replace(/\/$/, '')
  return `${b}/api/v1${path}`
}

function authHeaders(): Record<string, string> {
  const h: Record<string, string> = {}
  const key = getKey()
  if (key) h['X-BFF-Key'] = key
  const jwt = getJwt()
  if (jwt) h['Authorization'] = `Bearer ${jwt}`
  return h
}

function adminHeaders(): Record<string, string> {
  const k = (import.meta.env.VITE_SUITE_BFF_ADMIN_KEY as string | undefined)?.trim()
  if (!k) return {}
  return { 'X-BFF-Admin-Key': k }
}

async function req<T>(path: string, init?: RequestInit, extraHeaders?: Record<string, string>): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...authHeaders(),
    ...extraHeaders,
    ...(init?.headers as Record<string, string> | undefined),
  }
  const res = await fetch(url(path), { ...init, headers })
  const data = (await res.json().catch(() => ({}))) as T & { error?: string }
  if (!res.ok) {
    const err = new Error((data as { error?: string }).error ?? res.statusText) as Error & {
      status: number
      body: unknown
    }
    err.status = res.status
    err.body = data
    throw err
  }
  return data as T
}

export async function fetchLocalMarketInsights(
  localMarketId: string,
  tenantId = 'tnt_demo',
): Promise<{ local_market_id: string; summary: string; updated_at?: string }> {
  const q = new URLSearchParams({ tenant_id: tenantId })
  return req(`/crm/local-markets/${encodeURIComponent(localMarketId)}/insights?${q}`)
}

export async function postCrmReminder(
  body: {
    tenant_id: string
    contact_id: string
    local_market_id: string
    fire_at: string
    channel: ReminderScheduled['channel']
    consent_token_ref: string
  },
  extraHeaders?: Record<string, string>,
): Promise<{ accepted: boolean; event: ReminderScheduled }> {
  return req('/crm/reminders', { method: 'POST', body: JSON.stringify(body) }, extraHeaders)
}

export async function postSpendCommit(
  body: {
    tenant_id: string
    period: string
    amount_cents: number
    spend_category: MarketingSpendCommitted['spend_category']
    campaign_id?: string
    department_code?: string
  },
  extraHeaders?: Record<string, string>,
): Promise<{ accepted: boolean; event: MarketingSpendCommitted; erp_ledger: Record<string, unknown> }> {
  return req('/erp/finance/spend-commit', { method: 'POST', body: JSON.stringify(body) }, extraHeaders)
}

export async function postPayout(
  body: {
    tenant_id: string
    payout_batch_id: string
    currency: string
    total_amount_cents: number
    line_items: PayoutApproved['line_items']
  },
  extraHeaders?: Record<string, string>,
): Promise<{ accepted: boolean; event: PayoutApproved; erp_ledger: Record<string, unknown> }> {
  return req('/erp/finance/payouts', { method: 'POST', body: JSON.stringify(body) }, extraHeaders)
}

export type ToolApprovalItem = {
  id: number
  tenant_id: string
  trace_id: string | null
  tool_name: string
  args_json: string
  status: string
  created_at: number
  resolved_at: number | null
  resolution_note: string | null
}

export async function fetchAssistantToolApprovals(params?: {
  tenant_id?: string
  status?: string
  limit?: number
}): Promise<{ items: ToolApprovalItem[] }> {
  const q = new URLSearchParams({ limit: String(params?.limit ?? 50) })
  if (params?.tenant_id) q.set('tenant_id', params.tenant_id)
  if (params?.status) q.set('status', params.status)
  return req(`/assistant/tool-approvals?${q}`)
}

export async function approveAssistantToolApproval(id: number): Promise<{ ok: boolean; id: number; status: string }> {
  return req(`/assistant/tool-approvals/${id}/approve`, { method: 'POST' }, adminHeaders())
}

export async function rejectAssistantToolApproval(
  id: number,
  note?: string,
): Promise<{ ok: boolean; id: number; status: string }> {
  return req(
    `/assistant/tool-approvals/${id}/reject`,
    { method: 'POST', body: JSON.stringify({ note }) },
    adminHeaders(),
  )
}

export async function postAssistantSession(body: {
  trace_id?: string
  tenant_id: string
  user_id?: string
  messages: { role: string; content: string }[]
}): Promise<{
  trace_id: string
  audit_id: string
  reply: string
  tool_calls: { tool: string; approval_required: boolean }[]
  mode?: 'gemini' | 'openai' | 'heuristic'
}> {
  return req('/assistant/sessions', { method: 'POST', body: JSON.stringify(body) })
}

export async function postCampaignBrief(
  campaignId: string,
  body: { tenant_id: string; brief_json?: Record<string, unknown> },
  options?: { idempotencyKey?: string },
): Promise<{ accepted: boolean; event: CampaignBriefPublished }> {
  const h = options?.idempotencyKey ? { 'Idempotency-Key': options.idempotencyKey } : undefined
  return req(
    `/campaigns/${encodeURIComponent(campaignId)}/briefs`,
    { method: 'POST', body: JSON.stringify(body) },
    h,
  )
}

export async function postVideoJob(
  body: { tenant_id: string; campaign_id?: string; brief_json?: Record<string, unknown> },
  options?: { idempotencyKey?: string },
): Promise<{ video_job_id: string; status: string; campaign_id: string; tenant_id: string }> {
  const h = options?.idempotencyKey ? { 'Idempotency-Key': options.idempotencyKey } : undefined
  return req('/video-jobs', { method: 'POST', body: JSON.stringify(body) }, h)
}

export async function patchVideoJob(
  videoJobId: string,
  body: {
    tenant_id: string
    status?: string
    creative_asset_id?: string
    campaign_id?: string
  },
): Promise<
  | { ok: boolean; video_job_id: string; status: string; event: VideoJobCompleted }
  | { ok: boolean; video_job_id: string; status?: string }
> {
  return req(`/video-jobs/${encodeURIComponent(videoJobId)}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  })
}

export async function fetchAuditEntries(
  tenantId?: string,
  limit = 50,
): Promise<{ entries: { audit_id: string; ts: string; tenant_id: string; kind: string; detail: Record<string, unknown> }[] }> {
  const q = new URLSearchParams({ limit: String(limit) })
  if (tenantId) q.set('tenant_id', tenantId)
  return req(`/audit?${q}`)
}

export async function fetchSuiteEvents(
  limit = 50,
  sinceId?: number,
): Promise<{
  events: {
    id: number
    kind: string
    tenant_id: string
    payload: unknown
    status: string
    created_at: number
  }[]
}> {
  const q = new URLSearchParams({ limit: String(limit) })
  if (sinceId != null && sinceId > 0) q.set('since_id', String(sinceId))
  return req(`/events?${q}`)
}

/** BFF 응답 이벤트를 브라우저 데모 버스에도 반영 */
export function mirrorEventToDemoBus(event: SuiteEvent): void {
  publishSuiteEvent(event)
}
