var SocialProfilePage = require('../pages/SocialProfilePage.js');
var spro = new SocialProfilePage();

var CommonElementsPage = require('../pages/CommonElementsPage.js');
var com_ele = new CommonElementsPage();

var Helper = require('../helper.js');
var helper = new Helper();

var CommonActions = require('../actions/CommonActions.js');
var comact = new CommonActions();
var EC = protractor.ExpectedConditions;

var SocialProfileActions = function () {
//click btn add profile

    this.fill_social_pr_form = function (input_provider, input_url) {
        browser.wait(EC.elementToBeClickable(spro.add_profile_btn), 5000, 'edit page is not loaded, add button is not clickable');
		
        spro.add_profile_btn.click();
        //click on dropdown list to select provider
        comact.fill_drop_input(input_provider, 0);
        //url input
        browser.wait(EC.visibilityOf(spro.social_profile_url), 5000, 'input url is not active');
        spro.social_profile_url.clear();
        if (input_provider != null) {
            spro.social_profile_url.sendKeys(input_url);
        }
    };

    this.remove_sp_fn = function () {
        var count_before,
            count_after;
        count_btn_fn().then(function (count) {
            console.log('edit btn count: ' + count);
            count_before = count;
            if (count != 0) {
                for (i = 0; i < count; i++) {
                    console.log('again count: ' + count);
                    console.log('current index: ' + i);
                    browser.sleep(1000);
                    spro.edit_btn.get(0).click();
                    spro.check_box.click();
                    spro.edit_btn.get(0).click();
                }
            }
            else {
                spro.social_prof.getText().then(function (text) {
                    console.log('text from social profiles: ' + text);
                    expect(text).toContain('not set');
                });
            }
        });
        browser.sleep(1000);
        spro.edit_btn.count().then(function (count) {
            console.log('edit btn count: ' + count);
            count_after = count;
            expect(count_after).toEqual(0);
        });
    };
    var count_btn_fn = function () {
        return spro.edit_btn.count();
    };
    this.count_btn_fn = count_btn_fn;

    this.check_share_btns = function () {
		browser.wait(EC.visibilityOf(spro.share_fb_proj), 5000, 'fb share is not visible');
		browser.wait(EC.visibilityOf(spro.share_ln_proj), 5000, 'ln share is not visible');
		browser.wait(EC.visibilityOf(spro.share_tw_proj), 5000, 'tw share is not visible');
	};
};
module.exports = SocialProfileActions;