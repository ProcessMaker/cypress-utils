export default{
    //Main Decision Table
    tabDecisionTables: '[id="nav-sources-tab"]',
    addDTbutton: 'button[aria-label="Create Table"]',
    importDTbutton: 'button[aria-label="Import Decision Table"]',
    searchDTinput:'(//input[@aria-label="Search"])[1]',
    searchDTbutton:'(//button[@aria-label="Search"])[1]',
    loadingSpinnerDT:'[class="jumbotron jumbotron-fluid"]',
    editDTbutton:'//div[@data-cy="decision-table-ellipsis"]//ul//li//*[contains(text(),"Edit")]//parent::div//i',    
    configureDTbutton:'//div[@data-cy="decision-table-ellipsis"]//ul//li//*[contains(text(),"Configure")]//parent::div//i',
    copyDTbutton:'//div[@data-cy="decision-table-ellipsis"]//ul//li//*[contains(text(),"Copy")]//parent::div//i',
    exportDTbutton:'//div[@data-cy="decision-table-ellipsis"]//ul//li//*[contains(text(),"Export")]//parent::div//i',
    addToProjectDTbutton:'//div[@data-cy="decision-table-ellipsis"]//ul//li//*[contains(text(),"Add to Project")]//parent::div//i',
    deleteDTbutton:'//div[@data-cy="decision-table-ellipsis"]//ul//li//*[contains(text(),"Delete")]//parent::div//i',
    selectPaginationInDT:'//div[@data-cy="datasource-pagination"]//button[@class="btn dropdown-toggle pagination-dropup"]',
    tableDT:'(//div[@class="data-table"]//tbody)[1]',
    uncategorized:'//label[text()="Category"]//parent::div//span[text()="Uncategorized"]',
    currentPage:'(//div[@class="pagination-nav-item item active large"])[1]',
    menuDT:'//div[@data-cy="decision-table-ellipsis"]//i',
    
    //Create Decision Table
    addDTnameField: '//input[@name="name"]',
    addDTdescriptionField: '//textarea[@name="description"]',
    addDTsaveButton: '//button[contains(text(),"Save")]',
    addDTcancelButton:'//button[contains(text(),"Cancel")]',
    alert:'[role="alert"]',
    alertSuccess:
        '//div[@class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]',

    //Edit Decision Table
    importButtonInEditDT:'button[title="Import"]',
    exportButtonInEditDT:'button[title="Export"]',
    closeButtonInEditDT:'button[title="Cancel"]',
    saveButtonInEditDT:'button[title="Save"]',
    
    //Configure Decision Table
    nameFieldInconfigureDT: '//label[text()="Name"]/following-sibling::input',
    descriptionFieldInconfigureDT: '//label[text()="Description"]/following-sibling::textarea',
    saveButtonInconfigureDT: '//button[contains(text(),"Save")]',
    cancelButtonInconfigureDT:'//button[contains(text(),"Cancel")]',

    //Delete Decision Table
    confirmDeleteButton:'//button[contains(text(),"Confirm")]',

    //Import DecisionTable
    importBtn:'//button[contains(text(),"Import")]',
    inputToFileUpload: "[type='file']",
    selectFileFromComputer: '//label[normalize-space()="Select file from computer"]//input',
    tableContainer:'//div[@id="decisionTableIndex"]//div[@class="container text-center"]',
    //Main Category
    tabCategory:'a[id="nav-categories-tab"]',
    addCategoryButton: 'button[aria-label="Create Category"]',
    searchCategoryInput:'(//input[@aria-label="Search"])[2]',
    searchCategoryButton:'(//button[@aria-label="Search"])[2]',
    editCategorybutton:'(//div[@class="data-table"])[2]//button[@title="Edit"]',
    deleteCategorybutton:'(//div[@class="data-table"])[2]//button[@title="Delete"]',
    labelCategory:'//label[text()="Category"]',
    divContainerOptionCategory:'//label[text()="Category"]/parent::div//div//div[@class="multiselect__tags"]',
    inputCategory:'input[aria-placeholder="type here to search"]',
    wrapperCategory:'//label[text()="Category"]/parent::div//div[@class="multiselect__content-wrapper"]//li[1]',
    selectPaginationInCategory:'(//select[@aria-label="Per page"])[2]',
    tableCategory:'(//div[@class="data-table"]//tbody)[2]',
    menuCategoryDT:'//div[@data-cy="category-ellipsis"]//i',

    //Create Category
    nameFieldInCreateCategory:'//input[@id="category-name"]',

    //Import dmn
    importDMNBtn: '//div[@class="modal-content"]//button[contains(text(),"Import")]',

    //Preview
    sampleInput: '[aria-controls="input"]',
    output: '[aria-controls="output"]',
    fileImport: '[aria-controls="import"]',
    runBtn: '//button[contains(text(),"Run")]',

    //File import
    downloadFormatBtn: '//a[contains(text(),"Download format")]',
    uploadFile: '[id="input-file-dt"]',
    uploadFileBtn: '.decision-file-area > .btn',
    confirmBtn: '//button[contains(text(),"Confirm")]',
    labelConfirm: '//h5[contains(text(),"Are you sure you want to upload the file ?")]',
    loadBtn: '//button[contains(text(),"Load")]',
    cancelBtn: '//button[contains(text(),"Cancel")]',
    nameFileUploaded: '[class="decision-file-uploaded-name"]',
    deleteUploadedFile: '//i[@class="fas fa-times"]//parent::button',

    //Formula
    formulaBtn: '//i[@class="fas fa-code"]//parent::button',
    modalFormula: '[id="formulaModal"]',
    labelFormula: '//h5[contains(text(),"Formula")]',
    okBtn: '//button[contains(text(),"OK")]',
    cancelBtnInModal: '//footer//button[contains(text(),"Cancel")]',

    //Menu to rows
    menuRow: '[class="context-menu"]',
    addRowAbove: '//div[@class="context-menu"]//li[contains(text(),"Add Row Above")]',
    addRowBelow: '//div[@class="context-menu"]//li[contains(text(),"Add Row Below")]',
    moveRowAbove: '//div[@class="context-menu"]//li[contains(text(),"Move Row Above")]',
    moveRowBelow: '//div[@class="context-menu"]//li[contains(text(),"Move Row Below")]',
    removeRow: '//div[@class="context-menu"]//li[contains(text(),"Remove")]',

    //Menu to Columns
    menuColumn: '[class="context-menu"]',
    addColumnLeft: '//div[@class="context-menu"]//li[contains(text(),"Add Column Left")]',
    addColumnRight: '//div[@class="context-menu"]//li[contains(text(),"Add Column Right")]',
    moveColumnLeft: '//div[@class="context-menu"]//li[contains(text(),"Move Column Left")]',
    moveColumnRight: '//div[@class="context-menu"]//li[contains(text(),"Move Column Right")]',
    removeColumn: '//div[@class="context-menu"]//li[contains(text(),"Remove")]',
}