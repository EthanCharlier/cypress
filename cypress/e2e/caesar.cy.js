/// <reference types="cypress" />

context('Caesar', () => {
  beforeEach(() => {
    cy.visit('../../caesar/index.html')
  })

  it('1) Automatiser la complétion du formulaire', () => {
    cy.get('#key').clear().type('6').should('have.value', '6');
    cy.get('#plain').clear().type('Hello World!').should('have.value', 'Hello World!');
    cy.get('#submitBtn').click();
  });

  it('2) Automatiser la validation du formulaire', () => {
    // Clé > 25 -> erreur
    cy.get('#key').clear().type('42');
    cy.get('#plain').clear().type('Test');
    cy.get('#submitBtn').click();

    cy.get('#error')
      .should('be.visible')
      .and('contain', 'La clé doit être un entier entre 0 et 25.');

    // Clé négative -> erreur
    cy.get('#key').clear().type('-1');
    cy.get('#submitBtn').click();
    cy.get('#error')
      .should('be.visible')
      .and('contain', 'La clé doit être un entier entre 0 et 25.');

    // Clé valide -> plus d’erreur visible
    cy.get('#key').clear().type('3');
    cy.get('#plain').clear().type('abc');
    cy.get('#submitBtn').click();
    cy.get('#error').should('not.be.visible');
  });

  it("3) Vérifier l'affichage du bon résultat", () => {
    cy.get('#key').clear().type('6');
    cy.get('#plain').clear().type('Hello World!');
    cy.get('#submitBtn').click();

    cy.get('#result').should('have.text', 'Nkrru Cuxrj!');
  });
})