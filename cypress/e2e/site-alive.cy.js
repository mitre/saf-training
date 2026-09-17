import { visitPage } from '../support/visit-page';

describe('Page content', () => {
  it('renders the homepage title and introduction', () => {
    visitPage('/');
    cy.title().should('eq', 'MITRE SAF Training | MITRE SAF Training');
    cy.get('main h1').should('be.visible').and('have.text', 'MITRE SAF Training');
    cy.get('main #main-description').should('be.visible')
      .and('have.text', 'From Guidance Document to Automated Testing In No Time!');
  });

  it('renders a course heading and body text on a direct page load', () => {
    visitPage('/courses/beginner/');
    cy.get('main h1').should('be.visible')
      .and('contain.text', 'Beginner Security Automation Developer Class');
    cy.contains('main p', 'The purpose of this class is to teach the fundamentals')
      .should('be.visible');
  });

  it('renders a note with visually distinct styling', () => {
    visitPage('/courses/beginner/');
    cy.contains('main .hint-container.note',
      'Does this mean InSpec is the only validation tool I should ever learn to use?')
      .should('be.visible')
      .and('contain.text', 'No. InSpec is powerful, but it cannot accomplish every type of security testing')
      .and(($note) => {
        const background = $note.css('background-color');
        expect(background, 'note background').not.to.be.oneOf(['transparent', 'rgba(0, 0, 0, 0)']);
        expect(background, 'distinct from surrounding content')
          .not.to.equal($note.parent().css('background-color'));
        expect(parseFloat($note.css('padding-left')), 'callout padding').to.be.greaterThan(0);
      });
  });
});
