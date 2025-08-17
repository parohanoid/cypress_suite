import { generateUsers } from '../support/utils/generic/generateUsersFaker';
import users from '../fixtures/users.json'
import { registerPage } from '../pages/registerPage';
import { loginPage } from '../pages/loginPage';


// Using POM
users.forEach((user) => {
  describe(`Register and Login Spec with fixtures by importing json for ${user.email}`, () => {
    it('Test Register with fixtures', () => {
      registerPage.visit();
      registerPage.register(user.fName, user.lName, user.gender, user.email, Cypress.env('password'));
    });
    it('Test Login with fixtures', () => {
      loginPage.visit();
      loginPage.login(user.email, Cypress.env('password'));
    });
  });
});

describe.skip('Register and Login Spec', () => {
  describe('Register and Login Spec with fixtures', () => {
    it('Test Register with fixtures', () => {
      cy.fixture('users').then((users) => {
        users.forEach(user => {
          cy.register(user.fName, user.lName, user.gender, user.email, Cypress.env('password'));
        });
      });
    });

    it('Test Login with fixtures', () => {
      cy.fixture('users').then((users) => {
        users.forEach(user => {
          cy.login(user.email, Cypress.env('password'));
        });
      });
    });
  });

  describe('Register and Login Spec with faker', () => {
    let users = generateUsers(2);
    it('Test Register with faker-js', () => {
      users.forEach(user => {
        cy.register(user.fName, user.lName, user.gender, user.email, Cypress.env('password'));
      });
    });

    it('Test Login with fixtures', () => {
      users.forEach(user => {
        cy.login(user.email, Cypress.env('password'));
      });
    });
  });
});