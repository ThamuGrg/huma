import { defineStep } from 'cypress-cucumber-preprocessor/steps'

defineStep('I get the response as {string}', (res) => {
	cy.get(`@${res}`)
})

defineStep('The response code status is {int}', (statusCode) => {
	cy.get('@resp').its('status').should('equal', statusCode)
})

defineStep('I can see ad details in page', () => {
	cy.get('@resp').then((res) => {
		expect(typeof res.body.ad).to.equal('object')
		expect(typeof res.body.ad.company).to.equal('string')
		expect(typeof res.body.ad.url).to.equal('string')
		expect(typeof res.body.ad.text).to.equal('string')
	})
})
