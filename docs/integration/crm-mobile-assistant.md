# 로컬 CRM · 모바일 리마인더 · AI 비서

## 범위

- **로컬 시장 전략**: `local_market_id` 단위 KPI·경쟁·프로모션 캘린더를 CRM이 집계 → Yuaimarketing 캠페인에 **인사이트 피드**로 제공 (`LocalMarketInsightUpdated`).
- **모바일**: PWA 또는 네이티브; **리마인더**는 옵트인·쿨다운·시간대 정책을 Marketing과 공유.
- **AI 비서**: 서버 오케스트레이션. 사용자 발화 → **허용 도구**만 호출; 고위험 작업은 `approval_required: true`.

## 리마인더 정책 (필수 합의)

| 규칙 | 예시 |
|------|------|
| 옵트인 | `consent_token_ref` 없으면 스케줄 거부 |
| 쿨다운 | 동일 `contact_id` + 채널당 최소 24h (설정 가능) |
| 시간대 | `fire_at`은 UTC; 클라이언트는 `local_market_id` 타임존 표시 |
| 빈도 상한 | Marketing `tenant` 정책과 교차 검증 |

## 이벤트

- `ReminderScheduled` — 스케줄러 등록
- `ReminderFired` — 실제 전달(감사·분쟁 대비)

## AI 비서 — 허용 도구 (OpenAPI 스키마와 동일 이름)

| 도구 | 입력 요약 | 승인 |
|------|-----------|------|
| `crm_get_visits` | `contact_id`, `from`, `to` | 자동 |
| `crm_get_local_insights` | `local_market_id` | 자동 |
| `mkt_schedule_campaign` | `campaign_id`, `slot` | 관리자 |
| `mart_create_video_job` | `campaign_id`, `brief_json` | 관리자 |
| `crm_schedule_reminder` | `contact_id`, `fire_at`, `channel` | 사용자 확인 |

### 세션 요청 예 (클라이언트 → BFF)

```json
{
  "trace_id": "trc_xxx",
  "tenant_id": "tnt_xxx",
  "user_id": "usr_xxx",
  "messages": [{ "role": "user", "content": "다음 주 재방문 리마인더 잡아줘" }]
}
```

### 도구 호출 응답 (감사 로그 필드)

`audit_id`, `trace_id`, `tool`, `input_hash`, `result_ref`.

## API (초안)

- `GET /api/v1/crm/local-markets/{id}/insights`
- `POST /api/v1/crm/reminders` — `{ contact_id, fire_at, channel, consent_token_ref }`
- `POST /api/v1/assistant/sessions` — 위 세션 바디; `trace_id` 필수

## 감사

- 모든 리마인더 발송·AI 도구 호출은 `audit_id` + `tenant_id`로 ERP/컴플라이언스 내보내기 가능.
