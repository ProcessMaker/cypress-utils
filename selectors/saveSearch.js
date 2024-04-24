export default {
    //search one process
    searchprocesses: '[aria-owns="listbox-0"] > .multiselect__tags',
    selectprocesses: '#process_name_filter',
    search: 'fas fa-search',
    savesearch: 'fas fa-folder-plus',
    //For create a new save search
    nameSaveSearch: '[name="title"]',
    Save: '#save-search-modal___BV_modal_footer_ > button.btn.btn-secondary',
    //Edit a save search
    viewsearch: '[class="fas fa-table fa-lg fa-fw"]',
    //Send Report
    sendreport: '[title="Send Report"]',
    sendto: '[name="sendTo"]',
    emailsubject: '#emailSubject',
    emailbody: '#emailBody',
    send: '[class="btn btn-secondary ml-2"]',
    //scheduled reports
    scheduled: '[title="Scheduled Reports"]',
    addscheduled: '[class="btn mb-3 btn-secondary"]',
    selectday: '[aria-label="Tuesday"]',
    selecttime: '//button[@class="btn h-auto"]',
    selecthour: '//button[@class="btn btn-sm border-0 rounded-0"]',
    closehour: '//button[@class="btn btn-outline-secondary btn-sm"]',
    sendto2: '//input[@class="form-control"]',
    subject: '[class="form-control"]',
    body: '[class="form-control"]',
    saveschedule: '[class="btn ml-3 btn-secondary"]',
    //Configurations save search
    configure: "//text()[contains(.,'Configure')]/ancestor::a[1]",
    sharedwithgroups: '#nav-groups-tab',
    saveconfiguration: '#nav-group-permissions > div.d-flex.justify-content-end.mt-3 > button.btn.btn-secondary.ml-3',
    //actions save search
    hideButton:"//button[@title='Hide Saved Search']/i",
    viewButton:"//a[@title='View']/i",
    configureButton:"//a[@title='Configure']/i",
    deleteButton:"//button[@title='Delete']/i",
    //Save Search configuration
    clickOnSaveSearchCnfgrtn:"(//a[contains(@class,'secondary')])[2]",
    verifySaveSearchConfgrtPg:"//a[text()='Configuration']",
    //add columns to save search
    clickOnColumns:"//a[text()='Columns']",
    clickOnAddCustmClmns:"//i[@class='fa fa-fw fa-plus']",
    verifyAddClmnspop:"//h5[text()='Create Custom Column']",
    clickOnLabelTxtBx:"(//input[@class='form-control'])[3]",
    clickOnFeildTxtBx:"(//input[@class='form-control'])[4]",
    clickOnFormatDrpDwn:"(//div[@class='multiselect__select'])[2]",
    clickOnFormatInputBx:"(//input[@class='multiselect__input'])[2]",
    enableTheSortable:"//label[normalize-space(text())='Sortable']",
    clickOnSaveBtn:"//button[@class='btn btn-secondary ml-2']",
    saveTheAddColumns:"(//button[@class='btn btn-secondary ml-3'])[2]",
    //create charts
    clickOnSaveSearchName:"//ol[contains(@class,'breadcrumb')]//li[3]",
    clickOnChartsOptn:"//a[contains(text(),'Charts')]",
    clickOnPlusChartsBtn:'//button[contains(@class,"btn-secondary")]',
    clickOnNameTxtBx:"//label[text()='Name']/following-sibling::input",
    selectChartType:"//div[@class='chart-type-selector mt-n2']/descendant::button[A]",
    clickOnSave:"//button[@class='btn btn-secondary ml-3']",
    //Add Source To Charts
    clickOnSourceOptn:"//a[normalize-space(text())='Source']",
    clickOnSeriesDrpDwn:"(//label[text()='Series']/following::div[@class='multiselect__select'])[1]",
    clickOnSeriesInptBx:"//label[text()='Series']/following::input[1]",
    clickOnMetricDrpDwn:"(//label[text()='Series']/following::div[@class='multiselect__select'])[3]",
    clickOnMetricInptBx:"//label[text()='Metric']/following::input[1]",
    clickOnSumBtn:"//button[text()[normalize-space()='Sum']]",
    clickOnMetricType:"//span[text()='name']",
    saveTheSource:"//button[text()[normalize-space()='Save']]",
    clickOnSeriesValue:"(//div[normalize-space(text())='name'])[1]",
    clickOnMetricValue:"(//div[normalize-space(text())='name'])[3]"

}