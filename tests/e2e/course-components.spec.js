import { test, expect } from '@playwright/test';
import { visitPage } from '../support/visit-page.js';

test.describe('Interactive course content', () => {
  test('renders the profile overlay flowchart', async ({ page }) => {
    await visitPage(page, '/courses/beginner/10.html');
    const diagram = page.locator('main .flowchart-wrapper svg');
    await expect(diagram).toHaveCount(1, { timeout: 20000 });
    await expect(diagram).toBeVisible();
    await expect.poll(() => diagram.locator('text').allTextContents())
      .toEqual(expect.arrayContaining(['my_nginx_overlay', 'my_nginx']));
  });

  test('expands and collapses the overlay instructions', async ({ page }) => {
    await visitPage(page, '/courses/beginner/10.html');
    const instructions = page.locator('main details').filter({ hasText: 'How to initialize the overlay' });
    const code = instructions.locator('code').first();
    await expect(instructions).not.toHaveAttribute('open');
    await expect(code).toBeHidden();
    await instructions.locator('summary').click();
    await expect(instructions).toHaveAttribute('open');
    await expect(code).toBeVisible();
    await expect(code).toContainText('inspec init profile my_nginx_overlay');
    await instructions.locator('summary').click();
    await expect(instructions).not.toHaveAttribute('open');
    await expect(code).toBeHidden();
  });

  test('switches between command and output code tabs', async ({ page }) => {
    await visitPage(page, '/courses/beginner/11.html');
    const example = page.locator('main .vp-code-tabs').filter({ hasText: 'saf generate inspec_profile --help' });
    const commandTab = example.getByRole('tab', { name: 'Command', exact: true });
    const outputTab = example.getByRole('tab', { name: 'Output', exact: true });
    const command = example.getByRole('tabpanel', { includeHidden: true })
      .filter({ hasText: 'saf generate inspec_profile --help' });
    const output = example.getByRole('tabpanel', { includeHidden: true })
      .filter({ hasText: 'Generate a new skeleton profile' });
    await expect(commandTab).toHaveAttribute('aria-selected', 'true');
    await expect(output).toBeHidden();
    await outputTab.click();
    await expect(outputTab).toHaveAttribute('aria-selected', 'true');
    await expect(output).toBeVisible();
    await expect(command).toBeHidden();
    await commandTab.click();
    await expect(command).toBeVisible();
    await expect(output).toBeHidden();
  });
});
