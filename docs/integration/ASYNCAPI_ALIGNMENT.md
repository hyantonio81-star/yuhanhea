# AsyncAPI ↔ 이벤트 카탈로그 정렬 (1.3)

| 소스 | 역할 |
|------|------|
| [asyncapi-events.yaml](./asyncapi-events.yaml) | 채널·페이로드 스키마 초안 |
| [events-catalog.md](./events-catalog.md) | 운영 소유권·재시도·멱등·아웃박스 정책 |

## 정합성 유지 절차

1. 새 이벤트는 **events-catalog**에 먼저 등록(소유 제품·소비자·재시도 규칙).
2. 동일 `event_type`을 **asyncapi-events**에 채널·`message` 스키마로 반영.
3. BFF `appendOutbox` / 도메인 코드의 `kind` 문자열이 카탈로그 `event_type`과 일치하는지 PR에서 확인.
4. CI: OpenAPI는 [CONTRACT_TESTING.md](./CONTRACT_TESTING.md); AsyncAPI는 릴리스 전 수동 `asyncapi-cli validate`(또는 동등) 권장.

## BFF `kind` ↔ 카탈로그

| Outbox `kind` | 카탈로그 참조 |
|---------------|----------------|
| `CampaignBriefPublished` | `CampaignBriefPublished` |
| `VideoJobQueued`, `VideoJobCompleted` | 동명 |
| `MarketingSpendCommitted` | `MarketingSpendCommitted` |

`kind` 변경 시 마이그레이션·구독자 양쪽에 공지합니다.
