# 앱·폴더 건강도와 라우트 등급

모노레포에서 **무엇이 자동으로 검증되는지**와 **페이지 우선순위(P0/P1/P2)** 를 한눈에 정리합니다. 배포·Vercel·BFF는 [DEPLOY_SUPABASE_VERCEL.md](./DEPLOY_SUPABASE_VERCEL.md), [VERCEL_ENV_SETUP.md](./VERCEL_ENV_SETUP.md)를 참고합니다.

## 폴더별 검증 매트릭스

| 영역 | 경로 | CI/스크립트 |
|------|------|-------------|
| 웹 정적 검증 | `apps/web` | `npm run verify -w web` → i18n·nav↔router·`verify-stitch-exports.mjs` |
| 웹 빌드 | `apps/web` | `npm run build -w web` (`tsc` + Vite) |
| 웹 E2E | `apps/web/e2e` | `npm run e2e -w web` — `smoke.spec.ts`, `p0-nav-core.spec.ts`, `route-crawl.spec.ts`(전 라우트) |
| BFF | `apps/api` | `npm run build` 후 기동 시 `npm run smoke:bff` (루트) |
| 계약 | `scripts/verify-contract.mjs` | OpenAPI ↔ BFF manifest |
| 보안 의존성 | `scripts/security-check.mjs` | `npm run security:check` |

## 페이지 등급

| 등급 | 의미 | 대표 경로 | 테스트 |
|------|------|-----------|--------|
| **P0** | `VITE_NAV_SURFACE=core` 사이드바·출시 필수 | [`navCorePaths.ts`](../../apps/web/src/app/navCorePaths.ts) 목록 | [`p0-nav-core.spec.ts`](../../apps/web/e2e/p0-nav-core.spec.ts) |
| **P1** | 전체 내비 노출·Stitch 참고 UI | `nav.ts` 나머지 | [`route-crawl.spec.ts`](../../apps/web/e2e/route-crawl.spec.ts) (HTTP 200 + 콘솔/pageerror 없음) |
| **P2** | 직접 URL·실험적 | 동일 | 크롤에 포함; 깊은 비즈니스 assert는 미포함 |

## Stitch 청크

- 공용 레이아웃: [`StitchPageShell.tsx`](../../apps/web/src/pages/stitch/StitchPageShell.tsx)
- 페이지 구현: [`apps/web/src/pages/stitch/chunks/`](../../apps/web/src/pages/stitch/chunks/) (`stitchChunk0` … `stitchChunk5`)
- Lazy 연결: [`stitchLazyPages.ts`](../../apps/web/src/app/lazy/stitchLazyPages.ts) (`stitchLazyFrom` + 동적 `import()`)
- 재분할(필요 시): `node apps/web/scripts/split-extrapages-to-chunks.mjs` (원본 단일 `ExtraPages`가 있을 때만)

## 워크플로

- **CI** ([`.github/workflows/ci.yml`](../../.github/workflows/ci.yml)): install, `security:check`, `verify`, `build`, BFF 스모크(기동 후 `smoke:bff`).
- **E2E** ([`.github/workflows/e2e.yml`](../../.github/workflows/e2e.yml)): Playwright 전 스펙(크롤 포함), 수동 실행 `workflow_dispatch` 가능.
