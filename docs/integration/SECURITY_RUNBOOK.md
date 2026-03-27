# 보안 런북 (BFF · JWT · API Key · m2m · ERP)

대상 구현: [apps/api/src/auth.ts](../../apps/api/src/auth.ts), [apps/api/.env.example](../../apps/api/.env.example).

**Supabase · Vercel 배포** 시 단계별 조치: [SECURITY_IMPROVEMENT_PLAN.md](./SECURITY_IMPROVEMENT_PLAN.md) · 아키텍처: [DEPLOY_SUPABASE_VERCEL.md](./DEPLOY_SUPABASE_VERCEL.md).

## 1. 인증 모드 (우선순위)

1. **`JWT_SECRET` 설정 시**: `Authorization: Bearer <HS256 JWT>` 검증 성공 시 통과.
2. **`JWKS_URI` + `JWT_ISSUER` 설정 시**: HS256 실패 후 또는 `JWT_SECRET` 없이 Bearer를 OIDC JWKS로 검증 ([oidcJwt.ts](../../apps/api/src/oidcJwt.ts), [GATEWAY_OIDC.md](./GATEWAY_OIDC.md)).
3. **`BFF_API_KEY` 설정 시**: `X-BFF-Key` 일치 시 통과.
4. **조합**: Bearer → HS256 → OIDC → `X-BFF-Key` 순으로 시도.
5. **인증 수단 전부 미설정**: 개발 편의상 인증 생략(프로덕션 금지).

`/health`는 항상 인증 없이 응답합니다.

**테넌트 강제**: `BFF_ENFORCE_TENANT_HEADER=1`이면 JWT에 `tenant_id` 또는 `tid`가 있을 때 요청 헤더 `X-Tenant-Id`와 일치해야 합니다 ([tenantIsolation.ts](../../apps/api/src/tenantIsolation.ts)).

## 2. m2m vs 브라우저

| 클라이언트 | 권장 | 비고 |
|------------|------|------|
| 서버·CI·ERP 어댑터 | `X-BFF-Key` 또는 OAuth2 client credentials(향후 게이트웨이) | 키는 시크릿 매니저 |
| 브라우저 (Mart 웹) | 동일 오리진 프록시로 BFF 호출 + 짧은 만료 JWT 또는 세션 쿠키 | **API 키를 Vite 번들에 넣지 않음** — `VITE_SUITE_BFF_KEY`는 스테이징 한정·회전 |
| 모바일 앱 | mTLS 또는 공개 키 고정 pin + OAuth | |

## 3. ERP·재무 경로

- **아웃박스·재무 웹훅** 수신 URL은 **방화벽 화이트리스트**(BFF 또는 게이트웨이 고정 송신 IP)를 권장합니다.
- **HMAC (선택·권장 프로덕션)**: 환경 변수 `BFF_WEBHOOK_SIGNING_SECRET`을 설정하면 BFF가 다음 발신 POST에 `X-Yuhan-Signature: sha256=<hex>`를 붙입니다 — `OUTBOX_WEBHOOK_URL`, `OUTBOX_FAILURE_WEBHOOK_URL`, `ERP_FINANCE_WEBHOOK_URL`, `REMINDER_WEBHOOK_URL`, `OUTBOX_MIRROR_URL`. 서명은 **요청 본문(JSON 문자열) 바이트**에 대해 HMAC-SHA256(secret) 후 hex입니다. 수신 측은 동일 본문으로 검증합니다. 구현: [webhookSignature.ts](../../apps/api/src/webhookSignature.ts)의 `verifyWebhookSignature`. mTLS는 별도 합의 시 적용합니다.

## 4. 키 회전 절차 (요약)

1. 새 `BFF_API_KEY` / `JWT_SECRET` 생성.
2. 소비자에 새 값 배포(겹침 기간).
3. BFF 환경 변수 갱신.
4. 구 키 폐기.

## 5. 감사

- 감사 항목은 SQLite·JSONL ([GOVERNANCE_OPERATIONS.md](./GOVERNANCE_OPERATIONS.md))에 남깁니다. 접근은 최소 권한·암호화 백업 정책을 따릅니다.

## 6. 관리 API (아웃박스 재처리)

환경 변수 `BFF_ADMIN_KEY`가 설정된 경우에만 `POST /api/v1/admin/outbox/{id}/retry`가 활성화됩니다. 헤더 `X-BFF-Admin-Key`가 키와 일치해야 하며, **실패(`failed`) 상태** 행만 `pending`으로 되돌립니다. 미설정 시 해당 경로는 `404 admin_disabled`입니다.

## 7. 구조화 로그 (stdout)

BFF는 감사 기록 시·아웃박스 실패 시·재처리 요청 시 **한 줄 JSON**을 stdout에 출력합니다. 필드 예:

| 필드 | 설명 |
|------|------|
| `ts` | ISO8601 |
| `level` | `info` \| `warn` \| `error` |
| `msg` | `audit_recorded` \| `outbox_failed` \| `outbox_replay_requested` |
| `service` | `yuhan-suite-bff` |
| `trace_id` | 요청 `X-Trace-Id`와 동일(가능 시) |
| `audit_id` | 감사 행 ID (`audit_recorded` 시) |
| `tenant_id`, `kind` | 감사·아웃박스 맥락 |

대시보드(예: CloudWatch Logs Insights, Datadog)에서는 `trace_id`로 요청 단위, `audit_id`로 감사 행을 조인합니다. 아웃박스 알림은 `OUTBOX_FAILURE_WEBHOOK_URL`과 병행합니다.
