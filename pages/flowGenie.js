import selectors from "#selectors/flowGenie";
import { NavigationHelper } from "#helpers/navigationHelper";
const navHelper = new NavigationHelper();

export class FlowGenie {

    //New FlowGenie from designer
    FlowGenieFromDesigner() {
        cy.get('[class="fas fa-magic"]').should('exist');
        cy.get(selectors.assetCard).trigger("mouseover", { force: true });
        cy.get(selectors.buttonNewFlowGenie)
            .should('exist')
            .click();
        cy.visit('designer/flow-genies?create=true'); 
    }
    
    //View List FlowGenie from designer
    FlowGenieListFromDesigner() {
        cy.get('[class="fas fa-magic"]').should('exist');
        cy.get(selectors.assetCard).trigger("mouseover", { force: true });    
        cy.get(selectors.buttonViewList)
            .should('exist')
            .click();            
        cy.get(selectors.tabFlowGenie).should('exist');
    }

    //Create New FlowGenie from list
    CreateFlowGenie(nameFlowGenie,description, category = "") {   
        this.ClickAddFlowGenie();     
        cy.get(selectors.modalNewFlowGenie).should('be.visible');
        cy.get(selectors.inputNameFlowGenie).type(nameFlowGenie,{timeout: 200});
        cy.get(selectors.textareaDescription).type(description, {timeout: 200});
        if (category != "") this.enterFlowGenieCategory(category);
        cy.wait(2000);
        cy.get('[class="btn ml-2 btn-outline-secondary"]').should('be.visible');
        this.ClickSaveFlowGenie();
        cy.contains(selectors.flowGenieStudio,'FlowGenie Studio').should('be.visible');
    }
    //+New FlowGenie
    ClickAddFlowGenie(){
        cy.get(selectors.addFlowGenie)
            .should('be.visible')
            .click();
    }
    
    //Save FlowGenie and Save settings FlowGenie
    ClickSaveFlowGenie(){
        cy.xpath(selectors.saveFlowGenie)
            .should('be.visible')
            .click({force: true});
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
        cy.xpath(selectors.editFlowGenie)
            .first()
            .should('be.visible')
            .click();
    }

    //Option Copy
    clickOnCopyFlowGenie(){
        cy.xpath(selectors.copyFlowGenie)
            .first()
            .should('be.visible')
            .click();
    }
    //Option Delete
    clickOnDeleteFlowGenie(){
        cy.xpath(selectors.deleteFlowGenie)
            .first()
            .should('be.visible')
            .click();
        cy.get(selectors.modalNewFlowGenie).should('be.visible');
        cy.get(selectors.confirmDelete)
            .should('be.visible')
            .click();
    }
    //Option Export
    clickOnExportFlowGenie(){
        cy.xpath(selectors.exportFlowGenie)
            .first()
            .should('be.visible')
            .click();
    }
    //Search FlowGenie
    SearchFlowGenie(nameFlowGenie){
        cy.get(selectors.searchBox)
            .first()
            .should('be.visible')
            .click();
        cy.get(selectors.searchBox)
            .first()
            .type(nameFlowGenie,{delay: 100})
            .should('have.value',nameFlowGenie);
    }

    //Complete the data for a copied genie
    copyFlowGenie(nameFlowGenie, newNameFlowGenie) {
        this.searchFlowGenieAndSelectOptions(nameFlowGenie, 'copy');
        cy.xpath(selectors.modalCopy).should('be.visible');
        cy.get('#name')
            .clear()
            .type(newNameFlowGenie, { delay: 60 })
            .should('have.value', newNameFlowGenie);
        this.ClickSaveFlowGenie();
    }

    //Presence and create FlowGenie
    verifyPresenceFlowGenieAndCreate(nameFlowGenie, description) {
        cy.get(selectors.buttonOptions).should("be.visible");
        this.SearchFlowGenie(nameFlowGenie);
        cy.get(selectors.loading).should("not.be.visible");
        cy.xpath(selectors.tableBody, { timeout: 10000 })
        .then($rowsTable => {
            if($rowsTable.find("tbody").length <= 0){
                this.CreateFlowGenie(nameFlowGenie, description);
            }
        });
    }

    //Settings for flowGenie
    //Select Response format
    selectResposeFormat(responseFormat){
        cy.xpath("//label[contains(text(),'Response Format')]").should('be.visible');
        cy.get('select')
            .first()
            .select(responseFormat)
            .should('have.value', responseFormat);
    }

    //Cancel FlowGenie
    ClickCancelFlowGenie(){
        cy.xpath(selectors.cancelFlowGenie)
            .should('be.visible')
            .click({force: true});
    }

    //Run FlowGenie
    ClickRunBtn(){
        cy.xpath(selectors.runBtn)
            .should('be.visible')
            .click({force: true});
    }

    //Add FlowGenie
    ClickAddBtn(){
        cy.xpath(selectors.addBtn)
            .should('be.visible')
            .click({force: true});
    }

    //Add text in Chat
    addMessageSystem(messageS){
        cy.get(selectors.systemMessage).type(messageS, {delay: 50});
    }

    //Add User text
    addUserText(messageU){
        cy.get(selectors.usertext).type(messageU, {delay: 50});
    }

    //add message in OpenAi Chat
    addMessageText(messageS,messageU){
        this.addMessageSystem(messageS);
        this.addUserText(messageU);
        this.ClickAddBtn();
        cy.get(selectors.textAreaInsideChat).should('be.visible');
    }
    //Funtion for Attach Menu
    attachMenuFile(option,file) {
        cy.get(selectors.attachFileBtn).should('be.visible').click();
        switch (option) {
            case "image":
                this.attachImage(file);
                break;
            case "pdf":
                this.attachPdf(file);
                break;
            case "csv":
                this.attachCsv(file);
                break;
            case "url":
                this.attachUrl(file);
                break;
        }
    }

    //Option Image
    attachImage(file){
        cy.xpath("//span[contains(text(),'Image')]").should('exist');
        cy.get(selectors.fileOption).eq(0).attachFile(file,{timeout: 10000});
        cy.wait(1000);
        this.ClickAddBtn();
    }
    //Option Pdf
    attachPdf(file){
        cy.xpath("//span[contains(text(),'PDF')]").should('exist');
        cy.get(selectors.fileOption)
            .eq(1)
            .attachFile(file,{timeout: 10000});
        cy.wait(2000);
        this.ClickAddBtn();
    }
    //Option CSV
    attachCsv(file){
        cy.xpath("//span[contains(text(),'CSV')]").should('exist');
        cy.get(selectors.fileOption)
            .eq(2)
            .attachFile(file,{timeout: 15000});
        cy.wait(1000);
        this.ClickAddBtn();
    }

    //Option Url Link
    attachUrl(file){
        cy.xpath("//button[contains(text(),'URL Link')]").should('exist').click();
        cy.get(selectors.urlInput).type(file,{timeout: 50});
        cy.wait(2000);
        this.ClickAddBtn();
    }

    //Delete nessages
    deleteMessage(){
        cy.wait(1000);
        cy.get(selectors.deleteMessage)
            .first()
            .should('be.visible')
            .click();
    }

    //Verify and import FlowGenie

    //Categories
    enterFlowGenieCategory(nameCat) {
        cy.xpath(selectors.genieCategoryFieldXpath).click();
        cy.xpath(selectors.genieCategoryInputXpath).type(nameCat, {delay: 200,});
        cy.xpath(selectors.selectCategoryListXpath.replace("categoryName", nameCat))
            .should("be.visible")
            .click();
    }

    //Create Category FlowGenie
    createCategory(nameCat, status){
        cy.xpath("//a[contains(@href,'categories')]").click();
        this.clickOnNewCategory();
        cy.get('[name="name"]')
            .type(nameCat)
            .should("have.value", nameCat);
        if(status === "Inactive" || status === "inactive" || status === "INACTIVE")
            cy.get('[name="status"]').select("INACTIVE");
        cy.xpath(selectors.saveCatBtn).click();
    }

    //New Category btn
    clickOnNewCategory(){
        cy.get(selectors.NewCategoryBtn).click();
    }

    //Delete Category FlowGenie
    deleteCategory(nameCat){
        let categoryXpath = "//*[contains(text(),'categoryName')]/ancestor::tr//*[@data-cy='category-ellipsis']/button";
        cy.xpath("//a[contains(@href,'categories')]").click();
        cy.xpath(selectors.searchInputCategories)
            .type(nameCat)
            .should("have.value",nameCat);
        cy.wait(2000);
        cy.xpath(categoryXpath.replace("categoryName",nameCat)).should('be.visible');
        cy.xpath(categoryXpath.replace("categoryName",nameCat)).first().click();
        cy.xpath("//*[contains(text(),'Delete Category')]").click();
        cy.xpath("//button[contains(text(),'Confirm')]").click();
    }

    //From modeler
    //Create New FlowGenie form modeler
    CreateFlowGenieFromModeler(nameFlowGenie, description) {
        cy.get('[class="asset-link"]')
            .should('be.visible')
            .click();        
        cy.visit('designer/flow-genies?create=true&screenSelectId=undefined');
        cy.wait(5000);
        cy.reload();
        cy.get('[class="modal-body"]').should('be.visible',(err, runnable) => {return false});
        cy.get(selectors.inputNameFlowGenie).type(nameFlowGenie,(err, runnable) => {return false});
        cy.get(selectors.textareaDescription).type(description,(err, runnable) => {return false});
        cy.get('[class="btn ml-2 btn-outline-secondary"]').should('be.visible',(err, runnable) => {return false});
        cy.xpath(selectors.saveFlowGenie).click({force: true},(err, runnable) => {return false});
        cy.contains(selectors.flowGenieStudio,'FlowGenie Studio').should('be.visible');
    }
    
    //Configuration task FlowGenie

}    