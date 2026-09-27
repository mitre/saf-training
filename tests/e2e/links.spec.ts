import { test, expect, request as playwrightRequest } from '@playwright/test'
import { readFileSync, readdirSync, statSync } from 'fs'
import { join, relative } from 'path'

const DIST = join(process.cwd(), 'src/.vitepress/dist')

function htmlFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) return htmlFiles(full)
    return full.endsWith('.html') ? [full] : []
  })
}

/** Every internal href in the built site, as {page, href} pairs. */
function internalLinks(): { page: string; href: string }[] {
  const out: { page: string; href: string }[] = []
  for (const file of htmlFiles(DIST)) {
    const html = readFileSync(file, 'utf-8')
    for (const m of html.matchAll(/<a\s[^>]*href="([^"]+)"/g)) {
      const href = m[1]
      if (/^(https?:|mailto:|tel:|#|javascript:)/i.test(href)) continue
      out.push({ page: '/' + relative(DIST, file), href })
    }
  }
  return out
}

test.describe('Built site internal links', () => {
  test('no href retains an unconverted VuePress "@/" alias', () => {
    const bad = internalLinks().filter((l) => l.href.includes('@/'))
    expect(bad, `VuePress aliases leaked into built hrefs:\n${bad.map((b) => `  ${b.page} -> ${b.href}`).join('\n')}`).toEqual([])
  })

  test('no href points at the retired /courses/ structure', () => {
    const bad = internalLinks().filter((l) => l.href.includes('/courses/'))
    expect(bad, `links to retired /courses/ paths:\n${bad.map((b) => `  ${b.page} -> ${b.href}`).join('\n')}`).toEqual([])
  })

  test('every internal link resolves (no 404s)', async ({ baseURL }) => {
    const ctx = await playwrightRequest.newContext({ baseURL })
    const seen = new Map<string, { page: string; href: string }>()
    for (const l of internalLinks()) {
      const resolved = new URL(l.href, new URL(l.page, baseURL)).pathname
      if (!seen.has(resolved)) seen.set(resolved, l)
    }
    const broken: string[] = []
    for (const [path, origin] of seen) {
      const res = await ctx.get(path)
      if (res.status() >= 400) broken.push(`  ${origin.page} -> ${origin.href} (${res.status()} at ${path})`)
    }
    await ctx.dispose()
    expect(broken, `broken internal links:\n${broken.join('\n')}`).toEqual([])
  })
})
