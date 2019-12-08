var Helper = require('../../src/helper.js');
var EC = protractor.ExpectedConditions;
var DashboardActions = require('../../src/actions/DashboardActions.js');
var InvoiceActions = require('../../src/actions/InvoiceActions.js');
var CommonActions = require('../../src/actions/CommonActions');
var LoginActions = require('../../src/actions/LoginActions.js');
var Credentials = require('../../src/credentials.js');
var Messages = require('../../src/messages.js');
var Params = require('../../src/params.js');

describe('Fill invoice details', function () {
    var helper = new Helper();
    var dashact = new DashboardActions();
    var comact = new CommonActions();
    var loginact = new LoginActions();
    var cred = new Credentials();
    var invact = new InvoiceActions();
    var mes = new Messages();
    var param = new Params();
    var invcountry, vat_info;

    // Open tranformify
    beforeAll(function () {
        browser.ignoreSynchronization = true;
        browser.get(browser.baseUrl);
        loginact.click_login(true);
        loginact.log_in(cred.no_pr_member, cred.pswd);
        dashact.invoice_view();
    });
    it('Check changing country without projects', function () {
        invact.invoice_det_fn();
        //get country
        comact.get_table_element(5, 0).getText().then(function (text) {
            console.log('get invoice country: ' + text);
            invcountry = text;
        }).then(function(){
            if (invcountry.toLowerCase() != 'uk') {
                invact.edit_invoice_det('Testing account', cred.no_pr_member, null, null, null, null,
                    null, null, null, browser.params.invoice.country_uk, 0, 123);
            } else {
                //set up uk
                invact.edit_invoice_det(null, null, null, null, null,
                    null, null, null, null, browser.params.invoice.country_non_uk, 0, 123);
            }
            //check the back action to invoice details view:
            browser.wait(EC.urlContains('/member/invoices/details'), 5000, 'url is not as expected');
            //check success message:
            helper.alert_success_fn(0, mes.invoice_succ_updated);
            comact.get_table_element(5, 0).getText().then(function (text) {
                console.log('get invoice country after change: ' + text);
                expect(invcountry.toLowerCase()).not.toEqual(text.toLowerCase());
            });
        });
    });
    it('Check changing vat registration without projects', function () {
        invact.invoice_det_fn();
        //get country
        comact.get_table_element(9, 0).getText().then(function (text) {
            console.log('get vat info: ' + text);
            if (text.length ==0) {
                //vat is not set
                invact.edit_invoice_det('Testing account', cred.no_pr_member, null, null, null,
                    null, null, null, null, null, 0, 123);
            } else {
                //vat is set, set tax
                //set up uk
                invact.edit_invoice_det(null, null, null, null, null,
                    null, null, null, null, null, 1, 123);
            }
        }).then(function(){
            //check there is no back:
            helper.alert_success_fn(0, mes.invoice_succ_updated);
            expect(browser.getCurrentUrl()).toContain('/member/invoices/details');
        });
        loginact.log_out();
    });
    it('Check changing country with projects as a member', function () {
        loginact.click_login(true);
        loginact.log_in(cred.member_vat_uk_email, cred.pswd);
        dashact.invoice_view();
        invact.invoice_det_fn();
        //get country
        comact.get_table_element(5, 0).getText().then(function (text) {
            console.log('get invoice country: ' + text);
            invcountry = text;
        }).then(function(){
            if (invcountry.toLowerCase() != 'uk') {
                invact.edit_invoice_det('Testing account', cred.member_vat_uk_email, null, null, null,
                    null, null, null, null, browser.params.invoice.country_uk, 0, 123);
            } else {
                //set up uk
                invact.edit_invoice_det(null, null, null, null, null,
                    null, null, null, null, browser.params.invoice.country_non_uk, 0, 123);
            }
            //check there is no back:
            helper.alert_danger_msg_fn(0, mes.invoice_co_warn);
            expect(browser.getCurrentUrl()).toContain('edit');
        });
    });
    it('Check changing vat registration with projects as a member', function () {
        invact.invoice_det_fn();
        //get country
        comact.get_table_element(9, 0).getText().then(function (text) {
            console.log('get vat info: ' + text);
            if (text.length ==0) {
                //vat is not set
                invact.edit_invoice_det('Testing account', cred.member_vat_uk_email, null, null, null,
                    null, null, null, null, null, 0, 123);
            } else {
                //vat is set, set tax
                //set up uk
                invact.edit_invoice_det(null, null, null, null, null,
                    null, null, null, null, null, 1, 123);
            }
        }).then(function(){
            //check there is no back:
            helper.alert_danger_msg_fn(0, mes.invoice_type_warn);
            expect(browser.getCurrentUrl()).toContain('edit');
        });
        loginact.log_out();
    });
    it('Check changing country with projects as a partner', function () {
        loginact.click_login(false);
        loginact.log_in(cred.part_vat_uk_email, cred.pswd);
        dashact.invoice_view();
        invact.invoice_det_fn();
        //get country
        comact.get_table_element(5, 0).getText().then(function (text) {
            console.log('get invoice country: ' + text);
            invcountry = text;
        }).then(function(){
            if (invcountry.toLowerCase() != 'uk') {
                invact.edit_invoice_det('Testing account', cred.member_vat_uk_email, null, null, null,
                    null, null, null, null, browser.params.invoice.country_uk, 0, 123);
            } else {
                //set up uk
                invact.edit_invoice_det(null, null, null, null, null,
                    null, null, null, null, browser.params.invoice.country_non_uk, 0, 123);
            }
            //check there is no back:
            helper.alert_danger_msg_fn(0, mes.invoice_co_warn);
            expect(browser.getCurrentUrl()).toContain('edit');
        });
    });
    it('Check changing vat registration with projects as a partner', function () {
        invact.invoice_det_fn();
        //get country
        comact.get_table_element(9, 0).getText().then(function (text) {
            console.log('get vat info: ' + text);
            if (text.length ==0) {
                //vat is not set
                invact.edit_invoice_det('Testing account', cred.member_vat_uk_email, null, null, null,
                    null, null, null, null, null, 0, 123);
            } else {
                //vat is set, set tax
                //set up uk
                invact.edit_invoice_det(null, null, null, null, null,
                    null, null, null, null, null, 1, 123);
            }
        }).then(function(){
            //check there is no back:
            helper.alert_danger_msg_fn(0, mes.invoice_type_warn);
            expect(browser.getCurrentUrl()).toContain('edit');
        });
        loginact.log_out();
    });
});