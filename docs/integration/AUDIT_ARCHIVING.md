# 감사 로그 아카이빙 (P2)

## 보존

| 단계 | 위치 | 권장 보존 |
|------|------|-----------|
| 온라인 | SQLite `audit_entries` + JSONL 미러 | 운영 합의(예: 90일) |
| 내보내기 | S3/GCS 등 콜드 스토리지 | 규정·세무 요구에 맞춤 |

## 내보내기

```bash
cd apps/api
set SQLITE_PATH=...\suite.db
set AUDIT_EXPORT_PATH=...\audit_backup.jsonl
npm run export-audit
```

[export-audit.mjs](../../apps/api/scripts/export-audit.mjs)는 `audit_entries`를 **한 줄 JSON**씩 씁니다. 주기 실행은 cron / GitHub Actions / 클라우드 스케줄러에 연결합니다.

## 규정

접근 통제·암호화·삭제 요청(DSR) 절차는 보안·법무와 합의한 내부 정책을 따릅니다.
