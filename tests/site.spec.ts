import { test, expect } from '@playwright/test'

test.describe('Site Basics', () => {
  test('home page loads with correct title', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/MITRE SAF Training/)
  })

  test('all 7 course landing pages load', async ({ page }) => {
    const courses = [
      '/getting-started/',
      '/inspec-training/beginner/',
      '/inspec-training/advanced/',
      '/inspec-training/profile-development/',
      '/stig-development/',
      '/security-automation/delta/',
      '/security-automation/mappers/',
    ]

    for (const url of courses) {
      await page.goto(url)
      // Page should load (status 200) and have a heading
      await expect(page.locator('h1').first()).toBeVisible()
    }
  })
})

test.describe('Navigation', () => {
  test('top navigation exists and is visible', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('.VPNav')).toBeVisible()
  })

  test('sidebar exists on course pages', async ({ page }) => {
    await page.goto('/getting-started/')
    await expect(page.locator('.VPSidebar')).toBeVisible()
  })
})

test.describe('Content Features', () => {
  test('search is available', async ({ page }) => {
    await page.goto('/')
    // Search button should exist
    const searchButton = page.locator('button').filter({ hasText: /search/i }).or(page.locator('.VPNavBarSearch'))
    await expect(searchButton.first()).toBeVisible()
  })

  test('images load on pages', async ({ page }) => {
    await page.goto('/getting-started/03')
    await page.waitForLoadState('networkidle')

    // Wait for images to load
    const images = page.locator('img[src^="/assets"]')
    await expect(images.first()).toBeAttached({ timeout: 10000 })

    // Verify image count
    const count = await images.count()
    expect(count).toBeGreaterThan(0)
  })
})

// Note: Giscus comments require proper origin/domain to load iframe
// Cannot be reliably tested on localhost
// Manual verification required on Netlify preview and production

test.describe('Build Output Verification', () => {
  test('sitemap.xml exists in build', async ({ page }) => {
    const response = await page.goto('/sitemap.xml')
    expect(response?.status()).toBe(200)
  })
})
