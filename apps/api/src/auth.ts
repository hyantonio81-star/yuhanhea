import type { Context, Next } from 'hono'
import { jwtVerify } from 'jose'
import { oidcAuthConfigured, verifyBearerOidc } from './oidcJwt.js'

export type JwtVariables = {
  jwtPayload?: Record<string, unknown>
}

/** traceMiddleware가 `traceId`를 설정합니다. */
export type SuiteVariables = JwtVariables & { traceId: string }

export async function authMiddleware(c: Context<{ Variables: SuiteVariables }>, next: Next): Promise<Response | void> {
  if (c.req.path === '/health') return next()

  const apiKey = process.env.BFF_API_KEY?.trim()
  const jwtSecret = process.env.JWT_SECRET?.trim()

  if (!apiKey && !jwtSecret && !oidcAuthConfigured()) return next()

  const auth = c.req.header('Authorization')
  if (auth?.startsWith('Bearer ')) {
    const token = auth.slice(7)
    if (jwtSecret) {
      try {
        const secret = new TextEncoder().encode(jwtSecret)
        const { payload } = await jwtVerify(token, secret, { algorithms: ['HS256'] })
        c.set('jwtPayload', payload as Record<string, unknown>)
        return next()
      } catch {
        /* try OIDC JWKS */
      }
    }
    if (oidcAuthConfigured()) {
      const payload = await verifyBearerOidc(token)
      if (payload) {
        c.set('jwtPayload', payload as Record<string, unknown>)
        return next()
      }
    }
  }

  if (apiKey && c.req.header('X-BFF-Key') === apiKey) return next()

  return c.json({ error: 'unauthorized' }, 401)
}
