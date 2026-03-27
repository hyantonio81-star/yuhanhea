import { suiteLog } from './logging.js'
import { getDb } from './store/sqlite.js'
import { signedWebhookHeaders } from './webhookSignature.js'

const INTERVAL_MS = Number(process.env.OUTBOX_POLL_MS ?? 5000)
const MAX_ATTEMPTS = Number(process.env.OUTBOX_MAX_ATTEMPTS ?? 8)

function notifyFailure(payload: Record<string, unknown>): void {
  suiteLog('warn', 'outbox_failed', payload)
  const alertUrl = process.env.OUTBOX_FAILURE_WEBHOOK_URL?.trim()
  if (!alertUrl) return
  const failBody = JSON.stringify({ kind: 'outbox_failed', ts: new Date().toISOString(), ...payload })
  void fetch(alertUrl, {
    method: 'POST',
    headers: signedWebhookHeaders(failBody),
    body: failBody,
  }).catch(() => {})
}

export function startOutboxWorker(): void {
  const url = process.env.OUTBOX_WEBHOOK_URL?.trim()
  if (!url) return

  const tick = async (): Promise<void> => {
    const d = getDb()
    if (!d) return
    const rows = d
      .prepare(
        `SELECT id, kind, tenant_id, payload_json, attempts FROM outbox
         WHERE status = 'pending' AND attempts < ? ORDER BY id ASC LIMIT 15`,
      )
      .all(MAX_ATTEMPTS) as {
      id: number
      kind: string
      tenant_id: string
      payload_json: string
      attempts: number
    }[]

    for (const row of rows) {
      const body = JSON.stringify({
        outbox_id: row.id,
        kind: row.kind,
        tenant_id: row.tenant_id,
        payload: JSON.parse(row.payload_json) as unknown,
        ts: new Date().toISOString(),
      })
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: signedWebhookHeaders(body),
          body,
        })
        if (res.ok) {
          d.prepare(`UPDATE outbox SET status = 'sent', last_error = NULL WHERE id = ?`).run(row.id)
        } else {
          const err = (await res.text()).slice(0, 500)
          d.prepare(`UPDATE outbox SET attempts = attempts + 1, last_error = ? WHERE id = ?`).run(err, row.id)
          if (row.attempts + 1 >= MAX_ATTEMPTS) {
            d.prepare(`UPDATE outbox SET status = 'failed' WHERE id = ?`).run(row.id)
            notifyFailure({
              outbox_id: row.id,
              tenant_id: row.tenant_id,
              kind: row.kind,
              last_error: err,
            })
          }
        }
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e)
        d.prepare(`UPDATE outbox SET attempts = attempts + 1, last_error = ? WHERE id = ?`).run(msg.slice(0, 500), row.id)
        if (row.attempts + 1 >= MAX_ATTEMPTS) {
          d.prepare(`UPDATE outbox SET status = 'failed' WHERE id = ?`).run(row.id)
          notifyFailure({
            outbox_id: row.id,
            tenant_id: row.tenant_id,
            kind: row.kind,
            last_error: msg.slice(0, 500),
          })
        }
      }
    }
  }

  void tick()
  setInterval(() => void tick(), INTERVAL_MS)
  console.log(`Outbox worker: POST → ${url} every ${INTERVAL_MS}ms`)
}
