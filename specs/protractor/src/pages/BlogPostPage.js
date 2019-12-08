var BlogPostPage = function() {
	//blog post title:
	var post_title = element(by.id('transformify_mainbundle_blogpost_title'));
	this.post_title = post_title;

	//blog title:
	var post_url = element(by.id('transformify_mainbundle_blogpost_imageUrl'));
	this.post_url = post_url;

	//short resume:
	var post_shortresume = element(by.id('transformify_mainbundle_blogpost_excerpt'));
	this.post_shortresume = post_shortresume;

	//content:
	var post_content = element(by.xpath('/html/body'));
	this.post_content = post_content;

	//guide:
	var guide = element(by.linkText('guidelines'));
	this.guide = guide;

	//warning:
	var warn = element(by.xpath('//div[@id="transformify_mainbundle_blogpost"]/descendant::li'));
	this.warn = warn;

	//back to dashboard:
	var back_dash = element(by.linkText('Back to Dashboard'));
	this.back_dash = back_dash;

	//back to blog:
	var back_blog = element(by.linkText('Back to Blog'));
	this.back_blog = back_blog;
};
module.exports = BlogPostPage;