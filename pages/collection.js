//import selectors from "#selectors/dataValidation";
import selectors from "#selectors/admin"
export class Collection {   
    /**
     * Fills the modal for creating a new collection with the provided data.
     * @param {Object} data - The data for the new collection.
     * @param {string} data.name - The name of the collection.
     * @param {string} data.description - The description of the collection.
     * @param {string} data.createScreen - The screen for creating the collection.
     * @param {string} data.viewScreen - The screen for viewing the collection.
     * @param {string} data.editScreen - The screen for editing the collection.
     * @example
     * const data = { name: "name1", description: "description1", createScreen: "screen1", viewScreen: "screen2", editScreen: "screen3" };
     * collection.fillCreateCollectionModal(data);
     */
    fillCreateCollectionModal(data){
        cy.get('button[aria-label="Create Collection"]').should('be.visible').click();
        cy.get('[class="modal-content"]').should('be.visible').within(() => {
            cy.get('[class="modal-body"] input[id="name"]').clear().type(data.name).should("have.value", data.name);
            cy.get('[class="modal-body"] textarea[id="description"]').clear().type(data.description).should("have.value", data.description);
            cy.get('[class="modal-body"] [class="multiselect__select"]').eq(0).should('be.visible').click();
            cy.get('[class="modal-body"] input[name="create_screen_id"]').clear().type(data.createScreen, {delay:150});
            cy.get('[class="modal-body"] div[aria-label="Select a screen"] div ul[id="listbox-0"] li span').contains(data.createScreen).should('be.visible').click();
            cy.wait(2000);
            cy.get('[class="modal-body"] [class="multiselect__select"]').eq(1).should('be.visible').click();
            cy.get('[class="modal-body"] input[id="view-screen"]').clear().type(data.viewScreen, {delay:170});
            cy.get('[class="modal-body"] div[aria-label="Select a screen"] div ul[id="listbox-1"] li span').contains(data.viewScreen).should('be.visible').click();
            cy.wait(2000)
            cy.get('[class="modal-body"] [class="multiselect__select"]').eq(2).should('be.visible').click();
            cy.get('[class="modal-body"] input[id="edit-screen"]').clear().type(data.editScreen, {delay:150});
            cy.get('[class="modal-body"] div[aria-label="Select a screen"] div ul[id="listbox-2"] li span').contains(data.editScreen).should('be.visible').click();
        });
    }

    /**
     * Clicks the specified button (Save or Cancel) in the modal.
     * @param {string} option - The button to click (e.g., "Save" or "Cancel").
     * @example
     * collection.collectionButton("Save");
     */
    collectionButton(option){
        cy.get('[class="modal-content"]').should('be.visible').within(() => {
            cy.get('footer button').contains(option).should('be.visible').click();
        });
    }

    /**
     * Searches for a collection by its name.
     * @param {string} collectionName - The name of the collection to search for.
     * @example
     * collection.searchCollection("My Collection");
     */
    searchCollection(collectionName){
        cy.get('input[id="search-collection-box"]').should('be.visible').type(collectionName,{delay:100}).should('have.value', collectionName);
        cy.wait(2000);
    }

    /**
     * Selects an action for the collection (e.g., Records, Configure, Delete, Export).
     * @param {string} action - The action to select.
     * @example
     * collection.selectActionCollection("Delete");
     */
    selectActionCollection(action){
        cy.get('tbody td div[class="actions"] [class="popout"] [title="'+action+'"]').should('be.visible').click();
    }

    /**
     * Creates a collection if it does not already exist.
     * @param {Object} data - The data for the new collection.
     * @example
     * const data = { name: "name1", description: "description1", createScreen: "screen1", viewScreen: "screen2", editScreen: "screen3" };
     * collection.createCollectionifNotExist(data);
     */
    createCollectionifNotExist(data){
        this.searchCollection(data.name);
        cy.get('[class="data-table"] table tbody tr', { timeout: 10000 }).find('td').then(($loadedTable)=>{
            if ($loadedTable.length === 1){
                this.fillCreateCollectionModal(data);
                this.collectionButton("Save");
                cy.log("collection created");
                cy.get('[id="nav-collapse"] div[class="alert-wrapper"] span').should("have.text", "The collection was created. Do not forget to set permissions for users and/or groups");
                cy.get('[id="nav-collapse"] div[class="alert-wrapper"] span').should("not.exist");
            }
        });
    }

    /**
     * Creates a collection via API with the provided payload.
     * @param {Object} payload - The payload for the API request.
     * @example
     * const payload = { name: "test123", description: "est", create_screen_id: 159, read_screen_id: 221, update_screen_id: 290 };
     * collection.createCollectionAPI(payload).then(collection => console.log(collection));
     */
    createCollectionAPI(payload){
        return cy.window().then(win => {
            return win.ProcessMaker.apiClient.post('/collections', payload).then(response => {
                const collection = response.data.data;
                console.log('collection: ', collection);
                return collection;
            });
        });
    }

    /**
     * Initiates the import process for a collection by clicking the import button,
     * attaching the specified file, and ensuring that the loading spinner and alerts are not visible.
     * @param {string} filePath - The path to the file to be imported.
     */
    importCollection(filePath) {
        cy.get("[id='import_collection']").click();
        cy.get("[id='import_collection']").should('be.visible');
        cy.get("[type='file']").attachFile(filePath);
        cy.get("[id='import_collection']").click();
        cy.get("[class='fas fa-circle-notch fa-spin']").should('not.exist');
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-danger"]').should('not.exist');
    }

    /**
     * Imports a collection via API using the provided file path.
     * Converts the file to a Blob and sends it as form data to the API.
     * @param {string} filePath - The path to the file to be imported.
     * @returns {Promise} - A promise that resolves with the response data.
     */
    importCollectionAPI(filePath) {
		let formData = new FormData();
        let win;
        return cy.fixture(filePath, null)
            .then(Cypress.Blob.arrayBufferToBlob)
            .then(fileBlob => {
                formData.append('file', fileBlob);
                return cy.window();
            })
            .then((win) => {
                const options = {};
                const optionsBlob = new Blob([JSON.stringify(options)], {
                    type: 'application/json'
                });
                formData.append('options', optionsBlob);
                return win.ProcessMaker.apiClient.post('/collections/import', formData);
            })
            .then(response => {
                return response.data;
            });
    }

    /**
     * Retrieves a collection by its UUID and name via API.
     * @param {string} collection_uuid - The UUID of the collection to retrieve.
     * @param {string} collection_name - The name of the collection to filter by.
     * @returns {Promise} - A promise that resolves with the found collection.
     */
    getCollectionByUuidAPI(collection_uuid, collection_name){
        return cy.window().then(win => {
            return win.ProcessMaker.apiClient.get('/collections', { params: {filter: collection_name,order_by:"id",order_direction:"asc", per_page:100} }).then(response => {
                const collection = response.data.data.find(collection => collection.uuid === collection_uuid);
                return collection;
            });
        });
    }

    /**
     * Deletes a collection by its ID via API.
     * @param {string} collectionID - The ID of the collection to delete.
     * @returns {Promise} - A promise that resolves with a confirmation message.
     */
    deleteCollectionByIdAPI(collectionID){
        return cy.window().then(win => {
            return win.ProcessMaker.apiClient.delete('/collections/'+collectionID).then(response => {
                //console.log(JSON.stringify(response));
                return "collection " + collectionID + " was deleted";
            });
        });
    }

    /**
     * Retrieves a group by its name via API.
     * @param {string} groupName - The name of the group to retrieve.
     * @returns {Promise} - A promise that resolves with the found group.
     */
    getGroupByGroupNameAPI(groupName){
        return cy.window().then(win => {
            return win.ProcessMaker.apiClient.get('/groups', { params: {filter: groupName} }).then(response => {
                const group = response.data.data.find(group => group.name === groupName);
                return group;
            });
        });
    }

    /**
     * Verifies the presence of a collection by its name and imports it if found.
     * @param {string} collectionName - The name of the collection to search for.
     * @param {string} filePath - The path to the file to be imported if the collection is found.
     */
    verifyPresenceOfCollectionAndImportCollection(collectionName, filePath) {
        cy.get('[id="search"] input').should('be.visible');
        cy.wait(5000);
        cy.get('[id="search"] input').type(collectionName).should('have.value', collectionName);
        cy.get('div[id="collectionIndex"] [class="data-table"] table tbody tr', { timeout: 10000 })
            .find('td')
            .then(($loadedTable) => {
                if ($loadedTable.length === 1) {
                    this.importCollectionAPI(filePath);
                }
                else return;
            });
    }

    /**
     * This method is responsible for removing all active columns from a collection
     * @param nameColumnsList: name of the column list to be removed
     * @return nothing returns
     */
    deleteAllActiveColumnsFromCollection(nameColumnsList){
        cy.xpath(selectors.collectionColumnsTab).click();
        cy.get('[id="nav-columns"]').should('be.visible').within(()=>{
            cy.get('.draggable-current').should('be.visible');
            cy.get('.draggable-available').should('be.visible');
            nameColumnsList.forEach(element => {
                this.deleteActiveColumnFromCollection(element);
            });
        });
    }
    
    /**
     * This method is responsible for removing an active columns from a collection
     * @param nameColumn: name of the column to be removed
     * @return nothing returns
     */
    deleteActiveColumnFromCollection(nameColumn){
        cy.xpath(selectors.activeColumns_coulumnLinkDelete.replace('nameColumn', nameColumn)).should('be.visible').click();
        cy.xpath(selectors.activeColumns_coulumnLinkDelete.replace('nameColumn', nameColumn)).should('not.be.visible');
    }

    /**
     * This method is responsible for save changes on colecction configuration
     * @return nothing returns
     */
    saveChangesOnConfigCollection(){
        cy.xpath("//div[@id='nav-columns']//div[@class='d-flex justify-content-end']//button[text()='Save']").should('be.visible').click();
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should('be.visible');
    }

    /**
     * This method is responsible for reset to default configuration from a collection
     * @return nothing returns
     */
    resetToDefaultColumnsCollection(){
        cy.xpath(selectors.activeColumns_resetToDefaultBtn).click();
        cy.xpath("//button[text()='Confirm']").should('be.visible').click();
    }

    /**
     * This method is responsible for add a new column in collection configuration
     * @param label: value to label input
     * @param field: value to field input
     * @param format: value to format select list
     * @return nothing returns
     */
    addActiveColumnInCollection(label, field, format){
        cy.xpath(selectors.activeColumns_addCustomColumnLink).click();
        cy.xpath(selectors.customColumn_field).should('be.visible');
        cy.xpath(selectors.customColumn_label).type(label).should('have.value',label);
        cy.xpath(selectors.customColumn_field).type(field).should('have.value',field);
        cy.xpath('//legend[text()="Format"]/parent::fieldset//div[@class="multiselect__tags"]').click();
        cy.xpath('//legend[text()="Format"]/parent::fieldset//input').type(format).type('{enter}');
        cy.xpath(selectors.customColumn_save).click();
    }

    /**
     * Deletes a collection by its name.
     * @param {string} collectionName - The name of the collection to delete.
     */
    deleteCollection(collectionName){
        cy.xpath(selectors.deleteCollectionBtn.replace('collectionName', collectionName)).click({ force: true });
        cy.xpath(selectors.confirXPATH).should('be.visible').click();
    }

    /**
     * Opens the record view for a specified collection.
     * @param {string} collectionName - The name of the collection to open.
     */
    openRecordCollection(collectionName){
        cy.xpath(selectors.RecordBtnForGivenCollection.replace('collectionName', collectionName)).click({ force: true });
    }

    /**
     * Navigates to the configuration page for a specified collection.
     * @param {string} collectionName - The name of the collection to configure.
     */
    goToConfigCollection(collectionName){
        cy.xpath(selectors.configCollectionBtn.replace('collectionName', collectionName)).click({ force: true });
    }

    /**
     * Searches for a collection by its name and performs an action based on the specified option.
     * @param {string} collectionName - The name of the collection to search for.
     * @param {string} [option="edit"] - The action to perform (edit, delete, or config).
     */
    searchForCollection(collectionName,option="edit") {
		cy.get(selectors.RecordsBtn).should('be.visible');
		cy.get(selectors.searchInputBox).type(collectionName).should('have.value', collectionName);
		cy.xpath(selectors.searchctrl).click({
			multiple: true
		});
		cy.wait(5000);
		cy.xpath(selectors.collectionNameInput.replace('collectionName', collectionName)).should('be.visible');
		switch (option) {
            case "edit": this.openRecordCollection(collectionName);break;
            case "delete": this.deleteCollection(collectionName);break;
            case "config": this.goToConfigCollection(collectionName);break;
        }
	}
}
