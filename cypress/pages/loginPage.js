class LoginPage {
    elements = {
        email: () => cy.get('#Email'),
        password: () => cy.get('#Password'),
        rememberMe: () => cy.get('#RememberMe'),
        loginBtn: () => cy.get('.login-button'),
    }

    visit() {
        return cy.visit('/login')
    }

    login(email, password) {
        this.elements.email().type(email);
        this.elements.password().type(password);
        this.elements.rememberMe().check();

        this.elements.loginBtn().click();

        cy.url().should('eq', 'https://demowebshop.tricentis.com/');
        cy.get('.header [href="/customer/info"]').should('have.text', email);
    }

}

export const loginPage = new LoginPage()