var CVPage = require('../pages/CVPage.js');
var cv = new CVPage();
var Helper = require('../helper.js');
var helper = new Helper();

var EC = protractor.ExpectedConditions;

var CVActions = function () {
	this.set_avatar_fn = function (path, isMember) {
		expect(cv.avatar.isPresent()).toBeTruthy();
		cv.avatar.click();
		browser.sleep(2000);
		if (isMember) {
			expect(cv.avatar_input.isPresent()).toBeTruthy();
			cv.avatar_input.sendKeys(path);
		}
		else {
			expect(cv.logo_input.isPresent()).toBeTruthy();
			cv.logo_input.sendKeys(path);
		}

		cv.avat_form.submit();
	};

	this.close_dialog_fn = function () {
		//noinspection JSUnresolvedVariable
		browser.executeScript(helper.scrollIntoView, cv.close_btn);
		browser.wait(EC.elementToBeClickable(cv.close_btn), 5000, 'btn close dialog is not clickable');
		cv.close_btn.click();
	};
	//set up resume text
	this.set_cv_fn = function (text) {
		browser.wait(EC.elementToBeClickable(cv.cv), 5000, 'btn edit cv is not clickable');
		cv.cv.click();
		browser.wait(EC.visibilityOf(cv.resume), 5000, 'textarea is not visible');
		cv.resume.clear();
		if (text != null) {
			cv.resume.sendKeys(text);
		}
	};
	var edit_brief = function () {
		browser.wait(EC.elementToBeClickable(cv.brief_edit), 5000, 'btn edit brief is not clickable');
		cv.brief_edit.click();
	};
	this.edit_brief = edit_brief;
	//set up brief
	this.set_brief = function (text) {
		edit_brief();
		browser.wait(EC.visibilityOf(cv.brief), 5000, 'textarea is not visible');
		cv.brief.clear();
		if (text != null) {
			cv.brief.sendKeys(text);
		}
	};

	//save btn click on resume text
	this.save_cv_fn = function () {
		browser.wait(EC.elementToBeClickable(cv.cvsave_btn), 5000, 'btn save cv is not clickable');
		cv.cvsave_btn.click();
	};

	//close btn click on resume text
	this.close_brief_fn = function () {
		browser.wait(EC.elementToBeClickable(cv.close_brief), 5000, 'btn close brief is not clickable');
		cv.close_brief.click();
	};

	//close btn click on resume text
	this.close_cv_fn = function () {
		browser.wait(EC.elementToBeClickable(cv.close_cv), 5000, 'btn close cv is not clickable');
		cv.close_cv.click();
	};

	//save btn click on brief text
	this.save_brief_fn = function () {
		browser.wait(EC.elementToBeClickable(cv.brief_save_btn), 5000, 'btn edit brief is not clickable');
		cv.brief_save_btn.click();
	};

	//get resume text
	this.get_resume_text = function (text) {
		expect(cv.resume_tx.isDisplayed()).toBeTruthy();
		expect(cv.resume_tx.getText()).toContain(text);
	};

	//get resume text
	this.get_brief_text = function (text) {
		browser.wait(EC.visibilityOf(cv.brief_tx), 5000, 'btn edit brief is not clickable');
		expect(cv.brief_tx.getText()).toContain(text);
	};

	//get resume text
	this.view_cv_help = function () {
		expect(cv.view_help_lnk.isDisplayed()).toBeTruthy();
		cv.view_help_lnk.click();
		browser.sleep(1000);
		expect(cv.close_dialog_btn.isDisplayed()).toBeTruthy();
		cv.close_dialog_btn.click();
		browser.sleep(1000);
		expect(cv.close_dialog_btn.isDisplayed()).toBeFalsy();
	};
	var view_status = function () {
		return cv.view_status.getText();
	};
	this.view_status = view_status;
	this.set_status = function (type, part_name) {
		browser.wait(EC.elementToBeClickable(cv.show_status), 5000, 'Show status is not clickable');
		cv.show_status.isSelected().then(function (result) {
			if (result && !type || !result && type) {
				//the checkbox is already selected and set off or checkbox is off and should be on
				cv.show_status.click();
				if (type) {
					browser.wait(EC.elementToBeSelected(cv.show_status), 5000, 'Show status is not selected');
					browser.sleep(2000);
					view_status.then(function (value) {
						console.log('company name: ' + value);
						expect(value).toContain('Partner');
					});
				}
				else{
					browser.wait(EC.not(EC.elementToBeSelected(cv.show_status)), 5000, 'Show status is still selected');
					browser.sleep(2000);
					view_status().then(function (value) {
						console.log('company name: ' + value);
						expect(value).toContain(part_name);
					});
				}
			}
		});
	};
};
module.exports = CVActions;