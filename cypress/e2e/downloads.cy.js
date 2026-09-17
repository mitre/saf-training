import { visitPage } from '../support/visit-page';

describe('Linked resources', () => {
  it('serves the linked Vendor STIG PDF as a PDF', () => {
    visitPage('/resources/');
    cy.contains('main a', 'Vendor STIG Process Guide').then(($link) => {
      const url = $link[0].href;
      expect(new URL(url).origin).to.equal(new URL(Cypress.config('baseUrl')).origin);
      cy.request({ url, encoding: 'binary' }).then(({ status, headers, body }) => {
        expect(status).to.equal(200);
        expect(headers['content-type']).to.include('application/pdf');
        expect(body.slice(0, 5)).to.equal('%PDF-');
      });
    });
  });

  it('serves the linked delta report as structured JSON', () => {
    visitPage('/courses/delta/05.html');
    cy.contains('main a', 'Sample delta.json file').then(($link) => {
      const url = $link[0].href;
      expect(new URL(url).origin).to.equal(new URL(Cypress.config('baseUrl')).origin);
      cy.request(url).then(({ status, headers, body }) => {
        expect(status).to.equal(200);
        expect(headers['content-type']).to.include('application/json');
        expect(body.ignoreFormattingDiff.addedControlIDs).to.be.an('array').and.not.be.empty;
        expect(body.ignoreFormattingDiff.changedControlIDs).to.be.an('array').and.not.be.empty;
      });
    });
  });

  it('returns 404 for missing pages and assets', () => {
    for (const url of ['/__missing_e2e_page__.html', '/assets/__missing_e2e_image__.png']) {
      cy.request({ url, failOnStatusCode: false }).its('status').should('eq', 404);
    }
  });
});
