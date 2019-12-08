// An example configuration file.
var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
exports.config = {
	directConnect : true,

	multiCapabilities : [ {
		'browserName' : 'chrome',
	} ],
	maxSessions : 3,

	params : {
		path_to_png : '../../load/load_png.png',
		path_to_jpg : '../../load/load_jpg.jpg',
		path_to_jpeg : '../../load/resized_jpeg.jpeg',
		path_to_non_image : '../../load/report.html',
		path_to_scaled : '../../load/large_file.jpeg',
		path_to_bank_tr: '../../load/bank_transfer.xlsx',
		path_to_bank_csv: '../../../load/bank_transfer.csv',
		path_to_member_bank_csv: '../../../load/bank_member_transfer.csv',


		path_to_screenshots : 'rnd-screenshots-e2e',

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

	baseUrl : '${url}',

	// Spec patterns are relative to the current working directory when
	// protractor is called.
	specs: ['specs/e2e/*.js'],
	 exclude: ['specs/e2e/FullCycleProjectSpec_3.js'],

	// Options to be passed to Jasmine.
	jasmineNodeOpts : {
		defaultTimeoutInterval : 180000
	},
	onPrepare : function() {
        var protractorMatchers = require('jasmine-expect');
        beforeAll(function() {
            //Some code that needs to be executed before all tests only once.
            browser.manage().timeouts().implicitlyWait(10000);
            jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
                savePath: './rnd-reports-e2e/',
                takeScreenshots: true,
                takeScreenshotsOnlyOnFailures: true
            }));
			var jasmineReporters = require('jasmine-reporters');
			jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
				savePath: './rnd-reports-e2e'
			}));
			var width = 1366;
			var height = 768;
			browser.driver.manage().window().setSize(width, height);
        });
	}
};