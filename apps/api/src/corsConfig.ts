import { cors } from 'hono/cors'

const allowHeaders = [
  'Content-Type',
  'X-BFF-Key',
  'X-BFF-Admin-Key',
  'X-Tenant-Id',
  'X-Trace-Id',
  'Authorization',
  'Idempotency-Key',
] as const

/** `BFF_CORS_ORIGINS` 쉼표 구분. 미설정이면 개발 편의상 `*` (프로덕션에서는 명시 권장). */
export function suiteCorsMiddleware() {
  const raw = process.env.BFF_CORS_ORIGINS?.trim()
  const list = raw ? raw.split(',').map((s) => s.trim()).filter(Boolean) : []

  return cors({
    origin: (origin) => {
      if (list.length === 0) return '*'
      if (list.includes(origin)) return origin
      return undefined
    },
    allowMethods: ['GET', 'POST', 'PATCH', 'OPTIONS'],
    allowHeaders: [...allowHeaders],
    exposeHeaders: ['X-Idempotent-Replay', 'X-Trace-Id'],
  })
}
