var Dashboard = require('../../src/pages/DashboardPage.js');
var EC = protractor.ExpectedConditions;
var skill = ['Debian'];
var DashboardActions = require('../../src/actions/DashboardActions.js');
var ProfileActions = require('../../src/actions/ProfileActions.js');
var SkillsActions = require('../../src/actions/SkillsActions.js');
var LoginActions = require('../../src/actions/LoginActions.js');
var Credentials = require('../../src/credentials.js');

describe('Add skills', function () {
    var skills_set;
    var dashact = new DashboardActions();
    var profact = new ProfileActions();
    var skillact = new SkillsActions();
    var loginact = new LoginActions();
    var cred = new Credentials();

    // Open tranformify
    beforeAll(function () {
        browser.ignoreSynchronization = true;
        browser.get(browser.baseUrl);
        loginact.click_login(true);
        loginact.log_in(cred.member_vat_uk_email, cred.pswd);
        dashact.view_prof();
        profact.view_skills();
    });
    it('Adding skill if there is no and remove if there are skills', function () {
        skillact.get_skills_text().then(function (text) {
            skills_set = text.substring((text.indexOf('Skills') + 7), text.indexOf('Edit') - 1);
        }).then(function () {
            if (skill.length >= 0) {
                //skill is found, should delete skills
                console.log('There are set skills');
                skillact.remove_skills_fn();
                skillact.get_skills_text().then(function (text) {
                    expect(text.substring((text.indexOf('Skills') + 7), text.indexOf('Edit') - 1)).toContain('not set');
                });
                browser.sleep(1000);
                skillact.add_skills_fn(skill);
                skillact.get_skills_text().then(function (text) {
                    expect(text.substring((text.indexOf('Skills') + 7), text.indexOf('Edit') - 1)).toContain(skill);
                });
            } else {
                console.log('there is no set skills');
                skillact.add_skills_fn(skill);
                skillact.get_skills_text().then(function (text) {
                    expect(text.substring((text.indexOf('Skills') + 7), text.indexOf('Edit') - 1)).toContain(skill);
                });
                skillact.remove_skills_fn();
                skillact.get_skills_text().then(function (text) {
                    expect(text.substring((text.indexOf('Skills') + 7), text.indexOf('Edit') - 1)).toContain('not set');
                });
            }
        });
    });

    it('Check close button when adding a skill', function () {
        skillact.get_skills_text().then(function (text) {
            skills_set = text.substring((text.indexOf('Skills') + 7), text.indexOf('Edit') - 1);
        });
        skillact.edit_fn(0);
        skillact.close_btn_fn(skill);
        skillact.get_skills_text().then(function (text) {
            expect(text.substring((text.indexOf('Skills') + 7), text.indexOf('Edit') - 1)).toEqual(skills_set);
        });
        loginact.log_out();
    });
});