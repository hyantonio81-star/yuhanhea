# ERP 재무 매핑 (마케팅 · 제작 spend · 정산)

## 원칙

- **단일 전표 진입점**: Yuhan ERP; Yuaimarketing/Mart는 **커밋 이벤트**만 발행.
- 차원: `department_code`, `campaign_id` (optional), `spend_category` (enum).

## COA 매핑 예시 (샘플)

| spend_category | COA (예시) | 비고 |
|----------------|------------|------|
| `ad_spend` | 6100-광고비 | 미디어 집행 |
| `production` | 6200-제작비 | 영상·에셋 |
| `influencer` | 6300-인플루언서 | |
| `tooling` | 6400-SaaS | |

국가·법인별로 `local_market_id` → 세금 코드 매핑 테이블 유지.

### 지역·세금 (예시)

| local_market_id 접두 | 세금 코드 | 비고 |
|----------------|------------|------|
| `DO-*` | `ITBIS_18` | 도미니카 공급가 기준 |
| `KR-*` | `VAT_KR` | 별도 과세표 |

## 이벤트

- `MarketingSpendCommitted`: 기간·누적 금액 → ERP 예산 대비 실적 모듈. 선택 필드 `department_code`.
- `PayoutApproved`: 라인 아이템 → AP 배치.

## 외부 키

ERP 전표는 `external_ref` = `{ "source": "yuai", "id": "..." }` 로 역추적.

## ERP 수신 페이로드 예시 (REST)

### 예산 실적 (MarketingSpendCommitted → ERP 어댑터)

```json
{
  "external_ref": { "source": "yuai", "event_id": "evt_xxx" },
  "fiscal_period": "2026-03",
  "department_code": "MKT-GLOBAL-01",
  "campaign_id": "cmp_xxx",
  "lines": [
    {
      "coa_code": "6100",
      "amount_cents": 9420000,
      "spend_category": "ad_spend",
      "tax_code_ref": "ITBIS_18"
    }
  ]
}
```

### 미지급 배치 (PayoutApproved)

```json
{
  "external_ref": { "source": "yuai", "event_id": "evt_xxx" },
  "payout_batch_id": "BTCH-2026-03",
  "currency": "USD",
  "ap_lines": [
    { "vendor_ref": "AFF_0042", "amount_cents": 420050, "coa_code": "2110-미지급" }
  ]
}
```
