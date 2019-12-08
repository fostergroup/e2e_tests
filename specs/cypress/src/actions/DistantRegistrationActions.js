import SmallRegForm from '../pagesElementsSelectors/SmallRegistrationFormPage.js';
import LargeRegForm from '../pagesElementsSelectors/LargeRegistrationFormPage.js';
import {
  checkAttachment, checkElementNotExist,
  checkElementVisibility, fillCheckbox,
  fillCheckboxes, getCalendarItem,
  selectFromDropList,
  uploadFile
} from "./CommonElementsActions";
import params from "../utils/params";
import comEle from "../pagesElementsSelectors/CommonElements";
import LargeForm from "../pagesElementsSelectors/LargeRegistrationFormPage";
//import {checkElementVisibility} from 'CommonElementsActions.js';

export default function DistantRegistrationActions() {
  this.fillSmallForm = (params) => {
    if (params.hasOwnProperty('firstName') && params.firstName) {
      cy.get(SmallRegForm.firstNameInput).clear().type(params.firstName);

    }
    if (params.hasOwnProperty('lastName') && params.lastName) {
      cy.get(SmallRegForm.lastNameInput).clear().type(params.lastName);
    }
    if (params.hasOwnProperty('middleName') && params.middleName) {
      cy.get(SmallRegForm.middleNameInput).clear().type(params.middleName);
    }
    if (params.hasOwnProperty('email') && params.email) {
      cy.get(SmallRegForm.emailInput).clear().type(params.email);
    }
    if (params.hasOwnProperty('snils') && params.snils) {
      cy.get(SmallRegForm.snilsInput).clear().type(params.snils);
    }
  };
  this.selectRegType = (type) => {
    //todo: make types
    //if(type is distant)
    cy.xpath(SmallRegForm.distantUserLink).click();
  };
  this.selectAuthority = () => {
    cy.get(LargeRegForm.authoritySelect).click();
  };
  this.selectRegion = () => {
    cy.get(LargeRegForm.regionSelect).click();
  };
  this.selectGender = () => {
    cy.get(LargeRegForm.genderSelect).click();
  };
  this.setAuthorizeName = name => {
    let field = cy.get(LargeRegForm.authorizeName).clear();
    if (name) {
      field.type(name);
    }
  };
  this.setPresentPost = post => {
    let field = cy.get(LargeRegForm.postName).clear();
    if (post) {
      field.type(post);
    }
  };
  //set to separate method as form is pre-filled
  this.setPersonalInfo = (firstname, lastname, middlename, email, snils) => {
    if (firstname) {
      cy.get(LargeRegForm.firstName).clear().type(firstname);
    }
    if (lastname) {
      cy.get(LargeRegForm.lastName).clear().type(lastname);
    }
    if (middlename) {
      cy.get(LargeRegForm.middleName).clear().type(middlename);
    }
    if (middlename) {
      cy.get(LargeRegForm.middleName).clear().type(middlename);
    }
    if (email) {
      cy.get(LargeRegForm.email).clear().type(email);
    }
    if (snils) {
      cy.get(LargeRegForm.snils).clear().type(snils);
    }
  };
  this.setPhoneNumber = number => {
    if (number) {
      cy.get(LargeRegForm.phone).clear().type(number);
    }
  };
  this.confirmPhone = () => {
    cy.get(LargeRegForm.phoneApproveBtn).click();
  };
  this.selectDeliveryWay = () => {
    cy.get(LargeRegForm.deliveryWaysList).click();
  };
  this.submit = enabled => {
    if (enabled) {
      cy.get(LargeRegForm.submitBtn).click();
    } else {
      cy.get(LargeRegForm.submitBtn).should('not.be.enabled');
    }
  };
  this.fillPassportData = (series, number, deliveryAuthority, deliveryCode, address, studentType) => {
    //this is hack to fill first delivery code to get error if code is non-valid
    if (series) {
      cy.get(LargeRegForm.passportSeries).type(series);
    }
    if (number) {
      cy.get(LargeRegForm.passportNumber).type(number);
    }
    if (deliveryCode) {
      cy.get(LargeRegForm.passportCodeIssue).type(deliveryCode);
    }
    if (deliveryAuthority) {
      cy.get(LargeRegForm.passportIssuedBy).type(deliveryAuthority);
    }
    if (address) {
      if (studentType === 0) {
        cy.get(LargeRegForm.placeOfBirth).type(address);
      }
      if (studentType === 1) {
        cy.get(LargeRegForm.registrationAddress).type(address);
      }
    }
  };
  this.fillEducationForm = (lastname, firstname, middlename, educationDocSeries, educationDocNumber, educationDocRegisterNumber) => {
    if (lastname) {
      cy.get(LargeRegForm.changedLastName).clear().type(lastname);
    }
    if (firstname) {
      cy.get(LargeRegForm.changedFirstName).clear().type(firstname);
    }
    if (middlename) {
      cy.get(LargeRegForm.changedMiddleName).clear().type(middlename);
    }
    if (educationDocSeries) {
      cy.get(LargeRegForm.educationDocumentSerial).clear().type(educationDocSeries);
    }
    if (educationDocNumber) {
      cy.get(LargeRegForm.educationDocumentNumber).clear().type(educationDocNumber);
    }
    if (educationDocRegisterNumber) {
      cy.get(LargeRegForm.educationDocumentRegNumber).clear().type(educationDocRegisterNumber);
    }
  };
  this.setEducationLevel = () => {
    cy.get(LargeRegForm.educationLevelList).click();
  };
  this.showAdditionalDataFields = () => {
    cy.get(LargeRegForm.getAdditionalData).click();
  };
  this.selectAdditionalEducation = () => {
    cy.get(LargeRegForm.additionalEducationSelect).click();
  };
  this.fillPostForm = (indexCode, city, street, house, building, flat) => {
    if (indexCode) {
      cy.get(LargeRegForm.postIndex).type(indexCode);
    }
    if (city) {
      cy.get(LargeRegForm.postCity).type(city);
    }
    if (street) {
      cy.get(LargeRegForm.postStreet).type(street);
    }
    if (house) {
      cy.get(LargeRegForm.postHouse).type(house);
    }
    if (building) {
      cy.get(LargeRegForm.postBuilding).type(building);
    }
    if (flat) {
      cy.get(LargeRegForm.postAppartment).type(flat);
    }
  };
  this.fillLargeRegForm = (studentType, formParams, checkboxes) => {
    if (studentType === 0) {
      //todo: check distant fields and fill them
      //check that place of Birth is on the form:
      checkElementVisibility(LargeRegForm.placeOfBirth, true);
      this.selectAuthority();
      selectFromDropList(formParams.authorityName);
      this.selectRegion();
      selectFromDropList(formParams.region);
      this.setAuthorizeName(formParams.authorizeName);
      this.setPresentPost(formParams.post);

      uploadFile(LargeRegForm.loadReference + LargeForm.fileInput, formParams.loadReference.file, formParams.loadReference.mimeType);
      if (formParams.loadReference.isValid) {
        checkAttachment(LargeRegForm.loadReference,
          LargeRegForm.addedFileDisplay, true);
      } else {
        checkAttachment(LargeRegForm.loadReference,
          LargeRegForm.addedFileDisplay, false);
      }

      //set delivery way
      //check that post inputs are not displayed:
      this.selectDeliveryWay();
      selectFromDropList(formParams.delivery);
      if (formParams.delivery.way === params.delivery.post) {
        //todo: fill post address form
        checkElementVisibility(LargeRegForm.postCity);
        //fill post post:
        this.fillPostForm(formParams.delivery.index, formParams.delivery.city, formParams.delivery.street, formParams.delivery.house, formParams.delivery.building, formParams.delivery.flat)
      } else {
        //check that fields are not visible for postIndex
        checkElementNotExist(LargeRegForm.postIndex);
      }
      fillCheckbox(LargeRegForm.deliveryAcceptCheckbox, formParams.delivery.agree);
      //the user can check off checkboxes
      if (formParams.additionalInfo.isSet) {
        //if was not selected, than should be clicked, second time do not click
        if (!formParams.additionalInfo.wasSet) {
          this.showAdditionalDataFields();
        }
        if (formParams.additionalInfo.educationInProgress.isSet) {
          fillCheckbox(LargeForm.isEducationInProgressCheckbox, true);
          selectFromDropList(formParams.additionalInfo.educationInProgress.level);
          getCalendarItem(LargeForm.additionalEducationInProgressForm, formParams.additionalInfo.educationInProgress.year, formParams.additionalInfo.educationInProgress.month, formParams.additionalInfo.day);
        } else {
          fillCheckbox(LargeForm.isEducationInProgressCheckbox, false);
          checkElementVisibility(LargeRegForm.additionalEducationSelect, false);
        }
        if (formParams.additionalInfo.isDisabledPerson) {
          //set invalid person
          fillCheckbox(LargeForm.isDisabledPeopleCheckbox, true);
        } else {
          fillCheckbox(LargeForm.isDisabledPeopleCheckbox, false);
        }
      }
    }
    if (studentType === 1) {
      //todo: check that droplists are disabled and elements select files are not visible, check elements name are disabled also
      uploadFile(LargeRegForm.avatarPhoto, formParams.avatar.file, formParams.avatar.mimeType);
    }
    //if user changes fields:
    if (formParams.changesPersonalData) {
      this.setPersonalInfo(formParams.user.firstName, formParams.user.lastName, formParams.user.middleName,
        formParams.user.email, formParams.user.snils);
    }
    //set birthday:
    getCalendarItem(LargeRegForm.personalForm, formParams.birthday.year, formParams.birthday.month, formParams.birthday.day);
    this.selectGender();
    selectFromDropList(formParams.gender);

    this.setPhoneNumber(formParams.phone);
    //upload personal photo
    uploadFile(LargeRegForm.personalPhoto + LargeRegForm.fileInput, formParams.personalPhoto.file, formParams.personalPhoto.mimeType);
    if (formParams.personalPhoto.isValid) {
      checkAttachment(LargeRegForm.personalPhoto, LargeRegForm.addedFileDisplay, true);
    } else {
      checkAttachment(LargeRegForm.personalPhoto, LargeRegForm.addedFileDisplay, false);
    }
    this.fillPassportData(formParams.passport.series, formParams.passport.number, formParams.passport.deliveryAuthority,
      formParams.passport.deliveryCode, formParams.passport.address, studentType);
    if (formParams.isLastNameChanged) {
      //set checkbox about name changes:
      fillCheckbox(LargeForm.isLastNameChangedCheckbox, checkboxes.lastNameChanged, true);
      //check visibility of fields :
      checkElementVisibility(LargeForm.nameChanges, true);
    }
    this.fillEducationForm(formParams.education.lastNameChanged, formParams.education.firstNameChanged, formParams.education.middleNameChanged,
      formParams.education.series, formParams.education.number, formParams.education.docRegNumber);
  };
};
