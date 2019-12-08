var SocialPage = function() {
	//btn total images linkedin
	var linked_share_img_nb = element(by.xpath('//*[@id="yui-gen1"]/descendant::span[@class="total"]'));
	this.linked_share_img_nb = linked_share_img_nb;

	//btn login linkedin
	var linked_login = element(by.id('session_key-login'));
	this.linked_login = linked_login;

	//btn pswd linkedin
	var linked_pswd = element(by.id('session_password-login'));
	this.linked_pswd = linked_pswd;

	//btn next linkedin
	var next_img = element(by.xpath('//button[@class = "next"]'));
	this.next_img = next_img;

	//google
	var google_login = element(by.id('Email'));
	this.google_login = google_login;

	var google_next = element(by.id('next'));
	this.google_next = google_next;

	var pswd_google = element(by.id('Passwd'));
	this.pswd_google = pswd_google;

	var sign_in_google = element(by.id('signIn'));
	this.sign_in_google = sign_in_google;

	var google_auth = element(by.id('submit_approve_access'));
	this.google_auth = google_auth;

	var github_login = element(by.name('login'));
	this.github_login = github_login;

	var github_pswd = element(by.name('password'));
	this.github_pswd = github_pswd;

	var sign_in_github = element(by.name('commit'));
	this.sign_in_github = sign_in_github;

	var github_auth = element(by.name('authorize'));
	this.github_auth = github_auth;

	var fb_email = element(by.id('email'));
	this.fb_email = fb_email;

	var fb_pswd = element(by.name('pass'));
	this.fb_pswd = fb_pswd;

	var sign_in_fb = element(by.id('loginbutton'));
	this.sign_in_fb = sign_in_fb;

	var fb_auth = element(by.name('__CONFIRM__'));
	this.fb_auth = fb_auth;

	var fb_input_deb = element(by.name('q'));
	this.fb_input_deb = fb_input_deb;

	var fb_fetch = element(by.xpath('//*[@id="u_0_4"]/button'));
	this.fb_fetch = fb_fetch;

	var fb_img = element(by.css('.unclickable'));
	this.fb_img = fb_img;
};
module.exports = SocialPage;