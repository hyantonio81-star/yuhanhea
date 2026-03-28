# Vercel 환경 설정 (Yuhan Mart 웹)

저장소: [hyantonio81-star/yuhanhea](https://github.com/hyantonio81-star/yuhanhea) 기준. SPA는 `apps/web`, BFF는 **별도 호스팅**입니다 ([DEPLOY_SUPABASE_VERCEL.md](./DEPLOY_SUPABASE_VERCEL.md)).

## 1. Vercel 프로젝트 연결

1. [Vercel Dashboard](https://vercel.com/dashboard) → **Add New… → Project** → GitHub에서 `yuhanhea` 선택.
2. **Root Directory**  
   - **권장:** 비워 두거나 **`.`** (저장소 루트). 루트의 [`vercel.json`](../../vercel.json)이 `npm run build -w web`과 `apps/web/dist`를 사용합니다.  
   - **대안:** `apps/web`만 쓸 경우 Root를 `apps/web`로 두고, Framework **Vite**, Output **dist**, Build `npm run build` — 이 경우 루트 `vercel.json`은 무시되고 [`apps/web/vercel.json`](../../apps/web/vercel.json)이 적용됩니다.
3. **Settings → General → Framework Settings**  
   - **Output Directory**에는 **폴더 경로만** 넣습니다. `dist, npm run build`처럼 빌드 명령을 붙이면 안 됩니다(존재하지 않는 디렉터리로 인식되어 404·빈 배포가 납니다).  
   - Root가 **`.`**이면 Output은 **`apps/web/dist`**. Root가 **`apps/web`**이면 Output은 **`dist`**만.  
   - 빌드 명령은 **Build Command** override 또는 루트 [`vercel.json`](../../vercel.json)의 `buildCommand`에서만 지정합니다.

## 2. Environment Variables (대시보드)

**Settings → Environment Variables**에서 추가합니다.  
**Production**과 **Preview**를 나누는 것을 권장합니다 (Preview가 프로덕션 BFF/DB를 치지 않도록).

| 변수 | 환경 | 필수 | 설명 |
|------|------|------|------|
| `VITE_SUITE_BFF_BASE` | Production | **권장** | 배포된 BFF 공개 URL. **끝에 `/api` 없이** 베이스만 (예: `https://your-bff.fly.dev`). 클라이언트가 `/api/v1/...`를 붙입니다. |
| `VITE_SUITE_BFF_BASE` | Preview | 선택 | 스테이징 BFF URL 또는 비워 두면 Suite 폼이 BFF 없이 mockBus만 사용할 수 있음. |
| `VITE_SUITE_YUAI_URL` | 둘 다 | 선택 | Yuaimarketing/랜딩 **공개** URL — 새 탭 링크용. |
| `VITE_SUITE_CRM_URL` | 선택 | 선택 | 외부 CRM 링크. |
| `VITE_SUITE_ERP_URL` | 선택 | 선택 | 외부 ERP 링크. |
| `VITE_AI_SECURITY_MODE` | 둘 다 | 선택 | `monitoring`(기본) 또는 `off` — AI 보안 허브 라벨. |
| `VITE_SECURITY_UPDATES_FEED_URL` | 선택 | 선택 | 비민감 JSON (동일 출처 프록시 URL 권장). |
| `VITE_NAV_SURFACE` | 선택 | 선택 | `full`(기본) 또는 `core` — 사이드바 출시용 축소. |
| `VITE_SUITE_BFF_KEY` | **비권장** | — | `BFF_API_KEY`를 브라우저 번들에 넣음. **프로덕션에서는 사용하지 않는 것이 좋음.** |
| `VITE_SUITE_BFF_JWT` | 선택 | — | 짧은 만료 JWT만 검토. 장기 토큰·서비스 계정 JWT는 금지. |
| `VITE_SUITE_BFF_ADMIN_KEY` | **비권장** | — | 관리 API 키를 번들에 넣지 말 것. 내부망·별도 인증 권장. |

**Supabase `service_role` / DB URL / JWT Secret**은 Vercel **웹**이 아니라 **BFF 호스팅** 쪽 Secrets에만 넣습니다 ([SUPABASE_KEYS_HANDOFF.md](./SUPABASE_KEYS_HANDOFF.md)).

## 3. BFF 쪽 맞춤 설정 (CORS)

브라우저에서 `VITE_SUITE_BFF_BASE`로 BFF를 호출하므로, BFF에 다음을 설정합니다.

- `BFF_CORS_ORIGINS`: Vercel 프로덕션·프리뷰 도메인을 쉼표로 나열  
  - 예: `https://yuhanhea.vercel.app,https://yuhanhea-xxx.vercel.app`  
- 자세한 설명: [DEPLOY_SUPABASE_VERCEL.md](./DEPLOY_SUPABASE_VERCEL.md), [templates/staging.env.example](./templates/staging.env.example).

## 4. 배포 후 확인

- 브라우저에서 Suite 화면 동작, 네트워크 탭에서 `/api/v1/...`가 **올바른 BFF 호스트**로 나가는지 확인.
- 루트에서 로컬과 동일 검증: `npm run verify`, (선택) `npm run e2e`.

## 5. 관련 파일

- [`apps/web/.env.example`](../../apps/web/.env.example) — 변수 이름 참고  
- [`apps/web/vercel.json`](../../apps/web/vercel.json) — SPA 폴백  
- [`vercel.json`](../../vercel.json) — 모노레포 루트 배포용

## 6. 빌드 실패: `Cannot find module '@rolldown/binding-linux-x64-gnu'`

Vite **8**은 Rolldown과 Linux용 **optional** 네이티브 패키지에 의존합니다. Vercel의 `npm ci` 환경에서 optional 의존성이 빠지는 경우가 있어(로그에 언급되는 npm 이슈) 빌드가 실패할 수 있습니다.

이 저장소는 **Vite 6**과 `@vitejs/plugin-react` **4.x**로 고정해 Rollup 기반 빌드를 쓰며, 위 오류를 피합니다. Vite 8로 올릴 때는 `npm`/`pnpm` 버전·install 플래그 또는 Rolldown 바인딩을 명시적으로 끌어오는 방식을 별도로 검증해야 합니다.
