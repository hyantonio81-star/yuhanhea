# 공통 마스터데이터 · 용어 사전

모든 서비스는 아래 식별자와 이름 규칙을 **읽기 전용 복제** 또는 **참조 ID**로 사용합니다. 진실 공급원은 도메인별로 하나씩 지정합니다.

## 소유권 매트릭스 (갱신 시 책임자 서명)

| 식별자 | 진실 공급원 (시스템) | 쓰기 권한 | 읽기 복제 허용 |
|--------|----------------------|-----------|----------------|
| `tenant_id` | Yuaimarketing Auth | IdP만 생성 | 전 제품 |
| `campaign_id` | Yuaimarketing | 허브 UI·API | Mart·BFF 이벤트 |
| `local_market_id` | Yuhan CRM | CRM만 생성/병합 | Yuaimarketing 인사이트 피드 |
| `video_job_id` | Yuhan Mart | Mart 파이프라인 | BFF `VideoJobCompleted` |
| `creative_asset_id` | Yuhan Mart | 렌더·스토리지 | Yuaimarketing 바인딩 |
| `erp_voucher_id` | Yuhan ERP | ERP 전표 모듈 | 역참조 `external_ref` |

*제품별 실제 DB 컬럼명·ULID 규칙은 [schema-inventory.md](./schema-inventory.md)에 기입합니다.*

## 식별자 (ID)

| 키 | 형식 (예) | 진실 공급원 | 설명 |
|----|-----------|-------------|------|
| `tenant_id` | `tnt_ulid` | Yuaimarketing Auth | 멀티테넌시 경계 |
| `organization_id` | `org_ulid` | Yuaimarketing | 법인·브랜드 단위 |
| `user_id` | `usr_ulid` | Yuaimarketing Auth | 사람·서비스 계정 |
| `campaign_id` | `cmp_ulid` | Yuaimarketing | 캠페인·브리프 컨테이너 |
| `local_market_id` | `lmk_ulid` | Yuhan CRM | 매장·지역·오프라인 거점 |
| `creative_asset_id` | `ast_ulid` | Yuhan Mart | 렌더 산출물·버전 |
| `video_job_id` | `vj_ulid` | Yuhan Mart | 영상 파이프라인 작업 |
| `erp_voucher_id` | ERP 네이티브 | Yuhan ERP | 전표·배치 ID (외부 키 `external_ref`) |
| `contact_id` | CRM 네이티브 | Yuhan CRM | 리마인더·방문 (BFF 이벤트 참조) |
| `department_code` | ERP/HR 마스터 | Yuhan ERP 또는 HR 소스 | spend·예산 차원 |

## 공통 열거형

- `CampaignStatus`: `draft` | `active` | `paused` | `completed`
- `VideoJobStatus`: `queued` | `scripting` | `rendering` | `qa` | `published` | `failed`
- `SpendCategory`: `ad_spend` | `production` | `influencer` | `tooling`

## 명명 규칙

- API 경로: 소문자 `kebab-case`, 버전 접두사 `/api/v1`.
- 이벤트 이름: `PascalCase` + 과거형 (`CampaignBriefPublished`).
- JSON 필드: `snake_case` (기존 Stitch ERP/CRM 명세와 정렬).

## 참조

- 이벤트 페이로드: [events-catalog.md](./events-catalog.md)
- 스키마 인벤토리: [schema-inventory.md](./schema-inventory.md)
