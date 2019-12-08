var Credentials = require('../../src/credentials.js');
var DashboardActions = require('../../src/actions/DashboardActions.js');
var LoginActions = require('../../src/actions/LoginActions.js');
var BlogPostActions = require('../../src/actions/BlogPostActions.js');
var CommonActions = require('../../src/actions/CommonActions.js');
var AdminActions = require('../../src/actions/admin/AdminActions.js');
var SocialActions = require('../../src/actions/SocialActions.js');
var SocialPage = require('../../src/pages/SocialPage.js');
var EC = protractor.ExpectedConditions;

var Helper = require('../../src/helper.js');
var Messages = require('../../src/messages.js');
var Params = require('../../src/params.js');

describe('Posting in a blog', function () {
	var dashact = new DashboardActions();
	var loginact = new LoginActions();
	var cred = new Credentials();
	var helper = new Helper();
	var mes = new Messages();
	var blogact = new BlogPostActions();
	var comact = new CommonActions();
	var socact = new SocialActions();
	var par = new Params();
	var adminURL = browser.baseUrl + '/admin';
	var adminact = new AdminActions();
	var post_without_img, post_small_img, post_large_img, admin_post;
	var content = 'This is post content';
	var soc = new SocialPage();
	// Open tranformify
	beforeAll(function () {
		browser.ignoreSynchronization = true;
		browser.get(browser.baseUrl);
	});
	it('A member tries to send empty msg', function () {
		loginact.click_login(true);
		loginact.log_in(cred.member_vat_uk_email, cred.pswd);
		dashact.view_dash();
		dashact.submit_post();
		post_without_img = helper.random_string();
		blogact.post_fn(post_without_img, null, null, null);
		comact.submit_fn();
		blogact.compare_warn_text(mes.empty_field_msg);
	});
	it('A member tries to send non-valid url msg', function () {
		blogact.post_fn(null, par.not_email, null, content);
		comact.submit_fn();
		blogact.compare_warn_text('This value is not a valid URL');
	});
	it('A member tries to send a valid mgs without cover img', function () {
		blogact.post_fn(null, '', null, content);
		comact.submit_fn();
		browser.wait(EC.urlContains('success'), 5000, 'url is not as expected');
		loginact.log_out();
	});
	it('Admin publishes the post', function () {
		browser.get(adminURL);
		loginact.log_in(browser.params.admin.login, browser.params.admin.pswd);
		adminact.blog_fn();
		adminact.blog_post_fn();
		adminact.change_type(5, true);
		adminact.change_type(6, true);
		adminact.log_out();
	});
	it('A member posts new msg with large cover image', function () {
		browser.get(browser.baseUrl);
		loginact.click_login(true);
		loginact.log_in(cred.member_vat_uk_email, cred.pswd);
		dashact.view_dash();
		dashact.submit_post();
		post_large_img = helper.random_string();
		blogact.post_fn(post_large_img, par.largeimg_url, null, content);
		comact.submit_fn();
		browser.wait(EC.urlContains('success'), 5000, 'url is not as expected');
	});
	it('Member views post without image and shares it with linkedin', function () {
		blogact.back_to_blog();
		blogact.show_blogpost(post_without_img);
		browser.getCurrentUrl().then(function (value) {
			console.log('this is current url: ' + value);
			browser.get('https://www.linkedin.com/shareArticle?url=' + value + '?cache=1');
			socact.linked_login(cred.linked_login, cred.pswd);
			browser.sleep(10000);
			soc.linked_share_img_nb.isPresent().then(function (present) {
				browser.takeScreenshot().then(function (png) {
					helper.writeScreenShot(png, helper.screenshot_fn('linked_share_without_img'));
				});
				if (present) {
					socact.view_linked_img_nb().then(function (number) {
						console.log('this is current nb of images: ' + number);
						for (i = 1; i < number; i++) {
							socact.next_linked_img();
							browser.sleep(5000);
							browser.takeScreenshot().then(function (png) {
								helper.writeScreenShot(png, helper.screenshot_fn('linked_share_without_img' + i));
							});
						}
					});
				}
			});
		});
	});
	it('Member shares post without image with fb', function () {
		browser.get(browser.baseUrl);
		loginact.go_to_blog();
		blogact.show_blogpost(post_without_img);
		browser.getCurrentUrl().then(function (value) {
			console.log('this is current url: ' + value);
			browser.get('https://developers.facebook.com/tools/debug/sharing');
			loginact.fb_deb_login(cred.pswd);
			var fb_url = value.substr(value.indexOf('@') + 1, value.length);
			console.log('url after cutting: ' + fb_url);
			socact.fb_debug(fb_url, 'fb_without_image', 0);
		});
		browser.get(browser.baseUrl);
		loginact.log_out();
	});
	it('Admin publishes the post with large image', function () {
		browser.get(adminURL);
		loginact.log_in(browser.params.admin.login, browser.params.admin.pswd);
		adminact.blog_fn();
		adminact.blog_post_fn();
		adminact.change_type(5, true);
		adminact.change_type(6, true);
		adminact.log_out();
	});
	it('A member posts new msg with small cover image', function () {
		browser.get(browser.baseUrl);
		loginact.click_login(true);
		loginact.log_in(cred.member_vat_uk_email, cred.pswd);
		dashact.view_dash();
		dashact.submit_post();
		post_small_img = helper.random_string();
		blogact.post_fn(post_small_img, par.smallimg_url, null, content);
		comact.submit_fn();
		browser.wait(EC.urlContains('success'), 5000, 'url is not as expected');
	});
	it('Member views post with large image', function () {
		blogact.back_to_blog();
		blogact.show_blogpost(post_large_img);
		browser.getCurrentUrl().then(function (value) {
			console.log('this is current url: ' + value);
			browser.get('https://www.linkedin.com/shareArticle?url=' + value + '?cache=1');
			browser.sleep(10000);
			soc.linked_share_img_nb.isPresent().then(function (present) {
				browser.takeScreenshot().then(function (png) {
					helper.writeScreenShot(png, helper.screenshot_fn('linked_share_with_large_img'));
				});
				if (present) {
					socact.view_linked_img_nb().then(function (number) {
						console.log('this is current nb of images: ' + number);
						for (i = 1; i < number; i++) {
							socact.next_linked_img();
							browser.sleep(5000);
							browser.takeScreenshot().then(function (png) {
								helper.writeScreenShot(png, helper.screenshot_fn('linked_share_with_large_img' + i));
							});
						}
					});
				}
			});
		});
	});
	it('Member shares post with large with fb', function () {
		browser.get(browser.baseUrl);
		loginact.go_to_blog();
		blogact.show_blogpost(post_without_img);
		browser.getCurrentUrl().then(function (value) {
			console.log('this is current url: ' + value);
			browser.get('https://developers.facebook.com/tools/debug/sharing');
			var fb_url = value.substr(value.indexOf('@') + 1, value.length);
			console.log('url after cutting: ' + fb_url);
			socact.fb_debug(fb_url, 'fb_with_large_image', 1);
		});
		browser.get(browser.baseUrl);
		loginact.log_out();
	});
	it('Admin publishes the post with small image', function () {
		browser.get(adminURL);
		loginact.log_in(browser.params.admin.login, browser.params.admin.pswd);
		adminact.blog_fn();
		adminact.blog_post_fn();
		adminact.change_type(5, true);
		adminact.change_type(6, true);
		adminact.log_out();
	});
	it('Member views post with small image', function () {
		browser.get(browser.baseUrl);
		loginact.click_login(true);
		loginact.log_in(cred.member_vat_uk_email, cred.pswd);
		loginact.go_to_blog();
		blogact.show_blogpost(post_small_img);
		browser.getCurrentUrl().then(function (value) {
			console.log('this is current url: ' + value);
			browser.get('https://www.linkedin.com/shareArticle?url=' + value + '?cache=1');
			browser.sleep(10000);
			soc.linked_share_img_nb.isPresent().then(function (present) {
				browser.takeScreenshot().then(function (png) {
					helper.writeScreenShot(png, helper.screenshot_fn('linked_share_with_small_img'));
				});
				if (present) {
					socact.view_linked_img_nb().then(function (number) {
						console.log('this is current nb of images: ' + number);
						for (i = 1; i < number; i++) {
							socact.next_linked_img();
							browser.sleep(5000);
							browser.takeScreenshot().then(function (png) {
								helper.writeScreenShot(png, helper.screenshot_fn('linked_share_with_small_img' + i));
							});
						}
					});
				}
			});
		});
	});
	it('Member shares post with large with fb', function () {
		browser.get(browser.baseUrl);
		loginact.go_to_blog();
		blogact.show_blogpost(post_without_img);
		browser.getCurrentUrl().then(function (value) {
			console.log('this is current url: ' + value);
			browser.get('https://developers.facebook.com/tools/debug/sharing');
			var fb_url = value.substr(value.indexOf('@') + 1, value.length);
			console.log('url after cutting: ' + fb_url);
			socact.fb_debug(fb_url, 'fb_with_small_image', 1);
		});
		browser.get(browser.baseUrl);
		loginact.log_out();
	});
	it('Admin publishes the post by himself', function () {
		browser.get(adminURL);
		loginact.log_in(browser.params.admin.login, browser.params.admin.pswd);
		adminact.blog_fn();
		adminact.blog_post_fn();
		adminact.add_new_post();
		admin_post = helper.random_string();
		adminact.fill_post(0, admin_post, '', 'content', true, true);
		adminact.create_and_back();
		adminact.log_out();
	});
	it('View the blog post is visible in blog', function () {
		browser.get(browser.baseUrl);
		loginact.go_to_blog();
		blogact.show_blogpost(admin_post);
	});
});