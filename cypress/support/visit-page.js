export function visitPage(path) {
  cy.visit(path);
  // Production HTML exists before Vue hydrates it. Wait for the mounted app so
  // event handlers and initial router setup are ready before interacting.
  cy.get('#app').should('have.prop', '__vue_app__');
}
