import { defineStep } from 'cypress-cucumber-preprocessor/steps';
import { makeRequest } from '../../../utils/utils';

defineStep(
  'I send a request to create users endpoint with {string} and {string}',
  (userName, jobTitle) => {
    const userData = {
      name: userName,
      job: jobTitle,
    };
    makeRequest('POST', '/api/users', userData);
  }
);

defineStep(
  'I send a request to update users endpoint with {string} and {string}',
  (userName, updatedJob) => {
    const userData = {
      name: userName,
      job: updatedJob,
    };
    makeRequest('PUT', '/api/users/2', userData);
  }
);

defineStep('I send a request to delete users endpoint', () => {
  makeRequest('DELETE', '/api/users/2');
});

defineStep(
  'In response I can see the name as {string} and job as {string}',
  (userName, jobTitle) => {
    cy.get('@resp').then((res) => {
      expect(typeof res.body).equal('object');
      expect(res.body.name).equal(userName);
      expect(res.body.job).equal(jobTitle);
    });
  }
);

defineStep('Id and createdAt timestamp has been generated', () => {
  cy.get('@resp').then((res) => {
    expect(typeof res.body.id).equal('string');
    expect(typeof res.body.createdAt).equal('string');
  });
});

defineStep('The updatedAt timestamp has been generated', () => {
  cy.get('@resp').then((res) => {
    expect(typeof res.body.updatedAt).equal('string');
  });
});

defineStep('I send a request to list all the users in {int}', (page) => {
  makeRequest('GET', `/api/users?page=${page}`);
});

defineStep('I can see correct {int} in response', (pageNumber) => {
  cy.get('@resp').then((res) => {
    expect(res.body.page).to.equal(pageNumber);
  });
});

defineStep('I can see list of users', () => {
  cy.get('@resp').then((res) => {
    const userData = res.body.data;
    expect(typeof userData).to.equal('object');
    userData.forEach((element) => {
      expect(typeof element.id).to.equal('number');
      expect(typeof element.email).to.equal('string');
      expect(typeof element.first_name).to.equal('string');
      expect(typeof element.last_name).to.equal('string');
      expect(typeof element.avatar).to.equal('string');
    });
  });
});

defineStep('I can see page details', () => {
  cy.get('@resp').then((res) => {
    expect(typeof res.body.per_page).to.equal('number');
    expect(typeof res.body.total).to.equal('number');
    expect(typeof res.body.total_pages).to.equal('number');
  });
});

defineStep('I send a request to view a user with {int}', (id) => {
  makeRequest('GET', `/api/users/${id}`);
});

defineStep('I can see correct userId {int} in response', (id) => {
  cy.get('@resp').then((res) => {
    expect(res.body.data.id).to.equal(id);
  });
});

defineStep('I can see user details', () => {
  cy.get('@resp').then((res) => {
    expect(typeof res.body.data).to.equal('object');
    expect(typeof res.body.data.id).to.equal('number');
    expect(typeof res.body.data.email).to.equal('string');
    expect(typeof res.body.data.first_name).to.equal('string');
    expect(typeof res.body.data.last_name).to.equal('string');
    expect(typeof res.body.data.avatar).to.equal('string');
  });
});
