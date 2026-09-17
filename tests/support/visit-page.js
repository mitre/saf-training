import { expect } from '@playwright/test';

export async function visitPage(page, path) {
  await page.goto(path);
  // Wait for Vue hydration before interacting.
  await expect.poll(() => page.locator('#app').evaluate((app) => !!app.__vue_app__)).toBe(true);
}
