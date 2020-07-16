import { defineStep } from 'cypress-cucumber-preprocessor/steps';
import { makeRequest } from '../../../utils/utils';

defineStep(
  'I send a request to login endpoint with {string} and {string}',
  (userEmail, userPasswor) => {
    const userData = {
      email: userEmail,
      password: userPasswor,
    };
    makeRequest('POST', '/api/login', userData);
  }
);

defineStep('In response I can see the token code generated', () => {
  cy.get('@resp').then((res) => {
    expect(typeof res.body).equal('object');
    expect(typeof res.body.token).equal('string');
  });
});

defineStep('In response I can see the error message {string}', (error) => {
  cy.get('@resp').then((res) => {
    expect(typeof res.body).equal('object');
    expect(res.body.error).equal(error);
  });
});
