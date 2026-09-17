import { visitPage } from '../support/visit-page';

describe('Course navigation', () => {
  it('opens a course from the Classes dropdown', () => {
    visitPage('/');
    // The theme opens menus on hover or keyboard activation, not mouse clicks.
    cy.get('header nav button[aria-label="Classes"]').type('{enter}');
    cy.get('header nav a[aria-label="Beginner Security Automation Developer Class"]')
      .should('be.visible').click();
    cy.location('pathname').should('eq', '/courses/beginner/');
    cy.get('main h1').should('be.visible')
      .and('contain.text', 'Beginner Security Automation Developer Class');
  });

  it('opens a lesson from the course sidebar', () => {
    visitPage('/courses/beginner/');
    cy.get('aside a[aria-label="2. What is an InSpec Profile?"]').click();
    cy.location('pathname').should('eq', '/courses/beginner/02.html');
    cy.get('main h1').should('be.visible').and('contain.text', 'What is an InSpec Profile?');
  });
});
