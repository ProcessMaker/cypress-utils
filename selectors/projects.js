export default {
    // Projects
    categoryProjectsTab: '//*[@id="nav-categories-tab"]',
    projectsTab: '//*[@id="nav-sources-tab"]',
    createCategoryProject: '//*[@id="create_category"]',
    nameCategory: '//*[@id="name"]',
    saveBtnCatProjects: '//*[@id="createCategory"]//button[2]',
    searchCatProjects: '//*[@id="search-box"]',
    addProject: '//button[@class="btn mb-3 mb-md-0 ml-md-2 btn-secondary"]',
    importButtonProject: '//button[@class="btn btn-outline-secondary"]',
    nameAddProject: '(//*[@class="form-control"])[2]',
    membersProjects: '(//*[@class="multiselect__tags"])[2]',
    addButtonProject:
        '//*[@id="addProject___BV_modal_footer_"]/div/div/button[2]',
    projectCategoryFieldXpath: '(//*[@class="multiselect__tags"])[1]',
    projectAsset:"//div[@aria-label='Select Project']",
    projectName: '//li[@role="option"]//span[text()="projectName"]',
    projectsearch: "//td[@class='vuetable-slot']//a[contains(text(),'project')]",
    projectMembersSelect:
        '[data-cy="project-member-select"] .multiselect__tags',
    projectMembersSelectInOpenPage: ".multiselect .multiselect__tags",
    editBtnProject: '//*[@id="projectList"]/div[2]/div/table/tbody/tr[1]/td[6]',
    optionCatXpath:
        '//*[@id="projectList"]/div[2]/div/table/tbody//button[@aria-haspopup="menu"]',
    threePointsBtnXpathProjects:
        '//*[@id="projectList"]/div[2]/div/table/tbody//button[@aria-haspopup="menu"]',
    threePointsScreenProjects: "//div[@data-cy='asset-listing-table']//button[@aria-haspopup='menu']",
    threePointsScriptProjects: "//div[@data-cy='asset-listing-table']//button[@aria-haspopup='menu']",    
    searchProjects: '//*[@id="search-bar-data-source"]//textarea',
    assignProjects: '//button[contains(text(),"Add")]',
    inputToFileUploadProjects: "//label[@id='submitFile']/input[@type='file']",
    importBtnProjects: "//button[@type='button']/span[text()='Import']",
    deleteCategory: "//span[text()='Delete Category']",
    confirmDeleteCategory: "//button[@class='btn m-0 btn-secondary']",
    categoryWasDeleted: "//*[@id='nav-collapse']/div",
    addProjectModel: '//div[@class="modal-body"]',
    invalidFeedback: '//div[contains(@class, "invalid-feedback")]',
    spanLabelProject:
        "//div[@class='multiselect__tags-wrap']/span/span[contains(text(),'project')]",
    threePointBtnXptahCatProject:
        '//*[@id="categories-listing"]/div[2]/div/table/tbody//button[@aria-haspopup="menu"]',
    exportButton:
        "//button[contains(@class, 'btn-primary') and contains(text(), 'Export')]",
    addAssetButton: '[data-cy="add-asset-ellipsis"]',
    addProcessAssetButton: '//li[contains(@class, "asset_type_process")]',
    addScriptAssetButton: '//li[contains(@class, "asset_type_script")]',
    addScreenAssetButton: '//li[contains(@class, "asset_type_screen")]',
    addDecisiontableAssetButton:
        '//li[contains(@class, "asset_type_decision_table")]',
    newAssetButton: '[data-cy="asset-search-menu"] button.btn.addBtn',
    assetListingTable: '[data-cy="asset-listing-table"]',
    addAssetPmqlInput: 'textarea[aria-label="Search PM"].pmql-input',
    importProjectButtonList: '//button[@aria-label="Import Project"]',
    loadingSpinnerProject:
        "(//div['.icon-container']/h3[contains(text(),'Loading')])[1]",
    projectList: "//tbody['.vuetable-body']/tr",
    confirmAsset: "//button[text()='Confirm']",
    searchAssetScreenInProject: "//*[@class='pmql-input']",
    searchAssetScriptInProject: "//*[@class='pmql-input']",
    exportScreenInProject:"//button[contains(@class, 'btn btn-secondary ml-2') and contains(text(), 'Download')]",
    confirmDeleteAsset:"//button[text()='Confirm']",
};
