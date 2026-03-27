# 플랫폼 거버넌스 (보안 · m2m · 감사)

## 인증

- **사용자**: OIDC (Yuaimarketing IdP). `tenant_id` 클레임 필수.
- **서비스 간**: OAuth2 Client Credentials 또는 mTLS + 짧은 토큰. 스코프 예: `mart:video:write`, `erp:finance:post`, `crm:read`.

## 이벤트 버스

- 최소 한 번(at-least-once) 전달 가정. 소비자 **멱등 키** = `(event_id, consumer)`.
- PII는 이벤트 본문에 넣지 말고 `reference_id`만.

## 감사 로그 (필수 필드)

| 필드 | 설명 |
|------|------|
| `audit_id` | ULID |
| `tenant_id` | |
| `actor` | `user_id` 또는 `client_id` |
| `action` | `tool.invoke` / `event.publish` |
| `resource` | URI 패턴 |
| `trace_id` | 분산 추적 |

## 규정

- 지역별 컴플라이언스(예: 마케팅 동의)는 CRM `consent` 레코드와 연동.
