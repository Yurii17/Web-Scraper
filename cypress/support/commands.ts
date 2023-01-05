/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
Cypress.Commands.add('fillField', (el, value) => {
    return cy.get(`${el}`).type(value).should('have.value', value);
});

Cypress.Commands.add('clickBtn', (el) => {
    return cy.get(`${el}`).click({ multiple: true });
});

Cypress.Commands.add('clickForceTrue', (el) => {
    return cy.get(`${el}`).click({ force: true });
});

Cypress.Commands.add('clearField', (el) => {
    return cy.get(`${el}`).clear().should('have.value', '');
});

Cypress.Commands.add('firstClick', (el) => {
    return cy.get(`${el}`).first().click();
});

Cypress.Commands.add('getValueFromLabel', (label) => {
    // you can disable individual command logging
    // by passing {log: false} option
    cy.log('**getValueFromLabel**')
    cy.contains('label', label)
        .invoke('attr', 'for')
        .then((id) => {
            cy.get('#' + id)
        })
  })
