/**
 * Unified PDF Configuration Generator
 *
 * Reads VitePress sidebar config to generate PDF configs with correct page ordering.
 * Zero manual page ordering needed - derives order from your existing sidebar config.
 *
 * Usage:
 *   node --experimental-strip-types scripts/generate-pdf.ts beginner
 *   node --experimental-strip-types scripts/generate-pdf.ts --list
 *   node --experimental-strip-types scripts/generate-pdf.ts --all
 */

// Course metadata - the only thing you need to maintain
export const courses = {
  'getting-started': {
    title: 'Getting Started - SAF User Class',
    sidebarPath: '/getting-started/',
  },
  'beginner': {
    title: 'InSpec Training - Beginner',
    sidebarPath: '/inspec-training/beginner/',
  },
  'advanced': {
    title: 'InSpec Training - Advanced',
    sidebarPath: '/inspec-training/advanced/',
  },
  'profile-dev': {
    title: 'InSpec Profile Development & Testing',
    sidebarPath: '/inspec-training/profile-development/',
  },
  'stig': {
    title: 'STIG Development',
    sidebarPath: '/stig-development/',
  },
  'delta': {
    title: 'SAF Delta Tool',
    sidebarPath: '/security-automation/delta/',
  },
  'mappers': {
    title: 'OHDF Mapper Development',
    sidebarPath: '/security-automation/mappers/',
  },
} as const

export type CourseName = keyof typeof courses

// Shared PDF settings
export const pdfDefaults = {
  outDir: 'pdfs',
  urlOrigin: 'http://localhost:4173',
  pdf: {
    printBackground: true,
    format: 'A4' as const,
    margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' },
  },
}

// Types for VitePress sidebar structure
interface SidebarItem {
  text: string
  link: string
  items?: SidebarItem[]
}

interface SidebarSection {
  base: string
  items: SidebarItem[]
}

type Sidebar = Record<string, SidebarSection>

/**
 * Extract page order from VitePress sidebar config
 */
export function getPageOrderFromSidebar(
  sidebar: Sidebar,
  sidebarPath: string
): string[] {
  const section = sidebar[sidebarPath]
  if (!section) {
    throw new Error(`Sidebar section not found: ${sidebarPath}`)
  }

  const pages: string[] = []
  const base = section.base.replace(/\/$/, '') // Remove trailing slash

  // Index page is always first (it's the folder, not in items)
  pages.push(`${base}/index.html`)

  // Recursively extract links from items
  function extractLinks(items: SidebarItem[]) {
    for (const item of items) {
      if (item.link) {
        // Convert link to full path: "02" -> "/inspec-training/beginner/02.html"
        const fullPath = item.link.startsWith('/')
          ? `${item.link}.html`
          : `${base}/${item.link}.html`
        pages.push(fullPath)
      }
      if (item.items) {
        extractLinks(item.items)
      }
    }
  }

  extractLinks(section.items)
  return pages
}

/**
 * Generate a sorter function for press-export-pdf
 */
export function createSorter(pageOrder: string[]) {
  return (pageA: { path: string }, pageB: { path: string }) => {
    const aIndex = pageOrder.indexOf(pageA.path)
    const bIndex = pageOrder.indexOf(pageB.path)

    // Pages not in order go to the end
    if (aIndex === -1 && bIndex === -1) return 0
    if (aIndex === -1) return 1
    if (bIndex === -1) return -1

    return aIndex - bIndex
  }
}

/**
 * Generate complete PDF config for a course
 */
export function generatePdfConfig(
  courseName: CourseName,
  sidebar: Sidebar,
  options: {
    includeHeaderFooter?: boolean
    outFile?: string
  } = {}
) {
  const course = courses[courseName]
  const pageOrder = getPageOrderFromSidebar(sidebar, course.sidebarPath)

  const outFile = options.outFile || `${course.title.replace(/[^a-zA-Z0-9-]/g, '-')}.pdf`

  return {
    outFile,
    outDir: pdfDefaults.outDir,
    routePatterns: [`${course.sidebarPath}**`],
    urlOrigin: pdfDefaults.urlOrigin,
    sorter: createSorter(pageOrder),
    pdf: {
      ...pdfDefaults.pdf,
      displayHeaderFooter: options.includeHeaderFooter ?? false,
      ...(options.includeHeaderFooter && {
        headerTemplate: `<div style="font-size: 9px; width: 100%; text-align: center; color: #666;">${course.title}</div>`,
        footerTemplate: '<div style="font-size: 9px; width: 100%; text-align: center; color: #666;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>',
      }),
    },
  }
}
