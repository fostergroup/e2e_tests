var SkillsPage = require('../pages/SkillsPage.js');
var skill = new SkillsPage();

var CommonElementsPage = require('../pages/CommonElementsPage.js');
var com_ele = new CommonElementsPage();

var CommonActions = require('../actions/CommonActions.js');
var comact = new CommonActions();

var EC = protractor.ExpectedConditions;

var SkillsActions = function() {

	/*the user edits skills and ser skills*/
	this.add_skills_fn = function(input_skill) {
		var user_skills = [];
		browser.wait(EC.elementToBeClickable(skill.button_edit), 5000, 'Button edit is not clickable');
		skill.button_edit.click();
		browser.sleep(2000);
		browser.wait(EC.visibilityOf(skill.new_skill), 5000, 'input is not visible');
		input_skill.forEach(function(item) {
			skill.new_skill.sendKeys(item).sendKeys(protractor.Key.ARROW_DOWN).sendKeys(protractor.Key.ENTER);
		});
		skill.button_save.click();

		skill.approved_skills.each(function(item) {
			item.getInnerHtml().then(function(text) {
				console.log('User skills: ' + text);
				user_skills.push(text);
			});
		}).then(function() {
			console.log('user skills: ' + user_skills);
		//TODO: compare skills:
		//			expect(user_skills.filter(function (elem) {
		//			    return input_skill.indexOf(elem) > -1;
		//			}).length).toEqual(input_skill.length);
		});
		browser.wait(EC.presenceOf(skill.button_edit), 5000, 'Button edit is not visible');
	};

	this.remove_skills_fn = function() {
		//remove all skills to verify empty list if btn edit exists
		skill.button_edit.isPresent().then(function(result){
            if(result){
                browser.wait(EC.elementToBeClickable(skill.button_edit), 5000, 'Button edit is not clickable');
                browser.sleep(3000);
                skill.button_edit.click();
                skill.remove_skill.each(function(item) {
                    item.click();
                });
                skill.button_save.click();
                browser.wait(EC.presenceOf(skill.button_edit), 5000, 'Button edit is not visible');
            }
            else {
                console.log('No skills to be deleted');
            }
        });


	};
	this.close_btn_fn = function(param) {
		if(param!=null){
			skill.new_skill.sendKeys(param).sendKeys(protractor.Key.ARROW_DOWN).sendKeys(protractor.Key.ENTER);
		}
		comact.close_btn_fn(0)
		browser.wait(EC.presenceOf(skill.button_edit), 5000, 'Button edit is not visible');
	};

	//edit skills
	this.edit_fn = function() {
		browser.wait(EC.elementToBeClickable(skill.button_edit), 5000, 'Button edit is not clickable');
		skill.button_edit.click();
	};

	//edit skills
	this.get_skills_text = function() {
		browser.wait(EC.visibilityOf(skill.skills_tab), 5000, 'skills area is not visible');
		return skill.skills_tab.getText()
	};
};
module.exports = SkillsActions;