import type { CampaignId, CreativeAssetId, LocalMarketId, SpendCategory, TenantId, VideoJobId } from './types'

/** 도메인 이벤트 페이로드 — docs/integration/events-catalog.md */
export type CampaignBriefPublished = {
  type: 'CampaignBriefPublished'
  event_id: string
  tenant_id: TenantId
  campaign_id: CampaignId
  brief_json: Record<string, unknown>
}

export type VideoJobCompleted = {
  type: 'VideoJobCompleted'
  event_id: string
  tenant_id: TenantId
  video_job_id: VideoJobId
  campaign_id: CampaignId
  creative_asset_id: CreativeAssetId
}

export type LocalMarketInsightUpdated = {
  type: 'LocalMarketInsightUpdated'
  event_id: string
  tenant_id: TenantId
  local_market_id: LocalMarketId
  summary: string
}

export type MarketingSpendCommitted = {
  type: 'MarketingSpendCommitted'
  event_id: string
  tenant_id: TenantId
  period: string
  amount_cents: number
  spend_category: SpendCategory
  campaign_id?: CampaignId
  department_code?: string
}

/** CRM → 알림 게이트웨이 (Phase 3) */
export type ReminderScheduled = {
  type: 'ReminderScheduled'
  event_id: string
  tenant_id: TenantId
  contact_id: string
  local_market_id: LocalMarketId
  fire_at: string
  channel: 'push' | 'sms' | 'email'
  consent_token_ref: string
}

export type ReminderFired = {
  type: 'ReminderFired'
  event_id: string
  tenant_id: TenantId
  reminder_id: string
  contact_id: string
  delivered_channel: 'push' | 'sms' | 'email'
}

/** ERP AP 배치 (Phase 4) */
export type PayoutApproved = {
  type: 'PayoutApproved'
  event_id: string
  tenant_id: TenantId
  payout_batch_id: string
  currency: string
  total_amount_cents: number
  line_items: { payee_ref: string; amount_cents: number; coa_code: string }[]
}

export type SuiteEvent =
  | CampaignBriefPublished
  | VideoJobCompleted
  | LocalMarketInsightUpdated
  | MarketingSpendCommitted
  | ReminderScheduled
  | ReminderFired
  | PayoutApproved

export function newEventId(): string {
  return `evt_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`
}
