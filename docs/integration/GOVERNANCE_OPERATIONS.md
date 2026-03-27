# 통합 운영 거버넌스 (오너 · 환경 · 시크릿 · 문서–코드 동기화)

이 문서는 Yuhan Suite 통합 **사전 준비** 중 조직이 확정해야 할 규칙입니다. 구현 코드는 [apps/api](../../apps/api) BFF 및 [docs/integration](./) 명세와 함께 관리합니다.

## 1. 역할 (RACI 요약)

| 영역 | Responsible | Accountable | Consulted | Informed |
|------|-------------|-------------|-----------|----------|
| BFF 라우트·스키마 변경 | 플랫폼/백엔드 | 통합 오너 (아래) | CRM·Mart·ERP 담당 | 전 제품 |
| OpenAPI / 이벤트 카탈로그 개정 | 통합 오너 | 아키텍트 또는 헤드 오브 엔지니어링 | 제품 PO | 릴리즈 매니저 |
| 시크릿·키 회전 | DevOps / SRE | 보안 책임자 | BFF 담당 | 감사 |

**통합 오너 (Integration Owner)**: 한 명을 지정하고, 대리인(backup) 1명을 둡니다. GitHub `CODEOWNERS` 또는 내부 위키에 공개합니다.

## 2. 환경 분리

| 환경 | 용도 | BFF Base URL 예 | 비고 |
|------|------|-----------------|------|
| dev | 로컬·기능 개발 | `http://127.0.0.1:8787` | SQLite `data/suite.db`, 시크릿 비권장 |
| staging | 계약 검증·E2E | `https://suite-api-staging.example.com` | 프로덕션과 동일 인증 모드 권장 |
| prod | 실거래 | 게이트웨이 뒤 단일 진입점 | 감사·아웃박스 보존 정책 준수 |

- 프론트엔드: `VITE_SUITE_BFF_BASE`는 환경별 `.env`로만 주입(저장소에 실 URL·키 커밋 금지).
- 문서의 `servers.url` ([openapi-yuhan-suite.yaml](./openapi-yuhan-suite.yaml))은 **예시**이며, 배포 후 실제 호스트로 교체하거나 환경 변수로 치환합니다.

## 3. 시크릿 보관

| 비밀 | 용도 | 보관 위치 (권장) |
|------|------|-------------------|
| `BFF_API_KEY` | 서버 간 `X-BFF-Key` | Vault / GitHub Actions secrets / 클라우드 시크릿 매니저 |
| `JWT_SECRET` | HS256 Bearer (BFF) | 동상 |
| `GEMINI_API_KEY` / `OPENAI_API_KEY` | AI 비서 | 동상, 개발 전용 키 분리 |
| DB·ERP 연결 문자열 | 향후 확장 | 프로덕션 전용 스토어 |

**회전**: `BFF_API_KEY`·`JWT_SECRET`은 분기 1회 이상 검토. 이중 키 허용 기간(overlap)을 두고 교체합니다.

## 4. 문서–코드 동기화 규칙

1. **단일 소스 우선**: 공개 계약은 [openapi-yuhan-suite.yaml](./openapi-yuhan-suite.yaml)과 [events-catalog.md](./events-catalog.md)에 먼저 반영합니다.
2. **BFF 변경 시**: 동일 PR에 OpenAPI 경로/응답 코드를 갱신하거나, 후속 PR을 **48시간 이내**로 제한합니다.
3. **버전**: [SPEC_VERSION.md](./SPEC_VERSION.md)의 통합 스펙 버전을 올립니다 (의미적 버전: 문서만 패치면 patch, 경로 추가/삭제면 minor).
4. **검증**: 루트 `npm run verify:contract`가 OpenAPI에 선언된 경로와 BFF 구현 목록의 정합성을 검사합니다 (자동화).

## 5. 릴리즈 체크리스트 (통합 영향 시)

- [ ] OpenAPI·AsyncAPI·events-catalog diff 검토
- [ ] `npm run verify:contract` 통과
- [ ] 스테이징에서 `scripts/smoke-bff.mjs` (또는 동등 스모크) 통과
- [ ] (분기) 감사 백업: 루트 `npm run export:audit` → [AUDIT_ARCHIVING.md](./AUDIT_ARCHIVING.md)
- [ ] 마이그레이션/다운타임 공지 (아웃박스·ERP 웹훅 소비자에게)

## 6. 프론트 `mockBus` (로컬 전용)

[apps/web/src/integration/mockBus.ts](../../apps/web/src/integration/mockBus.ts)는 브라우저 내 데모·개발용입니다. **스테이징·프로덕션**에서는 BFF·아웃박스·실제 버스를 신뢰 소스로 두고, 동일 이벤트는 서버에서 발행합니다.

## 7. 참고

- 보안·m2m 원칙: [governance.md](./governance.md)
- 스테이징 E2E: [STAGING_E2E.md](./STAGING_E2E.md)
