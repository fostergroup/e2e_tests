var AffiliatePage = function() {
	//affiliate name
	var aff_name = element(by.id('transformify_mainbundle_affiliate_name'));
	this.aff_name = aff_name;

	//affiliate email
	var aff_email = element(by.id('transformify_mainbundle_affiliate_email'));
	this.aff_email = aff_email;

	//affiliate office_phone
	var aff_ophone = element(by.id('transformify_mainbundle_affiliate_telephone'));
	this.aff_ophone = aff_ophone;

	//affiliate website url
	var aff_url = element(by.id('transformify_mainbundle_affiliate_webpage'));
	this.aff_url = aff_url;

	//affiliate website url
	var aff_url = element(by.id('transformify_mainbundle_affiliate_webpage'));
	this.aff_url = aff_url;

	//affiliate redirect url
	var token_lnk = element.all(by.xpath('//a[contains(@href, "token")]'));
	this.token_lnk = token_lnk;
};
module.exports = AffiliatePage;