/**
 * Mailinator page elements
 */
var MailinatorPage = function() {
	//inbox field
	var inbox = element(by.id('inboxfield'));
	this.inbox = inbox;

	//email
	var email_lnk = element(by.className('innermail ng-binding'));
	this.email_lnk = email_lnk;


	//reset pswd link
	var reset_lnk = element(by.partialLinkText('reset-password'));
	this.reset_lnk = reset_lnk;
};
module.exports = MailinatorPage;