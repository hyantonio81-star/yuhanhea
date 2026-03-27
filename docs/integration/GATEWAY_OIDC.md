# API Gateway · OIDC(사용자) · OAuth2 Client Credentials(m2m)

## 역할 분리

| 계층 | 역할 |
|------|------|
| **게이트웨이** (Kong, AWS API GW, Azure APIM 등) | 레이트 리밋, WAF, TLS 종료, 일부 경로에서만 OIDC 또는 CC 토큰 발급·검증 |
| **BFF** (`apps/api`) | 비즈니스 라우트, SQLite 아웃박스, AI 비서. Bearer는 **HS256**(내부) 또는 **JWKS**(OIDC)로 검증 |

## BFF OIDC (리소스 서버)

환경 변수로 활성화합니다.

| 변수 | 설명 |
|------|------|
| `JWKS_URI` | IdP JWKS URL (예: `https://issuer/.well-known/jwks.json`) |
| `JWT_ISSUER` | 토큰 `iss` |
| `JWT_AUDIENCE` | (선택) 토큰 `aud` — 미설정 시 audience 검증 생략 |

`Authorization: Bearer`가 오면 **먼저** `JWT_SECRET`이 있으면 HS256으로 시도하고, 실패 시 또는 `JWT_SECRET` 없이 `JWKS_URI`+`JWT_ISSUER`가 있으면 [oidcJwt.ts](../../apps/api/src/oidcJwt.ts)로 RS256 등 검증합니다.

`X-BFF-Key`는 기존과 동일하게 m2m·서버 간 호출에 사용할 수 있습니다.

## OAuth2 Client Credentials (m2m)

- 게이트웨이 또는 전용 Authorization Server에서 **클라이언트 자격 증명**으로 액세스 토큰을 발급합니다.
- 토큰이 **JWT**이고 IdP JWKS로 검증 가능하면 위 OIDC 경로와 동일합니다.
- **불투명(opaque) 토큰**인 경우: 게이트웨이에서 검증 후 BFF에는 `X-BFF-Key` 또는 내부 네트워크에서만 HS256을 사용하는 패턴을 권장합니다.

## 권장 배치

1. 인터넷 → 게이트웨이(OIDC + CC) → (VPC) → BFF.
2. BFF는 프로덕션에서 `BFF_API_KEY`/`JWT_SECRET`/`JWKS` 중 최소 하나로 보호.
3. ERP·웹훅은 [SECURITY_RUNBOOK.md](./SECURITY_RUNBOOK.md)의 HMAC·방화벽 정책을 유지합니다.
