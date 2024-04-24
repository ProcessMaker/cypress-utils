export default {
    newScriptBtn: '(//i[@class="fas fa-plus"])[2]',
    NameInputTxtBx:
        "//div[@id='createScript___BV_modal_content_']//input[@name='title']",
    DescriptionTxtBx: '[class="form-group"] textarea',
    DropDownBtn: '[class="form-group"] select',
    languageScript: '//*[contains(text(),"language")]/ancestor::*[@class="card-text row"]',
    moreOptionsButton:'//p[contains(text(),"Advanced Options")]/parent::button',
    moreCollapseOptionsButton:'//p[contains(text(),"Less Options")]/parent::button',
    SelectBx: "//div[@id='createScript___BV_modal_content_']//div[@name='run_as_user_id']//div[@class='multiselect__tags']",
    SelectTxtInput:
        "//div[@id='createScript___BV_modal_content_']//div[@name='run_as_user_id']//input",
    SelectOptionValue:
        "//li[@class='multiselect__element']//span//span[text()='userfullName']",
    CreateSaveBtn: '//button[contains(text(),"Save")]',
    SaveBtn: '//button[@class="btn btn-primary"]',
    saveVersionsBtn:
        "//div[@class='modal-content']//button[contains(text(),'Publish')]",
    scriptPublishBtn:
        '//div[@class="card-header"]//button[contains(text(),"Publish")]',
    debuggerTxt: '//div[text()="Debugger"]',
    InputTxtBx: '(//textarea[contains(@class,"inputarea")])[1]',
    InputBtn: '(//div[@class="view-line"])[11]',
    returnLine: '(//div[@class="view-line"])[13]',
    sucessToastMsg: "//div[contains(@class,'alert d-none')]",
    editctrlBtn: "(//i[contains(@class,'fas fa-pen-square fa-lg fa-fw')])[1]",
    configctrlBtn: "(//i[contains(@class,'fas fa-cog fa-lg fa-fw')])[1]",
    loadingSpinnerScript:
        "#scriptIndex > div.container-fluid > div > div.jumbotron.jumbotron-fluid",
    searchInputBox: "[id='search'] input",
    versionHistoryTab: "[id='script-version-tab']",
    onlyShowVersionLabel: ".p-3 > .custom-control > .custom-control-label",
    alertSuccess:
        'div[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]',
    container: ".container.container",
    copyToLatest:
        ":nth-child(3) > .container > :nth-child(1) > .pl-0 > .row > :nth-child(1) > small > .text-secondary",
    confirmAndSave: ".card-footer > .btn-secondary",
    currentVersion:
        "#script-version > :nth-child(1) > :nth-child(1) > :nth-child(2) > :nth-child(1) > :nth-child(2)",
    onlyShowNamedVersion: 'input[class="custom-control-input"]',
    areaInputScript: "(//textarea)[1]",
    runScript: ".col-3 > .card > .card-header > .row > .text-right > .btn",
    inputName: '[name="name"]',
    inputDetail: '[id="save-additional-details"]',
    CategoryTxt: '[class="multiselect__tag"] span',
    timeoutTxt: "//input[@id='inputTimeout']",
    RetryAttemptsTxt: "//input[@id='inputRetryAttempts']",
    RetryWaitTimeTxt: "//input[@id='inputRetryWaitTime']",
    threePointsBtn:
        '//div[@id="main"]//ul/li/a[@id="nav-sources-tab"]//ancestor::div[@id="main"]//descendant::div[@id="scriptIndex"]//table/tbody/tr//button[@aria-haspopup="menu"]',
    directApiOption:
        "//label[contains(text(),'Enable Direct API access')]/ancestor::div[@class='form-group']//input[@type='checkbox']",
    searchField:
        "#scriptIndex > #search-bar > :nth-child(1) > .flex-grow-1 > #search > .input-group > #search-box",
    scriptTable: "//div[@data-cy='scripts-table']//table//tbody/tr",
    // projects
    addProjectModel: '//div[@class="modal-body"]',
    modalScript: '//div[@class="modal-body"]',
    chooseLanguage: '//label[contains(text(),"Choose a language")]',
    imgSrc: '//div[@class="card-body"]/p/div/img[@src="srch"]',
    imgAlt: '//div[@class="card-body"]/p/div/img[@alt="altt"]',
    scriptMustBeUnique: '//small[text()="The script name must be unique."]',
    projectLabel: '//label[text()="Project"]',
    projectInput: '//label[text()="Project"]/ancestor::div[@name="project" ]//input',
    projectTag: "//div/span/span[contains(text(),'tag')]",
    categoryLabel: '//label[text()="Category"]',
    categoryInput: '//label[text()="Category"]/ancestor::div[@name="script_category_id"]//input',
    categoryTag: "//div/span/span[contains(text(),'category')]",
    deleteOption: '//div/span[text()="Delete"]',
    confirmButton: '//button[text()="Confirm"]'
};
