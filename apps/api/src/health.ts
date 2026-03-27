import type { Context } from 'hono'
import { getDb, isSqliteEnabled } from './store/sqlite.js'

export function healthHandler(c: Context) {
  let sqlite: 'ok' | 'error' | 'disabled' = 'disabled'
  if (isSqliteEnabled()) {
    try {
      const db = getDb()
      if (db) {
        db.prepare('SELECT 1').get()
        sqlite = 'ok'
      } else {
        sqlite = 'error'
      }
    } catch {
      sqlite = 'error'
    }
  }

  const ok = sqlite !== 'error'
  return c.json(
    {
      ok,
      service: 'yuhan-suite-bff',
      checks: { sqlite },
    },
    ok ? 200 : 503,
  )
}
