import selectors from "#selectors/naturalLanguage"
import pageConstants from "#helpers/pageConstants";
import promisify from 'cypress-promise'
import { th } from "date-fns/locale";

export class NaturalLanguage {
    clickOnAIProcess(){
        cy.xpath(selectors.aiProcessBtn).click();
    }

    clickOnDescription(){
        cy.get(selectors.descriptionNL).click()
    }

    setDataOnDescription(descriptionData){
        cy.get('[class="tox-edit-area__iframe"]').then(($iframe) => {
            const $body = $iframe.contents().find('body');
            cy.wrap($body).find('p').type(descriptionData,{delay:500});
        });
    }

    clickOnGenerate(){
        cy.get(selectors.generateBTtnNL).should('be.visible').click({timeout: 5000});
    }

    createSimpleProcess(descriptionData){
        cy.get(selectors.aiIcon).should('exist');
        this.clickOnDescription();
        this.setDataOnDescription(descriptionData);
        cy.wait(500);
        this.clickOnGenerate();
        cy.get(selectors.aiIcon).should('not.exist');
        cy.get('.spinner-border').should('exist');        
        this.waitUntilUseModalIsVisible('selector', '[data-test="use-model-button"]');
        cy.get('.spinner-border').should('not.exist');
        cy.get(selectors.useModelBtn).should('exist');
        cy.get('[data-test="generate-button"]').should('be.visible');
    }

    waitUntilUseModalIsVisible(type,modalButton,maxAttempts=15, attempts=0){
        if (attempts > maxAttempts) {
            throw new Error("Timed out waiting for report to be generated");
        }
        if(type === 'selector'){
            cy.wait(4000);
            cy.xpath('//body')
                .then($body => {
                    if ($body.find(modalButton).length <= 0) {
                        this.waitUntilUseModalIsVisible(type,modalButton,maxAttempts, attempts+1);
                    }
                })
        }
    }
    regenerateProcess(additionalDescriptionData){
        this.setDataOnDescription(additionalDescriptionData);
        this.clickOnGenerate();
        cy.get('[class="d-flex justify-content-center h-100 align-items-center spinner"]').should('be.visible');
        cy.get(selectors.aiIcon).should('not.exist');
        cy.get('.spinner-border').should('exist');        
        this.waitUntilUseModalIsVisible('selector', '[data-test="use-model-button"]');
        cy.get('.spinner-border').should('not.exist');
        cy.get(selectors.useModelBtn).should('exist');
        cy.get('[data-test="generate-button"]').should('be.visible');
    }

    clickOnHistory(){
        cy.xpath('//*[contains(text(),"History")]').should('be.visible');
        cy.get(selectors.historyTab).click();
        cy.get('[data-test="history-list"]').should('be.visible');
    }

    clickOnSecondHistoryListed(){
        cy.get('[data-test="history-list"]').should('be.visible');
        cy.get(selectors.historySecondListed).should('be.visible').click();
    }

    clickOnProcessDetails(){
        cy.wait(2000);
        cy.get(selectors.processDetailsTab).click();
    }

    regenerateProcessAlt(additionalDescriptionData){
        this.clickOnHistory();
        this.clickOnSecondHistoryListed();
        this.clickOnProcessDetails();
        this.regenerateProcess(additionalDescriptionData);
        cy.get(selectors.useModelBtn).should('exist');
    }

    validateHistoryExistence(descriptionData,additionalDescriptionData){
        cy.get('body').then($body => {
            if($body.find(selectors.historyTabDisabled).length){
                this.createSimpleProcess(descriptionData);
                cy.wait(2000);
                this.regenerateProcess(additionalDescriptionData);
            }
        });
    }

    preConditionHistory(){
        cy.get('body').then($body => {
            if($body.find(selectors.historyTabDisabled).length){
            }else{
                this.clickOnHistory();
                this.clickOnClearHistory();
                cy.wait(5000);
            }
        });
    }
    
    clickOnClearHistory(){
        cy.get(selectors.clearHistory).click();
        cy.xpath('//*[contains(text(),"Caution")]').should('be.visible');
        cy.get(selectors.confirmBtnNL).should('be.visible').click();
        cy.get(selectors.historyTabDisabled).should('exist');
    }

    clickOnUseModel(processName){
        cy.get(selectors.useModelBtn).click();
        cy.get('[class="modal-header"]').should('be.visible');
        cy.get('input[name="name"]').click().clear();
        cy.wait(1000);
        cy.get('input[name="name"]').should('be.visible').type(processName, {delay:100});
        cy.xpath(selectors.saveBtn).should('be.visible').click();
    }

    uploadImage(file){
        cy.get('input[type="file"]').attachFile(file,{timeout: 5000});
        cy.get('[class="image-action"] [class="fas fa-redo p-2"]').should('exist');
        cy.get('[class="image-action mr-1"] [class="fas fa-search-plus p-2"]').should('be.visible');
        cy.get('.preview-file-img > img').should('be.visible',{timeout: 5000});
        cy.wait(2000);
    }

    generateProcessFromImage(){
        cy.get('[class="icon-wrapper p-1 mx-3"]').should('exist');
        cy.get('.btn-outline-secondary').should('be.visible',{timeout: 1000});
        cy.xpath("//button[contains(text(),'Generate')]").should('be.visible').click({timeout: 5000});
        cy.get('[role="progressbar"]').should('be.visible');
        this.waitUntilUseModalIsVisible('selector', '[data-test="textarea-prompt"]'); 
        this.waitUntilUseModalIsVisible('selector', '[class="d-flex"]');
        cy.get('.prev-btn').should('be.visible');
    }

    waitUntilElementIsVisible(type, selectorXPath, maxAttempts = 15, attempts = 0) {
        if (attempts > maxAttempts) {
            throw new Error("Timed out waiting for report to be generated");
        }
        if (type === 'selector') {
            cy.wait(4000);
            cy.get('body')
                .then($body => {
                    if ($body.find(selectorXPath).length <= 0) {
                        this.waitUntilElementIsVisible(type, selectorXPath, maxAttempts, attempts + 1);
                    }
                })
        }

    }
    clickUseModelFromModeler(processName){
        cy.get(selectors.useModelBtn).click();
        cy.get('textarea[class="m-0 border-0 form-control"]').should('be.visible').type(processName, {delay:50});
        cy.get('button[class="px-4 btn btn-primary text-uppercase"]').should('be.visible').click();
    }
}
