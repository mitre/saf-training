import { test, expect } from '@playwright/test';
import { visitPage } from '../support/visit-page.js';

test.describe('Guidance course assets and links', () => {
  test('loads a bundled image', async ({ page }) => {
    await visitPage(page, '/courses/guidance/08.html');
    const image = page.getByRole('main').getByRole('img', { name: 'Related Rules Button', exact: true });
    await expect(image).toHaveCount(1);
    await image.scrollIntoViewIfNeeded();
    await expect(image).toBeVisible();
    await expect(image).toHaveJSProperty('complete', true);
    await expect.poll(() => image.evaluate((element) => element.naturalWidth)).toBeGreaterThan(0);
    await expect.poll(() => image.evaluate((element) => element.naturalHeight)).toBeGreaterThan(0);
  });

  test('links to the beginner course', async ({ page }) => {
    await visitPage(page, '/courses/guidance/09.html');
    const link = page.getByRole('main').getByRole('link', { name: 'training class' });
    await expect(link).toHaveAttribute('href', '/courses/beginner/');
    await link.click();
    await expect(page).toHaveURL('/courses/beginner/');
    await expect(page.getByRole('main').getByRole('heading', {
      level: 1, name: 'Beginner Security Automation Developer Class',
    })).toBeVisible();
  });
});
