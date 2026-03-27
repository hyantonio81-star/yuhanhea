# Supabase 키·자료 핸드오프 (Yuaimarketing · Suite 배포)

Yuaimarketing 팀이 **Supabase 프로젝트를 소유·관리**하는 경우, 통합 배포를 위해 **어떤 자료를 넘겨야 하는지**와 **절대 공유하면 안 되는 방식**을 정리합니다.

## 결론: 넘겨야 하나요?

| 상황 | 조치 |
|------|------|
| **Supabase를 Yuhan Suite BFF가 쓰게 할 예정** (Postgres 연동·감사·아웃박스 등) | **예.** DB 연결 정보와(필요 시) JWT 검증용 비밀은 **BFF를 운영하는 쪽(DevOps/백엔드)**에게 **비밀 채널**로 전달합니다. |
| **랜딩·마케팅 사이트만** Supabase(예: Auth·Edge)를 쓰고, Suite 웹은 BFF만 호출 | 랜딩용 **anon 키 등은 랜딩 호스팅(Vercel 등)에만** 두고, **Suite BFF에는 이 레포가 요구하는 BFF용 시크릿만** 별도로 합의합니다. |
| **아직 SQLite만 쓰는 BFF** ([`DEPLOY_SUPABASE_VERCEL.md](./DEPLOY_SUPABASE_VERCEL.md) 전환 전) | Supabase 키 **필수는 아님**. 전환 시점에 아래 표를 기준으로 전달하면 됩니다. |

**Git·슬랙 일반 채널·이메일 본문에 연결 문자열/키를 붙여 넣지 마세요.** 1Password·Vault·클라우드 시크릿 매니저·암호화된 티켓 등 팀 표준 채널만 사용합니다.

---

## 넘겨줄 자료 체크리스트 (BFF ↔ Supabase Postgres 연동 시)

아래는 **Supabase 대시보드** 또는 프로젝트 관리자가 **수신자(BFF 배포 담당)**에게 넘기는 항목입니다.

| 자료 | 용도 | 받는 쪽 / 저장 위치 |
|------|------|---------------------|
| **Postgres 연결 문자열 (Transaction 또는 Pooler)** | BFF가 DB에 접속 | **BFF 호스팅** 환경 변수만 (`DATABASE_URL` 또는 `SUPABASE_DB_URL`). [풀러(6543) 권장](https://supabase.com/docs/guides/database/connecting-to-postgres). |
| **프로젝트 ref / 리전** | 지원·방화벽·문서 기록 | 내부 위키 또는 인프라 이슈(비밀 아님). |
| **(선택) 스키마 적용** | [`supabase-schema-draft.sql`](./supabase-schema-draft.sql) 등 | SQL Editor 실행 결과 또는 마이그레이션 저장소 접근 — **코드 리뷰로** 공유 가능. |

### Supabase Auth를 BFF에서 검증할 때 추가로

| 자료 | 용도 | 저장 위치 |
|------|------|-----------|
| **JWT Secret** (Settings → API → JWT Secret) | HS256 Bearer 검증 | **BFF만** (`JWT_SECRET` 등 — [`staging.env.example`](./templates/staging.env.example) 참고). |
| 또는 **JWKS URL·issuer·audience** | OIDC/JWKS 검증 | **BFF만** — [`GATEWAY_OIDC.md`](./GATEWAY_OIDC.md). |

---

## 웹(Vercel `apps/web`)에 넣으면 안 되는 것

| 비밀 | 이유 |
|------|------|
| **service_role** 키 | RLS 우회·전 권한. 브라우저 번들·`VITE_*`에 넣으면 유출 시 치명적. |
| **Postgres 비밀번호가 포함된 DB URL** | DB 직접 접속 — **BFF 서버 전용**. |
| **JWT Secret (서명 검증용)** | 토큰 위조 가능 — **BFF 서버 전용**. |

웹 빌드에 쓰는 것은 보통 **`VITE_SUITE_BFF_BASE`**(공개 BFF URL)뿐입니다. 선택 링크용 **`VITE_SUITE_YUAI_URL`**도 공개 URL이면 문제 없습니다. 자세한 조합은 [`templates/vercel-supabase.env.example`](./templates/vercel-supabase.env.example)를 참고하세요.

### `anon` 공개 키는?

- **이 레포의 권장 아키텍처**는 브라우저 → **BFF** → DB이므로, Suite 웹에 **Supabase `anon`을 필수로 넣지는 않습니다.**
- **Yuaimarketing 랜딩/별도 SPA**가 Supabase 클라이언트로 **직접** Auth·Realtime을 쓴다면, 그 앱의 호스팅 설정에만 `anon`을 두고, **같은 키를 Suite BFF 서버에 굳이 복사할 필요는 없습니다.**

---

## 역할 정리 (누가 무엇을 주는지)

1. **Yuaimarketing / 플랫폼**: Supabase 프로젝트 생성, RLS·정책, 연결 정보를 **BFF 담당에게 안전하게 전달**.  
2. **DevOps / BFF 담당**: 연결 문자열·JWT 관련 비밀을 호스팅 시크릿에만 주입, 로테이션 절차 합의.  
3. **프론트 담당**: Vercel에는 **공개 URL·비민감 설정만**; 키 요청 시 “BFF 담당 경유” 원칙 — [`GOVERNANCE_OPERATIONS.md`](./GOVERNANCE_OPERATIONS.md).

---

## 관련 문서

- [DEPLOY_SUPABASE_VERCEL.md](./DEPLOY_SUPABASE_VERCEL.md) — 토폴로지·순서  
- [SECURITY_IMPROVEMENT_PLAN.md](./SECURITY_IMPROVEMENT_PLAN.md) — C2 시크릿·번들 금지  
- [STAKEHOLDER_REVIEW_CHECKLIST.md](./STAKEHOLDER_REVIEW_CHECKLIST.md) — URL·시크릿 합의
