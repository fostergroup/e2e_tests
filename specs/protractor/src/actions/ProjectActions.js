var Helper = require('../helper.js');
var helper = new Helper();

var Message = require('../messages.js');
var message = new Message();

var ProjectPage = require('../pages/ProjectPage.js');
var project = new ProjectPage();

var CommonElementsPage = require('../pages/CommonElementsPage.js');
var com_ele = new CommonElementsPage();

var PostProjectPage = require('../pages/PostProjectPage.js');
var postpr = new PostProjectPage();

var FindMembers = require('../pages/FindMembersPage.js');
var findMembers = new FindMembers();

var FindMembersActions = require('./FindMembersActions.js');
var findact = new FindMembersActions();

var CommonActions = require('./CommonActions.js');
var comact = new CommonActions();


var EC = protractor.ExpectedConditions;

var ProjectActions = function () {
	//partner clicks on post a project
	this.post_proj_fn = function () {
		project.post_pr_ln.click();
	};

	this.apply_lnk_fn = function (index) {
		browser.executeScript(helper.scrollIntoView, project.apply_pr_btn.get(index));
		project.apply_pr_btn.get(index).click();
	};

	//member my projects link
	this.view_my_proj = function () {
		browser.wait(EC.elementToBeClickable(project.my_projects), 5000, 'Btn my projects is not clickable');
		project.my_projects.click();
		comact.check_active_lnk('/member/projects/pending');
	};
	//partner past projects
	this.view_past_proj = function () {
		browser.wait(EC.elementToBeClickable(project.past_proj), 5000, 'Btn past projects is not clickable');
		project.past_proj.click();
		browser.wait(EC.urlContains('projects/past'), 5000, 'url is not as expected');
	};
	//partner active projects
	this.view_active_proj = function () {
		browser.wait(EC.elementToBeClickable(project.active_projects), 5000, 'Btn active projects is not clickable');
		project.active_projects.click();
	};

	//filter projects
	this.filter_projects_fn = function (input_project_id, input_skill, remove_skills) {
		browser.wait(EC.elementToBeClickable(com_ele.btn_filter), 5000, 'Btn filter is not clickable');

		if (input_project_id != null) {
			project.filt_project_id.clear();
			browser.sleep(2000);
			project.filt_project_id.sendKeys(input_project_id);
		}

		if (input_skill != null) {
			project.remove_sk.each(function () {
				project.remove_sk.click();
			});
			if (remove_skills) {
				project.filt_skills.click();
				input_skill.forEach(function (item) {
					project.filt_skills.sendKeys(item).sendKeys(protractor.Key.ARROW_DOWN).sendKeys(protractor.Key.ENTER);
				});
			}
		}
		else {
			com_ele.remove_el.each(function () {
				com_ele.remove_el.click();
			});
		}
		com_ele.btn_filter.click();
		browser.sleep(2000);
	};
	this.reset_filter = function () {
		browser.wait(EC.elementToBeClickable(project.reset_btn), 5000, 'Btn reset is not clickable');
		project.reset_btn.click();
		browser.sleep(2000);
		//check that all fields are cleared
		project.filt_project_id.getText().then(function (value) {
			expect(value).toBeEmptyString();
		});
		project.filt_skills.getText().then(function (value) {
			expect(value).toBeEmptyString();
		});
		project.filt_name.getText().then(function (value) {
			expect(value).toBeEmptyString();
		});
	};

	//get total project number;
	this.get_project_nb_text = function () {
		browser.wait(EC.visibilityOf(project.total_pr), 5000, 'Total project number is not visible');
		return project.total_pr.getText();
	};

	//get apply job button by id
	this.get_job_id = function (id) {
		return element(by.id(id));
	};

	//get project details
	this.get_proj_details = function (index) {
		var path = '//table[@id="pendingProjects"]/tbody/tr[' + index + ']/td';
		var proj_details = element(by.xpath(path));
		browser.wait(EC.visibilityOf(proj_details), 5000, 'Element is not visible');
		return proj_details.getText();
	};

	//get project application status
	this.get_proj_app_status = function (index) {
		browser.wait(EC.visibilityOf(project.proj_status_appl.get(index)), 5000, 'Project status cannot be read');
		return project.proj_status_appl.get(index).getAttribute('class');
	};

	//get project id from toggle btn
	this.get_pr_id = function (index) {
		browser.wait(EC.visibilityOf(project.toggle_pr.get(index)), 5000, 'Element attribute cannot be read');
		return project.toggle_pr.get(index).getAttribute('aria-controls');
	};

	//click apply link to search open projects;
	this.apply_pr_fn = function () {
		browser.wait(EC.elementToBeClickable(project.apply_pr), 5000, 'Btn apply is not clickable');
		project.apply_pr.click();
	};

	//sort projects desc by project id
	this.sort_proj_desc = function () {
		project.sort_desc_pr_id.isPresent().then(function (result) {
			if (!result) {
				project.sort_asc_pr_id.click();
				browser.wait(EC.visibilityOf(project.sort_desc_pr_id), 5000, 'sorting not working');
			} else {
				console.log('the results are already sorted desc');
			}
		});
	};

	//find available members
	this.find_available_members = function (member_index, input_member_id, click_manage) {
		var btn_avail = EC.elementToBeClickable(project.manage_memb.get(member_index));
		var btn_manage = EC.elementToBeClickable(project.avail_memb.get(member_index));
		browser.wait(EC.and(btn_avail, btn_manage), 5000);
		if (click_manage == 0) {
			project.manage_memb.get(member_index).click();
		} else if (click_manage == 1) {
			project.avail_memb.get(member_index).click();
		}
		else if (click_manage == 2) {
			browser.wait(EC.elementToBeClickable(project.shortlist.get(member_index)));
			project.shortlist.get(member_index).click();
		}
		browser.sleep(2000);
		//if user searches by user_id
		if (input_member_id != null) {
			findact.fill_applicants_search_form(input_member_id);
		}
		//click filter btn
		com_ele.btn_filter.click();
	};

	this.expand_pr = function (index) {
		console.log('btn index: ' + index);
		browser.wait(EC.elementToBeClickable(project.expand.get(index)), 5000, 'Button expand details is not clickable');
		project.expand.get(index).click();
	};
	var check_member_det = function (hourly_rate_for_partner, daily_rate_for_partner,
									 weekly_rate_for_partner, mo_rate_for_partner,
									 member_currency) {
		findMembers.member_toggle_info.get(0).getText().then(function (text) {
			console.log('text: ' + text);
			var newtext = text.substring(0, text.indexOf(member_currency));
			console.log('text without USD: ' + newtext);
			// expect(Number(newtext.replace(/,/g, ''))).toEqual(hourly_rate_for_partner);
		});
		findMembers.member_toggle_info.get(1).getText().then(function (text) {

			var newtext = text.substring(0, text.indexOf(member_currency));
			console.log('text without USD: ' + newtext);
			expect(Number(newtext.replace(/,/g, ''))).toEqual(daily_rate_for_partner);
		});
		findMembers.member_toggle_info.get(2).getText().then(function (text) {

			var newtext = text.substring(0, text.indexOf(member_currency));
			console.log('text: ' + newtext);
			expect(Number(newtext.replace(/,/g, '')).toFixed(0)).toEqual(Number(weekly_rate_for_partner).toFixed(0));
		});
		findMembers.member_toggle_info.get(3).getText().then(function (text) {
			var newtext = text.substring(0, text.indexOf(member_currency));
			console.log('text: ' + newtext);
			expect(Number(newtext.replace(/,/g, ''))).toEqual(mo_rate_for_partner);
		});
	};
	this.check_member_det = check_member_det;

	this.partner_assigns_project = function (payment_nb, hourly_rate_for_partner, daily_rate_for_partner,
											 weekly_rate_for_partner, mo_rate_for_partner,
											 member_currency, check, success) {
		if (check) {
			check_member_det(hourly_rate_for_partner, daily_rate_for_partner,
				weekly_rate_for_partner, mo_rate_for_partner,
				member_currency);
		}
		findact.assign_pr_by_member_id();
		browser.sleep(1000);
		findact.fill_dropdown(payment_nb);
		findact.submit_assign_form();
		browser.sleep(1000);
		//check if success
		if(success){
			helper.alert_success_fn(0, message.thanks_msg);
		}
		else {
			helper.alert_danger_msg_fn(0, message.pend_paym);
		}
	};

	this.get_project_number = function () {
		browser.executeScript(helper.scrollIntoView, project.active_proj_number);
		browser.wait(EC.visibilityOf(project.active_proj_number), 5000, 'Page is not fully loaded');
		return project.active_proj_number.getText();
	};

	this.get_avail_part_number = function () {
		browser.executeScript(helper.scrollIntoView, project.avail_part_number);
		browser.wait(EC.visibilityOf(project.avail_part_number), 5000, 'Page is not fully loaded');
		return project.avail_part_number.getText();
	};

	this.get_past_project_number = function () {
		browser.executeScript(helper.scrollIntoView, project.past_proj_number);
		browser.wait(EC.visibilityOf(project.past_proj_number), 5000, 'Page is not fully loaded');
		return project.past_proj_number.getText();
	};

	this.active_pr_fn = function () {
		project.active_projects.click();
	};

	this.save_fn = function () {
		browser.wait(EC.elementToBeClickable(postpr.proj_save_btn), 5000, 'Btn save is not clickable');
		postpr.proj_save_btn.click();
	};

	var add_proj_lang = function (index) {
		browser.wait(EC.elementToBeClickable(postpr.add_lang.get(index)), 5000, 'Link add language is not clickable');
		postpr.add_lang.get(index).click();
	};

	this.post_project_fn = function (input_name, input_desc, input_skill, input_groups, input_duration, input_duration_nb, input_startdate, input_enddate, isPrivate, lang_one, lang_one_lev, lang_two, drop_index) {
		if (input_name != null) {
			postpr.proj_name.clear();
			postpr.proj_name.sendKeys(input_name);
		}
		if (input_desc != null) {
			postpr.proj_desc.clear();
			postpr.proj_desc.sendKeys(input_desc);
		}
		if (lang_one != null) {
			add_proj_lang(0);
			comact.fill_drop_input(lang_one, 0);
		}
		if (lang_one_lev != null) {
			comact.fill_drop_input(lang_one_lev, 1);
		}
		if (lang_two != null) {
			add_proj_lang(1);
		}
		if (input_skill != null) {
			postpr.proj_skills.sendKeys(input_skill).sendKeys(protractor.Key.ARROW_DOWN).sendKeys(protractor.Key.ENTER);
		}
		browser.executeScript(helper.scrollIntoView, postpr.proj_groups);
		//set focus groups
		for (i = 0; i < input_groups; i++) {
			browser.wait(EC.elementToBeClickable(postpr.proj_groups), 5000, 'Link set groups is not clickable');
			postpr.proj_groups.sendKeys(protractor.Key.ARROW_DOWN).sendKeys(protractor.Key.ENTER);
		}
		//set project duration:
		if (input_duration != null) {
			comact.fill_drop_input(input_duration, drop_index);
		}
		if (input_duration_nb != null) {
			postpr.proj_dur_nb.clear();
			postpr.proj_dur_nb.sendKeys(input_duration_nb);
		}
		//set start and end date:
		if (input_startdate != null) {
			postpr.proj_start_date.clear();
			postpr.proj_start_date.sendKeys(input_startdate).sendKeys(protractor.Key.ENTER);
		}
		browser.executeScript(helper.scrollIntoView, postpr.proj_end_date);
		if (input_enddate != null) {
			postpr.proj_end_date.clear();
			postpr.proj_end_date.sendKeys(input_enddate).sendKeys(protractor.Key.ENTER);
		}

		if (isPrivate) {
			comact.manage_checkbox(0);
		}
		postpr.proj_save_btn.click();
	};

	this.get_project_records_text = function () {
		return project.get_pr_records.getText();
	};
	this.complete_project_fn = function () {
		browser.wait(EC.elementToBeClickable(project.btn_complete_proj), 5000, 'Btn complete a project is not clickable');
		project.btn_complete_proj.click();
	};

	this.get_int_details = function () {
		browser.wait(EC.visibilityOf(project.proj_int_details), 5000, 'interview details are not visible');
		return project.proj_int_details.getText();
	};

	this.get_proj_details_from_projtable = function () {
		browser.wait(EC.visibilityOf(project.proj_details), 5000, 'project details are not visible');
		return project.proj_details.getText();
	};
	this.proj_terminate_fn = function () {
		browser.wait(EC.elementToBeClickable(project.btn_terminate_proj), 5000, 'project terminate btn are not visible');
		project.btn_terminate_proj.click();
	};
	this.fill_term_dialog = function (actual_work, duration, comment) {
		if (actual_work != null) {
			browser.wait(EC.visibilityOf(project.real_hours), 5000, 'real hours input is not visible');
			project.real_hours.clear().sendKeys(actual_work);
		}
		if (duration != null) {
			comact.fill_drop_input(duration, 0);
		}
		if (comment != null) {
			browser.wait(EC.visibilityOf(project.terminate_comment), 5000, 'terminate comment textarea is not visible');
			project.terminate_comment.clear().sendKeys(comment);
		}
	};
	this.view_shortlist = function (index) {
		browser.wait(EC.elementToBeClickable(project.shortlist.get(index)), 5000, 'shortlist element is not clickable');
		project.shortlist.get(index).click();
	};
	this.add_to_shortlist = function () {
		browser.wait(EC.elementToBeClickable(project.add_to_shortlist_btn), 5000, 'add to shortlist element is not clickable');
		project.add_to_shortlist_btn.click();
		browser.sleep(2000);
		browser.wait(EC.invisibilityOf(project.add_to_shortlist_btn), 5000, 'add to shortlist element is still clickable');
	};
	this.copy_shortlist = function (index) {
		browser.wait(EC.elementToBeClickable(project.copy_shortlist.get(index)), 5000, 'copy to shortlist element is not clickable');
		project.copy_shortlist.get(index).click();
	};

	this.copy_proj_shortlist = function (index) {
		browser.wait(EC.elementToBeClickable(project.copy_short_from_proj.get(index)), 5000, 'copy shortlist btn is not clickable');
		project.copy_short_from_proj.get(index).click();
	};

	this.remove_from_shortlist = function (index) {
		browser.wait(EC.elementToBeClickable(project.remove_from_short.get(index)), 5000, 'remove from shortlist btn is not clickable');
		project.remove_from_short.get(index).click();
	};

	this.copy_proj = function () {
		browser.wait(EC.elementToBeClickable(project.btn_copy_proj), 5000, 'copy project is not clickable');
		project.btn_copy_proj.click();
		browser.wait(EC.urlContains('copy'), 5000, 'url is not as expected');
		comact.check_active_lnk('/partner/projects/new');
	};
	this.create_test_pr = function () {
		browser.wait(EC.elementToBeClickable(findMembers.create_test_pro_btn), 5000, 'create test project is not clickable');
		findMembers.create_test_pro_btn.click();
	};
	this.view_proj_details = function (pr_id, comp_name) {
		var proj_link = '/member/project/details/' + pr_id + '?act=mop';
		browser.wait(EC.elementToBeClickable(element(by.xpath("//a[@href='" + proj_link + "']"))), 5000, 'project link is not clickable');
		element(by.xpath("//a[@href='" + proj_link + "']")).click();
		browser.wait(EC.urlContains('details'), 5000, 'url is not as expected');
		browser.wait(EC.visibilityOf(project.proj_det), 5000, 'project details are not visible');
		project.proj_det.getText().then(function (value) {
			var comp = value.toString().substring((value.toString().indexOf('owner') + 6), value.toString().indexOf('Project ID'));
			console.log('project value: ' + comp);
			expect(comp).toContain(comp_name);
		});
	};
	this.go_back_to_proj = function (url) {
		browser.wait(EC.elementToBeClickable(project.back_to_proj), 5000, 'back link is not clickable');
		project.back_to_proj.click();
		browser.wait(EC.urlContains(url), 5000, 'url is not as expected');
	};
	this.close_proj = function (type) {
		browser.wait(EC.elementToBeClickable(project.btn_close_proj), 5000, 'btn close is not clickable');
		project.btn_close_proj.click();
	};
	//user clicks yes = 0, no = 1, close = 2
	this.dialog_close_fn = function (type) {
		if (type == 0) {
			browser.wait(EC.elementToBeClickable(project.yes_dialog_btn), 5000, 'btn yes is not clickable');
			project.yes_dialog_btn.click();
		}
		else if (type == 1) {
			browser.wait(EC.elementToBeClickable(project.no_dialog_btn), 5000, 'btn no is not clickable');
			project.no_dialog_btn.click();
		}
		else if (type == 2) {
			browser.wait(EC.elementToBeClickable(project.close_dialog_btn), 5000, 'btn close is not clickable');
			project.close_dialog_btn.click();
		}
	};
	this.go_to_profile = function () {
		browser.wait(EC.elementToBeClickable(project.prof_skill), 5000, 'link to profile is not clickable');
		project.prof_skill.click();
	};

	this.go_to_prof_rate = function () {
		browser.wait(EC.elementToBeClickable(project.prof_rate), 5000, 'link to profile is not clickable');
		project.prof_rate.click();
	};

	this.go_to_invoice = function () {
		browser.wait(EC.elementToBeClickable(project.invoice_det), 5000, 'link to invoice details is not clickable');
		project.invoice_det.click();
	};
	this.change_style_shortlist =function () {
		browser.wait(EC.visibilityOf(project.shortlist_style), 5000, 'element not changed the style');
	};
};
module.exports = ProjectActions;