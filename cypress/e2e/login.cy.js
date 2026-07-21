describe('Login flow correct credentials', () => {
    beforeEach(() => {
        const mockUser = {
            name: 'Utilizador de Teste',
            phone: '(11) 99999-9999',
            email: 'teste@gmail.com',
        }

        window.localStorage.setItem('user_profile_v2', JSON.stringify(mockUser))

        cy.visit('http://localhost:5173/')
    })

    it('should display login form', () => {
        cy.get('form').should('be.visible')
    })

    it('should login with valid credentials', () => {
        cy.get('input[type="email"]').type('teste@gmail.com')
        cy.get('input[type="password"]').type('@Dnc_2005')
        cy.get('button[type="submit"]').click()

        cy.url().should('include', '/home')
        cy.get('header').should('be.visible')
    })
})
