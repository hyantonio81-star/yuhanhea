import { getDb } from './sqlite.js'

export type ToolApprovalRow = {
  id: number
  tenant_id: string
  trace_id: string | null
  tool_name: string
  args_json: string
  status: string
  created_at: number
  resolved_at: number | null
  resolution_note: string | null
}

export function insertToolApproval(row: {
  tenant_id: string
  trace_id?: string
  tool_name: string
  args_json: string
}): number | undefined {
  const d = getDb()
  if (!d) return undefined
  const info = d
    .prepare(
      `INSERT INTO tool_approval_queue (tenant_id, trace_id, tool_name, args_json, status, created_at)
       VALUES (?, ?, ?, ?, 'pending', ?)`,
    )
    .run(row.tenant_id, row.trace_id ?? null, row.tool_name, row.args_json, Date.now())
  return Number(info.lastInsertRowid)
}

export function listToolApprovals(params: {
  tenant_id?: string
  status?: string
  limit: number
}): ToolApprovalRow[] {
  const d = getDb()
  if (!d) return []
  const lim = Math.min(200, Math.max(1, params.limit))
  const status = params.status ?? 'pending'
  if (params.tenant_id) {
    const rows = d
      .prepare(
        `SELECT id, tenant_id, trace_id, tool_name, args_json, status, created_at, resolved_at, resolution_note
         FROM tool_approval_queue WHERE tenant_id = ? AND status = ? ORDER BY id DESC LIMIT ?`,
      )
      .all(params.tenant_id, status, lim) as ToolApprovalRow[]
    return rows
  }
  const rows = d
    .prepare(
      `SELECT id, tenant_id, trace_id, tool_name, args_json, status, created_at, resolved_at, resolution_note
       FROM tool_approval_queue WHERE status = ? ORDER BY id DESC LIMIT ?`,
    )
    .all(status, lim) as ToolApprovalRow[]
  return rows
}

export function getToolApproval(id: number): ToolApprovalRow | undefined {
  const d = getDb()
  if (!d) return undefined
  return d
    .prepare(
      `SELECT id, tenant_id, trace_id, tool_name, args_json, status, created_at, resolved_at, resolution_note
       FROM tool_approval_queue WHERE id = ?`,
    )
    .get(id) as ToolApprovalRow | undefined
}

export function setToolApprovalStatus(
  id: number,
  status: 'approved' | 'rejected',
  note?: string,
): boolean {
  const d = getDb()
  if (!d) return false
  const r = d.prepare(`UPDATE tool_approval_queue SET status = ?, resolved_at = ?, resolution_note = ? WHERE id = ? AND status = 'pending'`).run(
    status,
    Date.now(),
    note ?? null,
    id,
  )
  return r.changes > 0
}
