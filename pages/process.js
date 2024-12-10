import selectors from "#selectors/process"
import pageConstants from "#helpers/pageConstants";
import promisify from 'cypress-promise'
import { NavigationHelper } from "#helpers/navigationHelper";
import { isThisWeek } from "date-fns";
import "#support/commands";
import {Utility} from "./utility";
import selectorProject from "#selectors/projects";

const utility = new Utility();

export class Process {

    getId(eventName) {
        cy.wait(2000);
        var locator;
        switch (eventName) {
            case 'start':
                locator = selectors.recentlyDropedEvent.replace('eventName', pageConstants.processDropedElements.start_event);
                break;
            case 'pdf generator':
                locator = selectors.recentlyDropedEvent.replace('eventName', pageConstants.processDropedElements.pdf_generator_event);
                break;
            case 'task':
                locator = selectors.recentlyDropedEvent.replace('eventName', pageConstants.processDropedElements.task_event);
                break;
            case 'end':
                locator = selectors.recentlyDropedEvent.replace('eventName', pageConstants.processDropedElements.end_event);
                break;
            case 'data connector':
                locator = selectors.recentlyDropedEvent.replace('eventName', pageConstants.processDropedElements.data_connector_event);
                break;
            case 'Gateway':
                locator = selectors.recentlyDropedEvent.replace('eventName', pageConstants.processDropedElements.gateway_event);
                break;
            case 'Intermediate Event':
                locator = selectors.recentlyDropedEvent.replace('eventName', pageConstants.processDropedElements.intermediate_event);
                break;
            case 'AI Generated':
                locator = selectors.recentlyDropedEvent.replace('eventName', pageConstants.processDropedElements.AI_Generated_event);
                break;
        }
        // const id = await promisify(cy.get(locator).then($elems => {
        const id = cy.get(locator).then($elems => {
            var index = 0;
            var max_id = 0;
            for (let i = 0; i < $elems.length; i++) {
                let id = $elems[i].id;
                let ids = id.split('_');
                if ((parseInt(ids[1]) % 2) == 1) {
                    if (max_id < parseInt(ids[1])) {
                        max_id = parseInt(ids[1]);
                        index = i;
                    }
                }
            }
            return $elems[index].id;
        });

        return id;
    }

    async getRecentElementId() {
        return await promisify(cy
            .get('[title="Start Event"]')
            .then($el => $el.text())
        )
    }

    dragEvent(type, offsetX, offsetY) {
        switch (type) {
            case 'start':
                this.clickAndDropElement('processmaker-modeler-start-event', { x: offsetX, y: offsetY });
                break;
            case 'pool':
                this.clickAndDropElement('processmaker-modeler-pool', { x: offsetX, y: offsetY });
                break;
            case 'task':
                this.clickAndDropElement('processmaker-modeler-task', { x: offsetX, y: offsetY });
                break;
            case 'pdf generator':
                this.clickAndDropElement('processmaker-communication-pdf-print', { x: offsetX, y: offsetY });
                break;
            case 'end':
                this.clickAndDropElement('processmaker-modeler-end-event', { x: offsetX, y: offsetY });
                break;
            case 'Data Connector':
                this.clickAndDropElement('data-source-task-service', { x: offsetX, y: offsetY });
                break;
            case 'Gateway':
                this.clickAndDropElement('processmaker-modeler-exclusive-gateway', { x: offsetX, y: offsetY });
                break;
            case 'AI Generated':
                this.clickAndDropElement('processmaker-ai-assistant', { x: offsetX, y: offsetY });
                break;
            case 'Intermediate Event':
                this.clickAndDropElement('processmaker-modeler-intermediate-catch-timer-event', { x: offsetX, y: offsetY });
                break;
            case 'Flow Genie':
                this.clickAndDropElement('processmaker-ai-task', { x: offsetX, y: offsetY });
                break;
            case 'RPA':
                this.dragRPA(selectors.prrocessEvent.replace('eventName', pageConstants.process.RPA_event), offsetX, offsetY);
                break;

        }
    }

    dragStartEvent(selector, offsetX, offsetY) {
        cy.get('[class="node-types__container"]').find('#nodeTypesList > div > div:nth-child(2) > span').first().trigger('mousedown')
            .trigger('mousemove', {
                pageX: offsetX,
                pageY: offsetY,
                force: true
            });
        cy.get('[data-test="paper"]').first().trigger('mouseup', offsetX, offsetY);
    }

    dragEndEvent(selector, offsetX, offsetY) {
        cy.get('[class="node-types__container"]').find('#nodeTypesList > div > div:nth-child(4) > span').trigger('mousedown')
            .trigger('mousemove', {
                pageX: offsetX,
                pageY: offsetY,
                force: true
            });
        cy.get('[data-test="paper"]').first().trigger('mouseup', offsetX, offsetY);
    }

    dragPdfGeneratorEvent(selector, offsetX, offsetY) {
        cy.xpath(selector.replace('index', 1)).trigger('mousedown')
            .trigger('mousemove', {
                pageX: offsetX,
                pageY: offsetY,
                force: true
            })
        cy.xpath("(//span[text()='PDF Generator'])[2]")
            .trigger('mouseup');
    }

    dragdataConnectorEvent(selector, offsetX, offsetY) {
        cy.xpath(selector.replace('index', 1)).trigger('mousedown')
            .trigger('mousemove', {
                pageX: offsetX,
                pageY: offsetY,
                force: true
            })
        cy.xpath("(//span[text()='Data Connector'])[2]")
            .trigger('mouseup');
    }

    dragAIGeneratedEvent(selector, offsetX, offsetY) {
        cy.get('#nodeTypesList > div > div:nth-child(17) > span').trigger('mousedown')
            .trigger('mousemove', {
                pageX: offsetX,
                pageY: offsetY,
                force: true
            });
        cy.get('[data-test="paper"]').first().trigger('mouseup', offsetX, offsetY);
    }

    dragFlowGenieEvent(selector, offsetX, offsetY) {
        cy.get('#nodeTypesList > div > div:nth-child(18) > span').trigger('mousedown')
            .trigger('mousemove', {
                pageX: offsetX,
                pageY: offsetY,
                force: true
            });
        cy.get('[data-test="paper"]').first().trigger('mouseup', offsetX, offsetY);
    }

    dragRPA(selector, offsetX, offsetY) {
        cy.get('#nodeTypesList > div > div:nth-child(21) > span').trigger('mousedown')
            .trigger('mousemove', {
                pageX: offsetX,
                pageY: offsetY,
                force: true
            });
        cy.get('[data-test="paper"]').first().trigger('mouseup', offsetX, offsetY);
    }

    draggatewayEvent(selector, offsetX, offsetY) {
        cy.xpath(selector.replace('index', 1)).trigger('mousedown')
            .trigger('mousemove', {
                pageX: offsetX,
                pageY: offsetY,
                force: true
            })
        cy.xpath("(//span[text()='Gateway'])[2]")
            .trigger('mouseup');
    }

    dragintermediateEvent(selector, offsetX, offsetY) {
        cy.xpath(selector.replace('index', 1)).trigger('mousedown')
            .trigger('mousemove', {
                pageX: offsetX,
                pageY: offsetY,
                force: true
            })
        cy.xpath("(//span[text()='Intermediate Event'])[2]")
            .trigger('mouseup');
    }
    clickAndDropElement(node, position) {
        cy.window().its('store.state.paper').then(paper => {
            const { tx, ty } = paper.translate();

            cy.get('.main-paper').then($paperContainer => {
                const { x, y } = $paperContainer[0].getBoundingClientRect();
                const mouseEvent = { clientX: position.x + x + tx, clientY: position.y + y + ty };
                cy.get('.control-add').eq(0).click();
                cy.get('[data-test=explorer-rail]').find(`[data-test=${node}]`).click();
                cy.get('[id="explorer-rail"]>* [class="close--container"]>svg').click();
                cy.document().trigger('mousemove', mouseEvent);
                cy.wait(300);
                cy.get('.paper-container').trigger('mousedown', mouseEvent);
                cy.wait(300);
                cy.get('.paper-container').trigger('mouseup', mouseEvent);

            });
        });
    }
    dragEventByOffSet(selector, offsetX, offsetY) {
        cy.get('[class="node-types__container"]').find('#nodeTypesList > div > div:nth-child(5) > span').trigger('mousedown')
            .trigger('mousemove', {
                pageX: offsetX,
                pageY: offsetY
            });
        cy.get('[data-test="paper"]').first().trigger('mouseup', offsetX, offsetY);
    }

    clickOnZoomOut() {
        cy.get(selectors.zoomOutBtn).click();
    }

    connectToEvents(event1Locator, event2Locator) {
        cy.get('#'+event1Locator).click();
        cy.get('[class="crown-config"]').should('be.visible')
        cy.get('#generic-flow-button').click();
        cy.get('#'+event2Locator).click();
    }

    clickOnSave() {
        cy.xpath(selectors.saveBtn).first().click({force:true});
    }

    saveTheProcess(name) {
        this.clickOnSave();
        cy.xpath(selectors.saveBtnInPopUp).click();
        cy.xpath(selectors.saveChangesModal).should('not.exist');
        cy.get(selectors.clickonProcess).click();
        cy.get(selectors.ProcessPgVerify).should('be.visible');
        cy.get(selectors.processIndex).should('be.not.visible');
        cy.get(selectors.activeIcon).should('be.visible');
        cy.xpath(selectors.ProcessSearchBx).type(name);
        cy.xpath(selectors.clickOnSearchBtn).click();
        cy.xpath(selectors.processNameVerify.replace('name', name)).should('be.visible');
        cy.xpath(selectors.clickOnSetting.replace('processName', name)).should('be.visible').click();
        cy.get(selectors.configurationTab).should('be.visible');
        //cy.wait(2000);
        cy.xpath(selectors.clickOnPrcsMngrOpt).click();
        cy.xpath(selectors.clickonPrcsMngrInpt).type("Admin");
        //cy.wait(2000);
        cy.xpath(selectors.selectAdminOption).should('be.visible').click();
        cy.xpath(selectors.saveProcessMngr).click();
        /*cy.xpath(selectors.sucessToast).should('be.visible');
        cy.xpath(selectors.sucessToast).should('not.exist');*/
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should('be.visible');
        //cy.wait(4000);
    }

    /**
     * This method is responsible to create a process
     * @param name: name of the new process
     * @param description: description about of the new process
     * @param category: Select a Process Category
     * @param username: Select a username to be a process manager
     * @return nothing returns
     */
    createProcess(name, description, category = "", username = "") {
        this.clickOnAddProcess();
        cy.xpath(selectors.blankProcessBtbXpath).should("be.visible").click();
        this.enterProcessName(name);
        this.enterProcessDescription(description);
        if (category != "") this.enterProcessCategory(category);
        if (username != "") this.enterProcessManager(username);
        this.clickOnSaveInAddProcessModal();
        //cy.xpath(selectors.processRailBottomXpath).should("be.visible");
    }

    searchForProcess(processName) {
        var editBtn = '//div[@id="categorizedList"]/ul/li/a[@id="nav-sources-tab"]//ancestor::div[@id="categorizedList"]/descendant::div[@id="processIndex"]//table/tbody/tr//button[@aria-haspopup="menu"]';
        cy.xpath(editBtn).should('be.visible');
        //cy.xpath(selectors.searchInputBox).type(`${processName}{enter}`).should('have.value', processName);
        cy.xpath(selectors.searchInputBox).type(processName);
        cy.xpath(selectors.searchInputBox).type("{enter}");
        cy.xpath(selectors.searchInputBox).should('have.value', processName);
        cy.get(selectors.loadingSpinnerProcess).should('be.visible');
        cy.xpath(editBtn).should("be.visible");
        cy.xpath(editBtn).first().click();
        this.selectMenuOptionRow("Open in Modeler");
    }
    

    clickOnSaveInAddProcessModal() {
        cy.xpath(selectors.saveBtnInPopUp).click();
    }

    clickOnAddProcess() {
        cy.get(selectors.addProcessBtn).click();
    }

    enterProcessName(name) {
        cy.get(selectors.nameTxtBx)
            .should("be.visible")
            .type(name, { delay: 200 })
            .should("have.value", name);
    }

    enterProcessDescription(description) {
        cy.get(selectors.descriptionTxtBx)
            .type(description)
            .should("have.value", description);
    }

    enterProcessManager(username) {
        cy.xpath(selectors.managerFieldXpath).click();
        cy.xpath(selectors.managerFieldTxtXpath)
            .type(username, { delay: 100 })
            .should("have.value", username)
            .type("{enter}");
    }

    enterProcessCategory(category) {
        cy.xpath(selectors.processCategoryFieldXpath).click();
        cy.xpath(selectors.processCategoryInputXpath).type(category, {
            delay: 200,
        });
        cy.xpath(
            selectors.selectCategoryListXpath.replace("categoryName", category)
        )
            .should("be.visible")
            .click();
    }

    addScreenToFormTask(eventLocator, screenName) {
        //cy.wait(2000);
        cy.iframe('[id="alternative_a"]').find('#' + eventLocator).click();
        //cy.wait(1000);
        cy.xpath(selectors.screenForInputDropdown).should('be.visible');
        cy.xpath(selectors.screenForInputDropdown).click();
        cy.get(selectors.screenInputTxtBx).type(screenName).should('have.value', screenName);
        cy.xpath(selectors.screenDropdownOption.replace('screenName', screenName)).click({ force: true });
        // cy.xpath(selectors.screenForInputDropdown).should('have.value', screenName);
    }

    addDisplayScreenToPDFGenrator(eventLocator, screenName) {
        cy.get('#' + eventLocator).click();
        cy.xpath(selectors.screenForDisplayDropdown).should('be.visible');
        cy.xpath(selectors.screenForDisplayDropdown).click();
        cy.wait(3000);
        cy.get(selectors.screenInputTxtBx).type(screenName).should('have.value', screenName);

        cy.xpath('//label[text()="Select a Display Screen"]/parent::div//div[@class="multiselect__content-wrapper"]//li[1]')
            .should('have.attr', 'aria-label') // yields the "href" attribute
            .and('equal', screenName + ". ");
        cy.xpath('//label[text()="Select a Display Screen"]/parent::div//input').type('{enter}');
        // cy.xpath(selectors.screenForInputDropdown).should('have.value', screenName);
    }

    addDisplayScreenToManualTask(eventLocator, screenName) {
        cy.get('#' + eventLocator).click();
        cy.wait(2000);
        cy.xpath(selectors.screenForManualTask).click();
        cy.get(selectors.screenInputTxtBx).type(screenName).should('have.value', screenName);
        cy.xpath(selectors.screenDropdownOption.replace('screenName', screenName)).click();
        // cy.xpath(selectors.screenForInputDropdown).should('have.value', screenName);
    }

    clickOnLoopActivity() {
        cy.get(selectors.expandLoopActivityBtn).click();
    }

    selectLoopMode(loopMode) {
        cy.xpath(selectors.loopModeDropdown).select(loopMode);
    }

    enterRequestVarArrayName(selectListName) {
        cy.xpath(selectors.requestVarArrayTxtBx).type(selectListName).should('have.value', selectListName);
    }

    enterLoopIterations(selectListName) {
        cy.xpath(selectors.iterationTextBox).type(selectListName).should('have.value', selectListName);
    }

    enterExitCondition(exitConditionName) {
        cy.xpath(selectors.conditionTextBox).type(exitConditionName).should('have.value', exitConditionName);
    }

    addLoopActivity(loopMode, selectListName, exitConditionName) {
        this.clickOnLoopActivity();
        this.selectLoopMode(loopMode);
        switch (loopMode) {
            case 'Multi-Instance (Sequential)':
                this.enterRequestVarArrayName(selectListName);
                break;
            case 'Loop':
                this.enterLoopIterations(selectListName);
                this.enterExitCondition(exitConditionName);
                break;
            case 'Multi-Instance (Parallel)':
                this.enterRequestVarArrayName(selectListName);
                break;
        }
    }

    clickOnSettingsTask(){
        cy.get('[data-test="select-type-dropdown"]').click();
    }
    clickOnConfirmChange(){
        cy.xpath('//button[contains(text(),"Confirm")]')
            .should('be.visible')
            .click();
    }

    changeToManualTask() {
        cy.get(selectors.addManualTask).click();
        this.clickOnConfirmChange();
    }

    changeToTaskForm() {
        cy.get(selectors.addTaskForm).click();
        this.clickOnConfirmChange();
    }

    changetoscripttask() {
        cy.get(selectors.scripttaskBtn).click();
        this.clickOnConfirmChange();
    }


    addScreenToscriptTask(eventLocator, screenName) {
        cy.get('#' + eventLocator).click();
        cy.wait(2000);
        cy.get(selectors.screenForScriptDropdown).click();
        cy.get(selectors.screenInputTxtBx).type(screenName).should('have.value', screenName);
        cy.xpath(selectors.screenDropdownOption.replace('screenName', screenName)).click();
        // cy.xpath(selectors.screenForInputDropdown).should('have.value', screenName);
    }

    addUserToProcessManager(processName) {
        cy.xpath('(//button[@title="Edit"])[1]').should('be.visible');
        cy.xpath(selectors.searchInputProcess).type(processName).should('have.value', processName);
        cy.xpath(selectors.searchBox).click();
        cy.wait(2000);
        cy.xpath(selectors.processNameInputTxt.replace('processName', processName)).should('be.visible');
        cy.xpath(selectors.configureBtn).click();
        cy.wait(2000);
        cy.xpath(selectors.processManagerDropdown).click();
        cy.xpath(selectors.processInputTxt).type("admin");
        cy.xpath(selectors.processManagerDropdownOption).click();
        cy.xpath(selectors.processManagerEditSaveBtn).click();
        // cy.wait(12000);
        //cy.xpath("//span[text()='Designer']").click();
    }

    selectdataconnector(eventLocator, screenName, listName) {
        cy.get('#' + eventLocator).click();
        //cy.wait(2000);
        cy.xpath(selectors.dataConnectorDropdown).click();
        cy.get(selectors.dataConnectorInputtxtBx).type(screenName).should('have.value', screenName);
        cy.xpath(selectors.screenDropdownOption.replace('screenName', screenName)).click();
        cy.xpath(selectors.dataconnectorListDropdown).click();
        cy.get(selectors.dataConnectorListInputtxtBx).type(listName).should('have.value', listName);
        cy.xpath(selectors.listInputoption.replace('listName', listName)).click({ multiple: true });
        //cy.xpath(selectors.screenForInputDropdown).should('have.value', screenName);
    }
    changetaskname(rename) {
        cy.get(selectors.nameInput).clear();
        cy.get(selectors.nameInput).type(rename).should('have.value', rename);
    }

    changeToeventBasedGateway() {
        cy.get(selectors.eventBasedGatewayBtn).click();
    }

    changeTointermediateSignalCatchEvent() {
        cy.get(selectors.intermediateSignalCatchEvent).click();
    }

    addsignal(eventLocator, signalName) {
        cy.get('#' + eventLocator).click();
        cy.wait(2000);
        cy.xpath(selectors.signalForInputDropdown).click();
        cy.get(selectors.signalInputTxtBx).type(signalName).should('have.value', signalName);
        cy.xpath(selectors.signalDropdownOption.replace('signalName', signalName)).first().click();
        // cy.xpath(selectors.screenForInputDropdown).should('have.value', screenName);
    }

    addassignmentRules(eventLocator, userName) {
        cy.get('#' + eventLocator).click();
        cy.wait(2000);
        cy.xpath(selectors.configDropDown).click();
        cy.xpath(selectors.assignRules).click();
        cy.get(selectors.userDropDown).select("user_group");
        cy.xpath(selectors.assignedUsersOption).click();
        cy.xpath(selectors.usertxtInput).type(userName).should('have.value', userName);
        cy.xpath(selectors.useroption.replace('userName', userName)).click({ multiple: true, force: true });
    }
    addResponseMapping(source, requestVariable) {
        cy.xpath(selectors.responseMappingbtn).click();
        cy.get(selectors.responseMappingSrcInput).type(source).should('have.value', source);
        cy.get(selectors.responseMappingVarInput).type(requestVariable).should('have.value', requestVariable);
        cy.get(selectors.resMappingSaveBtn).click();
        cy.xpath(selectors.resMappingEditOption).should('be.visible');
    }
    changeToterminateEndEvent() {
        cy.get(selectors.terminateEndEventBtn).click();
    }
    changepdfFileName(pdffilename) {
        cy.get(selectors.pdfFileNameInput).clear();
        cy.get(selectors.pdfFileNameInput).type(pdffilename).should('have.value', pdffilename);
    }

    /**
     * This method is responsible to import and config a process if this is not exists
     * @param processName: Name of the process
     * @param filePath: Path of the process
     * @param parametersMapList: object list with config to process
     * Ej. var
     * let parameterList = [
     *      **To Start Event 1
     *      {elemName: "Start Event", label:"startEvent1",user:"admin",firstName:"Admin", lastName:"User"},
     *      **To Start Status
     *      {elemName: "Status", label:"Status",state:"INACTIVE"},
     *   ];
     * @return nothing returns
     */
    verifyPresenceOfProcessAndImportProcess(
        processName,
        filePath,
        parametersMapList = [],
        password = "0"
    ) {
        var editBtn =
            '//div[@id="categorizedList"]/ul/li/a[@id="nav-sources-tab"]//ancestor::div[@id="categorizedList"]/descendant::div[@id="processIndex"]//table/tbody/tr//button[@aria-haspopup="menu"]';
        cy.xpath(editBtn,{ timeout: 18000 }).should("be.visible");
        cy.xpath(selectors.searchInputBox)
            .type(`${processName}`)
            .should("have.value", processName);
        cy.xpath(selectors.searchInputBox)
            .type('{enter}');
        //cy.get(selectors.loadingSpinnerProcess).should("be.visible");
        cy.wait(5000);
        cy.get(selectors.loadingSpinnerProcess).should("not.be.visible");
        cy.get('#processIndex > div.container-fluid > div > div.jumbotron.jumbotron-fluid').should('not.be.visible');
        cy.xpath(selectors.processTableBody, { timeout: 10000 })
            .then($rowsTable => {
                if($rowsTable.find("tr").length <= 0){
                    this.importProcess(filePath, password);
                    //Exception in import with configurations already exists
                    let modalSelector = "[id='importProccess___BV_modal_header_']";
                    utility.waitUntilElementAppear(modalSelector, 1);
                    cy.get('body').then($body => {
                        if ($body.find(modalSelector).length > 0) {
                            cy.xpath('//button[contains(text(),"Import as New")]').click();
                            cy.xpath('//button[contains(text(),"Import as New")]').should('not.exist');
                        }
                    }).then(()=>{
                        cy.log('new section email');
                        let modalSelectorEmail = "footer[id*= modal_footer]>button";
                        utility.waitUntilElementAppear(modalSelectorEmail, 18);
                        cy.get('body').then($body => {
                            if ($body.find(modalSelectorEmail).length > 0) {
                                cy.get(modalSelectorEmail).click();
                                cy.get(modalSelectorEmail).should('not.exist');
                            }
                        });
                    });
                    if (parametersMapList.length > 0)
                        this.configProcessImported(parametersMapList);
                    cy.xpath(selectors.importingBtn).should('not.exist');
                }
                if($rowsTable.find("tr").length===1){
                    cy.xpath(selectors.processTable, { timeout: 10000 })
                            .find("td")
                            .then(($loadedTable) => {
                                if ($loadedTable.length === 1) {
                                    this.importProcess(filePath, password);
                                    //Exception in import with configurations already exists
                                    let modalSelector = "[id='importProccess___BV_modal_header_']";
                                    utility.waitUntilElementAppear(modalSelector, 1);
                                    cy.get('body').then($body => {
                                        if ($body.find(modalSelector).length > 0) {
                                            cy.xpath('//button[contains(text(),"Import as New")]').click();
                                            cy.xpath('//button[contains(text(),"Import as New")]').should('not.exist');
                                        }
                                    }).then(()=>{
                                        cy.log('new section email');
                                        let modalSelectorEmail = "footer[id*= modal_footer]>button";
                                        utility.waitUntilElementAppear(modalSelectorEmail, 18);
                                        cy.get('body').then($body => {
                                            if ($body.find(modalSelectorEmail).length > 0) {
                                                cy.get(modalSelectorEmail).click();
                                                cy.get(modalSelectorEmail).should('not.exist');
                                            }
                                        });
                                    });
                                    if (parametersMapList.length > 0)
                                        this.configProcessImported(parametersMapList);
                                    cy.xpath(selectors.importingBtn).should('not.exist');
                                }
                            });
                    }
        });
    }

    importProcess(filePath, password = "0") {
        cy.get(selectors.importProcessBtn).click();
        cy.xpath(selectors.titleImportProcess)
            .first()
            .should("have.text", "Import Process")
            .should("be.visible");
        cy.xpath(selectors.inputToFileUpload).attachFile(filePath);
        cy.xpath(selectors.importBtn)
            .parent()
            .should("have.attr", "disabled", "disabled");
        if (password != "0") {
            cy.xpath("//div[@id='enterPassword___BV_modal_content_']").should(
                "be.visible"
            );
            cy.xpath(
                "//div[@id='enterPassword___BV_modal_content_']//input[@id='password']"
            ).type(password, { delay: 200 });
            cy.xpath(
                "//div[@id='enterPassword___BV_modal_content_']/footer/button[text()='Import']"
            ).click();
        }
        cy.xpath(selectors.importBtn)
            .parent()
            .should("not.have.attr", "disabled", "disabled");
        cy.xpath(selectors.importBtn).click();
        cy.get(selectors.loadingProcessSpinner).should("not.exist");
    }

    clickOnImportButton() {
        cy.get(selectors.importProcessBtn).click();
        cy.get(selectors.browseBtn).should('be.visible');
    }

    goToWebEntry(numWE=0) {
        cy.get('[data-type="processmaker.components.nodes.startEvent.Shape"]').eq(numWE).should('be.visible');
        cy.get('[data-type="processmaker.components.nodes.startEvent.Shape"]').eq(numWE).click({ force: true });
        this.clickOnWeTabSettign();
        this.openWe();
    }

    clickOnWeTabSettign() {
        cy.xpath('//button[@data-cy="inspector-button"]')
            .should("be.visible")
            .click();
        cy.get(selectors.webEntryTab).click();
    }

    openWe() {
        cy.get(selectors.webEntryUrl).invoke('val')
            .then(val => {
                const url = val;
                cy.visit('/logout');
                cy.title().should('eq', 'Login - ProcessMaker');
                cy.visit(url);
            });
    }


    addassignmentRulesAsSelfService(eventLocator) {
        cy.get('#' + eventLocator).click();
        cy.wait(2000);
        cy.xpath(selectors.configDropDown).click();
        cy.xpath(selectors.assignRules).click();
        cy.get(selectors.userDropDown).select("self_service");
    }

    changeTosignalStartEvent() {
        cy.get(selectors.signalStartEventBtn).click();
    }

    addassignmentRulesAsByUserID(eventLocator, variableName) {
        cy.get('#' + eventLocator).click();
        cy.wait(2000);
        cy.xpath(selectors.configDropDown).click();
        cy.xpath(selectors.assignRules).click();
        cy.get(selectors.userDropDown).select("user_by_id");
        cy.xpath(selectors.variableNameTxtBx).type(variableName).should('have.value', variableName);
    }


    async getRecentIdOfLink() {
        cy.wait(2000);
        var locator = '//*[@data-type="standard.Link"]';
        const id = await promisify(cy.xpath(locator).then($elems => {
            var index = 0;
            var max_id = 0;
            for (let i = 0; i < $elems.length; i++) {
                let id = $elems[i].id;
                let ids = id.split('_');
                if ((parseInt(ids[1]) % 2) == 1) {
                    if (max_id < parseInt(ids[1])) {
                        max_id = parseInt(ids[1]);
                        index = i;
                    }
                }
            }
            return $elems[index].id;
        }));

        return id;
    }


    addlineExpression(name, expression) {
        const line_Id = this.getRecentIdOfLink();
        cy.get('#' + line_Id);
        cy.get('[name="name"]').type(name).should('have.value', name);
        cy.get('[name="conditionExpression"]').type(expression).should('have.value', expression);
    }

    changeToInclusiveGateway() {
        cy.get(selectors.inclusiveGatewayBtn).click();

    }

    changeToParallelGateway() {
        cy.get(selectors.parallelGatewayBtn).click();
    }

    configureTimingControlOption(type, timeinterval) {
        cy.get(selectors.configTimeBtn).click();
        cy.get(selectors.typeTimeControlDrpDwn).select(type);
        cy.get(selectors.timeIntervalBtn).clear();
        cy.get(selectors.timeIntervalBtn).type(timeinterval).should('have.value', timeinterval);
        cy.xpath(selectors.timeIntervalDrpDwn).select("minute");

    }

    clickOnWebEntry() {
        cy.get(selectors.webEntryDrpDwn).click();
    }

    SetWebEntryDetailsForAStartEventWithoutEnablePassword(formScreen, displayScreen) {
        this.clickOnWebEntry();
        cy.get(selectors.webEntrySelectListBtn).select("ANONYMOUS");
        this.addScreenToScreenAssociatedFieldInWebEntry(formScreen);
        cy.xpath(selectors.completeActionSelectList).select("SCREEN");
        this.addScreenToCompletedActionFieldInWebEntry(displayScreen);
    }

    addScreenToScreenAssociatedFieldInWebEntry(screenName) {
        cy.xpath(selectors.associatedScreenForInput).click();
        cy.xpath(selectors.associatedScreenInputTxtBx).type(screenName).should('have.value', screenName);
        cy.xpath(selectors.screenDropdownOption.replace('screenName', screenName)).click({ force: true });
    }

    addScreenToCompletedActionFieldInWebEntry(screenName) {
        cy.xpath(selectors.completedScreenForInput).click();
        cy.xpath(selectors.completedScreenInputTxtBx).type(screenName).should('have.value', screenName);
        cy.xpath(selectors.screenDropdownOption.replace('screenName', screenName)).click({ force: true });
    }
    async getURLOfWebEntry() {
        return (await promisify(cy.get('[id="webentry-entry-url"]')
            .invoke('val').then((val) => {
                const url = val;
                cy.log("URL WE", url).then(() => {
                    return url;
                });
            })));
    }

    async getProcessIDFromURL() {
        const processId = await promisify(cy.url().then(url => {
            return url.split('/')[4].trim();
        }))
        return processId;
    }

    AddABoundaryConditionalEventToTask() {
        cy.get(selectors.boundaryEventBtn).click();
        cy.get(selectors.boundaryCondOptn).click();
    }

    setConditionForBoundaryEvent(condition) {
        cy.get(selectors.conditionInputBx).clear();
        cy.get(selectors.conditionInputBx).type(condition).should('have.value', condition);
    }

    getBoundaryId() {
        //cy.wait(2000);
        var locator = '[data-type="processmaker.components.nodes.boundaryEvent.Shape"]';
        const id = cy.get(locator).then($elems => {
            var index = 0;
            var max_id = 0;
            for (let i = 0; i < $elems.length; i++) {
                let id = $elems[i].id;
                let ids = id.split('_');
                if ((parseInt(ids[1]) % 2) == 1) {
                    if (max_id < parseInt(ids[1])) {
                        max_id = parseInt(ids[1]);
                        index = i;
                    }
                }
            }
            return $elems[index].id;
        });
        return id;
    }

    addOutBoundConfig(type, property, varValue) {
        cy.xpath(selectors.outBoundplusBtn).click();
        cy.xpath(selectors.propertyTypeDrpDwn).click();
        cy.xpath(selectors.propertTypeValueInput.replace('type', type)).click();
        cy.xpath(selectors.propertyDrpDwn).click();
        cy.xpath(selectors.propertValueInput.replace('property', property)).click();
        cy.wait(2000);
        cy.get(selectors.requestVarInputBx).type(varValue);
        cy.get(selectors.outBoundSaveBtn).click();
    }

    verifyTitlePage(title) {
        cy.visit('/processes');
        cy.title().should('eq', title);
    }
    verifySidebarMenuOption(num, option) {
        cy.get('.nav-item.filter-bar.justify-content-between.py-2.sidebar-expansion').click();
        cy.get('.nav-item.filter-bar.justify-content-between').should('contain', option);
    }

    saveVersionProcess(version, description) {
        this.clickOnSave();
        cy.xpath("//input[@id='name']").type(version).should('have.value', version);
        cy.xpath("//textarea[@id='additional-details']").type(description).should('have.value', description);
        cy.xpath('//button[text()="Save"]').click();
        cy.xpath('//h5[text()="Commit Changes"]').should('not.exist');
    }
    saveProcessWithoutVersion() {
        this.clickOnSave();
        //cy.xpath(selectors.saveBtnInPopUp).should('be.visible').click();
        //cy.get(selectors.alertSaveProcess).should('be.visible');
        cy.xpath('//button[@data-test="btn-save-publish"]').click();
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should('be.visible');
    }
    discardDraft() {
        cy.xpath(selectors.optionsMenu).click({force:true});
        cy.xpath(selectors.options_discardDraft).click({force:true});
        cy.xpath('//button[contains(text(),"Discard")]').click();
    }

    searchProcessAndSelectOptions(
        processName,
        option = "config",
        exportType = "basic",
        passwordOption = "no",
        password
    ) {
        cy.xpath(selectors.threePointsBtnXpath).should("be.visible");
        cy.xpath(selectors.searchInputBox)
            .type(`${processName}{enter}`)
            .should("have.value", processName);
        cy.get(selectors.loadingSpinnerProcess).should("be.visible");
        cy.xpath(selectors.threePointsBtnXpath).should("be.visible");
        cy.xpath(selectors.threePointsBtnXpath).first().should("be.visible");
        cy.xpath(selectors.threePointsBtnXpath).first().click({force:true});

        switch (option) {
            case "edit":
                this.editProcess();
                break;
            case "config":
                this.goToConfigProcess();
                break;
            case "view":
                this.viewProcess();
                break;
            case "documentation":
                this.viewProcessDocumentation();
                break;
            case "export":
                this.downloadProcess(
                    processName,
                    exportType,
                    passwordOption,
                    password
                );
                break;
            case "delete":
                break;
            case "pmBlock":
                this.selectMenuOptionRow("Save as PM Block");
                break;
            case "Template":
                this.selectMenuOptionRow("Save as Template");
                break;
            case "addToProject":
                this.addProject();
                break;
            case "archive":
                this.archiveProcess();
                break;
            case "editAlternative":
                this.editAlternativeProcess();
                break;
        }
    }
    viewProcess(){
        this.selectMenuOptionRow("Edit Process");
    }
    viewProcessDocumentation(){
        this.selectMenuOptionRow("View Documentation");
    }
    editProcess() {
        cy.xpath("(//a[contains(@href,'/modeler')])[1]").should('be.visible');
        cy.xpath("(//a[contains(@href,'/modeler')])[1]").click({force:true});
    }
    editAlternativeProcess() {
        cy.xpath("(//a[contains(@href,'/modeler')])[1]").should('be.visible');
        cy.xpath("(//a[contains(@href,'/modeler')])[1]").should('have.attr', 'href')
            .then((href) => {
                cy.visit(href+'/alternative/A')
            });
    }
    addProject() {
        this.selectMenuOptionRow("Add to Project");
        cy.xpath(selectorProject.addProjectModel).should("be.visible");
	}
    archiveProcess() {
        this.selectMenuOptionRow("Archive");
        cy.xpath("//*[contains(text(),'Confirm')]").should("be.visible");
        cy.xpath("//*[contains(text(),'Confirm')]").click();
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should("be.visible");
    }

    saveProcessWithoutName() {
        cy.get(selectors.saveButton1).should("be.visible").click();
        cy.xpath(selectors.saveBtnToAddProcess).should("be.visible").click();
    }
    saveProcessWithNameAndDescription(version, description) {
        this.clickOnSave();
        cy.get(selectors.nameVersionInput).type(version);
        cy.get(selectors.descriptionVersionInput).type(description);
        cy.xpath('//button[@data-test="btn-save-publish"]').click();
        cy.wait(4000);
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should('not.exist');
    }
    goToConfigProcess() {
        //cy.xpath(selectors.configctrlBtn).click();
        this.selectMenuOptionRow("Configure");
    }
    addProcess(){
        this.selectMenuOptionRow("Add To Project");
    }
    versionHistory() {
        cy.get(selectors.versionHistoryTab).should("be.visible").click();
        cy.get('[name="name"]').should('be.visible');
    }
    showVersioningOnly() {
        cy.get(selectors.onlyShowNamedVersion).eq(0).check({ force: true });
        cy.get(selectors.onlyShowVersionLabel).click();
    }

    verifyVersioningWithoutNameNotAppear() {
        cy.get(selectors.container)
            .find(selectors.rowsVersion)
            .its("length")
            .should("be.gte", 2);
    }

    checkSavedAllVersions() {
        cy.get(selectors.container)
            .find(selectors.rowsVersion)
            .its("length")
            .should("be.gte", 3);
    }

    checkCopyToLatest() {
        cy.get(selectors.rowsVersion).last().should("contain", "version1");
        cy.get(selectors.copyToLatests).last().click();
        cy.get(selectors.confirmAndSave).click();
        cy.get(selectors.rowsVersion).first().should("contain", "version1");
    }

    /*
    params
    connector = name of the data connector (unique)
    methodName = name of the data connector's method (unique)
    myTimeW = Time to wait for .type() to resolve before timing out, by default is 10000
    */
    configDataConnector(connectorName, methodName, myTimeW = 10000) {
        //config Data Connector field
        cy.get('div[name="basic_config"] > div > div').eq(0).click();
        cy.get('div[name="basic_config"]').eq(0).find('div[role="combobox"]').should('have.attr', 'aria-expanded', 'true')
        cy.get('div[name="basic_config"] > div > div > div > input').eq(0).type(connectorName, { timeout: myTimeW })
        cy.get('div[name="basic_config"] > div > div > div > input').eq(0).type('{enter}');
        cy.get('div[name="basic_config"]').eq(0).find('div[role="combobox"]').should('have.attr', 'aria-expanded', 'false')
        cy.get('div[name="basic_config"] > div > div > div > span').eq(0).should('contain.text', connectorName)

        //Config a resource
        cy.get('div[name="basic_config"] > div > div').eq(1).click();
        cy.get('div[role="combobox"]').eq(1).should('have.attr', 'aria-expanded', 'true')
        cy.get('div[name="basic_config"] > div > div > div > input').eq(1).type(methodName, { timeout: myTimeW })
        cy.get('div[name="basic_config"] > div > div > div > input').eq(1).type('{enter}');
        cy.get('div[role="combobox"]').eq(1).should('have.attr', 'aria-expanded', 'false')
        cy.get('div[name="basic_config"] > div > div > div > span').eq(1).should('contain.text', methodName);
    }

    /**
     * This method is responsible configuration of the process imported
     * @param parametersMapList: object list of option + users
     * Ej. var parameterList = [ {elemName: "Start Event", label:"startEvent1",user:"admin",firstName:"Admin", lastName:"User"},
     *                           {elemName: "Status", label:"Status",state:"INACTIVE"}
     *                         ];
     * @return nothing returns
     */
    configProcessImported(parametersMapList) {
        let len = parametersMapList.length;
        for (var i = 0; i < len; i++) {
            let key = parametersMapList[i].label;
            if (key !== "Status") {
                let value = parametersMapList[i].user;
                let firstName = parametersMapList[i].firstName;
                let lastName = parametersMapList[i].lastName;
                let elemName = parametersMapList[i].elemName;
                this.configRowProcess(key, value, firstName, lastName, elemName);
            } else {
                let state = parametersMapList[i].state;
                this.configRowSatusProcess(key, state);
            }
        }
        this.saveChangesConfigProcess();
        var editBtn = "[title='Edit'] > .fas";
        //cy.get(editBtn).should('be.visible');
    }

    /**
     * This method is responsible for set values in a row of process imported config
     * @param key: label of the option
     * @param value: user of user
     * @param firstName: firstName of the user
     * @param lastName: lastName of the user
     * @param elemName: name of the element to assignation like: "Start Event, Script"
     * @return nothing returns
     */
    configRowProcess(key, value, firstName, lastName, elemName) {
        let selectListScriptXpath;
        let inputScriptXpath;
        let fullName;
        switch (elemName) {
            case 'Script':
            case 'Process Manager':
                fullName = firstName + ' ' + lastName + '. ';
                selectListScriptXpath = "//strong[contains(text(),'labelName')]/ancestor::tr/td[2]//div[@class='multiselect__tags']";
                inputScriptXpath = "//strong[contains(text(),'labelName')]/ancestor::tr/td[2]//input";
                cy.xpath(selectListScriptXpath.replace('labelName', key)).should('be.visible').click();
                cy.xpath(inputScriptXpath.replace('labelName', key)).type(value).should('have.value', value);
                cy.xpath("//ancestor::strong[contains(text(),'scriptName')]/ancestor::tr/td[2]//div[@class='multiselect__content-wrapper']//li[1]"
                    .replace('scriptName', key))
                    .should('have.attr', 'aria-label')
                    .and('equal', fullName);
                cy.xpath(inputScriptXpath.replace('labelName', key)).type('{enter}');
                break;
            case 'SubProcess':
                fullName = firstName;
                selectListScriptXpath = "//strong[contains(text(),'labelName')]/ancestor::tr/td[2]//div[@class='multiselect__tags']";
                inputScriptXpath = "//strong[contains(text(),'labelName')]/ancestor::tr/td[2]//input";
                cy.xpath(selectListScriptXpath.replace('labelName', key)).should('be.visible').click();
                cy.xpath(inputScriptXpath.replace('labelName', key)).type(value).should('have.value', value);
                cy.xpath("//ancestor::strong[contains(text(),'scriptName')]/ancestor::tr/td[2]//div[@class='multiselect__content-wrapper']//li[1]"
                    .replace('scriptName', key))
                    .should('have.attr', 'aria-label')
                    .and('contain', fullName);
                cy.xpath(inputScriptXpath.replace('labelName', key)).type('{enter}');
                break;
            default:
                fullName = firstName + ' ' + lastName + '. ';
                let selectListXpath = "//strong[text()='labelName']/ancestor::tr/td[2]//div[@class='multiselect__tags']";
                let inputXpath = "//strong[text()='labelName']/ancestor::tr/td[2]//input";
                let liXpath = "//strong[text()='labelName']/ancestor::tr//div[@class='multiselect__content-wrapper']//li[@aria-label='fullName']";

                cy.xpath(selectListXpath.replace('labelName', key)).should('be.visible').click();
                cy.xpath(inputXpath.replace('labelName', key)).type(value).should('have.value', value);
                var li;
                if (elemName === 'Cancel Request')
                    li = "//ancestor::strong[text()='labelName']/ancestor::tr/td[2]//div[@class='multiselect__content-wrapper']//li[3]";
                else
                    li = "//ancestor::strong[text()='labelName']/ancestor::tr/td[2]//div[@class='multiselect__content-wrapper']//li[2]";

                cy.xpath(li
                    .replace('labelName', key))
                    .should('have.attr', 'aria-label')
                    .and('equal', fullName);
                cy.xpath(inputXpath.replace('labelName', key)).type('{enter}');
        }
    }

    /**
     * This method is responsible for set values in a row of process imported config
     * @param key: label of the option
     * @param state: state of the status "ACTIVE/INACTIVE"
     * @return nothing returns
     */
    configRowSatusProcess(key, state) {
        const selectListXpath = "//strong[text()='labelName']/ancestor::tr/td[2]//div[@class='multiselect__tags']";
        const liXpath = "//strong[text()='Status']/ancestor::tr//div[@class='multiselect__content-wrapper']//li[@aria-label='state. ']"


        cy.xpath(selectListXpath.replace('labelName', key)).should('be.visible').click();
        cy.xpath(liXpath.replace('labelName', key).replace('state', state)).should('be.visible').click();

    }

    /**
     * This method is responsible to save process configruation of process imported
     * @return nothing returns
     */
    saveChangesConfigProcess() {
        const saveBtnConfig = "//button[contains(text(),'Save')]";
        cy.xpath(saveBtnConfig).click();

    }

    /**
     * This method is responsible configuration of the process in modeler with data connector
     * @param elementName: name of data connector in the modeler. Ej: connector1
     * @param dataConnectorName: name of data connector in Data Connectors. Ej: Doctor Collection
     * @param resource: method of data connector: Ej: GET: ListAll
     * @return nothing returns
     */
    verifyConfigOfDataConnectorAndConfig(elementName, dataConnectorName, resource) {
        const elementTaskXapth = "//*[text()='nameElem']/ancestor::*[@data-type='processmaker.components.nodes.task.Shape']";
        const dataConnectorSelected = "//label[text()='Select a Data Connector']/parent::div//div[@class='multiselect__tags']//span";
        const resourceSelected = "//label[text()='Select a Resource']/parent::div//div[@class='multiselect__tags']//span";

        cy.xpath(elementTaskXapth.replace('nameElem', elementName)).first().should('be.visible').click();
        cy.wait(2000);
        cy.xpath(dataConnectorSelected).invoke('text')
            .then(text => {
                if (text !== dataConnectorName) {
                    // Set data connector
                    cy.xpath('//label[text()="Select a Data Connector"]/parent::div//div[@class="multiselect__tags"]').click();
                    cy.xpath('//label[text()="Select a Data Connector"]/parent::div//input').type(dataConnectorName).should('have.value', dataConnectorName);
                    cy.xpath('//label[text()="Select a Data Connector"]/parent::div//div[@class="multiselect__content-wrapper"]//li[1]')
                        .should('have.attr', 'aria-label') // yields the "href" attribute
                        .and('equal', dataConnectorName + ". ");
                    cy.xpath('//label[text()="Select a Data Connector"]/parent::div//input').type('{enter}');
                }
            });
        cy.xpath(resourceSelected).invoke('text')
            .then(text => {
                if (text !== resource) {
                    // Set data connector
                    cy.xpath('//label[text()="Select a Resource"]/parent::div//div[@class="multiselect__tags"]').click();
                    cy.xpath('//label[text()="Select a Resource"]/parent::div//input').type(resource).should('have.value', resource);
                    cy.xpath('//label[text()="Select a Resource"]/parent::div//div[@class="multiselect__content-wrapper"]//li[1]')
                        .should('have.attr', 'aria-label') // yields the "href" attribute
                        .and('equal', resource + ". ");
                    cy.xpath('//label[text()="Select a Resource"]/parent::div//input').type('{enter}');
                }
            });

    }

    /**
     * This method is responsible configuration of the process in modeler with start event
     * @param elementName: name of sart event in the modeler. Ej: startEvent1
     * @param permissionObject: name of data connector in Data Connectors. Ej: Doctor Collection
     * @return nothing returns
     */
    // to users: permissionObject = {type="User", user="admin", firstName="Admin", lastName="User"}
    // to group: permissionObject = {type="Group", groupName="group 1"}
    // to process manager: permissionObject = {type="Process Manager"}
    verifyConfigOfStartEventAndConfig(elementName, permissionObject) {
        //const elementStartEventXpath = "//*[text()='nameElem']/ancestor::*[@data-type='processmaker.components.nodes.startEvent.Shape']";
        const elementStartEventXpath = "(//*[@data-type='processmaker.components.nodes.startEvent.Shape']//*[contains(text(),'nameElem')])[1]";
        const startPemrissionsBtnSelector = "[id='accordion-button-permissions-accordion']";
        const startPemrissions_typeSelector = "[id='select_type']";
        const startPemrissions_opSelectListSelector = "//label[text()='nameType']/parent::div//div[@class='multiselect__tags']";
        const startPemrissions_opInputSelector = "//label[text()='nameType']/parent::div//input";
        const OptionSelected = "//label[text()='nameType']/parent::div//div[@class='multiselect__tags']//span";


            cy.xpath(elementStartEventXpath.replace('nameElem', elementName)).first().should('be.visible').click({force:true});
            cy.wait(2000);
            cy.get("[data-cy='inspector-button']").should('be.visible').click();
            cy.get('#accordion-button-permissions-accordion').should('be.visible').click();
            //Open hamburger menu if not is open
            cy.xpath('//body')
                .then($body => {
                    if ($body.find('[data-cy=inspector-button]').length > 0) {
                        cy.get('#accordion-button-permissions-accordion').should('be.visible').click();
                        //cy.xpath(selectors.inspectorBtnXpath).click();
                    }
                });
            cy.get(startPemrissionsBtnSelector).should('be.visible').click();
            cy.get(startPemrissions_typeSelector).should('be.visible');

            let type = permissionObject.type;
            switch (type) {
                case 'User':
                    let userName = permissionObject.user;
                    let firstName = permissionObject.firstName;
                    let lastName = permissionObject.lastName;
                    let fullName = firstName + ' ' + lastName;
                    let liuser = "//li[@aria-label='" + fullName + ". ']";

                    cy.get(startPemrissions_typeSelector).select('User').should('have.value', 'user');
                    // Verify if the start event was configured with the correct user
                    cy.xpath(OptionSelected.replace('nameType', 'user')).should('be.visible');
                    cy.xpath(OptionSelected.replace('nameType', 'user')).invoke('text')
                        .then(text => {
                            if (text !== fullName) {
                                cy.xpath(startPemrissions_opSelectListSelector.replace('nameType', 'user')).click();
                                cy.xpath(startPemrissions_opInputSelector.replace('nameType', 'user')).type(userName).should('have.value', userName);
                                cy.wait(2000);
                                cy.xpath('//div[@class="multiselect__content-wrapper"]//ul[contains(@style," inline")]/li[1]')
                                    .should('have.attr', 'aria-label') // yields the "href" attribute
                                    .and('equal', fullName + ". ");
                                cy.xpath(startPemrissions_opInputSelector.replace('nameType', 'user')).type('{enter}');

                            }
                        });
                    break;
                case 'Group':
                    let groupName = permissionObject.groupName;
                    //let ligroup = "//li[@aria-label='" + groupName + ". ']";
                    cy.get(startPemrissions_typeSelector).select('Group').should('have.value', 'group');
                    // Verify if the start event was configured with the correct group
                    cy.xpath(OptionSelected.replace('nameType', 'group')).should('be.visible');
                    cy.xpath(OptionSelected.replace('nameType', 'group')).invoke('text')
                        .then(text => {
                            if (text !== groupName) {
                                cy.xpath(startPemrissions_opSelectListSelector.replace('nameType', 'group')).click();
                                cy.xpath(startPemrissions_opInputSelector.replace('nameType', 'group')).type(groupName);
                                cy.xpath(startPemrissions_opInputSelector.replace('nameType', 'group')).type('{enter}');
                            }
                        });
                    break;
                case 'Process Manager':
                    cy.get(startPemrissions_typeSelector).select('Process Manager').should('have.value', 'process_manager');
                    break;
            }
            cy.get('[data-cy="inspector-close-button"]').click();

    }

    changepdfFileNameToDynamicVariable(input) {
        cy.get(selectors.pdfFileNameInput).clear();
        cy.get(selectors.pdfFileNameInput).type("{{}{{}" + input + "}}").should('have.value', "{{" + input + "}}");
    }

    changeToSignalEndEvent() {
        cy.xpath(selectors.signalEndevent).click();
        cy.xpath(selectors.signalpayloadBtn).click();
        cy.xpath(selectors.clickOnAllRequestBtn).click();
    }

    addSignalToStartEventOrEndEvent(name) {
        cy.xpath(selectors.clickonSignalOption).click();
        cy.wait(3000);
        cy.xpath(selectors.signalInputTxtBtn).type(name);
        cy.wait(7000);
        cy.xpath(selectors.signalDrpDownOption.replace('signalName', name)).should('be.visible').click();
        cy.wait(2000);
        cy.xpath(selectors.verifySignalIsSelected).should('contain', name);
    }

    changeToSignalStartEvent() {
        cy.xpath(selectors.signalStartevent).click();
    }

    clickOnFormTaskComments() {
        cy.get(selectors.clickOnCommentsBtn).click();
    }

    enableTheComments() {
        cy.xpath(selectors.enableTheComments).click();
    }

    enableTheReactions() {
        cy.xpath(selectors.enableTheReaction).click();
    }

    enableTheVoting() {
        cy.xpath(selectors.enableTheVoting).click();
    }

    enableTheEdit() {
        cy.xpath(selectors.enableTheEdit).click();
    }

    enableTheDelete() {
        cy.xpath(selectors.enableTheDelete).click();
    }

    createProcessWithBPMNFile(nameProcess, descriptionProcess, category, path) {
        cy.get(selectors.addProcessBtn).click();
        cy.xpath(selectors.blankProcessBtbXpath).should("be.visible").click();
        cy.xpath('//*[@class="modal-body"]//*[contains(text(),"Uncategorized")]').should('be.visible');
        cy.get(selectors.nameTxtBx).click().type(nameProcess, {delay:200}).should("have.value", nameProcess);
        cy.get(selectors.descriptionTxtBx).click().type(descriptionProcess).should("have.value", descriptionProcess);
        cy.xpath(selectors.labelCategory).should("be.visible");
        cy.get(selectors.categoryInput).first().click();
        cy.get(selectors.categoryInput).first()
            .type(category)
            .should("contain", category);
        cy.xpath(selectors.optionCategory)
            .should("have.attr", "aria-label")
            .and("equal", category + ". ");
        cy.get(selectors.categoryInput).first().type("{enter}");
        cy.get(selectors.uploadBPMNBrowseButton).attachFile(path);
        cy.wait(3000);
        cy.get(selectors.saveBtnBPMN).should('be.enabled');
        cy.get(selectors.saveBtnBPMN).click();
    }
    verifyNameProcess(nameProcess) {
        cy.xpath(selectors.nameProcessInModeler).should("be.visible");
        cy.xpath(selectors.nameProcessInModeler).should("contain", nameProcess);
    }

    downloadProcess(
        processName,
        exportType = "basic",
        passwordOption = "no",
        password
    ) {
        this.selectMenuOptionRow("Export");
        cy.xpath(selectors.menuSidebarXpath).should("be.visible");
        var process = processName + ".";
        cy.xpath(selectors.exportTitleProcessXpath).should(
            "have.text",
            process
        );
        if (exportType === "basic") {
            //basic export
            cy.xpath(selectors.downloadBtn).click();
            cy.xpath(selectors.exportTitleSetPasswordXpath).should(
                "be.visible"
            );
            if (passwordOption === "no") {
                cy.xpath(selectors.passwordProtectFieldXpath).uncheck({
                    force: true,
                });
            } else {
                cy.xpath(selectors.setPasswordFieldXpath).type(password, {
                    delay: 50,
                });
                cy.xpath(selectors.confirmPasswordFieldXpath).type(password, {
                    delay: 50,
                });
            }
            cy.xpath(selectors.exportBtnXpath).click();
            cy.xpath(selectors.messageExportSuccessfulXpath).should(
                "be.visible"
            );
            cy.xpath(selectors.exportCloseBtnXpath).click();
        } else {
            //custom export
        }
    }
    verifyProcessInDownloadsFolder(path, nameProcess) {
        cy.readFile(path).should("exist");
        cy.readFile(path).its("process").its("name").should("eq", nameProcess);
    }
    verifyProcessInDownloadsFolderJSON(path, nameProcess) {
        cy.readFile(path).should("exist");
        cy.readFile(path).its("name").should("eq", nameProcess);
        cy.readFile(path).its("type").should("eq", "process_package");
        cy.readFile(path).its("version").should("eq", "2");
    }
    openScreenofElementFromModeler(typeName, elementName, defaultAlternative="A") {
        const elementStartEventXpath = "//*[contains(text(),'nameElem')]/ancestor::*[@data-type='processmaker.components.nodes.startEvent.Shape']";
        const elementTaskEventXpath = "//*[contains(text(),'nameElem')]/ancestor::*[@data-type='processmaker.components.nodes.task.Shape']";
        const weBtnSelector = "[id='accordion-button-webentry']";
        const linkScreenAssociatedXpath = "//label[text()='Screen For Completed']/parent::div//a";
        cy.get(selectors.alternativeA).should('exist');
        cy.url().then(url => {
            cy.visit(url + '/alternative/' + defaultAlternative);
            cy.get('[data-cy="inspector-button"]').click();
            switch (typeName) {
                case 'Start Event':
                    cy.xpath(elementStartEventXpath.replace('nameElem', elementName)).first().should('be.visible').click();
                    //click on WE
                    cy.get(weBtnSelector).click();
                    //Open screen Associate
                    cy.xpath(linkScreenAssociatedXpath)
                        .should('have.attr', 'href')
                        .then((href) => {
                            cy.visit(href)
                        });
                    break;
                case 'Form Task':
                    cy.xpath(elementTaskEventXpath.replace('nameElem', elementName)).first().should('be.visible').click();
                    //Open screen for Input
                    cy.xpath("//label[text()='Screen for Input']/parent::div//a[contains(text(),'Open Screen')]")
                        .should('have.attr', 'href')
                        .then((href) => {
                            cy.visit(href)
                        });
                    break;
            }
        });

    }

    /*This method is responsible to search for a data connector and create if there is no such data connector
     This is applied for Admin User only
    @param processName: name of the process name
    @param processManager: description of the process manager
    @return nothing returns*/
    verifyProcessManagerAndAddItifNecessary(processName, processManager = "admin", fullNameManager = "Admin User") {
        cy.xpath(selectors.threePointsBtnXpath).should("be.visible");
        cy.xpath(selectors.searchInputBox)
            .type(`${processName}{enter}`)
            .should("have.value", processName);
        cy.get(selectors.loadingSpinnerProcess).should("be.visible");
        cy.get(selectors.loadingSpinnerProcess).should("not.be.visible");
        cy.xpath(selectors.threePointsBtnXpath).first().should("be.visible").click();
        this.selectMenuOptionRow("Configure");
        this.assignUserToProcessManagerInput(processManager,fullNameManager);
    }
    assignUserToProcessManagerInput(processManager = "admin", fullNameManager = "Admin User"){
        cy.get('[class="multiselect__spinner"]').eq(0).should('not.be.visible');
        cy.xpath(selectors.processManagerSpanXpath).invoke('text').then(($manager)=>{
            cy.log("This is the Process manager user"+ $manager);
            if ($manager !== fullNameManager) {
                cy.xpath(selectors.processManagerFieldXpath).click();
                cy.xpath(selectors.processManagerFieldXpath).find("input").type(processManager, {delay: 300});
                cy.wait(2000);
                cy.xpath(selectors.processManagerFieldXpath).find("input").type("{enter}");
                cy.xpath(selectors.processManagerSpanXpath).should("have.text", fullNameManager);
                cy.xpath(selectors.processManagerEditSaveBtn).click();
            }else return;
        });
    }

    /**
     * This method is responsible to configure a sub-process in the sub-process elenebt in modeler
     * @param elementName: name of sub-process in the modeler.
     * @param subProcessName: name of Sub-process to configure.
     * @param startEventName: name for the start event related to sub-process selected
     * @return nothing returns
     */
    verifyConfigOfSubProcessAndConfig(elementName, subProcessName, startEventName) {
        const elementTaskXapth = "//*[text()='nameElem']/ancestor::*[@data-type='processmaker.components.nodes.task.Shape']";
        const subProcessSelected = "//label[text()='Process']/following-sibling::div/div[@class='multiselect__tags']//span";
        const resourceSelected = "//label[text()='Start Event']/parent::div//div[@class='multiselect__tags']//span";

        cy.xpath(elementTaskXapth.replace('nameElem', elementName)).first().should('be.visible').click();
        cy.get('[class="multiselect__spinner"]').eq(0).should('not.be.visible');
        cy.xpath(subProcessSelected).invoke('text')
            .then(text => {
                if (text !== subProcessName) {
                    // Set sub-process
                    cy.xpath('//label[text()="Process"]/following-sibling::div/div[@class="multiselect__tags"]').click();
                    cy.xpath('//label[text()="Process"]/following-sibling::div/div[@class="multiselect__tags"]/input').type(subProcessName).should('have.value', subProcessName);
                    cy.xpath('//label[text()="Process"]/following-sibling::div/div[@class="multiselect__content-wrapper"]//li[1]')
                        .should('have.attr', 'aria-label') // yields the "href" attribute
                        .and('contain', subProcessName);
                    cy.xpath('//label[text()="Process"]/following-sibling::div/div[@class="multiselect__tags"]/input').type('{enter}');
                }
            });
        cy.xpath(resourceSelected).invoke('text')
            .then(text => {
                if (text !== startEventName) {
                    // Set data connector
                    cy.xpath('//label[text()="Select a Resource"]/parent::div//div[@class="multiselect__tags"]').click();
                    cy.xpath('//label[text()="Select a Resource"]/parent::div//input').type(startEventName).should('have.value', startEventName);
                    cy.xpath('//label[text()="Select a Resource"]/parent::div//div[@class="multiselect__content-wrapper"]//li[1]')
                        .should('have.attr', 'aria-label') // yields the "href" attribute
                        .and('equal', startEventName + ". ");
                    cy.xpath('//label[text()="Select a Resource"]/parent::div//input').type('{enter}');
                }
            });

    }
    /**
     * This method is responsible to configure a script in the script task element in modeler
     * @param elementName: name of sub-process in the modeler.
     * @param resource: name of resource for task forma, could be screen or script.
     * @return nothing returns
     */
    verifyConfigOfTaskResourceAndConfig(elementName, resource,type) {
        const elementTaskXapth = "//*[text()='nameElem']/ancestor::*[@data-type='processmaker.components.nodes.task.Shape']";
        const scriptSelected = "//label[text()='Script']/following-sibling::div/div[@class='multiselect__tags']//span";

        switch (type) {
            case "Form":break;
            case "Script":
                cy.xpath(elementTaskXapth.replace('nameElem', elementName)).first().should('be.visible').click();
                cy.wait(2000);
                //Open the hamburguer menu
                cy.get('[data-cy="inspector-button"]').click();
                cy.xpath(scriptSelected).invoke('text')
                    .then(text => {
                        if (text !== resource) {
                            //Set Script
                            cy.xpath('//label[text()="Script"]/following-sibling::div/div[@class="multiselect__tags"]').click();
                            cy.xpath('//label[text()="Script"]/following-sibling::div/div[@class="multiselect__tags"]/input').type(resource).should('have.value', resource);
                            cy.xpath('//label[text()="Script"]/following-sibling::div/div[@class="multiselect__content-wrapper"]//li[1]')
                                .should('have.attr', 'aria-label') // yields the "href" attribute
                                .and('contain', resource);
                            cy.xpath('//label[text()="Script"]/following-sibling::div/div[@class="multiselect__tags"]/input').type('{enter}');
                        }
                    });
                break;
        }
    }
    addScreenToEndEvent(name){
        //cy.get('#'+eventLocator).click();
        cy.wait(2000);
        cy.xpath(selectors.clickonscreenDrpDwn).click();
        cy.xpath(selectors.endScrnInptTxtBx).type(name);
        cy.xpath(selectors.selectEndScreen.replace('name',name)).should('be.visible').click();
    }
    clickOnMsgEndEvent(){
        cy.xpath(selectors.clickOnMsgEndEvent).click();
    }
    clickOnMsgStartEvent(){
        cy.xpath(selectors.clickOnMsgStartEvent).click();
    }
    setMsgReferenceToMsgStartEvent(){
        cy.get(selectors.clickMsgReferenceDrpDwn).click();
        cy.get(selectors.clickOnMsgReferenceInpt).type('{enter}');
    }
    saveTheProcessWithoutUser() {
        this.clickOnSave();
        cy.xpath(selectors.saveBtnInPopUp).click();
        cy.xpath(selectors.saveChangesModal).should('not.exist');
    }
    createVocabularies(name, description) {
        cy.xpath(selectors.createVocabBtn).click();
        cy.xpath(selectors.vacabNameInput).type(name);
        cy.xpath(selectors.vacabDescription).type(description);
        cy.xpath(selectors.vacabSaveBtn).click();
    }
    addvacabulary(name) {
        cy.xpath(selectors.clickOnvacabBtn).click();
        cy.xpath(selectors.clickOnplus).click();
        cy.xpath(selectors.clickOndropDown).click();
        cy.xpath(selectors.vocabInput).type(name);
        cy.xpath(selectors.vocabDropdownOption.replace('name', name)).click();
        cy.xpath(selectors.clickonSavevacab).click();
    }


    /**
     * Config a Send Email in the modeler
     * @param nameSendEmail, element name
     * @param setupSendEmail object with to fill the field in the Send Email
     * setupSendEmail = {emailServer:"Default Email Server",subject:"TCP4-XXXX - Send Email - {{}{{}_request.id{}}{}}", body:"Plain Text", text:Cypress.env('baseUrl')+"/webentry/request/{{}{{} _request.id {}}{}}/node_12"};
     */
     verifyConfigOfSendEmailAndConfig(nameSendEmail, setupSendEmail){
        const elementTaskXapth = "//*[text()='nameElem']/ancestor::*[@data-type='processmaker.components.nodes.task.Shape']";
        const emailServerField = "//label[text()='Email server:']/following-sibling::div/select";
        const subjectField = "//label[text()='Subject']/following-sibling::input";
        const bodyOptionField = "//label[text()='Body']/following-sibling::select";
        const bodyTxtField = "//label[text()='Body']/following-sibling::textarea"

        //variables
        const emailOption = setupSendEmail.emailServer;
        const subjectTxt = setupSendEmail.subject;
        const bodyOption = setupSendEmail.body; 
        const bodyTxt = setupSendEmail.text;

        cy.xpath(elementTaskXapth.replace('nameElem', nameSendEmail)).first().should('be.visible').click();
        cy.wait(2000);       
        //setup Email Server
        cy.xpath(emailServerField).invoke('text')
            .then(textEmailServer => {
                if(textEmailServer !== emailOption)
                    cy.xpath(emailServerField).select(emailOption);
            });
        //setup Subject
        cy.xpath(subjectField).invoke('text')
            .then(textSubject => {
                if(textSubject !== subjectTxt)
                    cy.xpath(subjectField).clear().type(subjectTxt);
            });
        //setup body option 
        cy.xpath(bodyOptionField).invoke('text')
            .then(textBodyOption => {
                if(textBodyOption !== bodyOption)
                    cy.xpath(bodyOptionField).select(bodyOption);
            });

        //setup body text
        cy.xpath(bodyTxtField).invoke('text')
            .then(textBodyTxt => {
                if(textBodyTxt !== bodyTxt)
                    cy.xpath(bodyTxtField).clear().type(bodyTxt);
            });
    }


    /**
     * This method is responsible to configure a Email in the sub-process elenebt in modeler
     * @param recipient: name of send email in the modeler.
     * @param value: object with values according to recipient 
     * @return nothing returns
     * 
     * this object is for Email Addrexss for a first email let value = {email:"test@test.es",nro:0, create=0};
     * this object is for Email Address for a second email let value = {email:"test1@test.es",nro:1, create=0};
     */
    configRecipientSendEmail(recipient, value){
        const xpathRecipient = "//legend[text()='Add A Recipient']/following-sibling::div/div/select";
        //this variable can be different according to Add Recipient option
        const xpathEmailUser = "//legend[contains(text(),'Send To Email Address')]/following-sibling::div/input";
        //setup add recipient
        cy.xpath(xpathRecipient).invoke('text')
        .then(text => {
            if (text !== recipient) {
                 //create new
                if(value.create == 1){
                    cy.xpath(xpathRecipient).select(recipient);
                }
                
                //setup add email
                switch(recipient){
                    case "Requester":
                        break;
                    case "Participant":
                        break;
                    case "User ID":
                        break;
                    case "Email Address":
                        const emailUser = value.email;
                        const nroVariable = value.nro;
                        cy.xpath(xpathEmailUser).should('be.visible');
                        cy.xpath(xpathEmailUser).eq(nroVariable).invoke('text')
                            .then(text => {
                                if (text !== emailUser) {
                                    cy.xpath(xpathEmailUser).eq(nroVariable).clear().type(emailUser);
                                }
                            });
                        break;
                    case "Process Manager":
                        break;
                }
            }
        });           
    }

    /**
     * Config a Send Email in the modeler
     * @param {*} nameSendEmail, default "", 1, 2
     * @param {*} setupSendEmail object with to fill the field in the Send Email
     * bodyOption = text|screen
     * setAt = task-start|task-end
     * setupSendEmail = {emailServer:"Default Email Server",subject:"TCP4-XXXX - Send Email - {{}{{}_request.id{}}{}}", body:"text", text:`${Cypress.config().baseUrl}/requests/webentry/request/{{}{{} _request.id {}}{}}/node_12`, nro:0, sentAt:'task-end'};
     */
    validateAndConfigEmailNotification(nameSendEmail=null, setupSendEmail){
        const elementTaskXapth = "//*[text()='nameElem']/ancestor::*[@data-type='processmaker.components.nodes.task.Shape']";
        const emailServerField = '//div[@label="Email Notifications"]//select[@id="email-server-select"]';
        //const subjectField = '//div[@label="Email Notifications"]//input[@id="connector-email-subject"]';
        const subjectField = '//div[@label="Email Notifications"]//label[text()="Subject"]//following-sibling::input';
        const bodyOptionField = '//div[@label="Email Notifications"]//select[@id="connector-email-body-type"]';
        const bodyTxtField = '//div[@label="Email Notifications"]//textarea[@aria-label="Body"]';
        const sentAtField = '//div[@label="Email Notifications"]//select[@id="notification-send-at"]';

        //variables
        const emailOption = setupSendEmail.emailServer;
        const subjectTxt = setupSendEmail.subject;
        const bodyOption = setupSendEmail.body; 
        const bodyTxt = setupSendEmail.text;
        const nroNotification = setupSendEmail.nro;
        const sentAtOption = setupSendEmail.sentAt;

        cy.xpath(elementTaskXapth.replace('nameElem', nameSendEmail)).first().should('be.visible').click();
        cy.xpath('//div[@label="Email Notifications"]').scrollIntoView().click();
        //edit Email notification
        this.actionEmailNotification(nroNotification,'edit');
        //setup Email Server
        cy.xpath(emailServerField).invoke('val')
            .then(textEmailServer => {
                if(textEmailServer !== emailOption){
                        cy.xpath(emailServerField).select(emailOption);
                    }
            });

        //setup subject
        cy.xpath(subjectField).invoke('val')
            .then(textSubject => {
                if(textSubject !== subjectTxt){
                    cy.xpath(subjectField).clear().type(subjectTxt);
                }
            });

        //setup body option 
        cy.xpath(bodyOptionField).invoke('val')
        .then(textBodyOption => {
            if(textBodyOption !== bodyOption){
                cy.xpath(bodyOptionField).select(bodyOption);
            }
        });

        //setup body text
        cy.xpath(bodyTxtField).invoke('val')
            .then(textBodyTxt => {
                if(textBodyTxt !== bodyTxt){
                    cy.xpath(bodyTxtField).clear().type(bodyTxt);
                }
            });

        //setup Sent at
        cy.xpath(sentAtField).invoke('val')
        .then(textSentAt => {
            if(textSentAt !== sentAtOption){
                cy.xpath(sentAtField).select(sentAtOption);
            }
        });
    }


    /**
     * @nroNotification value to select once a email notification
     * @action value to select the action as edit, duplicate, or delete
    */
    actionEmailNotification(nroNotification=0,action='edit'){
        cy.xpath('//div/h6[text()="Notifications"]/parent::div/following-sibling::table/tbody/tr').eq(nroNotification).find('td[class="text-right actions"]').find('button[aria-label="'+action+'"]').click();
    }

    /**
     * @option value to select the action as Close or Cancel
    */
    saveOrNotEmailNotification(option){
        cy.xpath('//div[@label="Email Notifications"]//button[text()="'+option+'"]').should('be.visible').click();
    }

    /**
     * This method is responsible to configure a Email in the sub-process elenebt in modeler
     * @param recipient: name of send email in the modeler.
     * @param value: object with values according to recipient 
     * @return nothing returns
     * this object is for Email Addrexss for a first email let value = {email:"test@test.es",nro:0, create=0};
     * this object is for Email Address for a second email let value = {email:"test1@test.es",nro:1, create=0};
     */
     configRecipientEmailNotification(recipient, value){
        const xpathRecipient = '//div[@label="Email Notifications"]//fieldset//select[@class="custom-select"]';
        const xpathEmailUser = '//div[@label="Email Notifications"]//fieldset//input';
        //setup add recipient
        cy.xpath(xpathRecipient).invoke('val')
        .then(text => {
            if (text !== recipient) {
                //create new
                if(value.create == 1){
                    cy.xpath(xpathRecipient).select(recipient);
                }
                //setup add email
                switch(recipient){
                    case "Requester":
                        break;
                    case "Participant":
                        break;
                    case "User ID":
                        break;
                    case "Email Address":
                        const emailUser = value.email;
                        const nroVariable = value.nro;
                        cy.xpath(xpathEmailUser).should('be.visible');
                        cy.xpath(xpathEmailUser).eq(nroVariable).invoke('val')
                            .then(text => {
                                cy.log('7. email'+text);
                                if (text !== emailUser) {
                                    cy.xpath(xpathEmailUser).eq(nroVariable).clear().type(emailUser);
                                }
                            });
                        break;
                    case "Process Manager":
                        break;
                }
            }
        });           
    }

    /**
     * This method is responsible to configure a signal in a signal event in the process modeler
     * @param signalEvent: name of the signal event
     * @param signal: signal we select
     * @return nothing returns
     */

    verifyConfigOfSignalEndEvent(signalEvent, signal) {
        const elementTaskXapth = "//*[text()='nameElem']/ancestor::*[@data-type='processmaker.components.nodes.endEvent.Shape']";
        const signalSelected = "//label[text()='Signal']/parent::div//div[@class='multiselect__tags']//span";

        cy.xpath(elementTaskXapth.replace('nameElem', signalEvent)).first().should('be.visible').click();
        cy.wait(2000);
        cy.xpath(signalSelected).invoke('text')
            .then(text => {
                if (text !== signal) {
                    // Set signal
                    cy.xpath('//label[text()="Signal"]/parent::div//div[@class="multiselect__tags"]').click();
                    cy.xpath('//label[text()="Signal"]/parent::div//input').type(signal).should('have.value', signal);
                    cy.xpath('//label[text()="Signal"]/parent::div//div[@class="multiselect__content-wrapper"]//li[1]')
                        .should('have.attr', 'aria-label') // yields the "href" attribute
                        .and('equal', signal + ". ");
                    cy.xpath('//label[text()="Signal"]/parent::div//input').type('{enter}');
                }
            });
    }

    verifyConfigOfSignalStartEvent(signalEvent, signal) {
        const elementTaskXapth = "//*[text()='nameElem']/ancestor::*[@data-type='processmaker.components.nodes.startEvent.Shape']";
        const signalSelected = "//label[text()='Signal']/parent::div//div[@class='multiselect__tags']//span";

        cy.xpath(elementTaskXapth.replace('nameElem', signalEvent)).first().should('be.visible').click();
        cy.wait(2000);
        cy.xpath(signalSelected).invoke('text')
            .then(text => {
                if (text !== signal) {
                    // Set data connector
                    cy.xpath('//label[text()="Signal"]/parent::div//div[@class="multiselect__tags"]').click();
                    cy.xpath('//label[text()="Signal"]/parent::div//input').type(signal).should('have.value', signal);
                    cy.xpath('//label[text()="Signal"]/parent::div//div[@class="multiselect__content-wrapper"]//li[1]')
                        .should('have.attr', 'aria-label') // yields the "href" attribute
                        .and('equal', signal + ". ");
                    cy.xpath('//label[text()="Signal"]/parent::div//input').type('{enter}');
                }
            });
    }
    /**
     * This method is responsible to configure task event in the process modeler
     * @param elementName: name of task in the modeler. Ej: task1
     * @param assignmentType: type to assign rules like: User/Group, Self Service, Process Manger
     * @param userGroup: fullName| nameGroup
     * @param nameFullUser: In case that will be an user assigned to task form Ej: (Admin User (admin))
     * @return nothing returns
     * process.verifyConfigOfTaskAndConfig("Form1",'User/Group','name_group' );
     */

    verifyConfigOfTaskAndConfig(elementName, assignmentType, userGroup, nameFullUser="") {
        const elementTaskXapth = "//*[text()='nameElem']/ancestor::*[@data-type='processmaker.components.nodes.task.Shape']";
        const userGroupSelected = "//label[text()='Assigned Users/Groups']/parent::div//div[@class='multiselect__tags']//span";
        const resourceSelected = "//label[text()='Select a Resource']/parent::div//div[@class='multiselect__tags']//span";
        const spninnerUserGroup = "//label[text()='Assigned Users/Groups']/parent::div//div[@class='multiselect__spinner']";
        const inputUserGroup = "//label[text()='Assigned Users/Groups']/parent::div//input";
        let compareUserGroup = "";

        cy.xpath(elementTaskXapth.replace('nameElem', elementName)).first().should('be.visible');
        cy.xpath(elementTaskXapth.replace('nameElem', elementName)).first().click();
        cy.get('[id="accordion-button-assignments-accordion"]').click();
        cy.get('[id="assignmentsDropDownList"]').select('user_group');

        if(nameFullUser !== ""){
            compareUserGroup=nameFullUser
        }else {
            compareUserGroup=userGroup;
        }
        let flag=false;
        cy.xpath(spninnerUserGroup).should('not.be.visible');
        cy.xpath(userGroupSelected).its('length')
            .then(length => {
                cy.log('this is the ANANA LENGTH',length);
                if (length>0){
                    if(length===1){
                        cy.xpath('//label[text()="Assigned Users/Groups"]/parent::div//div[@class="multiselect__tags"]').click();
                        cy.xpath('//label[text()="Assigned Users/Groups"]/parent::div//li/span[contains(text(),"No Data Available")]')
                            .should('not.be.visible');
                        cy.wait(5000);
                        cy.xpath(inputUserGroup).type(userGroup,{delay:700});
                        cy.wait(8000);
                        cy.xpath('//li[@aria-label="userGroup. "]'.replace("userGroup",compareUserGroup)).first().should('be.visible')
                            .click();
                        cy.wait(5000);
                    }
                    else{
                        for (let i = 0; i <(length/2) ; i++) {
                            cy.xpath(userGroupSelected+'/span').eq(i).invoke('text')
                                .then(text => {
                                    if (text === compareUserGroup){
                                        cy.log('this is the ANANA TEXT',text);
                                        flag = true;
                                        i=(length/2);
                                    }
                                    if(!flag && i === (length/2)){
                                        cy.xpath('//label[text()="Assigned Users/Groups"]/parent::div//div[@class="multiselect__tags"]').click();
                                        cy.xpath('//label[text()="Assigned Users/Groups"]/parent::div//li/span[contains(text(),"No Data Available")]')
                                            .should('not.be.visible');
                                        cy.wait(5000);
                                        cy.xpath(inputUserGroup).type(userGroup,{delay:700});
                                        cy.wait(5000);
                                        cy.xpath('//li[@aria-label="userGroup. "]'.replace("userGroup",compareUserGroup)).first().should('be.visible')
                                            .click();
                                        cy.wait(5000);
                                    }
                                })
                        }
                    }
                }
            });
    }

    verifyConfigOfSignalIntermediateEvent(signalEvent, signal) {
        const elementTaskXapth = "//*[text()='nameElem']/ancestor::*[@data-type='processmaker.components.nodes.intermediateEvent.Shape']";
        const signalSelected = "//label[text()='Signal']/parent::div//div[@class='multiselect__tags']//span";
            
        cy.xpath(elementTaskXapth.replace('nameElem', signalEvent)).first().should('be.visible').click();
        cy.wait(2000);
        cy.xpath(signalSelected).invoke('text')
            .then(text => {
                if (text !== signal) {
                    // Set data connector
                    cy.xpath('//label[text()="Signal"]/parent::div//div[@class="multiselect__tags"]').click({force:true});
                    cy.xpath('//label[text()="Signal"]/parent::div//input').type(signal).should('have.value', signal);
                    cy.xpath('//label[text()="Signal"]/parent::div//div[@class="multiselect__content-wrapper"]//li[1]')
                        .should('have.attr', 'aria-label') // yields the "href" attribute
                        .and('equal', signal + ". ");
                    cy.xpath('//label[text()="Signal"]/parent::div//input').type('{enter}');
                }
            });
    }
    addPropertyInVocabulary(numRow,nameProperty,type,lengthOrInherit,required){
        cy.get('i[class="fas fa-plus ml-3"]').click();
        cy.wait(1000);
        cy.xpath('//div[@id="nav-detail"]//li[@class="item"]//ul//li['+numRow+']//input[@aria-label="Name"]')
        .clear().type(nameProperty).should('have.value',nameProperty);
        cy.xpath('//div[@id="nav-detail"]//li[@class="item"]//ul//li['+numRow+']//select[@aria-label="Type"]')
        .select(type);
        cy.xpath('//div[@id="nav-detail"]//li[@class="item"]//ul//li['+numRow+']//input[@aria-label="Property Length"]')
        .type(lengthOrInherit).should('have.value',lengthOrInherit);
        if(required == true){
            cy.xpath('//div[@id="nav-detail"]//li[@class="item"]//ul//li['+numRow+']//input[@aria-label="Required"]').click();   
        }
    }
    editOrDeleteVocabulary(vocabularyName, option = 'edit'){
            cy.get('[id="vocabularyIndex"] [title="Edit"]').should('be.visible');
            cy.get('[class="vuetable-empty-result"]').should('not.exist');
            cy.get('input[id="search-box"]').type(vocabularyName).should('have.value', vocabularyName);
            switch (option) {
                case 'edit':
                    this.editVocabulary();
                    break;
                case 'delete': break;
            }
        }
    searchVocabulary(vocabularyName){
        cy.get('[id="vocabularyIndex"] [title="Edit"]').should('be.visible');
        cy.get('[class="vuetable-empty-result"]').should('not.exist');
        cy.get('input[id="search-box"]').type(vocabularyName).should('have.value', vocabularyName);
        cy.wait(1500);
        }
    editVocabulary(){
            cy.get('[title="Edit"]').first().click();
        }
    createVocabulary(vocabularyName,description){
        cy.get('button[aria-label="Create Vocabulary"]').click();
        cy.xpath('//label[text()="Name"]//parent::div//input').type(vocabularyName).should('have.value',vocabularyName);
        cy.xpath('//label[text()="Description"]//parent::div//textarea').type(description).should('have.value',description);
        cy.contains('button[class="btn btn-secondary ml-2"]','Save').click();  
    }
    /**
    * This method is responsible to verify presence of vocabulary
    * @param vocabularyName: Name of vocabulary For example:'Vocabulary1'
    * @param description: Description of vocabulary
    * @param data: object array for example:
    *  let data1 = [
       {
           index:1,nameProperty:'fullname',type:'Text',lenght:'50',required:false
       },
       {
           index:2,nameProperty:'email',type:'Text',lenght:'50',required:true
       },
    * @return nothing returns
    * process.verifyPresenceOfVocabulary(Vocabulary1,description,data1);
    */
    verifyPresenceOfVocabulary(vocabularyName,description,data){
        var editBtn = '[title="Edit"]';
        cy.get(editBtn).should('be.visible');
		this.searchVocabulary(vocabularyName);
		cy.get('[class="card card-body table-card"').then((table) => {
			if (table.find('td').length === 1) {
				this.createVocabulary(vocabularyName,description);
                //Create rows for each atrribute
                for (let index = 0; index < data.length; index++) {
                    this.addPropertyInVocabulary(
                        data[index].index,
                        data[index].nameProperty,
                        data[index].type,
                        data[index].lenght,
                        data[index].required
                        );
                }
                cy.contains('button[class="btn btn-secondary ml-2"]','Save').click(); 
			}
			else return;
		})
	}
    /**
    * This method is responsible to verify if a vocabulary is assigned to a task in Modeler
    * @param elementName: Name of task For example:'FormTask1'
    * @param elementXpath: xpath of task
    * @param vocabularyName: name of the vocabulary to be assigned to the task
    * @return nothing returns
    * process.verifyPresenceOfVocabularyAssignedInModeler("FormTask1",taskXpath,Vocabulary1);
    */
    verifyPresenceOfVocabularyAssignedInModeler(elementName,elementXpath,vocabularyName){
        cy.xpath(elementXpath.replace('nameElem',elementName)).first().should('be.visible').click();
        cy.get('button[id="accordion-button-vocabularies"]').click();
        cy.xpath('//div[@id="collapse-vocabularies"]//div[@name="vocabularies"]/div/div[2]').then(($element) => {    
            let vocabulary =$element.text(); 
            if(vocabulary.includes('No Vocabularies Assigned')){
                this.assignedVocabulary(vocabularyName);
            }else{
                if(vocabulary.includes(vocabularyName)){
                   return;
                }
                else{
                    cy.xpath('//div[@id="collapse-vocabularies"]//table//tr//td//button').click();
                    cy.xpath('//div[@class="card-footer p-1"]//button[@class="d-block float-right ml-2 btn btn-outline-light btn-vocabulary-action btn-sm"]').click();
                    this.assignedVocabulary(vocabularyName);
                }
            }
        })
    } 
    assignedVocabulary(vocabularyName){
        cy.get('button[aria-label="Add"]').click();
        var baseUrl = `${Cypress.config().baseUrl}`
        cy.xpath('//label[text()="Assigned"]/parent::div//input').first().click({force:true});
        cy.xpath('//div[@aria-label="Select Vocabulary"]//input').click({force:true}).type(vocabularyName).should('have.value',vocabularyName);
        cy.xpath('//div[@class="card"]//div[@class="multiselect__content-wrapper"]//li[1]')
            .should('have.attr', 'aria-label')
            .and('equal', vocabularyName+". ");
        cy.xpath('//div[@aria-label="Select Vocabulary"]//input').type('{enter}');
        cy.xpath('//div[@class="card"]//button[@class="d-block float-right ml-2 btn btn-secondary btn-vocabulary-action btn-sm"]').click();
        this.saveProcessWithoutVersion();
    }

    /**
    * This method is responsible to do click in one option for a row
    * @param nameOption: Name according to for example:'Edit Process', 'Save as Template', 'Configure', 'View Documentation', 'Export', 'Archive'
    * @return nothing returns
    * selectMenuOptionRow('Configure') //this option open the configuration for a process
    */
    selectMenuOptionRow(nameOption){
        var optionXpath = '//div[@id="categorizedList"]/ul/li/a[@id="nav-sources-tab"]//ancestor::div[@id="categorizedList"]/descendant::div[@id="processIndex"]//table/tbody/tr//button[@aria-haspopup="menu"]/following-sibling::ul//li//span[contains(text(),"'+nameOption+'")]'
        cy.xpath(optionXpath).scrollIntoView().should('be.visible');
        cy.xpath(optionXpath).first().click();
    }

    /**
    * This method is responsible to do click over inspector button and open the inspector panel
    * @return nothing returns
    **/
    pressInspectorBtn(){
        cy.xpath(selectors.inspectorBtnXpath).should("be.visible");
        cy.xpath(selectors.inspectorBtnXpath).click();
        cy.xpath(selectors.inspectorPanel).should("not.have.css", "display", "none");
    }

    /**
    * This method is responsible to close the inspector panel
    * @return nothing returns
    **/
    pressCloseInspectorPanel(){
        cy.xpath(selectors.inspectorPanel).should("be.visible");
        cy.xpath(selectors.closeInspectoPanel).click();
        cy.xpath(selectors.inspectorPanel).should("have.css", "display", "none");
    }
    
    searchTemplate(templateName) {
        cy.xpath(selectors.threePointsBtnXpathTemplate).should("be.visible");
        cy.xpath("(//div[@id='search']//input[@aria-label='Search'])[1]")
            .type(`${templateName}{enter}`)
            .should("have.value", templateName);
            
        //cy.get('[data-cy="processes-template-table"] > .w-100 > .pt-1 > .pagination').should("be.visible");
        cy.get('[data-cy="template-pagination"]').should("be.visible");
    }
    /**
    * This method is responsible open screen email of email notification
    * @return nothing returns
    **/
        openScreenEmailNotificationofElementFromModeler(typeName, elementName) {
            const elementTaskEventXpath = "//*[contains(text(),'nameElem')]/ancestor::*[@data-type='processmaker.components.nodes.task.Shape']";
            switch (typeName) {
                case 'Form Task':
                    cy.xpath(elementTaskEventXpath.replace('nameElem', elementName)).first().should('be.visible').click();
                    cy.xpath("//span[text()='Email Notifications']").should("be.visible").click();
                    cy.get('[aria-label="edit"] > .fas').should("be.visible").click();
                    //Open screen Email notification
                    cy.xpath("(//small[text()='What Screen Should Be Used For Sending This Email']/parent::div//a)[1]")
                        .should('have.attr', 'href')
                        .then((href) => {
                            cy.visit(href)
                        });
                    break;
            }
    
        }

    goToWebEntryByStartEvent(startEventName) {
        const name = "//*[text()='" + startEventName + "']/ancestor::*[@data-type='processmaker.components.nodes.startEvent.Shape']"
        cy.xpath(name).first().click({ force: true });
        this.clickOnWeTabSettign();
        this.openWe();
    }

    /**
     * This method is responsible to create a new process with a template
     * @param nameTemplate: name of the new process
     * @param processName: name of the new process
     * @param description: description about of the new process
     * @param category: Select a Process Category
     * @param username: Select a username to be a process manager
     * @return nothing returns
     */
    createNewProcessWithTemplate(nameTemplate,processName,description = '',category = "",username ="") {
        this.clickOnAddProcess();
        let xpathCardTemplate = "//*[text()='nameTemplate']/ancestor::*[@class='card template-select-card']";
        cy.xpath('//input[@class="pl-0 form-control"]').should("be.visible").type(nameTemplate,{delay:300});
        cy.xpath(xpathCardTemplate.replace('nameTemplate', nameTemplate)).first().should('be.visible').click();
        cy.xpath("//h5[contains(text(),'"+nameTemplate+"')]").should("be.visible");
        cy.xpath('//span[@class="badge category-badge mb-2 mr-1 badge-secondary badge-pill"]').should("be.visible");
        //Click on use Template
        cy.xpath('//button[@class="btn btn-primary btn-sm right"]').should("be.visible").click();
        cy.get(selectors.nameTxtBx).clear();
        this.enterProcessName(processName);
        cy.get(selectors.descriptionTxtBx).clear();
        this.enterProcessDescription(description);
        if (category != "") this.enterProcessCategory(category);
        if (username != "") this.enterProcessManager(username);
        this.clickOnSaveInAddProcessModal();

        //Add Exception if the template has screens
        let buttonSelector = "[id='template-asset-manager']>* button";
        utility.waitUntilElementAppear(buttonSelector, 2);
        cy.get('body').then($body => {
            if ($body.find(buttonSelector).length > 0) {
                cy.xpath('//button[contains(text(),"Continue")]').click();
                cy.xpath('//button[contains(text(),"Yes")]').should('be.visible');
                cy.xpath('//button[contains(text(),"Yes")]').click();
                cy.xpath('//button[contains(text(),"OK")]').should('be.visible');
                cy.xpath('//button[contains(text(),"OK")]').click();
                cy.xpath('//button[contains(text(),"OK")]').should('not.exist');
            }
        });
        cy.wait(500);
        cy.xpath(selectors.processRailBottomXpath).should("be.visible");
    }

    importProcessAPI(path, mode = 'copy', pass = "") {
        let formData = new FormData();
        let win;
        return cy.fixture(path, null)
            .then(Cypress.Blob.arrayBufferToBlob)
            .then(fileBlob => {
                formData.append('file', fileBlob);
                return cy.window();
            })
            .then(cyWin => {
                win = cyWin;
                if(pass != ""){
                    formData.append('password', pass);
                }
                return win.ProcessMaker.apiClient.post('/processes/import/validation', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            })
            .then(response => {
                const options = {};
                Object.keys(response.data.manifest).forEach(uuid => {
                    options[uuid] = {"mode": mode,"discardedByParent":false,"saveAssetsMode":"saveAllAssets"}
                });
                const optionsBlob = new Blob([JSON.stringify(options)], {
                    type: 'application/json'
                });
                formData.append('options', optionsBlob);
                return win.ProcessMaker.apiClient.post('/import/do-import', formData);
            })
            .then(response => {
                return response.data.processId;
            });
    }

    configureProcessAPI(processId, config)
    {
        return cy.window().then(win => {
            const params = {};
            return win.ProcessMaker.apiClient.get('/processes/' + processId, { params }).then(response => {
               let process = response.data; 
               console.log("PUTTING", processId, {...process, ...config});
               return win.ProcessMaker.apiClient.put('/processes/' + processId, {...process, ...config});
            });
        });
    }

    modifyBpmnAPI(processId, callback)  
    {
        return cy.window().then(win => {
            return win.ProcessMaker.apiClient.get(
                '/processes/' + processId + '/bpmn',
                { responseType: 'blob' }
            ).then(response => {
                return response.data.text();
            }).then(bpmn => {
                const modifiedBpmn = callback(bpmn);
                return this.configureProcessAPI(processId, { bpmn: modifiedBpmn });
            });
        });
    }

    startProcessAPI(processId, nodeId, data = {}) {
        return cy.window().then(win => {
            return win.ProcessMaker.apiClient.post(
                'process_events/' + processId,
                data,
                {
                    params: { event: nodeId }
                }
            ).then(response => {
                cy.wrap(response.data.id);
            });
        })   
    }
    searchArchiveProcess(processName, option) {
        cy.xpath("//*[contains(text(),'Archived Process')]").should("be.visible").click();
        cy.xpath(selectors.searchInputArchiveBox)
            .type(`${processName}{enter}`)
            .should("have.value", processName);
        cy.wait(3000);
        cy.xpath(selectors.threePointsArchiveBtnXpath).first().should("be.visible");
        cy.xpath(selectors.threePointsArchiveBtnXpath).first().click();

        switch (option) {
            case "restore":
                this.restoreProcess();
                break;
        }
    }
    restoreProcess() {
        var optionXpath = '//div[@id="categorizedList"]/ul/li/a[@id="nav-sources-tab"]//ancestor::div[@id="categorizedList"]/descendant::div[@id="archivedProcess"]//table/tbody/tr//button[@aria-haspopup="menu"]/following-sibling::ul//li//span[contains(text(),"Restore")]';
        cy.xpath(optionXpath).should("be.visible");
        cy.xpath(optionXpath).click();
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should("be.visible");
    }
    createCategory(name, status){
        cy.xpath("//a[contains(@href,'categories')]").click();
        this.clickOnNewCategory();
        cy.get('[name="name"]').type(name).should("have.value", name);
        if(status === "Inactive" || status === "inactive" || status === "INACTIVE")
            cy.get['[name="status"]'].select("INACTIVE");
        cy.xpath("//*[contains(text(),'Save')]").click();
    }
    clickOnNewCategory(){
        cy.get("[aria-label='Create Category']").click();
    }
    deleteCategory(name){
        let categoryXpath = "//*[contains(text(),'categoryName')]/ancestor::tr//*[@data-cy='category-ellipsis']/button";
        cy.xpath("//a[contains(@href,'categories')]").click();
        cy.get('[id="categories-listing"]>* [class="jumbotron jumbotron-fluid"]').should('not.be.visible');
        cy.wait(2000);
        cy.xpath(selectors.searchInputCategories).type(name).should("have.value",name);
        cy.wait(2000);
        cy.xpath(categoryXpath.replace("categoryName",name)).should('be.visible');
        cy.xpath(categoryXpath.replace("categoryName",name)).first().click();
        cy.xpath("//*[contains(text(),'Delete Category')]").click();
        cy.xpath("//button[contains(text(),'Confirm')]").click();
        cy.wait(2000);
    }

    /**
    * This method is responsible to search a process and click on ellipsis menu
    * @param processName: name of the process to search
    * @return nothing returns
    */
   searchForProcessAndClickinEllipsisMenu(processName) {
        var editBtn = '//div[@id="categorizedList"]/ul/li/a[@id="nav-sources-tab"]//ancestor::div[@id="categorizedList"]/descendant::div[@id="processIndex"]//table/tbody/tr//button[@aria-haspopup="menu"]';
        cy.xpath(editBtn).should('be.visible');
        //cy.xpath(selectors.searchInputBox).type(`${processName}{enter}`).should('have.value', processName);
        cy.xpath(selectors.searchInputBox).type(processName);
        cy.xpath(selectors.searchInputBox).type("{enter}");
        cy.xpath(selectors.searchInputBox).should('have.value', processName);
        cy.get(selectors.loadingSpinnerProcess).should('be.visible');
        cy.xpath(editBtn).should("be.visible");
        cy.xpath(editBtn).first().click();
    }

    goToWebEntryAndSelectOption(){
        cy.get('[data-type="processmaker.components.nodes.startEvent.Shape"]').first().click({ force: true });
        this.clickOnWeTabSettign();
        this.clickOnWebEntry();
        cy.xpath(selectors.buttonWebEntryOption).click();
        cy.xpath(selectors.webEntryModeSelect).select('Authenticated');
        cy.xpath(selectors.webEntryModeSelect).select('Anonymous');
        this.copyWebEntryURL();
    }
 
    copyWebEntryURL(){
        cy.xpath(selectors.copyWebEntryURL).click();
        cy.xpath(selectors.spanAnonymousWebLinkCopied).should('be.visible');
        cy.xpath("//span").contains("Please use this link when you are not logged into ProcessMaker");
    }

    /**
     * This method is responsible to open hamburguer buttton in the modeler
     * @return nothing returns
     */
    openInspectorModeler() {
        cy.xpath(selectors.inspectorBtnXpath2)
            .should('be.visible')
            .click();
        cy.get('[data-test="inspector-column"]').should('be.visible');
    }
    openAlternativeModeler(alternative = "A") {
        cy.url().then(($url) => {
            let processID = $url.split("/")[4].trim();
            cy.visit("/modeler/" + processID + "/alternative/" + alternative);
        });
    }
    verifyPresenceOfProcessAndCreate(processName, description) {
        var editBtn =
            '//div[@id="categorizedList"]/ul/li/a[@id="nav-sources-tab"]//ancestor::div[@id="categorizedList"]/descendant::div[@id="processIndex"]//table/tbody/tr//button[@aria-haspopup="menu"]';
        cy.xpath(editBtn).should("be.visible");
        cy.xpath(selectors.searchInputBox)
            .type(`${processName}`)
            .should("have.value", processName);
        cy.xpath(selectors.searchInputBox)
            .type('{enter}');
        cy.wait(5000);
        cy.get(selectors.loadingSpinnerProcess).should("not.be.visible");
        cy.get('#processIndex > div.container-fluid > div > div.jumbotron.jumbotron-fluid').should('not.be.visible');
        cy.xpath(selectors.processTableBody, { timeout: 10000 })
            .then($rowsTable => {
                if($rowsTable.find("tr").length <= 0){
                    this.createProcess(processName, description);
                }
                if($rowsTable.find("tr").length===1){
                    cy.xpath(selectors.processTable, { timeout: 10000 })
                            .find("td")
                            .then(($loadedTable) => {
                                if ($loadedTable.length === 1) {
                                    this.createProcess(processName, description);
                                }
                            });
                        }
                    });
                }
    exportProcessById(
        processName,
        exportType = "basic",
        passwordOption = "no",
        password,
        IdProcess
    ) {
        //this.selectMenuOptionRow("Export");
        cy.visit('processes/'+IdProcess+'/export');
        cy.xpath(selectors.menuSidebarXpath).should("be.visible");
        var process = processName + ".";
        cy.xpath(selectors.exportTitleProcessXpath).should(
            "have.text",
            process
        );
        if (exportType === "basic") {
            //basic export
            cy.xpath(selectors.downloadBtn).click();
            cy.xpath(selectors.exportTitleSetPasswordXpath).should(
                "be.visible"
            );
            if (passwordOption === "no") {
                cy.xpath(selectors.passwordProtectFieldXpath).uncheck({
                    force: true,
                });
            } else {
                cy.xpath(selectors.setPasswordFieldXpath).type(password, {
                    delay: 50,
                });
                cy.xpath(selectors.confirmPasswordFieldXpath).type(password, {
                    delay: 50,
                });
            }
            cy.xpath(selectors.exportBtnXpath).click();
            cy.xpath(selectors.messageExportSuccessfulXpath).should(
                "be.visible"
            );
            cy.xpath(selectors.exportCloseBtnXpath).click();
        } else {
            //custom export
        }
    }
}
