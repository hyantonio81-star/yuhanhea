# 제품별 최소 연결 체크리스트 (1.2)

각 제품 담당이 스테이징 연동 전에 확인합니다. 스키마 소스 경로는 [schema-inventory.md](./schema-inventory.md)에 기입합니다.

## Yuaimarketing

- [ ] `POST /api/v1/campaigns/{campaignId}/briefs` (또는 동등)가 프로덕션 라우팅과 일치
- [ ] `CampaignBriefPublished` 페이로드가 [events-catalog.md](./events-catalog.md)와 동일
- [ ] `tenant_id` 발급이 IdP 클레임과 일치

## Yuhan Mart

- [ ] `video_job` 생성·완료가 BFF `POST/PATCH /api/v1/video-jobs` 또는 동등 경로와 정합
- [ ] `VideoJobCompleted`에 `creative_asset_id`, `campaign_id` 포함

## Yuhan CRM

- [ ] `contact_id`, `local_market_id` 체계가 리마인더 API와 일치
- [ ] 동의·쿨다운 정책이 [crm-mobile-assistant.md](./crm-mobile-assistant.md)와 운영 규칙 일치

## Yuhan ERP

- [ ] COA·세금 코드가 [erp-finance-mapping.md](./erp-finance-mapping.md)와 매핑 확정
- [ ] `erp_ledger` / `MarketingSpendCommitted` 수신: 웹훅 URL·방화벽·[NETWORK_AND_SLA.md](./NETWORK_AND_SLA.md)
