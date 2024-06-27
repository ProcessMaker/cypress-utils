export class NavigationHelper {
    navigateToHome(){
        cy.visit('/');
        cy.title().should('eq', 'Welcome - ProcessMaker');
    }
    navigateToProcessPage(){
        cy.visit('/processes');
        cy.title().should('eq', 'Processes - ProcessMaker');
    }

    navigateToRequestsPage(){
        cy.visit('/cases');
        cy.title().should('eq', 'My Cases - ProcessMaker');
    }

    navigateToCompletedRequests(){
        cy.visit('requests/completed');
        cy.title().should('eq', 'Completed Requests - ProcessMaker');
    }

    navigateToAllRequests(){
        cy.visit('/requests/all');
        cy.title().should('eq', 'All Requests - ProcessMaker');
    }

    navigateToInprogressRequests(){
        cy.reload();
        cy.visit('/requests/in_progress');
        cy.title().should('eq', 'Requests In Progress - ProcessMaker');
    }

    navigateToAdminPage(){
        cy.visit('/admin');
        cy.title().should('eq', 'Users - ProcessMaker');
    }

    navigateToAdminUserPage(){
        cy.visit('/admin/users')
        cy.title().should('eq', 'Users - ProcessMaker');
    }

    navigateToAdminGroupPage(){
        cy.visit('/admin/groups')
        cy.title().should('eq', 'Groups - ProcessMaker');
    }

    navigateToCollectionPage(){
        cy.visit('/collections');
        cy.title().should('eq', 'Collections - ProcessMaker');
    }

    navigateToDesignerPage() {
        cy.visit('/designer');
        cy.title().should('eq', 'Designer - ProcessMaker');
    }

    navigateToScreensPage(){
        cy.visit('/designer/screens');
        cy.title().should('eq', 'Screens - ProcessMaker');
    }

    navigateToDataConnectorPage(){
        cy.visit('/designer/data-sources');
        cy.title().should('eq', 'Data Connectors - ProcessMaker');
    }

    navigateToLogOut(){
        cy.visit('/logout');
        cy.title().should('eq', 'Login - ProcessMaker');
    }

    navigateToScriptPage(){
        cy.visit('/designer/scripts');
        cy.title().should('eq', 'Scripts - ProcessMaker');
    }

    navigateToUserPage(){
        cy.visit('/admin/users');
        cy.title().should('eq', 'Users - ProcessMaker');
    }
    navigateToTasksPage(){ 
        cy.visit('/tasks');
        cy.title().should('eq', 'To Do Tasks - ProcessMaker');
    }

    navigateToSelfServiceSaveSearch(){
        cy.visit('/tasks/saved-searches/14');
        cy.title().should('eq', 'Self Service - ProcessMaker');
    }

    navigateToSavedSearchs(){
        cy.visit('/requests/saved-searches');
        cy.title().should('eq', 'Edit Saved Searches - ProcessMaker');
    }
    navigateToEditAdminProfile(titleEditProfile){
        cy.visit('/profile/edit');
        cy.title().should('eq', titleEditProfile);
    }

    navigateToSettings(){
        cy.visit('/admin/settings');
        cy.title().should('eq', 'Settings - ProcessMaker');
    }

    navigateToSignals(){
        cy.visit('/designer/signals');
        cy.title().should('eq', 'Signals - ProcessMaker');
    }

    newRequestBtn(){
        cy.get('button > i[class="fas fa-plus"]').click();
        cy.get('div[class="modal-content"]').should('be.visible');
    }

    navigateToProfile(){
        cy.visit('/profile/edit');
        cy.title().should('eq', 'Edit Profile - ProcessMaker');
    }
    navigateToAdminCustomizePage() {
        cy.visit("/admin/customize-ui");
        cy.title().should("eq", "Customize UI - ProcessMaker");
    }
    navigateToMenuPage() {
        cy.visit("/admin/customize-ui/menus");
        cy.title().should("eq", "Customize UI - ProcessMaker");
    }
    navigateToDashobardPage() {
        cy.visit("/admin/customize-ui/dashboards");
        cy.title().should("eq", "Customize UI - ProcessMaker");
    }
    navigateToSignalPage(){
        cy.visit('/designer/signals');
        cy.title().should('eq', 'Signals - ProcessMaker');
    }
    navigateToFileManagerPublicPage() {
        cy.visit("/file-manager/public");
        cy.title().should("eq", "File Manager - ProcessMaker");
    }
    navigateToVocabularies(){
        cy.visit('/designer/vocabularies');
        cy.title().should('eq','Vocabularies - ProcessMaker');
    }

    navigateToPmBlock(){
        cy.visit('/designer/pm-blocks');
        cy.title().should('eq','PM Blocks - ProcessMaker');
    }
    navigateToArchivePmBlock(){
        cy.visit('/designer/pm-blocks');
        cy.title().should('eq','PM Blocks - ProcessMaker');
        cy.xpath('//*[@id="nav-archived-tab"]').should('be.visible').click();
    }

    navigateToAuthClients(){
        cy.visit('/admin/auth-clients');
        cy.title().should('eq','Auth Clients - ProcessMaker');
    }
    
    navigateToAnalyticsReporting(){
        cy.visit('/admin/analytics-reporting');
        cy.title().should('eq', 'Analytics - ProcessMaker');
    }

    navigateToAnalyticsDefaultMenu() {
        cy.visit('/package-analytics-reporting');
        cy.title().should('eq', 'Analytics - ProcessMaker');
    }

    navigateToAnalyticsCustomMenu() {
        cy.visit('/package-analytics-reporting');
    }

    navigateToPmProjects() {
        cy.visit("/designer/projects");
        cy.title().should('eq','Projects - ProcessMaker');
    }

    navigateToEnvironmentVariables(){
        cy.visit('/designer/environment-variables');
        cy.title().should('eq','Environment Variables - ProcessMaker');
    }
    navigateToDecisionTables(){
        cy.visit('/designer/decision-tables');
        cy.title().should('eq','Decision Tables - ProcessMaker');
    }

    navigateToTemplatePage(){
        cy.visit('/processes');
        cy.title().should('eq', 'Processes - ProcessMaker');
        cy.xpath('//*[@id="nav-templates-tab"]').should('be.visible').click();
    }

    navigateToScriptExecutors(){
        cy.visit('/admin/script-executors');
        cy.title().should('eq','Script Executors - ProcessMaker');
    }

    navigateToProcessLaunch(){
        cy.visit('/processes-catalogue');
        cy.title().should('eq','Processes Catalogue - ProcessMaker');
    }
    navigateToProcessesCatalogue(){
        cy.visit('/processes-catalogue');
        cy.title().should('eq','Processes Catalogue - ProcessMaker');
    }

    navigateToScreenList(){
        cy.visit('/designer/screens');
        cy.title().should('eq','Screens - ProcessMaker');
    }

    selectLaunchScreen(screen){
        cy.xpath(selectors.inputLaunchScreen).click({force:true}).clear();       
        cy.xpath(selectors.inputLaunchScreen).type(screen).should('have.value', screen);
        cy.xpath(selectors.inputLaunchScreen).type('{enter}');
    }

    navigateToFlowGenie(){
        cy.visit('/designer/flow-genies');
        cy.title().should('eq','Genies - ProcessMaker');
    }

    navigateToProcessesPage(){
        cy.visit('/process-browser');
        cy.title().should('eq','Processes Catalogue - ProcessMaker');
    }
}
