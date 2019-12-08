import snils from '../../pagesElementsSelectors/thirdParty/SnilsPage.js';

let ThirdPartyActions = function () {
    this.generateSnils = () => {
        cy.xpath(snils.generateBtn).click();
        this.getSnils();
    };
    this.getSnils = () => {
        return cy.get('.number').invoke('text');
    }
};
export default ThirdPartyActions;
