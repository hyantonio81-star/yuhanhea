import { createHash } from 'crypto'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { DATA_DIR, ensureDataDir } from './dataDir.js'
import { getDb } from './sqlite.js'

type Row = {
  status: number
  body: string
  created: number
}

const FILE = 'idempotency.json'
const MAX_ENTRIES = 5000
const TTL_MS = 24 * 60 * 60 * 1000

let fileCache: Record<string, Row> = {}

function path(): string {
  return join(DATA_DIR, FILE)
}

function loadFile(): void {
  ensureDataDir()
  if (!existsSync(path())) {
    fileCache = {}
    return
  }
  try {
    fileCache = JSON.parse(readFileSync(path(), 'utf8')) as Record<string, Row>
  } catch {
    fileCache = {}
  }
}

function saveFile(): void {
  ensureDataDir()
  const now = Date.now()
  const entries = Object.entries(fileCache).filter(([, v]) => now - v.created < TTL_MS)
  if (entries.length > MAX_ENTRIES) {
    entries.sort((a, b) => a[1].created - b[1].created)
    fileCache = Object.fromEntries(entries.slice(-MAX_ENTRIES))
  } else {
    fileCache = Object.fromEntries(entries)
  }
  writeFileSync(path(), JSON.stringify(fileCache), 'utf8')
}

loadFile()

export function hashBody(body: string): string {
  return createHash('sha256').update(body).digest('hex').slice(0, 32)
}

export function idempotencyKey(method: string, routePath: string, idemHeader: string, bodyHash: string): string {
  return `${method}:${routePath}:${idemHeader}:${bodyHash}`
}

export function getCached(key: string): Row | undefined {
  const d = getDb()
  if (d) {
    const row = d
      .prepare(`SELECT status, body, created_at FROM idempotency WHERE idem_key = ?`)
      .get(key) as { status: number; body: string; created_at: number } | undefined
    if (!row) return undefined
    if (Date.now() - row.created_at >= TTL_MS) {
      d.prepare(`DELETE FROM idempotency WHERE idem_key = ?`).run(key)
      return undefined
    }
    return { status: row.status, body: row.body, created: row.created_at }
  }

  const r = fileCache[key]
  if (!r) return undefined
  if (Date.now() - r.created >= TTL_MS) {
    delete fileCache[key]
    saveFile()
    return undefined
  }
  return r
}

export function setCached(key: string, status: number, body: string): void {
  const d = getDb()
  const now = Date.now()
  if (d) {
    d.prepare(
      `INSERT OR REPLACE INTO idempotency (idem_key, status, body, created_at) VALUES (?, ?, ?, ?)`,
    ).run(key, status, body, now)
    d.prepare(`DELETE FROM idempotency WHERE created_at < ?`).run(now - TTL_MS)
    return
  }
  fileCache[key] = { status, body, created: now }
  saveFile()
}
