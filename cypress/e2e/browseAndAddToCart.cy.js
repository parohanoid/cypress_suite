import { loginPage } from "../pages/loginPage";
import searchKeywords from "../fixtures/searchKeywords.json"

describe('Search and Add to Cart spec', () => {
    beforeEach('Login', () => {
        cy.fixture('users').then((users) => {
            cy.loginAPI(users[0].email, Cypress.env('password'), 'false');
        });
        cy.visit('/');
    });

    searchKeywords.forEach((keyword) => {
        it(`Search ${keyword} and add results to cart`, () => {
            cy.searchItem(keyword);

            cy.get('.cart-qty').then(($cartQty) => {
                const cartQty = $cartQty.text().slice(1, -1);

                cy.get('.item-box:has(.product-title a)').each(($item) => {
                    cy.wrap($item).find('.product-title a').should('match', new RegExp(keyword, 'i'));
                    cy.wrap($item).find('[value="Add to cart"]').click();
                });

                cy.get('.item-box:has(.product-title a)').its('length').then((len) => {
                    cy.get('.cart-qty').should('have.text', `(${parseInt(len) + parseInt(cartQty)})`);
                });

            });

        });
    });
});