/**
 * Invoice page elements
 */
var EC = protractor.ExpectedConditions;
var InvoicePage = function() {
	//invoice_details link
	var invoice_det_lnk = element(by.linkText("Invoices' Details"));
	this.invoice_det_lnk = invoice_det_lnk;

	//issued invoice link
	var issued_inv_lnk = element(by.linkText("Issued Invoices"));
	this.issued_inv_lnk = issued_inv_lnk;
	
/*	invoice form	
*/
	//invoice name
	var invoice_name = element(by.id('invoice-name'));
	this.invoice_name = invoice_name;

	//invoice email
	var invoice_email = element(by.id('invoice-email'));
	this.invoice_email = invoice_email;

	//invoice phone code
	var phone_code = element(by.id('invoice-phone-country-code'));
	this.phone_code = phone_code;

	//invoice phone area
	var phone_code_area = element(by.id('invoice-phone-area-code'));
	this.phone_code_area = phone_code_area;

	//invoice phone area
	var invoice_phone = element(by.id('invoice-phone'));
	this.invoice_phone = invoice_phone;

	/*address fields*/
	var invoice_address = element(by.id('invoice-address'));
	this.invoice_address = invoice_address;

	//invoice city
	var invoice_city = element(by.id('invoice-city'));
	this.invoice_city = invoice_city;

	//invoice state
	var invoice_state = element(by.id('invoice-state'));
	this.invoice_state = invoice_state;

	//invoice postal code
	var invoice_post_code = element(by.id('invoice-postal-code'));
	this.invoice_post_code = invoice_post_code;

	//invoice country
	var invoice_country = element(by.id('invoice-country'));
	this.invoice_country = invoice_country;

	//vat registered
	var vat_regist = element(by.id('vat-registered'));
	this.vat_regist = vat_regist;

	//vat number
	var vat_number = element(by.id('vat-number'));
	this.vat_number = vat_number;

	//tax registered
	var tax_regist = element(by.id('tax-registered'));
	this.tax_regist = tax_regist;

	//vat registered
	var tax_number = element(by.id('tax-number'));
	this.tax_number = tax_number;

	//btn back
	var back_to_pay = element(by.linkText('Back'));
	this.back_to_pay = back_to_pay;

};
module.exports = InvoicePage;