/**
 * 로컬 E2E: /health → spend-commit → /api/v1/events 에 MarketingSpendCommitted 존재 확인
 * BFF가 떠 있어야 함. 인증: BFF_API_KEY·JWT_SECRET 미설정 시 통과(로컬 기본).
 * 환경: BFF_BASE, BFF_X_KEY, BFF_JWT (smoke-bff와 동일)
 */
const base = (process.env.BFF_BASE ?? 'http://127.0.0.1:8787').replace(/\/$/, '')
const key = process.env.BFF_X_KEY?.trim()
const jwt = process.env.BFF_JWT?.trim()

function headers(extra = {}) {
  const h = { 'Content-Type': 'application/json', ...extra }
  if (key) h['X-BFF-Key'] = key
  if (jwt) h['Authorization'] = `Bearer ${jwt}`
  return h
}

async function main() {
  const h = await fetch(`${base}/health`)
  if (!h.ok) {
    console.error('FAIL /health', h.status, await h.text())
    process.exit(1)
  }
  console.log('OK /health')

  const idem = `e2e_${Date.now()}_${Math.random().toString(36).slice(2)}`
  const spendBody = JSON.stringify({
    tenant_id: 'tnt_e2e',
    period: '2026-03',
    amount_cents: 100,
    spend_category: 'digital_ads',
    campaign_id: 'cmp_e2e',
    department_code: 'MKT',
  })
  const post = await fetch(`${base}/api/v1/erp/finance/spend-commit`, {
    method: 'POST',
    headers: headers({ 'Idempotency-Key': idem }),
    body: spendBody,
  })
  const postText = await post.text()
  if (!post.ok) {
    console.error('FAIL POST /api/v1/erp/finance/spend-commit', post.status, postText)
    console.error('(로컬에서 401이면 BFF_API_KEY·JWT_SECRET을 비우거나 BFF_X_KEY/BFF_JWT 설정)')
    process.exit(1)
  }
  console.log('OK spend-commit', postText.slice(0, 200))

  const ev = await fetch(`${base}/api/v1/events?limit=20`, { headers: headers() })
  if (!ev.ok) {
    console.error('FAIL GET /api/v1/events', ev.status, await ev.text())
    process.exit(1)
  }
  const data = JSON.parse(await ev.text())
  const events = data.events ?? []
  const found = events.some(
    (row) =>
      row.kind === 'MarketingSpendCommitted' ||
      (row.payload && JSON.stringify(row.payload).includes('MarketingSpendCommitted')),
  )
  if (!found) {
    console.error('FAIL: outbox에 MarketingSpendCommitted 없음', JSON.stringify(events).slice(0, 500))
    process.exit(1)
  }
  console.log('OK /api/v1/events contains MarketingSpendCommitted')
  process.exit(0)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
