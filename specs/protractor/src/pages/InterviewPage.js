var InterviewPage = function () {
	//modal dialog btns:
	var interv_datetime = element(by.xpath('//input[@id="interview-date"]'));
	this.interv_datetime = interv_datetime;

	var interv_datetime_picker = element(by.xpath('//div[@id="interview-datetimepicker"]'));
	this.interv_datetime_picker = interv_datetime_picker;

	var interv_comment = element(by.id('interview-comment'));
	this.interv_comment = interv_comment;

	var modal_dialog = element(by.xpath('//form[@id="response_form"]'));
	this.modal_dialog = modal_dialog;

	var drop_tz = element(by.xpath('//*[@id="s2id_interview-timezone"]/a'));
	this.drop_tz = drop_tz;

	//interview accept btn
	var accept_int = element(by.xpath('//a[contains (@id, "interview-accept")]'));
	this.accept_int = accept_int;

	//interview comments textarea
	var com_textarea = element(by.xpath('//textarea[contains (@id, "interview-comment")]'));
	this.com_textarea = com_textarea;

	//interview comments submit btn
	var int_com_submit = element(by.xpath('//a[contains (@id, "interview-comments-submit")]'));
	this.int_com_submit = int_com_submit;

	//interview comments cancel btn
	var int_com_cancel = element(by.xpath('//a[contains (@id, "interview-comments-cancel")]'));
	this.int_com_cancel = int_com_cancel;

	//search interview filter
	var search_filt = element(by.xpath('//input[@type="search"]'));
	this.search_filt = search_filt;

	//number of interviews:
	var int_nb = element(by.id('interviews_list_info'));
	this.int_nb = int_nb;

	//interview accept from interviews:
	var accept_int_from_int = element(by.xpath('//button[contains (@class, "interview-accept")]'));
	this.accept_int_from_int = accept_int_from_int;

	//interview decline from interviews:
	var decline_int_from_int = element(by.xpath('//button[contains (@class, "interview-decline")]'));
	this.decline_int_from_int = decline_int_from_int;

	//message from interviews:
	var mes_from_int = element(by.xpath('//button[contains (@class, "interview-message")]'));
	this.mes_from_int = mes_from_int;

	//reschedule from interviews:
	var resched_int = element(by.xpath('//button[contains (@class, "interview-reschedule")]'));
	this.resched_int = resched_int;
};
module.exports = InterviewPage;