var InterviewPage = require('../pages/InterviewPage.js');
var int = new InterviewPage();

var CommonElementsPage = require('../pages/CommonElementsPage.js');
var com_ele = new CommonElementsPage();

var PaymentActions = require('../actions/PaymentActions.js');
var pay = new PaymentActions();

var ProjectActions = require('../actions/ProjectActions.js');
var projact = new ProjectActions();

var MessageActions = require('../actions/MessageActions.js');
var mesact = new MessageActions();

var CommonActions = require('../actions/CommonActions.js');
var comact = new CommonActions();

var FindMembersActions = require('../actions/FindMembersActions.js');
var find = new FindMembersActions();

var Helper = require('../helper.js');
var helper = new Helper();

var Messages = require('../messages.js');
var mes = new Messages();

var EC = protractor.ExpectedConditions;

var InterviewActions = function () {
	this.set_interview = function (datetime, timezone, comment) {
		if (datetime != null) {
			browser.sleep(1000);
			int.interv_datetime_picker.click();
			int.interv_datetime.sendKeys(datetime).sendKeys(protractor.Key.ENTER);
		}
		if (timezone != null) {
			int.drop_tz.click();
			com_ele.select_input.sendKeys(timezone).sendKeys(protractor.Key.ENTER);
		}
		if (comment != null) {
			int.interv_comment.sendKeys(comment);
		}
	};
	this.submit_form = function () {
		int.modal_dialog.submit();
	};
	this.view_interview = function (project_nb, interview_status) {
		pay.filt_search(project_nb);
		//get project number
		comact.get_table_element(1, 0).then(function (text) {
			console.log('project number for interview: ' + text);
			expect(text).toContain(project_nb);
		});
		comact.get_table_element(4, 0).then(function (text) {
			console.log('interview status: ' + text);
			expect(text).toContain(interview_status);
		});
	};

	var click_accept_int = function (comments) {
		browser.wait(EC.elementToBeClickable(int.accept_int), 5000, 'Btn accept interview is not clickable');
		int.accept_int.click();
		if (comments != null) {
			browser.wait(EC.visibilityOf(int.com_textarea), 5000, 'Textarea for the comment is not visible');
			int.com_textarea.sendKeys(comments);
		}
	};
	this.click_accept_int = click_accept_int;

	this.accept_from_my_proj = function (comments) {
		click_accept_int(comments);
		browser.wait(EC.elementToBeClickable(int.int_com_submit), 5000, 'Btn submit interview details is not clickable');
		int.int_com_submit.click();
		helper.alert_success_fn(0, mes.int_accepted);
		browser.wait(EC.stalenessOf(int.accept_int), 5000, 'Btn accept interview is still present on the form');
		projact.get_int_details().then(function (value) {
			console.log('this are project details: ' + value);
		});
	};

	this.cancel_from_my_proj = function (comments) {
		click_accept_int(comments);
		browser.wait(EC.elementToBeClickable(int.int_com_cancel), 5000, 'Btn submit interview details is not clickable');
		int.int_com_cancel.click();

		//expect the dialog is closed:
		browser.wait(EC.invisibilityOf(int.com_textarea), 5000, 'Textarea for the comment is not visible');
		//check, that status is not changed:
		projact.get_int_details().then(function (value) {
			console.log('this are project details: ' + value);
		});
	};
	var search_filt = function (project_id) {
		browser.wait(EC.visibilityOf(int.search_filt), 5000, 'Search filter is not visible');
		int.search_filt.sendKeys(project_id);
	};
	this.search_filt = search_filt;

	this.get_int_nb = function () {
		browser.wait(EC.visibilityOf(int.int_nb), 5000, 'Interview number is not visible');
		return int.int_nb.getText();
	};

	this.accept_from_int = function (comment) {
		browser.wait(EC.elementToBeClickable(int.accept_int_from_int), 5000, 'accept interview is not clickable');
		int.accept_int_from_int.click();
		if (comment != null) {
			int.com_textarea.sendKeys(comment);
		}
		find.submit_assign_form();
		browser.sleep(2000);
		helper.alert_success_fn(0, mes.int_accepted)
	};

	this.decline_int = function (comment) {
		browser.wait(EC.elementToBeClickable(int.decline_int_from_int), 5000, 'decline interview is not clickable');
		int.decline_int_from_int.click();
		if (comment != null) {
			int.com_textarea.sendKeys(comment);
		}
		find.submit_assign_form();
		browser.sleep(2000);
		helper.alert_success_fn(0, mes.int_declined)
	};

	this.resched_int = function (comment) {
		browser.wait(EC.elementToBeClickable(int.resched_int), 5000, 'reschedule interview is not clickable');
		int.resched_int.click();
		if (comment != null) {
			int.com_textarea.sendKeys(comment);
		}
		find.submit_assign_form();
		browser.sleep(2000);
		helper.alert_success_fn(0, mes.int_resched)
	};

	this.send_mes = function (message) {
		browser.wait(EC.elementToBeClickable(int.mes_from_int), 5000, 'btn message is not clickable');
		int.mes_from_int.click();
		if (message != null) {
			mesact.fill_msg(null, null, message);
		}
		mesact.send_msg();
		browser.sleep(2000);
	};
};
module.exports = InterviewActions;