import { expect, type Page } from '@playwright/test'

/**
 * Navigate to `path` and wait for VitePress to hydrate before interacting.
 *
 * VuePress could be probed via `#app.__vue_app__`, but that does not work here:
 * a VitePress production build exposes no `__vue_app__` / `__vnode` on the mount
 * container, and Vue only attaches `__vueParentComponent` to elements in dev.
 *
 * `__VP_HASH_MAP__` is defined by the client bundle, so its presence means the
 * app script has executed and Vue has mounted. Interactions (tab clicks,
 * <details> toggles, nav dropdowns) are unreliable before that point.
 */
export async function visitPage(page: Page, path: string): Promise<void> {
  await page.goto(path)
  await expect
    .poll(() => page.evaluate(() => typeof (window as any).__VP_HASH_MAP__ !== 'undefined'), {
      timeout: 15000,
    })
    .toBe(true)
}
