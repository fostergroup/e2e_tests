var FindMembersPage = require('../pages/FindMembersPage.js');
var find = new FindMembersPage();

var Helper = require('../helper.js');
var helper= new Helper();

var CommonElementsPage = require('../pages/CommonElementsPage.js');
var com_ele = new CommonElementsPage();

var EC = protractor.ExpectedConditions;

var FindMembersActions = function() {
	//find applicants:
	this.fill_applicants_search_form = function(input_member_id) {
		browser.wait(EC.visibilityOf(find.member_id_input), 5000, 'Input field member is not visible');
		if (input_member_id != null) {
			//always clear form:
			find.member_id_input.clear().sendKeys(input_member_id);
		}
	};

	//send value in dropdown list
	this.fill_dropdown = function(input_payment_nb) {
		browser.wait(EC.elementToBeClickable(find.sel_pay_type), 5000, 'Dropdown payment type is not clickable');
		find.sel_pay_type.click();
		browser.wait(EC.presenceOf(com_ele.select_input), 5000, 'input is not visible');
		if(input_payment_nb == 1){
			com_ele.select_input.sendKeys('one').sendKeys(protractor.Key.ENTER);
		}
		else{
			com_ele.select_input.sendKeys('recur').sendKeys(protractor.Key.ENTER);
			browser.wait(EC.elementToBeClickable(find.sel_pay_nb), 5000, 'Dropdown payment number is not clickable');
			find.sel_pay_nb.click();
			browser.wait(EC.presenceOf(com_ele.select_input), 5000, 'input is not visible');
			com_ele.select_input.sendKeys(input_payment_nb).sendKeys(protractor.Key.DOWN).sendKeys(protractor.Key.ENTER);
			find.sel_pay_nb.sendKeys(protractor.Key.TAB).sendKeys(protractor.Key.ENTER);
		}
	};

	//return back to the active projects screen
	this.back_to_pr_fn = function() {
		browser.wait(EC.elementToBeClickable(find.back_to_active_pr_btn), 10000, 'Button back to the project list is not clickable');
		find.back_to_active_pr_btn.click();
	};

	//submit form
	this.submit_assign_form = function() {
		find.response_form.submit();
	};

	//back from modal dialog form
	this.back_from_modal = function() {
		find.back_btn_dialog.click();
	};

	//assign btn
	this.assign_pr_by_member_id = function() {
		browser.wait(EC.elementToBeClickable(find.assign_btn), 5000, 'Btn assign to project is not clickable');
		browser.executeScript(helper.scrollIntoView, find.assign_btn);
		find.assign_btn.click();
	};
	//invite to interview
	this.invite_pr_by_member_id = function() {
		browser.wait(EC.elementToBeClickable(find.invite_btn), 5000, 'Btn invite to interview is not clickable');
		find.invite_btn.click();
	};
};
module.exports = FindMembersActions;