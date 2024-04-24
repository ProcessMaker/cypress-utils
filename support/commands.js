// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
import "cypress-file-upload"
import '@4tw/cypress-drag-drop'

const LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add('saveLocalStorage', () => {
    Object.keys(localStorage).forEach(key => {
      LOCAL_STORAGE_MEMORY[key] = localStorage[key];
    });
    cy.wait(200);
  });
  
  Cypress.Commands.add('restoreLocalStorage', () => {
    Object.keys(LOCAL_STORAGE_MEMORY).forEach(key => {
      localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
    });
  });
  

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

Cypress.Commands.add('login', () => {
  cy.log('Login in');
  cy.visit("/login");
  cy.get("#username")
      .type("admin");
  cy.get("#password")
      .type("admin");
  cy.get(".btn-success")
      .click();
  cy.title()
      .should("include", "My Requests");
})

const api = require('#support/api.js');
Cypress.Commands.add('importProcess', (file) => {
  return api.importProcess(file);
})


Cypress.Commands.add("reloadPageUntil", (selector, attempts = 0) => {
  if (attempts > 5) {
      throw Error('Selector not found');
  }
  attempts++;
  let cell = Cypress.$(selector);
  if (cell.length) {
      return;
  }
  cy.reload();
  return cy.wait(500).then(() => {
      return cy.reloadPageUntil(selector, attempts);
  });
});

Cypress.Commands.add('withContext', function() { 
  return this;
});

require('cypress-downloadfile/lib/downloadFileCommand')
