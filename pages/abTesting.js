import { NavigationHelper } from "#helpers/navigationHelper";
import selectors from "#selectors/abTesting";
import { Process } from "#pages/process";

const navHelper = new NavigationHelper();
const process = new Process();

export class ABTesting {
    //AB alternatives
    enableAlternativeB() {
        this.load();
        cy.iframe(selectors.iframeA).find(selectors.menuAB).invoke('text').then($text => {
            cy.log($text)
            if ($text.includes('Alternative B')) {
                return;
            } else {
                this.clickOnPlusBtn();
                this.clickOnConfirmEnableBtn({ force: true });
            }
        })
        this.load();
    }

    clickOnPlusBtn() {
        cy.iframe(selectors.iframeA).find(selectors.plusTab).should('be.visible');
        cy.iframe(selectors.iframeA).find(selectors.plusTab).click({ force: true, delay: 1000 });
    }

    clickOnConfirmEnableBtn() {
        cy.iframe(selectors.iframeA).find('[class="modal-content"]').should('be.visible');
        cy.wait(2000);
        cy.iframe(selectors.iframeA).find(selectors.confirmEnableBtn).should('be.visible');
        cy.iframe(selectors.iframeA).find(selectors.confirmEnableBtn).click({ force: true, delay: 1000 });
    }

    clickOnConfirmDeleteBtn() {
        cy.iframe(selectors.iframeA).find('[class="modal-content"]').should('be.visible');
        cy.wait(2000);
        cy.iframe(selectors.iframeA).find(selectors.confirmDeleteBtn).should('be.visible');
        cy.iframe(selectors.iframeA).find(selectors.confirmDeleteBtn).click({ force: true, delay: 1000 });
    }

    replaceAlternativeAWithDataOfAlternativeB(iframeOption) {
        this.clickOnAlternativeA(iframeOption);
        this.clickOnReplaceAlternative();
        this.load();
        
    }

    replaceAlternativeBWithDataOfAlternativeA(iframeOption) {
        this.clickOnAlternativeB(iframeOption);
        this.clickOnReplaceAlternative(iframeOption);
        this.load();
    }

    confirmReplaceAlternative(iframeOption = 'a'){
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).find(selectors.confirmReplaceAlt).click();
        this.load();
    }

    clickOnAlternativeA(iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).find(selectors.alternativeA_Tab).click({ force: true });
    }

    clickOnAlternativeB(iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).find(selectors.alternativeB_Tab).click();
    }

    clickOnReplaceAlternative(iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).find(selectors.replaceAlternativeBtn).first().click();
        this.confirmReplaceAlternative(iframeOption);
    }

    deleteAlternativeB() {
        cy.iframe(selectors.iframeA).find(selectors.deleteAltB_Btn).first().click();
        this.clickOnConfirmDeleteBtn();
    }

    deleteAlternativeB_ifExist() {
        cy.iframe(selectors.iframeA).find(selectors.menuAB).invoke('text').then($text => {
            if ($text.includes('Alternative B')) {
                this.deleteAlternativeB();
            }
        })
    }

    clickOnInspectorBtn(iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        this.load();
        cy.iframe(iframeSelector).find(selectors.menuInspectorBtn).click({ force:true });
    }

    //Publish New Version
    publishNewVersion(option, iframeOption, alternative, version, description) {
        this.clickOnPublishBtn(iframeOption);
        this.load();
        switch (option) {
            case 'withoutAB':
                break;
            case 'onlySelectAlternative':
                this.selectAlternative(alternative, iframeOption);
                break;
            case 'versionDescriptionAndAlternative':
                this.fillVersion(version);
                this.fillDescription(description);
                this.selectAlternative(alternative, iframeOption);
                break;
            default:
                break;
        }
        this.clickOnPublishBtnInModal(iframeOption);
    }

    alert(iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).find('[.alert-wrapper > .alert]').should('be.visible');
    }
    //iframeOption could be "A" or "B"
    clickOnPublishBtn(iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).find(selectors.publishBtn).click({ force: true });
        cy.iframe(iframeSelector).find('[class="modal-dialog modal-lg modal-dialog-centered"]').should('be.visible');
    }

    saveLaunchPadModal(iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).find(selectors.modalLaunchpad).should('be.visible');
        cy.iframe(iframeSelector).find(selectors.labelLaunchpad).should('contain', 'Launchpad Settings')
        cy.iframe(iframeSelector).find(selectors.saveBtnInLaunchpadSettingModal).should('be.visible');
        cy.wait(3000);
        cy.iframe(iframeSelector).find(selectors.saveBtnInLaunchpadSettingModal).click({ force: true });
    }

    selectAlternativeA(iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).find(selectors.alternativeA_Btn).should('be.visible');
        cy.iframe(iframeSelector).find(selectors.alternativeA_Btn).click();
    }

    selectAlternativeB(iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).find(selectors.alternativeB_Btn).should('be.visible');
        cy.iframe(iframeSelector).find(selectors.alternativeB_Btn).click();
    }

    selectAlternativeAB(iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).find(selectors.alternativeAB_Btn).should('be.visible');
        cy.iframe(iframeSelector).find(selectors.alternativeAB_Btn).click();
    }

    clickOnPublishBtnInModal(iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).find(selectors.publishBtnInModal).click({ force: true });
    }

    clickOnSaveAndPublish(iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).find(selectors.saveAndPublish).click({ force: true });
    }

    selectAlternative(alternative, iframeOption) {
        switch (alternative) {
            case 'Alternative A':
                this.selectAlternativeA(iframeOption);
                break;
            case 'Alternative B':
                this.selectAlternativeB(iframeOption);
                break;
            case 'Alternative A+B':
                this.selectAlternativeAB(iframeOption);
                break;
            default:
                break;
        }
    }

    fillVersion(version) {
        cy.iframe(selectors.iframeA).find(selectors.version).click();
        cy.iframe(selectors.iframeA).find(selectors.version).type(version, { delay: 60 }).should('have.value', version);
    }

    fillDescription(description) {
        cy.iframe(selectors.iframeA).find(selectors.description).click();
        cy.iframe(selectors.iframeA).find(selectors.description).type(description, { delay: 60 }).should('have.value', description);
    }


    selectSimpleOrAdvanced(option, expression, iframeOption) {
        switch (option) {
            case 'simple':
                this.moveScrollbar();
                break;
            case 'advanced':
                this.clickOnAdvanced(iframeOption);
                this.fillExpression(expression, iframeOption);
                break;
            default:
                break;
        }
    }

    configureABsettingsFromModeler(option, expression, iframeOption) {
        this.clickOnPublishBtn(iframeOption);
        this.selectAlternative('Alternative A+B', iframeOption);
        cy.wait(1000);
        this.clickOnAbSettings(iframeOption);
        this.selectSimpleOrAdvanced(option, expression, iframeOption);
        this.clickOnSaveAndPublish(iframeOption);
    }

    clickOnAbSettings(iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).find(selectors.ABsettingsBtn).click();
    }

    moveScrollbar(iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).find(selectors.scrollBar).as('range').invoke('val', 25).trigger('change');
    }

    clickOnAdvanced(iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).find(selectors.advancedBtn).click();
    }

    fillExpression(expression, iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).find(selectors.expressionInput).click().clear().type(expression, { ðelay: 60 });
    }

    goToseeProcessABTestingConfiguration() {
        this.clickOnPublishBtn();
        this.selectAlternativeAB();
        this.clickOnAbSettings();
        cy.iframe(selectors.iframeA).find('[class="fas fa-cog px-2"]').click();
    }

    //AB Testing from configuration of process
    configureABsettingsFromProcessConfiguration(processName, option, expression) {
        navHelper.navigateToProcessPage();
        process.searchProcessAndSelectOptions(processName, "config");
        this.clickOnABTestingConfigurationTab();
        this.selectSimpleOrAdvanced(option, expression);
        this.clickOnSaveAndPublish();
    }

    clickOnABTestingConfigurationTab() {
        cy.get(selectors.ABTestingTab).click();
    }

    //Modeler elements
    clickOnAddBtn() {
        cy.iframe(selectors.iframeA).find(selectors.addBtn).click();
    }

    dragAndDropElementToPaper() {
        cy.iframe(selectors.iframeA).find(selectors.addBtn).click();
    }

    dragElement() {
        cy.iframe(selectors.iframeA).find(`[data-test="processmaker-modeler-start-event"]`).drag(`[data-test="paper"]`);
        const dataTransfer = new DataTransfer;
        cy.iframe(selectors.iframeA).find(`[data-test="processmaker-modeler-start-event"]`)
            .trigger('dragstart', { dataTransfer })
        cy.iframe(selectors.iframeA).find(`[data-test="paper"]`)
            .trigger('dragenter', { force: true })
            .trigger('dragover', { dataTransfer, force: true })
            .trigger('drop', { dataTransfer, force: true })
        cy.iframe(selectors.iframeA).find(`[data-test="processmaker-modeler-start-event"]`)
            .trigger('dragend')
    }

    waitUntilElementIsVisible(type, selectorXPath, maxAttempts = 10, attempts = 0) {
        if (attempts > maxAttempts) {
            throw new Error("Timed out waiting for report to be generated");
        }
        if (type === 'selector') {
            cy.wait(3000);
            cy.iframe(selectors.iframeA)
                .then($body => {
                    if ($body.find(selectorXPath).length <= 0) {
                        cy.reload();
                        this.waitUntilElementIsVisible(type, selectorXPath, maxAttempts, attempts + 1);
                    }
                })
        }
    }

    //Close modal Run test in AB testing
    closeModal(iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).find('[class="modal-content"]').find(selectors.closeModalPublish).click();
    }

    clickOnStartEvent(nameElement, iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        const elementLocator = '[data-type="processmaker.components.nodes.startEvent.Shape"]'
        cy.iframe(iframeSelector).find(elementLocator.replace('nameElem', nameElement)).first().should('be.visible').click({ force: true });
    }

    clickOnTask(nameElement, iframeOption = 'a'){
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        const elementLocator = "//*[text()='nameElem']/ancestor::*[@data-type='processmaker.components.nodes.task.Shape']";
        cy.iframe(iframeSelector).xpath(elementLocator.replace('nameElem', nameElement)).first().should('be.visible');
        cy.iframe(iframeSelector).xpath(elementLocator.replace('nameElem', nameElement)).first().click({ force: true });
    }

    clickOnEndEvent(nameElement, iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        const elementLocator = "//*[text()='nameElem']/ancestor::*[@data-type='processmaker.components.nodes.endEvent.Shape']"
        cy.iframe(iframeSelector).xpath(elementLocator.replace('nameElem', nameElement)).first().should('be.visible');
        cy.iframe(iframeSelector).xpath(elementLocator.replace('nameElem', nameElement)).first().click({ force: true });
    }

    deleteElement(iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).find(selectors.deleteIcon).should('be.visible');
        cy.iframe(iframeSelector).find(selectors.deleteIcon).click({ force: true });
    }

    discardChanges(iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).xpath('//div[@data-cy="ellipsis-menu"]//button').should('be.visible').click({ force: true });
        cy.iframe(iframeSelector).contains('Discard Draft').click({ force: true });
        cy.iframe(iframeSelector).xpath(selectors.discardBtn).click({ force: true });
    }

    changeNameOfProcess(newName) {
        cy.get(selectors.nameInput).clear().type(newName).should('have.value', newName);
        cy.get(selectors.saveConfiguration).should('be.visible');
        cy.get(selectors.saveConfiguration).click();
        cy.get(selectors.confirmSaveConfiguration).should('be.visible');
        cy.get(selectors.confirmSaveConfiguration).click();
    }

    load() {
        cy.wait(3000);
    }

     /**
     * Opens a Web Entry in A/B testing environment.
     *
     * @param {string} iframeOption - The iframe option to select. Defaults to 'a'.
     * @param {boolean} isAuth - Determines if authentication is required before visiting the Web Entry URL. Defaults to false.
     * @param {string|null} name - The specific name of the Web Entry to select. If null, the first available Web Entry is selected. Defaults to null.
     */
    openWebEntryInABtesting(iframeOption = 'a', isAuth = false, name = null) {
        const iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB;

        // Select the Web Entry shape based on the provided name or the first available one
        const webEntryShape = cy.iframe(iframeSelector)
            .find('[data-type="processmaker.components.nodes.startEvent.Shape"]')
            .contains(name || 'Start Event')
            .should('be.visible');

        webEntryShape.click({ force: true });

        // Open the inspector and access the Web Entry URL
        cy.iframe(iframeSelector).xpath('//button[@data-cy="inspector-button"]')
            .should("be.visible").click();
        cy.iframe(iframeSelector).find("[id='accordion-button-webentry']").click();

        // Retrieve the Web Entry URL and handle authentication if necessary
        cy.iframe(iframeSelector).find("[id='webentry-entry-url']").invoke('val').then(urlValue => {
            if (!isAuth) {
                cy.visit('/logout');
                cy.title().should('eq', 'Login - ProcessMaker');
            }
            cy.visit(urlValue);
        });
    }

    renameStartEventName(nameElement,newName,iframeOption = 'a'){
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        this.clickOnStartEvent(nameElement, iframeOption);
        cy.iframe(iframeSelector).xpath('//div[@id="collapse-inspector-accordion-start-event"]//input[@name="name"]').clear().type(newName);
    }

    remaneTaskName(nameElement,newName,taskType,iframeOption = 'a'){
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        this.clickOnTask(nameElement, iframeOption);
        switch (taskType) {
            case 'Form':
                cy.iframe(iframeSelector).xpath(selectors.formTaskName).clear();
                cy.iframe(iframeSelector).xpath(selectors.formTaskName).type(newName);
                break;
            case 'Manual':
                cy.iframe(iframeSelector).xpath(selectors.manualTaskName).clear();
                cy.iframe(iframeSelector).xpath(selectors.manualTaskName).type(newName);
                break;
            default:
                break;
        }
    }

    goToEndPage(){
        cy.get(selectors.bodyPageInSummary).should('be.visible');
        cy.get(selectors.bodyPageInSummary)
        .click({ force: true })
        .type("{meta+downarrow}",{force:true});
    }

    /**
    * This method configures assignment rules for task control in the process modeler
    * @param elementName: element
    * @param assignmentConfig: type to assign rules like: User/Group, Previous Task Assignee, Requester Started, Process Variable,Rule Expression, Process Manager
    * for example:
    *   abTesting.verifyAssignmentRulesInTask({
            elementName: "Form task",
            assignmentType: "User/Groups",
            userGroup: 'Group1',
            variableName: "Groups",
            value: "value",
        });
    */

    configureAssignmentRulesInTask(assignmentConfig,iframeOption = 'a') {
        const { elementName, assignmentType, userGroup, variableName,value } = assignmentConfig
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        const elementTaskXapth = "//*[text()='nameElem']/ancestor::*[@data-type='processmaker.components.nodes.task.Shape']";
       // cy.iframe(iframeSelector).xpath(elementTaskXapth.replace('nameElem', elementName)).first().should('be.visible');
        cy.iframe(iframeSelector).xpath(elementTaskXapth.replace('nameElem', elementName)).first().click();
        this.load();
        this.clickOnInspectorBtn(iframeOption);
        this.clickOnAssignmentRules(iframeOption);
        switch (assignmentType) {
            case 'Users/Groups':
                cy.iframe(iframeSelector).find(selectors.selectList).select('Users / Groups').should('have.value',"user_group");
                cy.iframe(iframeSelector).xpath(selectors.spinnerUserGroups).should('not.be.visible');
                this.selectUserOrGroup('Assigned Users/Groups',userGroup,iframeOption);
                break;
            case 'Previous Task Assignee':
                cy.iframe(iframeSelector).find(selectors.selectList).select('Previous Task Assignee').should('have.value',"previous_task_assignee");
                break;
            case 'Requester Started':
                cy.iframe(iframeSelector).find(selectors.selectList).select('Request Starter').should('have.value',"requester");
                break;
            case 'Process Variable':
                cy.iframe(iframeSelector).find(selectors.selectList).select('Process Variable').should('have.value',"process_variable");
                this.fillProcessVariable(variableName,value,iframeOption)
                break;
            case 'Rule Expression':
                cy.iframe(iframeSelector).find(selectors.selectList).select('Rule Expression').should('have.value',"rule_expression");
                this.selectUserOrGroup('Default Assignment',userGroup,iframeOption);
                break;
            case 'Process Manager':
                cy.iframe(iframeSelector).find(selectors.selectList).select('Process Manager').should('have.value',"process_manager");
                break;
            default:
                break;
            }
        this.publishNewVersion('withoutAB');
    }
    
    clickOnAssignmentRules(iframeOption = 'a'){
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).find(selectors.asssignmentRuleAcordion).first().should('be.visible');
        cy.iframe(iframeSelector).find(selectors.asssignmentRuleAcordion).first().click();
    }

    selectUserOrGroup(label,userGroup,iframeOption = 'a'){
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        const userGroupSelected = `//label[text()="${label}"]/parent::div//div[@class='multiselect__tags']//span`;
        this.load();
        cy.iframe(iframeSelector).xpath(userGroupSelected).invoke('text')
                .then($text => {
                    if (!$text.includes(userGroup)) {
                        cy.iframe(iframeSelector).xpath(`//label[text()="${label}"]/parent::div//div[@class="multiselect__tags"]`).should('be.visible');
                        cy.iframe(iframeSelector).xpath(`//label[text()="${label}"]/parent::div//div[@class="multiselect__tags"]`).click();
                        cy.iframe(iframeSelector).xpath(`//label[text()="${label}"]/parent::div//li/span[contains(text(),"No Data Available")]`)
                            .should('not.be.visible');
                        this.load();
                        cy.iframe(iframeSelector).xpath(`//label[text()="${label}"]/parent::div//input`).clear({force:true});
                        let len = (userGroup.length)-1;
                        cy.iframe(iframeSelector).xpath(`//label[text()="${label}"]/parent::div//input`).type(userGroup.substring(0,len),{delay:250}).should('have.value', userGroup.substring(0,len));
                        this.load();
                        cy.iframe(iframeSelector).xpath(`//label[text()="${label}"]/parent::div//input`).type(userGroup.charAt(len),{delay:300}).should('have.value', userGroup);
                        this.load();
                        cy.iframe(iframeSelector).xpath(`(//span[contains(text(),"userGroup")]/ancestor::div[@class="multiselect__content-wrapper"])[1]`.replace("userGroup",userGroup)).click();
                    }
                });
    }
    
    fillProcessVariable(variableName,value,iframeOption = 'a'){
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        switch (variableName) {
                case 'Users':
                    cy.iframe(iframeSelector).xpath(selectors.variableNameUsers).click();
                    cy.iframe(iframeSelector).xpath(selectors.variableNameUsers).type(value,{delay:80}).should('have.value',value);
                    break;
                case 'Groups':
                    cy.iframe(iframeSelector).xpath(selectors.variableNameGroups).click();
                    cy.iframe(iframeSelector).xpath(selectors.variableNameGroups).type(value,{delay:80}).should('have.value',value);
                    break;
                default:
                    break;
            }
    }

    loadSpinner(iframeOption = 'a'){
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).find(selectors.spinner)
        .should("have.attr", "style", "display: none;");
    }
}
