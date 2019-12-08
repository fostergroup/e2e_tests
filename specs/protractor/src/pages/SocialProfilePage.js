var CommonElementsPage = require('./CommonElementsPage.js');
var com_ele = new CommonElementsPage();
var EC = protractor.ExpectedConditions;

var SocialProfilePage = function() {
	//social profiles records
	var social_prof = element(by.id('social'));
	this.social_prof = social_prof;

	//btn add social profiles
	var add_profile_btn = element(by.id('add-sp'));
	this.add_profile_btn = add_profile_btn;

	//btn reset
	var reset_btn = element(by.id('sp-reset'));
	this.reset_btn = reset_btn;

	//edit btn
	var edit_btn = element.all(by.xpath("//button[contains(@id, 'sp-edit')]"));
	this.edit_btn = edit_btn;

	//delete
	var check_box = element(by.xpath("//form[@id='edit-sp']/descendant::span[@class='icon-checked']"));
	this.check_box = check_box;

	//btn close for new record
	var submit_new_btn = element(by.id('sp-submit'));
	this.submit_new_btn = submit_new_btn;

	//url input
	var social_profile_url = element(by.id('sp-url'));
	this.social_profile_url = social_profile_url;

	//share fb
	var share_fb_proj = element(by.css('.sfacebook'));
	this.share_fb_proj = share_fb_proj;

	//share linkedin
	var share_ln_proj = element(by.css('.slinkedin'));
	this.share_ln_proj = share_ln_proj;

	//share twitter
	var share_tw_proj = element(by.css('.stwitter'));
	this.share_tw_proj = share_tw_proj;
};
module.exports = SocialProfilePage;