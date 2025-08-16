describe('template spec', () => {
  it('passes', () => {
    cy.visit('/');
    cy.get('.nav-item.dropdown').contains('My account').should('exist');
  })
})