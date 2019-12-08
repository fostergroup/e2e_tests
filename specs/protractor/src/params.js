var Params = function () {
	var wrong_cur_pswd = 'wrong';
	this.wrong_cur_pswd = wrong_cur_pswd;

	var new_pswd = '$RFVbgt5^YHN';
	this.new_pswd = new_pswd;

	//short pswd
	var short_pswd = '123';
	this.short_pswd = short_pswd;

	//rare skill
	var rare_skill = 'Pentaho';
	//noinspection JSUnresolvedVariable
	this.rare_skill = rare_skill;

	var wid_skill = 'AJAX';
	//noinspection JSUnresolvedVariable
	this.wid_skill = wid_skill;

	//non-email
	var not_email = 'dds';
	this.not_email = not_email;

	//valid credit card
	var valid_card = 4012888888881881;
	this.valid_card = valid_card;

	//invalid credit card
	var invalid_card = 4000000000000341;
	this.invalid_card = invalid_card;

	//valid credit card
	var addit_valid_card = 4242424242424242;
	this.addit_valid_card = addit_valid_card;

	//credit card with expired date
	var expired_card = 4000000000000069;
	this.expired_card = expired_card;

	//very long desc
	var very_long_desc = 'This is very long desription This is very long desription This is very\ ' +
		'long desription This is very long desription This is very long desription This is very\ ' +
		'long desription This is very long desription This is very long desription This is very\ ' +
		'long desription This is very long desription This is very long desription This is very long desription This is very long desription This is very long desription v This is very long desription This is very long desription This is very long desription This is very long desription This is very long desription'
	this.very_long_desc = very_long_desc;

	//definition of rates for the test
	var hourly_rate = 10;
	this.hourly_rate = hourly_rate;

	var daily_rate = 60;
	this.daily_rate = daily_rate;

	var weekly_rate = 400;
	this.weekly_rate = weekly_rate;

	var mo_rate = 1000;
	this.mo_rate = mo_rate;

	var large_mo_rate = 5000;
	this.large_mo_rate = large_mo_rate;

	var rates = [hourly_rate, daily_rate, weekly_rate, mo_rate];
	this.rates = rates;

	var base_url = 'https://stage.transformify.org';
	//noinspection JSUnresolvedVariable
	this.base_url = base_url;

	//security question
	var seq_q = ['What city'];
	this.seq_q = seq_q;

	//url for the small image
	var smallimg_url = 'https://cdn4.iconfinder.com/data/icons/common-toolbar/36/Open-24.png';
	this.smallimg_url = smallimg_url;

	//url for the small image
	var largeimg_url = 'https://cdn4.iconfinder.com/data/icons/common-toolbar/36/Open-512.png';
	this.largeimg_url = largeimg_url;
};
module.exports = Params;