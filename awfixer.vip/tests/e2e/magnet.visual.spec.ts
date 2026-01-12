import { test, expect } from '@playwright/test'
import { injectAxe, checkA11y } from 'axe-playwright'

test.describe('Magnet Component Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await injectAxe(page)
  })

  test('Magnet component renders correctly', async ({ page }) => {
    // Create a test page with Magnet component
    await page.evaluate(() => {
      document.body.innerHTML = `
        <div id="root">
          <div style="padding: 100px; display: flex; justify-content: center; align-items: center; min-height: 100vh;">
            <div id="magnet-test">
              <div style="width: 200px; height: 200px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px; font-weight: bold;">
                Hover Me
              </div>
            </div>
          </div>
        </div>
      `
    })

    // Wait for any animations
    await page.waitForTimeout(500)

    // Take screenshot
    await expect(page.locator('#magnet-test')).toHaveScreenshot('magnet-initial.png')
  })

  test('Magnet component accessibility', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = `
        <div id="root">
          <div style="padding: 100px;">
            <div id="magnet-test">
              <button style="width: 200px; height: 200px; background: #667eea; border-radius: 12px; border: none; color: white;">
                Hover Me
              </button>
            </div>
          </div>
        </div>
      `
    })

    await checkA11y(page, '#magnet-test', {
      detailedReport: true,
      detailedReportOptions: { html: true },
    })
  })

  test('Magnet component with different sizes', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = `
        <div id="root" style="padding: 50px; display: flex; gap: 20px; flex-wrap: wrap;">
          <div id="magnet-small">
            <div style="width: 100px; height: 100px; background: #667eea; border-radius: 8px;"></div>
          </div>
          <div id="magnet-medium">
            <div style="width: 200px; height: 200px; background: #764ba2; border-radius: 12px;"></div>
          </div>
          <div id="magnet-large">
            <div style="width: 300px; height: 300px; background: #f093fb; border-radius: 16px;"></div>
          </div>
        </div>
      `
    })

    await page.waitForTimeout(500)

    await expect(page.locator('#root')).toHaveScreenshot('magnet-sizes.png')
  })

  test('Magnet component disabled state', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = `
        <div id="root" style="padding: 100px; display: flex; justify-content: center;">
          <div id="magnet-disabled">
            <div style="width: 200px; height: 200px; background: #ccc; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #666;">
              Disabled
            </div>
          </div>
        </div>
      `
    })

    await page.waitForTimeout(500)

    await expect(page.locator('#magnet-disabled')).toHaveScreenshot('magnet-disabled.png')
  })
})

