# 스테이징 E2E (아웃박스 · 재무 웹훅 · 실패 알림)

## 목표

스테이징 BFF에서 **이벤트가 아웃박스에 적재**되고, **웹훅 수신 스텁**이 호출되며, **실패 시 알림**이 관측 가능한지 확인합니다.

## 사전 조건

- 스테이징 `BFF_BASE`, `BFF_API_KEY` 또는 JWT.
- SQLite 사용 (`SQLITE_DISABLED` 미설정).
- 수신 스텁 URL: `https://.../webhook/outbox` (예: RequestBin, 내부 모의 서버).

## 환경 변수 (스테이징)

| 변수 | 설명 |
|------|------|
| `OUTBOX_WEBHOOK_URL` | 아웃박스 `pending` 레코드 전달 대상 |
| `ERP_FINANCE_WEBHOOK_URL` | `MarketingSpendCommitted` / `PayoutApproved` 즉시 POST (선택) |
| `OUTBOX_FAILURE_WEBHOOK_URL` | 아웃박스 항목이 `failed`로 전환될 때 **한 번** POST (알림) |
| `OUTBOX_POLL_MS` | 워커 주기 (기본 5000) |

## E2E 시나리오 (권장 순서)

1. **헬스**: `GET {BFF_BASE}/health` → 200.
2. **Spend (멱등)**: `POST /api/v1/erp/finance/spend-commit` + `Idempotency-Key` 동일 본문으로 **두 번** → 두 번째는 `X-Idempotent-Replay: true`.
3. **아웃박스**: 스텁이 `POST` 본문에 `kind`, `tenant_id`, `payload` 포함 수신 확인.
4. **실패**: 스텁이 일시적으로 500 반환 → `attempts` 증가, 최대 시도 후 `status=failed` 및 `OUTBOX_FAILURE_WEBHOOK_URL` 호출(설정 시).
5. **재무**: `ERP_FINANCE_WEBHOOK_URL`에 `kind`, `tenant_id`, `payload` 수신 확인.

## 로컬 빠른 검증

```bash
npm run dev
# 다른 터미널
set BFF_BASE=http://127.0.0.1:8787
npm run smoke:bff
```

**아웃박스까지 포함한 E2E** (BFF가 떠 있고, `BFF_API_KEY`·`JWT_SECRET` 미설정이면 인증 없이 동작):

```bash
set BFF_BASE=http://127.0.0.1:8787
npm run smoke:e2e
```

[scripts/e2e-integration-local.mjs](../../scripts/e2e-integration-local.mjs) — `spend-commit` 후 `GET /api/v1/events`에 `MarketingSpendCommitted`가 있는지 확인합니다. SQLite가 비활성화되면 아웃박스가 비어 실패합니다.

**웹훅 수신 스텁** (ERP 재무 URL 시뮬레이션):

```bash
npm run webhook:stub
# BFF에 ERP_FINANCE_WEBHOOK_URL=http://127.0.0.1:9999/ 로 설정 후 spend-commit 호출 → 스텁 터미널에 POST 본문 출력
# HMAC 검증까지 보려면 BFF와 스텁에 동일 시크릿: BFF_WEBHOOK_SIGNING_SECRET=... , WEBHOOK_STUB_VERIFY_SECRET=...
```

## 스모크 스크립트

`npm run smoke:bff` — [scripts/smoke-bff.mjs](../../scripts/smoke-bff.mjs). 인증이 켜진 환경에서는 `BFF_X_KEY` 또는 `BFF_JWT` 설정.
