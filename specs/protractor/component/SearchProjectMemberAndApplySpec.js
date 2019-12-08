var Project = require('../../src/pages/ProjectPage.js');
var Helper = require('../../src/helper.js');
var Credentials = require('../../src/credentials.js');
var Message = require('../../src/messages.js');
var Skills = require('../../src/pages/SkillsPage.js');
var HomePage = require('../../src/pages/HomePage.js');
var ProjectActions = require('../../src/actions/ProjectActions.js');
var ProfileActions = require('../../src/actions/ProfileActions.js');
var SkillsActions = require('../../src/actions/SkillsActions.js');
var LoginActions = require('../../src/actions/LoginActions.js');
var DashboardActions = require('../../src/actions/DashboardActions.js');
var SocialProfileActions = require('../../src/actions/SocialProfileActions.js');
var CommonElementsPage = require('../../src/pages/CommonElementsPage.js');

var rare_skill = ['Press releases'];
var wid_skill = ['4D'];

describe('search active projects', function () {
	var project = new Project();
	var helper = new Helper();
	var skills = new Skills();
	var dashact = new DashboardActions();
	var profact = new ProfileActions();
	var skillact = new SkillsActions();
	var projact = new ProjectActions();
	var logact = new LoginActions();
	var mes = new Message();
	var cred = new Credentials();
	var com_ele = new CommonElementsPage();
	var socact = new SocialProfileActions();

	var proj_skills, user_skills;

	function app(currentCount, totalCount) {

		if (currentCount < totalCount) {
			browser.sleep(2000);
			console.log('current index: ' + currentCount);
			project.expand.get(currentCount).isPresent().then(function (isDisplayed) {
				if (isDisplayed) {
					projact.expand_pr(currentCount);
					projact.apply_lnk_fn(0);

					com_ele.alert_msg.get(0).isPresent().then(function (isDisplayed) {
						if (!isDisplayed) {
							helper.alert_success_fn(0, mes.suc_applic_proj);
							currentCount = totalCount;
							return;
						}
						else {
							helper.alert_danger_msg_fn(0, mes.have_invited);
							if (currentCount == 9) {
								currentCount = 0;
								helper.one_page_ahead();
							}
							else {
								currentCount++;
							}
							app(currentCount, totalCount);
						}
					});
				}
				else {
					console.log('all projects are applied');
				}
			});

		}
	}

	function set_skills_and_search() {
		skillact.get_skills_text().then(function (text) {
			console.log('user skills: ' + text.substring((text.indexOf('Skills') + 7), text.indexOf('Edit') - 1));
			user_skills = text.substring((text.indexOf('Skills') + 7), text.indexOf('Edit') - 1);
		});
		//search for the projects:
		dashact.view_proj();
		projact.apply_pr_fn();
		projact.filter_projects_fn(null, wid_skill, true);
	}

	// Open tranformify
	beforeAll(function (done) {
		browser.ignoreSynchronization = true;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 1200000;
		browser.get(browser.baseUrl);
		logact.click_login(true);
		logact.log_in(cred.member_vat_uk_email, cred.pswd);
		done();
	});

	it('Search for projects', function () {
		dashact.view_proj();
		//choose one skill:
		projact.filter_projects_fn(null, rare_skill, true);
		//expect no projects can be found
		browser.sleep(1000);
		projact.get_project_number().then(function (text) {
			var proj_nb = text.toString().substring((text.toString().indexOf('of') + 3), text.toString().indexOf('entries') - 1);
			console.log('number of projects: ' + proj_nb);
			expect(Number(proj_nb)).toEqual(0);
		});
	});

	it('Applies for the project with non-set skills', function () {
		//check member skills:
		dashact.view_prof();
		profact.view_skills();
		skillact.remove_skills_fn();
		set_skills_and_search();
		project.expand.get(0).isPresent().then(function (result) {
			if(result){
				projact.expand_pr(0);
				projact.get_proj_details(2).then(function (text) {
					proj_skills = text.substring((text.indexOf('Skills') + 7), text.indexOf('Groups') - 1);
					console.log('Project skills details for index: ' + proj_skills);
				});
				projact.apply_lnk_fn(0);
				helper.alert_danger_msg_fn(0, mes.impossible_act);
			}
		});

	});

	it('Applies for the project with valid skill', function () {
		//check member skills:
		dashact.view_prof();
		profact.view_skills();
		browser.sleep(3000);
		skillact.add_skills_fn(wid_skill);
		set_skills_and_search();
		app(0, 10);
	});
	it('Applies for the project with set but non-valid skill', function () {
		//check member skills:
		dashact.view_prof();
		profact.view_skills();
		skillact.remove_skills_fn();
		skillact.add_skills_fn(rare_skill);
		set_skills_and_search();
		project.expand.get(0).isPresent().then(function (result) {
			if(result){
				projact.expand_pr(0);
				projact.get_proj_details(2).then(function (text) {
					proj_skills = text.substring((text.indexOf('Skills') + 7), text.indexOf('Groups') - 1);
					console.log('Project skills details for index: ' + proj_skills);
				});
				projact.apply_lnk_fn(0);
				helper.alert_danger_msg_fn(0, mes.impos_apply);
			}
		});
	});
	it('The member checks that share btns are visible for each project', function () {
		projact.reset_filter();
		projact.expand_pr(0);
		browser.sleep(2000);
		socact.check_share_btns();
		projact.expand_pr(0);
		projact.expand_pr(3);
		browser.sleep(2000);
		socact.check_share_btns();
		//check on the next page:
		helper.one_page_ahead();
		projact.expand_pr(0);
		browser.sleep(2000);
		socact.check_share_btns();
		logact.log_out();
	});
});