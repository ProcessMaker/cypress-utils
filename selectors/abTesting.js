export default {
    iframeA: '[id="alternative_a"]',
    iframeB: '[id="alternative_b"]',

    //AB alternatives
    menuAB: '[id="myTab"]',
    alternativeA_Tab: '[data-test="tab-A"]',
    alternativeB_Tab: '[data-test="tab-B"]',
    plusTab: '[data-test="tab-plus"]',
    deleteAltB_Btn: '[id="tab-B-remove"]',
    confirmEnableBtn: 'button[data-test="ab-enable-alternative-ok"]',
    confirmDeleteBtn: 'button[data-test="ab-delete-alternative-ok"]',
    confirmReplaceAlt: '[data-test="ab-replace-alternative-ok"]',
    colorTagA: '[class="rounded px-1 mr-1 bg-secondary text-white"]',
    colorTagB: '[class="rounded px-1 mr-1 bg-success text-white"]',
    menuInspectorBtn: '[data-cy="inspector-button"]',

    //Replace alternative
    replaceAlternativeBtn: '[data-test="tab-replace"]',
    ABsettingsBtn: '[data-test="btn-switch-version-info"]',

    //Publish New Version
    publishBtn: '[data-cy="publish-btn"]',
    modalPublishVersion: '[class="modal-dialog modal-lg modal-dialog-centered"]',
    publishBtnInModal: '[data-test="btn-save-publish"]',
    alternativeA_Btn: 'button[data-test="btn-alternative-a"]',
    alternativeB_Btn: 'button[data-test="btn-alternative-b"]',
    alternativeAB_Btn: '[data-test="btn-alternative-ab"]',
    saveAndPublish: '[data-test="btn-save-publish"]',
    version: 'input[name="version"]',
    description: '[name="description"]',
    saveBtnInLaunchpadSettingModal: '[data-test="launchpad-modal-btn-ok"]',
    modalLaunchpad: '[id="launchpadSettingsModal___BV_modal_content_"]',
    labelLaunchpad: '[id="launchpadSettingsModal___BV_modal_title_"]',
    closeModalPublish: '[aria-label="Close"]',
    tooltipAB_Btn: '//div[@class="tooltip-inner"]',

    //AB Settings 
    simpleBtn: '[data-test="btn-simple-mode"]',
    advancedBtn: '[data-test="btn-advanced-mode"]',
    expressionInput: '[data-test="expression-input"]',
    scrollBar: '[data-test="ratio-input"]',
    seeProcessABTestingConfiguration: '//div[@class="row justify-content-center"]//a',

    //AB Testing from configuration of process
    ABTestingTab: '[id="testing-configuration-tab"]',
    nameInput:'[id="name"]',
    saveConfiguration:'#nav-config > .d-flex > .btn-secondary',
    confirmSaveConfiguration:'[data-test="confirm-btn-ok"]', 
    
    //Modeler Elements
    addBtn: '[title="Add"]',
    formTaskName:'//div[@id="collapse-inspector-accordion-task"]//input[@name="name"]',
    manualTaskName: '//div[@id="collapse-inspector-accordion-manual-task"]//input[@name="name"]',
    
    //Corona elements
    deleteIcon: '[title="Delete"]',
    bodyPageInSummary:'[class="view-lines monaco-mouse-cursor-text"]',
    
    //AssignmentRule
    asssignmentRuleAcordion:'[id="accordion-button-assignments-accordion"]',
    selectList:'[id="assignmentsDropDownList"]',
    variableNameUsers:'(//label[text()="Variable Name (Users)"]/parent::div//input)[1]',
    variableNameGroups:'(//label[text()="Variable Name (Groups)"]/parent::div//input)[1]',
    spinnerUserGroups:'//label[text()="Assigned Users/Groups"]/parent::div//div[@class="multiselect__spinner"]',
    //Element Destination
    spinner:'[class="multiselect__spinner"]',

}