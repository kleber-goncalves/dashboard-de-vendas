/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
        login(email: string, password: string): Chainable<void>
    }
}

Cypress.Commands.add('login', (username, password) => {
    cy.session([username, password], () => {
        cy.visit('http://localhost:5173/')
        cy.get('input[type="email"]').type('teste@gmail.com')
        cy.get('input[type="password"]').type('@Dnc_2005')
        cy.get('button[type="submit"]').click()
        cy.url().should('include', '/home')
    })
})
