import { expect, test } from '@playwright/test'
import { getRouterPaths } from './lib/router-paths'

/**
 * 모든 라우트에 진입해 lazy 로드 후 콘솔 error / pageerror 수집.
 * 외부 리소스 실패 등은 network 단에서 별도 정책 가능 — 기본은 JS 런타임 오류만 엄격히 본다.
 */
const paths = getRouterPaths()

for (const route of paths) {
  test(`route crawl: ${route}`, async ({ page }) => {
    const errors: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(`[console] ${msg.text()}`)
    })
    page.on('pageerror', (err) => {
      errors.push(`[page] ${err.message}`)
    })

    const res = await page.goto(route, { waitUntil: 'domcontentloaded', timeout: 60_000 })
    expect(res?.ok(), `HTTP ${res?.status()} for ${route}`).toBeTruthy()

    // Stitch 등 lazy chunk 로드·hydration 여유
    await page.waitForTimeout(800)

    expect(errors, `errors on ${route}:\n${errors.join('\n')}`).toEqual([])
  })
}
