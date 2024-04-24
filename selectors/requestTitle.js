export default{
    //REQUEST TITLE IN CONFIGURATION OF PROCESS
    caseTitleField:'input[name="case_title"]',
    //REQUEST TITLE IN REQUEST PAGE
    //MODAL FILTER
    filterBtn:'//span[text()="Filter"]//parent::button',
    //filter process
    labelProcess:'//label[text()="Process"]',
    containerProcess:'//label[text()="Process"]/parent::div//div[@aria-label="Process"]//div[@class="multiselect__tags"]',
    inputProcess:'//label[text()="Process"]/parent::div//div[@aria-label="Process"]//div[@class="multiselect__tags"]//input',
    itemProcess:'//label[text()="Process"]/parent::div//div[@aria-label="Process"]//div[@class="multiselect__content-wrapper"]//li[1]',
    //filter status
    labelStatus:'//label[text()="Status"]',
    containerStatus:'//label[text()="Status"]/parent::div//div[@aria-label="Status"]//div[@class="multiselect__tags"]',
    inputStatus:'//label[text()="Status"]/parent::div//div[@aria-label="Status"]//div[@class="multiselect__tags"]//input',
    itemStatus:'//label[text()="Status"]/parent::div//div[@aria-label="Status"]//div[@class="multiselect__content-wrapper"]//li[1]',
    //filter requester
    labelRequester:'//label[text()="Requester"]',
    containerRequester:'//label[text()="Requester"]/parent::div//div[@aria-label="Requester"]//div[@class="multiselect__tags"]',
    inputRequester:'//label[text()="Requester"]/parent::div//div[@aria-label="Requester"]//div[@class="multiselect__tags"]//input',
    itemRequester:'//label[text()="Requester"]/parent::div//div[@aria-label="Requester"]//div[@class="multiselect__content-wrapper"]//li[1]',
    //filter particpants
    labelParticipants:'//label[text()="Participants"]',
    containerParticipants:'//label[text()="Participants"]/parent::div//div[@aria-label="Participants"]//div[@class="multiselect__tags"]',
    inputParticipants:'//label[text()="Participants"]/parent::div//div[@aria-label="Participants"]//div[@class="multiselect__tags"]//input',
    itemParticipants:'//label[text()="Participants"]/parent::div//div[@aria-label="Participants"]//div[@class="multiselect__content-wrapper"]//li[1]',
    //filter case title
    labelCaseTitle:'//label[text()="CaseTitle"]',
    containerCaseTitle:'//label[text()="CaseTitle"]/parent::div//div[@aria-label="CaseTitle"]//div[@class="multiselect__tags"]',
    inputCaseTitle:'//label[text()="CaseTitle"]/parent::div//div[@aria-label="CaseTitle"]//div[@class="multiselect__tags"]//input',
    itemCaseTitle:'//label[text()="CaseTitle"]/parent::div//div[@aria-label="CaseTitle"]//div[@class="multiselect__content-wrapper"]//li[1]',
    //Save button
    applyBtn:'//button[text()="Apply"]',
    resetBtn:'//button[text()="Reset"]',
    //SEARCH
    tableRequest:'[id="table-container"]',
    searchInput:'.search-bar > .search-bar-container > .pmql-input',
    clearBtn:'//div[@class="search-bar-container d-flex align-items-center"]//i[@role="button"]',
    jumbotron:'[class="jumbotron jumbotron-fluid"]',
    //TABLE
    table:'[class="data-table"]',
    openRequest:'a[title="Open Request"]',
    itemPerPage:'//select[@aria-label="Per page"]',
    titleCaseTitleColumn:'//div[contains(text(),"Case title")]',
    bodyTable:'//table[@aria-label="custom-pm-table"]//tbody',

}