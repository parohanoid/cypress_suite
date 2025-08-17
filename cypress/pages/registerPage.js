class RegisterPage {
    elements = {
        genderRadio: (gender) => cy.get(`#gender-${gender}`),
        firstName: () => cy.get('#FirstName'),
        lastName: () => cy.get('#LastName'),
        email: () => cy.get('#Email'),
        password: () => cy.get('#Password'),
        confirmPassword: () => cy.get('#ConfirmPassword'),
        registerBtn: () => cy.get('#register-button'),

        errorMsg: () => cy.get('.message-error .validation-summary-errors li')
    }

    visit() {
        return cy.visit('/register')
    }

    register(fName, lName, gender, email, password) {
        this.elements.genderRadio(gender).click();
        this.elements.firstName().type(fName);
        this.elements.lastName().type(lName);
        this.elements.email().type(email);

        this.elements.password().type(password);
        this.elements.confirmPassword().type(password);

        this.elements.registerBtn().click();

        if (!this.elements.errorMsg().exists()) {
            cy.url().should('eq', 'https://demowebshop.tricentis.com/');
            cy.get('.header [href="/customer/info"]').should('have.text', email);
        }
    }
}

export const registerPage = new RegisterPage()