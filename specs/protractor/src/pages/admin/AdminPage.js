/**
 * Admin page elements
 */
var AdminPage = function() {
	//upload invoices btn
	var upload_invoice_btn = element(by.id('uploadInvoices'));
	this.upload_invoice_btn = upload_invoice_btn;

	//element to sign out
	var to_logout_lnk = element(by.xpath('/html/body/div[1]/header/nav/div[2]/ul/li[2]/a'));
	this.to_logout_lnk = to_logout_lnk;

	//element to sign out
	var logout = element(by.linkText('Logout'));
	this.logout = logout;

	//payment link
	var paym_lnk = element(by.linkText('Payments'));
	this.paym_lnk = paym_lnk;

    //payouts link
    var payout_lnk = element(by.linkText('Payouts'));
    this.payout_lnk = payout_lnk;

	//transfer link
	var bank_tr = element(by.linkText('Bank Transfer'));
	this.bank_tr = bank_tr;

	//custom markup link
	var cust_markup = element(by.linkText('Custom markup setup'));
	this.cust_markup = cust_markup;

	//partners custom markup link
	var part_cust_markup = element(by.linkText('Custom Markup for Partners'));
	this.part_cust_markup = part_cust_markup;

	//project custom markup link
	var proj_cust_markup = element(by.linkText('Custom Markup for Projects'));
	this.proj_cust_markup = proj_cust_markup;

	//set up partners custom markup link
	var set_up_markup = element(by.linkText('Set Custom Markup'));
	this.set_up_markup = set_up_markup;

    //filters:
    //input link
    var input_pay_id = element(by.id('filter_id_value'));
    this.input_pay_id = input_pay_id;

    var checkbox = element.all(by.xpath('//ins[@class="iCheck-helper"]'));
    this.checkbox = checkbox;

    var active_checkbox = element(by.xpath('//div[@class="icheckbox_square-blue"]/input'));
    this.active_checkbox = active_checkbox;

    //filter field partner id:
	var partner_filt = element(by.id('filter_id_value'));
	this.partner_filt = partner_filt;

    //filter company name value:
	var comp_name_filt = element(by.id('filter_company_name_value'));
	this.comp_name_filt = comp_name_filt;

    //filter job id:
	var job_id_filt = element(by.id('filter_job__id_value'));
	this.job_id_filt = job_id_filt;

    //filter job id:
	var proj_id_filt = element(by.id('filter_id_value'));
	this.proj_id_filt = proj_id_filt;

    //filter btn
    var filt_btn = element(by.xpath('//*[contains (@id, "filter-container")]/descendant::button'));
    this.filt_btn = filt_btn;

    //bulk choice:
    var bulk_choice = element(by.xpath('//*[@id="s2id_autogen21"]/a[@class="select2-choice"]'));
    this.bulk_choice = bulk_choice;

    //submit_ele
    var submit_ele = element.all(by.xpath("//*[@type='submit']"));
    this.submit_ele = submit_ele;

    //execute btn
    var exec = element(by.xpath("//button[contains (text(), 'Yes, execute') and @type='submit']"));
    this.exec = exec;

    var gener_batch = element(by.xpath("//div[@class='select2-result-label' and text() = 'Generate batch']"));
    this.gener_batch = gener_batch;

    var table_cell = element(by.xpath("//table/tbody/tr[1]/td[8]"));
    this.table_cell = table_cell;

	//upload bank transfer input
	var upload_bank_transf = element(by.id('bank_statement'));
	this.upload_bank_transf = upload_bank_transf;

	//upload bank transfer btn
	var upload_tr_btn = element(by.id('upload-button'));
	this.upload_tr_btn = upload_tr_btn;

	//update invoices
	var update_inv_btn = element(by.id('updateInvoices'));
	this.update_inv_btn = update_inv_btn;

	//payment disputes
	var pay_disp = element(by.linkText('Payment disputes'));
	this.pay_disp = pay_disp;

	//stripe reconsilation
	var stripe_recon = element(by.id('reconcileButton'));
	this.stripe_recon = stripe_recon;

	//transfer upload:
	var date_our = element(by.id('select2-chosen-1'));
	this.date_our = date_our;

	//transfer amount:
	var am_our = element(by.id('select2-chosen-3'));
	this.am_our = am_our;

	//transfer amount:
	var payee_our = element(by.id('select2-chosen-6'));
	this.payee_our = payee_our;

	//download transfer
	var down_csv_btn = element(by.id('download-csv'));
	this.down_csv_btn = down_csv_btn;

	//clear transfer
	var clear_btn = element(by.id('clear_button'));
	this.clear_btn = clear_btn;

	var blog = element(by.linkText('Blog'));
	//noinspection JSUnresolvedVariable
	this.blog = blog;

	//blog post link
	var blog_post = element(by.linkText('Blog Posts'));
	this.blog_post = blog_post;

	//select dropdown type
	var change_type = element(by.className('form-control input-sm'));
	this.change_type = change_type;

	//affiliates link
	var affil_lnk = element(by.linkText('Affiliates'));
	this.affil_lnk = affil_lnk;

	//affiliate users link
	var affil_users_lnk = element(by.linkText('Affiliate users'));
	this.affil_users_lnk = affil_users_lnk;

	//registered users link
	var reg_users_lnk = element(by.linkText('Registered users'));
	this.reg_users_lnk = reg_users_lnk;

	//rpartnersd link
	var partners_lnk = element(by.linkText('Partners'));
	this.partners_lnk = partners_lnk;

	//to sort:
	var sort_lnk = element(by.xpath('//table/thead/tr/th[1]/a'));
	this.sort_lnk = sort_lnk;

	//to get order:
	var order_sort = element(by.xpath('//table/thead/tr/th[1]'));
	this.order_sort = order_sort;

	//to edit affiliate:
	var edit_aff_btn = element(by.xpath('//table/tbody/tr[1]/td[6]/div/a[contains (@href, "edit")]'));
	this.edit_aff_btn = edit_aff_btn;

	//to show affiliate:
	var show_aff_btn = element(by.xpath('//table/tbody/tr[1]/td[6]/div/a[contains (@href, "show")]'));
	this.show_aff_btn = show_aff_btn;

	//status input:
	var status_input = element(by.id('s2id_autogen1'));
	this.status_input = status_input;

	//select contacted:
	var stat_contacted = element(by.xpath('//div[text()="Contacted"]'));
	this.stat_contacted = stat_contacted;

	//select contacted:
	var stat_requested = element(by.xpath('//div[text()="Requested"]'));
	this.stat_requested = stat_requested;

	//followup:
	var stat_followup = element(by.xpath('//div[text()="Followup"]'));
	this.stat_followup = stat_followup;

	//approved:
	var stat_approved = element(by.xpath('//div[text()="Approved"]'));
	this.stat_approved = stat_approved;

	//Campaigns and CSR projects:
	var camp_and_csr = element(by.xpath('//div[text()="Campaigns and CSR projects"]'));
	this.camp_and_csr = camp_and_csr;

	//goremote:
	var go_rem = element(by.xpath('//div[text()="#GoRemote"]'));
	this.go_rem = go_rem;

	//Blogger's island:
	var blog_island = element(by.xpath('//div[contains(text(), "Island")]'));
	this.blog_island = blog_island;

	//What's hot:
	var what_hot = element(by.xpath('//div[contains(text(), "hot")]'));
	this.what_hot = what_hot;

	//create and go to blog post list:
	var create_and_back = element(by.name('btn_create_and_list'));
	this.create_and_back = create_and_back;

	//approve btn:
	var approve_btn = element(by.linkText('Approve'));
	this.approve_btn = approve_btn;

	// Partner representatives:
	var partner_repr_lnk = element(by.linkText('Partner representatives'));
	this.partner_repr_lnk = partner_repr_lnk;

	// Credentials:
	var cred_lnk = element(by.linkText('Credentials'));
	this.cred_lnk = cred_lnk;

	//Resolve btn:
	var resolve_btn = element(by.linkText('Resolve'));
	this.resolve_btn = resolve_btn;

	//blog title:
	var blog_title = element(by.xpath('//input[contains(@id, "title")]'));
	this.blog_title = blog_title;

	//blog post checkbox published:
	var pub_checkbox = element(by.xpath('//input[contains(@id, "published")]'));
	this.pub_checkbox = pub_checkbox;

	//blog post checkbox approved:
	var app_checkbox = element(by.xpath('//input[contains(@id, "approved")]'));
	this.app_checkbox = app_checkbox;

	//comission type:
	var type_none = element(by.xpath('//div[text()="None"]'));
	this.type_none = type_none;

	//comission type:
	var type_flat = element(by.xpath('//div[text()="Flat"]'));
	this.type_flat = type_flat;

	//comission type:
	var type_percent = element(by.xpath('//div[text()="Percentage"]'));
	this.type_percent = type_percent;

	//percentage comission:
	var input_percentage = element(by.xpath('//input[contains(@id, "percent_commision")]'));
	this.input_percentage = input_percentage;

	//flat comission:
	var input_flat = element(by.xpath('//input[contains(@id, "flat_commission")]'));
	this.input_flat = input_flat;

	var dollar = element(by.xpath('//div[text()="USD"]'));
	this.dollar = dollar;

	var euro = element(by.xpath('//div[text()="EUR"]'));
	this.euro = euro;

	//btn update without close
	var update_edit_btn = element(by.name('btn_update_and_edit'));
	this.update_edit_btn = update_edit_btn;

	//btn update and close
	var update_close_btn = element(by.name('btn_update_and_list'));
	this.update_close_btn = update_close_btn;

	//table with affiliate analytics
	var anal_table = element.all(by.xpath('//table[contains(@class, "table")]'));
	this.anal_table = anal_table;

	//filter dropdown
	var filt_drop = element(by.xpath('//a[@class="dropdown-toggle sonata-ba-action"]'));
	this.filt_drop = filt_drop;

	//filter payment id
	var pay_id_filt = element(by.linkText('Payment ID'));
	this.pay_id_filt = pay_id_filt;

	//filter project id
	var pr_id_filt = element(by.linkText('Project ID'));
	this.pr_id_filt = pr_id_filt;

	//filter project id for custom markup
	var id_filt = element(by.linkText('Id'));
	this.id_filt = id_filt;

	//filter project id for custom markup
	var partner_id_filt = element(by.linkText('Partner ID'));
	this.partner_id_filt = partner_id_filt;

	//filter by comp name
	var comp_filt = element(by.linkText('Name'));
	this.comp_filt = comp_filt;

	//link to analytics
	var anal_lnk = element(by.linkText('Analytics'));
	this.anal_lnk = anal_lnk;

	//link to add a new blog post
	var add_post = element(by.linkText('Add new'));
	this.add_post = add_post;

	//table with uploaded xlsx
	var table_transf = element(by.xpath('//table[@id="xero-reconciliation-example-table"]/tbody[@id="table-body"]/tr[1]/td[1]'));
	this.table_transf = table_transf;
};
module.exports = AdminPage;