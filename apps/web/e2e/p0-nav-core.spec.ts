import { expect, test } from '@playwright/test'

/** `src/app/navCorePaths.ts` 와 동기화 (import 경로 회피: E2E 러너 단순화) */
const NAV_CORE_PATHS = [
  '/orchestrator',
  '/ops/network-health',
  '/dashboards/principal',
  '/dashboards/personalizado',
  '/account/register',
  '/suite/yuai-hub',
  '/suite/crm/local',
  '/suite/erp/finance',
  '/suite/pipeline',
  '/suite/tool-approvals',
  '/suite/ai-security',
  '/video/ai-team',
  '/settings',
  '/setup/assistant',
  '/setup/assistant-updated',
] as const

const HEADING_ASSERTS: Partial<Record<(typeof NAV_CORE_PATHS)[number], string | RegExp>> = {
  '/orchestrator': 'Command Center',
  '/suite/yuai-hub': /Yuaimarketing/,
  '/suite/ai-security': 'AI 보안 허브',
}

test.describe('P0 core nav', () => {
  for (const route of NAV_CORE_PATHS) {
    test(`P0 ${route}`, async ({ page }) => {
      const errors: string[] = []
      page.on('console', (msg) => {
        if (msg.type() === 'error') errors.push(msg.text())
      })
      page.on('pageerror', (err) => errors.push(err.message))

      const res = await page.goto(route, { waitUntil: 'domcontentloaded', timeout: 60_000 })
      expect(res?.ok(), `HTTP ${res?.status()}`).toBeTruthy()
      await page.waitForTimeout(600)

      const expected = HEADING_ASSERTS[route]
      if (expected !== undefined) {
        await expect(page.getByRole('heading', { name: expected })).toBeVisible()
      } else {
        await expect(page.getByRole('heading').first()).toBeVisible()
      }

      expect(errors, `console/page errors on ${route}:\n${errors.join('\n')}`).toEqual([])
    })
  }
})
