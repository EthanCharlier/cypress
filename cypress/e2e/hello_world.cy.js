/// <reference types="cypress" />

context('HelloWorld', () => {
  beforeEach(() => {
    cy.visit('../../pages/index.html')
  })

  it('has a <p> with Hello World!', () => {
    cy.get('p')
        .should('have.text', 'Hello World!')
  })
})