import { expect, test } from '@playwright/test'

test.describe('Suite smoke', () => {
  test('오케스트레이터 로드', async ({ page }) => {
    await page.goto('/orchestrator')
    await expect(page.getByRole('heading', { name: 'Command Center' })).toBeVisible()
  })

  test('Yuaimarketing 허브 로드', async ({ page }) => {
    await page.goto('/suite/yuai-hub')
    await expect(page.getByRole('heading', { name: /Yuaimarketing/ })).toBeVisible()
  })

  test('AI 보안 허브 로드', async ({ page }) => {
    await page.goto('/suite/ai-security')
    await expect(page.getByRole('heading', { name: 'AI 보안 허브' })).toBeVisible()
  })
})
