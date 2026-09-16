describe('Guidance course diagrams', () => {
  const pages = [
    { path: '/courses/guidance/04.html', label: 'Do I need to comply with DOD requirements?' },
    { path: '/courses/guidance/07.html', label: 'Status: Not Applicable' },
  ];

  for (const page of pages) {
    it(`renders the flowchart on ${page.path}`, () => {
      cy.visit(page.path);
      cy.get('.mermaid-content svg', { timeout: 20000 })
        .should('be.visible')
        .and('contain.text', page.label);
      cy.get('.mermaid-content svg .node').should('have.length.greaterThan', 0);
    });
  }
});
