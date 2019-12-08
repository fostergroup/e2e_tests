var HomePage = function() {
	//btn sign in as a member
	var btnMember = element.all(by.linkText('Member Sign-In'));
	this.btnMember = btnMember;

	//btn sign in as a partner
	var btnPartner = element.all(by.linkText('Partner Sign-In'));
	this.btnPartner = btnPartner;

	//btn log in
	var login = element(by.css('.nav-login'));
	//noinspection JSUnresolvedVariable
	this.login = login;

	var profileLink = element(by.xpath('//a[@class="dropdown-toggle"]'));
	this.profileLink = profileLink;

	var butterBrott = element(by.xpath('//nav[@id="main-navigation"]/descendant::button'));
	this.butterBrott = butterBrott;

	//sign out link 
	var signOut = element(by.linkText('Sign out'));
	this.signOut = signOut;

	//link to blog
	var blog = element(by.linkText('Blog'));
	//noinspection JSUnresolvedVariable
	this.blog = blog;
};
module.exports = HomePage;