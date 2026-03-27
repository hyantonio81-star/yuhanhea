# P3 규모·운영 (멀티 리전 · 읽기 복제 · 모바일 푸시)

## 멀티 리전 테넌트 격리

- **데이터**: 테넌트별 샤드 DB 또는 `tenant_id` 파티션 + 리전 고정 라우팅(지역 규제 대응).
- **BFF**: [tenantIsolation.ts](../../apps/api/src/tenantIsolation.ts) — `BFF_ENFORCE_TENANT_HEADER=1` 시 JWT `tenant_id`와 `X-Tenant-Id` 일치 강제.
- **DNS/게이트웨이**: 지역별 엔드포인트 또는 GeoDNS로 트래픽 분산.

## 읽기 복제·캐시

- **읽기**: 감사·이벤트 폴링(`GET /events`)은 읽기 전용 복제본으로 라우팅 가능(앱 레이어 또는 프록시).
- **캐시**: `GET /crm/local-markets/*/insights` 등은 짧은 `Cache-Control` 또는 CDN 엣지 캐시 검토(개인 데이터는 캐시 제외).

## 모바일 CRM 푸시 (프로덕션)

- **리마인더·알림**: [crm-mobile-assistant.md](./crm-mobile-assistant.md)와 `REMINDER_WEBHOOK_URL` ([apps/api/.env.example](../../apps/api/.env.example))로 외부 푸시 어댑터(FCM/APNs) 연동.
- **옵트인**: `consent_token_ref`·쿨다운은 BFF 정책 유지; 모바일 앱은 OAuth/mTLS로 BFF 또는 게이트웨이만 호출.

이 문서는 **아키텍처 방향**이며, 실제 인프라는 클라우드·네트워크 팀 설계에 따릅니다.
