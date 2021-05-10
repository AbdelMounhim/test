/// <reference types="Cypress" />

/*

on mocke le backend : les messages sont dans le fichier messages.json
*/

describe("My First Tests", () => {
  it("Spying backend api", () => {
    cy.intercept("http://localhost:3001/messages", {
      fixture: "messages.json",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }).as("getMessages");

    cy.visit("/");
    cy.wait("@getMessages")
      .its("response.body")
      .should("have.length", 3)
      .its("0") // grab the first message from the list
      .then((message) => {
        expect(message).to.have.property("id");
        expect(message).to.have.property("text");
        expect(message).to.have.property("isPrivate");
      });

    cy.get(".list-item").should("have.length", 3);

    cy.contains("Public").click();
    cy.get(".list-item").should("have.length", 1);

    cy.get(":nth-child(3) > :nth-child(4)").click(); // bouton Privé
    cy.get(".list-item").should("have.length", 2);

    cy.contains("All").click();

    cy.get('[type="text"]').type("une tache publique");
    cy.get("[data-testid=add]").click(); // Ajouter

    cy.get(".list-item").should("have.length", 4);

    cy.get('[type="text"]').type("une tache privée");
    cy.get('[type="checkbox"]').click();

    cy.get("[data-testid=add]").click(); // Ajouter
    cy.get('[type="checkbox"]').click();

    cy.get(".list-item").should("have.length", 5);

    cy.contains("Public").click();
    cy.get(".list-item").should("have.length", 2);

    cy.get(":nth-child(3) > :nth-child(4)").click(); // bouton Privé
    cy.get(".list-item").should("have.length", 3);
    cy.contains("All").click();
  });
});
