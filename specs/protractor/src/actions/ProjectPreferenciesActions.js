var ProjectPreferenciesPage = require('../pages/ProjectPreferenciesPage.js');
var pp = new ProjectPreferenciesPage();

var CommonElementsPage = require('../pages/CommonElementsPage.js');
var com_ele = new CommonElementsPage();

var EC = protractor.ExpectedConditions;

var ProjectPreferenciesActions = function () {
    this.get_pp_text = function () {
		browser.wait(EC.visibilityOf(pp.project_pref_text), 5000, 'text of project preferencies is not visible');
		return pp.project_pref_text.getText();
	};
    this.edit_pp = function () {
		browser.wait(EC.elementToBeClickable(pp.edit_pp_btn), 5000, 'btn edit project preferencies is not clickable');
		pp.edit_pp_btn.click();
		browser.sleep(2000);
	};
    this.fill_drop = function (input) {
		browser.wait(EC.elementToBeClickable(pp.dropdown), 5000, 'btn dropdown is not clickable');
		pp.dropdown.click();
		browser.wait(EC.visibilityOf(com_ele.select_input), 5000, 'Button edit is not clickable');
		com_ele.select_input.sendKeys(input);
		com_ele.select_input.sendKeys(protractor.Key.ENTER);
	};

	this.save_pp = function () {
		browser.wait(EC.elementToBeClickable(pp.save_pp_btn), 5000, 'btn save project preferencies is not clickable');
		pp.save_pp_btn.click();
	};

	this.close_pp = function () {
		browser.wait(EC.elementToBeClickable(pp.close_pp_btn), 5000, 'btn close project preferencies is not clickable');
		pp.close_pp_btn.click();
	};
};
module.exports = ProjectPreferenciesActions;