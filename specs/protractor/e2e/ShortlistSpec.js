/*
 * The member vat non-uk registered: with_proj_email (id = 202)
 * Partner vat non-uk registered:
 * the member accepts interview:
 *
 */
var Helper = require('../../src/helper.js');
var Message = require('../../src/messages.js');
var LoginPage = require('../../src/pages/LoginPage.js');
var SocialProfilePage = require('../../src/pages/SocialProfilePage.js');
var CommonElementsPage = require('../../src/pages/CommonElementsPage.js');
var PayRatesPage = require('../../src/pages/PayRatesPage.js');
var Skills = require('../../src/pages/SkillsPage.js');
var ProjectPage = require('../../src/pages/ProjectPage.js');
var FindMembersPage = require('../../src/pages/FindMembersPage.js');
var InvoicePage = require('../../src/pages/InvoicePage');
var PaymentPage = require('../../src/pages/PaymentPage');
var AdminPage = require('../../src/pages/admin/AdminPage');
var Xero = require('../../src/actions/xero/XeroActions');
var Credentials = require('../../src/credentials.js');
var Param = require('../../src/params.js');
var Statuses = require('../../src/statuses.js');


var PaymentActions = require('../../src/actions/PaymentActions.js');
var ProjectActions = require('../../src/actions/ProjectActions.js');
var ProfileActions = require('../../src/actions/ProfileActions.js');
var SkillsActions = require('../../src/actions/SkillsActions.js');
var PayRatesActions = require('../../src/actions/PayRatesActions.js');
var InvoiceActions = require('../../src/actions/InvoiceActions.js');
var LoginActions = require('../../src/actions/LoginActions.js');
var AdminActions = require('../../src/actions/admin/AdminActions.js');
var DashboardActions = require('../../src/actions/DashboardActions.js');
var CommonActions = require('../../src/actions/CommonActions.js');
var FindMembersActions = require('../../src/actions/FindMembersActions.js');
var InterviewActions = require('../../src/actions/InterviewActions.js');
var LanguagesActions = require('../../src/actions/LanguagesActions.js');

var EC = protractor.ExpectedConditions;

describe('Full cycle project test', function () {
	var skills = new Skills();
	var helper = new Helper();
	var mes = new Message();
	var com_elem = new CommonElementsPage();
	var payRatesPage = new PayRatesPage();
	var project = new ProjectPage();
	var findMembers = new FindMembersPage();
	var invoice = new InvoicePage();
	var admin = new AdminPage();
	var pay = new PaymentPage();

	var payact = new PaymentActions();
	var projact = new ProjectActions();
	var skillact = new SkillsActions();
	var payratesact = new PayRatesActions();
	var invoiceact = new InvoiceActions();
	var loginact = new LoginActions();
	var adminact = new AdminActions();
	var cred = new Credentials();
	var dashact = new DashboardActions();
	var profact = new ProfileActions();
	var comact = new CommonActions();
	var findact = new FindMembersActions();
	var intact = new InterviewActions();
	var langact = new LanguagesActions();
	var param = new Param();
	var xero = new Xero();
	var status = new Statuses();

	var full_project_id_1, full_project_id_2,
		pr_id, invoice_partner, invoice_member;
	var project_skill_1 = ['AJAX', 'Pentaho'];
	var project_skill_2 = ['4D', 'Pentaho'];
	var currency = 'USD';
	var hourly_rate_for_partner = param.hourly_rate * 1.05;
	var daily_rate_for_partner = param.daily_rate * 1.05;
	var weekly_rate_for_partner = param.weekly_rate * 1.05;
	var mo_rate_for_partner = param.mo_rate * 1.05;
	var proj_duration = 3;
	var vat_number, member_invoice_address, partner_invoice_address, part_primary_proj_nb;

	// Open tranformify
	beforeAll(function () {
		browser.ignoreSynchronization = true;
		browser.get(browser.baseUrl);
	});
	it('Log in as another member and set skills ', function () {
		loginact.click_login(true);
		loginact.log_in(cred.member_no_vat_non_uk_email, cred.pswd);
		dashact.view_prof();
		profact.view_skills();

		//remove skills if they were:
		skillact.remove_skills_fn();
		//add new skills:
		skillact.add_skills_fn(['Pentaho']);
		browser.sleep(2000);
	});

	it('Log in as another member and set languages ', function () {
		profact.lang_fn();
		//remove languages if they were:
		langact.delete_lang_fn();
		//add new language:
		comact.fill_drop_input('Arab', 0);
		comact.fill_drop_input('Flue', 1);
		comact.submit_fn();
		browser.sleep(2000);
		helper.alert_success_fn(0, mes.lang_saved);
		loginact.log_out();
	});

	it('Log in as a member and sets skills', function () {
		loginact.click_login(true);
		loginact.log_in(cred.member_vat_uk_email, cred.pswd);
		dashact.view_prof();
		profact.view_skills();

		//remove skills if they were:
		skillact.remove_skills_fn();
		//add new skills:
		skillact.add_skills_fn(['AJAX']);
		browser.sleep(2000);
	});
	it('Log in as a member and sets language and its level', function () {
		profact.lang_fn();
		browser.sleep(2000);
		//remove languages if they were:
		langact.delete_lang_fn();
		//add new language:
		comact.fill_drop_input('Arab', 0);
		comact.fill_drop_input('Flue', 1);
		comact.submit_fn();
		browser.sleep(2000);
		helper.alert_success_fn(0, mes.lang_saved);
		loginact.log_out();
	});

	it('Log in as a partner and create a new project 1 with skills', function () {
		loginact.click_login(false);
		loginact.log_in(cred.part_vat_non_uk_email, cred.pswd);
		projact.active_pr_fn();
		//wait that all project info is loaded
		browser.sleep(2000);

		//get the number of projects before posting a new one
		projact.get_project_number().then(function (text) {
			part_primary_proj_nb = text.substring((text.indexOf('of') + 3), text.indexOf('entries'));
			console.log('primary project nb: ' + part_primary_proj_nb);
		});

		projact.post_proj_fn();
		projact.post_project_fn('Project_1', 'Project description', project_skill_1, 2, 'hour', proj_duration, helper.getDate(+3), helper.getDate(+13), false, null, null, null, 0);
		browser.wait(EC.urlContains('projects/active'), 5000, 'url is not as expected');
		//get project id of newly posted project: sort desc project and get first element
		projact.sort_proj_desc();
		//get the number of projects after posting a new one
		projact.get_project_number().then(function (text) {
			var part_changed_proj_nb = text.substring((text.indexOf('of') + 3), text.indexOf('entries'));
			console.log('changed project nb: ' + part_changed_proj_nb);
			expect(Number(part_changed_proj_nb)).toEqual(Number(part_primary_proj_nb) + 1);
		});
		project.project_id.getText().then(function (text) {
			full_project_id_1 = text.substring((text.indexOf('[') + 1), text.indexOf(']'));
			console.log('this is full project_id without brackets' + full_project_id_1);
			pr_id = text.substring((text.indexOf('-') + 1), text.indexOf(']'));
			console.log('Id of the project: ' + pr_id);
		});
	});

	it('Log in as a partner and create a new project 2 with skills', function () {
		projact.post_proj_fn();
		projact.post_project_fn('Project_1', 'Project description', project_skill_2, 2, 'hour', proj_duration, helper.getDate(+3), helper.getDate(+13), false, null, null, null, 0);
		browser.wait(EC.urlContains('projects/active'), 5000, 'url is not as expected');
		//get project id of newly posted project: sort desc project and get first element
		projact.sort_proj_desc();
		//get the number of projects after posting a new one
		projact.get_project_number().then(function (text) {
			var part_changed_proj_nb = text.substring((text.indexOf('of') + 3), text.indexOf('entries'));
			console.log('changed project nb: ' + part_changed_proj_nb);
			expect(Number(part_changed_proj_nb)).toEqual(Number(part_primary_proj_nb) + 2);
		});
		project.project_id.getText().then(function (text) {
			full_project_id_2 = text.substring((text.indexOf('[') + 1), text.indexOf(']'));
			console.log('this is full project_id without brackets' + full_project_id_2);
			pr_id = text.substring((text.indexOf('-') + 1), text.indexOf(']'));
			console.log('Id of the project: ' + pr_id);
		});
	});

	it('As a member checks, that the project is visible in projects list (apply link)', function () {
		loginact.click_login(true);
		loginact.log_in(cred.member_no_vat_non_uk_email, cred.pswd);
		dashact.view_proj();
		projact.apply_pr_fn();
		projact.filter_projects_fn(full_project_id_1, null, false);
		//wait the form is loaded
		browser.sleep(1000);
		projact.get_project_number().then(function (text) {
			var proj_nb = text.toString().substring((text.toString().indexOf('of') + 3), text.toString().indexOf('entries') - 1);
			console.log('number of projects: ' + proj_nb);
			expect(Number(proj_nb)).toEqual(1);
		});

		comact.get_table_element(1, 0).then(function (text) {
			expect(text).toContain(full_project_id_1);
		});
		comact.expand_fn(0);
		projact.apply_lnk_fn(0);
		expect(helper.alert_success_fn(0, mes.suc_applic_proj));
		loginact.log_out();
	});
	it('As a partner I manage members and add them to the shortlist', function () {
		loginact.click_login(false);
		loginact.log_in(cred.part_vat_non_uk_email, cred.pswd);
		dashact.view_proj();
		//check url is right
		browser.wait(EC.urlContains('projects/active'), 5000, 'url is not as expected');

		//add project sort
		projact.filter_projects_fn(full_project_id_1, null, true);
		comact.get_table_element(3, 0).getText().then(function (text) {
			console.log('expected project status: ' + text);
			expect(text).toEqual(status.open);
		});
		comact.expand_fn(0);
		//check available actions:
		expect(project.btn_complete_proj.isPresent()).toBeFalsy();
		expect(project.btn_terminate_proj.isPresent()).toBeFalsy();
		expect(project.btn_copy_proj.isDisplayed()).toBeTruthy();
		expect(project.btn_edit_proj.isDisplayed()).toBeTruthy();
		expect(project.btn_close_proj.isDisplayed()).toBeTruthy();
		expect(project.avail_memb.isDisplayed()).toBeTruthy();
		expect(project.manage_memb.isDisplayed()).toBeTruthy();
		expect(project.copy_shortlist.get(0).isDisplayed()).toBeTruthy();
		projact.find_available_members(0, cred.member_no_vat_non_uk_id, 0);
		browser.sleep(1000);
		projact.add_to_shortlist();
		projact.change_style_shortlist();
		findact.back_to_pr_fn();
		comact.expand_fn(0);
		//expect(project.shortlist.get(0).isPresent()).toBeFalsy();
		//view shortlist, expected 0
		projact.view_shortlist(0);
		//get the number of applicants before posting a new one
		projact.get_avail_part_number().then(function (text) {
			expect(Number(text.substring((text.indexOf('of') + 3), text.indexOf('entries')))).toEqual(1);
		});
		findact.back_to_pr_fn();
		comact.expand_fn(0);
	});
	it('As a partner I view applicants list and add one to shortlist', function () {
		projact.find_available_members(0, cred.member_vat_uk_id, 1);
		browser.sleep(1000);
		projact.get_avail_part_number().then(function (text) {
			expect(Number(text.substring((text.indexOf('of') + 3), text.indexOf('entries')))).toEqual(1);
		});
		projact.add_to_shortlist();
		findact.back_to_pr_fn();
		comact.expand_fn(0);
		projact.find_available_members(0, '', 2);
		browser.sleep(1000);
		projact.get_avail_part_number().then(function (text) {
			expect(Number(text.substring((text.indexOf('of') + 3), text.indexOf('entries')))).toEqual(2);
		});
	});
	it('As a partner I copy shortlist from project 1 to project 2', function () {
		findact.back_to_pr_fn();
		projact.filter_projects_fn(full_project_id_2, null, true);
		browser.sleep(1000);
		comact.expand_fn(0);
		projact.copy_shortlist(0);
		browser.sleep(5000);
		projact.sort_proj_desc();
		browser.sleep(1000);
		projact.copy_proj_shortlist(0);
	});
	it('As a partner I check the number of members in shortlist for project 2', function () {
		findact.back_to_pr_fn();
		projact.filter_projects_fn(full_project_id_2, null, true);
		browser.sleep(1000);
		comact.expand_fn(0);
		projact.view_shortlist(0);
		browser.sleep(1000);
		//get the number of applicants before posting a new one
		projact.get_avail_part_number().then(function (text) {
			expect(Number(text.substring((text.indexOf('of') + 3), text.indexOf('entries')))).toEqual(1);
		});
		comact.get_table_element(1, 0).then(function (result) {
			expect(result).toContain(225);
		});
	});
	it('As a partner I remove the member from shortlist', function () {
		projact.remove_from_shortlist(0);
		browser.sleep(2000);
		comact.check_table();
		loginact.log_out();
	});
});