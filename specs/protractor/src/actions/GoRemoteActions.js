var GoRemotePage = require('../pages/GoRemotePage.js');
var go = new GoRemotePage();

var Params = require('../params.js');
var param = new Params();

var EC = protractor.ExpectedConditions;
var regist_url = '/member/login';
var base_url = param.base_url;

var GoRemoteActions = function () {
	this.register_fn = function (isRegistered) {
		if (isRegistered) {
			browser.wait(EC.stalenessOf(go.regist), 5000, 'link register is visible');
		}
		else {
			browser.wait(EC.elementToBeClickable(go.regist), 5000, 'register link is not clickable');
			go.regist.click();
			expect(browser.getCurrentUrl()).toContain('/member/register');
		}
	};
	this.read_more = function (index) {
		browser.wait(EC.elementToBeClickable(go.read_more_lnk.get(index)), 5000, 'link read more is not clickable');
		go.read_more_lnk.get(index).click();
		browser.wait(EC.urlContains('/campaign/goremote/more'), 5000, 'link read more is not clickable');
		expect(go.read_more_lnk.get(index).isPresent()).toBeFalsy();
	};
	this.check_links = function (array) {
		var links = [];
		go.partner_lnk.each(function (item) {
			item.getAttribute('href').then(function (text) {
				console.log('the link is: ' + text);
				links.push(text);
			});
		}).then(function () {
			expect(links.sort()).toEqual(array.sort());
		});
	};
	this.goremote_fn = function () {
		browser.wait(EC.elementToBeClickable(go.goremote), 5000, 'link goremote is not clickable');
		go.goremote.click();
	};
	this.regist_sign_in = function (isRegistered) {
		browser.wait(EC.elementToBeClickable(go.regist_or_sign), 5000, 'link goremote is not clickable');
		go.regist_or_sign.click();
		browser.sleep(1000);
		if (isRegistered) {
			//check that the dashboard is displayed:
			expect(browser.getCurrentUrl()).toContain('/member/dashboard');
		}
		else {
			//registration member page is visible
			expect(browser.getCurrentUrl()).toContain(regist_url);
		}
	};
	this.navig_to_goremote = function (is_first, isRegistered) {
		browser.wait(EC.elementToBeClickable(go.nav_to_camp), 5000, 'link goremote is not clickable');
		go.nav_to_camp.click();
		browser.sleep(1000);
		if (is_first) {
			var url = base_url + '/blog/goremote';
			console.log('currect url: ' + url);
			expect(browser.getCurrentUrl()).toContain('/blog/goremote');
		}
		else if (!is_first && !isRegistered) {
			expect(browser.getCurrentUrl()).toContain('/member/login');
		}
		else {
			expect(browser.getCurrentUrl()).toContain('/member/dashboard');
		}
	};
	this.navig_to_vote = function (isRegistered) {
		browser.wait(EC.elementToBeClickable(go.vote), 5000, 'link goremote is not clickable');
		go.vote.click();
		if (isRegistered) {
			//check that the dashboard is displayed:
			expect(browser.getCurrentUrl()).toContain('/blog/goremote');
		}
		else {
			//registration member page is visible
			expect(browser.getCurrentUrl()).toContain(regist_url);
		}
	};
	this.send_script = function (index, isMember) {
		if (isMember || isMember == null) {
			browser.wait(EC.elementToBeClickable(go.send_scr.get(index)), 5000, 'link send script is not clickable');
			go.send_scr.get(index).click();
			if (isMember == null) {
				//expect partner to to see the link
				browser.wait(EC.stalenessOf(go.send_scr.get(index)), 5000, 'link send script is not clickable');
			}
			else {
				//check that the dashboard is displayed:
				browser.wait(EC.urlContains('/campaign/goremote/submit'), 5000, 'url is not as expected');
				expect(browser.getCurrentUrl()).toContain('/campaign/goremote/submit');
			}
		}
		else {
			expect(go.send_scr.get(index).isPresent()).toBeFalse();
		}
	};
	this.submit_lnk = function (isRegistered) {
		browser.wait(EC.elementToBeClickable(go.submit_link), 5000, 'link submit a script is not clickable');
		go.submit_link.click();
		if (isRegistered) {
			//check that the dashboard is displayed:
			expect(browser.getCurrentUrl()).toContain('/campaign/goremote/submit');
		}
		else {
			//registration member page is visible
			browser.wait(EC.urlContains(regist_url), 5000, 'url is not as expected');
		}
	};
	this.check_email_lnk = function () {
		browser.wait(EC.elementToBeClickable(go.mail_link), 5000, 'link email is not clickable');
		go.mail_link.getAttribute('href').then(function (value) {
			expect(value).toEqual('mailto:office@transformify.org');
		});
	};
};
module.exports = GoRemoteActions;