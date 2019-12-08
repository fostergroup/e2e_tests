var ContactsPage = function() {
	//edit btn
	var edit_btn = element(by.id('ci-edit'));
	this.edit_btn = edit_btn;

	//save btn
	var save_btn = element(by.id('ci-save'));
	this.save_btn = save_btn;

	//close btn
	var close_btn = element(by.id('ci-cancel'));
	this.close_btn = close_btn;

	/*contact form*/
	// additional email
	var addit_email = element(by.id('email2'));
	this.addit_email = addit_email;
	
	// office phone
	var office_ph = element(by.id('o-phone'));
	this.office_ph = office_ph;

	// cellulat phone
	var c_phone = element(by.id('c-phone'));
	this.c_phone = c_phone;

	// contacts info
	var cont_info = element(by.id('contact'));
	this.cont_info = cont_info;
};
module.exports = ContactsPage;