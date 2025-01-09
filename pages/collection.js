//import selectors from "#selectors/dataValidation";
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

}
