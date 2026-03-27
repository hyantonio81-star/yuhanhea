# 계약 검증 (OpenAPI · BFF · 스모크)

## 자동 검증: `verify:contract`

저장소 루트에서 다음을 실행합니다.

```bash
npm run verify:contract
```

[scripts/verify-contract.mjs](../../scripts/verify-contract.mjs)는 [openapi-yuhan-suite.yaml](./openapi-yuhan-suite.yaml)에 선언된 **경로 키**가 [apps/api](../../apps/api) BFF에 구현된 라우트 집합과 일치하는지 검사합니다. OpenAPI에 경로를 추가·삭제하면 **같은 PR**에서 `scripts/bff-routes-manifest.json`을 갱신합니다.

## PR 체크리스트

1. OpenAPI `paths` 변경 시 `bff-routes-manifest.json` 동기화.
2. `npm run verify:contract` 로컬 통과.
3. (선택) [schemathesis](https://schemathesis.readthedocs.io/) 등으로 스테이징 URL에 대해 프로퍼티 기반 테스트 — CI 연동은 팀 인프라에 맞게 추가.

## 멱등 키 (클라이언트 재시도)

`POST` 중 [idempotencyHttp.ts](../../apps/api/src/idempotencyHttp.ts)가 적용된 경로(예: `spend-commit`, `crm/reminders`, `video-jobs`, 브리프 발행)는 다음을 따릅니다.

1. **헤더**: 동일 요청 재시도 시 `Idempotency-Key`에 **고유 문자열**(UUID 등)을 넣고, **요청 본문**이 첫 시도와 바이트 단위로 동일해야 합니다.
2. **응답**: 캐시 히트 시 `X-Idempotent-Replay: true`와 이전 응답 본문이 반환됩니다.
3. **운영**: 타임아웃·5xx 후 재시도할 때 키를 **재사용**하고, 성공(2xx) 후에는 새 비즈니스 요청에 **새 키**를 씁니다.

## 추적 ID

요청에 `X-Trace-Id`를 넣으면 BFF가 그대로 사용하고, 없으면 생성해 응답 헤더 `X-Trace-Id`로 돌려줍니다. 감사 로그·구조화 로그([SECURITY_RUNBOOK.md](./SECURITY_RUNBOOK.md))의 `trace_id`와 맞춥니다.

## AsyncAPI

[asyncapi-events.yaml](./asyncapi-events.yaml)는 이벤트 채널 초안입니다. 실제 브로커 선택 후 **스키마 ID**를 이벤트 카탈로그와 맞춥니다. BFF 아웃박스 페이로드와의 필드 정합성은 분기별 수동 리뷰 또는 샘플 이벤트 스냅샷 테스트로 검증합니다.

## 스모크 테스트

인증 없이 가능한 엔드포인트를 대상으로 [scripts/smoke-bff.mjs](../../scripts/smoke-bff.mjs)를 사용합니다.

```bash
set BFF_BASE=http://127.0.0.1:8787
npm run smoke:bff
```

스테이징·프로덕션에서는 `BFF_BASE`와 필요 시 `X-BFF-Key` / `Authorization` 헤더를 환경 변수로 주입합니다.

## 로컬 E2E (1.6)

`npm run smoke:e2e` — [scripts/e2e-integration-local.mjs](../../scripts/e2e-integration-local.mjs). 계약(OpenAPI 경로)과 별도로 **비즈니스 플로우**가 동작하는지 확인합니다. `verify:contract`는 CI에 포함하고, `smoke:e2e`는 스테이징 또는 로컬 개발자 머신에서 실행하는 것을 권장합니다.

**브라우저 스모크**: 루트 `npm run e2e` — Playwright로 오케스트레이터·Suite 핵심 화면 로드 검증([`apps/web/e2e`](../../apps/web/e2e)). GitHub Actions [`.github/workflows/e2e.yml`](../../.github/workflows/e2e.yml).
