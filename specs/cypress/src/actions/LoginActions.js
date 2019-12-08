import LoginPage from '../pagesElementsSelectors/LoginPage.js';

export default function LoginActions() {
    this.fillFields = (email, password) => {
        if (email) {
            cy.get(LoginPage.emailInput).clear().type(email);
        }
        if (password) {
            cy.get(LoginPage.passwordInput).clear().type(password);
        }
    };
    this.repeat = url => {
        cy.xpath(LoginPage.repeatBtn).click();
        cy.url().should('include', url);
    };
};