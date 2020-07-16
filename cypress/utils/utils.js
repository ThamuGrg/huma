export const makeRequest = (method, url, body) => {
  cy.request({
    method: method,
    url: url,
    body: body,
    failOnStatusCode: false,
  }).as('resp');
};
