export default {
    avatar: '[id="avatarMenu"]',
    assetsProcesses: '//p[contains(text(),"Processes")]',
    assetsScreens: '//p[contains(text(),"Screens")]',
    assetsScripts: '//p[contains(text(),"Scripts")]',
    assetsDecisionTables: '//p[contains(text(),"Decision Tables")]',
    assetsDataConnectors: '//p[contains(text(),"Data Connectors")]',
    myTasks: '//p[contains(text(),"My Tasks")]',
    tasks: '//th/div/div/span[contains(text(),"Task")]',
    case: '//th/div/div/span[contains(text(),"Case")]',
    due:'//th/div/div/span[contains(text(),"Due")]',
    menuTaskExpansion: '(//div/a[@href="#"]/i)[1]',
    searchTask: '(//button/i[@class="fas fa-search"])[1]',
    inputTask: '//div/div/input[@class="form-control narrow-input"]',
    eyeHardcoded: '(//a[contains(text(),"A")]/ancestor::tr/td/span/i[@class="fa fa-eye"])[1]',
    myCases: '//p[contains(text(),"My Cases")]',
    numberCase: '//th/div[contains(text(),"Case #")]',
    nameCase: '//th/div[contains(text(),"Case title")]',
    statusCase: '//th/div[contains(text(),"Status")]',
    searchRequest: '(//button/i[@class="fas fa-search"])[2]',
    inputRequest: '//div/div/input[@class="form-control narrow-input"]',
    hrefRequestHarcoded: "//span[contains(text(),'processName')]/ancestor::tr/td/div/div/a",
    menuRequestExpansion: '(//div/a[@href="#"]/i)[2]',
    searchRequestProcess: '(//button/i[@class="fas fa-search"])[3]',
    inputProcess: '//div/div/input[@class="form-control narrow-input"]',
    processFoundHarcodedStartFound: "//span[contains(text(),'process')]/ancestor::div[@class='d-flex justify-content-between']/div/button[contains(text(),'Start')]",
    importProjectButtonList: '//button[@aria-label="Import Project"]',
    loadingSpinnerProject: "(//div['.icon-container']/h3[contains(text(),'Loading')])[1]",
    projectList: "//tbody['.vuetable-body']/tr",
    optionButtonDesigner: "//button['.btn custom-button mb-2 btn-secondary btn-sm btn-block']/p[contains(text(),'option')]",
    assetVerification: "//td/a[contains(text(),'asset')]",
    cardWelcomeScreen: "[class='card']",
    headerCard: "//*[@class='card']//thead//*[contains(text(),'textHeader')]",
    dropdownMyCases: "//*[contains(text(),'My Cases')]/parent::div//*[@aria-haspopup='menu']",
    dropdownItem: "//*[@class='dropdown-item']/*[contains(text(),'itemName')]",
    viewAllWelcome: "//*[contains(text(),'View All')]/parent::button[@aria-haspopup='menu']",
    searchBtn: "//*[@class='fas fa-search']/parent::button",
    searchInput: "[class='form-control narrow-input']"
 };