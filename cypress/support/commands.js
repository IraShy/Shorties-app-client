import '@testing-library/cypress/add-commands';

Cypress.Commands.add('getUser', () => {
  cy.fixture("user.json").then((user) => user)
})

Cypress.Commands.add("typeInLoginCredentials", ( username,email, password) => {
  cy.findByTestId("username").type(username);
  cy.findByTestId("email").type(email);
  cy.findByTestId("password").type(password);
})

Cypress.Commands.add("typeInLoginCredentials2", ( email, password) => {
  cy.findByTestId("email").type(email);
  cy.findByTestId("password").type(password);
})