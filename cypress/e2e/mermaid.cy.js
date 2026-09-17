import { visitPage } from '../support/visit-page';

describe('Guidance course diagrams', () => {
  const pages = [
    { path: '/courses/guidance/04.html', label: 'Do I need to comply with DOD requirements?' },
    { path: '/courses/guidance/07.html', label: 'Status: Not Applicable' },
  ];

  for (const page of pages) {
    it(`renders the flowchart on ${page.path}`, () => {
      visitPage(page.path);
      cy.get('main .mermaid-content svg', { timeout: 20000 })
        .should('have.length', 1)
        .should('be.visible')
        .and('contain.text', page.label);
      cy.get('main .mermaid-content svg .node').should('have.length.greaterThan', 0);
    });
  }
});
