var ProfilePage = function() {

	//skills link
	var skills_lnk = element(by.linkText('Skills'));
	this.skills_lnk = skills_lnk;

	//contacts link
	var cont_lnk = element(by.linkText('Contact Info'));
	this.cont_lnk = cont_lnk;

	//social profile link
	var soc_pr = element(by.linkText('Social profiles'));
	this.soc_pr = soc_pr;

	//pay rate link
	var pay_rate = element(by.linkText('Pay rate'));
	this.pay_rate = pay_rate;

	//languages link
	var langs = element(by.linkText('Languages'));
	this.langs = langs;

	//settings link
	var settings_lnk = element(by.linkText('Settings'));
	this.settings_lnk = settings_lnk;

	//cv link
	var cv_lnk = element(by.linkText('CV'));
	this.cv_lnk = cv_lnk;

	//work history link
	var work_history_lnk = element(by.linkText('Work History'));
	this.work_history_lnk = work_history_lnk;

    //work history link
    var company_brief = element(by.linkText('Company brief'));
    this.company_brief = company_brief;

	//group link
	var group = element(by.linkText('Group'));
	this.group = group;

	//group link
	var group_on_focus = element(by.linkText('Groups on focus'));
	this.group_on_focus = group_on_focus;

	//availability
	var availability = element(by.linkText('Availability'));
	this.availability = availability;

	//project preferencies link
	var proj_pref = element(by.linkText('Project Preferences'));
	this.proj_pref = proj_pref;

	//partner representatives
	var part_repres = element(by.linkText('Representatives'));
	this.part_repres = part_repres;

	//settings
	var settings = element(by.linkText('Settings'));
	this.settings = settings;

	//payment history
	var pay_history = element(by.linkText('Payment history'));
	this.pay_history = pay_history;
};
module.exports = ProfilePage;