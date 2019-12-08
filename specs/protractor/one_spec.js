// An example configuration file.
var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

exports.config = {
	//seleniumAddress: 'http://localhost:4444/wd/hub',
	directConnect : true,
	multiCapabilities : [ {
		'browserName' : 'chrome',
		'resolution' : '768x368'
	} ],
	maxSessions : 3,

	params : {
		path_to_png : '../../load/load_png.png',
		path_to_jpg : '../../load/load_jpg.jpg',
		path_to_jpeg : '../../load/resized_jpeg.jpeg',
		path_to_non_image : '../../load/report.html',
		path_to_scaled : '../../load/large_file.jpeg',
		path_to_bank_tr: '../../load/bank_transfer.xlsx',
		path_to_bank_tr_xls: '../../load/member_pay.xls',
		path_to_bank_csv: '../../../load/bank_transfer.csv',
		path_to_member_bank_csv: '../../../load/bank_member_transfer.csv',

		path_to_screenshots : 'screenshots',

		company : {
			name : 'Company name',
			position : 'Software engineer',
			description : 'Work description'
		},
		invoice : {
			address: 'Full address',
			country_uk: 'UK',
			country_non_uk : 'UA',
			state: 'London',
			city: 'Slough',
			postal: '17530' 
		},
		admin: {
			login: 'stage_admin',
			pswd: 'C7r6h38A3nw!3y4'
		},
        xero: {
            url: 'https://login.xero.com/'
        }
	},

	// Framework to use. Jasmine is recommended.
	framework : 'jasmine2',

	baseUrl : 'https://stage:!WeHaveCookies%23@stage.transformify.org',

	// Spec patterns are relative to the current working directory when
	// protractor is called.
	 specs : [
	 	 'specs/e2e/FullCycleProjectSpec_6.js'
		// 'specs/campaign/*.js'
		// 'specs/component/SearchProjectMemberAndApplySpec.js'
	 ],
	//  specs : [ 'specs/component/MemberSetWork*.js'],

	// exclude: ['specs/component/LogInMember*.js'],
	// 'altRoot/*_spec.js'

	// Options to be passed to Jasmine.
	jasmineNodeOpts : {
		defaultTimeoutInterval : 100000
	},
	onPrepare : function() {
		beforeAll(function() {
			var protractorMatchers = require('jasmine-expect');
			//Some code that needs to be executed before all tests only once.
			browser.manage().timeouts().implicitlyWait(5000);
			jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
				savePath: './reports/',
				takeScreenshots: true,
				takeScreenshotsOnlyOnFailures: false
			}));
			var jasmineReporters = require('jasmine-reporters');
			// var prefix = process.pid + '-';
			jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
				savePath: './junit_report'
				// filePrefix: prefix
			}));
			var width = 1480;
			var height = 720;
			browser.driver.manage().window().setSize(width, height);
            //switch to another reporter:
            //jasmine.getEnv().addReporter(reporter);
		});
	}
};