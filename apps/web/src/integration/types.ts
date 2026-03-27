/** 공통 ID·열거형 — docs/integration/master-data-glossary.md 와 동기 */

export type TenantId = string
export type CampaignId = string
export type VideoJobId = string
export type CreativeAssetId = string
export type LocalMarketId = string

export type VideoJobStatus =
  | 'queued'
  | 'scripting'
  | 'rendering'
  | 'qa'
  | 'published'
  | 'failed'

export type SpendCategory = 'ad_spend' | 'production' | 'influencer' | 'tooling'
