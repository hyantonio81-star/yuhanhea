import { appendFileSync } from 'fs'
import { join } from 'path'
import { mirrorOutboxAppend } from '../outboxMirror.js'
import { ensureDataDir, DATA_DIR } from './dataDir.js'
import { getDb } from './sqlite.js'

const FILE = 'outbox.jsonl'

export type OutboxRecord = {
  ts: string
  kind: string
  tenant_id: string
  payload: unknown
}

export function appendOutbox(record: Omit<OutboxRecord, 'ts'>): number | undefined {
  const ts = new Date().toISOString()
  const row: OutboxRecord = { ...record, ts }
  const d = getDb()
  if (d) {
    const info = d
      .prepare(
        `INSERT INTO outbox (kind, tenant_id, payload_json, status, created_at, attempts) VALUES (?, ?, ?, 'pending', ?, 0)`,
      )
      .run(record.kind, record.tenant_id, JSON.stringify(record.payload), Date.now())
    const id = Number(info.lastInsertRowid)
    mirrorOutboxAppend({ outbox_id: id, kind: record.kind, tenant_id: record.tenant_id, payload: record.payload })
    return id
  }
  try {
    ensureDataDir()
    appendFileSync(join(DATA_DIR, FILE), `${JSON.stringify(row)}\n`, 'utf8')
  } catch {
    /* optional */
  }
  mirrorOutboxAppend({ outbox_id: undefined, kind: record.kind, tenant_id: record.tenant_id, payload: record.payload })
  return undefined
}

export function listOutboxRecent(limit: number): {
  id: number
  kind: string
  tenant_id: string
  payload: unknown
  status: string
  created_at: number
}[] {
  const d = getDb()
  if (!d) return []
  const lim = Math.min(200, Math.max(1, limit))
  const rows = d
    .prepare(`SELECT id, kind, tenant_id, payload_json, status, created_at FROM outbox ORDER BY id DESC LIMIT ?`)
    .all(lim) as {
    id: number
    kind: string
    tenant_id: string
    payload_json: string
    status: string
    created_at: number
  }[]
  return rows.map((r) => ({
    id: r.id,
    kind: r.kind,
    tenant_id: r.tenant_id,
    payload: JSON.parse(r.payload_json) as unknown,
    status: r.status,
    created_at: r.created_at,
  }))
}

export function listOutboxSince(sinceId: number, limit: number): {
  id: number
  kind: string
  tenant_id: string
  payload: unknown
  status: string
  created_at: number
}[] {
  const d = getDb()
  if (!d) return []
  const lim = Math.min(200, Math.max(1, limit))
  const rows = d
    .prepare(
      `SELECT id, kind, tenant_id, payload_json, status, created_at FROM outbox WHERE id > ? ORDER BY id ASC LIMIT ?`,
    )
    .all(sinceId, lim) as {
    id: number
    kind: string
    tenant_id: string
    payload_json: string
    status: string
    created_at: number
  }[]
  return rows.map((r) => ({
    id: r.id,
    kind: r.kind,
    tenant_id: r.tenant_id,
    payload: JSON.parse(r.payload_json) as unknown,
    status: r.status,
    created_at: r.created_at,
  }))
}

/** DLQ: `failed` 행만 `pending`으로 되돌려 워커가 재전송 */
export function resetOutboxToPending(id: number): { ok: true } | { ok: false; error: string } {
  const d = getDb()
  if (!d) return { ok: false, error: 'no_db' }
  const row = d.prepare(`SELECT status FROM outbox WHERE id = ?`).get(id) as { status: string } | undefined
  if (!row) return { ok: false, error: 'not_found' }
  if (row.status === 'pending') return { ok: false, error: 'already_pending' }
  if (row.status === 'sent') return { ok: false, error: 'already_sent' }
  if (row.status !== 'failed') return { ok: false, error: 'not_failed' }
  d.prepare(`UPDATE outbox SET status = 'pending', attempts = 0, last_error = NULL WHERE id = ?`).run(id)
  return { ok: true }
}
