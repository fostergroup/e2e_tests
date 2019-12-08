var CommonElementsPage = require('./CommonElementsPage.js');
var com_ele = new CommonElementsPage();
var FindMembersPage = function () {
    //input member id;
    var member_id_input = element(by.id('member_id'));
    this.member_id_input = member_id_input;

    //btn filter members
    var filter_btn = element(by.xpath("//button[contains(text(), 'Filter')]"));
    this.filter_btn = filter_btn;

    var assign_btn = element(by.xpath('//button[text()="Assign to project"]'));
    this.assign_btn = assign_btn;

    var invite_btn = element(by.xpath("//button[contains(text(), 'Invite')]"));
    this.invite_btn = invite_btn;

    var accept_int_btn = element(by.xpath("//button[contains(text(), 'Accept for Interview')]"));
    this.accept_int_btn = accept_int_btn;

	var interview_details_btn = element(by.linkText('Interview details'));
	this.interview_details_btn = interview_details_btn;

    var decline_btn = element(by.xpath("//button[contains(text(), 'Decline')]"));
    this.decline_btn = decline_btn;

    var create_test_pro_btn = element(by.linkText('Create Test Project'));
    this.create_test_pro_btn = create_test_pro_btn;

    //get member info inside toggle form
    var member_toggle_info = element.all(by.xpath('//p[2]'));
    this.member_toggle_info = member_toggle_info;

    //toogle_form
    var response_form = element(by.id('response_form'));
    this.response_form = response_form;

    //back btn in modal dialog
    var back_btn_dialog = element(by.xpath('//*[@id="response_form"]/descendant::button[text()="Back"]'));
    this.back_btn_dialog = back_btn_dialog;

    // dropdown list in modal dialog to select payment type
    var sel_pay_type = element(by.xpath('//div[@id="s2id_payment-type"]/a'));
    this.sel_pay_type = sel_pay_type;

    // dropdown list in modal dialog to select payments number
    var sel_pay_nb = element(by.xpath('//div[@id="s2id_payment-occurrence"]/a'));
    this.sel_pay_nb = sel_pay_nb;

    // btn back to active projects
    var back_to_active_pr_btn = element(by.xpath('//a[contains(text(), "Back to projects list")]'));
    this.back_to_active_pr_btn = back_to_active_pr_btn;
};

module.exports = FindMembersPage;