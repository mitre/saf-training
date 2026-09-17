import { test, expect } from '@playwright/test';
import { visitPage } from '../support/visit-page.js';

test.describe('Guidance course diagrams', () => {
  const pages = [
    { path: '/courses/guidance/04.html', label: 'Do I need to comply with DOD requirements?' },
    { path: '/courses/guidance/07.html', label: 'Status: Not Applicable' },
  ];

  for (const { path, label } of pages) {
    test(`renders the flowchart on ${path}`, async ({ page }) => {
      await visitPage(page, path);
      const diagram = page.locator('main .mermaid-content svg');
      await expect(diagram).toHaveCount(1, { timeout: 20000 });
      await expect(diagram).toBeVisible();
      await expect(diagram).toContainText(label);
      await expect(diagram.locator('.node').first()).toBeAttached();
    });
  }
});
