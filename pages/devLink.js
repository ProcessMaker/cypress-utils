import DevLinkSelectors from "../selectors/devLink";

class DevLinkPage {
    // Private instance variable
    static #instance = null;

    constructor() {
        // Ensure only one instance is created
        if (DevLinkPage.#instance) {
            return DevLinkPage.#instance;
        }
        
        this.selectors = DevLinkSelectors;
        DevLinkPage.#instance = this;
    }

    // Static method to get instance
    static getInstance() {
        if (!DevLinkPage.#instance) {
            DevLinkPage.#instance = new DevLinkPage();
        }
        return DevLinkPage.#instance;
    }

    // Navigation methods
    visit() {
        cy.visit('/admin/devlink');
    }
    
    // Tab verification methods
    verifyTabs() {
        cy.get(this.selectors.linkedInstancesTab).should('be.visible');
        cy.get(this.selectors.localBundlesTab).should('be.visible');
        cy.get(this.selectors.sharedAssetsTab).should('be.visible');
    }
    
    // Button verification methods
    verifyButtons() {
        cy.get(this.selectors.addInstanceButton).should('be.visible');
        cy.get(this.selectors.localBundlesTab).click();
        cy.get(this.selectors.createBundleButton).should('be.visible');
        cy.get(this.selectors.sharedAssetsTab).click();
        cy.get(this.selectors.accessTokenButton).should('be.visible');
    }
    
    // Modal verification methods
    verifyModalFields() {
        cy.get(this.selectors.addInstanceButton).click();
        cy.get(this.selectors.instanceModal.title).should('be.visible');
        cy.get(this.selectors.instanceModal.urlField).should('be.visible');
        cy.get(this.selectors.instanceModal.nameField).should('be.visible');
        cy.get(this.selectors.instanceModal.descriptionField).should('be.visible');
    }
    
    // Search functionality
    verifySearch(validCriteria, invalidCriteria) {
        cy.get(this.selectors.searchField).type(validCriteria);
        // Add assertions for search results
        cy.get(this.selectors.searchField).clear().type(invalidCriteria);
        // Add assertions for no results
    }
    
    // Table headers verification
    verifyTableHeaders() {
        cy.get(this.selectors.tableHeaders).should('contain', 'Name')
            .and('contain', 'URL')
            .and('contain', 'Description');
    }
    
    // Breadcrumb verification
    verifyBreadcrumb() {
        cy.get(this.selectors.breadcrumb)
            .should('contain', 'admin')
            .and('contain', 'DevLink');
    }
    
    // Message verification methods
    verifyMessages() {
        cy.get(this.selectors.noLinkedInstancesMsg)
            .should('contain', 'No Linked instances of ProcessMaker');
        cy.get(this.selectors.localBundlesTab).click();
        cy.get(this.selectors.noBundlesMsg)
            .should('contain', 'No bundles of assets to display');
        cy.get(this.selectors.sharedAssetsTab).click();
        cy.get(this.selectors.sharedAssetsMsg)
            .should('contain', 'To configure the shared assets you need to link at least one instance');
    }
    
    // Bundle creation method
    createBundle() {
        cy.get(this.selectors.createBundleButton).click();
        // Add bundle creation steps
    }
}

// Export the singleton instance
export default DevLinkPage.getInstance();