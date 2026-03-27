import Database from 'better-sqlite3'
import { existsSync, mkdirSync } from 'fs'
import { dirname, join } from 'path'
import { DATA_DIR, ensureDataDir } from './dataDir.js'

let db: Database.Database | null = null

export function isSqliteEnabled(): boolean {
  if (process.env.SQLITE_DISABLED === '1' || process.env.SQLITE_DISABLED === 'true') return false
  return true
}

export function getDb(): Database.Database | null {
  if (!isSqliteEnabled()) return null
  if (db) return db
  ensureDataDir()
  const dbPath = process.env.SQLITE_PATH?.trim() || join(DATA_DIR, 'suite.db')
  const dir = dirname(dbPath)
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
  db = new Database(dbPath)
  db.pragma('journal_mode = WAL')
  initSchema(db)
  return db
}

function initSchema(d: Database.Database): void {
  d.exec(`
    CREATE TABLE IF NOT EXISTS audit_entries (
      audit_id TEXT PRIMARY KEY,
      ts TEXT NOT NULL,
      tenant_id TEXT NOT NULL,
      kind TEXT NOT NULL,
      trace_id TEXT,
      detail_json TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_audit_tenant_ts ON audit_entries(tenant_id, ts DESC);

    CREATE TABLE IF NOT EXISTS idempotency (
      idem_key TEXT PRIMARY KEY,
      status INTEGER NOT NULL,
      body TEXT NOT NULL,
      created_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS outbox (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      kind TEXT NOT NULL,
      tenant_id TEXT NOT NULL,
      payload_json TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      created_at INTEGER NOT NULL,
      attempts INTEGER NOT NULL DEFAULT 0,
      last_error TEXT
    );
    CREATE INDEX IF NOT EXISTS idx_outbox_status ON outbox(status, id);

    CREATE TABLE IF NOT EXISTS tool_approval_queue (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tenant_id TEXT NOT NULL,
      trace_id TEXT,
      tool_name TEXT NOT NULL,
      args_json TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      created_at INTEGER NOT NULL,
      resolved_at INTEGER,
      resolution_note TEXT
    );
    CREATE INDEX IF NOT EXISTS idx_tool_approval_tenant ON tool_approval_queue(tenant_id, status, id DESC);
  `)
}
