import selectors from "#selectors/documentingProcess";
import { NavigationHelper } from "#helpers/navigationHelper";
const navHelper = new NavigationHelper();

export class DocumentingProcess {

    //Form modeler add documentation
    objectDocumentation(elementName,elementXpath,documentation){
        cy.xpath(elementXpath.replace('nameElem',elementName)).first().should('be.visible').click();
        cy.get('[data-cy="inspector-button"]').should('be.visible').click();
        cy.get(selectors.docButton).click();
        cy.get(selectors.docIframe).then(($iframe) => {
            const $body = $iframe.contents().find('body');
            cy.wrap($body).find('p').clear();
        });
        cy.get(selectors.docIframe).then(($iframe) => {
            const $body = $iframe.contents().find('body');
            cy.wrap($body).find('p').type(documentation);
        });
        cy.get('[data-cy="inspector-close-button"]').click().wait(5000);
    }

    //Open alternative A/B in documenting 
    openAlternativeInDocumenting(alternative = "A") {
        cy.url().then(($url) => {
            let processID = $url.split("/")[4].trim();
            cy.visit("/modeler/" + processID + "/documentation/" + alternative + "?generated=false");
        });
    }

    //Go to Documentation from modeler
    goToDocumentationFromModeler() {
        cy.get(selectors.options).first().should('exist').click();
        cy.get(selectors.opDumentation).should('be.visible').click();
    }

    //Click on Document with AI
    documentWithAI(){
        cy.get(selectors.docWithAI).first().should('exist').click();
        cy.xpath(selectors.modalGenerate).should('be.visible');
    }

    //Select Generate Documentation from Scratch button
    optionGenerateDoc(){
        cy.xpath(selectors.generateDocBtn).should('be.visible').click();
    }

    //Select option Use current Documentation button
    optionCurrentDoc(){
        cy.xpath(selectors.useCurrentDocBtn).should('be.visible').click();
    }

    //Select option Cancel button
    cancelBtn(){
        cy.get(selectors.cancelBtn).should('be.visible').click();
    }

    //Edit description on card before and after use AI document

    //Click on Apply changes
    applyChanges(){
        cy.get(selectors.applyChangesBtn).should('be.visible').click();
    }

    //Click on cancel Suggestion
    cancelSuggestion(){
        cy.get(selectors.cancelSuggestionBtn).should('be.visible').click();
    }

    //Confirm action
    confirmAction(){
        cy.get(selectors.confirmActionBtn).should('be.visible').click();
    }

    //Generate Documentation Apply and Confirm
    generateDocApplyAndConfirm(){
        this.applyChanges();
        cy.get('[class="modal-body"]').should('be.visible');
        this.confirmAction();

    }

    //Click on Complete Documentation
    completeDoc(){
        cy.get(selectors.confirmActionBtn).should('be.visible').click();
    }

    //Loading...
    loadingDoc(){
        cy.get(selectors.loading).should("be.visible");
        cy.wait(5000);
        cy.get(selectors.loading).should("not.be.visible");
    }
        
        
}    