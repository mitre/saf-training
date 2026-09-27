import { test, expect } from '@playwright/test';
import { visitPage } from '../support/visit-page.js';

test.describe('Course navigation', () => {
  test('opens a course from the Classes dropdown', async ({ page }) => {
    await visitPage(page, '/');
    const navigation = page.locator('header nav');
    await navigation.getByRole('button', { name: 'Classes', exact: true }).press('Enter');
    await navigation.getByRole('link', {
      name: 'Beginner Security Automation Developer Class', exact: true,
    }).click();
    await expect(page).toHaveURL('/courses/beginner/');
    await expect(page.getByRole('main').getByRole('heading', {
      level: 1, name: 'Beginner Security Automation Developer Class',
    })).toBeVisible();
  });

  test('opens a lesson from the course sidebar', async ({ page }) => {
    await visitPage(page, '/courses/beginner/');
    await page.locator('aside').getByRole('link', {
      name: '2. What is an InSpec Profile?', exact: true,
    }).click();
    await expect(page).toHaveURL('/courses/beginner/02.html');
    await expect(page.getByRole('main').getByRole('heading', {
      level: 1, name: 'What is an InSpec Profile?',
    })).toBeVisible();
  });
});
