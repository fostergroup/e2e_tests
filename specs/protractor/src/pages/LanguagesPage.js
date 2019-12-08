var LanguagesPage = function() {
	//delete language btn
	var del_lang = element.all(by.css('.delete_language'));
	this.del_lang = del_lang;

	//edit language btn
	var edit_lang = element.all(by.css('.edit_language'));
	this.edit_lang = edit_lang;
};
module.exports = LanguagesPage;