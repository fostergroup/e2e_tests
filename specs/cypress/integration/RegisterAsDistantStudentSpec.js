import {
    submit,
    selectFromDropList,
    checkURL,
    uploadFile,
    checkAttachment,
    getCalendarItem,
    fillCheckbox,
    closeModalDialog,
    checkErrorText,
    checkElementContainsText,
    checkCheckboxIsMarkedWithError,
    checkElementVisibility
} from '../src/actions/CommonElementsActions.js';
import comEle from '../src/pagesElementsSelectors/CommonElements.js';
import SmallForm from '../src/pagesElementsSelectors/SmallRegistrationFormPage.js';
import LargeForm from '../src/pagesElementsSelectors/LargeRegistrationFormPage.js';
import DistantRegistrationActions from '../src/actions/DistantRegistrationActions.js';
import utils from '../src/utils/utils.js';
import params from '../src/utils/params.js';
import titles from '../src/utils/titles.js';
import urls from '../src/utils/urls.js';
import {checkElementNotExist} from "../src/actions/CommonElementsActions";

let distAct = new DistantRegistrationActions();
let util = new utils();
//let comEle = new CommonElements();
let snilsNumber, email, randomStr;
randomStr = util.randomString();
email = randomStr + '@' + params.emailDomain;
/* Sign up as a new distant user and save result to file */

describe('Sign up as a new user', function () {
    it('Fill small form with null values, do not accept terms and conditions', () => {
        cy.visit(urls.distantReg, {timeout: 100000});
        distAct.fillSmallForm(null, null, null, null, null);
        //check that submit btn is disabled
        submit(false);
        //check checkboxes for form submit:
        fillCheckbox(SmallForm.personalDataCheckbox, false, true);
        fillCheckbox(SmallForm.termsAndConditionsCheckbox, false, true);
        submit(true);
        checkErrorText(SmallForm.firstNameInput + ' ~ ' + comEle.errorRedTextForInput, titles.fillField);
        checkErrorText(SmallForm.lastNameInput + ' ~ ' + comEle.errorRedTextForInput, titles.fillField);
        checkErrorText(SmallForm.middleNameInput + ' ~ ' + comEle.errorRedTextForInput, titles.fillField);
        checkErrorText(SmallForm.emailInput + ' ~ ' + comEle.errorRedTextForInput, titles.fillField);
        checkErrorText(SmallForm.snilsInput + ' ~ ' + comEle.errorRedTextForInput, titles.fillField);
    });
    it('Fill small form with valid info', () => {
        snilsNumber = util.generateSnils();
        distAct.fillSmallForm(params.user.firstName, params.user.lastName, params.user.middleName, email, snilsNumber);
        submit(true);
        //check redirect to who-are-you
        checkURL(urls.whoAreYou);
        //select registration type:
        distAct.selectRegType();
        checkURL(urls.remoteRegistration);
    });
    it('Do not fill form and check errors for each field', () => {
        //set checkboxes as without checkboxes form is not enabled:
        fillCheckbox(SmallForm.termsAndConditionsCheckbox, false, true);
        //check that button is not enabled:
        distAct.submit(false);
        fillCheckbox(LargeForm.dataHandleAcceptCheckbox, false, true);
        distAct.submit(true);
        //check all error fields:
        checkErrorText(LargeForm.authoritySelect + ' ~ ' + comEle.errorRedTextForInput, titles.fillField);
        checkErrorText(LargeForm.loadReference + ' > ' + comEle.errorRedTextForFile, titles.fillField);
        checkErrorText(LargeForm.loadLaborBook + ' > ' + comEle.errorRedTextForFile, titles.fillField);

        checkErrorText(LargeForm.fullNameDative + ' ~ ' + comEle.errorRedTextForInput, titles.fillField);
        checkErrorText(LargeForm.genderSelect + ' ~ ' + comEle.errorRedTextForInput, titles.fillField);
        checkErrorText(LargeForm.phone + ' ~ ' + comEle.errorRedTextForInput, titles.fillField);
        checkErrorText(LargeForm.personalPhoto + ' > ' + comEle.errorRedTextForFile, titles.fillField);
        checkErrorText(LargeForm.deliveryWaysList + ' ~ ' + comEle.errorRedTextForInput, titles.fillField);
        checkErrorText(LargeForm.passportSeries + ' ~ ' + comEle.errorRedTextForInput, titles.fillField);
        checkErrorText(LargeForm.passportNumber + ' ~ ' + comEle.errorRedTextForInput, titles.fillField);
        checkErrorText(LargeForm.passportIssuedBy + ' ~ ' + comEle.errorRedTextForInput, titles.fillField);
        checkErrorText(LargeForm.passportCodeIssue + ' ~ ' + comEle.errorRedTextForInput, titles.fillField);
        checkErrorText(LargeForm.passportPhotoFile + ' > ' + comEle.errorRedTextForFile, titles.fillField);
        checkErrorText(LargeForm.passportRegisterFile + ' > ' + comEle.errorRedTextForFile, titles.fillField);
        checkErrorText(LargeForm.educationLevelList + ' ~ ' + comEle.errorRedTextForInput, titles.fillField);
        checkErrorText(LargeForm.educationDocumentSerial + ' ~ ' + comEle.errorRedTextForInput, titles.fillField);
        checkErrorText(LargeForm.educationDocumentNumber + ' ~ ' + comEle.errorRedTextForInput, titles.fillField);
        checkErrorText(LargeForm.education + ' > .input-mask > ' + comEle.errorRedTextForInput, titles.fillField);
        //check that elements from previous form is filled:
        checkElementContainsText(LargeForm.firstName, params.user.firstName);
        checkElementContainsText(LargeForm.middleName, params.user.middleName);
        checkElementContainsText(LargeForm.lastName, params.user.lastName);
        checkElementContainsText(LargeForm.workEmail, email);
    });
    it('Fill large form', () => {
        distAct.selectAuthority();
        selectFromDropList(params.authorityNames.regional, 1);
        distAct.selectRegion();
        selectFromDropList('Байконур', 1);
        distAct.setAuthorizeName('Филиал');
        distAct.setPresentPost('Секретарь');

        uploadFile(LargeForm.loadReference + LargeForm.fileInput, comEle.files.csv, 'csv');
        checkAttachment(LargeForm.loadReference,
            LargeForm.addedFileDisplay, false);

        uploadFile(LargeForm.loadReference + LargeForm.fileInput, comEle.files.largeFile, 'jpg');
        //upload valid file:
        uploadFile(LargeForm.loadReference + LargeForm.fileInput, comEle.files.png, 'png');
        checkAttachment(LargeForm.loadReference, LargeForm.addedFileDisplay, true);

        //fill labor book copy as non pdf:
        uploadFile(LargeForm.loadLaborBook + LargeForm.fileInput, comEle.files.png, 'png');
        checkAttachment(LargeForm.loadLaborBook, LargeForm.addedFileDisplay, false);
        uploadFile(LargeForm.loadLaborBook + LargeForm.fileInput, comEle.files.pdf, 'pdf');
        //todo: test with large zip does not path
        uploadFile(LargeForm.loadLaborBook + LargeForm.fileInput, comEle.files.pdf, 'pdf');
        checkAttachment(LargeForm.loadLaborBook, LargeForm.addedFileDisplay, true);

        //fill date of birth
        getCalendarItem(LargeForm.personalForm, 2011, params.month.oct, 3);
        //fill gender
        distAct.selectGender();
        selectFromDropList(params.gender.male, 1);

        distAct.setPhoneNumber(params.validPhone);
        //upload personal photo
        uploadFile(LargeForm.personalPhoto + LargeForm.fileInput, comEle.files.jpeg, 'jpeg');
        checkAttachment(LargeForm.personalPhoto, LargeForm.addedFileDisplay, true);
        //set delivery way
        //check that post inputs are not displayed:
        checkElementNotExist(LargeForm.postHouse);
        distAct.selectDeliveryWay();
        selectFromDropList(params.delivery.post, 1);
        cy.wait(500);
        //check that we have error display nearby post addresses fields:
        checkErrorText(LargeForm.postIndex + ' ~ ' + comEle.errorRedTextForInput, titles.fillField);
        checkErrorText(LargeForm.postCity + ' ~ ' + comEle.errorRedTextForInput, titles.fillField);
        checkErrorText(LargeForm.postStreet + ' ~ ' + comEle.errorRedTextForInput, titles.fillField);
        checkErrorText(LargeForm.postHouse + ' ~ ' + comEle.errorRedTextForInput, titles.fillField);

        distAct.selectDeliveryWay();
        //set delivery way as personally:
        selectFromDropList(params.delivery.personally, 1);
        cy.wait(500);
        //check that element now is not on the form
        checkElementNotExist(LargeForm.postIndex);
        checkCheckboxIsMarkedWithError(LargeForm.deliveryAcceptCheckbox);
        //set checkbox:
        fillCheckbox(LargeForm.deliveryAcceptCheckbox, false, true);
        //check that checkbox is now checked
        fillCheckbox(LargeForm.deliveryAcceptCheckbox, true, true);
        //fill passport fields with invalid data, passport and series are too short:
        distAct.fillPassportData(11, 111, ' ', 11);
        checkErrorText(LargeForm.passportSeries + ' ~ ' + comEle.errorRedTextForInput, titles.fillField);
        checkErrorText(LargeForm.passportNumber + ' ~ ' + comEle.errorRedTextForInput, titles.fillField);
        checkErrorText(LargeForm.passportCodeIssue + ' ~ ' + comEle.errorRedTextForInput, titles.fillField);

        //fill passport fields with invalid data, passport and series are too short:
        distAct.fillPassportData('a', 'a', ' ', 'a');
        checkErrorText(LargeForm.passportSeries + ' ~ ' + comEle.errorRedTextForInput, titles.fillField);
        checkErrorText(LargeForm.passportNumber + ' ~ ' + comEle.errorRedTextForInput, titles.fillField);
        checkErrorText(LargeForm.passportCodeIssue + ' ~ ' + comEle.errorRedTextForInput, titles.fillField);
        checkErrorText(LargeForm.passportIssuedBy + ' ~ ' + comEle.errorRedTextForInput, titles.fillField);

        //set valid passport data:
        distAct.fillPassportData(params.passport.series, params.passport.number, params.authorityNames.deliverAuthority, params.passport.issuedCode);
        getCalendarItem(LargeForm.passportDataForm, 2012, params.month.aug, 31);
        uploadFile(LargeForm.passportPhotoFile + LargeForm.fileInput, comEle.files.jpg, 'jpg');
        uploadFile(LargeForm.passportRegisterFile + LargeForm.fileInput, comEle.files.jpg, 'jpg');


        //set checkbox about name changes:
        fillCheckbox(LargeForm.isLastNameChangedCheckbox, false, true);
        //check that now text is displayed about change name image file:
        checkErrorText(LargeForm.nameChanges + ' > ' + comEle.errorRedTextForFile, titles.fillField);
        //todo: will be added param for phone confirmation
        //add file for change name:
        uploadFile(LargeForm.changeNameFile + LargeForm.fileInput, comEle.files.jpg, 'jpg');
        checkAttachment(LargeForm.changeNameFile, LargeForm.addedFileDisplay, true);
        //fill education form:
        distAct.fillEducationForm(params.user.changedLastName, params.user.changedFirstName, params.user.changedMiddleName,
            params.educationDoc.series, params.educationDoc.number, params.educationDoc.regNumber);
        //select educationLevel, set calendar date and add file:
        distAct.setEducationLevel();
        selectFromDropList(params.educationLevels.bachelor, 1);
        getCalendarItem(LargeForm.educationDocForm, 2012, params.month.aug, 31);
        uploadFile(LargeForm.educationDocumentFile + LargeForm.fileInput, comEle.files.jpg, 'jpg');

        //set additional fields:
        distAct.showAdditionalDataFields();
        cy.wait(1000);
        //check visibility of checkboxes:
        checkElementVisibility(LargeForm.isEducationInProgressVisibleStyledCheckbox, true);
        fillCheckbox(LargeForm.isEducationInProgressCheckbox.isSet, false, true);
        //check that additional elements are displayed and marked with red
        checkErrorText(LargeForm.additionalEducation + ' ' + comEle.errorRedTextForInput, titles.fillField);
        getCalendarItem(LargeForm.additionalEducationInProgressForm, 2019, params.month.dec, 30);
        fillCheckbox(LargeForm.isGraduateStudentInProgressCheckbox, false, true);
        checkErrorText(LargeForm.magisterEndDate + ' > ' + comEle.errorRedTextForInput, titles.fillField);
        //set end date and additional education level:
        distAct.selectAdditionalEducation();
        selectFromDropList(params.educationLevels.bachelor, 2);
        getCalendarItem(LargeForm.magisterForm, 2019, params.month.dec, 30);
        //set invalid person
        fillCheckbox(LargeForm.isDisabledPeopleCheckbox, false, true);
        distAct.submit(true);
    });
});