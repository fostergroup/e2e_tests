var AvailabilityPage = function() {
	//btn save group
	var submit_avail = element(by.id('avb-submit'));
	this.submit_avail = submit_avail;

	var submit_ts = element(by.id('ts-submit'));
	this.submit_ts = submit_ts;

	//btn close group
	var close_avail = element(by.id('avb-cancel'));
	this.close_avail = close_avail;

	//btn edit group
	var edit_avail = element(by.id('avb-edit'));
	this.edit_avail = edit_avail;

	//area of group text:
	var avail_text = element(by.xpath('//div[@id="availability"]'));
	this.avail_text = avail_text;

	//availability slider
	var avail_slider = element(by.name('transformify_member_availability[available]'));
	this.avail_slider = avail_slider;

	//move slider
	var move_slider = element(by.xpath('//form[@id="edit-avb"]/descendant::div[@class = "bootstrap-switch-container"]'));
	this.move_slider = move_slider;

	//delete checkbox:
	var delete_slot = element(by.xpath('//form[@id="add-ts"]/descendant::span[@class="icon-checked"]'));
	this.delete_slot = delete_slot;

	//timeslot edit:
	var timeslot_edit = element.all(by.xpath("//button[contains (@id, 'ts-edit')]"));
	this.timeslot_edit = timeslot_edit;

	//timeslot from hour:
	var timeslot_hour = element(by.xpath('//*[@id="s2id_transformify_timeslot_timeFrom_hour"]/a'));
	this.timeslot_hour = timeslot_hour;

	//timeslot to hour:
	var timeslot_to_hour = element(by.xpath('//*[@id="s2id_transformify_timeslot_timeTo_hour"]/a'));
	this.timeslot_to_hour = timeslot_to_hour;

	//timeslot from minute:
	var timeslot_minute = element(by.xpath('//*[@id="s2id_transformify_timeslot_timeFrom_minute"]/a'));
	this.timeslot_minute = timeslot_minute;

	//timeslot to minute:
	var timeslot_to_minute = element(by.xpath('//*[@id="s2id_transformify_timeslot_timeTo_minute"]/a'));
	this.timeslot_to_minute = timeslot_to_minute;

	//timeslots text:
	var timeslot_text = element(by.id('timeslots'));
	this.timeslot_text = timeslot_text;

	//dropdown lists:
	var droplist = element.all(by.id('select2-drop-mask'));
	this.droplist = droplist;

	//timeslot add:
	var add_ts = element(by.xpath('//button[@id="add-ts"]'));
	this.add_ts = add_ts;

	//days of week availablitily:
	//timeslots text:
	var mo = element(by.id('transformify_member_availability_onMon'));
	this.mo = mo;

	var tu = element(by.id('transformify_member_availability_onTue'));
	this.tu = tu;

	var we = element(by.id('transformify_member_availability_onWed'));
	this.we = we;

	var th = element(by.id('transformify_member_availability_onThu'));
	this.th = th;

	var fr = element(by.id('transformify_member_availability_onFri'));
	this.fr = fr;

	var sa = element(by.id('transformify_member_availability_onSat'));
	this.sa = sa;

	var su = element(by.id('transformify_member_availability_onSun'));
	this.su = su;
};
module.exports = AvailabilityPage;