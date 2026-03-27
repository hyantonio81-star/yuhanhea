import type { Context, Next } from 'hono'
import type { SuiteVariables } from './auth.js'

/**
 * JWT에 `tenant_id`(또는 `tid`)가 있으면 요청 `X-Tenant-Id`와 일치해야 함.
 * `BFF_ENFORCE_TENANT_HEADER=1` 일 때만. m2m 전용 `X-BFF-Key`만 쓰는 경우 클레임 없으면 통과.
 */
export async function tenantIsolationMiddleware(
  c: Context<{ Variables: SuiteVariables }>,
  next: Next,
): Promise<Response | void> {
  if (c.req.path === '/health') return next()
  const enforce = process.env.BFF_ENFORCE_TENANT_HEADER === '1' || process.env.BFF_ENFORCE_TENANT_HEADER === 'true'
  if (!enforce) return next()

  const payload = c.get('jwtPayload')
  const claim = payload?.tenant_id ?? payload?.tid
  if (typeof claim !== 'string' || !claim.trim()) return next()

  const hdr = c.req.header('x-tenant-id')?.trim()
  if (hdr !== claim) {
    return c.json({ error: 'tenant_mismatch', need: 'X-Tenant-Id must match JWT tenant_id' }, 403)
  }
  return next()
}
