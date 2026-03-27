import type { Context } from 'hono'
import { getCached, setCached, hashBody, idempotencyKey } from './store/idempotencyStore.js'

export function idempotentReplay(
  c: Context,
  routePath: string,
  rawBody: string,
): Response | null {
  const idem = c.req.header('Idempotency-Key')
  if (!idem) return null
  const k = idempotencyKey(c.req.method, routePath, idem, hashBody(rawBody))
  const hit = getCached(k)
  if (!hit) return null
  return new Response(hit.body, {
    status: hit.status,
    headers: { 'Content-Type': 'application/json', 'X-Idempotent-Replay': 'true' },
  })
}

export function idempotentStore(
  c: Context,
  routePath: string,
  rawBody: string,
  status: number,
  responseJson: string,
): void {
  const idem = c.req.header('Idempotency-Key')
  if (!idem) return
  const k = idempotencyKey(c.req.method, routePath, idem, hashBody(rawBody))
  setCached(k, status, responseJson)
}
