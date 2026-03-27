# 보안 개선 플랜 (Supabase · Vercel 전제)

목표: [SECURITY_RUNBOOK.md](./SECURITY_RUNBOOK.md)의 권장을 **배포 환경**에 맞게 단계적으로 달성합니다.

**AI 보안(백신) 레이어·업데이트 캘린더**: [AI_ANTIVIRUS_AND_SECURITY_UPDATES.md](./AI_ANTIVIRUS_AND_SECURITY_UPDATES.md) · 웹 허브 `/suite/ai-security`.

## 현재 위험 요약 (기준선)

| 항목 | 위험 | 목표 |
|------|------|------|
| BFF 인증 미설정 | 전 API 개방 | 프로덕션에서 키 또는 JWT/JWKS 필수 |
| CORS `*` | 임의 오리진에서 브라우저 호출 가능 | Vercel 프로덕션·프리뷰 도메인만 |
| Vite 노출 키 | 번들에 포함 가능 | 프로덕션은 쿠키/세션·게이트웨이·짧은 JWT |
| 웹훅 무서명 | 위조 POST | `BFF_WEBHOOK_SIGNING_SECRET` + 수신 검증 |
| SQLite 파일 | 호스트 유출 시 전체 노출 | Supabase Postgres + 접근 최소화 |

---

## Phase A — 배포 직후 (P0, 1~2주)

| # | 조치 | 담당 | 완료 기준 |
|---|------|------|-----------|
| A1 | BFF에 `BFF_API_KEY` **또는** `JWT_SECRET` **또는** `JWKS_URI`+`JWT_ISSUER` 중 **하나 이상** 필수. 배포 파이프라인에서 미설정 시 실패하도록 검증 | DevOps | 스테이징 스모크 401 없이 정상 호출 |
| A2 | `VITE_SUITE_BFF_BASE`만 공개 URL로 설정. **`VITE_SUITE_BFF_KEY` 프로덕션 미사용** 원칙 문서화 | FE + Sec | 프로덕 빌드에 장기 API 키 없음 |
| A3 | `BFF_WEBHOOK_SIGNING_SECRET` 설정 + ERP/스텁에서 `X-Yuhan-Signature` 검증 | BE + ERP | 스테이징 웹훅 위조 요청 거부 |
| A4 | `OUTBOX_FAILURE_WEBHOOK_URL` → Slack/이메일 등 운영 채널 | SRE | 실패 알림 1회 수신 확인 |

## Phase B — Vercel·도메인 정리 (P1, 2~4주)

| # | 조치 | 담당 | 완료 기준 |
|---|------|------|-----------|
| B1 | BFF CORS를 `origin: '*'`에서 **허용 목록**으로 변경 (예: `https://*.vercel.app`, 프로덕션 커스텀 도메인) | BE | 브라우저에서 허용 외 오리진 차단 확인 |
| B2 | `BFF_ENFORCE_TENANT_HEADER=1` + JWT에 `tenant_id` 클레임 정비 | BE | 크로스 테넌트 헤더 조작 시 403 |
| B3 | Vercel **Preview**와 **Production** 환경 변수 분리 (BFF URL·키) | DevOps | Preview가 프로덕 DB를 치지 않음 |

## Phase C — Supabase·데이터 (P1~P2)

| # | 조치 | 담당 | 완료 기준 |
|---|------|------|-----------|
| C1 | 감사·아웃박스·멱등을 Postgres로 이전 ([supabase-schema-draft.sql](./supabase-schema-draft.sql)) | BE | 스테이징에서 동일 기능 회귀 |
| C2 | DB 연결 문자열·`service_role`은 **서버 전용**. Git·Vercel 클라이언트 번들에 금지 | Sec | 시크릿 스캔 통과 |
| C3 | Supabase **RLS**: 직접 클라이언트 접근을 도입할 경우 테넌트 정책 작성 | BE | 정책 단위 테스트 |

## Phase D — 심화 (P2~P3)

| # | 조치 | 담당 |
|---|------|------|
| D1 | API Gateway 또는 WAF (레이트 리밋, IP 제한) |
| D2 | mTLS 또는 ERP 방화벽 고정 IP ([NETWORK_AND_SLA.md](./NETWORK_AND_SLA.md)) |
| D3 | 키 회전 런북 분기 실행 ([SECURITY_RUNBOOK.md](./SECURITY_RUNBOOK.md) §4) |
| D4 | 정기 `npm audit` / OSV / Dependabot |

## 점수 목표 (자체 평가)

| 시점 | 목표 (10점 만점) |
|------|------------------|
| Phase A 완료 | **6** |
| Phase B 완료 | **7** |
| Phase C 완료 | **7.5~8** |

## 참고

- 배포 흐름: [DEPLOY_SUPABASE_VERCEL.md](./DEPLOY_SUPABASE_VERCEL.md)
- 이해관계자 합의표: [STAKEHOLDER_REVIEW_CHECKLIST.md](./STAKEHOLDER_REVIEW_CHECKLIST.md)
