var MessagePage = require('../pages/MessagePage.js');
var mes = new MessagePage();

var CommonActions = require('../actions/CommonActions.js');
var comact = new CommonActions();

var EC = protractor.ExpectedConditions;

var MessageActions = function () {
	//view inbox:
	this.view_inbox = function () {
		browser.wait(EC.elementToBeClickable(mes.inbox_msg), 5000, 'link inbox messages is not clickable');
		mes.inbox_msg.click();
		//check url and active link:
		browser.wait(EC.urlContains('inbox'), 5000, 'url is not as expected, expect inbox');
		mes.inbox_msg.getAttribute('class').then(function (value) {
			expect(value).toContain('active');
		})
	};

	this.view_sent = function () {
		browser.wait(EC.elementToBeClickable(mes.sent_msg), 5000, 'link sent messages is not clickable');
		mes.sent_msg.click();
		//check url and active link:
		browser.wait(EC.urlContains('sent'), 5000, 'url is not as expected, expect inbox');
		mes.sent_msg.getAttribute('class').then(function (value) {
			expect(value).toContain('active');
		})
	};

	this.compose_btn_fn = function () {
		browser.wait(EC.elementToBeClickable(mes.compose_btn), 5000, 'btn compose is not clickable');
		mes.compose_btn.click();
	};
	this.fill_msg = function (member_id, input_subj, input_mes) {
		if(member_id!=null){
			comact.fill_drop_input(member_id, 0);
		}
		if(input_subj!=null){
			mes.subj_input.sendKeys(input_subj);
		}
		if(input_mes!=null){
			mes.message_text.sendKeys(input_mes);
		}
	};

	this.send_msg = function () {
		browser.wait(EC.elementToBeClickable(mes.btn_send), 5000, 'btn send is not clickable');
		mes.btn_send.click();
	};
	this.view_inbox_nb = function () {
		browser.wait(EC.elementToBeClickable(mes.inbox_msg), 5000, 'inbox msg link is not clickable');
		return mes.inbox_msg.getText();
	};
	this.read_mes = function (index) {
		browser.wait(EC.elementToBeClickable(mes.mess.get(index)), 5000, 'msg link is not clickable');
		mes.mess.get(index).click();
	};

	this.reply = function () {
		browser.wait(EC.elementToBeClickable(mes.reply_btn), 5000, 'reply btn is not clickable');
		mes.reply_btn.click();
	};
	this.close_msg = function () {
		browser.wait(EC.elementToBeClickable(mes.close_btn), 5000, 'close dialog btn is not clickable');
		mes.close_btn.click();
		browser.wait(EC.invisibilityOf(mes.close_btn), 5000, 'close dialog btn is still visible');
	};
};
module.exports = MessageActions;