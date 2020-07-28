///<reference types="cypress" />

import { userBuilder } from "../support/generate";

describe("when clicking on login from the homepage user", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.findByTestId("login").click();
  });

  it("should go to the login page", () => {
    cy.url().should("include", "/Login");
  });

  it("should see email and password inputs", () => {
    cy.findByTestId("email").should("exist");
    cy.findByTestId("password").should("exist");
  });

  it("should be able to type into inputs", () => {
    const { email, password } = userBuilder();
    cy.typeInLoginCredentials2(email, password);
    cy.findByTestId("email").should("contain.value", email);
   
  });
});

describe("with the incorrect login credentials user", () => {
  it("should receive an error message above the login form", () => {
    cy.visit("/login");
    const { email, password } = userBuilder();
    cy.typeInLoginCredentials2(email, password);

    cy.findByTestId("login-submit").click();
    cy.findByTestId("login-error").should(
      "contain.text",
      "Incorrect credentials"
    );
  });
});

describe("with the correct login credentials user", () => {
  it("should be able to click on submit and be navigated to /notes", () => {
    cy.getUser().then(({ email, password }) => {
      cy.visit("/login");
      cy.typeInLoginCredentials2("teacher1@g.com", "123456");
      cy.findByTestId("login-submit").click();
      cy.url()
        .should("eql", "http://localhost:8080/notes")
        .window()
        .its("localStorage.token")
        .should("be.a", "string");
    });

    after(() => {
      window.localStorage.removeItem("token");
      window.sessionStorage.removeItem("auth");
    });
  });
});
