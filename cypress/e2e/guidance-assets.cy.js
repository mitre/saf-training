import { visitPage } from '../support/visit-page';

describe('Guidance course assets and links', () => {
  it('loads a bundled image', () => {
    visitPage('/courses/guidance/08.html');
    cy.get('main img[alt="Related Rules Button"]').scrollIntoView();
    cy.get('main img[alt="Related Rules Button"]')
      .should('be.visible')
      .and(($image) => {
        expect($image).to.have.length(1);
        expect($image[0].complete).to.equal(true);
        expect($image[0].naturalWidth).to.be.greaterThan(0);
        expect($image[0].naturalHeight).to.be.greaterThan(0);
      });
  });

  it('links to the beginner course', () => {
    visitPage('/courses/guidance/09.html');
    cy.contains('main a', 'training class')
      .should('have.attr', 'href', '/courses/beginner/');
    cy.contains('main a', 'training class').click();
    cy.location('pathname').should('eq', '/courses/beginner/');
    cy.get('main h1').should('be.visible')
      .and('contain.text', 'Beginner Security Automation Developer Class');
  });
});
