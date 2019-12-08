var PostProjectPage = function () {
	//project name
	var proj_name = element(by.id('title'));
	this.proj_name = proj_name;

//project description
	var proj_desc = element(by.id('description'));
	this.proj_desc = proj_desc;

	//project description
	var proj_skills = element(by.id('skillsInput'));
	this.proj_skills = proj_skills;

//project groups
	var proj_groups = element(by.xpath('//div[@id="s2id_groups"]/descendant::input'));
	this.proj_groups = proj_groups;

//project duration (type)
	var proj_dur = element(by.id('select2-chosen-2'));
	this.proj_dur = proj_dur;

	//add project language
	var add_lang = element.all(by.css('.collection-rescue-add'));
	this.add_lang = add_lang;

//project duration (selection)
	var proj_dur_arr = element(by.xpath("//div[contains(@id, 'ratetype')]"));
	this.proj_dur_arr = proj_dur_arr;

//project duration - numbers
	var proj_dur_nb = element(by.id('duration'));
	this.proj_dur_nb = proj_dur_nb;

//project start date
	var proj_start_date = element(by.id('start-date'));
	this.proj_start_date = proj_start_date;

//project end date
	var proj_end_date = element(by.id('deadline'));
	this.proj_end_date = proj_end_date;

//project currency
	var proj_currency = element(by.id('select2-chosen-3'));
	this.proj_currency = proj_currency;

//project rate from
	var proj_rate_from = element(by.id('rateFrom'));
	this.proj_rate_from = proj_rate_from;

//project rate to
	var proj_rate_to = element(by.id('rateTo'));
	this.proj_rate_to = proj_rate_to;

//project rate to
	var proj_comment = element(by.id('comments'));
	this.proj_comment = proj_comment;

//btn save
	var proj_save_btn = element(by.id('np-save'));
	this.proj_save_btn = proj_save_btn;

//rate-type-label
	var rate_label = element(by.css('.rate-type-label'));
	this.rate_label = rate_label;


//enter project duration
	var proj_dur_input = element(by.xpath("//input[contains(@id, 'autogen2_search')]"));
	this.proj_dur_input = proj_dur_input;

//enter currency type 
	var proj_cur_type = element(by.xpath("//input[contains(@id, 'autogen3_search')]"));
	this.proj_cur_type = proj_cur_type;

	//save btn click
	this.save_proj_fn = function () {
		proj_save_btn.click();
	};


	/*placeholders*/
//enter currency type 
	this.get_placeholder = function () {
		return proj_name.getAttribute('placeholder');
	};
};

module.exports = PostProjectPage;