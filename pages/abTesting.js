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
    }

    replaceAlternativeBWithDataOfAlternativeA(iframeOption) {
        this.clickOnAlternativeB(iframeOption);
        this.clickOnReplaceAlternative();
    }

    clickOnAlternativeA(iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).find(selectors.alternativeA_Tab).click({ force: true });
    }

    clickOnAlternativeB(iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).find(selectors.alternativeB_Tab).click();
    }

    clickOnReplaceAlternative() {
        cy.iframe(selectors.iframeA).find(selectors.replaceAlternativeBtn).first().click();
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

    //Publish New Version
    publishNewVersion(option, iframeOption, alternative, version, description) {
        this.clickOnPublishBtn(iframeOption);
        switch (option) {
            case 'withoutAB':
                this.clickOnPublishBtnInModal();
                break;
            case 'onlySelectAlternative':
                this.selectAlternative(alternative, iframeOption)
                break;
            case 'versionDescriptionAndAlternative':
                this.fillVersion(version);
                this.fillDescription(description);
                this.selectAlternative(alternative)
                break;
            default:
                break;
        }
        this.clickOnSaveAndPublish(iframeOption);
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
        cy.iframe(iframeSelector).find(selectors.alternativeA_Btn).click();
    }

    selectAlternativeB(iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).find(selectors.alternativeB_Btn).click();
    }

    selectAlternativeAB(iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).find(selectors.alternativeAB_Btn).click();
    }

    clickOnPublishBtnInModal() {
        cy.iframe(selectors.iframeA).find(selectors.publishBtnInModal).click({ force: true });
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


    selectSimpleOrAdvanced(option, expression) {
        switch (option) {
            case 'simple':
                this.moveScrollbar();
                break;
            case 'advanced':
                this.clickOnAdvanced();
                this.fillExpression(expression);
                this.moveScrollbar();
                break;
            default:
                break;
        }
    }

    configureABsettingsFromModeler(option, expression) {
        this.clickOnPublishBtn();
        this.clickOnAbSettings();
        this.selectSimpleOrAdvanced(option, expression);
        this.clickOnSaveAndPublish();
    }

    clickOnAbSettings() {
        cy.iframe(selectors.iframeA).find(selectors.ABsettingsBtn).click();
    }

    moveScrollbar() {
        cy.iframe(selectors.iframeA).find(selectors.scrollBar).as('range').invoke('val', 25).trigger('change');
    }

    clickOnAdvanced() {
        cy.iframe(selectors.iframeA).find(selectors.advancedBtn).click();
    }

    fillExpression(expression) {
        cy.iframe(selectors.iframeA).find(selectors.expressionInput).click().type(expression, { ðelay: 60 });
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
    load() {
        cy.wait(3000);
    }
}
