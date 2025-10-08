import selectors from "#selectors/process"

export class ProcessV1 {

    /**
     * Opens a process in the modeler by process ID and alternative
     * @param {string} processID - The ID of the process to open
     * @param {string} alternative - The alternative version (defaults to "A")
     */
    openProcessByIdAndAlternative(processID, alternative = "A"){
        cy.visit("/modeler/" + processID + "/alternative/" + alternative);
    }

    /**
     * Selects a task element inside the BPMN modeler
     * @param {string} taskName - The name of the task to select
     */
    selectTaskInsideModeler(taskName){
        cy.xpath(selectors.taskElementBPMN_xpath.replace("elementName",taskName)).first().click();
    }

    /**
     * Clicks the inspector button to open the inspector panel
     */
    openInspectorButton(){
        cy.get(selectors.inspectorButton).click()
    }

    /**
     * Clicks the publish button to initiate the publishing process
     */
    pressPublishButton(){
        cy.get(selectors.publishButton).click()
    }

    /**
     * Adds a version name in the publish modal
     * @param {string} versionName - The name for the new version
     */
    addModalVersionName(versionName){
        cy.get(selectors.modalVersionNameField).type(versionName)
    }

    /**
     * Adds a description in the publish modal
     * @param {string} versionName - The description text for the version
     */
    addModalDescription(versionName){
        cy.get(selectors.modalDescriptionTextarea).type(versionName)
    }

    /**
     * Verifies that the publish version modal is visible
     */
    publishVersionModalIsVisible(){
        cy.get(selectors.modalPublishVersion).should('be.visible')
    }

    /**
     * Clicks the publish button within the modal to confirm publishing
     */
    pressModalPublishButton(){
        cy.get(selectors.modalPublishButton).click()
    }
    
    /**
     * Verifies that the flash message indicating the modal was saved is visible
     */
    flashMessageModalSaved(){
        cy.get(selectors.modalFlashMessage).should('be.visible')
    }
    
    /**
     * Clicks the ellipsis (three dots) menu button
     */
    pressOptionEllipsis(){
        cy.get(selectors.optionEllipsis).click()
    }

    /**
     * Selects a specific option from the ellipsis menu
     * @param {string} option - The text of the option to select
     */
    selectOptionEllipsis(option){
        cy.get(selectors.optionEllipsis).within(() => {
            cy.get(selectors.optionEllipsisList).contains(option).click()
        })
    }

    /**
     * Clicks the discard button in the discard draft modal
     * @param {string} optionButton - The text of the button to click (defaults to "Discard")
     */
    pressDiscardButtonModal(optionButton = "Discard"){
        cy.get(selectors.discardDraftModal).within(() => {
            cy.get(selectors.discardButton).contains(optionButton).click()
        })
    }
}
