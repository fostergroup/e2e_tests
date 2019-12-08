import comEle from '../pagesElementsSelectors/CommonElements.js';
import 'cypress-file-upload';

export let checkModalError = err => {
  cy.get(comEle.errorModalNotice, {timeout: 100000}).should('contain', err);
};
export let submit = enabled => {
  if (enabled) {
    cy.xpath(comEle.submitBtn).click();
  } else {
    cy.xpath(comEle.submitBtn).should('be.disabled');
  }
};
export let checkURL = url => {
  cy.url().should("contain", url);
};
export let selectFromDropList = (name, index) => {
  if (name) {
    let el = cy.xpath('//span[text()=' + '"' + name + '"' + ']/ancestor::li');
    if (index) {
      el.eq(index).click();
    } else {
      el.click();
    }
  }
};
//attentive: here calendar will not take days offs
export let getCalendarItem = (element, year, month, day) => {
  if (element) {
    cy.xpath(element + comEle.calendarPick).click();
    cy.xpath(element + '/descendant::span[@class="cell year" and text()="' + year + '"' + ']').click();
    cy.xpath(element + '/descendant::span[@class="cell month" and text()="' + month + '"' + ']').click();
    cy.xpath(element + '/descendant::span[@class="cell day" and text()="' + day + '"' + ']').click();
  }
};
export let uploadFile = (selector, fileName, mimeType) => {
  if (selector) {
    cy.fixture(fileName).then(fileContent => {
      cy.get(selector).upload({fileContent, fileName, mimeType: 'application/' + mimeType});
    });
  }
};
export let checkAlertText = text => {
  cy.on('window:alert', (str) => {
    expect(str).to.contain(text);
  });
};
export let checkAttachment = (parent, child, added) => {
  if (parent) {
    cy.get(parent).then($element => {
      if (added) {
        expect($element.find(child).length).to.be.greaterThan(0);
      } else {
        expect($element.find(child).length).to.eq(0);

      }
    });
  }
};
export let fillCheckboxes = (index, checked, agree) => {
  if (checked && !agree) {
    cy.get(comEle.checkboxLabel).eq(index).click();
    cy.get(comEle.checkBoxInput).eq(index).should('not.be.checked');
  }
  if (!checked && agree) {
    cy.get(comEle.checkboxLabel).eq(index).click();
    cy.get(comEle.checkBoxInput).eq(index).should('be.checked');
  }
};
export let closeModalDialog = () => {
  cy.get(comEle.modalDialog.errorBtn).click();
  //check that element is not present:
  cy.get(comEle.modalDialog.errorBtn).should('not.exist');
};
export let checkErrorText = (element, error) => {
  cy.get(element).invoke('text').should('contain', error);
};
export let checkErrorTexts = (elements, error) => {
  elements.forEach(el => {
    cy.get(el).invoke('text').should('contain', error);
  });
};
export let checkElementNotExist = element => {
  cy.get(element).should('not.exist');
};
export let checkElementsNotExist = elements => {
  elements.forEach(el => {
    cy.get(el).should('not.exist');
  });
};
export let checkElementVisibility = (element, isVisible) => {
  if (isVisible) {
    cy.get(element).should('be.visible');
  } else {
    cy.get(element).should('not.be.visible');

  }
};
export let checkElementsVisibility = elements => {
  elements.forEach(el => {
    if (el.isVisible) {
      cy.get(el.element).should('be.visible');
    } else {
      cy.get(el.element).should('not.be.visible');
    }
  });
};
export let checkElementsContainText = elements => {
  elements.forEach(el => {
    cy.get(el.element).invoke('val').should('contain', el.text);
  });
};
export let checkCheckboxIsMarkedWithError = element => {
  cy.get(element + '~ .is-danger').should('exist');
};
export let checkCheckboxesMarkedWithError = elements => {
  elements.forEach(el => {
    cy.get(el + '~ .is-danger').should('exist');
  });
};
export let checkDisabledFields = elements => {
  elements.forEach(el => {
    cy.get(el).should('be.disabled');
  });
};
