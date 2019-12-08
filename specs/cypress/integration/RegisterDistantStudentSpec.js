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
  checkElementVisibility,
  fillCheckboxes,
  checkElementNotExist,
  checkErrorTexts,
  checkElementsContainText,
  uploadFiles,
} from "../src/actions/CommonElementsActions.js";
import comEle from '../src/pagesElementsSelectors/CommonElements.js';
import SmallForm from '../src/pagesElementsSelectors/SmallRegistrationFormPage.js';
import LargeForm from '../src/pagesElementsSelectors/LargeRegistrationFormPage.js';
import DistantRegistrationActions from '../src/actions/DistantRegistrationActions.js';
import utils from '../src/utils/utils.js';
import params from '../src/utils/params.js';
import titles from '../src/utils/titles.js';
import urls from '../src/utils/urls.js';

let distAct = new DistantRegistrationActions();
let util = new utils();
//let comEle = new CommonElements();
let snilsNumber, email, randomStr;
randomStr = util.randomString();
email = randomStr + '@' + params.emailDomain;
let formElementsWithError = [];
/* Sign up as a new distant user and save result to file */
let userData = {
  authorityName: params.authorityNames.regional,
  region: '',
  authorizeName: '',
  post: '',
  loadReference: {
    file: '',
    mimeType: ''
  },
  delivery: {
    way: params.delivery.post,
    index: '',
    city: '',
    street: '',
    house: '',
    building: '',
    flat: ''
  },
  educationInProgress: false,
  additionalInfo: {
    isSet: false,
    wasSet: false,
    educationInProgress: {
      isSet: false,
      level: '',
      year: 2019,
      month: params.month.aug,
      day: 31
    },
    isDisabledPerson: false
  },
  avatar: {
    file: '',
    mimeType: ''
  },
  personalPhoto: {
    file: '',
    mimeType: ''
  },
  user: {
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    snils: ''
  },
  changesPersonalData: false,
  birthday: {
    year: 2019,
    month: params.month.oct,
    day: 21
  },
  passport: {
    series: '',
    number: '',
    deliveryAuthority: '',
    deliveryCode: '',
    address: ''
  },
  education: {
    lastNameChanged: '',
    firstNameChanged: '',
    middleNameChanged: '',
    series: '',
    number: '',
    docRegNumber: ''
  }
};

describe('Sign up as a new user', function () {
  /*it('test', function () {
    cy.visit(urls.distantReg, {timeout: 100000});
    let p = {firstName: params.user.firstName};
    distAct.fillSmallForm_(p);
  });*/
  it('Fill small form with null values, do not accept terms and conditions', () => {
    cy.visit(urls.distantReg, {timeout: 100000});
    //check that submit btn is disabled
    submit(false);
    //check checkboxes for form submit:
    fillCheckboxes(0, false, true);
    fillCheckboxes(1, false, false);
    submit(false);
    // set checkboxes only one and check that btn is disabled:
    fillCheckboxes(0, true, false);
    fillCheckboxes(1, false, true);
    submit(false);

    fillCheckboxes(0, false, true);
    fillCheckboxes(1, true, true);
    submit(true);

    formElementsWithError = [SmallForm.firstNameInput + ' ~ ' + comEle.errorRedTextForInput,
      SmallForm.lastNameInput + ' ~ ' + comEle.errorRedTextForInput,
      SmallForm.middleNameInput + ' ~ ' + comEle.errorRedTextForInput,
      SmallForm.emailInput + ' ~ ' + comEle.errorRedTextForInput,
      SmallForm.snilsInput + ' ~ ' + comEle.errorRedTextForInput
    ];
    checkErrorTexts(formElementsWithError, titles.fillField);
  });
  it('Fill small form with valid info', () => {
    snilsNumber = util.generateSnils();
    let smallRegFromParams = {
      firstName: params.user.firstName,
      lastName: params.user.lastName,
      middleName: params.user.middleName,
      email: email,
      snils: snilsNumber
    };
    distAct.fillSmallForm(smallRegFromParams);
    submit(true);
    //check redirect to who-are-you
    checkURL(urls.whoAreYou);
    //select registration type:
    distAct.selectRegType();
    checkURL(urls.remoteRegistration);
  });
  it('Do not fill form and check errors for each field', () => {
    //set checkboxes as without checkboxes form is not enabled:
    fillCheckboxes(4, false, true);
    fillCheckboxes(5, false, false);
    distAct.submit(false);

    fillCheckboxes(4, true, false);
    fillCheckboxes(5, false, true);
    distAct.submit(false);

    fillCheckboxes(4, false, true);
    fillCheckboxes(5, true, true);
    distAct.submit(true);
    //check all error fields:
    formElementsWithError = [LargeForm.authoritySelect + ' ~ ' + comEle.errorRedTextForInput,
      LargeForm.loadReference + ' > ' + comEle.errorRedTextForFile,
      LargeForm.loadReference + ' > ' + comEle.errorRedTextForFile,

      LargeForm.fullNameDative + ' ~ ' + comEle.errorRedTextForInput,
      LargeForm.fullNameDative + ' ~ ' + comEle.errorRedTextForInput,
      LargeForm.phone + ' ~ ' + comEle.errorRedTextForInput,
      LargeForm.personalPhoto + ' > ' + comEle.errorRedTextForFile,
      LargeForm.deliveryWaysList + ' ~ ' + comEle.errorRedTextForInput,
      LargeForm.passportSeries + ' ~ ' + comEle.errorRedTextForInput,
      LargeForm.passportNumber + ' ~ ' + comEle.errorRedTextForInput,
      LargeForm.passportIssuedBy + ' ~ ' + comEle.errorRedTextForInput,
      LargeForm.passportCodeIssue + ' ~ ' + comEle.errorRedTextForInput,
      LargeForm.passportPhotoFile + ' > ' + comEle.errorRedTextForFile,
      LargeForm.passportRegisterFile + ' > ' + comEle.errorRedTextForFile,
      LargeForm.educationLevelList + ' ~ ' + comEle.errorRedTextForInput,
      LargeForm.educationDocumentSerial + ' ~ ' + comEle.errorRedTextForInput,
      LargeForm.educationDocumentNumber + ' ~ ' + comEle.errorRedTextForInput,
      LargeForm.education + ' > .input-mask > ' + comEle.errorRedTextForInput
    ];
    checkErrorTexts(formElementsWithError, titles.fillField);
    //check that elements from previous form is filled:
    let preFilledElements = [{
      element: LargeForm.firstName,
      text: params.user.firstName
    }, {
      element: LargeForm.middleName,
      text: params.user.middleName
    }, {
      element: LargeForm.lastName,
      text: params.user.lastName
    }, {
      element: LargeForm.workEmail,
      text: email
    }];
    checkElementsContainText(preFilledElements);
  });
 /* it('Fill large form', () => {
      distAct.fillLargeRegForm(0, userData, )
  });*/
});
