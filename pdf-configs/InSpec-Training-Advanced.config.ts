export default {
  outFile: 'InSpec-Training-Advanced.pdf',
  outDir: 'pdfs',
  routePatterns: ['/inspec-training/advanced/**'],
  urlOrigin: 'http://localhost:4173',
  pdf: {
    printBackground: true,
    format: 'A4',
    margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' },
    displayHeaderFooter: true,
    headerTemplate: '<div style="font-size: 9px; width: 100%; text-align: center; color: #666;">InSpec Training - Advanced</div>',
    footerTemplate: '<div style="font-size: 9px; width: 100%; text-align: center; color: #666;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>',
  }
}
