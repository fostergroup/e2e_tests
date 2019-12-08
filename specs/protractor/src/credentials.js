var Credentials = function() {
	//common pswd
	var pswd = '!QAZxsw2#EDC';
	this.pswd = pswd;

	//member id uk vat:
	var member_vat_uk_id = 176;
	this.member_vat_uk_id = member_vat_uk_id;

    //member no vat uk id:
    var member_no_vat_non_uk_id = 225;
    this.member_no_vat_non_uk_id = member_no_vat_non_uk_id;

	//member with vat uk registration with projects
	var member_vat_uk_email = 'testactrans@yandex.ru';
	this.member_vat_uk_email = member_vat_uk_email;

	//member without projects:
	var no_pr_member = 'obVSBXSI@email.com';
	this.no_pr_member = no_pr_member;

	var with_proj_member_vat_non_uk_id = 226;
	this.with_proj_member_vat_non_uk_id = with_proj_member_vat_non_uk_id;

    //member with projects and non-uk country
    var with_proj_vat_non_uk_email = 'QgPMcuqC@email.com';
    this.with_proj_vat_non_uk_email = with_proj_vat_non_uk_email;

	//partner email with vat uk registration
	var part_vat_uk_email = 'partnertesttr@gmail.com';
	this.part_vat_uk_email = part_vat_uk_email;

	//non-active email
	var nonactiveEmail = 'na_testacpart@email.eu';
	this.nonactiveEmail = nonactiveEmail;

    //xero creds
	var xero_email = 'vitebchankagal@gmail.com';
    this.xero_email = xero_email;

    //partner email with uk registration and no vat set up:
    var part_non_vat_uk_email = 'kliment.ognianov@gmail.com';
    this.part_non_vat_uk_email = part_non_vat_uk_email;

    var part_non_vat_uk_id = 7;
    this.part_non_vat_uk_id = part_non_vat_uk_id;

    //partner email with vat non-uk registration:
    var part_vat_non_uk_email = 'gZUiVznC@email.com';
    this.part_vat_non_uk_email = part_vat_non_uk_email;

    //partner email with no vat non-uk registration:
    var part_no_vat_non_uk_email = 'gmgMlCUM@email.com';
    this.part_no_vat_non_uk_email = part_no_vat_non_uk_email;

    var part_no_vat_non_uk_id = 85;
    this.part_no_vat_non_uk_id = part_no_vat_non_uk_id;

	//member email with uk registration and no vat set up:
	var member_non_vat_uk_email = 'BdckzuVe@email.com';
	this.member_non_vat_uk_email = member_non_vat_uk_email;

    //member email with vat non-uk registration:
    var member_vat_non_uk_email = 'grpmZcLT@email.com';
    this.member_vat_non_uk_email = member_vat_non_uk_email;

    //member email with no vat non-uk registration:
    var member_no_vat_non_uk_email = 'SlJGfEQH@email.com';
    this.member_no_vat_non_uk_email = member_no_vat_non_uk_email;

    //affiliate approved partner:
    var affiliate_email = 'testactrans3@yandex.ru';
    this.affiliate_email = affiliate_email;

    var linked_login = 'trtestlinkedin@yandex.ru';
    this.linked_login = linked_login;

    var fb_login = 'trtestfb@yandex.ru';
    this.fb_login = fb_login;

    var google_login = 'testmembergm@gmail.com';
    this.google_login = google_login;

    var github_login = 'trtestgithub@yandex.ru';
    this.github_login = github_login;
};
module.exports = Credentials;