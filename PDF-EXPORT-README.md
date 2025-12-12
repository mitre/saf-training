# PDF Export Guide

Students can download any course as a PDF for offline learning.

## Quick Start

### Generate PDFs for Individual Courses

```bash
# Getting Started (SAF User Class)
npm run pdf:getting-started

# InSpec Training - Beginner
npm run pdf:beginner

# InSpec Training - Advanced
npm run pdf:advanced

# InSpec Profile Development & Testing
npm run pdf:profile-dev

# STIG Development
npm run pdf:stig

# SAF Delta
npm run pdf:delta

# OHDF Mapper Development
npm run pdf:mappers

# All courses in one PDF
npm run pdf:all
```

## Output

PDFs are generated in the `pdfs/` directory:
```
pdfs/
├── Getting-Started-SAF-User-Class.pdf
├── InSpec-Training-Beginner.pdf
├── InSpec-Training-Advanced.pdf
├── InSpec-Profile-Development.pdf
├── STIG-Development.pdf
├── SAF-Delta.pdf
├── OHDF-Mapper-Development.pdf
└── MITRE-SAF-Training-All-Courses.pdf
```

## Prerequisites

**Before generating PDFs:**
1. Build the site: `npm run docs:build`
2. Start preview server: `npm run docs:preview`
3. Keep server running while generating PDFs

## PDF Features

✅ **Complete course content** - All lessons included
✅ **Table of contents** - PDF bookmarks for navigation
✅ **Code syntax highlighting** - Preserved in PDF
✅ **Images** - All embedded
✅ **Page numbers** - Footer on every page
✅ **Header** - Course name on every page
✅ **Links** - Internal links work within PDF

## Configuration

Edit `vitepress-pdf.config.ts` to customize:
- Page size (A4, Letter, etc.)
- Margins
- Header/footer templates
- Print background colors
- Route patterns

## Troubleshooting

**"Command not found" error:**
- Make sure `vitepress-export-pdf` is installed
- Use `npx` prefix in scripts

**PDF is blank or incomplete:**
- Ensure preview server is running on http://localhost:4173
- Wait for site to fully build before generating PDF
- Check console for errors

**Images missing:**
- Verify images use absolute paths (`/assets/` not `../../assets/`)
- Ensure printBackground: true in config

## Adding Download Links to Site

Add download buttons to course landing pages:

```markdown
## Download Course

📥 [Download this course as PDF](/pdfs/Getting-Started-SAF-User-Class.pdf)
```

Store generated PDFs in `src/public/pdfs/` to make them available via the site.

## CI/CD Integration

To auto-generate PDFs in GitHub Actions:

```yaml
- name: Generate PDFs
  run: |
    npm run docs:build
    npm run docs:preview &
    sleep 10
    npm run pdf:all

- name: Upload PDFs
  uses: actions/upload-artifact@v4
  with:
    name: course-pdfs
    path: pdfs/
```
