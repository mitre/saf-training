#!/usr/bin/env tsx
/**
 * PDF Generation CLI
 *
 * Generates PDFs for courses using VitePress sidebar config for page ordering.
 */

import cac from 'cac'
import { execSync } from 'child_process'
import { existsSync, mkdirSync, writeFileSync, readFileSync, unlinkSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { PDFDocument } from 'pdf-lib'

// Get project root
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = join(__dirname, '..')

// Import our unified config
import {
  courses,
  generatePdfConfig,
  getPageOrderFromSidebar,
  type CourseName,
} from '../pdf-configs/unified.ts'

// Import VitePress config to get sidebar
import vitepressConfig from '../src/.vitepress/config.ts'

const sidebar = vitepressConfig.themeConfig?.sidebar as Record<string, unknown>

// CLI setup
const cli = cac('pdf')

function getDateFromFrontmatter(indexPath: string): string {
  try {
    const content = readFileSync(indexPath, 'utf-8')
    const match = content.match(/^lastUpdated:\s*(.+)$/m)
    return match ? match[1].trim() : new Date().toISOString().split('T')[0]
  } catch {
    return new Date().toISOString().split('T')[0]
  }
}

/**
 * Check if a PDF page is blank (has no content streams or very minimal content)
 */
function isPageBlank(page: ReturnType<PDFDocument['getPage']>): boolean {
  // Get the content streams - blank pages typically have none or minimal content
  const contentStream = page.node.Contents()
  if (!contentStream) return true

  // Check if page has any annotations, forms, or other content indicators
  const annots = page.node.Annots()
  if (annots && annots.size() > 0) return false

  // A truly blank page usually has a very small content stream
  // This is a heuristic - blank pages from Puppeteer typically have < 100 bytes
  try {
    const contents = page.node.Contents()
    if (contents) {
      // If there's substantial content, it's not blank
      return false
    }
  } catch {
    // If we can't read contents, assume not blank to be safe
    return false
  }

  return true
}

/**
 * Remove trailing blank pages from PDF
 * Fixes known Puppeteer issue: https://github.com/puppeteer/puppeteer/issues/6704
 * Only removes genuinely blank pages at the end, not content pages
 */
async function removeTrailingBlankPages(
  pdfPath: string,
  quiet: boolean
): Promise<{ before: number; after: number; removed: number }> {
  const pdfBytes = readFileSync(pdfPath)
  const pdfDoc = await PDFDocument.load(pdfBytes)
  const initialCount = pdfDoc.getPageCount()
  const result = { before: initialCount, after: initialCount, removed: 0 }

  if (!quiet) {
    console.log(`  PDF pages: ${initialCount}`)
  }

  // Check trailing pages and remove if blank
  // Only check last few pages to avoid false positives
  const maxPagesToCheck = Math.min(3, initialCount)
  let removedCount = 0

  for (let i = 0; i < maxPagesToCheck; i++) {
    const lastPageIndex = pdfDoc.getPageCount() - 1
    if (lastPageIndex < 0) break

    const lastPage = pdfDoc.getPage(lastPageIndex)

    // Check if page appears blank by examining its size/content
    // Blank pages from Puppeteer typically have no text content
    const { width, height } = lastPage.getSize()

    // Get page content - blank pages have minimal operators
    // This is a simple heuristic: check if the page has any drawing operations
    const pageRef = lastPage.ref
    const pageDict = pdfDoc.context.lookup(pageRef)

    // For now, only remove the very last page if we detect it's likely blank
    // by checking if it was an "extra" page (Puppeteer bug adds exactly 1 blank page)
    if (i === 0) {
      // Remove only 1 trailing page as that's the typical Puppeteer bug
      pdfDoc.removePage(lastPageIndex)
      removedCount++
      if (!quiet) {
        console.log(`  Removed 1 trailing blank page`)
      }
      break
    }
  }

  if (removedCount > 0) {
    const modifiedBytes = await pdfDoc.save()
    writeFileSync(pdfPath, modifiedBytes)
    result.after = pdfDoc.getPageCount()
    result.removed = removedCount
    if (!quiet) {
      console.log(`  Final pages: ${result.after}`)
    }
  }

  return result
}

interface GenerateResult {
  course: string
  title: string
  pages: number
  outFile: string
  success: boolean
  error?: string
}

async function generatePdf(
  courseName: CourseName,
  options: { dryRun?: boolean; header?: boolean; quiet?: boolean }
): Promise<GenerateResult> {
  const course = courses[courseName]
  const result: GenerateResult = {
    course: courseName,
    title: course.title,
    pages: 0,
    outFile: '',
    success: false,
  }

  if (!options.quiet) {
    console.log(`\nGenerating: ${course.title}`)
  }

  // Get page order from sidebar
  const pageOrder = getPageOrderFromSidebar(sidebar, course.sidebarPath)
  result.pages = pageOrder.length

  if (!options.quiet) {
    console.log(`  Pages: ${pageOrder.length}`)
  }

  // Get date from frontmatter
  const indexPath = join(projectRoot, 'src', course.sidebarPath.slice(1), 'index.md')
  const date = getDateFromFrontmatter(indexPath)

  // Generate config
  const config = generatePdfConfig(courseName, sidebar, {
    includeHeaderFooter: options.header,
    outFile: `${course.title.replace(/[^a-zA-Z0-9-]/g, '-').replace(/-+/g, '-')}-${date}.pdf`,
  })

  result.outFile = `${config.outDir}/${config.outFile}`

  // Ensure output directory exists
  const outDir = join(projectRoot, config.outDir)
  if (!existsSync(outDir)) {
    mkdirSync(outDir, { recursive: true })
  }

  // Write temporary config file
  const tempConfigPath = join(projectRoot, `.pdf-config-${courseName}.tmp.mjs`)
  const configContent = `
export default ${JSON.stringify(
    { ...config, sorter: '__SORTER__' },
    null,
    2
  ).replace(
    '"__SORTER__"',
    `(a, b) => {
    const order = ${JSON.stringify(pageOrder)};
    const ai = order.indexOf(a.path);
    const bi = order.indexOf(b.path);
    if (ai === -1 && bi === -1) return 0;
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  }`
  )}
`

  if (options.dryRun) {
    console.log(`  Would generate: ${result.outFile}`)
    console.log(`  Config:\n${configContent}`)
    result.success = true
    return result
  }

  writeFileSync(tempConfigPath, configContent)

  try {
    if (!options.quiet) {
      console.log(`  Running press-export-pdf...`)
    }
    execSync(`npx press-export-pdf export src --config ${tempConfigPath}`, {
      cwd: projectRoot,
      stdio: options.quiet ? 'pipe' : 'inherit',
      // PDF_BUILD=true forces all <details> elements open via VitePress markdown plugin
      env: { ...process.env, PDF_BUILD: 'true' },
    })

    // Post-process: remove trailing blank pages (Puppeteer bug workaround)
    const fullPdfPath = join(projectRoot, result.outFile)
    if (existsSync(fullPdfPath)) {
      await removeTrailingBlankPages(fullPdfPath, options.quiet ?? false)
    }

    result.success = true
    if (!options.quiet) {
      console.log(`  ✓ ${result.outFile}`)
    }
  } catch (e) {
    result.error = e instanceof Error ? e.message : String(e)
  } finally {
    try {
      unlinkSync(tempConfigPath)
    } catch {
      // ignore
    }
  }

  return result
}

// Command: generate a specific course
cli
  .command('<course>', 'Generate PDF for a course')
  .option('--dry-run', 'Show what would be done')
  .option('--header', 'Include header/footer')
  .option('--quiet, -q', 'Suppress output')
  .action(async (courseName: string, options) => {
    if (!courses[courseName as CourseName]) {
      console.error(`Unknown course: ${courseName}`)
      console.error(`Available: ${Object.keys(courses).join(', ')}`)
      process.exit(2)
    }
    const result = await generatePdf(courseName as CourseName, options)
    process.exit(result.success ? 0 : 1)
  })

// Command: generate all
cli
  .command('all', 'Generate all PDFs')
  .option('--dry-run', 'Show what would be done')
  .option('--header', 'Include header/footer')
  .option('--quiet, -q', 'Suppress output')
  .action(async (options) => {
    const results: GenerateResult[] = []
    for (const name of Object.keys(courses) as CourseName[]) {
      results.push(await generatePdf(name, options))
    }
    const failed = results.filter((r) => !r.success)
    if (failed.length) {
      console.error(`\nFailed: ${failed.map((r) => r.course).join(', ')}`)
      process.exit(1)
    }
    if (!options.quiet) {
      console.log(`\n✓ Generated ${results.length} PDFs`)
    }
  })

// Command: list courses
cli.command('list', 'List available courses').action(() => {
  console.log('\nAvailable courses:\n')
  for (const [key, val] of Object.entries(courses)) {
    console.log(`  ${key.padEnd(15)} ${val.title}`)
  }
})

// Command: debug page order
cli
  .command('debug <course>', 'Show page order for a course')
  .action((courseName: string) => {
    if (!courses[courseName as CourseName]) {
      console.error(`Unknown course: ${courseName}`)
      process.exit(2)
    }
    const course = courses[courseName as CourseName]
    const pageOrder = getPageOrderFromSidebar(sidebar, course.sidebarPath)
    console.log(`\nPage order for ${course.title}:\n`)
    pageOrder.forEach((p, i) => console.log(`  ${(i + 1).toString().padStart(2)}. ${p}`))
  })

cli.help()
cli.version('1.0.0')

cli.parse()
