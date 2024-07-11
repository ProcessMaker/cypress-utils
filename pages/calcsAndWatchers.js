import selectors from "#selectors/calcsAndWatchers";
import { NavigationHelper } from "#helpers/navigationHelper";
const navHelper = new NavigationHelper();

export class CalcsAndWatchers {
    //CALCS
    clickOnCalcsBtn() {
        cy.get(selectors.calcsBtn).click();
    }

    clickOnAddCalcsBtn() {
        cy.get(selectors.addCalcsBtn).should('be.visible');
        cy.get(selectors.addCalcsBtn).click({ force: true });
    }

    //Modal calcs list
    searchCalcs(calcsName) {
        cy.get(selectors.searchCalcs).should('be.visible');
        cy.get(selectors.searchCalcs).clear();
        cy.get(selectors.searchCalcs).type(calcsName, { delay: 60 }).type('{enter}').should('have.value', calcsName);
    }

    searchCalcInList(calcsName) {
        this.clickOnCalcsBtn();
        this.searchCalcs(calcsName);
    }

    createCalc(calcName,description,option,value) {
        this.clickOnAddCalcsBtn();
        this.fillPropertyNameInCalcs(calcName);
        this.fillDescriptionInCalcs(description);
        this.fillFormula(option,value);
        this.clickOnSaveCalcsBtn();
    }

    fillPropertyNameInCalcs(propertyName) {
        cy.get(selectors.propertyNameField).should('be.visible');
        cy.get(selectors.propertyNameField).type(propertyName).should('have.value',propertyName);
    }    

    fillDescriptionInCalcs(description) {
        cy.get(selectors.descriptionField).should('be.visible');
        cy.get(selectors.descriptionField).type(description).should('have.value',description);
    }  

    fillFormula(option,value) {
        switch (option) {
            case "formula":
                cy.get(selectors.formulaBtn).click();
                cy.get(selectors.formulaField).type(value).should('have.value',value);
                break;
            case "javascript":
                cy.get(selectors.javaScriptBtn).click();
                cy.get(selectors.javaScriptField).type(value);
                break;
            default:
                break;
        }
    }

    clickOnSaveCalcsBtn(){
        cy.get(selectors.saveCalcsBtn).click();
    }

    clickOnEditCalcBtn() {
        cy.get(selectors.editCalcsBtn).should('be.visible')
        cy.get(selectors.editCalcsBtn).click({force:true});
    }

    clickBypassCalcBtn() {
        cy.get(selectors.bypassCalcsBtn).should('be.visible')
        cy.get(selectors.bypassCalcsBtn).check({force:true});
    }

    clickDeleteCalcBtn() {
        cy.get(selectors.deleteCalcsBtn).should('be.visible')
        cy.get(selectors.deleteCalcsBtn).click();
    }

    editCalcName(newCalcName) {
        cy.get(selectors.propertyNameField).click().clear();
        this.fillPropertyNameInCalcs(newCalcName);
    }

    editCalcDescription(newDescription) {
        cy.get(selectors.descriptionField).click().clear();
        this.fillDescriptionInCalcs(newDescription);
    }

    editCalcFormula(option,newValue) {
        cy.get(selectors.formulaField).click().clear();
        this.fillFormula(option,newValue);
    }

    editCalcInModal(optionConfig){
        const { optionToEdit, calcName,calcDescription,option,newValue} = optionConfig
        this.clickOnEditCalcBtn();
        switch (optionToEdit) {
            case "name":
                this.editCalcName(calcName);
                break;
            case "description":
                this.editCalcDescription(calcDescription);
                break;
            case "formula":
                this.editCalcFormula(option,newValue) 
                break;
        }
    }

    enableBypassInCalcs(){
        cy.get(selectors.bypassCalcsBtn).should('be.visible')
        cy.get(selectors.bypassCalcsBtn).check({force:true});
    }

    disableBypassInCalcs(){
        cy.get(selectors.bypassCalcsBtn).should('be.visible')
        cy.get(selectors.bypassCalcsBtn).uncheck({force:true});
    }

    searchCalcAndSelectOption(calcName, option, optionConfig) {
        this.searchCalcs(calcName);
        switch (option) {
            case "edit":
                this.editCalcInModal(optionConfig);
                break;
            case "Enablebypass":
                this.enableBypassInCalcs();
                break;
            case "Disablebypass":
                this.disableBypassInCalcs();
                break;
            case "delete":
                this.clickDeleteCalcBtn();
                break;
            default:
                break;
        }
    }

   dragItem(idSource, IdTarget) {
        const dataTransfer = new DataTransfer;
        cy.get(`[data-test="item-${idSource}"]`)
            .trigger('dragstart', { dataTransfer })
        cy.get(`[data-test="item-${IdTarget}"]`)
            .trigger('dragenter')
            .trigger('dragover', { dataTransfer })
            .trigger('drop', { dataTransfer })
        cy.get(`[data-test="item-${idSource}"]`)
            .trigger('dragend')
    }

    closeModal(){
        cy.get(selectors.closeModal).click();
    }
}