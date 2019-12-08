/*
 * Affiliate full spec check
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
var AffiliateActions = require('../../src/actions/AffiliateActions.js');
var MailinatorActions = require('../../src/actions/mailinator/MailinatorActions.js');

var EC = protractor.ExpectedConditions;

describe('Full cycle project test', function() {
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
	var affact = new AffiliateActions();
	var mailinact = new MailinatorActions();
    var param = new Param();
    var xero = new Xero();
    var status = new Statuses();

	var full_project_id,
		pr_id, invoice_partner, invoice_member;
	var project_skill = [ 'AJAX', 'Pentaho' ];
	var currency = 'USD';
	var hourly_rate_for_partner = param.hourly_rate * 1.05;
	var daily_rate_for_partner = param.daily_rate * 1.05;
	var weekly_rate_for_partner = param.weekly_rate * 1.05;
	var mo_rate_for_partner = param.mo_rate * 1.05;
	var proj_duration = 3;
	var adminURL = browser.baseUrl + '/admin';
	var vat_number, member_invoice_address, partner_invoice_address, aff_email, part_comp_name, part_primary_proj_nb;

	// Open tranformify
	beforeAll(function() {
		browser.ignoreSynchronization = true;
		browser.get(browser.baseUrl + '/affiliate/registration');
	});
	it('Register new affiliate without data', function() {
		comact.submit_fn();
		for(i=0;i<3; i++){
			helper.alert_group_danger_fn(i, mes.should_not_blank);
		}
	});
	it('Register with invalid ophone', function() {
		affact.fill_aff_form(helper.random_string(), helper.randomEmail(), helper.random_string(), 'mail.com');
		affact.get_email().then(function (text) {
			console.log('this is affiliate email: ' + text);
			aff_email = text;
		});
		comact.submit_fn();
		helper.alert_group_danger_fn(0, mes.non_valid_value);
	});
	it('Register with all valid fields', function() {
		affact.fill_aff_form(null, null, '', null);
		comact.submit_fn();
		helper.alert_success_fn(0, mes.aff_success_reg);
	});

	it('Approve affiliate as admin', function() {
		browser.get(adminURL);
		loginact.log_in(browser.params.admin.login, browser.params.admin.pswd);
		adminact.click_aff_lnk();
		adminact.view_affil_users();
		adminact.sort(true);
		adminact.edit_aff();
		adminact.update_aff_user(1, 0, 1, 2, 0);
		adminact.save_without_close();
		helper.alert_success_fn(0, mes.succ_update);
		adminact.update_aff_user(3, null, null, null, null);
		helper.alert_success_fn(0, mes.succ_update);
		adminact.save_without_close();
		adminact.log_out();
	});

	it('Log in as a member and sets skills and rate', function() {
		browser.get(browser.baseUrl);
		loginact.click_login(true);
		loginact.log_in(cred.member_vat_non_uk_email, cred.pswd);
		dashact.view_prof();
		profact.view_skills();

		//remove skills if they were:
		skillact.remove_skills_fn();
		//add new skills:
		skillact.add_skills_fn(project_skill);
	});

	it('A member and sets pay rate', function() {
		var user_rates = [];
		profact.pay_rate_fn();
		payratesact.edit_rates();
		payratesact.set_pay_rate(currency, param.hourly_rate, param.daily_rate, param.weekly_rate, param.mo_rate);
		payRatesPage.rates.each(function(item) {
			item.getInnerHtml().then(function(text) {
				console.log('User rate: ' + text);
				user_rates.push(text);
			});
		}).then(function() {
			console.log('user rates all: ' + user_rates);
			expect(Number(user_rates[0].substring(0, user_rates[0].indexOf(currency)))).toEqual(param.hourly_rate);
			expect(Number(user_rates[1].substring(0, user_rates[1].indexOf(currency)))).toEqual(param.daily_rate);
			expect(Number(user_rates[2].substring(0, user_rates[2].indexOf(currency)))).toEqual(param.weekly_rate);
			expect(Number(user_rates[3].substring(0, user_rates[3].indexOf(currency)))).toEqual(param.mo_rate);

		});
		loginact.log_out();
	});
	it('Go to mailinator and follow the link', function() {
		browser.get('https://mailinator.com');
		mailinact.check_inbox(aff_email);
		mailinact.follow_lnk();
	});
	it('Create an affiliate partner', function() {
		loginact.fill_profile_fn(helper.random_string(),  helper.random_string(), helper.randomEmail(), cred.pswd, cred.pswd,
			param.seq_q, helper.random_string(), helper.random_string(), helper.random_string(), param.base_url, helper.random_string());
		loginact.get_comp_name().then(function (value) {
			part_comp_name = value;
			console.log('this is partner company name: ' + part_comp_name);
		});
		loginact.to_agree(true);
		loginact.submit_form();
		loginact.partner_welcome_fn();
	});
	it('Admin approves the partner', function() {
		browser.get(adminURL);
		loginact.log_in(browser.params.admin.login, browser.params.admin.pswd);
		adminact.view_reg_users();
		adminact.view_partners();
		adminact.apply_filter(null, null, part_comp_name, null);
		adminact.part_activate(part_comp_name, true);
		adminact.save_and_close();
		adminact.apply_filter(null, null, part_comp_name, null);
		adminact.change_type(2, true);
		adminact.approve_fn();
		helper.alert_success_fn(0, mes.succ_approved);
	});
	it('Admin checks hits and registrations', function() {
		adminact.click_aff_lnk();
		adminact.view_affil_users();
		adminact.sort(true);
		adminact.show_aff();
		adminact.view_analytics();
		adminact.get_table_info(1).then(function (text) {
			console.log('this is table info: ' + text);
			var hits  = text.substring(text.indexOf('Hits') + 4, text.indexOf('Registration'));
			expect(Number(hits)).toEqual(1);
			var reg = text.substring(text.indexOf('Registration') + 13, text.indexOf('Successfull'));
			expect(Number(reg)).toEqual(1);
		});
	});
	it('Log in as a member and check invoice details', function () {
		browser.get(browser.baseUrl);
		loginact.click_login(true);
		loginact.log_in(cred.member_vat_non_uk_email, cred.pswd);
		dashact.invoice_view();
		invoiceact.invoice_det_fn();
		//check, that details are as expected:
		comact.get_table_element(9, 0).getText().then(function (text) {
			console.log('get vat number: ' + text);
			expect(text.length).not.toEqual(0);
		});
		comact.get_table_element(5, 0).getText().then(function (text) {
			console.log('get country: ' + text);
			expect(text.toLowerCase()).not.toEqual('uk');
		});
		//set up any string to address:
		invoiceact.edit_invoice_det(null, null, null, null, null,
			helper.random_string(), null, null, null, null, 0, 123);
		helper.alert_success_fn(0, mes.invoice_succ_updated);
		comact.get_table_element(4, 0).getText().then(function (text) {
			console.log('get address: ' + text);
			member_invoice_address = text;
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
	it('Log in as a partner and create a new project with skills', function () {
		loginact.click_login(false);
		loginact.log_in(cred.affiliate_email, cred.pswd);
		projact.active_pr_fn();
		//wait that all project info is loaded
		browser.sleep(2000);

		//get the number of projects before posting a new one
		projact.get_project_number().then(function (text) {
			part_primary_proj_nb = text.substring((text.indexOf('of') + 3), text.indexOf('entries'));
			console.log('primary project nb: ' + part_primary_proj_nb);
		});
		projact.post_proj_fn();
		projact.post_project_fn('Project_1', 'Project description', project_skill, 2, 'hour', proj_duration, helper.getDate(+3), helper.getDate(+13), false, null, null, null, 0);
		browser.wait(EC.urlContains('projects/active'), 5000, 'url is not as expected');
		//get project id of newly posted project: sort desc project and get first element
		projact.sort_proj_desc();
		browser.sleep(2000);
		//get the number of projects after posting a new one
		projact.get_project_number().then(function (text) {
			var part_changed_proj_nb = text.substring((text.indexOf('of') + 3), text.indexOf('entries'));
			console.log('changed project nb: ' + part_changed_proj_nb);
			expect(Number(part_changed_proj_nb)).toEqual(Number(part_primary_proj_nb) + 1);
		});
		project.project_id.getText().then(function (text) {
			full_project_id = text.substring((text.indexOf('[') + 1), text.indexOf(']'));
			console.log('this is full project_id without brackets' + full_project_id);
			pr_id = text.substring((text.indexOf('-') + 1), text.indexOf(']'));
			console.log('Id of the project: ' + pr_id);
		});
	});
	it('A partner sets profile payment to valid credit card', function () {
		dashact.view_payments();
		//check that url is proper
		browser.wait(EC.urlContains('payments/requested'), 5000, 'url is not as expected');
		//click on payment account
		payact.view_pay_account();
		payact.get_cards_nb().then(function (count) {
			if (count == 0) {
				comact.fill_drop_input('stripe', 0);
				payact.add_pay_account();
				payact.fill_card_det(param.valid_card, 12, 20, 231);
				browser.wait(EC.visibilityOf(com_elem.alert_success_msg.get(0)), 10000, 'success mes is not visible');
				helper.alert_success_fn(0, mes.credit_card_added);
				expect(pay.card.get(0).isDisplayed()).toBeTruthy();
			}
		});

	});
	it('Log in as a partner and set invoice details as non uk vat registered', function () {
		dashact.view_dash();
		dashact.invoice_view();
		invoiceact.invoice_det_fn();
		comact.get_table_element(5, 0).getText().then(function (text) {
			console.log('get country: ' + text);
			expect(text.toLowerCase()).not.toEqual('uk');
		});
		comact.get_table_element(9, 0).getText().then(function (text) {
			console.log('get vat number: ' + text);
			vat_number = text;
		});
		//set up any string to address:
		invoiceact.edit_invoice_det(null, null, null, null, null,
			helper.random_string(), null, null, null, null, 0, 123);
		helper.alert_success_fn(0, mes.invoice_succ_updated);
		comact.get_table_element(4, 0).getText().then(function (text) {
			console.log('get partner invoice address: ' + text);
			partner_invoice_address = text;
		});
		loginact.log_out();
	});
	it('As another member checks, that the project is visible in projects list (apply link)', function () {
		loginact.click_login(true);
		loginact.log_in(cred.part_vat_uk_email, cred.pswd);
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

		comact.get_table_element(1, 0).then(function (text) {
			expect(text).toContain(full_project_id);
		});
		loginact.log_out();
	});
	it('As a partner I find available members to invite him to an interview', function () {
		loginact.click_login(false);
		loginact.log_in(cred.affiliate_email, cred.pswd);
		dashact.view_proj();
		//check url is right
		browser.wait(EC.urlContains('projects/active'), 5000, 'url is not as expected');

		//add project sort
		projact.filter_projects_fn(full_project_id, null, true);
		browser.sleep(2000);
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
		// expect(project.copy_shortlist.get(0).isDisplayed()).toBeTruthy();
		//expect(project.shortlist.get(0).isPresent()).toBeFalsy();
		//check that member rates visible to the partner are with transf fee
		projact.find_available_members(0, cred.member_no_vat_non_uk_id, 1);
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
	});
	it('As a partner I invite a member to an interview the project', function () {
		comact.expand_fn(0);
		//check available actions:
		expect(findMembers.assign_btn.isDisplayed()).toBeTruthy();
		expect(findMembers.invite_btn.isDisplayed()).toBeTruthy();
		projact.check_member_det(hourly_rate_for_partner, daily_rate_for_partner, weekly_rate_for_partner, mo_rate_for_partner, currency);
		findact.invite_pr_by_member_id();
		intact.set_interview(helper.getDate(+1) + ', 05:00', 'Minsk', null);
		intact.submit_form();
		browser.sleep(1000);
		helper.alert_success_fn(0, mes.thank_shedul_int);
		browser.sleep(5000);
		findact.back_to_pr_fn();
		browser.sleep(2000);
		comact.expand_fn(0);
		browser.sleep(1000);
	});
	it('As a partner I find available members to the project', function () {
		//check that member rates visible to the partner are with transf fee
		projact.find_available_members(0, cred.with_proj_member_vat_non_uk_id, 1);
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
	it('As a partner I assign the project and set one off payment', function () {
		comact.expand_fn(0);
		//check available actions:
		expect(findMembers.assign_btn.isDisplayed()).toBeTruthy();
		expect(findMembers.invite_btn.isDisplayed()).toBeTruthy();
		projact.partner_assigns_project(1, hourly_rate_for_partner, daily_rate_for_partner, weekly_rate_for_partner, mo_rate_for_partner, currency, true, true);

		//Expect that dialog is closed:
		browser.sleep(10000);
		//check that there is now only one available action: to create a test project:
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
		browser.sleep(1000);
		expect(project.btn_complete_proj.isDisplayed()).toBeTruthy();
		expect(project.btn_terminate_proj.isDisplayed()).toBeTruthy();
		expect(project.btn_copy_proj.isDisplayed()).toBeTruthy();
		expect(project.btn_edit_proj.isPresent()).toBeFalsy();
		expect(project.btn_close_proj.isPresent()).toBeFalsy();
		loginact.log_out();
	});
	it('As invited member I check, that project visible for interview', function () {
		//login as another member:
		loginact.click_login(true);
		loginact.log_in(cred.member_no_vat_non_uk_email, cred.pswd);
		dashact.view_interviews();
		intact.view_interview(full_project_id, status.pending);
		browser.sleep(1000);
		//accept interview:
		comact.expand_fn(0);
		intact.accept_from_int(null);
		browser.sleep(2000);
		intact.search_filt(full_project_id);
		intact.view_interview(full_project_id, status.accepted);
		loginact.log_out();
	});
	it('As another member I check, that project is no more visible', function () {
		//login as another member who is not assigned
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
	it('As a member I view that the project is visible in my project list', function () {
		loginact.click_login(true);
		loginact.log_in(cred.member_vat_non_uk_email, cred.pswd);
		dashact.view_proj();
		projact.view_my_proj();
		browser.wait(EC.urlContains('projects/pending'), 5000, 'url is not as expected');
		//check that link my projects is active:
		comact.check_active_lnk('/member/projects/pending');
		projact.filter_projects_fn(full_project_id, null, false);
		browser.sleep(1000);
		projact.get_project_number().then(function (text) {
			var proj_nb = text.toString().substring((text.toString().indexOf('of') + 3), text.toString().indexOf('entries') - 1);
			console.log('number of projects: ' + proj_nb);
			expect(Number(proj_nb)).toEqual(1);
		});
		comact.expand_fn(0);
		browser.sleep(2000);
		comact.get_table_row(2, 0).then(function (text) {
			expect(text).toContain(status.assigned);
			//noinspection JSUnresolvedVariable
			var proj_sum = text.substring(text.indexOf('due') + 5, text.length);
			console.log(proj_sum);
			expect(proj_sum).toEqual(Number(proj_duration * param.hourly_rate).toFixed(2) + ' ' + currency);
		});
	});
	it('As a member I request payment for the project', function () {
		dashact.view_payments();
		browser.wait(EC.urlContains('payments/request'), 5000, 'url is not as expected');
		comact.check_active_lnk('/member/payments/request');
		payact.user_requests_payment(full_project_id, proj_duration * param.hourly_rate, currency, false);
		helper.alert_success_fn(0, 'Thank you for working with Transformify');
		com_elem.t_body.getInnerHtml().then(function (text) {
			console.log('inner text' + text);
			expect(text).toContain('display: none;');
		});

		loginact.log_out();
	});
	it('As a partner I approve payment for the project', function () {
		loginact.click_login(false);
		loginact.log_in(cred.affiliate_email, cred.pswd);
		dashact.view_payments();
		payact.partner_approves_requested_pay(pr_id, currency, hourly_rate_for_partner * proj_duration);
		//check, that element is not visible any more
		helper.alert_success_fn(0, mes.thanks_msg);
		com_elem.t_body.getInnerHtml().then(function (text) {
			console.log('inner text' + text);
			expect(text).toContain('display: none;');
		});
	});
});