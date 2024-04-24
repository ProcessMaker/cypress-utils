export default{
    //RUN TEST in Modeler
    ellipsisMenuIcon: '//div[@data-cy="ellipsis-menu"]//button[@aria-haspopup="menu"]',
    runTestBtnInModeler:'//div[@data-cy="ellipsis-menu"]//ul//li//*[contains(text(),"Run Test")]',
    //Starting Point
    labelSP:'//label[text()="Starting Point *"]',
    containerSP:'//label[text()="Starting Point *"]/parent::div/div//div[@class="multiselect__tags"]',
    inputSP:'//label[text()="Starting Point *"]/parent::div//div//div[@class="multiselect__tags"]//input',
    itemSP:'//label[text()="Starting Point *"]/parent::div//div[@class="multiselect__content-wrapper"]//li[1]',
    //Manual Resume Point
    labelMRP:'//label[text()="Manual Resume Point"]',
    containerMRP:'//label[text()="Manual Resume Point"]/parent::div/div//div[@class="multiselect__tags"]',
    inputMRP:'//label[text()="Manual Resume Point"]/parent::div//div//div[@class="multiselect__tags"]//input',
    itemMRP:'//label[text()="Manual Resume Point"]/parent::div//div[@class="multiselect__content-wrapper"]//li[1]',
    //Scenario
    labelScenario:'//label[text()="Scenario"]',
    containerScenario:'//label[text()="Scenario"]/parent::div/div//div[@class="multiselect__tags"]',
    inputScenario:'//label[text()="Scenario"]/parent::div//div//div[@class="multiselect__tags"]//input',
    itemScenario:'//label[text()="Scenario"]/parent::div//div[@class="multiselect__content-wrapper"]//li[1]',
    //Additional data
    additionalData:'//label[text()="Additional Data"]/parent::div//textarea',
    runTestBtn:'//button[text()="Run Test"]',
    cancelBtn: '//footer//button[text()="Cancel"]',
    //Check to bypass Script tasks and Data Connectors
    bypassCheckbox:'//input[@type="checkbox"]',

    //SCENARIOS 
    //Scenario created by process BP:by process (process configure)
    scenariosTab:'a[id="scenarios-tab"]',
    createScenarioBtnBP:'[aria-label="Create Scenario"]',

    //ScenarioCreationType
    labelSCT: '//legend[text()="Scenario Creation Type *"]',
    selectSCT: '//legend[text()="Scenario Creation Type *"]//parent::fieldset//div[@class="multiselect__select"]',

    nameScenarioBP:'//legend[text()="Name *"]//following-sibling::div//input',
    descriptionScenarioBP:'//legend[text()="Description *"]/following-sibling::div//textarea',
    dataScenarioBP:'//legend[text()="Data *"]/following-sibling::div//textarea',
    saveBtnScenarioBP:'//footer[@class="modal-footer"]//button[text()="Save"]',
    searchScenario:'//div[@id="scenarios"]//input[@placeholder="Search"]',
    alertMessage:'[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]',

    //CRUD scenario
    menuScenario:'//div[@class="data-table"]//button[@aria-haspopup="menu"]',
    editScenarioBtn:'//ul//li//*[contains(text(),"Edit Scenario")]//parent::div//i',
    deleteScenarioBtn:'//ul//li//*[contains(text(),"Delete")]//parent::div//i',
    confirmDeleteScenario:'//button[text()="Confirm"]',
    editDescription:'//legend[text()="Description *"]/following-sibling::div//textarea',

    //TestRuns
    testRunTab:'a[id="test_runs-tab"]',
    testBtnInConfigProcess:'button[aria-label="Test"]',
    clearBtnInRunTab:'button[aria-label="Clear"]',
    searchTest:'//div[@id="test_runs"]//input[@placeholder="Search"]',
    confirmDeleteAllTests:'//button[contains(text(),"Confirm")]',
    rowTestsRun:'//div[@id="test-runs-edit-tab"]//div[@class="card card-body menu-table-card"]//table//tbody//tr',

    //Scenario created by request  BR:by request
    dataTab:'//a[contains(text(),"Data")]',
    createScenarioBtnBR:'//button[text()[normalize-space()="Create Scenario"]]',
    nameInCreateScenarioBR:'input[id="name"]',
    descriptionInCreateScenarioBR:'textarea[id="description"]',
    dataInCreateScenarioBR:'//label[text()="Data"]/following-sibling::div//textarea',
    saveBtnInCreateScenarioBR:'(//button[contains(text(),"Save")])[2]',

    emailTab:'//a[contains(text(),"Emails")]',

    submitBtn:'button[aria-label="New Submit"]',
    completedBtn:'//button[text()[normalize-space()="Complete Task"]]'

}