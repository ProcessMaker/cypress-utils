import { ConditionalRedirectPage } from "../pages/conditionalRedirectPage"; 
const crPage = new ConditionalRedirectPage()

export class ConditionalRedirectModel {

    /**
     * Selects and fills a conditional redirect, verifies fields, and applies destination settings.
     * @param dataConditionalRedirects - Object Data used to configure the conditional redirect. 
     * example 1: {"condition":"test1 == 20", "option":"External URL", "nroGroup":0, "dataUrl":"https://www.processmaker.com", urlField = 0},
     * example 2: {"condition":"test3 == 3", "option":"Custom Dashboard", "nroGroup":1, "dataDashboard":"DEFAULT_WELCOME_DASHBOARD"},
     * example 3: {"condition":"test1 < 0", "option":"Task List", "nroGroup":2},
     * example 4: {"condition":"test1 < 2 && test2 = 2", "option":"Display Next Assigned Task", "nroGroup":6, "dataScreenInterstitial":"Screen Interstitial"}
     */
    selectAndFillCondition(dataConditionalRedirects){
        crPage.clearCondition(dataConditionalRedirects.nroGroup)
        crPage.fillCondition(dataConditionalRedirects.condition, dataConditionalRedirects.nroGroup)
        crPage.verifyConditionField(dataConditionalRedirects.condition, dataConditionalRedirects.nroGroup)
        crPage.selectOptionDestination(dataConditionalRedirects.option, dataConditionalRedirects.nroGroup)
        crPage.verifyConditionOptionTaskDestination(dataConditionalRedirects.option, dataConditionalRedirects.nroGroup)
        switch(dataConditionalRedirects.option){
            case "Custom Dashboard":
                crPage.selectDashboardOption(dataConditionalRedirects.dataDashboard, dataConditionalRedirects.nroGroup)
                crPage.verifyDasboardFieldValue(dataConditionalRedirects.dataDashboard, dataConditionalRedirects.nroGroup)
                break;
            case "External URL":
                crPage.addExternalURLCondition(dataConditionalRedirects.dataUrl, dataConditionalRedirects.nroGroup)
                crPage.verifyCustomURLValue(dataConditionalRedirects.dataUrl, dataConditionalRedirects.urlField)
                break;
            case "Display Next Assigned Task":
                crPage.verifyScreenInterstitialIsVisible();
                if(dataConditionalRedirects.dataScreenInterstitial != "Screen Interstitial")
                    crPage.selectScreenInterstitial(dataConditionalRedirects.dataScreenInterstitial)
                crPage.verifyScreenInterstitialValue(dataConditionalRedirects.dataScreenInterstitial)
                
                break;
            default:
                cy.log("complete condition");
        }
    }

    /**
     * Enables the Conditional Redirect feature on the page.
     * This method makes the conditional redirect section visible and enables the checkbox.
     */
    activeConditionalRedirect(){
        crPage.conditionRedirectSectionIsVisible()
        crPage.enableConditionRedirectCheckbox()
    }

    /**
     * Disables the Conditional Redirect feature on the page.
     * This method makes the conditional redirect section visible and disables the checkbox.
     */
    unCheckConditionalRedirect(){
        crPage.conditionRedirectSectionIsVisible()
        crPage.disableConditionRedirectCheckbox();
    }

    /**
     * Clicks the button to add a new conditional redirect row.
     * This method verifies the add condition button is visible and then clicks it to create a new row.
     */
    pressAddConditionRedirectButton(){
        crPage.verifyAddConditionButton()
        crPage.pressAddConditionButton()
    }
    
    /**
     * Removes a conditional redirect row by index.
     * This method verifies the remove button is visible for the specified row and then clicks it to delete the condition.
     * @param {number} [nro=0] - Index of the condition to remove.
     */
    pressRemoveCondition(nro=0){
        crPage.removeButtonIsVisible(nro)
        crPage.pressRemoveCondition(nro)
    }

    /**
     * Duplicates a conditional redirect row by index.
     * This method verifies the duplicate button is visible for the specified row and then clicks it to create a copy of the condition.
     * @param {number} [nro=0] - Index of the condition to duplicate.
     */
    pressDuplicateCondition(nro=0){
        crPage.duplicateButtonIsVisible(nro)
        crPage.pressDuplicateButton(nro)
    }

    /**
     * Opens the list of task destination options.
     * This method opens the dropdown list that contains all available task destination options for conditional redirects.
     */
    openListTaskDestination(){
        crPage.openListOptions()
    }
}