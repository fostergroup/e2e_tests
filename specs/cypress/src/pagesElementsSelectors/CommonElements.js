let CommonElements =
  {
    errorModalNotice: ".error-modal__notice",
    submitBtn: "//button[@type='submit']",
    errorSpan: ".error-text",
    snilsNumber: ".number",
    iFrame: '.iframe',
    cancelBtn: '.cc_cancel',
    files: {
      csv: '../files/csvFile.csv',
      nonZipArchive: '../files/nonZipArchive.rar',
      png: '../files/imgPng.png',
      largeFile: '../files/largeImg.jpg',
      largeArchive: '../files/largeArchive.zip',
      jpeg: '../files/imgJpeg.jpeg',
      jpg: '../files/imgJpg.jpg',
      pdf: '../files/normalPDF.pdf',
      archiveWithExe: '../files/archiveWithExe.zip',
      archiveWithFolders: '../files/archiveWithFolders.zip',
      emptyArchive: '../files/emptyArchive.zip'
    },
    smsCodeInput: '.cc_sms',
    modalDialog: {
      errorTitle: '.error-popup__title',
      errorNotice: '.error-popup__notice',
      errorBtn: '.error-popup__btn'
    },
    errorRedTextForInput: '.error-text',
    errorRedTextForFile: '.input-file__error-text',
    calendarPick: '/descendant::input[@class="datepicker__input"]',
    checkboxLabel: '.checkbox-label > .check',
    checkBoxInput: '.checkbox-input'
  };
export default CommonElements
