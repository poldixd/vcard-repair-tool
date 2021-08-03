describe('The Home Page links', () => {
    it('checks to see the text on home', () => {
        cy.visit('/')
        cy.contains('Ablegen')
    })
})
