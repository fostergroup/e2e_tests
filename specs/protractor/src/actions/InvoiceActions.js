var InvoicePage = require('../pages/InvoicePage.js');
var invoice = new InvoicePage();

var CommonElementsPage = require('../pages/CommonElementsPage.js');
var com_ele = new CommonElementsPage();

var CommonActions = require('../actions/CommonActions.js');
var comact = new CommonActions();

var EC = protractor.ExpectedConditions;


var InvoiceActions = function() {

	//view details lnk	
	this.invoice_det_fn = function() {
		browser.wait(EC.elementToBeClickable(invoice.invoice_det_lnk), 5000, 'Button invoice details is not clickable');
		invoice.invoice_det_lnk.click();
	};
	/*regtype: 0 - vat, 1 - tax, null - not sent*/
	this.edit_invoice_det = function(input_name, input_email, input_phcode, input_phcode_area, input_phone,
		input_address, input_city, input_state, input_postal_code, input_country,
		regtype, regnumber) {
		comact.edit_fn(0);
		browser.wait(EC.visibilityOf(invoice.invoice_name), 5000, 'Edit form is not load, field is not visible');
		if (input_name != null) {
			invoice.invoice_name.clear().sendKeys(input_name);
		}
		if (input_email != null) {
			invoice.invoice_email.clear().sendKeys(input_email);
		}
		if (input_phcode != null) {
			invoice.phone_code.clear().sendKeys(input_phcode);
		}
		if (input_phcode_area != null) {
			invoice.phone_code.clear().sendKeys(input_phcode_area);
		}
		if (input_phone != null) {
			invoice.invoice_phone.clear().sendKeys(input_phone);
		}
		if (input_address != null) {
			invoice.invoice_address.clear().sendKeys(input_address);
		}
		if (input_city != null) {
			invoice.invoice_city.clear().sendKeys(input_city);
		}
		if (input_state != null) {
			invoice.invoice_state.clear().sendKeys(input_state);
		}
		if (input_postal_code != null) {
			invoice.invoice_post_code.clear().sendKeys(input_postal_code);
		}
		if (input_country != null) {
			invoice.invoice_country.clear().sendKeys(input_country);
		}
		if (regtype == 0) {
			//check that tax is not checked:
			invoice.tax_regist.isSelected().then(function(selected) {
				if (selected) {
					invoice.tax_regist.click();
					var notPresent = EC.not(EC.elementToBeSelected(invoice.tax_regist));
					browser.wait(notPresent, 5000, 'checkbox is not set off');
				}
			//else do nothing
			});
			invoice.vat_regist.isSelected().then(function(selected) {
				//check is checkbox is not checked
				if (!selected) {
					invoice.vat_regist.click();
					browser.wait(EC.elementToBeSelected(invoice.vat_regist), 5000, 'checkbox is not set');
					invoice.vat_number.clear().sendKeys(regnumber);
				}
			});
		} else if (regtype == 1) {
			//check that vat is not checked:
			invoice.vat_regist.isSelected().then(function(selected) {
				if (selected) {
					invoice.vat_regist.click();
					var notPresent = EC.not(EC.elementToBeSelected(invoice.vat_regist));
					browser.wait(notPresent, 5000, 'checkbox is not set off');
				}
				//else nothing to do, as tax is not checked
				browser.wait(EC.not(EC.elementToBeSelected(invoice.vat_regist)), 5000, 'checkbox is not set');
			});
			invoice.tax_regist.isSelected().then(function(selected) {
				if (!selected) {
					invoice.tax_regist.click();
					browser.wait(EC.elementToBeSelected(invoice.tax_regist), 5000, 'checkbox is not set');
					invoice.tax_number.clear().sendKeys(regnumber);
				}
				invoice.tax_number.clear().sendKeys(regnumber);
			});
		} else if (regtype == null) {
			//check off checkboxes
			invoice.tax_regist.isSelected().then(function(selected) {
				if (selected) {
					invoice.tax_regist.click();
					var notPresent = EC.not(EC.elementToBeSelected(invoice.tax_regist));
					browser.wait(notPresent, 5000, 'checkbox is not set off');
				}
			});
			invoice.vat_regist.isSelected().then(function(selected) {
				if (selected) {
					invoice.vat_regist.click();
					var notPresent = EC.not(EC.elementToBeSelected(invoice.vat_regist));
					browser.wait(notPresent, 5000, 'checkbox is not set off');
				}
			});
		}
		comact.submit_fn();
	};
	//search for invoices:
	this.search_invoice = function(project_id){
        browser.wait(EC.visibilityOf(com_ele.search_input), 5000, 'search input is not visible');
        com_ele.search_input.sendKeys(project_id).sendKeys(protractor.Key.ENTER);
    };
	//back to payments:
	this.back_to_paym = function(){
        browser.wait(EC.elementToBeClickable(invoice.back_to_pay), 5000, 'btn back is not clickable');
		invoice.back_to_pay.click();
    };
};
module.exports = InvoiceActions;