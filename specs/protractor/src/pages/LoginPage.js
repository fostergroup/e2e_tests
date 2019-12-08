var LoginPage = function () {

	var ws_login = element(by.id('username'));
	this.ws_login = ws_login;

	var ws_pswd = element(by.id('password'));
	this.ws_pswd = ws_pswd;

	var sign_in_ws = element(by.id('login-button-submit'));
	this.sign_in_ws = sign_in_ws;

	//btn on home page login as a member;
	var btnMember = element.all(by.linkText('Member Sign-In'));
	this.btnMember = btnMember;

	//linked in btn
	var btnLinkedin = element(by.xpath("//a[contains(@class, 'btn-linkedin')]"));
	this.btnLinkedin = btnLinkedin;

	//linkedin login
	var linked_login = element(by.name('session_key'));
	this.linked_login = linked_login;

	//linked_in pswd
	var linked_password = element(by.name('session_password'));
	this.linked_password = linked_password;

	//linkedin submit btn
	var btnLogLinked = element(by.name('authorize'));
	this.btnLogLinked = btnLogLinked;

	//create member profile
	var create_member_link = element(by.xpath("//a[contains(@href, 'register')]"));
	this.create_member_link = create_member_link;

	// deny access to the user
	var btn_cancel_linked = element(by.className('cancel'));
	this.btn_cancel_linked = btn_cancel_linked;

	//google login
	var google_login = element(by.xpath("//a[contains(@href, 'google')]"));
	this.google_login = google_login;

	//fb btn login
	var fb_login = element(by.xpath("//a[contains(@href, 'facebook')]"));
	this.fb_login = fb_login;

	//github login btn
	var github_login_btn = element(by.xpath("//a[contains(@href, 'github')]"));
	this.github_login_btn = github_login_btn;

	//member sign in
	var member_sign_lnk = element(by.linkText('MEMBER SIGN-IN'));
	this.member_sign_lnk = member_sign_lnk;

	//partner sign in
	var partner_sign_lnk = element(by.linkText('PARTNER SIGN-IN'));
	this.partner_sign_lnk = partner_sign_lnk;

	//create member profile
	/*form fields*/
	var name = element(by.id('name'));
	this.name = name;

	var surname = element(by.id('surname'));
	this.surname = surname;

	var email = element(by.id('email'));
	this.email = email;

	var reset_btn = element(by.id('reset-submit'));
	this.reset_btn = reset_btn;

	var rep_pswd = element(by.id('confirm-password'));
	this.rep_pswd = rep_pswd;

	//question
	var sec_question = element(by.id('security-question'));
	this.sec_question = sec_question;

	// security answer
	var sec_answer = element(by.id('security-answer'));
	this.sec_answer = sec_answer;

	var q_input = element(by.css('.select2-input'));
	this.q_input = q_input;

	var sec_q = element(by.xpath('//*[@id="select2-results-1"]/li[2]'));
	this.sec_q = sec_q;

	var reg_submit = element(by.id('register-submit'));
	this.reg_submit = reg_submit;

	//terms and conditions
	var t_c = element.all(by.linkText('Terms and Conditions'));
	this.t_c = t_c;

	//TODO: fix modal-dialog
	var btn_cancel_tc = element(by.xpath("//button[contains(text(), 'Cancel')]"));
	this.btn_cancel_tc = btn_cancel_tc;

	var btn_agree_tc = element(by.xpath("//button[contains(text(), 'agree')]"));
	this.btn_agree_tc = btn_agree_tc;

	var close_t_c = element(by.css('.close'));
	this.close_t_c = close_t_c;

	//partner fileds:
	var comp_name = element(by.id('cname'));
	this.comp_name = comp_name;


	var comp_add = element(by.name('transformify_partner_registration[address]'));
	this.comp_add = comp_add;

	var welcome_msg = element(by.xpath('//h6'));
	this.welcome_msg = welcome_msg;

	var comp_url = element(by.name('transformify_partner_registration[website_url]'));
	this.comp_url = comp_url;

	var ind_profile = element(by.name('transformify_partner_registration[industry_profile]'));
	this.ind_profile = ind_profile;

	//cancel registration
	var cancel_reg = element(by.id('register-cancel'));
	this.cancel_reg = cancel_reg;

	var tc_agree = element(by.xpath("//input[@id = 'agreement']"));
	this.tc_agree = tc_agree;

	var reset_pswd = element(by.linkText('Reset it'));
	this.reset_pswd = reset_pswd;
};
module.exports = LoginPage;