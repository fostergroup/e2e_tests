var BlogPostPage = require('../pages/BlogPostPage.js');
var blog = new BlogPostPage();

var EC = protractor.ExpectedConditions;

var BlogPostActions = function () {
    //go to post a blog
    this.post_fn = function (title, img_url, short_resume, content) {
        browser.wait(EC.visibilityOf(blog.post_title), 5000, 'Field title is not visible');
        if(title!=null){
			blog.post_title.clear().sendKeys(title);
		}
		if(img_url!=null){
			blog.post_url.clear().sendKeys(img_url);
		}
		if(short_resume!=null){
			browser.switchTo().frame(0);
			browser.executeScript("arguments[0].innerHTML = '<h1>" + short_resume + "</h1>'", blog.post_content);
			browser.switchTo().defaultContent();
		}
		if(content!=null){
			browser.switchTo().frame(1);
			browser.executeScript("arguments[0].innerHTML = '<h1>" + content + "</h1>'", blog.post_content);
			browser.switchTo().defaultContent();
		}
    };
    this.compare_warn_text = function (text) {
		blog.warn.getText().then(function (value) {
			expect(value).toContain(text);
		});
	};
    this.back_to_dash = function () {
		browser.wait(EC.elementToBeClickable(blog.back_dash), 5000, 'Link back to dashboard is not clickable');
		blog.back_dash.click();
	};
	this.back_to_blog = function () {
		browser.wait(EC.elementToBeClickable(blog.back_blog), 5000, 'Link back to blog is not clickable');
		blog.back_blog.click();
	};
	this.show_blogpost = function (link) {
		browser.wait(EC.elementToBeClickable(element(by.linkText(link))), 5000, 'Blog post is not clickable');
		element(by.linkText(link)).click();
	};
};
module.exports = BlogPostActions;