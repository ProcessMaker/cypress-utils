import selectors from "#selectors/processTesting";
import { NavigationHelper } from "#helpers/navigationHelper";
import { Process } from "#pages/process";

const navHelper = new NavigationHelper();
const process = new Process();
export class ProcessTesting {

    //1.RUN TEST IN MODELER
    
    clickOnRunTestOptionInModeler(){
        cy.xpath(selectors.ellipsisMenuIcon).should('be.visible').click();
        cy.xpath(selectors.runTestBtnInModeler).click();
    }

    selectStartingPoint(startingPoint){
        cy.xpath(selectors.labelSP).should('be.visible');
        cy.xpath(selectors.containerSP).click();
        cy.xpath(selectors.inputSP).type(`{backspace}${startingPoint}`).should('have.value',startingPoint);
        cy.xpath(selectors.itemSP).should('have.attr', 'aria-label').and('equal', `${startingPoint}. `);
        cy.xpath(selectors.inputSP).type('{enter}');
    }

    selectManualResumePoint(stopPoint){
        cy.xpath(selectors.labelMRP).should('be.visible');
        cy.xpath(selectors.containerMRP).click();
        cy.xpath(selectors.inputMRP).type(`{backspace}${stopPoint}`).should('have.value',stopPoint);
        cy.xpath(selectors.itemMRP).should('have.attr', 'aria-label').and('equal', `${stopPoint}. `);
        cy.xpath(selectors.inputMRP).type('{enter}');
    }

    selectScenario(scenario){
        cy.xpath(selectors.labelScenario).should('be.visible');
        cy.xpath(selectors.containerScenario).click();
        cy.xpath(selectors.inputScenario).should('be.visible');
        cy.xpath(selectors.inputScenario).type(`{backspace}${scenario}`,{ force: true,delay:300}).should('have.value',scenario);
        cy.xpath(selectors.itemScenario).should('have.attr', 'aria-label').and('equal', `${scenario}. `);
        cy.xpath(selectors.inputScenario).type('{enter}');
    }

    addAdditionalData(data){
        cy.xpath(selectors.additionalData).type('{rightarrow}').type(data).should('have.value',`{${data}}`);
    }

    enableBypassCheckbox(){
        cy.xpath(selectors.bypassCheckbox).click({force: true});
    }

    clickOnRunTestBtn(){
        cy.xpath(selectors.runTestBtn).should('be.visible');
        cy.xpath(selectors.runTestBtn).click({force: true});
    }

    clickOnCancelBtn(){
        cy.xpath(selectors.cancelBtn).click();
    }

    /**
     * This method is responsible to run test in modeler
     * @param runTestConfig: name of the analytic report for search
     * @example 
     * {
        startingPoint:{startingPointOption: "Start Event"},
        manualResumePoint:{stopPointOption: "Form Task1"},
        scenario:{scenarioOption: "scenarioX"},
        additionalData: {data: '"message": "Hello World"'},
        isEnabledBypass: true
    }
    */
 
    runTest(runTestConfig){
        const {startingPoint, manualResumePoint, scenario, additionalData,isEnabledBypass }= runTestConfig

        if(startingPoint !== null) {
            this.selectStartingPoint(startingPoint.startingPointOption);
        }

        if(manualResumePoint !== null) {
            this.selectManualResumePoint(manualResumePoint.stopPointOption);
        }

        if(scenario !== null) {
            this.selectScenario(scenario.scenarioOption);

        }

        if(additionalData !== null) {
            this.addAdditionalData(additionalData.data)
        }

        if(isEnabledBypass ) {
            this.enableBypassCheckbox();
        }

        this.clickOnRunTestBtn();
        cy.get('div[class="modal-content"]').should('not.exist');
    }

    //2. SCENARIOS
    //2.1 Scenario created by process
    clickOnScenariosTab(){
        cy.get(selectors.scenariosTab).click();
    }

    selectScenarioCreationType(option) {
        cy.xpath(selectors.labelSCT).should('be.visible');
        cy.xpath('//legend[text()="Scenario Creation Type *"]//parent::fieldset//div[@class="multiselect__select"]').click();
        cy.contains(option).click();
    }

    createScenarioByProcess(processName, nameScenario, description, option, data) {
        navHelper.navigateToProcessPage();
        process.searchProcessAndSelectOptions(processName, "config");
        cy.get(selectors.scenariosTab).click();
        cy.get(selectors.createScenarioBtnBP).click();
        cy.xpath(selectors.nameScenarioBP).type(nameScenario).should('have.value',nameScenario);
        cy.xpath(selectors.descriptionScenarioBP).type(description).should('have.value',description);
        //Select type( Manual,Document upload, AI)
        this.selectScenarioCreationType(option);
        cy.xpath(selectors.dataScenarioBP).type('{{}}').type('{leftarrow}')
        .type(data).should('have.value',`{${data}}`);
        cy.xpath(selectors.saveBtnScenarioBP).click();
    }

    //2.2 Scenario created by request
    createScenarioByRequest(nameScenario,description,data){
        cy.xpath(selectors.dataTab).should('be.visible');
        cy.xpath(selectors.dataTab).click();
        cy.xpath(selectors.createScenarioBtnBR).should('be.visible');
        cy.xpath(selectors.createScenarioBtnBR).click();
        cy.get(selectors.nameInCreateScenarioBR).type(nameScenario).should('have.value',nameScenario);
        cy.get(selectors.descriptionInCreateScenarioBR).type(description,{delay:5}).should('have.value',description);
        cy.xpath(selectors.saveBtnInCreateScenarioBR).click();
        this.alertMessageVisible();   
    }

    searchScenario(scenarioName){
        cy.xpath(selectors.searchScenario).should('be.visible').type(`${scenarioName}{enter}`, { delay: 60 }).should('have.value', scenarioName);
        cy.xpath(selectors.searchScenario).type(' ');
        cy.xpath(selectors.searchScenario).type('{backspace}')
    }

    clickOnEllipsisScenario(){
        cy.get('[class="pagination"]').first().should('contain','1 - 1 of 1 Scenario');
        cy.xpath(selectors.menuScenario).click();
    }

    clickOnEditScenario(){
        cy.xpath(selectors.editScenarioBtn).click();
    }
    /*
    {
    editName: "new Name",
    editDescription: "new Description",
    editData: '{"newField": "new Data"}'
    }
    */

    addDataInScenario(data){
        cy.xpath('//div[@class="view-line"]').type(`{{}${data}}`)
        cy.xpath('//div[@class="view-line"]').invoke('text').should('contain',`${data}`);
    }
    


    clearDataField(){
        cy.xpath('//div[@class="view-line"]').then(($elements)=>{
            if ($elements.length > 1) {
                cy.xpath(selectors.dataScenarioBP).clear();
                this.clearDataField();
            }
            if ($elements.length == 1) {
                cy.xpath(selectors.dataScenarioBP).clear();
            }
        })
    }


    editScenario(scenarioConfig){
        cy.xpath(selectors.editScenarioBtn).click();
        const {editName, editDescription, editData} = scenarioConfig
        if(editName !== null){
            cy.xpath(selectors.nameScenarioBP).clear().type(editName).should('have.value',editName);
        }
        if(editDescription !== null) {
            cy.xpath(selectors.editDescription).clear().should('have.value', "")
                .type(editDescription).should('have.value',editDescription);
        }
        if(editData !== null){
            cy.get('[class="active-line-number line-numbers lh-odd"]').should('be.visible');
            this.clearDataField()
            this.addDataInScenario(editData.data);
        }
        cy.xpath(selectors.saveBtnScenarioBP).click()
        cy.get('.alert-wrapper > .alert').should('be.visible')
    }

    deleteScenario(){
        cy.xpath(selectors.deleteScenarioBtn).click();
        cy.xpath(selectors.confirmDeleteScenario).click();
    }

    searchScenarioAndSelectOption(scenarioName,optionCrud,scenarioConfig){
        this.searchScenario(scenarioName);
        cy.wait(2000)
        this.clickOnEllipsisScenario();
        switch (optionCrud) {
            case "edit":
                this.editScenario(scenarioConfig);
                break;
            case "delete":
                this.deleteScenario();
                break;
            default:
                break;
        }
    }
    //3. TEST RUNS
    clickOnTestRunsTab(){
        cy.get(selectors.testRunTab).should('be.visible');
        cy.get(selectors.testRunTab).click();
    }

    clickOnAddTest(){
        cy.get(selectors.testBtnInConfigProcess).click();
    }

    searchTest(value){
        cy.xpath().should('be.visible').type(`${value}{enter}`).should('have.value',value);
    }

    openLastTest(){
        cy.xpath('//div[@id="test_runs"]//table//tbody//td[1]//a').last().click();
    }

    clickOnclearBtn(){
        cy.get(selectors.clearBtnInRunTab).should('be.visible');
        cy.get('div[class="tab-content"]', {timeout:10000}).should('be.visible')
        cy.get(selectors.clearBtnInRunTab).click();
    }

    clickOnConfirmClearTests(){
        cy.xpath(selectors.confirmDeleteAllTests).should('be.visible');
        cy.xpath(selectors.confirmDeleteAllTests).click();
    }
    
    clearAllTestRuns(){
        this.clickOnTestRunsTab();
        cy.wait(2000);
        cy.xpath(selectors.rowTestsRun).find('td').invoke('text').then(($element)=>{
        if($element !== 'No Data Available'){
            this.clickOnclearBtn();
            this.clickOnConfirmClearTests();
        }
        else{
            return;
        }
        }) 
    }

    openLastTestFromConfigOfProcess(processName){
        navHelper.navigateToProcessPage();
        process.searchProcessAndSelectOptions(processName, "config");
        this.clickOnTestRunsTab();
        this.openLastTest();
    }

    clickOnEmailsTab(){
        cy.xpath(selectors.emailTab).click();
    }
    //Buttons
    clickOnsubmitBtn(){
        cy.get(selectors.submitBtn).should('be.visible').click();
    }

    alertMessageVisible(){
        cy.get(selectors.alertMessage).should('be.visible'); 
    }

    clickOnCompletedTaskBtn(){
        cy.xpath(selectors.completedBtn).should('be.visible').click();
    }
}
