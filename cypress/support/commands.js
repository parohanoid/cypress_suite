// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', (email, password) => {
    cy.visit('/login');
    cy.get('#Email').type(email);
    cy.get('#Password').type(password);
    cy.get('.login-button').click();
});

Cypress.Commands.add('register', (fName, lName, gender, email, password) => {
    cy.visit('/register');
    cy.get(`#gender-${gender}`).click();
    cy.get('#FirstName').type(fName);
    cy.get('#LastName').type(lName);
    cy.get('#Email').type(email);

    cy.get('#Password').type(password);
    cy.get('#ConfirmPassword').type(password);

    cy.get('#register-button').click();
});

Cypress.Commands.add('exists', { prevSubject: 'element' }, (subject) => {
    const selector = subject || null; // Use subject if provided, else a default
    return Cypress.$(selector).length > 0;
});

Cypress.Commands.add('searchItem', (searchText) => {
    cy.get('#small-searchterms').type(searchText).type('{enter}');
});

Cypress.Commands.add('loginAPI', (email, password, remember) => {
    cy.request({
        'method': 'POST',
        'url': '/login',
        'body': {
            'Email': email,
            'Password': password,
            'RememberMe': remember
        }
    }).then((res) => {
        expect(res.status).to.eq(200);
    });
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })