import selectors from "#selectors/flowGenie";
import { NavigationHelper } from "#helpers/navigationHelper";
const navHelper = new NavigationHelper();

export class FlowGenie {

    //New FlowGenie from designer
    FlowGenieFromDesigner() {
        cy.get('[class="fas fa-magic"]').should('exist');
        cy.get(selectors.assetCard).trigger("mouseover", { force: true });
        cy.get(selectors.buttonNewFlowGenie).should('exist').click();
        cy.visit('designer/flow-genies?create=true'); 
    }
    
    //View List FlowGenie from designer
    FlowGenieListFromDesigner() {
        cy.get('[class="fas fa-magic"]').should('exist');
        cy.get(selectors.assetCard).trigger("mouseover", { force: true });    
        cy.get(selectors.buttonViewList).should('exist').click();            
        cy.get(selectors.tabFlowGenie).should('exist');
    }

    //Create New FlowGenie
    CreateFlowGenie(nameFlowGenie, description) {   
        this.ClickAddFlowGenie();     
        cy.get(selectors.modalNewFlowGenie).should('be.visible');
        cy.get(selectors.inputNameFlowGenie).type(nameFlowGenie,{timeout: 200});
        cy.get(selectors.textareaDescription).type(description, {timeout: 200});
        cy.wait(2000);
        this.ClickSaveFlowGenie();
        //cy.contains(selectors.flowGenieStudio,'FlowGenie Studio').should('be.visible');
    }
    //+New FlowGenie
    ClickAddFlowGenie(){
        cy.get(selectors.addFlowGenie).should('be.visible').click();
    }
    
    //Save FlowGenie
    ClickSaveFlowGenie(){
        cy.xpath(selectors.saveFlowGenie).should('be.visible').click({force: true}, {timeout: 500});
    }
      
    //Search FlowGenie and select options
    searchFlowGenieAndSelectOptions(nameFlowGenie, option) {
        this.SearchFlowGenie(nameFlowGenie);
        cy.get(selectors.loading).should("not.be.visible");
        cy.get(selectors.buttonOptions).first().click();
        switch (option) {
            case "edit":
                this.clickOnEditFlowGenie();
                break;
            case "copy":
                this.clickOnCopyFlowGenie();
                break;
            case "export":
                this.clickOnExportFlowGenie();
                break;
            case "delete":
                this.clickOnDeleteFlowGenie();
                break;
        }
    }
    //Option Edit
    clickOnEditFlowGenie(){
        cy.xpath(selectors.editFlowGenie).first().should('be.visible').click();
    }

    //Option Copy
    clickOnCopyFlowGenie(){
        cy.xpath(selectors.copyFlowGenie).first().should('be.visible').click();
    }
    //Option Delete
    clickOnDeleteFlowGenie(){
        cy.xpath(selectors.deleteFlowGenie).first().should('be.visible').click();
        cy.get(selectors.modalNewFlowGenie).should('be.visible');
        cy.get(selectors.confirmDelete).should('be.visible').click();
    }
    //Option Export
    clickOnExportFlowGenie(){
        cy.xpath(selectors.exportFlowGenie).first().should('be.visible').click();
    }
    //Search FlowGenie
    SearchFlowGenie(nameFlowGenie){
        cy.get(selectors.searchBox).should('be.visible').click();
        cy.get(selectors.searchBox).type(nameFlowGenie,{delay: 100}).should('have.value',nameFlowGenie);
    }

    copyFlowGenie(nameFlowGenie, newNameFlowGenie) {
        this.searchFlowGenieAndSelectOptions(nameFlowGenie, 'copy');
        cy.xpath(selectors.modalCopy).should('be.visible');
        cy.get('#name').clear().type(newNameFlowGenie, { delay: 60 }).should('have.value', newNameFlowGenie);
        this.ClickSaveFlowGenie();
    }

    //Presence and create FlowGenie
    verifyPresenceFlowGenieAndCreate(nameFlowGenie, description) {
        cy.get(selectors.buttonOptions).should("be.visible");
        this.SearchFlowGenie(nameFlowGenie);
        cy.wait(4000);
        cy.get(selectors.loading).should("not.be.visible");
        cy.get(selectors.tableBody, { timeout: 10000 }).then($rowsTable => {
            if($rowsTable.find("td").length ===1 ){
                this.CreateFlowGenie(processName, description);
            }
        });
    }

    //Verify and import FlowGenie

    //Create Category FlowGenie

    //From modeler
    //Create New FlowGenie form modeler
    CreateFlowGenieFromModeler(nameFlowGenie, description) {
        cy.iframe('[id="alternative_a"]').find('[class="asset-link"]').click();
        cy.visit('designer/flow-genies?create=true&screenSelectId=undefined');        
        cy.get(selectors.modalNewFlowGenie).should('be.visible');
        cy.get(selectors.inputNameFlowGenie).type(nameFlowGenie);
        cy.get(selectors.textareaDescription).type(description);
        cy.wait(1000);
        this.ClickSaveFlowGenie();
        cy.contains(selectors.flowGenieStudio,'FlowGenie Studio').should('be.visible');
    }

    //Configuration task FlowGenie

}    