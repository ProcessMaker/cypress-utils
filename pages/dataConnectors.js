import selectors from "#selectors/dataConnectors";

export class Dataconnectors {
    clickOnAddDataConnector(){
        cy.get(selectors.addDataConnector).click({force: true});
    }
    enterDataConnectorName(name) {
        cy.get(selectors.nameInput).type(name).should('have.value', name);
    }

    enterDataConnectorDescription(description) {
        cy.get(selectors.descriptionInput).type(description).should('have.value', description);
    }

    selectAuthType(type) {
        cy.xpath(selectors.authenticatonDropdownXpath).click();
        cy.get(selectors.authenticationTypeInput).type(type).should('have.value',type);
        cy.xpath(selectors.authType.replace('AuthType', type)).click();
    }

    ClickSaveBtn() {
        cy.xpath(selectors.saveBtn).should('be.visible').click();
    }

    createADataConnector(name, description, type, connectorType="REST Service"){
        this.clickOnAddDataConnector();
        cy.get(selectors.CategoryTxt).should('have.text','Uncategorized');
        this.enterDataConnectorName(name);
        this.enterDataConnectorDescription(description);
        this.selectConnectorType(connectorType);
        this.selectAuthType(type);
        this.ClickSaveBtn();
        //cy.get(selectors.addResource).should('be.visible');
    }

    OpenConfigurationTab(){
        cy.xpath(selectors.configurationtab).click();
        
    }
    AddAToken(token) {
        this.OpenConfigurationTab();
        cy.get(selectors.tokenInput).invoke('removeAttr', 'type','hidden');
        cy.get(selectors.tokenInput).clear().type(token).should("have.value", token);
        this.ClickSaveBtn();
    }

    AddAListResource(description, method, URL){
        this.clickOnAddResource();
        this.AddResourceDescription(description);
        this.selectMethodOfResource(method);
        this.AddResourceURL(URL);
        cy.xpath(selectors.addBtn).click();
    }

    clickOnAddResource(){
        cy.get(selectors.addResource).click();
        cy.wait(2000);
    }

    AddResourceDescription(description){
        cy.get(selectors.resourceDescription).type(description);
    }
    
    selectMethodOfResource(method){
        cy.get(selectors.resourceMethod).select(method);
    }

    AddResourceURL(URL){
        cy.get(selectors.resourceURL).type(URL).should('have.value', URL);
    }

    OpenResourcesTab(){
        cy.wait(2000);
        cy.xpath(selectors.resourcestab).click();
    }
    addResourceName(resourceName){
        cy.get(selectors.resourceNmeTxt).clear().type(resourceName).should('have.value', resourceName);
    }

    addResourceForBearerToken(resourceName, description, method, URL, token){
        this.OpenConfigurationTab();
        this.AddAToken(token);
        this.OpenResourcesTab();
        this.clickOnAddResource();
        this.addResourceName(resourceName);
        this.AddResourceDescription(description);
        this.selectMethodOfResource(method);
        this.AddResourceURL(URL);
        cy.xpath(selectors.addBtn).click();
        cy.xpath('//button[text()="Send"]').should('be.visible');
    }
    saveTheResource(){
        cy.xpath(selectors.addBtn).click();
    }
    verifyPresenceOfDataConnectorAndCreate(name, description, type, sourcesParameter={}){
        cy.wait(3000);
        cy.xpath(selectors.dataSourceIndex).should('be.visible');
        cy.xpath(selectors.dataSourceIndex).type(name)
            .should('have.value', name);
        cy.xpath(selectors.dataSourceIndexLoading).should('be.visible');
        cy.wait(2000);
        cy.xpath(selectors.dataSourceIndexLoading, { timeout: 10000 })
            .then(($message) => {
                if ($message.length === 1) {
                    this.createADataConnector(name, description, type);
                    cy.xpath(selectors.resourcesTitle).should('be.visible');
                    cy.xpath(selectors.resourcesTitle).click();
                    if (Object.keys(sourcesParameter).length > 0)
                        this.AddAListResource(sourcesParameter.description, sourcesParameter.method, sourcesParameter.URL)
                }
                else return;
            });
    }
 

    verifyPresenceOfDataConnectorAndCreateWithBearerToken(name, description, connectorType, type, token, sourcesParameter={}){
        cy.wait(3000);
        cy.xpath('//div[@id="dataSourceIndex"]//div[@id="search"]//input').should('be.visible');
        cy.xpath('//div[@id="dataSourceIndex"]//div[@id="search"]//input').type(name)
            .should('have.value', name);
        cy.xpath('//div[@id="dataSourceIndex"]//div[@class="jumbotron jumbotron-fluid"]//h3[text()="Loading"]').should('be.visible');
        cy.wait(2000);
        cy.xpath('//div[@id="dataSourceIndex"]//div[@class="datasources-table-card"]', { timeout: 10000 })
            .invoke("show")
            .find('[data-cy="datasource-pagination"] [class="pagination-total"]')
            .eq(1)
            .then(($loadedTable) => {
                if ($loadedTable.text().trim().replace(/[^0-9]/g, "") == 0) {
                    this.createADataConnectorWithBearerToken(name, description, connectorType,type, token);
                    cy.wait(5000);
                    cy.xpath('//li[@role="presentation"]/a[text()="Resources"]').click({force:true});
                        this.AddAListResource(sourcesParameter.description, sourcesParameter.method, sourcesParameter.URL);
                }
                else return;
            });
    }

    createADataConnectorWithBearerToken(name, description, connectorType, type, token){
        this.clickOnAddDataConnector();
        cy.get(selectors.CategoryTxt).should('have.text','Uncategorized');
        this.enterDataConnectorName(name);
        this.enterDataConnectorDescription(description);
        this.selectConnectorType(connectorType);
        this.selectAuthType(type);
        this.ClickSaveBtn();
        cy.xpath('//textarea[@id="tokenInput"]').type(token, {force: true});
        cy.xpath('//input[@type="checkbox"]').uncheck({force:true});
        cy.xpath('//button[@class="btn btn-secondary ml-3"]').click({force:true});
    }

    clickOnAddResourceWithBearerToken(){
        cy.xpath(selectors.addResourceWithBearerToken).click();
        cy.wait(2000);
    }

    selectConnectorType(connectorType) {
        cy.xpath(selectors.connectorTypeDropdownXpath).click();
        cy.get(selectors.connectorTypeInput).type(connectorType).should('have.value',connectorType);
        cy.xpath(selectors.connectorType.replace('connectorType', connectorType)).click();
    }

    /**
     * This method is responsible to Search a Data Connector and select one action
     * @param dataConnectorName: Name of the Data Connector
     * @param action: This values can be "Edit", "Add to Project" and "Delete"
     * @return nothing returns
     */
    searchDataConnectorAndSelectAction(dataConnectorName, action) {
        cy.xpath("//div[@id='dataSourceIndex']").should(
            "be.visible"
        );
        cy.xpath(
            '//div[@id="dataSourceIndex"]//div[@id="search"]//input'
        ).should("be.visible");
        cy.xpath('//div[@id="dataSourceIndex"]//div[@id="search"]//input')
            .clear()
            .type(dataConnectorName)
            .should("have.value", dataConnectorName);
        cy.xpath(
            '//div[@id="dataSourceIndex"]//div[@class="jumbotron jumbotron-fluid"]//h3[text()="Loading"]'
        ).should("be.visible");
        cy.wait(4000);
        cy.xpath('//div[@id="dataSourceIndex"]//div[@class="datasources-table-card"]', { timeout: 12000 })
            .invoke("show")
            .find('[data-cy="datasource-pagination"] [class="pagination-total"]')
            .eq(1)
            .then(($loadedTable) => {
                if ($loadedTable.text().trim().replace(/[^0-9]/g, "") == 0) {
                    cy.log(
                        "The Data Connector was not found: " + dataConnectorName
                    );
                } else {
                    cy.get(selectors.optionBtn).should("be.visible");
                    cy.get(selectors.optionBtn).click();
                    cy.get(selectors.modalOptions).should("be.visible");
                    this.selectMenuOptionRow(action);

                    switch (action) {
                        case "Add to Project":
                            cy.xpath(selectors.addProjectModel).should(
                                "be.visible"
                            );
                            break;
                        case "Delete":
                            var res =
                                "Are you sure you want to delete " +
                                dataConnectorName +
                                "?";
                            cy.get('[class="modal-content"]')
                                .should("be.visible")
                                .within(() => {
                                    cy.get('[class="modal-body"] div').should(
                                        "have.text",
                                        res
                                    );
                                    cy.get("footer button")
                                        .contains("Confirm")
                                        .click();
                                });
                            break;
                    }
                }
            });
    }

    /**
     * This method is responsible to do click in one option for a row
     * @param nameOption: Name according to for example:'Edit Data Connectors', 'Add To Project', 'Delet'
     * @return nothing returns
     * selectMenuOptionRow('Add To Project') //tthis option, aggregate the data CConnector has a project
     */
    selectMenuOptionRow(nameOption) {
        cy.xpath(selectors.selectOptionModal.replace("modalOption", nameOption))
            .should("be.visible")
            .first()
            .click();
    }

    searchResourceDataConnectorAndSelectAction(resourceName, action) {
        cy.xpath("//div[@class='data-table']//tbody/tr/td").should(
            "be.visible"
        );
        cy.xpath("//input[@id='search-box']").should("be.visible");
        cy.xpath("//input[@id='search-box']")
            .clear()
            .type(resourceName)
            .should("have.value", resourceName);
        cy.wait(2000);
        cy.xpath("//div[@class='data-table']//tbody/tr", { timeout: 10000 })
            .find("td")
            .then(($loadedTable) => {
                if ($loadedTable.length === 1) {
                    cy.log("The resource was not found: " + resourceName);
                } else {
                    switch (action) {
                        case "edit":
                            cy.xpath(
                                "//div[@class='actions']//button[@title='Edit']"
                            )
                                .first()
                                .should("be.visible")
                                .click();
                            break;
                        case "delete":
                            cy.xpath(
                                "//div[@class='actions']//button[@title='Remove']"
                            )
                                .first()
                                .should("be.visible")
                                .click();
                            cy.xpath(
                                '//div[@class="modal-content"]/footer/button[text()="Confirm"]'
                            )
                                .should("be.visible")
                                .click();
                            break;
                    }
                }
            });
    }

    /**
     * This method is responsible to update a data connector
     * @param name: name of the data connector for searching
     * @param newName: new name for data connector to update
     * @param description: description for update
     * @return nothing returns
     */

    updateDataConnector(name, newName, description){
        cy.xpath(selectors.dataSourceIndex).should('be.visible');
        cy.xpath(selectors.dataSourceIndex).type(name, {delay : 100})
            .should('have.value', name);
        cy.xpath(selectors.dataSourceIndex).type(' ');
        cy.wait(2000);
        cy.xpath(selectors.dataSourceIndex).type('{backspace}');
        cy.xpath("//span[contains(text(),'"+name+"')]").should('have.text', name);
        cy.xpath(selectors.dataSourceEllipsis).should('be.visible').click();
        cy.xpath((selectors.dataSourceEditButtonForSpecificUser).replace('name', name)).should('be.visible').click();
        cy.xpath(selectors.inputName).clear().type(newName);
        cy.xpath(selectors.inputDescription).clear(description).type(description);
        cy.xpath(selectors.inputDescription).should('have.value', description);
        cy.xpath(selectors.saveBtn).should('be.visible');
        this.ClickSaveBtn();     
    }

     /**
     * This method is responsible to delete a data connector
     * @param name: name of the data connector
     * @return nothing returns
     */
 
    deleteDataConnector(name){
        cy.xpath(selectors.dataSourceIndex).should('be.visible');
        cy.xpath(selectors.dataSourceIndex).type(name,{delay : 100})
        .should('have.value', name);
        cy.xpath(selectors.dataSourceIndex).type(' ');
        cy.xpath(selectors.dataSourceIndex).type('{backspace}');
        cy.xpath(selectors.dataSourceIndexLoading).should('be.visible');
        cy.xpath("//span[contains(text(),'"+name+"')]").should('have.text', name);
        cy.xpath(selectors.dataSourceEllipsis).should('be.visible').click();
        cy.xpath((selectors.dataSourceRemoveButtonForSpecificUser).replace('name', name)).should('be.visible').click();   
        cy.xpath(selectors.confirmButtonDelete).should('be.visible').click();
    } 

    pressSendBtn() {
        cy.xpath('//div[@id="formResource"]//button[text()="Send"]').should("be.visible");
        cy.xpath('//div[@id="formResource"]//button[text()="Send"]').click();
    } 

    resourceName(name) {
        cy.get(selectors.resourceNameDC).clear().type(name);
    }
    resourceDescription(description) {
        cy.get(selectors.resourceDescriptionDC).clear().type(description);
    }
    resourceTimeout(time) {
        cy.xpath(selectors.resourceTimeoutDC).clear().type(time);
    }
    resourceRetryAttempts(time) {
        cy.xpath(selectors.resourceRetryAttemptsDC).clear().type(time);
    }
    resourceRetryWaitTime(time) {
        cy.xpath(selectors.resourceRetryWaitTimeDC).clear().type(time);
    }
    resourceSaveBtn() {
        cy.xpath(selectors.resourceSaveBtnDC).scrollIntoView().click();
    }
}
