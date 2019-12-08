var AvailabilityPage = require('../pages/AvailabilityPage.js');
var avail = new AvailabilityPage();

var CommonElementsPage = require('../pages/CommonElementsPage.js');
var com_ele = new CommonElementsPage();

var Helper = require('../helper.js');
var helper = new Helper();

var CommonActions = require('../actions/CommonActions.js');
var comact = new CommonActions();
var EC = protractor.ExpectedConditions;

var AvailabilityActions = function () {
	this.edit_availability = function () {
		browser.wait(EC.elementToBeClickable(avail.edit_avail), 5000, 'Link edit availability is not clickable');
		avail.edit_avail.click();
	};
	this.close_availability = function () {
		browser.wait(EC.elementToBeClickable(avail.close_avail), 5000, 'Close btn is not clickable');
		avail.close_avail.click();
	};
	this.submit_avail = function () {
		browser.wait(EC.elementToBeClickable(avail.submit_avail), 5000, 'Submit btn is not clickable');
		avail.submit_avail.click();
	};

	this.submit_ts = function () {
		browser.wait(EC.elementToBeClickable(avail.submit_ts), 5000, 'Submit ts btn is not clickable');
		avail.submit_ts.click();
	};
	var check_avail = function () {
		browser.wait(EC.presenceOf(avail.avail_slider), 15000, 'Slider for availability is not visible');
		return avail.avail_slider.isSelected();
	};
	this.check_avail = check_avail;
	this.set_avail_fn = function (availability, avail_days) {
		check_avail().then(function (result) {
			if (result && !availability) {
				//set up unavailable
				avail.move_slider.click();
			}
			else if (availability) {
				//set on availability
				if (!result) {
					avail.move_slider.click();
				}
				else {
					//if the user sets monday
					if (helper.isInArray('mo', avail_days)) {
						avail.mo.isSelected().then(function (isChecked) {
							//if monday is not selected, select it
							if (!isChecked) {
								com_ele.check_box.get(0).click();
								browser.wait(EC.elementToBeSelected(avail.mo), 5000, 'Monday is not selected');
							}
						});
					}
					else {
						avail.mo.isSelected().then(function (isChecked) {
							//if monday is not selected, select it
							if (isChecked) {
								com_ele.check_box.get(0).click();
								browser.wait(EC.not(EC.elementToBeSelected(avail.mo)), 5000, 'Monday is still selected');
							}
						});
					}
					if (helper.isInArray('tu', avail_days)) {
						avail.tu.isSelected().then(function (isChecked) {
							if (!isChecked) {
								com_ele.check_box.get(1).click();
								browser.wait(EC.elementToBeSelected(avail.tu), 5000, 'tu is not selected');
							}
						});
					}
					else {
						avail.tu.isSelected().then(function (isChecked) {
							if (isChecked) {
								com_ele.check_box.get(1).click();
								browser.wait(EC.not(EC.elementToBeSelected(avail.tu)), 5000, 'tu is still selected');
							}
						});
					}
					if (helper.isInArray('we', avail_days)) {
						avail.we.isSelected().then(function (isChecked) {
							//if monday is not selected, select it
							if (!isChecked) {
								com_ele.check_box.get(2).click();
								browser.wait(EC.elementToBeSelected(avail.we), 5000, 'we is not selected');
							}
						});
					}
					else {
						avail.we.isSelected().then(function (isChecked) {
							if (isChecked) {
								com_ele.check_box.get(2).click();
								browser.wait(EC.not(EC.elementToBeSelected(avail.we)), 5000, 'we is still selected');
							}
						});
					}
					if (helper.isInArray('th', avail_days)) {
						avail.th.isSelected().then(function (isChecked) {
							if (!isChecked) {
								com_ele.check_box.get(3).click();
								browser.wait(EC.elementToBeSelected(avail.th), 5000, 'th is not selected');
							}
						});
					}
					else {
						avail.th.isSelected().then(function (isChecked) {
							if (isChecked) {
								com_ele.check_box.get(3).click();
								browser.wait(EC.not(EC.elementToBeSelected(avail.th)), 5000, 'th is still selected');
							}
						});
					}
					if (helper.isInArray('fr', avail_days)) {
						avail.fr.isSelected().then(function (isChecked) {
							if (!isChecked) {
								com_ele.check_box.get(4).click();
								browser.wait(EC.elementToBeSelected(avail.fr), 5000, 'fr is still selected');
							}
						});
					}
					else {
						avail.fr.isSelected().then(function (isChecked) {
							if (isChecked) {
								com_ele.check_box.get(4).click();
								browser.wait(EC.not(EC.elementToBeSelected(avail.fr)), 5000, 'Monday is not selected');
							}
						});
					}
					if (helper.isInArray('sa', avail_days)) {
						avail.sa.isSelected().then(function (isChecked) {
							if (!isChecked) {
								com_ele.check_box.get(5).click();
								browser.wait(EC.elementToBeSelected(avail.sa), 5000, 'Monday is not selected');
							}
						});
					}
					else {
						avail.sa.isSelected().then(function (isChecked) {
							if (isChecked) {
								com_ele.check_box.get(5).click();
								browser.wait(EC.not(EC.elementToBeSelected(avail.sa)), 5000, 'Monday is not selected');
							}
						});
					}
					if (helper.isInArray('su', avail_days)) {
						avail.su.isSelected().then(function (isChecked) {
							if (!isChecked) {
								com_ele.check_box.get(6).click();
								browser.wait(EC.elementToBeSelected(avail.su), 5000, 'Monday is not selected');
							}
						});
					}
					else {
						avail.su.isSelected().then(function (isChecked) {
							if (isChecked) {
								com_ele.check_box.get(6).click();
								browser.wait(EC.not(EC.elementToBeSelected(avail.su)), 5000, 'Monday is not selected');
							}
						});
					}
				}

			}
			else if (result && availability) {
				//if the user sets monday
				if (helper.isInArray('mo', avail_days)) {
					avail.mo.isSelected().then(function (isChecked) {
						//if monday is not selected, select it
						if (!isChecked) {
							com_ele.check_box.get(0).click();
							browser.wait(EC.elementToBeSelected(avail.mo), 5000, 'Monday is not selected');
						}
					});
				}
				else {
					avail.mo.isSelected().then(function (isChecked) {
						//if monday is not selected, select it
						if (isChecked) {
							com_ele.check_box.get(0).click();
							browser.wait(EC.not(EC.elementToBeSelected(avail.mo)), 5000, 'Monday is not selected');
						}
					});
				}
				if (helper.isInArray('tu', avail_days)) {
					avail.tu.isSelected().then(function (isChecked) {
						if (!isChecked) {
							com_ele.check_box.get(1).click();
							browser.wait(EC.elementToBeSelected(avail.tu), 5000, 'Monday is not selected');
						}
					});
				}
				else {
					avail.tu.isSelected().then(function (isChecked) {
						if (isChecked) {
							com_ele.check_box.get(1).click();
							browser.wait(EC.not(EC.elementToBeSelected(avail.tu)), 5000, 'Monday is not selected');
						}
					});
				}
				if (helper.isInArray('we', avail_days)) {
					avail.we.isSelected().then(function (isChecked) {
						//if monday is not selected, select it
						if (!isChecked) {
							com_ele.check_box.get(2).click();
							browser.wait(EC.elementToBeSelected(avail.we), 5000, 'Monday is not selected');
						}
					});
				}
				else {
					avail.we.isSelected().then(function (isChecked) {
						if (isChecked) {
							com_ele.check_box.get(2).click();
							browser.wait(EC.not(EC.elementToBeSelected(avail.we)), 5000, 'Monday is not selected');
						}
					});
				}
				if (helper.isInArray('th', avail_days)) {
					avail.th.isSelected().then(function (isChecked) {
						if (!isChecked) {
							com_ele.check_box.get(3).click();
							browser.wait(EC.elementToBeSelected(avail.th), 5000, 'Monday is not selected');
						}
					});
				}
				else {
					avail.th.isSelected().then(function (isChecked) {
						if (isChecked) {
							com_ele.check_box.get(3).click();
							browser.wait(EC.not(EC.elementToBeSelected(avail.th)), 5000, 'th is still selected');
						}
					});
				}
				if (helper.isInArray('fr', avail_days)) {
					avail.fr.isSelected().then(function (isChecked) {
						if (!isChecked) {
							com_ele.check_box.get(4).click();
							browser.wait(EC.elementToBeSelected(avail.fr), 5000, 'fr is not selected');
						}
					});
				}
				else {
					avail.fr.isSelected().then(function (isChecked) {
						if (isChecked) {
							com_ele.check_box.get(4).click();
							browser.wait(EC.not(EC.elementToBeSelected(avail.fr)), 5000, 'fr is still selected');
						}
					});
				}
				if (helper.isInArray('sa', avail_days)) {
					avail.sa.isSelected().then(function (isChecked) {
						if (!isChecked) {
							com_ele.check_box.get(5).click();
							browser.wait(EC.elementToBeSelected(avail.sa), 5000, 'sa is still selected');
						}
					});
				}
				else {
					avail.sa.isSelected().then(function (isChecked) {
						if (isChecked) {
							com_ele.check_box.get(5).click();
							browser.wait(EC.not(EC.elementToBeSelected(avail.sa)), 5000, 'sa is still selected');
						}
					});
				}
				if (helper.isInArray('su', avail_days)) {
					avail.su.isSelected().then(function (isChecked) {
						if (!isChecked) {
							com_ele.check_box.get(6).click();
							browser.wait(EC.elementToBeSelected(avail.su), 5000, 'su is not selected');
						}
					});
				}
				else {
					avail.su.isSelected().then(function (isChecked) {
						if (isChecked) {
							com_ele.check_box.get(6).click();
							browser.wait(EC.not(EC.elementToBeSelected(avail.su)), 5000, 'su is not selected');
						}
					});
				}
			}
		});
	};

	this.get_avail_text = function () {
		return avail.avail_text.getText();
	};
	var edit_ts = function (index) {
		browser.wait(EC.elementToBeClickable(avail.timeslot_edit.get(index)), 5000, 'Btn edit timeslot is not clickable');
		avail.timeslot_edit.get(index).click();
	};
	this.edit_ts = edit_ts;

	this.count_edit_rec = function () {
		return avail.timeslot_edit.count();
	};

	this.fill_ts = function (hour_start, minute_start, hour_end, minute_end) {
		if (hour_start != null) {
			browser.wait(EC.elementToBeClickable(avail.timeslot_hour), 5000, 'Dropdown list is not clickable');
			avail.timeslot_hour.click();
			browser.wait(EC.visibilityOf(com_ele.select_input), 5000, 'Button edit is not clickable');
			com_ele.select_input.sendKeys(hour_start);
			com_ele.select_input.sendKeys(protractor.Key.ENTER);
		}

		if (minute_start != null) {
			browser.wait(EC.elementToBeClickable(avail.timeslot_minute), 5000, 'Dropdown list is not clickable');
			avail.timeslot_minute.click();
			browser.wait(EC.visibilityOf(com_ele.select_input), 5000, 'Button edit is not clickable');
			com_ele.select_input.sendKeys(minute_start);
			com_ele.select_input.sendKeys(protractor.Key.ENTER);
		}

		if (hour_end != null) {
			browser.wait(EC.elementToBeClickable(avail.timeslot_to_hour), 5000, 'Dropdown list is not clickable');
			avail.timeslot_to_hour.click();
			browser.wait(EC.visibilityOf(com_ele.select_input), 5000, 'Button edit is not clickable');
			com_ele.select_input.sendKeys(hour_end);
			com_ele.select_input.sendKeys(protractor.Key.ENTER);
		}

		if (minute_end != null) {
			browser.wait(EC.elementToBeClickable(avail.timeslot_to_minute), 5000, 'Dropdown list is not clickable');
			avail.timeslot_to_minute.click();
			browser.wait(EC.visibilityOf(com_ele.select_input), 5000, 'Button edit is not clickable');
			com_ele.select_input.sendKeys(minute_end);
			com_ele.select_input.sendKeys(protractor.Key.ENTER);
		}
	};
	this.delete_timeslot = function (index) {
		avail.timeslot_edit.get(index).isPresent().then(function (value) {
			if (value) {
				edit_ts(index);
				avail.delete_slot.click();
				avail.submit_ts.click();
				browser.sleep(1000);
			}
		});
	};
	this.get_ts_text = function () {
		browser.wait(EC.visibilityOf(avail.timeslot_text), 5000, 'Text  of timeslot is not visible');
		return avail.timeslot_text.getText();
	};
	this.add_ts = function () {
		browser.wait(EC.elementToBeClickable(avail.add_ts), 5000, 'Btn add timeslot is not clickable');
		avail.add_ts.click();
	};
};
module.exports = AvailabilityActions;