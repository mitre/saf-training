import { expect, type Page } from '@playwright/test'

/**
 * Navigate to `path` and wait for Vue to hydrate before interacting.
 *
 * VitePress mounts the app on #app just as VuePress did, so the hydration
 * probe is unchanged: __vue_app__ is only set once createApp().mount() has run.
 * Without this, assertions can race a server-rendered but not-yet-interactive
 * page — tabs and <details> in particular.
 */
export async function visitPage(page: Page, path: string): Promise<void> {
  await page.goto(path)
  await expect
    .poll(() => page.locator('#app').evaluate((app: HTMLElement) => !!(app as any).__vue_app__))
    .toBe(true)
}

/**
 * VitePress appends a zero-width space to heading text for its anchor link,
 * so exact-name matching against a plain string never matches. Build a regex
 * anchored on the real text instead.
 */
export function headingText(text: string): RegExp {
  return new RegExp(`^\\s*${text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*​?\\s*$`)
}
