var CommonElementsPage = require('./pages/CommonElementsPage.js');
var com_ele = new CommonElementsPage();
var EC = protractor.ExpectedConditions;

var Helper = function () {
    var fs = require('fs');
    this.fs = fs;

    //alerts
    this.alert_group_danger_fn = function (index, msg) {
        browser.wait(EC.visibilityOf(com_ele.gr_alert_msg.get(index)), 5000, 'message group danger is not visible');
        expect(com_ele.gr_alert_msg.get(index).getText()).toContain(msg);
        com_ele.gr_alert_msg.get(index).getText().then(function (text) {
            console.log('alert text: ' + text);
        });
    };

    this.get_success_msg_fn = function (index, msg) {
        browser.wait(EC.visibilityOf(com_ele.gr_success_msg.get(index)), 5000, 'message success is not visible');
        expect(com_ele.gr_success_msg.get(index).getText()).toContain(msg);
    };

	//success mgd expectations
	this.alert_success_fn = function (index, msg) {
		browser.wait(EC.visibilityOf(com_ele.alert_success_msg.get(index)), 7000, 'message success is not visible');
		expect(com_ele.alert_success_msg.get(index).getText()).toContain(msg);
	};

    this.get_warn_msg = function (index, msg) {
        browser.wait(EC.visibilityOf(com_ele.warn_msg.get(index)), 5000, 'message warning is not visible');
        expect(com_ele.warn_msg.get(index).getText()).toContain(msg);
    };

    //paginator to the right
    var paginat = element(by.linkText('Next'));
    this.paginat = paginat;

    //one page ahead:
    this.one_page_ahead = function () {
        paginat.click();
        browser.sleep(3000);
    };

    var dollar = 'USD';
    this.dollar = dollar;

    var euro = 'EUR';
    this.euro = euro;

    // error message expectations
    this.alert_danger_msg_fn = function (index, msg) {
		browser.wait(EC.visibilityOf(com_ele.alert_msg.get(index)), 7000, 'message danger is not visible');
        expect(com_ele.alert_msg.get(index).getText()).toContain(msg);
        com_ele.alert_msg.get(index).getText().then(function (text) {
            console.log(text);
        });
    };

    this.getDate = function (i) {
        var someDate = new Date();
        var numberOfDaysToAdd = i;
        someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
        var dd = someDate.getDate();
        var mm = someDate.getMonth() + 1;
        var y = someDate.getFullYear();
        return someFormattedDate = mm + '/' + dd + '/' + y;
    };

    this.screenshot_fn = function (param) {
        var someDate = new Date();
        var dd = someDate.getDate();
        var mm = someDate.getMonth() + 1;
        var y = someDate.getFullYear();
        var hh = someDate.getHours();
        var mi = someDate.getMinutes();
        var ss = someDate.getSeconds();
        someFormattedDate = y + '' + mm + '' + dd + '' + hh + '' + mi + '' + ss;
        return browser.params.path_to_screenshots + '/' + someFormattedDate + param + '.png'
    };

    this.writeScreenShot = function (data, filename) {
        var stream = fs.createWriteStream(filename);
        stream.write(new Buffer(data, 'base64'));
        stream.end();
    };
    var random_string = function(){
        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
        var string_length = 8;
        var randomstring = '';
        for (var i = 0; i < string_length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum, rnum + 1);
        }
        return randomstring;
    };
    this.random_string = random_string;
    this.randomEmail = function () {
        return random_string() + '@mailinator.com';
    };

    this.scrollIntoView = function () {
        arguments[0].scrollIntoView();
    };
    this.isInArray = function(value, array) {
		return array.indexOf(value) > -1;
	}
};
module.exports = Helper;