import { loginPage } from "../pages/loginPage";
import searchKeywords from "../fixtures/searchKeywords.json"

describe('Search and Add to Cart spec', () => {
  beforeEach('Login', () => {
    cy.fixture('users').then((users) => {
      loginPage.visit();
      loginPage.login(users[0].email, Cypress.env('password'));
    });
  });

  searchKeywords.forEach((keyword) => {
    it(`Search ${keyword} and add results to cart`, () => {
      cy.searchItem(keyword);

      cy.get('.cart-qty').then(($cartQty) => {
        const cartQty = $cartQty.text().slice(1, -1);

        cy.get('.item-box:has(.product-title a)').each(($item) => {
          expect(cy.wrap($item).find('.product-title a')).to.include(new RegExp(keyword, 'i'));
          cy.wrap($item).find('[value="Add to cart"]').click();
        });
        
        cy.get('.item-box:has(.product-title a)').its('length').then((len) => {
          cy.get('.cart-qty').should('have.text', `(${parseInt(len) + parseInt(cartQty)})`);
        });

      });

    });
  });
});