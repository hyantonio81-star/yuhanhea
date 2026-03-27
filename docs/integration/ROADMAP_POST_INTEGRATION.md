# 통합 후 개선 로드맵 (우선순위)

구현 상태는 아래 **산출물** 열을 기준으로 합니다. 세부 링크는 [README](./README.md)를 참고하세요.

## P0 — 운영 필수

| 순위 | 과제 | 산출물 |
|------|------|--------|
| 1 | 구조화 로그 + `trace_id`/`audit_id` | [SECURITY_RUNBOOK.md](./SECURITY_RUNBOOK.md) §7, `traceMiddleware`, `logging.ts` |
| 2 | 아웃박스 `failed` 모니터링 | `outbox_failed` 로그 + `OUTBOX_FAILURE_WEBHOOK_URL` |
| 3 | 멱등 키 가이드 | [CONTRACT_TESTING.md](./CONTRACT_TESTING.md) |

## P1 — 신뢰성

| 순위 | 과제 | 산출물 |
|------|------|--------|
| 4 | DLQ 재처리 API | `POST /api/v1/admin/outbox/{id}/retry`, `BFF_ADMIN_KEY` |
| 5 | 웹훅 HMAC | `BFF_WEBHOOK_SIGNING_SECRET`, [webhookSignature.ts](../../apps/api/src/webhookSignature.ts) |
| 6 | 큐 이중 기록 | `OUTBOX_MIRROR_URL`, [outboxMirror.ts](../../apps/api/src/outboxMirror.ts) |

## P2 — 플랫폼

| 순위 | 과제 | 산출물 |
|------|------|--------|
| 7 | API Gateway · OIDC · OAuth2 CC | [GATEWAY_OIDC.md](./GATEWAY_OIDC.md), [oidcJwt.ts](../../apps/api/src/oidcJwt.ts) (`JWKS_URI`, `JWT_ISSUER`, `JWT_AUDIENCE`) |
| 8 | AI 고위험 도구 승인 큐 | `ASSISTANT_TOOL_APPROVAL_QUEUE`, SQLite `tool_approval_queue`, `GET/POST .../assistant/tool-approvals`, 웹 `/suite/tool-approvals` |
| 9 | 감사 아카이빙 | [AUDIT_ARCHIVING.md](./AUDIT_ARCHIVING.md), `npm run export-audit -w yuhan-suite-api` |

## P3 — 규모

| 과제 | 산출물 |
|------|--------|
| 멀티 리전 테넌트 격리 | [P3_SCALE_AND_OPERATIONS.md](./P3_SCALE_AND_OPERATIONS.md), `BFF_ENFORCE_TENANT_HEADER` + [tenantIsolation.ts](../../apps/api/src/tenantIsolation.ts) |
| 읽기 복제·캐시 | 동 문서 §읽기 복제·캐시 |
| 모바일 CRM 푸시 | 동 문서 §모바일, [crm-mobile-assistant.md](./crm-mobile-assistant.md) |

---

**우선순위 확정 방법**: 분기 초에 P0~P1만 확정하고, P2는 트래픽·컴플라이언스 요구에 따라 재정렬합니다.
