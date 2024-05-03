import selectors from "#selectors/translations"
import { NavigationHelper } from "#helpers/navigationHelper";
import { Process } from "./process";

let navHelper = new NavigationHelper();
const process = new Process();
const screen2 = "Screen With Translations B";
const screen1 = "Screen With Translations A";
export class Translations {

    /**
     * This method is responsible to opens the Translations tab in the Configure of a process
     * @return nothing returns
     */
    clickOnTranslationsTab() {
        cy.get(selectors.translationsTab).should('be.visible').click();
    }

    /**
     * This method is responsible to click on +Translation button
     * @param languageSet: Name of the language to be used
     * @return nothing returns
     */
    clickOnTranslationsButton(){
        cy.get(selectors.createTranslationsBtn).click();
    }
    
    /**
     * This method is responsible to create a translation of a process
     * @param languageSet: Name of the language to be used
     * @return nothing returns
     */
    createTranslation(languageSet){
        cy.get(selectors.createTranslationsBtn).should("be.visible").click({force: true});
        cy.xpath('//div[@class="modal-body"]').should("be.visible");
        cy.get(selectors.selectLenguage).should("be.visible").click({force: true});
        cy.xpath("//label[text()='Select a target language']/parent::div//input").should("be.visible",{timeout: 2000})
        cy.xpath("//label[text()='Select a target language']/parent::div//input").type(languageSet+'{enter}',{delay:1000});
        cy.xpath(selectors.translateProcessBtn).should("be.visible").click({force: true}, {timeout: 2000});
        cy.xpath('//div[@id="createProcessTranslation___BV_modal_content_"]').should("be.visible",{timeout: 5000});
        cy.wait(5000);
    }

    /**
     * This method is responsible to verify the  created translation of a process
     * @param languageSet: Name of the language to be used
     * @return nothing returns
     */
    verifyCreation(languageSet){
        cy.xpath(selectors.translationsSearch).should("be.visible").type(languageSet);
        this.waitUntilTranslationComplete('selector','button [class="text-capitalize screen-toolbar-button"]');
        cy.get('#table-translations > tbody > tr:nth-child(1)').should("be.visible");
        cy.xpath(selectors.openTranslation.replace('language', languageSet)).should('be.visible').first().click({force: true});

        cy.xpath(selectors.translationScreenList).should("be.visible").click({force: true});        
        cy.xpath(selectors.optionListScreen.replace("ScreenOption",screen1)).should("be.visible").click({force: true});
        cy.xpath(selectors.AddressStingInPut).should('not.have.value', '');
        cy.xpath(selectors.AgeStingInPut).should('not.have.value', '');
        cy.xpath(selectors.NewDatePickerStingInPut).should('not.have.value', '');
        cy.xpath(selectors.NewSelectListStingInPut).should('not.have.value', '');
        cy.xpath(selectors.SubmitStingInPut).should('not.have.value', '');
    }

    /**
     * This method is responsible to create a translation of a process manually
     * @param languageSet: Name of the language to be used
     * @return nothing returns
     */
    createManualTranslation(languageSet){
        cy.get('.icon-lg').should('exist');
        cy.get(selectors.createTranslationsBtn).should("be.visible").click({force: true});
        cy.xpath('//div[@class="modal-body"]').should("be.visible", {timeout: 1000});
        cy.get(selectors.selectLenguage).should("be.visible").click({force: true});
        cy.xpath("//label[text()='Select a target language']/parent::div//input").should("be.visible").type(languageSet+'{enter}',{delay:500});
        cy.xpath(selectors.manualTranslateCheck).should("be.visible").click();
        cy.xpath(selectors.translateProcessBtn).should("be.visible").click();
        cy.get(selectors.loadingProcessSpinner).should('not.exist');
        cy.xpath(selectors.smallTextTranslation).should('be.visible');
        cy.xpath(selectors.translationScreenList).should("be.visible").click();
        cy.xpath(selectors.optionListScreen.replace("ScreenOption",screen1)).should("be.visible").click();
        cy.xpath(selectors.AddressStingInPut).type("Direccion");
        cy.xpath(selectors.AgeStingInPut).type("Edad");
        cy.get('[data-test="translation-string-list"] > tbody').scrollTo('bottomRight');
        cy.xpath(selectors.NewDatePickerStingInPut).type("Nuevo Selector de Fechas ");
        cy.xpath(selectors.NewSelectListStingInPut).type("Nueva Lista de Seleccion ");
        cy.xpath(selectors.SubmitStingInPut).type("Enviar ");
        cy.xpath(selectors.saveButtonManual).should('be.visible').click();
    }

    /**
     * This method is responsible to validate the created manual translation of a process
     * @param languageSet: Name of the language to be used
     * @return nothing returns
     */
    verifyCreationManual(languageSet){
        cy.xpath(selectors.translationsSearch).should("be.visible").type(languageSet,{delay:500});
        cy.xpath(selectors.openTranslation.replace('language', languageSet)).should('be.visible').first().click({force: true});
        cy.xpath(selectors.translationScreenList).click();
        cy.xpath(selectors.optionListScreen.replace("ScreenOption",screen1)).should("be.visible").click();
        cy.xpath(selectors.AddressStingInPut).should('not.have.value', '');
        cy.xpath(selectors.AgeStingInPut).should('not.have.value', '');
        cy.xpath(selectors.NewDatePickerStingInPut).should('not.have.value', '');
        cy.xpath(selectors.NewSelectListStingInPut).should('not.have.value', '');
        cy.xpath(selectors.SubmitStingInPut).should('not.have.value', '');
    }

    /**
     * This method is responsible to re-translate a translation of a process with a new control
     * @param languageSet: Name of the language to be used
     * @return nothing returns
     */
    translateControlAdded(languageSet){
        cy.xpath(selectors.translationsSearch).should("be.visible").type(languageSet,{delay:500});
        cy.xpath(selectors.openTranslation.replace('language', languageSet)).should('be.visible').first().click({force: true});
        cy.xpath(selectors.translationScreenList).should("be.visible").click();
        cy.xpath(selectors.optionListScreen.replace("ScreenOption",screen2)).should("be.visible").click();
        cy.xpath(selectors.TestForTranslationStingInPut).should('exist');
        cy.xpath(selectors.translationsOptions).should("be.visible").click();
        cy.xpath(selectors.radioTranslateEmpty).should("be.visible").click();
        cy.xpath(selectors.translateOptionsBtn).should("be.visible").click();
    }

    
    /**
     * This method is responsible to verify the translation of a created translation of a process with a new control
     * @param languageSet: Name of the language to be used
     * @return nothing returns
     */
    verifyTranslationControlAdded(languageSet){
        cy.xpath(selectors.translationsSearch).click().clear();
        cy.xpath(selectors.translationsSearch).should("be.visible").type(languageSet,{delay:100});
        cy.xpath(selectors.openTranslation.replace('language', languageSet)).should('be.visible').first().click({force: true});
        cy.xpath(selectors.translationScreenList).click();
        cy.xpath(selectors.optionListScreen.replace("ScreenOption",screen2)).should("be.visible").click({force: true});
        cy.xpath(selectors.TestForTranslationStingInPut).should('exist');
    }

    /**
     * This method is responsible to re-translate a translation of a process with a new control (Alternative)
     * @param languageSet: Name of the language to be used
     * @return nothing returns
     */
    translateControlAddedAlt(languageSet){
        cy.xpath(selectors.translationsSearch).should("be.visible").type(languageSet,{delay:100});
        cy.get(selectors.optionTranslationBtn).first().should("be.visible").click();
        cy.xpath(selectors.retryTranslationOption).should("be.visible").click();
        cy.wait(5000);
        cy.get('.pr-1').should("not.exist");
        cy.xpath(selectors.openTranslation.replace('language', languageSet)).should('be.visible').first().click({force: true});
        cy.xpath(selectors.translationScreenList).should("be.visible").click({force: true});
        cy.xpath(selectors.optionListScreen.replace("ScreenOption",screen2)).should("be.visible").click({force: true});
        cy.xpath(selectors.TestForTranslationStingInPut).should('exist');
    }

    /**
     * This method is responsible to modify a translation of a process 
     * @param languageSet: Name of the language to be used
     * @return nothing returns
     */
    modifyTranslationCreated(languageSet){
        cy.get('#createProcessTranslation___BV_modal_body_').should("be.visible");
        cy.xpath(selectors.AddressStingInPut).should("be.visible").type("Direccion test ");
        cy.xpath(selectors.AgeStingInPut).should("be.visible").type("Edad test");
        cy.xpath(selectors.NewDatePickerStingInPut).should("be.visible").type("Nuevo Selector de Fechas test ");
        cy.get('[data-test="translation-string-list"] > tbody').scrollTo('bottomRight');
        cy.xpath(selectors.NewSelectListStingInPut).should("be.visible").type("Nueva Lista de Seleccion test ");
        cy.xpath(selectors.SubmitStingInPut).should("be.visible").type("Enviar test", {delay:50});
        //Save Translation
        cy.xpath(selectors.saveButtonManual).should("be.visible").click({timeout: 1000});
        //Validate Changes.
        navHelper.navigateToProcessPage();
        let processName = "Process_with_translations";
        let option = "config";
        process.searchProcessAndSelectOptions(processName,option);
        this.clickOnTranslationsTab();
        cy.xpath(selectors.openTranslation.replace('language', languageSet)).should('be.visible').first().click({force: true});
        cy.xpath(selectors.translationScreenList).should("be.visible").click({force: true});
        cy.xpath(selectors.optionListScreen.replace("ScreenOption",screen1)).click({force: true});
        cy.xpath(selectors.AddressStingInPut).should('have.value', 'Direccion test');
        cy.xpath(selectors.AgeStingInPut).should('have.value','Edad tes');
        cy.xpath(selectors.NewDatePickerStingInPut).should('have.value', 'Nuevo Selector de Fechas test');
        cy.get('[data-test="translation-string-list"] > tbody').scrollTo('bottomRight');
        cy.xpath(selectors.NewSelectListStingInPut).should('have.value', 'Nueva Lista de Seleccion test');
        cy.xpath(selectors.SubmitStingInPut).should('have.value', 'Enviar tes');
    }

    /**
     * This method is responsible to re-translate a translation of a process with modifications
     * @param languageSet: Name of the language to be used
     * @return nothing returns
     */
    overwriteTranslationCreated(languageSet){
        cy.get('#createProcessTranslation___BV_modal_body_').should("be.visible");
        cy.xpath(selectors.translationsOptions).should("be.visible").click();
        cy.xpath(selectors.radioTranslateAll).should("be.visible").click();
        cy.xpath(selectors.translateOptionsBtn).should("be.visible").click();
        cy.reload();
        this.clickOnTranslationsTab();
        cy.wait(5000);
        cy.get(':nth-child(15) > [data-layer="Content"]').should("not.exist");
        cy.xpath(selectors.translationsSearch).should("be.visible").type(languageSet,{delay:1000});
        cy.xpath(selectors.openTranslation.replace('language', languageSet)).should('be.visible').first().click({force: true});
        cy.xpath(selectors.translationScreenList).should("be.visible").click({force: true});
        cy.xpath(selectors.optionListScreen.replace("ScreenOption",screen1)).click();
        cy.xpath(selectors.AddressStingInPut).should('not.have.value', 'Direccion test');
        cy.xpath(selectors.AgeStingInPut).should('not.have.value', 'Edad tes');
        cy.xpath(selectors.NewDatePickerStingInPut).should('not.have.value', 'Nuevo Selector de Fechas test');
        cy.xpath(selectors.NewSelectListStingInPut).should('not.have.value', 'Nueva Lista de Seleccion test');
        cy.xpath(selectors.SubmitStingInPut).should('not.have.value', 'Enviar tes');
    }

    /**
     * This method is responsible to save and exit of a translation of a process
     * @param languageSet: Name of the language to be used
     * @return nothing returns
     */
    saveAndQuit(){
        cy.xpath(selectors.saveButtonManual).click();
    }

    /**
     * This method is responsible to delete a translation of a process
     * @param languageSet: Name of the language to be used
     * @return nothing returns
     */
    deleteTranslation(languageSet){
        cy.get(selectors.optionTranslationBtn).first().should('be.visible').click();
        cy.get('[class="dropdown-menu dropdown-menu-right show"]').should('be.visible');
        cy.xpath(selectors.deleteOption).should('be.visible').click();
        cy.xpath(selectors.confirmDeleteBtn).should('be.visible').click();
        cy.xpath(selectors.translationsSearch).should('be.visible').click();
        cy.reload();
        cy.xpath(selectors.translationsSearch).should('be.visible').click().type(languageSet);
        cy.xpath(selectors.openTranslation).should('not.exist');
    }

    /**
     * This method is responsible to cancel a translation of a process in progress
     * @param languageSet: Name of the language to be used
     * @return nothing returns
     */
    cancelTranslation(languageSet){
        cy.xpath(selectors.translationsSearch).should('be.visible').click();
        cy.xpath(selectors.translationsSearch).type(languageSet);
        cy.get(selectors.progressTranslateBtn).first().click();
        cy.xpath(selectors.cancelTranslationOption).click();
        cy.xpath(selectors.confirmDeleteBtn).click();
    }

    /**
     * This method is responsible to verify the cancelation of a translation of a process
     * @param languageSet: Name of the language to be used
     * @return nothing returns
     */
    verifyCancelation(languageSet){
        cy.xpath(selectors.translationsSearch).clear();
        cy.xpath(selectors.translationsSearch).type(languageSet);
        cy.xpath(selectors.openTranslation.replace('language', languageSet)).should('be.visible').first().click({force: true});
        cy.xpath(selectors.translationScreenList).click();
        cy.get(selectors.optionListScreen.replace("ScreenOption",screen2)).click();
        cy.xpath(selectors.EmailStingInPut).should('have.value', '');
        cy.xpath(selectors.FinishStingInPut).should('have.value', '');
    }

    /**
     * This method is responsible to search a specific translation 
     * @param languageSet: Name of the language to be used
     * @return nothing returns
     */
    searchTranslation(languageSet){
        cy.xpath(selectors.translationsSearch).should('be.visible').type(languageSet, {delay:500});
    }

    /**
     * This method is responsible to verify if the pre-conditions are meet before the automation
     * @param languageSet: Name of the language to be used
     * @return nothing returns
     */
    verifyPrecondition(languageSet){
        cy.get('body').then($body => {
            if($body.find(selectors.languageTranslationTable).length){
                this.deleteTranslation(languageSet);
            }
            
        });
    }
 
    waitUntilTranslationComplete(type,translation,maxAttempts=15, attempts=0){
        if (attempts > maxAttempts) {
            throw new Error("Timed out waiting for report to translate");
        }
        if(type === 'selector'){
            cy.wait(4000);
            cy.xpath('//body')
                .then($body => {
                    if ($body.find(translation).length <= 0) {
                        this.waitUntilTranslationComplete(type,translation,maxAttempts, attempts+1);
                    }
                })
        }
    }
}
