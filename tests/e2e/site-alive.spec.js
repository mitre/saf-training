import { test, expect } from '@playwright/test';
import { visitPage } from '../support/visit-page.js';

test.describe('Page content', () => {
  test('renders the homepage title and introduction', async ({ page }) => {
    await visitPage(page, '/');
    await expect(page).toHaveTitle('MITRE SAF Training | MITRE SAF Training');
    const heading = page.getByRole('main').getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('MITRE SAF Training');
    const introduction = page.locator('main #main-description');
    await expect(introduction).toBeVisible();
    await expect(introduction).toHaveText('From Guidance Document to Automated Testing In No Time!');
  });

  test('renders a course heading and body text on a direct page load', async ({ page }) => {
    await visitPage(page, '/courses/beginner/');
    await expect(page.getByRole('main').getByRole('heading', {
      level: 1, name: 'Beginner Security Automation Developer Class',
    })).toBeVisible();
    await expect(page.locator('main p').filter({
      hasText: 'The purpose of this class is to teach the fundamentals',
    })).toBeVisible();
  });

  test('renders a note with visually distinct styling', async ({ page }) => {
    await visitPage(page, '/courses/beginner/');
    const note = page.locator('main .hint-container.note').filter({
      hasText: 'Does this mean InSpec is the only validation tool I should ever learn to use?',
    });
    await expect(note).toBeVisible();
    await expect(note).toContainText('No. InSpec is powerful, but it cannot accomplish every type of security testing');
    await expect(note).not.toHaveCSS('background-color', /^(transparent|rgba\(0, 0, 0, 0\))$/);
    await expect.poll(() => note.evaluate((element) => {
      const style = getComputedStyle(element);
      return style.backgroundColor !== getComputedStyle(element.parentElement).backgroundColor
        && parseFloat(style.paddingLeft) > 0;
    })).toBe(true);
  });
});
