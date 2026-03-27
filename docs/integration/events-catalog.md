# 도메인 이벤트 카탈로그

AsyncAPI: [asyncapi-events.yaml](./asyncapi-events.yaml)

| 이벤트 | 발행 시스템 | 구독자 | 목적 | 재시도·멱등 (권장) |
|--------|-------------|--------|------|---------------------|
| `CampaignBriefPublished` | Yuaimarketing | Mart | `video_job` 생성 | 소비: `event_id` 멱등 |
| `VideoJobCompleted` | Mart | Yuaimarketing | 크리에이티브 바인딩·게시 예약 | 동일 |
| `LocalMarketInsightUpdated` | CRM | Yuaimarketing | 로컬 전략 요약 반영 | 최신값 덮어쓰기 허용 시 멱등 완화 |
| `ReminderScheduled` | CRM | Notification / BFF 아웃박스 | 리마인더 큐 | `event_id` + `contact_id` |
| `ReminderFired` | Notification svc | CRM, 감사 로그 | 전달 증명 | 로그 append-only |
| `MarketingSpendCommitted` | Yuaimarketing / BFF | ERP | 예산 대비 실적 | `Idempotency-Key` 또는 `event_id` |
| `PayoutApproved` | Yuaimarketing / Mart / BFF | ERP | AP 미지급 | 동일 |

**BFF 아웃박스**: [apps/api](../../apps/api)는 SQLite `outbox`에 동일 페이로드를 적재하고, `OUTBOX_WEBHOOK_URL`로 at-least-once 전달을 시도합니다. 실제 버스(Kafka 등) 도입 시 **아웃박스 = 소스**, 큐로 재전달하는 패턴을 권장합니다.

페이로드 최소 필드는 `apps/web/src/integration/events.ts`의 TypeScript 타입과 동일하게 유지합니다.
