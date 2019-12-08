var GroupPage = require('../pages/GroupPage.js');
var gr = new GroupPage();

var ProjectPage = require('../pages/ProjectPage.js');
var proj = new ProjectPage();

var CommonElementsPage = require('../pages/CommonElementsPage.js');
var com_ele = new CommonElementsPage();
var EC = protractor.ExpectedConditions;

var GroupActions = function () {
    this.edit_group = function(){
		browser.wait(EC.elementToBeClickable(gr.edit_group), 5000, 'Link edit group is not clickable');
		gr.edit_group.click();
    };
    this.close_group = function(){
		browser.wait(EC.elementToBeClickable(gr.close_group), 5000, 'Close btn is not clickable');
		gr.close_group.click();
	};

    this.enter_drop_group = function(group_name){
		browser.wait(EC.elementToBeClickable(gr.droplist), 5000, 'Droplist is not clickable');
		gr.droplist.click();
		browser.wait(EC.visibilityOf(com_ele.select_input), 5000, 'Button edit is not clickable');
		com_ele.select_input.sendKeys(group_name);
		com_ele.select_input.sendKeys(protractor.Key.ENTER);
	};

	this.close_part_group = function(){
		browser.wait(EC.elementToBeClickable(gr.close_part_group), 5000, 'Close btn is not clickable');
		gr.close_part_group.click();
	};
	this.save_group = function(){
		browser.wait(EC.elementToBeClickable(gr.save_group), 5000, 'Save btn is not clickable');
		gr.save_group.click();
	};
	this.get_group = function() {
		browser.wait(EC.visibilityOf(gr.group_text), 5000, 'Group text is not visible');
		return gr.group_text.getText();
	};
	var fill_groups = function (input_group) {
		browser.wait(EC.visibilityOf(gr.input_foc), 5000, 'Group text is not visible');
		//gr.input_foc.click();
		input_group.forEach(function(item) {
			proj.proj_input_sel.sendKeys(item).sendKeys(protractor.Key.ENTER);
		});
	};
	this.fill_groups = fill_groups;

	this.add_group_fn = function(input_group) {
		//delete groups if they are:
		remove_items();
		fill_groups(input_group);
	};
	var remove_items = function () {
		proj.remove_sk.each(function () {
			proj.remove_sk.click();
		})
	};
	this.remove_items = remove_items;

	this.save_part_group = function(){
		browser.wait(EC.elementToBeClickable(gr.save_group_part), 5000, 'Save btn is not clickable');
		gr.save_group_part.click();
	};
};
module.exports = GroupActions;