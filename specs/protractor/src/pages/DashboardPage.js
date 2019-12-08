var DashboardPage = function() {

	//profile link
	var prof_lnk = element(by.linkText('PROFILE'));
	this.prof_lnk = prof_lnk;

	//projects link
	var proj_lnk = element(by.linkText('PROJECTS'));
	this.proj_lnk = proj_lnk;

	//payments link
	var payments_lnk = element(by.linkText('PAYMENTS'));
	this.payments_lnk = payments_lnk;

	//invoice link
	var invoice_lnk = element(by.linkText('Invoices'));
	this.invoice_lnk = invoice_lnk;

	//link to dashboard
	var dash_lnk = element(by.linkText('DASHBOARD'));
	this.dash_lnk = dash_lnk;

	//link to interview
	var interview_lnk = element(by.linkText('Interviews'));
	this.interview_lnk = interview_lnk;

	//link to how it works page
	var how_works = element(by.linkText('How it works'));
	this.how_works = how_works;

	//link to request a payment
	var req_pay = element(by.linkText('Request Payment'));
	this.req_pay = req_pay;

	//link to payment account
	var paym_account = element(by.linkText('Payment Accounts'));
	this.paym_account = paym_account;

	//link to open project
	var open_proj = element(by.linkText('Open Projects - Search & Apply'));
	this.open_proj = open_proj;

	//link to mailbox
	var mailbox = element(by.partialLinkText('Mailbox'));
	this.mailbox = mailbox;

	//link to post in a blog
	var submit_blogpost = element(by.linkText('Submit a blog post'));
	this.submit_blogpost = submit_blogpost;

	//member id
	var member_id = element(by.css('.member-dashboard-userid'));
	this.member_id = member_id;

	//how it works close button
	var close_how_works = element(by.xpath('//div[@id="how-it-works-modal"]/descendant::button[text()="Close"]'));
	this.close_how_works = close_how_works;

	//how it works close button
	var close_x = element(by.xpath('//button[@class="close"]'));
	this.close_x = close_x;
};
module.exports = DashboardPage;