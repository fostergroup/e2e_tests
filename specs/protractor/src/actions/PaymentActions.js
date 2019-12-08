var CommonActions = require('./CommonActions.js');
var comact = new CommonActions();


var CommonElementsPage = require('../pages/CommonElementsPage.js');
var com_ele = new CommonElementsPage();

var PaymentPage = require('../pages/PaymentPage.js');
var pay = new PaymentPage();
var Messages = require('../messages.js');
var mes = new Messages();
var EC = protractor.ExpectedConditions;

var PaymentActions = function () {
	//the user requests payment
	this.user_requests_payment = function (input_project_id, project_sum, currency, is_uk_vat_regist) {
		browser.wait(EC.elementToBeClickable(pay.request_pay_table_lnk.get(0)), 5000, 'btn request payment is not clickable');
		pay.input_search.clear().sendKeys(input_project_id).sendKeys(protractor.Key.ENTER);
		browser.sleep(1000);
		//get project number
		comact.get_table_element(2, 0).then(function (text) {
			console.log('project number for payment: ' + text);
			expect(text).toContain(input_project_id);
		});
		//get payment amount
		comact.get_table_element(5, 0).then(function (text) {
			var amount = project_sum.toFixed(2) + ' ' + currency;
			console.log('payment amount: ' + text);
			if (is_uk_vat_regist) {
				amount += ' VAT inclusive';
			}
			expect(text).toEqual(amount);
		});
		browser.wait(EC.elementToBeClickable(pay.request_pay_table_lnk.get(0)), 5000, 'btn request payment is not clickable');
		pay.request_pay_table_lnk.get(0).click();
	};

	this.get_payment_title = function () {
		pay.request_pay_table_lnk.get(1).getAttribute('title').then(function (text) {
			expect(text).toContain(mes.not_appr_payment);
		});
	};
	var filt_search = function (input_project_id) {
		browser.wait(EC.visibilityOf(pay.input_search), 5000, 'btn request payment is not clickable');
		pay.input_search.clear().sendKeys(input_project_id).sendKeys(protractor.Key.ENTER);
		browser.sleep(1000);
	};
	this.filt_search = filt_search;

	this.partner_approves_requested_pay = function (input_project_id, currency, pay_amount) {
		browser.wait(EC.visibilityOf(com_ele.li_ele.get(0)), 5000, 'link payments is not clickable');
		com_ele.li_ele.get(0).getAttribute('class').then(function (value) {
			console.log(value);
		});
		filt_search(input_project_id);

		//get project number
		comact.get_table_element(2, 0).then(function (text) {
			console.log('project number for payment: ' + text);
			expect(text).toContain(input_project_id);
		});

		//get payment amount
		comact.get_table_element(3, 0).then(function (text) {
			var amount = text.substring(0, text.indexOf(currency));
			console.log('payment ammount: ' + amount);
			expect(Number(amount).toFixed(2)).toEqual(Number(pay_amount).toFixed(2));
		});
		browser.wait(EC.elementToBeClickable(pay.approve_payment_lnk.get(0)), 5000, 'btn request payment is not clickable');
		pay.approve_payment_lnk.get(0).click();
	};
	this.view_pay_account = function () {
		browser.wait(EC.elementToBeClickable(pay.pay_account), 5000, 'link payment accounts is not clickable');
		pay.pay_account.click();
	};

	this.view_proc_payments = function () {
		browser.wait(EC.elementToBeClickable(pay.proc_pay), 5000, 'link payment accounts is not clickable');
		pay.proc_pay.click();
	};
	//can be used up to 5 cards:
	this.add_pay_account = function () {
		browser.wait(EC.elementToBeClickable(pay.apply_btn), 5000, 'apply btn is not clickable');
		pay.apply_btn.click();
	};

	//fill credit card details:
	this.fill_card_det = function (input_card_number, input_ex_mo, input_ex_year, input_cvc) {
		var card_fields = [];
		for (i = 1; i < 4; i++) {
			var card_field = element.all(by.xpath('//*[@id="payment-form"]/ul/li[' + i + ']/input'));
			card_fields.push(card_field);
		}
		card_fields[0].sendKeys(input_card_number);
		card_fields[1].get(0).sendKeys(input_ex_mo);
		card_fields[1].get(1).sendKeys(input_ex_year);
		card_fields[2].sendKeys(input_cvc);
		browser.wait(EC.elementToBeClickable(pay.submit_card), 5000, 'btn submit a card is not clickable');
		pay.submit_card.click();
	};

	this.delete_card = function () {
		get_cards_nb().then(function (count) {
			if (count != 0) {
				console.log('number of found cards: ' + count);
				browser.wait(EC.elementToBeClickable(pay.delete_card.get(0)), 5000, 'link payment accounts is not clickable');
				pay.delete_card.each(function (item) {
					item.click();
					browser.sleep(2000);
				});
			}
		});
	};
	//count cards:
	var get_cards_nb = function () {
		return pay.credit_card_list.count();
	};
	this.get_cards_nb = get_cards_nb;

	var set_default_card = function (totalCount, currentCount) {
		console.log('totalcount: ' + totalCount);

		if (currentCount < totalCount) {
			var index = currentCount + 1;
			console.log('index ' + index);
			var path = '//ul/li[' + index + ']/div/a[1]';
			return element(by.xpath(path)).isDisplayed().then(function (display) {
				if (display) {
					console.log('btn set default is visible, current nb: ' + currentCount);
					console.log('show xpath: ' + path);
					element(by.xpath(path)).click();
					browser.wait(EC.invisibilityOf(element(by.xpath(path))), 5000, 'btn set default is still displayed');
				} else {
					currentCount++;
					console.log('go to the next element');
					set_default_card(totalCount, currentCount++);
				}
			});
		} else {
			console.log('all cards do not have btn set default');
			return false; //if element not present after Max count reached.
		}
	};
	this.set_default_card = set_default_card;

	this.set_banktransfer = function (isOn, index) {
		pay.bank_transfer.getAttribute('checked').then(function (result) {
			if (!result && isOn || result && !isOn) {
				pay.bank_transfer.click();
			}
			//if checked and on or unchecked and off do nothing
			if (isOn) {
				browser.wait(EC.elementToBeSelected(pay.bank_transfer), 5000, 'bank transfer is not still selected');
			}
			else {
				browser.wait(EC.not(EC.elementToBeSelected(pay.bank_transfer)), 5000, 'bank transfer is not still selected');
			}
		});
	};

	this.user_view_proc_pay = function (input_project_id, currency, pay_amount, input_member_id, part_status, memb_status, isMember) {
		filt_search(input_project_id);
		//get project number
		comact.get_table_element(2, 0).then(function (text) {
			console.log('project number for payment: ' + text);
			expect(text).toContain(input_project_id);
		});

		//get payment amount
		comact.get_table_element(3, 0).then(function (text) {
			expect(text).toEqual(pay_amount.toFixed(2) + ' ' + currency);
		});

		//get member id
		if(!isMember){
			comact.get_table_element(4, 0).then(function (text) {
				var member_id = text.replace(/[^\d.]/g, '');
				console.log('member id: ' + member_id);
				expect(Number(member_id)).toEqual(input_member_id);
			});
		}
		//get partner payment status
		comact.get_table_element(5, 0).then(function (text) {
			expect(text).toEqual(part_status);
		});
		if(!isMember) {
			//get partner payment status
			comact.get_table_element(6, 0).then(function (text) {
				expect(text).toEqual(memb_status);
			});
		}
	};
	this.apply_fn = function () {
		browser.wait(EC.elementToBeClickable(pay.apply_pay.get(0)), 5000, 'btnapply is not clickable');
		pay.apply_pay.get(0).click();
		pay.apply_pay.get(0).click();
	};
	this.apply_add_member_acc = function (index) {
		browser.wait(EC.elementToBeClickable(pay.member_add_acc.get(index)), 5000, 'btnapply is not clickable');
		pay.member_add_acc.get(index).click();
	};

	this.set_pay_transfer = function () {
		browser.wait(EC.visibilityOf(pay.pay_iframe_transfer), 10000, 'payoneer form is not visible');
	};
	this.set_pay_card = function () {
		browser.wait(EC.visibilityOf(pay.pay_iframe_card), 12000, 'payoneer form is not visible');
	};
};
module.exports = PaymentActions;