import { visitPage } from '../support/visit-page';

describe('Interactive course content', () => {
  it('renders the profile overlay flowchart', () => {
    visitPage('/courses/beginner/10.html');
    cy.get('main .flowchart-wrapper svg', { timeout: 20000 })
      .should('have.length', 1)
      .and('be.visible');
    cy.get('main .flowchart-wrapper svg text').should(($labels) => {
      const labels = [...$labels].map((label) => label.textContent.trim());
      expect(labels).to.include.members(['my_nginx_overlay', 'my_nginx']);
    });
  });

  it('expands and collapses the overlay instructions', () => {
    visitPage('/courses/beginner/10.html');
    cy.contains('main details', 'How to initialize the overlay').as('instructions');
    cy.get('@instructions').should('not.have.attr', 'open');
    cy.get('@instructions').find('code').first().should('not.be.visible');
    cy.get('@instructions').find('summary').click();
    cy.get('@instructions').should('have.attr', 'open');
    cy.get('@instructions').find('code').first().should('be.visible')
      .and('contain.text', 'inspec init profile my_nginx_overlay');
    cy.get('@instructions').find('summary').click();
    cy.get('@instructions').should('not.have.attr', 'open');
    cy.get('@instructions').find('code').first().should('not.be.visible');
  });

  it('switches between command and output code tabs', () => {
    visitPage('/courses/beginner/11.html');
    // Scope to the example containing this command, not the other tab groups.
    cy.contains('main [role="tabpanel"]', 'saf generate inspec_profile --help')
      .parent().as('example');
    cy.get('@example').within(() => {
      cy.contains('[role="tab"]', /^Command$/).should('have.attr', 'aria-selected', 'true');
      cy.contains('[role="tabpanel"]', 'Generate a new skeleton profile').should('not.be.visible');
      cy.contains('[role="tab"]', /^Output$/).click();
      cy.contains('[role="tab"]', /^Output$/).should('have.attr', 'aria-selected', 'true');
      cy.contains('[role="tabpanel"]', 'Generate a new skeleton profile').should('be.visible');
      cy.contains('[role="tabpanel"]', 'saf generate inspec_profile --help').should('not.be.visible');
      cy.contains('[role="tab"]', /^Command$/).click();
      cy.contains('[role="tabpanel"]', 'saf generate inspec_profile --help').should('be.visible');
      cy.contains('[role="tabpanel"]', 'Generate a new skeleton profile').should('not.be.visible');
    });
  });
});
