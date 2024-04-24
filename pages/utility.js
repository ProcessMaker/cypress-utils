import selectors from "#selectors/process";
import {Login} from "./login";
import {Requests} from "./requests";

const login = new Login();
const request = new Requests();

export class Utility {
    fillLineInput(label, position, value){
        cy.xpath('(//label[contains(text(),"'+label+'")]/following-sibling::input)['+position+']').clear().type(value)
    }
    fillSelectList(label, position, value){
        cy.xpath('(//label[contains(text(),"'+label+'")]/parent::div//div[@class="multiselect__tags"])['+position+']').click();
        cy.xpath('(//label[contains(text(),"'+label+'")]/parent::div//div[@class="multiselect__tags"]//input)['+position+']')
            .should('be.visible');
        cy.xpath('(//label[contains(text(),"'+label+'")]/parent::div//div[@class="multiselect__tags"]//input)['+position+']')
            .type(value).should('have.value',value);
        cy.xpath('(//label[contains(text(),"'+label+'")]/parent::div//div[@class="multiselect__tags"]//input)['+position+']')
            .type("{enter}");
    }
    clickButton(label, position){
        cy.xpath('(//button[contains(text(),"'+label+'")])['+position+']').click();
    }
    clickCheckBox(label, position){
        cy.xpath('(//label[contains(text(),"'+label+'")])['+position+']').click();
    }
    uploadFile(selector, filePath){
        cy.get(selector).attachFile(filePath);
    }

    ifElementContainsValue(label, position, value){
        cy.xpath('(//label[contains(text(),"'+label+'")]/following-sibling::input)['+position+']').should('have.value', value);
    }
    ifElementMatchesValue(label, position, value){
        cy.xpath('(//label[contains(text(),"'+label+'")]/following-sibling::input)['+position+']').contains(value);
    }
    IfElementIsVisible(xpath, position){
        cy.xpath(xpath).should('be.visible');
    }
    IfElementIsNotVisible(xpath, position){
        cy.xpath(xpath).should('not.be.visible');
    }

    /**
     * This method is responsible to fill all data in a Screen
     * @param parameterList: List of parameters with controls to fill the screen form
     * Ej. var
     * let parameterList = [
     *      **To Select List 1
     *      {type: "Select List", label:"Select List",value:"Mahomet",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
     *      **To line input 1
     *      {type: "Line Input", label:"New Input",value:"value 1",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
     *      * //To line input 2
     *      * {type: "Line Input", label:"New Input",value:"value 2",position:"2", assertion:true,assertionType:"Element Is Not Visible",assertionTypeCriteria:"(//div[text()='Field is required'])[1]"},
     *  ];
     * @return nothing returns
     */
    fillScreen(parameterList){
        for (var i = 0; i < parameterList.length; i++) {
            switch (parameterList[i].type) {
                case 'Line Input':
                    this.fillLineInput(parameterList[i].label, parameterList[i].position, parameterList[i].value);
                    break;
                case 'Select List':
                    this.fillSelectList(parameterList[i].label, parameterList[i].position, parameterList[i].value);
                    break;
                case 'File':
                    this.uploadFile(parameterList[i].label,parameterList[i].value);
                    break;
                case 'Check Box':
                    this.clickCheckBox(parameterList[i].label,parameterList[i].position);
                    break;
                case 'button':
                    this.uploadFile(parameterList[i].label,parameterList[i].position);
                    break;
            }
        }
    }
    generateNumberRandom(min, max) {
        return Math.floor((Math.random() * (max - min + 1)) + min);
    }
    selectPhysicalAddress(i,address){
        var k = 1+(2*i)-2;
        cy.xpath("(//label[text()='Physical Address']/parent::div//input)["+i+"]").click().type(address)
            .should('have.value', address);
        cy.wait(6000);
        cy.xpath("(//div[@class='pac-container pac-logo'])["+k+"]//div[@class='pac-item'][1]").click({force: true});
        cy.xpath("(//div[@name='Address']//div[@name='Address']/div[2]//p[text()='Address'])["+k+"]").should('be.visible');
    }
    completeOneTimePassword(requestId){
        cy.visit("https://release-intensify-qa.processmaker.net/webentry/request/"+requestId+"/secure_link");
        cy.xpath("//h3[text()='One Time Password Authentication']").should('be.visible');
        //1. Complete Request OTP
        cy.xpath("//button[contains(text(),'REQUEST OTP')]").click();
        cy.xpath("//button[contains(text(),'Validate OTP')]").click();
        //cy.xpath("//label[text()='Provide OTP']").should('be.visible');
        cy.xpath("//h2[text()='Your New Account Journey']").should('be.visible');
        cy.xpath("//button[contains(text(),'Continue')]").click();
    }
    completeOneTimePasswordAuthorizationForChange(requestId){
        cy.visit("https://release-intensify-qa.processmaker.net/webentry/request/"+requestId+"/secure_link");
        cy.xpath("//h3[text()='One Time Password Authentication']").should('be.visible');
        //1. Complete Request OTP
        cy.xpath("//button[contains(text(),'REQUEST OTP')]").should('be.visible').click();
        cy.wait(5000);
        cy.xpath("//button[contains(text(),'Validate OTP')]").should('be.visible').click();
    }
    createRequestByDashboard(option){
        let buttonOPtion = "//text()[contains(.,'optionP')]/ancestor::a[1]";
        cy.xpath(buttonOPtion.replace("optionP",option)).should('be.visible').click();
    }
    openRequestNewUserByDashboard(){
        cy.xpath("//p[text()='Your IntensiFI Secure Portal']").should('be.visible');
        cy.reload();
        request.waitUntilElementIsVisible('selector','[title="Open Record"]');
        cy.get('[title="Open Record"]').click();
        cy.xpath("//img[@class='logo']").should('be.visible');
    }
    getNumberRequest(taskName){
        let linkXPath = "//h5[text()='Request']/following-sibling::a";
        let taskLink = "//a[contains(text(),'taskName')]";
        cy.xpath(linkXPath).should('be.visible').click();
        cy.xpath(taskLink.replace('taskName',taskName)).should('be.visible');
    }
    openTask(taskName){
        let taskLink = "//a[contains(text(),'taskName')]";
        cy.xpath(taskLink.replace('taskName',taskName)).should('be.visible').click();
    }
    followingRequest(requestMain, processName, numberA){
        this.logout();
        cy.visit("https://release-intensify-qa.processmaker.net/requests/"+requestMain);
        this.loginAdminUser();
        request.waitUntilElementIsVisibleCant('selector', "a[href^='/requests']",numberA);
        cy.wait(5000);
        cy.reload();
        cy.xpath("//a[text()='"+processName+"']").should('be.visible').click();
        cy.xpath("//a[text()='Tasks']").should('be.visible');
    }
    loginAdminUser(){
        cy.get('[name="username"]').should('be.visible');
        login.login("superadmin","vng2hby*hfc7reb3VKF");
    }
    loginBankerUser(){
        cy.get('[name="username"]').should('be.visible');
        login.login("banker","Password123");
    }
    loginExecutiveUser(){
        cy.get('[name="username"]').should('be.visible');
        login.login("executive","Password123");
    }
    loginBsaOffiserUser(){
        cy.get('[name="username"]').should('be.visible');
        login.login("bsaofficer","Colosa123!");
    }
    visitIntemsify(){
        cy.visit("https://release-intensify-qa.processmaker.net");
    }
    logout(){
        cy.wait(3000);
        cy.visit("https://release-intensify-qa.processmaker.net/logout");
        cy.get("[id='username']").should('be.visible');
    }
    goToRequest(numberRequest){
        cy.visit("https://release-intensify-qa.processmaker.net/requests/"+numberRequest);
    }
    isTrustFucntion(option){
        if(option){
            cy.xpath('//button[contains(text(),"Yes")][@class="btn btn-light"]').click();
            cy.xpath("//input[@type='text'][@name='trustName']").should('be.visible');
            cy.xpath("//input[@type='text'][@name='trustName']").type('TRUST 1');
        }else{
            cy.xpath('//button[contains(text(),"No")][@class="btn btn-light"]').click();
        }
    }
    selectProductRAOS(productValues){
        let j=0;let k=0;
        for (let i = 0; i <productValues.length ; i++) {
            k = i + 1;j = k + 1;
            let productType = productValues[i].productName;
            cy.xpath("(//button[contains(text(),'"+productType+"')][@class='btn btn-light'])["+k+"]").should('be.visible').click();

            //Verify files are visibles
            // 1. Add product
            let productVal = productValues[i].productValue;
            cy.xpath("(//div[@data-cy='screen-field-productId']//div[@class='multiselect__tags'])["+k+"]").should('be.visible').click()
                .then(()=>{
                    cy.wait(3000);
                });
            cy.xpath("(//div[@data-cy='screen-field-productId']//input)["+k+"]").type(productVal).should('have.value',productVal);
            cy.xpath("(//div[@data-cy='screen-field-productId']//div[@class='multiselect__content-wrapper']//li[1])["+k+"]")
                .should('have.attr', 'aria-label') // yields the "href" attribute
                .and('equal', productVal+". ");
            cy.xpath("(//div[@data-cy='screen-field-productId']//input)["+k+"]").type('{enter}');

            // 2. Add Account nickname
            cy.xpath("(//input[@data-cy='screen-field-nickname'])["+k+"]").type("Account Nickname "+productType).should('have.value',"Account Nickname "+productType);

            // 3. Add Primary Owner
            cy.xpath("(//div[@data-cy='screen-field-primaryOwner']//div[@class='multiselect__tags'])["+k+"]").should('be.visible').click()
                .then(()=>{
                    cy.wait(2000);
                });
            cy.xpath("(//div[@data-cy='screen-field-primaryOwner']//input)["+k+"]").clear();
            cy.xpath("(//div[@data-cy='screen-field-primaryOwner']//input)["+k+"]").type("First Name").should('have.value',"First Name");
            cy.xpath("(//div[@data-cy='screen-field-primaryOwner']//input)["+k+"]").type('{enter}');

            // 4. Add Initial Deposit Amount
            cy.xpath("(//input[@data-cy='screen-field-initialDeposit'])["+k+"]").click().type('{ctrl}').type('A').type('455');

            if(k<productValues.length){
                cy.xpath("(//button[@title='Add Item'])["+j+"]").click();
            }
        }
    }
    selectServicesRAOS(servicesValues){
        let buttonServiceXpath = "//button[contains(text(),'serviceName')][@class='btn btn-light']";
        for (let i = 0; i <servicesValues.length ; i++) {
            let serviceName = servicesValues[i].services;
            cy.xpath(buttonServiceXpath.replace('serviceName',serviceName)).click();
        }
    }
    scrollDisclosure(listD){
        let buttonDisclosuresXPath = "//button[contains(text(),'disclosureName')]";
        for (let i = 0; i < listD.length; i++) {
            let j = i+1;
            let disName = listD[i];
            console.log(disName);
            cy.xpath(buttonDisclosuresXPath.replace("disclosureName",listD[i])).click();
            cy.xpath("((//div[@data-cy='screen-renderer'])[4]//div[@class='page'])[1]").scrollTo('bottom');
        }
    }
    functionReviewData(dataList, page){
        let pageXpath = "//div[@name='pageName']//*[contains(text(),'value')]";
        for (let i = 0; i <dataList.length ; i++) {
            cy.xpath("//div[@name='"+page+"']//*[contains(text(),'"+dataList[i].value+"')]").click({ multiple: true }).should('be.visible');
        }
    }
    fillPeopleInformation(users, position = 1,sendtoBlank=false){
        cy.xpath("(//button[contains(text(),'New Customer')][@class='btn btn-light'])["+position+"]").should('be.visible');
        cy.xpath("(//button[contains(text(),'New Customer')][@class='btn btn-light'])["+position+"]").click();
        let numberRandom = this.generateNumberRandom(100,999);
        for (let i = 1; i <= users; i++) {
            if (position === 2)
                i=i*position;
            let parameterList = [
                {type: "Line Input", label:"First Name",value:"First Name"+i,position:i, assertion:false,assertionType:"",assertionTypeCriteria:""},
                {type: "Line Input", label:"Last Name",value:"Last Name"+i,position:i, assertion:true,assertionType:"",assertionTypeCriteria:""},
                {type: "Line Input", label:"Email Address",value:"automation.pm4"+numberRandom+"@gmail.com",position:i, assertion:true,assertionType:"",assertionTypeCriteria:""},
                {type: "Line Input", label:"Cell Phone Number",value:"2014222730",position:i, assertion:true,assertionType:"",assertionTypeCriteria:""},
            ];
            this.fillScreen(parameterList);
            var j = i+1;
            if(!sendtoBlank){
                if(i>1)
                    cy.xpath("(//label[text()='A Joint Owner'])["+i+"]").click();
            }
            if(i<users){
                cy.xpath("//button[@title='Add Item']").click();
                cy.xpath("(//button[contains(text(),'New Customer')][@class='btn btn-light'])["+j+"]").click();
            }
        }
    }
    /**
     * This method is responsible to wait until element is visible
     * @param selector: selector of element like: ([data.cy="id2"])
     * @param maxAttempts: # to try , 10 by default
     * @param attempts: it is not change
     * @return nothing returns
     */
    waitUntilElementAppear(selector, maxAttempts=10, attempts=0){
        for (let i = attempts; i < maxAttempts; i++) {
            cy.wait(200);
            cy.get('body').then($body => {
                if ($body.find(selector).length > 0) {
                    i=maxAttempts;
                }
            });
        }
    }
}
