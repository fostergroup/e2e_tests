var MailinatorPage = require('../../pages/mailinator/MailinatorPage.js');
var mail = new MailinatorPage();

var AffiliatePage = require('../../pages/AffiliatePage.js');
var aff = new AffiliatePage();

var EC = protractor.ExpectedConditions;

var MailinatorActions = function () {
	this.check_inbox = function (email) {
		browser.wait(EC.visibilityOf(mail.inbox), 5000, 'The inbox input is not visible');
		mail.inbox.sendKeys(email).sendKeys(protractor.Key.ENTER);
	};
	this.follow_lnk = function () {
		email_view();
		browser.wait(EC.elementToBeClickable(aff.token_lnk.get(1)), 5000, 'The email is not clickable');
		aff.token_lnk.get(1).getText().then(function (text) {
			console.log('this is partner link: ' + text);
			browser.get(text);
		});
	};
	var email_view = function () {
		browser.wait(EC.elementToBeClickable(mail.email_lnk), 5000, 'The email link is not clickable');
		mail.email_lnk.click();
		browser.switchTo().frame('publicshowmaildivcontent');
	};

	this.reset_lnk = function () {
		email_view();
		browser.wait(EC.elementToBeClickable(mail.reset_lnk), 5000, 'The email is not clickable');
		mail.reset_lnk.getText().then(function (text) {
			console.log('this is a link: ' + text);
			browser.get(text);
		});
	};
};
module.exports = MailinatorActions;