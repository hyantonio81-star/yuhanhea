# 통합 베이스 준비 체크리스트 (1.1 ~ 1.6)

기획서 §1과 동일 번호 체계입니다. 완료 시 내부 위키 또는 PR에 링크합니다.

| # | 영역 | 산출물·도구 |
|---|------|-------------|
| **1.1** | 조직·거버넌스 | [GOVERNANCE_OPERATIONS.md](./GOVERNANCE_OPERATIONS.md), [SPEC_VERSION.md](./SPEC_VERSION.md), [.github/CODEOWNERS](../../.github/CODEOWNERS) |
| **1.2** | 마스터데이터·식별자 | [master-data-glossary.md](./master-data-glossary.md), [schema-inventory.md](./schema-inventory.md), [PRODUCT_CONNECTION_CHECKLIST.md](./PRODUCT_CONNECTION_CHECKLIST.md) |
| **1.3** | 이벤트·메시지 | [events-catalog.md](./events-catalog.md), [asyncapi-events.yaml](./asyncapi-events.yaml), [ASYNCAPI_ALIGNMENT.md](./ASYNCAPI_ALIGNMENT.md) |
| **1.4** | 보안·인증 | [SECURITY_RUNBOOK.md](./SECURITY_RUNBOOK.md), [templates/staging.env.example](./templates/staging.env.example) |
| **1.5** | 네트워크·운영 | [NETWORK_AND_SLA.md](./NETWORK_AND_SLA.md) |
| **1.6** | 품질·검증 | [CONTRACT_TESTING.md](./CONTRACT_TESTING.md), `npm run verify:contract`, `npm run smoke:bff`, `npm run smoke:e2e` |

다음 단계(기획 §4): 스테이징 E2E는 [STAGING_E2E.md](./STAGING_E2E.md), 통합 후 과제는 [ROADMAP_POST_INTEGRATION.md](./ROADMAP_POST_INTEGRATION.md).
