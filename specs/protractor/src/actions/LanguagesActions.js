var LanguagesPage = require('../pages/LanguagesPage.js');
var lang = new LanguagesPage();

var Helper = require('../helper.js');
var helper = new Helper();

var EC = protractor.ExpectedConditions;

var LanguagesActions = function () {
	this.delete_lang_fn = function () {
		lang.del_lang.get(0).isPresent().then(function (result) {
			console.log('result: ' + result);
			if(result){
				lang.del_lang.each(function () {
					browser.executeScript(helper.scrollIntoView, lang.del_lang.get(0));
					browser.sleep(2000);
					lang.del_lang.get(0).click();
				});
			}
		});
	};
	this.edit_lang = function (index) {
		browser.wait(EC.elementToBeClickable(lang.edit_lang.get(index)), 5000, 'edit btn is not clickable');
		lang.edit_lang.get(index).click();
	};
};
module.exports = LanguagesActions;