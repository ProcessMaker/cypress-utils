export default {
    //Settings
    settings_descriptions: '[aria-label="Description"]',
    settings_selectListIcon: '(//*[@class="multiselect__tags"])[1]',
    settings_inputIcon: '(//*[@class="multiselect__tags"])[1]//input',
    settigns_textIcon: '//*[@class="modal-content"]//*[contains(@class,"multiselect-icons")]//span/span',
    settings_uploadImage: '//input[@type="file"]',
    settings_saveConfiguration: '//button[contains(text(),"Save")]',
    settings_cancelConfiguration: '//*[contains(@class,"footer")]//button[contains(text(),"Cancel")]',
    settings_versionInfoButton: '//button[contains(., "Version")]',
    settings_launchPadButton: '//button[contains(., "Launchpad")]',
    addReports: '//button[@aria-label="Add Reports"]',
    publishSuccessAlert: '[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]',

    launch_category: '//*[contains(text(),"category")]',
    launch_searchProcess: '[id="search-box"][placeholder="Search Processes"]',
    launch_searchProcessButton: '[title="Search Processes"]',
    launch_cardProcess: '//*[contains(text(),"processName")]',
    launch_startProcessButton: '//*[contains(text(),"Start this")]',
    launch_elipsis: '//*[contains(@class,"ellipsis")]//button',
    processCategoryLabel: "//div['.list-group']/div[contains(text(),'element')]",
    processLabel: "//div['.card-info']/span[contains(text(),'label')]",
    bookmarkSelection: "//div['.card-info']/span[contains(text(),'label')]/ancestor::p/div['.card-bookmark']/i",
    ellipsisMenu: '//button[@aria-haspopup="menu"]/i[".fas fa-ellipsis-h ellipsis-menu-icon p-0"]',
    optionMenuElement: "//div/li['.ellipsis-dropdown-item mx-auto']/a/div['.ellipsis-dropdown-content']/span[contains(text(), 'option')]",
    startEvent: '//p[contains(text(),"start")]/parent::div//button',
    launchPadSettingOption: '//a[contains(., "Launchpad Settings")]',
    inputSearchCategories: '//input[@placeholder="Search Categories"]',
    categoryFound: "//div['#infinite-list']/div[contains(text(),'category')]",
    bookMarkedSuccessAlert: '[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]'

}