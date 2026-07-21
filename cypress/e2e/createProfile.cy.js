describe('Check if create profile page renders the correct components', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/cadastro')
    })

    it('should step 1 and 2 works', () => {
        cy.get('input[type="text"]').type('nameTest Kleber')
        cy.get('input[type="email"]').type('teste@gmail.com')
        cy.get('input[type="tel"]').type('1231454545')
        cy.get('button[type="submit"]').click()
        cy.get('input[type="password"]').type('@Dnc_2005')
        cy.get('button[type="submit"]').should('be.visible')
    })
})
