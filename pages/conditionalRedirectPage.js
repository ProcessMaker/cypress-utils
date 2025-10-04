import selectors from "../selectors/conditionalRedirectSelector"

export class ConditionalRedirectPage {

    /**
     * Enables the conditional redirect checkbox by checking it
     * Uses force option to bypass any overlapping elements
     */
    enableConditionRedirectCheckbox (){
        cy.get(selectors.conditionalRedirect_checkbox).check({timeout:5000, force:true})
    }

    /**
     * Disables the conditional redirect checkbox by unchecking it
     * Uses force option to bypass any overlapping elements
     */
    disableConditionRedirectCheckbox() {
        cy.get(selectors.conditionalRedirect_checkbox).uncheck({timeout:5000, force:true})
    }

    /**
     * Clicks the add condition button to create a new condition
     * Uses force option to bypass any overlapping elements
     */
    pressAddConditionButton() {
        cy.get(selectors.addCondition_button).click({force:true});
    }

    /**
     * Verifies that the add condition button is visible on the page
     */
    verifyAddConditionButton(){
        cy.get(selectors.addCondition_button).should('be.visible')
    }

    /**
     * Fills the condition input field with the specified text
     * @param {string} conditionTxt - The condition text to enter
     * @param {number} nro - The index of the condition input (default: 0)
     */
    fillCondition(conditionTxt, nro=0){
        cy.get(selectors.condition_input).eq(nro).type(conditionTxt);
    }

    /**
     * Clear the condition input field with the specified text
     * @param {number} nro - The index of the condition input (default: 0)
     */
    clearCondition(nro=0){
        cy.get(selectors.condition_input).eq(nro).clear();
    }

    /**
     * Selects a destination option from the condition dropdown
     * @param {string} option - The option text to select
     * @param {number} nro - The index of the condition select (default: 0)
     */
    selectOptionDestination(option, nro=0) {
        cy.get(selectors.condition_select).eq(nro).within(() => {
            cy.get(selectors.selectField).click();
            cy.get(selectors.selectOptionView).invoke('show')
            cy.get(selectors.selectOptionList).contains(option).click();
        })
    }

    /**
     * Clicks the remove condition button for the specified condition
     * @param {number} nro - The index of the condition to remove (default: 0)
     */
    pressRemoveCondition(nro=0) {
        cy.get(selectors.removeCondition_button).eq(nro).scrollIntoView().should("be.visible").click();
    }

    /**
     * Clicks the duplicate button for the specified condition
     * @param {number} nro - The index of the condition to duplicate (default: 0)
     */
    pressDuplicateButton(nro=0) {
        cy.get(selectors.duplicateCondition_button).eq(nro).scrollIntoView().should("be.visible").click();
    }

    /**
     * Adds an external URL condition by filling the URL input field
     * @param {string} urlData - The URL to enter
     * @param {number} nro - The index of the condition (default: 0)
     */
    addExternalURLCondition(urlData, nro = 0) {
        cy.get(selectors.condition_select).eq(nro).scrollIntoView().should('be.visible')
        cy.get(selectors.externalURL_input).its('length').then((count) => {
            cy.get(selectors.externalURL_input).eq((count - 1 <= 0) ? 0 : count - 1).scrollIntoView().should('be.visible').type(urlData)
        });
    }

    /**
     * Selects a dashboard option from the custom dashboard dropdown
     * @param {string} dashboardName - The name of the dashboard to select
     * @param {number} nro - The index of the dashboard group (default: 0)
     */
    selectDashboardOption(dashboardName, nro = 0) {
        cy.get(selectors.customDashboard_group).eq(nro).scrollIntoView().within(() => {
            cy.get(selectors.selectField).eq(1).click();
            cy.get(selectors.selectOptionView).eq(1).invoke('show')
            cy.get(selectors.selectOptionList).contains(dashboardName).click();
        })
    }

    /**
     * Verifies that a condition box is visible on the page
     * @param {number} nro - The index of the condition to verify (default: 0)
     */
    verifyConditionIsVisible(nro = 0) {
        cy.get(selectors.conditionBox_group).eq(nro).should('be.visible');
    }

    /**
     * Verifies that the selected condition option matches the expected value
     * @param {string} $value - The expected text value to verify
     * @param {number} nro - The index of the condition select (default: 0)
     */
    verifyConditionOptionTaskDestination($value, nro = 0){
        cy.get(selectors.condition_select).eq(nro).within(() => {
            cy.get(selectors.selectOptionValue).should('have.text', $value);
        })
    }

    /**
     * Verifies that the dashboard field is visible within a condition box
     * @param {number} nro - The index of the condition box (default: 0)
     */
    verifyDasboardFieldIsVisible(nro=0){
        cy.get(selectors.conditionBox_group).eq(nro).within(() => {
            cy.get(selectors.customDashboard_select).within(() => {
                cy.get(selectors.selectOptionValue).eq(0).should('be.visible');
            })
        })
    }

    /**
     * Verifies that the dashboard field contains the expected value
     * @param {string} $value - The expected text value to verify
     * @param {number} nro - The index of the condition box (default: 0)
     */
    verifyDasboardFieldValue($value, nro = 0){
        cy.get(selectors.conditionBox_group).eq(nro).within(() => {
            cy.get(selectors.customDashboard_select).within(() => {
                cy.get(selectors.selectOptionValue).should('have.text', $value);
            })
        })
    }

    /**
     * Verifies that the external url field contains the expected value
     * @param {string} $value - The expected URL value to verify
     * @param {number} nro - The index of the condition box (default: 0)
     */
    verifyCustomURLValue($value, nro = 0) {
        cy.get(selectors.externalURL_input).eq(nro).should('have.value', $value)
    }

    /**
     * Verifies that the condition input field contains the expected text
     * @param {string} conditionTxt - The expected condition text to verify
     * @param {number} nro - The index of the condition input (default: 0)
     */
    verifyConditionField(conditionTxt, nro=0){
        cy.get(selectors.condition_input).eq(nro).should("have.value", conditionTxt);
    }

    /**
     * Verifies that the conditional redirect section is visible on the page
     */
    conditionRedirectSectionIsVisible(){
        cy.get(selectors.modelerConditionalSection).should('be.visible')
    }

    /**
     * Verifies that the remove condition button is visible
     * @param {number} nro - The index of the condition (default: 0)
     */
    removeButtonIsVisible(nro = 0){
        cy.get(selectors.removeCondition_button).eq(nro).scrollIntoView().should('be.visible');
    }

    /**
     * Verifies that the duplicate condition button is visible
     * @param {number} nro - The index of the condition (default: 0)
     */
    duplicateButtonIsVisible(nro = 0){
        cy.get(selectors.duplicateCondition_button).eq(nro).scrollIntoView().should('be.visible');
    }

    /**
     * Verifies that the Screen interstitial is visible
     */
    verifyScreenInterstitialIsVisible(){
        cy.get(selectors.screenInterstitialSection).should('be.visible')
    }

    /**
     * Verifies that the condition input field contains the expected text
     * @param {string} screenInterstitial - The expected condition text to verify the screen Interstitial selected
     */
    selectScreenInterstitial(screenInterstitial) {
        cy.get(selectors.screenInterstitialSection).scrollIntoView().within(() => {
            cy.get(selectors.selectField).click();
            cy.get(selectors.selectOptionView).invoke('show')
            cy.get(selectors.selectOptionList).contains(screenInterstitial).click();
        })
    }

    verifyScreenInterstitialValue(screenInterstitial) {
        cy.get(selectors.screenInterstitialSection).within(() => {
            cy.get(selectors.selectOptionValue).should('have.text', screenInterstitial);
        })
    }


}