import '@testing-library/cypress/add-commands';

Cypress.Commands.add('getUser', () => {
  cy.fixture("user.json").then((user) => user)
})

Cypress.Commands.add("typeInLoginCredentials", (email, password) => {
  cy.findByTestId("email").type(email);
  cy.findByTestId("password").type(password);
})