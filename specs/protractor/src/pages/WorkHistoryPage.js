var WorkHistoryPage = function() {
	//save btn
	var save_btn = element.all(by.xpath("//button[contains(text(), 'Submit')]"));
	this.save_btn = save_btn;

	//edit btn
	var edit_btn = element.all(by.xpath("//button[contains(@id, 'wr-edit')]"));
	this.edit_btn = edit_btn;

	//reset btn
	var reset_btn = element.all(by.xpath("//button[contains(text(), 'Reset')]"));
	this.reset_btn = reset_btn;

	//close btn
	var close_btn = element.all(by.xpath("//button[contains(text(), 'Close')]"));
	this.close_btn = close_btn;

	//paragraph with work history
	var years_work = element.all(by.xpath('p'));
	this.years_work = years_work;

	//all working records
	var working_rd = element(by.id('work-records'));
	this.working_rd = working_rd;

	//working record by id
	var work_record = element.all(by.xpath("//div[contains(@id, 'wr')]"));
	this.work_record = work_record;

	//work history area
	var work_hist_area = element(by.id('work-history-tab'));
	this.work_hist_area = work_hist_area;

	//add working records btn
	var add_work_btn = element(by.id('add-wr'));
	this.add_work_btn = add_work_btn;

	//form to set up fields
	//company name
	var company_name = element(by.id('company'));
	this.company_name = company_name;

	//company position
	var cposition = element(by.name('transformify_work_record[position]'));
	this.cposition = cposition;

	//work position description
	var desc = element(by.name('transformify_work_record[description]'));
	this.desc = desc;

	//delete position
	var del_check = element(by.css("#edit-wr > fieldset > div:nth-child(6) > label > span > span.icon-checked"));
	this.del_check = del_check;

	//delete checkbox to be checked
	var del_checkbox = element(by.id('transformify_work_record_deleteRecord'));
	this.del_checkbox = del_checkbox;


	var sel_to_year = element(by.id('s2id_to-year'));
	this.sel_to_year = sel_to_year;

	var sel_from_year = element(by.id('s2id_from-year'));
	this.sel_from_year = sel_from_year;

	var sel_from_mo = element(by.id('s2id_from-month'));
	this.sel_from_mo = sel_from_mo;

	var sel_to_mo = element(by.id('s2id_to-month'));
	this.sel_to_mo = sel_to_mo;
};
module.exports = WorkHistoryPage;