# SQLite → Postgres(Supabase) 마이그레이션 백로그

평가에서 제안한 **BFF 저장소를 Postgres로 이전**하는 작업은 한 PR로 끝나지 않습니다. 여기서는 단계·산출물만 고정합니다.

## 목표

- 멀티 인스턴스·백업·풀링에 맞는 **단일 진실 원본**으로 아웃박스·멱등·감사·도구 승인 큐를 옮김.
- [`supabase-schema-draft.sql`](./supabase-schema-draft.sql) 및 [DEPLOY_SUPABASE_VERCEL.md](./DEPLOY_SUPABASE_VERCEL.md)와 정합.

## 단계 (권장 순서)

1. **스키마 확정** — SQLite 테이블과 1:1 또는 의도적 차이 문서화.
2. **리포지토리 레이어** — `store/sqlite.ts` 사용처를 `store/db.ts` 추상화 뒤 Postgres 구현체 추가.
3. **듀얼 라이트(선택)** — 스테이징에서 한동안 SQLite + PG 비교.
4. **컷오버** — `DATABASE_URL`만 PG, 워커·멱등 회귀 테스트.
5. **SQLite 경로 제거 또는 `SQLITE_DISABLED` 기본 true** — 운영 단순화.

## 완료 정의

- `npm run smoke:e2e` · `smoke:bff` 스테이징 통과.
- [CONTRACT_TESTING.md](./CONTRACT_TESTING.md) OpenAPI 변경 없음(엔드포인트 동일 전제).

이 문서만으로 마이그레이션이 수행되지는 않으며, 별도 이슈·스프린트로 쪼개 실행합니다.
