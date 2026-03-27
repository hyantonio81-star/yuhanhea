# Yuhan Suite 앱 간 연계·개선 — Executive Brief

경영·PO·인프라·제품이 동일한 그림을 보도록 **연계 기능**, **데이터·보안**, **로드맵**, **운영 액션**을 한 문서로 묶었습니다. 세부 명세는 링크를 따릅니다.

## 1. 비전·범위

- **대상 제품**: Yuaimarketing · Yuhan Mart · Yuhan CRM · Yuhan ERP.
- **역할**: Yuaimarketing이 **오케스트레이션 허브**; 기술적 **단일 API 진입점**은 BFF [`apps/api`](../../apps/api) (`/api/v1`).
- **프론트**: [`apps/web`](../../apps/web)의 `/suite/*` 및 [`apps/web/src/integration`](../../apps/web/src/integration)이 BFF·데모 이벤트 버스와 대응.
- **비동기**: SQLite `outbox`, 선택적 웹훅·미러 URL. 상세는 [events-catalog.md](./events-catalog.md), [NETWORK_AND_SLA.md](./NETWORK_AND_SLA.md).

## 2. 현재 연계 기능 (요약)

| 제품·영역 | 연계 내용 | 근거 |
|-----------|-----------|------|
| Yuaimarketing | 캠페인 브리프 발행 → `CampaignBriefPublished` | `POST /campaigns/:campaignId/briefs` |
| Yuhan Mart | 영상 잡 생성·완료 → `VideoJobQueued` / `VideoJobCompleted` | `POST`·`PATCH /video-jobs` |
| Yuhan CRM | 로컬 마켓 인사이트, 옵트인 리마인더 | `GET /crm/local-markets/...`, `POST /crm/reminders` |
| Yuhan ERP | 마케팅 스펜드·AP 배치 | `POST /erp/finance/spend-commit`, `POST /erp/finance/payouts` |
| 공통 | 감사·아웃박스 이벤트 조회 | `GET /audit`, `GET /events` |
| AI 비서 | 세션·도구·고위험 도구 승인 큐 | `POST /assistant/sessions`, tool-approvals, 웹 `/suite/tool-approvals` |
| 운영 | DLQ 재처리 | `POST /admin/outbox/:id/retry` |

전체 REST 목록: [bff-routes-manifest.json](../../scripts/bff-routes-manifest.json), [openapi-yuhan-suite.yaml](./openapi-yuhan-suite.yaml).

## 3. 데이터·이벤트

- 마스터데이터·식별자: [master-data-glossary.md](./master-data-glossary.md), [schema-inventory.md](./schema-inventory.md).
- 도메인 이벤트·재시도: [events-catalog.md](./events-catalog.md), AsyncAPI [asyncapi-events.yaml](./asyncapi-events.yaml), [ASYNCAPI_ALIGNMENT.md](./ASYNCAPI_ALIGNMENT.md).
- 제품별 최소 연결 확인표: [PRODUCT_CONNECTION_CHECKLIST.md](./PRODUCT_CONNECTION_CHECKLIST.md).

## 4. 보안·컴플라이언스

- 인증·웹훅·관리 API·구조화 로그: [SECURITY_RUNBOOK.md](./SECURITY_RUNBOOK.md).
- OIDC·게이트웨이·m2m: [GATEWAY_OIDC.md](./GATEWAY_OIDC.md).
- 감사 로그 아카이빙·내보내기: [AUDIT_ARCHIVING.md](./AUDIT_ARCHIVING.md).
- 거버넌스·시크릿·릴리즈: [GOVERNANCE_OPERATIONS.md](./GOVERNANCE_OPERATIONS.md).

## 5. 로드맵 (우선순위)

요약은 아래와 같으며, 상세·구현 링크는 [ROADMAP_POST_INTEGRATION.md](./ROADMAP_POST_INTEGRATION.md)를 따릅니다.

| 단계 | 한 줄 요약 |
|------|------------|
| P0 | 관측(`trace_id`)·아웃박스 실패 알림·멱등·추적 가이드 |
| P1 | DLQ 재처리 API·웹훅 HMAC·`OUTBOX_MIRROR_URL` |
| P2 | OIDC/JWKS·AI 고위험 도구 승인 큐·감사 `export-audit` |
| P3 | 테넌트 강제·읽기 복제·캐시·모바일 푸시 방향 |

**분기 계획**: P0~P1만 분기 초에 확정하고, P2는 트래픽·컴플라이언스에 따라 재정렬 ([ROADMAP_POST_INTEGRATION.md](./ROADMAP_POST_INTEGRATION.md) 원문).

## 5.1 배포 (Supabase · Vercel)

- 웹은 Vercel, DB는 Supabase Postgres, BFF는 **항상-on 호스팅** 권장: [DEPLOY_SUPABASE_VERCEL.md](./DEPLOY_SUPABASE_VERCEL.md)
- 보안 단계 계획: [SECURITY_IMPROVEMENT_PLAN.md](./SECURITY_IMPROVEMENT_PLAN.md)

## 6. 운영 체크리스트 (배포 후)

- 계약 검증: 저장소 루트 `npm run verify` (웹·OpenAPI↔BFF).
- 스모크: `npm run smoke:bff` — [CONTRACT_TESTING.md](./CONTRACT_TESTING.md), [STAGING_E2E.md](./STAGING_E2E.md).
- E2E(로컬): BFF 기동 후 `npm run smoke:e2e`.
- 감사 백업: `npm run export:audit`(루트 `package.json`에서 워크스페이스 스크립트 호출).
- 웹·BFF URL 정합: `VITE_SUITE_BFF_BASE`는 [templates/staging.env.example](./templates/staging.env.example)와 실제 BFF 호스트를 일치.

## 7. 열린 과제 (저장소 밖)

실제 스테이징·프로덕션 URL, ERP 방화벽, Slack 등 알림 채널, Kafka 등 메시지 브로커는 인프라·보안·ERP 팀과 합의합니다. 담당·일정·합의 여부는 [STAKEHOLDER_REVIEW_CHECKLIST.md](./STAKEHOLDER_REVIEW_CHECKLIST.md)를 사용합니다.

---

**베이스 준비 1.1~1.6**: [INTEGRATION_BASE_CHECKLIST_1_6.md](./INTEGRATION_BASE_CHECKLIST_1_6.md).
