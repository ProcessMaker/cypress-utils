import selectors from "#selectors/processTesting";
import { NavigationHelper } from "#helpers/navigationHelper";
import { Process } from "#pages/process";

const navHelper = new NavigationHelper();
const process = new Process();
export class ProcessTesting {

    //1.FROM MODELER
    //1A. Open Modal Run test
    clickOnRunTestOptionInModeler(iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).xpath(selectors.ellipsisMenuIcon).should('be.visible').click();
        cy.iframe(iframeSelector).xpath(selectors.runTestBtnInModeler).click();
    }

    //1B. Modal Run Test (Only alternative A)
    //Alternative
    selectAlternativeFromModeler(alternative, iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        switch (alternative) {
            case "Alternative A":
                cy.iframe(iframeSelector).find(selectors.alternativeField).select('Alternative A').should('have.value', 'A');
                break;
            case "Alternative B":
                cy.iframe(iframeSelector).find(selectors.alternativeField).select('Alternative B').should('have.value', 'B');
                break;
            case "Advanced":
                cy.iframe(iframeSelector).find(selectors.alternativeField).select('Advanced').should('have.value', 'Advanced');
            default:
                break;
        }
    }

    //Starting point from Modeler
    selectStartingPointFromModeler(startingPoint, iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).xpath(selectors.labelSP).should('be.visible');
        cy.iframe(iframeSelector).xpath(selectors.containerSP).click({force:true});
        cy.iframe(iframeSelector).find(selectors.inputSP).type(`{backspace}${startingPoint}`).should('have.value', startingPoint);
        cy.iframe(iframeSelector).xpath(selectors.itemSP).should('have.attr', 'aria-label').and('equal', `${startingPoint}. `);
        cy.iframe(iframeSelector).find(selectors.inputSP).type('{enter}', {force:true, delay: 500});
    }

    //Manual Resume Point from Modeler
    selectManualResumePointFromModeler(stopPoint, iframeOption = 'a') { 
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB   
        cy.iframe(iframeSelector).xpath(selectors.labelMRP).should('be.visible');   
        cy.iframe(iframeSelector).xpath(selectors.containerMRP).click({force:true}, {delay: 1000});
        cy.wait(2000);    
        cy.iframe(iframeSelector).xpath(selectors.inputMRP).type(`{backspace}${stopPoint}`).should('have.value', stopPoint);
        cy.iframe(iframeSelector).xpath(selectors.itemMRP).should('have.attr', 'aria-label').and('equal', `${stopPoint}. `);
        cy.iframe(iframeSelector).xpath(selectors.inputMRP).type('{enter}');
    }

    //Scenario from Modeler
    selectScenarioFromModeler(scenario, iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.wait(1000);
        cy.iframe(iframeSelector).xpath(selectors.labelScenario).should('be.visible');
        cy.iframe(iframeSelector).xpath(selectors.containerScenario).click();
        cy.iframe(iframeSelector).find(selectors.inputScenario).should('be.visible');
        cy.iframe(iframeSelector).find(selectors.inputScenario).click().type(scenario, { force: true, delay: 70 });
        cy.wait(1000)
        cy.iframe(iframeSelector).find(selectors.inputScenario).type('{enter}');
    }

    //Additional Data from Modeler
    addAdditionalDataFromModeler(data, iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).find(selectors.additionalData).type('{backspace}').type('{backspace}').type(`{{}${data}}`).should('contain', `{${data}}`);
    }

    //Bypass Script task and Data Connectors from Modeler
    enableBypassCheckboxFromModeler(iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).xpath(selectors.bypassCheckbox).click({ force: true });
    }

    //Run button in modal Run Test from Modeler
    clickOnRunTestBtnFromModeler(iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).xpath(selectors.runTestBtn).click({ force: true });
    }

    //Cancel button in modal Run Test from Modeler
    clickOnCancelBtnFromModeler(iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).xpath(selectors.cancelBtn).click({force:true});
    }
    //1C. Modal Run Test (A+B alternatives)

    //Alternative

    //Expression
    fillExpression(expression, iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).find(selectors.expressionInput).type(expression, { delay: 80 }).should('have.value', expression);
    }

    //Ratio

    //Type of Run
    selectTypeOfRun(option, iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).find(selectors.typeOfRun).select(option);
    }

    //1D. Modal to Run Test in modeler

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

    runTest(runTestConfig) {
        const { startingPoint, manualResumePoint, scenario, additionalData, isEnabledBypass } = runTestConfig
        if (startingPoint !== null) {
            this.selectStartingPointFromModeler(startingPoint.startingPointOption);
        }

        if (manualResumePoint !== null) {
            this.selectManualResumePointFromModeler(manualResumePoint.stopPointOption);
        }

        if (scenario !== null) {
            this.selectScenarioFromModeler(scenario.scenarioOption);
        }

        if (additionalData !== null) {
            this.addAdditionalDataFromModeler(additionalData.data)
        }

        if (isEnabledBypass) {
            this.enableBypassCheckboxFromModeler();
        }

        this.clickOnRunTestBtnFromModeler();
    }

    runTestFromModeler(runTestConfig, iframeOption, optionInAlternative, typeOfRun, expression) {
        const { startingPoint, manualResumePoint, scenario, additionalData, isEnabledBypass } = runTestConfig
        switch (optionInAlternative) {
            case "Alternative A":
                this.selectAlternativeFromModeler('Alternative A', iframeOption);
                this.runTest(runTestConfig);
                break;
            case "Alternative A":
                this.selectAlternativeFromModeler('Alternative B', iframeOption);
                this.runTest(runTestConfig);
                break;
            case "Advanced":
                this.selectAlternativeFromModeler('Advanced', iframeOption);
                this.fillExpression(expression, iframeOption);
                switch (typeOfRun) {
                    case "Automatic":
                        this.selectTypeOfRun('Automatic', iframeOption);
                        break;
                    case "Manual":
                        this.selectTypeOfRun('Manual', iframeOption);
                        break;
                    default:
                        break;
                }
                this.runTest(runTestConfig);
        }
    }

    //2.FROM PROCESS CONFIGURE
    //2A. Go to Test Run / Scenarios
    //Go to TestRun/ScenariosTab
    clickOnTestRun_ScenariosTab() {
        cy.get(selectors.testRun_ScenariosTab).should('be.visible');
        cy.get(selectors.testRun_ScenariosTab).click();
    }

    //Go to scenarios Tab
    clickOnScenariosTab() {
        cy.get(selectors.scenariosTab).click();
    }

    //Go to Test Run Tab
    clickOnTestRunTab() {
        cy.get(selectors.testRunTab).click();
    }

    //2B. SCENARIOS

    //I.Search scenario
    searchScenario(scenarioName) {
        cy.wait(2000);
        cy.get(selectors.searchScenario)
            .first()
            .should('be.visible')
            .should('not.be.disabled')
            .clear({ force: true })
            .type(scenarioName, { delay: 90, force: true });
        cy.reload();
    }

    //Search scenario and select edit or delete
    searchScenarioAndSelectOption(scenarioName, option, scenarioConfig) {
        this.searchScenario(scenarioName);
        cy.wait(2000)
        this.clickOnEllipsisScenario();
        switch (option) {
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

    //II.Create a scenario from process configuration
    /*
      {
      editName: "new Name",
      editDescription: "new Description",
      editData: '{"newField": "new Data"}'
      }
      */

    clickOnPlusScenario() {
        // Wait for the scenarios tab to be active
        cy.get('#scenarios-edit-tab').should('be.visible');
        cy.get('#test_runs').should('be.visible');
        
        // Wait for the plus scenario button to be available
        cy.get(selectors.plusScenarioBtn)
            .should('exist')
            .should('be.visible')
            .should('not.be.disabled')
            .click({ force: true, timeout: 10000 });
    }

    fillName(name) { 
        // Ensure that name is a string
        let nameString;
        if (typeof name === 'object') {
            nameString = JSON.stringify(name);
        } else {
            nameString = String(name);
        }

        // Wait for the modal to be visible
        cy.get('[class="modal-content"]').should('be.visible');
        
        // Wait and verify that the name field is ready
        cy.get(selectors.nameScenarioBP)
            .should('exist')
            .should('be.visible')
            .should('not.be.disabled')
            .clear({ force: true })
            .type(nameString, { 
                delay: 200, 
                force: true,
                parseSpecialCharSequences: false 
            })
            .should('have.value', nameString)
            .wait(500); // Small pause to ensure the value is set
    }

    fillDescription(description) {
        cy.wait(1000);
        cy.get(selectors.descriptionScenarioBP).first().type(description, { delay: 200, force: true }).should("have.value", description);
    }

    //Select Scenario Creation Type (Manual or Document upload)
    selectScenarioCreationType(option) {
        cy.xpath(selectors.labelScenarioCreationType).should('be.visible');
        cy.xpath('//legend[text()="Scenario Creation Type *"]//parent::fieldset//div[@class="multiselect__select"]').click();
        cy.contains(option).click();
    }

    addDataInScenario(data) {
        // Ensure that data is a string
        const dataString = typeof data === 'object' ? JSON.stringify(data) : String(data);
        
        // Wait for the Monaco editor to be ready
        cy.get(selectors.dataScenarioBP)
            .should('exist')
            .should('be.visible')
            .then($el => {
                // Find the textarea within the Monaco editor
                const textarea = $el.closest('.monaco-editor').find('textarea');
                
                // Click on the editor to activate it
                cy.wrap(textarea)
                    .click({ force: true })
                    .then(() => {
                        // Use the type command in the textarea
                        cy.wrap(textarea)
                            .type('{selectall}{backspace}', { force: true })
                            .type(dataString, { 
                                delay: 200, 
                                force: true,
                                parseSpecialCharSequences: false 
                            });
                    });
            });
    }

    clearDataField() {
        cy.xpath('//div[@class="view-line"]').then(($elements) => {
            if ($elements.length > 1) {
                cy.xpath(selectors.dataScenarioBP).clear();
                this.clearDataField();
            }
            if ($elements.length == 1) {
                cy.xpath(selectors.dataScenarioBP).clear();
            }
        })
    }

    saveCreateScenario() {
        cy.get(selectors.saveScenarioBPBtn).click({ force: true });
    }

    cancelCreateScenario() {

    }

    //III. Edit scenario

    clickOnEditScenario() {
        cy.xpath(selectors.editScenarioBtn).click();
    }

    editScenario2() {
        this.selectMenuOptionRowScenario("Edit Scenario");
    }

    selectMenuOptionRowScenario(nameOption2) {
        const optionCatXpath2 = `//div[@id="scenarios-edit-tab"]//button[@aria-haspopup="menu"]/following-sibling::ul//li//span[contains(text(),"${nameOption2}")]`;
        
        // Wait for the row to be visible and make hover
        cy.xpath('//*[@id="row-222"]/td[4]')
            .should('be.visible')
            .trigger('mouseover', { force: true });
            
        // Wait for the menu to be visible and click
        cy.xpath(optionCatXpath2)
            .should('be.visible')
            .should('not.be.disabled')
            .click({ force: true, timeout: 10000 });
    }

    searchScenarioAndSelectOptions(
        nameScenario,
        option2 = "config"
    ) {
        
        {
            cy.xpath(selectors.searchInputScenario).type(`${nameScenario}{enter}`).should("have.value", nameScenario);
            this.load();
            
            cy.xpath(selectors.selectMenuOptionRowScenario).should("be.visible");
            cy.xpath(selectors.selectMenuOptionRowScenario).first().should('be.visible');
            this.load();
            cy.xpath(selectors.selectMenuOptionRowScenario).first().click();
            
        }
        switch (option2) {
            case "editScenario":
                this.editScenario2();
                break;
            case "deleteSenario":
                this.deleteScenario();
                break;
        }
    }


    editScenario(scenarioConfig = {}) {
        this.clickOnEditScenario();
        
        if (!scenarioConfig || typeof scenarioConfig !== 'object') {
            cy.log('Warning: scenarioConfig is not defined or is not an object');
            return;
        }
        
        const { 
            editName = null, 
            editDescription = null, 
            editData = null 
        } = scenarioConfig;
        
        if (editName) {
            // Change xpath() to get() for CSS selectors
            cy.get('[class="modal-content"]').should('be.visible').within(()=>{ //catch all modal
                cy.get('[class="modal-body"] fieldset div > input').clear({delay:200}).first().type(editName).should('have.value', editName);  
            });        
        }
    
        if (editDescription) {
            // Change xpath() to get() for CSS selectors
            cy.get('[class="modal-content"]').should('be.visible').within(()=>{ //catch all modal
                
                cy.get('[class="modal-body"] fieldset div > textarea').first().clear().type(editDescription).should('have.value', editDescription);
            });   
        }
    
        /*if (editData) {
            cy.get('[class="active-line-number line-numbers lh-odd"]')
                .should('be.visible');
            this.clearDataField();
            this.addDataInScenario(editData.data);
        }*/

        // Change xpath() to get() if it is a CSS selector
        cy.get('footer button').contains('Save').click();   //save escenario
        cy.get('.alert-wrapper > .alert').should('be.visible');
    }

    //IV. Delete scenario
    deleteScenario() {
        cy.get('a[data-test="delete-scenario-btn"]').click();
        cy.wait(1500)
        cy.xpath(selectors.confirmDeleteScenario).click();
    }

    //2C Scenarios (Document upload)

    downloadFormat() {

    }

    uploadFile(nameFile, filePath) {
        cy.get(selectors.uploadBtn).selectFile(filePath, { force: true });
        cy.get(selectors.fileAttachedfield).should('contain', nameFile);
    }

    goToScenariosTab() {
        cy.wait(3000);
        this.clickOnTestRun_ScenariosTab();
        this.clickOnScenariosTab();
    }

    goToTestRunTab() {
        this.clickOnTestRun_ScenariosTab();
        this.clickOnTestRunTab();
    }

    createScenario(nameScenario, scenarioDescription, scenarioCreationType, data, nameFile, filePath) {
        
        this.clickOnPlusScenario(); 
        this.fillName(nameScenario);
        this.fillDescription(scenarioDescription);
        switch (scenarioCreationType) {
            case 'Manual Data':
                this.selectScenarioCreationType('Manual Data');
                this.addDataInScenario(data);
                break;
            case 'Document Upload':
                this.selectScenarioCreationType('Document Upload');
                this.uploadFile(nameFile, filePath);
                this.load();
                break;
            default:
                break;
        }
        this.saveCreateScenario();
    }

    //2D Modal to create scenario 
    createScenarioByProcess(nameScenario, scenarioDescription, scenarioCreationType, data, nameFile, filePath) {         
        // Navigate to the scenarios tab and wait for it to be ready
        this.goToScenariosTab();
        cy.get('#scenarios-edit-tab').should('be.visible');
        cy.get('#test_runs').should('be.visible');
        
        // Create the scenario with error handling
        try {
            this.createScenario(nameScenario, scenarioDescription, scenarioCreationType, data, nameFile, filePath);
            
            // wait 30 seconds to the modal disappear
            cy.get('.modal-content', { timeout: 30000 })
                .should('not.exist');
            
            // wait 60 seconds to the alert appear
            cy.get('.alert-wrapper', { timeout: 60000 })
                .should('exist')
                .should('be.visible')
                .within(() => {
                    cy.get('.alert')
                        .should('be.visible')
                        .should('contain', 'The process test scenario was created.')
                        .then($alert => {
                            cy.log('Escenario creado exitosamente:', $alert.text());
                        });
                });
                
            // wait 60 seconds to the alert disappear
            cy.get('.alert-wrapper > .alert', { timeout: 60000 })
                .should('not.exist');
                
        } catch (error) {
            cy.log('Error al crear el escenario:', error.message);
            throw error;
        }
    }

    createScenarioIfNotExist(nameScenario, scenarioDescription, scenarioCreationType, data, nameFile, filePath) {
        this.goToScenariosTab();
        this.searchScenario(nameScenario, scenarioDescription, scenarioCreationType, data, nameFile, filePath);
        this.load();
        cy.xpath('//div[@id="scenarios-edit-tab"]//div[@class="data-table"]').invoke('text').then($element => {
            cy.log($element)
            if ($element.includes('No Data Available')) {
                this.createScenario(nameScenario, scenarioDescription, scenarioCreationType, data, nameFile, filePath);
            } else {
                cy.log('brenda')
            }
        })
    }

    //Create scenario by request
    createScenarioByRequest(nameScenario, description, data) {
        cy.xpath(selectors.dataTab).should('be.visible');
        cy.xpath(selectors.dataTab).click();
        cy.xpath(selectors.createScenarioBtnBR).should('be.visible');
        cy.xpath(selectors.createScenarioBtnBR).click();
        cy.get(selectors.nameInCreateScenarioBR).type(nameScenario).should('have.value', nameScenario);
        cy.get(selectors.descriptionInCreateScenarioBR).type(description, { delay: 5 }).should('have.value', description);
        cy.xpath(selectors.saveBtnInCreateScenarioBR).click();
        this.alertMessageVisible();
    }

    //2E. Test Run
    clickOnTestRunsTab() {
        cy.get(selectors.testRunTabScenarios).should('be.visible').click();
       //cy.get(selectors.testRunTabScenarios).click();
    }

    clickOnTestRunTabScenarios() {
        cy.get(selectors.testRunTabScenarios).should('be.visible');
        cy.get(selectors.testRunTabScenarios).click();
    }

    clickOnPlusTest() {
        cy.get(selectors.testBtnInConfigProcess).click();
    }

    //Modal Run Test (Only alternative A)

    //Search Test Run
    searchTestRun(value) {
        // Wait for the search field to be visible and available
        cy.get(selectors.searchTestRun)
            .should('be.visible')
            .should('not.be.disabled')
            .should('have.css', 'pointer-events', 'auto')
            .click({ force: true })
            .clear({ force: true })
            .type(value, { delay: 100, force: true })
            .should('have.value', value);
    }

    //Create Run Test from process configure
    createRunTest() {
        this.clickOnTestRun_ScenariosTab();
        this.clickOnTestRunTab();
        this.clickOnPlusTest();
    }

    //Alternative
    selectAlternativeFromProcessConfigure(alternative) {
        cy.get('#select-alternative').invoke('attr', 'disabled').then(($Alternative) => {
            cy.log($Alternative)
            if ($Alternative == 'disabled') {
                return
            } else {
                switch (alternative) {
                    case "Alternative A":
                        cy.get(selectors.alternativeField).select('Alternative A').should('have.value', 'A');
                        break;
                    case "Alternative B":
                        cy.get(selectors.alternativeField).select('Alternative B').should('have.value', 'B');
                        break;
                    case "As configured in the process":
                        cy.get(selectors.alternativeField).select('As configured in the process').should('have.value', 'AB');
                        break;
                    default:
                        break;
                }
            }
        })
    }

    //Starting point from process configure
    selectStartingPoint(startingPoint) {
        cy.xpath(selectors.labelSP).should('be.visible');
        cy.xpath(selectors.containerSP).should('be.visible');
        cy.xpath(selectors.containerSP).click({force:true});
        cy.get(selectors.inputSP).type(`{backspace}${startingPoint}`, {delay: 500}).should('have.value', startingPoint);
        cy.xpath(selectors.itemSP).should('have.attr', 'aria-label').and('equal', `${startingPoint}. `);
        cy.get(selectors.inputSP).type('{enter}');

    }

    //Manual Resume Point from process configure
    selectManualResumePoint(stopPoint) {
        cy.xpath(selectors.labelMRP).should('be.visible');
        cy.xpath(selectors.containerMRP).click();
        cy.xpath(selectors.inputMRP).type(`{backspace}${stopPoint}`).should('have.value', stopPoint);
        cy.xpath(selectors.itemMRP).should('have.attr', 'aria-label').and('equal', `${stopPoint}. `);
        cy.xpath(selectors.inputMRP).type('{enter}');
    }

    //Select Manual or advanced
    selectManualOrAdvanced(option) {
        switch (option) {
            case "Manual":
                cy.get(selectors.manualBtn).click();
                break;
            case "Advanced":
                cy.get(selectors.advancedBtn).click();
                break;
            default:
                break;
        }
    }

    //Advanced
    fillPMQL(query) {
        cy.get(selectors.pmqlField).type(query).should('have.value', query);
    }

    clickOnBrowseBtn() {
        cy.get(selectors.browseBtn).click();
    }

    //Scenarios from process configure
    selectScenarioByProcessConfigure(scenario) {
        cy.xpath('//div[@data-test="test-run-scenario-select"]//div[@class="multiselect__select"]').click();
        cy.xpath('//div[@data-test="test-run-scenario-select"]//input').type();
        cy.xpath('//div[@data-test="test-run-scenario-select"]//div[@class="multiselect__content-wrapper"]//li[1]').should('have.attr', 'aria-label').and('equal', `${scenario}. `);
        cy.xpath('//div[@data-test="test-run-scenario-select"]//input').type('{enter}');
    }

    selectScenario(scenario, iframeOption = 'a') {

        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).xpath(selectors.labelScenario).should('be.visible');
        cy.iframe(iframeSelector).xpath(selectors.containerScenario).should('be.visible');
        cy.iframe(iframeSelector).xpath(selectors.containerScenario).click({force:true});
        cy.iframe(iframeSelector).find(selectors.inputScenario).type(`{backspace}${scenario}`).should('have.value', scenario);
        cy.wait(3000);
        cy.iframe(iframeSelector).find(selectors.inputScenario).type('{enter}'); 
       
    }

    selectAllScenarios(nameToFilter) {
        cy.xpath(selectors.containerScenario).click();
        cy.get(selectors.inputScenario).click().type(nameToFilter).should('have.value', nameToFilter);
        cy.get('[aria-label="-- Select All --. "]').click();
    }

    //Additional Data from process configure
    addAdditionalData(data) {
        cy.get(selectors.additionalData).type('{backspace}').type('{backspace}').type(`{{}${data}}`).should('contain', `{${data}}`);
    }

    //Bypass Script task and Data Connectors from process configure
    enableBypassCheckbox() {
        cy.xpath(selectors.bypassCheckbox).click({ force: true });
    }

    //Run button in Run Test modal from process configure
    clickOnRunBtn() {
        cy.xpath(selectors.runBtn).should('be.visible').click();
    }

    //Close button

    //Modal Run Test from process configure
   /* runTestFromProcessConfigure(runTestConfig, manualOrAdvanced, singleOrMassive, query) {
        const { alternative, startingPoint, manualResumePoint, scenario, additionalData, isEnabledBypass } = runTestConfig
        this.createRunTest();
        cy.xpath(selectors.labelAlternative).should('be.visible');
        cy.xpath(selectors.containerSP).should('contain', 'Start Event');

        if (alternative !== null) {
            this.selectAlternativeFromProcessConfigure(alternative.alternative);
        }

        if (startingPoint !== null) {
            cy.wait(3000);
            this.selectStartingPoint(startingPoint.startingPointOption);
        }

        if (manualResumePoint !== null) {
            this.selectManualResumePoint(manualResumePoint.stopPointOption);
        }

        switch (manualOrAdvanced) {
            case "Manual":
                this.selectManualOrAdvanced('Manual');
                break;
            case "Advanced":
                this.selectManualOrAdvanced('Advanced');
                this.fillPMQL(query);
                this.clickOnBrowseBtn();
                break;
            default:
                break;
        }

        if (scenario !== null) {
            switch (singleOrMassive) {
                case "Single":
                    this.selectScenario(scenario.scenarioOption);
                    break;
                case "Massive":
                    this.selectAllScenarios(scenario.scenarioOption);
                    break;
                default:
                    break;
            }
        }

        if (additionalData !== null) {
            this.addAdditionalData(additionalData.data)
        }

        if (isEnabledBypass) {
            this.enableBypassCheckbox();
        }

        this.clickOnRunBtn();
    }

    //III.Others
    openLastTest() {
        cy.xpath('//div[@id="test_runs"]//table//tbody//td[1]//a').last().click();
    }

    clickOnclearBtn() {
        cy.get(selectors.clearBtnInRunTab).should('be.visible');
        cy.get('div[class="tab-content"]', { timeout: 10000 }).should('be.visible')
        cy.get(selectors.clearBtnInRunTab).click();
    }

    clickOnConfirmClearTests() {
        cy.xpath(selectors.confirmDeleteAllTests).should('be.visible');
        cy.xpath(selectors.confirmDeleteAllTests).click();
    }

    clearAllTestRuns() {
        this.clickOnTestRunsTab();
        this.clickOnTestRunTabScenarios();
        cy.wait(2000);
        this.clickOnTestRunTab();
        cy.xpath(selectors.rowTestsRun).find('td').invoke('text').then(($element) => {
            if ($element !== 'No Data Available') {
                this.clickOnclearBtn();
                this.clickOnConfirmClearTests();
            }
            else {
                return;
            }
        })
    }*/

        runTestFromProcessConfigure(runTestConfig, manualOrAdvanced, singleOrMassive, query) {
            const { alternative, startingPoint, manualResumePoint, scenario, additionalData, isEnabledBypass } = runTestConfig
            
            // Wait for the page to load
            cy.wait(2000);
            
            // Create the test run
            this.createRunTest();
            
            // Verifies that the element exists (using the most flexible selector)
            cy.xpath('//label[contains(text(),"Alternative")]', { timeout: 30000 })
                .should('exist')
                .should('be.visible')
                .then($el => {
                    cy.log('Elemento encontrado:', $el.text());
                });
            
            // Verifies the container
            cy.xpath(selectors.containerSP)
                .should('exist')
                .should('contain', 'Start Event');
            
            
        }

    openLastTestFromConfigOfProcess(processName) {
        navHelper.navigateToProcessPage();
        process.searchProcessAndSelectOptions(processName, "config");
        this.clickOnTestRunsTab();
        this.openLastTest();
    }

    clickOnEmailsTab() {
        cy.xpath(selectors.emailTab).click();
    }

    clickOnsubmitBtn() {
        cy.get(selectors.submitBtn).should('be.visible').click();
    }

    alertMessageVisible() {
        cy.get(selectors.alertMessage).should('be.visible');
    }

    clickOnCompletedTaskBtn() {
        cy.xpath(selectors.completedBtn).should('be.visible').click();
    }

    clickOnEllipsisScenario() {
        // Wait for the scenarios table to be loaded
        cy.get('#scenarios-edit-tab').should('be.visible');
        
        // Wait for the ellipsis menu to be present and visible
        cy.xpath(selectors.menuScenario, { timeout: 30000 })
            .should('exist')
            .should('be.visible')
            .should('not.be.disabled')
            .first()
            .click({ force: true });
            
        // Verify that the dropdown menu appeared
        cy.xpath('//div[@data-test="scenario-ellipsis"]//button[@aria-haspopup="menu"]/following-sibling::ul')
            .should('be.visible');
    }

    load() {
        cy.wait(5000);
    }

    deleteScenarios(scenarioName, init, end) {
        for (let index = init; index < end; index++) {
            this.searchScenarioAndSelectOption(`${scenarioName} - ${index}`, 'delete');
            cy.wait(100)
        }
    }

    createScenarioByUploadFile(nameScenario, scenarioDescription, nameFile, filePath) {
        // Navigate to the scenarios tab
        this.goToScenariosTab();
        
        // Wait for the tab to be fully loaded
        cy.get('#scenarios-edit-tab').should('be.visible');
        cy.get('#test_runs').should('be.visible');
        
        // Try to click on the create scenario button
        this.clickOnPlusScenario();
        
        // Verify that the creation modal is visible
        cy.get('.modal-content').should('be.visible');
        
        this.fillName(nameScenario);
        this.fillDescription(scenarioDescription);
        this.selectScenarioCreationType('Document Upload');
        this.uploadFile(nameFile, filePath);
        this.load();
        this.saveCreateScenario();
        cy.get('.alert-wrapper > .alert').should("be.visible");
        cy.get('.alert-wrapper > .alert').should("contain", "The process test scenario was created.");
    }

    runTestSingleOrMassiveInManualMode(runTestConfig, singleOrMassive) {
        const { alternative, startingPoint, manualResumePoint, scenario, additionalData, isEnabledBypass } = runTestConfig;
        
        // Create the test run
        this.createRunTest();
        
        // Wait for the page to load completely
        cy.wait(2000);
        
        // Take screenshot for debugging
        cy.screenshot('antes-de-buscar-modal');
        
        // Verify that the modal exists and is visible
        cy.get('.modal-content', { timeout: 30000 })
            .should('exist')
            .should('be.visible')
            .then($modal => {
                cy.log('Modal encontrado:', $modal.text());
            })
            .within(() => {
                // Verificar que los elementos principales están presentes
                cy.get('.modal-body').should('exist').should('be.visible');
                
                // Wait for the elements to be visible within the modal
                cy.xpath(selectors.labelAlternative)
                    .should('exist')
                    .should('be.visible')
                    .then($el => {
                        cy.log('Label Alternative encontrado:', $el.text());
                    });
                    
                cy.xpath(selectors.containerSP)
                    .should('exist')
                    .should('contain', 'Start Event')
                    .then($el => {
                        cy.log('Container SP encontrado:', $el.text());
                    });
                
                // Resto del código...
                if (alternative !== null) {
                    this.selectAlternativeFromProcessConfigure(alternative.alternative);
                }
                
                if (startingPoint !== null) {
                    cy.wait(3000);
                    this.selectStartingPoint(startingPoint.startingPointOption);
                }
                
                if (manualResumePoint !== null) {
                    this.selectManualResumePoint(manualResumePoint.stopPointOption);
                }
                
                this.selectManualOrAdvanced('Manual');
                
                if (scenario !== null) {
                    switch (singleOrMassive) {
                        case "Single":
                            this.selectScenario(scenario.scenarioOption);
                            break;
                        case "Massive":
                            this.selectAllScenarios(scenario.scenarioOption);
                            break;
                        default:
                            break;
                    }
                }
                
                if (additionalData !== null) {
                    this.addAdditionalData(additionalData.data);
                }
                
                if (isEnabledBypass) {
                    this.enableBypassCheckbox();
                }
                
                this.clickOnRunBtn();
            });
    }
}