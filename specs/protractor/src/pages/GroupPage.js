var GroupPage = function() {
	//btn save group
	var save_group = element(by.id('tg-save'));
	this.save_group = save_group;

	//btn close group
	var close_group = element(by.id('tg-cancel'));
	this.close_group = close_group;

	//btn close partner group
	var close_part_group = element(by.id('sk-cancel'));
	this.close_part_group = close_part_group;

	//btn edit group
	var edit_group = element(by.id('tg-edit'));
	this.edit_group = edit_group;

	//dropdown list
	var droplist = element(by.xpath('//div[@id="s2id_target"]/a'));
	this.droplist = droplist;

	//area of group text:
	var group_text = element(by.className('caption padtop7'));
	this.group_text = group_text;

	//input for group text:
	var input_gr = element(by.id('edit-sk'));
	this.input_gr = input_gr;

	//input for group text:
	var input_foc = element(by.id('s2id_tg-search'));
	this.input_foc = input_foc;

	//btn save group
	var save_group_part = element(by.id('sk-save'));
	this.save_group_part = save_group_part;
};
module.exports = GroupPage;