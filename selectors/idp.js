export default {
    selectAvailableFoldersEdit: '//*[@class="settings-listing data-table"]//div[contains(text(),"Select Available Folders")]/ancestor::tr//button[@aria-label="Edit"]',
    selectAvailableFolderClear: '//*[@class="settings-listing data-table"]//div[contains(text(),"Select Available Folders")]/ancestor::tr//button[@aria-label="Clear"]',
    selectListFolders:'//h5[text()="Select Available Folders"]/ancestor::div[@class="modal-content"]//div[@class="multiselect__tags"]',
    selectOptionFolder: '//h5[text()="Select Available Folders"]/ancestor::div[@class="modal-content"]//div[@class="multiselect__tags"]//input',
    buttonSaveFolder: '//*[@class="btn btn-secondary ml-3"]',
    captureCamara: '//*[@class="btn btn-photo"]',
    upoadPhotoCamara: '//*[@class="btn btn-upload"]',
    overview:'//*[@id="overview-tab"]',
    documentTypeXpath:'(//input[@placeholder="Type to search"])[1]',
    destinationXpath:'(//input[@placeholder="Type to search"])[2]',
    publishNewVersionButton:'[data-test="btn-save-publish"]',
    saveLaunchPadButton: '[data-test="launchpad-modal-btn-ok"]',
    useRequestVariableDocumentType:'//div[text()[normalize-space()=""]]/parent::div//input[@name="document-type-request-variable"]',
    userRequestVariableSelectDestination:'[name="destination-request-variable"]',
    inputDocumentType:'//input[@name="documentType"]',
    splitDocument: '//input[@name="splitDocument"]',


}