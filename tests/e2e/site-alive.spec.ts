import { test, expect } from '@playwright/test'
import { visitPage } from '../support/visit-page'

test.describe('Page content', () => {
  test('renders the homepage title and tagline', async ({ page }) => {
    await visitPage(page, '/')
    await expect(page).toHaveTitle('MITRE SAF Training - MITRE SAF Training')
    // The VPHero home layout renders no <main> landmark, so scope to the hero.
    const heading = page.getByRole('heading', { level: 1 })
    await expect(heading).toBeVisible()
    await expect(heading).toContainText('MITRE SAF')
    const tagline = page.locator('.VPHero .tagline')
    await expect(tagline).toBeVisible()
    await expect(tagline).toContainText('From Guidance Document to Automated Testing In No Time!')
  })

  test('renders a course landing heading and body text on a direct page load', async ({ page }) => {
    await visitPage(page, '/inspec-training/beginner/')
    await expect(
      page.getByRole('main').getByRole('heading', { level: 1, name: 'InSpec Beginner' })
    ).toBeVisible()
    await expect(page.locator('main')).toContainText('Before You Start')
  })

  test('renders a lesson page heading on a direct page load', async ({ page }) => {
    // Lesson pages have no h1 — the frontmatter title feeds <title> and the
    // sidebar, and the top in-page heading is an h2.
    await visitPage(page, '/inspec-training/beginner/02.html')
    await expect(page).toHaveTitle(/What is an InSpec Profile\?/)
    await expect(
      page.getByRole('main').getByRole('heading', { level: 2, name: 'What is an InSpec Profile?' })
    ).toBeVisible()
  })

  test('renders a callout with visually distinct styling', async ({ page }) => {
    await visitPage(page, '/inspec-training/beginner/')
    const callout = page.locator('main .custom-block.warning').filter({ hasText: 'Before You Start' })
    await expect(callout).toBeVisible()
    await expect(callout).toContainText('Basic command line experience')
    // Not merely transparent, and visually separated from its surroundings.
    await expect(callout).not.toHaveCSS('background-color', /^(transparent|rgba\(0, 0, 0, 0\))$/)
    await expect
      .poll(() =>
        callout.evaluate((el: HTMLElement) => {
          const style = getComputedStyle(el)
          return (
            style.backgroundColor !== getComputedStyle(el.parentElement as HTMLElement).backgroundColor &&
            parseFloat(style.paddingLeft) > 0
          )
        })
      )
      .toBe(true)
  })
})
