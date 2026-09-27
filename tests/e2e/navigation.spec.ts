import { test, expect } from '@playwright/test'
import { visitPage, headingText } from '../support/visit-page'

test.describe('Course navigation', () => {
  test('opens a course from the InSpec Training dropdown', async ({ page }) => {
    await visitPage(page, '/')
    const navigation = page.locator('header nav')
    // The VuePress "Classes" dropdown became the SEO-oriented "InSpec Training".
    await navigation.getByRole('button', { name: 'InSpec Training', exact: true }).press('Enter')
    await navigation.getByRole('link', { name: 'Beginner Tutorial', exact: true }).click()
    await expect(page).toHaveURL('/inspec-training/beginner/')
    await expect(
      page.getByRole('main').getByRole('heading', { level: 1, name: headingText('InSpec Beginner') })
    ).toBeVisible()
  })

  test('opens a lesson from the course sidebar', async ({ page }) => {
    await visitPage(page, '/inspec-training/beginner/')
    await page.locator('aside').getByRole('link', { name: '2. What is an InSpec Profile?', exact: true }).click()
    await expect(page).toHaveURL('/inspec-training/beginner/02.html')
    await expect(
      page.getByRole('main').getByRole('heading', { level: 2, name: headingText('What is an InSpec Profile?') })
    ).toBeVisible()
  })

  test('sidebar is present on lesson pages', async ({ page }) => {
    await visitPage(page, '/inspec-training/beginner/02.html')
    await expect(page.locator('aside.VPSidebar')).toBeVisible()
  })
})
