var PaymentPage = function () {
	//request payment
	var request_pay_lnk = element(by.partialLinkText('Request Payment'));
	this.request_pay_lnk = request_pay_lnk;

	//input search
	var input_search = element(by.xpath('//div/label/input'));
	this.input_search = input_search;

	//payment accounts
	var pay_account = element(by.linkText('Payment accounts'));
	this.pay_account = pay_account;

	//payment accounts add for member
	var member_add_acc = element.all(by.css('.member-provider-apply'));
	this.member_add_acc = member_add_acc;

	//payment accounts
	var proc_pay = element(by.linkText('Processed Payments'));
	this.proc_pay = proc_pay;

	//approve payment links
	var approve_payment_lnk = element.all(by.className('btn btn-info btn-sm payment-btn payment-approve-btn'));
	this.approve_payment_lnk = approve_payment_lnk;

	//element to request payment in table:
	var request_pay_table_lnk = element.all(by.xpath('//*[@id="requestPayments"]/tbody/tr/td[6]/a'));
	this.request_pay_table_lnk = request_pay_table_lnk;

	//apply btn:
	var apply_btn = element(by.id('apply-button'));
	this.apply_btn = apply_btn;

	//credit card list:
	var card = element.all(by.xpath("//li[contains(@id, 'card_')]"));
	this.card = card;

	//delete card btn:
	var delete_card = element.all(by.linkText('Delete'));
	this.delete_card = delete_card;

	//submit card btn:
	var submit_card = element(by.xpath("//button[contains(text(), 'Submit card')]"));
	this.submit_card = submit_card;

	//bank transfer
	var bank_transfer = element(by.id('use-bank-transfer'));
	this.bank_transfer = bank_transfer;

	//payoneer iframe
	var pay_iframe_transfer = element(by.id('member-provider-register-container-BANK_TRANSFER'));
	this.pay_iframe_transfer = pay_iframe_transfer;

	//payoneer iframe
	var pay_iframe_card = element(by.id('member-provider-register-container-PREPAID_CARD'));
	this.pay_iframe_card = pay_iframe_card;

	//get list element (credit cards):
	var credit_card_list = element.all(by.xpath("//li[@class='list-group-item']"));
	this.credit_card_list = credit_card_list;

	//apply card btn for member
	var apply_pay = element.all(by.css('.member-provider-apply'));
	this.apply_pay = apply_pay;
};
module.exports = PaymentPage;