var ProjectPage = function() {

	var my_projects = element(by.linkText('My Projects'));
	this.my_projects = my_projects;

	var apply_pr = element(by.linkText('Apply'));
	this.apply_pr = apply_pr;

	var apply_pr_btn = element.all(by.xpath('//button[contains(text(), "Apply")]'));
	this.apply_pr_btn = apply_pr_btn;

	//partner post a new project
	var post_pr_ln = element(by.linkText('Post a new project'));
	this.post_pr_ln = post_pr_ln;

	//button toggle details
	var toggle_pr = element.all(by.xpath("//button[contains(text(), 'Toggle details')]"));
	this.toggle_pr = toggle_pr;

	//button reset filter
	var reset_btn = element(by.xpath("//button[text()='Reset']"));
	this.reset_btn = reset_btn;

	//button expand details
	var expand = element.all(by.className("btn btn-info btn-xs expand-btn"));
	this.expand = expand;

	//project description
	var pr_desc = element.all(by.xpath("//strong[contains(text(), 'Project description')]")).get(0);
	this.pr_desc = pr_desc;

	//project start date
	var st_date = element.all(by.xpath("//strong[contains(text(), 'Start date')]")).get(0);
	this.st_date = st_date;

	//project skills
	var skills = element.all(by.xpath("//strong[contains(text(), 'Skills')]")).get(0);
	this.skills = skills;

	//project Groups on focus
	var foc_gr = element.all(by.xpath("//strong[contains(text(), 'Groups on focus')]")).get(0);
	this.foc_gr = foc_gr;

	//button "apply for project"
	var apply = element.all(by.xpath("//a[contains(@id, 'ma-apply')]"));
	this.apply = apply;


	//link to set up rate
	var rate = element.all(by.xpath("//a[contains(text(), 'rate')]"));
	this.rate = rate;

	//button "delete skill";
	var delete_item = element.all(by.css('.select2-search-choice'));
	this.delete_item = delete_item;


	//link total projects number;
	var total_pr = element(by.xpath("//div[contains(text(), 'Total')]"));
	this.total_pr = total_pr;

	//table with sorting
	var sort_asc_pr_id = element(by.className('project_id  no_wrap sorting_asc'));
	this.sort_asc_pr_id = sort_asc_pr_id;

	var sort_desc_pr_id = element(by.className('project_id no_wrap sorting_desc'));
	this.sort_desc_pr_id = sort_desc_pr_id;

	//project details:
	var project_id = element(by.partialLinkText('[#TRJOB-'));
	this.project_id = project_id;

	//get project status:
	var project_status = element(by.xpath('//table[@id="pendingProjects"]/tbody/tr/td[3]'));
	this.project_status = project_status;

	//btn complete
	var btn_complete_proj = element(by.css('.project-complete'));
	this.btn_complete_proj = btn_complete_proj;

	//btn edit
	var btn_edit_proj = element(by.css('.project-edit'));
	this.btn_edit_proj = btn_edit_proj;

	//btn copy
	var btn_copy_proj = element(by.css('.project-copy'));
	this.btn_copy_proj = btn_copy_proj;

	//btn close
	var btn_close_proj = element(by.css('.project-close'));
	this.btn_close_proj = btn_close_proj;

	//btn terminate
	var btn_terminate_proj = element(by.css('.project-terminate'));
	this.btn_terminate_proj = btn_terminate_proj;

	//filters:
	//by project id for new design!
	var filt_project_id = element(by.id('project_id'));
	this.filt_project_id = filt_project_id;

	//by project skills
	var filt_skills = element(by.id('s2id_autogen1'));
	this.filt_skills = filt_skills;

	//by project name
	var filt_name = element(by.id('project_name'));
	this.filt_name = filt_name;

	//submit btn
	var filter_pr_btn = element(by.xpath("//button[contains(text(), 'Filter projects')]"));
	this.filter_pr_btn = filter_pr_btn;

	//remove skills
	var remove_sk = element.all(by.xpath("//a[@class='select2-search-choice-close']"));
	this.remove_sk = remove_sk;

	//available applicants:
	var avail_memb = element.all(by.linkText('Available Participants'));
	this.avail_memb = avail_memb;

	//available applicants:
	var member_rate = element.all(by.linkText('Participants ratings'));
	this.member_rate = member_rate;

	//manage applicants:
	var manage_memb = element.all(by.linkText('Manage applications'));
	this.manage_memb = manage_memb;

	//copy shortlist applicants:
	var copy_shortlist = element.all(by.linkText('Copy shortlist'));
	this.copy_shortlist = copy_shortlist;

	//shortlist applicants:
	var shortlist = element.all(by.linkText('Shortlist'));
	this.shortlist = shortlist;

	//warning about 0 projects found
	var warn_pr = element(by.css('.alert-warning'));
	this.warn_pr = warn_pr;

	//select projects from 
	var proj_input_sel = element.all(by.css('.select2-input')).get(0);
	this.proj_input_sel = proj_input_sel;

	//get project status applications
	var proj_status_appl = element.all(by.xpath("//div[contains(@class, 'statuses')]"));
	this.proj_status_appl = proj_status_appl;

	//job identifiers
	var job_id = element.all(by.xpath("//div[contains(text(), '#TRJOB')]"));
	this.job_id = job_id;

	var active_projects = element(by.linkText('Active Projects'));
	this.active_projects = active_projects;

	var active_proj_number = element(by.id('pendingProjects_info'));
	this.active_proj_number = active_proj_number;

	var avail_part_number = element(by.id('availableParticipants_info'));
	this.avail_part_number = avail_part_number;

	var past_proj_number = element(by.id('pastProjects_info'));
	this.past_proj_number = past_proj_number;

	//get project records on my projects on the page (sample):
	var get_pr_records = element(by.css('.records'));
	this.get_pr_records = get_pr_records;

	//get project interview details
	var proj_int_details = element(by.xpath("//div[contains(@id, 'application')]"));
	this.proj_int_details = proj_int_details;

	//add to shortlist
	var add_to_shortlist_btn = element(by.xpath('//a[contains(@class, "shortlist-btn")]'));
	this.add_to_shortlist_btn = add_to_shortlist_btn;

	//copy shortlist
	var copy_short_from_proj = element.all(by.xpath('//a[contains(@class, "project-copy-shortlist")]'));
	this.copy_short_from_proj = copy_short_from_proj;

	//remove from shortlist
	var remove_from_short = element.all(by.xpath('//a[contains(@class, "shortlist-remove-btn")]'));
	this.remove_from_short = remove_from_short;

	//add insode shortlist
	var in_shortlist = element(by.xpath('//a[contains(@class, "expand-btn")]'));
	this.in_shortlist = in_shortlist;

	//get project details from project table
	var proj_details = element(by.xpath("//div[contains(@id, 'details-')]"));
	this.proj_details = proj_details;

	//real worked hours
	var real_hours = element(by.id('actually-worked-occurrence'));
	this.real_hours = real_hours;

	//comment
	var terminate_comment = element(by.id('interview-comment'));
	this.terminate_comment = terminate_comment;

	//past projects
	var past_proj = element(by.linkText('Past Projects'));
	this.past_proj = past_proj;

	//back link
	var back_to_proj = element(by.linkText('Back to open projects'));
	this.back_to_proj = back_to_proj;

	//project details
	var proj_det = element(by.css('.project-details'));
	this.proj_det = proj_det;

	//modal dialog btn to close project
	var no_dialog_btn = element(by.css('.decline'));
	this.no_dialog_btn = no_dialog_btn;

	//modal dialog btn to close project
	var yes_dialog_btn = element(by.css('.confirm'));
	this.yes_dialog_btn = yes_dialog_btn;

	//modal dialog btn to close project
	var close_dialog_btn = element(by.xpath('//*[@id="project_close_consent"]/descendant::button[@class="close"]'));
	this.close_dialog_btn = close_dialog_btn;

	//link to skills
	var prof_skill = element(by.linkText('Profile > Skills'));
	this.prof_skill = prof_skill;

	//link to pay rate
	var prof_rate = element(by.linkText('Profile > Pay rate'));
	this.prof_rate = prof_rate

	//link to invoice details
	var invoice_det = element(by.linkText('Invoice Details'));
	this.invoice_det = invoice_det;

	//shortlist in manage applicants
	var shortlist_style = element(by.css('.shortlist-success'));
	this.shortlist_style = shortlist_style;
};
module.exports = ProjectPage;