var AffiliatePage = require('../pages/AffiliatePage.js');
var aff = new AffiliatePage();

var EC = protractor.ExpectedConditions;

var AffiliateActions = function () {
	this.fill_aff_form = function (name, email, ophone, url) {
		if (name != null) {
			browser.wait(EC.visibilityOf(aff.aff_name), 5000, 'Field name is not visible');
			aff.aff_name.clear().sendKeys(name);
		}
		if (email != null) {
			browser.wait(EC.visibilityOf(aff.aff_email), 5000, 'Field email is not visible');
			aff.aff_email.clear().sendKeys(email);
		}
		if (ophone != null) {
			browser.wait(EC.visibilityOf(aff.aff_ophone), 5000, 'Field ophone is not visible');
			aff.aff_ophone.clear().sendKeys(ophone);
		}
		if (url != null) {
			browser.wait(EC.visibilityOf(aff.aff_url), 5000, 'Field url is not visible');
			aff.aff_url.clear().sendKeys(url);
		}
	}
	this.get_email = function () {
		return aff.aff_email.getAttribute('value');
	};
};
module.exports = AffiliateActions;