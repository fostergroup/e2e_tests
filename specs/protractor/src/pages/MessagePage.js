var MessagePage = function () {
	//inbox messages
	var inbox_msg = element(by.partialLinkText('Inbox'));
	this.inbox_msg = inbox_msg;

	//inbox messages
	var sent_msg = element(by.partialLinkText('Sent'));
	this.sent_msg = sent_msg;

	//new message btn
	var compose_btn = element(by.id('new_message_button'));
	this.compose_btn = compose_btn;

	//subject message input
	var subj_input = element(by.id('message_subject'));
	this.subj_input = subj_input;

	//message input
	var message_text = element(by.name('message_content'));
	this.message_text = message_text;

	//btn send
	var btn_send = element(by.xpath('//button[@class="send_button"]'));
	this.btn_send = btn_send;

	//inbox message:
	var mess = element.all(by.xpath('//div[contains(@class, "unread")]/a[contains(@href, "member/messages/inbox")]'));
	this.mess = mess;

	//close mes dialog:
	var close_btn = element(by.xpath('//a[@class="btn-close"]'));
	this.close_btn = close_btn;

	//reply btn
	var reply_btn = element(by.id('reply_message_button'));
	this.reply_btn = reply_btn;
};
module.exports = MessagePage;