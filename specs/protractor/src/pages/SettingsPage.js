var SettingsPage = function() {
	//btn sign in as a member
	var change_pswd = element(by.xpath("//a[contains(@data-remote, 'change-password')]"));
	this.change_pswd = change_pswd;

	/*modal dialog to change pswd*/
	//current pswd
	var cur_pswd = element(by.id('current-pwd'));
	this.cur_pswd = cur_pswd;

	//new pswd
	var new_pswd = element(by.id('pwd-first'));
	this.new_pswd = new_pswd;

	//repeat pswd
	var repeat_pswd = element(by.id('pwd-second'));
	this.repeat_pswd = repeat_pswd;

	//btn save
	var btn_save = element(by.id('pwd-save'));
	this.btn_save = btn_save;

	//btn close
	var btn_close = element(by.xpath("//button[contains(text(), 'Close')]"));
	this.btn_close = btn_close;

	//close dialog
	var close_dialog = element(by.xpath('//button[text()="Close"]'));
	this.close_dialog = close_dialog;

	//modal dialog
	var save_dialog = element(by.id('saveUnsubscription'));
	this.save_dialog = save_dialog;

	//checkbox:
	var checkbox_email = element.all(by.xpath('//input[@name="unsubscription-group"]'));
	this.checkbox_email = checkbox_email;

	//checkbox:
	var checkbox_matchskills = element(by.xpath('//input[@id="matching-skill-alert"]'));
	this.checkbox_matchskills = checkbox_matchskills;

	//slider for email alerts
	var email_alerts_slider = element(by.name('transformify_partner_email_alerts[email_alerts]'));
	this.email_alerts_slider = email_alerts_slider;

	//btn close in modal dialog:
	var close_modal = element(by.xpath('//form[@id="edit-alst"]/descendant::button[text()="Close"]'));
	this.close_modal = close_modal;

	// slider
	var move_slider = element.all(by.xpath('//label[@class="bootstrap-switch-label"]'));
	this.move_slider = move_slider;
};
module.exports = SettingsPage;