#!/usr/bin/env tsx
/**
 * Update Downloads Page Script
 *
 * Reads downloads.template.md and replaces placeholders with actual values:
 * - {{VERSION}} - Git tag version (e.g., v2.0.0)
 * - {{DATE}} - Release date in YYYY-MM-DD format
 *
 * Usage:
 *   pnpm tsx scripts/update-downloads.ts
 *   pnpm tsx scripts/update-downloads.ts --version v2.0.0 --date 2025-12-13
 */

import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { execSync } from 'child_process'

// Get project root
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = join(__dirname, '..')

interface UpdateOptions {
  version?: string
  date?: string
}

/**
 * Get current git tag or version from package.json
 */
function getVersion(): string {
  try {
    // Try to get current git tag
    const tag = execSync('git describe --tags --exact-match 2>/dev/null', {
      cwd: projectRoot,
      encoding: 'utf-8',
    }).trim()
    return tag
  } catch {
    // Fall back to package.json version
    const packageJson = JSON.parse(
      readFileSync(join(projectRoot, 'package.json'), 'utf-8')
    )
    return `v${packageJson.version}`
  }
}

/**
 * Get today's date in YYYY-MM-DD format
 */
function getDate(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Update downloads.md from template
 */
function updateDownloads(options: UpdateOptions = {}): void {
  const version = options.version || getVersion()
  const date = options.date || getDate()

  console.log(`Updating downloads.md with version=${version}, date=${date}`)

  // Read template
  const templatePath = join(projectRoot, 'src', 'downloads.template.md')
  let template: string
  try {
    template = readFileSync(templatePath, 'utf-8')
  } catch (error) {
    console.error(`ERROR: Could not read template: ${templatePath}`)
    console.error(error)
    process.exit(1)
  }

  // Replace placeholders
  let output = template
  output = output.replace(/\{\{VERSION\}\}/g, version)
  output = output.replace(/\{\{DATE\}\}/g, date)

  // Write output
  const outputPath = join(projectRoot, 'src', 'downloads.md')
  writeFileSync(outputPath, output, 'utf-8')

  console.log(`✓ Updated ${outputPath}`)
  console.log(`  Version: ${version}`)
  console.log(`  Date: ${date}`)
}

// Parse command line arguments
function parseArgs(): UpdateOptions {
  const args = process.argv.slice(2)
  const options: UpdateOptions = {}

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (arg === '--version' && i + 1 < args.length) {
      options.version = args[++i]
    } else if (arg === '--date' && i + 1 < args.length) {
      options.date = args[++i]
    } else if (arg === '--help' || arg === '-h') {
      console.log(`
Update Downloads Page

Usage:
  node --experimental-strip-types scripts/update-downloads.ts [options]

Options:
  --version VERSION   Specify version (default: current git tag or package.json)
  --date DATE         Specify date in YYYY-MM-DD format (default: today)
  --help, -h          Show this help message

Examples:
  # Use defaults (current tag/version and today's date)
  pnpm tsx scripts/update-downloads.ts

  # Specify version and date
  pnpm tsx scripts/update-downloads.ts --version v2.0.0 --date 2025-12-13
      `)
      process.exit(0)
    }
  }

  return options
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const options = parseArgs()
  updateDownloads(options)
}

export { updateDownloads, getVersion, getDate }
