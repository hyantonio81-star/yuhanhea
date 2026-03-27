import { appendOutbox } from '../store/outbox.js'
import { getToolApproval, setToolApprovalStatus } from '../store/toolApprovalStore.js'
import { fireReminderWebhook } from '../reminderWebhook.js'

function newEventId(): string {
  return `evt_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`
}

/** 승인 후 실제 도구 부작용(아웃박스·웹훅) 반영 */
export function applyToolApproval(id: number): { ok: true } | { ok: false; error: string } {
  const row = getToolApproval(id)
  if (!row) return { ok: false, error: 'not_found' }
  if (row.status !== 'pending') return { ok: false, error: 'not_pending' }
  let args: Record<string, unknown> = {}
  try {
    args = JSON.parse(row.args_json) as Record<string, unknown>
  } catch {
    return { ok: false, error: 'invalid_args' }
  }
  const tenant_id = row.tenant_id

  try {
    switch (row.tool_name) {
      case 'mart_create_video_job': {
        const video_job_id = `vj_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`
        const campaign_id = String(args.campaign_id ?? 'cmp_unknown')
        appendOutbox({
          kind: 'VideoJobQueued',
          tenant_id,
          payload: { video_job_id, status: 'queued' as const, campaign_id, tenant_id },
        })
        break
      }
      case 'mkt_schedule_campaign': {
        const event_id = newEventId()
        const campaign_id = String(args.campaign_id ?? '')
        appendOutbox({
          kind: 'CampaignBriefPublished',
          tenant_id,
          payload: {
            type: 'CampaignBriefPublished' as const,
            event_id,
            tenant_id,
            campaign_id,
            brief_json: { slot: args.slot, source: 'assistant_approval' },
          },
        })
        break
      }
      case 'crm_schedule_reminder': {
        const event_id = newEventId()
        const event = {
          type: 'ReminderScheduled' as const,
          event_id,
          tenant_id,
          contact_id: String(args.contact_id ?? ''),
          local_market_id: String(args.local_market_id ?? 'lmk_default'),
          fire_at: String(args.fire_at ?? ''),
          channel: args.channel as 'push' | 'sms' | 'email',
          consent_token_ref: 'approval_queue',
        }
        appendOutbox({ kind: 'ReminderScheduled', tenant_id, payload: event })
        fireReminderWebhook(event)
        break
      }
      default:
        return { ok: false, error: 'unsupported_tool' }
    }
  } catch {
    return { ok: false, error: 'apply_failed' }
  }

  if (!setToolApprovalStatus(id, 'approved')) return { ok: false, error: 'status_update_failed' }
  return { ok: true }
}

export function rejectToolApproval(id: number, note?: string): boolean {
  return setToolApprovalStatus(id, 'rejected', note)
}
