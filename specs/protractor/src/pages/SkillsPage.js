var SkillsPage = function() {
  //edit skills btn
  var button_edit = element(by.id('sk-edit'));
  this.button_edit = button_edit;

  //new skill adding
  var new_skill = element(by.id('skillsInput'));
  this.new_skill = new_skill;

  var button_save = element(by.id('sk-save'));
this.button_save = button_save;

  //list of all elements on the page:
  var skills_tab = element(by.id('skills-tab'));
  this.skills_tab = skills_tab;

  var remove_skill = element.all(by.className('tm-tag-remove'));
  this.remove_skill = remove_skill;
  
  //get skills list
  var approved_skills = element.all(by.xpath('//div[@id="skills"]/descendant::li'));
  this.approved_skills = approved_skills;
  
//get skills list
  var approved_skills_ul = element(by.xpath('//div[@id="skills"]/descendant::ul'));
  this.approved_skills_ul = approved_skills_ul;
};

module.exports = SkillsPage;