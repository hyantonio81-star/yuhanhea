# 4제품 스키마 인벤토리

각 제품 담당자가 분기마다 갱신합니다. **필수 엔티티**만 유지하고 나머지는 링크로 대체합니다.

아래 표의 **스키마 소스** 열에 실제 레포 경로·파일명을 적습니다 (예: `packages/db/prisma/schema.prisma`).

## 1. Yuaimarketing (허브)

| 엔티티 | 주요 필드 | BFF / 이벤트 연결 | 스키마 소스 (기입) |
|--------|-----------|-------------------|-------------------|
| Campaign | `campaign_id`, `tenant_id`, `name`, `budget_cents`, `status` | `CampaignBriefPublished`, `POST /campaigns/{id}/briefs` | |
| ChannelLink | `campaign_id`, `platform`, `external_account_id` | — | |
| User / Org | 표준 OIDC 클레임 | `tenant_id` 클레임 | |

## 2. Yuhan Mart (본 저장소 `apps/web` 시드)

| 엔티티 | 주요 필드 | BFF / 이벤트 연결 | 스키마 소스 (기입) |
|--------|-----------|-------------------|-------------------|
| VideoJob | `video_job_id`, `tenant_id`, `campaign_id`, `status`, `brief_json` | `POST/PATCH /video-jobs`, `VideoJobCompleted` | [VideoAiTeamPages](../../apps/web/src/pages/video/VideoAiTeamPages.tsx) |
| CreativeAsset | `creative_asset_id`, `video_job_id`, `version`, `uri` | `VideoJobCompleted.creative_asset_id` | |

## 3. Yuhan CRM (오프라인·로컬)

| 엔티티 | 주요 필드 | BFF / 이벤트 연결 | 스키마 소스 (기입) |
|--------|-----------|-------------------|-------------------|
| LocalMarket | `local_market_id`, `tenant_id`, `geo`, `store_code` | `GET .../insights`, `LocalMarketInsightUpdated` | |
| Contact / Visit | `contact_id`, `local_market_id`, `consent_*` | `ReminderScheduled`, `crm_schedule_reminder` | |

## 4. Yuhan ERP

| 엔티티 | 주요 필드 | BFF / 이벤트 연결 | 스키마 소스 (기입) |
|--------|-----------|-------------------|-------------------|
| Voucher | `erp_voucher_id`, `period`, `amount`, `coa_code` | `external_ref` 역참조 | |
| BudgetLine | `department_code`, `campaign_id` (optional) | `MarketingSpendCommitted`, `erp_ledger` | |
| APBatch | `payout_batch_id`, 미지급 라인 | `PayoutApproved`, `ERP_FINANCE_WEBHOOK_URL` | |

## 교차 참조 테이블 (권장)

통합 DB 또는 Yuaimarketing 내 `integration_mapping`:

- `(tenant_id, campaign_id, external_system, external_id)`
