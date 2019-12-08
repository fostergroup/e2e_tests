/**
 * Created by halina on 10.11.16.
 * Check goremote campaign
 */
var GoRemoteActions = require('../../src/actions/GoRemoteActions.js');
var LoginActions = require('../../src/actions/LoginActions.js');
var Credentials = require('../../src/credentials.js');
var links = [ 'http://bbba.bg/', 'http://eventtrix.com/', 'http://hollyandhugo.com/', 'http://infograffiti.info/', 'http://internationalopenacademy.com/',
	'http://laboratoria.la/en', 'http://londonchamber.co.uk/', 'http://www.bapm.bg/', 'http://www.britcham.cl/business-services', 'http://www.britcham.org.sg/',
	'http://www.economic.bg/',
	'http://www.genashtim.com/', 'http://www.pitchdata.io/', 'http://www.thestudentnomad.com/', 'http://www.trendimi.com/', 'https://www.payoneer.com/' ];

var go = new GoRemoteActions();
var login = new LoginActions();
var cred = new Credentials();

describe('GoRemote campaign check', function () {

    // Open tranformify
    beforeAll(function () {
        browser.ignoreSynchronization = true;
        browser.get(browser.baseUrl);
    });
    it('Check links without registration', function () {
        go.goremote_fn();
        go.register_fn(false);
        browser.navigate().back();
        //check links on the first page:
        go.regist_sign_in(false);
        browser.navigate().back();
        go.navig_to_goremote(true, false);
        browser.navigate().back();
        go.check_links(links);

        for (i = 0; i < 2; i++) {
            go.send_script(i, null);
            browser.navigate().back();
        }
        //check first link read more:
        go.read_more(0);
        browser.navigate().back();
        //check second link read more:
        go.read_more(1);

        //check links on the second page:
        go.send_script(0, null);
        browser.navigate().back();
        go.regist_sign_in(false);
        browser.navigate().back();
        go.navig_to_goremote(false, false);
        browser.navigate().back();
        go.check_links(links);
        go.submit_lnk(false);
        browser.navigate().back();
    });

    it('Check links as a registered member', function () {
        login.click_login(true);
        login.log_in(cred.member_vat_uk_email, cred.pswd);
        go.goremote_fn();
        go.register_fn(true);
        //check links on the first page:
        go.navig_to_goremote(true, true);
        browser.navigate().back();
        go.check_links(links);
        for (i = 0; i < 2; i++) {
            go.send_script(i, true);
            browser.navigate().back();
        }
        //check first link read more:
        go.read_more(0);
        browser.navigate().back();
        //check second link read more:
        go.read_more(1);

        //check links on the second page:
        go.send_script(0, true);
        browser.navigate().back();
        go.regist_sign_in(true);
        browser.navigate().back();
        go.navig_to_goremote(false, true);
        browser.navigate().back();
        go.check_links(links);
        go.submit_lnk(true);
        browser.navigate().back();
        go.check_email_lnk();
        login.log_out();
    });

    it('Check links as a registered partner', function () {
        login.click_login(false);
        login.log_in(cred.part_vat_uk_email, cred.pswd);
        go.goremote_fn();
        go.register_fn(true);
        //check links on the first page:
        go.send_script(0, false);
        go.send_script(1, false);
        go.read_more(0);
        browser.navigate().back();
        go.read_more(1);
        go.send_script(0, false);
        login.log_out();
    });
});