describe('Guidance course assets and links', () => {
  it('loads a bundled image', () => {
    cy.visit('/courses/guidance/08.html');
    cy.get('img[alt="Related Rules Button"]')
      .scrollIntoView()
      .should('be.visible')
      .and(($image) => {
        expect($image[0].naturalWidth).to.be.greaterThan(0);
      });
  });

  it('links to the beginner course', () => {
    cy.visit('/courses/guidance/09.html');
    cy.contains('a', 'training class').click();
    cy.location('pathname').should('eq', '/courses/beginner/');
  });
});
