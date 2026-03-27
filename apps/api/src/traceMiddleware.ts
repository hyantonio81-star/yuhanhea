import type { Context, Next } from 'hono'
import type { SuiteVariables } from './auth.js'

export async function traceMiddleware(c: Context<{ Variables: SuiteVariables }>, next: Next): Promise<void> {
  const h = c.req.header('x-trace-id')?.trim()
  const traceId =
    h && h.length > 0 ? h : `trc_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 11)}`
  c.set('traceId', traceId)
  await next()
  c.header('X-Trace-Id', traceId)
}
