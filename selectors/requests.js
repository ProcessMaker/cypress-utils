export default{
    tasksTableCell: '//div[@id="pending"]//tbody//tr[rowIndex]//td[coloumnIndex]',
    filter:'//button[@class="btn btn-outline-secondary mr-1 d-flex align-items-center"]',
    filterTextArea:'[aria-label="Advanced Search (PMQL)"]',
    requestDropDown: '(//*[@class="multiselect__tags"])[1]',
    requestInput: '(//div[@class="multiselect__tags"]//input)[1]',
    requestDropDownOption: '//span[text()[normalize-space()="processName"]]',
    requestSearchBox: '//button[contains(@class,"btn btn-search-run")]',
    requestName: '//td//span[text()[normalize-space()="processName"]]',
    requestInputOption: '(//*[contains(text(),"processName")]/ancestor::tr/td//a[contains(@href,"/requests")])[1]',
    taskAlertTxt:"//span[text()='Task Completed Successfully']",
    submitBtn:'[aria-label="New Submit"] [aria-label="New Submit"]',
    taskValueTxt:'//a[text()[normalize-space()="taskName"]]',
    manualtaskcompleteBtn:'.card-footer > .btn',
    verifyRequestIsCompleted: '.list-group > .card-header',
    verifyTaskIsCompleted: "//span[text()='Task Completed Successfully']",
    //goto completed request
    clickonrequestpage:"//span[text()='Requests']",
    verifyrequestpage:"//li[text()[normalize-space()='My Requests']]",
    clickoncompleted:"//div[text()='Completed']",
    verifyCmpltdrequestpage:"//li[text()[normalize-space()='Completed Requests']]",
    clickonPrcssDrpDwn:"(//div[@class='multiselect__select'])[1]",
    clickonPrcssSrchBx:"//input[@placeholder='Process']",
    clickonSearchBtn:"//i[@class='fas fa-search']",
    verifyPrcssCmpltd:"(//span[text()='Completed'])[3]",
    openCmpltdPrcss:"(//td[@class='vuetable-slot']//a)[1]",
    clickonfilemanager:"//a[@href='#fileManager']",

    //request
    searchTxt:'input[placeholder="Search..."]',
    resultSearchList:'[class="process-list"] > div',
    startBtn:'.col-2 > .btn',
    taskNameLink:'tr > :nth-child(2) > a',
    taskOption: '//ul[@id="requestTab"]/li/a[text()="Tasks"]',
    request_processList: '[class="process-list"]',
    request_search_input:'[data-test="new-request-modal-search-input"]',
    request_searchProcessRow: "//*[@class='modal-content']//*[contains(text(),'processName')]/ancestor::div[@class='card-body']/div",
    request_startButtonRow: "//*[@class='modal-content']//*[contains(text(),'processName')]/ancestor::div[@class='card']//button[contains(text(),'Start')]",
    searchProcessList: 'div[class="process-list"] > div[class="mt-3"] > div[class="mt-3"] > div[class="card"] > div[class="card-body"] > div[class="row"]',
    processNameInSearchList: 'div[class="process-list"] > div[class="mt-3"] > div[class="mt-3"] > div[class="card"] > div[class="card-body"] > div[class="row"] > div > span',
    startButtonInSearchList: 'div[class="process-list"] > div[class="mt-3"] > div[class="mt-3"] > div[class="card"] > div[class="card-body"] > div[class="row"] > div > a',

    //search process in task page
    searchProcessDrpDwn:'(//div[@class="multiselect__select"])[1]',
    searchProcessTxtBx:'(//input[@class="multiselect__input"])[1]',
    searchTaskNameTxtBx:"(//div[@class='multiselect__tags'])[2]",
    openTheProcess:"(//td[@class='vuetable-slot']//a)[1]",

    //header completed requests/in progress
    headerCompleted:'.list-group > .card-header',

    //Cases page
    cardRequests:'//div[contains(@class,"tw-flex")]//div[contains(text(),"name")]'
};
