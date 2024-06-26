export default {

    importButtonTemplates: '//*[@id="import_template"]',
    inputToFileUploadTemplates: "//label[@id='submitFile']/input[@type='file']",
    importBtnTemplates: "//button[@type='button']/span[text()='Import']",
    addTemplates: '//button[@class="btn mb-3 mb-md-0 ml-md-2 btn-secondary"]',
    tabTemplates: '//*[@id="nav-templates-tab"]',
    threePointsBtnXpathTemplate:'//*[@data-cy="processes-template-table"]//button[@aria-haspopup="menu"]',
    searchBoxTemplate:'//div[@id="templatesIndex"]//input[@aria-label="Search"]',
    nameTemplate:'//*[@id="name"]',
    templateTableBody:'//div[@id="categorizedList"]/ul/li/a[@id="nav-sources-tab"]//ancestor::div[@id="categorizedList"]/descendant::div[@id="templatesIndex"]//tbody', 
    templateTable:'//div[@id="categorizedList"]/ul/li/a[@id="nav-sources-tab"]//ancestor::div[@id="categorizedList"]/descendant::div[@id="templatesIndex"]//tbody/tr',
    btnImportAsNew:'.d-flex > div > .btn-primary',
    templateIndex: '//div[@class="modal-body"]',
    noDataAvailable: '[class="vuetable-empty-result"]',
    searchTemplate: '//input[@placeholder="Search Templates"]',
    addProcessBtn:'[aria-label="Create Process"]',
    useTemplate:':nth-child(2) > .d-flex > .btn',
    saveBtnInPopUp: '//button[text()="Save"]',
    nameTxtBx: '[name="name"]',

}