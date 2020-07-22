///<reference types="cypress" />
import { userBuilder } from "../support/generate";

describe("when clicking on signup from the homepage user", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.findByTestId("signup").click();
  });

  it("should go to the signup page", () => {
    cy.url().should("include", "/signup");
  });

  it("should see username, email and password inputs", () => {
    cy.findByTestId("username").should("exist");
    cy.findByTestId("email").should("exist");
    cy.findByTestId("password").should("exist");
  });

  it("should be able to type into inputs", () => {
    const { username, email, password } = userBuilder();
    cy.typeInLoginCredentials(username, email, password);
    cy.findByTestId("email").should("contain.value", email);
  });
});

// describe("with the incorrect login credentials user", () => {
//   it("should receive an error message above the login form", () => {
//     cy.visit("/login");
//     const { username, password } = userBuilder();
//     cy.typeInLoginCredentials(username, "", password);
//     cy.findByTestId("signup-submit").click();
//     cy.findByTestId("signup-error").should(
//       "contain.text",
//       "Incorrect credentials"
//     );
//   });
// });

describe("signing up as user", () => {
  it("should register as a new user", () => {
    const { username, email, password } = userBuilder();
    cy.visit("/");
    cy.findByTestId("signup").click();
    cy.typeInLoginCredentials(username, email, password);
    cy.findByTestId("signup-submit").click();
    cy.url().should("eq", "http://localhost:8080/");
    // cy.findByTestId("no-bookmarks", {timeout: 500}).should("exist")
  });
});
