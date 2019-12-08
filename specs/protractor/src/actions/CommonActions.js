var CommonElementsPage = require('../pages/CommonElementsPage.js');
var com_ele = new CommonElementsPage();

var Helper = require('../helper.js');
var helper = new Helper();

var EC = protractor.ExpectedConditions;

var CommonActions = function () {
	this.submit_fn = function () {
		browser.wait(EC.elementToBeClickable(com_ele.btn_submit), 5000, 'edit page is not loaded, btn submit is not clickable');
		com_ele.btn_submit.click();
	};

	//click close work btn
	this.close_btn_fn = function (index) {
		com_ele.btn_close.count().then(function (count) {
			console.log('close btn count: ' + count);
		});
		browser.wait(EC.elementToBeClickable(com_ele.btn_close.get(index)), 5000, 'edit page is not loaded, btn close is not clickable');
		com_ele.btn_close.get(index).click();
	};

	//click to see available actions;
	this.expand_fn = function (index) {
		browser.wait(EC.elementToBeClickable(com_ele.expand_btn.get(index)), 10000, 'Button expand is not clickable');
		com_ele.expand_btn.get(index).click();
		//sleep after exp
		browser.sleep(1000);
	};

	//click to see available actions;
	this.edit_fn = function (index) {
		browser.wait(EC.elementToBeClickable(com_ele.edit_btn.get(index)), 5000, 'Button edit is not clickable');
		com_ele.edit_btn.get(index).click();
		browser.sleep(1000);
	};
	//get table element:
	this.get_table_element = function (index, ele_number) {
		browser.wait(EC.visibilityOf(element.all(by.xpath('//table/descendant::td[' + index + ']')).get(ele_number)), 5000, 'table element is not visible');
		return element.all(by.xpath('//table/descendant::td[' + index + ']')).get(ele_number).getText();
	};
	//check the table is empty:
	this.check_table = function () {
		element(by.xpath('//table/descendant::td')).isDisplayed().then(function (result) {
			expect(result).toBeFalse();
		});
	};
	//get table row info:
	this.get_table_row = function (index, ele_number) {
		browser.wait(EC.visibilityOf(element.all(by.xpath('//table/descendant::td[' + index + ']')).get(ele_number)), 5000, 'table element is not visible');
		return element.all(by.xpath('//table/tbody/tr[' + index + ']/td')).get(ele_number).getText();
	};

	//send value to dropdown list:
	this.fill_drop_input = function (input, index) {
		if (input != null) {
			browser.wait(EC.elementToBeClickable(com_ele.drop_list.get(index)), 10000, 'Dropdown list is not clickable');
			browser.executeScript(helper.scrollIntoView, com_ele.drop_list.get(index));
			browser.sleep(1000);
			com_ele.drop_list.get(index).click();
			browser.wait(EC.visibilityOf(com_ele.select_input), 5000, 'Button edit is not clickable');
			com_ele.select_input.sendKeys(input);
			browser.sleep(2000);
			com_ele.select_input.sendKeys(protractor.Key.ENTER);
		}
	};

	//check that the link is active:
	this.check_active_lnk = function (link) {
		var linkpath = '//a[@href = ' + '"' + link + '"' + ']/parent::li';
		element(by.xpath(linkpath)).getAttribute('class').then(function (value) {
			expect(value).toEqual('active');
		});
	};
	this.manage_checkbox = function (index) {
		com_ele.check_box.get(index).click();
	};
	this.move_slider = function () {
		browser.wait(EC.elementToBeClickable(com_ele.slider), 5000, 'slider is not clickable');
		com_ele.slider.click();
	};
};
module.exports = CommonActions;