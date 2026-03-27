import { appendFileSync, readFileSync, existsSync } from 'fs'
import { join } from 'path'
import type { AuditEntry } from '../audit.js'
import { ensureDataDir, DATA_DIR } from './dataDir.js'

const FILE = 'audit.jsonl'
const MAX_READ_BYTES = 4 * 1024 * 1024

export function appendAuditFile(row: AuditEntry): void {
  ensureDataDir()
  appendFileSync(join(DATA_DIR, FILE), `${JSON.stringify(row)}\n`, 'utf8')
}

export function readAuditTail(limit: number): AuditEntry[] {
  const p = join(DATA_DIR, FILE)
  if (!existsSync(p)) return []
  const buf = readFileSync(p)
  if (buf.length > MAX_READ_BYTES) {
    return []
  }
  const lines = buf.toString('utf8').trim().split('\n').filter(Boolean)
  const slice = lines.slice(-limit)
  const out: AuditEntry[] = []
  for (const line of slice) {
    try {
      out.push(JSON.parse(line) as AuditEntry)
    } catch {
      /* skip */
    }
  }
  return out.reverse()
}
