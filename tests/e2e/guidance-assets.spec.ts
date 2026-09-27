import { test, expect } from '@playwright/test'
import { visitPage, headingText } from '../support/visit-page'

test.describe('STIG Development course assets and links', () => {
  test('loads a bundled image', async ({ page }) => {
    await visitPage(page, '/stig-development/08.html')
    const image = page.getByRole('main').getByRole('img', { name: 'Related Rules Button', exact: true })
    await expect(image).toHaveCount(1)
    await image.scrollIntoViewIfNeeded()
    await expect(image).toBeVisible()
    await expect(image).toHaveJSProperty('complete', true)
    await expect.poll(() => image.evaluate((el: HTMLImageElement) => el.naturalWidth)).toBeGreaterThan(0)
    await expect.poll(() => image.evaluate((el: HTMLImageElement) => el.naturalHeight)).toBeGreaterThan(0)
  })

  test('links to the beginner course', async ({ page }) => {
    await visitPage(page, '/stig-development/09.html')
    const link = page.getByRole('main').getByRole('link', { name: 'training class' })
    // Was an unconverted VuePress alias (@/../../../courses/beginner/) pointing
    // at a path the restructure removed; now an absolute internal link.
    await expect(link).toHaveAttribute('href', '/inspec-training/beginner/')
    await link.click()
    await expect(page).toHaveURL('/inspec-training/beginner/')
    await expect(
      page.getByRole('main').getByRole('heading', { level: 1, name: headingText('InSpec Beginner') })
    ).toBeVisible()
  })
})
