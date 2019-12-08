var WorkHistoryPage = require('../pages/WorkHistoryPage.js');
var workhis = new WorkHistoryPage();

var Helper = require('../helper.js');
var helper = new Helper();

var CommonElementsPage = require('../pages/CommonElementsPage.js');
var com_ele = new CommonElementsPage();

var EC = protractor.ExpectedConditions;

var WorkHistoryActions = function () {
    //click save btn
    var save_btn_fn = function (index) {
        workhis.save_btn.count().then(function (count) {
            console.log('btn count: ' + count);
        });
        expect(workhis.save_btn.get(index).isDisplayed()).toBeTruthy();
        workhis.save_btn.get(index).click();
    };
    this.save_btn_fn = save_btn_fn;

    //click reset btn
    this.reset_fn = function () {
        expect(workhis.reset_btn.isDisplayed()).toBeTruthy();
        workhis.reset_btn.click();
    };

    //click edit btn
    this.edit_fn = function (index) {
        browser.wait(EC.visibilityOf(workhis.edit_btn.get(index)), 5000, 'btn edit is not visible');
        workhis.edit_btn.get(index).click();
    };

    //click add work btn
    this.add_btn_fn = function () {
        browser.wait(EC.elementToBeClickable(workhis.add_work_btn), 7000, 'btn add record is not visible');
        workhis.add_work_btn.click();
    };

    //click close work btn
    this.close_btn_fn = function (index) {
        workhis.close_btn.count().then(function (count) {
            console.log('close btn count: ' + count);
        });
        browser.sleep(1000);
        expect(workhis.close_btn.get(index).isDisplayed()).toBeTruthy();
        workhis.close_btn.get(index).click();
    };

    //set work time up to current
    this.check_current_work_fn = function () {
        com_ele.check_box.get(0).click();
        expect(workhis.sel_to_year.getAttribute('class')).toContain('disabled');
        expect(workhis.sel_to_mo.getAttribute('class')).toContain('disabled');
    };


    //get working records
    this.get_working_rd_fn = function () {
        browser.wait(EC.presenceOf(workhis.working_rd), 5000, 'working record is not visible');
        //console.log(working_rd.getText());
        return workhis.working_rd.getText();
    };

    //get text from working textarea
    this.get_history_fn = function () {
        browser.wait(EC.presenceOf(workhis.work_hist_area), 5000, 'working record is not visible');
        //console.log(working_rd.getText());
        return workhis.work_hist_area.getText();
    };

    //get working record
    this.get_record_text_fn = function (index) {
        browser.wait(EC.presenceOf(workhis.work_record.get(index)), 5000, 'working record is not visible');
        //console.log(working_rd.getText());
        return workhis.work_record.get(index).getText();
    };

    //count number of edit btns
    this.count_edit_fn = function () {
        //console.log(working_rd.getText());
        return workhis.edit_btn.count();
    };
    //*[@id="s2id_autogen142_search"]
    //fill the form
    this.fill_form_fn = function (input_cname, input_position, input_desc, input_year_from, input_year_to, input_month_from, input_month_to) {
        browser.wait(EC.visibilityOf(workhis.company_name), 5000);
        workhis.company_name.clear();
        if (input_cname != null) {
            workhis.company_name.sendKeys(input_cname);
        }

        expect(workhis.cposition.isDisplayed()).toBeTruthy();
        workhis.cposition.clear();
        if (input_position != null) {
            workhis.cposition.sendKeys(input_position);
        }

        expect(workhis.desc.isDisplayed()).toBeTruthy();
        workhis.desc.clear();
        if (input_desc != null) {
            workhis.desc.sendKeys(input_desc);
        }
        expect(workhis.sel_from_year.isDisplayed()).toBeTruthy();
        //set year from
        if(input_year_from!=null){
            expect(workhis.sel_from_year.isDisplayed()).toBeTruthy();
            workhis.sel_from_year.click();
            browser.wait(EC.presenceOf(com_ele.select_input), 5000, 'input from_year is not visible');
            com_ele.select_input.sendKeys(input_year_from).sendKeys(protractor.Key.ENTER);
        }
        //set month_from
        if(input_month_from!=null){
            expect(workhis.sel_from_mo.isDisplayed()).toBeTruthy();
            workhis.sel_from_mo.click();
            browser.wait(EC.presenceOf(com_ele.select_input), 5000, 'input month_from is not visible');
            com_ele.select_input.sendKeys(input_month_from).sendKeys(protractor.Key.ENTER);
        }
        if(input_year_to!=null){
            //set year to
            expect(workhis.sel_to_year.isDisplayed()).toBeTruthy();
            workhis.sel_to_year.click();
            browser.wait(EC.presenceOf(com_ele.select_input), 5000, 'input to_year is not visible');
            com_ele.select_input.sendKeys(input_year_to).sendKeys(protractor.Key.ENTER);
        }

        if(input_month_to!=null){
            //set month to
            expect(workhis.sel_to_mo.isDisplayed()).toBeTruthy();
            workhis.sel_to_mo.click();
            browser.wait(EC.presenceOf(com_ele.select_input), 5000, 'input month to is not visible');
            com_ele.select_input.sendKeys(input_month_to).sendKeys(protractor.Key.ENTER);
        }
    };

    this.remove_wh_fn = function () {
        var count_before,
            count_after;
        workhis.edit_btn.count().then(function (count) {
            console.log('edit btn count: ' + count);
            count_before = count;
            if (count != 0) {
                for (i = 0; i < count; i++) {
                    console.log('again count: ' + count);
                    console.log('current index: ' + i);
                    browser.sleep(5000);
					browser.wait(EC.elementToBeClickable(workhis.edit_btn.get(0)), 5000, 'checkbox is not selected');
					workhis.edit_btn.get(0).click();
                    workhis.del_check.click();
                    browser.wait(EC.elementToBeSelected(workhis.del_checkbox), 5000, 'checkbox is not selected');
                    save_btn_fn(0);
                }
            }
            else {
                workhis.working_rd.getText().then(function (text) {
                    console.log('text from work history: ' + text);
                    expect(text).toContain('not set');
                });
            }
        });
        browser.sleep(1000);
        workhis.edit_btn.count().then(function (count) {
            console.log('edit btn count: ' + count);
            count_after = count;
            expect(count_after).toEqual(0);
        });
        workhis.working_rd.getText().then(function (text) {
            console.log('text from work history: ' + text);
            expect(text).toContain('not set');
        });
    };
};
module.exports = WorkHistoryActions;