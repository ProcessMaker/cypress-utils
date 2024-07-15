import selectors from "#selectors/calcsAndWatchers";
import { NavigationHelper } from "#helpers/navigationHelper";
const navHelper = new NavigationHelper();

export class CalcsAndWatchers {
    //CALCS
    clickOnCalcsBtn() {
        cy.get(selectors.calcsBtn).click();
    }

    clickOnAddCalcsBtn() {
        cy.get(selectors.addCalcsBtn).should('be.visible');
        cy.get(selectors.addCalcsBtn).click({ force: true });
    }

    //Modal calcs list
    searchCalcs(calcsName) {
        cy.get(selectors.searchCalcs).should('be.visible');
        cy.get(selectors.searchCalcs).clear();
        cy.get(selectors.searchCalcs).type(calcsName, { delay: 60 }).type('{enter}').should('have.value', calcsName);
    }

    searchCalcInList(calcsName) {
        this.clickOnCalcsBtn();
        this.searchCalcs(calcsName);
    }

    createCalc(calcName,description,option,value) {
        this.clickOnAddCalcsBtn();
        this.fillPropertyNameInCalcs(calcName);
        this.fillDescriptionInCalcs(description);
        this.fillFormula(option,value);
        this.clickOnSaveCalcsBtn();
    }

    fillPropertyNameInCalcs(propertyName) {
        cy.get(selectors.propertyNameField).should('be.visible');
        cy.get(selectors.propertyNameField).type(propertyName).should('have.value',propertyName);
    }    

    fillDescriptionInCalcs(description) {
        cy.get(selectors.descriptionField).should('be.visible');
        cy.get(selectors.descriptionField).type(description).should('have.value',description);
    }  

    fillFormula(option,value) {
        switch (option) {
            case "formula":
                cy.get(selectors.formulaBtn).click();
                cy.get(selectors.formulaField).type(value).should('have.value',value);
                break;
            case "javascript":
                cy.get(selectors.javaScriptBtn).click();
                cy.get(selectors.javaScriptField).type(value);
                break;
            default:
                break;
        }
    }

    clickOnSaveCalcsBtn(){
        cy.get(selectors.saveCalcsBtn).click();
    }

    clickOnEditCalcBtn() {
        cy.get(selectors.editCalcsBtn).should('be.visible');
        cy.get(selectors.editCalcsBtn).click({force:true});
    }

    clickBypassCalcBtn() {
        cy.get(selectors.bypassCalcsBtn).should('be.visible');
        cy.get(selectors.bypassCalcsBtn).check({force:true});
    }

    clickDeleteCalcBtn() {
        cy.get(selectors.deleteCalcsBtn).should('be.visible');
        cy.get(selectors.deleteCalcsBtn).click();
    }

    clickOnConfirmBtn(){
        cy.get(selectors.confirmDeleteBtn).should('be.visible');
        cy.get(selectors.confirmDeleteBtn).click();
    }

    editCalcName(newCalcName) {
        cy.get(selectors.propertyNameField).click().clear();
        this.fillPropertyNameInCalcs(newCalcName);
    }

    editCalcDescription(newDescription) {
        cy.get(selectors.descriptionField).click().clear();
        this.fillDescriptionInCalcs(newDescription);
    }

    editCalcFormula(option,newValue) {
        cy.get(selectors.formulaField).click().clear();
        this.fillFormula(option,newValue);
    }

    editCalcInModal(optionConfig){
        const { optionToEdit, calcName,calcDescription,option,newValue} = optionConfig
        this.clickOnEditCalcBtn();
        switch (optionToEdit) {
            case "name":
                this.editCalcName(calcName);
                break;
            case "description":
                this.editCalcDescription(calcDescription);
                break;
            case "formula":
                this.editCalcFormula(option,newValue);
                break;
        }
    }

    enableBypassInCalcs(){
        cy.get(selectors.bypassCalcsBtn).should('be.visible')
        cy.get(selectors.bypassCalcsBtn).check({force:true});
    }

    disableBypassInCalcs(){
        cy.get(selectors.bypassCalcsBtn).should('be.visible')
        cy.get(selectors.bypassCalcsBtn).uncheck({force:true});
    }

    deleteCalc(){
        this.clickDeleteCalcBtn();
        this.clickOnConfirmBtn();
    }

    searchCalcAndSelectOption(calcName, option, optionConfig) {
        this.searchCalcs(calcName);
        switch (option) {
            case "edit":
                this.editCalcInModal(optionConfig);
                break;
            case "Enablebypass":
                this.enableBypassInCalcs();
                break;
            case "Disablebypass":
                this.disableBypassInCalcs();
                break;
            case "delete":
                this.deleteCalc();
                break;
            default:
                break;
        }
    }

    dragItem(idSource, IdTarget) {
        const dataTransfer = new DataTransfer;
        cy.get(`[data-test="item-${idSource}"]`)
            .trigger('dragstart', { dataTransfer })
        cy.get(`[data-test="item-${IdTarget}"]`)
            .trigger('dragenter')
            .trigger('dragover', { dataTransfer })
            .trigger('drop', { dataTransfer })
        cy.get(`[data-test="item-${idSource}"]`)
            .trigger('dragend')
    }

    closeModal(){
        cy.get(selectors.closeModal).click();
    }

    //WATCHERS
    clickOnWatchersBtn() {
        cy.get(selectors.watchersBtn).click();
    } 

    clickOnAddWatchersBtn() {
        cy.get(selectors.addWacthersBtn).should('be.visible');
        cy.get(selectors.addWacthersBtn).click({ force: true });
    }

    //Modal watchers list
    searchWatcher(watcherName) {
        cy.get(selectors.searchWatchers).should('be.visible');
        cy.get(selectors.searchWatchers).clear();
        cy.get(selectors.searchWatchers).type(watcherName, { delay: 80 }).type('{enter}').should('have.value', watcherName);
        cy.get(selectors.searchWatchers).clear();
    }

    searchWatcherInList(watcherName) {
        this.clickOnWatchersBtn();
        this.searchWatcher(watcherName);
    }

    configurationInWatchers(watcherName,variableToWatch,optionBtn){
        this.fillWatcherName(watcherName);
        this.selectVariableToWatch(variableToWatch);
        this.enableButtonInConfiguration(optionBtn);
    }

    sourceInWatchers(source,sourceConfig){
        const { sourceName, data, script, resource } = sourceConfig
        this.clickOnSourceAccordion();
        switch (source) {
            case "script":
                this.selectSource(sourceName);
                this.fillInputData(data);
                this.fillScriptConfiguration(script);
                break;
            case "data connector":
                this.selectSource(sourceName);
                this.selectResource(resource);
                break;
            default:
                break;
        }
    }

    outputInWatchers(source,output){
        this.clickOnOutputAccordion();
        switch (source) {
            case "script":
                this.fillOutputVariable(output);
                break;
            case "data connector":
                this.clickOnAddProperty();
                break;
            default:
                break;
        }
    }

    createWatcher(watcherConfig) {
        const { watcherName, variableToWatch, optionBtn, source, sourceConfig, output} = watcherConfig
        this.clickOnAddWatchersBtn();
        //Configuration
        this.configurationInWatchers(watcherName,variableToWatch,optionBtn);
        //Source
        this.sourceInWatchers(source,sourceConfig);
        //Output
        this.outputInWatchers(source,output);
        this.saveWatcherModal();
    }

    clickOnConfigurationAccordion(){
        cy.get(selectors.configurationAccordion).click();
    }

    fillWatcherName(watcherName){
        cy.get(selectors.watcherName).should('be.visible');
        cy.get(selectors.watcherName).type(watcherName).should('have.value',watcherName);
    }

    selectVariableToWatch(variableToWatch){
        cy.xpath(selectors.variableToWatchlabel).should('be.visible');
        cy.get(selectors.variableToWatchInput).click({force:true});
        cy.get(selectors.variableToWatchInput).type(variableToWatch,{delay:80}).should('have.value',variableToWatch);
		cy.xpath(selectors.variableToWatchWrapper)
			.should('have.attr', 'aria-label')
			.and('contain', `${variableToWatch}. `);
		cy.get(selectors.variableToWatchInput).type('{enter}');
    }

    enableButtonInConfiguration(option){
        switch (option) {
            case "Run Synchronously":
                this.enableRunSynchronously();
                break;
            case "Show message while loading remote data":
                this.enableshowMessageWhileLoadingRemoteData();
                break;
            case "Run watcher on Screen Load":
                this.enablerunWatcherOnScreenLoad();
                break;
            default:
                break;
        }
    }

    enableRunSynchronously(){
        cy.get(selectors.runSynchronouslyBtn).click({force:true});
    }

    enableshowMessageWhileLoadingRemoteData(){
        cy.get(selectors.showMessageWhileLoadingRemoteDataBtn).click({force:true});
    }

    enablerunWatcherOnScreenLoad(){
        cy.get(selectors.runWatcherOnScreenLoadBtn).click({force:true});
    }

    clickOnSourceAccordion(){
        cy.get(selectors.sourceAccordion).click();
    }

    //Source
    selectSource(sourceName){
        cy.xpath(selectors.sourceLabel).should('be.visible');
        cy.get(selectors.sourceInput).click({force:true});
        cy.get(selectors.sourceInput).type(sourceName,{delay:80}).should('have.value',sourceName);
		cy.xpath(selectors.sourceWrapper)
			.should('have.attr', 'aria-label')
			.and('contain', `${sourceName}. `);
		cy.get(selectors.sourceInput).type('{enter}');
    }

    //Script in watchers
    fillInputData(data){
        cy.get(selectors.inputDataField).type('{backspace}').type('{backspace}').type(`{{}${data}}`).should('contain', `{${data}}`);
    }

    fillScriptConfiguration(script){
        cy.get(selectors.scriptConfigurationField).type('{backspace}').type('{backspace}').type(`{{}${script}}`).should('contain', `{${script}}`);
    }

    //Data connectors in watchers
    /**
     * This method selects a resource to create a watcher
     * @param resource: for example: ListAll, GetRecord, CreateRecord, DeleteRecord,UpdateRecord,TruncateCollection
    */

    selectResource(resource){
        cy.xpath(selectors.resourceLabel).should('be.visible');
        cy.get(selectors.resourceInput).click({force:true});
        cy.get(selectors.resourceInput).type(resource,{delay:80}).should('have.value',resource);
		cy.xpath(selectors.resourceWrapper)
			.should('have.attr', 'aria-label')
			.and('contain', `${resource}. `);
		cy.get(selectors.resourceInput).type('{enter}');
    }
    //Output in Watchers
    clickOnOutputAccordion(){
        cy.get(selectors.outputAccordion).click({force:true});
    }

    //output in Script
    fillOutputVariable(output){
        cy.get(selectors.outputVariableField).type(output).should('have.value',output);
    }

    //output in Data connector
    clickOnAddProperty(){
        cy.xpath(selectors.propertyBtn).click({force:true});
    }

    saveWatcherModal(){
        cy.get(selectors.saveWatchersBtn).click();
    }

    clickOnEditWatcherBtn() {
        cy.get(selectors.editWatchersBtn).should('be.visible')
        cy.get(selectors.editWatchersBtn).click();
    }

    clickBypassWatcherBtn() {
        cy.get(selectors.bypassWatchersBtn).should('be.visible')
        cy.get(selectors.bypassWatchersBtn).click();
    }

    clickDeleteWatcherBtn() {
        cy.get(selectors.deleteWatchersBtn).should('be.visible')
        cy.get(selectors.deleteWatchersBtn).click();
    }

    confirmDeleteWatcherBtn() {
        cy.xpath(selectors.confirmDeleteBtn).should('be.visible')
        cy.xpath(selectors.confirmDeleteBtn).click();
    }

}