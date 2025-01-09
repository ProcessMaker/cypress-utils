export default {
    iframeA: '[id="alternative_a"]',
    iframeB: '[id="alternative_b"]',
    //FROM MODELER
    ellipsisMenuIcon: '//div[@data-cy="ellipsis-menu"]//button[@aria-haspopup="menu"]',
    runTestBtnInModeler: '//div[@data-cy="ellipsis-menu"]//ul//li//*[contains(text(),"Run Test")]',
    //Alternative
    labelAlternative: '//label[text()="Alternative *"]',
    alternativeField: '[id="select-alternative"]',
    expressionInput: '[id="expression"]',
    typeOfRun: '[id="select-type-run"]',
    //Starting Point
    labelSP: '//label[text()="Starting Point *"]',
    containerSP: '//label[text()="Starting Point *"]/parent::div/div//div[@class="multiselect__tags"]',
    inputSP: '[id="select-step"]',
    itemSP: '//label[text()="Starting Point *"]/parent::div//div[@class="multiselect__content-wrapper"]//li[1]',
    //Manual Resume Point
    labelMRP: '//label[text()="Manual Resume Point"]',
    containerMRP: '//label[text()="Manual Resume Point"]/parent::div/div//div[@class="multiselect__tags"]',
    inputMRP: '//label[text()="Manual Resume Point"]/parent::div//div//div[@class="multiselect__tags"]//input',
    itemMRP: '//label[text()="Manual Resume Point"]/parent::div//div[@class="multiselect__content-wrapper"]//li[1]',
    //Scenario
    labelScenario: '//label[text()="Scenario"]',
    containerScenario: '//label[contains(text(),"Scenario")]//parent::div//div[@class="multiselect__select"]',
    inputScenario: 'input[id="scenario-select"]',
    itemScenario: '//label[text()="Scenario"]/parent::div//div[@class="multiselect__content-wrapper"]//li[2]',
    //Additional data
    additionalData: '.view-lines',
    runTestBtn: '//button[contains(text(),"Run")]',
    cancelBtn: '//footer//button[text()[normalize-space()="Cancel"]]',
    //Check to bypass Script tasks and Data Connectors
    bypassCheckbox: '//input[@type="checkbox"]',

    //FROM PROCESS CONFIGURE
    testRun_ScenariosTab: '[id="test_runs-tab"]',

    //SCENARIOS 
    //Scenario created by process BP:by process (process configure)
    //scenariosTab:'a[id="scenarios-tab"]',
    scenariosTab: '[data-test="scenarios-tab"]',
    createScenarioBtnBP: '[aria-label="Create Scenario"]',
    searchScenario: '#scenarios-edit-tab > :nth-child(1) > #search-bar > :nth-child(1) > .flex-grow-1 > #search > .input-group > .form-control',

    //Manual or Advanced
    manualBtn: '[data-test="test-run-btn-manual"]',
    advancedBtn: 'button[data-test="test-run-btn-advanced"]',
    pmqlField: '[data-test="test-run-pmql-input"]',
    browseBtn: '[data-test="test-run-pmql-browse"]',

    //Scenario Creation
    labelScenarioCreationType: '//legend[text()="Scenario Creation Type *"]',
    selectSCT: '//legend[text()="Scenario Creation Type *"]//parent::fieldset//div[@class="multiselect__select"]',
    nameScenarioBP: '[data-test="name"]',
    descriptionScenarioBP: '[data-test="description"]',
    //Manual Data
    dataScenarioBP: '.view-lines',
    //Document upload
    uploadBtn: '[for="input-file-dt"]',
    fileAttachedfield: '.upload-file-uploaded-name',
    saveScenarioBPBtn: '.w-100 > .btn-secondary',
    alertMessage: '[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]',

    //CRUD scenario
    menuScenario: '//div[@data-test="scenario-ellipsis"]//button[@aria-haspopup="menu"]',
    editScenarioBtn: '//ul//li//*[contains(text(),"Edit Scenario")]//parent::div//i',
    deleteScenarioBtn: '//a[@data-test="delete-scenario-btn"]',

    confirmDeleteScenario: '//button[text()="Confirm"]',
    editDescription: '//legend[text()="Description *"]/following-sibling::div//textarea',

    //TESTS RUN
    //testRunTab:'a[id="test_runs-tab"]',
    testRunTab: '[data-test="test-runs-tab"]',
    testRunTabScenarios:'a[id="test_runs-tab"]',
    plusScenarioBtn: '[aria-label="Create Scenario"]',
    testBtnInConfigProcess: 'button[aria-label="Test"]',
    clearBtnInRunTab: 'button[aria-label="Clear"]',
    searchTestRun: ':nth-child(1) > :nth-child(1) > #search-bar > :nth-child(1) > .flex-grow-1 > #search > .input-group > .form-control',
    confirmDeleteAllTests: '//button[contains(text(),"Confirm")]',
    rowTestsRun: '//div[@id="test-runs-edit-tab"]//div[@class="card card-body menu-table-card"]//table//tbody//tr',
    runBtn: '//footer//button[contains(text(),"Run")]',


    //Scenario created by request  BR:by request
    dataTab: '//a[contains(text(),"Data")]',
    createScenarioBtnBR: '//button[text()[normalize-space()="Create Scenario"]]',
    nameInCreateScenarioBR: 'input[id="name"]',
    descriptionInCreateScenarioBR: 'textarea[id="description"]',
    dataInCreateScenarioBR: '//label[text()="Data"]/following-sibling::div//textarea',
    saveBtnInCreateScenarioBR: '(//button[contains(text(),"Save")])[2]',
    emailTab: '//a[contains(text(),"Emails")]',
    submitBtn: 'button[aria-label="New Submit"]',
    completedBtn: '//button[text()[normalize-space()="Complete Task"]]',





}