var ProjectPreferenciesPage = function() {
	//project preferencies text
	var project_pref_text = element(by.xpath('//div[@id="project-prefs"]/descendant::div[@class="caption padtop7"]'));
	this.project_pref_text = project_pref_text;

	//btn edit
	var edit_pp_btn = element(by.id('pp-edit'));
	this.edit_pp_btn = edit_pp_btn;

	//btn save
	var save_pp_btn = element(by.id('pp-save'));
	this.save_pp_btn = save_pp_btn;

	//btn close
	var close_pp_btn = element(by.id('pp-cancel'));
	this.close_pp_btn = close_pp_btn;

	//dropdown
	var dropdown = element(by.xpath('//*[@id="s2id_prefs"]/a'));
	this.dropdown = dropdown;
};
module.exports = ProjectPreferenciesPage;