import { suiteLog } from './logging.js'
import { insertAuditEntry } from './store/auditRepository.js'

export type AuditEntry = {
  audit_id: string
  ts: string
  trace_id?: string
  tenant_id: string
  kind: string
  detail: Record<string, unknown>
}

const MAX = 500
const log: AuditEntry[] = []

export function newAuditId(): string {
  return `aud_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`
}

export function recordAudit(entry: Omit<AuditEntry, 'audit_id' | 'ts'> & { audit_id?: string }): AuditEntry {
  const row: AuditEntry = {
    audit_id: entry.audit_id ?? newAuditId(),
    ts: new Date().toISOString(),
    trace_id: entry.trace_id,
    tenant_id: entry.tenant_id,
    kind: entry.kind,
    detail: entry.detail,
  }
  log.push(row)
  if (log.length > MAX) log.splice(0, log.length - MAX)
  insertAuditEntry(row)
  suiteLog('info', 'audit_recorded', {
    trace_id: row.trace_id,
    audit_id: row.audit_id,
    tenant_id: row.tenant_id,
    kind: row.kind,
  })
  return row
}

export function recentAudit(limit = 50): AuditEntry[] {
  return log.slice(-limit).reverse()
}
