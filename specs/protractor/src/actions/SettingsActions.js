var SettingsPage = require('../pages/SettingsPage.js');
var sett = new SettingsPage();

var CommonElementsPage = require('../pages/CommonElementsPage.js');
var com_ele = new CommonElementsPage();

var CommonActions = require('../actions/CommonActions.js');
var comact = new CommonActions();

var EC = protractor.ExpectedConditions;

var SettingsActions = function () {
	this.change_pswd_fn = function (current_pswd, new_pswd_input, repeat_pswd_input) {
		browser.wait(protractor.ExpectedConditions.visibilityOf(sett.cur_pswd), 5000, 'Field current pswd is not visible');
		//set current pswd
		if (current_pswd != null) {
			console.log('this string is send to current pswd: ' + current_pswd);
			sett.cur_pswd.sendKeys(current_pswd);
		}
		//set new pswd
		expect(sett.new_pswd.isDisplayed()).toBeTruthy();
		if (new_pswd_input != null) {
			sett.new_pswd.sendKeys(new_pswd_input);
		}
		//repeat pswd
		expect(sett.repeat_pswd.isDisplayed()).toBeTruthy();
		if (repeat_pswd_input != null) {
			sett.repeat_pswd.sendKeys(repeat_pswd_input);
		}
	};

	//click btn edit pswd
	this.change_pswd_edit = function () {
		browser.wait(EC.elementToBeClickable(sett.change_pswd), 5000, 'Btn edit pswd is not clickable');
		expect(sett.change_pswd.isPresent()).toBeTruthy();
		sett.change_pswd.click();
	};

	//save changes
	this.save_changes = function () {
		//set current pswd
		expect(sett.btn_save.isDisplayed()).toBeTruthy();
		sett.btn_save.click();
	};

	// close dialog by x
	this.close_dialog_fn = function () {
		//set current pswd
		expect(sett.close_dialog.isDisplayed()).toBeTruthy();
		sett.close_dialog.click();
		browser.sleep(1000);
		expect(sett.close_dialog.isDisplayed()).toBeFalsy();
	};

	this.email_notif_change = function (switched) {
		browser.sleep(1000);
		check_notif().then(function (result) {
			if (result && !switched || !result && switched) {
				comact.move_slider();
			}
			else if (switched) {
				browser.wait(EC.elementToBeSelected(com_ele.slider), 5000, 'Slider for email notification is not selected');
			}
			else if (!switched) {
				browser.wait(EC.not(EC.elementToBeSelected(com_ele.slider)), 5000, 'Slider for email notification is still selected');
			}
		})
	};
	this.save_sett_fn = function () {
		browser.wait(EC.visibilityOf(sett.save_dialog), 5000, 'Modal dialog is not visible');
		sett.save_dialog.click();
		browser.sleep(1000);
	};

	this.check_slider = function (result) {
		browser.wait(EC.visibilityOf(com_ele.slider), 5000, 'Slider is not visible');
		check_notif().then(function (check) {
			expect(check).toEqual(result);
		})
	};
	this.set_project_fn = function (one_check, second_check) {
		check_email(0).then(function (result) {
			console.log('this is the first checkbox: ' + result);
			if (result && !one_check || !result && one_check) {
				sett.move_slider.get(0).click();
				if (one_check) {
					browser.wait(EC.elementToBeSelected(sett.checkbox_email.get(0)), 5000, 'Checkbox is not selected');
				}
				else {
					browser.wait(EC.not(EC.elementToBeSelected(sett.checkbox_email.get(0))), 5000, 'Slider is not selected');
				}
			}
		});
		check_email(1).then(function (result) {
			console.log('this is the second checkbox: ' + result);
			if (result && !second_check || !result && second_check) {
				sett.move_slider.get(1).click();
				if (second_check) {
					browser.wait(EC.elementToBeSelected(sett.checkbox_email.get(1)), 5000, 'Checkbox is not selected');
				}
				else {
					browser.wait(EC.not(EC.elementToBeSelected(sett.checkbox_email.get(1))), 5000, 'Checkbox is still selected');
				}
			}
		});

	};
	var check_email = function (index) {
		browser.wait(EC.presenceOf(sett.checkbox_email.get(index)), 5000, 'Slider is not visible');
		return sett.checkbox_email.get(index).isSelected();
	};
	this.check_email = check_email;

	var check_matchskills = function () {
		browser.wait(EC.presenceOf(sett.checkbox_matchskills), 5000, 'Slider is not visible');
		return sett.checkbox_matchskills.isSelected();
	};
	this.check_matchskills = check_matchskills;

	var check_notif = function () {
		browser.wait(EC.presenceOf(sett.email_alerts_slider), 5000, 'Slider for email notification is not visible');
		return sett.email_alerts_slider.isSelected();
	};
	this.check_notif = check_notif;

	this.close_modal_fn = function () {
		browser.wait(EC.elementToBeClickable(sett.close_dialog), 5000, 'Slider for email notification is not visible');
		sett.close_dialog.click();
		browser.sleep(1000);
	};
};
module.exports = SettingsActions;