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

test.describe('Interactive Features', () => {
  test('Giscus comments NOT shown on home page', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Should not have Giscus frame on home
    const giscusFrames = page.locator('iframe.giscus-frame')
    await expect(giscusFrames).toHaveCount(0)
  })

  test('Giscus script loads on lesson pages', async ({ page }) => {
    await page.goto('/getting-started/02')
    await page.waitForLoadState('networkidle')

    // Check if Giscus script tag exists (it may not load iframe in CI without proper origin)
    const giscusScript = page.locator('script[src*="giscus"]')
    const scriptCount = await giscusScript.count()

    // Either the script loads OR the iframe appears
    const giscusFrame = page.locator('iframe.giscus-frame')
    const frameCount = await giscusFrame.count()

    // At least one should exist
    expect(scriptCount + frameCount).toBeGreaterThan(0)
  })
})

test.describe('Build Output Verification', () => {
  test('sitemap.xml exists in build', async ({ page }) => {
    const response = await page.goto('/sitemap.xml')
    expect(response?.status()).toBe(200)
  })
})
