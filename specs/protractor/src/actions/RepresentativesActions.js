var RepresentativesPage = require('../pages/RepresentativesPage.js');
var rep = new RepresentativesPage();

var EC = protractor.ExpectedConditions;

var RepresentativesActions = function () {
    this.get_repres = function (part_email) {
		browser.wait(EC.visibilityOf(rep.repr_info), 5000, 'representative info is not visible');
		rep.repr_info.getText().then(function (text) {
			var repr = text.substring(text.indexOf('Account') + 8, text.length);
			console.log('representative text: ' + repr);
			expect(repr).toEqual(part_email);
		})
	}
};
module.exports = RepresentativesActions;