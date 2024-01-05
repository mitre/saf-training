describe('The Site Loaded and has the expected Title', () => {
  
  it('passes', () => {
    cy.visit('http://localhost:8080')
    cy.title().should('eq', 'MITRE SAF Training | MITRE SAF Training')
  })
})