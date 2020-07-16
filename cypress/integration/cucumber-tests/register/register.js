import { defineStep } from 'cypress-cucumber-preprocessor/steps';
import { makeRequest } from '../../../utils/utils';

defineStep(
  'I send a request to register endpoint with {string} and {string}',
  (email, password) => {
    const userData = {
      email: email,
      password: password,
    };
    makeRequest('POST', '/api/register', userData);
  }
);

defineStep('I can see the id and token generated', () => {
  cy.get('@resp').then((res) => {
    expect(typeof res.body.id).to.equal('number');
    expect(typeof res.body.token).to.equal('string');
  });
});

defineStep('I can see the error message', () => {
  cy.get('@resp').then((res) => {
    expect(res.body.error).to.equal(
      'Note: Only defined users succeed registration'
    );
  });
});

defineStep('The error message is {string}', (errorMessage) => {
  cy.get('@resp').then((res) => {
    expect(res.body.error).to.equal(errorMessage);
  });
});
