var GoRemotePage = function () {
    var read_more_lnk = element.all(by.linkText('Read more'));
    this.read_more_lnk = read_more_lnk;

    var send_scr = element.all(by.linkText('Send your script or video'));
    this.send_scr = send_scr;

    var regist = element(by.linkText('Register'));
    this.regist = regist;

    var regist_or_sign = element(by.linkText('Register or Sign in'));
    this.regist_or_sign = regist_or_sign;

    var nav_to_camp = element(by.linkText('Navigate to #GoRemote'));
    this.nav_to_camp = nav_to_camp;

    var vote = element(by.linkText('Vote'));
    this.vote = vote;

    var goremote = element(by.linkText('#GoRemote'));
    this.goremote = goremote;

    var submit_link = element(by.linkText('Submit a link to a video or write a script'));
    this.submit_link = submit_link;

    var partner_lnk = element.all(by.xpath('//div[@class ="partners"]/descendant::a'));
    this.partner_lnk = partner_lnk;

    var mail_link = element(by.linkText('office@transformify.org'));
    this.mail_link = mail_link;
};
module.exports = GoRemotePage;