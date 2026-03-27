# 네트워크·운영 (1.5)

## ERP ↔ BFF

| 항목 | 권장 |
|------|------|
| 방향 | ERP가 **수신 전용** 웹훅 URL을 노출하거나, BFF가 ERP API로만 호출(허브 패턴에 맞게 선택) |
| TLS | HTTPS 필수; 사내 CA는 클라이언트 번들에 포함 |
| IP 제한 | ERP 방화벽에 **BFF egress IP**(스테이징·프로덕션 각각) 화이트리스트 |
| 타임아웃 | BFF→ERP HTTP 클라이언트 10~30s; 재시도는 아웃박스 워커 정책 따름 |

## 웹훅 엔드포인트

| env | 용도 |
|-----|------|
| `ERP_FINANCE_WEBHOOK_URL` | `MarketingSpendCommitted` 등 즉시 POST(시뮬레이터·ERP 스텁) |
| `OUTBOX_WEBHOOK_URL` | 아웃박스 pending 이벤트 전달 |
| `OUTBOX_FAILURE_WEBHOOK_URL` | `failed` 상태 알림 |
| `REMINDER_WEBHOOK_URL` | 리마인더 생성 시 외부 전달 |
| `OUTBOX_MIRROR_URL` | SQLite `INSERT` 직후 동일 페이로드를 한 번 더 POST(버스·SNS/Lambda 어댑터 앞단). [outboxMirror.ts](../../apps/api/src/outboxMirror.ts) |

로컬 검증: `npm run webhook:stub` 후 BFF에 `ERP_FINANCE_WEBHOOK_URL=http://127.0.0.1:9999/...` 설정.

## SLA·가용성 (초안)

운영 합의 후 수치 확정. 아래는 플레이스홀더입니다.

| 구간 | 목표 |
|------|------|
| BFF API (스테이징) | 월 가용성 협의 |
| 아웃박스 → 소비자 | p95 지연 협의; `failed` 시 `OUTBOX_FAILURE_WEBHOOK_URL`로 통지 |

인시던트 시 [GOVERNANCE_OPERATIONS.md](./GOVERNANCE_OPERATIONS.md) 릴리스·롤백 절차를 따릅니다.
