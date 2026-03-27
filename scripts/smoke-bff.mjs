/**
 * BFF 스모크: GET /health, GET /api/v1/assistant/tools (인증 없이 가능한 경우)
 * 환경: BFF_BASE (기본 http://127.0.0.1:8787)
 */
const base = (process.env.BFF_BASE ?? 'http://127.0.0.1:8787').replace(/\/$/, '')
const key = process.env.BFF_X_KEY?.trim()
const jwt = process.env.BFF_JWT?.trim()

function headers() {
  const h = {}
  if (key) h['X-BFF-Key'] = key
  if (jwt) h['Authorization'] = `Bearer ${jwt}`
  return h
}

async function get(path) {
  const res = await fetch(`${base}${path}`, { headers: headers() })
  const text = await res.text()
  return { ok: res.ok, status: res.status, text }
}

async function main() {
  const health = await get('/health')
  if (!health.ok) {
    console.error('FAIL /health', health.status, health.text)
    process.exit(1)
  }
  console.log('OK /health')

  const tools = await get('/api/v1/assistant/tools')
  if (!tools.ok) {
    console.error('FAIL /api/v1/assistant/tools', tools.status, tools.text)
    console.error('(BFF_API_KEY 또는 JWT가 필요하면 BFF_X_KEY / BFF_JWT 를 설정하세요)')
    process.exit(1)
  }
  console.log('OK /api/v1/assistant/tools', tools.text.slice(0, 120))

  const sec = await get('/api/v1/security/status')
  if (!sec.ok) {
    console.error('FAIL /api/v1/security/status', sec.status, sec.text)
    process.exit(1)
  }
  console.log('OK /api/v1/security/status', sec.text.slice(0, 160))
  process.exit(0)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
