export default{

    tablePMBlocks:'//div[@id="pmBlockList"]//div[@class="data-table"]',
    saveBtnPublish: '//*[@id="createPmBlock___BV_modal_footer_"]/div/div/button[2]',
    searchInputPmblock: '//div[@id="pmBlockList"]//textarea',
    threePointsBtnXpathPmblock: '//div[@id="pmBlockList"]//table/tbody/tr//button[@aria-haspopup="menu"]',
    confirmBtnArchive: '//button[text()="Confirm"]',
    searchInputPmblockArchived: '//*[@id="search-bar"]//textarea', 
    threePointsBtnXpathPmblockArchived: '//*[@id="search-bar"]//textarea',
    namePMBlock: '//*[@id="name"]',
    configurePMBlock: '//*[@id="formPmBlock"]',
    importButtonPMBlocks: '//*[@id="search-bar-data-source"]//button',
    tittleImportPMBlocks: '//*[@id="importPmBlock"]//h5',
    inputToFileUploadPMBlocks: "//label[@id='submitFile']/input[@type='file']",
    importBtnPMBlocks: "//button[@type='button']/span[text()='Import']",
    loadingPMBlockSpinner: "[class='fas fa-circle-notch fa-spin']",
    savePMBlock: "[class='btn btn-secondary ml-3']",
    saveBtnConfigurePMBlock: "//button[contains(text(),'SAVE')]",
    PMBlockList:'[id="pmBlockList"]',
    iconFieldXpath: '//div[@class="modal-body"]//div[@name="icon"]',
    iconFieldTxtXpath: '//div[@class="modal-body"]//legend[contains(text(),"Icon")]/following-sibling::div//input',
    tabPMBlockModeler: '//*[@data-test="explorer-rail"]//a[contains(text(),"PM")]',
    searchPMBlockModeler: '//div[@id="searchNodeTypes"]//input[@placeholder="Search PM Blocks"]',
    tabInboundConfiguration: '//li[@role="presentation"][@class="nav-item"]//*[contains(text(),"Inbound Configuration")]',
    tabPanel: '//li[@role="presentation"][@class="nav-item"]//*[contains(text(),"Panel")]',
    contentInbound:'//div[@class="view-lines monaco-mouse-cursor-text"]',
    saveInboundConfiguration: '[class="btn btn-secondary ml-3"]',
    loadingSpinnerPMBlock:
        "(//div['.icon-container']/h3[contains(text(),'Loading')])[1]",
    lineInputPmBlock: '[name="form_input_1"]',
    selectListPmBlock: '[name="config"]',
    loopControlPanel: '[data-cy="controls-PmBlockFormLoop"]',
    collapsedConfigurationPMBlock:'//*[@id="collapse-configuration"]',
    selectListPMBlock1:'(//*[@class="multiselect__select"])[1]',
    selectListPMBlock2:'(//*[@class="multiselect__select"])[2]',
    selectListPMBlock3:'(//*[@class="multiselect__select"])[3]',
    lineInputLoop1:'(//input[@name="form_input_1"])[1]',
    lineInputLoop2:'(//input[@name="form_input_1"])[2]',
    lineInputLoop3:'(//input[@name="form_input_1"])[3]',
    richTextLoop1:'(//div[text()="Test Case  TCP4-3774"])[1]',
    richTextLoop2:'(//div[text()="Test Case  TCP4-3774"])[2]',
    richTextLoop3:'(//div[text()="Test Case  TCP4-3774"])[3]',
    addItemLoop:'//button[@title="Add Item"]',
    RTLoopAllow1:'(//div[contains(text(),"add")])[1]',
    RTLoopAllow2:'(//div[contains(text(),"add")])[2]',
    RTLoopAllow3:'(//div[contains(text(),"add")])[3]',
    RTLoopAllow4:'(//div[contains(text(),"add")])[4]',
    RTLoopAllow5:'(//div[contains(text(),"add")])[5]',
    uploadPhotoCamara: '//*[@class="btn btn-upload"]',

}