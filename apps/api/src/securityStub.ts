import type { Context } from 'hono'
import type { SuiteVariables } from './auth.js'
import { recordAudit } from './audit.js'

const SPEC_SECURITY = '0.4.2'

export function getSecurityStatus(c: Context<{ Variables: SuiteVariables }>) {
  return c.json({
    service: 'yuhan-suite-bff',
    security: {
      supply_chain_layer: 'active',
      upload_scan_engine: process.env.SECURITY_SCAN_ENGINE?.trim() || 'stub',
      upload_scan_note: 'Malware engine not wired; POST /security/scan-upload returns synthetic accept.',
      api_spec_version: SPEC_SECURITY,
    },
    generated_at: new Date().toISOString(),
  })
}

export async function postSecurityScanUpload(c: Context<{ Variables: SuiteVariables }>) {
  let body: Record<string, string | File>
  try {
    body = (await c.req.parseBody()) as Record<string, string | File>
  } catch {
    return c.json({ error: 'invalid_body', hint: 'use multipart/form-data with field file' }, 400)
  }
  const file = body.file
  if (!(file instanceof File)) {
    return c.json({ error: 'missing_file', hint: 'multipart field name: file' }, 400)
  }
  const tenant_id = typeof body.tenant_id === 'string' ? body.tenant_id : 'tnt_demo'
  recordAudit({
    trace_id: c.get('traceId'),
    tenant_id,
    kind: 'security_scan_upload',
    detail: {
      filename: file.name,
      size: file.size,
      engine: 'stub',
    },
  })
  return c.json({
    ok: true,
    scan_status: 'accepted_stub',
    engine: 'stub',
    received_bytes: file.size,
    filename: file.name,
    message: 'No malware engine configured; content not inspected.',
  })
}
