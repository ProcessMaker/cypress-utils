export default{
    screenPreviewBtn: "button[title='Preview Screen']",
    screenDesignBtn: "button[title='Design Screen']",
    screensSelectionBtn: "[class='fa fa-file']",
    threePointsBtn: "//div[@id='screenIndex']//table/tbody/tr//button[@aria-haspopup='menu']",
    addScreenButton: 'button[aria-label="Create Screen"]',
    newAssetButton: '[data-cy="asset-search-menu"] button.btn.addBtn',
    nameTxtBx: 'input[name="title"]',
    descriptionTxtBx: '[name="description"]',
    arrowTypeScreen:'(//div[@class="multiselect__select"])[1]',
    typeDropDown: '(//div[@data-cy="type-container-Form"])[1]',
    screenTypeForm:'[data-cy="type-container-Form"]',
    screenTypeEmail: '[data-cy="type-container-E-mail"]',
    screenTypeDisplay: '[data-cy="type-container-Display"]',
    screenTypeConversational: '[data-cy="type-container-Conversational"]',
    saveBtn: '[data-cy="create_screen_save_btn"]',
    savePublishBtn: '//button[text()="Publish"]',
    varaibleNameTxtBx: '[name="Variable Name"]',
    //Data Source configuration
    dataSourceDropDown: 'select#data-sources',
    allowMultipleSelections: '//div[text()[normalize-space()="Allow Multiple Selections"]]/input',
    typeOfReturnedValue: 'select#value-type-returded',
    dataSourceSectionBtn: 'button[data-cy="accordion-DataSource"]',
    optionsVaraibleTxtBx: 'input[placeholder="Request Variable Name"]',
    dataConnectorDropDown: 'select#data-sources-list',
    contentTxtBx: 'input#value',
    endPointDropDown: 'select#endpoint-list',
    endPointOptions: '[value="option"]',
    richTextContentTxtArea: '[data-cy="inspector-content"]',
    saveScreenBtn: 'button[title="Save Screen"]',
    saveVersionsBtn: 'button[title="Save Versions"]',
    savePublishVersionsBtn: 'button[title="Publish"]',
    optionsLabelTxtBx:"[data-cy='inspector-options-label']",
    variableDataProTxtBx:"[data-cy='inspector-options-value']",
    labelNameTxtBx:'[data-cy="inspector-label"]',
    dateDropDownbtn:"(//div[@data-cy='inspector-dataFormat']//div)[1]",
    dateValueBx:"//span[text()='type']",
    versionNameTxtBx: '[id="name"]',
    aditionalDetailsTxtArea: '[id="save-additional-details"]',
    alertSuccess: 'div[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]',
    loadingSpinnerScreen : '#screenIndex > .data-table > .jumbotron > .container > :nth-child(1)',
    searchInputBox1:"#screenIndex > #search-bar > :nth-child(1) > .flex-grow-1 > #search > .input-group > #search-box",
    searchInputBox:"[id='search'] input",
    editctrlBtn: "(//i[contains(@class,'fas fa-pen-square fa-lg fa-fw')])[1]",
    configctrlBtn: "(//i[contains(@class,'fas fa-cog fa-lg fa-fw')])[1]",
    versionHistoryTab: "[id='screen-version-tab']",
        onlyShowVersionLabel: "[class='custom-control-label']",
        copyVersionLink: "//i[@class='fas fa-copy']",
        copyNextVersionLink: "/following::i[@class='fas fa-copy']",
        confirmSaveVersionBtn: "button[class='btn btn-sm btn-secondary']",
    contentTable: "[data-cy='editor-content']",
    element: "[data-cy='screen-element-container']",
    optionBtn:'[data-cy="inspector-add-option"]',
    optionValueInput:'[data-cy="inspector-option-value"]',
    optioncontentInput:'[data-cy="inspector-option-content"]',
    optionsaveBtn:'[data-cy="inspector-option-save"]',
    optionVerifyBtn:"//div[text()[normalize-space()='content']]",
    columnBtn:'[data-cy="accordion-Columns"]',
    addIconBtn:'[class="fas fa-plus-square"]',
    columnInputTxtBx:'[id="option-content"]',
    valueInputTxtBx:'[id="option-value"]',
    saveBtnForColumn:'[class="btn btn-sm btn-secondary"]',
    pageBtn:'[title="Add New Page"]',
    pageInputTxtBx:'[name="Page Name"]',
    pageSaveBtn:'//button[text()="Save"]',
    searchInput:'(//*[@id="search-box"])[1]',
    searchScreen:'[data-cy="input-search"]',
    editBtn:'//span[text()[normalize-space()="screenName"]]//ancestor::tr//button[@title="Edit"]',
    textInputValue:'(//span[text()="screenName"])[1]',
    //recordListTxt:"(//div[@data-cy='screen-element-container'])[2]",
    selectBtnValue:'//select[@data-cy="toolbar-page"]',
    editableChckBx:'//label[text()="Editable?" and @class="form-check-label"]',
    recordFormInput:'//label[text()="Record Form"]/..//div//div[@class="multiselect__tags"]',
    recordFormValue:'//span[text()="page"]',
    configBtn:'[data-cy="accordion-Configuration"]',
    importPlusBtn:'[data-cy="button-import-screen"]',
    fileBtn:'input[type="file"]',
    importBtn:'//button[text()[normalize-space()="Import"]]',
    listScreensBtn:'[data-cy="button-list-screen"]',
    varaibleNameTxtBxFD:'[data-cy="inspector-name"]',
    screenTabelBx:'[data-cy="screens-table"]',
    screenContainer:'//div[@id="screenIndex"]//div[@class="container text-center"]',
    screenPresenceVal:'[id="nav-sources"] [data-cy="no-results-message"]',
    noDataAvaiable: '[class="vuetable-empty-result"]',
    LoadingIcon:'[class="container-fluid"] [class="lds-gear"]',
    screenIndex: '[id="screenIndex"]',
    //validation rule
    clickonaddrule: "//button[text()='Add Rule']",
    clickonaddruleDrpDwn: "(//div[@data-cy='select-rule']//div)[1]",
    selectrule: "//span[text()='name']",
    dateselectrule: "(//span[text()='Date'])[2]",
    addRuleInputTxtBx: "//label[text()='Date']/following::input[1]",
    minValueInputTxtBx: "//label[text()='Min']/following::input[1]",
    maxValueInputTxtBx: "//label[text()='Min']/following::input[2]",
    InvalueInputTxtBx:"//label[text()='Values']/following::input[1]",
    clickonUpdateBtn: "//button[text()='Update']",
    maxLengthInputTxtBx: "//label[text()='Max Input']/following::input[1]",
    minInputTxtBx: "//label[text()='Min Input']/following::input[1]",
    regexInputTxtBx: "//label[text()='Regex Pattern']/following::input[1]",
    ValidationInputTxtBx: "//input[@validation='required']",
    VrblvalueInputTxtBx: "//label[text()='Variable Value']/following::input[1]",
    clickAddRuleInputTxtBx: "//label[text()='Validation Rules']/following::input[1]",
    clickonplus: "//a[@data-cy='inspector-add-option']",
    clickonvalueInptBx:"//label[text()='Value']/following::input[1]",
    clickoncontentInptBx:"//label[text()='Content']/following::input[1]",
    clickonsaveBtn:"//button[text()[normalize-space()='Publish']]",
    //nested screen
    nestedscreenDrpDwnBtn:"(//div[@role='combobox']//div)[1]",
    nestedscreenInputTxtBX:"//label[text()='Screen']/following::input[1]",
    selectnestedscreen:"//span[text()='name']",
    clickonAdvanced :"//button[text()[normalize-space()='Advanced']]",
    clickonVisibilityTxtBx:"//label[text()='Visibility Rule']/following::input[1]",
    //watchers
    searchWatcher:"//input[@placeholder='Search']",
    verifyWatcher:"//td[text()='watcherName']",
    editWatcher:"//i[contains(@class,'fas fa-edit')]",
    srcBtn:"//button[@data-cy='watchers-accordion-source']",
    srcBtn2:"(//div[@data-cy='watchers-watcher-source']//div)[1]",
    watcherNameTxtBX:"(//input[@placeholder='None'])[2]",
    selectSrcValue:"//span[text()='name']",
    saveWatcher:"//button[@data-cy='watchers-button-save']",
    verifyPopUp:"//div[@role='alert']",
    clickonwatchers:"//button[@title='Watchers']",
    clickonaddwatcher:"//button[@data-cy='watchers-add-watcher']",
    clickonwatcherNmTxtBx:"//label[text()='Watcher Name *']/following::input[1]",
    clickonvaraibleTxtBx:"//label[text()='Watcher Name *']/following::input[2]",
    selectTheVaraible:"//span[text()='name']",
    enableSynchronously:"//label[text()='Run Synchronously']",
    clickonSourceBtn:"(//button[contains(@class,'p-3 btn')])[2]",
    clickonSourceDrpDwn:"(//div[@data-cy='watchers-watcher-source']//div)[1]",
    clickonSourceInptTxtBx:"//label[text()='Source *']/following::input[1]",
    clickonOutput:"(//button[@data-cy='watchers-accordion-output']//i)[3]",
    selectSrcript:"//span[text()='name']",
    clickonOutputTxtBx:"//input[@data-cy='watchers-watcher-output_variable']",
    clickonWatchersSaveBtn:"//button[text()[normalize-space()='Save']]",
    watcherScrnVerify:"//button[@data-cy='watchers-add-watcher']",
    closethewatchers:"//div[@id='watchers-popup']//button[text()='×']",
    clickonClmSaveBtn:"//button[text()[normalize-space()='Save']]",
    clickonColumns:"//button[text()[normalize-space()='Columns']]",
    clickonClmnPlusBtn:"//a[@class='fas fa-plus-square']",
    clickonHeaderTxtBx:"//label[text()='Column Header']/following-sibling::input[1]",
    clickonValueTxtBx:"//label[text()='Column Header']/following-sibling::input[2]",
    clickonvaraibleDrpDw:"(//div[@data-cy='watchers-watcher-variable']//div)[1]",
    recordListTxt:"(//div[@class='card'])[A]",
    sucessToastMsg: "//div[contains(@class,'alert d-none')]",
    pressDayBtn: 'td[data-action="selectDay"]',
    pressCloseBtn: 'a[data-action="close"]',
    changeCalentarTimer: 'td > a[data-action="togglePicker"]',
    pressIncrementHours: '[data-action="incrementHours"]',
    pressDecrementHours: '[data-action="decrementHours"]',
    pressCustomHour: '[class="vdpHoursInput"]',
    selectCustomHour: '[data-action="selectHour"]',
    pressIncrementMinute: '[data-action="incrementMinutes"]',
    pressDecrementMinute: '[data-action="decrementMinutes"]',
    pressCustomMinute: '[class="vdpMinutesInput"]',
    selectCustomMinute: '[data-action="selectMinute"]',
    pressPrevious: '[data-action="previous"]',
    pressNext: '[data-action="next"]',
    pressCenterOption: '[data-action="pickerSwitch"]',
    selectCustomMonth: '[data-action="selectMonth"]',
    selectCustomYear: '[data-action="selectYear"]',
    screenVerifyBx:'[class="vuetable-body"] [class="vuetable-slot"] a',
    valueTxtBx:'[id="key"]',
    CategoryTxt:'[class="multiselect__tag"] span',
    navPageBtn:'[data-cy="toolbar-page"]',
    selctBx:'(//div[@data-cy="screen-element-container"])[1]',
    //add json code to select list
    clickonEditasJson: "//button[text()[normalize-space()='Edit as JSON']]",
    clickonExpand: "[class='fas fa-expand']",
    clickonTxtJson: "(//div[@class='view-line'])[1]",
    clickonclose: "[data-cy='inspector-monaco-json-expanded-close']",
    //copy screen
    clickOnCopyBtn:"(//button[@class='btn btn-link']//i[@class='fas fa-copy fa-lg fa-fw'])[1]",
    clickOnSaveBTn: '[class="btn btn-secondary ml-2"]',
    saveScreen:"(//button[@class='btn btn-secondary'])[2]",
    clickOnReadOnly:"//label[@class='form-check-label']",
    //placholder textarea
    SignatureCheckBox: "(//input[@type = 'checkbox'])[1]",
    radioDropDownBtn: '[data-cy=inspector-render-as]',
    clickOnReadOnlyCheckBox: "//input[@data-cy = 'inspector-readonly']",
    clickOnConfire: "//button[@data-cy = 'accordion-Configuration']",
    placeholderInput: "//input[@data-cy = 'inspector-placeholder']",
    helperTextInput: "//input[@data-cy = 'inspector-helper']",
    richTextcheckBox: "//input[@data-cy = 'inspector-richtext']",
    rowsInput: "//input[@data-cy = 'inspector-rows']",
    defaultValueInput: "//input[@data-cy = 'inspector-defaultValue-basicValue']",
    VisibilityRuleInput: "//input[@data-cy = 'inspector-conditionalHide']",
    cssNameInput: "//input[@data-cy = 'inspector-customCssSelector']",
    arialabelInput: "//input[@data-cy = 'inspector-ariaLabel']",
    taborderInput: "//input[@data-cy = 'inspector-tabindex']",
    designBtn: "//button[@data-cy = 'accordion-Design']",
    textcolorBtn: "(//div[@role = 'group']//button[@title = 'textcolor'])[1]",
    backGroundcolorBtn: "(//div[@role = 'group']//button[@title = 'backgroundcolor'])[2]",
    ValueInput: "//input[@data-cy = 'inspector-fieldValue']",
    allowMultipleUploads: "//label[text()='Upload multiple files']",
    //saved search chart
    clickOnQueryInptTxtBx:"(//input[@type='text'])[7]",
    clickOnChartDrpDwn:"//div[@class='multiselect__select']",
    chartInptBx:"//input[@class='multiselect__input']",
    clickOnChart:"//li[@class='multiselect__element']//span[text()='name']",

    // Photo/Video 

    captureTypePhotoVideo:'//*[@id="captureType"]',
    fileNamePhotoVideo: "//input[@data-cy='photo-video-inspector']",
    
    // projects
    addProjectModel: '//div[@class="modal-body"]',

    //Conversional Form
    inputConversational: '//*[@class="user-input"]//input',
    submitConversational: '//*[@aria-label="Submit"]'
}