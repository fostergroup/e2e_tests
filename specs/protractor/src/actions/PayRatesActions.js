var PayRatesPage = require('../pages/PayRatesPage.js');
var pay = new PayRatesPage();

var helper = require('../helper.js');
var helper = new helper();

var CommonElementsPage = require('../pages/CommonElementsPage.js');
var com_ele = new CommonElementsPage();

var EC = protractor.ExpectedConditions;

var PayRatesActions = function () {
	this.edit_rates = function () {
		browser.wait(EC.elementToBeClickable(pay.set_rate), 5000, 'Btn edit rates is not clickable');
		pay.set_rate.click();
		browser.sleep(1000);
	};
	var pay_rate_drop = function (input_cur) {
		browser.wait(EC.elementToBeClickable(pay.rate_drop), 5000, 'Dropdown rates is not clickable');
		pay.rate_drop.click();
		browser.wait(EC.visibilityOf(com_ele.select_input), 5000, 'Button edit is not clickable');
		com_ele.select_input.sendKeys(input_cur);
		com_ele.select_input.sendKeys(protractor.Key.ENTER);
	};
	this.set_pay_rate = function (input_cur, input_cur_rate, input_day_rate, input_weekly_rate, input_mo_rate) {
		pay_rate_drop(input_cur);
		pay.cur_hourly_input.clear();
		if (input_cur_rate != null) {
			pay.cur_hourly_input.click().sendKeys(input_cur_rate);
		}
		browser.takeScreenshot().then(function (png) {
			helper.writeScreenShot(png, helper.screenshot_fn('change_pwsd_jpg'));
		});

		pay.day_hourly_input.clear();
		if (input_day_rate != null) {
			pay.day_hourly_input.click().sendKeys(input_day_rate);
		}
		browser.takeScreenshot().then(function (png) {
			helper.writeScreenShot(png, helper.screenshot_fn('change_pwsd_jpg'));
		});
		pay.weekly_hourly_input.clear();
		if (input_weekly_rate != null) {
			pay.weekly_hourly_input.click().sendKeys(input_weekly_rate);
		}
		browser.takeScreenshot().then(function (png) {
			helper.writeScreenShot(png, helper.screenshot_fn('change_pwsd_jpg'));
		});

		pay.mo_hourly_input.clear();
		if (input_mo_rate != null) {
			pay.mo_hourly_input.click().sendKeys(input_mo_rate);
		}
		browser.takeScreenshot().then(function (png) {
			helper.writeScreenShot(png, helper.screenshot_fn('change_pwsd_jpg'));
		});
		pay.btn_save.click();
	};
	this.get_rates = function () {
		browser.wait(EC.visibilityOf(pay.all_rates), 8000, 'Element rates to be visible');
		return pay.all_rates.getText();
	}
};
module.exports = PayRatesActions;