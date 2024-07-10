export default{
    //CALCS
    calcsBtn:'[data-cy="toolbar-button_calcs"]',
    //Modal calcs list
    searchCalcs: '[data-test="search"]',
    addCalcsBtn: '[data-cy="calcs-add-property"]',
    editCalcsBtn: 'button[data-cy="calcs-table-edit"]',
    bypassCalcsBtn:'button[data-test="calcs-bypass"]',
    deleteCalcsBtn: 'button[data-cy="calcs-table-remove"]',
    //Modal create calcs
    propertyNameField:'[data-cy="calcs-property-name"]',
    descriptionField:'[data-cy="calcs-property-description"]',
    formulaField:'[data-cy="calcs-property-formula"]',
    javaScriptField:'[data-cy="calcs-property-javascript"]',
    formulaBtn:'[data-cy="calcs-switch-formula"]',
    javaScriptBtn:'[data-cy="calcs-switch-javascript"]',
    cancelCalcsBtn:'[data-cy="calcs-button-cancel"]',
    saveCalcsBtn:'[data-cy="calcs-button-save"]',

    //WATCHERS
    watchersBtn:'[data-test="search"]',
    //Modal watchers list
    searchWatchers: '[data-test="search"]',
    addWacthersBtn: '[data-cy="watchers-add-watcher"]',
    editWatchersBtn: 'button[data-cy="watchers-table-edit"]',
    bypassWatchersBtn:'button[data-test="watchers-bypass"]',
    deleteWatchersBtn: 'button[data-cy="watchers-table-remove"]',
    cancelDeleteBtn:'button[data-test="confirm-btn-close"]',
    confirmDeleteBtn:'button[data-test="confirm-btn-ok"]',
    //Modal create watchers
    //Configuration
    configurationAccordion:'button[data-cy="watchers-accordion-configuration"]',
    watcherName:'[data-cy="watchers-watcher-name"]', 
    variableToWatchlabel:'//label[text()="Variable to Watch *"]',
    variableToWatchInput:'input[name="Variable to Watch"]',
    variableToWatchSelect:'//div[@data-cy="watchers-watcher-variable"]//div[@class="multiselect__select"]',
    variableToWatchWrapper:'//div[@data-cy="watchers-watcher-variable"]//div[@class="multiselect__content-wrapper"]//li[1]',
    runSynchronouslyBtn:'input[data-cy="watchers-watcher-synchronous"]',
    showMessageWhileLoadingRemoteDataBtn:'input[data-cy="watchers-watcher-show-loading"]',
    runWatcherOnScreenLoadBtn:'input[data-cy="watchers-watcher-run-onload"]',
    //Source
    sourceAccordion:'button[data-cy="watchers-accordion-source"]',
    sourcelabel:'//label[text()="Source *"]',
    sourceInput:'input[name="Source"]',
    sourceSelect:'//div[@data-cy="watchers-watcher-source"]//div[@class="multiselect__select"]',
    sourceWrapper:'//div[@data-cy="watchers-watcher-source"]//div[@class="multiselect__content-wrapper"]//li[1]',
    inputDataField:'[data-cy="watchers-watcher-input_data"]',
    scriptConfigurationField:'[data-cy="watchers-watcher-script_configuration"]',
    //Output
    outputAccordion:'[id="watcherOutput"]',
    outputVariableField:'input[data-cy="watchers-watcher-output_variable"]',
    cancelWatchersBtn:'[data-cy="watchers-button-cancel"]',
    saveWatchersBtn:'[data-cy="calcs-button-save"]',
    closeModal:'[aria-label="Close"]',
}