var SocialPage = require('../pages/SocialPage.js');
var soc = new SocialPage();

var Helper = require('../helper.js');
var helper = new Helper();

var EC = protractor.ExpectedConditions;

var SocialActions = function () {
	this.view_linked_img_nb = function () {
		browser.sleep(3000);
		browser.wait(EC.visibilityOf(soc.linked_share_img_nb), 5000, 'number of shared images is not visible');
		return soc.linked_share_img_nb.getText();
	};
	this.linked_login = function (log, pass) {
		browser.wait(EC.visibilityOf(soc.linked_login), 5000, 'element login is not visible');
		soc.linked_login.sendKeys(log);
		soc.linked_pswd.sendKeys(pass).sendKeys(protractor.Key.ENTER);
	};

	this.next_linked_img = function () {
		browser.wait(EC.visibilityOf(soc.next_img), 5000, 'element next is not visible');
		soc.next_img.click();
		//for page load:
		browser.sleep(1000);
	};
	this.fb_debug = function (url, img_name, fetch_click) {
		browser.wait(EC.visibilityOf(soc.fb_input_deb), 5000, 'debug input is not visible');
		soc.fb_input_deb.sendKeys(url).sendKeys(protractor.Key.ENTER);
		browser.sleep(4000);
		if(fetch_click==0){
			soc.fb_fetch.click();
		}
		browser.sleep(10000);
		browser.executeScript(helper.scrollIntoView, soc.fb_img);
		browser.sleep(5000);
		browser.takeScreenshot().then(function (png) {
			helper.writeScreenShot(png, helper.screenshot_fn(img_name));
		});
	};
};
module.exports = SocialActions;