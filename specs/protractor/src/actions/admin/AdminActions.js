var AdminPage = require('../../pages/admin/AdminPage.js');
var admin = new AdminPage();

var CommonElementsPage = require('../../pages/CommonElementsPage.js');
var com_ele = new CommonElementsPage();

var BlogPostPage = require('../../pages/BlogPostPage.js');
var blog = new BlogPostPage();

var Helper = require('../../helper.js');
var helper = new Helper();

var EC = protractor.ExpectedConditions;

var AdminActions = function () {
	this.upload_inv = function () {
		browser.wait(EC.elementToBeClickable(admin.upload_invoice_btn), 5000, 'Btn upload invoices is not clickable');
		admin.upload_invoice_btn.click();
		browser.sleep(3000);
	};

	this.log_out = function () {
		browser.wait(EC.elementToBeClickable(admin.to_logout_lnk), 5000, 'Link is not clickable');
		admin.to_logout_lnk.click();
		browser.wait(EC.elementToBeClickable(admin.logout), 5000, 'link logout is not clickable');
		admin.logout.click();
	};
	var view_payments = function () {
		browser.wait(EC.elementToBeClickable(admin.paym_lnk), 5000, 'Link payments is not clickable');
		admin.paym_lnk.click();
	};
	this.charge_payout = function () {
		view_payments();
		browser.wait(EC.elementToBeClickable(admin.payout_lnk), 5000, 'Link payouts is not clickable');
		admin.payout_lnk.click();
	};
	this.view_disp = function () {
		view_payments();
		browser.wait(EC.elementToBeClickable(admin.pay_disp), 5000, 'Link disputes is not clickable');
		admin.pay_disp.click();
	};
	var apply_filter = function (pay_id, partner_id, comp_name_id, project_id) {
		//wait for the form to be loaded:
		browser.sleep(2000);
		browser.wait(EC.elementToBeClickable(admin.filt_drop), 5000, 'filter is not clickable');
		admin.filt_drop.click();
		if (pay_id != null) {
			admin.pay_id_filt.click();
		}
		if (partner_id != null) {
			admin.partner_id_filt.click();
		}
		if (comp_name_id != null) {
			admin.comp_filt.click();
		}
		if (project_id != null) {
			admin.pr_id_filt.click();
		}
		admin.filt_drop.click();

		if (pay_id != null) {
			admin.input_pay_id.clear().sendKeys(pay_id);
		}
		if (partner_id != null) {
			admin.partner_filt.clear().sendKeys(partner_id);
		}
		if (comp_name_id != null) {
			admin.comp_name_filt.clear().sendKeys(comp_name_id);
		}
		if (project_id != null) {
			admin.job_id_filt.isPresent().then(function (value) {
				if (value) {
					admin.job_id_filt.clear().sendKeys(project_id);
				}
				else {
					admin.proj_id_filt.clear().sendKeys(project_id);
				}
			});

		}
		admin.filt_btn.click();
	};
	this.apply_filter = apply_filter;
	this.bulk_charge = function () {
		browser.wait(EC.elementToBeClickable(admin.bulk_choice), 10000, 'dropdown list of bulk changes is not clickable');
		admin.checkbox.get(0).click();
		admin.bulk_choice.click();
		admin.gener_batch.click();
		admin.submit_ele.get(2).click();
		browser.wait(EC.elementToBeClickable(admin.exec), 5000, 'execute btn is not clickable');
		admin.exec.click();
	};

	this.bank_transfer = function () {
		browser.wait(EC.elementToBeClickable(admin.paym_lnk), 5000, 'Link payments is not clickable');
		admin.paym_lnk.click();
		browser.wait(EC.elementToBeClickable(admin.bank_tr), 5000, 'Link bank transfer is not clickable');
		admin.bank_tr.click();
	};
	this.resolve_proj = function (pr_id, status) {
		apply_filter(null, null, null, pr_id);
		browser.wait(EC.elementToBeClickable(admin.resolve_btn), 5000, 'Btn resolve is not clickable');
		admin.resolve_btn.click();
		browser.wait(EC.stalenessOf(admin.resolve_btn), 5000, 'Btn resolve is still visible');
		get_table_cell_info(4).then(function (result) {
			expect(result).toEqual(status);
		});
	};

	var cust_markup = function () {
		browser.wait(EC.elementToBeClickable(admin.cust_markup), 5000, 'Link custom markup is not clickable');
		admin.cust_markup.click();
	};
	this.cust_markup = cust_markup;

	this.set_part_custom_markup = function (partner_id, markup, comp_name, project_id) {
		cust_markup();
		browser.wait(EC.elementToBeClickable(admin.part_cust_markup), 5000, 'Link partner custom markup is not clickable');
		admin.part_cust_markup.click();
		apply_filter(null, partner_id, comp_name, project_id);
		var input_markup = element(by.xpath('//input[@id="markup-' + partner_id + '"]'));
		browser.wait(EC.visibilityOf(input_markup), 5000, 'Input partner custom markup is not visible');
		if (markup != null) {
			input_markup.clear().sendKeys(markup);
		}
		var set_markup = element(by.xpath('//a[@id="setcustommarkup-' + partner_id + '"]'));
		set_markup.click();
		browser.sleep(1000);
		get_table_cell_info(5).then(function (result) {
			expect(Number(result)).toEqual(Number(markup));
		});
	};
	this.set_proj_custom_markup = function (pay_id, markup, comp_name, project_id) {
		cust_markup();
		browser.wait(EC.elementToBeClickable(admin.part_cust_markup), 5000, 'Link partner custom markup is not clickable');
		admin.proj_cust_markup.click();
		apply_filter(pay_id, null, comp_name, project_id);
		var input_markup = element(by.xpath('//input[@id="markup-' + project_id + '"]'));
		browser.wait(EC.visibilityOf(input_markup), 5000, 'Input partner custom markup is not visible');
		if (markup != null) {
			input_markup.clear().sendKeys(markup);
		}
		var set_markup = element(by.xpath('//a[@id="setcustommarkup-' + project_id + '"]'));
		set_markup.click();
		browser.sleep(1000);
		get_table_cell_info(5).then(function (result) {
			expect(Number(result)).toEqual(Number(markup));
		});
	};
	this.bank_tr_approve = function (isOn, partner_id, was_requested, cell_nb) {
		var set = 'setbanktransfer-' + partner_id;
		var unset = 'unsetbanktransfer-' + partner_id;
		get_table_cell_info(cell_nb).then(function (result) {
			if (was_requested) {
				expect(Number(result)).toEqual(2);
			}
			if ((result == 2 || 0) && isOn) {
				element(by.id(set)).click();
				browser.wait(EC.visibilityOf(element(by.id(unset))), 5000, 'The form was not reloaded');
			}
			else if (result == 1 && !isOn) {
				element(by.id(unset)).click();
				browser.wait(EC.visibilityOf(element(by.id(set))), 5000, 'The form was not reloaded');
			}
		});
	};
	var get_table_cell_info = function (cell_nb) {
		var path = '//table/tbody/tr/td[' + cell_nb + ']';
		return element(by.xpath(path)).getText();
	};
	var get_table_cell_link = function (cell_nb) {
		var path = '//table/tbody/tr/td[' + cell_nb + ']/a';
		browser.wait(EC.elementToBeClickable(element(by.xpath(path))), 5000, 'Link is not clickable');
		return element(by.xpath(path));
	};
	this.get_table_cell_info = get_table_cell_info;

	this.upload_bank_transfer = function (path) {
		browser.executeScript(helper.scrollIntoView, admin.upload_bank_transf);
		browser.wait(EC.visibilityOf(admin.upload_bank_transf), 5000, 'The admin form was not loaded');
		admin.upload_bank_transf.sendKeys(path);
		upload_fn();
	};
	var upload_fn = function () {
		browser.wait(EC.elementToBeClickable(admin.upload_tr_btn), 5000, 'Btn upload transfer is not clickable');
		admin.upload_tr_btn.click();
	};
	this.upload_fn = upload_fn;
	this.update_invoices = function () {
		browser.wait(EC.elementToBeClickable(admin.update_inv_btn), 5000, 'The btn update invoices is not visible');
		admin.update_inv_btn.click();
	};
	this.stripe_recon = function () {
		browser.wait(EC.elementToBeClickable(admin.stripe_recon), 5000, 'The btn stripe reconcilation is not visible');
		admin.stripe_recon.click();
	};
	this.parse_banktr = function () {
		admin.date_our.click();
		focus_ele_fn(1, 1);
		browser.sleep(1000);
		admin.am_our.click();
		focus_ele_fn(3, 2);
		browser.sleep(1000);
		admin.payee_our.click();
		focus_ele_fn(6, 3);
		browser.sleep(1000);
		admin.down_csv_btn.click();
	};
	var focus_ele_fn = function (drop, index) {
		var path = '//*[@id="select2-results-' + drop + '"]/li[' + index + ']';
		browser.wait(EC.elementToBeClickable(element(by.xpath(path))), 5000, 'The list element is not clickable');
		element(by.xpath(path)).click();
	};

	this.blog_fn = function () {
		browser.wait(EC.elementToBeClickable(admin.blog), 5000, 'The blog link is not clickable');
		admin.blog.click();
	};
	this.blog_post_fn = function () {
		browser.wait(EC.elementToBeClickable(admin.blog_post), 5000, 'The blog post link is not clickable');
		admin.blog_post.click();
	};
	this.change_type = function (cell, isOn) {
		var path = '//table/tbody/tr[1]/td[' + cell + ']';
		var span_path = path + '/span';
		browser.wait(EC.visibilityOf(element(by.xpath(path))), 5000, 'The cell in tha table is not visible');
		element(by.xpath(path)).getText().then(function (value) {
			console.log('current type: ' + value);
			if (value == 'no' && isOn) {
				element(by.xpath(span_path)).click();
				browser.wait(EC.visibilityOf(admin.change_type), 5000, 'The type is not clickable');
				admin.change_type.sendKeys('y').sendKeys(protractor.Key.ENTER);
			}
			else if (value == 'yes' && !isOn) {
				element(by.xpath(span_path)).click();
				browser.wait(EC.visibilityOf(admin.change_type), 5000, 'The type is not clickable');
				admin.change_type.sendKeys('n').sendKeys(protractor.Key.ENTER);
			}
			//else do nothing, as value is as expected
		});
	};
	var click_aff_lnk = function () {
		browser.wait(EC.elementToBeClickable(admin.affil_lnk), 5000, 'The affiliate link is not clickable');
		admin.affil_lnk.click();
	};
	this.click_aff_lnk = click_aff_lnk;
	var view_affil_users = function () {
		browser.wait(EC.elementToBeClickable(admin.affil_users_lnk), 5000, 'The affiliate users link is not clickable');
		admin.affil_users_lnk.click();
	};
	this.view_affil_users = view_affil_users;
	var sort = function (isdesc) {
		admin.order_sort.getAttribute('class').then(function (value) {
			if (value.indexOf('desc') != -1 && !isdesc || value.indexOf('desc') == -1 && isdesc) {
				browser.wait(EC.elementToBeClickable(admin.sort_lnk), 5000, 'The sort link is not clickable');
				admin.sort_lnk.click();
			}
		});
	};
	this.sort = sort;
	var edit_aff = function () {
		browser.wait(EC.elementToBeClickable(admin.edit_aff_btn), 5000, 'The edit btn is not clickable');
		admin.edit_aff_btn.click();
	};
	this.edit_aff = edit_aff;

	var show_aff = function () {
		browser.wait(EC.elementToBeClickable(admin.show_aff_btn), 5000, 'The show btn is not clickable');
		admin.show_aff_btn.click();
	};
	this.show_aff = show_aff;
	this.update_aff_user = function (status, type, perc, flat, currency) {
		if (status != null) {
			set_status(status);
		}
		if (type != null) {
			set_commisiontype(type)
		}
		if (perc != null) {
			admin.input_percentage.clear().sendKeys(perc);
		}
		if (flat != null) {
			admin.input_flat.clear().sendKeys(flat);
		}
		if (currency != null) {
			set_currency(currency);
		}

	};
	var set_status = function (status) {
		browser.executeScript(helper.scrollIntoView, com_ele.drop_list.get(0));
		browser.wait(EC.elementToBeClickable(com_ele.drop_list.get(0)), 5000, 'The status link is not clickable');
		com_ele.drop_list.get(0).click();
		if (status == 0) {
			admin.stat_requested.click();
		}
		else if (status == 1) {
			admin.stat_contacted.click();
		}
		else if (status == 2) {
			admin.stat_followup.click();
		}
		else if (status == 3) {
			admin.stat_approved.click();
		}
	};
	var set_commisiontype = function (type) {
		browser.executeScript(helper.scrollIntoView, com_ele.drop_list.get(1));
		browser.wait(EC.elementToBeClickable(com_ele.drop_list.get(1)), 5000, 'The comission type link is not clickable');
		com_ele.drop_list.get(1).click();
		if (type == 0) {
			admin.type_percent.click();
		}
		else if (type == 1) {
			admin.type_flat.click();
		}
	};
	var set_currency = function (cur) {
		browser.executeScript(helper.scrollIntoView, com_ele.drop_list.get(2));
		browser.wait(EC.elementToBeClickable(com_ele.drop_list.get(2)), 5000, 'The currency type link is not clickable');
		com_ele.drop_list.get(2).click();
		if (cur == 0) {
			admin.dollar.click();
		}
		else if (cur == 1) {
			admin.euro.click();
		}
	};
	this.save_without_close = function () {
		browser.wait(EC.elementToBeClickable(admin.update_edit_btn), 5000, 'The update link is not clickable');
		admin.update_edit_btn.click();
	};
	this.save_and_close = function () {
		browser.wait(EC.elementToBeClickable(admin.update_close_btn), 5000, 'The update link is not clickable');
		admin.update_close_btn.click();
	};

	this.view_reg_users = function () {
		browser.wait(EC.elementToBeClickable(admin.reg_users_lnk), 5000, 'The registered users link is not visible');
		admin.reg_users_lnk.click();
	};
	this.view_partners = function () {
		browser.wait(EC.elementToBeClickable(admin.partners_lnk), 5000, 'The partners link is not visible');
		admin.partners_lnk.click();
	};
	this.approve_fn = function () {
		browser.wait(EC.elementToBeClickable(admin.approve_btn), 5000, 'The approve link is not clickable');
		admin.approve_btn.click();
	};
	var view_by_name = function (name) {
		console.log('this is partner name: ' + name);
		browser.wait(EC.elementToBeClickable(element(by.linkText(name))), 5000, 'The name link is not clickable');
		element(by.linkText(name)).click();
	};
	var partner_repr_view = function () {
		browser.wait(EC.elementToBeClickable(admin.partner_repr_lnk), 5000, 'The partner representative link is not clickable');
		admin.partner_repr_lnk.click();
	};
	var cred_view = function () {
		browser.wait(EC.elementToBeClickable(admin.cred_lnk), 5000, 'The credentials link is not clickable');
		admin.cred_lnk.click();
	};
	var set_active = function (isActive) {
		browser.executeScript(helper.scrollIntoView, admin.checkbox.get(0));
		//browser.wait(EC.visibilityOf(admin.checkbox), 5000, 'The checkbox is not visible');
		admin.active_checkbox.getAttribute('checked').then(function (result) {
			if (result && !isActive || !result && isActive) {
				admin.checkbox.get(0).click();
			}
		})
	};
	this.part_activate = function (name, active) {
		get_table_cell_link(1).click();
		partner_repr_view();
		cred_view();
		set_active(active);
	};
	this.get_table_info = function (index) {
		browser.wait(EC.visibilityOf(admin.anal_table.get(index)), 5000, 'The table is not visible');
		return admin.anal_table.get(index).getText();
	};
	this.view_analytics = function () {
		browser.wait(EC.elementToBeClickable(admin.anal_lnk), 5000, 'Link analytics is not clickable');
		admin.anal_lnk.click();
	};
	this.clear_transf = function () {
		browser.wait(EC.elementToBeClickable(admin.clear_btn), 5000, 'Clear btn is not clickable');
		admin.clear_btn.click();
		admin.table_transf.isPresent().then(function (result) {
			console.log('visibility of the table: ' + result);
		});
	};
	var add_new_post = function () {
		browser.wait(EC.elementToBeClickable(admin.add_post), 5000, 'Add post link is not clickable');
		admin.add_post.click();
	};
	this.add_new_post = add_new_post;

	var set_post_category = function (category) {
		browser.executeScript(helper.scrollIntoView, com_ele.drop_list.get(0));
		browser.wait(EC.elementToBeClickable(com_ele.drop_list.get(0)), 5000, 'The status link is not clickable');
		com_ele.drop_list.get(0).click();
		if (category == 0) {
			admin.blog_island.click();
		}
		else if (category == 1) {
			admin.what_hot.click();
		}
		else if (category == 2) {
			admin.camp_and_csr.click();
		}
		else if (category == 3) {
			admin.go_rem.click();
		}
	};
	this.set_post_category = set_post_category;
	this.fill_post = function (category, title, short_resume, content, published, approved) {
		set_post_category(category);
		admin.blog_title.clear();
		if (title != null) {
			admin.blog_title.sendKeys(title);
		}
		if (short_resume != null) {
			browser.switchTo().frame(0);
			browser.executeScript("arguments[0].innerHTML = '<h1>" + short_resume + "</h1>'", blog.post_content);
			browser.switchTo().defaultContent();
		}
		if (content != null) {
			browser.switchTo().frame(1);
			browser.executeScript("arguments[0].innerHTML = '<h1>" + content + "</h1>'", blog.post_content);
			browser.switchTo().defaultContent();
		}
		admin.pub_checkbox.isSelected().then(function (result) {
			console.log('checkbox published: '+ result);
			if (!result && published || result && !published) {
				browser.executeScript(helper.scrollIntoView, admin.pub_checkbox);
				admin.checkbox.get(0).click();
				if (published) {
					browser.wait(EC.elementToBeSelected(admin.pub_checkbox), 5000, 'checkbox is not selected');
				}
				else {
					browser.wait(EC.not(EC.elementToBeSelected(admin.pub_checkbox)), 5000, 'checkbox is still selected');
				}
			}
		});
		admin.app_checkbox.isSelected().then(function (result) {
			console.log('checkbox approved: '+ result);
			if (!result && approved || result && !approved) {
				admin.checkbox.get(1).click();
				if (approved) {
					browser.wait(EC.elementToBeSelected(admin.app_checkbox), 5000, 'checkbox is not selected');
				}
				else {
					browser.wait(EC.not(EC.elementToBeSelected(admin.app_checkbox)), 5000, 'checkbox is still selected');
				}
			}
		});
	};
	this.create_and_back = function () {
		browser.wait(EC.elementToBeClickable(admin.create_and_back), 5000, 'create and back link is not clickable');
		admin.create_and_back.click();
	};
};
module.exports = AdminActions;