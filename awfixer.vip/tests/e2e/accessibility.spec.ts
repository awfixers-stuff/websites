import { test, expect } from '@playwright/test'
import { injectAxe, checkA11y, getViolations } from 'axe-playwright'

test.describe('Accessibility Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await injectAxe(page)
  })

  test('homepage should have no accessibility violations', async ({ page }) => {
    const violations = await getViolations(page, null, {
      detailedReport: true,
    })

    expect(violations).toHaveLength(0)
  })

  test('all pages should be accessible', async ({ page }) => {
    const pages = ['/', '/about', '/contact', '/privacy', '/terms']

    for (const path of pages) {
      await page.goto(path)
      await page.waitForLoadState('networkidle')

      await checkA11y(page, null, {
        detailedReport: true,
        detailedReportOptions: { html: true },
      })
    }
  })

  test('keyboard navigation works', async ({ page }) => {
    await page.goto('/')

    // Test tab navigation
    await page.keyboard.press('Tab')
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName)
    expect(['A', 'BUTTON', 'INPUT', 'TEXTAREA']).toContain(focusedElement)
  })
})

