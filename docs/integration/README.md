# Yuhan Suite 통합 (Yuaimarketing 허브)

이 폴더는 **Yuaimarketing · Yuhan Mart · Yuhan CRM · Yuhan ERP** 간 통합을 위한 마스터데이터·이벤트·API·거버넌스 명세의 **구현 가능한 기준선**입니다. 앱 내 `/suite/*` 화면과 `apps/web/src/integration` 코드와 대응합니다.

**스펙 버전**: [SPEC_VERSION.md](./SPEC_VERSION.md)

**한눈에 보기(기획 요약)**: [YUHAN_SUITE_INTEGRATION_EXECUTIVE_BRIEF.md](./YUHAN_SUITE_INTEGRATION_EXECUTIVE_BRIEF.md) · 이해관계자 합의용 [STAKEHOLDER_REVIEW_CHECKLIST.md](./STAKEHOLDER_REVIEW_CHECKLIST.md)

| 문서 | 내용 |
|------|------|
| [YUHAN_SUITE_INTEGRATION_EXECUTIVE_BRIEF.md](./YUHAN_SUITE_INTEGRATION_EXECUTIVE_BRIEF.md) | 연계·개선 Executive Brief |
| [STAKEHOLDER_REVIEW_CHECKLIST.md](./STAKEHOLDER_REVIEW_CHECKLIST.md) | P0~P1·URL·시크릿 합의 체크리스트 |
| [INTEGRATION_BASE_CHECKLIST_1_6.md](./INTEGRATION_BASE_CHECKLIST_1_6.md) | §1.1~1.6 베이스 준비 체크리스트 |
| [PRODUCT_CONNECTION_CHECKLIST.md](./PRODUCT_CONNECTION_CHECKLIST.md) | 4제품 최소 연결 확인 (1.2) |
| [ASYNCAPI_ALIGNMENT.md](./ASYNCAPI_ALIGNMENT.md) | AsyncAPI ↔ 이벤트 카탈로그 (1.3) |
| [NETWORK_AND_SLA.md](./NETWORK_AND_SLA.md) | 방화벽·웹훅·`OUTBOX_MIRROR_URL`·SLA 초안 (1.5) |
| [templates/staging.env.example](./templates/staging.env.example) | 스테이징 env 템플릿 (1.4) |
| [templates/vercel-supabase.env.example](./templates/vercel-supabase.env.example) | Vercel·Supabase·BFF 조합 env 참고 |
| [GOVERNANCE_OPERATIONS.md](./GOVERNANCE_OPERATIONS.md) | 통합 오너·환경·시크릿·문서–코드 동기화 |
| [SPEC_VERSION.md](./SPEC_VERSION.md) | 통합 스펙 시맨틱 버전 |
| [CONTRACT_TESTING.md](./CONTRACT_TESTING.md) | OpenAPI↔BFF 계약 검증·스모크 |
| [SECURITY_RUNBOOK.md](./SECURITY_RUNBOOK.md) | JWT·API Key·관리 API·구조화 로그·m2m·ERP 방화벽 |
| [STAGING_E2E.md](./STAGING_E2E.md) | 스테이징 아웃박스·웹훅 E2E |
| [ROADMAP_POST_INTEGRATION.md](./ROADMAP_POST_INTEGRATION.md) | 통합 후 개선 우선순위 |
| [GATEWAY_OIDC.md](./GATEWAY_OIDC.md) | 게이트웨이 · OIDC · m2m |
| [AUDIT_ARCHIVING.md](./AUDIT_ARCHIVING.md) | 감사 로그 아카이빙 |
| [P3_SCALE_AND_OPERATIONS.md](./P3_SCALE_AND_OPERATIONS.md) | P3 규모·멀티 리전·푸시 |
| [DEPLOY_SUPABASE_VERCEL.md](./DEPLOY_SUPABASE_VERCEL.md) | Supabase · Vercel 배포 토폴로지 |
| [VERCEL_ENV_SETUP.md](./VERCEL_ENV_SETUP.md) | Vercel 대시보드·환경 변수·Root Directory |
| [APP_HEALTH_AND_ROUTES.md](./APP_HEALTH_AND_ROUTES.md) | 폴더·CI 검증 매트릭스·P0/P1/P2 라우트·Stitch 청크 |
| [SUPABASE_KEYS_HANDOFF.md](./SUPABASE_KEYS_HANDOFF.md) | Yuaimarketing·Supabase 키/자료 누구에게·어떻게 넘길지 |
| [POSTGRES_MIGRATION_BACKLOG.md](./POSTGRES_MIGRATION_BACKLOG.md) | BFF SQLite→Postgres 이전 단계(백로그) |
| [SECURITY_IMPROVEMENT_PLAN.md](./SECURITY_IMPROVEMENT_PLAN.md) | Supabase/Vercel 전제 보안 개선 단계 |
| [AI_ANTIVIRUS_AND_SECURITY_UPDATES.md](./AI_ANTIVIRUS_AND_SECURITY_UPDATES.md) | AI 보안(다층 방어)·보안 업데이트 기획 |
| [supabase-schema-draft.sql](./supabase-schema-draft.sql) | BFF용 Postgres 초안 (Supabase) |
| [master-data-glossary.md](./master-data-glossary.md) | 공통 ID·용어·소유권 |
| [schema-inventory.md](./schema-inventory.md) | 4제품 스키마 인벤토리 |
| [events-catalog.md](./events-catalog.md) | 도메인 이벤트·재시도 |
| [openapi-yuhan-suite.yaml](./openapi-yuhan-suite.yaml) | BFF/연동 REST |
| [asyncapi-events.yaml](./asyncapi-events.yaml) | 비동기 이벤트 채널 초안 |
| [governance.md](./governance.md) | m2m·감사·보안 원칙 |
| [crm-mobile-assistant.md](./crm-mobile-assistant.md) | 로컬 CRM·모바일·AI 비서 |
| [erp-finance-mapping.md](./erp-finance-mapping.md) | Spend·COA·전표 매핑 |

## 배포 후 운영 점검

- 감사 JSONL: 저장소 루트에서 `npm run export:audit`
- 스모크: 스테이징 BFF에 대해 `npm run smoke:bff` / 로컬 E2E는 `npm run smoke:e2e` ([STAGING_E2E.md](./STAGING_E2E.md))
- 웹: `VITE_SUITE_BFF_BASE`를 BFF 공개 URL과 맞춤 ([templates/staging.env.example](./templates/staging.env.example))
