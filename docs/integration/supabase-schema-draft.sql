-- Yuhan Suite BFF용 Postgres 초안 (Supabase SQL Editor / 마이그레이션 참고)
-- 실제 컬럼·인덱스는 기존 SQLite 스키마(apps/api/src/store/sqlite.ts)와 맞춰 조정하세요.

-- 감사
CREATE TABLE IF NOT EXISTS audit_entries (
  audit_id TEXT PRIMARY KEY,
  ts TIMESTAMPTZ NOT NULL,
  tenant_id TEXT NOT NULL,
  kind TEXT NOT NULL,
  trace_id TEXT,
  detail_json JSONB NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_audit_tenant_ts ON audit_entries (tenant_id, ts DESC);

-- 멱등
CREATE TABLE IF NOT EXISTS idempotency (
  idem_key TEXT PRIMARY KEY,
  status INTEGER NOT NULL,
  body TEXT NOT NULL,
  created_at BIGINT NOT NULL
);

-- 아웃박스
CREATE TABLE IF NOT EXISTS outbox (
  id BIGSERIAL PRIMARY KEY,
  kind TEXT NOT NULL,
  tenant_id TEXT NOT NULL,
  payload_json JSONB NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at BIGINT NOT NULL,
  attempts INTEGER NOT NULL DEFAULT 0,
  last_error TEXT
);
CREATE INDEX IF NOT EXISTS idx_outbox_status ON outbox (status, id);

-- AI 도구 승인 큐
CREATE TABLE IF NOT EXISTS tool_approval_queue (
  id BIGSERIAL PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  trace_id TEXT,
  tool_name TEXT NOT NULL,
  args_json JSONB NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at BIGINT NOT NULL,
  resolved_at BIGINT,
  resolution_note TEXT
);
CREATE INDEX IF NOT EXISTS idx_tool_approval_tenant ON tool_approval_queue (tenant_id, status, id DESC);

-- RLS: 브라우저에서 직접 접근하지 않으면 서비스 롤만 사용하고 정책은 최소화.
-- ALTER TABLE ... ENABLE ROW LEVEL SECURITY;
