var Xero = require('../../pages/xero/DashPage.js');
var xero = new Xero();
var path = require('path');

var Helper = require('../../helper.js');
var helper = new Helper();

var EC = protractor.ExpectedConditions;

var XeroActions = function() {
	this.log_in = function(log, pass){
        var login = EC.visibilityOf(xero.email);
        var pswd = EC.visibilityOf(xero.pswd);
        var submit = EC.elementToBeClickable(xero.submit_btn);
		browser.wait(EC.and(login, pswd, submit), 5000);
		xero.email.sendKeys(log);
        xero.pswd.sendKeys(pass);
        xero.submit_btn.click();
	};
    this.find_partner_invoices = function(invoice_nb){
        browser.wait(EC.elementToBeClickable(xero.account_lnk), 5000, 'account link is not clickable');
        xero.account_lnk.click();
        browser.wait(EC.elementToBeClickable(xero.sales_lnk), 5000, 'sales link is not clickable');
        xero.sales_lnk.click();
        browser.wait(EC.elementToBeClickable(xero.see_all_lnk.get(0)), 5000, 'lnk see all is not clickable');
        xero.see_all_lnk.get(0).click();
        browser.wait(EC.elementToBeClickable(xero.search_inv_btn), 5000, 'search invoice link is not clickable');
        xero.search_inv_btn.click();
        browser.wait(EC.visibilityOf(xero.search_input), 5000, 'search input is not visible');
        xero.search_input.sendKeys(invoice_nb);
        browser.wait(EC.elementToBeClickable(xero.submit_search), 5000, 'search invoice link is not clickable');
        xero.submit_search.click();
        browser.wait(EC.elementToBeClickable(xero.view_part_inv), 10000, 'invoice link is not clickable');
        xero.view_part_inv.click();
    };

    this.find_member_invoices = function(invoice_nb){
        browser.wait(EC.elementToBeClickable(xero.account_lnk), 5000, 'account link is not clickable');
        xero.account_lnk.click();
        browser.wait(EC.elementToBeClickable(xero.purch_lnk), 5000, 'sales link is not clickable');
        xero.purch_lnk.click();
        browser.wait(EC.elementToBeClickable(xero.see_all_lnk.get(0)), 5000, 'lnk see all is not clickable');
        xero.see_all_lnk.get(0).click();

        browser.wait(EC.elementToBeClickable(xero.search_bill_btn), 5000, 'search bill link is not clickable');
        xero.search_bill_btn.click();
        browser.wait(EC.visibilityOf(xero.search_input), 5000, 'search input is not visible');
        xero.search_input.sendKeys(invoice_nb);
        browser.wait(EC.elementToBeClickable(xero.submit_search), 5000, 'search invoice link is not clickable');
        xero.submit_search.click();
        browser.sleep(3000);
        browser.wait(EC.elementToBeClickable(xero.view_memb_inv), 10000, 'invoice link is not clickable');
        xero.view_memb_inv.click();
    };
    this.get_table_cell = function(index, row){
        return element.all(by.xpath('//td['+ index + ']')).get(row).getText();
    };
    this.get_details = function(){
        browser.wait(EC.visibilityOf(xero.details), 5000, 'search input is not visible');
        return xero.details.getText();
    };

    this.log_out = function(){
        browser.wait(EC.elementToBeClickable(xero.user_lnk), 5000, 'link username is not clickable');
        xero.user_lnk.click();
        browser.wait(EC.elementToBeClickable(xero.logout_lnk), 5000, 'link logout is not clickable');
        xero.logout_lnk.click();
    };
    this.view_cont_det = function(){
        browser.wait(EC.elementToBeClickable(xero.cont_lnk), 7000, 'link contact is not clickable');
        xero.cont_lnk.click();
    };
    this.get_cont_address = function(){
        browser.wait(EC.visibilityOf(xero.cont_address), 7000, 'link contact is not clickable');
        return xero.cont_address.getText();
    };
    var view_account = function () {
		browser.wait(EC.elementToBeClickable(xero.account_lnk), 7000, 'link account is not clickable');
		xero.account_lnk.click();
	};
    var view_bank_account = function () {
		browser.wait(EC.elementToBeClickable(xero.bank_account_lnk), 7000, 'link bank account is not clickable');
		xero.bank_account_lnk.click();
	};
	var import_usd_statement_fn = function () {
		browser.wait(EC.elementToBeClickable(xero.import_statement_lnk), 7000, 'link import bank statement is not clickable');
		xero.import_statement_lnk.click();
	};
    var import_file = function (path) {
		browser.wait(EC.presenceOf(xero.file_path), 5000, 'file path is not visible');
		xero.file_path.sendKeys(path);
	};
	var import_submit = function () {
		browser.wait(EC.elementToBeClickable(xero.import_btn), 5000, 'button import is not clickable');
		xero.import_btn.click();
	};
	var manage_acccount = function () {
		browser.wait(EC.elementToBeClickable(xero.manage_usd_account), 5000, 'button manage account is not clickable');
		xero.manage_usd_account.click();
	};
	var find_match_fn = function () {
		browser.wait(EC.elementToBeClickable(xero.find_match), 5000, 'button find and match is not clickable');
		xero.find_match.click();
	};
	var input_ref_fill = function (ref) {
		browser.wait(EC.visibilityOf(xero.search_ref), 5000, 'element input search is not visible');
		xero.search_ref.sendKeys(ref).sendKeys(protractor.Key.ENTER);
	};
	var send_checkbox = function () {
		browser.wait(EC.elementToBeClickable(xero.checkbox_recons), 5000, 'element checkbox is not clickable');
		xero.checkbox_recons.click();
		browser.wait(EC.elementToBeSelected(xero.sel_checkbox), 5000, 'element checkbox is not clickable');
	};
	var click_ok = function () {
		browser.wait(EC.elementToBeClickable(xero.btn_ok), 5000, 'element ok is not clickable');
		xero.btn_ok.click();
	};
	this.set_bank_statement = function (filepath) {
		var absolutePath = path.resolve(__dirname, filepath);
		console.log('this is absolute path: ' + absolutePath);
		view_account();
		view_bank_account();
		manage_acccount();
		browser.sleep(2000);
		import_usd_statement_fn();
		import_file(absolutePath);
		import_submit();
	};
	this.reconsile = function (input_ref) {
		find_match_fn();
		input_ref_fill(input_ref);
		browser.sleep(3000);
		send_checkbox();
		click_ok();
	};
	this.confirm = function () {
		browser.sleep(2000);
		xero.confirm_btn.isPresent().then(function (result) {
			if(result){
				browser.executeScript(helper.scrollIntoView, xero.confirm_btn);
				xero.confirm_btn.click();
			}
		});
	};
};
module.exports = XeroActions;