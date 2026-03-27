# 이해관계자 검토 체크리스트 (P0~P1 · URL · 시크릿)

저장소 밖에서 **통합 오너·DevOps·ERP·제품**이 합의할 항목입니다. 회의 또는 위키에 복사해 사용합니다.

## 분기 과제 (P0~P1 확정)

| 항목 | 담당(이름) | 기한 | 상태 |
|------|------------|------|------|
| P0 관측·알림 운영 연결 (`OUTBOX_FAILURE_WEBHOOK_URL` → Slack 등) | | | |
| P1 DLQ 재처리 절차 (`BFF_ADMIN_KEY` 보관·회전) | | | |
| P1 웹훅 HMAC (`BFF_WEBHOOK_SIGNING_SECRET` ERP 수신 검증) | | | |
| P1 `OUTBOX_MIRROR_URL` 버스 어댑터 연결 | | | |

## 스테이징 / 프로덕션 URL (비밀 금지)

| 환경 | BFF Base URL | 기록일 | 비고 |
|------|----------------|--------|------|
| Staging | | | |
| Production | | | |

## 시크릿·키 (이름만, 값은 저장소에 비기입)

| 키 | 보관 위치(Vault 등) | 회전 주기 | 담당 |
|----|---------------------|-----------|------|
| `BFF_API_KEY` / `JWT_SECRET` | | | |
| `BFF_ADMIN_KEY` | | | |
| `BFF_WEBHOOK_SIGNING_SECRET` | | | |
| `JWKS_URI` / IdP 설정 | | | |

## ERP·네트워크

| 항목 | 합의 여부 | 날짜 |
|------|-----------|------|
| BFF egress IP → ERP 방화벽 화이트리스트 | | |
| 재무·아웃박스 웹훅 수신 URL | | |

## 서명

- 통합 오너: _________________ 날짜: _______
- 보안/인프라: _________________ 날짜: _______

상세 정책은 [GOVERNANCE_OPERATIONS.md](./GOVERNANCE_OPERATIONS.md), [NETWORK_AND_SLA.md](./NETWORK_AND_SLA.md)를 따릅니다.
