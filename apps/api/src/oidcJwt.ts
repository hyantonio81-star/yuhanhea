import { createRemoteJWKSet, jwtVerify, type JWTPayload } from 'jose'

let jwks: ReturnType<typeof createRemoteJWKSet> | null = null

function getJwks() {
  const uri = process.env.JWKS_URI?.trim()
  if (!uri) return null
  if (!jwks) jwks = createRemoteJWKSet(new URL(uri))
  return jwks
}

/** OIDC/OAuth2 리소스 서버 모드: RS256 등 JWKS 검증. `JWKS_URI` + `JWT_ISSUER` 설정 시 사용. */
export async function verifyBearerOidc(token: string): Promise<JWTPayload | null> {
  const issuer = process.env.JWT_ISSUER?.trim()
  const audience = process.env.JWT_AUDIENCE?.trim()
  const j = getJwks()
  if (!j || !issuer) return null
  try {
    const { payload } = await jwtVerify(token, j, {
      issuer,
      audience: audience ? audience : undefined,
    })
    return payload
  } catch {
    return null
  }
}

export function oidcAuthConfigured(): boolean {
  return Boolean(process.env.JWKS_URI?.trim() && process.env.JWT_ISSUER?.trim())
}
