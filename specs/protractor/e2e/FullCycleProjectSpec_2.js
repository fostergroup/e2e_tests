/*
 * The member vat uk registered: id = 176
 * Partner vat uk registered: (partnertesttr@gmail.com);
 * Payment type = Recurring
 * Member applies to the project
 * currency = euro;
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
var LanguagesActions = require('../../src/actions/LanguagesActions.js');
var CVActions = require('../../src/actions/CVActions.js');

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
	var langact = new LanguagesActions();
	var cvact = new CVActions();
	var param = new Param();
	var xero = new Xero();
	var status = new Statuses();

	var full_project_id,
		pr_id, invoice_partner, invoice_member, vat_number, primary_proj_nb, new_proj_nb, with_test_pr;
	var project_skill = ['AJAX', 'Pentaho'];
	var currency = 'USD';
	var hourly_rate_for_partner = param.hourly_rate * 1.05;
	var daily_rate_for_partner = param.daily_rate * 1.05;
	var weekly_rate_for_partner = param.weekly_rate * 1.05;
	var mo_rate_for_partner = param.mo_rate * 1.05;
	var proj_duration = 3;
	var number_of_pays = 3;

	// Open tranformify
	beforeAll(function () {
		browser.ignoreSynchronization = true;
		browser.get(browser.baseUrl);
	});
	it('Log in as a member and check invoice details', function () {
		loginact.click_login(true);
		loginact.log_in(cred.member_vat_uk_email, cred.pswd);
		dashact.invoice_view();
		invoiceact.invoice_det_fn();
		comact.get_table_element(9, 0).getText().then(function (text) {
			console.log('get vat number: ' + text);
			vat_number = text;
			expect(text).toBeNonEmptyString();
		});
		comact.get_table_element(5, 0).getText().then(function (text) {
			console.log('get invoice country: ' + text);
			expect(text.toLowerCase()).toEqual('uk');
		});
	});

	it('Log in as a member and sets skills and rate', function () {
		dashact.view_prof();
		profact.view_skills();
		//remove skills if they were:
		skillact.remove_skills_fn();
		//add new skills:
		skillact.add_skills_fn(project_skill);
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
	});
	it('A member and sets pay rate', function () {
		var user_rates = [];
		profact.pay_rate_fn();
		payratesact.edit_rates();
		payratesact.set_pay_rate(currency, param.hourly_rate, param.daily_rate, param.weekly_rate, param.mo_rate);
		payRatesPage.rates.each(function (item) {
			item.getInnerHtml().then(function (text) {
				console.log('User rate: ' + text);
				user_rates.push(text);
			});
		}).then(function () {
			console.log('user rates all: ' + user_rates);
			expect(Number(user_rates[0].substring(0, user_rates[0].indexOf(currency)))).toEqual(param.hourly_rate);
			expect(Number(user_rates[1].substring(0, user_rates[1].indexOf(currency)))).toEqual(param.daily_rate);
			expect(Number(user_rates[2].substring(0, user_rates[2].indexOf(currency)))).toEqual(param.weekly_rate);
			expect(Number(user_rates[3].substring(0, user_rates[3].indexOf(currency)))).toEqual(param.mo_rate);
		});
		loginact.log_out();
	});

	it('Log in as a partner and create a new project with skills', function () {
		loginact.click_login(false);
		loginact.log_in(cred.part_vat_uk_email, cred.pswd);
		projact.active_pr_fn();
		//wait that all project info is loaded
		browser.sleep(1000);
		//get the number of projects before posting a new one
		projact.get_project_number().then(function (text) {
			primary_proj_nb = text.substring((text.indexOf('of') + 3), text.indexOf('entries'));
			console.log('primary project nb: ' + primary_proj_nb);
		});

		projact.post_proj_fn();
		projact.post_project_fn('Project_1', 'Project description', project_skill, 2, 'hour', proj_duration, helper.getDate(+3), helper.getDate(+13), false, null, null, null, 0);
		browser.wait(EC.urlContains('projects/active'), 5000, 'url is not as expected');
		browser.sleep(1000);
		projact.get_project_number().then(function (text) {
			new_proj_nb = text.substring((text.indexOf('of') + 3), text.indexOf('entries'));
			console.log('increased project nb: ' + new_proj_nb);
		}).then(function () {
			expect(Number(new_proj_nb)).toEqual(Number(primary_proj_nb) + 1);
		});

		//get project id of newly posted project: sort desc project and get first element
		projact.sort_proj_desc();
		browser.sleep(2000);
		project.project_id.getText().then(function (text) {
			full_project_id = text.substring((text.indexOf('[') + 1), text.indexOf(']'));
			console.log('full_project_id: ' + full_project_id);
			pr_id = text.substring((text.indexOf('-') + 1), text.indexOf(']'));
			console.log('Id of the project: ' + pr_id);
		});
	});
	it('A partner shows his company name', function () {
		dashact.view_prof();
		cvact.set_status(false, 'Company');
	});

	it('Partner checks invoice details as uk vat registered', function () {
		dashact.view_dash();
		dashact.invoice_view();
		invoiceact.invoice_det_fn();
		comact.get_table_element(9, 0).getText().then(function (text) {
			console.log('get vat number: ' + text);
			vat_number = text;
			expect(text).toBeNonEmptyString();
		});
		comact.get_table_element(5, 0).getText().then(function (text) {
			console.log('get invoice country: ' + text);
			expect(text.toLowerCase()).toEqual('uk');
		});
		loginact.log_out();
	});

	it('As a member check, that the project is visible in projects list and applies to it', function () {
		loginact.click_login(true);
		loginact.log_in(cred.member_vat_uk_email, cred.pswd);
		dashact.view_proj();
		projact.apply_pr_fn();
		projact.filter_projects_fn(full_project_id, null, false);
		//wait the form is loaded
		browser.sleep(1000);
		projact.get_project_number().then(function (text) {
			var proj_nb = text.toString().substring((text.toString().indexOf('of') + 3), text.toString().indexOf('entries') - 1);
			console.log('number of projects: ' + proj_nb);
			expect(Number(proj_nb)).toEqual(1);
		});
		comact.expand_fn(0);
		projact.apply_lnk_fn(0);
		expect(helper.alert_success_fn(0, mes.suc_applic_proj));
	});
	it('As a member check, that the project is visible in my projects  after application', function () {
		projact.view_my_proj();
		browser.sleep(2000);
		projact.filter_projects_fn(full_project_id, null, false);
		projact.get_project_number().then(function (text) {
			var proj_nb = text.toString().substring((text.toString().indexOf('of') + 3), text.toString().indexOf('entries') - 1);
			console.log('number of projects: ' + proj_nb);
			expect(Number(proj_nb)).toEqual(1);
		});
		comact.expand_fn(0);
		browser.sleep(2000);
		comact.get_table_row(2, 0).then(function (text) {
			console.log(text);
			expect(text).toContain(status.applied);
		});
		projact.view_proj_details(pr_id, 'Company');
		projact.go_back_to_proj('open');
	});
	it('As a member check, that the project is not any more visible in apply list', function () {
		projact.apply_pr_fn();
		browser.sleep(2000);
		projact.filter_projects_fn(full_project_id, null, false);
		projact.get_project_number().then(function (text) {
			var proj_nb = text.toString().substring((text.toString().indexOf('of') + 3), text.toString().indexOf('entries') - 1);
			console.log('number of projects: ' + proj_nb);
			expect(Number(proj_nb)).toEqual(0);
		});
		loginact.log_out();
	});
	it('As a partner I manage applicants', function () {
		loginact.click_login(false);
		loginact.log_in(cred.part_vat_uk_email, cred.pswd);
		dashact.view_proj();
		//check url is right
		browser.wait(EC.urlContains('projects/active'), 5000, 'url is not as expected');
		//check that link is active:
		comact.check_active_lnk('/partner/projects/active');
		projact.sort_proj_desc();
		browser.sleep(1000);
		projact.get_project_number().then(function (text) {
			primary_proj_nb = text.toString().substring((text.toString().indexOf('of') + 3), text.toString().indexOf('entries') - 1);
			console.log('number of projects: ' + primary_proj_nb);
		});
		comact.expand_fn(0);
		//check available actions:
		expect(project.btn_complete_proj.isPresent()).toBeFalsy();
		expect(project.btn_terminate_proj.isPresent()).toBeFalsy();
		expect(project.btn_copy_proj.isDisplayed()).toBeTruthy();
		expect(project.btn_edit_proj.isDisplayed()).toBeTruthy();
		expect(project.btn_close_proj.isDisplayed()).toBeTruthy();

		//check that member rates visible to the partner are with transf fee
		projact.find_available_members(0, cred.member_vat_uk_id, 0);
		browser.sleep(1000);
		//check the number of skills for the project and visible rates:

		//get hours rate info:
		comact.get_table_element(4, 0).getText().then(function (text) {
			console.log('hours rate: ' + text);
			expect(Number(text.replace(/,/g, ''))).toEqual(hourly_rate_for_partner);
		});
		//get daily rate info:
		comact.get_table_element(5, 0).getText().then(function (text) {
			console.log('daily rate: ' + text);
			expect(Number(text.replace(/,/g, ''))).toEqual(daily_rate_for_partner);
		});
		//get weekly rate info:
		comact.get_table_element(6, 0).getText().then(function (text) {
			console.log('weekly rate: ' + text);
			expect(Number(text.replace(/,/g, ''))).toEqual(weekly_rate_for_partner);
		});

		//get monthly rate info:
		comact.get_table_element(7, 0).getText().then(function (text) {
			console.log('monthly rate: ' + text.replace(/,/g, ''));
			expect(Number(text.replace(/,/g, ''))).toEqual(mo_rate_for_partner);
		});
		//get currency info:
		comact.get_table_element(8, 0).getText().then(function (text) {
			console.log('currency: ' + text);
			expect(text).toEqual(currency);
		});
		//get skills number info:
		comact.get_table_element(9, 0).getText().then(function (text) {
			console.log('currency: ' + text);
			expect(Number(text)).toEqual(2);
		});
	});
	it('As a partner I create the test project', function () {
		comact.expand_fn(0);
		//check available actions:
		expect(findMembers.assign_btn.isDisplayed()).toBeTruthy();
		expect(findMembers.accept_int_btn.isDisplayed()).toBeTruthy();
		expect(findMembers.decline_btn.isDisplayed()).toBeTruthy();
		expect(findMembers.create_test_pro_btn.isDisplayed()).toBeTruthy();
		browser.sleep(3000);
		projact.create_test_pr();
		projact.post_project_fn(null, null, null, null, null, null, null, null, false, null, null, null, 0);
		browser.wait(EC.urlContains('projects/active'), 5000, 'url is not as expected');
		browser.sleep(1000);
		projact.get_project_number().then(function (text) {
			with_test_pr = text.substring((text.indexOf('of') + 3), text.indexOf('entries'));
			console.log('increased project nb: ' + with_test_pr);
		}).then(function () {
			expect(Number(with_test_pr)).toEqual(Number(primary_proj_nb) + 1);
		});
		comact.get_table_element(2, 0).getText().then(function (text) {
			console.log('project name: ' + text);
			expect(text).toEqual('Test Project_1');
		});
	});
	it('As a partner I assign the project and set recurring payment', function () {
		projact.filter_projects_fn(full_project_id, null, false);
		browser.sleep(1000);
		comact.expand_fn(0);
		projact.find_available_members(0, cred.member_vat_uk_id, 0);
		browser.sleep(1000);
		comact.expand_fn(0);
		//check available actions:
		expect(findMembers.assign_btn.isDisplayed()).toBeTruthy();
		expect(findMembers.accept_int_btn.isDisplayed()).toBeTruthy();
		expect(findMembers.decline_btn.isDisplayed()).toBeTruthy();
		expect(findMembers.create_test_pro_btn.isDisplayed()).toBeTruthy();
		browser.sleep(3000);
		projact.partner_assigns_project(number_of_pays, hourly_rate_for_partner, daily_rate_for_partner, weekly_rate_for_partner, mo_rate_for_partner, currency, false, true);
		//Expect that dialog is closed:
		browser.sleep(10000);
		//check that there is now only one available action: to create a test project:
		comact.expand_fn(0);
		expect(findMembers.create_test_pro_btn.isDisplayed()).toBeTruthy();
		//other btns are not in the dom:
		expect(findMembers.assign_btn.isPresent()).toBeFalsy();
		expect(findMembers.invite_btn.isPresent()).toBeFalsy();
		expect(findMembers.decline_btn.isPresent()).toBeFalsy();

		findact.back_to_pr_fn();
		browser.sleep(1000);
		//check that the project has status assigned
		projact.filter_projects_fn(full_project_id, null, true);
		browser.sleep(2000);
		comact.get_table_element(3, 0).getText().then(function (text) {
			console.log('expected project status: ' + text);
			expect(text).toEqual('Assigned');
		});
		//check total project sum:
		comact.get_table_element(6, 0).getText().then(function (text) {
			var newText = text.substring(text.indexOf(currency) + 3, text.length);
			console.log('expected project sum: ' + newText);
			expect(Number(newText.replace(/,/g, ''))).toEqual(3 * hourly_rate_for_partner);
		});
		//check available actions
		comact.expand_fn(0);
		expect(project.btn_complete_proj.isDisplayed()).toBeTruthy();
		expect(project.btn_terminate_proj.isDisplayed()).toBeTruthy();
		expect(project.btn_copy_proj.isDisplayed()).toBeTruthy();
		expect(project.btn_edit_proj.isPresent()).toBeFalsy();
		expect(project.btn_close_proj.isPresent()).toBeFalsy();

		loginact.log_out();

	});
	it('As another member I check, that project is no more visible', function () {
		//login as another member:
		loginact.click_login(true);
		loginact.log_in(cred.part_vat_uk_email, cred.pswd);
		dashact.view_proj();
		projact.apply_pr_fn();
		projact.filter_projects_fn(full_project_id, null, true);
		browser.sleep(1000);
		projact.get_project_number().then(function (text) {
			var proj_nb = text.toString().substring((text.toString().indexOf('of') + 3), text.toString().indexOf('entries') - 1);
			console.log('number of projects: ' + proj_nb);
			expect(Number(proj_nb)).toEqual(0);
		});
		loginact.log_out();
	});
	it('As a member I check, that project is visible in my projects and has status assigned', function () {
		loginact.click_login(true);
		loginact.log_in(cred.member_vat_uk_email, cred.pswd);
		dashact.view_proj();
		projact.view_my_proj();
		projact.filter_projects_fn(full_project_id, null, false);
		browser.sleep(2000);
		projact.get_project_number().then(function (text) {
			var proj_nb = text.toString().substring((text.toString().indexOf('of') + 3), text.toString().indexOf('entries') - 1);
			console.log('number of projects: ' + proj_nb);
			expect(Number(proj_nb)).toEqual(1);
		});
		comact.expand_fn(0);
		browser.sleep(2000);
		comact.get_table_row(2, 0).then(function (text) {
			console.log(text);
			expect(text).toContain(status.assigned);
			//noinspection JSUnresolvedVariable
			var proj_sum = text.substring(text.indexOf('due') + 5, text.length);
			console.log(proj_sum);
			expect(proj_sum).toEqual(Number(proj_duration * param.hourly_rate).toFixed(2) + ' ' + currency);
		});
		loginact.log_out();
	});
	it('As a member I request first payment for the project', function () {
		loginact.click_login(true);
		loginact.log_in(cred.member_vat_uk_email, cred.pswd);
		dashact.view_payments();
		payact.user_requests_payment(full_project_id, proj_duration * param.hourly_rate / number_of_pays * 1.2, currency, true);
		helper.alert_success_fn(0, mes.thanks_msg);
		com_elem.t_body.getInnerHtml().then(function (text) {
			console.log('inner text' + text);
			expect(text).toContain('display: none;');
		});
		//try to request next payment:
		payact.get_payment_title();
		loginact.log_out();
	});
	it('As a partner I approve payment for the project', function () {
		loginact.click_login(false);
		loginact.log_in(cred.part_vat_uk_email, cred.pswd);
		dashact.view_payments();
		payact.partner_approves_requested_pay(full_project_id, currency, hourly_rate_for_partner * proj_duration / number_of_pays);
		//check, that element is not visible any more
		helper.alert_success_fn(0, mes.thanks_msg);
		com_elem.t_body.getInnerHtml().then(function (text) {
			console.log('inner text' + text);
			expect(text).toContain('display: none;');
		});
		loginact.log_out();
	});
	it('Log in as admin and upload invoices', function () {
		var adminURL = browser.baseUrl + '/admin';
		browser.get(adminURL);
		loginact.log_in(browser.params.admin.login, browser.params.admin.pswd);
		browser.executeScript(helper.scrollIntoView, admin.upload_invoice_btn);
		adminact.upload_inv();
		helper.alert_success_fn(0, mes.invoice_upload);
		adminact.log_out();
	});
	it('Log in as a member and check invoice', function () {
		browser.get(browser.baseUrl);
		loginact.click_login(true);
		loginact.log_in(cred.member_vat_uk_email, cred.pswd);
		dashact.invoice_view();
		invoiceact.search_invoice(pr_id);
		//check sum:
		comact.get_table_element(4, 0).then(function (text) {
			console.log('sum info: ' + text);
			var pr_sum = (param.hourly_rate * proj_duration / number_of_pays).toFixed(2) + ' ' + currency;
			expect(pr_sum).toEqual(text);
		});
		//get invoice info, send to log:
		comact.get_table_element(1, 0).then(function (text) {
			console.log('invoice id for check in xero: ' + text);
			invoice_member = text;
		});
		loginact.log_out();
	});
	it('Log in as a partner and check invoice sum', function () {
		loginact.click_login(false);
		loginact.log_in(cred.part_vat_uk_email, cred.pswd);
		dashact.invoice_view();
		invoiceact.search_invoice(pr_id);
		//check sum:
		comact.get_table_element(4, 0).then(function (text) {
			console.log('sum info: ' + text);
			var pr_sum = (hourly_rate_for_partner * proj_duration / number_of_pays).toFixed(2) + ' ' + currency;
			expect(pr_sum).toEqual(text);
		});
		//get payment info, send to log:
		comact.get_table_element(5, 0).then(function (text) {
			console.log('stripe payment id for check: ' + text);
		});

		//get invoice info, send to log:
		comact.get_table_element(1, 0).then(function (text) {
			console.log('invoice id for check in xero: ' + text);
			invoice_partner = text;
		});
		loginact.log_out();
	});
	it('Log in in xero and check partner invoice', function () {
		browser.get(browser.params.xero.url);
		xero.log_in(cred.xero_email, cred.pswd);
		xero.find_partner_invoices(invoice_partner);
		browser.sleep(2000);
		xero.get_table_cell(7, 1).then(function (text) {
			console.log('vat info: ' + text);
			expect(text).toEqual('20% (VAT on Income)');
		});
		xero.get_table_cell(8, 1).then(function (text) {
			console.log('currency info: ' + text);
			expect(Number(text).toFixed(2)).toEqual((hourly_rate_for_partner * proj_duration / number_of_pays).toFixed(2));
		});
	});
	it('Check member invoice in xero', function () {
		xero.find_member_invoices(invoice_member);
		xero.get_table_cell(6, 1).then(function (text) {
			console.log('vat info: ' + text);
			expect(text).toEqual('EC Acquisitions (20%)');
		});
		xero.get_table_cell(7, 1).then(function (text) {
			console.log('total amount: ' + text);
			expect(Number(text).toFixed(2)).toEqual(Number(param.hourly_rate * proj_duration / Number(number_of_pays)).toFixed(2));
		});
		xero.log_out();
	});
});