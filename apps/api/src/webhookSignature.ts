import { createHmac, timingSafeEqual } from 'node:crypto'

/** BFF → 외부 웹훅 POST 본문(JSON 문자열)에 대한 HMAC-SHA256. `BFF_WEBHOOK_SIGNING_SECRET` 미설정 시 서명 없음. */
export function signedWebhookHeaders(bodyUtf8: string): Record<string, string> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  const secret = process.env.BFF_WEBHOOK_SIGNING_SECRET?.trim()
  if (!secret) return headers
  const digest = createHmac('sha256', secret).update(bodyUtf8, 'utf8').digest('hex')
  headers['X-Yuhan-Signature'] = `sha256=${digest}`
  return headers
}

/**
 * 수신 측 검증(ERP·내부 스텁). 원본 본문 문자열과 헤더 `X-Yuhan-Signature: sha256=<hex>` 필요.
 */
export function verifyWebhookSignature(
  rawBodyUtf8: string,
  signatureHeader: string | null | undefined,
  secret: string,
): boolean {
  if (!signatureHeader?.startsWith('sha256=')) return false
  const expectedHex = signatureHeader.slice(7)
  const got = createHmac('sha256', secret).update(rawBodyUtf8, 'utf8').digest('hex')
  try {
    const a = Buffer.from(expectedHex, 'hex')
    const b = Buffer.from(got, 'hex')
    if (a.length !== b.length) return false
    return timingSafeEqual(a, b)
  } catch {
    return false
  }
}
