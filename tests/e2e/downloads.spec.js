import { test, expect } from '@playwright/test';
import { visitPage } from '../support/visit-page.js';

test.describe('Linked resources', () => {
  test('serves the linked Vendor STIG PDF as a PDF', async ({ page, request, baseURL }) => {
    await visitPage(page, '/resources/');
    const link = page.getByRole('main').getByRole('link', { name: 'Vendor STIG Process Guide' });
    const url = new URL(await link.getAttribute('href'), page.url());
    expect(url.origin).toBe(new URL(baseURL).origin);
    const response = await request.get(url.href);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/pdf');
    expect((await response.body()).subarray(0, 5).toString()).toBe('%PDF-');
  });

  test('serves the linked delta report as structured JSON', async ({ page, request, baseURL }) => {
    await visitPage(page, '/courses/delta/05.html');
    const link = page.getByRole('main').getByRole('link', { name: 'Sample delta.json file' });
    const url = new URL(await link.getAttribute('href'), page.url());
    expect(url.origin).toBe(new URL(baseURL).origin);
    const response = await request.get(url.href);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');
    const body = await response.json();
    for (const ids of [body.ignoreFormattingDiff.addedControlIDs, body.ignoreFormattingDiff.changedControlIDs]) {
      expect(Array.isArray(ids)).toBe(true);
      expect(ids.length).toBeGreaterThan(0);
    }
  });

  test('returns 404 for missing pages and assets', async ({ request }) => {
    for (const url of ['/__missing_e2e_page__.html', '/assets/__missing_e2e_image__.png']) {
      const response = await request.get(url);
      expect(response.status()).toBe(404);
    }
  });
});
