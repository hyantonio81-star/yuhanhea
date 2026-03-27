import type { AuditEntry } from '../audit.js'
import { appendAuditFile, readAuditTail } from './auditFile.js'
import { getDb } from './sqlite.js'

export function insertAuditEntry(row: AuditEntry): void {
  const d = getDb()
  if (d) {
    d.prepare(
      `INSERT OR REPLACE INTO audit_entries (audit_id, ts, tenant_id, kind, trace_id, detail_json)
       VALUES (?, ?, ?, ?, ?, ?)`,
    ).run(
      row.audit_id,
      row.ts,
      row.tenant_id,
      row.kind,
      row.trace_id ?? null,
      JSON.stringify(row.detail),
    )
  }
  try {
    appendAuditFile(row)
  } catch {
    /* jsonl optional */
  }
}

export function listAuditEntries(tenantId: string | undefined, limit: number): AuditEntry[] {
  const d = getDb()
  if (d) {
    const lim = Math.min(500, Math.max(1, limit))
    const rows = tenantId
      ? d
          .prepare(
            `SELECT audit_id, ts, tenant_id, kind, trace_id, detail_json FROM audit_entries
             WHERE tenant_id = ? ORDER BY ts DESC LIMIT ?`,
          )
          .all(tenantId, lim) as {
          audit_id: string
          ts: string
          tenant_id: string
          kind: string
          trace_id: string | null
          detail_json: string
        }[]
      : d
          .prepare(
            `SELECT audit_id, ts, tenant_id, kind, trace_id, detail_json FROM audit_entries
             ORDER BY ts DESC LIMIT ?`,
          )
          .all(lim) as {
          audit_id: string
          ts: string
          tenant_id: string
          kind: string
          trace_id: string | null
          detail_json: string
        }[]

    return rows.map((r) => ({
      audit_id: r.audit_id,
      ts: r.ts,
      tenant_id: r.tenant_id,
      kind: r.kind,
      trace_id: r.trace_id ?? undefined,
      detail: JSON.parse(r.detail_json) as Record<string, unknown>,
    }))
  }
  let list = readAuditTail(limit * 2)
  if (tenantId) list = list.filter((x) => x.tenant_id === tenantId)
  return list.slice(0, limit)
}
