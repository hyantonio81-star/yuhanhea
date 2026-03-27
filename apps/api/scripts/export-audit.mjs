/**
 * 감사 테이블을 JSONL로 덤프 (콜드 스토리지·백업 파이프라인 입력)
 * 사용: npm run export-audit -w yuhan-suite-api (루트에서) 또는 apps/api 에서 npm run export-audit
 */
import { createWriteStream } from 'node:fs'
import { mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import Database from 'better-sqlite3'

const __dirname = dirname(fileURLToPath(import.meta.url))
const apiRoot = join(__dirname, '..')
const dataDir = process.env.DATA_DIR?.trim() ? process.env.DATA_DIR.trim() : join(apiRoot, 'data')
const dbPath = process.env.SQLITE_PATH?.trim() || join(dataDir, 'suite.db')
const outPath = process.env.AUDIT_EXPORT_PATH?.trim() || join(dataDir, `audit_export_${Date.now()}.jsonl`)

if (!process.env.SQLITE_PATH && !process.env.DATA_DIR) {
  mkdirSync(dirname(outPath), { recursive: true })
}

const db = new Database(dbPath, { readonly: true })
const rows = db
  .prepare(
    `SELECT audit_id, ts, tenant_id, kind, trace_id, detail_json FROM audit_entries ORDER BY ts ASC`,
  )
  .all()

const stream = createWriteStream(outPath, { flags: 'w' })
for (const r of rows) {
  stream.write(`${JSON.stringify(r)}\n`)
}
stream.end()
console.error(`export-audit: ${rows.length} rows → ${outPath}`)
db.close()
