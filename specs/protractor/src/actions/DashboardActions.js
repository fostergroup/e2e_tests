var DashboardPage = require('../pages/DashboardPage.js');
var dashboard = new DashboardPage();
var HomePage = require('../pages/HomePage.js');
var home = new HomePage();

var ProjectActions = require('../actions/ProjectActions.js');
var projact = new ProjectActions();

var Helper = require('../helper.js');
var helper = new Helper();

var EC = protractor.ExpectedConditions;

var DashboardActions = function () {

	//invoices view
	this.invoice_view = function () {
		browser.wait(EC.elementToBeClickable(dashboard.invoice_lnk), 7000, 'Link invoices is not clickable');
		dashboard.invoice_lnk.click();

	};

	//profile view
	this.view_prof = function () {
		home.butterBrott.isDisplayed().then(function (result) {
			console.log('visibility of menu: ' + result);
			if (result) {
				browser.executeScript(helper.scrollIntoView, home.butterBrott);
				home.butterBrott.click();
			}
		});
		browser.wait(EC.elementToBeClickable(dashboard.prof_lnk), 5000, 'Link profile is not clickable');
		dashboard.prof_lnk.click();
	};

	//view projects
	this.view_proj = function () {
		home.butterBrott.isDisplayed().then(function (result) {
			console.log('visibility of menu: ' + result);
			if (result) {
				browser.executeScript(helper.scrollIntoView, home.butterBrott);
				home.butterBrott.click();
			}
		});
		browser.wait(EC.elementToBeClickable(dashboard.proj_lnk), 5000, 'Link profile is not clickable');
		dashboard.proj_lnk.click();
	};
	this.view_payments = function () {
		home.butterBrott.isDisplayed().then(function (result) {
			console.log('visibility of menu: ' + result);
			if (result) {
				browser.executeScript(helper.scrollIntoView, home.butterBrott);
				home.butterBrott.click();
			}
		});
		browser.wait(EC.elementToBeClickable(dashboard.payments_lnk), 5000, 'link payments is not clickable');
		dashboard.payments_lnk.click();
	};
	//view dashboard:
	this.view_dash = function () {
		home.butterBrott.isDisplayed().then(function (result) {
			console.log('visibility of menu: ' + result);
			if (result) {
				browser.executeScript(helper.scrollIntoView, home.butterBrott);
				home.butterBrott.click();
			}
		});
		browser.wait(EC.elementToBeClickable(dashboard.dash_lnk), 5000, 'link dashboard is not clickable');
		dashboard.dash_lnk.click();
	};

	//view interview:
	var view_interviews = function () {
		browser.wait(EC.elementToBeClickable(dashboard.interview_lnk), 5000, 'link interview is not clickable');
		dashboard.interview_lnk.click();
		browser.wait(EC.urlContains('/member/interviews'), 5000, 'url is not as expected');
	};
	this.view_interviews = view_interviews;

	//view mailbox:
	var mailbox = function () {
		browser.wait(EC.elementToBeClickable(dashboard.mailbox), 5000, 'link mailbox is not clickable');
		dashboard.mailbox.click();
		browser.wait(EC.urlContains('messages/inbox'), 5000, 'url is not as expected');
	};
	this.mailbox = mailbox;
	var submit_post = function () {
		browser.wait(EC.elementToBeClickable(dashboard.submit_blogpost), 5000, 'link submit blog post is not clickable');
		dashboard.submit_blogpost.click();
		browser.wait(EC.urlContains('blogpost'), 5000, 'url is not as expected');
	};
	this.submit_post = submit_post;
	this.get_member_id = function () {
		browser.wait(EC.visibilityOf(dashboard.member_id), 5000, 'member id is not visible');
		return dashboard.member_id.getText();
	};

	this.check_link_member = function (link_index) {
		browser.wait(EC.elementToBeClickable(dashboard.how_works), 5000, 'link how it works is not clickable');
		// 0 - how it works, 1 - open projects, 2 - my projects, 3 - request payment, 4 - interviews, 5 - payment account, 6 - submit
		//a blog post, 7 - mailbox, 8 - invoices
		if (link_index == 0) {
			//check close as x works:
			dashboard.how_works.click();
			browser.wait(EC.elementToBeClickable(dashboard.close_x), 5000, 'close how it works is not clickable');
			dashboard.close_x.click();
			browser.wait(EC.elementToBeClickable(dashboard.how_works), 5000, 'link how it works is not clickable');
			dashboard.how_works.click();
			browser.wait(EC.elementToBeClickable(dashboard.close_how_works), 5000, 'close how it works is not clickable');
			dashboard.close_how_works.click();
		}
		if (link_index == 1) {
			dashboard.open_proj.click();
			browser.wait(EC.urlContains('/member/projects/open'), 5000, 'url is not as expected');
			browser.navigate().back();
		}
		else if(link_index==2){
			projact.view_my_proj();
			browser.navigate().back();
		}
		else if(link_index==3){
			dashboard.req_pay.click();
			browser.navigate().back();
		}
		else if(link_index==4){
			view_interviews();
			browser.navigate().back();
		}
		else if(link_index==5){
			dashboard.paym_account.click();
			browser.wait(EC.urlContains('/member/settings'), 5000, 'url is not as expected');
			browser.navigate().back();
		}
		else if(link_index==6){
			submit_post();
			browser.navigate().back();
		}
		else if(link_index==7){
			mailbox();
			browser.navigate().back();
		}
	};
};
module.exports = DashboardActions;