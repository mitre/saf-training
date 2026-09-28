import { test, expect } from '@playwright/test'
import { visitPage } from '../support/visit-page'

test.describe('STIG Development course diagrams', () => {
  // /courses/guidance/ became /stig-development/.
  const pages = [
    { path: '/stig-development/04.html', label: 'Do I need to comply with DOD requirements?' },
    { path: '/stig-development/07.html', label: 'Status: Not Applicable' },
  ]

  for (const { path, label } of pages) {
    test(`renders the flowchart on ${path}`, async ({ page }) => {
      await visitPage(page, path)
      // vitepress-plugin-mermaid renders into .mermaid (VuePress used
      // .mermaid-content); the SVG is produced client-side, hence the timeout.
      const diagram = page.locator('main .mermaid svg')
      await expect(diagram).toHaveCount(1, { timeout: 20000 })
      await expect(diagram).toBeVisible()
      await expect(diagram).toContainText(label)
      await expect(diagram.locator('.node').first()).toBeAttached()
    })
  }
})
