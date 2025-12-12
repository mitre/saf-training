export default {
  // Output all courses as one PDF
  outFile: 'MITRE-SAF-Training-All-Courses.pdf',
  outDir: 'pdfs',

  // Exclude these from PDF generation
  routePatterns: [
    '!**/404.html',
    '!**/index-vuepress.html',
  ],

  urlOrigin: 'http://localhost:4173',

  pdf: {
    printBackground: true,
    format: 'A4',
    margin: {
      top: '20mm',
      bottom: '20mm',
      left: '15mm',
      right: '15mm'
    },
    displayHeaderFooter: true,
    headerTemplate: `
      <div style="font-size: 9px; width: 100%; text-align: center; color: #666;">
        MITRE SAF Training
      </div>
    `,
    footerTemplate: `
      <div style="font-size: 9px; width: 100%; text-align: center; color: #666;">
        Page <span class="pageNumber"></span> of <span class="totalPages"></span>
      </div>
    `,
  }
}
