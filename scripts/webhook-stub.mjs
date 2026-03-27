/**
 * ERP/알림 웹훅 수신 스텁 — POST 본문을 stdout에 기록하고 200 반환
 * 환경: WEBHOOK_STUB_PORT (기본 9999), WEBHOOK_STUB_HOST (기본 0.0.0.0)
 * BFF_WEBHOOK_SIGNING_SECRET 과 동일 값을 WEBHOOK_STUB_VERIFY_SECRET 에 두면 X-Yuhan-Signature 검증(실패 시 401)
 */
import { createHmac, timingSafeEqual } from 'node:crypto'
import http from 'node:http'

const port = Number(process.env.WEBHOOK_STUB_PORT ?? 9999)
const host = process.env.WEBHOOK_STUB_HOST ?? '0.0.0.0'
const verifySecret = process.env.WEBHOOK_STUB_VERIFY_SECRET?.trim()

function verifySig(rawUtf8, sigHeader) {
  if (!verifySecret) return true
  if (!sigHeader?.startsWith('sha256=')) return false
  const exp = sigHeader.slice(7)
  const got = createHmac('sha256', verifySecret).update(rawUtf8, 'utf8').digest('hex')
  try {
    const a = Buffer.from(exp, 'hex')
    const b = Buffer.from(got, 'hex')
    if (a.length !== b.length) return false
    return timingSafeEqual(a, b)
  } catch {
    return false
  }
}

const server = http.createServer((req, res) => {
  const chunks = []
  req.on('data', (c) => chunks.push(c))
  req.on('end', () => {
    const raw = Buffer.concat(chunks).toString('utf8')
    const sig = req.headers['x-yuhan-signature']
    const ok = verifySig(raw, typeof sig === 'string' ? sig : sig?.[0])
    const line = `[${new Date().toISOString()}] ${req.method} ${req.url} sig_ok=${ok}\n${raw}\n---\n`
    process.stdout.write(line)
    if (!ok) {
      res.writeHead(401, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ ok: false, error: 'invalid_signature' }))
      return
    }
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ ok: true }))
  })
})

server.listen(port, host, () => {
  console.error(`webhook-stub listening on http://${host === '0.0.0.0' ? '127.0.0.1' : host}:${port}`)
})
