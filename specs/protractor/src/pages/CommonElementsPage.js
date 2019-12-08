var CommonElementsPage = function() {
	//selected input
	var select_input = element(by.className('select2-input select2-focused'));
	this.select_input = select_input;

	// select dropdown list
	var drop_list = element.all(by.css('.select2-choice'));
	this.drop_list = drop_list;

	//selected input
	var remove_el = element.all(by.css('.select2-search-choice'));
	this.remove_el = remove_el;

	//btn submit
	var btn_submit = element(by.xpath("//*[@type='submit']"));
	this.btn_submit = btn_submit;

	//btn edit
	var edit_btn = element.all(by.xpath("//*[contains(text(), 'Edit')]"));
	this.edit_btn = edit_btn;

	//checkbox
	var check_box = element.all(by.css('.icon-checked'));
	this.check_box = check_box;

	//non-checkbox
	var not_check_box = element.all(by.css('.icon-unchecked'));
	this.not_check_box = not_check_box;

	//btn close
	var btn_close = element.all(by.xpath("//button[contains(text(), 'Close')]"));
	this.btn_close = btn_close;

	//expand btn:
	var expand_btn = element.all(by.xpath("//a[contains(@class, 'expand-btn')]"));
	this.expand_btn = expand_btn;

	var t_body = element(by.xpath('//tbody'));
	this.t_body = t_body;

	//items in the list
	var li_ele = element.all(by.xpath('//li'));
	this.li_ele = li_ele;

    //alert elements
    var alert_msg = element.all(by.css('.alert-danger'));
    this.alert_msg = alert_msg;

    var alert_success_msg = element.all(by.css('.alert-success'));
    this.alert_success_msg = alert_success_msg;

    var gr_alert_msg = element.all(by.css('.list-group-item-danger'));
    this.gr_alert_msg = gr_alert_msg;

    var gr_success_msg = element.all(by.css('.list-group-item-success'));
    this.gr_success_msg = gr_success_msg;

    var warn_msg = element.all(by.css('.alert-warning'));
    this.warn_msg = warn_msg;

    //input search
    var search_input = element(by.xpath("//input[@type='search']"));
    this.search_input = search_input;

	//button "filter";
	var btn_filter = element(by.xpath("//button[contains(text(), 'Filter') and @type='submit']"));
	this.btn_filter = btn_filter;

	//move slider
	var slider = element(by.xpath('//form/descendant::div[@class = "bootstrap-switch-container"]'));
	this.slider = slider;
};
module.exports = CommonElementsPage;