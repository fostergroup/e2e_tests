/*
 * The member non vat uk registered:
  * Partner non vat uk registered:
  * Partner creates private project
  * Partner sets up bank transfer payment, payment is approved
  *
*/
var Helper = require('../../src/helper.js');
var Message = require('../../src/messages.js');
var LoginPage = require('../../src/pages/LoginPage.js');
var HomePage = require('../../src/pages/HomePage.js');
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
var path = require('path');

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
	var langact = new LanguagesActions();
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
	var vat_number, member_invoice_address, partner_invoice_address;

	// Open tranformify
	beforeAll(function() {
		browser.ignoreSynchronization = true;
		browser.get(browser.baseUrl);
	});

	it('Log in as a member and check invoice details', function() {
		loginact.click_login(true);
		loginact.log_in(cred.member_non_vat_uk_email, cred.pswd);
		dashact.invoice_view();
		invoiceact.invoice_det_fn();
		//check, that details are as expected:
        comact.get_table_element(9, 0).getText().then(function(text) {
            console.log('get vat number: ' + text);
            expect(text).toBeEmptyString();
        });
        comact.get_table_element(5, 0).getText().then(function(text) {
            console.log('get country: ' + text);
            expect(text.toLowerCase()).toEqual('uk');
        });
        //set up any string to address:
        invoiceact.edit_invoice_det(null, null, null, null, null,
            helper.random_string(), null, null, null, null, 1, 123);
        helper.alert_success_fn(0, mes.invoice_succ_updated);
        comact.get_table_element(4, 0).getText().then(function(text) {
            console.log('get address: ' + text);
            member_invoice_address = text;
        });
	});

	it('Log in as a member and sets skills and rate', function() {
		dashact.view_prof();
		profact.view_skills();

		//remove skills if they were:
		skillact.remove_skills_fn();
		//add new skills:
		skillact.add_skills_fn(project_skill);
	});

	it('Log in as a member and sets language and its level', function () {
		profact.lang_fn();
		//remove languages if they were:
		langact.delete_lang_fn();
		//add new language:
		comact.fill_drop_input('Arab', 0);
		comact.fill_drop_input('Flue', 1);
		comact.submit_fn();
		browser.sleep(2000);
		helper.alert_success_fn(0, mes.lang_saved);
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
	it('Log in as a partner and create a new project with skills', function() {
		loginact.click_login(false);
		loginact.log_in(cred.part_non_vat_uk_email, cred.pswd);
		projact.active_pr_fn();
		//wait that all project info is loaded
		browser.sleep(2000);
		var primary_proj_nb;
		//get the number of projects before posting a new one
        projact.get_project_number().then(function(text) {
			primary_proj_nb = text.substring((text.indexOf('of') + 3), text.indexOf('entries'));
			console.log('primary project nb: ' + primary_proj_nb);
		});

		projact.post_proj_fn();
        projact.post_project_fn('Project_1', 'Project description', project_skill, 2, 'hour', proj_duration, helper.getDate(+3), helper.getDate(+13), true, null, null, null, 0);
		browser.wait(EC.urlContains('projects/active'), 5000, 'url is not as expected');
		browser.sleep(1000);
		var new_proj_nb;
        projact.get_project_number().then(function(text) {
			new_proj_nb = text.substring((text.indexOf('of') + 3), text.indexOf('entries'));
			console.log('increased project nb: ' + new_proj_nb);
		}).then(function() {
			expect(Number(new_proj_nb)).toEqual(Number(primary_proj_nb) + 1);
		});

		//get project id of newly posted project: sort desc project and get first element
		projact.sort_proj_desc();
		browser.sleep(2000);
		project.project_id.getText().then(function(text) {
            full_project_id = text.substring((text.indexOf('[') + 1), text.indexOf(']'));
			console.log('this is full project_id without brackets' + full_project_id);
			pr_id = text.substring((text.indexOf('-') + 1), text.indexOf(']'));
			console.log('Id of the project: ' + pr_id);
		});
	});
    it('A partner sets profile payment to bank transfer', function() {
        dashact.view_payments();
        //check that url is proper
        browser.wait(EC.urlContains('payments/requested'), 5000, 'url is not as expected');
        //click on payment account
        payact.view_pay_account();
		payact.set_banktransfer(true, 0);
    });
    it('Partner and sets invoice details as non vat uk registered', function() {
        dashact.view_dash();
        dashact.invoice_view();
        invoiceact.invoice_det_fn();
		comact.get_table_element(5, 0).getText().then(function(text) {
			console.log('get country: ' + text);
			expect(text.toLowerCase()).toEqual('uk');
		});
        comact.get_table_element(9, 0).getText().then(function(text) {
            console.log('get vat number: ' + text);
            vat_number = text;
            expect(text).toBeEmptyString();
        });
        //set up any string to address:
        invoiceact.edit_invoice_det(null, null, null, null, null,
            helper.random_string(), null, null, null, null, 1, 123);
        helper.alert_success_fn(0, mes.invoice_succ_updated);
        comact.get_table_element(4, 0).getText().then(function(text) {
            console.log('get partner invoice address: ' + text);
            partner_invoice_address = text;
        });
        loginact.log_out();
    });
	it('Log in as admin and approve bank transfer', function() {
		var adminURL = browser.baseUrl + '/admin';
		browser.get(adminURL);
		loginact.log_in(browser.params.admin.login, browser.params.admin.pswd);
		adminact.bank_transfer();
		adminact.apply_filter(null, cred.part_non_vat_uk_id, null, null);
		adminact.bank_tr_approve(true, cred.part_non_vat_uk_id, false, 2);
		adminact.log_out();
	});

    it('As a member checks, that the project is not visible in projects list (as it is private one)', function() {
		browser.get(browser.baseUrl);
        loginact.click_login(true);
        loginact.log_in(cred.member_non_vat_uk_email, cred.pswd);
        dashact.view_proj();
        projact.apply_pr_fn();
		projact.filter_projects_fn(full_project_id, null, false);
		//wait the form is loaded
		browser.sleep(1000);
		projact.get_project_number().then(function (text) {
			var proj_nb = text.toString().substring((text.toString().indexOf('of') + 3), text.toString().indexOf('entries') - 1);
			console.log('number of projects: ' + proj_nb);
			expect(Number(proj_nb)).toEqual(0);
		});
		loginact.log_out();
    });
	it('As a partner I find available members to the project', function() {
        loginact.click_login(false);
        loginact.log_in(cred.part_non_vat_uk_email, cred.pswd);
        dashact.view_proj();
        //check url is right
        browser.wait(EC.urlContains('projects/active'), 5000, 'url is not as expected');

        //add project sort
		projact.filter_projects_fn(full_project_id, null, false);
		browser.sleep(1000);
		comact.expand_fn(0);
		//check available actions:
		expect(project.btn_complete_proj.isPresent()).toBeFalsy();
		expect(project.btn_terminate_proj.isPresent()).toBeFalsy();
		expect(project.btn_copy_proj.isDisplayed()).toBeTruthy();
		expect(project.btn_edit_proj.isDisplayed()).toBeTruthy();
		expect(project.btn_close_proj.isDisplayed()).toBeTruthy();

		//check that member rates visible to the partner are with transf fee
		projact.find_available_members(0, cred.with_proj_member_vat_non_uk_id, 1);
		browser.sleep(1000);
		//check the number of skills for the project and visible rates:
		
		//get hours rate info:
		comact.get_table_element(4, 0).getText().then(function(text) {
			console.log('hours rate: ' + text);
			expect(Number(text.replace(/,/g, ''))).toEqual(hourly_rate_for_partner);
		});
		//get daily rate info:
		comact.get_table_element(5, 0).getText().then(function(text) {
			console.log('daily rate: ' + text);
			expect(Number(text.replace(/,/g, ''))).toEqual(daily_rate_for_partner);
		});
		//get weekly rate info:
		comact.get_table_element(6, 0).getText().then(function(text) {
			console.log('weekly rate: ' + text);
			expect(Number(text.replace(/,/g, ''))).toEqual(weekly_rate_for_partner);
		});

		//get monthly rate info:
		comact.get_table_element(7, 0).getText().then(function(text) {
			console.log('monthly rate: ' + text.replace(/,/g, ''));
			expect(Number(text.replace(/,/g, ''))).toEqual(mo_rate_for_partner);
		});
		//get currency info:
		comact.get_table_element(8, 0).getText().then(function(text) {
			console.log('currency: ' + text);
			expect(text).toEqual(currency);
		});
		//get skills number info:
		comact.get_table_element(9, 0).getText().then(function(text) {
			console.log('currency: ' + text);
			expect(Number(text)).toEqual(2);
		});
	});
	it('As a partner I assign the project and set one off payment', function() {
		comact.expand_fn(0);
		//check available actions:
		expect(findMembers.assign_btn.isDisplayed()).toBeTruthy();
		expect(findMembers.invite_btn.isDisplayed()).toBeTruthy();
		projact.partner_assigns_project(1, hourly_rate_for_partner, daily_rate_for_partner, weekly_rate_for_partner, mo_rate_for_partner, currency, false, true);
		
		//Expect that dialog is closed:
        browser.sleep(10000);
		findact.back_to_pr_fn();
		browser.sleep(1000);
		projact.filter_projects_fn(full_project_id, null, false);
		browser.sleep(2000);
		comact.get_table_element(3, 0).getText().then(function(text) {
			console.log('expected project status: ' + text);
			expect(text).toEqual(status.assigned);
		});
		//check total project sum:
		comact.get_table_element(6, 0).getText().then(function(text) {
			var newText = text.substring(text.indexOf(currency) + 3, text.length);
			console.log('expected project sum: ' + newText);
			expect(Number(newText.replace(/,/g, ''))).toEqual(proj_duration * hourly_rate_for_partner);
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
    it('As a member I view that the project is visible in my project list', function() {
        loginact.click_login(true);
        loginact.log_in(cred.member_vat_non_uk_email, cred.pswd);
        dashact.view_proj();
        projact.view_my_proj();

        //check that link my projects is active:
        projact.filter_projects_fn(full_project_id, null, false);
        browser.sleep(1000);
		projact.get_project_number().then(function (text) {
			var proj_nb = text.toString().substring((text.toString().indexOf('of') + 3), text.toString().indexOf('entries') - 1);
			console.log('number of projects: ' + proj_nb);
			expect(Number(proj_nb)).toEqual(1);
		});
    });
	it('As a member I request payment for the project', function() {
        dashact.view_payments();
        browser.wait(EC.urlContains('payments/request'), 5000, 'url is not as expected');
        comact.check_active_lnk('/member/payments/request');
		payact.user_requests_payment(full_project_id, proj_duration * param.hourly_rate, currency, false);
		helper.alert_success_fn(0, 'Thank you for working with Transformify');
		com_elem.t_body.getInnerHtml().then(function(text) {
			console.log('inner text' + text);
			expect(text).toContain('display: none;');
		});

		loginact.log_out();
	});
	it('As a partner I approve payment for the project', function() {
		loginact.click_login(false);
		loginact.log_in(cred.part_non_vat_uk_email, cred.pswd);
		dashact.view_payments();
		payact.partner_approves_requested_pay(full_project_id, currency, hourly_rate_for_partner*proj_duration);
		//check, that element is not visible any more
		helper.alert_success_fn(0, mes.thanks_msg);
		com_elem.t_body.getInnerHtml().then(function(text) {
			console.log('inner text' + text);
			expect(text).toContain('display: none;');
		});
	});
	it('As a partner I check payment statuses', function() {
		payact.view_proc_payments();
		comact.check_active_lnk('/partner/payments/processed');
		payact.user_view_proc_pay(full_project_id, currency, hourly_rate_for_partner * proj_duration, cred.with_proj_member_vat_non_uk_id, status.await_pay, status.await_pay, false);
		loginact.log_out();
	});
	it('Log in as admin and upload invoices', function() {
		var adminURL = browser.baseUrl + '/admin';
		browser.get(adminURL);
		loginact.log_in(browser.params.admin.login, browser.params.admin.pswd);
		browser.executeScript(helper.scrollIntoView, admin.upload_invoice_btn);
		adminact.upload_inv();
		helper.alert_success_fn(0, mes.invoice_upload);
		adminact.log_out();
	});
	it('Log in as a member and check invoice', function() {
		browser.get(browser.baseUrl);
		loginact.click_login(true);
		loginact.log_in(cred.member_vat_non_uk_email, cred.pswd);
		dashact.view_dash();
		dashact.invoice_view();
		invoiceact.search_invoice(full_project_id);
		//check sum:
		comact.get_table_element(4, 0).then(function(text){
			console.log('sum info: '+ text);
			var pr_sum = (param.hourly_rate*proj_duration).toFixed(2) + ' ' + currency;
			expect(pr_sum).toEqual(text);
		});
		//get invoice info, send to log:
		comact.get_table_element(1, 0).then(function(text){
			console.log('invoice id for check in xero: '+ text);
			invoice_member = text;
		});
		loginact.log_out();
	});
	it('Log in as a partner and check invoice sum', function() {
		loginact.click_login(false);
		loginact.log_in(cred.part_non_vat_uk_email, cred.pswd);
		dashact.invoice_view();
		invoiceact.search_invoice(full_project_id);
		//check sum:
		comact.get_table_element(4, 0).then(function(text){
			console.log('sum info: '+ text);
			var pr_sum = (hourly_rate_for_partner*proj_duration).toFixed(2) + ' ' + currency;
			expect(pr_sum).toEqual(text);
		});
		//get payment info, send to log:
		comact.get_table_element(5, 0).then(function(text){
			console.log('stripe payment id for check: '+ text);
		});

		//get invoice info, send to log:
		comact.get_table_element(1, 0).then(function(text){
			console.log('invoice id for check in xero: '+ text);
			invoice_partner = text;
		});
		loginact.log_out();
	});
	it('Xero upload bank statement', function() {
		browser.get(browser.params.xero.url);
		xero.log_in(cred.xero_email, cred.pswd);
		/*xero.set_bank_statement(browser.params.path_to_bank_csv);
		xero.reconsile(invoice_partner);
		browser.sleep(2000);
		xero.confirm();*/
		xero.set_bank_statement(browser.params.path_to_member_bank_csv);
		xero.reconsile(invoice_member);
		browser.sleep(2000);
		xero.confirm();
		browser.sleep(5000);
		xero.log_out();
	});
	it('Log in as admin and reconsile ', function() {
		var adminURL = browser.baseUrl + '/admin';
		browser.get(adminURL);
		loginact.log_in(browser.params.admin.login, browser.params.admin.pswd);
		adminact.update_invoices();
		helper.alert_success_fn(0, mes.update_inv_succ);
		adminact.stripe_recon();
		browser.sleep(2000);
		adminact.log_out();
	});
	it('As a partner I approve payment for the project', function() {
		browser.get(browser.baseUrl);
		loginact.click_login(false);
		loginact.log_in(cred.part_non_vat_uk_email, cred.pswd);
		dashact.view_payments();
		payact.view_proc_payments();
		payact.user_view_proc_pay(full_project_id, currency, hourly_rate_for_partner * proj_duration, cred.with_proj_member_vat_non_uk_id, status.await_pay, status.paid, false);
		loginact.log_out();
	});
});