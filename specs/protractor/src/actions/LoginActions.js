var LoginPage = require('../pages/LoginPage.js');
var login = new LoginPage();

var HomePage = require('../pages/HomePage.js');
var home = new HomePage();

var SocialPage = require('../pages/SocialPage.js');
var soc = new SocialPage();

var Credentials = require('../credentials.js');
var cred = new Credentials();

var Helper = require('../helper.js');
var helper = new Helper();

var CommonElementsPage = require('../pages/CommonElementsPage.js');
var com_ele = new CommonElementsPage();

var CommonActions = require('../actions/CommonActions.js');
var comact = new CommonActions();

var EC = protractor.ExpectedConditions;

var LoginActions = function () {
	//function click log in as a member btn
	this.log_in = function (log, pass) {
		browser.wait(EC.elementToBeClickable(login.ws_login), 5000, 'element login is not visible');
		if (log != null) {
			login.ws_login.clear().sendKeys(log);
		}
		expect(login.ws_pswd.isPresent()).toBeTruthy();
		if (pass != null) {
			login.ws_pswd.sendKeys(pass);
		}
		comact.submit_fn();
	};

	this.click_login = function (isMember) {
		browser.sleep(3000);
		home.butterBrott.isDisplayed().then(function (result) {
			console.log('visibility of menu: '+ result);
			if(result){
				browser.executeScript(helper.scrollIntoView, home.butterBrott);
				home.butterBrott.click();
				browser.sleep(2000);
			}
		});
		home.profileLink.isPresent().then(function (isDisplayed) {
			if (isDisplayed) {
				log_out();
			}
		});
		home.login.isPresent().then(function (result) {
			if(result){
				browser.actions().mouseMove(home.login).perform();
			}
		});
		browser.sleep(4000);
		if (isMember) {
			browser.wait(EC.elementToBeClickable(login.member_sign_lnk), 7000, 'element login is not clickable');
			login.member_sign_lnk.click();
		}
		else {
			browser.wait(EC.elementToBeClickable(login.partner_sign_lnk), 7000, 'element login is not clickable');
			login.partner_sign_lnk.click();
		}
		browser.sleep(1000);
	};

	var log_out = function () {
		home.butterBrott.isDisplayed().then(function (result) {
			console.log('visibility of menu: '+ result);
			if(result){
				browser.executeScript(helper.scrollIntoView, home.butterBrott);
				home.butterBrott.click();
			}
		});
		browser.wait(EC.visibilityOf(home.profileLink), 5000, 'element login is not visible');
		home.profileLink.click();
		browser.wait(EC.visibilityOf(home.signOut), 5000, 'element login is not visible');
		home.signOut.click();
		home.butterBrott.isPresent().then(function (result) {
			console.log('visibility of menu: '+ result);
			if(!result){
				browser.wait(EC.visibilityOf(home.login), 7000, 'element login is not visible');			}
		});

	};
	this.log_out = log_out;

	this.sign_up = function () {
		browser.wait(EC.elementToBeClickable(login.create_member_link), 5000, 'element login is not visible');
		login.create_member_link.click();
	};

	this.fill_profile_fn = function (input_name, input_surname, input_email, input_pswd, input_repeat_pswd, input_sc_q, input_sc_answer,
									 input_c_name, input_address, input_url, input_indprofile) {
		browser.wait(EC.visibilityOf(login.ws_pswd), 5000, 'element name is not visible');
		if (input_name != null) {
			login.name.clear().sendKeys(input_name);

		}
		if (input_surname != null) {
			login.surname.clear().sendKeys(input_surname);

		}
		if (input_email != null) {
			login.email.clear().sendKeys(input_email);
		}
		if (input_pswd != null) {
			login.ws_pswd.clear().sendKeys(input_pswd);
		}
		if (input_repeat_pswd != null) {
			login.rep_pswd.sendKeys(input_repeat_pswd);
		}
		if (input_sc_q != null) {
			comact.fill_drop_input(input_sc_q, 0);
		}
		if (input_sc_answer != null) {
			login.sec_answer.clear().sendKeys(input_sc_answer);
		}
		if (input_c_name != null) {
			login.comp_name.clear().sendKeys(input_c_name);
		}
		if (input_address != null) {
			login.comp_add.clear().sendKeys(input_address);
		}
		if (input_url != null) {
			login.comp_url.clear().sendKeys(input_url);
		}
		if (input_indprofile != null) {
			login.ind_profile.clear().sendKeys(input_indprofile);
		}
	};
	this.partner_welcome_fn = function () {
		expect(login.welcome_msg.getText()).toContain('Successful');
	};
	this.get_comp_name = function () {
		browser.wait(EC.visibilityOf(login.comp_name), 5000, 'element compname is not visible');
		return login.comp_name.getAttribute('value');
	};

	this.submit_form = function () {
		browser.wait(EC.elementToBeClickable(login.reg_submit), 5000, 'element submit is not clickable');
		login.reg_submit.click();
	};

	this.linked_call = function (pswd_input, btn_clicked) {
		browser.wait(EC.elementToBeClickable(login.btnLinkedin), 5000, 'element login is not clickable');
		login.btnLinkedin.click();
		login.linked_login.isPresent().then(function (isPresent) {
			if(isPresent){
				login.linked_login.sendKeys(cred.linked_login);
				login.linked_password.sendKeys(pswd_input);
				//which btn is clicked
				if (btn_clicked != null) {
					expect(btn_clicked.isPresent()).toBeTruthy();
					btn_clicked.click();
				}
			}
		});
	};
	this.google_call = function (pswd_input) {
		expect(login.google_login.isPresent()).toBeTruthy();
		// log in credentials
		login.google_login.click();
		browser.wait(EC.visibilityOf(soc.google_login), 5000, 'element login is not visible');
		soc.google_login.sendKeys(cred.google_login);
		soc.google_next.click();

		browser.wait(EC.visibilityOf(soc.pswd_google), 5000, 'Element password is not visible');
		soc.pswd_google.sendKeys(pswd_input);
		soc.sign_in_google.click();
		soc.google_auth.isPresent().then(function (elem) {
			if (elem) {
				soc.google_auth.click();
			}
			else {
				console.log('no submit was requested by google');
			}
		});
	};

	this.github_call = function (pswd_input) {
		browser.wait(EC.elementToBeClickable(login.github_login_btn), 5000, 'Element login github is not clickable');
		// log in credentials
		login.github_login_btn.click();
		browser.wait(EC.visibilityOf(soc.github_login), 5000, 'Element login github is not visible');
		soc.github_login.sendKeys(cred.github_login);
		soc.github_pswd.sendKeys(pswd_input);
		browser.wait(EC.elementToBeClickable(soc.sign_in_github), 5000, 'Element sign in github is not clickable');
		soc.sign_in_github.click();

		//access to application
		soc.github_auth.isPresent().then(function (elem) {
			if (elem) {
				soc.github_auth.click();
			}
			else {
				console.log('no submit was requested by github');
			}
		});
	};

	this.fb_call = function (pswd_input) {
		browser.wait(EC.elementToBeClickable(login.fb_login), 5000, 'element fb login is not clickable');
		// log in credentials
		login.fb_login.click();
		soc.fb_email.isPresent().then(function (isPresent) {
			if(isPresent){
				soc.fb_email.sendKeys(cred.fb_login);
				soc.fb_pswd.sendKeys(pswd_input);
				soc.sign_in_fb.click();
				//access to application
				soc.fb_auth.isPresent().then(function (elem) {
					if (elem) {
						soc.fb_auth.click();
					}
					else {
						console.log('no submit was requested by fbs');
					}
				});
			}
		});
	};
	this.cancel_reg_fn = function () {
		browser.wait(EC.elementToBeClickable(login.cancel_reg), 10000, 'element cancel registration is not clickable');
		login.cancel_reg.click();
	};

	this.to_agree = function (agree) {
		login.tc_agree.getAttribute('checked').then(function (result) {
			if (result && !agree || !result && agree) {
				com_ele.check_box.first().click();
			}
			if (agree) {
				browser.wait(EC.elementToBeSelected(login.tc_agree), 10000, 'terms and conditions are not selected');
			}
			else {
				browser.wait(EC.not(EC.elementToBeSelected(login.tc_agree)), 10000, 'terms and conditions are still selected')
			}
		})
	};
	this.go_to_blog = function () {
		browser.wait(EC.elementToBeClickable(home.blog), 10000, 'link blog is not clickable');
		home.blog.click();
	};
	this.fb_deb_login = function (pswd_input) {
		browser.wait(EC.visibilityOf(soc.fb_email), 5000, 'element fb login is not visible');
		soc.fb_email.sendKeys(cred.fb_login);
		soc.fb_pswd.sendKeys(pswd_input).sendKeys(protractor.Key.ENTER);
	};
	this.reset_pswd = function () {
		browser.wait(EC.elementToBeClickable(login.reset_pswd), 10000, 'link reset is not clickable');
		login.reset_pswd.click();
	};
	this.set_email = function (input) {
		browser.wait(EC.visibilityOf(login.email), 5000, 'element email is not visible');
		login.email.clear();
		if (input!=null){
			login.email.sendKeys(input);
		}
		reset();
	};
	var reset = function () {
		browser.wait(EC.elementToBeClickable(login.reset_btn), 10000, 'link reset is not clickable');
		login.reset_btn.click();
	};
	this.reset = reset;
};
module.exports = LoginActions;