var DashPage = function() {
	//email
	var email = element(by.id('email'));
	this.email = email;

	//pswd:
    var pswd = element(by.id('password'));
    this.pswd = pswd;

    //login btn:
    var submit_btn = element(by.id('submitButton'));
    this.submit_btn = submit_btn;

    //accounts link:
    var account_lnk = element(by.linkText('Accounts'));
    this.account_lnk = account_lnk;

    //sales link (partner invoices):
    var sales_lnk = element(by.linkText('Sales'));
    this.sales_lnk = sales_lnk;

    //Purchases link (member invoices):
    var purch_lnk = element(by.linkText('Purchases'));
    this.purch_lnk = purch_lnk;

    //search button:
    var search_btn = element(by.id('search_button'));
    this.search_btn = search_btn;

    //search input:
    var search_input = element(by.id('sb_txtReference'));
    this.search_input = search_input;

    //search invoices button:
    var search_inv_btn = element(by.id('ext-gen39'));
    this.search_inv_btn = search_inv_btn;

    //search bills button:
    var search_bill_btn = element(by.id('ext-gen37'));
    this.search_bill_btn = search_bill_btn;


    //view invoice:
    var view_part_inv = element(by.id('ext-gen43'));
    this.view_part_inv = view_part_inv;

    //view bill:
    var view_memb_inv = element(by.id('ext-gen41'));
    this.view_memb_inv = view_memb_inv;

    //manage usd account:
    var manage_usd_account = element(by.id('ext-gen44'));
    this.manage_usd_account = manage_usd_account;

    //submit search invoice:
    var submit_search = element(by.id('sbSubmit_'));
    this.submit_search = submit_search;

    //see all invoice:
    var see_all_lnk = element.all(by.linkText('See all'));
    this.see_all_lnk = see_all_lnk;

    //view details:
    var details = element(by.css('.total'));
    this.details = details;

    //username link:
    var user_lnk = element(by.css('.username'));
    this.user_lnk = user_lnk;

    //logout link:
    var logout_lnk = element(by.linkText('Logout'));
    this.logout_lnk = logout_lnk;

    //link to view the details
    var cont_lnk = element(by.xpath("//a[contains(@href, '/Contacts/View')]"));
    this.cont_lnk = cont_lnk;

    //view address:
    var cont_address = element(by.className('field address'));
    this.cont_address = cont_address;

    //view account:
    var account_lnk = element(by.linkText('Accounts'));
    this.account_lnk = account_lnk;

    //view bank account:
    var bank_account_lnk = element(by.linkText('Bank Accounts'));
    this.bank_account_lnk = bank_account_lnk;

    //import statement:
    var import_statement_lnk = element(by.xpath('//*[@id="ext-gen43"]/div[1]/div[3]/ul/li[4]/a'));
    this.import_statement_lnk = import_statement_lnk;

    //import file:
    var file_path = element(by.id('UploadFile'));
    this.file_path = file_path;

    //reconsile:
    var btn_ok = element(by.linkText('OK'));
    this.btn_ok = btn_ok;

    //find and match btn:
    var find_match = element(by.linkText('Find & Match'));
    this.find_match = find_match;

    //reconsile:
    var search_ref = element(by.id('searchNameText'));
    this.search_ref = search_ref;

    //import btn:
    var import_btn = element(by.xpath('//*[@id="frmMain"]/descendant::button'));
    this.import_btn = import_btn;

    //checkbox to reconcile:
    var checkbox_recons = element(by.id('selectAllToggle'));
    this.checkbox_recons = checkbox_recons;

    //selected checkbox
	var sel_checkbox = element(by.id('selectAllTransactions'));
	this.sel_checkbox = sel_checkbox;

    //confirm btn
	var confirm_btn = element(by.xpath('//button[text()="Confirm"]'));
	this.confirm_btn = confirm_btn;
};
module.exports = DashPage;