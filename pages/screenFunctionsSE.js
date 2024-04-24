import { Requests } from "./requests";
import { Header } from "./header";
import { NavigationHelper } from "#helpers/navigationHelper";
import { Login} from "./login";
import { Utility} from "./utility";

let navHelper = new NavigationHelper();
const request = new Requests();
const header = new Header();
const login = new Login();
const utility = new Utility();

export class ScreenFunctionsSE {
    /**-------------------------  Intemsify RAOS-process -------------------------**/
    screenRAOSBankerInitiateBAL_701_703(applicationSelection, isTrust, users){
        cy.xpath("//h5[text()='How would you like to complete the application?']").should('be.visible');
        let buttonSelection = "//button[contains(text(),'applicationSelection')][@class='btn btn-light']";

        switch (applicationSelection) {
            case "Complete In-Person":
                buttonSelection = buttonSelection.replace('applicationSelection','Complete In-Person');
                cy.xpath(buttonSelection).click();
                utility.isTrustFucntion(isTrust);
                utility.fillPeopleInformation(users);
                cy.xpath("(//label[text()='Present at the bank'])[1]").click();
                cy.xpath("(//label[text()='The Primary Contact'])[1]").click();
                break;
            case "Pre-fill and Send to Client":
                buttonSelection = buttonSelection.replace('applicationSelection','Pre-fill and Send to Client');
                cy.xpath(buttonSelection).click();
                utility.isTrustFucntion(isTrust);
                utility.fillPeopleInformation(users);
                cy.xpath("(//label[text()='The Primary Contact'])[1]").click();
                break;
            case "Send Blank":
                buttonSelection = buttonSelection.replace('applicationSelection','Send Blank Application to Client');
                cy.xpath(buttonSelection).click();
                utility.isTrustFucntion(isTrust);
                utility.fillPeopleInformation(users,2,true);
                cy.xpath("//textarea[@name='introNotes']").type("Comments to Send to Blank");
                break;
        }
        cy.xpath('//div[@data-cy="screen-field-branch"]//div[@class="multiselect__tags"]').click();
        cy.xpath('//div[@data-cy="screen-field-branch"]//input').type('{enter}');
    }

    screenRAOSPeopleBAL_704(users,buttonXpath,sendToBlank=false,pathName=""){
        if(sendToBlank){
            cy.xpath("//h3[text()='Complete Your Profile']").should('be.visible');
        }else{
            cy.xpath("//h4[text()='People Information']").should('be.visible');
        }
        for (let i = 1; i <=users ; i++) {
            if (pathName==="Pre-fill and Send to Client"){
                cy.xpath("(//label[contains(text(),'information  and will pre-fill it')])["+i+"]").click();
            }
            utility.selectPhysicalAddress(i,"1901 W Madison St, Chicago, IL 60612, USA");
        }
        for (let i = 1; i <=users ; i++) {
            let k=i,l=i,m=i;
            if(i>1){
                k=4;
                l=5;
                m=3;
            }
            let parameterList = [
                {type: "Line Input", label:"Middle Name",value:"Middle Name"+i,position:i, assertion:false,assertionType:"",assertionTypeCriteria:""},
                {type: "Line Input", label:"Date of Birth",value:"12/01/1990",position:i, assertion:true,assertionType:"",assertionTypeCriteria:""},
                {type: "Line Input", label:"Social Security Number",value:"123456789",position:i, assertion:true,assertionType:"",assertionTypeCriteria:""},
                {type: "Select List", label:"Name Prefix",value:"Mr",position:i, assertion:false,assertionType:"",assertionTypeCriteria:""},
                {type: "Line Input", label:"Work Phone",value:"2014222730",position:i, assertion:true,assertionType:"",assertionTypeCriteria:""}  ,
                {type: "Select List", label:"Preferred Contact Method",value:"Email",position:i, assertion:false,assertionType:"",assertionTypeCriteria:""},
                {type: "Check Box", label:"My address is not on the map",value:"",position:i, assertion:true,assertionType:"",assertionTypeCriteria:""}  ,
                {type: "Line Input", label:"Suite / Apartment",value:"Suite / Apartment"+i,position:i, assertion:true,assertionType:"",assertionTypeCriteria:""},
                {type: "Select List", label:"Employment Status",value:"Unemployed",position:i, assertion:false,assertionType:"",assertionTypeCriteria:""},
                {type: "Line Input", label:"Occupation",value:"Occupation"+i,position:i, assertion:true,assertionType:"",assertionTypeCriteria:""}
            ];
            utility.fillScreen(parameterList);
            cy.xpath("(//input[@type='number'][@name='yearsOfResidence'])["+i+"]").type(4);
            cy.xpath("(//input[@type='number'][@name='monthsOfResidence'])["+i+"]").type(2);
            cy.xpath("(//div[@name='Account Information']/div[2]//button[contains(text(),'No')][@class='btn btn-light'])["+i+"]").click();
            cy.xpath("(//div[@name='Account Information']/div[3]//button[contains(text(),'No')][@class='btn btn-light'])["+i+"]").click();
            cy.xpath("(//div[@name='Account Information']/div[5]//button[contains(text(),'No')][@class='btn btn-light'])["+i+"]").click();
            cy.xpath("(//div[@name='Account Information']/div[8]//button[contains(text(),'No')][@class='btn btn-light'])["+i+"]").click();
            cy.xpath("(//label[text()='ID Expiration Date']/following-sibling::input)["+i+"]").click().clear();
            cy.xpath("(//label[text()='ID Expiration Date']/following-sibling::input)["+i+"]").type('12/06/2022');
            cy.xpath("(//label[text()='ID Expiration Date']/following-sibling::input)["+i+"]").should('have.value',"12/06/2022");
            cy.xpath("(//label[text()='ID Expiration Date']/following-sibling::input)["+i+"]").type('{enter}');
            parameterList = [
                {type: "Select List", label:"ID Type",value:"Foreign Passport",position:i*2, assertion:false,assertionType:"",assertionTypeCriteria:""},
                {type: "Line Input", label:"ID Number",value:"ID Number"+i,position:i, assertion:true,assertionType:"",assertionTypeCriteria:""},
                {type: "Line Input", label:"Issued By",value:"Issued By"+i,position:i, assertion:true,assertionType:"",assertionTypeCriteria:""},
                {type: "Line Input", label:"ID Issue Date",value:"12/01/2010",position:i, assertion:true,assertionType:"",assertionTypeCriteria:""}
            ];
            utility.fillScreen(parameterList);
        }
        cy.xpath(buttonXpath).scrollIntoView().should('be.visible');
        cy.xpath(buttonXpath).click();
    }
    screenRAOSBusinessAccountBAL_705(users,buttonXpath){
        cy.xpath("//h3[text()='Banking Redefined']").should('be.visible');
        cy.wait(3000);
        /*for (let i = 1; i <=users ; i++) {
            let j=i+1;
            cy.xpath("(//button[contains(text(),'View ChexSystem Report')])["+i+"]").scrollIntoView().should('be.visible').click();
            cy.xpath("(//button[contains(text(),'Show Report')])["+i+"]").scrollIntoView().should('be.visible').click();
        }*/
        cy.xpath(buttonXpath).should('be.visible');
        cy.xpath(buttonXpath).click();
    }
    screenRAOSPersonalAccountApplicationTrustBAL_706(buttonXpath){
        cy.xpath("//h4[text()='Joint Owners, Minors, Beneficiaries (POD) and Trusts']").should('be.visible');
        cy.wait(3000);
        cy.xpath('//label[contains(text(),"Tax ID")]/following-sibling::input').should('be.visible').type("123456789")
            .should('have.value',"123-45-6789");
        cy.xpath('//label[contains(text(),"Date of Formation")]/following-sibling::input').type("12/01/2021");
        cy.xpath('//label[contains(text(),"Date of Formation")]/following-sibling::input').should('have.value',"12/01/2021");
        cy.xpath('//label[contains(text(),"Date of Formation")]/following-sibling::input').type('{enter}');
        cy.xpath(buttonXpath).should('be.visible');
        cy.xpath(buttonXpath).click();
    }
    screenRAOSPersonalAccountApplicationProductsBAL_707(buttonXpath,sendToBlank=false,pathName=""){
        cy.xpath("//h3[text()='Product - Select Accounts and Services']").should('be.visible');
        cy.wait(3000);
        let productValues = [
            {productName:"Checking",productValue:"NOW Checking"},
            {productName:"Savings",productValue:"Regular Savings"},
            {productName:"Money Market",productValue:"Personal Money Mkt"},
            {productName:"Certificate of Deposit",productValue:"6 Month CD < 100M"}
        ];
        utility.selectProductRAOS(productValues);

        //Select Services:
        let servicesValues = [
            {services:"Debit Card"},
            {services:"e-Statements"},
            {services:"Mobile Deposits"},
            {services:"Online Banking"}
        ];
        utility.selectServicesRAOS(servicesValues);

        //Select funding to your new account
        if(sendToBlank||pathName==="Pre-fill and Send to Client"){
            cy.xpath("//button[contains(text(),'Credit Card')][@class='btn btn-light']").click();
            if(pathName==="Pre-fill and Send to Client")
                cy.xpath("//textarea[@name='introNotes']").type("Additional notes to customer");
        }else{
            cy.xpath("//button[contains(text(),'Check Deposit')][@class='btn btn-light']").click();
        }
        cy.xpath("(//div[@selector='people-list']//div[@class='form-check']/label)[1]").click();
        cy.xpath(buttonXpath).should('be.visible');
        cy.xpath(buttonXpath).click();
    }
    screenRAOSPersonalAccountApplicationDisclosuresBAL_707(buttonXpath){
        cy.xpath("//h3[text()='Finalize - Review Account Terms and Sign']").should('be.visible');
        cy.wait(3000);
        let disclosureList = ["Terms and Conditions","Privacy Policy"];
        utility.scrollDisclosure(disclosureList);
        cy.xpath("(//input[@name='termsAccepted']//following-sibling::label)[1]").click();
        cy.xpath(buttonXpath).should('be.visible');
        cy.xpath(buttonXpath).click();
    }
    screenRAOSPersonalAccountApplicationReviewApplicationSummaryBAL_709(buttonXpath){
        cy.xpath("//h3[text()='Review Account Application']").should('be.visible');
        let page = "RAOS 1.0.0 - Personal Information Summary";
        let dataList = [
            {value: "First Name"},
            {value: "Last Name"},
            {value: "Middle Name1"},
            {value: "12/01/1990"},
            {value: "2014222730"},
            {value: "Unemployed"},
            {value: "Occupation1"},
            {value: "Foreign Passport"},
            {value: "ID Number1"},
            {value: "Issued By1"},
            {value: "12/01/2010"}
        ];
        utility.functionReviewData(dataList,page);
        //Click on Trust
        cy.xpath("//button[contains(text(),'Trust')]").click();
        cy.xpath("//h5[text()='Trust']").should('be.visible');
        //Click on Products
        cy.xpath("(//button[contains(text(),'Products')])[1]").click();
        cy.xpath("//h5[text()='Products']").should('be.visible');
        page = "3. Products";
        dataList = [
            {value: "Checking"},
            {value: "NOW Checking"},
            {value: "455"},
            {value: "Account Nickname Checking"},
            {value: "Savings"},
            {value: "Regular Savings"},
            {value: "Account Nickname Savings"},
            {value: "Money Market"},
            {value: "Personal Money Mkt"},
            {value: "Account Nickname Money Market"},
            {value: "Certificate of Deposit"},
            {value: "6 Month CD < 100M"},
            {value: "Account Nickname Certificate of Deposit"}
        ];
        utility.functionReviewData(dataList,page);
        //Click on Services
        cy.xpath("(//button[contains(text(),'Services')])[1]").click();
        cy.xpath("//h5[contains(text(),'Services')]").should('be.visible');
        //Click on Documents
        cy.xpath("//button[contains(text(),'Documents')]").click();
        cy.xpath("//h5[text()='Documents']").should('be.visible');
        //Click on Verification
        cy.xpath("//button[contains(text(),'Verification')]").click();
        cy.xpath("//h5[text()='Verification - People']").should('be.visible');
        //Put comment
        cy.get('[class="tox-edit-area__iframe"]').then(($iframe) => {
            const $body = $iframe.contents().find('body');
            cy.wrap($body).find('p').type('Request checked by Banker user');
        });
        cy.xpath(buttonXpath).should('be.visible').click();
    }
    screenRAOSPersonalAccountApplicationDueDiligenceBAL_713(buttonXpath){
        cy.xpath("//p[text()='Due Diligence']").should('be.visible');
        cy.wait(3000);
        let parameterList = [
            {type: "Line Input", label:"How did the Customer hear about the Bank?",value:"How did the Customer hear about the Bank",position:1, assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Line Input", label:"What are the goals of the account and/or relationship?",value:"What are the goals of the account and/or relationship",position:1, assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Select List", label:"Was the individual accompanied by anyone who spoke for them or appeared to be controlling and/or guiding the individual?",value:"Yes",position:1, assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Line Input", label:"Describe the interaction in detail",value:"Describe the interaction in detail",position:1, assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Select List", label:"Will account be used for business transactions?",value:"Yes",position:1, assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Line Input", label:"What is the purpose of the individual's stay in the US?",value:"What is the purpose of the individual's stay in the US",position:1, assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Line Input", label:"Expiration Date of Current W8 BEN",value:"Expiration Date of Current W8 BEN",position:1, assertion:false,assertionType:"",assertionTypeCriteria:""}
        ];
        utility.fillScreen(parameterList);
        cy.xpath(buttonXpath).should('be.visible').click();
    }
    screenRAOSPersonalAccountApplicationProductsReviewBAL_714(buttonXpath){
        cy.xpath("//h4[text()='Account Due Diligence and Product Details']").should('be.visible');
        let page = "accounts";
        let dataList = [
            {value: "Checking"},
            {value: "NOW Checking"},
            {value: "455"},
            {value: "Account Nickname Checking"},
            {value: "Savings"},
            {value: "Regular Savings"},
            {value: "Account Nickname Savings"},
            {value: "Money Market"},
            {value: "Personal Money Mkt"},
            {value: "Account Nickname Money Market"},
            {value: "Certificate of Deposit"},
            {value: "6 Month CD < 100M"},
            {value: "Account Nickname Certificate of Deposit"}
        ];
        utility.functionReviewData(dataList,page);
        for (let i = 1; i <=4 ; i++) {
            cy.xpath("(//label[contains(text(),'ACH')]/parent::div[@class='form-check'])["+i+"]").click();
            cy.xpath("(//label[contains(text(),'ACH ($) In')]/parent::div//input)["+i+"]").should('be.visible');
            cy.xpath("(//label[contains(text(),'ACH ($) In')]/parent::div//input)["+i+"]").click().type('{ctrl}').type('A').type(i);
            cy.xpath("(//label[contains(text(),'ACH (#) In')]/parent::div//input)["+i+"]").click().type('{ctrl}').type('A').type(i);
            cy.xpath("(//label[contains(text(),'ACH ($) Out')]/parent::div//input)["+i+"]").click().type('{ctrl}').type('A').type(i);
            cy.xpath("(//label[contains(text(),'ACH (#) Out')]/parent::div//input)["+i+"]").click().type('{ctrl}').type('A').type(i);
        }
        cy.xpath(buttonXpath).should('be.visible').click();
    }
    screenRAOSPersonalAccountApplicationServicesBAL_715(buttonXpath){
        cy.xpath("//h4[text()='Service Details']").should('be.visible');
        let parameterList = [
            {type: "Select List", label:"Cardholder",value:"First Name",position:1, assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Select List", label:"Linked Account(s)",value:"NOW Checking",position:1, assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Select List", label:"How should the Debit Card be delivered?",value:"Pick up in branch",position:1, assertion:false,assertionType:"",assertionTypeCriteria:""}
        ];
        utility.fillScreen(parameterList);
        cy.xpath('(//label[contains(text(),"Pickup Branch")]/parent::div//div[@class="multiselect__tags"])[1]').click();
        cy.xpath('(//label[contains(text(),"Pickup Branch")]/parent::div//div[@class="multiselect__tags"]//input)[1]')
            .should('be.visible');
        cy.wait(2000);
        cy.xpath('(//label[contains(text(),"Pickup Branch")]/parent::div//div[@class="multiselect__tags"]//input)[1]')
            .type("{enter}");
        cy.xpath("//label[contains(text(),'(NOW Checking)')]").click();
        cy.xpath("(//*[@class='fas fa-check-circle text-success mt-1'])[4]").should('be.visible');
        cy.xpath(buttonXpath).should('be.visible').click();
    }
    screenRAOSPersonalAccountApplicationSummaryBAL_716(buttonXpath,users,sendToBlank=false){
        if(!sendToBlank){
            cy.xpath("//h5[text()='Electronic Signature']").should('be.visible');
            for (let i = 1; i <=users ; i++) {
                cy.xpath("(//label[text()='Send documents for remote signing'])["+i+"]").click();
            }
        }
        cy.xpath("//textarea[@name='bankerExceptionNotes']").type("Request Review by Banker user");
        cy.xpath(buttonXpath).should('be.visible').click();
    }
    screenRAOSEMApprovalBAL_723(buttonXpath){
        //Executive user
        cy.xpath("//button[text()='Claim Task']").should('be.visible').click();
        cy.xpath("//button[text()='Claim Task']").should('not.exist');
        cy.xpath("//h5[text()='Businesses']").should('be.visible');
        let listOptions = ["People","Products","Services","Documents","Verification"];
        //Click on People
        for (let i = 0; i <5 ; i++) {
            cy.xpath("//button[contains(text(),'"+listOptions[i]+"')]").click();
            cy.xpath("//h5[contains(text(),'"+listOptions[i]+"')]").should('be.visible');
        }
        cy.get('[class="tox-edit-area__iframe"]').first().then(($iframe) => {
            const $body = $iframe.contents().find('body');
            cy.wrap($body).find('p').type('Notes Exceptional Approval by Executive user');
        });
        cy.xpath(buttonXpath).should('be.visible').click();
    }
    /**----------------------- Intemsify RAOS-process Fin ------------------------**/
    /**------------------------Intensify CAOS-Process -------------------------**/
    screenCAOSBusinessBankerInitiateBAL_683(){
        //Wait for the page to load
        cy.xpath("//h5[text()='How would you like to complete the application?']").should('be.visible');
        cy.xpath("(//button[contains(text(),'Complete In-Person')])[2]").should('be.visible').click();
        cy.xpath("//h5[text()='Who is the application for?']").should('be.visible').click();
        //Business Information
        cy.xpath('(//strong[contains(text(),"This business is")]/ancestor::div[@class="col-sm-8"]//div[2]//div[@class="col-sm-12"]//button)[2]').should('be.visible').click();
        cy.xpath("//label[text()='Business Name']").should('be.visible');
        //People Information
        cy.xpath('(//strong[contains(text(),"This business is")]/ancestor::div[@name="Client Setup"]/div[6]//div[@class="col-sm-12"]/div[4]//div[@class="col-sm-6"]//button)[2]').should('be.visible').click();
        cy.xpath("(//label[text()='First Name'])[2]").should('be.visible');
        
        let timeStamp = new Date().getTime();
        let email = "automation.pm4+"+timeStamp+"@gmail.com";
        cy.xpath("//input[@type='text'][@name='businessEmail']").type(email);
        cy.xpath("(//input[@type='text'][@name='email'])[2]").type(email);
        let parameterList = [
            //Business Information
            {type: "Line Input", label:"Business Name",value:"BusinessName",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Line Input", label:"DBA (Doing Business As)",value:"DBAtest",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Line Input", label:"Phone Number",value:"1234567890",position:"2", assertion:true,assertionType:"Element Contains Value",assertionTypeCriteria:"(123) 456-7890"},
            //People Information
            {type: "Line Input", label:"First Name",value:"In person",position:"2", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Line Input", label:"Last Name",value:"Test",position:"2", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Line Input", label:"Cell Phone Number",value:"1234567890",position:"2", assertion:true,assertionType:"Element Contains Value",assertionTypeCriteria:"(123) 456-7890"},
        ];
        utility.fillScreen(parameterList);
        cy.xpath("//label[text()='The primary contact']").should('be.visible').click();
        cy.xpath("//label[text()='present at the bank']").should('be.visible').click();
        cy.xpath("//button[contains(text(),'Continue')]").should('be.visible');
        cy.xpath("//label[text()='Select your branch']/parent::div//div[@class='multiselect__tags']").click();
        cy.xpath("//label[text()='Select your branch']/parent::div//input").type('Durham{enter}');
    }
    screenCAOSBusinessBankerInitiateBAL_682(){
        //Wait for the page to load
        cy.xpath("//h5[text()='How would you like to complete the application?']").should('be.visible');
        cy.xpath("(//button[contains(text(),'Pre-fill and Send to Client')])[2]").should('be.visible').click();
        cy.xpath("//h5[text()='Who is the application for?']").should('be.visible').click();
        //Business Information
        cy.xpath('(//strong[contains(text(),"This business is")]/ancestor::div[@class="col-sm-8"]//div[2]//div[@class="col-sm-12"]//button)[2]').should('be.visible').click();
        cy.xpath("//label[text()='Business Name']").should('be.visible');
        //People Information
        cy.xpath('(//strong[contains(text(),"This business is")]/ancestor::div[@name="Client Setup"]/div[6]//div[@class="col-sm-12"]/div[4]//div[@class="col-sm-6"]//button)[2]').should('be.visible').click();
        cy.xpath("(//label[text()='First Name'])[2]").should('be.visible');
        
        let timeStamp = new Date().getTime();
        let email = "automation.pm4+"+timeStamp+"@gmail.com";
        cy.xpath("//input[@type='text'][@name='businessEmail']").type(email);
        cy.xpath("(//input[@type='text'][@name='email'])[2]").type(email);
        let parameterList = [
            //Business Information
            {type: "Line Input", label:"Business Name",value:"BusinessPrefill",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Line Input", label:"DBA (Doing Business As)",value:"DBAPrefill",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            //{type: "Line Input", label:"Email Address",value:email,position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Line Input", label:"Phone Number",value:"1234567890",position:"2", assertion:true,assertionType:"Element Contains Value",assertionTypeCriteria:"(123) 456-7890"},
            //People Information
            {type: "Line Input", label:"First Name",value:"Prefill",position:"2", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Line Input", label:"Last Name",value:"TestPrefill",position:"2", assertion:false,assertionType:"",assertionTypeCriteria:""},
            //{type: "Line Input", label:"Email Address",value:email,position:"2", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Line Input", label:"Cell Phone Number",value:"1234567890",position:"2", assertion:true,assertionType:"Element Contains Value",assertionTypeCriteria:"(123) 456-7890"},
        ];
        utility.fillScreen(parameterList);
        cy.xpath("//label[text()='The primary contact']").should('be.visible').click();
        cy.xpath("//label[text()='present at the bank']").should('be.visible').click();
        cy.xpath("//button[contains(text(),'Continue')]").should('be.visible');
        cy.xpath("//label[text()='Select your branch']/parent::div//div[@class='multiselect__tags']").click();
        cy.xpath("//label[text()='Select your branch']/parent::div//input").type('Durham{enter}');
    }
    screenCAOSBusinessBankerInitiateBAL_681(){
        //Wait for the page to load
        cy.xpath("//h5[text()='How would you like to complete the application?']").should('be.visible');
        cy.xpath("(//button[contains(text(),'Send Blank Application to Client')])[2]").should('be.visible').click();
        cy.xpath("//h5[text()='Who is the application for?']").should('be.visible').click();
        //Client Primary Contact
        cy.xpath('(//strong[contains(text(),"This business is")]/ancestor::div[@name="Client Setup"]/div[5]//div[@selector="person"]//div[@class="col-sm-8"]//button)[2]').should('be.visible').click();
        cy.xpath("(//label[text()='First Name'])[1]").should('be.visible');
        
        let timeStamp = new Date().getTime();
        let email = "automation.pm4+"+timeStamp+"@gmail.com";
        let parameterList = [
            //This person is
            {type: "Line Input", label:"First Name",value:"NameSend",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Line Input", label:"Last Name",value:"TestSend",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Line Input", label:"Email Address",value:email,position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Line Input", label:"Cell Phone Number",value:"1234567890",position:"1", assertion:true,assertionType:"Element Contains Value",assertionTypeCriteria:"(123) 456-7890"},
        ];
        utility.fillScreen(parameterList);
        cy.xpath("//textarea[@name='introNotes']").should('be.visible').type('Additional notes to customer TEST');
        cy.xpath("//button[contains(text(),'Send link to Client')]").should('be.visible');
        cy.xpath("//label[text()='Select your branch']/parent::div//div[@class='multiselect__tags']").click();
        cy.xpath("//label[text()='Select your branch']/parent::div//input").type('Durham{enter}');
    }
    screenCAOSAccountApplicationBusinessesBAL_684(){
        //Wait for the page to load
        cy.xpath("//h4[text()='Business Information']").should('be.visible');
        cy.xpath("//label[text()='Business Name']").scrollIntoView();
        //Business Details
        cy.xpath("//input[@type='text'][@name='businessName']").type('{del}{selectall}{backspace}');
        cy.xpath("//input[@type='text'][@name='businessName']").type('BusinessName').should('have.value','BusinessName');
        cy.xpath("//input[@type='text'][@name='DBA']").type('{del}{selectall}{backspace}');
        cy.xpath("//input[@type='text'][@name='DBA']").type('DBAtest').should('have.value','DBAtest');
        //Business Contact Information
        let timeStamp = new Date().getTime();
        let email = "automation.pm4+"+timeStamp+"@gmail.com";
        cy.xpath("//input[@type='text'][@name='businessEmail']").type('{del}{selectall}{backspace}');
        cy.xpath("//input[@type='text'][@name='businessEmail']").should('be.visible').type(email);
        cy.xpath("//input[@type='text'][@name='businessPhone']").type('{del}{selectall}{backspace}');
        cy.xpath("//input[@type='text'][@name='businessPhone']").should('be.visible').type('1234567890');
        //Business Details
        let parameterList = [
            {type: "Select List", label:"Legal Structure",value:"General Partnership",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Select List", label:"Industry",value:"519210 - Libraries and Archives",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Line Input", label:"Tax ID #",value:"123456789",position:"1", assertion:true,assertionType:"Element Contains Value",assertionTypeCriteria:"12-3456789"},
            {type: "Line Input", label:"Date of Formation",value:"11/28/2012",position:"1", assertion:true,assertionType:"Element Contains Value",assertionTypeCriteria:"11/28/2012"},
            {type: "Select List", label:"State of Formation",value:"Alabama",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Select List", label:"Is the business one of the following: Government Entity, Publicly Traded Company, Company registered with the SEC, or a Bank Holding Company?",value:"No",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
        //Business Contact Information
            {type: "Line Input", label:"Website",value:"www.test.com",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""}, 
        //Business Physical Address 
            {type: "Check Box", label:"The business has a different mailing address",value:"",position:"1", assertion:true,assertionType:"Element Is Visible",assertionTypeCriteria:"//input[@type='text'][@name='mailingAddress']"},
        ];
        utility.fillScreen(parameterList);
        //Business Physical Address
        cy.get('[data-cy="screen-field-googleBusinessAddress"] > div > .form-control').type('3411 Broadway St, New Orleans, LA 70125, EE. UU.');
        cy.wait(3000);
        cy.get('[data-cy="screen-field-googleBusinessAddress"] > div > .form-control').should('be.visible').type('{downArrow}');
        cy.get('[data-cy="screen-field-googleBusinessAddress"] > div > .form-control').should('be.visible').type('{enter}');
        cy.xpath("//input[@type='text'][@name='mailingAddress']").should('be.visible').type('Mailing Address test');
        cy.xpath("//input[@type='text'][@name='mailingCity']").should('be.visible').type('City Mailing');
        cy.xpath("(//label[text()='State']/parent::div//div[@class='multiselect__tags'])[2]").should('be.visible').click();
        cy.xpath("(//label[text()='State']/parent::div//input) [2]").type('Alabama{enter}');
        cy.xpath("//input[@type='text'][@name='mailingPostal']").should('be.visible').type('12345'); 
        
        cy.xpath("//label[text()='I confirm that all business entities listed above (in part or in whole) is not involved in legal or illegal highs, adult entertainment, or gambling.']").should('be.visible').click();
        cy.xpath("//button[contains(text(),'Complete Section')]").should('be.visible');
    }
    screenCAOSAccountApplicationPeopleBAL_685(){
        //Wait for the page to load
        cy.xpath("//h4[text()='People Information']").should('be.visible');
        //Basic Information
        cy.xpath("//input[@type='text'][@name='firstName']").should('be.visible');
        cy.wait(2000);
        cy.xpath("//input[@type='text'][@name='firstName']").type('{del}{selectall}{backspace}');
        cy.xpath("//input[@type='text'][@name='firstName']").type('TestName').should('have.value','TestName');
        cy.xpath("//input[@type='text'][@name='lastName']").type('{del}{selectall}{backspace}');
        cy.xpath("//input[@type='text'][@name='lastName']").type('TestLastName').should('have.value','TestLastName');
        let parameterList = [
            {type: "Check Box", label:"Signer (Will be a signer to an account)",value:"",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Check Box", label:"Beneficial Owner (Owns 25% or more of the business)",value:"",position:"1", assertion:true,assertionType:"Element Is Visible",assertionTypeCriteria:"//input[@type='text'][@name='ownershipPercentage']"},
            {type: "Check Box", label:"Control Owner (Has significant responsibility or authority to control, manage, or direct the business)",value:"",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Select List", label:"Business Title",value:"Administrator",position:"1", assertion:true,assertionType:"Element Contains Value",assertionTypeCriteria:"Administrator"},
            {type: "Select List", label:"Business Title",value:"CEO",position:"1", assertion:true,assertionType:"Element Contains Value",assertionTypeCriteria:"CEO"},
        //Contact Information
            {type: "Line Input", label:"Work Phone Number",value:"1234567890",position:"1", assertion:true,assertionType:"Element Contains Value",assertionTypeCriteria:"(123) 456-7890"},
        //Personal Information
            {type: "Line Input", label:"Social Security Number",value:"123456789",position:"1", assertion:true,assertionType:"Element Contains Value",assertionTypeCriteria:"123-45-6789"},
            {type: "Line Input", label:"Date of Birth",value:"11/27/1989",position:"1", assertion:true,assertionType:"Element Contains Value",assertionTypeCriteria:"11/27/1989"},
        //Employment Information
            {type: "Select List", label:"Employment Status",value:"Employed",position:"1", assertion:true,assertionType:"Element Contains Value",assertionTypeCriteria:"Employed"},
            {type: "Line Input", label:"Occupation",value:"Admin",position:"1", assertion:true,assertionType:"Element Contains Value",assertionTypeCriteria:"Admin"},
            {type: "Line Input", label:"Employment Start Date",value:"11/27/2020",position:"1", assertion:true,assertionType:"Element Contains Value",assertionTypeCriteria:"11/27/2020"},
            {type: "Select List", label:"Employer State",value:"Alabama",position:"1", assertion:true,assertionType:"Element Contains Value",assertionTypeCriteria:"Alabama"},
       //Personal Identification Information
            {type: "Line Input", label:"ID Number",value:"1234567890",position:"1", assertion:true,assertionType:"Element Contains Value",assertionTypeCriteria:"1234567890"},
            {type: "Line Input", label:"ID Issue Date",value:"11/27/2020",position:"1", assertion:true,assertionType:"Element Contains Value",assertionTypeCriteria:"11/27/2020"},
            {type: "Line Input", label:"ID Expiration Date",value:"11/27/2023",position:"1", assertion:true,assertionType:"Element Contains Value",assertionTypeCriteria:"11/27/2023"},
        ];
        utility.fillScreen(parameterList);
        //Basic Information
        cy.xpath("//h5[text()='Basic Information']").scrollIntoView();
        cy.xpath("//input[@type='text'][@name='ownershipPercentage']").should('be.visible').type('80');
        //Physical Address
        cy.xpath("//h5[text()='Physical Address']").scrollIntoView();
        cy.xpath("//input[@type='number'][@name='yearsOfResidence']").should('be.visible').type('10');
        cy.xpath("//input[@type='number'][@name='monthsOfResidence']").should('be.visible').type('5');
        cy.get('[data-cy="screen-field-googlePhysicalAddress"] > div > .form-control').type('3411 Broadway St, New Orleans, LA 70125, EE. UU.');
        cy.wait(3000);
        cy.get('[data-cy="screen-field-googlePhysicalAddress"] > div > .form-control').should('be.visible').type('{downArrow}');
        cy.get('[data-cy="screen-field-googlePhysicalAddress"] > div > .form-control').should('be.visible').type('{enter}');
        //Mailing Address
        cy.xpath("//label[text()='Different Mailing Address']").should('be.visible').click();
        cy.xpath("//h5[text()='Mailing Address']").scrollIntoView();
        cy.xpath("//input[@type='text'][@name='mailingAddress']").should('be.visible').type('Mailing Address test');
        cy.xpath("//input[@type='text'][@name='mailingCity']").should('be.visible').type('City Mailing');
        cy.xpath("(//label[text()='State']/parent::div//div[@class='multiselect__tags'])[2]").should('be.visible').click();
        cy.xpath("(//label[text()='State']/parent::div//input) [2]").type('Alabama{enter}');
        cy.xpath("//h5[text()='Mailing Address']").scrollIntoView();
        cy.xpath("//input[@type='text'][@name='mailingPostal']").should('be.visible').type('12345');
        //Citizenship, Residency and Foreign Political Information
        cy.xpath('//p[text()="Are you a U.S. Citizen?"]/ancestor::div[@class="col-sm-6"]//button[contains(text(),"Yes")][@class="btn btn-light"]').should('be.visible').click();
        cy.xpath('//p[text()="Are you a senior political figure for a foreign country?"]/ancestor::div[@name="Account Information"]/div[5]//button[contains(text(),"Yes")][@class="btn btn-light"]').should('be.visible').click();
        cy.xpath('//p[text()="Are you a senior political figure for a foreign country?"]/ancestor::div[@name="Account Information"]/div[5]//button[contains(text(),"No")][@class="btn btn-light"]').should('be.visible').click();
        cy.xpath('//p[text()="Is any member of your immediate family or close associates, presently or previously, a senior political figure for a foreign country?"]/ancestor::div[@name="Account Information"]//div[8]//button[contains(text(),"No")][@class="btn btn-light"]').should('be.visible').click();
        //Employment Information
        cy.xpath('//p[text()="Are you employed by the business?"]/ancestor::div[@name="Personal Profile"]//div[10]//div[@name="Employment Information"]/div[3]//button[contains(text(),"Yes")][@class="btn btn-light"]').should('be.visible').click();
        //Personal Identification Information
        cy.xpath("//h5[text()='Personal Identification Information']").scrollIntoView();
        cy.xpath("(//label[text()='ID Type']/parent::div//div[@class='multiselect__tags'])[1]").should('be.visible').click();
        cy.xpath("(//label[text()='ID Type']/parent::div//input) [1]").type('Drivers License{enter}');
        cy.xpath("(//label[text()='Issued By']/parent::div//div[@class='multiselect__tags'])[1]").should('be.visible').click();
        cy.xpath("(//label[text()='Issued By']/parent::div//input)[2]").type('Alabama{enter}');

        cy.xpath("//button[contains(text(),'complete section')]").should('be.visible');
    }
    screenCAOSAccountApplicationReviewKYCResultBAL_686(){
        cy.wait(5000);
        cy.reload(true);
        //Wait for the page to load
        cy.xpath("//h3[text()='People - Owners and Signers Information']").should('be.visible');
        cy.xpath("//h4[text()='Individual KYC Summary']").scrollIntoView();
        //Individual KYC Summary
        cy.xpath("//td[text()='FAIL']").should('be.visible');
        cy.xpath("//td[text()='PASS']").should('be.visible');
        cy.xpath("//td[text()='REVIEW']").should('be.visible');
        cy.wait(2000);
        //Review View ChexSystem Report
        cy.xpath("//button[contains(text(),'View ChexSystem Report')]").should('be.visible').click();
        cy.xpath("//text()[.='ID Verification']/ancestor::p[1]").should('be.visible');
        cy.xpath("//strong[contains(text(),'Validation Result - REVIEW')]").scrollIntoView();
        cy.xpath("//strong[contains(text(),'Validation Result - REVIEW')]").should('be.visible').scrollIntoView();
        //View Alloy Report
        cy.xpath("//button[contains(text(),'View Alloy Report')]").should('be.visible').click();
        //View Experian Report
        cy.xpath("//button[contains(text(),'View Experian Report')]").should('be.visible').click();
        cy.xpath("//td[text()='subscriberCode is invalid. Contact Experian Technical Support for more details.']").should('be.visible');

        cy.xpath("//button[contains(text(),'Continue')]").should('be.visible');
    }
    screenCAOSAccountApplicationProductsBAL_687(){
        //Wait for the page to load
        cy.xpath("//h4[text()='Product Selection']").should('be.visible');
        cy.xpath("//label[text()='Product Type']").scrollIntoView();
        cy.wait(2000);
        cy.get('[data-cy="loop-accounts-add"] > .fas').should('be.visible').click();
        let parameterList = [
            {type: "Select List", label:"Product Type",value:"Checking",position:"1", assertion:true,assertionType:"Element Contains Value",assertionTypeCriteria:"Checking"},
            {type: "Line Input", label:"Account Nickname",value:"Account Nickname test",position:"1", assertion:true,assertionType:"Element Contains Value",assertionTypeCriteria:"Account Nickname test"},
            {type: "Line Input", label:"Initial Deposit Amount",value:"12000",position:"1", assertion:true,assertionType:"Element Contains Value",assertionTypeCriteria:"$ 12,000.00 USD"},
            {type: "Select List", label:"Account Owner",value:"BusinessName",position:"1", assertion:true,assertionType:"Element Contains Value",assertionTypeCriteria:"BusinessName"},
            {type: "Select List", label:"Signer(s)",value:"TestName",position:"1", assertion:true,assertionType:"Element Contains Value",assertionTypeCriteria:"In person Test"},
            //Another product
            {type: "Select List", label:"Product Type",value:"Money Market",position:"2", assertion:true,assertionType:"Element Contains Value",assertionTypeCriteria:"Money Market"},
            {type: "Line Input", label:"Account Nickname",value:"Account Nickname test",position:"2", assertion:true,assertionType:"Element Contains Value",assertionTypeCriteria:"Account Nickname test"},
            {type: "Line Input", label:"Initial Deposit Amount",value:"13000",position:"2", assertion:true,assertionType:"Element Contains Value",assertionTypeCriteria:"$ 13,000.00 USD"},
            {type: "Select List", label:"Account Owner",value:"BusinessName",position:"2", assertion:true,assertionType:"Element Contains Value",assertionTypeCriteria:"BusinessName"},
            {type: "Select List", label:"Signer(s)",value:"TestName",position:"2", assertion:true,assertionType:"Element Contains Value",assertionTypeCriteria:"In person Test"},
        ];
        utility.fillScreen(parameterList);
        cy.xpath('(//label[text()="Product"]/parent::div//div[@class="multiselect__tags"])[1]').click();
        cy.wait(2000);
        cy.xpath('(//label[text()="Product"]/parent::div//input)[1]').type('Business Checking{enter}');
        cy.xpath('(//label[text()="Product"]/parent::div//div[@class="multiselect__tags"])[2]').click();
        cy.wait(2000);
        cy.xpath('(//label[text()="Product"]/parent::div//input)[2]').type('Business Money Mkt{enter}');
        //How will you be funding your new account?
        cy.get(':nth-child(3) > [style=""] > [data-cy="screen-field-fundingSource"] > .btn').click();

        cy.xpath("//button[contains(text(),'complete section')]").should('be.visible');
    }
    screenCAOSAccountApplicationServicesBAL_688(){
        //Wait for the page to load
        cy.xpath("//h4[text()='Services and Security']").should('be.visible');
        cy.xpath("//h5[text()='Treasury Management Services']").scrollIntoView();
        cy.wait(2000);
        //Treasury Management Services
        let parameterList = [
            {type: "Check Box", label:"Online Service",value:"",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Check Box", label:"ACH Debit Origination Service",value:"",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Check Box", label:"ACH Credit Origination Service",value:"",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Check Box", label:"ACH Positive Pay Service",value:"",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Check Box", label:"Wire Origination Service",value:"",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Check Box", label:"Remote Deposit Capture Service",value:"",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Check Box", label:"Positive Pay Service",value:"",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Check Box", label:"Daily Sweep Service",value:"",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Check Box", label:"Business Debit Card Service",value:"",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
        ];
        utility.fillScreen(parameterList);
        cy.xpath("//label[text()='ACH Positive Pay Service']").scrollIntoView();
        cy.xpath("//label[text()='ACH Positive Pay Service']").should('be.visible').click();
        cy.xpath("//label[text()='Positive Pay Service']").should('be.visible').click();
        cy.xpath("(//label[contains(text(),'TestName TestLastName')])[1]").should('be.visible').click();
        cy.xpath("(//label[contains(text(),'TestName TestLastName')])[2]").should('be.visible').click();
        //Security Procedures
        cy.xpath("//p[text()='Security Procedures Offered by the Bank']").scrollIntoView();
        cy.xpath("//label[text()='Secure Tokens']").should('be.visible');
        cy.xpath("//label[text()='Call Back Verification for Wire Transfers']").should('be.visible');
        cy.xpath("//label[text()='Time Restrict']").should('be.visible');
        cy.xpath("//label[text()='IP Restrict']").should('be.visible');
        cy.xpath("//label[text()='Dual Control']").should('be.visible');
        cy.xpath("//label[text()='Processing Calendar for ACH Batches']").should('be.visible');

        cy.xpath("//button[contains(text(),'Complete Section')]").should('be.visible');
    }
    screenCAOSAccountApplicationDocumentsBAL_689(){
        //Wait for the page to load
        cy.xpath("//h4[text()='Business Documents']").should('be.visible');
        cy.xpath("//label[text()='Partnership Agreement']").scrollIntoView();
        cy.wait(3000);
        //Upload Documents
        cy.xpath("(//text()[contains(.,'select file')]/ancestor::label[1])[1]").should('be.visible');
        const file1 = "file1.jpg";
        cy.xpath('(//input[@data-cy="file-upload-button"])[1]').attachFile(file1);
        let parameterList = [
            {type: "Select List", label:"Select the control owner for the business",value:"TestName",position:"1", assertion:true,assertionType:"Element Contains Value",assertionTypeCriteria:"In person Test"},
            {type: "File", label:"#tab-form > div > div > div > div > div > div > div:nth-child(7) > div > div:nth-child(1) > div > div > div > div > div > div.col-sm-9 > div > div > div > div > div > div:nth-child(3) > div > div:nth-child(1) > div > div > div > div > div > div.col-sm-4 > div > div > div.uploader.was-validated > div.form-control-file > label > input[type=file]",value:"drone.jpg",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
        ];
        utility.fillScreen(parameterList);
        cy.wait(2000);
        cy.xpath("//button[contains(text(),'Complete Section')]").should('be.visible');
    }
    screenCAOSAccountApplicationFinalizeAndSignBAL_690(){
        //Wait for the page to load
        cy.xpath("//h4[text()='Account Disclosures and Agreements']").should('be.visible');
        cy.xpath("//strong[contains(text(),'How to sign and receive documents')]").scrollIntoView();
        cy.xpath("//button[contains(text(),'Privacy Policy')]").should('be.visible').click();
        cy.xpath("(//span[text()='Other Important Information'])[2]").scrollIntoView();
        cy.xpath("//button[contains(text(),'USA Patriot Act')]").should('be.visible').click();
        //Check on I, In person Test, have read and agree to the Esign Consent Agreement and Privacy Policy.
        cy.xpath("//label[text()='I, TestName TestLastName, have read and agree to the Esign Consent Agreement and Privacy Policy.']").should('be.visible').click();
        cy.xpath("//button[contains(text(),'Submit Application')]").should('be.visible');
    }
    screenCAOSAccountApplicationFinalizeAndSignPreFillBAL_690(){
        //Wait for the page to load
        cy.xpath("//h4[text()='Account Disclosures and Agreements']").should('be.visible');
        cy.xpath("//strong[contains(text(),'How to sign and receive documents')]").scrollIntoView();
        cy.xpath("//button[contains(text(),'Privacy Policy')]").should('be.visible').click();
        cy.xpath("(//span[text()='Other Important Information'])[2]").scrollIntoView();
        cy.xpath("//button[contains(text(),'USA Patriot Act')]").should('be.visible').click();
        //Client Primary Contact
        cy.xpath("//textarea[@name='introNotes']").type('Additional notes to customer TEST');
        cy.xpath("//button[contains(text(),'Send To Client')]").should('be.visible');
    }
    screenCAOSAccountApplicationReviewSummaryBankerBAL_692(){
        //Application Summary Banker
        cy.xpath("//h3[text()='Application Summary']").should('be.visible');
        //Businesses
        cy.xpath("//h5[text()='Businesses']").scrollIntoView();
        cy.xpath("//td[text()='BusinessName']").should('be.visible');
        cy.xpath("//td[text()='General Partnership']").should('be.visible');
        cy.xpath("//td[text()='No']").should('be.visible');
        cy.xpath("//td[text()='DBAtest']").should('be.visible');
        cy.xpath("//td[text()='519210 - Libraries and Archives']").should('be.visible');
        cy.xpath("//td[text()='11/28/2012']").should('be.visible');
        cy.xpath("(//td[text()='AL'])[1]").should('be.visible');
        cy.xpath("//td[text()='1234567890']").should('be.visible');
        cy.xpath("//td[text()='www.test.com']").should('be.visible');
        cy.xpath("//td[text()='3411 Broadway St']").should('be.visible');
        cy.xpath("//td[text()='Orleans Parish']").should('be.visible');
        cy.xpath("//td[text()='70125']").should('be.visible');
        cy.xpath("//td[text()='LA']").should('be.visible');
        cy.xpath("//td[text()='US']").should('be.visible');
        cy.xpath("//td[text()='Mailing Address test']").should('be.visible');
        cy.xpath("//td[text()='City Mailing']").should('be.visible');
        cy.xpath("(//td[text()='AL'])[2]").should('be.visible');
        cy.xpath("(//td[text()='TestName TestLastName'])[1]").should('be.visible');
        cy.xpath("//td[text()='80 %']").should('be.visible');
        cy.xpath("(//td[text()='TestName TestLastName'])[2]").should('be.visible');
        //People
        cy.xpath("//h3[text()='Application Summary']").scrollIntoView();
        cy.xpath("//button[contains(text(),'People')]").should('be.visible').click();
        cy.xpath("//h5[text()='People']").should('be.visible');
        cy.xpath("//td[text()='TestName']").should('be.visible');
        cy.xpath("//td[text()='TestLastName']").scrollIntoView();
        cy.xpath("//td[text()='11/27/1989']").should('be.visible');
        cy.xpath("//td[text()='Signer,Beneficial Owner,Control Owner']").should('be.visible');
        cy.xpath("(//td[text()='1234567890'])[1]").should('be.visible');
        cy.xpath("(//td[text()='1234567890'])[2]").should('be.visible');
        cy.xpath("//td[text()='3411 Broadway St']").should('be.visible');
        cy.xpath("//td[text()='Orleans Parish']").should('be.visible');
        cy.xpath("//td[text()='70125']").should('be.visible');
        cy.xpath("//td[text()='LA']").should('be.visible');
        cy.xpath("//td[text()='US']").should('be.visible');
        cy.xpath("//td[text()='Mailing Address test']").should('be.visible');
        cy.xpath("//td[text()='City Mailing']").should('be.visible');
        cy.xpath("(//td[text()='AL'])[1]").should('be.visible');
        cy.xpath("//td[text()='Employed']").should('be.visible');
        cy.xpath("//td[text()='Admin']").should('be.visible');
        cy.xpath("//td[text()='BusinessName']").should('be.visible');
        cy.xpath("(//td[text()='11/27/2020'])[1]").should('be.visible');
        cy.xpath("//td[text()='3411 Broadway St Orleans Parish AL 70125']").should('be.visible');
        cy.xpath("//td[text()='Yes']").should('be.visible');
        cy.xpath("//td[text()='Yes']").scrollIntoView();
        cy.xpath("//td[text()='Drivers License']").should('be.visible');
        cy.xpath("(//td[text()='1234567890'])[3]").should('be.visible');
        cy.xpath("(//td[text()='AL'])[2]").should('be.visible');
        cy.xpath("//td[text()='11/27/2020']").should('be.visible');
        cy.xpath("//td[text()='11/27/2023']").should('be.visible');
        //Products
        cy.xpath("//h3[text()='Application Summary']").scrollIntoView();
        cy.xpath("(//button[contains(text(),'Products')])[1]").should('be.visible').click();
        cy.xpath("//h5[text()='Products']").should('be.visible');
        cy.xpath("//td[text()='Checking']").should('be.visible');
        cy.xpath("//td[text()='Business Checking']").should('be.visible');
        cy.xpath("//td[text()='12000']").should('be.visible');
        cy.xpath("(//td[text()='Account Nickname test'])[1]").should('be.visible');
        cy.xpath("(//td[text()='BusinessName'])[1]").should('be.visible');
        cy.xpath("(//td[text()='TestName TestLastName'])[1]").should('be.visible');
        cy.xpath("//td[text()='Money Market']").should('be.visible');
        cy.xpath("//td[text()='13000']").should('be.visible');
        cy.xpath("(//td[text()='Account Nickname test'])[2]").should('be.visible');
        cy.xpath("(//td[text()='BusinessName'])[2]").should('be.visible');
        cy.xpath("(//td[text()='TestName TestLastName'])[2]").should('be.visible');
        //Services
        cy.xpath("//h3[text()='Application Summary']").scrollIntoView();
        cy.xpath("(//button[contains(text(),'Services')])[1]").should('be.visible').click();
        cy.xpath("//h5[text()='Services and Security Procedures']").should('be.visible');
        cy.xpath("(//td[contains(text(),'true')])[1]").should('be.visible');
        cy.xpath("(//td[contains(text(),'true')])[2]").should('be.visible');
        cy.xpath("(//td[contains(text(),'true')])[3]").should('be.visible');
        cy.xpath("(//td[contains(text(),'true')])[4]").should('be.visible');
        cy.xpath("(//td[contains(text(),'true')])[5]").should('be.visible');
        cy.xpath("(//td[contains(text(),'true')])[6]").should('be.visible');
        cy.xpath("(//td[contains(text(),'true')])[7]").should('be.visible');
        cy.xpath("(//td[contains(text(),'true')])[8]").should('be.visible');
        cy.xpath("(//td[contains(text(),'true')])[9]").should('be.visible');
        cy.xpath("//span[contains(text(),'true')]").should('be.visible');
        cy.xpath("(//td[contains(text(),'true')])[10]").should('be.visible');
        cy.xpath("(//td[contains(text(),'true')])[11]").should('be.visible');
        cy.xpath("(//td[contains(text(),'true')])[12]").should('be.visible');
        cy.xpath("(//td[contains(text(),'true')])[13]").should('be.visible');
        cy.xpath("(//td[contains(text(),'true')])[14]").should('be.visible');
        //Documents
        cy.xpath("//h3[text()='Application Summary']").scrollIntoView();
        cy.xpath("//button[contains(text(),'Documents')]").should('be.visible').click();
        cy.xpath("//h5[text()='Documents']").should('be.visible');
        cy.xpath("//label[text()='Preview Partnership Agreement']").should('be.visible').click();
        cy.xpath("//label[text()='Preview Identification Document']").should('be.visible').click();
        //Verification
        cy.xpath("//button[contains(text(),'Verification')]").should('be.visible').click();
        cy.xpath("//h5[text()='Verification']").should('be.visible');
        cy.xpath("//text()[contains(.,'SSN Check')]/ancestor::p[1]").should('be.visible');
        cy.xpath("//text()[contains(.,'Name Check')]/ancestor::p[1]").should('be.visible');
        cy.xpath("//text()[contains(.,'Address Check')]/ancestor::p[1]").should('be.visible');
        cy.xpath("//text()[contains(.,'Date of Birth Check')]/ancestor::p[1]").should('be.visible');
        cy.xpath("//text()[contains(.,'Telephone Check')]/ancestor::p[1]").should('be.visible');
        cy.xpath("//text()[contains(.,'Drivers License Check')]/ancestor::p[1]").should('be.visible');
        cy.xpath("//text()[contains(.,'Not Deceased')]/ancestor::p[1]").should('be.visible');
        cy.xpath("//text()[contains(.,'Not a Minor')]/ancestor::p[1]").should('be.visible');
        cy.xpath("//strong[text()='OFAC']").scrollIntoView();
        cy.xpath("//p[text()='0608']").should('be.visible');
        cy.xpath("//p[text()='REVIEW']").should('be.visible');
        cy.xpath("(//button[contains(text(),'Show Report')])[2]").should('be.visible').click();
        cy.get('[class="tox-edit-area__iframe"]').first().then(($iframe) => {
            const $body = $iframe.contents().find('body');
            cy.wrap($body).find('p').type('Banker Notes TEST Complete in person');
        })
        cy.xpath("//button[contains(text(),'Edit Products and Services')]").should('be.visible');
        cy.xpath("//button[contains(text(),'Decline Application')]").should('be.visible');
        cy.xpath("//button[contains(text(),'BSA Review')]").should('be.visible');
    }
    screenCAOSBankerReviewEditApplicationBAL_693(){
       cy.xpath("//h3[text()='Edit Account Opening Application']").should('be.visible');
        //Product Selection
        cy.xpath("//h4[text()='Product Selection']").scrollIntoView();
        cy.xpath("(//input[@type='text'][@name='nickname'])[1]").should('have.value','Account Nickname test');
        cy.xpath("(//input[@type='text'][@name='initialDeposit'])[1]").should('have.value','$ 12,000.00 USD');
        cy.xpath("(//input[@type='text'][@name='nickname'])[2]").should('have.value','Account Nickname test');
        cy.wait(2000);
        cy.xpath("(//input[@type='text'][@name='nickname'])[2]").type('{del}{selectall}{backspace}');
        cy.xpath("(//input[@type='text'][@name='nickname'])[2]").type('Edit Nickname');
        cy.xpath("(//input[@type='text'][@name='initialDeposit'])[2]").should('have.value','$ 13,000.00 USD');
        //Services and Security
        let parameterList = [
            {type: "Check Box", label:"ACH Debit Origination Service",value:"",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Check Box", label:"ACH Positive Pay Service",value:"",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},   
            {type: "Check Box", label:"Remote Deposit Capture Service",value:"",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Check Box", label:"Business Debit Card Service",value:"",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
        ];
        utility.fillScreen(parameterList);
        cy.xpath("//h5[text()='How will you be funding your new account?']").scrollIntoView();
        //Notes to Customer
        cy.xpath("//textarea[@name='bankerEditNoteToCustomer']").type('Enter any additional message for the customer Test');
        cy.xpath("//button[contains(text(),'Cancel Edit')]").should('be.visible');
        cy.xpath("//button[contains(text(),'Send to Client')]").should('be.visible');  
    }
    screenCAOSAccountApplicationReviewAuthorizationForChange(){
        //Authorization for changes to application
        cy.xpath("//h3[text()='Authorization for changes to application']").should('be.visible');
        cy.xpath("//td[text()='Edit Nickname']").should('be.visible');
        cy.xpath("(//td[contains(text(),'false')])[1]").should('be.visible');
        cy.xpath("(//td[contains(text(),'false')])[2]").should('be.visible');
        cy.xpath("(//td[contains(text(),'false')])[3]").should('be.visible');
        cy.xpath("(//td[contains(text(),'false')])[4]").should('be.visible');
        //Authorized Signer | In person Test
        cy.get(":nth-child(11) > .form-group > :nth-child(1) > div > .text-primary").scrollIntoView();
        cy.wait(2000);
        cy.get('#tab-form > div > div > div > div > div > div > div:nth-child(13) > div > div.signature-container.d-flex.align-items-end > div.signature.pl-0 > canvas').should("be.visible").click('center');
        cy.get('[class="signature pl-0"]').should("be.visible").click('center',(err, runnable) => {
            return false
        });
        cy.xpath("//button[contains(text(),'Submit')]").should("be.visible");
    }
    screenCAOSAccountApplicationEditReviewSummaryBankerBAL_692(){
        //Application Summary Banker
        cy.xpath("//h3[text()='Application Summary']").should('be.visible');
        //Businesses
        cy.xpath("//h5[text()='Businesses']").scrollIntoView();
        cy.xpath("//td[text()='BusinessName']").should('be.visible');
        cy.xpath("//td[text()='General Partnership']").should('be.visible');
        cy.xpath("//td[text()='No']").should('be.visible');
        cy.xpath("//td[text()='DBAtest']").should('be.visible');
        cy.xpath("//td[text()='519210 - Libraries and Archives']").should('be.visible');
        cy.xpath("//td[text()='11/28/2012']").should('be.visible');
        cy.xpath("(//td[text()='AL'])[1]").should('be.visible');
        cy.xpath("//td[text()='1234567890']").should('be.visible');
        cy.xpath("//td[text()='www.test.com']").should('be.visible');
        cy.xpath("//td[text()='3411 Broadway St']").should('be.visible');
        cy.xpath("//td[text()='Orleans Parish']").should('be.visible');
        cy.xpath("//td[text()='70125']").should('be.visible');
        cy.xpath("//td[text()='LA']").should('be.visible');
        cy.xpath("//td[text()='US']").should('be.visible');
        cy.xpath("//td[text()='Mailing Address test']").should('be.visible');
        cy.xpath("//td[text()='City Mailing']").should('be.visible');
        cy.xpath("(//td[text()='AL'])[2]").should('be.visible');
        cy.xpath("(//td[text()='TestName TestLastName'])[1]").should('be.visible');
        cy.xpath("//td[text()='80 %']").should('be.visible');
        cy.xpath("(//td[text()='TestName TestLastName'])[2]").should('be.visible');
        //cy.xpath("//td[text()='Administrator']").should('be.visible');
        //People
        cy.xpath("//h3[text()='Application Summary']").scrollIntoView();
        cy.xpath("//button[contains(text(),'People')]").should('be.visible').click();
        cy.xpath("//h5[text()='People']").should('be.visible');
        cy.xpath("//td[text()='TestName']").should('be.visible');
        cy.xpath("//td[text()='TestLastName']").scrollIntoView();
        cy.xpath("//td[text()='11/27/1989']").should('be.visible');
        //cy.xpath("//td[text()='Administrator']").should('be.visible');
        cy.xpath("//td[text()='Signer,Beneficial Owner,Control Owner']").should('be.visible');
        cy.xpath("(//td[text()='1234567890'])[1]").should('be.visible');
        cy.xpath("(//td[text()='1234567890'])[2]").should('be.visible');
        cy.xpath("//td[text()='3411 Broadway St']").should('be.visible');
        cy.xpath("//td[text()='Orleans Parish']").should('be.visible');
        cy.xpath("//td[text()='70125']").should('be.visible');
        cy.xpath("//td[text()='LA']").should('be.visible');
        cy.xpath("//td[text()='US']").should('be.visible');
        cy.xpath("//td[text()='Mailing Address test']").should('be.visible');
        cy.xpath("//td[text()='City Mailing']").should('be.visible');
        cy.xpath("(//td[text()='AL'])[1]").should('be.visible');
        cy.xpath("//td[text()='Employed']").should('be.visible');
        cy.xpath("//td[text()='Admin']").should('be.visible');
        cy.xpath("//td[text()='BusinessName']").should('be.visible');
        cy.xpath("(//td[text()='11/27/2020'])[1]").should('be.visible');
        cy.xpath("//td[text()='3411 Broadway St Orleans Parish AL 70125']").should('be.visible');
        cy.xpath("//td[text()='Yes']").should('be.visible');
        cy.xpath("//td[text()='Yes']").scrollIntoView();
        cy.xpath("//td[text()='Drivers License']").should('be.visible');
        cy.xpath("(//td[text()='1234567890'])[3]").should('be.visible');
        cy.xpath("(//td[text()='AL'])[2]").should('be.visible');
        cy.xpath("//td[text()='11/27/2020']").should('be.visible');
        cy.xpath("//td[text()='11/27/2023']").should('be.visible');
        //Products
        cy.xpath("//h3[text()='Application Summary']").scrollIntoView();
        cy.xpath("(//button[contains(text(),'Products')])[1]").should('be.visible').click();
        cy.xpath("//h5[text()='Products']").should('be.visible');
        cy.xpath("//td[text()='Checking']").should('be.visible');
        cy.xpath("//td[text()='Business Checking']").should('be.visible');
        cy.xpath("//td[text()='12000']").should('be.visible');
        cy.xpath("(//td[text()='Account Nickname test'])[1]").should('be.visible');
        cy.xpath("(//td[text()='BusinessName'])[1]").should('be.visible');
        cy.xpath("(//td[text()='TestName TestLastName'])[1]").should('be.visible');
        cy.xpath("//td[text()='Money Market']").should('be.visible');
        cy.xpath("//td[text()='13000']").should('be.visible');
        //cy.xpath("//td[text()='Edit Nickname']").should('be.visible');
        cy.xpath("(//td[text()='BusinessName'])[2]").should('be.visible');
        cy.xpath("(//td[text()='TestName TestLastName'])[2]").should('be.visible');
        //Services
        cy.xpath("//h3[text()='Application Summary']").scrollIntoView();
        cy.xpath("(//button[contains(text(),'Services')])[1]").should('be.visible').click();
        cy.xpath("//h5[text()='Services and Security Procedures']").should('be.visible');
        cy.xpath("(//td[contains(text(),'true')])[1]").should('be.visible');
        cy.xpath("(//td[contains(text(),'true')])[2]").should('be.visible');
        cy.xpath("(//td[contains(text(),'true')])[3]").should('be.visible');
        cy.xpath("(//td[contains(text(),'true')])[4]").should('be.visible');
        cy.xpath("(//td[contains(text(),'true')])[5]").should('be.visible');
        cy.xpath("(//td[contains(text(),'true')])[6]").should('be.visible');
        cy.xpath("(//td[contains(text(),'true')])[7]").should('be.visible');
        cy.xpath("(//td[contains(text(),'true')])[8]").should('be.visible');
        cy.xpath("(//td[contains(text(),'true')])[9]").should('be.visible');
        cy.xpath("//span[contains(text(),'true')]").should('be.visible');
        //Documents
        cy.xpath("//h3[text()='Application Summary']").scrollIntoView();
        cy.xpath("//button[contains(text(),'Documents')]").should('be.visible').click();
        cy.xpath("//h5[text()='Documents']").should('be.visible');
        cy.xpath("//label[text()='Preview Partnership Agreement']").should('be.visible').click();
        cy.xpath("//label[text()='Preview Identification Document']").should('be.visible').click();
        //Verification
        cy.xpath("//button[contains(text(),'Verification')]").should('be.visible').click();
        cy.xpath("//h5[text()='Verification']").should('be.visible');
        //cy.xpath("//header[text()='File Preview']").should('be.visible');
        cy.xpath("//text()[contains(.,'SSN Check')]/ancestor::p[1]").should('be.visible');
        cy.xpath("//text()[contains(.,'Name Check')]/ancestor::p[1]").should('be.visible');
        cy.xpath("//text()[contains(.,'Address Check')]/ancestor::p[1]").should('be.visible');
        cy.xpath("//text()[contains(.,'Date of Birth Check')]/ancestor::p[1]").should('be.visible');
        cy.xpath("//text()[contains(.,'Telephone Check')]/ancestor::p[1]").should('be.visible');
        cy.xpath("//text()[contains(.,'Drivers License Check')]/ancestor::p[1]").should('be.visible');
        cy.xpath("//text()[contains(.,'Not Deceased')]/ancestor::p[1]").should('be.visible');
        cy.xpath("//text()[contains(.,'Not a Minor')]/ancestor::p[1]").should('be.visible');
        cy.get('[class="tox-edit-area__iframe"]').scrollIntoView();
        cy.xpath("//p[text()='REVIEW']").should('be.visible');
        cy.get('[class="tox-edit-area__iframe"]').first().then(($iframe) => {
            const $body = $iframe.contents().find('body');
            cy.wrap($body).find('p').type('Banker Notes TEST Complete');
        })
        cy.xpath("//button[contains(text(),'Edit Products and Services')]").should('be.visible');
        cy.xpath("//button[contains(text(),'Decline Application')]").should('be.visible');
        cy.xpath("//button[contains(text(),'BSA Review')]").should('be.visible');
    } 
    screenCAOSAccountApplicationBSAReviewBAL_695(){
        cy.xpath("//button[text()='Claim Task']").should('be.visible');
        cy.xpath("//button[text()='Claim Task']").click();
        cy.wait(5000);
        //Application Summary Banker
        cy.xpath("//h3[text()='BSA Review']").should('be.visible');

        cy.xpath("(//strong[text()='BSA Review'])[1]").scrollIntoView();
        cy.xpath("//textarea[@name='bsaNotes']").type("BSA Notes TEST");
        cy.xpath("//button[contains(text(),'Decline')]").scrollIntoView();
        cy.xpath("//button[contains(text(),'Decline')]").should('be.visible');
        cy.xpath("//button[contains(text(),'Approve')]").should('be.visible');
    }
    screenCAOSAccountApplicationReviewDueDiligenceBAL_696(){
        cy.xpath("//h3[text()='Banker Due Diligence']").should('be.visible');
        cy.wait(2000);
        //Due Diligence Questions for...
        cy.xpath("//h5[text()='Due Diligence Questions for BusinessName']").scrollIntoView();
        let parameterList = [
            {type: "Line Input", label:"How did the Customer hear about the Bank?",value:"Test Due Diligence",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Line Input", label:"What are the goals of the account and/or relationship?",value:"Test Due Diligence",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},   
            {type: "Select List", label:"Is this a home-based business?",value:"Yes",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Select List", label:"Is the business a DBA?",value:"No",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Select List", label:"Does the business operate out of multiple locations?",value:"No",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Select List", label:"Is the business considered to be within the Bank's footprint?",value:"Yes",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Select List", label:"Is the business Cash Intensive?",value:"Yes",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Select List", label:"Is the business a Money Service Business or Third Party Payment Provider?",value:"Yes",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},   
            {type: "Select List", label:"Is the business an embassy?",value:"No",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Select List", label:"Is the business a Non-Bank Financial Institution (NBFI)?",value:"No",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Select List", label:"Is the business a Non-Bank Financial Business/Profession (NBBP)?",value:"No",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Select List", label:"Is the business a Political Action Committee (PAC)?",value:"No",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
        ];
        utility.fillScreen(parameterList);
        cy.xpath("//label[text()='Discuss the nature of the business']").scrollIntoView();
        cy.xpath("//input[@type='text'][@name='questionnaire.monthlyRevenue']").type('123');
        cy.xpath("//textarea[@name='questionnaire.natureOfBusiness']").type("Discuss the nature of the business TEST");
        cy.xpath("//button[contains(text(),'Continue')]").should('be.visible'); 
    }
    screenCAOSAccountApplicationReviewRiskRatingBAL_697(){
        cy.xpath("//h3[text()='Risk Rating for Account']").should('be.visible');
        //Risk Rating
        cy.wait(2000);
        cy.xpath("//h5[text()='General Risk Rating Questions']").scrollIntoView();
        let parameterList = [
            {type: "Select List", label:"Does the customer have a loan relationship with us or have they been approved for a loan (pending booking)?",value:"Yes",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Select List", label:"Did the customer provide previous bank statements for analysis",value:"Yes",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Select List", label:"How many months of statements did the customer provide?",value:"3 Months",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Select List", label:"Is there evidence of ACH Credit Origination Activity",value:"Yes",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Select List", label:"Is there evidence of Wire Origination Activity",value:"Yes",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Select List", label:"Select the Type(s) of Wire Origination",value:"Domestic",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Select List", label:"Select the Type(s) of Wire Origination",value:"International",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
        ];
        utility.fillScreen(parameterList);
        //General Risk Rating Questions
        cy.xpath("//label[text()='What is the average monthly balance across all accounts?']").scrollIntoView();
        cy.xpath("//input[@type='text'][@name='averageMonthlyBalance']").type('123').should('have.value','$ 123.00 USD');
        //Customer selected ACH Credits in Customer Service Selection
        cy.xpath("//label[text()='What is the average amount of credits originated for the month?']").scrollIntoView();
        cy.xpath("//input[@type='text'][@name='averageAchCreditAmount']").type('12300').should('have.value','$ 12,300.00 USD');
        cy.xpath("(//input[@type='text'][@name='averageDepositAmount'])[2]").type('123').should('have.value','$ 123.00 USD');
        //Customer selected Wire Origination in Customer Service Selection
        cy.xpath("//label[text()='What is the average amount of credits originated for the month?']").scrollIntoView();
        cy.xpath("//input[@type='text'][@name='averageDomesticWiresAmount']").type('1122').should('have.value','$ 1,122.00 USD');
        cy.xpath("//input[@type='text'][@name='averageIntlWiresAmount']").type('33').should('have.value','$ 33.00 USD');

        cy.xpath("//button[contains(text(),'Continue')]").should('be.visible');
    }
    screenCAOSAccountApplicationReviewProductsBAL_698(){
        cy.xpath("//h3[text()='Products Review']").should('be.visible');
        //Products
        cy.wait(2000);
        cy.xpath("(//strong[text()='Product Information'])[1]").scrollIntoView();
        cy.xpath("//td[text()='Checking']").should('be.visible');
        cy.xpath("//td[text()='Business Checking']").should('be.visible');
        cy.xpath("//td[text()='12000']").should('be.visible');
        cy.xpath("(//td[text()='Account Nickname test'])[1]").should('be.visible');
        cy.xpath("(//td[text()='BusinessName'])[1]").should('be.visible');
        cy.xpath("//td[text()='Money Market']").should('be.visible');
        cy.xpath("//td[text()='13000']").should('be.visible');
        cy.xpath("(//td[text()='BusinessName'])[2]").should('be.visible');
        cy.wait(2000);
        let parameterList = [
            //Product Information 1
            {type: "Check Box", label:"ACH",value:"",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Check Box", label:"ATM",value:"",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Check Box", label:"Monetary Instruments",value:"",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Check Box", label:"Remote/Mobile Deposit",value:"",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Check Box", label:"Domestic Wire",value:"",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Check Box", label:"International Wire",value:"",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            //ACH
            {type: "Line Input", label:"ACH ($) In",value:"123",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Line Input", label:"ACH (#) In",value:"123",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Line Input", label:"ACH ($) Out",value:"456",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Line Input", label:"ACH (#) Out",value:"456",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            //ATM
            {type: "Line Input", label:"ATM Cash ($) Out",value:"789",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Line Input", label:"ATM Cash (#) Out",value:"789",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            //Monetary Instruments
            {type: "Line Input", label:"Monetary Instruments ($) Out",value:"123",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Line Input", label:"Monetary Instruments (#) Out",value:"123",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            //Remote/Mobile Deposit
            {type: "Line Input", label:"Remote/Mobile Deposit ($) In",value:"456",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Line Input", label:"Remote/Mobile Deposit (#) In",value:"456",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            //Domestic Wire
            {type: "Line Input", label:"Domestic Wires ($) In",value:"789",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Line Input", label:"Domestic Wires (#) In",value:"789",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Line Input", label:"Domestic Wires ($) Out",value:"987",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Line Input", label:"Domestic Wires (#) Out",value:"987",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            //International Wire
            {type: "Line Input", label:"International Wire ($) In",value:"159",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Line Input", label:"International Wire (#) In",value:"159",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Line Input", label:"International Wire ($) Out",value:"357",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Line Input", label:"International Wire (#) Out",value:"357",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            //Product Information 2
            {type: "Check Box", label:"Cash",value:"",position:"8", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Line Input", label:"Cash ($) In",value:"789",position:"2", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Line Input", label:"Cash (#) In",value:"789",position:"2", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Line Input", label:"Cash ($) Out",value:"987",position:"4", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Line Input", label:"Cash (#) Out",value:"987",position:"4", assertion:false,assertionType:"",assertionTypeCriteria:""},
        ];
        utility.fillScreen(parameterList);
        cy.xpath("//button[contains(text(),'Continue')]").should('be.visible');
    }
    screenCAOSAccountApplicationReviewServicesBAL_699(){
        cy.xpath("//h3[text()='Setup Account Services']").should('be.visible');
        cy.wait(2000);
        //Setup Services
        cy.xpath("//h4[text()='Setup Services']").scrollIntoView();
        
        //Online Service
        cy.xpath("//button[contains(text(),'Online Service')]").should('be.visible').click();
        cy.xpath("//h5[text()='Online Service']").should('be.visible');
        cy.xpath('//label[text()="Online Banking User Role"]/parent::div//div[@class="multiselect__tags"]').should('be.visible').click();
        cy.xpath("//label[text()='Online Banking User Role']/parent::div//input").type('User{enter}');
        cy.xpath("//*[@class='fas fa-check-circle text-success']").should('be.visible');
        cy.xpath("//button[contains(text(),'← Back to Services')]").should('be.visible').click();
        //ACH Debit Origination Service
        cy.xpath("//button[contains(text(),'ACH Debit Origination Service')]").should('be.visible').click();
        cy.xpath("//h5[text()='ACH Debit Origination Service']").should('be.visible');
            //Authorized Accounts
        cy.xpath("//label[contains(text(),'Account Nickname test (Business Checking)')]").click();
           //ACH Debit Origination Details
        cy.xpath('//label[text()="Types of ACH Origination Requested"]/parent::div//div[@class="multiselect__tags"]').should('be.visible').click();
        cy.xpath("//label[text()='Types of ACH Origination Requested']/parent::div//input").type('ACH Debits (Single){enter}');
        cy.xpath('//label[text()="Class Codes Requested"]/parent::div//div[@class="multiselect__tags"]').should('be.visible').click();
        cy.xpath("//label[text()='Class Codes Requested']/parent::div//input").type('CCD{enter}');
        cy.xpath("//input[@type='number'][@name='achDebitOrigination.maxPaymentsPerDayCount']").type('123');
        cy.xpath("//input[@type='number'][@name='achDebitOrigination.maxPaymentsPerPeriodCount']").type('456');
        cy.xpath("//input[@type='text'][@name='achDebitOrigination.maxPaymentPerItemAmount']").type('789');
        cy.xpath("//input[@type='text'][@name='achDebitOrigination.maxPeriodAmount']").type('987');
        cy.xpath("//input[@type='text'][@name='achDebitOrigination.maxBatchAmountPerDay']").type('654');
        cy.xpath('//label[text()="Does customer use a third party processor?"]/parent::div//div[@class="multiselect__tags"]').should('be.visible').click();
        cy.xpath("//label[text()='Does customer use a third party processor?']/parent::div//input").type('No{enter}');
            //Agents Authorized to Originate/Transmit
        cy.xpath("(//*[@class='fas fa-plus'])[2]").should('be.visible').click();
        cy.xpath('//label[text()="Authorized Agent"]/parent::div//div[@class="multiselect__tags"]').should('be.visible').click();
        cy.xpath("//label[text()='Authorized Agent']/parent::div//input").type('Test{enter}');
        cy.xpath("//input[@type='text'][@name='phone']").should('be.visible').should('have.value','1234567890');
        cy.xpath('//label[text()="Dual Control required for this Agent?"]/parent::div//div[@class="multiselect__tags"]').should('be.visible').click();
        cy.xpath("//label[text()='Dual Control required for this Agent?']/parent::div//input").type('Yes{enter}');
        cy.xpath("//label[text()='Agent will be allowed to']").should('be.visible');
        cy.xpath('//label[text()="Agent will be allowed to"]/parent::div//div[@class="multiselect__tags"]').should('be.visible').click();
        cy.xpath("//label[text()='Agent will be allowed to']/parent::div//input").type('Transmit Only{enter}');
        cy.xpath('//label[text()="Restrictions for this Agent?"]/parent::div//div[@class="multiselect__tags"]').should('be.visible').click();
        cy.xpath("//label[text()='Restrictions for this Agent?']/parent::div//input").type('Yes{enter}');
        cy.xpath("//label[text()='Restrictions are as followed']").should('be.visible');
        cy.xpath("//textarea[@name='restrictionDetails']").type('Restrictions are as followed TEST');
        cy.xpath("//label[text()='Add SmartPay Express Portal']").should('be.visible').click();
        cy.xpath('//label[text()="Authorized Account"]/parent::div//div[@class="multiselect__tags"]').should('be.visible').click();
        cy.xpath("(//label[text()='Authorized Account']/parent::div//input)[3]").type('Account Nickname test{enter}');
        cy.xpath("//input[@type='text'][@name='accountNickname']").should('be.visible').type('Account Nickname Test');
        cy.xpath('//label[text()="Types of Payment Origination Requested (may choose multiple)"]/parent::div//div[@class="multiselect__tags"]').should('be.visible').click();
        cy.xpath("//label[text()='Types of Payment Origination Requested (may choose multiple)']/parent::div//input").type('ACH Debits (Single){enter}');
        cy.xpath("//h5[text()='ACH Debit Origination Service']").scrollIntoView();
        cy.xpath("//*[@class='fas fa-check-circle text-success']").should('be.visible');
        cy.xpath("//button[contains(text(),'← Back to Services')]").should('be.visible').click();
        cy.wait(2000);
        //ACH Credit Origination Service
        cy.xpath("//button[contains(text(),'ACH Credit Origination Service')]").should('be.visible');
        cy.xpath("//button[contains(text(),'ACH Credit Origination Service')]").click();
        cy.xpath("//h5[text()='ACH Credit Origination Service']").should('be.visible');
        cy.xpath("(//*[@class='fas fa-plus'])[2]").should('be.visible').click();
        cy.wait(2000);
        let parameterList = [
            //Authorized Accounts
            {type: "Check Box", label:"Account Nickname test (Business Checking)",value:"",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            //ACH Credit Origination Details
            {type: "Select List", label:"Types of ACH Credit Origination Requested",value:"ACH Credits (for Payroll)",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Select List", label:"Class Codes Requested",value:"CTX",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Line Input", label:"Max Amount (per ACH)",value:"123",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Line Input", label:"Max Amount (per Day)",value:"123",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Line Input", label:"Third Party Processor",value:"TEST Processor",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Line Input", label:"Contact Name",value:"TEST NAME",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Line Input", label:"Contact Number",value:"73072142",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            //Agents Authorized to Originate/Transmit
            {type: "Select List", label:"Authorized Agent",value:"Test",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Select List", label:"Dual Control required for this Agent?",value:"No",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            {type: "Select List", label:"Restrictions for this Agent?",value:"No",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            ];
        utility.fillScreen(parameterList);
        cy.xpath("//h5[text()='ACH Credit Origination Service']").scrollIntoView();
        cy.xpath("//*[@class='fas fa-check-circle text-success']").should('be.visible');
        cy.xpath("//button[contains(text(),'← Back to Services')]").should('be.visible').click();
        cy.wait(2000);
        //ACH Positive Pay Service
        cy.xpath("//button[contains(text(),'ACH Positive Pay Service')]").should('be.visible');
        cy.xpath("//button[contains(text(),'ACH Positive Pay Service')]").click();
        cy.xpath("//h5[text()='ACH Positive Pay Service']").should('be.visible');
            //Authorized Accounts
        cy.xpath("//label[contains(text(),'Account Nickname test (Business Checking)')]").click();
           //Agents Authorized to Upload/Work Exceptions
        cy.xpath("(//*[@class='fas fa-plus'])[2]").should('be.visible').click();
        cy.xpath('//label[text()="Authorized Agent"]/parent::div//div[@class="multiselect__tags"]').should('be.visible').click();
        cy.xpath("//label[text()='Authorized Agent']/parent::div//input").type('Test{enter}');
        cy.xpath("//input[@type='text'][@name='phone']").should('be.visible').should('have.value','1234567890');
        cy.xpath("//label[text()='Add Special Instructions']").should('be.visible').click();
        cy.xpath("//textarea[@name='specialInstructions']").should('be.visible').type('Special Instructions/Notes for this Agent: TEST');
            //ACH Positive Pay Details
        cy.xpath('//label[text()="Allow all Debits"]/parent::div//div[@class="multiselect__tags"]').should('be.visible').click();
        cy.xpath("//label[text()='Allow all Debits']/parent::div//input").type('Yes{enter}');
        cy.xpath('//label[text()="Allow all Credits"]/parent::div//div[@class="multiselect__tags"]').should('be.visible').click();
        cy.xpath("//label[text()='Allow all Credits']/parent::div//input").type('No{enter}');
        cy.xpath('//label[text()="Are there any Exceptions?"]/parent::div//div[@class="multiselect__tags"]').should('be.visible').click();
        cy.xpath("//label[text()='Are there any Exceptions?']/parent::div//input").type('No{enter}');
        cy.xpath('//label[text()="Are there any Exceptions?"]/parent::div//div[@class="multiselect__tags"]').should('be.visible').click();
        cy.xpath("//label[text()='Are there any Exceptions?']/parent::div//input").type('Yes{enter}');
            //Exception List for ACH
        cy.xpath("//input[@type='text'][@name='companyName']").scrollIntoView();
        cy.xpath("//input[@type='text'][@name='companyName']").should('be.visible').type('Company Name Test');
        cy.xpath("//input[@type='text'][@name='companyId']").should('be.visible').type('1200012');
        cy.xpath("//input[@type='text'][@name='SEC']").should('be.visible').type('SEC test');
        cy.xpath('//label[text()="Allow"]/parent::div//div[@class="multiselect__tags"]').should('be.visible').click();
        cy.xpath("//label[text()='Allow']/parent::div//input").type('No{enter}');
        cy.xpath("//input[@type='text'][@name='amountFrom']").should('be.visible').type('123');
        cy.xpath("//input[@type='text'][@name='amountTo']").should('be.visible').type('456');
        cy.xpath('//label[text()="Debit or Credit"]/parent::div//div[@class="multiselect__tags"]').should('be.visible').click();
        cy.xpath("//label[text()='Debit or Credit']/parent::div//input").type('Debit{enter}');
        cy.xpath("//input[@type='text'][@name='abaNumber']").should('be.visible').type('123');
        cy.xpath('(//input[@class="form-control"])[7]').should('be.visible').type('11/28/2022');
        cy.xpath("//textarea[@name='notes']").should('be.visible').type('Notes TEST');
        cy.xpath("//h5[text()='ACH Positive Pay Service']").scrollIntoView();
        cy.xpath("//*[@class='fas fa-check-circle text-success']").should('be.visible');
        cy.xpath("//button[contains(text(),'← Back to Services')]").should('be.visible').click();
        cy.wait(2000);
        //Wire Origination Service
        cy.xpath("//button[contains(text(),'Wire Origination Service')]").should('be.visible');
        cy.xpath("//button[contains(text(),'Wire Origination Service')]").click();
        cy.xpath("//h5[text()='Wire Origination Service']").should('be.visible');
            //Notification Preference
        cy.xpath('//label[text()="Would you like to receive an email notification upon transmission or receipt of a wire?"]/parent::div//div[@class="multiselect__tags"]').should('be.visible').click();
        cy.xpath("//label[text()='Would you like to receive an email notification upon transmission or receipt of a wire?']/parent::div//input").type('No{enter}');
            //Account Details and Requested Limits
        cy.xpath('(//label[text()="Authorized Account"]/parent::div//div[@class="multiselect__tags"])[1]').should('be.visible').click();
        cy.xpath("(//label[text()='Authorized Account']/parent::div//input)[1]").type('Account Nickname{enter}');
        cy.xpath("//input[@type='text'][@name='limitPerWire']").should('be.visible').type('123');
        cy.xpath("//input[@type='text'][@name='limitPerDay']").should('be.visible').type('456');
        cy.xpath("//input[@type='text'][@name='limitPerWireDLI']").should('be.visible').type('789');
        cy.xpath("//input[@type='text'][@name='limitPerDayDLI']").should('be.visible').type('321');
            //Agents Authorized to Originate/Transmit
        cy.xpath("(//button[@title='Add Item'])[2]").should('be.visible').click();
        cy.xpath('//label[text()="Authorized Agent"]/parent::div//div[@class="multiselect__tags"]').should('be.visible').click();
        cy.xpath("//label[text()='Authorized Agent']/parent::div//input").type('Test{enter}');
        cy.xpath("//input[@type='text'][@name='userPIN']").type('123456');
        cy.xpath("//label[text()='Add Special Instructions']").should('be.visible').click();
        cy.xpath("//textarea[@name='specialInstructions']").type('Special Instructions/Notes for this Agent TEST');
        cy.xpath('//label[text()="Dual Control required for this Agent?"]/parent::div//div[@class="multiselect__tags"]').should('be.visible').click();
        cy.xpath("//label[text()='Dual Control required for this Agent?']/parent::div//input").type('Yes{enter}');
        cy.xpath('//label[text()="Restrictions for this Agent?"]/parent::div//div[@class="multiselect__tags"]').should('be.visible').click();
        cy.xpath("//label[text()='Restrictions for this Agent?']/parent::div//input").type('No{enter}');
        cy.xpath('//label[text()="Agent will be allowed to"]/parent::div//div[@class="multiselect__tags"]').should('be.visible').click();
        cy.xpath("//label[text()='Agent will be allowed to']/parent::div//input").type('Transmit Only{enter}');
            //Call Back Verification
        cy.xpath('//label[text()="We authorize the following to verify the authenticity of our wires"]/parent::div//div[@class="multiselect__tags"]').should('be.visible').click();
        cy.xpath("//label[text()='We authorize the following to verify the authenticity of our wires']/parent::div//input").type('Only by an {enter}');
            //Domestic Drawdown Request Information
        cy.xpath('//label[text()="Customer is requesting Drawdown Wire Service"]/parent::div//div[@class="multiselect__tags"]').should('be.visible').click();
        cy.xpath("//label[text()='Customer is requesting Drawdown Wire Service']/parent::div//input").type('No{enter}');
        cy.xpath("//h5[text()='Wire Origination Service']").scrollIntoView();
        cy.xpath("//*[@class='fas fa-check-circle text-success']").should('be.visible');
        cy.xpath("//button[contains(text(),'← Back to Services')]").should('be.visible').click(); 
        cy.wait(2000);
        //Remote Deposit Capture Service
        cy.xpath("//button[contains(text(),'Remote Deposit Capture Service')]").should('be.visible');
        cy.xpath("//button[contains(text(),'Remote Deposit Capture Service')]").click();
        cy.xpath("//span[text()='Remote Deposit Capture Service']").should('be.visible');
            //Authorized Accounts
        cy.xpath("//label[contains(text(),'Account Nickname test (Business Checking)')]").should('be.visible').click();
            //Remote Deposit Details
        cy.xpath('//label[text()="Equipment Type (choose all that apply)"]/parent::div//div[@class="multiselect__tags"]').should('be.visible').click();
        cy.xpath("//label[text()='Equipment Type (choose all that apply)']/parent::div//input").type('Single Feed Scanner{enter}');
        cy.xpath('//label[text()="Does customer use a third party processor?"]/parent::div//div[@class="multiselect__tags"]').should('be.visible').click();
        cy.xpath("//label[text()='Does customer use a third party processor?']/parent::div//input").type('No{enter}');
            //Requested Limits*
        cy.xpath("//input[@type='number'][@name='rdc.dailyMaxChecks']").should('be.visible').type('3');
        cy.xpath("//input[@type='number'][@name='rdc.checksPerPeriod']").should('be.visible').type('4');
        cy.xpath("//input[@type='text'][@name='rdc.maxCheckAmount']").should('be.visible').type('789');
        cy.xpath("//input[@type='text'][@name='rdc.maxBatchAmount']").should('be.visible').type('321');
        cy.xpath("//input[@type='text'][@name='rdc.maxPeriodAmount']").should('be.visible').type('321');
        cy.xpath("//*[@class='fas fa-check-circle text-success']").should('be.visible');
        cy.xpath("//button[contains(text(),'← Back to Services')]").should('be.visible').click(); 
        cy.wait(2000);
        //Positive Pay Service
        cy.xpath("(//button[contains(text(),'Positive Pay Service')])[2]").should('be.visible');
        cy.xpath("(//button[contains(text(),'Positive Pay Service')])[2]").click();
        cy.xpath("//h5[text()='Positive Pay Service']").should('be.visible');
            //Authorized Accounts
        cy.xpath("//label[contains(text(),'Account Nickname test (Business Checking)')]").should('be.visible').click();
            //Agents Authorized to Upload/Work Exceptions
        cy.xpath("(//*[@class='fas fa-plus'])[2]").should('be.visible').click();
        cy.xpath('//label[text()="Authorized Agent"]/parent::div//div[@class="multiselect__tags"]').should('be.visible').click();
        cy.xpath("//label[text()='Authorized Agent']/parent::div//input").type('Test{enter}');
        cy.xpath("//label[text()='Add Special Instructions']").click();
        cy.xpath("//textarea[@name='specialInstructions']").type('Special Instructions/Notes for this Agent: TEST');
        cy.xpath("//*[@class='fas fa-check-circle text-success']").should('be.visible');
        cy.xpath("//button[contains(text(),'← Back to Services')]").should('be.visible').click(); 
        cy.wait(2000);
        //Daily Sweep Service
        cy.xpath("//button[contains(text(),'Daily Sweep Service')]").should('be.visible');
        cy.xpath("//button[contains(text(),'Daily Sweep Service')]").click();
        cy.xpath("//h5[text()='Daily Sweep Service']").should('be.visible');
            //Sweep Information
        cy.xpath('//label[text()="What type of sweep?"]/parent::div//div[@class="multiselect__tags"]').should('be.visible').click();
        cy.xpath("//label[text()='What type of sweep?']/parent::div//input").type('Add New Sweep{enter}');
            //Sweep Account Details
            //Child Account
        cy.xpath("(//*[@class='fas fa-plus'])[2]").should('be.visible').click();
        cy.xpath("(//label[text()='Use an existing account'])[1]").click();
        cy.xpath('//label[text()="Child Account Type"]/parent::div//div[@class="multiselect__tags"]').should('be.visible').click();
        cy.xpath("//label[text()='Child Account Type']/parent::div//input").type('Checking{enter}');
        cy.xpath("//input[@type='text'][@name='childAccountNumber']").type('123456');
        cy.xpath("//input[@type='text'][@name='childMinimum']").type('1000');
        cy.xpath("//input[@type='text'][@name='childMaximum']").type('2000');
        cy.xpath("//input[@type='text'][@name='childIncrement']").type('3');
            //Parent Account
        cy.xpath("(//label[text()='Use an existing account'])[2]").click();
        cy.xpath('//label[text()="Parent Account Type"]/parent::div//div[@class="multiselect__tags"]').should('be.visible').click();
        cy.xpath("//label[text()='Parent Account Type']/parent::div//input").type('Checking{enter}');
        cy.xpath("//input[@type='text'][@name='parentAccountNumber']").type('123456');
        cy.xpath("//input[@type='text'][@name='from']").type('1000');
        cy.xpath("//input[@type='text'][@name='to']").type('2000');
        cy.xpath("//input[@type='text'][@name='parentMinimum']").type('123');
        cy.xpath("//input[@type='text'][@name='parentMaximum']").type('789');
        cy.xpath('//label[text()="Partial Sweep"]/parent::div//div[@class="multiselect__tags"]').should('be.visible').click();
        cy.xpath("//label[text()='Partial Sweep']/parent::div//input").type('No{enter}');
        cy.xpath("//h5[text()='Daily Sweep Service']").scrollIntoView();
        cy.xpath("//*[@class='fas fa-check-circle text-success']").should('be.visible');
        cy.xpath("//button[contains(text(),'← Back to Services')]").should('be.visible').click();
        cy.wait(2000);
        //Business Debit Card Service
        cy.xpath("//button[contains(text(),'Business Debit Card Service')]").should('be.visible');
        cy.xpath("//button[contains(text(),'Business Debit Card Service')]").click();
        cy.xpath("//h5[text()='Business Debit Card Service']").should('be.visible');
            //Debit Card(s) Details
        cy.xpath('//label[text()="Cardholder"]/parent::div//div[@class="multiselect__tags"]').should('be.visible').click();
        cy.xpath("//label[text()='Cardholder']/parent::div//input").type('Test{enter}');
        cy.xpath('//label[text()="Linked Account(s)"]/parent::div//div[@class="multiselect__tags"]').should('be.visible').click();
        cy.xpath("//label[text()='Linked Account(s)']/parent::div//input").type('Account Nickname{enter}');
        cy.xpath('//label[text()="How should the Debit Card be delivered?"]/parent::div//div[@class="multiselect__tags"]').should('be.visible').click();
        cy.xpath("//label[text()='How should the Debit Card be delivered?']/parent::div//input").type('Pick up in branch{enter}');
        cy.xpath('//label[text()="Pickup Branch"]/parent::div//div[@class="multiselect__tags"]').should('be.visible').click();
        cy.xpath("//label[text()='Pickup Branch']/parent::div//input").type('Durham{enter}');
        cy.xpath("//*[@class='fas fa-check-circle text-success']").should('be.visible');
        cy.xpath("//button[contains(text(),'← Back to Services')]").should('be.visible');
        cy.xpath("//button[contains(text(),'← Back to Services')]").click();
        
        //Complete Review
        cy.xpath("//button[contains(text(),'Complete Review')]").should('be.visible');
    }
    screenCAOSAccountApplicationReviewBankerReviewSummaryBAL_700(){
        //Summary of Application Review
        cy.xpath("//h3[text()='Summary of Application Review']").should('be.visible');
        //Electronic Signature
        cy.wait(2000);
        cy.xpath("//h5[text()='Review Summary']").should('be.visible');
        cy.xpath("//td[text()='AMR']").should('be.visible');
        cy.xpath("//td[text()='2000']").should('be.visible');
        cy.xpath("//label[text()='Specify branch to board account']").should('be.visible');
        cy.xpath("//button[contains(text(),'Approve')]").should('be.visible');      
    }
    screenCAOSCreatePortalProfileBAL_691(random_string){
        //Get Started
        cy.wait(2000);
        cy.xpath("//h3[text()='Get Started']").should('be.visible');
        cy.wait(2000);
        cy.get(':nth-child(1) > .form-group > .btn').should('be.visible').click();
        //Your Contact Details
        cy.xpath("//h4[text()='Create A Profile']").should('be.visible');
        cy.xpath("//input[@type='text'][@name='contact.firstName']").should('be.visible');
        cy.xpath("//input[@type='text'][@name='contact.lastName']").should('be.visible');
        cy.xpath("//input[@type='text'][@name='contact.cellPhone']").should('be.visible');
        cy.xpath("//input[@type='text'][@name='contact.email']").should('be.visible');
        let parameterList = [
            {type: "Line Input", label:"Work Phone",value:"1234567890",position:"1", assertion:true,assertionType:"Element Contains Value",assertionTypeCriteria:"(123) 456-7890"},
            {type: "Select List", label:"Preferred Contact method",value:"Email",position:"1", assertion:false,assertionType:"",assertionTypeCriteria:""},
            ];
        utility.fillScreen(parameterList);
        cy.xpath("//button[contains(text(),'Continue')]").should('be.visible').click();
        //Your Relationship
        cy.xpath("//text()[contains(.,'Select...')]/ancestor::div[1]").should('be.visible').click();
        cy.get('[class="multiselect__input"]').type('Administrator{enter}');
        //How are you related to the business and account(s)?
        cy.xpath("//label[contains(text(),'Will be a signer to an account')]").should('be.visible').click();;
        cy.xpath("//label[contains(text(),'Will have a debit card')]").should('be.visible').click();
        cy.xpath("//label[contains(text(),'Will have online banking access')]").should('be.visible').click();
        cy.xpath("//label[contains(text(),'Own 25% or more of the business')]").should('be.visible').click();
        cy.xpath("//label[contains(text(),'Have significant responsibility or authority to control, manage, or direct the business')]").should('be.visible').click();
        cy.xpath("//button[contains(text(),'Continue')]").should('be.visible').click(); 
        //Set up your credentials
        cy.xpath("//h5[text()='Set up your credentials']").should('be.visible');
        function generate_random_string(string_length) {
            let random_string = '';
            let random_ascii;
            for(let i = 0; i < string_length; i++) {
                random_ascii = Math.floor((Math.random() * 25) + 97);
                random_string += String.fromCharCode(random_ascii)
            }
            return random_string
        }
        var random_string = generate_random_string(8);
        cy.xpath("//input[@type='text'][@name='username']").should('be.visible').type(random_string);
        cy.xpath("//label[text()='Password']").should('be.visible');
        cy.xpath("//input[@type='password'][@name='password']").should('be.visible').type('Colosa123!');
        cy.xpath("//label[text()='Confirm Password']").should('be.visible');
        cy.xpath("//input[@type='password'][@name='passwordConfirm']").should('be.visible').type('Colosa123!');
        
        cy.xpath("//button[contains(text(),'Create My Profile')]").should('be.visible'); 
        cy.xpath("//button[contains(text(),'Create My Profile')]").should('be.visible').click();
        cy.xpath("//button[contains(text(),'COMPLETE MY APPLICATION')]").should('be.visible').click();
        cy.get('[name="username"]').should('be.visible');
        login.login(random_string,"Colosa123!");       
    }
    screenCAOSCreatePortalProfilePreFillBAL_691(random_string){
        //Get Started
        cy.xpath("//h3[text()='Get Started']").should('be.visible');
        cy.wait(2000);
        cy.get(':nth-child(2) > .form-group > .btn').should('be.visible').click();
        //Set up your credentials
        cy.xpath("//h5[text()='Set up your credentials']").should('be.visible');
        function generate_random_string(string_length) {
            let random_string = '';
            let random_ascii;
            for(let i = 0; i < string_length; i++) {
                random_ascii = Math.floor((Math.random() * 25) + 97);
                random_string += String.fromCharCode(random_ascii)
            }
            return random_string
        }
        var random_string = generate_random_string(8);
        cy.xpath("//input[@type='text'][@name='username']").should('be.visible').type(random_string);
        cy.xpath("//label[text()='Password']").should('be.visible');
        cy.xpath("//input[@type='password'][@name='password']").should('be.visible').type('Colosa123!');
        cy.xpath("//label[text()='Confirm Password']").should('be.visible');
        cy.xpath("//input[@type='password'][@name='passwordConfirm']").should('be.visible').type('Colosa123!');
        
        cy.xpath("//button[contains(text(),'Create My Profile')]").should('be.visible'); 
        cy.xpath("//button[contains(text(),'Create My Profile')]").should('be.visible').click();
        cy.xpath("//button[contains(text(),'COMPLETE MY APPLICATION')]").should('be.visible');
        cy.wait(2000);
        cy.xpath("//button[contains(text(),'COMPLETE MY APPLICATION')]").should('be.visible').click();
        cy.get('[name="username"]').should('be.visible');
        login.login(random_string,"Colosa123!");       
    }
    /**------------------------Intensify CAOS-Process End ---------------------**/

}
