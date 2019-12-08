var ProfilePage = require('../pages/ProfilePage.js');
var profile = new ProfilePage();
var CommonActions = require('../actions/CommonActions.js');
var comact = new CommonActions();

var EC = protractor.ExpectedConditions;

var ProfileActions = function () {
	//settings view
	this.settings_fn = function () {
		browser.wait(EC.elementToBeClickable(profile.settings_lnk), 5000, 'Link view settings is not clickable');
		profile.settings_lnk.click();
	};

	//CV view
	this.cv_fn = function () {
		browser.wait(EC.elementToBeClickable(profile.cv_lnk), 5000, 'Link cv is not clickable');
		profile.cv_lnk.click();
	};

	//company brief
	this.comp_brief_view = function () {
		browser.wait(EC.elementToBeClickable(profile.company_brief), 5000, 'Link company brief is not clickable');
		profile.company_brief.click();
	};


	//contacts view
	this.contacts_view = function () {
		browser.wait(EC.elementToBeClickable(profile.cont_lnk), 5000, 'Link contacts is not clickable');
		profile.cont_lnk.click();
	};

	//social profiles view
	this.soc_profile_view = function () {
		browser.wait(EC.elementToBeClickable(profile.soc_pr), 5000, 'Link social profiles is not clickable');
		profile.soc_pr.click();
	};

	//work history view
	this.work_history_fn = function () {
		browser.wait(EC.elementToBeClickable(profile.work_history_lnk), 5000, 'Link work history is not clickable');
		profile.work_history_lnk.click();
	};


	this.view_skills = function () {
		browser.wait(EC.elementToBeClickable(profile.skills_lnk), 5000, 'Link view skills is not clickable');
		profile.skills_lnk.click();
	};

	//click pay_rate
	this.pay_rate_fn = function () {
		browser.wait(EC.elementToBeClickable(profile.pay_rate), 5000, 'Link pay rate is not clickable');
		profile.pay_rate.click();
	};

	//click languages
	this.lang_fn = function () {
		browser.wait(EC.elementToBeClickable(profile.langs), 5000, 'Link languages is not clickable');
		profile.langs.click();
	};

	//click group link
	this.group_fn = function () {
		browser.wait(EC.elementToBeClickable(profile.group), 5000, 'Link group is not clickable');
		profile.group.click();
		comact.check_active_lnk('#group-tab');
	};

	//click group link
	this.group_on_focus_fn = function () {
		browser.wait(EC.elementToBeClickable(profile.group_on_focus), 5000, 'Link group is not clickable');
		profile.group_on_focus.click();
		comact.check_active_lnk('#group-tab');
	};
	//click availability link
	this.avail_fn = function () {
		browser.wait(EC.elementToBeClickable(profile.availability), 5000, 'Link availability is not clickable');
		profile.availability.click();
		comact.check_active_lnk('#availability-tab');
	};

	//view project preferencies
	this.view_proj_pref = function () {
		browser.wait(EC.elementToBeClickable(profile.proj_pref), 5000, 'Link project preferencies is not clickable');
		profile.proj_pref.click();
		comact.check_active_lnk('#project-prefs-tab');
	};

	//view partner representatives:
	this.view_partn_represent = function () {
		browser.wait(EC.elementToBeClickable(profile.part_repres), 5000, 'Link partner representatives is not clickable');
		profile.part_repres.click();
		comact.check_active_lnk('#representatives-tab');
	};

	//view settings:
	this.view_settings = function () {
		browser.wait(EC.elementToBeClickable(profile.settings), 5000, 'Link settings is not clickable');
		profile.settings.click();
		//check url
		browser.wait(EC.urlContains('settings'), 5000, 'url is not as expected');
	};
	//view payment history:
	this.view_pay_history = function () {
		browser.wait(EC.elementToBeClickable(profile.pay_history), 5000, 'Link payment history is not clickable');
		profile.pay_history.click();
		//check url
		browser.wait(EC.urlContains('payment/history'), 5000, 'url is not as expected');
	};
};
module.exports = ProfileActions;