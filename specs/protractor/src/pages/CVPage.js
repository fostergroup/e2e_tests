var CVPage = function () {
    //btn edit avatar
    var avatar = element(by.id('av-edit'));
    this.avatar = avatar;

    //btn edit cv
    var cv = element(by.id('cv-edit'));
    //noinspection JSUnresolvedVariable
	this.cv = cv;

    //cv textarea
    var resume = element(by.xpath("//textarea[contains(@id, 'resume')]"));
    this.resume = resume;

    //brief textarea
    var brief = element(by.xpath("//textarea[@id = 'brief']"));
    this.brief = brief;

    //cv label
    var resume_tx = element(by.xpath("//div[contains(@id, 'resume')]"));
    this.resume_tx = resume_tx;

    //brief text display
    var brief_tx = element(by.xpath("//div[@id = 'brief']"));
    this.brief_tx = brief_tx;

    //cv save btn
    var cvsave_btn = element(by.id('cv-save'));
    this.cvsave_btn = cvsave_btn;

    //brief save btn
    var brief_save_btn = element(by.id('brief-save'));
    this.brief_save_btn = brief_save_btn;

    //brief
    var brief_edit = element(by.id('brief-edit'));
    this.brief_edit = brief_edit;

    //brief
    var close_brief = element(by.id('brief-cancel'));
    this.close_brief = close_brief;

    //brief
    var close_cv = element(by.id('cv-cancel'));
    this.close_cv = close_cv;

    //select avatar link
    var avatar_input = element(by.id('transformify_member_avatar_avatar_file'));
    this.avatar_input = avatar_input;

    //select logo link
    var logo_input = element(by.id('transformify_partner_avatar_avatar_file'));
    this.logo_input = logo_input;

    //btn save in modal dialog
    var save_btn = element(by.id('av-save'));
    this.save_btn = save_btn;

    //btn close in modal dialog
    var close_btn = element(by.id('av-cancel'));
    this.close_btn = close_btn;

    //view help for cv
    var view_help_lnk = element(by.linkText('Request help with writing CV'));
    this.view_help_lnk = view_help_lnk;

    //avatar form
    var avat_form = element(by.id('edit-av'));
    this.avat_form = avat_form;

    //btn close help dialog
    var close_dialog_btn = element(by.xpath("//button[contains(text(), 'Close')]"));
    this.close_dialog_btn = close_dialog_btn;

	//checkbox to show/hide status
	var show_status = element(by.id('priority_status_checkbox'));
	this.show_status = show_status;

	//view priority status
	var view_status = element(by.id('priority_status'));
	this.view_status = view_status;
};
module.exports = CVPage;