var PayRatesPage = function() {

	//hourly rate on view page
	var cur_hourly = element(by.xpath("//dt[contains(text(), 'Hourly')]"));
	this.cur_hourly = cur_hourly;

	var set_rate = element(by.id('rt-edit'));
	this.set_rate = set_rate;

	var btn_save = element(by.id('rate-save'));
	this.btn_save = btn_save;

	//list of currencies
	var cur_list = element(by.css('.select2-arrow'));
	this.cur_list = cur_list;

	//list of payments values
	var rates = element.all(by.xpath('//div[@id="rates"]/descendant::dd'));
	this.rates = rates;

	var all_rates = element(by.id('payrate-tab'));
	this.all_rates = all_rates;

	var EC = protractor.ExpectedConditions;


	//edit form
	var cur_hourly_input = element(by.id('hourly-rate'));
	this.cur_hourly_input = cur_hourly_input;

	//pay dropdown
	var rate_drop = element(by.xpath('//div[@id="s2id_currency-type"]/a'));
	this.rate_drop = rate_drop;

	var day_hourly_input = element(by.id('daily-rate'));
	this.day_hourly_input = day_hourly_input;

	var weekly_hourly_input = element(by.id('weekly-rate'));
	this.weekly_hourly_input = weekly_hourly_input;

	var mo_hourly_input = element(by.id('monthly-rate'));
	this.mo_hourly_input = mo_hourly_input;

	var input_curtype = element(by.css('.select2-input'));
	this.input_curtype = input_curtype;

	//euro from dropdown list:
	var eu_cur = element(by.xpath("//div[contains(text(), 'EUR')]"));
	this.eu_cur = eu_cur;

};
module.exports = PayRatesPage;