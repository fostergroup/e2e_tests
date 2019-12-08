var ContactsPage = require('../pages/ContactsPage.js');
var cont = new ContactsPage();

var CommonElementsPage = require('../pages/CommonElementsPage.js');
var com_ele = new CommonElementsPage();

var CommonActions = require('../actions/CommonActions.js');
var comact = new CommonActions();

var EC = protractor.ExpectedConditions;

var ContactActions = function () {
    // fill contact info
    this.fill_contact_info = function (input_email, input_ophone, input_cphone, input_country, input_tz) {
        browser.wait(EC.presenceOf(cont.addit_email), 5000, 'edit page is not loaded, field additional email is not visible');
		cont.addit_email.clear();
        if (input_email != null) {
            cont.addit_email.sendKeys(input_email);
        }
		cont.office_ph.clear();
        if (input_ophone != null) {
            cont.office_ph.sendKeys(input_ophone);
        }
		cont.c_phone.clear();
        if (input_cphone != null) {
			cont.c_phone.sendKeys(input_cphone);
        }
		comact.fill_drop_input(input_country, 0);

        //input country
		comact.fill_drop_input(input_tz, 1);
    };
    //click edit btn
    this.edit_fn = function () {
        browser.wait(EC.elementToBeClickable(cont.edit_btn), 5000, 'edit page is not loaded, element edit button is not clickable');
        cont.edit_btn.click();
    };
    //click save btn
    this.save_fn = function () {
        browser.wait(EC.elementToBeClickable(cont.save_btn), 5000, 'edit page is not loaded, element save button is not clickable');
        cont.save_btn.click();
    };
    //click close btn
    this.close_fn = function () {
        browser.wait(EC.elementToBeClickable(cont.close_btn), 5000, 'edit page is not loaded, element close button is not clickable');
        cont.close_btn.click();
    };

    //get contacts info
    this.get_cont_info = function () {
        browser.wait(EC.elementToBeClickable(cont.edit_btn), 5000, 'contact info is not visible');
        return cont.cont_info.getText();
    };
};
module.exports = ContactActions;