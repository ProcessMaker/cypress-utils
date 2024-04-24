export default{
    publishBtn: '[data-cy="publish-btn"]',
    saveAndPublishBtn: '[data-test="btn-save-publish"]',
    //Variable Name
    decisionTaskInput: 'input[name="name"]',
    textHelpDecisionTaskInput: '//input[@name="name"]/following-sibling::div[@class="invalid-feedback"]',
    //Decision Table
    accordionDecisionTables:'button[id="accordion-button-tables-accordion"]',
    addTable:'button[aria-label="Add Table"]',
    deleteTable:'a[data-cy="inspector-tables-remove"]',
    configureTable:'a[data-cy="inspector-tables-edit"]',
    openTable:'//div[@class="col"]//label[text()="Select a Table"]/following-sibling::a',
    confirmDeleteTable:'//div[@name="tables_config"]//button[@data-cy="inspector-options-remove-confirm"]',
    labelAddDecisioTables:'//strong[text()="Tables to run:"]',
    divContainerInSelectTable:
        '//label[text()="Select a Table"]/parent::div//div//div[@class="multiselect__tags"]',
    inputInSelectTable:
        '//label[text()="Select a Table"]/parent::div//input[@aria-placeholder="Type here to search"]',
    optionInSelectTable:
        '//label[text()="Select a Table"]/parent::div//div[@class="multiselect__content-wrapper"]//li[1]',
    saveInSelectTable:
        '//div[@label="Decision Tables"]//button[text()[normalize-space()="Save"]]',
    cancelInSelectTable:
        '//div[@label="Decision Tables"]//button[text()[normalize-space()="Cancel"]]',
    //Variable Mapping
    accordionVariableMapping:'button[id="accordion-button-mapping-accordion"]',
    //Map to Column
    addOutboundData:'//div[@name="outbound_config"]//button[@aria-label="Add Outbound Mapping"]',
    requestVariableInput:'//label[text()="Request Variable"]/following-sibling::input[@id="option-variable1"]',
    tableInputVariableInput:'//label[text()="Request Variable"]/following-sibling::input[@id="option-variable2"]',
    saveMapToColumn:'//label[text()="Request Variable"]//parent::div//following-sibling::div//button[@data-cy="inspector-option-save"]',
    //Configure Returned Data
    addResponseMapping:'//div[@name="response_config"]//button[@aria-label="Add Outbound Mapping"]',
    tableOutputVariableInput:'//label[text()="Table Output Variable"]/following-sibling::input[@id="option-variable1"]',
    setRequestVariableInput:'//label[text()="Table Output Variable"]/following-sibling::input[@id="option-variable2"]',
    saveReturnedData:'//label[text()="Table Output Variable"]//parent::div//following-sibling::div//button[@data-cy="inspector-option-save"]',
    //Delete Outbound Data
    deleteOutBoundData:'//div[@name="outbound_config"]//a[@data-cy="inspector-mapping-remove"]',
    confirmDeleteOutBoundData:'//div[@name="outbound_config"]//button[@data-cy="inspector-options-remove-confirm"]',
    //Delete Response Mapping
    deleteResponseMapping:'//div[@name="response_config"]//a[@data-cy="inspector-mapping-remove"]',
    confirmDeleteResponseMapping:'//div[@name="response_config"]//button[@data-cy="inspector-options-remove-confirm"]',
    //Execute conditionally checkbox
    executeConditionally:'//div[text()[normalize-space()="Edit Decision Table"]]/parent::div//input[@name="execute-conditionally"]',
}  