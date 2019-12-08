var Helper = require('../../src/helper.js');
var DashboardActions = require('../../src/actions/DashboardActions.js');
var PaymentActions = require('../../src/actions/PaymentActions.js');
var CommonActions = require('../../src/actions/CommonActions');
var LoginActions = require('../../src/actions/LoginActions.js');
var Credentials = require('../../src/credentials.js');
var Params = require('../../src/params.js');
var Messages = require('../../src/messages.js');

describe('Managing credit cards', function () {
    var helper = new Helper();
    var dashact = new DashboardActions();
    var comact = new CommonActions();
    var loginact = new LoginActions();
    var cred = new Credentials();
    var payact = new PaymentActions();
    var param = new Params();
    var mes = new Messages();
    var number_of_cards;

    // Open tranformify
    beforeAll(function () {
        browser.ignoreSynchronization = true;
        browser.get(browser.baseUrl);
        loginact.click_login(false);
        loginact.log_in(cred.part_vat_uk_email, cred.pswd);
        dashact.view_payments();
        payact.view_pay_account();
    });
    it('A partner deletes all exiting cards, if they are', function () {
        payact.delete_card();
        browser.sleep(3000);
        payact.get_cards_nb().then(function (count) {
            console.log('number of cards after delete: ' + count);
            expect(Number(count)).toEqual(0);
        });
    });
    it('A partner sets one valid credit card', function () {
        comact.fill_drop_input('stripe', 0);
        payact.add_pay_account();
        payact.fill_card_det(param.valid_card, 12, 22, 231);
        browser.sleep(3000);
        helper.alert_success_fn(0, mes.credit_card_added);
        payact.get_cards_nb().then(function (count) {
            console.log('number of cards after adding: ' + count);
            number_of_cards = count;
            expect(Number(number_of_cards)).toEqual(1);
        });
    });
	it('A partner adds card with expired date', function () {
		//add additional card:
		comact.fill_drop_input('stripe', 0);
		payact.add_pay_account();
		payact.fill_card_det(param.expired_card, 11, 22, 231);
		browser.sleep(2000);
		browser.takeScreenshot().then(function (png) {
			helper.writeScreenShot(png, helper.screenshot_fn('card_jpg'));
		});
		helper.alert_danger_msg_fn(0, mes.error_credit_card);
		payact.get_cards_nb().then(function (count) {
			console.log('after additional card adding: ' + count);
			number_of_cards = count;
			expect(Number(number_of_cards)).toEqual(1);
		});
	});
    it('A partner adds additional card and reset default card', function () {
        //add additional card:
        comact.fill_drop_input('stripe', 0);
        payact.add_pay_account();
        payact.fill_card_det(param.addit_valid_card, 11, 22, 231);
        browser.sleep(2000);
		browser.takeScreenshot().then(function (png) {
			helper.writeScreenShot(png, helper.screenshot_fn('card_jpg'));
		});
        helper.alert_success_fn(0, mes.credit_card_added);
        payact.get_cards_nb().then(function (count) {
            console.log('after additional card adding: ' + count);
            number_of_cards = count;
            expect(Number(number_of_cards)).toEqual(2);
        }).then(function () {
            payact.set_default_card(number_of_cards, 0);
        });
        loginact.log_out();
    });
});