import { Requests } from "./requests";
import {Header} from "./header";
import { NavigationHelper } from "#helpers/navigationHelper";
import { Login} from "./login";
import { Tasks } from "./tasks";
import { Screens } from "./screens";
import selectors from "#selectors/process";
import { SaveSearchs } from "./saveSearch";
import { Admin } from "./admin";
import { FileManager } from "./fileManager";
import { requests } from "#selectors/requests";
import  {templates } from "#selectors/templates";
import { Templates } from "./templates";
import {Utility} from "#pages/utility";
import {Process} from "./process";

let navHelper = new NavigationHelper();
const request = new Requests();
const header = new Header();
const login = new Login();
const tasks = new Tasks();
const screen = new Screens();
const process = new Process();
const admin = new Admin();
const saveSearch = new SaveSearchs();
const fileManager = new FileManager();
const template = new Templates();
const utility = new Utility();

export class Execution {
    actionsAndAssertionsOfTCP42144(requestId){
        cy.xpath('//div[@data-cy="screen-field-selectlist1"]/div[@class="multiselect__select"]').click();
        cy.xpath('(//li[@aria-label="3 Zero Rate (Excluding Goods Exported) 0. "]/span/span[text()="3 Zero Rate (Excluding Goods Exported) 0"])[1]').should('be.visible').click();
        cy.xpath('//button[@data-cy="loop-loop-add"]/i').click();
        cy.xpath('(//div[@data-cy="screen-field-selectlist1"]/div[@class="multiselect__select"])[2]').click();
        cy.xpath('(//li[@aria-label="3 Zero Rate (Excluding Goods Exported) 0. "]/span/span[text()="3 Zero Rate (Excluding Goods Exported) 0"])[2]').should('be.visible').click({force:true});
        cy.xpath('//button[@data-cy="add-row"]').click({force:true});
        cy.xpath('(//div[@data-cy="screen-field-select3"]/div[@class="multiselect__select"])[1]').click();
        cy.xpath('(//li[@aria-label="3 Zero Rate (Excluding Goods Exported) 0. "]/span/span[text()="3 Zero Rate (Excluding Goods Exported) 0"])[3]').should('be.visible').click({force:true});
        cy.xpath('//button[text()="Ok"]').click();
        cy.xpath('//button[@data-cy="add-row"]').click();
        cy.xpath('(//div[@data-cy="screen-field-select3"]/div[@class="multiselect__select"])[1]').click({force:true});
        cy.xpath('(//li[@aria-label="3 Zero Rate (Excluding Goods Exported) 0. "]/span/span[text()="3 Zero Rate (Excluding Goods Exported) 0"])[3]').should('be.visible').click({force:true});
        cy.xpath('//button[text()="Ok"]').click();
        cy.xpath('//button[@aria-label="New Submit"]').click();
        request.verifyTaskIsCompleted();
        cy.visit('/requests/'+requestId);
        request.waitUntilTextcontainText('selector','varHeader','Completed');
        cy.xpath('//li[@class="nav-item"]/a[@id="file-manager-tab"]').click();
        cy.xpath('//button[@title="View"]/i').click();
    }

    actionsAndAssertionsOfTCP42105(requestId,userName,password){
        //Step 1: Claim the task
        cy.xpath('//button[text()="Claim Task"]').should('be.visible');
        cy.xpath('//button[text()="Claim Task"]').click();
        cy.xpath('//button[text()="Claim Task"]').should('not.exist');

        //Step 2: Fill the form 1
        cy.xpath('//input[@name="var1"]').should('be.visible').type('1');
        cy.xpath('//button[@aria-label="New Submit"]').click();
        request.verifyTaskIsCompletedB();
        cy.wait(2000);

        //Step 3: Log in with user created
        navHelper.navigateToLogOut();
        login.navigateToUrl();
        login.login(userName, password);
        cy.visit('/requests/'+requestId);
        request.waitUntilElementIsVisible('selector','#pending >* td:nth-child(1) >a[href^="/tasks"]');
        request.clickOnTaskName(1, 1);

        //Step 4: Claim the task
        cy.xpath('//button[text()="Claim Task"]').should('be.visible');
        cy.xpath('//button[text()="Claim Task"]').click();
        cy.xpath('//button[text()="Claim Task"]').should('not.exist');

        //Step 5: Fill the form 2
        cy.xpath('//input[@name="var1"]').should('be.visible').clear().type('1');
        cy.xpath('//button[@aria-label="New Submit"]').click();
        request.verifyTaskIsCompletedB();
        cy.wait(2000);

        //Step 6: Log in with user admin
        navHelper.navigateToLogOut();
        login.navigateToUrl();
        login.login();
        cy.visit('/requests/'+requestId);
        request.waitUntilElementIsVisible('selector','#pending >* td:nth-child(1) >a[href^="/tasks"]');
        request.clickOnTaskName(1, 1);
        cy.xpath('//button[text()="Claim Task"]').click();
        cy.xpath('//button[text()="Claim Task"]').should('not.exist');
        cy.xpath('//input[@name="var1"]').should('be.visible');
        cy.xpath('//input[@name="var1"]').clear().type('2');
        cy.xpath('//button[@aria-label="New Submit"]').click();
        request.verifyTaskIsCompletedB();
        cy.wait(2000);

        //Step 7: Complete the request
        cy.visit('/requests/'+requestId);
        request.waitUntilElementIsVisible('selector','#pending >* td:nth-child(1) >a[href^="/tasks"]');
        request.clickOnTaskName(1, 1);
        cy.xpath('//input[@name="var1"]').should('be.visible');
        cy.xpath('//input[@name="var1"]').should('have.value','2');
        cy.xpath('//button[@aria-label="New Submit"]').click();
        request.verifyTaskIsCompletedB();

        //Step 8: Verify that the process was completed
        request.waitUntilTextcontainText('selector','varHeader','Completed');
    }

    actionsAndAssertionsOfTCP42297(requestId){
        cy.xpath('//div[@class="multiselect__select"]').click();
        cy.xpath('//li[@aria-label="002297 Process A. "]/span/span[text()="002297 Process A"]').click();
        cy.xpath('//div[@class="multiselect__select"]').click();
        cy.xpath('//li[@aria-label="002297 Process B. "]/span/span[text()="002297 Process B"]').click();
        cy.xpath('//input[@data-cy="screen-field-size"]').should('have.value', 2);
        cy.xpath('//button[@aria-label="New Submit"]').click();
        cy.visit('/requests/'+requestId);
        request.waitUntilTextcontainText('selector','varHeader','Completed');
    }

    actionsAndAssertionsOfTCP42241A(requestIDA){
        cy.xpath('//h4').should('be.visible');
        cy.xpath('//div[@label="Image"]/img').should('be.visible');
        cy.xpath('//button[@aria-label="New Submit"]').click();
        request.verifyTaskIsCompleted();
        navHelper.navigateToTasksPage();
        //Obtain signal collection A and create record in collection A
        navHelper.navigateToCollectionPage();
        cy.xpath('//input[@aria-label="Search"]').type('TCP4-2241 A').should('have.value', 'TCP4-2241 A').type('{enter}');
        cy.xpath('//span[text()="TCP4-2241 A"]/ancestor::tr/td/div/div/a[@title="Records"]/i').should('be.visible').click({force:true});
        cy.xpath('//button[@aria-label="Create Record"]').click();
        cy.xpath('//input[@data-cy="screen-field-input"]').type('Thailand');
        cy.xpath('//button[@aria-label="New Submit"]').click();
        //Continue with the request after adding a record
        request.openRequestById(requestIDA);
        cy.xpath('(//tr[@item-index="0"]/td/a[@target="_self"])[2]').should('contain.text', "A").contains('A').click();
        cy.xpath('//button[@title="Add Item"]/i').click();
        cy.xpath('//button[@title="Add Item"]/i').click();
        cy.xpath('//div[@aria-label="Image"]/img').should('have.length', 3);
        cy.xpath('//button[@class="btn btn-primary"]').click();
        request.waitUntilTextcontainText('selector','varHeader','Completed');
        cy.xpath('(//div[@class="flex-grow-1"])[3]').should('contain.text', "Admin User has completed the task Form Task");
        cy.xpath('(//div[@class="flex-grow-1"])[4]').should('contain.text', "Admin User has completed the task A");
    }

    actionsAndAssertionsOfTCP42241B(requestIDB){
        cy.xpath('//h4').should('be.visible');
        cy.xpath('//div[@label="Image"]/img').should('be.visible');
        cy.xpath('//button[@aria-label="New Submit"]').click();
        request.verifyTaskIsCompleted();
        navHelper.navigateToTasksPage();
        //Obtain signal collection B and create record in collection B
        navHelper.navigateToCollectionPage();
        cy.xpath('//input[@aria-label="Search"]').type('TCP4-2241 B').should('have.value', 'TCP4-2241 B').type('{enter}', {force:true});
        cy.xpath('//span[text()="TCP4-2241 B"]/ancestor::tr/td/div/div/a[@title="Records"]/i').should('be.visible').click({force:true});
        cy.xpath('//button[@aria-label="Create Record"]').click();
        cy.xpath('//input[@data-cy="screen-field-input"]').type('Burma');
        cy.xpath('//button[@aria-label="New Submit"]').click();
        //Continue with the request after adding a record
        navHelper.navigateToRequestsPage();
        request.openRequestById(requestIDB);
        cy.xpath('(//tr[@item-index="0"]/td/a[@target="_self"])[2]').should('contain.text', "B").contains('B').click();
        cy.xpath('//button[@title="Add Item"]/i').click();
        cy.xpath('//button[@title="Add Item"]/i').click();
        cy.xpath('//div[@aria-label="Image"]/img').should('have.length', 3);
        cy.xpath('//button[@class="btn btn-primary"]').click();
        request.waitUntilTextcontainText('selector','varHeader','Completed');
        cy.xpath('(//div[@class="flex-grow-1"])[3]').should('contain.text', "Admin User has completed the task Form Task");
        cy.xpath('(//div[@class="flex-grow-1"])[4]').should('contain.text', "Admin User has completed the task B");
    }

    actionsAndAssertionsOfTCP42158(requestId){
        //Step 1: Complete the task "A"
        cy.xpath('//button[@aria-label="New Submit"]').should('be.visible');
        cy.xpath('//input[@data-cy="file-upload-button"]').attachFile("images/sanambrosio.jpg");
        cy.xpath('//*[@class="uploader-file"]//span[contains(text(),"success")]').should('be.visible');
        cy.xpath('//div[@class="signature pl-0"]/canvas').click();
        cy.xpath('//button[@aria-label="New Submit"]').click();
        request.verifyTaskIsCompletedB();

        let today = new Date();
        let day = Math.floor((today.getDate()));
        cy.log(day);
        if(day >= 10){
            //Step 2: Go to URL request
            cy.visit('/requests/'+ requestId);

            //Step 3: Complete task B
            request.waitUntilElementIsVisible('selector', '#pending >* td:nth-child(1) >a[href^="/tasks"]');
            request.clickOnTaskName(1, 1);
            cy.xpath('(//button[@aria-label="New Submit"])[2]').should('be.visible').click();
            request.verifyTaskIsCompletedB();
        }else{
            //Step 4: Go to URL request
            cy.visit('/tasks/');

            //Step 5: Complete task D
            cy.xpath('(//a[contains(text(),"D")])[1]').should('be.visible').click();
            cy.xpath('//button[@aria-label="New Submit"]').should('be.visible').click();
            request.verifyTaskIsCompletedB();

            //Step 6: Go to URL request
            cy.visit('/requests/'+ requestId);
            request.waitUntilElementIsVisible('selector', '#pending >* td:nth-child(1) >a[href^="/tasks"]');
            request.clickOnTaskName(1, 1);

            //Step 7: Complete task C
            cy.xpath('//label[contains(text(),"New File Upload")]').should('be.visible');
            cy.xpath('(//button[@aria-label="New Submit"])[2]').click();
            request.verifyTaskIsCompletedB();
            cy.visit('/requests/'+ requestId);
            cy.xpath('//div[contains(text(),"User has completed the task C")]').should('exist');
        }
    }

    actionsAndAssertionsOfTCP42187(requestId){
        cy.xpath('//h4').should('be.visible');
        cy.xpath('//input[@data-cy="file-upload-button"]').attachFile("images/origenes.jpg");
        cy.xpath('//button[@data-cy="loop-loop-add"]/i').click();
        cy.xpath('(//input[@data-cy="file-upload-button"])[2]').attachFile("images/origenes.jpg");
        cy.xpath('//button[@aria-label="New Submit"]').click();
        request.openRequestById(requestId);
        request.clickOnTaskName(1, 1);
        cy.xpath('//button[@aria-label="New Submit"]').should('be.visible');
        cy.xpath('//button[@aria-label="New Submit"]').click();
        request.openRequestById(requestId);
        request.clickOnTaskName(1, 1);
        cy.xpath('//button[@aria-label="New Submit"]').should('be.visible');
        cy.xpath('//button[@aria-label="New Submit"]').click();
        request.openRequestById(requestId);
        request.clickOnTaskName(1, 1);
        cy.xpath('//button[@aria-label="New Submit"]').should('be.visible');
        cy.xpath('//button[@aria-label="New Submit"]').click();
        request.openRequestById(requestId);
        request.clickOnTaskName(1, 1);
        cy.xpath('//button[@aria-label="New Submit"]').should('be.visible');
        cy.xpath('//button[@aria-label="New Submit"]').click();
        request.openRequestById(requestId);
        request.clickOnTaskName(1, 1);
        cy.xpath('//button[@aria-label="New Submit"]').click();
        cy.wait(60000);
        cy.visit('/requests/'+requestId);
        request.waitUntilTextcontainText('selector','varHeader','Completed');
        cy.xpath('(//div[@class="flex-grow-1"])[3]').should('contain.text', "has completed the task A");
        cy.xpath('(//div[@class="flex-grow-1"])[6]').should('contain.text', "has completed the task B");
        cy.xpath('(//div[@class="flex-grow-1"])[7]').should('contain.text', "has completed the task B");
        cy.xpath('(//div[@class="flex-grow-1"])[8]').should('contain.text', "has completed the task C");
        cy.xpath('(//div[@class="flex-grow-1"])[9]').should('contain.text', "has completed the task D");
        cy.xpath('(//div[@class="flex-grow-1"])[11]').should('contain.text', "has completed the task C");
        cy.xpath('(//div[@class="flex-grow-1"])[13]').should('contain.text', "has completed the task Slack Notification");
    }

    actionsAndAssertionsOfTCP42217(requestId){
        //Step 1: Complete task "Form Task"
        cy.xpath('//input[@data-cy="screen-field-checkbox1"]').should('be.visible');
        cy.xpath('//input[@data-cy="screen-field-checkbox1"]').check({force:true});
        cy.xpath('//input[@aria-label="New Date Picker"]').type('09/23/2023');
        cy.xpath('//input[@data-cy="screen-field-input"]').click().type('Roma');
        cy.xpath('//div[@class="multiselect__select"]').click();
        cy.xpath('//div[@data-cy="screen-field-selectlist"]//input').type('aa')
            .should('have.value','aa');
        cy.wait(2000);
        cy.xpath('//div[@data-cy="screen-field-selectlist"]//input').type('{enter}');
        cy.xpath('//textarea[@data-cy="screen-field-textarea"]').type('Venezia').should('have.value', 'Venezia');
        cy.xpath('//button[@aria-label="New Submit"]').click();
        request.verifyTaskIsCompletedB();

        let today = new Date();
        let day = Math.floor((today.getDate()));
        cy.log(day);

        if(day >= 10){
            //Step 2: Go to URL request
            cy.visit('/requests/'+requestId);
            request.waitUntilElementIsVisible('selector', '#pending >* td:nth-child(1) >a[href^="/tasks"]');
            request.clickOnTaskName(1, 1);

            //Step 3: Complete task "A"
            cy.get('[data-cy="screen-field-input"]').should('have.value','Roma');
            cy.xpath('//div[@class="multiselect__tags"]/span[@class="multiselect__single"]').should('have.text', 'aa');
            cy.xpath('//textarea[@data-cy="screen-field-textarea"]').type('Venezia');
            cy.xpath('//button[@aria-label="New Submit"]').click();
            request.verifyTaskIsCompletedB();

            //Step 4: Go to URL request
            cy.visit('/requests/'+requestId);
            request.waitUntilElementIsVisible('selector', '#pending >* td:nth-child(1) >a[href^="/tasks"]');
            request.clickOnTaskName(1, 1);

            //Step 5: Complete task "C"
            cy.get('[data-cy="screen-field-input"]').should('have.value','Roma');
            cy.xpath('//div[@class="multiselect__tags"]/span[@class="multiselect__single"]').should('have.text', 'aa');
            cy.xpath('//textarea[@data-cy="screen-field-textarea"]').type('Venezia');
            cy.xpath('//button[@aria-label="New Submit"]').click();
            cy.visit('/requests/'+requestId);
            request.waitUntilTextcontainText('selector','varHeader','Completed');
        }else{
            //Step 6: Go to URL request
            cy.visit('/requests/'+requestId);
            request.waitUntilElementIsVisible('selector', '#pending >* td:nth-child(1) >a[href^="/tasks"]');
            request.clickOnTaskName(1, 1);

            //Step 7: Complete task "B"
            cy.get('[data-cy="screen-field-input"]').should('have.value','Roma');
            cy.xpath('//div[@class="multiselect__tags"]/span[@class="multiselect__single"]').should('have.text', 'aa');
            cy.xpath('//textarea[@data-cy="screen-field-textarea"]').should('have.value', 'Venezia');
            cy.xpath('//button[@aria-label="New Submit"]').click();
            cy.visit('/requests/'+requestId);
            request.waitUntilTextcontainText('selector','varHeader','Completed');
        }
    }

    actionsAndAssertionsOfTCP42265(){
        navHelper.navigateToCollectionPage();
        admin.searchForCollection("TCP4-2265 testSignalProcess", "edit");
        cy.xpath('//button[@aria-label="Create Record"]').click();
        cy.xpath('//input[@aria-label="New Input"]').type('Vietnam');
        cy.xpath('//button[@aria-label="New Submit"]').click();
        navHelper.navigateToRequestsPage();
        cy.wait(140000);
        cy.xpath('//li[@data-cy="In Progress"]/a[@class="nav-link"]/i').click({force:true});
        cy.xpath('(//input[@aria-label="Search"])[1]').type('TCP4-2265 Process Signal 1', {force:true}).type('{enter}', {force:true});
        cy.xpath('//tr[@item-index="0"]/td/span[text()="TCP4-2265 Process Signal 1"]').should('be.visible');
        cy.xpath('//tr[@item-index="0"]/td/a').click({force:true});
        cy.url().then(url =>{
            var requestId = url.split('/')[4].trim();
            cy.xpath('//tr[@item-index="0"]/td/a').contains('Form Task').click();
            cy.xpath('//input[@data-cy="screen-field-form_input_1"]').type('4');
            cy.xpath('//button[@aria-label="New Submit"]').click();
            cy.wait(70000);
            cy.visit('/requests/'+requestId);
        });
        request.waitUntilElementIsVisibleCant('selector', "[class='py-3 d-flex']",4);
        cy.xpath("(//div[contains(text(),'System is waiting for the scheduled timer:')])[1]").should('be.visible');
        cy.xpath("//div[contains(text(),'has completed the task Form Task')]").should('be.visible');
        cy.xpath("(//div[contains(text(),'System is waiting for the scheduled timer:')])[2]").should('be.visible');
        cy.xpath("//div[contains(text(),'has completed the task Send Email')]").should('be.visible');
    }
    actionsAndAssertionsOfTCP42163(requestId){
        request.waitUntilElementIsVisible('selector', '#pending >* td:nth-child(1) >a[href^="/tasks"]');
        request.clickOnTaskName(1, 1);
        cy.xpath('//input[@data-cy="screen-field-AGENCY_NAME"]').type('Rome Athens');
        cy.xpath('//input[@data-cy="screen-field-EMAIL_TO"]').type('athena@athena.com');
        cy.xpath('//input[@data-cy="screen-field-POSITION"]').type('14');
        cy.xpath('//input[@data-cy="screen-field-JOB_TITLE"]').type('Mathematician');
        cy.xpath('//textarea[@data-cy="screen-field-COMMENTS"]').type('Viva la vida');
        cy.xpath('//button[@aria-label="Terminate"]').click();
        request.verifyTaskIsCompletedB();
    }

    actionsAndAssertionsOfTCP42164(processName){
        navHelper.navigateToAllRequests();
        request.addRequestNameToSelectList(processName);
        cy.wait(4000);
        cy.xpath('//*[contains(text(),"'+processName+'")]/ancestor::tr//a[contains(text(),"AA")]')
            .first()
            .should('be.visible')
            .click();
        cy.xpath('//button[@aria-label="New Submit"]').should('be.visible');
        cy.xpath('//button[@aria-label="New Submit"]').click();
        request.verifyTaskIsCompletedB();
    }

    actionsAndAssertionsOfTCP42227A(requestId){
        cy.xpath('//label[text()="New Input"]/parent::div/input[@name="input"]').click({force:true}).type('Plato', {force:true}).type('{enter}');
        cy.xpath('//button[contains(text(),"La Leçon de ténèbres")]/span/i').should('be.visible').click({force:true});
        cy.xpath('//button[contains(text(),"La Solitude de François")]/span/i').should('be.visible').click({force:true});
        cy.xpath('//button[contains(text(),"Mahomet")]/span/i').should('be.visible').click({force:true});
        cy.xpath('//button[contains(text(),"I am done selecting")]').should('be.visible').click({force:true});
        cy.wait(5000);
        cy.xpath('//button[contains(text(),"La Leçon de ténèbres")]').should('be.visible').click({force:true});
        cy.wait(2000);
        cy.visit('/requests/'+requestId);
        request.waitUntilTextcontainText('selector','varHeader','Completed');
        cy.xpath("//div[contains(text(),'has completed the task Task A')]").scrollIntoView({force:true}, {timeout: 10000});
        cy.xpath("//div[contains(text(),'has completed the task Task A')]").should('be.visible');
        cy.xpath("//div[contains(text(),'has completed the task PDF Generator')]").should('have.length', 3);
    }

    actionsAndAssertionsOfTCP42270(requestID){
        cy.xpath('//h4').should('be.visible');
        cy.xpath('//div[@data-cy="screen-field-Portrait-bust-Parmenides"]/img').should('be.visible');
        cy.xpath('//button[@class="btn btn-primary"]').click();
        cy.visit('/requests/'+requestID);
        request.waitUntilTextcontainText('selector','varHeader','Completed');
        cy.xpath("//div[contains(text(),'has completed the task Script A')]").should('be.visible');
        cy.xpath("//div[contains(text(),'has completed the task Form Task A')]").should('be.visible');
        cy.xpath("//div[contains(text(),'has completed the task SendEmailA')]").should('be.visible');
        cy.xpath("//div[contains(text(),'System is waiting for the scheduled timer:')]").should('be.visible');
        cy.xpath("//div[contains(text(),'has completed the task Script B')]").should('be.visible');
        cy.xpath("//div[contains(text(),'has completed the task SendEmailB')]").should('be.visible');
    }

    actionsAndAssertionsOfTCP42264(requestID){
        //Step 1: Complete the Form 1
        cy.xpath('//div[@data-cy="screen-field-Portrait-bust-Parmenides"]/img').should('be.visible');
        cy.xpath('//strong[text()="Bold"]').should('be.visible');
        cy.xpath('//strong[text()="Italic"]').should('be.visible');
        cy.xpath('//strong[text()="underlined"]').should('be.visible');
        cy.xpath('//strong/a[@href="https://www.processmaker.com/wp-content/uploads/2019/11/logo_processmaker.png"]').should('be.visible');
        cy.xpath('//ul/li/em/strong[text()="first"]').should('be.visible');
        cy.xpath('//ul/li/em/strong[text()="second"]').should('be.visible');
        cy.xpath('//ul/li/em/strong[text()="third"]').should('be.visible');
        cy.xpath('//ol/li/em/strong[text()="first"]').should('be.visible');
        cy.xpath('//ol/li/em/strong[text()="second"]').should('be.visible');
        cy.xpath('//ol/li/em/strong[text()="third"]').should('be.visible');
        cy.xpath('//p/span').should('contain.text', "Sociology is the study of human social relationships and institutions");
        cy.xpath('//button[@aria-label="New Submit"]').click();
        request.verifyTaskIsCompletedB();

        //Step 2: Complete The send Email and PDF
        navHelper.navigateToRequestsPage();
        cy.visit('/requests/'+requestID+'/files');
        var requestPDF = '[title="View"]';
        var requestXpath = "//a[contains(text(),'Manual Task')]";
        request.waitUntilElementIsVisible('selector', requestPDF);

        //Step 3: Open The Manual task
        cy.visit('/requests/'+requestID);
        cy.xpath(requestXpath).should('be.visible');
        request.waitUntilElementIsVisible('selector', '#pending >* td:nth-child(1) >a[href^="/tasks"]');
        request.clickOnTaskName(1, 1);

        //Step 4: Complete The Manual task
        cy.xpath('//strong[text()="Bold"]').should('be.visible');
        cy.xpath('//strong[text()="Italic"]').should('be.visible');
        cy.xpath('//strong[text()="underlined"]').should('be.visible');
        cy.xpath('//strong/a[@href="https://www.processmaker.com/wp-content/uploads/2019/11/logo_processmaker.png"]').should('be.visible');
        cy.xpath('//ul/li/em/strong[text()="first"]').should('be.visible');
        cy.xpath('//ul/li/em/strong[text()="second"]').should('be.visible');
        cy.xpath('//ul/li/em/strong[text()="third"]').should('be.visible');
        cy.xpath('//ol/li/em/strong[text()="first"]').should('be.visible');
        cy.xpath('//ol/li/em/strong[text()="second"]').should('be.visible');
        cy.xpath('//ol/li/em/strong[text()="third"]').should('be.visible');
        cy.xpath('//p/span').should('contain.text', "Sociology is the study of human social relationships and institutions");
        cy.xpath('//button[contains(text(), "Complete Task")] ').click();
        request.verifyTaskIsCompletedB();

        cy.visit('/requests/'+requestID);
        cy.xpath("//div[contains(text(),'has completed the task Form Task')]").should('be.visible');
        cy.xpath("//div[contains(text(),'has completed the task Send Email')]").should('be.visible');
        cy.xpath("//div[contains(text(),'has completed the task PDF')]").should('be.visible');
        cy.xpath("//div[contains(text(),'has completed the task Manual Task')]").should('be.visible');
    }

    actionsAndAssertionsOfTCP42243(requestID){
        cy.xpath('//button[@data-cy="loop-loop-add"]').should('be.visible');
        cy.xpath('//button[@data-cy="loop-loop-add"]').click();
        cy.xpath('//p[text()="ASSAM is ASSAM KERELA is KERELA ORRISA is ORRISA"]').should('be.visible');
        cy.xpath('//p[text()="Israel Japan Germany"]').should('be.visible');
        cy.xpath('//button[@data-cy="loop-loop-add"]').click();
        cy.wait(2000);
        cy.xpath('//*[contains(text(),"watcher running.")]').should('not.exist');
        cy.xpath('//div[@class="card-footer"]/button').should('contain.text', "Complete Task").click();
        request.verifyTaskIsCompletedB();

        navHelper.navigateToRequestsPage();
        request.openRequestById(requestID);
        cy.xpath('//tr[@item-index="0"]/td/a').contains('B').click();
        cy.xpath('//div[@data-cy="screen-field-Parmenides"]/img').should('have.length', 6);
        cy.xpath('//p[text()="ASSAM is ASSAM KERELA is KERELA ORRISA is ORRISA"]').should('have.length', 2);
        cy.xpath('//p[text()="Israel Japan Germany"]').should('have.length', 2);
        cy.xpath('//button[contains(text(),"Complete Task")]').click();
        request.waitUntilTextcontainText('selector','varHeader','Completed');
    }

    actionsAndAssertionsOfTCP42252Scenario1(){
        cy.xpath('(//div[@class="form-check"]/input[@type="radio"])[1]').should('be.visible');
        cy.xpath('(//div[@class="form-check"]/input[@type="radio"])[1]').check();
        cy.xpath('(//div[@class="form-check"]/input[@type="radio"])[3]').check();
        cy.xpath('//button[@aria-label="New Submit"]').click();
        request.verifyTaskIsCompletedB();
    }

    verifyTCP42252Scenario1(requestID){
        cy.wait(2000);
        request.verifyRequestisCompleted(requestID);
        cy.xpath('//div[@read-only="true"]//div[@class="flex-grow-1"]').should('be.visible');
        cy.xpath('//*[contains(text(),"User has completed the task Script Task I")]').should('exist');
        cy.xpath('//*[contains(text(),"User has completed the task Script Task III")]').should('exist');
        cy.xpath('//*[contains(text(),"User has completed the task PDF Generator I")]').should('exist');
        cy.xpath('//*[contains(text(),"User has completed the task PDF Generator III")]').should('exist');
    }

    actionsAndAssertionsOfTCP42252Scenario2(){
        cy.xpath('(//div[@class="form-check"]/input[@type="radio"])[1]').should('be.visible');
        cy.xpath('(//div[@class="form-check"]/input[@type="radio"])[1]').check();
        cy.xpath('(//div[@class="form-check"]/input[@type="radio"])[4]').check();
        cy.xpath('//button[@aria-label="New Submit"]').click();
        request.verifyTaskIsCompletedB();
    }

    verifyTCP42252Scenario2(requestID){
        cy.wait(2000);
        request.verifyRequestisCompleted(requestID);
        cy.xpath('//div[@read-only="true"]//div[@class="flex-grow-1"]').should('be.visible');
        cy.xpath('//*[contains(text(),"User has completed the task Script Task I")]').should('exist');
        cy.xpath('//*[contains(text(),"User has completed the task Script Task IV")]').should('exist');
        cy.xpath('//*[contains(text(),"User has completed the task PDF Generator I")]').should('exist');
        cy.xpath('//*[contains(text(),"User has completed the task PDF Generator IV")]').should('exist');
    }

    actionsAndAssertionsOfTCP42252Scenario3(){
        cy.xpath('(//div[@class="form-check"]/input[@type="radio"])[2]').should('be.visible');
        cy.xpath('(//div[@class="form-check"]/input[@type="radio"])[2]').check();
        cy.xpath('(//div[@class="form-check"]/input[@type="radio"])[3]').check();
        cy.xpath('//button[@aria-label="New Submit"]').click();
        request.verifyTaskIsCompleted();
    }

    verifyTCP42252Scenario3(requestID){
        cy.wait(2000);
        request.verifyRequestisCompleted(requestID);
        cy.xpath('//div[@read-only="true"]//div[@class="flex-grow-1"]').should('be.visible');
        cy.xpath('//*[contains(text(),"User has completed the task Script Task II")]').should('exist');
        cy.xpath('//*[contains(text(),"User has completed the task Script Task III")]').should('exist');
        cy.xpath('//*[contains(text(),"User has completed the task PDF Generator II")]').should('exist');
        cy.xpath('//*[contains(text(),"User has completed the task PDF Generator III")]').should('exist');
    }

    actionsAndAssertionsOfTCP42252Scenario4(){
        cy.xpath('(//div[@class="form-check"]/input[@type="radio"])[2]').should('be.visible');
        cy.xpath('(//div[@class="form-check"]/input[@type="radio"])[2]').check();
        cy.xpath('(//div[@class="form-check"]/input[@type="radio"])[4]').check();
        cy.xpath('//button[@aria-label="New Submit"]').click();
        request.verifyTaskIsCompleted();
    }
    verifyTCP42252Scenario4(requestID){
        cy.wait(2000);
        request.verifyRequestisCompleted(requestID);
        cy.xpath('//div[@read-only="true"]//div[@class="flex-grow-1"]').should('be.visible');
        cy.xpath('//*[contains(text(),"User has completed the task Script Task II")]').should('exist');
        cy.xpath('//*[contains(text(),"User has completed the task Script Task IV")]').should('exist');
        cy.xpath('//*[contains(text(),"User has completed the task PDF Generator II")]').should('exist');
        cy.xpath('//*[contains(text(),"User has completed the task PDF Generator IV")]').should('exist');
    }

    async actionsAndAssertionsOfTCP42239A(){
        //First Scenario with select option "yes", email not
        navHelper.navigateToRequestsPage();
        request.openNewRequest(
            "TCP4-2239 Verify Conversational Screen and Send Email"
        );
        var requestID = await request.getRequestID();
        cy.xpath('(//tr[@item-index="0"]/td/a)[2]').contains('Form Task 1').click();
        cy.xpath('//div/ul/li[@class="list-group-item"]/a').should('be.visible');
        cy.xpath('//input[@aria-label="Date"]').type('2021-10-01').type('{enter}');
        cy.xpath('//input[@name="image2"]').check();
        cy.xpath('//input[@name="image2"]').uncheck();
        cy.xpath('//span[@class="required-asterisk"]').should('be.visible');
        cy.xpath('//input[@name="image1"]').check();
        cy.xpath('//input[@name="image1"]').uncheck();
        cy.xpath('//input[@aria-label="Date"]').clear().type('2021-10-02').type('{enter}');
        cy.xpath('//span[@class="required-asterisk"]').should('be.visible');
        cy.xpath('//input[@name="image2"]').check();
        cy.xpath('//button[@aria-label="New Submit"]').click();
        request.verifyTaskIsCompleted();
        navHelper.navigateToTasksPage();
        navHelper.navigateToRequestsPage();
        request.openRequestById(requestID);
        cy.xpath('//h4[text()="In Progress"]').should('be.visible');
        await cy.xpath('//tr[@item-index="0"]/td/a').should('contain.text',"Form Task 2").contains('Form Task 2').click();
        cy.xpath('//input[@name="name"]').type('Nirvana').type('{enter}');
        cy.xpath('//input[@name="email"]').type('pablo.barroso@processmaker.com').type('{enter}');
        cy.xpath('(//div[@class="d-block"]/button)[1]').click();
        cy.xpath('//h4[text()="Completed"]').should('be.visible');
        await cy.xpath('(//div[@class="flex-grow-1"])[3]').should('contain.text', "Parallel Gateway: Label Undefined");
        cy.xpath('(//div[@class="flex-grow-1"])[4]').should('contain.text', "Parallel Gateway: Label Undefined");
        cy.xpath('(//div[@class="flex-grow-1"])[5]').should('contain.text', "Admin User has completed the task Form Task 1");
        cy.xpath('(//div[@class="flex-grow-1"])[6]').should('contain.text', "Admin User has completed the task Form Task 2");
    }

    async actionsAndAssertionsOfTCP42239B(){
        //Second Scenario with select option "no", email sent
        navHelper.navigateToRequestsPage();
        request.openNewRequest(
            "TCP4-2239 Verify Conversational Screen and Send Email"
        );
        var requestID2 = await request.getRequestID();
        await cy.xpath(('//tr[@item-index="0"]/td/a')[1]).contains('Form Task 1').click();
        cy.xpath('//input[@aria-label="Date"]').type('2021-10-01').type('{enter}');
        cy.xpath('//input[@name="image2"]').check();
        cy.xpath('//input[@name="image2"]').uncheck();
        cy.xpath('//span[@class="required-asterisk"]').should('be.visible');
        cy.xpath('//input[@name="image1"]').check();
        cy.xpath('//input[@name="image1"]').uncheck();
        cy.xpath('//input[@aria-label="Date"]').clear().type('2021-10-02').type('{enter}');
        cy.xpath('//span[@class="required-asterisk"]').should('be.visible');
        cy.xpath('//input[@name="image2"]').check();
        cy.xpath('//button[@aria-label="New Submit"]').click();
        request.verifyTaskIsCompleted();
        navHelper.navigateToTasksPage();
        navHelper.navigateToRequestsPage();
        request.openRequestById(requestID2);
        cy.xpath('//h4[text()="In Progress"]').should('be.visible');
        cy.xpath('//tr[@item-index="0"]/td/a').should('contain.text',"Form Task 2").contains('Form Task 2').click();
        cy.xpath('//input[@name="name"]').type('Nirvana').type('{enter}');
        cy.xpath('//input[@name="email"]').type('pablo.barroso@processmaker.com').type('{enter}');
        cy.xpath('(//div[@class="d-block"]/button)[2]').click();
        request.verifyTaskIsCompleted();
        navHelper.navigateToTasksPage();
        navHelper.navigateToRequestsPage();
        cy.visit('/requests/'+ requestID2);
        request.waitUntilTextcontainText('selector','varHeader','Completed');
        await cy.xpath('(//div[@class="flex-grow-1"])[3]').should('contain.text', "Parallel Gateway: Label Undefined");
        cy.xpath('(//div[@class="flex-grow-1"])[4]').should('contain.text', "Parallel Gateway: Label Undefined");
        cy.xpath('(//div[@class="flex-grow-1"])[5]').should('contain.text', "Admin User has completed the task Form Task 1");
        cy.xpath('(//div[@class="flex-grow-1"])[6]').should('contain.text', "Admin User has completed the task Form Task 2");
        cy.xpath('(//div[@class="flex-grow-1"])[7]').should('contain.text', "Admin User has completed the task Send Email");
    }

    actionsAndAssertionsOfTCP42281Part1(requestId){

        //Scenario 1 Tasks AA, BB and CC
        cy.xpath('//input[@aria-label="aa"]').should('be.visible');
        cy.xpath('//input[@aria-label="aa"]').check();
        cy.xpath('//input[@aria-label="bb"]').check();
        cy.xpath('//button[@aria-label="New Submit"]').click({force:true});
        request.verifyTaskIsCompletedB();

        navHelper.navigateToTasksPage();
        request.openRequestById(requestId);
        cy.xpath('(//tbody/tr[@item-index="0"]/td/a)[2]').should('be.visible');
        cy.xpath('//tbody/tr/td/a[@target="_self"]').contains('BB').click();
        cy.xpath('//div/ul/li[@class="list-group-item"]/a').should('be.visible');
        cy.xpath('//button[@aria-label="New Submit"]').click({force:true});
        request.verifyTaskIsCompletedB();

        navHelper.navigateToTasksPage();
        request.openRequestById(requestId);
        cy.xpath('(//tbody/tr[@item-index="0"]/td/a)[2]').should('be.visible');
        cy.xpath('//tbody/tr/td/a[@target="_self"]').contains('CC').click();
        cy.xpath('//div/ul/li[@class="list-group-item"]/a').should('be.visible')
        cy.xpath('//button[@aria-label="New Submit"]').click({force:true});
        request.verifyTaskIsCompletedB();

        cy.xpath('(//div[@class="flex-grow-1"])[3]').should('contain.text', 'Admin User has completed the task Script A');
        cy.xpath('(//div[@class="flex-grow-1"])[4]').should('contain.text', 'Admin User has completed the task AA');
        cy.xpath('(//div[@class="flex-grow-1"])[5]').should('contain.text', 'Admin User has completed the task Script B');
        cy.xpath('(//div[@class="flex-grow-1"])[6]').should('contain.text', 'Admin User has completed the task BB');
        cy.xpath('(//div[@class="flex-grow-1"])[7]').should('contain.text', 'AAA: true');
        cy.xpath('(//div[@class="flex-grow-1"])[8]').should('contain.text', 'Admin User has completed the task CC');
    }

    actionsAndAssertionsOfTCP42281Part2(requestId){
        
        //Scenario 2 Tasks AA, BB and DD
        cy.xpath('//input[@aria-label="bb"]').should('be.visible');
        cy.xpath('//input[@aria-label="bb"]').check();
        cy.xpath('//button[@aria-label="New Submit"]').click();
        request.verifyTaskIsCompletedB();
        
        navHelper.navigateToTasksPage();
        request.openRequestById(requestId);
        cy.xpath('(//tr[@item-index="1"]/td/a)[2]').should('be.visible');
        cy.xpath('//tbody/tr/td/a[@target="_self"]').contains('BB').click();
        cy.xpath('//div/ul/li[@class="list-group-item"]/a').should('be.visible');
        cy.xpath('//button[@aria-label="New Submit"]').click({force:true});
        request.verifyTaskIsCompletedB();
        
        navHelper.navigateToTasksPage();
        request.openRequestById(requestId);
        cy.xpath('(//tr[@item-index="1"]/td/a)[2]').should('be.visible');
        cy.xpath('//tbody/tr/td/a[@target="_self"]').contains('DD').click();
        cy.xpath('//div/ul/li[@class="list-group-item"]/a').should('be.visible');
        cy.xpath('//button[@aria-label="New Submit"]').click({force:true});
        request.verifyTaskIsCompletedB();
        
        cy.xpath('(//div[@class="flex-grow-1"])[3]').should('contain.text', 'Admin User has completed the task Script A');
        cy.xpath('(//div[@class="flex-grow-1"])[4]').should('contain.text', 'Admin User has completed the task AA');
        cy.xpath('(//div[@class="flex-grow-1"])[5]').should('contain.text', 'Admin User has completed the task Script B');
        cy.xpath('(//div[@class="flex-grow-1"])[6]').should('contain.text', 'Admin User has completed the task BB');
        cy.xpath('(//div[@class="flex-grow-1"])[7]').should('contain.text', 'AAA: false');
        cy.xpath('(//div[@class="flex-grow-1"])[8]').should('contain.text', 'BBB: true');
        cy.xpath('(//div[@class="flex-grow-1"])[9]').should('contain.text', 'Admin User has completed the task DD');
    }

    actionsAndAssertionsOfTCP42281Part3(requestId){

        cy.xpath('//input[@aria-label="bb"]').should('be.visible');
        cy.xpath('//input[@aria-label="bb"]').check();
        cy.xpath('//button[@aria-label="New Submit"]').should('exist');
        cy.xpath('//button[@aria-label="New Submit"]').click({force:true});
        request.verifyTaskIsCompletedB();

        navHelper.navigateToTasksPage();
        request.openRequestById(requestId);
        cy.xpath('(//tbody/tr[@item-index="0"]/td/a)[2]').should('be.visible');
        cy.xpath('//tbody/tr/td/a').contains('EE').click();
        cy.xpath('//button[@aria-label="New Submit"]').should('exist');
        cy.xpath('//button[@aria-label="New Submit"]').click({force:true});
        request.verifyTaskIsCompletedB();

        cy.xpath('(//div[@class="flex-grow-1"])[3]').should('contain.text', 'Admin User has completed the task Script A');
        cy.xpath('(//div[@class="flex-grow-1"])[4]').should('contain.text', 'Admin User has completed the task AA');
        cy.xpath('(//div[@class="flex-grow-1"])[5]').should('contain.text', 'Admin User has completed the task Script B');
        cy.xpath('(//div[@class="flex-grow-1"])[6]').should('contain.text', 'Admin User has completed the task EE');
    }

    actionsAndAssertionsOfTCP42282Part1(){
        const number = 3;
        cy.get('[data-cy="screen-field-date"]').should('be.visible');
        cy.get('[data-cy="screen-field-date"]').click();
        cy.get('input[data-cy="screen-field-input"]').type(number);
        cy.get('textarea[data-cy="screen-field-textarea"]').type("Nirvana");
        //Step 2: Submit the form
        cy.xpath('(//button[@aria-label="New Submit"])[2]').click();

        cy.get('[name=request-id]').invoke('attr', 'content').should('not.be.empty');

        //Step 3: Get the number of requests
        cy.get("[name='request-id']").invoke('attr', 'content').then((requestId)=>{

            login.navigateToUrl();
            login.login();
            navHelper.navigateToTasksPage();
            cy.visit('/requests/' + requestId);

            request.waitUntilElementIsVisible('selector', '#pending >* td:nth-child(1) >a[href^="/tasks"]');
            request.clickOnTaskName(1, 1);

            cy.xpath('(//button[@aria-label="New Submit"])[2]').should('exist');
            cy.xpath('(//button[@aria-label="New Submit"])[2]').click();
            request.verifyTaskIsCompletedB();

            navHelper.navigateToTasksPage();
            cy.visit('/requests/' + requestId);
            request.waitUntilElementIsVisible('selector', '#pending >* td:nth-child(1) >a[href^="/tasks"]');
            request.clickOnTaskName(1, 1);

            cy.xpath('(//button[@aria-label="New Submit"])[2]').should('exist');
            cy.xpath('(//button[@aria-label="New Submit"])[2]').click();
            request.verifyTaskIsCompletedB();

            navHelper.navigateToTasksPage();
            cy.visit('/requests/' + requestId);
            request.waitUntilElementIsVisible('selector', '#pending >* td:nth-child(1) >a[href^="/tasks"]');
            request.clickOnTaskName(1, 1);

            cy.xpath('(//button[@aria-label="New Submit"])[2]').should('exist');
            cy.xpath('(//button[@aria-label="New Submit"])[2]').click();
            request.verifyTaskIsCompletedB();

            navHelper.navigateToTasksPage();
            cy.visit('/requests/' + requestId);
            request.waitUntilElementIsVisible('selector', '#pending >* td:nth-child(1) >a[href^="/tasks"]');
            request.clickOnTaskName(1, 1);

            cy.xpath('(//button[@aria-label="New Submit"])[2]').should('exist');
            cy.xpath('(//button[@aria-label="New Submit"])[2]').click();
            request.verifyTaskIsCompletedB();

            navHelper.navigateToTasksPage();
            cy.visit('/requests/' + requestId);
            request.waitUntilElementIsVisible('selector', '#pending >* td:nth-child(1) >a[href^="/tasks"]');
            request.clickOnTaskName(1, 1);

            cy.xpath('(//button[@aria-label="New Submit"])[2]').should('exist');
            cy.xpath('(//button[@aria-label="New Submit"])[2]').click();
            request.verifyTaskIsCompletedB();

            cy.wait(5000);
            cy.visit('/requests/' + requestId);
            cy.xpath('//td[contains(text(),"input")]').should('exist');
            cy.xpath('//td[contains(text(),"submit")]').should('exist');
            cy.xpath('//td[contains(text(),"textarea")]').should('exist');
        });
    }

    actionsAndAssertionsOfTCP42282Part2(requestId){
        const number = 5;
        cy.get('[data-cy="screen-field-date"]').should('be.visible');
        cy.get('input[data-cy="screen-field-input"]').type(number);
        cy.get('textarea[data-cy="screen-field-textarea"]').type("Nirvana");
        cy.xpath('(//button[@aria-label="New Submit"])[2]').click();
        cy.get('[name=request-id]').invoke('attr', 'content').should('not.be.empty');

        //Step 3: Get the number of requests
        cy.get("[name='request-id']").invoke('attr', 'content').then((requestId)=>{

            login.navigateToUrl();
            login.login();
            navHelper.navigateToTasksPage();
            cy.visit('/requests/' + requestId);

            request.waitUntilElementIsVisible('selector', '#pending >* td:nth-child(1) >a[href^="/tasks"]');
            request.clickOnTaskName(1, 1);

            cy.xpath('(//button[@aria-label="New Submit"])[2]').should('exist');
            cy.xpath('(//button[@aria-label="New Submit"])[2]').click();
            request.verifyTaskIsCompletedB();
            
            navHelper.navigateToTasksPage();
            cy.visit('/requests/' + requestId);

            request.waitUntilElementIsVisible('selector', '#pending >* td:nth-child(1) >a[href^="/tasks"]');
            request.clickOnTaskName(1, 1);

            cy.xpath('(//button[@aria-label="New Submit"])[2]').should('exist');
            cy.xpath('(//button[@aria-label="New Submit"])[2]').click();
            request.verifyTaskIsCompletedB();
            
            cy.wait(5000);
            cy.visit('/requests/' + requestId);
            cy.xpath('//td[contains(text(),"input")]').should('exist');
            cy.xpath('//td[contains(text(),"submit")]').should('exist');
            cy.xpath('//td[contains(text(),"textarea")]').should('exist');
        });
    }

    async actionsAndAssertionsOfTCP42331A(requestId){
        request.openNewRequest(
            "TCP4-2331 Verify Script API"
        );

       request.waitUntilTextcontainText('selector','varHeader', "Completed");
       cy.xpath('(//td[@aria-colindex="1"])[3]').should('contain.text', "response.file");
       cy.xpath('(//td[@aria-colindex="2"])[3]').should('contain.text', "http://www.filosofia.uchile.cl/.imaging/default/dam/imagenes/Filosofia/imagenes-pregrado/Licenciatura-en-Filosofia.png/jcr:content.png");
       cy.xpath('(//td[@aria-colindex="1"])[4]').should('contain.text', "response.text");
       cy.xpath('(//td[@aria-colindex="2"])[4]').should('contain.text', "ASSAM is ASSAM KERELA is KERELA ORRISA is ORRISA");
       cy.xpath('(//td[@aria-colindex="1"])[5]').should('contain.text', "response.text_imploded");
       cy.xpath('(//td[@aria-colindex="2"])[5]').should('contain.text', "Israel Japan Germany");
       cy.xpath('(//div[@class="flex-grow-1"])[3]').should('contain.text',"Admin User has completed the task Script Task");
       cy.xpath('(//div[@class="flex-grow-1"])[4]').should('contain.text',"Admin User has completed the task DataConnector");
       cy.xpath('(//div[@class="flex-grow-1"])[5]').should('contain.text',"Admin User has completed the task Send Email");
       cy.xpath('(//div[@class="flex-grow-1"])[6]').should('contain.text',"Admin User has completed the task PDF Generator");
    }

    actionsAndAssertionsOfTCP42296(requestId){
        const file1 = 'drone.jpg';
        const file2 = 'sample.pdf';
        const file3 = 'sample_document.doc';

        //Step 1: Complete the form 1
        cy.get('input[data-cy="file-upload-button"]').attachFile(file1);
        cy.xpath('(//*[@data-cy="screen-field-fileUpload"]//span[contains(text(),"success")])[1]').should('exist');
        cy.get('input[data-cy="file-upload-button"]').attachFile(file2);
        cy.xpath('(//*[@data-cy="screen-field-fileUpload"]//span[contains(text(),"success")])[2]').should('exist');
        cy.get('input[data-cy="file-upload-button"]').attachFile(file3);
        cy.xpath('(//*[@data-cy="screen-field-fileUpload"]//span[contains(text(),"success")])[3]').should('exist');

        //Step 2: Submit the form
        cy.wait(2000);
        cy.get('button[aria-label="New Submit"]').click();
        request.verifyTaskIsCompletedB();

        //Step 1: Complete the form 2
        cy.visit("/requests/" + requestId);
        request.waitUntilElementIsVisible('selector', '#pending >* td:nth-child(1) >a[href^="/tasks"]');
        request.clickOnTaskName(1, 1);

        cy.get('div[title="drone.jpg"]').should('be.visible');
        cy.get('div[title="sample.pdf"]').should('be.visible');
        cy.get('div[title="sample_document.doc"]').should('be.visible');
        cy.get('button[aria-label="New Submit"]').eq(1).click({force: true});
        request.verifyTaskIsCompletedB();

        cy.visit("/requests/" + requestId);
        cy.get('div[class="flex-grow-1"]').eq(2).should('contain.text',"completed the task AA");
        cy.get('div[class="flex-grow-1"]').eq(3).should('contain.text',"completed the task BB");
    }

    async actionsAndAssertionsOfTCP42337(requestId){
        request.openNewRequest(
            "TCP4-2337 Verify Google"
        );
        cy.wait(10000);
        cy.get(
            'div[class="card"] > div[class="card-body"] > div[class="row"] > div[class="col-10"] > span')
        .should(
            "contain.text",
            "TCP4-2337 Verify Google Places"
        );
        cy.wait(10000);
        cy.get('a[class="btn btn-primary btn-sm"]').click();
        cy.get(
            'ul[id="requestTab"] > li[class="nav-item"] > a[id="pending-tab"]'
        ).click();
        cy.wait(5000);
        cy.get(
            'tbody[class="vuetable-body"] > tr[item-index="0"] > td[class="vuetable-slot"]'
        )
            .eq(1)
            .contains("Form Task")
            .click();
        cy.get(
            'div[data-cy="screen-field-google"] > div > input[class="form-control pac-target-input"]'
        )
            .eq(0)
            .click();
        cy.get(
            'div[data-cy="screen-field-google"] > div > input[class="form-control pac-target-input"]'
        )
            .eq(0)
            .type("Duomo Di Milano");
        cy.get(".pac-item", { timeout: 10000 })
            .should("be.visible")
            .eq(0)
            .click();
        cy.wait(5000);
        cy.get(
            'div[data-cy="screen-field-googleplaces"] > div > input[class="form-control pac-target-input"]'
        ).click();
        cy.get('div[data-cy="screen-field-googleplaces"] > div > input[class="form-control pac-target-input"]').eq(0).click();
        cy.get(
            'div[data-cy="screen-field-googleplaces"] > div > input[class="form-control pac-target-input"]'
        )
            .eq(0)
            .type("Palazzo Ducale Venezia");
        cy.get('.pac-item', { timeout: 10000 }).should('be.visible').eq(0).click();
        cy.wait(5000);
        cy.get('li[class="list-group-item"] > h5').contains("Assigned To").dblclick();
        cy.get('div[class="card"] > ul > li > a')
            .invoke("text")
            .then((text) => {
            var requestIDtext = text.trim();
            requestIDtext = requestIDtext.substring(
                0,
                requestIDtext.length
            );
            cy.wait(5000);
            cy.get('button[aria-label="New Submit"]').contains("New Submit").click();
            navHelper.navigateToTasksPage();
            cy.get('tbody[class="vuetable-body"]')
                .get("tr")
                .get('td[class="vuetable-slot"] > a[target="_self"]')
                .contains(requestIDtext)
                .click();
        });
        cy.wait(5000);
        cy.get(
            'tbody[class="vuetable-body"] > tr[item-index="0"] > td[class="vuetable-slot"] > a'
        )
            .eq(1)
            .contains("Manual Task")
            .click();
        cy.get('div[class="form-group form-image"] > img').should('have.length',2);
        cy.get('button[class="btn btn-primary"]')
            .contains("Complete Task")
            .click();
        cy.reload();
        cy.wait(5000);
        cy.get('div[class="flex-grow-1"]').eq(2).contains("Admin User has completed the task Form Task");
        cy.wait(5000);
        cy.get('div[class="flex-grow-1"]').eq(3).contains("Admin User has completed the task Manual Task");
    }

    actionsAndAssertionsOfTCP42330(requestId){
        //Step 1: Complete form
        cy.get('[data-cy="screen-field-array"]').should('be.visible');
        cy.xpath('//label[text()="Object"]/parent::div//div[@class="multiselect__tags"]').click();
        cy.xpath("//label[text()='Object']/parent::div//input").type("La Leçon de ténèbres").type('{enter}');
        const file1 = 'drone.jpg';
        cy.get('input[data-cy="file-upload-button"]').attachFile(file1);
        cy.xpath('//*[@data-cy="screen-field-array"]//span[contains(text(),"success")]').should('exist');
        const file2 = 'sample.pdf';
        cy.get('input[data-cy="file-upload-button"]').attachFile(file2);
        cy.get('button[aria-label="New Submit"]').click();

        cy.visit('/requests/'+requestId);
        cy.reload();
        request.waitUntilElementIsVisible('selector','#summary-tab');
        //Review summary
        cy.xpath('//a[@id="summary-tab"]').should('be.visible').click();
        cy.get('div[class="flex-grow-1"]').eq(2).contains("Admin User has completed the task Form Task");
        request.waitUntilElementIsVisible('selector','#request > div > div.flex-grow-1 > div.px-4.mb-2.timeline > div:nth-child(2) > div.flex-grow-1');
        //Review file manager
        cy.xpath("//a[contains(text(),'File Manager')]").click();
        cy.get('[class="star-component"]').should('be.visible');
    }

    actionsAndAssertionsOfTCP42391A() {
        //Step 1: Complete the screen A
        cy.get('div[class="multiselect__select"]').should('be.visible');
        cy.get('div[class="multiselect__select"]').click();
        cy.get('[data-cy="screen-field-form_select_list_1"]>* input').type('YES').should('have.value','YES');
        cy.get('[data-cy="screen-field-form_select_list_1"]>* input').type('{enter}',{delay:30});
        cy.get('input[data-cy="screen-field-form_input_2"]').eq(0).type("test1");
        cy.get('button[data-cy="loop-loop_1-add"]').click();
        cy.get('input[data-cy="screen-field-form_input_2"]').eq(1).type("test2");
        cy.get('button[data-cy="loop-loop_1-add"]').click();
        cy.get('input[data-cy="screen-field-form_input_2"]').eq(2).type("test3");
        cy.get('button[aria-label="New Submit"]').should('be.enabled');

        //Step 2: Submit the form
        cy.get('button[aria-label="New Submit"]').click();
        cy.get('[name=request-id]').invoke('attr', 'content').should('not.be.empty');

        //Step 3: Get the number of requests
        cy.get("[name='request-id']").invoke('attr', 'content').then((requestId)=>{

            //Step 4: Log in
            login.navigateToUrl();
            login.login();

            //Step 5: Open the requests
            cy.visit('/requests/'+requestId);
            request.waitUntilElementIsVisible('selector','#pending >* td:nth-child(1) >a[href^="/tasks"]');
            request.clickOnTaskName(1, 1);

            //Step 6: Complete the Form Task
            cy.get('span[class="multiselect__single"]').contains('YES');
            cy.get('div[name="loop_1"]').find('input[aria-label="Line Input Loop"]').eq(0).should('have.value', 'test1');
            cy.get('div[name="loop_1"]').find('input[aria-label="Line Input Loop"]').eq(1).should('have.value', 'test2');
            cy.get('div[name="loop_1"]').find('input[aria-label="Line Input Loop"]').eq(2).should('have.value', 'test3');
            cy.get('button[aria-label="New Submit"]').click();

            //Step 7: Complete the task
            cy.visit('/requests/'+requestId);
            request.waitUntilTextcontainText('selector','varHeader','Completed');
        });
    }

    async actionsAndAssertionsOfTCP42313(requestId) {
        request.openNewRequest(
            "TCP4-2313 Verify Conversational with Gateways"
        );
        cy.wait(10000);
        cy.get(
            'div[class="card"] > div[class="card-body"] > div[class="row"] > div[class="col-10"] > span')
        .should(
            "contain.text",
            "TCP4-2313 Verify Conversational with Gateways"
        );
        cy.wait(10000);
        cy.get('a[class="btn btn-primary btn-sm"]').click();
        cy.get(
            'ul[id="requestTab"] > li[class="nav-item"] > a[id="pending-tab"]'
        ).click();
        cy.wait(5000);
        cy.get(
            'tbody[class="vuetable-body"] > tr[item-index="0"] > td[class="vuetable-slot"]'
        )
            .eq(1)
            .contains("Task 1")
            .click();
        cy.get('div[class="form-group user-input-field"]').find('input[name="input"]').type("Athens");
        cy.get('button[aria-label="Submit"]').click();
        cy.get('div[class="card"] > ul > li > a')
        .invoke("text")
        .then((text) => {
            var requestIDtext = text.trim();
            requestIDtext = requestIDtext.substring(
                0,
                requestIDtext.length
            );
            cy.wait(5000);
            cy.get('div[class="d-block"] >').eq(0)
                    .contains("La Leçon de ténèbres").click();
            cy.wait(10000);
            navHelper.navigateToTasksPage();
            cy.get('tbody[class="vuetable-body"]')
                .get("tr")
                .get('td[class="vuetable-slot"] > a[target="_self"]')
                .contains(requestIDtext)
                .click();
        });
        cy.get(
            'ul[id="requestTab"] > li[class="nav-item"] > a[id="pending-tab"]'
        ).click();
        cy.wait(5000);
        cy.get(
            'tbody[class="vuetable-body"] > tr[item-index="0"] > td[class="vuetable-slot"]'
        )
            .eq(1)
            .contains("Task 3")
            .click();
            cy.get('div[class="form-group user-input-field"]').find('input[name="input"]').type("Athens");
            cy.get('button[aria-label="Submit"]').click();
            cy.get('div[class="card"] > ul > li > a')
            .invoke("text")
            .then((text) => {
                var requestIDtext = text.trim();
                requestIDtext = requestIDtext.substring(
                    0,
                    requestIDtext.length
                );
                cy.wait(5000);
                cy.get('div[class="d-block"] >').eq(0)
                        .contains("La Leçon de ténèbres").click();
                cy.wait(10000);
                navHelper.navigateToTasksPage();
                cy.get('tbody[class="vuetable-body"]')
                    .get("tr")
                    .get('td[class="vuetable-slot"] > a[target="_self"]')
                    .contains(requestIDtext)
                    .click();
            });
            cy.get(
                'ul[id="requestTab"] > li[class="nav-item"] > a[id="pending-tab"]'
            ).click();
            cy.wait(5000);
            cy.get(
                'tbody[class="vuetable-body"] > tr[item-index="0"] > td[class="vuetable-slot"]'
            )
                .eq(1)
                .contains("Task 4")
                .click();
                cy.get('div[class="form-group user-input-field"]').find('input[name="input"]').type("Athens");
            cy.get('button[aria-label="Submit"]').click();
            cy.get('div[class="card"] > ul > li > a')
            .invoke("text")
            .then((text) => {
                var requestIDtext = text.trim();
                requestIDtext = requestIDtext.substring(
                    0,
                    requestIDtext.length
                );
                cy.wait(5000);
                cy.get('div[class="d-block"] >').eq(0)
                        .contains("La Leçon de ténèbres").click();
                cy.wait(10000);
                navHelper.navigateToTasksPage();
                cy.get('tbody[class="vuetable-body"]')
                    .get("tr")
                    .get('td[class="vuetable-slot"] > a[target="_self"]')
                    .contains(requestIDtext)
                    .click();
            });
            cy.get(
                'ul[id="requestTab"] > li[class="nav-item"] > a[id="pending-tab"]'
            ).click();
            cy.wait(5000);
            cy.get(
                'tbody[class="vuetable-body"] > tr[item-index="0"] > td[class="vuetable-slot"]'
            )
                .eq(1)
                .contains("Task 5")
                .click();
                cy.get('div[class="form-group user-input-field"]').find('input[name="input"]').type("Athens");
            cy.get('button[aria-label="Submit"]').click();
            cy.get('div[class="d-block"] >').eq(0)
            .contains("La Leçon de ténèbres").click();
            cy.wait(10000);
            cy.get('div[class="flex-grow-1"]').contains("Admin User has completed the task Task 1");
            cy.get('div[class="flex-grow-1"]').contains("Admin User has completed the task Task 3");
            cy.get('div[class="flex-grow-1"]').contains("Admin User has completed the task Task 4");
            cy.get('div[class="flex-grow-1"]').contains("Admin User has completed the task Task 5");

        request.openNewRequest(
            "TCP4-2313 Verify Conversational with Gateways"
        );
        cy.wait(10000);
        cy.get(
            'div[class="card"] > div[class="card-body"] > div[class="row"] > div[class="col-10"] > span')
        .should(
            "contain.text",
            "TCP4-2313 Verify Conversational with Gateways"
        );
        cy.wait(10000);
        cy.get('a[class="btn btn-primary btn-sm"]').click();
        cy.get(
            'ul[id="requestTab"] > li[class="nav-item"] > a[id="pending-tab"]'
        ).click();
        cy.wait(5000);
        cy.get(
            'tbody[class="vuetable-body"] > tr[item-index="0"] > td[class="vuetable-slot"]'
        )
            .eq(1)
            .contains("Task 1")
            .click();
        cy.get('div[class="form-group user-input-field"]').find('input[name="input"]').type("Roma");
        cy.get('button[aria-label="Submit"]').click();
        cy.get('div[class="card"] > ul > li > a')
        .invoke("text")
        .then((text) => {
            var requestIDtext = text.trim();
            requestIDtext = requestIDtext.substring(
                0,
                requestIDtext.length
            );
            cy.wait(5000);
            cy.get('div[class="d-block"] >').eq(0)
                    .contains("La Leçon de ténèbres").click();
            cy.wait(10000);
                navHelper.navigateToTasksPage();
                cy.get('tbody[class="vuetable-body"]')
                    .get("tr")
                    .get('td[class="vuetable-slot"] > a[target="_self"]')
                    .contains(requestIDtext)
                    .click();
            });
            cy.wait(5000);
            cy.get(
                'ul[id="requestTab"] > li[class="nav-item"] > a[id="pending-tab"]'
            ).click();
            cy.wait(5000);
            cy.get(
            'tbody[class="vuetable-body"] > tr[item-index="0"] > td[class="vuetable-slot"]'
        )
            .eq(1)
            .contains("Task 2")
            .click();

            cy.get('div[class="form-group user-input-field"]').find('input[name="input"]').type("Athens");
            cy.get('button[aria-label="Submit"]').click();
            cy.get('div[class="d-block"] >').eq(0)
            .contains("La Leçon de ténèbres").click();
            cy.wait(10000);
            cy.get('div[class="flex-grow-1"]').contains("Admin User has completed the task Task 1");
            cy.get('div[class="flex-grow-1"]').contains("Admin User has completed the task Task 2");
    }


    async actionsAndAssertionsOfTCP42338(requestId){
        request.openNewRequest(
            "TCP4-2338 Check pdf generator and send email sequentially with google places control"
        );
        cy.wait(10000);
        cy.get('div[class="col-10"] > span').contains(
            "TCP4-2338 Check pdf generator and send email sequentially with google places control"
        );
        cy.get(
            'div[class="col-2 text-right"] > a[class="btn btn-primary btn-sm"]'
        )
            .contains("Start")
            .click();
            cy.get(
                'ul[class="list-group list-group-flush w-100"] > li[class="list-group-item"]'
            ).should("be.visible");
        cy.wait(5000);
        cy.get(
            'tbody[class="vuetable-body"] > tr[item-index="0"] > td[class="vuetable-slot"]'
        )
            .eq(1)
            .contains("Form Task")
            .click();
        cy.get('input[name="form_input_1"]').type("Bolivia");
        cy.get('input[name="form_input_2"]').type("2020-01-01");
        cy.xpath(
            '//*[@id="tab-form"]/div/div/div/div/div/div/div[2]/div/div[1]/div[1]/div/div/input'
        ).type("Turín, Italia");
        cy.get('div[class="signature pl-0"] > canvas').dblclick();
        cy.wait(3000);
        cy.xpath(
            '//*[@id="tab-form"]/div/div/div/div/div/div/div[2]/div/div[1]/div[2]/div/div/input'
        ).type("Roma, Italia");
        cy.get('input[name="form_input_2"]').click();
        cy.get(
            'div[class="card"] > ul[class="list-group list-group-flush w-100"] > li[class="list-group-item"] > a'
        )
            .invoke("text")
            .then((text) => {
                var requestIDtext = text.trim();
                requestIDtext = requestIDtext.substring(
                    0,
                    requestIDtext.length
                );
            cy.get('button[aria-label="New Submit"]').click();
            cy.wait(5000);
            navHelper.navigateToTasksPage();
            cy.get('span[class="multiselect__tag"] > span')
                .contains("In Progress")
                .get('i[aria-label="Remove Element"]')
                .click();
            cy.wait(5000);
            cy.get('div[class="multiselect__select"]').eq(2).click();
            cy.xpath('//*[@id="option-2-2"]/span/span').click();
            cy.xpath(
                '//*[@id="search-bar"]/div/div/div/div[2]/button[2]'
            ).click();
            cy.wait(5000);
            cy.get('tbody[class="vuetable-body"]')
                .get('tr[item-index="0"]')
                .get('td[class="vuetable-slot"]')
                .should("be.visible", requestIDtext)
                .contains(requestIDtext)
                .click();
            cy.wait(5000);
            cy.reload();
        });
        cy.get('div[class="flex-grow-1"]')
            .contains("Admin User has completed the task PDF Generator 1")
            .should("be.visible");
        cy.get('div[class="flex-grow-1"]')
            .contains("Admin User has completed the task Send Email 1")
            .should("be.visible");
        cy.get('div[class="flex-grow-1"]')
            .contains("Admin User has completed the task PDF Generator 2")
            .should("be.visible");
        cy.get('div[class="flex-grow-1"]')
            .contains("Admin User has completed the task Send Email 2")
            .should("be.visible");
        cy.get('ul[class="nav nav-tabs"] > li[class="nav-item"]')
            .eq(3)
            .contains("File Manager")
            .click();
        cy.get('tr[role="row"]')
            .eq(0)
            .get('td[aria-colindex="2"] > span')
            .contains("PDF-1");
        cy.get('tr[role="row"]')
            .eq(1)
            .get('td[aria-colindex="2"] > span')
            .contains("PDF-2");
        cy.get('button[class="btn btn-link"]').eq(0).click();
    }

    actionsAndAssertionsOfNoLoopsTCP42340(requestId){
        //Complete Form Task 1
        cy.get('[data-cy="screen-field-form_checkbox_1"]').check();
        cy.get('input[name="form_input_1"]').type("Germany",{delay:50});
        cy.get('textarea[name="form_text_area_1"]').type("Japan is an Asian country.",{delay:50});
        cy.get('input[aria-label="New Date Picker"]').type("2022-02-01",{force:true});
        cy.get('input[aria-label="New Date Picker"]').type('{enter}');
        cy.get('input[name="form_input_1"]').click();
        cy.get('button[aria-label="New Submit"]').click();

        //Complete Form Task Loop
        cy.get('[data-cy="screen-field-form_input_1"]').type('2',{delay:50});
        cy.get('button[aria-label="New Submit"]').click();

        //Complete Form Task 2 Validate
        cy.get('textarea[name="form_text_area_1"]').should('have.value','Japan is an Asian country.');
        cy.get('button[aria-label="New Submit"]').click();
    }

    actionsAndAssertionsOfLoopsTCP42340(requestId){
        cy.get('input[name="form_input_1"]').type("Germany");
        cy.get('textarea[name="form_text_area_1"]').type("Japan is an Asian country.");
        cy.get('input[aria-label="New Date Picker"]').type("2022-02-01",{force:true});
        cy.get('input[aria-label="New Date Picker"]').type('{enter}');
        cy.get('input[name="form_input_1"]').click();
        cy.get('button[aria-label="New Submit"]').click();

        //Complete Form Task Loop
        cy.get('[data-cy="screen-field-form_input_1"]').type('4',{delay:50});
        cy.get('button[aria-label="New Submit"]').click();

        //Complete Form Task Loop 2
        cy.get('[name="season"]').should('have.value','4');
        cy.get('button[aria-label="New Submit"]').click();

        //Complete Form Task Loop 3
        cy.get('[name="season"]').should('have.value','4');
        cy.get('button[aria-label="New Submit"]').click();

        //Complete Form Task Loop 4
        cy.get('[name="season"]').should('have.value','4');
        cy.get('button[aria-label="New Submit"]').click();

        //Complete Form Task 2 Validate
        cy.get('textarea[name="form_text_area_1"]').should('have.value','Japan is an Asian country.');
        cy.get('button[aria-label="New Submit"]').click();
    }

    async actionsAndAssertionsOfTCP44206(requestId){
        cy.get('button[aria-label="GET CODE"]').click();
        cy.get('button[aria-label="Request CODE"]').click();
        const screenCode = cy.get('input[name="suppliedOtp"]');
        cy.get('button[aria-label="Validate Code"]').click();
        //input
        cy.get('input[name="lineInputText"]').type('Fenomenología del Espiritu');
        cy.get('input[name="lineInputInteger"]').type('888');
        cy.get('input[name="lineInputCurrency"]').type('$1200');
        cy.get('input[name="lineInputPercentage"]').type('80%');
        cy.get('input[name="lineInputDecimal"]').type('0.08');
        cy.get('input[name="lineInputDateTime"]').type('2020-02-02 12:00');
        cy.get('input[name="lineInputDate"]').type('2020-02-02 ');
        cy.get('input[name="lineInputPassword"]').type('Hegel');
        //textarea
        cy.get('textarea[name="textArea"]').type('Crítica de la Razón Pura');
        //select list
        cy.get('div[class="multiselect__select"]').first().click();
        cy.get('ul[id="listbox-0"] > li[aria-label="Select 2. "]').click();

        cy.get('div[data-cy="screen-field-selectList2"] > div[class="multiselect__select"]').first().click();
        cy.get('ul[class="multiselect__content"] > li[aria-label="option 2. "]').click();
        cy.get('div[data-cy="screen-field-selectList2"] > div[class="multiselect__select"]').first().click();
        cy.get('ul[class="multiselect__content"] > li[aria-label="option 3. "]').click();

        //date Picker
        cy.get('div[data-cy="screen-field-datePicker"] > input[class="form-control"]').click();
        cy.xpath('//*[@id="tab-form"]/div/div/div/div/div/div/div[21]/div/div/ul/li[1]/div/div[1]/table/tbody/tr[4]/td[7]').click();
        cy.get('input[aria-label="Date Picker (Date Time)"]').click();
        cy.xpath('//*[@id="tab-form"]/div/div/div/div/div/div/div[22]/div/div/ul/li[1]/div/div[1]/table/tbody/tr[3]/td[7]').click();
        //UploadFile
        const file = 'drone.jpg';
        cy.get('input[data-cy="file-upload-button"]').attachFile(file);
        cy.get('div[class="uploader-file-status"] > span').should('contain.text','success');
        cy.get('button[aria-label="Submit"]').click();

        //Final Assertions
        cy.reload();
        cy.get('input[name="lineInputText"]').should('have.value', 'Fenomenología del Espiritu');
        cy.get('input[name="lineInputInteger"]').should('have.value', '888');
        cy.get('input[name="lineInputCurrency"]').should('have.value', '1,200.00 BOB' );
        cy.get('input[name="lineInputPercentage"]').should('have.value','80.00 %');
        cy.get('input[name="lineInputDecimal"]').should('have.value', '0.08');
        cy.get('input[aria-label="Input Date Time"]').should('have.value', '2020-02-02 12:00');
        cy.get('input[aria-label="Input Date"]').should('have.value', '2020-02-02');
        cy.get('input[aria-label="Input Password"]').should('have.value', 'Hegel');
        cy.get('textarea[aria-label="Textarea"]').should('have.value', 'Crítica de la Razón Pura');
        cy.get('span[class="multiselect__single"]').should('contain.text','Select 2');
        cy.get('div[class="multiselect__select"]').get('div[class="multiselect__tags-wrap"]').find('span[class="multiselect__tag"]').find('span').eq(0).should('contain.text','option 2');
        cy.get('div[class="multiselect__select"]').get('div[class="multiselect__tags-wrap"]').find('span[class="multiselect__tag"]').find('span').eq(1).should('contain.text','option 3');
        //cy.get('div[aria-label="Date Picker (Date) minDate:8/12/2020"]').should('have.value');
        //cy.get('div[aria-label="Date Picker (Date Time)"]').should('have.value');
        cy.get('div[class="uploader-file-status"] > span').should('contain.text','success');
        cy.get('button[aria-label="Submit"]').click();
    }

    async actionsAndAssertionsOfTCP42391(requestId) {
        cy.get('div[class="multiselect__select"]').first().click();
        cy.get('ul[id="listbox-0"] > li[aria-label="YES. "]').click();
        cy.get('button[data-cy="loop-loop_1-add"]').click();
        cy.get('input[aria-label="Line Input Loop"]').type("test1");
        cy.get('button[data-cy="loop-loop_1-add"]').click();
        cy.get('input[class="form-control is-invalid"]').type("test2");
        cy.get('button[data-cy="loop-loop_1-add"]').click();
        cy.get('input[class="form-control is-invalid"]').type("test3");
        cy.get('button[aria-label="New Submit"]').click();
        login.navigateToUrl();
        login.login();
        navHelper.navigateToAllRequests();
        cy.get('tr[item-index="0"]').find('a[title="Open Request"]').click();
        cy.get('tr[item-index="0"] > td[class="vuetable-slot"]').contains('Form Task').click();
        cy.get('span[class="multiselect__single"]').contains('YES');
        cy.get('div[name="loop_1"]').find('input[aria-label="Line Input Loop"]').eq(0).should('have.value', 'test1');
        cy.get('div[name="loop_1"]').find('input[aria-label="Line Input Loop"]').eq(1).should('have.value', 'test2');
        cy.get('div[name="loop_1"]').find('input[aria-label="Line Input Loop"]').eq(2).should('have.value', 'test3');
        cy.get('button[aria-label="New Submit"]').click();
    }
    async actionsAndAssertionsOfTCP42227(requestId) {
        cy.get('input[name="form_input_1"]').type("Test");
        cy.get('button[aria-label="Submit"]').click();
        cy.xpath("(//button[contains(@class, 'select-list-options')])[1]").click();
        cy.xpath("(//button[contains(@class, 'select-list-options')])[2]").click();
        cy.xpath("(//button[contains(@class, 'select-list-options')])[3]").click();
        cy.xpath("//button[text()[normalize-space()='I am done selecting']]").click();

        cy.xpath("(//button[contains(@class, 'select-list-options')])[1]").click();
        //cy.xpath("//button[text()[normalize-space()='I am done selecting']]").click();

        //cy.xpath("//div[text()='Task Completed Successfully']").should('be.visible');
        cy.visit('/requests/' + requestId);
        var result = await request.waitUntilTheRequestIsCompleted(20000);
        // expect(result).to.be(true);

        cy.get('#file-manager-tab').click();
        cy.get('#fileManager tbody[role="rowgroup"] tr[data-pk]').should('have.length', 3);
    }

    async actionsAndAssertionsOfTCP42248(requestId) {
        //request part click on select list
        cy.get('[class="multiselect__input"]').click({
            force: true
        });
        //add option to select list
        cy.xpath('(//li[@role="option"]//span//span[text()="Latin America & Caribbean "])[1]').click({
            multiple: true
        });
        //click on submit button
        cy.xpath('//button[@class="btn btn-primary"]').click();
        //verify task is completed
        cy.xpath("//div[text()='Task Completed Successfully']").should('be.visible');

        //Go to Inprogress
        navHelper.navigateToProcessPage();
        navHelper.navigateToInprogressRequests();
        //open request by ID
        request.openRequestById(requestId);
        request.clickOnTaskName(1, 1);
        //click on select list
        cy.get('[class="multiselect__input"]').click({
            force: true
        });
        //add option title3
        cy.xpath('(//span[text()="title3"])[1]').click();
        //click on submit button
        cy.xpath('//button[@class="btn btn-primary"]').click();
        //verify task is completed
        cy.xpath("//div[text()='Task Completed Successfully']").should('be.visible');

        //Go to Inprogress
        navHelper.navigateToProcessPage();
        navHelper.navigateToInprogressRequests();
        //open request by ID
        request.openRequestById(requestId);
        cy.wait(2000);
        request.clickOnTaskName(1, 1);
        //click on submit button
        cy.xpath('//button[@class="btn btn-primary"]').click();
        //verify task is completed
        cy.xpath("//div[text()='Task Completed Successfully']").should('be.visible');
        //verify the process is completed
        request.processIsCompleted(requestId);
        //cy.xpath("//div[text()[normalize-space()='Admin User has completed the task Data Connector A']]").should('be.visible');

        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task A']]").scrollIntoView().should('be.visible');
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task B']]").should('be.visible');
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task Data Connector B']]").should('be.visible');
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task c']]").should('be.visible');
    }

    async actionsAndAssertionsOfTCP42331(requestId, name, form_Screen, display_Screen){
        cy.get("[name='form_Screen']".replace('form_Screen', form_Screen)).should('be.visible');
        cy.get('[data-cy="screen-field-form_input_1"]').type('<html><head><title>Este es solo un ejemplo</title></head> <body>Aqui se encuentra el contenido de la web</body>');
        cy.xpath('(//input[@type="file"])[1]').attachFile("sample.pdf");
        cy.get('.uploader-file-name').contains("sample.pdf");
        cy.get('[data-cy="screen-field-form_input_2"]').type('<html><head><title>Este es solo un ejemplo</title></head> <body>Aqui se encuentra el contenido de la web</body>');
        cy.xpath('(//input[@type="file"])[2]').attachFile('drone.jpg');
        cy.xpath('(//*[@class="uploader-file-name"])[2]').contains("drone.jpg");
        cy.xpath('//button[text()[normalize-space()="New Submit"]]').click();
        cy.xpath("//div[text()='Task Completed Successfully']").should('be.visible');
        navHelper.navigateToRequestsPage();
        //navHelper.navigateToInprogressRequests();
        request.openRequestById(requestId);
        cy.wait(5000);
        request.clickOnTaskName(1, 1);
        cy.get("[name='display_Screen']".replace('display_Screen', display_Screen)).should('be.visible');
        cy.xpath("(//p[text()='Este es solo un ejemplo Aqui se encuentra el contenido de la web'])[1]").should('be.visible');
        cy.get('[data-cy="screen-field-file_upload_1"]').should('be.visible');
        cy.xpath("(//p[text()='Este es solo un ejemplo Aqui se encuentra el contenido de la web'])[2]").should('be.visible');
        cy.xpath("//div[@data-cy='screen-field-file_upload_2']//img[1]").should('be.visible');
        cy.xpath('//a[text()="Go to about Processmaker"]').click();
        cy.get("[aria-label='ProcessMaker']").should('be.visible');
        cy.go('back');
        cy.xpath('//button[text()[normalize-space()="Complete Task"]]').click();
        cy.xpath("//div[text()='Task Completed Successfully']").should('be.visible');
        cy.reload();
        cy.get('[id="file-manager-tab"]').click();
        cy.xpath('(//*[@title="View"])[3]').click();
        request.processIsCompleted(requestId);

        //requestpart___Quarter Scenario
        navHelper.navigateToRequestsPage();
        header.clickOnAddRequest();
        header.searchWithProcessName(name);
        var requestId = await header.clickOnStart(name);
        request.clickOnTaskName(1, 1);
        cy.get("[name='form_Screen']".replace('form_Screen', form_Screen)).should('be.visible');
        //cy.get('[data-cy="screen-field-form_input_1"]').type('<html><head><title>Este es solo un ejemplo</title></head> <body>Aqui se encuentra el contenido de la web</body>');
        cy.xpath('(//input[@type="file"])[1]').attachFile("sample.pdf");
        cy.get('.uploader-file-name').contains("sample.pdf");
        cy.get('[data-cy="screen-field-form_input_2"]').type('<html><head><title>Este es solo un ejemplo</title></head> <body>Aqui se encuentra el contenido de la web</body>');
        cy.xpath('(//input[@type="file"])[2]').attachFile('drone.jpg');
        cy.xpath('(//*[@class="uploader-file-name"])[2]').contains("drone.jpg");
        cy.xpath('//button[text()[normalize-space()="New Submit"]]').click();
        cy.xpath("//div[text()='Task Completed Successfully']").should('be.visible');
        navHelper.navigateToRequestsPage();
        //navHelper.navigateToInprogressRequests();
        request.openRequestById(requestId);
        cy.wait(5000);
        request.clickOnTaskName(1, 1);
        cy.get("[name='display_Screen']".replace('display_Screen', display_Screen)).should('be.visible');
        cy.xpath("(//p[text()='Este es solo un ejemplo Aqui se encuentra el contenido de la web'])[1]").should('be.visible');
        cy.get('[data-cy="screen-field-file_upload_1"]').should('be.visible');
        // cy.xpath("(//p[text()='Este es solo un ejemplo Aqui se encuentra el contenido de la web'])[2]").should('be.visible');
        cy.xpath("//div[@data-cy='screen-field-file_upload_2']//img[1]").should('be.visible');
        cy.xpath('//a[text()="Go to about Processmaker"]').click();
        cy.get("[aria-label='ProcessMaker']").should('be.visible');
        cy.go('back');
        cy.xpath('//button[text()[normalize-space()="Complete Task"]]').click();
        cy.xpath("//div[text()='Task Completed Successfully']").should('be.visible');
        cy.get("[id='file-manager-tab']").should('be.visible');
        cy.get('[id="file-manager-tab"]').click();
        cy.xpath('(//*[@title="View"])[1]').click();
        cy.wait(2000);
        cy.go('back');
        cy.xpath('(//*[@title="View"])[2]').click();
        request.processIsCompleted(requestId);
    }

    actionsAndAssertionsOfTCP42451() {
        let selectorLineInput = '[data-cy="screen-field-form_input_1"]';
        let selectorSubmitBtn = '//button[contains(text(),"New Submit")]';

        // Step 1: Complete Screen WE
        cy.xpath(selectorSubmitBtn).should('be.visible');
        cy.get(selectorLineInput).type("Well").should('have.value',"Well");
        cy.xpath(selectorSubmitBtn).click();
        cy.xpath(selectorSubmitBtn).should('not.exist');
        cy.get('[name=request-id]').invoke('attr', 'content').should('not.be.empty');

        //Step 9: Get number requests
        cy.get("[name='request-id']").invoke('attr', 'content').then((requestId)=> {

            //Step 2: Login PM4 page
            login.navigateToUrl();
            login.login();

            //Step 5: Open the requests
            cy.visit('/requests/'+requestId);
            request.waitUntilElementIsVisible('selector','#pending >* td:nth-child(1) >a[href^="/tasks"]');

            //Step 2: Complete task 2
            let taskName = "Task 2";
            request.clickOnTaskName(1, 1);
            cy.xpath(selectorSubmitBtn).click();
            request.verifyTaskIsCompletedB();

            //Step 2: Complete task 2
            cy.visit('/requests/'+requestId);
            request.waitUntilElementIsVisible('selector','#pending >* td:nth-child(1) >a[href^="/tasks"]');

            taskName = "Terinate Task";
            request.clickOnTaskName(1, 1);
            cy.xpath(selectorSubmitBtn).click();
            request.verifyTaskIsCompletedB();
        });
    }

    actionsAndAssertionsOfTCP42442() {
        const xpathRadioBox = "//label[text()='provideJointInfo']";
        const xpathYesOption = "//label[contains(text(),'Yes')]";
        const xpathNoOption = "//label[contains(text(),'No')]";
        const xpathBeforeTodayLineInput = "//label[text()='Before Date TODAY']/parent::div//input";
        const messageError = "//div[text()='Must be before today']";
        const xpathSubmitButton = "//button[contains(text(),'New Submit')]";
        const xpathRequest = "//span[text()='TCP4-2442 Web entry  visibility rules nested  before  date']//ancestor::tr[1]/td[1]/a";
        const xpathStatusRequest = "//h4[text()='Completed']";

        //Step 1: Verify that page is load
        cy.xpath(xpathRadioBox).should('be.visible');

        //Step 2: Click No of the provideJointInfo variable
        cy.xpath(xpathNoOption).click();

        //Step 3: Verify "Before Date TODAY" is not visible
        cy.xpath(xpathBeforeTodayLineInput).should('not.be.visible');

        //Step 4: Click Yes of the provideJointInfo variable
        cy.xpath(xpathYesOption).click();

        //Step 5: Verify "Before Date TODAY" is visible
        cy.xpath(xpathBeforeTodayLineInput).should('be.visible');

        //Step 6: In the Before Date TODAY variable, place a date current date
        var currentDate = new Date();
        var year = currentDate.getFullYear();
        var day = currentDate.getDate();
        var month = currentDate.getMonth()+1;

        var dateFormat = month + '/' + day + '/' + year;

        cy.xpath(xpathBeforeTodayLineInput).type(dateFormat);
        cy.xpath(xpathYesOption).click();

        //Step 7: In the Before Date TODAY variable, place a date before the day the test is running.
        day = currentDate.getDate() - 1;
        dateFormat = month + '/' + day + '/' + year;

        cy.xpath(xpathBeforeTodayLineInput).clear();
        cy.xpath(xpathBeforeTodayLineInput).type(dateFormat);
        cy.xpath(xpathYesOption).click();

        //Step 8: Click on new submit button
        cy.xpath(xpathSubmitButton).click();
        cy.get('[name=request-id]').invoke('attr', 'content').should('not.be.empty');

        //Step 9: Get number requests
        cy.get("[name='request-id']").invoke('attr', 'content').then((requestId)=> {

            //Step 10: Login PM4 page
            login.navigateToUrl();
            login.login();

            //Step 11: Open the requests
            cy.visit('/requests/' + requestId);
        });
    }

    goToLastTaskAndFillFormTCP4_2397(){
        //cy.get(selectors.lastTask).click();
        //cy.get('tr > :nth-child(2) > a').should('be.visible').click();
        cy.get('[data-cy="screen-field-name"]').should('be.visible').type('name1');
        cy.get('[data-cy="screen-field-phone"]').should('be.visible').type('123');
        cy.get('.form-group > .btn').click();

    }
    actionsTCP4_2314 (inputone, inputtwo,inputthree){
        //complete recordlist
        cy.xpath("//button[contains(text(),'Add')]").should('be.visible');
        cy.xpath("//button[contains(text(),'Add')]").click();
        cy.get('[class = modal-content]').should('be.visible');
        cy.get('[data-cy="screen-field-form_input_1"]').first().type(inputone).should('have.value',inputone);
        cy.get('[data-cy="screen-field-form_input_2"]').first().type(inputtwo).should('have.value',inputtwo);
        cy.get('[data-cy="screen-field-form_input_3"]').first().type(inputthree).should('have.value',inputthree);
        cy.xpath("//button[text()='Ok']").should('be.visible').click();
        cy.wait(2000);
        cy.xpath("//div[text()='line1']").should('be.visible');
    }
    otherActionsAndSubmitTCP4_2314 (inputoneedit){
        cy.get('thead > tr > [aria-colindex="1"]').click();
        cy.get('thead > tr > [aria-colindex="1"]').click();
        cy.get('[title = "Edit"]').first().click();
        cy.get('[debug-context="Record List Edit"]').should('be.visible');
        cy.get('div[name="lineInput"] > div > div > div > div > div  > input[name="form_input_1"]').eq(1).type(inputoneedit);
        cy.xpath("//button[text()='Save']").should('be.visible').click();
        cy.get('.form-group > .btn').click();
        request.verifyTaskIsCompletedB();
    }

    async scenario1OfTCP42414() {
        //Step 1: Press 'Fill the form' button
        cy.get('button').click()

        //verify icon
        cy.get('svg[class="lds-gear"]').should('be.visible')
        cy.get('svg[class="lds-gear"]').should('not.exist')

        //Step 2: Verify 'Personal Dates'
        cy.get('strong').should('be.visible').and("have.text", "Personal Dates")

        //Step 3: Verify Name field
        cy.get('div[class="form-group"] > label').eq(0).should("be.visible").and("have.text", "Name")
        cy.get('[data-cy="screen-field-name"]').should("be.visible")

        //Step 4 Verify Last Name field
        cy.get('div[class="form-group"] > label').eq(1).should("be.visible").and("have.text", "Last Name")
        cy.get('[data-cy="screen-field-lastName"]').should("be.visible")

        //Step 5 Verify "Birthday Date" field
        cy.get('[data-cy="screen-field-birthdayDate"] > label').should("be.visible").and("have.text","Birthday Date")
        cy.get('[aria-label="Birthday Date"]').should("be.visible")

        //Step 6: Verify New Input field
        cy.get('div[class="form-group"] > label').eq(2).should("be.visible").and("have.text", "New Input")
        cy.get('[data-cy="screen-field-form_input_3"]').should("be.visible")

        //Step 7: Verify Form
        cy.get('div[id="tab-form"]').should('be.visible')

        //Step 8: Verify "New submit" button
        cy.get('button[aria-label="New Submit"]').should('be.visible').and('contain',"New Submit")

        //Step 9: Fill fields
        cy.get('[data-cy="screen-field-name"]').type('test123')
        cy.get('[data-cy="screen-field-lastName"]').type('lastname123')
        cy.get('input[aria-label="Birthday Date"]').type('06/23/2022')
        cy.get('[data-cy="screen-field-form_input_3"]').type('test')
        cy.get('button[aria-label="New Submit"]').click()

        //verify icon
        cy.get('svg[class="lds-gear"]').should('be.visible')
        cy.get('svg[class="lds-gear"]').should('not.exist')

        //Step 10: validate values in the new screen
        cy.get('[data-cy="screen-field-name"]').should('have.value','test123')
        cy.get('[data-cy="screen-field-lastName"]').should('have.value','lastname123')
        cy.get('input[aria-label="Birthday Date"]').should('have.value','06/23/2022')
        cy.get('[data-cy="screen-field-form_input_3"]').should('have.value','test')

        //Step 11: Verify 'Personal Dates'
        cy.get('strong').should('be.visible').and("have.text", "Personal Dates")

        //Step 12: Verify Name field
        cy.get('div[class="form-group"] > label').eq(0).should("be.visible").and("have.text", "Name")
        cy.get('[data-cy="screen-field-name"]').should("be.visible")

        //Step 13 Verify Last Name field
        cy.get('div[class="form-group"] > label').eq(1).should("be.visible").and("have.text", "Last Name")
        cy.get('[data-cy="screen-field-lastName"]').should("be.visible")

        //Step 14 Verify "Birthday Date" field
        cy.get('[data-cy="screen-field-birthdayDate"] > label').should("be.visible").and("have.text","Birthday Date")
        cy.get('[aria-label="Birthday Date"]').should("be.visible")

        //Step 15: Verify New Input field
        cy.get('div[class="form-group"] > label').eq(2).should("be.visible").and("have.text", "New Input")
        cy.get('[data-cy="screen-field-form_input_3"]').should("be.visible")

        //Step 16: Verify Form
        cy.get('div[id="tab-form"]').should('be.visible')

        //Step 17: Verify "Password" field
        cy.get('div[class="form-group"] > label').eq(3).should("be.visible").and("have.text", "Password")
        cy.get('[data-cy="screen-field-password"]').should("be.visible")

        //Step 18: Fill "password" field
        cy.get('[data-cy="screen-field-password"]').type("123456").should("have.value","123456")

        //Step 19: Verify "Confirm Password" field
        cy.get('[class="form-group form-group--error"] > label').should("be.visible").and("have.text", "Confirm Password")
        cy.get('[data-cy="screen-field-confirmPassword"]').type("abc123").should("have.value","abc123")
        cy.get('div[class="alert alert-danger mt-3"] > i').should("be.visible")
        cy.get('[data-cy="screen-field-confirmPassword"]').should("be.visible")

        //Step 20: Fill "Confirm Password" field
        cy.get('[data-cy="screen-field-confirmPassword"]').clear()
        cy.get('[data-cy="screen-field-confirmPassword"]').type("123456").should("have.value","123456")

        //Step 21: Verify "New submit" button
        cy.get('button[aria-label="New Submit"]').should('be.visible').and('contain',"New Submit")

        cy.get('button[aria-label="New Submit"]').click()

        //verify icon
        cy.get('svg[class="lds-gear"]').should('be.visible')
        cy.get('svg[class="lds-gear"]').should('not.exist')

        //Step 22: Verify 'Print Result'
        cy.get('h4 > span > strong').should('be.visible').and("have.text", "Print Result")

        //Step 23: Verify Name field
        cy.get('div[class="form-group"] > label').eq(0).should("be.visible").and("have.text", "Name")
        cy.get('[data-cy="screen-field-name"]').should("be.visible")
        cy.get('[data-cy="screen-field-name"]').should("have.attr", "readonly", "readonly")

        //Step 24 Verify Last Name field
        cy.get('div[class="form-group"] > label').eq(1).should("be.visible").and("have.text", "Last Name")
        cy.get('[data-cy="screen-field-lastName"]').should("be.visible")
        cy.get('[data-cy="screen-field-lastName"]').should("have.attr", "readonly", "readonly")

        //Step 25 Verify "Birthday Date" field
        cy.get('[data-cy="screen-field-birthdayDate"] > label').should("be.visible").and("have.text","Birthday Date")
        cy.get('[aria-label="Birthday Date"]').eq(1).should("be.visible")
        cy.get('[aria-label="Birthday Date"]').eq(1).should("have.attr", "disabled")

        //Step 26: Verify New Input field
        cy.get('div[class="form-group"] > label').eq(2).should("be.visible").and("have.text", "New Input")
        cy.get('[data-cy="screen-field-form_input_3"]').should("be.visible")
        cy.get('[data-cy="screen-field-form_input_3"]').should("have.attr", "readonly", "readonly")

        //Step 27: Verify Form
        cy.get('div[id="tab-form"]').should('be.visible')

        //Step 28: Verify "New submit" button
        cy.get('button[aria-label="New Submit"]').should('be.visible').and('contain',"New Submit")

        //Step 29: Verify "password" field
        cy.get('div[class="form-group"] > label').eq(3).should("be.visible").and("have.text", "Password")
        cy.get('[data-cy="screen-field-password"]').should("have.value","123456")
        cy.get('[data-cy="screen-field-password"]').should("have.attr","readonly","readonly")

        //Step 30: Verify "Confirm Password" field
        cy.get('div[class="form-group"] > label').eq(4).should("be.visible").and("have.text", "Confirm Password")
        cy.get('input[name="confirmPassword"]').should("have.attr","readonly","readonly")

        //Step 31: Press Submit button to complete the Request.
        cy.get('button[aria-label="New Submit"]').should('be.visible').and('contain',"New Submit")

        cy.get('button[aria-label="New Submit"]').click()

        //verify icon
        cy.get('svg[class="lds-gear"]').should('be.visible')
        cy.get('svg[class="lds-gear"]').should('not.exist')

        cy.get('h3').should('contain','This request is complete')
    }

    async scenario2OfTCP42414() {
        //Step 1: Press 'Fill the form' button
        cy.get('button').click()

        //verify icon
        cy.get('svg[class="lds-gear"]').should('be.visible')
        cy.get('svg[class="lds-gear"]').should('not.exist')

        //Step 2: Verify 'Personal Dates'
        cy.get('strong').should('be.visible').and("have.text", "Personal Dates")

        //Step 3: Verify Name field
        cy.get('div[class="form-group"] > label').eq(0).should("be.visible").and("have.text", "Name")
        cy.get('[data-cy="screen-field-name"]').should("be.visible")

        //Step 4 Verify Last Name field
        cy.get('div[class="form-group"] > label').eq(1).should("be.visible").and("have.text", "Last Name")
        cy.get('[data-cy="screen-field-lastName"]').should("be.visible")

        //Step 5 Verify "Birthday Date" field
        cy.get('[data-cy="screen-field-birthdayDate"] > label').should("be.visible").and("have.text","Birthday Date")
        cy.get('[aria-label="Birthday Date"]').should("be.visible")

        //Step 6: Verify New Input field
        cy.get('div[class="form-group"] > label').eq(2).should("be.visible").and("have.text", "New Input")
        cy.get('[data-cy="screen-field-form_input_3"]').should("be.visible")

        //Step 7: Verify Form
        cy.get('div[id="tab-form"]').should('be.visible')

        //Step 8: Verify "New submit" button
        cy.get('button[aria-label="New Submit"]').should('be.visible').and('contain',"New Submit")

        //Step 9: Fill fields
        cy.get('[data-cy="screen-field-name"]').type('test123')
        cy.get('[data-cy="screen-field-lastName"]').type('lastname123')
        cy.get('input[aria-label="Birthday Date"]').type('06/23/2022')
        cy.get('[data-cy="screen-field-form_input_3"]').type('test')
        cy.get('button[aria-label="New Submit"]').click()

        //verify icon
        cy.get('svg[class="lds-gear"]').should('be.visible')
        cy.get('svg[class="lds-gear"]').should('not.exist')

        //Step 10: validate values in the new screen
        cy.get('[data-cy="screen-field-name"]').should('have.value','test123')
        cy.get('[data-cy="screen-field-lastName"]').should('have.value','lastname123')
        cy.get('input[aria-label="Birthday Date"]').should('have.value','06/23/2022')
        cy.get('[data-cy="screen-field-form_input_3"]').should('have.value','test')

        //Step 11: Verify 'Personal Dates'
        cy.get('strong').should('be.visible').and("have.text", "Personal Dates")

        //Step 12: Verify Name field
        cy.get('div[class="form-group"] > label').eq(0).should("be.visible").and("have.text", "Name")
        cy.get('[data-cy="screen-field-name"]').should("be.visible")

        //Step 13 Verify Last Name field
        cy.get('div[class="form-group"] > label').eq(1).should("be.visible").and("have.text", "Last Name")
        cy.get('[data-cy="screen-field-lastName"]').should("be.visible")

        //Step 14 Verify "Birthday Date" field
        cy.get('[data-cy="screen-field-birthdayDate"] > label').should("be.visible").and("have.text","Birthday Date")
        cy.get('[aria-label="Birthday Date"]').should("be.visible")

        //Step 15: Verify New Input field
        cy.get('div[class="form-group"] > label').eq(2).should("be.visible").and("have.text", "New Input")
        cy.get('[data-cy="screen-field-form_input_3"]').should("be.visible")

        //Step 16: Verify Form
        cy.get('div[id="tab-form"]').should('be.visible')

        //Step 17: Verify "Password" field
        cy.get('div[class="form-group"] > label').eq(3).should("be.visible").and("have.text", "Password")
        cy.get('[data-cy="screen-field-password"]').should("be.visible")

        //Step 18: Fill "password" field
        cy.get('[data-cy="screen-field-password"]').type("123456").should("have.value","123456")

        //Step 19: Verify "Confirm Password" field
        cy.get('[class="form-group form-group--error"] > label').should("be.visible").and("have.text", "Confirm Password")
        cy.get('[data-cy="screen-field-confirmPassword"]').type("abc123").should("have.value","abc123")
        cy.get('div[class="alert alert-danger mt-3"] > i').should("be.visible")
        cy.get('[data-cy="screen-field-confirmPassword"]').should("be.visible")

        //Step 20: Fill "Confirm Password" field
        cy.get('[data-cy="screen-field-confirmPassword"]').clear()
        cy.get('[data-cy="screen-field-confirmPassword"]').type("123456").should("have.value","123456")

        //Step 21: Verify "New submit" button
        cy.get('button[aria-label="New Submit"]').should('be.visible').and('contain',"New Submit")

        //Wait by 5 minutes until the boundary timer is executed
        cy.wait(60000)
        cy.wait(60000)
        cy.wait(60000)
        cy.wait(60000)
        cy.wait(60000)

        // Verify confirm password field not exist
        cy.get('[data-cy="screen-field-password"]').should("not.exist")
        cy.get('[data-cy="screen-field-confirmPassword"]').should("not.exist")

        //Step 22: Verify 'Personal Dates'
        cy.get('strong').should('be.visible').and("have.text", "Personal Dates")

        //Step 23: Verify Name field
        cy.get('div[class="form-group"] > label').eq(0).should("be.visible").and("have.text", "Name")
        cy.get('[data-cy="screen-field-name"]').should("be.visible")

        //Step 24 Verify Last Name field
        cy.get('div[class="form-group"] > label').eq(1).should("be.visible").and("have.text", "Last Name")
        cy.get('[data-cy="screen-field-lastName"]').should("be.visible")

        //Step 25 Verify "Birthday Date" field
        cy.get('[data-cy="screen-field-birthdayDate"] > label').should("be.visible").and("have.text","Birthday Date")
        cy.get('[aria-label="Birthday Date"]').should("be.visible")

        //Step 26: Verify New Input field
        cy.get('div[class="form-group"] > label').eq(2).should("be.visible").and("have.text", "New Input")
        cy.get('[data-cy="screen-field-form_input_3"]').should("be.visible")

        //Step 27: Verify Form
        cy.get('div[id="tab-form"]').should('be.visible')

        //Step 28: Verify "New submit" button
        cy.get('button[aria-label="New Submit"]').should('be.visible').and('contain',"New Submit")

        //Step 29: validate values in the new screen
        cy.get('[data-cy="screen-field-name"]').should('have.value','test123')
        cy.get('[data-cy="screen-field-lastName"]').should('have.value','lastname123')
        cy.get('input[aria-label="Birthday Date"]').should('have.value','06/23/2022')
        cy.get('[data-cy="screen-field-form_input_3"]').should('have.value','test')

        cy.get('button[aria-label="New Submit"]').click()

        //verify icon
        cy.get('svg[class="lds-gear"]').should('be.visible')
        cy.get('svg[class="lds-gear"]').should('not.exist')

        //Step 30: validate values in the new screen
        cy.get('[data-cy="screen-field-name"]').should('have.value','test123')
        cy.get('[data-cy="screen-field-lastName"]').should('have.value','lastname123')
        cy.get('input[aria-label="Birthday Date"]').should('have.value','06/23/2022')
        cy.get('[data-cy="screen-field-form_input_3"]').should('have.value','test')

        //Step 31: Verify 'Personal Dates'
        cy.get('strong').should('be.visible').and("have.text", "Personal Dates")

        //Step 32: Verify Name field
        cy.get('div[class="form-group"] > label').eq(0).should("be.visible").and("have.text", "Name")
        cy.get('[data-cy="screen-field-name"]').should("be.visible")

        //Step 33 Verify Last Name field
        cy.get('div[class="form-group"] > label').eq(1).should("be.visible").and("have.text", "Last Name")
        cy.get('[data-cy="screen-field-lastName"]').should("be.visible")

        //Step 34 Verify "Birthday Date" field
        cy.get('[data-cy="screen-field-birthdayDate"] > label').should("be.visible").and("have.text","Birthday Date")
        cy.get('[aria-label="Birthday Date"]').should("be.visible")

        //Step 35: Verify New Input field
        cy.get('div[class="form-group"] > label').eq(2).should("be.visible").and("have.text", "New Input")
        cy.get('[data-cy="screen-field-form_input_3"]').should("be.visible")

        //Step 36: Verify Form
        cy.get('div[id="tab-form"]').should('be.visible')

        //Step 37: Verify "Password" field
        cy.get('div[class="form-group"] > label').eq(3).should("be.visible").and("have.text", "Password")
        cy.get('[data-cy="screen-field-password"]').should("be.visible")

        //Step 38: Fill "password" field
        cy.get('[data-cy="screen-field-password"]').type("123456").should("have.value","123456")

        //Step 39: Verify "Confirm Password" field
        cy.get('[class="form-group form-group--error"] > label').should("be.visible").and("have.text", "Confirm Password")
        cy.get('[data-cy="screen-field-confirmPassword"]').type("abc123").should("have.value","abc123")
        cy.get('div[class="alert alert-danger mt-3"] > i').should("be.visible")
        cy.get('[data-cy="screen-field-confirmPassword"]').should("be.visible")

        //Step 40: Fill "Confirm Password" field
        cy.get('[data-cy="screen-field-confirmPassword"]').clear()
        cy.get('[data-cy="screen-field-confirmPassword"]').type("123456").should("have.value","123456")

        //Step 41: Verify "New submit" button
        cy.get('button[aria-label="New Submit"]').should('be.visible').and('contain',"New Submit")

        cy.get('button[aria-label="New Submit"]').click()

        //verify icon
        cy.get('svg[class="lds-gear"]').should('be.visible')
        cy.get('svg[class="lds-gear"]').should('not.exist')

        //Step 42: Verify 'Print Result'
        cy.get('h4 > span > strong').should('be.visible').and("have.text", "Print Result")

        //Step 43: Verify Name field
        cy.get('div[class="form-group"] > label').eq(0).should("be.visible").and("have.text", "Name")
        cy.get('[data-cy="screen-field-name"]').should("be.visible")
        cy.get('[data-cy="screen-field-name"]').should("have.attr", "readonly", "readonly")

        //Step 44 Verify Last Name field
        cy.get('div[class="form-group"] > label').eq(1).should("be.visible").and("have.text", "Last Name")
        cy.get('[data-cy="screen-field-lastName"]').should("be.visible")
        cy.get('[data-cy="screen-field-lastName"]').should("have.attr", "readonly", "readonly")

        //Step 45 Verify "Birthday Date" field
        cy.get('[data-cy="screen-field-birthdayDate"] > label').should("be.visible").and("have.text","Birthday Date")
        cy.get('[aria-label="Birthday Date"]').eq(1).should("be.visible")
        cy.get('[aria-label="Birthday Date"]').eq(1).should("have.attr", "disabled")

        //Step 46: Verify New Input field
        cy.get('div[class="form-group"] > label').eq(2).should("be.visible").and("have.text", "New Input")
        cy.get('[data-cy="screen-field-form_input_3"]').should("be.visible")
        cy.get('[data-cy="screen-field-form_input_3"]').should("have.attr", "readonly", "readonly")

        //Step 47: Verify Form
        cy.get('div[id="tab-form"]').should('be.visible')

        //Step 48: Verify "New submit" button
        cy.get('button[aria-label="New Submit"]').should('be.visible').and('contain',"New Submit")

        //Step 49: Verify "password" field
        cy.get('div[class="form-group"] > label').eq(3).should("be.visible").and("have.text", "Password")
        cy.get('[data-cy="screen-field-password"]').should("have.value","123456")
        cy.get('[data-cy="screen-field-password"]').should("have.attr","readonly","readonly")

        //Step 50: Verify "Confirm Password" field
        cy.get('div[class="form-group"] > label').eq(4).should("be.visible").and("have.text", "Confirm Password")
        cy.get('input[name="confirmPassword"]').should("have.attr","readonly","readonly")

        //Press Submit button to complete the Request.
        cy.get('button[aria-label="New Submit"]').should('be.visible').and('contain',"New Submit")
        cy.get('button[aria-label="New Submit"]').click()

        //verify icon
        cy.get('svg[class="lds-gear"]').should('be.visible')
        cy.get('svg[class="lds-gear"]').should('not.exist')

        cy.get('h3').should('contain','This request is complete')
    }

    actionsAndAssertionsOfTCP2429(timezone_format, processName) {
       //Set Variables
        var selectorButtonAdd = '[data-cy="add-row"]';
        var selectorCheckgroupControl = '[data-cy="screen-field-check1"]';
        var selectorLineInputControl = '[data-cy="screen-field-name"]';
        var selectorSelectList = '[data-cy="screen-field-varR"]';
        var selectorSubmitButton = 'button[aria-label="New Submit"]';

        //fill fields to the first Record List (first row)
        cy.get(selectorButtonAdd).click();
        cy.get('[data-cy="screen-field-date"] input').first().type('10/10/2022'+ '{enter}', {force:true});
        cy.get(selectorLineInputControl).first().type('Test Name');
        cy.get(selectorCheckgroupControl).first().check();
        admin.changeWriteDateZone(11,11,2022,11,11,timezone_format,'DateTime');

        cy.get(selectorSelectList).first().click();
        cy.get('ul > li[id="option-0-2"]').should("be.visible").click();
        cy.get('[class="modal-content"]').contains("Ok").click();

        //fill fields to the first Record List (second row)
        cy.get(selectorButtonAdd).click()
        cy.get('[data-cy="screen-field-date"] input').first().type('10/10/2022'+ '{enter}', {force:true});
        cy.get(selectorLineInputControl).first().type('Test Name 2');
        cy.get(selectorCheckgroupControl).first().check();
        admin.changeWriteDateZone(11,11,2024,21,11,timezone_format,'DateTime');

        cy.get(selectorSelectList).first().click()
        cy.get('ul > li[id="option-2-1"]').should("be.visible").click()
        cy.get('[class="modal-content"]').contains("Ok").click()

        //fill fields to the first Record List (third row)
        cy.get(selectorButtonAdd).click()
        cy.get('[data-cy="screen-field-date"] input').first().type('10/10/2022'+ '{enter}', {force:true});
        cy.get(selectorLineInputControl).first().type('Test Name 3');
        cy.get(selectorCheckgroupControl).first().check();
        admin.changeWriteDateZone(11,11,2025,16,25,timezone_format,'DateTime');

        cy.get(selectorSelectList).first().click();
        cy.get('ul > li[id="option-3-3"]').should("be.visible").click();
        cy.get('[class="modal-content"]').contains("Ok").click();

        //send Web Entry
        cy.get(selectorSubmitButton).click()

        //Step 2 login PM4 page
        login.navigateToUrl();
        login.login();

        //Step 3 open request by name
        request.openRequestByName(processName);
        request.clickOnTaskName(1, 1);

        //Verify values for the First Row and first Record List
        cy.get('tbody > [aria-rowindex="1"] > [aria-colindex="3"]').eq(0).invoke('text').then((VarDate) => {
            expect(VarDate.trim()).to.equal('Test Name')
        })
        cy.get('tbody > [aria-rowindex="1"] > [aria-colindex="4"]').eq(0).invoke('text').then((VarDate) => {
            expect(VarDate.trim()).to.equal('var3')
        })
        cy.get('tbody > [aria-rowindex="1"] > [aria-colindex="5"]').eq(0).invoke('text').then((VarDate) => {
            expect(VarDate.trim()).to.equal('true')
        })
        //Verify values for the Second Row and first Record List
        cy.get('tbody > [aria-rowindex="2"] > [aria-colindex="3"]').eq(0).invoke('text').then((VarDate) => {
            expect(VarDate.trim()).to.equal('Test Name 2')
        })
        cy.get('tbody > [aria-rowindex="2"] > [aria-colindex="4"]').eq(0).invoke('text').then((VarDate) => {
            expect(VarDate.trim()).to.equal('var2')
        })
        cy.get('tbody > [aria-rowindex="2"] > [aria-colindex="5"]').eq(0).invoke('text').then((VarDate) => {
            expect(VarDate.trim()).to.equal('true')
        })
        //Verify values for the Third Row and first Record List
        cy.get('tbody > [aria-rowindex="3"] > [aria-colindex="3"]').eq(0).invoke('text').then((VarDate) => {
            expect(VarDate.trim()).to.equal('Test Name 3')
        })
        cy.get('tbody > [aria-rowindex="3"] > [aria-colindex="4"]').eq(0).invoke('text').then((VarDate) => {
            expect(VarDate.trim()).to.equal('var4')
        })
        cy.get('tbody > [aria-rowindex="3"] > [aria-colindex="5"]').eq(0).invoke('text').then((VarDate) => {
            expect(VarDate.trim()).to.equal('true')
        })
        //Verify values for the First Row and Second Record List
        cy.get('tbody > [aria-rowindex="1"] > [aria-colindex="3"]').eq(1).invoke('text').then((VarDate) => {
            expect(VarDate.trim()).to.equal('Test Name')
        })
        cy.get('tbody > [aria-rowindex="1"] > [aria-colindex="4"]').eq(1).invoke('text').then((VarDate) => {
            expect(VarDate.trim()).to.equal('var3')
        })
        cy.get('tbody > [aria-rowindex="1"] > [aria-colindex="5"]').eq(1).invoke('text').then((VarDate) => {
            expect(VarDate.trim()).to.equal('true')
        })
        //Verify values for the Second Row and Second Record List
        cy.get('tbody > [aria-rowindex="2"] > [aria-colindex="3"]').eq(1).invoke('text').then((VarDate) => {
            expect(VarDate.trim()).to.equal('Test Name 2')
        })
        cy.get('tbody > [aria-rowindex="2"] > [aria-colindex="4"]').eq(1).invoke('text').then((VarDate) => {
            expect(VarDate.trim()).to.equal('var2')
        })
        cy.get('tbody > [aria-rowindex="2"] > [aria-colindex="5"]').eq(1).invoke('text').then((VarDate) => {
            expect(VarDate.trim()).to.equal('true')
        })
        //Verify values for the Third Row and Second Record List
        cy.get('tbody > [aria-rowindex="3"] > [aria-colindex="3"]').eq(1).invoke('text').then((VarDate) => {
            expect(VarDate.trim()).to.equal('Test Name 3')
        })
        cy.get('tbody > [aria-rowindex="3"] > [aria-colindex="4"]').eq(1).invoke('text').then((VarDate) => {
            expect(VarDate.trim()).to.equal('var4')
        })
        cy.get('tbody > [aria-rowindex="3"] > [aria-colindex="5"]').eq(1).invoke('text').then((control) => {
            expect(control.trim()).to.equal('true')
        })
    }
    actionsAndAssertionsOfTCP42388(){
        let selectorSubmitButton = "//button[contains(text(),'New Submit')]";
        let selectorMenuEcosia = "//header/div[1]/div[5]/div[1]/button[1]/*[1]";

        //Step 1: Complete the Web entry
        cy.xpath(selectorSubmitButton).should('be.visible');
        cy.xpath(selectorSubmitButton).click();
        cy.get('[name=request-id]').invoke('attr', 'content').should('not.be.empty');
        cy.get("[name='request-id']").invoke('attr', 'content').then((requestId)=>{

            //Step 2: Log in to Processmaker
            login.navigateToUrl();
            login.login();

            cy.visit('/requests/'+requestId);
            request.waitUntilElementIsVisible('selector','#pending >* td:nth-child(1) >a[href^="/tasks"]');
            request.clickOnTaskName(1, 1);

            //Step 3: Open the self service
            tasks.openSelfServiceTask();

            var selectorSubmitButtonForm = ".form-group > .btn";
            cy.get(selectorSubmitButtonForm).should('exist');
            cy.get(selectorSubmitButtonForm).click();
            request.verifyTaskIsCompletedB();

            cy.visit('/requests/'+requestId);
            request.waitUntilElementIsVisible('selector','#pending >* td:nth-child(1) >a[href^="/tasks"]');
            request.clickOnTaskName(1, 1);

            cy.get(selectorSubmitButtonForm).should('exist');
            cy.get(selectorSubmitButtonForm).click();
            request.verifyTaskIsCompletedB();
        });
    }

    actionsOfTCP2305(yearVar,monthVar){
        cy.get('input[aria-label="New Date Picker 1"]').should('be.visible');
        //Step 1: Fill "New Date Picker 1" field
        cy.get('input[aria-label="New Date Picker 1"]').click();
        screen.useCustomDate('2022','Nov','20');

        //Step 2: Fill "New Date Picker 2" field
        cy.get('input[aria-label="New Date Picker 2"]').click();
        screen.useCustomDateTime('2023','Apr','24','2','40');
        cy.get('input[aria-label="New Date Picker 2"]').type('{esc}');

        //Step 3: Fill "New Date Picker 3" field
        cy.get('input[aria-label="New Date Picker 3"]').click();
        screen.useCustomDate('2024','Aug','27');

        //Step 4: Add a new datepicker in the loop
        cy.get('[data-cy="loop-loop_1-add"]').click();
        cy.get('input[aria-label="New Date Picker 3"]').eq(1)
            .should('be.visible')
            .click();
        screen.useCustomDate('2022','Dec','25');

        //Step 5: Fill "New Date Picker 4" field
        cy.get('input[aria-label="New Date Picker 4"]').click();
        screen.useCustomDateTime('2027','Oct','8','05','55');
        cy.get('input[aria-label="New Date Picker 4"]').type('{esc}');
        cy.get('[data-cy="loop-loop_2-add"]').click();

        //Step 6: Add a new datepicker in the loop
        cy.get('input[aria-label="New Date Picker 4"]').eq(1)
            .should('be.visible')
            .click();
        screen.useCustomDateTime('2026','May','13','10','20');

        //Step 7: Open Record List
        cy.get('[data-cy="add-row"]').click();

        //Step 8: Fill datepicker 1
        cy.get('input[aria-label="date time"]').eq(0).click();
        screen.useCustomDateTime(yearVar,monthVar,'11','1','10');

        cy.xpath('(//*[contains(text(),"Add")])[2]').click({force:true});
        //Step 9: Fill datepicker 2
        cy.get('[aria-label="date"]').eq(0).click();
        screen.useCustomDate(yearVar,monthVar,'20');

        //Step 10: Click datepicker MIN
        cy.get('input[aria-label="min"]').eq(0).click();

        //Step 11: verify that the day is disabled for the datepicker MIN
        cy.xpath('//*[@class="vdpTable"]//tbody//td[not(contains(@class,"outOfRange"))]/*[text()="10"]/parent::td')
            .invoke('attr', 'class').then(($classes) => {
                expect($classes).to.contain('disabled');
            });

        //Step 12: Verify that other date and time inside correct range is selected
        screen.useCustomDateTime(yearVar,monthVar,'12','1','15');

        cy.xpath('(//*[contains(text(),"Add")])[2]').click({force:true});
        //Step 13: Click datepicker MAX
        cy.get('input[aria-label="max"]').eq(0).click();

        //Step 14: Verify that the day is disabled for the datepicker MAX
        cy.xpath('//*[@class="vdpTable"]//tbody//td[not(contains(@class,"outOfRange"))]/*[text()="12"]/parent::td')
            .invoke('attr', 'class').then(($classes) => {
            expect($classes).to.contain('disabled');
        });

        //Step 15: Verify that other date and time inside correct range is selected
        screen.useCustomDateTime(yearVar,monthVar,'10','1','15');

        //Step 16: Click datepicker MIN DATE
        cy.xpath('(//*[contains(text(),"Add")])[2]').click({force:true});
        cy.get('input[aria-label="Min Date"]').eq(0).click();

        //Step 17: Verify that the day is disabled for the datepicker MIN DATE
        cy.xpath('//*[@class="vdpTable"]//tbody//td[not(contains(@class,"outOfRange"))]/*[text()="19"]/parent::td')
            .invoke('attr', 'class').then(($classes) => {
            expect($classes).to.contain('disabled');
        });

        //Step 18: Verify that other date and time inside correct range is selected
        screen.useCustomDate(yearVar,monthVar,'21');

        //Step 19: Click datepicker MAX DATE
        cy.get('input[aria-label="max date"]').eq(0).click();

        //Step 20: Verify that the day is disabled for the datepicker MAX DATE
        cy.xpath('//*[@class="vdpTable"]//tbody//td[not(contains(@class,"outOfRange"))]/*[text()="21"]/parent::td')
            .invoke('attr', 'class').then(($classes) => {
            expect($classes).to.contain('disabled');
        });

        //Step 21: Verify that other date and time inside correct range is selected
        screen.useCustomDate(yearVar,monthVar,'19');

        //Step 22: Close record list
        cy.get('button').contains('Ok').click();

        cy.xpath('(//button[contains(text(),"New Submit")])[2]').click();
        request.verifyTaskIsCompletedB();
    }

    assertionsOfTCP2305(){
        //verify fields
        cy.get('tr > td[aria-colindex="1"]').should('contain.text','11');
        cy.get('tr > td[aria-colindex="2"]').should('contain.text','12');
        cy.get('tr > td[aria-colindex="3"]').should('contain.text','10');
        cy.get('tr > td[aria-colindex="4"]').should('contain.text','20');
        cy.get('tr > td[aria-colindex="5"]').should('contain.text','21');
        cy.get('tr > td[aria-colindex="6"]').should('contain.text','19');

        cy.get('div > p').eq(0).should('contain.text','20');
        cy.get('div > p').eq(1).should('contain.text','24');
        cy.get('div > p').eq(2).should('contain.text','27');
        cy.get('div > p').eq(3).should('contain.text','25');
        cy.get('div > p').eq(5).should('contain.text','2027');
        cy.get('div > p').eq(6).should('contain.text','2026');
    }
///////////////////

    actionsAndAssertionsOfTCP42332_1(requestID,processName,subprocessName){
        // press + button on the loop control
        cy.get('button[title="Add Item"]').should('be.visible');
        cy.get('button[title="Add Item"]').click();
        cy.get('input[name="form_input_1"]').eq(0).type('test 1').should('have.value','test 1');
        cy.get('button[title="Add Item"]').click();
        cy.get('input[name="form_input_1"]').eq(1).type('test 2').should('have.value','test 2');

        // fill line inputs
        cy.get('input[name="decimal"]').type('1.1').should('have.value','1.1');
        cy.get('input[name="integer"]').type('1').should('have.value','1');

        //press submit button
        cy.get('button[aria-label="New Submit"]').click();
        request.verifyTaskIsCompletedB();

        //Open Request
        navHelper.navigateToInprogressRequests();
        cy.visit('/requests/'+requestID);
        cy.location('href').should('include', '/requests/'+requestID);

        //Verify that 2 threads are displayed
        cy.get('div[class="tab-content"] *> ul > li > div > i').should('have.length',2);

        //Verify the process name according to Sub process
        cy.get('div[class="tab-content"] *> ul > li > div > a').eq(0).should('have.contain',subprocessName);
        cy.get('div[class="tab-content"] *> ul > li > div > a').eq(1).should('have.contain',subprocessName);

        //Open the first subprocess
        cy.get('div[class="tab-content"] *> ul > li > div > a').eq(0).click();

        //fill fields in the first subprocess
        request.waitUntilElementIsVisible('selector', '#pending >* td:nth-child(1) >a[href^="/tasks"]');
        request.clickOnTaskName(1, 1);

        // press + button on the loop control
        cy.get('button[title="Add Item"]').should('be.visible');
        cy.get('button[title="Add Item"]').click();
        cy.get('input[name="form_input_1"]').eq(0).type('test subprocess 1A').should('have.value','test subprocess 1A');
        cy.get('button[title="Add Item"]').click();
        cy.get('input[name="form_input_1"]').eq(1).type('test subprocess 2A').should('have.value','test subprocess 2A');

        cy.get('input[name="decimal"]').type('12.2').should('have.value','12.2');
        cy.get('input[name="integer"]').type('4').should('have.value','4');

        //press submit button
        cy.get('button[aria-label="New Submit"]').click();
        request.verifyTaskIsCompletedB();

        cy.visit('/requests/'+requestID);
        cy.location('href').should('include', '/requests/'+requestID);

        //Verify that 2 threads are displayed
        cy.get('div[class="tab-content"] *> ul > li > div > i').should('have.length',2);

        //Open the second sub process
        cy.get('div[class="tab-content"] *> ul > li > div > a').eq(1).click();

        //fill fields in the second subprocess
        request.waitUntilElementIsVisible('selector', '#pending >* td:nth-child(1) >a[href^="/tasks"]');
        request.clickOnTaskName(1, 1);

        // press + button on the loop control
        cy.get('button[title="Add Item"]').should('be.visible');
        cy.get('button[title="Add Item"]').click();
        cy.get('input[name="form_input_1"]').eq(0).type('test subprocess 1B').should('have.value','test subprocess 1B');
        cy.get('button[title="Add Item"]').click();
        cy.get('input[name="form_input_1"]').eq(1).type('test subprocess 2B').should('have.value','test subprocess 2B');

        cy.get('input[name="decimal"]').type('10123.2').should('have.value','10123.2');
        cy.get('input[name="integer"]').type('263').should('have.value','263');

        //press submit button to complete the request
        cy.get('button[aria-label="New Submit"]').click();
        request.verifyTaskIsCompletedB();

        cy.visit('/requests/'+requestID);
        cy.location('href').should('include', '/requests/'+requestID);

        //Verify that 2 threads are displayed in the Main
        cy.get('div[class="tab-content"] *> ul > li > div > i').should('have.length',2);

        //Verify the process name according to Sub process
        cy.get('div[class="tab-content"] *> ul > li > div > a').eq(0).should('have.contain',subprocessName);
        cy.get('div[class="tab-content"] *> ul > li > div > a').eq(1).should('have.contain',subprocessName);

        //Verify data in each row in the summary tab for the main process
        cy.get('table[role="table"]> tbody > tr').should('have.length', 14);

        cy.xpath('//td[contains(text(),"1A")]').should('exist');
        cy.xpath('//td[contains(text(),"2A")]').should('exist');

        cy.xpath('//td[contains(text(),"12.2")]').should('exist');
        cy.xpath('//td[contains(text(),"4")]').should('exist');

        cy.xpath('//td[contains(text(),"1")]').should('exist');
        cy.xpath('//td[contains(text(),"test 1")]').should('exist');

        cy.xpath('//td[contains(text(),"1B")]').should('exist');
        cy.xpath('//td[contains(text(),"2B")]').should('exist');

        cy.xpath('//td[contains(text(),"10123.2")]').should('exist');
        cy.xpath('//td[contains(text(),"263")]').should('exist');

        cy.xpath('//td[contains(text(),"2")]').should('exist');
        cy.xpath('//td[contains(text(),"test 2")]').should('exist');

        cy.xpath('//td[contains(text(),"1.1")]').should('exist');
        cy.xpath('//td[contains(text(),"1")]').should('exist');

        //Validate the first subprocess
        //open subprocess
        cy.get('div[class="tab-content"] *>ul > li > div > a').eq(0).click();

        cy.get('table[role="table"]> tbody > tr').should('have.length', 20);
        cy.xpath('//td[contains(text(),"loop_1.0.form_input_1")]/following-sibling::td[contains(text(),"1A")]').should('exist');
        cy.xpath('//td[contains(text(),"loop_1.1.form_input_1")]/following-sibling::td[contains(text(),"2A")]').should('exist');

        cy.xpath('//td[contains(text(),"_parent.config.name")]/following-sibling::td[contains(text(),"'+subprocessName+'")]').should('exist');

        cy.xpath('//td[contains(text(),"_parent.config.startEvent")]/following-sibling::td[contains(text(),"node")]').should('exist');
        cy.xpath('//td[contains(text(),"_parent.loop_1.0.form_input_1")]/following-sibling::td[contains(text(),"test 1")]').should('exist');

        cy.xpath('//td[contains(text(),"_parent.loop_1.1.form_input_1")]/following-sibling::td[contains(text(),"test 2")]').should('exist');
        cy.xpath('//td[contains(text(),"_parent.decimal")]/following-sibling::td[contains(text(),"1.1")]').should('exist');

        cy.xpath('//td[contains(text(),"_parent.integer")]/following-sibling::td[contains(text(),"1")]').should('exist');
        cy.xpath('//td[contains(text(),"_parent.node_id")]/following-sibling::td[contains(text(),"node")]').should('exist');

        cy.xpath('//td[contains(text(),"decimal")]/following-sibling::td[contains(text(),"12.2")]').should('exist');
        cy.xpath('//td[contains(text(),"integer")]/following-sibling::td[contains(text(),"4")]').should('exist');

        cy.xpath('//td[contains(text(),"loopCounter")]/following-sibling::td[contains(text(),"1")]').should('exist');
        cy.xpath('//td[contains(text(),"form_input_1")]/following-sibling::td[contains(text(),"test 1")]').should('exist');


        //Validate second subprocess
        //open subprocess
        cy.visit('/requests/'+requestID);
        cy.location('href').should('include', '/requests/'+requestID);

        cy.get('div[class="tab-content"] *>ul > li > div > a').eq(1).click();

        cy.get('table[role="table"]> tbody > tr').should('have.length', 20);

        cy.xpath('//td[contains(text(),"loop_1.0.form_input_1")]/following-sibling::td[contains(text(),"1B")]').should('exist');
        cy.xpath('//td[contains(text(),"loop_1.1.form_input_1")]/following-sibling::td[contains(text(),"2B")]').should('exist');

        cy.xpath('//td[contains(text(),"_parent.config.startEvent")]/following-sibling::td[contains(text(),"node")]').should('exist');
        cy.xpath('//td[contains(text(),"_parent.loop_1.0.form_input_1")]/following-sibling::td[contains(text(),"test 1")]').should('exist');

        cy.xpath('//td[contains(text(),"_parent.loop_1.1.form_input_1")]/following-sibling::td[contains(text(),"test 2")]').should('exist');
        cy.xpath('//td[contains(text(),"_parent.decimal")]/following-sibling::td[contains(text(),"1.1")]').should('exist');

        cy.xpath('//td[contains(text(),"_parent.integer")]/following-sibling::td[contains(text(),"1")]').should('exist');
        cy.xpath('//td[contains(text(),"_parent.node_id")]/following-sibling::td[contains(text(),"node")]').should('exist');

        cy.xpath('//td[contains(text(),"decimal")]/following-sibling::td[contains(text(),"10123.2")]').should('exist');
        cy.xpath('//td[contains(text(),"integer")]/following-sibling::td[contains(text(),"263")]').should('exist');

        cy.xpath('//td[contains(text(),"loopCounter")]/following-sibling::td[contains(text(),"2")]').should('exist');
        cy.xpath('//td[contains(text(),"form_input_1")]/following-sibling::td[contains(text(),"test 2")]').should('exist');
}


    actionsAndAssertionsOfTCP42332_4(requestID, processName, subprocessName){
        //Step 1: press + button on the loop control
        cy.get('button[title="Add Item"]').should('be.visible');
        cy.get('button[title="Add Item"]').click();
        cy.get('input[name="form_input_1"]').eq(0).type('test 1').should('have.value','test 1');
        cy.get('button[title="Add Item"]').click();
        cy.get('input[name="form_input_1"]').eq(1).type('test 2').should('have.value','test 2');
        cy.get('button[title="Add Item"]').click();
        cy.get('input[name="form_input_1"]').eq(2).type('test 3').should('have.value','test 3');

        //Step 2: fill line inputs
        cy.get('input[name="decimal"]').type('1.1').should('have.value','1.1');
        cy.get('input[name="integer"]').type('1').should('have.value','1');

        //press submit button
        cy.get('button[aria-label="New Submit"]').click();
        request.verifyTaskIsCompletedB();

        //Open Request
        navHelper.navigateToInprogressRequests();
        cy.visit('/requests/'+requestID);
        cy.location('href').should('include', '/requests/'+requestID);

        //Verify that 2 threads are displayed
        cy.get('div[class="tab-content"] *> ul > li > div > i').should('have.length',3);

        //Verify the process name according to Sub process
        cy.get('div[class="tab-content"] *> ul > li > div > a').eq(0).should('have.contain',subprocessName);
        cy.get('div[class="tab-content"] *> ul > li > div > a').eq(1).should('have.contain',subprocessName);
        cy.get('div[class="tab-content"] *> ul > li > div > a').eq(1).should('have.contain',subprocessName);

        //Open the first subprocess
        cy.get('div[class="tab-content"] *> ul > li > div > a').eq(0).click();

        //fill fields in the first subprocess
        request.waitUntilElementIsVisible('selector', '#pending >* td:nth-child(1) >a[href^="/tasks"]');
        request.clickOnTaskName(1, 1);

        // press + button on the loop control
        cy.get('button[title="Add Item"]').should('be.visible');
        cy.get('button[title="Add Item"]').click();
        cy.get('input[name="form_input_1"]').eq(0).type('test subprocess 1A').should('have.value','test subprocess 1A');
        cy.get('button[title="Add Item"]').click();
        cy.get('input[name="form_input_1"]').eq(1).type('test subprocess 2A').should('have.value','test subprocess 2A');

        cy.get('input[name="decimal"]').type('12.2');
        cy.get('input[name="integer"]').type('4');

        //press submit button
        cy.get('button[aria-label="New Submit"]').click();
        request.verifyTaskIsCompletedB();

        cy.visit('/requests/'+requestID);
        cy.location('href').should('include', '/requests/'+requestID);

        //Verify that 2 threads are displayed
        cy.get('div[class="tab-content"] *> ul > li > div > i').should('have.length',3);

        //Open the second subprocess
        cy.get('div[class="tab-content"] *> ul > li > div > a').eq(1).click();
        request.waitUntilElementIsVisible('selector', '#pending >* td:nth-child(1) >a[href^="/tasks"]');
        request.clickOnTaskName(1, 1);

        // press + button on the loop control
        cy.get('button[title="Add Item"]').should('be.visible');
        cy.get('button[title="Add Item"]').click();
        cy.get('input[name="form_input_1"]').eq(0).type('test subprocess 1B').should('have.value','test subprocess 1B');
        cy.get('button[title="Add Item"]').click();
        cy.get('input[name="form_input_1"]').eq(1).type('test subprocess 2B').should('have.value','test subprocess 2B');

        cy.get('input[name="decimal"]').type('10123.2');
        cy.get('input[name="integer"]').type('263');

        //press submit button to complete the request
        cy.get('button[aria-label="New Submit"]').click();
        request.verifyTaskIsCompletedB();

        cy.visit('/requests/'+requestID);
        cy.location('href').should('include', '/requests/'+requestID);

        //Verify that 2 threads are displayed
        cy.get('div[class="tab-content"] *> ul > li > div > i').should('have.length',3);

        //Open the third subprocess
        cy.get('div[class="tab-content"] *> ul > li > div > a').eq(2).click();
        request.waitUntilElementIsVisible('selector', '#pending >* td:nth-child(1) >a[href^="/tasks"]');
        request.clickOnTaskName(1, 1);

        // press + button on the loop control
        cy.get('button[title="Add Item"]').should('be.visible');
        cy.get('button[title="Add Item"]').click();
        cy.get('input[name="form_input_1"]').eq(0).type('test subprocess 1C').should('have.value','test subprocess 1C');
        cy.get('button[title="Add Item"]').click();
        cy.get('input[name="form_input_1"]').eq(1).type('test subprocess 2C').should('have.value','test subprocess 2C');

        cy.get('input[name="decimal"]').type('111.1');
        cy.get('input[name="integer"]').type('4546');

        //press submit button
        cy.get('button[aria-label="New Submit"]').click();
        request.verifyTaskIsCompletedB();

        cy.visit('/requests/'+requestID);
        cy.location('href').should('include', '/requests/'+requestID);

        //Verify the process name according to Sub process
        cy.get('div[class="tab-content"] *> ul > li > div > a').eq(0).should('have.contain',subprocessName);
        cy.get('div[class="tab-content"] *> ul > li > div > a').eq(1).should('have.contain',subprocessName);
        cy.get('div[class="tab-content"] *> ul > li > div > a').eq(1).should('have.contain',subprocessName);

        //Verify data in each row in the summary tab for the main process
        cy.get('table[role="table"]> tbody > tr').should('have.length', 20);

        cy.xpath('//td[contains(text(),"loop_1.0.loop_1.0.form_input_1")]/following-sibling::td[contains(text(),"1A")]').should('exist');
        cy.xpath('//td[contains(text(),"loop_1.0.loop_1.1.form_input_1")]/following-sibling::td[contains(text(),"2A")]').should('exist');

        cy.xpath('//td[contains(text(),"loop_1.0.decimal")]/following-sibling::td[contains(text(),"12.2")]').should('exist');
        cy.xpath('//td[contains(text(),"loop_1.0.integer")]/following-sibling::td[contains(text(),"4")]').should('exist');

        cy.xpath('//td[contains(text(),"loop_1.0.loopCounter")]/following-sibling::td[contains(text(),"1")]').should('exist');
        cy.xpath('//td[contains(text(),"loop_1.0.form_input_1")]/following-sibling::td[contains(text(),"test 1")]').should('exist');

        cy.xpath('//td[contains(text(),"loop_1.1.loop_1.0.form_input_1")]/following-sibling::td[contains(text(),"1B")]').should('exist');
        cy.xpath('//td[contains(text(),"loop_1.1.loop_1.1.form_input_1")]/following-sibling::td[contains(text(),"2B")]').should('exist');

        cy.xpath('//td[contains(text(),"loop_1.1.decimal")]/following-sibling::td[contains(text(),"10123")]').should('exist');
        cy.xpath('//td[contains(text(),"loop_1.1.integer")]/following-sibling::td[contains(text(),"263")]').should('exist');

        cy.xpath('//td[contains(text(),"loop_1.1.loopCounter")]/following-sibling::td[contains(text(),"2")]').should('exist');
        cy.xpath('//td[contains(text(),"loop_1.1.form_input_1")]/following-sibling::td[contains(text(),"test 2")]').should('exist');

        cy.xpath('//td[contains(text(),"loop_1.2.loop_1.0.form_input_1")]/following-sibling::td[contains(text(),"1C")]').should('exist');
        cy.xpath('//td[contains(text(),"loop_1.2.loop_1.1.form_input_1")]/following-sibling::td[contains(text(),"2C")]').should('exist');

        cy.xpath('//td[contains(text(),"loop_1.2.decimal")]/following-sibling::td[contains(text(),"111.1")]').should('exist');
        cy.xpath('//td[contains(text(),"loop_1.2.integer")]/following-sibling::td[contains(text(),"4546")]').should('exist');

        cy.xpath('//td[contains(text(),"loop_1.2.loopCounter")]/following-sibling::td[contains(text(),"3")]').should('exist');
        cy.xpath('//td[contains(text(),"loop_1.2.form_input_1")]/following-sibling::td[contains(text(),"test 3")]').should('exist');

        cy.xpath('//td[contains(text(),"decimal")]/following-sibling::td[contains(text(),"1.1")]').should('exist');
        cy.xpath('//td[contains(text(),"integer")]/following-sibling::td[contains(text(),"1")]').should('exist');


        // //Validate the first subprocess
        // //open subprocess
        // cy.get('div[class="card"] > ul > li > div > a').eq(0).click();
        //
        // //Validate first subprocess status
        // cy.get('div[class="card"] > div > h4').should('have.text', 'Completed');
        //
        // cy.get('tbody[role="rowgroup"] > tr').should('have.length', 21)
        // cy.get('tbody[role="rowgroup"] > tr').eq(0).find('td').eq(0).should('have.text','loop_1.0.form_input_1')
        // cy.get('tbody[role="rowgroup"] > tr').eq(0).find('td').eq(1).should('have.text','test subprocess 1A')
        //
        // cy.get('tbody[role="rowgroup"] > tr').eq(1).find('td').eq(0).should('have.text','loop_1.1.form_input_1')
        // cy.get('tbody[role="rowgroup"] > tr').eq(1).find('td').eq(1).should('have.text','test subprocess 2A')
        //
        // cy.get('tbody[role="rowgroup"] > tr').eq(2).find('td').eq(0).should('have.text','_parent.config.name')
        // cy.get('tbody[role="rowgroup"] > tr').eq(2).find('td').eq(1).should('have.contain',subprocessName);
        //
        // cy.get('tbody[role="rowgroup"] > tr').eq(3).find('td').eq(0).should('have.text','_parent.config.processId')
        // cy.get('tbody[role="rowgroup"] > tr').eq(3).find('td').eq(1).should('have.text',subprocess_id)
        //
        // cy.get('tbody[role="rowgroup"] > tr').eq(4).find('td').eq(0).should('have.text','_parent.config.startEvent')
        // cy.get('tbody[role="rowgroup"] > tr').eq(4).find('td').eq(1).should('have.text','node_1')
        //
        // cy.get('tbody[role="rowgroup"] > tr').eq(5).find('td').eq(0).should('have.text','_parent.config.calledElement')
        // cy.get('tbody[role="rowgroup"] > tr').eq(5).find('td').eq(1).should('have.text','ProcessId-'+subprocess_id)
        //
        // cy.get('tbody[role="rowgroup"] > tr').eq(6).find('td').eq(0).should('have.text','_parent.loop_1.0.form_input_1')
        // cy.get('tbody[role="rowgroup"] > tr').eq(6).find('td').eq(1).should('have.text','test 1')
        //
        // cy.get('tbody[role="rowgroup"] > tr').eq(7).find('td').eq(0).should('have.text','_parent.loop_1.1.form_input_1')
        // cy.get('tbody[role="rowgroup"] > tr').eq(7).find('td').eq(1).should('have.text','test 2')
        //
        // cy.get('tbody[role="rowgroup"] > tr').eq(8).find('td').eq(0).should('have.text','_parent.loop_1.2.form_input_1')
        // cy.get('tbody[role="rowgroup"] > tr').eq(8).find('td').eq(1).should('have.text','test 3')
        //
        // cy.get('tbody[role="rowgroup"] > tr').eq(9).find('td').eq(0).should('have.text','_parent.decimal')
        // cy.get('tbody[role="rowgroup"] > tr').eq(9).find('td').eq(1).should('have.text','1.1')
        //
        // cy.get('tbody[role="rowgroup"] > tr').eq(10).find('td').eq(0).should('have.text','_parent.integer')
        // cy.get('tbody[role="rowgroup"] > tr').eq(10).find('td').eq(1).should('have.text','1')
        //
        // cy.get('tbody[role="rowgroup"] > tr').eq(11).find('td').eq(0).should('have.text','_parent.node_id')
        // cy.get('tbody[role="rowgroup"] > tr').eq(11).find('td').eq(1).should('have.text','node_19')
        //
        // cy.get('tbody[role="rowgroup"] > tr').eq(12).find('td').eq(0).should('have.text','_parent.process_id')
        // cy.get('tbody[role="rowgroup"] > tr').eq(12).find('td').eq(1).should('have.text',process_id)
        //
        // cy.get('tbody[role="rowgroup"] > tr').eq(13).find('td').eq(0).should('have.text','_parent.request_id')
        // cy.get('tbody[role="rowgroup"] > tr').eq(13).find('td').eq(1).should('have.text',requestID)
        //
        // cy.get('tbody[role="rowgroup"] > tr').eq(14).find('td').eq(0).should('have.text','decimal')
        // cy.get('tbody[role="rowgroup"] > tr').eq(14).find('td').eq(1).should('have.text','12.2')
        //
        // cy.get('tbody[role="rowgroup"] > tr').eq(15).find('td').eq(0).should('have.text','integer')
        // cy.get('tbody[role="rowgroup"] > tr').eq(15).find('td').eq(1).should('have.text','4')
        //
        // cy.get('tbody[role="rowgroup"] > tr').eq(16).find('td').eq(0).should('have.text','loopCounter')
        // cy.get('tbody[role="rowgroup"] > tr').eq(16).find('td').eq(1).should('have.text','1')
        //
        // cy.get('tbody[role="rowgroup"] > tr').eq(17).find('td').eq(0).should('have.text','form_input_1')
        // cy.get('tbody[role="rowgroup"] > tr').eq(17).find('td').eq(1).should('have.text','test 1')
        //
        // cy.get('tbody[role="rowgroup"] > tr').eq(18).find('td').eq(0).should('have.text','numberOfInstances')
        // cy.get('tbody[role="rowgroup"] > tr').eq(18).find('td').eq(1).should('have.text','3')
        //
        // cy.get('tbody[role="rowgroup"] > tr').eq(19).find('td').eq(0).should('have.text','numberOfActiveInstances')
        // cy.get('tbody[role="rowgroup"] > tr').eq(19).find('td').eq(1).should('have.text','3')
        //
        // cy.get('tbody[role="rowgroup"] > tr').eq(20).find('td').eq(0).should('have.text','numberOfCompletedInstances')
        // cy.get('tbody[role="rowgroup"] > tr').eq(20).find('td').eq(1).should('have.text','0')
        //
        // //Return to main process
        // cy.get('div[class="card"] > ul > li > a').should('have.contain',processName)
        // cy.get('div[class="card"] > ul > li > a').click();
        //
        // //Validate second subprocess
        // //open subprocess
        // cy.get('div[class="card"] > ul > li > div > a').eq(1).click();
        //
        // //Validate second subprocess status
        // cy.get('div[class="card"] > div > h4').should('have.text', 'Completed');
        //
        // cy.get('tbody[role="rowgroup"] > tr').should('have.length', 21)
        // cy.get('tbody[role="rowgroup"] > tr').eq(0).find('td').eq(0).should('have.text','loop_1.0.form_input_1')
        // cy.get('tbody[role="rowgroup"] > tr').eq(0).find('td').eq(1).should('have.text','test subprocess 1B')
        //
        // cy.get('tbody[role="rowgroup"] > tr').eq(1).find('td').eq(0).should('have.text','loop_1.1.form_input_1')
        // cy.get('tbody[role="rowgroup"] > tr').eq(1).find('td').eq(1).should('have.text','test subprocess 2B')
        //
        // cy.get('tbody[role="rowgroup"] > tr').eq(2).find('td').eq(0).should('have.text','_parent.config.name')
        // cy.get('tbody[role="rowgroup"] > tr').eq(2).find('td').eq(1).should('have.contain',subprocessName);
        //
        // cy.get('tbody[role="rowgroup"] > tr').eq(3).find('td').eq(0).should('have.text','_parent.config.processId')
        // cy.get('tbody[role="rowgroup"] > tr').eq(3).find('td').eq(1).should('have.text',subprocess_id)
        //
        // cy.get('tbody[role="rowgroup"] > tr').eq(4).find('td').eq(0).should('have.text','_parent.config.startEvent')
        // cy.get('tbody[role="rowgroup"] > tr').eq(4).find('td').eq(1).should('have.text','node_1')
        //
        // cy.get('tbody[role="rowgroup"] > tr').eq(5).find('td').eq(0).should('have.text','_parent.config.calledElement')
        // cy.get('tbody[role="rowgroup"] > tr').eq(5).find('td').eq(1).should('have.text','ProcessId-'+subprocess_id)
        //
        // cy.get('tbody[role="rowgroup"] > tr').eq(6).find('td').eq(0).should('have.text','_parent.loop_1.0.form_input_1')
        // cy.get('tbody[role="rowgroup"] > tr').eq(6).find('td').eq(1).should('have.text','test 1')
        //
        // cy.get('tbody[role="rowgroup"] > tr').eq(7).find('td').eq(0).should('have.text','_parent.loop_1.1.form_input_1')
        // cy.get('tbody[role="rowgroup"] > tr').eq(7).find('td').eq(1).should('have.text','test 2')
        //
        // cy.get('tbody[role="rowgroup"] > tr').eq(8).find('td').eq(0).should('have.text','_parent.loop_1.2.form_input_1')
        // cy.get('tbody[role="rowgroup"] > tr').eq(8).find('td').eq(1).should('have.text','test 3')
        //
        // cy.get('tbody[role="rowgroup"] > tr').eq(9).find('td').eq(0).should('have.text','_parent.decimal')
        // cy.get('tbody[role="rowgroup"] > tr').eq(9).find('td').eq(1).should('have.text','1.1')
        //
        // cy.get('tbody[role="rowgroup"] > tr').eq(10).find('td').eq(0).should('have.text','_parent.integer')
        // cy.get('tbody[role="rowgroup"] > tr').eq(10).find('td').eq(1).should('have.text','1')
        //
        // cy.get('tbody[role="rowgroup"] > tr').eq(11).find('td').eq(0).should('have.text','_parent.node_id')
        // cy.get('tbody[role="rowgroup"] > tr').eq(11).find('td').eq(1).should('have.text','node_19')
        //
        // cy.get('tbody[role="rowgroup"] > tr').eq(12).find('td').eq(0).should('have.text','_parent.process_id')
        // cy.get('tbody[role="rowgroup"] > tr').eq(12).find('td').eq(1).should('have.text',process_id)
        //
        // cy.get('tbody[role="rowgroup"] > tr').eq(13).find('td').eq(0).should('have.text','_parent.request_id')
        // cy.get('tbody[role="rowgroup"] > tr').eq(13).find('td').eq(1).should('have.text',requestID)
        //
        // cy.get('tbody[role="rowgroup"] > tr').eq(14).find('td').eq(0).should('have.text','decimal')
        // cy.get('tbody[role="rowgroup"] > tr').eq(14).find('td').eq(1).should('have.text','10123.2')
        //
        // cy.get('tbody[role="rowgroup"] > tr').eq(15).find('td').eq(0).should('have.text','integer')
        // cy.get('tbody[role="rowgroup"] > tr').eq(15).find('td').eq(1).should('have.text','263')
        //
        // cy.get('tbody[role="rowgroup"] > tr').eq(16).find('td').eq(0).should('have.text','loopCounter')
        // cy.get('tbody[role="rowgroup"] > tr').eq(16).find('td').eq(1).should('have.text','2')
        //
        // cy.get('tbody[role="rowgroup"] > tr').eq(17).find('td').eq(0).should('have.text','form_input_1')
        // cy.get('tbody[role="rowgroup"] > tr').eq(17).find('td').eq(1).should('have.text','test 2')
        //
        // cy.get('tbody[role="rowgroup"] > tr').eq(18).find('td').eq(0).should('have.text','numberOfInstances')
        // cy.get('tbody[role="rowgroup"] > tr').eq(18).find('td').eq(1).should('have.text','3')
        //
        // cy.get('tbody[role="rowgroup"] > tr').eq(19).find('td').eq(0).should('have.text','numberOfActiveInstances')
        // cy.get('tbody[role="rowgroup"] > tr').eq(19).find('td').eq(1).should('have.text','3')
        //
        // cy.get('tbody[role="rowgroup"] > tr').eq(20).find('td').eq(0).should('have.text','numberOfCompletedInstances')
        // cy.get('tbody[role="rowgroup"] > tr').eq(20).find('td').eq(1).should('have.text','0')
        //
        // //Return to main process
        // cy.get('div[class="card"] > ul > li > a').should('have.contain',processName)
        // cy.get('div[class="card"] > ul > li > a').click();
        //
        // //Validate third subprocess
        // //open subprocess
        // cy.get('div[class="card"] > ul > li > div > a').eq(2).click();
        //
        // //Validate third subprocess status
        // cy.get('div[class="card"] > div > h4').should('have.text', 'Completed');
        //
        // cy.get('tbody[role="rowgroup"] > tr').should('have.length', 21)
        // cy.get('tbody[role="rowgroup"] > tr').eq(0).find('td').eq(0).should('have.text','loop_1.0.form_input_1')
        // cy.get('tbody[role="rowgroup"] > tr').eq(0).find('td').eq(1).should('have.text','test subprocess 1C')
        //
        // cy.get('tbody[role="rowgroup"] > tr').eq(1).find('td').eq(0).should('have.text','loop_1.1.form_input_1')
        // cy.get('tbody[role="rowgroup"] > tr').eq(1).find('td').eq(1).should('have.text','test subprocess 2C')
        //
        // cy.get('tbody[role="rowgroup"] > tr').eq(2).find('td').eq(0).should('have.text','_parent.config.name')
        // cy.get('tbody[role="rowgroup"] > tr').eq(2).find('td').eq(1).should('have.contain',subprocessName)
        //
        // cy.get('tbody[role="rowgroup"] > tr').eq(3).find('td').eq(0).should('have.text','_parent.config.processId')
        // cy.get('tbody[role="rowgroup"] > tr').eq(3).find('td').eq(1).should('have.contain',subprocess_id);
        //
        // cy.get('tbody[role="rowgroup"] > tr').eq(4).find('td').eq(0).should('have.text','_parent.config.startEvent')
        // cy.get('tbody[role="rowgroup"] > tr').eq(4).find('td').eq(1).should('have.text','node_1')
        //
        // cy.get('tbody[role="rowgroup"] > tr').eq(5).find('td').eq(0).should('have.text','_parent.config.calledElement')
        // cy.get('tbody[role="rowgroup"] > tr').eq(5).find('td').eq(1).should('have.text','ProcessId-'+subprocess_id)
        //
        // cy.get('tbody[role="rowgroup"] > tr').eq(6).find('td').eq(0).should('have.text','_parent.loop_1.0.form_input_1')
        // cy.get('tbody[role="rowgroup"] > tr').eq(6).find('td').eq(1).should('have.text','test 1')
        //
        // cy.get('tbody[role="rowgroup"] > tr').eq(7).find('td').eq(0).should('have.text','_parent.loop_1.1.form_input_1')
        // cy.get('tbody[role="rowgroup"] > tr').eq(7).find('td').eq(1).should('have.text','test 2')
        //
        // cy.get('tbody[role="rowgroup"] > tr').eq(8).find('td').eq(0).should('have.text','_parent.loop_1.2.form_input_1')
        // cy.get('tbody[role="rowgroup"] > tr').eq(8).find('td').eq(1).should('have.text','test 3')
        //
        // cy.get('tbody[role="rowgroup"] > tr').eq(9).find('td').eq(0).should('have.text','_parent.decimal')
        // cy.get('tbody[role="rowgroup"] > tr').eq(9).find('td').eq(1).should('have.text','1.1')
        //
        // cy.get('tbody[role="rowgroup"] > tr').eq(10).find('td').eq(0).should('have.text','_parent.integer')
        // cy.get('tbody[role="rowgroup"] > tr').eq(10).find('td').eq(1).should('have.text','1')
        //
        // cy.get('tbody[role="rowgroup"] > tr').eq(11).find('td').eq(0).should('have.text','_parent.node_id')
        // cy.get('tbody[role="rowgroup"] > tr').eq(11).find('td').eq(1).should('have.text','node_19')
        //
        // cy.get('tbody[role="rowgroup"] > tr').eq(12).find('td').eq(0).should('have.text','_parent.process_id')
        // cy.get('tbody[role="rowgroup"] > tr').eq(12).find('td').eq(1).should('have.text',process_id)
        //
        // cy.get('tbody[role="rowgroup"] > tr').eq(13).find('td').eq(0).should('have.text','_parent.request_id')
        // cy.get('tbody[role="rowgroup"] > tr').eq(13).find('td').eq(1).should('have.text',requestID)
        //
        // cy.get('tbody[role="rowgroup"] > tr').eq(14).find('td').eq(0).should('have.text','decimal')
        // cy.get('tbody[role="rowgroup"] > tr').eq(14).find('td').eq(1).should('have.text','111.1')
        //
        // cy.get('tbody[role="rowgroup"] > tr').eq(15).find('td').eq(0).should('have.text','integer')
        // cy.get('tbody[role="rowgroup"] > tr').eq(15).find('td').eq(1).should('have.text','4546')
        //
        // cy.get('tbody[role="rowgroup"] > tr').eq(16).find('td').eq(0).should('have.text','loopCounter')
        // cy.get('tbody[role="rowgroup"] > tr').eq(16).find('td').eq(1).should('have.text','3')
        //
        // cy.get('tbody[role="rowgroup"] > tr').eq(17).find('td').eq(0).should('have.text','form_input_1')
        // cy.get('tbody[role="rowgroup"] > tr').eq(17).find('td').eq(1).should('have.text','test 3')
        //
        // cy.get('tbody[role="rowgroup"] > tr').eq(18).find('td').eq(0).should('have.text','numberOfInstances')
        // cy.get('tbody[role="rowgroup"] > tr').eq(18).find('td').eq(1).should('have.text','3')
        //
        // cy.get('tbody[role="rowgroup"] > tr').eq(19).find('td').eq(0).should('have.text','numberOfActiveInstances')
        // cy.get('tbody[role="rowgroup"] > tr').eq(19).find('td').eq(1).should('have.text','3')
        //
        // cy.get('tbody[role="rowgroup"] > tr').eq(20).find('td').eq(0).should('have.text','numberOfCompletedInstances')
        // cy.get('tbody[role="rowgroup"] > tr').eq(20).find('td').eq(1).should('have.text','0')
}
//////////////////////

    verifyRichTextTCP42310(requestId){
        //Step 1: Complete the form 1
        cy.get('[data-cy="screen-field-input"]').should('be.visible');
        cy.get('[data-cy="screen-field-input"]').type('test1');
        cy.get(':nth-child(3) > .form-group > :nth-child(1) > div > p').should('have.text','test1');
        cy.xpath('//*[contains(text(),"New Submit")]').first().click();
        request.verifyTaskIsCompletedB();

        //Step 2: Complete the manual task 1
        cy.visit('/requests/' + requestId);
        request.waitUntilElementIsVisible('selector', '#pending >* td:nth-child(1) >a[href^="/tasks"]');
        request.clickOnTaskName(1, 1);
        cy.get(':nth-child(3) > .form-group > :nth-child(1) > div > p').should('have.text','test1');
        cy.get('.card-footer > .btn').click();
        request.verifyTaskIsCompletedB();

        //Step 3: Complete the conversational form
        cy.visit('/requests/' + requestId);
        request.waitUntilElementIsVisible('selector', '#pending >* td:nth-child(1) >a[href^="/tasks"]');
        request.clickOnTaskName(1, 1);
        cy.get(':nth-child(3) > .message > div > span > p').should('have.text','test1');
        cy.xpath('//button[@aria-label="Submit"]').click();
        request.verifyTaskIsCompletedB();
    }

    verifySelectListValuesTCP42325(requestId){
        //Step 1: Select list
        cy.xpath("//label[text()='New Select List']/parent::div//div[@class='multiselect__tags']").should('be.visible');
        cy.xpath("//label[text()='New Select List']/parent::div//div[@class='multiselect__tags']").click();
        cy.xpath("//label[text()='New Select List']/parent::div//input").type("Uno");
        cy.wait(2000);
        cy.xpath("//label[text()='New Select List']/parent::div//input").type('{enter}');
        cy.get('[data-cy="screen-field-form_select_list_1.content"]').should('have.value', 'Uno');

        cy.xpath("//label[text()='New Select List']/parent::div//div[@class='multiselect__tags']").click();
        cy.xpath("//label[text()='New Select List']/parent::div//input").type("Dos");
        cy.wait(2000);
        cy.xpath("//label[text()='New Select List']/parent::div//input").type('{enter}');
        cy.get('[data-cy="screen-field-form_select_list_1.content"]').should('have.value', 'Dos');

        cy.xpath("//label[text()='New Select List']/parent::div//div[@class='multiselect__tags']").click();
        cy.xpath("//label[text()='New Select List']/parent::div//input").type("Tres");
        cy.wait(2000);
        cy.xpath("//label[text()='New Select List']/parent::div//input").type('{enter}');
        cy.get('[data-cy="screen-field-form_select_list_1.content"]').should('have.value', 'Tres');

        //Step 2: Submit
        cy.xpath("//button[contains(text(),'New Submit')]").should('be.visible').click();
        request.verifyTaskIsCompletedB();

        //Step 3: Open the request
        cy.visit('/requests/' + requestId);
        request.waitUntilElementIsVisible('selector', '#pending >* td:nth-child(1) >a[href^="/tasks"]');
        request.clickOnTaskName(1, 1);

        //Step 4: Complete task 2
        cy.get('[data-cy="screen-field-form_select_list_1.content"]').should('have.value', 'Tres');
        cy.xpath("//button[contains(text(),'New Submit')]").should('be.visible').click();
        request.verifyTaskIsCompletedB();

        //Review Summary
        cy.get('[id="summary-tab"]').should('be.visible').click();
        cy.get('[id="completed-tab"]').should('be.visible').click();
    }
    actionsTCP42345(example){
        //Step 1: Complete the form 1 by WE
        cy.get('[data-cy="screen-field-form_checkbox_1"]').should('be.visible');
        cy.get('[data-cy="screen-field-form_checkbox_1"]').click();
        cy.get('[data-cy="screen-field-form_input_1"]').should('be.visible');
        cy.get('[data-cy="screen-field-form_input_1"]').type('example').should('have.value', 'example');
        cy.get('div[class="multiselect__select"]').should('be.visible');
        cy.get('div[class="multiselect__select"]').first().click();
        cy.get('ul[id="listbox-0"] > li[id="option-0-1"]').click();
        cy.get('[name="form_text_area_1"]').should('be.visible').type('example');
        cy.get('[class="btn btn-secondary text-white"]').should('be.visible');
        const file = 'drone.jpg';
        cy.get('input[data-cy="file-upload-button"]').attachFile(file);
        cy.get('div[class="uploader-file-status"] > span').should('contain.text','success');

        //Step 2: Submit the form
        cy.get('button[aria-label="New Submit"]').click();
        cy.get('[name=request-id]').invoke('attr', 'content').should('not.be.empty');
        cy.get("[name='request-id']").invoke('attr', 'content').then((requestId)=>{

            //Step 3: Complete the form by WE task
            cy.get('[data-cy="screen-field-form_checkbox_1"]').should('be.visible');
            cy.get('[data-cy="screen-field-form_input_1"]').should('be.visible').should('have.value', 'example');
            cy.get('.form-control-file > .btn').should('be.visible');
            cy.get('[name="form_text_area_1"]').should('be.visible');
            cy.get('[class="btn btn-secondary text-white"]').should('be.visible');
            cy.get('.form-group > .btn').click();
            request.verifyTaskIsCompletedB();

            //Step 4: Log in to PM4
            login.navigateToUrl();
            login.login();

            //Step 5: Open the Second Task
            cy.visit('/requests/'+requestId);
            request.waitUntilElementIsVisible('selector','#pending >* td:nth-child(1) >a[href^="/tasks"]');
            request.clickOnTaskName(1, 1);

            //Validation 1: Verify data
            cy.get('[data-cy="screen-field-form_checkbox_1"]').should('be.visible');
            cy.get('[data-cy="screen-field-form_input_1"]').should('be.visible').should('have.value', 'example');
            cy.get('.form-control-file > .btn').should('be.visible');
            cy.get('[name="form_text_area_1"]').should('be.visible');
            cy.get('input[class="form-control pac-target-input"]').should('be.visible');
            cy.get('button[aria-label="New Submit"]').click();
            request.verifyTaskIsCompletedB();
        });
    }

    configProcessTCP4_2332(subProcessName,subProcessFilePath,mainProcessName, mainProcessFilePath){
        navHelper.navigateToProcessPage();
        var editBtn = "[title='Edit'] > .fas";
        cy.get(editBtn).should('be.visible');
        cy.get('#processIndex > #search-bar > :nth-child(1) > .flex-grow-1 > #search > .input-group > #search-box').type(subProcessName);
        cy.get('#processIndex > div.container-fluid > div > div.jumbotron.jumbotron-fluid').should('be.visible');
        cy.get('#processIndex > div.container-fluid > div > div.jumbotron.jumbotron-fluid').should('not.be.visible');
        var selectors_processTable = '//div[@id="processIndex"]/div[2]/div/div[2]/table/tbody/tr';

        //Import subprocess
        cy.xpath(selectors_processTable, { timeout: 10000 })
        .find('td')
        .then(($loadedTable) => {
            if($loadedTable.length === 1){
                //Import subprocess
                process.importProcess(subProcessFilePath);

                //Config process
                //start event
                cy.xpath('//strong[text()="Start Event"]/ancestor::tr//div[@class="multiselect__select"]').click();
                cy.xpath('//strong[text()="Start Event"]/ancestor::tr//div[@class="multiselect__tags"]/input').type('Admin User',{timeout:20000});
                cy.xpath('//strong[text()="Start Event"]/ancestor::tr//div[@class="multiselect__tags"]/input').type('{enter}',{delay:30});
                //cy.xpath('//strong[text()="Start Event"]/ancestor::tr//div[@class="multiselect__content-wrapper"]/ul/li[@aria-label="Admin User. "]').should('be.visible').click();
                cy.xpath('//strong[text()="Start Event"]/ancestor::tr//div[@class="multiselect__tags"]/span[@class="multiselect__single"]').should('contain.text',"Admin User");


                //Process Manager
                cy.xpath('//strong[text()="Process Manager"]/ancestor::tr//div[@class="multiselect__select"]').click();
                cy.xpath('//strong[text()="Process Manager"]/ancestor::tr//div[@class="multiselect__tags"]/input').type('Admin User',{timeout:20000})
                cy.xpath('//strong[text()="Process Manager"]/ancestor::tr//div[@class="multiselect__tags"]/input').type('{enter}',{delay:30});
                //cy.xpath('//strong[text()="Process Manager"]/ancestor::tr//div[@class="multiselect__content-wrapper"]').should('have.css','display');
                //cy.xpath('//strong[text()="Process Manager"]/ancestor::tr//div[@class="multiselect__content-wrapper"]/ul/li[@aria-label="Admin User. "]').should('be.visible').click();
                cy.xpath('//strong[text()="Process Manager"]/ancestor::tr//div[@class="multiselect__tags"]/span[@class="multiselect__single"]').should('contain.text',"Admin User");


                //cy.get('div[class="multiselect__tags"]').eq(1).click();
                //cy.get('div[class="multiselect__tags"] > input').eq(1).type('Admin User');
                //cy.get('div > ul[role="listbox"] > li[id="option-1-0"]').should('have.attr',"aria-label","Admin User. ").click();

                //Cancel Request
                cy.get('div[class="multiselect__tags"]').eq(2).click();
                cy.get('div[class="multiselect__tags"]').eq(2).type('Admin User');
                cy.get('div > ul[role="listbox"] > li[id="option-2-2"]').should('have.attr',"aria-label","Admin User. ").click();

                //Edit Data
                cy.get('div[class="multiselect__tags"]').eq(3).click();
                cy.get('div[class="multiselect__tags"]').eq(3).type('Admin User');
                cy.get('div > ul[role="listbox"] > li[id="option-3-1"]').should('have.attr',"aria-label","Admin User. ").click();
                cy.wait(5000);
                //Press Save button
                cy.get('div[id="card-footer-post-import"] > div > button').click();
            }
        });

        navHelper.navigateToProcessPage();
        var editBtn = "[title='Edit'] > .fas";
        cy.get(editBtn).should('be.visible');
        cy.get('#processIndex > #search-bar > :nth-child(1) > .flex-grow-1 > #search > .input-group > #search-box').type(mainProcessName);
        cy.get('#processIndex > div.container-fluid > div > div.jumbotron.jumbotron-fluid').should('be.visible');
        cy.get('#processIndex > div.container-fluid > div > div.jumbotron.jumbotron-fluid').should('not.be.visible');

         //Import Main process
         cy.xpath(selectors_processTable, { timeout: 10000 })
         .find('td')
         .then(($loadedTable) => {
             if($loadedTable.length === 1){
                 process.importProcess(mainProcessFilePath);

                 //Config process
                 //start event
                 cy.get('div[class="multiselect__tags"]').eq(0).click();
                 cy.get('div[class="multiselect__tags"]').eq(0).type('Admin User');
                 cy.get('div > ul[role="listbox"] > li[id="option-0-1"]').should('have.attr',"aria-label","Admin User. ").click();

                 //Assign subprocess to Form Task 2
                 cy.get('div[class="multiselect__tags"]').eq(1).click();
                 cy.get('div[class="multiselect__tags"]').eq(1).type(subProcessName);
                 cy.get('div > ul[role="listbox"] > li[id="option-1-0"] > span > span').should('contain.text',subProcessName).click();

                 //Process Manager
                 cy.get('div[class="multiselect__tags"]').eq(2).click();
                 cy.get('div[class="multiselect__tags"]').eq(2).type('Admin User');
                 cy.get('div > ul[role="listbox"] > li[id="option-2-0"]').should('have.attr',"aria-label","Admin User. ").click();

                 //Cancel Request
                 cy.get('div[class="multiselect__tags"]').eq(3).click();
                 cy.get('div[class="multiselect__tags"]').eq(3).type('Admin User');
                 cy.get('div > ul[role="listbox"] > li[id="option-3-2"]').should('have.attr',"aria-label","Admin User. ").click();

                 //Edit Data
                 cy.get('div[class="multiselect__tags"]').eq(4).click();
                 cy.get('div[class="multiselect__tags"]').eq(4).type('Admin User');
                 cy.get('div > ul[role="listbox"] > li[id="option-4-1"]').should('have.attr',"aria-label","Admin User. ").click();

                 cy.wait(5000);

                 //Press Save button
                 cy.get('div[id="card-footer-post-import"] > div > button').click();

                 ///////////////////////////////////////////////////
                 //Main Process is configurated with a sub-process//
                 ///////////////////////////////////////////////////
                 navHelper.navigateToProcessPage();
                 process.searchForProcess(mainProcessName);

                 //Assign subprocess
                 cy.get('text[joint-selector="label"] > tspan').eq(3).click();
                 cy.get('div[class="multiselect__tags"]').eq(0).click();
                 cy.get('div[class="multiselect__tags"]').eq(0).type(subProcessName);
                 cy.wait(2000);
                 cy.get('div[role="combobox"] > div > ul[role="listbox"] > li[id="option-0-0"] > span > span').should('contain.text',subProcessName);
                 cy.get('div[role="combobox"] > div > ul[role="listbox"] > li[id="option-0-0"] > span > span').click();
                 cy.wait(3000);
                 cy.get('text[joint-selector="label"] > tspan').eq(2).click();

                 //save process
                 cy.get('button[title="Save"]').click();
                 cy.get('div[class="modal-content"] > div > div[class="modal-footer"] > button').should('be.visible');
                 cy.get('div[class="modal-content"] > div > div[class="modal-footer"] > button').eq(1).click();
             }
         });
    }

    verifyDashboardWithUser(Dashboard, linkName) {
        cy.get("strong").should("contain", Dashboard);
        cy.get('[style="z-index: 100;"] > .nav-item > .nav-link').should(
            "contain",
            linkName
        );
    }

    actionsAndAssertionsOfTCP42295(requestId,processName){
        cy.get('[class="card card-body border-top-0 h-100 form-screen"]').should('be.visible');
        //Select names
        cy.get('div[class="multiselect__select"]').eq(0).click();
        cy.get('li[aria-label="carlos. "] > span > span').should("contain.text", "carlos").click();
        cy.get('div[class="multiselect__select"]').eq(0).click();
        cy.get('li[aria-label="maria. "] > span > span').should('contain.text',"maria").click();
        cy.get('div[class="multiselect__select"]').eq(0).click();
        cy.get('li[aria-label="ada. "] > span > span').should('contain.text',"ada").click();
        cy.get('div[class="multiselect__select"]').eq(0).click();
        cy.get('li[aria-label="abed. "] > span > span').should('contain.text',"abed").click();
        cy.get('div[class="multiselect__select"]').eq(1).click();
        cy.get('li[aria-label="carla. "] > span > span').should('contain.text',"carla").click();
        cy.get('div[class="multiselect__select"]').eq(1).click();
        cy.get('li[aria-label="andres. "] > span > span').should('contain.text',"andres").click();
        cy.get('div[class="multiselect__select"]').eq(1).click();
        cy.get('li[aria-label="keila. "] > span > span').should("contain.text", "keila").click();
        //Complete Record List
        cy.get('button[data-cy="add-row"]').should('contain.text',"Add").click();
        cy.get('input[data-cy="screen-field-option"]').eq(0).type("Spain");
        cy.xpath("//button[contains(text(),'Ok')]").click();
        cy.get('button[data-cy="add-row"]').should('contain.text',"Add").click();
        cy.get('input[data-cy="screen-field-option"]').eq(0).type("Italy");
        cy.xpath("//button[contains(text(),'Ok')]").click();
        cy.get('button[data-cy="add-row"]').should('contain.text',"Add").click();
        cy.get('input[data-cy="screen-field-option"]').eq(0).type("Portugal");
        cy.xpath("//button[contains(text(),'Ok')]").click();
        cy.get('button[data-cy="add-row"]').should('contain.text',"Add").click();
        cy.get('input[data-cy="screen-field-option"]').eq(0).type("Ireland");
        cy.xpath("//button[contains(text(),'Ok')]").click();
        cy.get('button[data-cy="add-row"]').should('contain.text',"Add").click();
        cy.get('input[data-cy="screen-field-option"]').eq(0).type("Belgium");
        cy.xpath("//button[contains(text(),'Ok')]").click();
        cy.get('button[data-cy="add-row"]').should('contain.text',"Add").click();
        cy.get('input[data-cy="screen-field-option"]').eq(0).type("Greece");
        cy.xpath("//button[contains(text(),'Ok')]").click();
        cy.get('button[data-cy="add-row"]').should('contain.text',"Add").click();
        cy.get('input[data-cy="screen-field-option"]').eq(0).type("Moldova");
        cy.xpath("//button[contains(text(),'Ok')]").click();
        cy.get('button[data-cy="add-row"]').should('contain.text',"Add").click();
        cy.get('input[data-cy="screen-field-option"]').eq(0).type("Cyprus");
        cy.xpath("//button[contains(text(),'Ok')]").click();
        //Submit
        cy.xpath("//button[contains(text(),'Submit')]").scrollIntoView().click();
        cy.wait(2000);
        //Complete task B
        cy.visit('/requests/' + requestId);
        var taskName = "B";
        request.openTaskByTaskName(taskName);
        //Review data
        cy.get('div[class="multiselect__tags"] > div[class="multiselect__tags-wrap"] > span').eq(0).should("contain.text", "carlos");
        cy.get('div[class="multiselect__tags"] > div[class="multiselect__tags-wrap"] > span').eq(1).should("contain.text", "maria");
        cy.get('div[class="multiselect__tags"] > div[class="multiselect__tags-wrap"] > span').eq(2).should("contain.text", "ada");
        cy.get('div[class="multiselect__tags"] > div[class="multiselect__tags-wrap"] > span').eq(3).should("contain.text", "abed");
        cy.get('div[class="multiselect__tags"] > div[class="multiselect__tags-wrap"] > span').eq(4).should('contain.text',"carla");
        cy.get('div[class="multiselect__tags"] > div[class="multiselect__tags-wrap"] > span').eq(5).should("contain.text", "andres");
        cy.get('div[class="multiselect__tags"] > div[class="multiselect__tags-wrap"] > span').eq(6).should('contain.text',"keila");
        cy.get('input[data-cy="screen-field-value"]').eq(0).should('have.value', 'carlos');
        cy.get('input[data-cy="screen-field-value"]').eq(1).should('have.value', 'maria');
        cy.get('input[data-cy="screen-field-value"]').eq(2).should('have.value', 'ada');
        cy.get('input[data-cy="screen-field-value"]').eq(3).should('have.value', 'abed');
        cy.get('input[data-cy="screen-field-value"]').eq(4).should('have.value', 'A');
        cy.get('input[data-cy="screen-field-content"]').eq(0).should('have.value', 'carla');
        cy.get('input[data-cy="screen-field-value"]').eq(5).should('have.value', 'B');
        cy.get('input[data-cy="screen-field-content"]').eq(1).should('have.value', 'andres');
        cy.get('input[data-cy="screen-field-value"]').eq(6).should('have.value', 'C');
        cy.get('input[data-cy="screen-field-content"]').eq(2).should('have.value', 'keila');
        cy.get('tbody[role="rowgroup"] > tr[aria-rowindex="1"] > td[aria-colindex="1"]').should('contain.text',"Spain");
        cy.get('tbody[role="rowgroup"] > tr[aria-rowindex="2"] > td[aria-colindex="1"]').should('contain.text',"Italy");
        cy.get('tbody[role="rowgroup"] > tr[aria-rowindex="3"] > td[aria-colindex="1"]').should('contain.text',"Portugal");
        cy.get('tbody[role="rowgroup"] > tr[aria-rowindex="4"] > td[aria-colindex="1"]').should('contain.text',"Ireland");
        cy.get('tbody[role="rowgroup"] > tr[aria-rowindex="5"] > td[aria-colindex="1"]').should('contain.text',"Belgium");
        cy.get('li[class="page-item"] > button[aria-label="Go to page 2"]').should('contain.text', 2).click();
        cy.get('tbody[role="rowgroup"] > tr[aria-rowindex="6"] > td[aria-colindex="1"]').should('contain.text',"Greece");
        cy.get('tbody[role="rowgroup"] > tr[aria-rowindex="7"] > td[aria-colindex="1"]').should('contain.text',"Moldova");
        cy.get('tbody[role="rowgroup"] > tr[aria-rowindex="8"] > td[aria-colindex="1"]').should('contain.text',"Cyprus");
        //submit
        cy.xpath("//button[contains(text(),'Submit')]").scrollIntoView().click();
        cy.wait(2000);

        //Complete task C
        request.openRequestByName(processName);
        taskName = "C TCP4-2295";
        request.openTask(taskName);
        cy.get('div[class="multiselect__tags"] > div[class="multiselect__tags-wrap"] > span').eq(0).should('contain.text',"carlos");
        cy.get('div[class="multiselect__tags"] > div[class="multiselect__tags-wrap"] > span').eq(1).should('contain.text',"maria");
        cy.get('div[class="multiselect__tags"] > div[class="multiselect__tags-wrap"] > span').eq(2).should('contain.text',"ada");
        cy.get('div[class="multiselect__tags"] > div[class="multiselect__tags-wrap"] > span').eq(3).should('contain.text',"abed");
        cy.get('div[class="multiselect__tags"] > div[class="multiselect__tags-wrap"] > span').eq(4).should('contain.text',"carla");
        cy.get('div[class="multiselect__tags"] > div[class="multiselect__tags-wrap"] > span').eq(5).should('contain.text',"andres");
        cy.get('div[class="multiselect__tags"] > div[class="multiselect__tags-wrap"] > span').eq(6).should('contain.text',"keila");
        cy.get('input[data-cy="screen-field-value"]').eq(0).should('have.value', 'carlos');
        cy.get('input[data-cy="screen-field-value"]').eq(1).should('have.value', 'maria');
        cy.get('input[data-cy="screen-field-value"]').eq(2).should('have.value', 'ada');
        cy.get('input[data-cy="screen-field-value"]').eq(3).should('have.value', 'abed');
        cy.get('input[data-cy="screen-field-value"]').eq(4).should('have.value', 'A');
        cy.get('input[data-cy="screen-field-content"]').eq(0).should('have.value', 'carla');
        cy.get('input[data-cy="screen-field-value"]').eq(5).should('have.value', 'B');
        cy.get('input[data-cy="screen-field-content"]').eq(1).should('have.value', 'andres');
        cy.get('input[data-cy="screen-field-value"]').eq(6).should('have.value', 'C');
        cy.get('input[data-cy="screen-field-content"]').eq(2).should('have.value', 'keila');
        cy.get('tbody[role="rowgroup"] > tr[aria-rowindex="1"] > td[aria-colindex="1"]').should('contain.text',"Spain");
        cy.get('tbody[role="rowgroup"] > tr[aria-rowindex="2"] > td[aria-colindex="1"]').should('contain.text',"Italy");
        cy.get('tbody[role="rowgroup"] > tr[aria-rowindex="3"] > td[aria-colindex="1"]').should('contain.text',"Portugal");
        cy.get('tbody[role="rowgroup"] > tr[aria-rowindex="4"] > td[aria-colindex="1"]').should('contain.text',"Ireland");
        cy.get('tbody[role="rowgroup"] > tr[aria-rowindex="5"] > td[aria-colindex="1"]').should('contain.text',"Belgium");
        cy.get('table[data-cy="table"] > tbody > tr').should('have.length',5);
        cy.get('li[class="page-item"] > button[aria-label="Go to page 2"]').should('contain.text', 2).click();
        cy.get('tbody[role="rowgroup"] > tr[aria-rowindex="6"] > td[aria-colindex="1"]').should('contain.text',"Greece");
        cy.get('tbody[role="rowgroup"] > tr[aria-rowindex="7"] > td[aria-colindex="1"]').should('contain.text',"Moldova");
        cy.get('tbody[role="rowgroup"] > tr[aria-rowindex="8"] > td[aria-colindex="1"]').should('contain.text',"Cyprus");
        //Submit
        cy.xpath("//button[contains(text(),'Submit')]").scrollIntoView().click();
    }

    async actionsAndAssertionsOfTCP42326(){
        const newRecordBtn = "button[id='addUserCollection']";
        const maritalStatusSelectLits = "//label[text()='marital status']/parent::div//div[@class='multiselect__tags']";
        const maritalStatusInput ="//label[text()='marital status']/parent::div//input";
        const professionSelectList = "//label[text()='profession']/parent::div//div[@class='multiselect__tags']";
        const professionInput = "//label[text()='profession']/parent::div//input";
        const importFileInput = '[data-cy="file-upload-button"]';
        const submitButton = "button[class='btn btn-primary']";
        const successMessage = "//span[text()='success']";
        const maritalStatusField = "//p[text()='divorced']";
        const professionField = "//p[text()='QA']";
        const imageField = "//img[@class='mw-100']";

        //Fill Marital status
        cy.get(newRecordBtn).should('be.visible').click();
        cy.xpath(maritalStatusSelectLits).should('be.visible').click();
        cy.xpath(maritalStatusInput).type("divorced").type('{enter}');

        //Fill profession
        cy.xpath(professionSelectList).click();
        cy.xpath(professionInput).type("QA").type('{enter}');

        //Upload a File
        const filePath = 'drone.jpg';
        cy.get(importFileInput).attachFile(filePath);
        cy.xpath(successMessage).should('be.visible');

        //Save the changes
        cy.get(submitButton).click();

        //Verify that data were recovered
        cy.xpath(maritalStatusField).should('be.visible');
        cy.xpath(professionField).should('be.visible');
        cy.xpath(imageField).should('be.visible');

    }

    importAndSetup2414(username, password, firstName, lastName, jobTitle, status, email, processName, processFilePath){
        //Step 1: Create User
        navHelper.navigateToAdminUserPage();
        cy.get('[placeholder="Search"]').should("be.visible");
        cy.get('[placeholder="Search"]').eq(0).click().type(username);
        cy.get('[placeholder="Search"]')
            .eq(0)
            .click()
            .type(" ")
            .type("{backspace}");
        cy.get(".jumbotron.jumbotron-fluid").should("be.visible");
        cy.wait(2000);
        cy.get('[placeholder="Search"]').should("have.value", username);
        cy.xpath('//div[@id="users-listing"]/div[2]/div/div[2]/table/tbody/tr', { timeout: 10000 })
        .find('td')
        .then(($loadedTableUser) => {
            if($loadedTableUser.length === 1){
                admin.createUser(username, firstName, lastName, jobTitle, status, email, password);
            }
        });

        //Import process//
        navHelper.navigateToProcessPage();
        var editBtn = "[title='Edit'] > .fas";
        cy.get(editBtn).should('be.visible');
        cy.get('#processIndex > #search-bar > :nth-child(1) > .flex-grow-1 > #search > .input-group > #search-box').type(processName);
        cy.get('#processIndex > div.container-fluid > div > div.jumbotron.jumbotron-fluid').should('be.visible');
        cy.get('#processIndex > div.container-fluid > div > div.jumbotron.jumbotron-fluid').should('not.be.visible');
        var selectors_processTable = '//div[@id="processIndex"]/div[2]/div/div[2]/table/tbody/tr';

        cy.xpath(selectors_processTable, { timeout: 10000 })
        .find('td')
        .then(($loadedTable) => {
            if($loadedTable.length === 1){
                //Import Processrocess
                navHelper.navigateToProcessPage();
                process.importProcess(processFilePath);

                //Config process
                //start event
                cy.get('div[class="multiselect__tags"]').eq(0).click();
                cy.get('div[class="multiselect__tags"]').eq(0).type(username);
                cy.get('div > ul[role="listbox"] > li[id="option-0-1"]').should('have.attr',"aria-label",firstName+" "+lastName+". ").click();

                //1
                cy.get('div[class="multiselect__tags"]').eq(1).click();
                cy.get('div[class="multiselect__tags"] > input').eq(1).type(firstName+" ");
                cy.get('div > ul[role="listbox"] > li[id="option-1-4"]').should('have.attr',"aria-label",firstName+" "+lastName+". ").click();

                //2
                cy.get('div[class="multiselect__tags"]').eq(2).click();
                cy.get('div[class="multiselect__tags"] > input').eq(2).type(firstName+" ");
                cy.get('div > ul[role="listbox"] > li[id="option-2-4"]').should('have.attr',"aria-label",firstName+" "+lastName+". ").click();

                //3
                cy.get('div[class="multiselect__tags"]').eq(3).click();
                cy.get('div[class="multiselect__tags"] > input').eq(3).type(firstName+" ");
                cy.get('div > ul[role="listbox"] > li[id="option-3-4"]').should('have.attr',"aria-label",firstName+" "+lastName+". ").click();

                //Cancel Request
                cy.get('div[class="multiselect__tags"]').eq(4).click();
                cy.get('div[class="multiselect__tags"]').eq(4).type('Admin');
                cy.get('div > ul[role="listbox"] > li[id="option-4-0"]').should('have.attr',"aria-label","Admin User. ").click();

                //Edit Data
                cy.get('div[class="multiselect__tags"]').eq(5).click();
                cy.get('div[class="multiselect__tags"]').eq(5).type('Admin');
                cy.get('div > ul[role="listbox"] > li[id="option-5-2"]').should('have.attr',"aria-label","Admin User. ").click();
                cy.wait(2000);

                //Press Save button
                cy.get('div[id="card-footer-post-import"] > div > button').click();
            }
        });
    }

    async completeConfigurationProcessTCP42308(ProcessName,name){
        process.searchProcessAndSelectOptions(ProcessName,"edit");
        cy.get('g > text >tspan').contains('Data').should('be.visible').click();
        cy.get(':nth-child(1) > .multiselect > .multiselect__tags > .multiselect__single', { timeout: 10000 })
            .then(($loadedCollection) => {
                if($loadedCollection.length === 1){
                    this.configurationProcess(name);
                }
                else return;
            });
    }

    configurationProcess(name){
        cy.get(':nth-child(1) > .multiselect > .multiselect__tags > .multiselect__single').type(name);
        cy.wait(9000);
        cy.get(':nth-child(1) > .multiselect > .multiselect__tags>input').type('{enter}');
        cy.wait(5000);
        cy.get(':nth-child(2) > .multiselect > .multiselect__tags').type('POST');
        cy.wait(5000);
        cy.get(':nth-child(2) > .multiselect > .multiselect__tags>input').type('{enter}');
        cy.get('[title="Publish"]').click();
        cy.get('[class="btn btn-secondary"]').click();
    }

    async completeformTCP42308 (){
        cy.get('[name="form_input_1"]').type('123456789').should('have.value','123456789');
        cy.get('[name="form_input_2"]').type('nameDoctorTest').should('have.value','nameDoctorTest');
        cy.get('[class="btn btn-primary"]').click();
        cy.get('[class="breadcrumb-item active"]').should('be.visible');
        cy.wait(5000);
    }
    async reviewCollectionTCP42308 (){
        cy.xpath("//*[@id='search-collection-box']").type('Doctor Collection');
        cy.xpath("//*[@id='search-collection-box']").should('be.visible');
        cy.wait(3000);
        cy.get('[title="Records"] > .fas').first().should('be.visible').click();
        cy.wait(3000);
        cy.get('[title="Edit"]').first().should('be.visible').click();
        cy.get('[name="nameDoctor"]').should('be.visible');
        cy.get('[name="nameDoctor"]').should('have.value','nameDoctorTest');
        cy.get('[name="lastNameDoctor"]').should('have.value','Salgado');
        cy.get('[name="ciDoctor"]').should('have.value','123456789');
    }

    setConfigurationSaveSearch(){
        cy.xpath('//a[@title="Configure Saved Search"]').should('be.visible');
        cy.xpath('//a[@title="Configure Saved Search"]').click();
        cy.get('[class="pmql-input"]').clear().type('(request = "TCP4-2342 Verify the Reset to defaults in Active Columns in a Saved Search for a request") AND (status = "Completed")');
        cy.get('#nav-config > .d-flex > .btn-secondary')
            .should('exist')
            .click();
        cy.xpath('//a[@title="Configure Saved Search"]')
            .should('be.visible')
            .click();
        cy.xpath('//a[text()="Columns"]')
            .should('exist')
            .click();
        cy.get('h5').eq(0).should('have.text','Active Columns');
        cy.get('h5').eq(1).should('have.text','Available Columns');
        //verify active column
        cy.get('div[class="border bg-muted px-3 draggable-list draggable-current"] > div').should('have.length',9);
        //verify available column
        cy.get('div[class="border bg-muted px-3 draggable-list draggable-available"] > div').should('have.length',4);
        //move element
        cy.get(':nth-child(2) > .border > :nth-child(1) > .column-card > .d-flex').drag('div[class="border bg-muted px-3 draggable-list draggable-current"]');
        cy.get(':nth-child(2) > .border > :nth-child(1) > .column-card > .d-flex').drag('div[class="border bg-muted px-3 draggable-list draggable-current"]');
        //verify active column
        cy.get('div[class="border bg-muted px-3 draggable-list draggable-current"] > div').should('have.length',11);
        //verify available column
        cy.get('div[class="border bg-muted px-3 draggable-list draggable-available"] > div').should('have.length',2);
        cy.get('.mt-3 > .d-flex > .btn-secondary')
            .should('exist')
            .click();
        cy.xpath('//a[@title="Configure Saved Search"]').click()
        cy.get('#nav-columns-tab')
            .should('exist')
            .click();
        cy.xpath('//div[@class="border bg-muted px-3 draggable-list draggable-current"]//div/span[text()="Line 1"]').should('have.text','Line 1');
        cy.wait(5000);
        cy.get('.mr-auto > .btn')
            .should('exist')
            .click();
        cy.xpath('//div[@class="modal-content"]').should('be.visible');
        cy.wait(5000);
        cy.xpath('//button[text()="Confirm"]')
            .should('exist')
            .click();
        cy.wait(5000);
        cy.xpath('//div[@class="border bg-muted px-3 draggable-list draggable-available"]//div/span[text()="Line 1"]').should('have.text','Line 1');
        //verify active column
        cy.get('div[class="border bg-muted px-3 draggable-list draggable-current"] > div').should('have.length',9);
        //verify available column
        cy.get('div[class="border bg-muted px-3 draggable-list draggable-available"] > div').should('have.length',3);
        cy.get('.mt-3 > .d-flex > .btn-secondary').click();
        cy.get('.mt-3 > .d-flex > .btn-outline-secondary').click();
    }

    async completeFormTCP42311(codeHTML,requestId){
        //Complete form
        cy.get('[name="form_input_1"]').type(codeHTML).should('have.value',codeHTML);
        const file1 = 'drone.jpg';
        cy.xpath('//div[@data-cy="screen-field-file_upload_1"]//input[@data-cy="file-upload-button"]').attachFile(file1);
        cy.xpath("//div[@data-cy='screen-field-file_upload_1']//span[text()='success']").should('be.visible');
        cy.get('[name="form_input_2"]').type(codeHTML).should('have.value',codeHTML);
        const file2 = 'sample.pdf';
        cy.xpath('//div[@data-cy="screen-field-file_upload_2"]//input[@data-cy="file-upload-button"]').attachFile(file2);
        cy.xpath("//div[@data-cy='screen-field-file_upload_2']//span[text()='success']").should('be.visible');
        cy.xpath('//button[contains(text(),"New Submit")]').click();

        //open Manual task
        //cy.wait(10000);
        cy.visit('/requests/' + requestId);
        request.waitUntilElementIsVisible('selector','#pending > div > div > table > tbody > tr > td:nth-child(2) > a');
        var taskName = 'Manual Task';
        request.openTaskByTaskName(taskName);

        //Review Manual task
        cy.xpath("//a[text()='Go to about Processmaker']").scrollIntoView().click();
        navHelper.navigateToRequestsPage();
        //Complete Manual task
        cy.visit('/requests/' + requestId);
        request.waitUntilElementIsVisible('xpath','//div[@id="requestTabContent"]//div[@id="pending"]//a[contains(text(),"Manual Task")]');
        var taskName = 'Manual Task';
        request.openTaskByTaskName(taskName);
        cy.get('[class="btn btn-primary"]').scrollIntoView();
        cy.get('[class="btn btn-primary"]').should("be.visible").click();
        request.waitUntilElementIsVisible('selector','[id="file-manager-tab"]');
        cy.get('[id="file-manager-tab"]').click();
        //Verify PDF generator
        cy.get('[class="star-component"]').first().should('be.visible');
        cy.get('[class="star-component"]').eq(2).should('be.visible');
        cy.xpath("//span[text()='(TESTCASE)']").should('be.visible');
        cy.xpath("//span[text()='(TESTCASE)']/ancestor::tr//button[@title='View']").should('be.visible').click();
        cy.get('.file-detail').should('be.visible');
    }
    async completeFormPath2TCP42311(codeHTML,requestId){
        //Complete form
        const file1 = 'drone.jpg';
        cy.xpath('//div[@data-cy="screen-field-file_upload_1"]//input[@data-cy="file-upload-button"]').attachFile(file1);
        cy.xpath("//div[@data-cy='screen-field-file_upload_1']//span[text()='success']").should('be.visible');
        cy.get('[name="form_input_2"]').type(codeHTML).should('have.value',codeHTML);
        const file2 = 'sample.pdf';
        cy.xpath('//div[@data-cy="screen-field-file_upload_2"]//input[@data-cy="file-upload-button"]').attachFile(file2);
        cy.xpath("//div[@data-cy='screen-field-file_upload_2']//span[text()='success']").should('be.visible');
        cy.xpath('//button[contains(text(),"New Submit")]').click();

        //open Manual task
        cy.visit('/requests/'+requestId);
        request.waitUntilElementIsVisible('selector','#pending > div > div > table > tbody > tr > td:nth-child(2) > a');
        var taskName = 'Manual Task';
        request.openTaskByTaskName(taskName);

        //Review Manual task
        cy.xpath("//a[text()='Go to about Processmaker']").scrollIntoView().click();
        navHelper.navigateToRequestsPage();
        //Complete Manual task
        cy.visit('/requests/'+requestId);
        request.waitUntilElementIsVisible('xpath','//div[@id="requestTabContent"]//div[@id="pending"]//a[contains(text(),"Manual Task")]');
        var taskName = 'Manual Task';
        request.openTaskByTaskName(taskName);
        cy.get('[class="btn btn-primary"]').scrollIntoView();
        cy.get('[class="btn btn-primary"]').should("be.visible").click();
        request.waitUntilElementIsVisible('selector','[id="file-manager-tab"]');
        cy.get('[id="file-manager-tab"]').should("be.visible").click();

        //Verify PDF generator
        cy.get('[class="star-component"]').first().should('be.visible');
        cy.get('[class="star-component"]').eq(2).should('be.visible');
        cy.get('[class="star-component"]').eq(3).should('be.visible');
        cy.xpath("//span[text()='(TESTCASE)']/ancestor::tr//button[@title='View']").last().should('be.visible').click();
        cy.get('[allowfullscreen="allowfullscreen"]').should('be.visible');
    }

    //TCP4-2343
    verifyDashboardsAndMenusdWithUser(nameDashboard1, nameDashboard2, nameDashboard3, nameMenu1, nameMenu2, nameMenu3) {
        cy.get('[class="navbar-nav d-flex align-items-center"]')
            .should("be.visible")
            .should("contain", nameMenu1)
            .and("contain", nameMenu2)
            .and("contain", nameMenu3);
        cy.get('[class="nav-link dropdown-toggle nav-link-custom"]')
            .eq(0)
            .click();
        cy.get('[role="presentation"]')
            .should("be.visible")
            .should("contain", "Link1");
        cy.get('[class="nav-link dropdown-toggle nav-link-custom"]')
            .eq(1)
            .click();
        cy.get('[role="presentation"]')
            .should("be.visible")
            .should("contain", "Link2");
        cy.get('[class="nav-link dropdown-toggle nav-link-custom"]')
            .eq(2)
            .click();
        cy.get('[role="presentation"]')
            .should("be.visible")
            .should("contain", "Link3");

        cy.get('[class="nav nav-tabs"]')
            .should("be.visible")
            .should("contain", nameDashboard1)
            .and(
                "contain",
                nameDashboard2
            ).and("contain",
                nameDashboard3)
        cy.get('[class="nav-item"]').eq(0).click();
        cy.get('[class="tab-content"]').should("contain", "DASHBOARD1");
        cy.get('[class="nav-item"]').eq(1).click();
        cy.get('[class="tab-content"]').should('be.visible').and("contain", "DASHBOARD2");
        cy.get('[class="nav-item"]').eq(2).click();
        cy.get('[class="tab-content"]').should('be.visible').and("contain", "DASHBOARD3");
    }

    completeFormWebEntryTCP42294 (){
        cy.get('[name="accepted"]').type('yes').should('be.visible');
        cy.get('[name="maxlength"]').type('1234567').should('be.visible');
        cy.get('[name="afterdate"]').type('2022-01-20').should('be.visible');
        cy.get('[name="minlength"]').type('12345').should('be.visible');
        cy.get('[name="afterorequaltodate"]').type('2022-01-15').should('be.visible');
        cy.get('[name="regex"]').type('2022-01-31').should('be.visible');
        cy.get('[name="alpha"]').type('ProcessMaker').should('be.visible');
        cy.get('[name="required"]').type('ProcessMaker').should('be.visible');
        cy.get('[name="alphanumeric"]').type('Process123').should('be.visible');
        cy.get('[name="requiredif"]').type('ProcessMaker').should('be.visible');
        cy.get('[name="beforedate"]').type('2022-01-01').should('be.visible');
        cy.get('[name="requiredunless"]').type('ProcessMaker').should('be.visible');
        cy.get('[name="beforeorequaldate"]').type('2022-01-15').should('be.visible');
        cy.get('[name="same"]').type('ProcessMaker').should('be.visible');
        cy.get('[name="betweenminmax"]').type('5').should('be.visible');
        cy.get('[name="url"]').type('https://qualitlabs-qa.processmaker.net/').should('be.visible');
        cy.get('[name="date"]').type('2022-07-07').should('be.visible');
        cy.get('[name="email"]').type('automation1@endtest-mail.io').should('be.visible');
        cy.get('[name="Verify Validation Rules with Loop and Nested Screen in Nested Screen"] > :nth-child(2) > .form-group > .btn').should('be.visible').click();

        cy.get('[name=request-id]').invoke('attr', 'content').should('not.be.empty');
        cy.get("[name='request-id']").invoke('attr', 'content').then((requestId)=>{

            //Step 7: login
            login.navigateToUrl();
            login.login();

            //Step 7: Open the Second Task
            cy.visit('/requests/'+requestId);
            request.waitUntilElementIsVisible('selector', '#pending >* td:nth-child(1) >a[href^="/tasks"]');
            request.clickOnTaskName(1, 1);
            
            //Review Data and Add a Loop
            cy.get('[name="accepted"]').should('be.visible').should('have.value', 'yes');
            cy.get('[name="maxlength"]').should('be.visible').should('have.value', '1234567');
            cy.get('[name="afterdate"]').should('be.visible').should('have.value', '2022-01-20');
            cy.get('[name="minlength"]').should('be.visible').should('have.value', '12345');
            cy.get('[name="afterorequaltodate"]').should('be.visible').should('have.value', '2022-01-15');
            cy.get('[name="regex"]').should('be.visible').should('have.value', '2022-01-31');
            cy.get('[name="alpha"]').should('be.visible').should('have.value', 'ProcessMaker');
            cy.get('[name="required"]').should('be.visible').should('have.value', 'ProcessMaker');
            cy.get('[name="alphanumeric"]').should('be.visible').should('have.value', 'Process123');
            cy.get('[name="requiredif"]').should('be.visible').should('have.value', 'ProcessMaker');
            cy.get('[name="beforedate"]').should('be.visible').should('have.value', '2022-01-01');
            cy.get('[name="requiredunless"]').should('be.visible').should('have.value', 'ProcessMaker');
            cy.get('[name="beforeorequaldate"]').should('be.visible').should('have.value', '2022-01-15');
            cy.get('[name="same"]').should('be.visible').should('have.value', 'ProcessMaker');
            cy.get('[name="betweenminmax"]').should('be.visible').should('have.value', '5');
            cy.get('[name="url"]').should('be.visible').should('have.value', 'https://qualitlabs-qa.processmaker.net/');
            cy.get('[name="date"]').should('be.visible').should('have.value', '2022-07-07');
            cy.get('[name="email"]').should('be.visible').should('have.value', 'automation1@endtest-mail.io');
            //Add a loop
            cy.get('[data-cy="loop-loop-add"]').should('be.visible').click();
            cy.get('[name="accepted"]').eq(1).type('yes').should('be.visible');
            cy.get('[name="maxlength"]').eq(1).type('1234567').should('be.visible');
            cy.get('[name="afterdate"]').eq(1).type('2022-01-20').should('be.visible');
            cy.get('[name="minlength"]').eq(1).type('12345').should('be.visible');
            cy.get('[name="afterorequaltodate"]').eq(1).type('2022-01-15').should('be.visible');
            cy.get('[name="regex"]').eq(1).type('2022-01-31').should('be.visible');
            cy.get('[name="alpha"]').eq(1).type('ProcessMaker').should('be.visible');
            cy.get('[name="required"]').eq(1).type('ProcessMaker').should('be.visible');
            cy.get('[name="alphanumeric"]').eq(1).type('Process123').should('be.visible');
            cy.get('[name="requiredif"]').eq(1).type('ProcessMaker').should('be.visible');
            cy.get('[name="beforedate"]').eq(1).type('2022-01-01').should('be.visible');
            cy.get('[name="requiredunless"]').eq(1).type('ProcessMaker').should('be.visible');
            cy.get('[name="beforeorequaldate"]').eq(1).type('2022-01-15').should('be.visible');
            cy.get('[name="same"]').eq(1).type('ProcessMaker').should('be.visible');
            cy.get('[name="betweenminmax"]').eq(1).type('5').should('be.visible');
            cy.get('[name="url"]').eq(1).type('https://qualitlabs-qa.processmaker.net/').should('be.visible');
            cy.get('[name="date"]').eq(1).type('2022-07-07').should('be.visible');
            cy.get('[name="email"]').eq(1).type('automation1@endtest-mail.io').should('be.visible');
            cy.get('[name="Verify Validation Rules with Loop and Nested Screen in Nested Screen"] > :nth-child(2) > .form-group > .btn').click();
            request.verifyTaskIsCompletedB();
            cy.wait(2000);
            cy.get('[class="flex-grow-1"]').eq(3).should('be.visible');
            cy.get('[class="flex-grow-1"]').eq(2).should('be.visible');
            cy.get('[id="forms-tab"]').should('be.visible').click();
            cy.get('[title="Details"]').should('be.visible').click();
            cy.reload();
            cy.contains('An Anonymous User started this request from a web entry').scrollIntoView();
        });
    }
    async actionsOfTCP42298(processName){
        cy.get('[name="form_input_1"]').should('be.visible').type('test_2298');
        //record1
        cy.xpath("//button[contains(text(),'Add')]").click();
        cy.get('[class="modal-content"]').first().should('be.visible');
        cy.get('[name="form_input_2"]').first().type('test_2298_recodlist').should('have.value','test_2298_recodlist');
        cy.xpath("//button[text()='Ok']").should('be.visible').click();
        //record2
        cy.xpath("//button[contains(text(),'Add')]").click();
        cy.get('[class="modal-content"]').first().should('be.visible');
        cy.get('[name="form_input_2"]').first().type('test_2298_recodlist_2').should('have.value','test_2298_recodlist_2');
        cy.xpath("//button[text()='Ok']").should('be.visible').click();
        //record3
        cy.xpath("//button[contains(text(),'Add')]").click();
        cy.get('[class="modal-content"]').first().should('be.visible');
        cy.get('[name="form_input_2"]').first().type('test_2298_recodlist_3').should('have.value','test_2298_recodlist_3');
        cy.xpath("//button[text()='Ok']").should('be.visible').click();
        //record4
        cy.xpath("//button[contains(text(),'Add')]").click();
        cy.get('[class="modal-content"]').first().should('be.visible');
        cy.get('[name="form_input_2"]').first().type('test_2298_recodlist_4').should('have.value','test_2298_recodlist_4');
        cy.xpath("//button[text()='Ok']").should('be.visible').click();
        //record5
        cy.xpath("//button[contains(text(),'Add')]").click();
        cy.get('[class="modal-content"]').first().should('be.visible');
        cy.get('[name="form_input_2"]').first().type('test_2298_recodlist_5').should('have.value','test_2298_recodlist_5');
        cy.xpath("//button[text()='Ok']").should('be.visible').click();
        //record6
        cy.xpath("//button[contains(text(),'Add')]").click();
        cy.get('[class="modal-content"]').first().should('be.visible');
        cy.get('[name="form_input_2"]').first().type('test_2298_recodlist_6').should('have.value','test_2298_recodlist_6');
        cy.xpath("//button[text()='Ok']").should('be.visible').click();
        //record7
        cy.xpath("//button[contains(text(),'Add')]").click();
        cy.get('[class="modal-content"]').first().should('be.visible');
        cy.get('[name="form_input_2"]').first().type('test_2298_recodlist_7').should('have.value','test_2298_recodlist_7');
        cy.xpath("//button[text()='Ok']").should('be.visible').click();
        //record8
        cy.xpath("//button[contains(text(),'Add')]").click();
        cy.get('[class="modal-content"]').first().should('be.visible');
        cy.get('[name="form_input_2"]').first().type('test_2298_recodlist_8').should('have.value','test_2298_recodlist_8');
        cy.xpath("//button[text()='Ok']").should('be.visible').click();
        //record9
        cy.xpath("//button[contains(text(),'Add')]").click();
        cy.get('[class="modal-content"]').first().should('be.visible');
        cy.get('[name="form_input_2"]').first().type('test_2298_recodlist_9').should('have.value','test_2298_recodlist_9');
        cy.xpath("//button[text()='Ok']").should('be.visible').click();
        //record10
        cy.xpath("//button[contains(text(),'Add')]").click();
        cy.get('[class="modal-content"]').first().should('be.visible');
        cy.get('[name="form_input_2"]').first().type('test_2298_recodlist_10').should('have.value','test_2298_recodlist_10');
        cy.xpath("//button[text()='Ok']").should('be.visible').click();

        cy.get('.signature > canvas').click();
        cy.get('[name="form_text_area_1"]').type('text_area{enter}text_area2{enter}');
        cy.get('.form-group > .btn').should('be.visible').click();
        cy.wait(5000);
        cy.get('.breadcrumb > .active').should('be.visible');
        //Complete form task 2
        cy.get('#breadcrumbs > nav > ol > li.breadcrumb-item.active').should('be.visible');
        var processName = 'TCP4-2298 Check the functionality of Intermediate Event with nested screen tasks';
        request.openRequestByName(processName);
        var taskName = 'Form Task 2';
        request.openTaskByTaskName(taskName);
        cy.get('[name="form_input_1"]').should('be.visible').should('have.value', 'test_2298');
        cy.get('[aria-rowindex="1"] > .table-column').should('be.visible');
        cy.get(':nth-child(5) > .page-link').click();
        cy.get('[aria-rowindex="6"] > .table-column').should('be.visible');
        cy.get('[data-cy="screen-field-form_text_area_1"]').should('be.visible');
        cy.get('.form-group > .btn').should('be.visible').click();
        //Open manual task and complete
        cy.get('#breadcrumbs > nav > ol > li.breadcrumb-item.active').should('be.visible');
        var processName = 'TCP4-2298 Check the functionality of Intermediate Event with nested screen tasks';
        request.openRequestByName(processName);
        var taskName = 'Manual Task';
        request.openTaskByTaskName(taskName);
        cy.get('[class="card card-body border-top-0 h-100 display-screen"]').should('be.visible');
        cy.get('[class="btn btn-primary"]').should('be.visible').click();
        cy.wait(2000);
    }

    completeFormTCP42292(requestId){
        //First section
        cy.get('[name="fullName"]').should('be.visible').type('test case_1').should('have.value','test case_1');
        cy.get('[style="color: #000000;"]').should('be.visible');
        cy.get('[data-cy="loop-loop_1-add"]').first().should('be.visible').click();
        cy.get('[style="color: #000000;"]').eq(1).should('be.visible');
        cy.get('[data-cy="loop-loop_2-add"]').first().should('be.visible').click();
        cy.xpath("//span[contains(text(),'test case_1')]").eq(2).should('be.visible');
        cy.get('[data-cy="loop-loop_2-add"]').first().should('be.visible').click();
        cy.get('[class="container-fluid"]').eq(3).should('be.visible');
        //second section
        cy.get('[data-cy="add-row"]').first().click();
        cy.get('[class="modal-content"]').first().should('be.visible');
        cy.get('[name="nameRecordList"]').first().type('record_test_case').should('have.value','record_test_case');
        cy.xpath("//text()[contains(.,'Ok')]/ancestor::button[1]").first().click();
        cy.get('[data-cy="add-row"]').first().click();
        cy.get('[name="nameRecordList"]').first().type('record_test_case_2').should('have.value','record_test_case_2');
        cy.xpath("//text()[contains(.,'Ok')]/ancestor::button[1]").first().click();
        cy.xpath("//p[text()='record_test_case_2']").first().should('be.visible');
        cy.get('[data-cy="loop-loop_4-add"]').first().click();
        cy.xpath("//span[text()='record_test_case']").should('be.visible');
        cy.xpath("//p[text()='record_test_case_2']").eq(1).should('be.visible');
        //third section
        cy.get('[class="container-fluid"]').eq(7).should('be.visible');
        cy.get('[class="container-fluid"]').eq(9).should('be.visible');
        cy.get('[data-cy="loop-loop_1-add"]').eq(1).click();
        cy.get('[class="container-fluid"]').eq(9).should('be.visible');
        cy.get('[data-cy="loop-loop_2-add"]').eq(1).click();
        cy.get('[class="container-fluid"]').eq(13).should('be.visible');
        //Quarter section
        cy.get('[name="form_input_1"]').type('test case_input').should('have.value','test case_input');
        cy.get('[icon="fas fa-table"] > :nth-child(1) > :nth-child(2) > .form-group > :nth-child(1) > div > p').should('be.visible');
        cy.get('[name="form_input_2"]').type('test case_input_2').should('have.value','test case_input_2');
        cy.get(':nth-child(2) > :nth-child(1) > [icon="fas fa-redo"] > :nth-child(1) > .container-fluid > :nth-child(1) > .page > :nth-child(2) > .form-group > :nth-child(1) > div > p').should('be.visible');
        cy.get('[name="form_input_3"]').type('test case_input_3').should('have.value','test case_input_3');
        cy.get(':nth-child(3) > :nth-child(1) > [icon="fas fa-redo"] > :nth-child(1) > .container-fluid > :nth-child(1) > .page > :nth-child(2) > .form-group > :nth-child(1) > div > p').should('be.visible');
        cy.get('[data-cy="loop-loop_3-add"]').eq(1).click();
        cy.get('[data-cy="screen-field-form_input_2"]').eq(1).type('test case_input_2_2').should('have.value','test case_input_2_2');
        cy.get('[data-cy="loop-loop_4-add"]').eq(1).click();
        cy.get('[data-cy="screen-field-form_input_3"]').eq(1).type('test case_input_3_2').should('have.value','test case_input_3_2');
        cy.get('[data-cy="add-row"]').eq(1).click();
        cy.get('[name="form_input_4"]').first().type('record_test_2_2').should('have.value','record_test_2_2');
        cy.xpath("//text()[contains(.,'Ok')]/ancestor::button[1]").eq(1).click();
        cy.get('[data-cy="add-row"]').eq(1).click();
        cy.get('[name="form_input_4"]').first().type('record_test_2_3').should('have.value','record_test_2_3');
        cy.xpath("//text()[contains(.,'Ok')]/ancestor::button[1]").eq(1).click();
        cy.get(':nth-child(4) > :nth-child(2) > .form-group > :nth-child(1) > div > :nth-child(1)').should('be.visible');
        //fifth Section
        cy.get('.multiselect__tags').type('bbb');
        cy.get('.multiselect__tags>input').type('{enter}');
        cy.get(':nth-child(2) > :nth-child(1) > .form-group > :nth-child(1) > div > p').should('be.visible');
        cy.get('[name="form_input_5"]').type('test_case').should('have.value','test_case');
        cy.get('[name="screen rich text 4.2.26"] > :nth-child(3) > [icon="fas fa-table"] > :nth-child(2) > :nth-child(2) > .form-group > :nth-child(1) > div > :nth-child(1)').should('be.visible');
        cy.get('.signature > canvas').click();
        cy.get('[data-cy="loop-loop_5-add"]').click();
        cy.get('.multiselect__tags').eq(1).type('aaa');
        cy.xpath('//input[@class="multiselect__input"]').eq(1).type('{enter}');
        cy.get('[name="form_input_5"]').eq(1).type('test_case_2').should('have.value','test_case_2');
        cy.get('.signature > canvas').eq(1).click();
        cy.get(':nth-child(2) > .form-group > .btn').click();
        request.verifyTaskIsCompletedB();

        ///Review task form 2
        var taskName = 'Form Task';
        cy.visit('/requests/'+requestId);
        request.clickOnTaskName(1, 1);
        
        //First section
        cy.get('[name="fullName"]').should('be.visible').should('have.value','test case_1');
        cy.get('[style="color: #000000;"]').should('be.visible');
        cy.get('[style="color: #000000;"]').eq(1).should('be.visible');
        cy.xpath("//span[contains(text(),'test case_1')]").eq(2).should('be.visible');
        cy.get('[class="container-fluid"]').eq(3).should('be.visible');
        //second section
        cy.get('[data-cy="add-row"]').first().click();
        cy.get('[class="modal-content"]').first().should('be.visible');
        cy.get('[name="nameRecordList"]').first().type('record_test_case_3').should('have.value','record_test_case_3');
        cy.xpath("//text()[contains(.,'Ok')]/ancestor::button[1]").first().click();
        cy.xpath("//p[text()='record_test_case_2']").first().should('be.visible');
        cy.get('[data-cy="loop-loop_4-add"]').first().click();
        cy.xpath("//span[text()='record_test_case']").should('be.visible');
        //third section
        cy.get('[class="container-fluid"]').eq(13).should('be.visible');
        cy.get('[class="container-fluid"]').eq(16).should('be.visible');
        cy.get('[class="container-fluid"]').eq(15).should('be.visible');
        cy.get('[class="container-fluid"]').eq(20).should('be.visible');
        //Quarter section
        cy.get('[name="form_input_1"]').should('have.value','test case_input');
        cy.get('[icon="fas fa-table"] > :nth-child(1) > :nth-child(2) > .form-group > :nth-child(1) > div > p').should('be.visible');
        cy.get('[name="form_input_2"]').should('have.value','test case_input_2');
        cy.get(':nth-child(2) > :nth-child(1) > [icon="fas fa-redo"] > :nth-child(1) > .container-fluid > :nth-child(1) > .page > :nth-child(2) > .form-group > :nth-child(1) > div > p').should('be.visible');
        cy.get('[name="form_input_3"]').should('have.value','test case_input_3');
        cy.get(':nth-child(3) > :nth-child(1) > [icon="fas fa-redo"] > :nth-child(1) > .container-fluid > :nth-child(1) > .page > :nth-child(2) > .form-group > :nth-child(1) > div > p').should('be.visible');
        cy.get('[data-cy="screen-field-form_input_2"]').eq(1).should('have.value','test case_input_2_2');
        cy.get('[data-cy="screen-field-form_input_3"]').eq(1).should('have.value','test case_input_3_2');
        cy.get('[data-cy="loop-loop_3-add"]').eq(1).click();
        cy.get('[name="form_input_2"]').eq(2).type('test case_input_2_3').should('have.value','test case_input_2_3');
        cy.get('[data-cy="loop-loop_4-add"]').eq(1).click();
        cy.get('[name="form_input_3"]').eq(2).type('test case_input_3_3').should('have.value','test case_input_3_3');
        cy.get('[name="form_input_3"]').eq(3).type('test case_input_3_4').should('have.value','test case_input_3_4');
        cy.get('[data-cy="add-row"]').eq(1).click();
        cy.get('[name="form_input_4"]').first().type('record_test_2_4').should('have.value','record_test_2_4');
        cy.xpath("//text()[contains(.,'Ok')]/ancestor::button[1]").eq(1).click();
        cy.get(':nth-child(4) > :nth-child(2) > .form-group > :nth-child(1) > div > :nth-child(1)').should('be.visible');
        //fifth Section
        cy.get(':nth-child(2) > :nth-child(1) > .form-group > :nth-child(1) > div > p').should('be.visible');
        cy.get('[name="form_input_5"]').should('have.value','test_case');
        cy.get('[name="screen rich text 4.2.26"] > :nth-child(3) > [icon="fas fa-table"] > :nth-child(2) > :nth-child(2) > .form-group > :nth-child(1) > div > :nth-child(1)').should('be.visible');
        cy.get(':nth-child(2) > .form-group > .btn').click();
        cy.wait(2000);
    }
    completeFormTCP42286 (requestId){
        //first textarea
        cy.xpath('//*[contains(text(),"sin loop")]').first().should('be.visible');
        cy.get('[title="Bold"]').first().click();
        cy.get('[title="Italic"]').first().click();
        cy.get('[class="tox-tbtn tox-split-button__chevron"]').first().click();
        cy.get('[title="Red"]').should('be.visible').click();
        cy.get('[class="tox-edit-area__iframe"]').first().then(($iframe) => {
            const $body = $iframe.contents().find('body');
            cy.wrap($body).find('strong').type('This is a test to verify textarea control');
        });
        //second textarea
        cy.get('[title="More..."]').first().click();
        cy.get('[class="tox-toolbar__overflow"]').should('be.visible');
        cy.get('[title="Bold"]').eq(1).should('be.visible').click();
        cy.get('[title="Italic"]').eq(1).should('be.visible').click();
        cy.get('[class="tox-tbtn tox-split-button__chevron"]').eq(1).should('be.visible').click();
        cy.get('[title="Dark Purple"]').should('be.visible').click();
        cy.get('[title="More..."]').first().click();
        cy.get('[class="tox-edit-area__iframe"]').eq(1).then(($iframe) => {
            const $body = $iframe.contents().find('body');
            cy.wrap($body).find('p').type('This is a test to verify textarea control');
        });
        //textarea inside a loop 1
        cy.get('[data-cy="loop-loop_1-add"]').should('be.visible').click();
        cy.get('[title="More..."]').eq(1).click();
        cy.get('[class="tox-toolbar__overflow"]').should('be.visible');
        cy.get('[title="Bold"]').eq(2).should('be.visible').click();
        cy.get('[title="Italic"]').eq(2).should('be.visible').click();
        cy.get('[class="tox-tbtn tox-split-button__chevron"]').eq(2).should('be.visible').click();
        cy.get('[title="Orange"]').should('be.visible').click();
        cy.get('[title="More..."]').eq(1).click();
        cy.get('[class="tox-edit-area__iframe"]').eq(2).then(($iframe) => {
            const $body = $iframe.contents().find('body');
            cy.wrap($body).find('p').type('This is a test to verify textarea control');
        });
        //textarea inside a loop 2
        cy.get('[data-cy="loop-loop_5-add"]').click();
        cy.get('[name="loop_5"]').should('be.visible');
        cy.get('[title="More..."]').eq(2).click();
        cy.get('[class="tox-toolbar__overflow"]').should('be.visible');
        cy.get('[title="Bold"]').eq(3).should('be.visible').click();
        cy.get('[title="Italic"]').eq(3).should('be.visible').click();
        cy.get('[class="tox-tbtn tox-split-button__chevron"]').eq(3).should('be.visible').click();
        cy.get('[title="Blue"]').should('be.visible').click();
        cy.get('[title="Bullet list"]').eq(3).should('be.visible').click();
        cy.get('[title="More..."]').eq(2).click();
        cy.get('[class="tox-edit-area__iframe"]').eq(3).then(($iframe) => {
            const $body = $iframe.contents().find('body');
            cy.wrap($body).find('li').type('This is a test to verify textarea control');
        });
        cy.wait(5000);
        //Add textarea inside a record list
        cy.get('[class="btn btn-primary"]').first().should('be.visible').click();
        cy.get('[class="modal-content"]').first().should('be.visible');
        cy.get('.tox-toolbar__primary > :nth-child(3) > .tox-tbtn > .tox-icon > svg').click();
        cy.get('[class="tox-toolbar__overflow"]').should('be.visible');
        cy.get('[title="Bold"]').eq(5).should('be.visible').click();
        cy.get('[title="Italic"]').eq(5).should('be.visible').click();
        cy.get('[class="tox-tbtn tox-split-button__chevron"]').eq(5).should('be.visible').click();
        cy.get('[title="Dark Turquoise"]').should('be.visible').click();
        cy.get('.tox-toolbar__primary > :nth-child(3) > .tox-tbtn > .tox-icon > svg').click();
        cy.get('[class="tox-edit-area__iframe"]').eq(4).should('be.visible');
        cy.get('[class="tox-edit-area__iframe"]').eq(4).then(($iframe) => {
            const $body = $iframe.contents().find('body');
            cy.wrap($body).find('p').type('This is a test to verify textarea control');
        });
        //Add textarea inside a record list first loop
        cy.get('[data-cy="loop-loop_2-add"]').first().should('be.visible').click();
        cy.get('[title="More..."]').eq(4).click();
        cy.get('[class="tox-toolbar__overflow"]').should('be.visible');
        cy.get('[title="Bold"]').eq(5).should('be.visible').click();
        cy.get('[title="Italic"]').eq(5).should('be.visible').click();
        cy.get('[class="tox-tbtn tox-split-button__chevron"]').eq(5).should('be.visible').click();
        cy.get('[title="Dark Gray"]').should('be.visible').click();
        cy.get('[title="More..."]').eq(4).click();
        cy.get('[class="tox-edit-area__iframe"]').eq(5).should('be.visible');
        cy.get('[class="tox-edit-area__iframe"]').eq(5).then(($iframe) => {
            const $body = $iframe.contents().find('body');
            cy.wrap($body).find('p').type('This is a test to verify textarea control');
        });
        //Add textarea inside a record list second loop 2
        cy.get('[data-cy="loop-loop_4-add"]').first().should('be.visible').click();
        cy.get('[title="More..."]').eq(5).click();
        cy.get('[class="tox-toolbar__overflow"]').should('be.visible');
        cy.get('[title="Bold"]').eq(5).should('be.visible').click();
        cy.get('[title="Italic"]').eq(5).should('be.visible').click();
        cy.get('[class="tox-tbtn tox-split-button__chevron"]').eq(5).should('be.visible').click();
        cy.get('[title="Yellow"]').should('be.visible').click();
        cy.get('[title="More..."]').eq(5).click();
        cy.get('[class="tox-edit-area__iframe"]').eq(6).should('be.visible');
        cy.get('[class="tox-edit-area__iframe"]').eq(6).then(($iframe) => {
            const $body = $iframe.contents().find('body');
            cy.wrap($body).find('p').type('This is a test to verify textarea control');
        });
        cy.xpath('//button[text() = "Ok"]').click((err, runnable) => {
            return false
        });
        cy.get('[data-cy="table"]>* td').first().should('exist');
        cy.wait(6000);
        cy.reload();
        cy.xpath('//button[contains(text(),"New Submit")]').should('exist');
        cy.xpath('//button[contains(text(),"New Submit")]').click({force:true});
        cy.log('fin textarea');
        cy.wait(6000);
        request.verifyTaskIsCompletedB();

        //Step 2: Open next form task
        cy.visit('/requests/'+requestId);
        request.waitUntilElementIsVisible('selector', '#pending >* td:nth-child(1) >a[href^="/tasks"]');
        request.clickOnTaskName(1, 1);

        // //Review first textarea
        // // cy.get('[class="tox-edit-area__iframe"]').first().then(($iframe) => {
        // //     const $body = $iframe.contents().find('body');
        // //     cy.wrap($body).find('strong').contains('This is a test to verify textarea control');
        // // })
        // //Review second textarea
        // cy.get('[class="tox-edit-area__iframe"]').eq(1).then(($iframe) => {
        //     const $body = $iframe.contents().find('body');
        //     cy.wrap($body).find('p').contains('This is a test to verify textarea control');
        // })
        // //Review textarea inside a loop 1
        // cy.get('[class="tox-edit-area__iframe"]').eq(2).then(($iframe) => {
        //     const $body = $iframe.contents().find('body');
        //     cy.wrap($body).find('p').contains('This is a test to verify textarea control');
        // })
        // //Review textarea inside a loop 2
        // cy.get('[class="tox-edit-area__iframe"]').eq(3).then(($iframe) => {
        //     const $body = $iframe.contents().find('body');
        //     cy.wrap($body).find('li').contains('This is a test to verify textarea control');
        // })
        // //Review textarea inside a record list
        // cy.get('[title="Edit"]').click((err, runnable) => {
        //     return false
        // });
        // cy.wait(2000);
        // cy.get('[class="tox-edit-area__iframe"]').eq(5).then(($iframe) => {
        //     const $body = $iframe.contents().find('body');
        //     cy.wrap($body).find('p').contains('This is a test to verify textarea control');
        // })
        // cy.xpath('//button[text() = "Save"]').click((err, runnable) => {
        //     return false
        // });
        cy.get('.form-group > .btn').should('exist').click();
        request.verifyTaskIsCompletedB();
    }
    completeFormManualTaskTCP42286 (requestId){
        navHelper.navigateToRequestsPage();
        const processName = 'TCP4-2286 process Text Area Rich Text';
        const taskName = 'Form Task';
        const nroButton = '1';
        navHelper.navigateToRequestsPage();
        request.openNewRequestByNumberStartButton(processName,nroButton);
        request.openTaskByTaskName(taskName);
        //first textarea
        cy.get('[title="Bold"]').first().click();
        cy.get('[title="Italic"]').first().click();
        cy.get('[class="tox-tbtn tox-split-button__chevron"]').first().click();
        cy.get('[title="Red"]').should('be.visible').click();
        cy.get('[class="tox-edit-area__iframe"]').first().then(($iframe) => {
            const $body = $iframe.contents().find('body');
            cy.wrap($body).find('strong').type('This is a test to verify textarea control');
        });
        //second textarea
        cy.get('[title="More..."]').first().click();
        cy.get('[class="tox-toolbar__overflow"]').should('be.visible');
        cy.get('[title="Bold"]').eq(1).should('be.visible').click();
        cy.get('[title="Italic"]').eq(1).should('be.visible').click();
        cy.get('[class="tox-tbtn tox-split-button__chevron"]').eq(1).should('be.visible').click();
        cy.get('[title="Dark Purple"]').should('be.visible').click();
        cy.get('[title="More..."]').first().click();
        cy.get('[class="tox-edit-area__iframe"]').eq(1).then(($iframe) => {
            const $body = $iframe.contents().find('body');
            cy.wrap($body).find('p').type('This is a test to verify textarea control');
        });
        //textarea inside a loop 1
        cy.get('[data-cy="loop-loop_1-add"]').should('be.visible').click();
        cy.get('[title="More..."]').eq(1).click();
        cy.get('[class="tox-toolbar__overflow"]').should('be.visible');
        cy.get('[title="Bold"]').eq(2).should('be.visible').click();
        cy.get('[title="Italic"]').eq(2).should('be.visible').click();
        cy.get('[class="tox-tbtn tox-split-button__chevron"]').eq(2).should('be.visible').click();
        cy.get('[title="Orange"]').should('be.visible').click();
        cy.get('[title="More..."]').eq(1).click();
        cy.get('[class="tox-edit-area__iframe"]').eq(2).then(($iframe) => {
            const $body = $iframe.contents().find('body');
            cy.wrap($body).find('p').type('This is a test to verify textarea control');
        });
        //textarea inside a loop 2
        cy.get('[data-cy="loop-loop_5-add"]').click();
        cy.get('[name="loop_5"]').should('be.visible');
        cy.get('[title="More..."]').eq(2).click();
        cy.get('[class="tox-toolbar__overflow"]').should('be.visible');
        cy.get('[title="Bold"]').eq(3).should('be.visible').click();
        cy.get('[title="Italic"]').eq(3).should('be.visible').click();
        cy.get('[class="tox-tbtn tox-split-button__chevron"]').eq(3).should('be.visible').click();
        cy.get('[title="Blue"]').should('be.visible').click();
        cy.get('[title="Bullet list"]').eq(3).should('be.visible').click();
        cy.get('[title="More..."]').eq(2).click();
        cy.get('[class="tox-edit-area__iframe"]').eq(3).then(($iframe) => {
            const $body = $iframe.contents().find('body');
            cy.wrap($body).find('li').type('This is a test to verify textarea control');
        });
        //Add textarea inside a record list
        cy.get('[class="btn btn-primary"]').first().should('be.visible').click();
        cy.get('[class="modal-content"]').first().should('be.visible');
        cy.get('.tox-toolbar__primary > :nth-child(3) > .tox-tbtn > .tox-icon > svg').click();
        cy.get('[class="tox-toolbar__overflow"]').should('be.visible');
        cy.get('[title="Bold"]').eq(5).should('be.visible').click();
        cy.get('[title="Italic"]').eq(5).should('be.visible').click();
        cy.get('[class="tox-tbtn tox-split-button__chevron"]').eq(5).should('be.visible').click();
        cy.get('[title="Dark Turquoise"]').should('be.visible').click();
        cy.get('.tox-toolbar__primary > :nth-child(3) > .tox-tbtn > .tox-icon > svg').click();
        cy.get('[class="tox-edit-area__iframe"]').eq(4).should('be.visible');
        cy.get('[class="tox-edit-area__iframe"]').eq(4).then(($iframe) => {
            const $body = $iframe.contents().find('body');
            cy.wrap($body).find('p').type('This is a test to verify textarea control');
        });
        //Add textarea inside a record list first loop
        cy.get('[data-cy="loop-loop_2-add"]').first().should('be.visible').click();
        cy.get('[title="More..."]').eq(4).click();
        cy.get('[class="tox-toolbar__overflow"]').should('be.visible');
        cy.get('[title="Bold"]').eq(5).should('be.visible').click();
        cy.get('[title="Italic"]').eq(5).should('be.visible').click();
        cy.get('[class="tox-tbtn tox-split-button__chevron"]').eq(5).should('be.visible').click();
        cy.get('[title="Dark Gray"]').should('be.visible').click();
        cy.get('[title="More..."]').eq(4).click();
        cy.get('[class="tox-edit-area__iframe"]').eq(5).should('be.visible');
        cy.get('[class="tox-edit-area__iframe"]').eq(5).then(($iframe) => {
            const $body = $iframe.contents().find('body');
            cy.wrap($body).find('p').type('This is a test to verify textarea control');
        });
        //Add textarea inside a record list second loop 2
        cy.get('[data-cy="loop-loop_4-add"]').first().should('be.visible').click();
        cy.get('[title="More..."]').eq(5).click();
        cy.get('[class="tox-toolbar__overflow"]').should('be.visible');
        cy.get('[title="Bold"]').eq(5).should('be.visible').click();
        cy.get('[title="Italic"]').eq(5).should('be.visible').click();
        cy.get('[class="tox-tbtn tox-split-button__chevron"]').eq(5).should('be.visible').click();
        cy.get('[title="Yellow"]').should('be.visible').click();
        cy.get('[title="More..."]').eq(5).click();
        cy.get('[class="tox-edit-area__iframe"]').eq(6).should('be.visible');
        cy.get('[class="tox-edit-area__iframe"]').eq(6).then(($iframe) => {
            const $body = $iframe.contents().find('body');
            cy.wrap($body).find('p').type('This is a test to verify textarea control');
        });
        cy.xpath('//button[text() = "Ok"]').click((err, runnable) => {
            return false
        });
        cy.get('.form-group > .btn').should('exist').click();
        request.verifyTaskIsCompletedB();
    }
    //TCP4-2309
    putLatestFileAtTopList(){
        cy.reload();
        cy.xpath('//table//thead//tr//th[@aria-colindex="5"]').should('be.visible');
        cy.xpath('//table//thead//tr//th[@aria-colindex="5"]').click().click();
    }

    async completeFormTCP42235 (requestId){
        cy.get('[class="col-sm-4"]').first().should('be.visible');
        cy.xpath("//p[text()='Rich textImage PNG']").should('be.visible');
        cy.get('[class="col-sm-4"]').eq(1).should('be.visible');
        cy.xpath("//p[text()='Image JPEG']").should('be.visible');
        cy.get('[class="col-sm-4"]').eq(2).should('be.visible');
        //Sign
        cy.contains('New Submit').scrollIntoView();
        cy.xpath("//p[text()='Render HTML from a Variable']").should('be.visible');
        cy.get('[data-cy="screen-field-sig"] > .signature-container > .signature > canvas').click('center');
        cy.get('[data-cy="screen-field-sig"] > .signature-container > .signature > canvas').click('left');
        cy.get('[data-cy="screen-field-sig"] > .signature-container > .signature > canvas').click('right');
        cy.get(':nth-child(3) > .row > :nth-child(2) > :nth-child(1) > .form-group > img').should('be.visible');
        cy.xpath("//p[text()='Image Render Loop Signature']").should('be.visible');
        cy.get('[data-cy="screen-field-sigLoop"] > .signature-container > .signature > canvas').click('center');
        cy.get('[data-cy="screen-field-sigLoop"] > .signature-container > .signature > canvas').click('left');
        cy.get('[data-cy="screen-field-sigLoop"] > .signature-container > .signature > canvas').click('right');
        cy.get(':nth-child(1) > .row > :nth-child(2) > :nth-child(1) > .form-group > img').should('be.visible');
        cy.get('button[title="Add Item"]').should('be.visible').click();
        cy.get(':nth-child(2) > .container-fluid > :nth-child(1) > .page > :nth-child(1) > .row > :nth-child(1) > :nth-child(1) > [data-cy="screen-field-sigLoop"] > .signature-container > .signature > canvas').click('center');
        cy.get(':nth-child(2) > .container-fluid > :nth-child(1) > .page > :nth-child(1) > .row > :nth-child(1) > :nth-child(1) > [data-cy="screen-field-sigLoop"] > .signature-container > .signature > canvas').click('left');
        cy.get(':nth-child(2) > .container-fluid > :nth-child(1) > .page > :nth-child(1) > .row > :nth-child(1) > :nth-child(1) > [data-cy="screen-field-sigLoop"] > .signature-container > .signature > canvas').click('right');
        cy.get(':nth-child(2) > .container-fluid > :nth-child(1) > .page > :nth-child(1) > .row > :nth-child(2) > :nth-child(1) > .form-group > img').should('be.visible');
        cy.get('.form-group > .btn').click();
        cy.wait(3000);
        cy.log('Applying wait time');
        var taskName = 'Form Task';
        cy.visit('/requests/'+requestId);
        request.clickOnTaskName(1, 1);
        //Review Form
        cy.get('[class="col-sm-4"]').first().should('be.visible');
        cy.xpath("//p[text()='Rich textImage PNG']").should('be.visible');
        cy.get('[class="col-sm-4"]').eq(1).should('be.visible');
        cy.xpath("//p[text()='Image JPEG']").should('be.visible');
        cy.get('[class="col-sm-4"]').eq(2).should('be.visible');
        cy.contains('New Submit').scrollIntoView();
        //Review Sign
        cy.xpath("//p[text()='Render HTML from a Variable']").should('be.visible');
        cy.get('[data-cy="screen-field-sig"] > .signature-container > .signature > canvas').should('be.visible');
        cy.get(':nth-child(3) > .row > :nth-child(2) > :nth-child(1) > .form-group > img').should('be.visible');
        cy.xpath("//p[text()='Image Render Loop Signature']").should('be.visible');
        cy.get('[data-cy="screen-field-sigLoop"] > .signature-container > .signature > canvas').should('be.visible');
        cy.get(':nth-child(1) > .row > :nth-child(2) > :nth-child(1) > .form-group > img').should('be.visible');
        //Review New Sign
        cy.get(':nth-child(2) > .container-fluid > :nth-child(1) > .page > :nth-child(1) > .row > :nth-child(1) > :nth-child(1) > [data-cy="screen-field-sigLoop"] > .signature-container > .signature > canvas').should('be.visible');
        cy.get(':nth-child(2) > .container-fluid > :nth-child(1) > .page > :nth-child(1) > .row > :nth-child(2) > :nth-child(1) > .form-group > img').should('be.visible');
        //Add New Sing
        cy.get('button[title="Add Item"]').should('be.visible').click();
        cy.get(':nth-child(3) > .container-fluid > :nth-child(1) > .page > :nth-child(1) > .row > :nth-child(1) > :nth-child(1) > [data-cy="screen-field-sigLoop"] > .signature-container > .signature > canvas').click('center');
        cy.get(':nth-child(3) > .container-fluid > :nth-child(1) > .page > :nth-child(1) > .row > :nth-child(1) > :nth-child(1) > [data-cy="screen-field-sigLoop"] > .signature-container > .signature > canvas').click('left');
        cy.get(':nth-child(3) > .container-fluid > :nth-child(1) > .page > :nth-child(1) > .row > :nth-child(1) > :nth-child(1) > [data-cy="screen-field-sigLoop"] > .signature-container > .signature > canvas').click('right');
        cy.get(':nth-child(3) > .container-fluid > :nth-child(1) > .page > :nth-child(1) > .row > :nth-child(2) > :nth-child(1) > .form-group > img').should('be.visible');
        cy.get('[class="btn btn-primary"]').click();
    }
    actionsAndAssertionsOfTCP42307(){
        //First Page
        cy.get('[id="password-input"]').should('be.visible').type("anamauricio11235813");
        cy.xpath('//button').click();

        //Fill the data
        const titleXpath = "//strong[text()='Action By Email Regression']";
        const userSelectListXpath = "//label[text()='User']/parent::div//div[@class='multiselect__tags']";
        const userLineInptXpath = "//label[text()='User']/parent::div//input";
        const optionCheckXpath = "//label[text()='option']";
        const select1SelectListXpath = "//label[text()='form_select_list_1']/parent::div//div[@class='multiselect__tags']";
        const select1LineInputXpath = "//label[text()='form_select_list_1']/parent::div//input";
        const AlabamaOption = "//label[contains(text(),'Alabama')]";
        const KansasOption = "//label[contains(text(),'Kansas')]";
        const submitBtnXpath = "//button[contains(text(),'New Submit')]";

        cy.xpath(titleXpath).should('be.visible');
        //Select an user on the first select list
        cy.xpath(userSelectListXpath).click();
        cy.xpath(userLineInptXpath).type('ana').should('have.value','ana');
        cy.xpath('//label[text()="User"]/parent::div//div[@class="multiselect__content-wrapper"]//li[1]')
            .should('have.attr', 'aria-label')
            .and('equal', "ana. ");
        cy.xpath(userLineInptXpath).type('{enter}');


        //Enable the watcher
        cy.xpath(optionCheckXpath).click();
        cy.xpath(AlabamaOption).should('be.visible').click();
        cy.xpath(KansasOption).should('be.visible').click();

        //Select an option in select list 2
        cy.xpath(select1SelectListXpath).click();
        cy.xpath(select1LineInputXpath).type('Arizona').should('have.value','Arizona');
        cy.xpath('//label[text()="form_select_list_1"]/parent::div//div[@class="multiselect__content-wrapper"]//li[1]')
            .should('have.attr', 'aria-label')
            .and('equal', "Arizona. ");
        cy.xpath(select1LineInputXpath).type('{enter}');

        //Click on Submit button
        cy.xpath(submitBtnXpath).click();

        //Verify data in the second task
        cy.xpath("//input[@type='text'][@name='data2']").should('be.visible');
        cy.xpath("//input[@type='text'][@name='data2']").should('have.value','22');
        cy.xpath("//input[@type='text'][@name='data3']").should('have.value','333');
        cy.xpath("//input[@type='text'][@name='data4']").should('have.value','4444');
        cy.xpath("//div[text()='automation@endtest-mail.io']").should('be.visible');
        cy.xpath("//div[text()='Arizona']").should('be.visible');
        cy.xpath("//div[text()='Alabama,Kansas']").should('be.visible');
        cy.xpath("//button[contains(text(),'New Submit')]").should('be.visible').click();

        //Verify that the process is complete
        cy.xpath('//h3[text()="This request is complete"]').should('be.visible');
    }

    //Fill TCP4-2301
    clickInFormTask(){
        cy.get('tr > :nth-child(2) > a').should('be.visible').click();
    }
    userTagger(tagUser){
        cy.get('[class="btn text-uppercase btn-secondary btn-sm"]')
        cy.get('[class="comment-area"]').should('be.visible')
        cy.get('[class="comment-area"]').type(tagUser);
        cy.xpath('//div[@class="comment-editor mt-2 lg"]//div[@class="card-footer"]//button').click({force:true})
    }
    replyTag(){
        cy.get('[class="btn btn-secondary btn-sm"]')
        .should("be.visible")
        .click();
    }
    viewLoadReply(){
        cy.contains(
            '[class="btn btn-outline-secondary btn-sm"]',
            "Load Replies"
        ).click();
    }
    verifyTaggedUsers(TagUserA,TagUserB){
        cy.xpath('//span[text()="Comment posted on Form Task"]/parent::div').should('contain',TagUserA);
        cy.xpath('//span[text()="Comment posted on Form Task"]/parent::div').should('contain',TagUserB);
    }

    //TCP4-2237
    //Check that there are two required fields
    checkNotificationRequiredfield(message){
        cy.get('[class="alert alert-danger mt-3"]')
    .should("be.visible")
    .should("contain", message);
    }
    //Make signature
    signInField(element){
        cy.xpath('//div[@class="signature pl-0"]').click('center');
        cy.wait(2000);
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should('not.exist');
    }
    //Verify that the required fields notification no longer appears.
    verifyNotificationNotAppear(){
        cy.get('[class="alert alert-danger mt-3"]').should("not.exist");
    }
    //Verify that the "+" button exists.
    verifyAddButtonInLoop(){
        cy.get('button[title="Add Item"]').should("be.visible").click();
    }
    //Verify that the page name you enter is correct.
    verifyUrlPage(){
        cy.url().should("eq", "https://www.ecosia.org/");
    }
    //TCP42245
    verifyDashboardContentTCP42245(){
        cy.xpath('//span[contains(text(),"Home")]//parent::a').should('be.visible');
        cy.xpath('//span[contains(text(),"Home")]//parent::a').click({ force: true });
        cy.get('#main').should('contain','This is a custom dashboard display screen!')
    }

    fillFormTCP42234(value1,value2){
        cy.get('input[name="lineInputInteger"]').type(value1,{delay:50});
        cy.get('input[name="lineInputPercentage"]').type(value2,{delay:50});
        cy.get('button[aria-label="Submit"]').click();
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should('be.visible');
    }

    verifySendScheduleReport(email, subject){
        cy.get('.search-bar-buttons > :nth-child(2) > .btn > .fas').click();
        cy.wait(2000);
        cy.xpath('//tbody//tr//td').eq(0).should('contain',subject)
        cy.xpath('//tbody//tr//td').eq(1).should('contain',email)
        cy.xpath('//tbody//tr//td').eq(2).should('contain','Every Tuesday at 09:00')
    }

    //TCP42246
    verifyDashboardContentTCP42246(){
        cy.xpath('//span[contains(text(),"Home")]//parent::a').should('be.visible');
        cy.xpath('//span[contains(text(),"Home")]//parent::a').click({ force: true });
        cy.get('#main').should('contain','This is a custom dashboard display screen!')
    }
    alertBanner(){
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should('be.visible').should('contain','Configuration Dashboard Updated')
    }

    async actionsAndAssertionsOfTCP42236(processName){
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        var requestID = await request.getRequestID();
        cy.xpath('(//tbody/tr[@item-index="0"]/td/a)[2]').should('contain.text', "Form Task").click();
        cy.xpath('//input[@aria-label="First Name"]').type('Dharma');
        cy.xpath('//input[@aria-label="Last Name"]').type('Nirvana');
        cy.xpath('//div[@class="multiselect__select"]').click();
        cy.xpath('//ul/li[@aria-label="Pass. "]/span/span[text()="Pass"]').should('be.visible').click();
        cy.xpath('//button[@aria-label="Submit"]').click();
        request.verifyTaskIsCompleted();
        navHelper.navigateToTasksPage();
        navHelper.navigateToRequestsPage();
        request.openRequestById(requestID);
        request.openTaskByTaskName('Form Task');
        cy.xpath('//input[@aria-label="First Name"]').should('be.visible');
        cy.xpath('//input[@aria-label="First Name"]').should('have.value', 'Dharma');
        cy.xpath('//input[@aria-label="Last Name"]').should('have.value', 'Nirvana');
        //cy.xpath('//button[@aria-label="Submit"]').click();
        //request.verifyTaskIsCompleted();
        //cy.reload();
        //request.waitUntilElementIsVisible('xpath','(//div[@class="flex-grow-1"])[3]',maxAttempts=10, attempts=0);
        //cy.xpath('//div[@id="request"]//div[@class="container-fluid"]/following-sibling::div//div/strong').should('be.visible');
        //cy.xpath('(//div[@class="flex-grow-1"])[3]').should('contain.text',"Admin User has completed the task Form Task");
        //cy.xpath('(//div[@class="flex-grow-1"])[4]').should('contain.text',"Admin User has completed the task Script Task");
        //cy.xpath('(//div[@class="flex-grow-1"])[5]').should('contain.text',"Admin User has completed the task Form Task");
    }
    //TCP42247
    fillFormTCP42247(aaa,bbb,ccc){
        //aaa
        cy.xpath('//div[@class="conversational-chat"]//input')
        .should("be.visible")
        .click()
        .type(aaa);
        cy.xpath('//div[@class="conversational-chat"]//button').click();
        //bbb
        cy.xpath('//div[@class="conversational-chat"]//input')
        .should("be.visible")
        .click()
        .type(bbb);
        cy.xpath('//div[@class="conversational-chat"]//button').click();
        //ccc
        cy.xpath('//div[@class="conversational-chat"]//input')
        .should("be.visible")
        .click()
        .type(ccc);
        cy.xpath('//div[@class="conversational-chat"]//button').click();
        cy.xpath('//div[@class="d-block"][1]//button').click();
        cy.get(
        '[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]'
    ).should("be.visible");
    }

    async reviewformTC53923(requestId){
        //Validation 1
        cy.get('[class="signature pl-0"]').first().should('be.visible');
        cy.get('[class="signature pl-0"]').eq(1).should('be.visible');
        cy.get('[class="signature pl-0"]').eq(2).should('be.visible');
        cy.get('[class="signature pl-0"]').eq(3).should('be.visible');
        cy.get('[class="signature pl-0"]').eq(4).should('be.visible');
        //validation 2
        cy.get('[data-cy="add-row"]').should('be.visible').click();
        cy.get('[class="modal-content"]').should('be.visible');
        cy.get('[class="signature pl-0"]').eq(5).should('be.visible');
        cy.get('[data-cy="screen-field-name"]').first().should('have.value','Ana');
        cy.xpath("//button[text()='Ok']").click();
        cy.get('[class="table-column"]').should('be.visible');
        cy.get('[data-cy="add-row"]').should('be.visible').click();
        cy.get('[class="modal-content"]').should('be.visible');
        cy.get('[class="signature pl-0"]').eq(5).should('be.visible');
        cy.get('[data-cy="screen-field-name"]').first().should('have.value','Ana');
        cy.xpath("//button[text()='Ok']").click();
        cy.get('[class="table-column"]').eq(1).should('be.visible');
        cy.get('[aria-label="New Submit"]').eq(1).should('be.visible').click();
        //Review task form 2
        var taskName = 'Form Task 2';
        cy.visit('/requests/'+requestId);
        cy.reload();
        cy.wait(2000)
        request.openTaskByTaskName(taskName);
        cy.contains('New Submit').scrollIntoView();
        //Validation 3
        cy.get('[class="signature pl-0"]').first().should('be.visible');
        cy.get('[class="signature pl-0"]').eq(1).should('be.visible');
        cy.get('[class="signature pl-0"]').eq(2).should('be.visible');
        cy.get('[class="signature pl-0"]').eq(3).should('be.visible');
        cy.get('[class="signature pl-0"]').eq(4).should('be.visible');
        cy.get('[title="Clear"]').first().click();
        cy.get('[class="signature pl-0"]').first().click();

        cy.get('[data-cy="add-row"]').should('be.visible').click();
        cy.get('[class="modal-content"]').should('be.visible');
        cy.get('[class="signature pl-0"]').eq(5).should('be.visible');
        cy.get('[data-cy="screen-field-name"]').first().should('have.value','Ana');
        cy.xpath('//button[text()="Ok"]').click();
        cy.get('[class="table-column"]').eq(2).should('be.visible');
        cy.get('[aria-label="New Submit"]').eq(1).click();
    }

    actionsAndAssertionsOfTCP42347(){
        navHelper.navigateToFileManagerPublicPage();
        var timeStamp = new Date().getTime();
        var folderName = "1-TCP4-2347:" + timeStamp;
        fileManager.createFolder(folderName);
        
        cy.visit('/file-manager/public/'+folderName);
        cy.wait(3000);
        fileManager.pressPublicFileBtn();
        fileManager.uploadFile('file1.jpg','image/jpeg');
        fileManager.pressDoneBtn();

        fileManager.pressPublicFileBtn();
        fileManager.uploadFile('file2.docx','application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        fileManager.pressDoneBtn();

        fileManager.pressPublicFileBtn();
        fileManager.uploadFile('file3.xlsx','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        fileManager.pressDoneBtn();

        fileManager.pressPublicFileBtn();
        fileManager.uploadFile('file4.pdf','application/pdf');
        fileManager.pressDoneBtn();

        fileManager.pressPublicFileBtn();
        fileManager.uploadFile('file5.pptx','application/vnd.openxmlformats-officedocument.presentationml.presentation');
        fileManager.pressDoneBtn();

        cy.visit('/file-manager/public');
        cy.visit('/file-manager/public/'+folderName);

        //Verify files
        cy.xpath('//tbody//tr').should('length', 5);
        cy.xpath('//tbody//tr/td[@aria-colindex="2"]/span').eq(0).should("have.contain","file1");
        cy.xpath('//tbody//tr/td[@aria-colindex="2"]/span').eq(1).should("have.contain","jpg");
        cy.xpath('//tbody//tr/td[@aria-colindex="2"]/span').eq(2).should("have.contain","file2");
        cy.xpath('//tbody//tr/td[@aria-colindex="2"]/span').eq(3).should("have.contain","docx");
        cy.xpath('//tbody//tr/td[@aria-colindex="2"]/span').eq(4).should("have.contain","file3");
        cy.xpath('//tbody//tr/td[@aria-colindex="2"]/span').eq(5).should("have.contain","xlsx");
        cy.xpath('//tbody//tr/td[@aria-colindex="2"]/span').eq(6).should("have.contain","file4");
        cy.xpath('//tbody//tr/td[@aria-colindex="2"]/span').eq(7).should("have.contain","pdf");
        cy.xpath('//tbody//tr/td[@aria-colindex="2"]/span').eq(8).should("have.contain","file5");
        cy.xpath('//tbody//tr/td[@aria-colindex="2"]/span').eq(9).should("have.contain","pptx");
    }
    actionsAndAssertionsOfTCP42255(requestId) {
        //Step 1: Complete form A
        //fill input
        cy.get('input[aria-label="New Input"]').should('be.visible')
        cy.get('input[aria-label="New Input"]').type('Input in line control');
        //fill text area
        cy.get('[aria-label="New Textarea"]').should('be.visible').click();
        cy.get('[aria-label="New Textarea"]').type('Input in text area',{delay:3000});
        //click on submit button
        cy.xpath('//button[@class="btn btn-primary"]').should('be.visible').click();
        //verify task is completed
        request.verifyTaskIsCompletedB();
        cy.wait(10000);

        //open request by ID
        cy.visit('/requests/' + requestId);
        request.waitUntilElementIsVisible('selector','#pending >* td:nth-child(1) >a[href^="/tasks"]',20);
        request.clickOnTaskName(1, 1);
        //click on submit button
        cy.xpath('//button[@class="btn btn-primary"]').should('be.visible').click();
        //verify task is completed
        request.verifyTaskIsCompletedB();
        
        //verify the process is completed
        request.verifyRequestisCompleted(requestId);
        cy.xpath("//div[contains(text(),'Admin User has completed the task A')]").should('be.visible');
        cy.xpath("//div[contains(text(),'Admin User has completed the task Send Email A')]").should('be.visible');
        cy.xpath("//div[contains(text(),'Admin User has completed the task Send Email B')]").should('be.visible');
        cy.xpath("//div[contains(text(),'Admin User has completed the task PDF Generator A')]").should('exist');
        cy.xpath("//div[contains(text(),'Admin User has completed the task PDF Generator C')]").should('exist');
        cy.xpath("//div[contains(text(),'Admin User has completed the task Send Email C')]").should('exist');
        cy.xpath("//div[contains(text(),'Admin User has completed the task PDF Generator B')]").should('exist');
        cy.xpath("//div[contains(text(),'Admin User has completed the task Send Email D')]").should('exist');
        cy.xpath("//div[contains(text(),'Admin User has completed the task PDF Generator D')]").should('exist');
        cy.xpath("//div[contains(text(),'Admin User has completed the task B')]").should('exist');
    }

    //TCP4-2258
    documentationOfControlInModeler(elementName,elementXpath,documentation){
        const getIframeDocument = () => {
            return cy
                .get('iframe[title="Rich Text Area. Press ALT-0 for help."]')
                .its("0.contentDocument")
                .should("exist");
        };

        const getIframeBody = () => {
            return getIframeDocument()
                .its("body")
                .should("not.be.undefined")
                .then(cy.wrap);
        };
        //const elementTaskXpath = "//*[text()='nameElem']/ancestor::*[@data-type='processmaker.components.nodes.task.Shape']"
        cy.xpath(elementXpath.replace('nameElem',elementName)).first().should('be.visible').click();
        cy.get('[data-cy="inspector-button"]').should('be.visible').click();
        cy.get('[id="accordion-button-documentation-accordion"]').click();
        getIframeBody().find("p").should("exist").click().clear();
        getIframeBody()
            .find("p")
            .should("exist")
            .click()
            .type(documentation);
        cy.get('[data-cy="inspector-close-button"]').click().wait(6000);
    }
    assertionsOfTCP42258(){
        //start Event
        cy.xpath(
            '//i[@title="Start Event"]/ancestor::div[@class="card mb-3 mr-2 ml-2"]//p'
        ).should("contain", "Add documentation in Start Event control");
        //form tasks
        cy.xpath('//strong[text()="A"]/ancestor::div[@class="card mb-3 mr-2 ml-2"]//p').should("contain", "Add documentation in Form Task 'A' control");
        cy.xpath('//strong[text()="B"]/ancestor::div[@class="card mb-3 mr-2 ml-2"]//p').should("contain", "Add documentation in Form Task 'B' control");
        cy.xpath('//strong[text()="AA"]/ancestor::div[@class="card mb-3 mr-2 ml-2"]//p').should("contain", "Add documentation in Form Task 'AA' control");
        cy.xpath('//strong[text()="C"]/ancestor::div[@class="card mb-3 mr-2 ml-2"]//p').should("contain", "Add documentation in Manual Task 'C' control");
        cy.xpath('//strong[text()="D"]/ancestor::div[@class="card mb-3 mr-2 ml-2"]//p').should("contain", "Add documentation in Script Task 'D' control");
    }

    completeFormTCP42240(requestId){
        cy.xpath("//label[text()='Checkbox']").should("be.visible").click();
        cy.get('[data-cy="screen-field-form_checkbox_2"]').should("be.visible").uncheck();
        cy.xpath("//label[text()='Checkbox Checked by default Form']").should("be.visible");
        cy.xpath("//label[text()='Checkbox Toggle Style Form']").should("be.visible").click();
        //Loop New  Array of Object
        cy.xpath("//label[text()='Checkbox Loop']").should("be.visible").click();
        cy.get('[data-cy="screen-field-form_checkbox_8"]').should("be.visible").uncheck();
        cy.xpath("//label[text()='Checkbox Checked by default Loop']").should("be.visible");
        cy.xpath("//label[text()='Checkbox Toggel style Loop']").should("be.visible").click();
        //Add new loop
        cy.get('[data-cy="loop-loop_1-add"]').should("be.visible").click();
        cy.get(':nth-child(2) > .container-fluid > :nth-child(1) > .page').should("be.visible");
        cy.get('[data-cy="screen-field-form_checkbox_5"]').eq(1).should("be.visible").click();
        cy.get('[data-cy="screen-field-form_checkbox_8"]').eq(1).should("be.visible").uncheck();
        cy.get('[data-cy="screen-field-form_checkbox_7"]').eq(1).should("be.visible");
        cy.get(':nth-child(2) > .container-fluid > :nth-child(1) > .page > :nth-child(4) > .form-group > .custom-control > .custom-control-label').click();
        //Loop Existing Array
        cy.get('[data-cy="loop-loop_2-add"]').should("be.visible").click();
        cy.xpath('//strong[text()="Loop Existing Array"]//ancestor::div[@class="col-sm-6"]/div[2]//div[@class="page"]').should("be.visible");
        cy.get('[data-cy="screen-field-form_checkbox_9"]').should("be.visible").click();
        cy.get('[data-cy="screen-field-form_checkbox_12"]').should("be.visible").uncheck();
        cy.get('[data-cy="screen-field-form_checkbox_11"]').should("be.visible");
        cy.get(':nth-child(2) > :nth-child(2) > [icon="fas fa-redo"] > :nth-child(1) > .container-fluid > :nth-child(1) > .page > :nth-child(4) > .form-group > .custom-control > .custom-control-label').should("be.visible").click();
        //Add new loop
        cy.get('[data-cy="loop-loop_2-add"]').should("be.visible").click();
        cy.xpath('//strong[text()="Loop Existing Array"]//ancestor::div[@class="col-sm-6"]/div[2]/div/div[2]').should("be.visible");
        cy.get('[data-cy="screen-field-form_checkbox_9"]').eq(1).should("be.visible").click();
        cy.get('[data-cy="screen-field-form_checkbox_12"]').eq(1).should("be.visible").uncheck();
        cy.get('[data-cy="screen-field-form_checkbox_11"]').eq(1).should("be.visible");
        cy.get(':nth-child(2) > :nth-child(2) > [icon="fas fa-redo"] > :nth-child(2) > .container-fluid > :nth-child(1) > .page > :nth-child(4) > .form-group > .custom-control > .custom-control-label').should("be.visible").click();
        //Record List
        cy.get('[data-cy="add-row"]').should("be.visible").click();
        cy.get('[class="modal-content"]').should("be.visible");
        cy.get('[data-cy="screen-field-form_checkbox_13"]').first().should("be.visible").check();
        cy.get('[data-cy="screen-field-form_checkbox_14"]').first().should("be.visible").uncheck();
        cy.get('[data-cy="screen-field-form_checkbox_15"]').first().should("be.visible");
        cy.xpath('//h5[text()="Add"]/ancestor::div[@class="modal-content"]/div//div[@class="row"]/div[4]//input[@data-cy="screen-field-form_checkbox_16"]').first().check({force: true});
        cy.xpath("//button[text()='Ok']").should("be.visible").click();
        cy.xpath('//tr[@role="row"]').should("be.visible");
        //Record List 2
        cy.get('[data-cy="add-row"]').should("be.visible").click();
        cy.get('[class="modal-content"]').should("be.visible");
        cy.get('[data-cy="screen-field-form_checkbox_13"]').first().should("be.visible").check();
        cy.get('[data-cy="screen-field-form_checkbox_14"]').first().should("be.visible").uncheck();
        cy.get('[data-cy="screen-field-form_checkbox_15"]').first().should("be.visible");
        cy.xpath('//h5[text()="Add"]/ancestor::div[@class="modal-content"]/div//div[@class="row"]/div[4]//input[@data-cy="screen-field-form_checkbox_16"]').first().check({force: true});
        cy.xpath("//button[text()='Ok']").should("be.visible").click();
        cy.xpath('//tr[@role="row"]').should("be.visible");
        //Submit
        cy.xpath("//button[contains(text(),'New Submit')]").should("be.visible").click();
        request.verifyTaskIsCompletedB();
        //Review task
        request.openRequestById(requestId);
        request.waitUntilElementIsVisible('selector', '#pending >* td:nth-child(1) >a[href^="/tasks"]');
        request.clickOnTaskName(1, 1);
        cy.xpath('//div[@class="custom-css-scope container-desktop"]').first().should("be.visible");
        //Add new loop
        cy.get('[data-cy="loop-loop_1-add"]').should("be.visible").click();
        cy.get(':nth-child(3) > .container-fluid > :nth-child(1) > .page').should("be.visible");
        cy.get('[data-cy="screen-field-form_checkbox_5"]').eq(2).should("be.visible").click();
        cy.get('[data-cy="screen-field-form_checkbox_8"]').eq(2).should("be.visible").uncheck();
        cy.get('[data-cy="screen-field-form_checkbox_7"]').eq(2).should("be.visible");
        cy.get(':nth-child(3) > .container-fluid > :nth-child(1) > .page > :nth-child(4) > .form-group > .custom-control > .custom-control-label').click();
        //Loop new Existing Array
        cy.get('[data-cy="loop-loop_2-add"]').should("be.visible").click();
        cy.xpath('//strong[text()="Loop Existing Array"]//ancestor::div[@class="col-sm-6"]/div[2]/div/div[3]').should("be.visible");
        cy.get('[data-cy="screen-field-form_checkbox_9"]').eq(2).should("be.visible").click();
        cy.get('[data-cy="screen-field-form_checkbox_12"]').eq(2).should("be.visible").uncheck();
        cy.get('[data-cy="screen-field-form_checkbox_11"]').eq(2).should("be.visible");
        cy.get(':nth-child(2) > :nth-child(2) > [icon="fas fa-redo"] > :nth-child(3) > .container-fluid > :nth-child(1) > .page > :nth-child(4) > .form-group > .custom-control > .custom-control-label').should("be.visible").click();
        //Record List
        cy.get('[data-cy="add-row"]').should("be.visible").click();
        cy.get('[class="modal-content"]').first().should("be.visible");
        cy.get('[data-cy="screen-field-form_checkbox_13"]').first().should("be.visible").check();
        cy.get('[data-cy="screen-field-form_checkbox_14"]').first().should("be.visible").uncheck();
        cy.get('[data-cy="screen-field-form_checkbox_15"]').first().should("be.visible");
        cy.xpath('//h5[text()="Add"]/ancestor::div[@class="modal-content"]/div//div[@class="row"]/div[4]//input[@data-cy="screen-field-form_checkbox_16"]').first().check({force: true});
        cy.xpath("//button[text()='Ok']").should("be.visible").click();
        cy.xpath('//tr[@role="row"]').should("be.visible");
        //Submit
        cy.xpath("//button[contains(text(),'New Submit')]").should("be.visible").click();
        request.verifyTaskIsCompletedB();

        //Review Summary and forms
        cy.xpath("//a[contains(text(),'Summary')]").should("be.visible");
        cy.xpath("//a[contains(text(),'Forms')]").click();
        cy.xpath('//button[@title="Details"]').first().should("be.visible").click();
    }
    //TCP42251
    completedTask(){
        cy.get('[class="btn btn-primary"]')
            .should("contain", "Complete Task")
            .click();
    }
    fillFormTCP42251(){
        cy.get('input[name="input"]').type("New Input");
        cy.get('[data-cy="screen-field-checkbox"]').check();
        cy.xpath('//*[@data-cy="screen-field-date"]//input').type("2022-09-01").type("{enter}");
        cy.get('[data-cy="screen-field-textarea"]')
            .click()
            .type("New Text Area");
    }
    assertionsTCP2251FirstScenario(){
        var locator ='//div[@class="px-4 mb-2 timeline"]//div[@class="flex-grow-1"]'
        var taskA='Admin User has completed the task A'
        var taskB='Admin User has completed the task B'
        var taskC='Admin User has completed the task C'
        var taskD='Admin User has completed the task D'
        var taskE='Admin User has completed the task E'
        var taskF='Admin User has completed the task F'
        var taskG='Admin User has completed the task G'

       cy.xpath(locator).eq(0).should('contain',taskA)
       cy.xpath(locator).eq(1).should('contain',taskB)
       cy.xpath(locator).eq(2).should('contain','Admin User has completed the task Script Task')
       cy.xpath(locator).eq(3).should('contain',taskC)
       cy.xpath(locator).eq(4).should('contain',taskD)
       cy.xpath(locator).eq(5).should('contain',taskE)
       cy.xpath(locator).eq(6).should('contain',taskF)
       cy.xpath(locator).eq(7).should('contain',taskG)
    }
    assertionsTCP2251SecondScenario(){
        var locator ='//div[@class="px-4 mb-2 timeline"]//div[@class="flex-grow-1"]'
        var taskA='Admin User has completed the task A'
        var taskB='Admin User has completed the task B'
        var taskC='Admin User has completed the task C'
        var taskD='Admin User has completed the task D'
        var taskE='Admin User has completed the task E'
        var taskF='Admin User has completed the task F'
        var taskG='Admin User has completed the task G'

       cy.xpath(locator).eq(0).should('contain',taskB)
       cy.xpath(locator).eq(1).should('contain','Admin User has completed the task Script Task')
       cy.xpath(locator).eq(2).should('contain',taskC)
       cy.xpath(locator).eq(3).should('contain',taskD)
       cy.xpath(locator).eq(4).should('contain',taskE)
       cy.xpath(locator).eq(5).should('contain',taskF)
       cy.xpath(locator).eq(6).should('contain',taskG)
    }
    assertionsTCP2251ThirdScenario(){
        var locator ='//div[@class="px-4 mb-2 timeline"]//div[@class="flex-grow-1"]'
        var taskA='Admin User has completed the task A'
        var taskB='Admin User has completed the task B'
        var taskC='Admin User has completed the task C'
        var taskD='Admin User has completed the task D'
        var taskE='Admin User has completed the task E'
        var taskF='Admin User has completed the task F'
        var taskG='Admin User has completed the task G'

       cy.xpath(locator).eq(0).should('contain',taskC)
       cy.xpath(locator).eq(1).should('contain',taskD)
       cy.xpath(locator).eq(2).should('contain',taskF)
       cy.xpath(locator).eq(3).should('contain',taskG)
    }
    actionsAndAssertionsOfTCP42268(){
        //Step 1: Complete the Form A
        cy.get('[class="card card-body border-top-0 h-100 form-screen"]').should("be.visible");
        cy.xpath('//text()[contains(.,"New Date Picker")]/ancestor::div[@data-cy="screen-field-form_date_picker_1"]//input').type('2022-09-30 19:01{enter}');
        cy.xpath("//strong[text()='Nested Validations']").should("be.visible");

        //Step 2: Complete Options Menu
        cy.xpath("//input[@type='text'][@name='form_input_1']").should("be.visible");
        cy.xpath("//input[@type='text'][@name='form_input_2']").type('place holder').should('have.value','place holder');
        cy.xpath("//input[@type='text'][@name='form_input_3']").type('helper text').should('have.value','helper text');
        cy.xpath("//small[text()='helper text']").should("be.visible");
        cy.xpath("//input[@type='text'][@name='design']").type('design').should('have.value','design');
        cy.xpath("//input[@type='text'][@name='form_input_5']").should('have.value','paos default  value');
        cy.xpath("//input[@type='text'][@name='form_input_4']").type('30/09/1993{enter}').should('have.value','30/09/1993');
        cy.xpath("//input[@type='text'][@name='form_input_7']").type('300-05-1993{enter}').should('have.value','300-05-1993');

        //Step 3: Validations Rules
        cy.xpath("//span[text()='Validations Rules']").should("be.visible");
        cy.xpath("//input[@type='text'][@name='form_input_8']").type('yes').should('have.value','yes');
        cy.xpath("//input[@type='text'][@name='form_input_9']").type('2022-10-30{enter}');
        cy.xpath("//input[@type='text'][@name='form_input_10']").type('2022-09-30{enter}');
        cy.xpath("//input[@type='text'][@name='Alpha']").type('Mayita').should('have.value','Mayita');
        cy.xpath("//input[@type='text'][@name='AlphaNumeric']").type('Mayita123').should('have.value','Mayita123');
        cy.xpath("//input[@type='text'][@name='BeforeDate']").type('2022-08-30{enter}');
        cy.xpath("//input[@type='text'][@name='BeforeorEqualtoDate']").type('2022-08-30{enter}');
        cy.xpath("//input[@type='text'][@name='BetweenMin5Max10']").type('7{enter}').should('have.value','7');
        cy.xpath("//input[@type='text'][@name='Date']").type('2022-09-30{enter}');
        cy.xpath("//input[@type='text'][@name='email']").type('automation.pm4@gmail.com').should('have.value','automation.pm4@gmail.com');
        cy.xpath("//input[@type='text'][@name='In7']").type('7').should('have.value','7');
        cy.xpath("//input[@type='text'][@name='MaxLength12']").type('123456789000').should('have.value','123456789000');
        cy.xpath("//input[@type='text'][@name='MinLength3']").type('123').should('have.value','123');
        cy.xpath("//input[@type='text'][@name='NotIn9']").type('8').should('have.value','8');
        cy.xpath("//input[@type='text'][@name='form_input_13']").type('xyz').should('have.value','xyz');
        cy.xpath("//input[@type='text'][@name='form_input_15']").type('required').should('have.value','required');
        cy.xpath("//input[@type='text'][@name='RequiredIfdateStart']").type('2021-09-01{enter}').should('have.value','2021-09-01');
        cy.xpath("//input[@type='text'][@name='form_input_12']").type('2021-09-02{enter}').should('have.value','2021-09-02');
        cy.xpath("//input[@type='text'][@name='form_input_16']").type('automation.pm4@gmail.com').should('have.value','automation.pm4@gmail.com');
        cy.xpath("//input[@type='text'][@name='form_input_17']").type('https://qualitlabs-qa.processmaker.net/').should('have.value','https://qualitlabs-qa.processmaker.net/');

        //Step 4: Date Type
        cy.xpath("//input[@type='text'][@name='TEXT']").type('TEXT').should('have.value','TEXT');
        cy.xpath("//input[@type='number'][@name='INTEGER']").type('73042172').should('have.value','73042172');
        cy.xpath("//input[@type='text'][@name='CURRENCY']").type('100{enter}').should('have.value','100,00');
        cy.xpath("//input[@type='text'][@name='PERCENTAGE']").type('90{enter}').should('have.value','90.00 %');
        cy.xpath("//input[@type='number'][@name='DECIMAL']").type('12.3{enter}').should('have.value','12.3');
        cy.xpath("//input[@type='text'][@name='DATETIME']").type('1993-09-30 12:00{enter}');
        cy.xpath("//input[@type='text'][@name='DATE']").type('1993-09-30{enter}').should('have.value','1993-09-30');
        cy.xpath("//input[@type='password'][@name='PASSWORD']").type('Colosa123{enter}').should('have.value','Colosa123');

        //Step 5: Combinations
        cy.xpath("//input[@type='text'][@name='form_input_11']").type('125').should('have.value','125.00 BOB');
        cy.xpath("//input[@type='password'][@name='form_input_14']").type('Colosa');
        cy.xpath("//input[@type='number'][@name='form_input_18']").type('29').should('have.value','29');
        cy.xpath("//input[@type='text'][@name='form_input_19']").type('125').should('have.value','125.00 %');

        //Step 6: Submit the form
        cy.wait(3000);
        cy.get(':nth-child(4) > .form-group > .btn').should("be.enabled");
        cy.get(':nth-child(4) > .form-group > .btn').click();
        request.verifyTaskIsCompletedB();

        cy.get('[name=request-id]').invoke('attr', 'content').should('not.be.empty');
        cy.get("[name='request-id']").invoke('attr', 'content').then((requestId)=>{

            //Step 7: login
            login.navigateToUrl();
            login.login();

            //Step 7: Open the Second Task
            cy.visit('/requests/'+requestId);
            request.waitUntilElementIsVisible('selector','#pending >* td:nth-child(1) >a[href^="/tasks"]');
            request.clickOnTaskName(1, 1);

            //Step 8: Review form task
            cy.xpath("//input[@type='text'][@name='form_input_1']").should("be.visible");
            cy.xpath("//input[@type='text'][@name='form_input_2']").should('have.value','place holder');
            cy.xpath("//input[@type='text'][@name='form_input_3']").should('have.value','helper text');
            cy.xpath("//small[text()='helper text']").should("be.visible");
            cy.xpath("//input[@type='text'][@name='design']").should('have.value','design');
            cy.xpath("//input[@type='text'][@name='form_input_5']").should('have.value','paos default  value');
            cy.xpath("//input[@type='text'][@name='form_input_4']").should('contain.value','1993');
            cy.xpath("//input[@type='text'][@name='form_input_7']").should('contain.value','1993');
            //Validations Rules
            cy.xpath("//span[text()='Validations Rules']").should("be.visible");
            cy.xpath('//text()[contains(.,"dateStart")]/ancestor::div[@data-cy="screen-field-dateStart"]//input').should('contain.value','2022');
            cy.xpath("//input[@type='text'][@name='form_input_8']").should('have.value','yes');
            cy.xpath("//input[@type='text'][@name='form_input_9']").should('contain.value','2022');
            cy.xpath("//input[@type='text'][@name='form_input_10']").should('contain.value','2022');
            cy.xpath("//input[@type='text'][@name='Alpha']").should('have.value','Mayita');
            cy.xpath("//input[@type='text'][@name='AlphaNumeric']").should('have.value','Mayita123');
            cy.xpath("//input[@type='text'][@name='BeforeDate']").should('contain.value','2022');
            cy.xpath("//input[@type='text'][@name='BeforeorEqualtoDate']").should('contain.value','2022');
            cy.xpath("//input[@type='text'][@name='BetweenMin5Max10']").should('have.value','7');
            cy.xpath("//input[@type='text'][@name='Date']").should('contain.value','2022');
            cy.xpath("//input[@type='text'][@name='email']").should('have.value','automation.pm4@gmail.com');
            cy.xpath("//input[@type='text'][@name='In7']").should('have.value','7');
            cy.xpath("//input[@type='text'][@name='MaxLength12']").should('have.value','123456789000');
            cy.xpath("//input[@type='text'][@name='MinLength3']").should('have.value','123');
            cy.xpath("//input[@type='text'][@name='NotIn9']").should('have.value','8');
            cy.xpath("//input[@type='text'][@name='form_input_13']").should('have.value','xyz');
            cy.xpath("//input[@type='text'][@name='form_input_15']").should('have.value','required');
            cy.xpath("//input[@type='text'][@name='RequiredIfdateStart']").should('contain.value','2021');
            cy.xpath("//input[@type='text'][@name='form_input_12']").should('contain.value','2021');
            cy.xpath("//input[@type='text'][@name='form_input_16']").should('have.value','automation.pm4@gmail.com');
            cy.xpath("//input[@type='text'][@name='form_input_17']").should("be.visible").should('have.value','https://qualitlabs-qa.processmaker.net/');
            //Date Type
            cy.xpath("//input[@type='text'][@name='TEXT']").should('have.value','TEXT');
            cy.xpath("//input[@type='number'][@name='INTEGER']").should('have.value','73042172');
            cy.xpath("//input[@type='text'][@name='CURRENCY']").should('have.value','100,00');
            cy.xpath("//input[@type='text'][@name='PERCENTAGE']").should('have.value','90.00 %');
            cy.xpath("//input[@type='number'][@name='DECIMAL']").should('have.value','12.3');
            cy.xpath("//input[@type='text'][@name='DATETIME']").should('contain.value','1993');
            cy.xpath("//input[@type='text'][@name='DATE']").should('contain.value','1993');
            cy.xpath("//input[@type='password'][@name='PASSWORD']").should('have.value','Colosa123');
            cy.contains('Combinations').scrollIntoView();
            //Combinations
            cy.xpath("//input[@type='text'][@name='form_input_11']").should('have.value','125.00 BOB');
            cy.xpath("//input[@type='password'][@name='form_input_14']").should("be.visible");
            cy.xpath("//input[@type='number'][@name='form_input_18']").should('have.value','29');
            cy.xpath("//input[@type='text'][@name='form_input_19']").should('have.value','125.00 %');

            //Step 9: Submit the form
            cy.wait(2000);
            cy.get(':nth-child(4) > .form-group > .btn').should("be.enabled");
            cy.get(':nth-child(4) > .form-group > .btn').click();
            request.waitUntilTextcontainText('selector','varHeader','Completed');
        });
    }

    actionsAndAssertionsOfTCP42274(requestId){
        //Step 1: Verify Page is load
        cy.xpath("//input[@type='text'][@class='form-control']").should("be.visible").type('2022-09-30 18:24{enter}');

        //Step 2: Complete the Screen A
        cy.get('[data-cy="screen-field-sig1"] > .signature-container > .signature > canvas').click('center');
        cy.get('[data-cy="screen-field-sigNotrequired"] > .signature-container > .signature > canvas').click('center');

        //a) Add Sign loop New Array of Objects
        cy.get('[data-cy="screen-field-sig2"] > .signature-container > .signature > canvas').click('center');

        //b) Add loop
        cy.get('[data-cy="loop-loop_1-add"]').click();
        cy.xpath('(//div[@data-cy="screen-field-sig2"]//canvas)[2]').should("be.visible");
        cy.xpath('(//div[@data-cy="screen-field-sig2"]//canvas)[2]').click('center');

        //c) Add Sign loop - Existing Array
        cy.get('[data-cy="loop-loop_2-add"]').click();
        cy.get('[data-cy="screen-field-sig3"] > .signature-container > .signature > canvas').should("be.visible");
        cy.get('[data-cy="screen-field-sig3"] > .signature-container > .signature > canvas').click('center');

        //d) Add loop
        cy.get('[data-cy="loop-loop_2-add"]').click();
        cy.get(':nth-child(2) > .container-fluid > :nth-child(1) > .page > :nth-child(1) > [data-cy="screen-field-sig3"] > .signature-container > .signature > canvas').should("be.visible").click('center');

        //e) Add Sign Record list
        cy.get('[data-cy="add-row"]').click();
        cy.get('[class="modal-content"]').first().should("be.visible");

        //f) Add Sing
        cy.xpath('//h5[text()="Add"]//ancestor::div[@class="modal-content"]//div[@data-cy="screen-field-ss1"]//canvas').click('center');

        //g) Add Loop RL sing
        cy.xpath('//h5[text()="Add"]//ancestor::div[@class="modal-content"]//div[@name="S-RL"]/div[2]//div[@data-cy="screen-field-ss2"]/div/div[2][@class="signature pl-0"]').click('center');

        //h) Add loop
        cy.get('[data-cy="loop-loop_3-add"]').first().click();
        cy.xpath('//h5[text()="Add"]//ancestor::div[@class="modal-content"]//div[@name="S-RL"]//div/div[2]//div[@data-cy="screen-field-ss2"]/div/div[2][@class="signature pl-0"]').should("be.visible").click('center');

        //i) Add Sign loop RL - Existing Array
        cy.get('[data-cy="loop-loop_4-add"]').first().click();
        cy.xpath('//h5[text()="Add"]//ancestor::div[@class="modal-content"]//div[@name="S-RL"]/div[2]/div/div[2]//div[@name="loop_4"]//div[@data-cy="screen-field-ss3"]//div[@class="signature pl-0"]').should("be.visible").click('center');

        cy.xpath('//span[contains(text(),"Signature saved successfully")]').should('be.visible');
        cy.xpath('//span[contains(text(),"Signature saved successfully")]').should('not.exist');
        cy.xpath("//button[text()='Ok']").click();

        //j) Submit
        cy.xpath("//button[contains(text(),'New Submit')]").eq(1).click();
        request.verifyTaskIsCompletedB();

        //Step 3: Review Screen A
        cy.visit('/requests/'+requestId);
        request.waitUntilElementIsVisible('selector','#pending >* td:nth-child(1) >a[href^="/tasks"]');
        request.clickOnTaskName(1, 1);
        //a) Review Sign
        cy.get('[data-cy="screen-field-sig1"] > .signature-container > .signature > canvas').should("be.visible");
        cy.get('[data-cy="screen-field-sigNotrequired"] > .signature-container > .signature > canvas').should("be.visible");
        //b) Review Sign loop New Array of Objects
        cy.get('[data-cy="screen-field-sig2"] > .signature-container > .signature > canvas').should("be.visible");
        //c) Review add loop
        cy.get(':nth-child(2) > .container-fluid > :nth-child(1) > .page > :nth-child(1) > [data-cy="screen-field-sig2"] > .signature-container > .signature > canvas').should("be.visible");
        //d) Review Sign loop - Existing Array
        cy.get('[data-cy="screen-field-sig3"] > .signature-container > .signature > canvas').should("be.visible");
        //e) Review add loop
        cy.get(':nth-child(2) > .container-fluid > :nth-child(1) > .page > :nth-child(1) > [data-cy="screen-field-sig3"] > .signature-container > .signature > canvas').should("be.visible");
        //f) Review Sign Record list
        cy.get('[data-cy="add-row"]').should("be.visible").click();
        cy.get('[class="modal-content"]').first().should("be.visible");
        //g) Review Sing
        cy.xpath('//h5[text()="Add"]//ancestor::div[@class="modal-content"]//div[@data-cy="screen-field-ss1"]//div[@class="signature pl-0"]').click('center');

        //h) Review Loop RL sing
        cy.xpath('//h5[text()="Add"]//ancestor::div[@class="modal-content"]//div[@name="S-RL"]/div[2]//div[@data-cy="screen-field-ss2"]/div/div[2][@class="signature pl-0"]').click('center');

        //i) Review add loop
        cy.get('[data-cy="loop-loop_3-add"]').first().should("be.visible").click();
        cy.xpath('//h5[text()="Add"]//ancestor::div[@class="modal-content"]//div[@name="S-RL"]//div/div[2]//div[@data-cy="screen-field-ss2"]/div/div[2][@class="signature pl-0"]').click('center');

        //j) Review Sign loop RL - Existing Array
        cy.get('[data-cy="loop-loop_4-add"]').first().should("be.visible").click();
        cy.xpath('//h5[text()="Add"]//ancestor::div[@class="modal-content"]//div[@name="S-RL"]/div[2]/div/div[2]//div[@name="loop_4"]//div[@data-cy="screen-field-ss3"]//div[@class="signature pl-0"]').click('center');

        cy.xpath('//span[contains(text(),"Signature saved successfully")]').should('be.visible');
        cy.xpath('//span[contains(text(),"Signature saved successfully")]').should('not.exist');
        cy.xpath(" //button[text()='Ok']").should("be.visible").click();
        //k) Submit
        cy.xpath("//button[contains(text(),'New Submit')]").eq(1).click();
        request.verifyTaskIsCompletedB();

        //Step 4: Review Summary and forms
        cy.xpath("//a[contains(text(),'Summary')]").should("be.visible").click();
        cy.xpath("//a[contains(text(),'Forms')]").click();
        cy.xpath("//button[@title='Details']").should("be.visible");
        cy.xpath("//a[contains(text(),'Completed')]").click();
        cy.xpath("//a[contains(text(),'Form Task')]").should("be.visible");
    }
    assertionsOfTCP42290(){
        //start Event
        cy.xpath(
            '//i[@title="Start Event"]/ancestor::div[@class="card mb-3 mr-2 ml-2"]//p'
        ).should("contain", "Add documentation in Start Event control");
        //form task
        cy.xpath('//strong[text()="FormTask"]/ancestor::div[@class="card mb-3 mr-2 ml-2"]//p').should("contain", "Add documentation in Form Task control");
        //end Event
        cy.xpath(
            '//i[@title="End Event"]/ancestor::div[@class="card mb-3 mr-2 ml-2"]//p'
        ).should("contain", "Add documentation in End Event control");
    }
    actionsAndAssertionsOfTCP42278(){
        //Validations Rules
        request.waitUntilElementIsVisible('selector','[class="conversational-chat"]');
        cy.xpath("//input[@type='text'][@name='form_input_1']").should("be.visible").type('no{enter}');
        cy.xpath("//div[contains(text(),'The Accepted must be accepted.')]").should("be.visible");
        cy.xpath("//input[@type='text'][@name='form_input_1']").clear();
        cy.xpath("//input[@type='text'][@name='form_input_1']").should("be.visible").type('yes{enter}');

        cy.xpath("//input[@type='text'][@name='form_input_12']").should("be.visible").type('2019-10-10{enter}');
        cy.xpath("//div[contains(text(),'The After Date 2020-10-10 must be after 2020/10/10.')]").should("be.visible");
        cy.xpath("//input[@type='text'][@name='form_input_12']").should("be.visible").clear();
        cy.xpath("//input[@type='text'][@name='form_input_12']").should("be.visible").type('2022-09-30{enter}');

        cy.xpath("//input[@type='text'][@name='form_input_13']").should("be.visible").type('2020-09-10{enter}');
        cy.xpath("//div[contains(text(),'The After or Equal to Date 2020-10-10 must be equal or after 2020/10/10.')]").should("be.visible");
        cy.xpath("//input[@type='text'][@name='form_input_13']").should("be.visible").type('{selectall}{backspace}');
        cy.xpath("//input[@type='text'][@name='form_input_13']").should("be.visible").type('2020-10-10{enter}');

        cy.xpath("//input[@type='text'][@name='form_input_14']").should("be.visible").type('123{enter}');
        cy.xpath("//div[contains(text(),'The Alpha field must contain only alphabetic characters.')]").should("be.visible");
        cy.xpath("//input[@type='text'][@name='form_input_14']").should("be.visible").type('{selectall}{backspace}');
        cy.xpath("//input[@type='text'][@name='form_input_14']").should("be.visible").type('Mayita{enter}');

        cy.xpath("//input[@type='text'][@name='form_input_5']").should("be.visible").type('test.test.{enter}');
        cy.xpath("//div[contains(text(),'The text Alpha numeric field must be alphanumeric.')]").should("be.visible");
        cy.xpath("//input[@type='text'][@name='form_input_5']").should("be.visible").type('{selectall}{backspace}');
        cy.xpath("//input[@type='text'][@name='form_input_5']").should("be.visible").type('Mayita123{enter}');

        cy.xpath("//input[@type='text'][@name='form_input_15']").should("be.visible").type('2023-08-30{enter}');
        cy.xpath("//div[contains(text(),'The Before date 2020-10-10 must be before 2020/10/10.')]").should("be.visible");
        cy.xpath("//input[@type='text'][@name='form_input_15']").should("be.visible").type('{selectall}{backspace}');
        cy.xpath("//input[@type='text'][@name='form_input_15']").should("be.visible").type('2019-08-30{enter}');

        cy.xpath("//input[@type='text'][@name='form_input_16']").should("be.visible").type('2022-08-30{enter}');
        cy.get(".invalid-feedback > div").should("be.visible");
        cy.xpath("//input[@type='text'][@name='form_input_16']").should("be.visible").type('{selectall}{backspace}');
        cy.xpath("//input[@type='text'][@name='form_input_16']").should("be.visible").type('2020-10-10{enter}');

        cy.xpath("//input[@type='text'][@name='form_input_17']").should("be.visible").type('1{enter}');
        cy.xpath("//div[contains(text(),'Must have a value between 3,8')]").should("be.visible");
        cy.xpath("//input[@type='text'][@name='form_input_17']").should("be.visible").type('{selectall}{backspace}');
        cy.xpath("//input[@type='text'][@name='form_input_17']").should("be.visible").type('8{enter}');

        cy.xpath("//input[@type='text'][@name='form_input_18']").should("be.visible").type('Date{enter}');
        cy.xpath("//div[contains(text(),'The Date must be a valid date.')]").should("be.visible");
        cy.xpath("//input[@type='text'][@name='form_input_18']").should("be.visible").type('{selectall}{backspace}');
        cy.xpath("//input[@type='text'][@name='form_input_18']").should("be.visible").type('2022-09-30{enter}');

        cy.xpath("//input[@type='text'][@name='form_input_9']").should("be.visible").type('automation.pm4{enter}');
        cy.xpath("//div[contains(text(),'The new email format is invalid.')]").should("be.visible");
        cy.xpath("//input[@type='text'][@name='form_input_9']").should("be.visible").type('{selectall}{backspace}');
        cy.xpath("//input[@type='text'][@name='form_input_9']").should("be.visible").type('automation.pm4@gmail.com{enter}');

        cy.xpath("//input[@type='text'][@name='form_input_19']").should("be.visible").type('7{enter}');
        cy.xpath("//div[contains(text(),'The selected In 8 is invalid.')]").should("be.visible");
        cy.xpath("//input[@type='text'][@name='form_input_19']").should("be.visible").type('{selectall}{backspace}');
        cy.xpath("//input[@type='text'][@name='form_input_19']").should("be.visible").type('8{enter}');

        cy.xpath("//input[@type='text'][@name='form_input_20']").should("be.visible").type('1234567890{enter}');
        cy.xpath("//div[contains(text(),'The Max Length 7 may not be greater than 7 characters.')]").should("be.visible");
        cy.xpath("//input[@type='text'][@name='form_input_20']").should("be.visible").type('{selectall}{backspace}');
        cy.xpath("//input[@type='text'][@name='form_input_20']").should("be.visible").type('1234567{enter}');

        cy.xpath("//input[@type='text'][@name='form_input_21']").should("be.visible").type('12{enter}').should('have.value','12');
        cy.xpath("//div[contains(text(),'The Min Length 4 must be at least 4 characters.')]").should("be.visible");
        cy.xpath("//input[@type='text'][@name='form_input_21']").should("be.visible").type('{selectall}{backspace}');
        cy.xpath("//input[@type='text'][@name='form_input_21']").should("be.visible").type('1234{enter}');

        cy.xpath("//input[@type='text'][@name='form_input_22']").should("be.visible").type('5{enter}');
        cy.xpath("//div[contains(text(),'The selected Not In 5 is invalid.')]").should("be.visible");
        cy.xpath("//input[@type='text'][@name='form_input_22']").should("be.visible").type('{selectall}{backspace}');
        cy.xpath("//input[@type='text'][@name='form_input_22']").should("be.visible").type('4{enter}');

        cy.xpath("//input[@type='text'][@name='form_input_23']").should("be.visible").type('123{enter}');
        cy.xpath("//div[contains(text(),'The Regex [xyz] format is invalid.')]").should("be.visible");
        cy.xpath("//input[@type='text'][@name='form_input_23']").should("be.visible").type('{selectall}{backspace}');
        cy.xpath("//input[@type='text'][@name='form_input_23']").should("be.visible").type('xyz{enter}');

        cy.xpath("//input[@type='text'][@name='form_input_8']").should("be.visible").type('{enter}');
        cy.xpath("//div[contains(text(),'The required field is required.')]").should("be.visible");
        cy.xpath("//input[@type='text'][@name='form_input_8']").should("be.visible").type('{selectall}{backspace}');
        cy.xpath("//input[@type='text'][@name='form_input_8']").should("be.visible").type('required{enter}');

        cy.xpath("//input[@type='text'][@name='form_input_7']").should("be.visible").type('{enter}');
        cy.xpath("//div[contains(text(),'The required if Accepted = yes field is required.')]").should("be.visible");
        cy.xpath("//input[@type='text'][@name='form_input_7']").should("be.visible").type('{selectall}{backspace}');
        cy.xpath("//input[@type='text'][@name='form_input_7']").should("be.visible").type('required If{enter}');

        cy.xpath("//input[@type='text'][@name='form_input_24']").should("be.visible").type('Required Unless{enter}');

        cy.xpath("//input[@type='text'][@name='form_input_25']").should("be.visible").type('Required test{enter}');
        cy.get(".invalid-feedback > div").should("be.visible");
        cy.xpath("//input[@type='text'][@name='form_input_25']").should("be.visible").type('{selectall}{backspace}');
        cy.xpath("//input[@type='text'][@name='form_input_25']").should("be.visible").type('Required Unless{enter}');

        cy.xpath("//input[@type='text'][@name='form_input_10']").should("be.visible").type('test{enter}');
        cy.xpath("//div[contains(text(),'The URL format is invalid.')]").should("be.visible");
        cy.xpath("//input[@type='text'][@name='form_input_10']").should("be.visible").type('{selectall}{backspace}');
        cy.xpath("//input[@type='text'][@name='form_input_10']").should("be.visible").type('https://qualitlabs-qa.processmaker.net/{enter}');
        cy.wait(2000);
        cy.get('[name=request-id]').invoke('attr', 'content').should('not.be.empty');
        cy.get("[name='request-id']").invoke('attr', 'content').then((requestId)=>{
            //Go to review request
            login.navigateToUrl();
            login.login();

            cy.visit('/requests/'+requestId);
            request.waitUntilElementIsVisible('selector','#pending >* td:nth-child(1) >a[href^="/tasks"]');
            request.clickOnTaskName(1, 1);

            //Review Manual task
            cy.get('[class="card card-body border-top-0 h-100 display-screen"]').should("be.visible");
            cy.get(":nth-child(1) > .form-group > :nth-child(1) > div > p").should("be.visible");
            cy.get(":nth-child(2) > .form-group > :nth-child(1) > div > p").first().should("be.visible");
            cy.get(":nth-child(3) > .form-group > :nth-child(1) > div > p").first().should("be.visible");
            cy.get(":nth-child(4) > .form-group > :nth-child(1) > div > p").should("be.visible");
            cy.get(".form-group > :nth-child(1) > div > :nth-child(2)").should("be.visible");
            cy.get(":nth-child(6) > .form-group > :nth-child(1) > div > p").should("be.visible");
            cy.get(":nth-child(8) > .form-group > :nth-child(1) > div > p").should("be.visible").first();
            cy.get(":nth-child(10) > .form-group > :nth-child(1) > div > p").should("be.visible");
            cy.get(":nth-child(12) > .form-group > :nth-child(1) > div > p").should("be.visible");
            cy.get(":nth-child(13) > .form-group > :nth-child(1) > div > p").should("be.visible");
            cy.get(":nth-child(14) > .form-group > :nth-child(1) > div > p").should("be.visible");
            cy.get(":nth-child(15) > .form-group > :nth-child(1) > div > p").should("be.visible");
            cy.get(":nth-child(16) > .form-group > :nth-child(1) > div > p").should("be.visible");
            cy.get(":nth-child(17) > .form-group > :nth-child(1) > div > p").should("be.visible");
            cy.get(":nth-child(18) > .form-group > :nth-child(1) > div > p").first().should("be.visible");
            cy.get(":nth-child(20) > .form-group > :nth-child(1) > div > p").should("be.visible");            
        });
    }
    //TCP42259 and TCP42260
    verifyLinksCreatedInTopMenu(url1,url2){
        cy.get('[class="navbar d-print-none navbar-light bg-light navbar-expand-lg"]').should('contain','LinkA')
        cy.get('[class="navbar d-print-none navbar-light bg-light navbar-expand-lg"]').should('contain','LinkB')
        //verify linkA
        cy.contains('LinkA').invoke('attr','href' ).should('equal', url1);
        //verify linkB
        cy.contains('LinkB').invoke('attr','href' ).should('equal', url2);
    }
    actionsAndAssertionsOfTCP42277(requestId){
        //Validations Rules
        cy.xpath("//input[@type='text'][@name='form_input_1']").should("be.visible").type('no{enter}');
        cy.xpath("//div[contains(text(),'The Accepted must be accepted.')]").should("be.visible");
        cy.xpath("//input[@type='text'][@name='form_input_1']").should("be.visible").type('{selectall}{backspace}');
        cy.xpath("//input[@type='text'][@name='form_input_1']").should("be.visible").type('yes{enter}');

        cy.xpath("//input[@type='text'][@name='form_input_12']").should("be.visible").type('2019-10-10{enter}');
        cy.xpath("//div[contains(text(),'The After Date 2020-10-10 must be after 2020/10/10.')]").should("be.visible");
        cy.xpath("//input[@type='text'][@name='form_input_12']").should("be.visible").type('{selectall}{backspace}');
        cy.xpath("//input[@type='text'][@name='form_input_12']").should("be.visible").type('2022-09-30{enter}');

        cy.xpath("//input[@type='text'][@name='form_input_13']").should("be.visible").type('2020-09-10{enter}');
        cy.xpath("//div[contains(text(),'The After or Equal to Date 2020-10-10 must be equal or after 2020/10/10.')]").should("be.visible");
        cy.xpath("//input[@type='text'][@name='form_input_13']").should("be.visible").type('{selectall}{backspace}');
        cy.xpath("//input[@type='text'][@name='form_input_13']").should("be.visible").type('2020-10-10{enter}');

        cy.xpath("//input[@type='text'][@name='form_input_14']").should("be.visible").type('123{enter}');
        cy.xpath("//div[contains(text(),'The Alpha field must contain only alphabetic characters.')]").should("be.visible");
        cy.xpath("//input[@type='text'][@name='form_input_14']").should("be.visible").type('{selectall}{backspace}');
        cy.xpath("//input[@type='text'][@name='form_input_14']").should("be.visible").type('Mayita{enter}');

        cy.xpath("//input[@type='text'][@name='form_input_5']").should("be.visible").type('test.test.{enter}');
        cy.xpath("//div[contains(text(),'The text Alpha numeric field must be alphanumeric.')]").should("be.visible");
        cy.xpath("//input[@type='text'][@name='form_input_5']").should("be.visible").type('{selectall}{backspace}');
        cy.xpath("//input[@type='text'][@name='form_input_5']").should("be.visible").type('Mayita123{enter}');

        cy.xpath("//input[@type='text'][@name='form_input_15']").should("be.visible").type('2023-08-30{enter}');
        cy.get(".invalid-feedback > div").should("be.visible");
        cy.xpath("//input[@type='text'][@name='form_input_15']").should("be.visible").type('{selectall}{backspace}');
        cy.xpath("//input[@type='text'][@name='form_input_15']").should("be.visible").type('2019-08-30{enter}');

        cy.xpath("//input[@type='text'][@name='form_input_16']").should("be.visible").type('2022-08-30{enter}');
        cy.get(".invalid-feedback > div").should("be.visible");
        cy.xpath("//input[@type='text'][@name='form_input_16']").should("be.visible").type('{selectall}{backspace}');
        cy.xpath("//input[@type='text'][@name='form_input_16']").should("be.visible").type('2020-10-10 {enter}');

        cy.xpath("//input[@type='text'][@name='form_input_17']").should("be.visible").type('1{enter}');
        cy.get(".invalid-feedback > div").should("be.visible");
        cy.xpath("//input[@type='text'][@name='form_input_17']").should("be.visible").type('{selectall}{backspace}');
        cy.xpath("//input[@type='text'][@name='form_input_17']").should("be.visible").type('8{enter}');

        cy.xpath("//input[@type='text'][@name='form_input_18']").should("be.visible").type('Date{enter}');
        cy.xpath("//div[contains(text(),'The Date must be a valid date.')]").should("be.visible");
        cy.xpath("//input[@type='text'][@name='form_input_18']").should("be.visible").type('{selectall}{backspace}');
        cy.xpath("//input[@type='text'][@name='form_input_18']").should("be.visible").type('2022-09-30{enter}');

        cy.xpath("//input[@type='text'][@name='form_input_9']").should("be.visible").type('automation.pm4{enter}');
        cy.xpath("//div[contains(text(),'The new email format is invalid.')]").should("be.visible");
        cy.xpath("//input[@type='text'][@name='form_input_9']").should("be.visible").type('{selectall}{backspace}');
        cy.xpath("//input[@type='text'][@name='form_input_9']").should("be.visible").type('automation.pm4@gmail.com{enter}');

        cy.xpath("//input[@type='text'][@name='form_input_19']").should("be.visible").type('7{enter}');
        cy.xpath("//div[contains(text(),'The selected In 8 is invalid.')]").should("be.visible");
        cy.xpath("//input[@type='text'][@name='form_input_19']").should("be.visible").type('{selectall}{backspace}');
        cy.xpath("//input[@type='text'][@name='form_input_19']").should("be.visible").type('8{enter}');

        cy.xpath("//input[@type='text'][@name='form_input_20']").should("be.visible").type('1234567890{enter}');
        cy.xpath("//div[contains(text(),'The Max Length 7 may not be greater than 7 characters.')]").should("be.visible");
        cy.xpath("//input[@type='text'][@name='form_input_20']").should("be.visible").type('{selectall}{backspace}');
        cy.xpath("//input[@type='text'][@name='form_input_20']").should("be.visible").type('1234567{enter}');

        cy.xpath("//input[@type='text'][@name='form_input_21']").should("be.visible").type('12{enter}').should('have.value','12');
        cy.xpath("//div[contains(text(),'The Min Length 4 must be at least 4 characters.')]").should("be.visible");
        cy.xpath("//input[@type='text'][@name='form_input_21']").should("be.visible").type('{selectall}{backspace}');
        cy.xpath("//input[@type='text'][@name='form_input_21']").should("be.visible").type('1234{enter}');

        cy.xpath("//input[@type='text'][@name='form_input_22']").should("be.visible").type('5{enter}');
        cy.xpath("//div[contains(text(),'The selected Not In 5 is invalid.')]").should("be.visible");
        cy.xpath("//input[@type='text'][@name='form_input_22']").should("be.visible").type('{selectall}{backspace}');
        cy.xpath("//input[@type='text'][@name='form_input_22']").should("be.visible").type('4{enter}');

        cy.xpath("//input[@type='text'][@name='form_input_23']").should("be.visible").type('123{enter}');
        cy.xpath("//div[contains(text(),'The Regex [xyz] format is invalid.')]").should("be.visible");
        cy.xpath("//input[@type='text'][@name='form_input_23']").should("be.visible").type('{selectall}{backspace}');
        cy.xpath("//input[@type='text'][@name='form_input_23']").should("be.visible").type('xyz{enter}');

        cy.xpath("//input[@type='text'][@name='form_input_8']").should("be.visible").type('{enter}');
        cy.xpath("//div[contains(text(),'The required field is required.')]").should("be.visible");
        cy.xpath("//input[@type='text'][@name='form_input_8']").should("be.visible").type('{selectall}{backspace}');
        cy.xpath("//input[@type='text'][@name='form_input_8']").should("be.visible").type('required{enter}');

        cy.xpath("//input[@type='text'][@name='form_input_7']").should("be.visible").type('{enter}');
        cy.xpath("//div[contains(text(),'The required if Accepted = yes field is required.')]").should("be.visible");
        cy.xpath("//input[@type='text'][@name='form_input_7']").should("be.visible").type('{selectall}{backspace}');
        cy.xpath("//input[@type='text'][@name='form_input_7']").should("be.visible").type('required If{enter}');

        cy.xpath("//input[@type='text'][@name='form_input_24']").should("be.visible").type('Required Unless{enter}');

        cy.xpath("//input[@type='text'][@name='form_input_25']").should("be.visible").type('Required test{enter}');
        cy.get(".invalid-feedback > div").should("be.visible");
        cy.xpath("//input[@type='text'][@name='form_input_25']").should("be.visible").type('{selectall}{backspace}');
        cy.xpath("//input[@type='text'][@name='form_input_25']").should("be.visible").type('Required Unless{enter}');

        cy.xpath("//input[@type='text'][@name='form_input_10']").should("be.visible").type('test{enter}');
        cy.xpath("//div[contains(text(),'The URL format is invalid.')]").should("be.visible");
        cy.xpath("//input[@type='text'][@name='form_input_10']").should("be.visible").type('{selectall}{backspace}');
        cy.xpath("//input[@type='text'][@name='form_input_10']").should("be.visible").type('https://qualitlabs-qa.processmaker.net/{enter}');
        cy.xpath('(//a[@title="Open Task"])[1]').should("be.visible");
        //Review Summary
        cy.visit('/requests/'+requestId+'/files');
        request.waitUntilTextcontainText('selector','varHeader','Completed');
        cy.visit('/requests/'+requestId);
        cy.xpath("//a[contains(text(),'Summary')]").should("be.visible");
        cy.xpath("//td[text()='form_input_1']").should("be.visible");
        cy.xpath("//td[text()='form_input_5']").first().should("be.visible");
        cy.xpath("//td[text()='form_input_7']").first().should("be.visible");
        cy.xpath("//td[text()='form_input_8']").should("be.visible");
        cy.xpath("//td[text()='form_input_9']").should("be.visible");
        cy.xpath("//td[text()='form_input_10']").should("be.visible");
        cy.xpath("//td[text()='form_input_12']").should("be.visible");
        cy.xpath("//td[text()='form_input_13']").should("be.visible");
        cy.xpath("//td[text()='form_input_14']").should("be.visible");
        cy.xpath("//td[text()='form_input_15']").should("be.visible");
        cy.xpath("//td[text()='form_input_16']").should("be.visible");
        cy.xpath("//td[text()='form_input_17']").should("be.visible");
        cy.xpath("//td[text()='form_input_18']").should("be.visible");
        cy.xpath("//td[text()='form_input_19']").should("be.visible");
        cy.xpath("//td[text()='form_input_20']").should("be.visible");
        cy.xpath("//td[text()='form_input_21']").should("be.visible");
        cy.xpath("//td[text()='form_input_22']").should("be.visible");
        cy.xpath("//td[text()='form_input_23']").should("be.visible");
        cy.xpath("//td[text()='form_input_24']").should("be.visible");
        cy.xpath("//td[text()='form_input_25']").should("be.visible");
        //Review File Manager
        cy.xpath("//a[contains(text(),'File Manager')]").should("be.visible").click();
        cy.xpath('//button[@title="View"]').should("be.visible").click();
        cy.wait(5000);
        cy.get('iframe').first().then(($iframe) => {
            const $body = $iframe.contents().find('body');
            cy.wrap($body).find('div').should("be.visible");
        })
        //Review Forms tab
        cy.xpath("//a[contains(text(),'Forms')]").click();
        cy.xpath('//button[@title="Details"]').should("be.visible").click();
        cy.xpath('//div[@class="card-body h-100"]').should("be.visible");
        cy.contains('Admin User has completed the task Form Task').scrollIntoView();
    }
    actionsAndAssertionsOfTCP42250(requestId){
        //Complete task form 1
        cy.xpath('//div[@class="card card-body border-top-0 h-100 form-screen"]').should('be.visible');  
        
        cy.get('[data-cy="screen-field-email"]')
            .should('be.visible')
            .type('automation.pm4@gmail.com')
            .should('have.value','automation.pm4@gmail.com');
            
        cy.get('input[aria-label="Date_1"]')
            .should('be.visible')
            .click()
            .clear()
            .type('10/20/2022', {delay: 500})
            .type('{enter}');

        cy.get('input[aria-label="Date_2"]')
            .should('be.visible')
            .click()
            .clear()
            .type('10/10/2019', {delay: 500})
            .type('{enter}');

        cy.xpath('//label[text()="Select"]/parent::div//div[@class="multiselect__tags"]').click();
        cy.xpath('//label[text()="Select"]/parent::div//input').should('be.visible').type('Bolivia').should('have.value','Bolivia');
        cy.xpath('//label[text()="Select"]/parent::div//input').type('{enter}');
        cy.xpath('//label[text()="Only if"]/parent::div//input').should('be.visible').type('test required',{force: true}).should('have.value','test required');
        cy.xpath("//button[contains(text(),'New Submit')]").should('be.visible').click();
        cy.wait(2000);
        //Complete task form 2
        var taskName = 'Form Task 2';
        cy.visit('/requests/'+requestId);
        request.waitUntilElementIsVisible('[id="requestTabContent"] > [id="pending"] >* a[href^="/tasks"]');
        request.openTaskByTaskName(taskName);
        cy.get('[data-cy="screen-field-checkbox1"]').should('be.visible').check();
        cy.get('[class="signature pl-0"]').first().click();
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should('be.visible');
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should('not.exist');
        cy.get('[class="signature pl-0"]').eq(1).click();
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should('be.visible');
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should('not.exist');
        cy.xpath("//button[contains(text(),'New Submit')]").should('be.visible').click();
        cy.wait(2000);
        //Complete task form 3
        var taskName = 'Form Task 3';
        cy.visit('/requests/'+requestId);
        request.waitUntilElementIsVisible('[id="requestTabContent"] > [id="pending"] >* a[href^="/tasks"]');
        request.openTaskByTaskName(taskName);
        cy.get('[data-cy="screen-field-checkbox1"]').should('be.visible');
        cy.get('[class="signature pl-0"]').should('be.visible');
        cy.get('[class="signature pl-0"]').should('be.visible');
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should('not.exist');
        cy.xpath("//button[contains(text(),'New Submit')]").should('be.visible').click();
        cy.wait(2000);
        //Complete task form 2
        var taskName = 'Form Task 2';
        cy.visit('/requests/'+requestId);
        request.waitUntilElementIsVisible('[id="requestTabContent"] > [id="pending"] >* a[href^="/tasks"]');
        request.openTaskByTaskName(taskName);
        cy.get('[data-cy="screen-field-checkbox1"]').should('be.visible').click();
        cy.get('[data-cy="screen-field-checkbox2"]').should('be.visible').check();
        cy.get('[class="signature pl-0"]').first().should('be.visible').click();
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should('be.visible');
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should('not.exist');
        cy.get('[class="signature pl-0"]').eq(1).should('be.visible').click();
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should('be.visible');
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should('not.exist');
        cy.xpath("//button[contains(text(),'New Submit')]").should('be.visible').click();
        cy.wait(2000);
        //Complete Manual Task 1
        var taskName = 'Manual Task 1';
        cy.visit('/requests/'+requestId);
        request.waitUntilElementIsVisible('[id="requestTabContent"] > [id="pending"] >* a[href^="/tasks"]');
        request.openTaskByTaskName(taskName);
        cy.xpath('//div[@name="For 3process_Manual task"]//div[@class="col-sm-4"]//p').first().should('be.visible');
        cy.xpath('//div[@name="For 3process_Manual task"]//div[@class="col-sm-4"]//p').eq(2).should('be.visible');
        cy.xpath('//div[@name="For 3process_Manual task"]//div[2][@class="col-sm-6"] ').should('be.visible');;
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should('not.exist');
        cy.xpath("//button[contains(text(),'Complete Task')]").should('be.visible').click();
        cy.wait(2000);
        cy.visit('/requests/'+requestId+ '/files');
        //request.waitUntilTextcontainText('selector','varHeader', "Completed");
        cy.wait(2000);
        cy.visit('/requests/'+requestId);
        cy.xpath("//td[text()='sing1']").should('be.visible');
        cy.xpath("//td[text()='sing1']").should('be.visible');
        cy.xpath("//td[text()='sing2']").should('be.visible');
        cy.xpath("//td[text()='google.address']").should('be.visible');
        cy.xpath("//td[text()='checkbox1']").should('be.visible');
        cy.xpath("//td[text()='checkbox2']").should('be.visible');
        //Review Completed
        cy.xpath("//a[text()='Completed']").should('be.visible').click();
        cy.xpath("//a[contains(text(),'Form Task 1')]").should('be.visible');
        cy.xpath("//a[contains(text(),'Form Task 2')]").should('be.visible');
        cy.xpath("//a[contains(text(),'Form Task 3')]").should('be.visible');
        cy.xpath("//a[contains(text(),'Manual Task 1')]").should('be.visible');
        //Review Summary
        cy.xpath('//a[@id="summary-tab"]').should('be.visible').click();
        cy.xpath("//td[contains(text(),'test required')]").should('be.text',"test required");
        cy.xpath("//td[contains(text(),'automation.pm4@gmail.com')]").should('be.text',"automation.pm4@gmail.com");
        cy.xpath("//td[contains(text(),'false')]").should('be.text',"false");
        cy.xpath("//td[contains(text(),'true')]").should('be.text',"true");
        cy.xpath("//td[contains(text(),'Bolivia')]").should('be.text',"Bolivia");

    }

    async actionsAndAssertionsOfTCP42242(requestID){
        request.openRequestById(requestID);
        request.openTaskByTaskName('Form Task');
        cy.intercept('POST','/api/1.0/requests/'+requestID+'/files').as('fileUpload1')
        cy.xpath('(//input[@data-cy="file-upload-button"])[1]').attachFile("images/origenes.jpg");
        cy.wait('@fileUpload1').its('response.statusCode').should('eq', 200)
        cy.intercept('POST','/api/1.0/requests/'+requestID+'/files').as('fileUpload2')
        cy.xpath('(//input[@data-cy="file-upload-button"])[2]').attachFile("images/sanagustin.jpg");
        cy.wait('@fileUpload2').its('response.statusCode').should('eq', 200)
        cy.xpath('//button[@data-cy="loop-loop_1-add"]/i').click();
        cy.xpath('//button[@data-cy="loop-loop_1-add"]/i').click();
        cy.intercept('POST','/api/1.0/requests/'+requestID+'/files').as('fileUpload3')
        cy.xpath('(//input[@data-cy="file-upload-button"])[3]').attachFile("images/sanambrosio.jpg");
        cy.wait('@fileUpload3').its('response.statusCode').should('eq', 200)
        cy.intercept('POST','/api/1.0/requests/'+requestID+'/files').as('fileUpload4')
        cy.xpath('(//input[@data-cy="file-upload-button"])[4]').attachFile("images/sanjudas.jpg");
        cy.wait('@fileUpload4').its('response.statusCode').should('eq', 200)
        cy.xpath('//button[@aria-label="New Submit"]').scrollIntoView({force:true}, {timeout: 10000});
        cy.intercept('POST','/api/1.0/requests/'+requestID+'/files').as('fileUpload5')
        cy.xpath('(//input[@data-cy="file-upload-button"])[5]').attachFile("images/santotomas.jpg");
        cy.wait('@fileUpload5').its('response.statusCode').should('eq', 200)
        cy.xpath('//button[@aria-label="New Submit"]').scrollIntoView({force:true}, {timeout: 10000});
        cy.xpath('//button[@aria-label="New Submit"]').scrollIntoView({force:true}, {timeout: 10000});
        cy.xpath('//button[@aria-label="New Submit"]').click();
        request.verifyTaskIsCompleted();
        request.openRequestById(requestID);
        request.openTaskByTaskName('Form Task');
        cy.xpath('//div[@aria-label="File Preview"]/div/img').should('be.visible');
        cy.xpath('//div[@title="origenes.jpg"]').should('be.visible');
        cy.xpath('//div[@title="sanagustin.jpg"]').should('be.visible');
        cy.xpath('//div[@title="sanambrosio.jpg"]').should('be.visible');
        cy.xpath('//div[@title="sanjudas.jpg"]').should('be.visible');
        cy.xpath('//button[@aria-label="New Submit"]').scrollIntoView({force:true}, {timeout: 10000});
        cy.xpath('//div[@title="santotomas.jpg"]').should('be.visible');
        cy.xpath('//button[@aria-label="New Submit"]').click();
        request.verifyTaskIsCompleted();
        cy.xpath('(//div[@class="flex-grow-1"])[3]').should('contain.text', "Admin User has completed the task Form Task");
        cy.xpath('(//div[@class="flex-grow-1"])[4]').should('contain.text', "Admin User has completed the task SendEmail1");
        cy.xpath('(//div[@class="flex-grow-1"])[5]').should('contain.text', "Admin User has completed the task Form Task");
    }

    actionsAndAssertionsOfTCP42244(requestID){
        cy.xpath('//h4').should('be.visible');
        cy.xpath('//input[@name="aa"]').type('Socrates');
        cy.xpath('//button[@aria-label="Submit"]').click();
        cy.xpath('//input[@name="bb"]').type('Plato');
        cy.xpath('//button[@aria-label="Submit"]').click();
        cy.xpath('//input[@name="cc"]').type('Aristotle');
        cy.xpath('//button[@aria-label="Submit"]').click();
        request.verifyTaskIsCompleted();
        navHelper.navigateToTasksPage();
        navHelper.navigateToRequestsPage();
        cy.visit('/requests/' + requestID);
        request.waitUntilTextcontainText('selector','varHeader','Completed');
        cy.xpath('(//div[@class="flex-grow-1"])[3]').should('contain.text', "Admin User has completed the task Form Task");
        cy.xpath('(//div[@class="flex-grow-1"])[4]').should('contain.text', "Admin User has completed the task PDF Generator");
        cy.xpath('(//div[@class="flex-grow-1"])[5]').should('contain.text', "Admin User has completed the task SendEmail1");
    }
    //TCP4-2321
    importCSV(filePath) {
        cy.get('button[title="Import CSV"]').click();
        cy.get('button[class="btn btn-secondary ml-2"]').should('be.visible');
        cy.get('input[id="csv-file"]').attachFile(filePath)
    }
    //Add Custom Columns
    addCustomColumn(){

        cy.get("div [class='border bg-muted px-3 draggable-list draggable-available'] :nth-child(5) > .column-card").drag(".mr-3 > .border");
        cy.get("div [class='border bg-muted px-3 draggable-list draggable-available'] :nth-child(5) > .column-card").drag(".mr-3 > .border");
        cy.get("div [class='border bg-muted px-3 draggable-list draggable-available'] :nth-child(5) > .column-card").drag(".mr-3 > .border");
        cy.get("div [class='border bg-muted px-3 draggable-list draggable-available'] :nth-child(5) > .column-card").drag(".mr-3 > .border");
        cy.get(":nth-child(2) > .border > :nth-child(5) > .column-card").drag(
            ".mr-3 > .border"
        );
        cy.xpath('//*[@id="nav-columns"]//button[2]').click({ force: true });
    }

    //Assign column on Import CSV
    selectColumnImportCSV(nameColumn,label){
        cy.xpath("//label[text()='"+label+"']/parent::div//div[@class='multiselect__tags']").should('be.visible');
        cy.xpath("//label[text()='"+label+"']/parent::div//div[@class='multiselect__tags']").click();
        cy.xpath("//label[text()='"+label+"']/parent::div//input").type(nameColumn).should('have.value',nameColumn);
        cy.xpath("//label[text()='"+label+"']/parent::div//div[@class='multiselect__content-wrapper']//li[1]")
            .should('have.attr', 'aria-label')
            .and('equal', nameColumn+". ");
        cy.xpath("//label[text()='"+label+"']/parent::div//input").type('{enter}');
    }
    //TCP4-2269
    actionsAndAssertionsOfTCP42269SelectFile(filePath,num){
        let numb =parseInt(num)+1;
        cy.get('input[data-cy="file-upload-button"]')
            .eq(num)
            .attachFile(filePath);
        cy.xpath('(//*[@data-cy="screen-field-file_upload_1"]//span[contains(text(),"success")])['+numb+']').should('exist');
    }
    actionsAndAssertionsOfTCP42269VerifyViewFile(){
        cy.xpath("//table//tbody").find("tr").its("length").should("be.gte", 4);
    }
    actionsAndAssertionsOfTCP42269VerifyDownloadFile(nameImage,num){
        var concat = "./cypress/downloads/" + nameImage + ".jpg";
        cy.readFile(concat).should("exist");
    }
    actionsAndAssertionsOfTCP42269VerifyShareFile(num,userName,firstName,lastName){
        cy.get('button[title="Share"]').eq(num).click();
        cy.get('[class="popover-body"]').should('be.visible');
        cy.xpath('//div[@class="multiselect__content-wrapper"]').then($header => {
            if (!$header.is(':visible')){
                cy.xpath('//h3[text()="Share"]/ancestor::div//div[@class="multiselect__tags"]').click();
            }
        });
        cy.xpath('//h3[text()="Share"]/ancestor::div//input').type(userName).should('have.value',userName);
        cy.xpath("//h3[text()='Share']/ancestor::div//div[@class='multiselect__content-wrapper']//li[2]")
			.should('have.attr', 'aria-label')
			.and('equal',firstName+" "+lastName+" "+"("+userName+"). " );
        cy.xpath('//h3[text()="Share"]/ancestor::div//input').type('{enter}');
        cy.xpath('//h3[text()="Share"]/ancestor::div//button').eq(0).click();
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should('be.visible');
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should('not.exist');
    }
    actionsAndAssertionsOfTCP42269VerifyUploadedFiles(image,size,extension){
        var concat1 = '//table/tbody[@role="rowgroup"]/tr/td[2]/span[text()="'+image+'"]'
        cy.log(concat1)
        cy.xpath(concat1).last().should('have.text',image);
        cy.xpath(concat1+"/ancestor::td/span[2]").last().should('have.contain',extension);
        cy.xpath(concat1+"/ancestor::td/following-sibling::td[2]").last().should('have.text',size);
    }

    //TCP4-2267
    //Options Menu
    asertionsTCP42267ValidationMenu(){
        //Read Only
           cy.get('[aria-label="readOnly"]')
               .invoke("attr", "readonly")
               .should("eq", "readonly");
           //Place Holder
           cy.get('[aria-label="place holder"]')
               .invoke("attr", "placeholder")
               .should("eq", "place holder");
           //Helper text
           cy.xpath('//label[text()="helper text"]/parent::div//small').should(
               "contain",
               "helper text"
               );
           //Design
           cy.get('[aria-label="design"]')
               .invoke("attr", "bgcolor")
               .should("eq", "alert alert-warning");
           cy.get('input[name="design"]').type("paola");
           //Default value
           cy.get('[aria-label="default value"]').invoke("attr", "default-value")
               .should("exist");
           //Visibility Rule design == "paola"
           cy.xpath('//input[@data-cy="screen-field-form_input_6"]')
               .invoke("attr", "conditional-hide")
               .should("eq", 'design == "paola"');
           //Custom Format String Date
           cy.get('[aria-label="Custom Format String Date ##/##/####"]')
               .invoke("attr", "custom-formatter")
               .should("eq", "##/##/####");
           cy.get(
               'input[aria-label="Custom Format String Date ##/##/####"]'
           ).type("02/01/2020");
           //Custom Format String SSN
           cy.get('[aria-label="Custom Format String  SSN  ###-##-####"]')
               .invoke("attr", "custom-formatter")
               .should("eq", "###-##-####");
           cy.get(
               'input[aria-label="Custom Format String  SSN  ###-##-####"]'
           ).type("000-11-2222");
       }
       //Validations Rules
       asertionsTCP42267ValidationRules(){
           //"dateStart"
           cy.get('input[aria-label="dateStart').click();
           screen.useCustomDate("2022", "Sep", "24");
           //Accepted
           cy.xpath('//label[text()="accepted"]/parent::div//div').should(
               "contain",
               "Field must be accepted"
           );
           cy.get('[aria-label="accepted"]')
               .type("yes")
               .should("have.value", "yes");
           cy.xpath('//label[text()="accepted"]/parent::div//div').should(
               "not.exist"
           );
           //After Date "dateStart"
           cy.xpath(
               '//label[text()="After Date  dateStart"]/parent::div//div'
           ).should("contain", "Must be after dateStart");
           cy.get('[aria-label="After Date  dateStart"]')
               .type("2022-09-29")
               .should("have.value", "2022-09-29");
           cy.xpath(
               '//label[text()="After Date  dateStart"]/parent::div//div'
           ).should("not.exist");
          //After or Equal to Date
           cy.xpath(
               '//label[text()="After or Equal to Date"]/parent::div//div'
           ).should("contain", "Must be equal or after dateStart");
           cy.get('[aria-label="After or Equal to Date"]')
               .type("2022-09-29")
               .should("have.value", "2022-09-29");
           cy.xpath(
               '//label[text()="After or Equal to Date"]/parent::div//div'
           ).should("not.exist");
           //Alpha
           cy.get('[aria-label="Alpha"]')
               .type("alpaTest")
               .should("have.value", "alpaTest");
           //Alpha-Numeric
           cy.get('[name="AlphaNumeric"]').type("ProcessMaker123");
           //Before Date
           cy.xpath('//label[text()="Before Date"]/parent::div//div').should(
               "contain",
               "Must be before dateStart"
           );
           cy.get('[aria-label="Before Date"]')
               .type("2022-09-20")
               .should("have.value", "2022-09-20");
           cy.xpath('//label[text()="Before Date"]/parent::div//div').should(
               "not.exist"
           );
           //Before or Equal to Date
           cy.xpath(
               '//label[text()="Before or Equal to Date"]/parent::div//div'
           ).should("contain", "Must be equal or before dateStart");
           cy.get('[aria-label="Before or Equal to Date"]')
               .type("2022-09-20")
               .should("have.value", "2022-09-20");
           cy.xpath(
               '//label[text()="Before or Equal to Date"]/parent::div//div'
           ).should("not.exist");
           //Between Min 5 & Max 10
           cy.get('[name="BetweenMin5Max10"]')
               .type("5")
               .should("have.value", "5");
           //Date
           cy.xpath('//label[text()="Date"]/parent::div//div').should(
               "contain",
               "Must be a valid Date"
           );
           cy.get('[data-cy="screen-field-Date"]')
               .type("2021-10-10")
               .should("have.value", "2021-10-10");
           cy.xpath('//label[text()="Date"]/parent::div//div').should(
               "not.exist"
           );
           //email
           cy.get('[data-cy="screen-field-email"]')
               .type("test@gmail.com")
               .should("have.value", "test@gmail.com");
           //In 7
           cy.xpath('//label[text()="In 7"]/parent::div//div').should(
               "contain",
               "Invalid value"
           );
           //
           cy.get('[data-cy="screen-field-In7"]')
               .type("7")
               .should("have.value", "7");
           cy.xpath('//label[text()="In 7"]/parent::div//div').should(
               "not.exist"
           );
           //Max Length 12
           cy.get('[data-cy="screen-field-MaxLength12"]')
               .type("123456789012")
               .should("have.value", "123456789012");
           //Min Length 3
           cy.get('[data-cy="screen-field-MinLength3"]')
               .type("123")
               .should("have.value", "123");
           //Not In 9
           cy.get('[data-cy="screen-field-NotIn9"]')
               .type("99")
               .should("have.value", "99");
           //Regx [xyz]
           cy.xpath('//label[text()="Regx [xyz]"]/parent::div//div').should(
               "contain",
               "Invalid value"
           );
           cy.get('[aria-label="Regx [xyz]"]')
               .type("xyz")
               .should("have.value", "xyz");
           cy.xpath('//label[text()="Regx [xyz]"]/parent::div//div').should(
               "not.exist"
           );
           //Required  test
           cy.xpath('//label[text()="Required"]/parent::div//span').should(
               "be.visible",
           );
           cy.get('[aria-label="Required"]')
               .type("test")
               .should("have.value", "test");
           //Required If = 2021-09-01
           cy.get('[data-cy="screen-field-RequiredIfdateStart"]')
               .type("test2")
               .should("have.value", "test2");
           //Required Unless = 2021-09-02  test3
           cy.xpath(
               '//label[text()="Required Unless  = 2021-09-02"]//parent::div//div'
           ).should("contain", "Field is required");
           cy.get('[aria-label="Required Unless  = 2021-09-02"]')
               .type("test3")
               .should("have.value", "test3");
           cy.xpath(
               '//label[text()="Required Unless  = 2021-09-02"]//parent::div//div'
           ).should("not.exist");
           //Same = email  test@gmail.com
           cy.get('[aria-label="Same = email"]').click();
           cy.xpath('//label[text()="Same = email"]//parent::div//div').should(
               "contain",
               "Must be same as email"
           );
           cy.get('[aria-label="Same = email"]')
               .type("test@gmail.com")
               .should("have.value", "test@gmail.com");
           cy.xpath('//label[text()="Same = email"]//parent::div//div').should(
               "not.exist"
           );
           //URL
           cy.get('[aria-label="URL"]')
               .type("https://www.google.com")
               .should("have.value", "https://www.google.com");
       }
       //Data Type
       asertionsTCP42267DataTypes(){
        //Text
           cy.get('[aria-label="TEXT"]')
               .type("TEXT")
               .should("have.value", "TEXT");
           cy.get('[aria-label="TEXT"]')
               .invoke("attr", "data-format")
               .should("eq", "string");
           //Integer
           cy.get('[aria-label="INTEGER"]')
               .type("123456")
               .should("have.value", "123456");
           cy.get('[aria-label="INTEGER"]')
               .invoke("attr", "data-format")
               .should("eq", "int");
           //Currency
           cy.get('[data-cy="screen-field-CURRENCY"]')
               .type("9876")
               .should("have.value", "9.876,00");
           cy.get('[data-cy="screen-field-CURRENCY"]')
               .invoke("attr", "data-format")
               .should("eq", "currency");
           //Percentage
           cy.get('[aria-label="PERCENTAGE"]')
               .type("100")
               .should("have.value", "100.00 %");
           cy.get('[aria-label="PERCENTAGE"]')
               .invoke("attr", "data-format")
               .should("eq", "percentage");
           //Decimal
           cy.get('[aria-label="DECIMAL"]')
               .type("123.456")
               .should("have.value", "123.456");
           cy.get('[aria-label="DECIMAL"]')
               .invoke("attr", "data-format")
               .should("eq", "float");
           //DateTime
           cy.get('[aria-label="DATETIME"]')
               .type("2021-12-25 08:30")
               .should("have.value", "2021-12-25 08:30");
           cy.get('[aria-label="DATETIME"]')
               .invoke("attr", "data-format")
               .should("eq", "datetime");
           //Date
           cy.get('[aria-label="DATE"]')
               .type("2021-12-25")
               .should("have.value", "2021-12-25");
           cy.get('[aria-label="DATE"]')
               .invoke("attr", "data-format")
               .should("eq", "date");
           //Password
           cy.get('[aria-label="PASSWORD"]')
               .type("password123")
               .should("have.value", "password123");
           cy.get('[aria-label="PASSWORD"]')
               .invoke("attr", "data-format")
               .should("eq", "password");
       }
       //Combinations
       asertionsTCP42267Combinations(){
            //daste type currency - Required
           cy.xpath(
               '//label[text()="daste type currency - Required"]//parent::div//span'
           ).should("be.visible");
           cy.get('[aria-label="daste type currency - Required"]')
               .type("123.00BOB")
               .should("have.value", "123.00 BOB");
           cy.get('[aria-label="daste type currency - Required"]')
               .invoke("attr", "data-format")
               .should("eq", "currency");
           //password - alpha
           cy.get('[aria-label="password - alpha"]')
               .type("password")
               .should("have.value", "password");
           cy.get('[aria-label="password - alpha"]')
               .invoke("attr", "data-format")
               .should("eq", "password");
           //integer not in 9
           cy.get('[aria-label="integer not in 9"]')
               .invoke("attr", "data-format")
               .should("eq", "int");
           cy.get('[aria-label="integer not in 9"]')
               .type("9")
               .should("have.value", "9");
           cy.xpath(
               '//label[text()="integer not in 9"]//parent::div//div'
           ).should("contain", "Invalid value");
           cy.get('[aria-label="integer not in 9"]')
               .clear()
               .type("123456780")
               .should("have.value", "123456780");
           cy.xpath(
               '//label[text()="integer not in 9"]//parent::div//div'
           ).should("not.exist");
           //percentage requiredif
           cy.get('[aria-label="percentage requiredif"]').type("543");
           cy.get('[aria-label="percentage requiredif"]').should(
               "have.value",
               "543.00 %"
           );
           cy.get('[aria-label="percentage requiredif"]')
               .invoke("attr", "data-format")
               .should("eq", "percentage");
       }

    //TCP4-2229
    assertionsTCP42229(PathImage){
        //accepted input
        cy.xpath('//label[text()="accepted"]/parent::div//div')
        .eq(0)
        .should("contain", "Field must be accepted");
    cy.xpath('//label[text()="accepted"]//parent::div//input')
        .eq(0)
        .type("yes")
        .should("have.value", "yes");
    //alpha input
    cy.xpath('//label[text()="alpha"]//parent::div//input')
        .eq(0)
        .type("Alpha")
        .should("have.value", "Alpha");
    //Alpha-Numeric
    cy.xpath('//label[text()="Alpha-Numeric"]//parent::div//input')
        .eq(0)
        .type("Processmaker123")
        .should("have.value", "Processmaker123");
    //Between Min 3 & Max10
    cy.xpath('//label[text()="Between Min 3 & Max10"]//parent::div//input')
        .eq(0)
        .type("5")
        .should("have.value", "5");
    //Date
    cy.xpath('//label[text()="Date"]/parent::div//div')
        .eq(0)
        .should("contain", "Must be a valid Date");
    cy.xpath('//label[text()="Date"]//parent::div//input')
        .eq(0)
        .type("2020-10-10")
        .should("have.value", "2020-10-10");
    //Email
    cy.xpath('//label[text()="Email"]//parent::div//input')
        .eq(0)
        .type("email@processmaker.com")
        .should("have.value", "email@processmaker.com");
    //In =7
    cy.xpath('//label[text()="In =7"]/parent::div//div')
        .eq(0)
        .should("contain", "Invalid value");
    cy.xpath('//label[text()="In =7"]//parent::div//input')
        .eq(0)
        .type("7")
        .should("have.value", "7");
    //Max Length 10
    cy.xpath('//label[text()="Max Length 10"]//parent::div//input')
        .eq(0)
        .type("1234567890")
        .should("have.value", "1234567890");
    //Min Length =4
    cy.xpath('//label[text()="Min Length =4"]//parent::div//input')
        .eq(0)
        .type("1234")
        .should("have.value", "1234");
    //Not In =8
    cy.xpath('//label[text()="Not In =8"]//parent::div//input')
        .eq(0)
        .type("88")
        .should("have.value", "88");
    //Regex[xyz]
    cy.xpath('//label[text()="Regex[xyz]"]/parent::div//div')
        .eq(0)
        .should("contain", "Invalid value");
    cy.xpath('//label[text()="Regex[xyz]"]//parent::div//input')
        .eq(0)
        .type("xyz")
        .should("have.value", "xyz");
    //Required
    cy.xpath('//label[text()="Required"]//parent::div//input')
        .eq(0)
        .type("required text")
        .should("have.value", "required text");
    //Required if form_input_2 = paola
    cy.xpath('//label[text()="form_input_2"]//parent::div//input')
        .eq(0)
        .type("paola")
        .should("have.value", "paola");
    cy.xpath('//label[text()="Required If"]//parent::div//div')
        .eq(0)
        .should("contain", "Field is required");
    //Required Unless form_input_3 = paola
    cy.xpath('//label[text()="Required Unless"]//parent::div//div')
        .eq(0)
        .should("contain", "Field is required");
    cy.xpath('//label[text()="form_input_3"]//parent::div//input')
        .eq(0)
        .click()
        .type("paola")
        .should("have.value", "paola");
    //Required if
    cy.get('[aria-label="Required If"]').eq(0).type("text");
    //Required Unless
    cy.xpath('//label[text()="Required Unless"]//parent::div//input')
        .eq(0)
        .type("test")
        .should("have.value", "test");
    //Same form_input_5
    //New Input
    cy.xpath('//label[text()="New Input"]//parent::div//input')
        .eq(0)
        .type("Colosa123")
        .should("have.value", "Colosa123");
    cy.xpath('//label[text()="Same"]//parent::div//div')
        .eq(0)
        .should("contain", "Must be same as form_input_5");
    //Same
    cy.xpath('//label[text()="Same"]//parent::div//input')
        .eq(0)
        .type("Colosa123")
        .should("have.value", "Colosa123");
    //URL
    cy.xpath('//label[text()="URL"]//parent::div//input')
        .eq(0)
        .type("https://www.ecosia.org")
        .should("have.value", "https://www.ecosia.org");
    //Checkbox
    cy.get('[aria-label="New Checkbox"]').eq(0).click();
    //Date Picker
    cy.get('input[aria-label="Date Picker').eq(0).click();
    screen.useCustomDate("2022", "Sep", "24");
    //Date Picker2
    cy.get('input[aria-label="Date Picker2').eq(0).click();
    screen.useCustomDate("2022", "Sep", "25");
    //Upload an image
    cy.get('input[data-cy="file-upload-button"]').attachFile(
        PathImage
    );
    cy.xpath(
        '//div[@class="uploader-file-status"]//span[text()="success"]'
    ).should("be.exist");
    //Text Area
    cy.get('[aria-label="Textarea"]')
        .eq(0)
        .type("text area test")
        .should("have.value", "text area test");
    //Select List
    cy.xpath(
        '//label[text()="Select List"]/parent::div//div//div[@class="multiselect__tags"]'
    )
        .eq(0)
        .click({ force: true });
    cy.xpath('//label[text()="Select List"]//parent::div//input')
        .eq(0)
        .type("ddd")
        .should("have.value", "ddd");
    cy.wait(3000);
    cy.xpath('//label[text()="Select List"]//parent::div//input')
        .eq(0)
        .type("{enter}");
    //Make signature
    cy.get(
        '[data-cy="screen-field-sigRL"] > .signature-container > .signature > canvas'
    ).should("be.visible");
    cy.xpath("(//div[@class='signature pl-0']//canvas)[1]").click();
    cy.get(
        '[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]'
    ).should("be.visible");
    //Click on "OK" button
    cy.xpath(
        '//footer[@class="modal-footer"]//button[@class="btn btn-primary"]'
    )
        .eq(0)
        .click();
    cy.get(".alert-wrapper > .alert").should("be.visible");
    //Click on "Submit" button
    cy.get('[aria-label="New Submit"]').last().click();
    request.verifyTaskIsCompletedB();
   }

   actionsAndAssertionsOfTCP42225(){
       //Step 1: Complet the WE Form
       cy.get('[data-cy="add-row"]').should('be.visible');
       cy.get('[data-cy="add-row"]').click();

       //a) Fill data in variable Date Picker Date
       cy.get('input[name="form_date_picker_1"]').eq(0).click();

       //b) Fill data in variable Date Picker Datetime
       cy.get('input[name="form_date_picker_2"]')
           .eq(0)
           .type("02/01/2022 22:47 ",{force:true});

       //c) Fill data in variable Line Input Date
       cy.get('input[name="form_input_2"]')
           .eq(0)
           .type("2020-01-03",{force:true});

       //d) Fill data in variable Line Input Datetime
       cy.xpath('//label[text()="Line Input Datetime"]//parent::div//input')
           .eq(0)
           .type("2022-01-04 22:47",{force:true});

       //Step 3.2: Inside Loop
       //a) Fill data in variable New Date Picker
       cy.xpath('//label[text()="New Date Picker"]//parent::div//input')
           .eq(0)
           .click()
           .type("01/02/2022",{force:true});

       //b) Fill data in variable New Datetime Picker
       cy.xpath('//label[text()="New Datetime Picker"]//parent::div//input')
           .eq(0)
           .type("02/02/2022 22:47 ",{force:true});

       //c)Fill data in variable New Input Date
       cy.xpath('//label[text()="New Input Date"]//parent::div//input')
           .eq(0)
           .type("2020-02-03",{force:true});

       //d) Fill data in variable New Input Datetime
       cy.xpath('//label[text()="New Input Datetime"]//parent::div//input')
           .eq(0)
           .type("2022-02-04 22:47",{force:true});

       //Step 4: Create new loop and Fill inputs
       //a) Add First loop
       cy.get('button[title="Add Item"]').eq(0).click();

       //b) Fill data in variable New Date Picker (New Loop)
       cy.xpath('//label[text()="New Date Picker"]//parent::div//input')
           .eq(1)
           .type("01/03/2022",{force:true});

       //Step 5: Add Second loop
       cy.get('button[title="Add Item"]').eq(1).click();

       //a) Fill data in variable New Datetime Picker (New Loop)
       cy.xpath('//label[text()="New Datetime Picker"]//parent::div//input')
           .eq(1)
           .type("02/03/2022",{force:true});

       //Step 6: Add Third loop
       cy.get('button[title="Add Item"]').eq(2).click();

       //a) Fill data in variable New Input Date (New Loop)
       cy.xpath('//label[text()="New Input Date"]//parent::div//input')
           .eq(1)
           .type("2020-03-03",{force:true});

       //Step 7: Add Four loop
       cy.get('button[title="Add Item"]').eq(3).click();

       //a) Fill data in variable New Input Datetime (New Loop)
       cy.xpath('//label[text()="New Input Datetime"]//parent::div//input')
           .eq(1)
           .type("2022-03-04 22:47",{force:true});

       //Click on Ok button
       cy.xpath('//footer[@class="modal-footer"]//button[@class="btn btn-primary"]')
           .eq(0)
           .click();

       //Step 8: Click on New submit button
       cy.get('button[aria-label="New Submit"]').eq(0).click();
       request.verifyTaskIsCompletedB();

       cy.get('[name=request-id]').invoke('attr', 'content').should('not.be.empty');
       //Step 9: Get the number of requests
       cy.get("[name='request-id']").invoke('attr', 'content').then((requestId)=>{

           //Step 10: Log in
           login.navigateToUrl();
           login.login();

           //Step 11: Open the request
           cy.visit('/requests/'+requestId);
           request.waitUntilElementIsVisible('selector','#pending >* td:nth-child(1) >a[href^="/tasks"]');
           request.clickOnTaskName(1, 1);

           //Step 12: Submit the form B
           cy.xpath('//h4[contains(text(),"New Record List")]').should('be.visible');
           cy.get('button[aria-label="New Submit"]').should('be.visible').click();
           request.verifyTaskIsCompletedB();

           request.waitUntilTextcontainText('selector','varHeader','Completed');
       });
   }

    //TCP4-2226
    actionsAndAssertionsOfTCP42226(){
        //3.1 Add Record List
        cy.get('[data-cy="add-row"]').click();

            //Fill data in variable Date Picker Date
            cy.xpath('//label[text()="Date Picker Date"]//parent::div//input').first().click();
            screen.useCustomDate("2022", "Jan", "11");
            //Fill data in variable Date Picker Datetime
            cy.xpath('//label[text()="Date Picker Datetime"]//parent::div//input').first().click();
            screen.useCustomDateTime("2022", "Jan", "11","22","47");
            //Fill data in variable Line Input Date
            cy.xpath('//label[text()="Line Input Date"]//parent::div//input')
                .first()
                .type("2020-01-03")
                .should("have.value", "2020-01-03");
            //Fill data in variable Line Input Datetime
            cy.xpath('//label[text()="Line Input Datetime"]//parent::div//input')
                .first()
                .type("2022-01-04 22:47")
                .should("have.value", "2022-01-04 22:47");

        //Step 3.2: Inside Loop
            //Fill data in variable New Date Picker
            cy.xpath('//label[text()="New Date Picker"]//parent::div//input').first().click();
            screen.useCustomDate("2022", "Jan", "11");
            //Fill data in variable New Datetime Picker
            cy.xpath('//label[text()="New Datetime Picker"]//parent::div//input').first().click();
            screen.useCustomDateTime("2022", "Feb", "11","22","47");
            //Fill data in variable New Input Date
            cy.xpath('//label[text()="New Input Date"]//parent::div//input')
                .first()
                .type("2020-02-03")
                .should("have.value", "2020-02-03");
            //Fill data in variable New Input Datetime
            cy.xpath('//label[text()="New Input Datetime"]//parent::div//input')
                .first()
                .type("2022-02-04 22:47")
                .should("have.value", "2022-02-04 22:47");
        //Step 4: Create new loop and Fill inputs
            //Add First loop
            cy.get('button[title="Add Item"]').first().click();
            //Fill data in variable New Date Picker (New Loop)
            cy.xpath('//label[text()="New Date Picker"]//parent::div//input')
                .eq(1).click();
            screen.useCustomDate("2022", "Jan", "11");
            //Add Second loop
            cy.get('button[title="Add Item"]').eq(1).click();
            //Fill data in variable New Datetime Picker (New Loop)
            cy.xpath('//label[text()="New Datetime Picker"]//parent::div//input')
                .eq(1).click();
            screen.useCustomDateTime("2022", "Feb", "11","22","47");
            //Add Third loop
            cy.get('button[title="Add Item"]').eq(2).click();
            //Fill data in variable New Input Date (New Loop)
            cy.xpath('//label[text()="New Input Date"]//parent::div//input')
                .eq(1).click();
            //Add Four loop
            cy.xpath('//button[contains(text(),"Ok")]').click();
            //Click on New submit button
            cy.get(':nth-child(2) > .form-group > .btn').click();
            request.verifyTaskIsCompletedB();
        }

        //TCP4-2261
        plainTextBodyInSendEmailInModeler(elementName,elementXpath){
            cy.xpath(elementXpath.replace('nameElem',elementName)).first().should('be.visible').click();
            var baseUrl = `${Cypress.config().baseUrl}`
            cy.get('[aria-label="Body"]')
            .clear()
            .type(baseUrl)
            .type('/webentry/request/')
            .type('{{}').type('{{}')
            .type(" ")
            .type('_request.id')
            .type(" ")
            .type('{}}').type('{}}')
            .type('/node_4');
            cy.get('button[title="Save"]').click();
            cy.get('button[class="btn btn-secondary"]').click();
        }

    //TCP4-2221
    addLoop(index){
        cy.get('[title="Add Item"]').eq(index).click();
    }
    actionsAndAssertionsOfTCP42221ValidationsRulesLoops(){
        //Fill data in Accepted-Loop
        cy.xpath('//label[text()="Accepted - Loop"]//parent::div//div').should('contain','Field must be accepted');
        cy.xpath('//label[text()="Accepted - Loop"]//parent::div//input')
            .type("yes")
            .should("have.value", "yes");
        cy.xpath('//label[text()="Accepted - Loop"]//parent::div//div').should('not.exist');
        //Add loop
        this.addLoop(0);
        cy.xpath('//label[text()="Accepted - Loop"]//parent::div//input').eq(1).type("yes")
        .should("have.value", "yes");
        //Fill data in Alpha
        cy.xpath('//label[text()="Alpha"]//parent::div//input')
            .type("alpha")
            .should("have.value", "alpha");
        //Add loop
        this.addLoop(1);
        cy.xpath('//label[text()="Alpha"]//parent::div//input').eq(1)
            .type("paola222")
            .should("have.value", "paola222");
        cy.xpath('//label[text()="Alpha"]//parent::div//div').should('contain','Accepts only alphabet characters');
        cy.xpath('//label[text()="Alpha"]//parent::div//input').eq(1).clear().type('paola');
        cy.xpath('//label[text()="Alpha"]//parent::div//div').should('not.exist');
        //Fill data in Alpha-Numeric
        cy.xpath('//label[text()="Alpha-Numeric"]//parent::div//input')
            .type("paola123")
            .should("have.value", "paola123");
        //Add loop
        this.addLoop(2);
        cy.xpath('//label[text()="Alpha-Numeric"]//parent::div//input').eq(1)
            .type("123")
            .should("have.value", "123");
        //Fill data in Between Min 3 & Max 12
        cy.xpath('//label[text()="Between Min 3 & Max 12"]//parent::div//input')
            .type("123")
            .should("have.value", "123");
        cy.xpath('//label[text()="Between Min 3 & Max 12"]//parent::div//div').should('contain','Must have a value between 3 and 12');
        cy.xpath('//label[text()="Between Min 3 & Max 12"]//parent::div//input').clear()
            .type("12")
            .should("have.value", "12");
        cy.xpath('//label[text()="Between Min 3 & Max 12"]//parent::div//div').should('not.exist');
        this.addLoop(3);
        cy.xpath('//label[text()="Between Min 3 & Max 12"]//parent::div//input').eq(1)
        .type("3")
        .should("have.value", "3");
        //Fill data in Email
        cy.xpath('//label[text()="Email"]//parent::div//input')
            .type("automation-qaTCP42221@endtest-mail.io")
            .should("have.value", "automation-qaTCP42221@endtest-mail.io");
        //Fill data in Date
        cy.xpath('//label[text()="Date"]//parent::div//div').should('contain','Must be a valid Date');
        cy.xpath('//label[text()="Date"]//parent::div//input')
            .type("2020-10-02")
            .should("have.value", "2020-10-02");
        cy.xpath('//label[text()="Date"]//parent::div//div').should('not.exist');
        //Add loop
        this.addLoop(5);
        cy.xpath('//label[text()="Date"]//parent::div//input').eq(1)
            .type("2020-10-02")
            .should("have.value", "2020-10-02");
        //Fill data in In = 7
        cy.xpath('//label[text()="In = 7"]//parent::div//div').should('contain','Invalid value');
        cy.xpath('//label[text()="In = 7"]//parent::div//input')
            .type("7")
            .should("have.value", "7");
        cy.xpath('//label[text()="In = 7"]//parent::div//div').should('not.exist');
        //Add loop
        this.addLoop(6);
        cy.xpath('//label[text()="In = 7"]//parent::div//div').should('contain','Invalid value');
        cy.xpath('//label[text()="In = 7"]//parent::div//input').eq(1)
            .type("22")
            .should("have.value", "22");
        cy.xpath('//label[text()="In = 7"]//parent::div//div').should('contain','Invalid value');
        cy.xpath('//label[text()="In = 7"]//parent::div//input').eq(1).clear()
            .type("7")
            .should("have.value", "7");
        cy.xpath('//label[text()="In = 7"]//parent::div//div').should('not.exist');
        //Fill data in Max Length 5
        cy.xpath('//label[text()="Max Length 5"]//parent::div//input')
            .type("1")
            .should("have.value", "1");
        //Add loop
        this.addLoop(7);
        cy.xpath('//label[text()="Max Length 5"]//parent::div//input').eq(1)
        .type("123456")
        .should("have.value", "123456");
        cy.xpath('//label[text()="Max Length 5"]//parent::div//div').should('contain','Must have at most 5');
        cy.xpath('//label[text()="Max Length 5"]//parent::div//input').eq(1).clear()
        .type("12345")
        .should("have.value", "12345");
        cy.xpath('//label[text()="Max Length 5"]//parent::div//div').should('not.exist');
        //Fill data in Same = email2
        cy.xpath('//label[text()="Same = email2"]//parent::div//input')
            .type("automation-qaTCP42221@endtest-mail.io")
            .should("have.value", "automation-qaTCP42221@endtest-mail.io");
        //Fill data in URL
        cy.xpath('//label[text()="URL"]//parent::div//input')
            .type("https://www.ecosia.org")
            .should("have.value", "https://www.ecosia.org");
        //Add loop
        this.addLoop(9);
        cy.xpath('//label[text()="URL"]//parent::div//input').eq(1)
            .type("paola")
            .should("have.value", "paola");
        cy.xpath('//label[text()="URL"]//parent::div//div').should('contain','Must be a valid URL');
        cy.xpath('//label[text()="URL"]//parent::div//input').eq(1).clear()
            .type("https://www.ecosia.org")
            .should("have.value", "https://www.ecosia.org");
    }
    actionsAndAssertionsOfTCP42221addHiddenLoops(){
        //Add loops
        //Min Length 3
        cy.get('[title="Add Item"]').eq(10).click({force:true});
        cy.xpath('//label[text()="Min Length 3"]//parent::div//input')
            .type("123")
            .should("have.value", "123");
        //Not In 9
        cy.get('[title="Add Item"]').eq(11).click({force:true});
        cy.xpath('//label[text()="Not In  9"]//parent::div//input')
        .type("99")
        .should("have.value", "99");
        //Regex [xyz]
        cy.get('[title="Add Item"]').eq(12).click({force:true});
        cy.xpath('//label[text()="Regex [xyz]"]//parent::div//div').should('contain','Invalid value');
        cy.xpath('//label[text()="Regex [xyz]"]//parent::div//input')
        .type("xyz")
        .should("have.value", "xyz");
        cy.xpath('//label[text()="Regex [xyz]"]//parent::div//div').should('not.exist');
        //Required
        cy.get('[title="Add Item"]').eq(13).click({force:true});
        cy.xpath('//label[text()="Required"]//parent::div//div').should('contain','Field is required');
        cy.xpath('//label[text()="Required"]//parent::div//input')
        .type("required")
        .should("have.value", "required");
        cy.xpath('//label[text()="Required"]//parent::div//div').should('not.exist');
        //New Input
        cy.get('[title="Add Item"]').eq(14).click({force:true});
        cy.xpath('//label[text()="New Input"]//parent::div//input')
        .type("paola")
        .should("have.value", "paola");
        //Required If  form_input_14 = paola
        cy.xpath('//label[text()="Required If  form_input_14 = paola"]//parent::div//div').should('contain','Field is required');
        cy.xpath('//label[text()="Required If  form_input_14 = paola"]//parent::div//input')
        .type("paola required")
        .should("have.value", "paola required");
        cy.xpath('//label[text()="Required If  form_input_14 = paola"]//parent::div//div').should('not.exist');
        //form_select_list_2
        cy.get('[title="Add Item"]').eq(15).click({force:true});
        cy.xpath('//label[text()="Required Unless  form_select_list_2 = one"]//parent::div//div').should('contain','Field is required');
        cy.xpath("//label[text()='form_select_list_2']/parent::div//div[@class='multiselect__tags']").should('be.visible');
        cy.xpath("//label[text()='form_select_list_2']/parent::div//div[@class='multiselect__tags']").click();
        cy.xpath("//label[text()='form_select_list_2']/parent::div//input").type('one').should('have.value','one');
        cy.xpath("//label[text()='form_select_list_2']/parent::div//div[@class='multiselect__content-wrapper']//li[1]")
            .should('have.attr', 'aria-label')
            .and('equal', 'one. ');
        cy.xpath("//label[text()='form_select_list_2']/parent::div//input").type('{enter}');
        cy.xpath('//label[text()="Required Unless form_select_list_2 = one"]//parent::div//div').should('not.exist');
        //Required Unless form_select_list_2 = one
        cy.xpath('//label[text()="Required Unless  form_select_list_2 = one"]//parent::div//input')
        .type("paola")
        .should("have.value", "paola");
    }
    actionsAndAssertionsOfTCP42221DatePickerOnlyFill(labelInput,date,index){
        //After date
        //Fill data in New Date Picker1
        let locator ='//label[text()="'+labelInput+'"]//parent::div//input'
        cy.xpath(locator).eq(index)
            .type(date).type('{enter}')
            .should("have.value", date);
    }
    actionsAndAssertionsOfTCP42221DatePickerFieldRequired(labelInput,date,textHelp,index){
        //Fill data in New Date Picker2
        let locatorInput = '//label[text()="'+labelInput+'"]//parent::div//input'
        let locatorTextHelp = '//label[text()="'+labelInput+'"]//parent::div//div'
        cy.xpath(locatorTextHelp).eq(index).should('contain',textHelp);
        cy.xpath(locatorInput).eq(index)
            .type(date).type('{enter}')
            .should("have.value", date);
        cy.xpath(locatorTextHelp).should('not.exist');
    }
    actionsAndAssertionsOfTCP42221otherControls(){
        //Click on Check box
        cy.get('[aria-label="New Checkbox"]').click();
        //Add loop in Check box
        cy.get('[title="Add Item"]').eq(20).click({force:true});
        cy.get('[aria-label="New Checkbox"]').eq(1).click();
        //Fill New date PickerA
        cy.get('input[aria-label="New Date PickerA"]').click();
        screen.useCustomDate('2022','Nov','17');
        //Fill New date PickerB
        cy.get('input[aria-label="New Date PickerB"]').click();
        screen.useCustomDateTime('2022','Nov','17','10','20');
        //Select File
        //upload file
        const file = 'images/image1.jpg';
        cy.get('input[data-cy="file-upload-button"]').attachFile(file);
        cy.get('div[class="uploader-file-status"] > span').should('contain.text','success');
        //Select List
        cy.xpath("//label[text()='New Select ListA']/parent::div//div[@class='multiselect__tags']").should('be.visible');
        cy.xpath("//label[text()='New Select ListA']/parent::div//div[@class='multiselect__tags']").click();
        cy.xpath("//label[text()='New Select ListA']/parent::div//input").type('3').should('have.value','3');
        cy.xpath("//label[text()='New Select ListA']/parent::div//div[@class='multiselect__content-wrapper']//li[1]")
            .should('have.attr', 'aria-label')
            .and('equal', '3. ');
        cy.get('[data-cy="screen-field-form_select_list_3"]').click();
        cy.get('[data-cy="screen-field-form_select_list_3"]>* input').type('{enter}');
        //New text area
        cy.get('[data-cy="screen-field-form_text_area_1"]')
        .type("text area")
        .should("have.value", "text area");
        cy.get('[title="Add Item"]').eq(24).click({force:true});
        cy.get('[data-cy="screen-field-form_text_area_1"]').eq(1)
        .type("2")
        .should("have.value", "2");
        //Sign
        cy.get('[class="signature pl-0"]').click();
        cy.get('.alert-wrapper > .alert').should('be.visible')
        cy.get('[title="Add Item"]').eq(25).click({force:true});
        cy.get('.signature > canvas').eq(1).click();
        cy.get('.alert-wrapper > .alert').should('be.visible')
    }
    //TCP4-2207
    actionsAndAssertionsOfTCP42207VerifyDownloadFile(nameDoc,num){
        var concat = "./cypress/downloads/" + nameDoc + ".pdf";
        cy.readFile(concat).should("exist");
    }
    //TCP4-2214
    actionsAndAssertionsWebEntryOfTCP42214(option,password,filePathImage){
        //Fill form (enter password , select file, select "yes")
        cy.get('[id="password-input"]').should('be.visible');
        cy.get('[id="password-input"]').type(password);
        cy.get('button[class="btn btn-primary"]').click();
        admin.selectFileInFileManager(filePathImage);
        var locator ='input[name="'+option+'"]'
        cy.get(locator).click({force:true});
        cy.get('button[aria-label="New Submit"]').click();
        cy.get('[name="Engage Web Entry Completion Screen"]')
            .should('contain','Thank You!');
    }
    actionsAndAssertionsRequestOfTCP42214(difficulty){
        cy.xpath('//label[text()="Select the difficulty"]//parent::div//input')
            .click({force:true}).type('Half').should('have.value', difficulty).type('{enter}');
    }
    verifyImageInTCP42214(){
        cy.get('[aria-label="File Preview"]').should('exist');
    }
    verifySelectOptionInTCP42214(option){
        let locator1 = '[name="' + option + '"]'
        cy.get(locator1).should('be.checked')
    }
    //TCP4-2202
    actionsAndAssertionsOfTCP42202(requestId){
        //Step 1: Complete task "A"
        cy.xpath('//b[contains(text(),"TEXT")]').should('be.visible');
        request.waitUntilElementIsVisible('selector', 'button[class="btn btn-primary"]');
        cy.xpath('//button[contains(text(),"Complete Task")]').click();
        request.verifyTaskIsCompletedB();

        //Step 2: Go to URL request
        navHelper.navigateToRequestsPage();
        cy.visit('/requests/' + requestId);
        request.waitUntilElementIsVisible('selector','.px-4 > :nth-child(9)',20);

        cy.get('#main').should('contain','Admin User has completed the task A');
        cy.get('#main').should('contain','Admin User has completed the task AA');
        cy.get('#main').should('contain','Admin User has completed the task BB');

        let today = new Date();
        let day = today.getDate();

        //Step 3: If day is an even number.
        if(day % 2 === 0) {
            cy.get('#main').should('contain','Admin User has completed the task C');
        }
    }
    //TCP4 2195
    actionsAndAssertionsOfTCP42195FillRecordList(input1,textArea1,datePicker1,datePicker2,timezone_format){
        cy.contains('button[data-cy="add-row"]','Add').click();
        cy.get('input[name="input1"]').eq(0).type(input1).should('have.value',input1);
        let M = datePicker1.split("-")[1];
        let D = datePicker1.split("-")[2];
        let Y = datePicker1.split("-")[0];
        let M1 = datePicker2.split("-")[1];
        let D1 = datePicker2.split("-")[2].split(" ")[0];
        let Y1 = datePicker2.split("-")[0];
        let H = datePicker2.split("-")[2].split(" ")[1].split(":")[0];
        let I = datePicker2.split("-")[2].split(" ")[1].split(":")[1];
        admin.changeWriteDateZone(M,D,Y,'00','00',timezone_format,'datePicker1');
        cy.get('textarea[name="textArea1"]').eq(0).type(textArea1).should('have.value',textArea1);
        admin.changeWriteDateZone(M1,D1,Y1,H,I,timezone_format,'datePicker2');
        cy.contains('button[class="btn btn-primary"]','Ok').click();
    }
    actionsAndAssertionsOfTCP42195FillLoop(index,input2,textArea2,datePicker3,datePicker4,timezone_format){
        cy.get('input[name="input2"]').eq(index).type(input2).should('have.value',input2);
        cy.get('textarea[name="textArea2"]').eq(index).type(textArea2).should('have.value',textArea2);
        let M = datePicker3.split("-")[1];
        let D = datePicker3.split("-")[2];
        let Y = datePicker4.split("-")[0];
        let M1 = datePicker4.split("-")[1];
        let D1 = datePicker4.split("-")[2].split(" ")[0];
        let Y1 = datePicker4.split("-")[0];
        let H = datePicker4.split("-")[2].split(" ")[1].split(":")[0];
        let I = datePicker4.split("-")[2].split(" ")[1].split(":")[1];
        let pos = index+1;
        admin.changeWriteDateZone(M,D,Y,'00','00',timezone_format,'datePicker3',pos);
        admin.changeWriteDateZone(M1,D1,Y1,H,I,timezone_format,'datePicker4',pos);
    }
    actionsAndAssertionsOfTCP42195RecoverRecordList(index,option,label,datepicker=false,format_timezone){
        var labelInputOption ='//label[text()="'+label+'"]';
        var multiselect = '//label[text()="'+label+'"]/parent::div//div[@class="multiselect__tags"]';
        var locatorInputOption = '//label[text()="'+label+'"]/parent::div//input';
        var locatorOption ='//label[text()="'+label+'"]/parent::div//div[@class="multiselect__content-wrapper"]//li[1]';

        if(datepicker){
            format_timezone = format_timezone.split(" ")[0];
            let M = option.split("-")[1];
            let D = option.split("-")[2];
            let Y = option.split("-")[0];
            option = format_timezone.replaceAll('M', M).replaceAll('D', D).replaceAll('Y', Y)
        }
        cy.xpath(multiselect).eq(index).should('be.visible');
        cy.xpath(labelInputOption).eq(index).should('be.visible');
        cy.xpath(multiselect).eq(index).click();
        cy.xpath(locatorInputOption).eq(index).click({force:true});
        cy.xpath(locatorInputOption).eq(index).type(option).should('have.value', option);
        cy.xpath(locatorOption)
            .should('have.attr', 'aria-label')
            .and('equal',option+". ");
        cy.xpath(locatorInputOption).eq(0).type('{enter}');
    }
    actionsAndAssertionsOfTCP42195RecoverRecordListDateTime(index,date,label){
        var labelInputOption ='//label[text()="'+label+'"]';
        var multiselect = '//label[text()="'+label+'"]/parent::div//div[@class="multiselect__tags"]';
        var locatorInputOption = '//label[text()="'+label+'"]/parent::div//input';
        var locatorOption ='//label[text()="'+label+'"]/parent::div//div[@class="multiselect__content-wrapper"]//li[1]';
        cy.xpath(labelInputOption).eq(index).should('be.visible');
        cy.xpath(multiselect).eq(index).should('be.visible');
        cy.xpath(multiselect).eq(index).click();
        cy.xpath(locatorInputOption).eq(index).click({force:true});
        var option = date+'T17:00:00.000Z';
        cy.log(option);
        cy.xpath(locatorInputOption).eq(index).type(option).should('have.value',option);
        cy.xpath(locatorOption)
            .should('have.attr', 'aria-label')
            .and('equal',option+". ");
        cy.xpath(locatorInputOption).eq(0).type('{enter}');
    }
    //TCP4-2210
    addScriptInModeler(elementName,elementXpath,scriptName){
        cy.xpath(elementXpath.replace('nameElem',elementName)).first().should('be.visible').click();
        var baseUrl = `${Cypress.config().baseUrl}`
        cy.xpath('//label[text()="Script"]/parent::div//input').click({force:true})

        cy.xpath('//label[text()="Script"]/parent::div//input').type(scriptName).should('have.value',scriptName);
        cy.wait(2000);
        cy.xpath('//label[text()="Script"]/parent::div//input').type('{enter}');
    }
    actionsAndAssertionsOfTCP42210RecoverRecordList(index,option,label){
        var labelInputOption ='//label[text()="'+label+'"]'
        var locatorInputOption = '//label[text()="'+label+'"]/parent::div//input'
        var locatorOption ='//label[text()="'+label+'"]/parent::div//div[@class="multiselect__content-wrapper"]//li[1]'
        cy.log(labelInputOption)
        cy.log(locatorInputOption)
        cy.log(locatorOption)
        cy.xpath(labelInputOption).eq(index).should('be.visible');
        cy.xpath(locatorInputOption).eq(index).click({force:true})
        cy.xpath(locatorInputOption).eq(index).type(option).should('have.value', option);
        cy.wait(3000);
        cy.xpath(locatorInputOption).eq(index).type('{enter}');
    }
    actionsAndAssertionsOfTCP42210RecoverRecordListDateTime(index,date,label){
        var labelInputOption ='//label[text()="'+label+'"]'
        var locatorInputOption = '//label[text()="'+label+'"]/parent::div//input'
        var locatorOption ='//label[text()="'+label+'"]/parent::div//div[@class="multiselect__content-wrapper"]//li[1]'
        cy.xpath(labelInputOption).eq(index).should('be.visible');
        cy.xpath(locatorInputOption).eq(index).click({force:true})
        var option = date+'T19:39:00.000Z'
        cy.log(option)
        cy.xpath(locatorInputOption).eq(index).type(option).should('have.value',option);
        cy.wait(3000);
        cy.xpath(locatorInputOption).eq(index).type('{enter}');
    }
    //TCP4-2336
    actionsAndAssertionsOfTCP42336(Name,Age,Course,Birthday){
        cy.xpath('//label[text()="Name"]//parent::div//input').eq(0).type(Name).should('have.value',Name);
        cy.xpath('//label[text()="Age"]//parent::div//input').eq(0).type(Age).should('have.value',Age);
        cy.xpath("//label[text()='Course']/parent::div//div[@class='multiselect__tags']").eq(0).click();
        cy.xpath("//label[text()='Course']/parent::div//input").eq(0).type(Course).should('have.value',Course);
        cy.xpath("//label[text()='Course']/parent::div//div[@class='multiselect__content-wrapper']//li[1]").eq(0)
            .should('have.attr', 'aria-label')
            .and('equal', Course+". ");
        cy.xpath("//label[text()='Course']/parent::div//input").eq(0).type('{enter}');
        cy.xpath('//label[text()="Date"]//parent::div//input').eq(0).type(Birthday).eq(0).type('{enter}');
        cy.xpath('//label[text()="Name"]//parent::div//input').click();
        cy.get('button[aria-label="New Submit"]').click();
        cy.get('.alert-wrapper > .alert').should('be.visible');
    }
    deleteAllActiveColumnsFromSaveSearch(nameColumnsList){
        cy.wait(5000)
        const len = nameColumnsList.length;
        for(var i=0; i<len; i++){
            this.deleteActiveColumnSaveSearch(nameColumnsList[i]);
        }
    }
    deleteActiveColumnSaveSearch(nameColumn){
        cy.xpath("//span[text()='nameColumn']/parent::div/following-sibling::div/a".replace('nameColumn', nameColumn)).should('be.visible').eq(0).click();
        cy.xpath("//span[text()='nameColumn']/parent::div/following-sibling::div/a".replace('nameColumn', nameColumn)).should('not.be.visible');
    }
    addCustomColumnTCP42336(){

        cy.get("div [class='border bg-muted px-3 draggable-list draggable-available'] :nth-child(11) > .column-card").drag(".mr-3 > .border");
        cy.get("div [class='border bg-muted px-3 draggable-list draggable-available'] :nth-child(11) > .column-card").drag(".mr-3 > .border");
        cy.get("div [class='border bg-muted px-3 draggable-list draggable-available'] :nth-child(11) > .column-card").drag(".mr-3 > .border");
        cy.get("div [class='border bg-muted px-3 draggable-list draggable-available'] :nth-child(11) > .column-card").drag(".mr-3 > .border");
        cy.xpath('//*[@id="nav-columns"]//button[2]').click({ force: true });
    }
    waitUntilcardBodyIsVisible(selectorXPath,maxAttempts=10, attempts=0){
        if (attempts > maxAttempts) {
            throw new Error("Timed out waiting for report to be generated");
        }
        cy.wait(3000);
        cy.get('#main')
            .then($main => {
                if ($main.find(selectorXPath).length <= 0) {
                    cy.reload();
                    this.waitUntilcardBodyIsVisible(selectorXPath,maxAttempts, attempts+1);
                }
            })
    }
    actionsAndAssertionsOfTCP42223(requestId){

        //Step 1: Complete the Form 1
        cy.xpath("//input[@type='text'][@name='form_input_1']").should("be.visible");
        cy.xpath("//input[@type='text'][@name='form_input_1']").type('Test 2223').should('have.value','Test 2223');
        cy.xpath("//button[contains(text(),'Add')]").should("be.visible").click();
        //record list
        cy.xpath('//label[text()="Date Picker Date"]//ancestor::div[@class="form-group position-relative"]//input').first().click({force:true});
        screen.useCustomDate("2022", "Sep", "11");
        cy.xpath('//label[text()="Date Picker Datetime"]//ancestor::div[@class="form-group position-relative"]//input').first().click({force:true});
        screen.useCustomDateTime('2022','Sep','11','16','14');
        cy.xpath("//input[@type='text'][@name='form_input_2']").first().type('2023-24-02{enter}').should('have.value','2023-24-02');
        cy.xpath("//input[@type='text'][@name='form_input_3']").first().type('2023-24-02 01:22{enter}');

        //Inside Loop
        cy.xpath('//strong[text()="Inside Loop"]//ancestor::div[@class="page"][1]//div[5]//div[@data-cy="screen-field-form_date_picker_3"]//input').first().click({force:true});
        screen.useCustomDate("2022", "Sep", "12");
        cy.xpath('(//button[@title="Add Item"])[1]').should("be.visible").click();
        cy.xpath('(//strong[text()="Inside Loop"]//ancestor::div[@class="page"][1]//div[5]//div[@data-cy="screen-field-form_date_picker_3"]//input)[2]').click({force:true});
        screen.useCustomDate("2022", "Sep", "30");
        cy.xpath('//strong[text()="Inside Loop"]//ancestor::div[@class="page"][1]//div[5]//div[@data-cy="screen-field-form_date_picker_4"]//input').first().click({force:true});
        screen.useCustomDateTime('2022','Oct','30','16','14');
        cy.xpath("(//input[@type='text'][@name='form_input_4'])[1]").type('1993-11-15{enter}').should('have.value','1993-11-15');
        cy.xpath('(//button[@title="Add Item"])[3]').should("be.visible").click();
        cy.xpath("(//input[@type='text'][@name='form_input_4'])[2]").type('1993-11-16{enter}').should('have.value','1993-11-16');
        cy.xpath('(//button[@title="Add Item"])[4]').should("be.visible").click();
        cy.xpath("(//input[@type='text'][@name='form_input_5'])[1]").type('1993-11-16 12:12{enter}');
        cy.xpath('(//button[@title="Add Item"])[4]').should("be.visible").click();
        cy.xpath("(//input[@type='text'][@name='form_input_5'])[2]").type('1993-11-14 12:13{enter}');
        cy.xpath("//button[text()='Ok']").should("be.visible").click();
        //add record list
        cy.xpath("//button[contains(text(),'Add')]").should("be.visible").click();
        //record list
        cy.xpath('//label[text()="Date Picker Date"]//ancestor::div[@class="form-group position-relative"]//input').first().click({forcce:true});
        screen.useCustomDate("2022", "Oct", "10");
        cy.xpath('//label[text()="Date Picker Datetime"]//ancestor::div[@class="form-group position-relative"]//input').first().click({force:true});
        screen.useCustomDateTime('2022','Oct','11','16','14');
        cy.xpath("//input[@type='text'][@name='form_input_2']").first().should("be.visible").type('2023-24-02{enter}').should('have.value','2023-24-02');
        cy.xpath("//input[@type='text'][@name='form_input_3']").first().should("be.visible").type('2023-24-02 01:22{enter}');
        //Inside Loop
        cy.xpath('//strong[text()="Inside Loop"]//ancestor::div[@class="page"][1]//div[5]//div[@data-cy="screen-field-form_date_picker_3"]//input').first().click({force:true});
        screen.useCustomDate("2022", "Dec", "10");
        cy.xpath('(//button[@title="Add Item"])[1]').should("be.visible").click();
        cy.xpath('(//strong[text()="Inside Loop"]//ancestor::div[@class="page"][1]//div[5]//div[@data-cy="screen-field-form_date_picker_3"]//input)[2]').click({force:true});
        screen.useCustomDate("2022", "Dec", "30");
        cy.xpath('//strong[text()="Inside Loop"]//ancestor::div[@class="page"][1]//div[5]//div[@data-cy="screen-field-form_date_picker_4"]//input').first().click({force:true});
        screen.useCustomDateTime('2022','Dec','30','16','14');
        cy.xpath("(//input[@type='text'][@name='form_input_4'])[1]").type('1993-12-20{enter}').should('have.value','1993-12-20');
        cy.xpath('(//button[@title="Add Item"])[3]').should("be.visible").click();
        cy.xpath("(//input[@type='text'][@name='form_input_4'])[2]").type('1993-12-16{enter}').should('have.value','1993-12-16');
        cy.xpath('(//button[@title="Add Item"])[4]').should("be.visible").click();
        cy.xpath("(//input[@type='text'][@name='form_input_5'])[1]").type('1992-09-20 13:12{enter}');
        cy.xpath('(//button[@title="Add Item"])[4]').should("be.visible").click();
        cy.xpath("(//input[@type='text'][@name='form_input_5'])[2]").type('1992-10-30 15:13{enter}');
        cy.xpath("//button[text()='Ok']").should("be.visible").click();
        cy.xpath("//button[contains(text(),'New Submit')]").should("be.visible").click();
        request.verifyTaskIsCompletedB();

        //Step 2: Go to review request
        request.openRequestById(requestId);
        request.waitUntilElementIsVisible('selector', '#pending >* td:nth-child(1) >a[href^="/tasks"]');
        request.clickOnTaskName(1, 1);

        //Step 3: Review task form
        cy.get('[data-cy="edit-row"]').first().should("be.visible");
        cy.get('[data-cy="edit-row"]').first().click();
        cy.xpath('(//label[text()="Date Picker Date"]//ancestor::div[@class="form-group position-relative"]//input)[2]').should('contain.value','2022');
        cy.xpath("(//input[@type='text'][@name='form_input_2'])[2] ").should('have.value','2023-24-02');
        //Verify data loop
        cy.xpath('(//strong[text()="Inside Loop"]//ancestor::div[@class="page"][1]//div[5]//div[@data-cy="screen-field-form_date_picker_3"]//input)[2]').should('contain.value','2022');
        cy.xpath('(//strong[text()="Inside Loop"]//ancestor::div[@class="page"][1]//div[5]//div[@data-cy="screen-field-form_date_picker_3"]//input)[3]').should('contain.value','2022');
        cy.xpath("(//input[@type='text'][@name='form_input_4'])[2]").should('have.value','1993-11-15');
        cy.xpath("(//input[@type='text'][@name='form_input_4'])[3]").should('have.value','1993-11-16');
        cy.xpath("(//input[@type='text'][@name='form_input_5'])[4]").type('1992-11-30 15:13{enter}');
        cy.xpath("//button[text()='Save']").should("be.visible").click();
        //add record list
        cy.xpath("//button[contains(text(),'Add')]").should("be.visible").click();
        //record list
        cy.xpath('//label[text()="Date Picker Date"]//ancestor::div[@class="form-group position-relative"]//input').first().type('2022-11-09{enter}').should('contain.value','2022');
        cy.xpath('//label[text()="Date Picker Datetime"]//ancestor::div[@class="form-group position-relative"]//input').first().type('2022-11-09 16:14{enter}');
        cy.xpath("//input[@type='text'][@name='form_input_2']").first().should("be.visible").type('2023-24-02{enter}').should('have.value','2023-24-02');
        cy.xpath("//input[@type='text'][@name='form_input_3']").first().should("be.visible").type('2023-24-02 01:22{enter}');
        //Inside Loop
        cy.xpath('//*[@data-cy="screen-field-form_date_picker_3"]//input').first().click();
        screen.useCustomDate("2022", "Dec", "19");
        cy.xpath('(//button[@title="Add Item"])[1]').should("be.visible").click();
        cy.xpath('(//strong[text()="Inside Loop"]//ancestor::div[@class="page"][1]//div[5]//div[@data-cy="screen-field-form_date_picker_3"]//input)[2]').type('2022-12-30{enter}').should('have.value','2022-12-30');
        cy.xpath('//*[@data-cy="screen-field-form_date_picker_4"]//input').first().click();
        screen.useCustomDateTime("2022","Dec","30","16","14");
        cy.xpath("//button[text()='Ok']").should("be.visible").click();
        cy.xpath("//button[contains(text(),'New Submit')]").should("be.visible").click();
        request.verifyTaskIsCompletedB();

        //Review Summary
        cy.xpath("//a[contains(text(),'Summary')]").should("be.visible");
        //Review Forms tab
        cy.xpath("//a[contains(text(),'Forms')]").click();
        cy.xpath('//button[@title="Details"]').first().should("be.visible").click();
        cy.xpath('//div[@class="card-body h-100"]').should("be.visible");
        cy.contains('Admin User has completed the task Form Task').scrollIntoView();
    }
    actionsAndAssertionsOfTCP42132(requestId){
        cy.xpath("//p[text()='File Upload']").should("be.visible");
        //FILE 1
        const file11 = 'cloud1.jpeg';
        cy.xpath('//*[@data-cy="screen-field-file1"]//input[@data-cy="file-upload-button"]').attachFile(file11);
        cy.xpath('//*[@data-cy="screen-field-file1"]//*[contains(text(),"succes")]').should('exist');
        cy.wait(2000);
        //FILE 2
        const file12 = 'Databases.odp';
        cy.xpath('//*[@data-cy="screen-field-file2"]//input[@data-cy="file-upload-button"]').attachFile(file12);
        cy.xpath('//*[@data-cy="screen-field-file2"]//*[contains(text(),"succes")]').should('exist');
        cy.wait(2000);
        //File Upload  with  Loops New  Array Objects
        const file13 = 'sample_document.doc';
        cy.xpath('//*[@data-cy="screen-field-fileLoop1"]//input[@data-cy="file-upload-button"]').eq(0).attachFile(file13);
        cy.xpath('//*[@data-cy="screen-field-fileLoop1"][1]//*[contains(text(),"succes")]').should("exist");
        cy.wait(2000);
        const file14 = 'uno.png';
        cy.xpath('//*[@data-cy="screen-field-fileLoop1"]//input[@data-cy="file-upload-button"]').eq(1).attachFile(file14);
        cy.xpath('(//*[@data-cy="screen-field-fileLoop1"])[2]//*[contains(text(),"succes")]').should("exist");
        cy.wait(2000);
        //Add loop
        cy.get('[data-cy="loop-loop_1-add"]').click();
        const file15 = "lettre_parents_d'eleves_1-1.docx";
        cy.xpath('//*[@data-cy="screen-field-fileLoop1"]//input[@data-cy="file-upload-button"]').eq(2).should('exist');
        cy.xpath('//*[@data-cy="screen-field-fileLoop1"]//input[@data-cy="file-upload-button"]').eq(2).attachFile(file15);
        cy.xpath('(//*[@data-cy="screen-field-fileLoop1"])[3]//*[contains(text(),"succes")]').should("exist");
        cy.wait(2000);
        cy.contains('New Submit').scrollIntoView();
        //File Upload  with  Loops Existing Array
        cy.get('[data-cy="loop-loop_2-add"]').click();
        const file23 = "file5.pptx";
        cy.xpath('//*[@data-cy="screen-field-fileLoop2"]//input[@data-cy="file-upload-button"]').attachFile(file23);
        cy.xpath('//*[@data-cy="screen-field-fileLoop2"]//*[contains(text(),"succes")]').should("exist");
        cy.wait(2000);
        cy.get('[data-cy="loop-loop_2-add"]').click();
        const file24 = "win.png";
        cy.xpath('//*[@data-cy="screen-field-fileLoop2"]//input[@data-cy="file-upload-button"]').eq(1).attachFile(file24);
        cy.xpath('(//*[@data-cy="screen-field-fileLoop2"])[2]//*[contains(text(),"succes")]').should("exist");
        cy.wait(2000);
        //Add record list
        cy.contains('New Record List').scrollIntoView();
        cy.get('[data-cy="add-row"]').click();
        cy.xpath('//div[@class="modal-content"]').should('be.visible');
        cy.wait(2000);
        //FILE 3
        const file16 = "sample.pdf";
        cy.xpath('//*[@name="RL_file"]//*[@data-cy="screen-field-file3"]//input[@data-cy="file-upload-button"]').eq(0).attachFile(file16);
        cy.xpath('//*[@name="RL_file"]//*[@data-cy="screen-field-file3"]//*[contains(text(),"succes")]').should("exist");
        cy.wait(2000);
        const file17 = "PM 4.1.0 - Scenarios.xlsx";
        cy.xpath('//*[@name="RL_file"]//*[@data-cy="screen-field-file4"]//input[@data-cy="file-upload-button"]').eq(0).attachFile(file17);
        cy.xpath('//*[@name="RL_file"]//*[@data-cy="screen-field-file4"]//*[contains(text(),"succes")]').should("exist");
        cy.wait(4000);
        const file18 = "shibboleth.crt";
        cy.xpath('(//*[@name="RL_file"]//*[@data-cy="screen-field-loopFile4"]//input[@data-cy="file-upload-button"])[1]').eq(0).attachFile(file18);
        cy.xpath('(//*[@name="RL_file"]//*[@data-cy="screen-field-loopFile4"])[1]//*[contains(text(),"succes")]').should("exist");
        cy.wait(2000);
        const file19 = "Universidad.pdf";
        cy.xpath('(//*[@name="RL_file"]//*[@data-cy="screen-field-loopFile4"]//input[@data-cy="file-upload-button"])[2]').attachFile(file19);
        cy.xpath('(//*[@name="RL_file"]//*[@data-cy="screen-field-loopFile4"])[2]//*[contains(text(),"succes")]').should("exist");
        cy.wait(2000);
        //Add loop inside a record list
        cy.get('[data-cy="loop-loop_3-add"]').first().click();
        const file20 = "uno.png";
        cy.xpath('(//*[@name="RL_file"]//*[@data-cy="screen-field-loopFile4"]//input[@data-cy="file-upload-button"])[3]').attachFile(file20);
        cy.xpath('(//*[@name="RL_file"]//*[@data-cy="screen-field-loopFile4"])[3]//*[contains(text(),"succes")]').should("exist");
        cy.wait(2000);
        //FILE 4
        const file21 = "win.png";
        //cy.xpath('(//input[@data-cy="file-upload-button"])[8]').attachFile(file21);
        cy.xpath('(//*[@name="RL_file"]//*[@data-cy="screen-field-loopFile4"]//input[@data-cy="file-upload-button"])[4]').attachFile(file21);
        cy.xpath('(//*[@name="RL_file"]//*[@data-cy="screen-field-loopFile4"])[4]//*[contains(text(),"succes")]').should("exist");
        cy.wait(2000);
        //Add loop
        cy.get('[data-cy="loop-loop_4-add"]').first().should("be.visible").click();
        const file22 = "cloud1.jpeg";
        cy.xpath('//*[@data-cy="screen-field-loopFile5"]//input[@data-cy="file-upload-button"]').attachFile(file22);
        cy.xpath('//*[@data-cy="screen-field-loopFile5"]//*[contains(text(),"succes")]').should("exist");
        cy.wait(4000);
        //Ok and submit
        cy.contains('Ok').scrollIntoView();
        cy.xpath("//button[contains(text(),'Ok')]").click();
        cy.contains('New Submit').scrollIntoView();
        cy.xpath("//button[contains(text(),'New Submit')]").click();
        request.verifyTaskIsCompletedB();
        //Complete task form
        var taskName = 'Form Task';
        //navHelper.navigateToRequestsPage();
        cy.visit('/requests/'+requestId);
        request.waitUntilElementIsVisible('[id="requestTabContent"] > [id="pending"] >* a[href^="/tasks"]');
        request.openTaskByTaskName(taskName);
        //Review data in second task
        cy.xpath("//p[text()='File Upload']").should("be.visible");
        //FILE 1
        cy.xpath('(//div[@data-cy="screen-field-file1"])[2]').should("exist");
        //FILE 2
        cy.xpath("//button[contains(text(),'Download')]").should("exist");
        //File Upload  with  Loops New  Array Objects
        cy.xpath('//div[@title="sample_document.doc"]').should("exist");
        cy.xpath('//div[@title="uno.png"]').should("exist");
        cy.contains('New Submit').scrollIntoView();
        //Edit record list
        cy.get('[data-cy="edit-row"]').click();
        cy.xpath('//div[@class="modal-content"]').should('be.visible');
        //FILE 3
        cy.xpath('//div[@title="shibboleth.crt"]').should("exist");
        cy.xpath('//div[@title="Universidad.pdf"]').should("exist");
        //On loop inside a record list
        //FILE 4
        cy.xpath('//div[@title="shibboleth.crt"]').should("exist");
        //Save and submit
        cy.contains('Save').scrollIntoView();
        cy.xpath('//button[text() = "Save"]').click((err, runnable) => {
            return false
        });
        //On a new record list
        cy.contains('New Submit').scrollIntoView();
        cy.xpath("//button[contains(text(),'New Submit')]").click();
        request.verifyTaskIsCompletedB();

        cy.visit('/requests/'+requestId);
        //Review Summary
        cy.xpath("//a[contains(text(),'Summary')]").should("be.visible");
        //Review File Manager
        cy.xpath("//a[contains(text(),'File Manager')]").click().should("be.visible").click();
        cy.xpath("//span[contains(text(),'cloud1')]").should("be.visible");
        cy.xpath("(//span[contains(text(),'cloud1')])[2]").should("be.visible");
        cy.xpath("//span[contains(text(),'Databases')]").should("be.visible");
        cy.xpath("//span[contains(text(),'file5')]").should("be.visible");
        cy.xpath("//span[contains(text(),'docx')]").should("be.visible");
        cy.xpath("//span[contains(text(),'sample_document')]").scrollIntoView().should("be.visible");
        cy.xpath("//span[contains(text(),'shibboleth')]").should("be.visible");
        cy.xpath("//span[contains(text(),'Universidad')]").should("be.visible");
        cy.xpath("//span[contains(text(),'uno')]").first().should("be.visible");
        cy.xpath("(//span[contains(text(),'uno')])[2]").should("be.visible");
        //Review Forms tab
        cy.xpath("//a[contains(text(),'Forms')]").should("be.visible").click();
        cy.xpath('//button[@title="Details"]').first().should("be.visible").click();
        cy.xpath('//div[@class="card-body h-100"]').should("be.visible");
        cy.get('[item-index="1"] > .vuetable-slot > .actions > .popout > [title="Details"] > .fas').should("be.visible").click();
    }
    //TCP4-2209
    actionsAndAssertionsOfTCP42209FillRecordList(input1,textArea1,datePicker1,datePicker2){
        cy.contains('button[data-cy="add-row"]','Add').click();
        cy.get('input[name="input1"]').eq(0).type(input1).should('have.value',input1);
        cy.get('textarea[name="textArea1"]').eq(0).type(textArea1).should('have.value',textArea1);
        cy.get('input[aria-label="Date Picker 1"]').eq(0).type(datePicker1).type('{enter}').should('have.value',datePicker1);
        cy.get('input[aria-label="Date Picker 2"]').eq(0).type(datePicker2).type('{enter}').should('have.value',datePicker2);
        cy.contains('button[class="btn btn-primary"]','Ok').click();
    }
    actionsAndAssertionsOfTCP42209FillLoop(index,input2,textArea2,datePicker3,datePicker4){
        cy.get('input[name="input2"]').eq(index).type(input2).should('have.value',input2);
        cy.get('textarea[name="textArea2"]').eq(index).type(textArea2).should('have.value',textArea2);
        cy.get('input[aria-label="Date Picker 3"]').eq(index).type(datePicker3).type('{enter}').should('have.value',datePicker3);
        cy.get('input[aria-label="Date Picker 4"]').eq(index).type(datePicker4).type('{enter}').should('have.value',datePicker4);
    }
    actionsAndAssertionsOfTCP42209RecoverRecordList(index,option,label){
        var labelInputOption ='//label[text()="'+label+'"]';
        var locatorInputOption = '//label[text()="'+label+'"]/parent::div//input';
        var locatorOption ='//label[text()="'+label+'"]/parent::div//div[@class="multiselect__content-wrapper"]//li[1]';
        cy.log(labelInputOption);
        cy.log(locatorInputOption);
        cy.log(locatorOption);
        cy.xpath(labelInputOption).eq(index).should('be.visible');
        cy.xpath(locatorInputOption).eq(index).click({force:true});
        cy.xpath(locatorInputOption).eq(index).type(option).should('have.value', option);
        cy.xpath(locatorOption).eq(index)
            .should('have.attr', 'aria-label')
            .and('equal',option+". ");
        cy.xpath(locatorInputOption).eq(index).type('{enter}');
    }
    actionsAndAssertionsOfTCP42209RecoverRecordListDateTime(index,date,label){
        var labelInputOption ='//label[text()="'+label+'"]';
        var locatorInputOption = '//label[text()="'+label+'"]/parent::div//input';
        var locatorOption ='//label[text()="'+label+'"]/parent::div//div[@class="multiselect__content-wrapper"]//li[1]';
        cy.xpath(labelInputOption).eq(index).should('be.visible');
        cy.xpath(locatorInputOption).eq(index).click({force:true});
        var option = date+'T04:00:00.000Z';
        cy.log(option);
        cy.xpath(locatorInputOption).eq(index).type(option).should('have.value',option);
        cy.xpath(locatorOption).eq(index)
            .should('have.attr', 'aria-label')
            .and('equal',option+". ");
        cy.xpath(locatorInputOption).eq(index).type('{enter}');
    }
    actionsAndAssertionsOfTCP42192(requestId){
        //Step 1: Wait the pàge is load
        cy.get('[data-cy="screen-field-form_input_1"]').first().should('be.visible');
        cy.get('[data-cy="screen-field-form_input_1"]').first().type('2192 automation').should('have.value','2192 automation');
        cy.xpath('(//input[@name="form_input_1"])[2]').should('have.value','2192 automation');
        cy.xpath('//label[@class="form-check-label"]').click();
        cy.xpath('//textarea[@name="form_text_area_1"]').type('TCP4-2192 Process PDF',{delay:300}).should('have.value','TCP4-2192 Process PDF');
        cy.xpath('//label[text()="New Select List"]/parent::div//div[@class="multiselect__tags"]').click();
        cy.xpath('//label[text()="New Select List"]/parent::div//div[@class="multiselect__tags"]//input').should('be.visible').type('Three');
        cy.wait(2000);
        cy.xpath('//label[text()="New Select List"]/parent::div//div[@class="multiselect__tags"]//input').type('{enter}');
        cy.xpath("(//button[contains(text(),'New Submit')])[2]").should('be.visible').click();
        request.verifyTaskIsCompletedB();

        //Validation 1: Review Summary
        cy.visit('/requests/'+requestId+'/files');
        request.waitUntilTextcontainText('selector','varHeader','Completed');
        cy.visit('/requests/'+requestId);
        cy.xpath("//a[contains(text(),'Summary')]").should("be.visible");
        cy.xpath("//td[text()='form_input_1']").should("be.visible");
        cy.xpath("//td[text()='form_checkbox_1']").first().should("be.visible");
        cy.xpath("//td[text()='form_text_area_1']").first().should("be.visible");
        cy.xpath("//td[text()='form_select_list_1']").should("be.visible");
        cy.xpath("//td[text()='testCaseNestedScreen']").should("be.visible");

        //Validation 2: Review File Manager
        cy.xpath("//a[contains(text(),'File Manager')]").should("be.visible").click();
        cy.xpath('//button[@title="View"]').should("be.visible").click();
        cy.get('[id="pdfViewer"]').should('be.visible');
    }
    actionsAndAssertionsOfTCP42196(requestId){

        //Step 1: Complete the Form 1
        cy.xpath('//input[@data-cy="screen-field-form_input_1"]').should('be.visible').type('test text').should('have.value','test text');
        cy.xpath('//input[@data-cy="screen-field-form_input_2"]').type('1234567890').should('have.value','1234567890');
        cy.xpath('//input[@data-cy="screen-field-form_input_3"]').type('123456789').should('have.value','123.456.789,00');
        cy.xpath('//input[@data-cy="screen-field-form_input_4"]').type('99').should('have.value','99.00 %');
        cy.xpath('//input[@data-cy="screen-field-form_input_5"]').type('123456.789').should('have.value','123456.789');
        cy.xpath('//input[@data-cy="screen-field-form_input_6"]').type('2020-10-09 08:30').should('have.value','2020-10-09 08:30');
        cy.xpath('//input[@data-cy="screen-field-form_input_7"]').type('2020-10-09').should('have.value','2020-10-09');
        cy.xpath('//input[@data-cy="screen-field-form_input_8"]').type('password123');
        cy.xpath('//input[@data-cy="screen-field-form_input_9"]').first().type('test 1').should('have.value','test 1');
        cy.xpath('(//input[@data-cy="screen-field-form_input_9"])[2]').type('test 2').should('have.value','test 2');
        cy.xpath('(//input[@data-cy="screen-field-form_input_9"])[3]').type('test 3').should('have.value','test 3');
        //add loop
        cy.xpath('//button[@data-cy="loop-loop_2-add"]').click();
        cy.xpath('//input[@data-cy="screen-field-form_input_10"]').first().should('be.visible').type('test loop 2').should('have.value','test loop 2');
        cy.xpath('//button[@data-cy="loop-loop_2-add"]').click();
        cy.xpath('(//input[@data-cy="screen-field-form_input_10"])[2]').should('be.visible').type('test loop 22').should('have.value','test loop 22');
        cy.xpath('//input[@data-cy="screen-field-form_input_11"]').first().type('loop 3').should('have.value','loop 3');
        cy.xpath('(//input[@data-cy="screen-field-form_input_11"])[2]').type('loop 33').should('have.value','loop 33');
        cy.xpath('(//input[@data-cy="screen-field-form_input_11"])[3]').type('loop 333').should('have.value','loop 333');
        cy.xpath('//button[@data-cy="loop-loop_3-add"]').should('be.visible').click();
        cy.xpath('(//input[@data-cy="screen-field-form_input_11"])[4]').should('be.visible').type('loop 3333').should('have.value','loop 3333');
        //add new first recordlist
        cy.xpath('//button[@data-cy="add-row"]').first().click();
        cy.xpath('//div[@class="modal-content"]').first().should('be.visible');
        //complete data recordlist
        cy.xpath('//input[@data-cy="screen-field-text1"]').first().should('be.visible').type('test text recordlist').should('have.value','test text recordlist');
        cy.xpath('//input[@data-cy="screen-field-integer1"]').first().type('1234567890').should('have.value','1234567890');
        cy.xpath('//input[@data-cy="screen-field-currency1"]').first().type('123456789').should('have.value','123,456,789.00 BOB');
        cy.xpath('//input[@data-cy="screen-field-percentage1"]').first().type('99').should('have.value','99.00 %');
        cy.xpath('//input[@data-cy="screen-field-decimal1"]').first().type('123456.789').should('have.value','123456.789');
        cy.xpath('//input[@data-cy="screen-field-datetime1"]').first().type('2020-10-09 08:30').should('have.value','2020-10-09 08:30');
        cy.xpath('//input[@data-cy="screen-field-date1"]').first().type('2020-10-09').should('have.value','2020-10-09');
        cy.xpath('//input[@data-cy="screen-field-password1"]').first().type('password123');
        //Ok
        cy.xpath("//button[contains(text(),'Ok')]").first().click();
        cy.wait(2000);
        //add new second recordlist
        cy.xpath('(//button[@data-cy="add-row"])[2]').click();
        cy.xpath('(//div[@class="modal-content"])[3]').should('be.visible');
        //complete data recordlist
        cy.xpath('(//input[@data-cy="screen-field-text1"])[3]').should('be.visible').type('test text recordlist').should('have.value','test text recordlist');
        cy.xpath('(//input[@data-cy="screen-field-integer1"])[3]').type('1234567890').should('have.value','1234567890');
        cy.xpath('(//input[@data-cy="screen-field-currency1"])[3]').type('123456789').should('have.value','123,456,789.00 BOB');
        cy.xpath('(//input[@data-cy="screen-field-percentage1"])[3]').type('99').should('have.value','99.00 %');
        cy.xpath('(//input[@data-cy="screen-field-decimal1"])[3]').type('123456.789').should('have.value','123456.789');
        cy.xpath('(//input[@data-cy="screen-field-datetime1"])[3]').type('2020-10-09 08:30').should('have.value','2020-10-09 08:30');
        cy.xpath('(//input[@data-cy="screen-field-date1"])[3]').type('2020-10-09').should('have.value','2020-10-09');
        cy.xpath('(//input[@data-cy="screen-field-password1"])[3]').type('password123');
        //Ok
        cy.xpath("(//button[contains(text(),'Ok')])[2]").first().click();
        cy.xpath("//button[contains(text(),'New Submit')]").click();
        request.verifyTaskIsCompletedB();

        //Step 2: Open task form
        cy.visit('/requests/'+requestId);
        request.waitUntilElementIsVisible('selector','[id="requestTabContent"] > [id="pending"] >* a[href^="/tasks"]');
        request.clickOnTaskName(1, 1);

        //Step 3: Review and add data
        cy.xpath('//input[@data-cy="screen-field-form_input_1"]').should('be.visible').should('have.value','test text');
        cy.xpath('//input[@data-cy="screen-field-form_input_2"]').should('have.value','1234567890');
        cy.xpath('//input[@data-cy="screen-field-form_input_3"]').should('have.value','123.456.789,00');
        cy.xpath('//input[@data-cy="screen-field-form_input_4"]').should('have.value','99.00 %');
        cy.xpath('//input[@data-cy="screen-field-form_input_5"]').should('have.value','123456.789');
        cy.xpath('//input[@data-cy="screen-field-form_input_6"]').should('have.value','2020-10-09 08:30');
        cy.xpath('//input[@data-cy="screen-field-form_input_7"]').should('have.value','2020-10-09');
        cy.xpath('//input[@data-cy="screen-field-form_input_9"]').first().should('have.value','test 1');
        cy.xpath('(//input[@data-cy="screen-field-form_input_9"])[2]').should('have.value','test 2');
        cy.xpath('(//input[@data-cy="screen-field-form_input_9"])[3]').should('have.value','test 3');
        //add loop
        cy.xpath('//button[@data-cy="loop-loop_2-add"]').should('be.visible');
        cy.xpath('//input[@data-cy="screen-field-form_input_10"]').first().should('have.value','test loop 2');
        cy.xpath('//button[@data-cy="loop-loop_2-add"]').should('be.visible');
        cy.xpath('(//input[@data-cy="screen-field-form_input_10"])[2]').should('have.value','test loop 22');
        cy.xpath('//input[@data-cy="screen-field-form_input_11"]').first().should('have.value','loop 3');
        cy.xpath('(//input[@data-cy="screen-field-form_input_11"])[2]').should('have.value','loop 33');
        cy.xpath('(//input[@data-cy="screen-field-form_input_11"])[3]').should('have.value','loop 333');
        cy.xpath('//button[@data-cy="loop-loop_3-add"]').should('be.visible');
        cy.xpath('(//input[@data-cy="screen-field-form_input_11"])[4]').should('have.value','loop 3333');
        //add new first recordlist
        cy.xpath('//button[@data-cy="add-row"]').first().click();
        cy.xpath('//div[@class="modal-content"]').first().should('be.visible');
        //complete data recordlist
        cy.xpath('//input[@data-cy="screen-field-text1"]').first().should('be.visible').type('test text recordlist').should('have.value','test text recordlist');
        cy.xpath('//input[@data-cy="screen-field-integer1"]').first().type('1234567890').should('have.value','1234567890');
        cy.xpath('//input[@data-cy="screen-field-currency1"]').first().type('123456789').should('have.value','123,456,789.00 BOB');
        cy.xpath('//input[@data-cy="screen-field-percentage1"]').first().type('99').should('have.value','99.00 %');
        cy.xpath('//input[@data-cy="screen-field-decimal1"]').first().type('123456.789').should('have.value','123456.789');
        cy.xpath('//input[@data-cy="screen-field-datetime1"]').first().type('2020-10-09 08:30').should('have.value','2020-10-09 08:30');
        cy.xpath('//input[@data-cy="screen-field-date1"]').first().type('2020-10-09').should('have.value','2020-10-09');
        cy.xpath('//input[@data-cy="screen-field-password1"]').first().type('password123');
        //Ok
        cy.xpath("//button[contains(text(),'Ok')]").first().click();
        //add new second recordlist
        cy.xpath('(//button[@data-cy="add-row"])[2]').click();
        cy.xpath('(//div[@class="modal-content"])[3]').should('be.visible');
        //complete data recordlist
        cy.xpath('(//input[@data-cy="screen-field-text1"])[3]').should('be.visible').type('test text recordlist').should('have.value','test text recordlist');
        cy.xpath('(//input[@data-cy="screen-field-integer1"])[3]').type('1234567890').should('have.value','1234567890');
        cy.xpath('(//input[@data-cy="screen-field-currency1"])[3]').type('123456789').should('have.value','123,456,789.00 BOB');
        cy.xpath('(//input[@data-cy="screen-field-percentage1"])[3]').type('99').should('have.value','99.00 %');
        cy.xpath('(//input[@data-cy="screen-field-decimal1"])[3]').type('123456.789').should('have.value','123456.789');
        cy.xpath('(//input[@data-cy="screen-field-datetime1"])[3]').type('2020-10-09 08:30').should('have.value','2020-10-09 08:30');
        cy.xpath('(//input[@data-cy="screen-field-date1"])[3]').type('2020-10-09').should('have.value','2020-10-09');
        cy.xpath('(//input[@data-cy="screen-field-password1"])[3]').type('password123');
        //Ok
        cy.xpath("(//button[contains(text(),'Ok')])[2]").first().click();
        cy.xpath("//button[contains(text(),'New Submit')]").click();
        request.verifyTaskIsCompletedB();
        
        cy.visit('/requests/'+ requestId);
        request.waitUntilTextcontainText('selector','varHeader','Completed');
        //Review summary Completed and forms
        cy.xpath("//a[contains(text(),'Summary')]").should('be.visible').click();
        cy.xpath("//td[contains(text(),'loop_1.0.form_input_9')]").should('exist');
        cy.xpath("//td[contains(text(),'loop_1.1.form_input_9')]").should('exist');
        cy.xpath("//td[contains(text(),'loop_1.2.form_input_9')]").should('exist');
        cy.xpath("//td[contains(text(),'loop_2.0.form_input_10')]").should('exist');
        cy.xpath("//td[contains(text(),'loop_2.1.form_input_10')]").should('exist');
        cy.xpath("//td[contains(text(),'loop_3.0.form_input_11')]").should('exist');
        cy.xpath("//td[contains(text(),'loop_3.1.form_input_11')]").should('exist');
        cy.xpath("//td[contains(text(),'loop_3.2.form_input_11')]").should('exist');
        cy.xpath("//td[contains(text(),'loop_3.3.form_input_11')]").should('exist');
        cy.xpath("//td[contains(text(),'form_record_list_1.0.date1')]").should('exist');
        cy.xpath("//td[contains(text(),'form_record_list_1.0.date1')]").should('exist');
        cy.xpath("//td[contains(text(),'form_record_list_1.0.text1')]").should('exist');
        cy.xpath("//td[contains(text(),'form_record_list_1.0.row_id')] ").should('exist');
        cy.xpath("//td[contains(text(),'form_record_list_1.0.decimal1')] ").should('exist');
        cy.xpath("//td[contains(text(),'form_record_list_1.0.integer1')]").should('exist');
        cy.xpath("//td[contains(text(),'form_record_list_1.0.currency1')]").should('exist');
        cy.xpath("//td[contains(text(),'form_record_list_1.0.datetime1')]").should('exist');
        cy.xpath("//td[contains(text(),'form_record_list_1.0.password1')]").should('exist');
        cy.xpath("//td[contains(text(),'form_record_list_1.0.percentage1')]").should('exist');
        cy.xpath("//td[contains(text(),'form_record_list_1.1.date1')]").should('exist');
        cy.xpath("//td[contains(text(),'form_record_list_1.1.text1')]").should('exist');
        cy.xpath("//td[contains(text(),'form_record_list_1.1.row_id')]").should('exist');
        cy.xpath("//td[contains(text(),'form_record_list_1.1.decimal1')]").should('exist');
        cy.xpath("//td[contains(text(),'form_record_list_1.1.integer1')]").should('exist');
        cy.xpath("//td[contains(text(),'form_record_list_1.1.currency1')]").should('exist');
        cy.xpath("//td[contains(text(),'form_record_list_1.1.datetime1')]").should('exist');
        cy.xpath("//td[contains(text(),'form_record_list_1.1.password1')]").should('exist');
        cy.xpath("//td[contains(text(),'form_record_list_1.1.percentage1')]").should('exist');
        cy.xpath("//td[contains(text(),'form_record_list_2.0.date1')]").should('exist');
    }
    actionsAndAssertionsOfTCP42169(requestId){
        //Step 1: Wait the page is load
        cy.get('[data-cy="screen-field-name"]').should('be.visible');

        //Step 2: Complete the form
        cy.get('[data-cy="screen-field-name"]').type('participant test').should('have.value','participant test');
        cy.xpath('//label[text()="SEX"]/parent::div//div[@class="multiselect__tags"]').should('be.visible').click();
        cy.xpath("//label[text()='SEX']/parent::div//input").should('be.visible').type('Woman{enter}');
        cy.xpath('//div[@class="signature pl-0"]').click('center');
        cy.xpath('//span[contains(text(),"Signature saved successfully")]').should('be.visible');
        cy.xpath('//span[contains(text(),"Signature saved successfully")]').should('not.exist');

        //Step 3: Submit the form
        cy.xpath("//button[contains(text(),'New Submit')]").click();
        request.verifyTaskIsCompleted();

        //Step 4: Open task Registration1
        let taskName = 'Registration1';
        cy.visit('/requests/'+requestId);
        request.waitUntilElementIsVisible('selector','[id="requestTabContent"] > [id="pending"] >* a[href^="/tasks"]');
        request.openTaskByTaskName(taskName);

        //Step 5: Complete the Form 2
        cy.get('[data-cy="screen-field-name1"]').should('be.visible');
        cy.get('[data-cy="screen-field-name1"]').type('participant test 1').should('have.value','participant test 1');
        cy.xpath('(//label[text()="SEX"]/parent::div//div[@class="multiselect__tags"])[2]').should('be.visible').click();
        cy.xpath("(//label[text()='SEX']/parent::div//input)[2]").should('be.visible').type('Woman{enter}');

        cy.xpath('(//div[@class="signature pl-0"])[2]').should("be.visible").click('center');
        cy.xpath('//span[contains(text(),"Signature saved successfully")]').should('be.visible');
        cy.xpath('//span[contains(text(),"Signature saved successfully")]').should('not.exist');

        //Step 6: Submit the form
        cy.xpath("//button[contains(text(),'New Submit')]").click();
        request.verifyTaskIsCompleted();

        //Step 7: Open task Registration2
        taskName = 'Registration2';
        cy.visit('/requests/'+requestId);
        cy.reload();
        request.waitUntilElementIsVisible('selector','[id="requestTabContent"] > [id="pending"] >* a[href^="/tasks"]');
        request.openTaskByTaskName(taskName);

        //Step 8: Complete the Form 3
        cy.get('[data-cy="screen-field-name2"]').should('be.visible');
        cy.get('[data-cy="screen-field-name2"]').type('participant test 2').should('have.value','participant test 2');
        cy.xpath('(//label[text()="SEX"]/parent::div//div[@class="multiselect__tags"])[3]').should('be.visible').click();
        cy.xpath("(//label[text()='SEX']/parent::div//input)[3]").should('be.visible').type('Woman{enter}');

        cy.xpath('(//div[@class="signature pl-0"])[3]').should("be.visible").click('center');
        cy.xpath('//span[contains(text(),"Signature saved successfully")]').should('be.visible');
        cy.xpath('//span[contains(text(),"Signature saved successfully")]').should('not.exist');

        //Step 9: Submit the form
        cy.xpath("//button[contains(text(),'New Submit')]").click();
        request.verifyTaskIsCompleted();

        //Step 10 Open task Registration3
        taskName = 'Registration3';
        cy.visit('/requests/'+requestId);
        request.waitUntilElementIsVisible('selector','[id="requestTabContent"] > [id="pending"] >* a[href^="/tasks"]');
        request.openTaskByTaskName(taskName);

        //Step 10 Complete the Form 4
        cy.get('[data-cy="screen-field-name3"]').should('be.visible');
        cy.get('[data-cy="screen-field-name3"]').type('participant test 3').should('have.value','participant test 3');
        cy.xpath('(//label[text()="SEX"]/parent::div//div[@class="multiselect__tags"])[4]').click();
        cy.xpath('(//div[@class="multiselect__tags"])[4]').click();
        cy.xpath('//ul[@id="listbox-3"]//li[@id="option-3-1"]').should('be.visible').click({force: true});
        cy.xpath('(//div[@class="signature pl-0"])[4]').click('center');
        cy.xpath('//span[contains(text(),"Signature saved successfully")]').should('be.visible');
        cy.xpath('//span[contains(text(),"Signature saved successfully")]').should('not.exist');

        //Step 11: Submit the form
        cy.xpath("//button[contains(text(),'New Submit')]").click();
        request.verifyTaskIsCompleted();

        //Step 12: Open task Registration4
        taskName = 'Registration4';
        cy.visit('/requests/'+requestId);
        request.waitUntilElementIsVisible('selector','[id="requestTabContent"] > [id="pending"] >* a[href^="/tasks"]');
        request.openTaskByTaskName(taskName);

        //Step 13: Complete the Form 5
        cy.get('[data-cy="screen-field-name4"]').should('be.visible');
        cy.get('[data-cy="screen-field-name4"]').type('participant test 4').should('have.value','participant test 4');
        cy.xpath('(//label[text()="SEX"]/parent::div//div[@class="multiselect__tags"])[5]').should('be.visible').click();
        cy.xpath('(//div[@class="multiselect__tags"])[5]').should('be.visible').click();
        cy.xpath('//ul[@id="listbox-4"]//li[@id="option-4-1"]').should('be.visible').click({force: true});
        cy.xpath('(//div[@class="signature pl-0"])[5]').should("be.visible").click('center');
        cy.xpath('//span[contains(text(),"Signature saved successfully")]').should('be.visible');
        cy.xpath('//span[contains(text(),"Signature saved successfully")]').should('not.exist');

        //Step 14: Review Total Man and Woman
        cy.get('[data-cy="screen-field-totalwoman"]').should("be.visible").should('have.value','3');
        cy.get('[data-cy="screen-field-totalman"]').should("be.visible").should('have.value','2');

        //Step 15: Submit the form
        cy.xpath("//button[contains(text(),'New Submit')]").should("be.visible").click();

        //Step 16: Review Summary
        cy.visit('/requests/'+ requestId+'/files');
        request.waitUntilElementIsVisible('selector',"#summary > div > div > table > tbody > tr:nth-child(1) > td:nth-child(1)");
        cy.get('#main').scrollTo('right', { duration: 2000 });
        cy.get('.list-group > .card-header').should('contain','Completed');

        //Step 17: Review Forms tab
        cy.xpath("//a[contains(text(),'Forms')]").click();
        cy.xpath('//button[@title="Details"]').first().should("be.visible").click();
        cy.xpath('//div[@class="card-body h-100"]').should("be.visible");
    }
    actionsAndAssertionsOfTCP42289(){
        //Step 1: Complete the screen WE
        cy.xpath('//label[text()="list1"]/parent::div//div[@class="multiselect__tags"]').should('be.visible');
        cy.xpath('//label[text()="list1"]/parent::div//div[@class="multiselect__tags"]').click();
        cy.xpath("//label[text()='list1']/parent::div//input").should('be.visible').type('1{enter}');
        cy.get('[data-cy="screen-field-name1"]').should('be.visible').type('name1').should('have.value','name1');
        cy.xpath("//label[text()='name2']/parent::div//input").should('be.visible');
        cy.xpath("//label[text()='name2']/parent::div//input").type('1').should('have.value','1');
        cy.get('[data-cy="loop-loop_1-add"]').should('be.visible').click();
        cy.get('[data-cy="screen-field-name3"]').first().should('be.visible').type('name3').should('have.value','name3');
        cy.get('[data-cy="loop-loop_1-add"]').should('be.visible').click();
        cy.xpath("(//label[text()='name3']/parent::div//input)[2]").should('be.visible').type('name3.3').should('have.value','name3.3');
        cy.xpath("//button[contains(text(),'Page Navigation')]").should('be.visible').click();
        cy.xpath("//label[text()='check1']").should('be.visible');
        cy.xpath("//label[text()='check1']").click();
        cy.xpath("//label[text()='check2']").should('be.visible');
        cy.xpath("//label[text()='check2']").click();
        cy.get('[data-cy="screen-field-name4"]').should('be.visible').should('have.value','Test name1 and 1');

        //Step 2: Submit the form
        cy.xpath("//button[contains(text(),'New Submit')]").should('be.visible').click();
        request.verifyTaskIsCompletedB();

        //Step 6: Get the number of requests
        cy.get('[name=request-id]').invoke('attr', 'content').should('not.be.empty');
        cy.get("[name='request-id']").invoke('attr', 'content').then((requestId)=>{

            //Step 7: login
            login.navigateToUrl();
            login.login();

            //Step 8: open request
            cy.visit('/requests/'+requestId);
            request.waitUntilElementIsVisible('selector','#pending >* td:nth-child(1) >a[href^="/tasks"]');
            request.clickOnTaskName(1, 1);

            //Step 9: Review data
            cy.get('[data-cy="screen-field-name1"]').should('be.visible').should('have.value','name1');
            cy.xpath("//label[text()='name2']/parent::div//input").should('be.visible').should('have.value','1');
            cy.get('[data-cy="screen-field-name3"]').first().should('be.visible').should('have.value','name3');
            cy.xpath("(//label[text()='name3']/parent::div//input)[2]").should('be.visible').should('have.value','name3.3');
            cy.xpath("//button[contains(text(),'Page Navigation')]").should('be.visible').click();

            //Step 10: complete page
            cy.xpath("//label[text()='check1']").should('be.visible');
            cy.xpath("//label[text()='check2']").should('be.visible');
            cy.get('[data-cy="screen-field-name4"]').should('be.visible').should('have.value','Test name1 and 1');
            cy.xpath("//button[contains(text(),'New Submit')]").should('be.visible').click();

            //Step 11: Review Summary
            cy.get('[id="summary-tab"]').should('be.visible');
            cy.get('[id="completed-tab"]').should('be.visible').click();

            //Step 12: Review Forms tab
            cy.xpath("//a[contains(text(),'Forms')]").click();
            cy.xpath('//button[@title="Details"]').should("be.visible").click();
        });
    }
    //TCP4-2170
    actionsAndAssertionsLineInputTCP42170(label,value){
        var locatorInput ='//label[text()="'+label+'"]/parent::div//input'
        var locatorTextHelp ='//label[text()="'+label+'"]/parent::div//span[@class="required-asterisk"]'
        cy.xpath(locatorTextHelp).should('contain','*');
        cy.xpath(locatorInput).type(value);
        //cy.xpath(locatorTextHelp).should('not.exist');
    }
    actionsAndAssertionsSelectProduct(){
        cy.get('[name="name"]').should('be.visible');
        cy.xpath('//label[text()="Product"]//parent::div//input')
            .click({force: true}).type('Blue Table').should('have.value','Blue Table');
            cy.xpath('//label[text()="Product"]/parent::div//div[@class="multiselect__content-wrapper"]//li[1]')
                .should('have.attr', 'aria-label')
                .and('equal','Blue Table'+". ");
            cy.xpath('//label[text()="Product"]//parent::div//input').type('{enter}');
    }
    //TCP4-2067
    actionsAndAssertionsInputOfTCP42067(label,negativeValue,textHelp,correctValue){
        var locatorInput ='//label[text()="'+label+'"]/parent::div//input'
        var locatorTextHelp ='//label[text()="'+label+'"]/parent::div//div'
        cy.xpath(locatorInput).type(negativeValue);
        cy.get('button[aria-label="New Submit"]').click();
        cy.xpath(locatorTextHelp).should('contain',textHelp);
        cy.xpath(locatorInput).clear().type(correctValue);
        cy.xpath(locatorTextHelp).should('not.exist');
    }
    actionsAndAssertionsRequiredFieldOfTCP42067(label,textHelp,correctValue){
        var locatorInput ='//label[text()="'+label+'"]/parent::div//input'
        var locatorTextHelp ='//label[text()="'+label+'"]/parent::div//div'
        cy.xpath(locatorTextHelp).should('contain',textHelp);
        cy.xpath(locatorInput).type(correctValue);
        cy.xpath(locatorTextHelp).should('not.exist');
    }
    actionsAndAssertionsSelectListOfTCP42067(option,label){
        var locatorWrapper ='//label[text()="'+label+'"]/parent::div//div[@class="multiselect__tags"]'
        var locatorInput ='//label[text()="'+label+'"]//parent::div//input'
        cy.xpath('//div[@class="multiselect__content-wrapper"]').eq(0).then($list => {
            if (!$list.is(':visible')){
                cy.xpath(locatorWrapper).click();
            }
        });
        cy.xpath(locatorInput)
            .type(option).should('have.value',option);
        let locator = '//label[text()="'+label+'"]/parent::div//div[@class="multiselect__content-wrapper"]//li[1]'
        cy.xpath(locator)
            .should('have.attr', 'aria-label')
            .and('equal',option+". ");
        cy.xpath(locatorInput).type('{enter}');
    }
    actionsAndAssertionsAllSelectList(){
        //options rule=required
        cy.xpath('//label[text()="Options"]/parent::div//div[@class="invalid-feedback d-block"]').should('contain','Field is required');
        this.actionsAndAssertionsSelectListOfTCP42067('Yes','Options');
        cy.xpath('//label[text()="Options"]/parent::div//div[@class="invalid-feedback d-block"]').should('not.exist');
        //countries rule=NotIn Argentina
        this.actionsAndAssertionsSelectListOfTCP42067('Argentina','Countries');
        //states rule=requiredIf3(Albania)
        this.actionsAndAssertionsSelectListOfTCP42067('Alaska','States');
        cy.xpath('//label[text()="Countries"]/parent::div//div[@class="invalid-feedback d-block"]').should('contain','Invalid value');
        this.actionsAndAssertionsSelectListOfTCP42067('Albania','Countries');
        cy.xpath('//label[text()="Countries"]/parent::div//div[@class="invalid-feedback d-block"]').should('not.exist');
        //value rule=In 1,2
        cy.xpath('//label[text()="Values"]/parent::div//div[@class="invalid-feedback d-block"]').should('contain','Invalid value');
        this.actionsAndAssertionsSelectListOfTCP42067('Value 1','Values');
        cy.xpath('//label[text()="Values"]/parent::div//div[@class="invalid-feedback d-block"]').should('not.exist');
        //TextArea1 Rule=Required If
        cy.xpath('//label[text()[normalize-space()="Rule=Required If2"]]/parent::div//div').should('contain','Field is required');
        cy.get('textarea[name="form_text_area_1"]').type('abc')
        cy.xpath('//label[text()[normalize-space()="Rule=Required If2"]]/parent::div//div').should('not.exist');
        //TextArea2 Rule=Required2 Required
        cy.xpath('//label[text()[normalize-space()="Rule=Required2"]]/parent::div//div').should('contain','Field is required');
        cy.get('textarea[name="form_text_area_2"]').type('abc')
        cy.xpath('//label[text()[normalize-space()="Rule=Required2"]]/parent::div//div').should('not.exist');
    }
    //TCP4-2178
    inputLineWithfieldIsrequired(label,value){
        var locatorInput ='//label[text()="'+label+'"]/parent::div//input'
        var locatorTextHelp ='//label[text()="'+label+'"]/parent::div//div'
        cy.xpath(locatorInput).type(value);
    }
    inputDateIsrequired(label,date){
        var locatorInput ='//label[text()="'+label+'"]/parent::div//input'
        var locatorTextHelp ='//label[text()="'+label+'"]/parent::div//div'
        cy.xpath(locatorInput).type(date).type('{enter}');
    }
    uploadFile(filePath){
    cy.get('[data-cy="file-upload-button"]').attachFile(filePath);
    cy.get('.uploader-file-status').should('be.visible');
    cy.get('.uploader-file-status').should('contain','success');
    }
    inputTextArea(label,value){
        var locatorInput ='//label[text()="'+label+'"]/parent::div//textarea'
        cy.xpath(locatorInput).type(value);
    }
    selectOption(label,option){
        cy.xpath('//label[text()="'+label+'"]/parent::div//input').click({force:true}).type(option).should('have.value',option);
        cy.xpath('//label[text()="'+label+'"]/parent::div//div[@class="multiselect__content-wrapper"]//li[1]')
            .should('have.attr', 'aria-label')
            .and('equal',option+". ");
        cy.xpath('//label[text()="'+label+'"]/parent::div//input').type('{enter}');
    }
    actionsAndAssertionsOfTCP42178(fullName){
        //Fill first page
        this.inputLineWithfieldIsrequired('Datos de Titular Apellido paterno / Apellido materno o de casada / Nombres',fullName);
        this.inputLineWithfieldIsrequired('Nº','123456');
        this.inputLineWithfieldIsrequired('Ext.','LP');
        this.inputLineWithfieldIsrequired('Tipo:','CI');
        this.inputLineWithfieldIsrequired('Sexo:','femenino');
        this.inputDateIsrequired('Fecha de Nacimiento:','11/02/2000')
        this.inputLineWithfieldIsrequired('Nacionalidad:','123456');
        this.inputLineWithfieldIsrequired('País Residencia:','Bolivia');
        this.inputLineWithfieldIsrequired('País Nacimiento:','Ecuador');
        this.inputLineWithfieldIsrequired('Calle / Av.','Costanera');
        this.inputLineWithfieldIsrequired('Número:','5050');
        this.inputLineWithfieldIsrequired('Departamento','La Paz');
        this.inputLineWithfieldIsrequired('Provincia','Murillo');
        this.inputLineWithfieldIsrequired('Distrito','Macro Distrito 2');
        this.inputLineWithfieldIsrequired('Teléfono Celula:','78787878');
        this.inputLineWithfieldIsrequired('Correo electrónico (*):','maria@gmail.com');
        cy.get('button[aria-label="NExt PAGE"]').click();
        //Fill second page
        this.inputLineWithfieldIsrequired('Nombre de la Empresa:','ProcessMaker');
        this.inputLineWithfieldIsrequired('Calle / Av','ProcessMakerBolivia Calle Enrique Peñaranda');
        this.inputLineWithfieldIsrequired('Numero:','941');
        this.inputLineWithfieldIsrequired('Departamento:','La Paz');
        this.inputLineWithfieldIsrequired('Provincia:','Murillo');
        this.inputLineWithfieldIsrequired('Distrito:','Macro Distrito Sur');
        this.inputLineWithfieldIsrequired('Telefono Celular:','7777777');
        this.inputLineWithfieldIsrequired('Cargo / Puesto que ocupa (*)','Gerente');
        this.inputLineWithfieldIsrequired('Tiempo de Servicio:','15');
        this.inputDateIsrequired('Fecha de ingreso:','01/01/2000');
        this.inputLineWithfieldIsrequired('Ingreso de todas sus actividades en Bs:','10000');
        cy.get('button[aria-label="NEXT PAGE"]').click();
        //Fill third page
        this.inputLineWithfieldIsrequired('Monto de prestamo $','50000');
        this.inputLineWithfieldIsrequired('Monto de prestamo Bs','350000');
        this.inputLineWithfieldIsrequired('Plazo Años','10');
        this.inputTextArea('Proposito del prestamo ','Inversion en activos fijos')
        cy.get('button[aria-label="Previous Page"]').click();
        cy.get('button[aria-label="NEXT PAGE"]').click();
        cy.get('button[aria-label="Enviar Informacion"]').click();
    }

    addScreentToSendEmailInModeler(elementName,elementXpath,screenName){
        cy.xpath(elementXpath.replace('nameElem',elementName)).first().should('be.visible').click();
        var baseUrl = `${Cypress.config().baseUrl}`
        cy.xpath('//label[text()="Body"]/parent::div//input').click({force:true})
        cy.xpath('//label[text()="Body"]/parent::div//input').type(screenName).should('have.value',screenName);
        cy.wait(2000);
        cy.xpath('//label[text()="Body"]/parent::div//input').type('{enter}');
    }
    verifyPresenceOfProcessImportProcessAndConfigureSendEmail(processName, filePath){
        var editBtn = "[title='Edit'] > .fas";
        cy.get(editBtn).should('be.visible');
        cy.get(selectors.searchInputBox).type(processName).should('have.value', processName);
        cy.get(selectors.loadingSpinnerProcess).should('be.visible');
        cy.get(selectors.loadingSpinnerProcess).should('not.be.visible');
        cy.xpath(selectors.processTable, { timeout: 10000 })
            .find('td')
            .then(($loadedTable) => {
                if ($loadedTable.length === 1) {
                    process.importProcess(filePath);
                    navHelper.navigateToProcessPage();
                    process.searchProcessAndSelectOptions(processName, "edit");
                    //Add screen display to SendEmailA(Approve) control in modeler
                    const sendEmailXpath = "//*[text()='nameElem']/ancestor::*[@data-type='processmaker.components.nodes.task.Shape']";
                    this.addScreentToSendEmailInModeler("SendEmailA",sendEmailXpath,"Screen approve Email");
                    cy.get('button[title="Save"]').click();
                    cy.contains('button[class="btn btn-secondary"]','Save').click();
                    //Add screen display to SendEmailR(Rejected) control in modeler
                    this.addScreentToSendEmailInModeler("SendEmailR",sendEmailXpath,"Screen rejected Email");
                    cy.get('button[title="Save"]').click();
                    cy.contains('button[class="btn btn-secondary"]','Save').click();
                    navHelper.navigateToProcessPage();
                    process.searchProcessAndSelectOptions(processName, "config");
                    cy.xpath('//label[text()="Process Manager"]/parent::div//input').click({force:true})
                    cy.xpath('//label[text()="Process Manager"]/parent::div//input').type('Admin');
                    cy.xpath('//label[text()="Process Manager"]/parent::div//div[@class="multiselect__content-wrapper"]//li[1]')
                    .should('have.attr', 'aria-label')
                    .and('equal', 'Admin User. ');
                    cy.xpath('//label[text()="Process Manager"]/parent::div//input').type('{enter}');
                    cy.contains('button[class="btn btn-secondary ml-2"]','Save').click();
                }
            });
    }
    //TPC4-2186
    uploadFile2186(fileName){
        admin.addPublicFileInFileManager();
        admin.selectFileInFileManager(fileName);
        admin.doneUploadPublicFile();
    }
    verifyLabelsForImageAndExtension(nameImage,extension,size){
        cy.xpath('//table/tbody[@role="rowgroup"]/tr/td[2]/span[text()="'+nameImage+'"]').should('have.text',nameImage);
        cy.xpath('//table/tbody[@role="rowgroup"]/tr/td[2]/span[text()="'+nameImage+'"]/ancestor::td/span[2]').should('have.contain',extension);
        cy.xpath('//table/tbody[@role="rowgroup"]/tr/td[2]/span[text()="'+nameImage+'"]/ancestor::td/following-sibling::td[2]').should('have.text',size);
    }
    //create folder
    createFolderInsideFolderTCP42186(folderName){
        cy.xpath('//button[@aria-label="Create Folder"]').should('be.visible').click();
        let numberRandom = utility.generateNumberRandom(100,999);
        cy.wait(2000);
        admin.createFolder(folderName + numberRandom);
    }
    verifyNumberItemsInTable(numberItem){
        cy.xpath("//tbody")
            .find("tr")
            .its("length")
            .should("be.equal", numberItem);
    }
    createUserIfNotExistAndMakeSuperAdmin(username, firstName, lastName, jobTitle, status, email, password) {
        //search user
        var editBtn = "[title='Edit'] > .fas";
        cy.get(editBtn).should('be.visible');
        cy.get('input[id="search-box"]').first().type(username).should('have.value', username);
        cy.get('#users-listing > div.container-fluid > div > div.jumbotron.jumbotron-fluid').first().should('be.visible');
        cy.wait(2000)
        cy.xpath('//div[@id="users-listing"]/div[2]/div/div[2]/table/tbody/tr', { timeout: 10000 })
            .find('td')
            .then((loadedTable) => {
                cy.log(loadedTable)
                if(loadedTable.length === 1){
                    admin.createUser(username, firstName, lastName, jobTitle, status, email, password)
                    //Assign superAdmin persmission to userSA
                    admin.addPermissionToUser();
                }
                else return;
            });
    }
    actionsAndAssertionsOfTCP42123(requestId){

        //Step 1: Complete the first task
        cy.get('[data-cy="screen-field-num"]').should('be.visible')
            .type('123').should('have.value','123');
        //a) Add record in record list
        cy.xpath('//button[@data-cy="add-row"]').first().click();
        cy.xpath('//div[@class="modal-content"]').first().should('be.visible');
        cy.xpath('//input[@data-cy="screen-field-input1"]').first().should('be.visible').type('test 1').should('have.value','test 1');
        cy.xpath("//button[contains(text(),'Ok')]").click();

        //b) Add record in record list
        cy.xpath('//button[@data-cy="add-row"]').first().click();
        cy.xpath('//div[@class="modal-content"]').first().should('be.visible');
        cy.xpath('//input[@data-cy="screen-field-input1"]').first().should('be.visible').type('test 2').should('have.value','test 2');
        cy.xpath("//button[contains(text(),'Ok')]").click();

        //c) Add record in record list
        cy.xpath('//button[@data-cy="add-row"]').first().click();
        cy.xpath('//div[@class="modal-content"]').first().should('be.visible');
        cy.xpath('//input[@data-cy="screen-field-input1"]').first().should('be.visible').type('test 3').should('have.value','test 3');
        cy.xpath("//button[contains(text(),'Ok')]").click();

        //d) Submit the form
        cy.xpath("//button[contains(text(),'New Submit')]").should('be.visible').click();
        request.verifyTaskIsCompletedB();

        //Step 2: Go to URL request
        cy.visit('/requests/'+ requestId);

        //Step 3: Complete the task "Manual task"
        let taskName = 'Manual Task';
        request.openTaskByTaskName(taskName);

        cy.xpath('(//div[@name="screen display m ultiinstance"]//div//p)[2]').first().should('be.visible');
        cy.get('[data-cy="table"]').should('be.visible');
        cy.xpath('//button[contains(text(),"Complete")]').click();
        request.verifyTaskIsCompletedB();

        //Step 4: Go to URL request
        cy.visit('/requests/'+ requestId);

        //Step 5: Complete the task "Form Task 1"
        let taskXpath = '(//div[@id="requestTabContent"]//div[@id="pending"]//a[contains(text(),"Form Task 1")])[1]';
        cy.xpath(taskXpath).should('be.visible').click();
        cy.get('[data-cy="screen-field-form_input_1"]').should('be.visible')
            .type('multi instance tak parallel tarea 1').should('have.value','multi instance tak parallel tarea 1');
        //a) Submit the form
        cy.xpath("//button[contains(text(),'New Submit')]").click();
        request.verifyTaskIsCompletedB();

        //Step 6: Go to URL request
        cy.visit('/requests/'+ requestId);

        //Step 7: Complete the task "Form Task 1(2)"
        taskXpath = '(//div[@id="requestTabContent"]//div[@id="pending"]//a[contains(text(),"Form Task 1")])[1]';
        cy.xpath(taskXpath).should('be.visible').click();
        cy.get('[data-cy="screen-field-form_input_1"]').should('be.visible')
            .type('multi instance tak parallel tarea 1').should('have.value','multi instance tak parallel tarea 1');
        //a) Submit the form
        cy.xpath("//button[contains(text(),'New Submit')]").click();
        request.verifyTaskIsCompletedB();

        //Step 8: Go to URL request
        cy.visit('/requests/'+ requestId);

        //Step 9: Complete the task "Form Task 1(3)"
        taskXpath = '//div[@id="requestTabContent"]//div[@id="pending"]//a[contains(text(),"Form Task 1")]';
        cy.xpath(taskXpath).should('be.visible').click();
        cy.get('[data-cy="screen-field-form_input_1"]').should('be.visible')
            .type('multi instance tak parallel tarea 1').should('have.value','multi instance tak parallel tarea 1');
        //a) Submit the form
        cy.xpath("//button[contains(text(),'New Submit')]").click();
        request.verifyTaskIsCompletedB();

        //Step 10: Go to URL request
        cy.visit('/requests/'+ requestId);

        //Step 11: Complete the task "Form Task 2"
        taskXpath = '(//div[@id="requestTabContent"]//div[@id="pending"]//a[contains(text(),"Form Task 2")])[1]';
        cy.xpath(taskXpath).should('be.visible').click();
        cy.get('[data-cy="screen-field-form_input_1"]').should('be.visible')
            .type('multi instance tak parallel tarea 2').should('have.value','multi instance tak parallel tarea 2');
        //a) Submit the form
        cy.xpath("//button[contains(text(),'New Submit')]").click();
        request.verifyTaskIsCompletedB();

        //Step 12: Go to URL request
        cy.visit('/requests/'+ requestId);

        //Step 13: Complete the task "Form Task 2(2)"
        taskXpath = '(//div[@id="requestTabContent"]//div[@id="pending"]//a[contains(text(),"Form Task 2")])[1]';
        cy.xpath(taskXpath).should('be.visible').click();
        cy.get('[data-cy="screen-field-form_input_1"]').should('be.visible')
            .type('multi instance tak parallel tarea 2').should('have.value','multi instance tak parallel tarea 2');
        //a) Submit the form
        cy.xpath("//button[contains(text(),'New Submit')]").click();
        request.verifyTaskIsCompletedB();

        //Step 14: Go to URL request
        cy.visit('/requests/'+ requestId);

        //Step 15: Complete the task "Form Task 2(3)"
        taskXpath = '//div[@id="requestTabContent"]//div[@id="pending"]//a[contains(text(),"Form Task 2")]';
        cy.xpath(taskXpath).should('be.visible').click();
        cy.get('[data-cy="screen-field-form_input_1"]').should('be.visible')
            .type('multi instance tak parallel tarea 2').should('have.value','multi instance tak parallel tarea 2');
        //a) Submit the form
        cy.xpath("//button[contains(text(),'New Submit')]").click();
        request.verifyTaskIsCompletedB();

        //Step 16: Verify that request is completed
        request.waitUntilTextcontainText('selector','varHeader', "Completed");
        cy.xpath("//a[text()='Completed']").click();
        cy.xpath("//a[contains(text(),'Form Task')]").first().should('be.visible');
        cy.xpath("//a[contains(text(),'Form Task 1')]").first().should('be.visible');
        cy.xpath("(//a[contains(text(),'Form Task 1')])[2]").should('be.visible');
        cy.xpath("(//a[contains(text(),'Form Task 1')])[3]").should('be.visible');
        cy.xpath("//a[contains(text(),'Form Task 2')]").first().should('be.visible');
        cy.xpath("(//a[contains(text(),'Form Task 2')])[2]").should('be.visible');
        cy.xpath("(//a[contains(text(),'Form Task 2')])[3]").should('be.visible');
    }
    actionsAndAssertionsOfTCP42194(){
        //Step 1: Complete the Web Entry
        cy.xpath("//input[@type='text'][@name='name']").should('be.visible');
        cy.xpath("//input[@type='text'][@name='name']").type('test case 2194').should('have.value','test case 2194');
        cy.xpath("//label[contains(text(),'Producto 1')]").click();
        cy.xpath("//input[@type='text'][@name='content']").should('be.visible');
        cy.xpath("//input[@type='number'][@name='cant']").type('12');

        //Step 2: Select Producto 2
        cy.xpath("//label[contains(text(),'Producto 2')]").click();
        cy.xpath("(//input[@type='text'][@name='content'])[2]").should('be.visible');
        cy.xpath("(//input[@type='number'][@name='cant'])[2]").type('13');

        //Step 3: Select Producto 3
        cy.xpath("//label[contains(text(),'Producto 3')]").click();
        cy.xpath("(//input[@type='text'][@name='content'])[3]").should('be.visible');
        cy.xpath("(//input[@type='number'][@name='cant'])[3]").type('14');

        //Step 4: Select Producto 4
        cy.xpath("//label[contains(text(),'Producto 4')]").click();
        cy.xpath("(//input[@type='text'][@name='content'])[4]").should('be.visible');
        cy.xpath("(//input[@type='number'][@name='cant'])[4]").type('15');

        //Step 5: Submit the form
        cy.xpath("//button[contains(text(),'New Submit')]").click();
        request.verifyTaskIsCompletedB();

        //Step 6: Get the number of requests
        cy.get('[name=request-id]').invoke('attr', 'content').should('not.be.empty');
        cy.get("[name='request-id']").invoke('attr', 'content').then((requestId)=>{

            //Step 7: login
            login.navigateToUrl();
            login.login();

            //Step 8: Open the requests
            cy.visit('/requests/'+requestId);
            request.waitUntilElementIsVisible('selector','#pending >* td:nth-child(1) >a[href^="/tasks"]');
            request.clickOnTaskName(1, 1);

            //Step 9: Validate the information of the form A
            cy.xpath('//p[contains(text(),"Producto 1")]').should('be.visible');
            cy.xpath('//p[contains(text(),"Producto 2")]').should('be.visible');
            cy.xpath('//p[contains(text(),"Producto 3")]').should('be.visible');
            cy.xpath('//p[contains(text(),"Producto 4")]').should('be.visible');

            //Step 10: Complete manual task
            cy.xpath("//button[contains(text(),'Complete Task')]").click();
            request.verifyTaskIsCompleted();

            //Step 11: Wait the requests is completed
            cy.visit('/requests/'+requestId);
            request.waitUntilTextcontainText('selector','varHeader','Completed');

            //Step 12: Review File Manager
            cy.xpath("//a[contains(text(),'File Manager')]").click();
            cy.xpath('//button[@title="View"]').should("be.visible").click();
        });
    }
    //TCP4-2159
    lineInput(label,value){
        let locator='//label[text()="'+label+'"]/parent::div//input'
        cy.xpath(locator)
            .should('be.visible')
            .type(value)
            .should('have.value',value)
    }
    actionsAndAssertionsOfTCP42159(text,integer,currency,percentage,decimal,datetime,date,password){
        this.lineInput('text',text);
        this.lineInput('integer',integer);
        cy.xpath('//label[text()="currency"]/parent::div//input').type(currency, {delay: 100}).should('have.value','500.00 BOB');
        cy.xpath('//label[text()="percentage"]/parent::div//input').type(percentage, {delay: 100}).should('have.value','97.00 %');
        this.lineInput('decimal',decimal);
        this.lineInput('datetime',datetime);
        this.lineInput('date',date);
        this.lineInput('password',password);
        cy.get('button[aria-label="New Submit"]').click();
    }
    addCustomColumnTCP42159(){
        cy.get("div [class='border bg-muted px-3 draggable-list draggable-available'] :nth-child(11) > .column-card").drag(".mr-3 > .border");
        cy.get("div [class='border bg-muted px-3 draggable-list draggable-available'] :nth-child(11) > .column-card").drag(".mr-3 > .border");
        cy.get("div [class='border bg-muted px-3 draggable-list draggable-available'] :nth-child(11) > .column-card").drag(".mr-3 > .border");
        cy.get("div [class='border bg-muted px-3 draggable-list draggable-available'] :nth-child(11) > .column-card").drag(".mr-3 > .border");
        cy.get("div [class='border bg-muted px-3 draggable-list draggable-available'] :nth-child(11) > .column-card").drag(".mr-3 > .border");
        cy.get("div [class='border bg-muted px-3 draggable-list draggable-available'] :nth-child(11) > .column-card").drag(".mr-3 > .border");
        cy.get("div [class='border bg-muted px-3 draggable-list draggable-available'] :nth-child(11) > .column-card").drag(".mr-3 > .border");
        cy.get("div [class='border bg-muted px-3 draggable-list draggable-available'] :nth-child(11) > .column-card").drag(".mr-3 > .border");
        cy.xpath('//*[@id="nav-columns"]//button[2]').click({ force: true });
    }
    validationDataInChart2159(text,integer,currency,percentage,decimal,datetime,password,date){
        cy.xpath('//div[@class="saved-search-chart mb-3 col-md-6"]//table//tbody//tr[1]//td[1]').should('contain',text);
        cy.xpath('//div[@class="saved-search-chart mb-3 col-md-6"]//table//tbody//tr[1]//td[2]').should('contain',integer);
        cy.xpath('//div[@class="saved-search-chart mb-3 col-md-6"]//table//tbody//tr[1]//td[3]').should('contain',currency);
        cy.xpath('//div[@class="saved-search-chart mb-3 col-md-6"]//table//tbody//tr[1]//td[4]').should('contain',percentage);
        cy.xpath('//div[@class="saved-search-chart mb-3 col-md-6"]//table//tbody//tr[1]//td[5]').should('have.text',decimal);
        cy.xpath('//div[@class="saved-search-chart mb-3 col-md-6"]//table//tbody//tr[1]//td[7]').should('include.text',password);
    }
    //TCP4 2505
    typeInTextArea(label,value){
        let locator =`//label[text()="${label} "]/parent::div//textarea`
        cy.xpath(locator).type(value,{delay: 300}).should('have.value',value);
    }

    deleteTextAreaFieldAndValidateRule(label,valueIncorrect,textHelp){
        let locator =`//label[text()="${label} "]/parent::div//textarea`
        cy.xpath(locator).clear().type(valueIncorrect);
        let locatorTextHelp =`//label[text()="${label} "]/parent::div//div[@class="invalid-feedback"]`
        cy.xpath(locatorTextHelp).should('contain',textHelp);
    }

    actionsAndAssertionsCorrectValuesTCP42505(){
        cy.get('[data-cy="screen-field-Accepted"]').should('be.visible');
        this.typeInTextArea('Textarea Accepted','yes');
        this.typeInTextArea('Textarea alpha','alpha');
        this.typeInTextArea('Textarea Alpha-Numeric','alpha123');
        this.typeInTextArea('Textarea Date','2022-08-23');
        this.typeInTextArea('Textarea Email','TextareaEmail@gmail.com');
        this.typeInTextArea('Textarea In 7','7');
        this.typeInTextArea('Textarea Max Length 8','12345678');
        this.typeInTextArea('Textarea Min Length 5','abcde');
        this.typeInTextArea('Textarea Not In 7','8');
        this.typeInTextArea('Textarea Required','required');
        this.typeInTextArea('Textarea Required If Accepted','required if');
        this.typeInTextArea('Textarea Required Unless In7 8','Textarea Required Unless');
        this.typeInTextArea('Textarea Same Accepted','yes');
        this.typeInTextArea('Textarea URL','https://www.processmaker.com');
        cy.get('button[aria-label="New Submit"]').click();
        request.verifyTaskIsCompletedB();
    }

    actionsAndAssertionsIncorrectValuesTCP42505(){
        this.deleteTextAreaFieldAndValidateRule('Textarea Accepted',' ','Field must be accepted');
        this.deleteTextAreaFieldAndValidateRule("Textarea alpha",'4','Accepts only alphabet characters');
        this.deleteTextAreaFieldAndValidateRule('Textarea Alpha-Numeric',' ','Accepts only alphanumerics');
        this.deleteTextAreaFieldAndValidateRule('Textarea Date',' ','Must be a valid Date');
        this.deleteTextAreaFieldAndValidateRule('Textarea Email',' ','Must be a valid email address');
        this.deleteTextAreaFieldAndValidateRule('Textarea In 7',' ','Invalid value');
        this.deleteTextAreaFieldAndValidateRule('Textarea Max Length 8','123456789','Must have at most 8');
        this.deleteTextAreaFieldAndValidateRule('Textarea Min Length 5',' ','Must have at least 5');
        this.deleteTextAreaFieldAndValidateRule('Textarea Not In 7','7','Invalid value');
        cy.xpath('//label[text()="Textarea Required "]/parent::div//textarea').clear();
        cy.get('button[aria-label="New Submit"]').click();
        cy.xpath('//label[text()="Textarea Required "]/parent::div//div[@class="invalid-feedback"]').should('contain','Field is required');
        cy.xpath('//label[text()="Textarea Required If Accepted "]/parent::div//textarea').clear();
        cy.xpath('//label[text()="Textarea Same Accepted "]/parent::div//textarea').clear();
        cy.xpath('//label[text()="Textarea Accepted "]/parent::div//textarea').clear().type('yes')
        cy.xpath('//label[text()="Textarea Required If Accepted "]/parent::div//div[@class="invalid-feedback"]').should('contain','Field is required');
        cy.xpath('//label[text()="Textarea Same Accepted "]/parent::div//div[@class="invalid-feedback"]').should('contain','Must be same as Accepted');
        cy.xpath('//label[text()="Textarea Required Unless In7 8 "]/parent::div//textarea').clear();
        cy.xpath('//label[text()="Textarea Required Unless In7 8 "]/parent::div//div[@class="invalid-feedback"]').should('contain','Field is required');
        this.deleteTextAreaFieldAndValidateRule('Textarea URL',' ','Must be a valid URL');
    }
    //TCP4-2523
    selectListTCP42523(label,textHelp,value){
        let locator ='//label[text()="'+label+'"]/parent::div//input'
        let locatorTextHelp ='//label[text()="'+label+'"]/parent::div//div[@class="invalid-feedback"]'
        cy.xpath(locatorTextHelp).should('contain',textHelp);
        cy.xpath(locator).type(value).should('have.value',value);
        cy.xpath(locatorTextHelp).should('not.exist');
    }
    actionsAndAssertionsCorrectValuesTCP42523(){
        this.selectListTCP42523('accepted','Field must be accepted','yes');
        this.selectListTCP42523('After date 2020-10-10','Field is required.\nMust be after 2020-10-10','2020-10-11');
        this.selectListTCP42523('After or Equal to Date 2020-10-10','Field is required.\nMust be equal or after 2020-10-10','2020-10-11');
        this.selectListTCP42523('Alpha','Field is required','Alpha');
        this.selectListTCP42523('Alpha-Numeric','Field is required','Colosa123');
        this.selectListTCP42523('Before date 2020-10-10','Field is required.\nMust be before 2020-10-10','2020-10-09');
        this.selectListTCP42523('Before or Equal Date  2020-10-10','Field is required.\nMust be equal or before 2020-10-10','2020-10-09');
        this.selectListTCP42523('Between Min 3 & Max 7','Field is required','5');
        this.selectListTCP42523('Date','Field is required.\nMust be a valid Date','2022-12-12');
        this.selectListTCP42523('Email','Field is required','test_case@gmail.com');
        this.selectListTCP42523('In 7','Invalid value.\nField is required','7');
        this.selectListTCP42523('Max Length 8','Field is required','testCase');
        this.selectListTCP42523('Min Length 4','Field is required','1234');
        this.selectListTCP42523('Not In 100','Field is required','1000');
        this.selectListTCP42523('URL','Field is required','https://release.testing.processmaker.net/');
        this.selectListTCP42523('Same  URL','Field is required','https://release.testing.processmaker.net/');
    }

    actionsAndAssertionsOfTCP42474(requestId, timezone_format){
        cy.xpath("//label[text()='Variable']").should('be.visible');
        cy.get('[data-cy="screen-field-variable"]').should('be.visible').type('this is a mustache test in label');
        cy.xpath("//p[text()='Rich Text this is a mustache test in label']").should('be.visible');

        cy.xpath("//label[text()='Line Inputthis is a mustache test in label']").should('be.visible');
        cy.xpath("//input[@type='text'][@name='form_input_1']").type('test case 2474').should('have.value','test case 2474');

        cy.xpath("//label[text()='Select List this is a mustache test in label']").should('be.visible');
        cy.xpath('//label[text()="Select List this is a mustache test in label"]/parent::div//div[@class="multiselect__tags"]').should('be.visible').click();
        cy.xpath("//label[text()='Select List this is a mustache test in label']/parent::div//input").type('b{enter}');

        cy.xpath("//label[text()='Checkbox this is a mustache test in label']").should('be.visible').click();

        cy.xpath("//label[text()='Date Pickerthis is a mustache test in label']").should('be.visible');
        cy.xpath("//label[text()='Date Pickerthis is a mustache test in label']//ancestor::div[@data-cy='screen-field-form_date_picker_1']//input").type('11/11/2022' + '{enter}', {force:true}, {delay:2000});

        cy.xpath("//label[text()='Date Picker Time this is a mustache test in label']").should('be.visible');
        admin.changeWriteTimeZone(11,11,2022,20,12,timezone_format,'form_date_picker_2');
        cy.xpath("//label[text()='Textarea this is a mustache test in label ']").should('be.visible');
        cy.xpath("//textarea[@name='form_text_area_1']").should('be.visible').type('test case 2474').should('have.value','test case 2474');

        cy.xpath("//label[text()='File Upload this is a mustache test in label']").should('be.visible');
        const file2474 = "file1.jpg";
        cy.xpath("//text()[contains(.,'select file')]/ancestor::label[1]//input").attachFile(file2474);
        cy.xpath('//i[@class="uploader-file-icon"]').should('be.visible');
        cy.wait(2000);
        cy.xpath("//button[contains(text(),'New Submit')]").should('be.visible').click();

        //Go to review request form task
        request.verifyTaskIsCompleted();
        cy.visit('/requests/'+ requestId);
        let taskXpath = '//div[@id="requestTabContent"]//div[@id="pending"]//a[contains(text(),"Form Task")]';
        cy.xpath(taskXpath).should('be.visible');
        cy.xpath(taskXpath).click();
        cy.xpath("//label[text()='Variable']").should('be.visible');
        cy.get('[data-cy="screen-field-variable"]').should('be.visible').should('have.value','this is a mustache test in label');
        cy.xpath("//p[text()='Rich Text this is a mustache test in label']").should('be.visible');
        cy.xpath("//label[text()='Line Inputthis is a mustache test in label']").should('be.visible');
        cy.xpath("//input[@type='text'][@name='form_input_1']").should('have.value','test case 2474');
        cy.xpath("//label[text()='Select List this is a mustache test in label']").should('be.visible');
        cy.xpath("//label[text()='Checkbox this is a mustache test in label']").should('be.visible');
        cy.xpath("//label[text()='Date Pickerthis is a mustache test in label']").should('be.visible');
        cy.xpath("//label[text()='Date Pickerthis is a mustache test in label']//ancestor::div[@data-cy='screen-field-form_date_picker_1']//input").invoke('val')
            .then(val=>{
                const myVal = val;
                expect(myVal).to.contain('2022');
            })
        cy.xpath("//label[text()='Date Picker Time this is a mustache test in label']").should('be.visible');
        cy.xpath("//label[text()='Date Picker Time this is a mustache test in label']//ancestor::div[@data-cy='screen-field-form_date_picker_2']//input").invoke('val')
            .then(val=>{
                const myVal = val;
                expect(myVal).to.contain('2022');
            })
        cy.xpath("//label[text()='Date Picker Time this is a mustache test in label']//ancestor::div[@data-cy='screen-field-form_date_picker_2']//input").invoke('val')
            .then(val=>{
                const myVal = val;
                expect(myVal).to.contain('20:12');
            })
        cy.xpath("//label[text()='Textarea this is a mustache test in label ']").should('be.visible');
        cy.xpath("//textarea[@name='form_text_area_1']").should('be.visible').should('have.value','test case 2474');
        cy.xpath("//label[text()='File Upload this is a mustache test in label']").should('be.visible');
        cy.get('.text-truncate').should('be.visible');
        //Submit
        cy.xpath("//button[contains(text(),'New Submit')]").should('be.visible').click();

        //Review Completed task
        cy.xpath("//a[contains(text(),'Completed')]").should("be.visible").click();
        cy.contains('Form Task').should('be.visible');
        //Review File Manager
        cy.xpath("//a[contains(text(),'File Manager')]").should("be.visible").click();
        cy.xpath('//button[@title="View"]').should("be.visible").click();
        cy.wait(2000);
        cy.xpath('//img[@class="mw-100"]').should("be.visible");
        //Review Forms tab
        cy.xpath("//a[contains(text(),'Forms')]").click();
        cy.xpath('//button[@title="Details"]').first().should("be.visible").click();
        cy.xpath('//div[@class="card-body h-100"]').should("be.visible");
        cy.get('[title="Details"] > .fas').should("be.visible").click();
    }
    //TCP4-2085
    addDataInUserTCP42085ProfileAndMakeSuperAdminUser(phone,fax,cell,address,city,state,postal){
        //Add fields to validate in screen
        cy.get('input[id="phone"]').clear().type(phone).should('have.value',phone);
        cy.get('input[id="cell"]').clear().type(fax).should('have.value',fax);
        cy.get('input[id="fax"]').clear().type(cell).should('have.value',cell);
        cy.get('input[id="address"]').clear().type(address).should('have.value',address);
        cy.get('input[id="city"]').clear().type(city).should('have.value',city);
        cy.get('input[id="state"]').clear().type(state).should('have.value',state);
        cy.get('input[id="postal"]').clear().type(postal).should('have.value',postal);
        //verify user is Super Admin
        cy.get('#nav-profile-tab').click();
        cy.get('input[id="is_administrator"]').then(($buttonMakeSuperAdmin)=>{
            cy.log($buttonMakeSuperAdmin);
        if($buttonMakeSuperAdmin.is(':checked')){
            cy.log('User is superadmin')
        }else{
            cy.log('User is NOT superadmin')
            admin.addPermissionToUser();
        }
        })
        cy.get('#nav-home-tab').click();
    }
    validationInInput(nameInput,value){
        // cy.get('input[name="'+nameInput+'"]').should('have.prop', 'value').then((ValueInput) => {
        //     expect(ValueInput).to.equal(value);
        // });
        cy.get('input[name="'+nameInput+'"]').should("contain.value",value);
    }
        actionsAndAssertionsTCP42085(
            requestId,
            processName,
            processId,
            userName,
            fullName,
            userId,
            userEmail,
            userPhone,
            userCell,
            userFax,
            userCity,
            userState,
            userTitle,
            userPostal,
            userFirstname,
            status,
            userAddress
            )
        {
        this.validationInInput('requestId',requestId);
        //this.validationInInput('requestName',processName);
        this.validationInInput('requestStatus','ACTIVE');
        this.validationInInput('requestProcessId',processId);
        this.validationInInput('requestProcessId',processId);
        this.validationInInput('userName',userName);
        this.validationInInput('userFullname',fullName);
        this.validationInInput('userE','true');
        this.validationInInput('userId',userId);
        this.validationInInput('userEmail',userEmail);
        this.validationInInput('userPhone',userPhone);
        this.validationInInput('userCell',userCell);
        this.validationInInput('userFax',userFax);
        this.validationInInput('userCity',userCity);
        this.validationInInput('userState',userState);
        this.validationInInput('userTitle',userTitle);
        this.validationInInput('userPostal',userPostal);
        this.validationInInput('userFirstname',userFirstname);
        this.validationInInput('userStatus',status);
        cy.get('textarea[name="userAddress"]').should('have.prop', 'value').then((ValueInput) => {
            expect(ValueInput).to.equal(userAddress);
        });
        this.validationInInput('userLanguage','en');
    }
     //TCP4-2183
     assignUsertoGroup(user,firstNameUser){
        cy.get('a[href="#nav-users"]').click();
        cy.wait(5000)
        cy.xpath('//div[@class="data-table"]//tbody//tr').find('td').eq(1).invoke('text').then(($element)=>{
        cy.log($element);
            if($element === user){
                cy.log('the user exist and is assigned')
            }
            else {
                admin.addUserToGroup(firstNameUser);
            }
       });
    }

    actionsAndAssertionsOfTCP42524(){
        cy.xpath('//label[text()="Accepted"]//parent::div//input').should('be.visible');
        cy.xpath('//label[text()="Accepted"]//parent::div//input').type('yes').should('have.value','yes');
        cy.xpath('//label[text()="Accepted"]//parent::div//div').should('not.exist');
        cy.xpath('//label[text()="After date  2020-10-10"]//parent::div//input').type('2020-10-11').should('have.value','2020-10-11');
        cy.xpath('//label[text()="After date  2020-10-10"]//parent::div//div').should('not.exist');
        cy.xpath('//label[text()="After or Equal Date 2020-10-10"]//parent::div//input').type('2020-10-11').should('have.value','2020-10-11');
        cy.xpath('//label[text()="After or Equal Date 2020-10-10"]//parent::div//div').should('not.exist');
        cy.xpath('//label[text()="Alpha"]//parent::div//input').type('Alpha').should('have.value','Alpha');

        cy.xpath('//label[text()="Alpha Numeric"]//parent::div//input').type('Colosa123').should('have.value','Colosa123');
        cy.xpath('//label[text()="Before date 2020-10-10"]//parent::div//input').type('2020-10-09').should('have.value','2020-10-09');
        cy.xpath('//label[text()="Before date 2020-10-10"]//parent::div//div').should('not.exist');
        cy.xpath('//label[text()="Before or Equal Date 2020-10-10"]//parent::div//input').type('2020-10-09').should('have.value','2020-10-09');
        cy.xpath('//label[text()="Before or Equal Date 2020-10-10"]//parent::div//div').should('not.exist');
        cy.xpath('//label[text()="Between Min 3 & Max 7"]//parent::div//input').type('5').should('have.value','5');

        cy.xpath('//label[text()="Date"]//parent::div//input').type('2022-12-12').should('have.value','2022-12-12');
        cy.xpath('//label[text()="Date"]//parent::div//div').should('not.exist');
        cy.xpath('//label[text()="Email"]//parent::div//input').type('test_case@gmail.com').should('have.value','test_case@gmail.com');
        cy.xpath('//label[text()="In 7"]//parent::div//input').type('7').should('have.value','7');
        cy.xpath('//label[text()="In 7"]//parent::div//div').should('not.exist');
        cy.xpath('//label[text()="Max Length 8"]//parent::div//input').type('testCase').should('have.value','testCase');

        cy.xpath('//label[text()="Min Length 4"]//parent::div//input').type('1234').should('have.value','1234');
        cy.xpath('//label[text()="Not In 100"]//parent::div//input').type('1000').should('have.value','1000');
        cy.xpath('//label[text()="URL"]//parent::div//input').type('https://release.testing.processmaker.net/').should('have.value','https://release.testing.processmaker.net/');
        cy.xpath('//label[text()="Same"]//parent::div//input').type('https://release.testing.processmaker.net/').should('have.value','https://release.testing.processmaker.net/');
        cy.get('button[aria-label="New Submit"]').click({force:true});
        cy.get('[class="container-fluid"]').should('contain','Completed!');
    }
    //TCP4-2076
    lineInputTCP42076(label,value){
        let locator='//label[text()="'+label+'"]/parent::div//input'
        cy.xpath(locator).last()
            .should('be.visible')
            .type(value)
            .should('have.value',value)
    }
    phone(label,inputValue,displayedValue){
        let locator ='//label[text()="'+label+'"]/parent::div//input'
        cy.xpath(locator).last()
            .should('be.visible')
            .type(inputValue)
            .should('have.value',displayedValue); 
    }
    selectList(label,option){
        cy.xpath('//label[text()="'+label+'"]/parent::div//input').last().click({force:true})
            .type(option).should('have.value',option);
        cy.wait(3000);
        cy.xpath('//label[text()="'+label+'"]/parent::div//input').last().type('{enter}');
    }
    fillFormTCP42076(name,lastName,CI,fono,fonoRecovered,nationality){
        this.lineInputTCP42076('Name',name);
        this.lineInputTCP42076('LastName',lastName);
        this.lineInputTCP42076('CI.',CI);
        this.phone('Fono',fono,fonoRecovered);
        this.selectList('Nationality',nationality);
        cy.get('button[name="save"]').last().click();
    }
    actionsAndAssertionsTCP42076(index,name1,name2,name3,name4,name5,lastName){
        //Fill the screen
        cy.get('input[name="careers"]').eq(index).click();
        this.fillFormTCP42076(name1,lastName,'1112223330','1111111111','(111) 111-1111','Bolivia');
        cy.get('button[title="Add Item"]').click();
        this.fillFormTCP42076(name2,lastName,'2223334440','2222222222','(222) 222-2222','EEUU');
        cy.get('button[title="Add Item"]').click();
        this.fillFormTCP42076(name3,lastName,'3334445550','3333333333','(333) 333-3333','Canada');
        cy.get('button[title="Add Item"]').click();
        this.fillFormTCP42076(name4,lastName,'4445556660','4444444444','(444) 444-4444','Peru');
        cy.get('button[title="Add Item"]').click();
        this.fillFormTCP42076(name5,lastName,'5556667770','5555555555','(555) 555-5555','Argentina');
        cy.get('[aria-label="Submit"]').last().click({force:true});
        //verify screen display appear
        cy.xpath('//strong[text()="Thank You!"]').should('be.visible');
    }
    selectStudent(index){
        cy.xpath('//label[text()="Select Students"]//parent::div//input').eq(index).click();
    }
    verifyPreviouslyEnteredData(locator,index,name){
        cy.get(locator).eq(index).should('have.prop', 'value').then((Name) => {
            expect(Name).to.equal(name)
        });
    }
    validationRecoverDatainTask(index,name,lastName){
        this.selectStudent(index);
        this.verifyPreviouslyEnteredData('[name="name"]',index,name)
        this.verifyPreviouslyEnteredData('[name="lastName"]',index,lastName)
    }
    validationRecoverAllDatainTask(name1,name2,name3,name4,name5,lastName){
        this.validationRecoverDatainTask(0,name1,lastName)
        this.validationRecoverDatainTask(1,name2,lastName)
        this.validationRecoverDatainTask(2,name3,lastName)
        this.validationRecoverDatainTask(3,name4,lastName)
        this.validationRecoverDatainTask(4,name5,lastName)
    }
    fillScore(label,index,score){
        cy.get('input[name="'+label+'"]').eq(index).should('be.visible').type(score).should('have.value',score)
    }
    fillScoreForEachStudent(index,score1,score2,score3){
        this.fillScore('trimestrer1',index,score1);
        this.fillScore('trimestrer2',index,score2);
        this.fillScore('trimestrer3',index,score3);
    }
    validationsField(index,name,lastName,score1,score2,score3){
        cy.xpath('//div[@name="estudiantes"]//tbody//tr[1]//td[1]').eq(index).should('contain',name);
        cy.xpath('//div[@name="estudiantes"]//tbody//tr[1]//td[2]').eq(index).should('contain',lastName);
        cy.xpath('//div[@name="estudiantes"]//tbody//tr[1]//td[3]').eq(index).should('contain',score1);
        cy.xpath('//div[@name="estudiantes"]//tbody//tr[1]//td[4]').eq(index).should('contain',score2);
        cy.xpath('//div[@name="estudiantes"]//tbody//tr[1]//td[5]').eq(index).should('contain',score3);
    }
    validationDataInTable(name1,name2,name3,name4,name5,lastName,scoreS1T1,scoreS1T2,scoreS1T3,scoreS2T1,scoreS2T2,scoreS2T3,scoreS3T1,scoreS3T2,scoreS3T3,scoreS4T1,scoreS4T2,scoreS4T3,scoreS5T1,scoreS5T2,scoreS5T3){
        this.validationsField(0,name1,lastName,scoreS1T1,scoreS1T2,scoreS1T3);
        this.validationsField(1,name2,lastName,scoreS2T1,scoreS2T2,scoreS2T3);
        this.validationsField(2,name3,lastName,scoreS3T1,scoreS3T2,scoreS3T3);
        this.validationsField(3,name4,lastName,scoreS4T1,scoreS4T2,scoreS4T3);
        this.validationsField(4,name5,lastName,scoreS5T1,scoreS5T2,scoreS5T3);
    }
    //TCP4-2495
    fillLineInputTCP42495(label,value){
        cy.xpath('//label[text()="'+label+'"]/parent::div//input').type(value).should('have.value',value);
    }
    fillLineInputRequiredTCP42495(label,value,helpText){
        cy.xpath('//label[text()="'+label+'"]/parent::div//div[@class="invalid-feedback"]').should('contain',helpText);
        cy.xpath('//label[text()="'+label+'"]/parent::div//input').type(value).should('have.value',value);
        cy.xpath('//label[text()="'+label+'"]/parent::div//div[@class="invalid-feedback"]').should('not.exist');
    }
    actionsAndAssertionsTCP42495(){
        this.fillLineInputTCP42495('Integer','123456789');
        this.fillLineInputTCP42495('Between Min 5  & Max10','5');
        this.fillLineInputRequiredTCP42495('In 9099','9099','Invalid value');
        this.fillLineInputTCP42495('Not In 1234','5678');
        this.fillLineInputRequiredTCP42495('Integer Required','177','Field is required');
        cy.xpath('//label[text()="Currency BOB"]/parent::div//input').type('7.77').should('have.value','7.77 BOB');
        cy.xpath('//label[text()="Percentage"]/parent::div//input').type('99').should('have.value','99.00 %');
        this.fillLineInputTCP42495('Decimal','1234.5678');
        cy.get('button[aria-label="New Submit"]').click();
    }
    //TCP4-2494
    fillLineInputTCP42494(index,label,value){
        cy.xpath('//label[text()="'+label+'"]/parent::div//input').eq(index).type(value).should('have.value',value);
    }
    fillLineInputRequiredTCP42494(index,label,value,helpText){
        cy.xpath('//label[text()="'+label+'"]/parent::div//div[@class="invalid-feedback"]').should('contain',helpText);
        cy.xpath('//label[text()="'+label+'"]/parent::div//input').eq(index).type(value).should('have.value',value);
        cy.xpath('//label[text()="'+label+'"]/parent::div//div[@class="invalid-feedback"]').should('not.exist');
    }
    actionsAndAssertionsTCP42494(index,AcceptedValue,AlphaValue,AlphaNumericValue,DateTextValue,EmailValue,
        MaxLengthValue,MinLengthValue,textRequiredValue,RequiredIfValue,RequiredUnlessValue,SameValue,UrlValue){
        this.fillLineInputRequiredTCP42494(index,'Accepted',AcceptedValue,'Field must be accepted');
        this.fillLineInputTCP42494(index,'Alpha',AlphaValue);
        this.fillLineInputTCP42494(index,'Alpha-Numeric',AlphaNumericValue);
        this.fillLineInputRequiredTCP42494(index,'Date Text',DateTextValue,'Must be a valid Date');
        this.fillLineInputTCP42494(index,'Email',EmailValue);
        this.fillLineInputTCP42494(index,'Max Length =10',MaxLengthValue);
        this.fillLineInputTCP42494(index,'Min Length = 5',MinLengthValue);
        this.fillLineInputRequiredTCP42494(index,'textRequired',textRequiredValue,'Field is required');
        this.fillLineInputTCP42494(index,'Required If = Accepted yes',RequiredIfValue);
        this.fillLineInputTCP42494(index,'Required Unless = textRequired =test case',RequiredUnlessValue,'Field is required');
        this.fillLineInputTCP42494(index,'Same = Required Unless',SameValue);
        this.fillLineInputTCP42494(index,'URL',UrlValue);
    }
    waitUntillManualTask(selector, text,maxAttempts=10, attempts=0){
        cy.xpath(selector).should('be.visible').invoke('text')
        .then($val => {
            cy.log($val)
            if (!$val.includes(text)) { 
                cy.reload();
                cy.wait(1000)
                cy.log($val)
                this.waitUntillManualTask(selector,text,maxAttempts, attempts+1);
            }
        })
    }
    actionsAndAssertionsOfTCP42193(requestId, timezone_format) {
        //Step 1: Wait the page is load
        cy.xpath("//label[text()='New Date Picker']/parent::div//input").should("be.visible");

        admin.changeWriteTimeZone(11,11,2022,21,14,timezone_format,'form_date_picker_1');

        cy.get('[data-cy="screen-field-Var1"]').click().type('1').should('have.value','1');
        cy.get('[data-cy="screen-field-form_input_1"]').first().type('test case');
        cy.xpath('(//label[text()="New Checkbox"])[1]').click();
        cy.get('[data-cy="screen-field-form_input_1"]').eq(1).type('test case 2');
        cy.xpath('(//label[text()="New Checkbox"])[2]').click();
        //add loop
        cy.get('[data-cy="loop-loop_1-add"]').should("be.visible").click();
        cy.get('[data-cy="screen-field-form_input_1"]').eq(2).should("be.visible")
            .type('add test case');
        cy.xpath('(//label[text()="New Checkbox"])[3]').click();
        //submit
        cy.xpath("//button[contains(text(),'New Submit')]").click();

        //request.verifyTaskIsCompletedWithoutMessage();

        //Step 2: Wait 1 minute to timer
        cy.wait(8000);

        //Step 3: Complete task form 2
        cy.visit('/requests/'+requestId);
        request.waitUntilElementIsVisible('selector', '[id="pending"]>* a[href^="/tasks"]');
        request.clickOnTaskName(1, 1);

        //Step 4: Review manual task
        cy.xpath("//button[contains(text(),'Complete Task')]").should("be.visible");
        cy.xpath('//div[@data-cy="screen-renderer-container"]//*[contains(text(),"1")]').should("be.visible");
        cy.xpath('//div[@data-cy="screen-renderer-container"]//*[contains(text(),"test case 2")]').should("be.visible");
        cy.xpath('//div[@data-cy="screen-renderer-container"]//*[contains(text(),"add test case")]').should("be.visible");
        cy.xpath("//button[contains(text(),'Complete Task')]").click();

        //Step 5: Review Summary and forms
        cy.xpath("//a[contains(text(),'Summary')]").should("be.visible");
        cy.xpath("//td[text()='Var1']").should("be.visible");
        cy.xpath("//td[text()='loop_1.0.form_input_1']").should("be.visible");
        cy.xpath("//td[text()='loop_1.0.form_checkbox_1']").should("be.visible");
        cy.xpath("//td[text()='loop_1.1.form_input_1']").should("be.visible");
        cy.xpath("//td[text()='loop_1.1.form_checkbox_1']").should("be.visible");
        cy.xpath("//td[text()='loop_1.2.form_input_1']").should("be.visible");
        cy.xpath("//td[text()='loop_1.2.form_checkbox_1']").should("be.visible");
        cy.xpath("//td[text()='form_date_picker_1']").should("be.visible");
    }
    //TCP4-2514
    selectListTCP42514(optionValue,label){
        let locatorInput ='//label[contains(text(),"'+label+'")]//parent::div//input'
        let locatorSelect ='//label[contains(text(),"'+label+'")]//parent::div//div[@class="multiselect__content-wrapper"]//li[1]'
        cy.xpath(locatorInput).click({force: true}).type(optionValue).should('have.value',optionValue);
        cy.xpath(locatorSelect).should('have.attr', 'aria-label').and('equal', optionValue+". ");
        cy.xpath(locatorInput).type('{enter}');
    }
    actionsAndAssertionsTCP42514(student,price){
        this.selectListTCP42514(student,'students');
        this.selectListTCP42514(price,'product');
    }
    //TCP4-2492
    actionsAndAssertionsTCP42492(){
        cy.get('input[name="Text"]').should('be.visible');
        cy.get('input[name="Text"]').type('qa').should('have.value','qa');
        cy.get('input[name="TextRequired"]').type('qa2').should('have.value','qa2');
        cy.get('input[name="TextURL"]').type('https://ecosia.org').should('have.value','https://ecosia.org');
        cy.get('input[name="TextEmail"]').type('mail@gmail.com').should('have.value','mail@gmail.com');
        cy.get('button[aria-label="New Submit"]').click();
        request.verifyTaskIsCompletedB();
    }

    verifyLabelsCompleted(requestId){
        //verify first screen in the FORM tab
        cy.xpath('//div[@name="asdasd"]//div/p').eq(0).should("have.text", "Rich Text this is a mustache test in label");
        cy.xpath('//input[@name="form_input_1"]//preceding-sibling::label').eq(0).should("have.text", "Line Inputthis is a mustache test in label");
        cy.xpath('//div[starts-with(@id,"form_select_list_1")]/preceding-sibling::label').eq(0).should("have.text", "Select List this is a mustache test in label");
        cy.xpath('//input[@name="form_checkbox_1"]/following-sibling::label').eq(0).should("have.text", "Checkbox this is a mustache test in label");
        cy.xpath('//label[starts-with(@for,"form_date_picker_1")]').eq(0).should("have.text", "Date Pickerthis is a mustache test in label");
        cy.xpath('//label[starts-with(@for,"form_date_picker_2")]').eq(0).should("have.text", "Date Picker Time this is a mustache test in label");
        cy.xpath('//textarea[@name="form_text_area_1"]//preceding-sibling::label').eq(0).should("have.text", "Textarea this is a mustache test in label ");

        //verify second screen in the FORM tab
        cy.xpath('//div[@name="asdasd"]//div/p').eq(1).should("have.text", "Rich Text this is a mustache test in label");
        cy.xpath('//input[@name="form_input_1"]//preceding-sibling::label').eq(1).should("have.text", "Line Inputthis is a mustache test in label");
        cy.xpath('//div[starts-with(@id,"form_select_list_1")]/preceding-sibling::label').eq(1).should("have.text", "Select List this is a mustache test in label");
        cy.xpath('//input[@name="form_checkbox_1"]/following-sibling::label').eq(1).should("have.text", "Checkbox this is a mustache test in label");
        cy.xpath('//label[starts-with(@for,"form_date_picker_1")]').eq(1).should("have.text", "Date Pickerthis is a mustache test in label");
        cy.xpath('//label[starts-with(@for,"form_date_picker_2")]').eq(1).should("have.text", "Date Picker Time this is a mustache test in label");
        cy.xpath('//textarea[@name="form_text_area_1"]//preceding-sibling::label').eq(1).should("have.text", "Textarea this is a mustache test in label ");
    }
    openScreenMain(){
        process.openScreenofElementFromModeler("Form Task", "Form")
        //screen screen A test
        cy.get(':nth-child(1) > [data-cy="screen-element-container"]').should('be.visible').click({force:true});
        cy.get('#Variable > div > div.screen-link.mt-2 > a').should('have.attr','href')
                .then((href) => {
                    cy.visit(href)
                });
                cy.get('[data-cy="screen-element-container"]').should('be.visible');
                cy.get('.m-2').click({force:true});
                cy.get('#Variable > div > div.screen-link.mt-2 > a').should('have.attr','href')
                .then((href) => {
                    cy.visit(href)
                });
                //screen B test
                cy.get('[data-cy="screen-element-container"]').should('be.visible').click({force:true});
                cy.get('[data-cy="screen-element-container"] > .card-header').should('be.visible');
    }
    actionsAndAssertionsTC53931(processName){
        //Step 1: Review nested screen
        navHelper.navigateToProcessPage();
        process.searchProcessAndSelectOptions(processName,"edit");
        this.openScreenMain(processName);
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);

        //Step 2: Export Process
        navHelper.navigateToProcessPage();
        var exportType = "basic";
        process.searchProcessAndSelectOptions(processName,"export", exportType);
        navHelper.navigateToAdminPage();

        //Step 3: Verify that the process was exported
        var nameProcess = "tc-53931_verify_that_a_screen_containing_nested_screen_and_loop_is_imported";
        var path = "cypress/downloads/" + nameProcess + ".json";
        cy.log(path);
        cy.readFile(path).should("exist");
        cy.readFile(path).its("name").should("eq", processName);
        cy.readFile(path).its("type").should("eq", "process_package");
        cy.readFile(path).its("root").should("eq", "99bf4cff-205f-4926-8e65-b02ad2d76699");
    }
    actionsAndAssertionsTCP42977(nameProcess, version){
        navHelper.navigateToProcessPage();
        process.searchProcessAndSelectOptions(nameProcess,"Template");
        let timeStamp = new Date().getTime();
        var templateName = "TCP4-2977 Template"+timeStamp;
        var Description = "Verify that a template is created after importing a BPMN";
        //Step 1: Create template form a process
        template.createTemplatefromProcess(templateName,Description, version);
        //Step 2: Review template created
        navHelper.navigateToProcessPage();
        cy.get("#nav-templates-tab").click();
        template.searchTemplateAndSelectOptions(templateName,"config");
    }
    actionsAndAssertionsTC43030(processName,requestId){
        //Step 1: Complete task and review execution script
        cy.get('[data-cy="screen-field-form_input_1"]').should('be.visible').type("this is a test to view export/import script task");
        cy.xpath("//button[contains(text(),'New Submit')]").should("be.visible").click();
        cy.visit('/requests/'+requestId);
        cy.reload();
        cy.get("#summary-tab").should("be.visible").click();
        request.waitUntilElementIsVisible('selector','#summary > div > div > table > tbody > tr > td:nth-child(1)');
        cy.xpath('//div[contains(text(),"Admin User has completed the task Form Task")]').scrollIntoView().should('be.visible');

        //Step 2: Export Process
        navHelper.navigateToProcessPage();
        var exportType = "basic";
        var passwordOption = "no";
        process.searchProcessAndSelectOptions(processName,"export", exportType, passwordOption);
        navHelper.navigateToAdminPage();

        //Step 3: Verify that the process was exported
        navHelper.navigateToAdminPage();
        var nameProcess = "tcp4-3030_verify_that_a_process_can_be_imported_with_script_task";
        var path = "cypress/downloads/" + nameProcess + ".json";
        cy.log(path);
        cy.readFile(path).should("exist");
        cy.readFile(path).its("name").should("eq", processName);
        cy.readFile(path).its("type").should("eq", "process_package");
        cy.readFile(path).its("root").should("eq", "99cdbc41-d00b-4b1c-bfd3-b5314fea7692");
        cy.readFile(path).its("export").its("99cdbc41-d00b-4b1c-bfd3-b5314fea7692").its("exporter").should("eq", "ProcessMaker\\ImportExport\\Exporters\\ProcessExporter");
    }
    actionsAndAssertionsTC43031(processName){
        //Step 1: Change the name of process
        navHelper.navigateToProcessPage();
        process.searchProcessAndSelectOptions(processName,"config");
        cy.get('[class="nav-item nav-link active"]').should('be.visible');
        let timeStamp = new Date().getTime();
        var newName= "TCP4-3031 NewName"+timeStamp;
        var description = "TCP4-3031 NewDescription"+timeStamp;
        cy.xpath('//input[@name="name"]').clear().type(newName);
        cy.xpath('//textarea[@name="description"]').clear().type(description);
        cy.xpath('(//button[contains(text(),"Save")])[1]').first().
        should("be.visible").click();

        //Step 2: Export Process
        navHelper.navigateToProcessPage();
        var exportType = "basic";
        var processName = newName;
        process.searchProcessAndSelectOptions(processName,"export", exportType);
        navHelper.navigateToAdminPage();

        //Step 3: Verify that the process was exported with new name
        var nameProcess = "tcp4-3031_newname"+timeStamp;
        var path = "cypress/downloads/" + nameProcess + ".json";
        cy.log(path);
        cy.readFile(path).should("exist");
        cy.readFile(path).its("name").should("eq", processName);
        cy.readFile(path).its("type").should("eq", "process_package");
    }
    actionsAndAssertionsTC42986(processName,IdProcess){
        //Step 1: Review task-screen
        navHelper.navigateToProcessPage();
        process.searchProcessAndSelectOptions(processName,"edit");
        process.openScreenofElementFromModeler("Form Task", "Form");

        //Step 2: Open and Review configuration Email Notification
        cy.visit("/modeler/"+IdProcess+"/alternative/A");
        cy.get('[data-cy="inspector-button"]').click();
        cy.xpath("(//*[contains(text(),'Form')]/ancestor::*[@data-type='processmaker.components.nodes.task.Shape'])[1]").should('be.visible').click();
        cy.xpath("//span[text()='Email Notifications']").should("be.visible").click();
        cy.get('[aria-label="edit"] > .fas').should("be.visible").click();
        cy.xpath('//i[@class="fas fa-grip-vertical mr-1"]/ancestor::div[@class="col-9 pr-0 col"]//span').scrollIntoView().should("be.visible");
        cy.xpath('(//button[@class="btn p-0 btn-link btn-sm"])[1]').click();
        cy.xpath("//label[contains(text(),'Email Address ')]/parent::div//input").should('have.value', 'automation.pm4@gmail.com');
        process.openScreenEmailNotificationofElementFromModeler("Form Task", "Form");
        cy.xpath('//div[@class="form-group card-body m-0 pb-4 pt-4"]//p').should(($p) => {
            expect($p.first()).to.contain('This is a test to review email notification');
        })
        //Step 3: Export Process
        navHelper.navigateToProcessPage();
        process.exportProcessById(processName,"basic","no",[],IdProcess);
        navHelper.navigateToAdminPage();

        //Step 4: Verify that the process was exported
        var nameProcess = "tcp4-2986_verify_that_the_screen_email_is_exported_and_imported_in_one_process";
        var path = "cypress/downloads/" + nameProcess + ".json";
        cy.log(path);
        cy.readFile(path).should("exist");
        cy.readFile(path).its("name").should("eq", processName);
        cy.readFile(path).its("type").should("eq", "process_package");
    }
    actionsAndAssertionsOfTCP43115(collectionName){
        const newRecordBtn = "button[id='addUserCollection']";
        const submitButton = "button[class='btn btn-primary']";

        cy.get(newRecordBtn).should('be.visible').click();
        cy.get('[data-cy="screen-field-nameDoctor"]').should('be.visible').type('test3115').should('have.value', 'test3115');
        cy.get('[data-cy="screen-field-lastNameDoctor"]').should('be.visible').type('last3115').should('have.value', 'last3115');
        cy.get('[data-cy="screen-field-ciDoctor"]').should('be.visible').type('88880000').should('have.value', '88880000');
        cy.xpath('//label[text()="speciality:"]/parent::div//div[@class="multiselect__tags"]').click();
        cy.xpath('//label[text()="speciality:"]/parent::div//input').type("Pediatria").type('{enter}');
        //Save the changes
        cy.get(submitButton).click();
        navHelper.navigateToCollectionPage();
        admin.searchForCollection(collectionName);
        cy.xpath('//button[@class="btn btn-link"]').first().should('be.visible').click();
        cy.xpath('//button[@class="btn m-0 btn-secondary"]').first().should('be.visible').click();
        cy.wait(1000);
        cy.get("div > span").first().should('be.visible');
    }
    actionsAndAssertionsTC42983(processName, IdProcess){
        //Step1: Review nested screen
        navHelper.navigateToProcessPage();
        process.searchProcessAndSelectOptions(processName,"edit");
        process.openAlternativeModeler();
        process.openScreenofElementFromModeler("Form Task", "FormTaskNest")
        cy.xpath('(//div[@data-cy="screen-renderer-container"])[1]').should('be.visible');
        cy.xpath('(//div[@data-cy="screen-renderer-container"])[2]').should('be.visible');
        cy.xpath('(//div[@data-cy="screen-renderer-container"])[3]').should('be.visible');
        cy.xpath('(//div[@data-cy="screen-renderer-container"])[4]').should('be.visible');
        cy.xpath('(//button[@class="btn btn-primary"])[6]').scrollIntoView();
        cy.xpath('(//div[@data-cy="screen-renderer-container"])[5]').should('be.visible');
        cy.xpath('(//div[@data-cy="screen-renderer-container"])[6]').should('be.visible');
        cy.xpath('(//div[@data-cy="screen-renderer-container"])[7]').should('be.visible');

        //Step 2: Export Process
        navHelper.navigateToProcessPage();
        var option = "export";
        var exportType = "basic";
        var passwordOption = "yes";
        var password = "12345678";
        cy.reload();
        process.searchProcessAndSelectOptions(processName, option, exportType, passwordOption, password);
        cy.wait(2000);
        navHelper.navigateToAdminPage();

        //Step 3: Verify that the process was exported
        var nameProcess = "tcp4-2983_process_large_5";
        var path = "cypress/downloads/" + nameProcess + ".json";
        cy.log(path);
        cy.readFile(path).should("exist");
        cy.readFile(path).its("name").should("eq", processName);
        cy.readFile(path).its("type").should("eq", "process_package");
    }

    verifyConfigurationTCP43114(processName){
        process.searchProcessAndSelectOptions(processName,"edit");
        cy.get('[data-cy="inspector-button"]').should('be.visible').click();
        cy.get('g > text >tspan').contains('Signal').should('be.visible').click();
        cy.get(':nth-child(2) > .multiselect > .multiselect__tags').type('{selectall}{backspace}');
        cy.get(':nth-child(2) > .multiselect > .multiselect__tags').type('TCP4-3114 Books Collection create' + '{enter}', {delay:150});
        cy.xpath('//div/span[contains(text(),"TCP4-3114 Books Collection create")]').should('be.visible');        
        cy.xpath(selectors.saveBtn).click();
        cy.get('[class="btn btn-secondary"]').click();
    }
    
    actionsAndAssertionsTC42128(requestId,processName){
        //Step 1: complete task fill in form
        cy.xpath("//label[text()='Title']").should("be.visible");
        cy.get('[data-cy="screen-field-title"]').should("be.visible").type('this is a TCP42128 TEST');
        cy.get('[data-cy="screen-field-author"]').should("be.visible").type('TCP42128');
        cy.xpath('//input[@name="releaseDate"]').should("be.visible").type('11/02/2023');
        cy.get('[data-cy="screen-field-price"]').should("be.visible").type('100');
        //Submit
        cy.xpath("//button[contains(text(),'Submit')]").should("be.visible").click();
        request.verifyTaskIsCompletedB();

        //Step 2: Complete task Approve Form
        request.openRequestById(requestId);
        request.waitUntilElementIsVisible('selector', '#pending >* td:nth-child(1) >a[href^="/tasks"]');
        request.clickOnTaskName(1, 1);
        
        cy.xpath("//label[text()='Title']").should("be.visible");
        cy.get('[data-cy="screen-field-title"]').should('have.value','this is a TCP42128 TEST');
        cy.get('[data-cy="screen-field-author"]').should("have.value",'TCP42128');
        cy.xpath('//input[@name="releaseDate"]');
        cy.get('[data-cy="screen-field-price"]').should("have.value",'100');
        //Click approval
        cy.get('[data-cy="screen-field-approval"]').should("be.visible").click();
        //Submit
        cy.xpath("//button[contains(text(),'Submit')]").should("be.visible").click();
        request.verifyTaskIsCompletedB();
        request.verifyRequestisCompleted(requestId);

        //Step 3: Verify Summary tab
        cy.xpath('//a[@id="summary-tab"]').should("be.visible");
        cy.xpath("//td[text()='price']").should("be.visible");
        cy.xpath("//td[text()='title']").should("be.visible");
        cy.xpath("//td[text()='author']").should("be.visible");
        cy.xpath("//td[text()='approval']").should("be.visible");
        cy.xpath("//td[text()='releaseDate']").should("be.visible");
        
        //Step 4: Go to requets with task PDF Generator
        cy.get('[id="file-manager-tab"]').click();
        cy.get('[title="View"]').should("be.visible");
    }
    actionsAndAssertionsOfTCP43113(collectionName){
        const newRecordBtn = "button[id='addUserCollection']";
        const submitButton = "button[class='btn btn-primary']";

        cy.get(newRecordBtn).should('be.visible').click();
        cy.get('[data-cy="screen-field-nameDoctor"]').should('be.visible').type('test3113').should('have.value', 'test3113');
        cy.get('[data-cy="screen-field-lastNameDoctor"]').should('be.visible').type('last3113').should('have.value', 'last3113');
        cy.get('[data-cy="screen-field-ciDoctor"]').should('be.visible').type('88880000').should('have.value', '88880000');
        cy.xpath('//label[text()="speciality:"]/parent::div//div[@class="multiselect__tags"]').click();
        cy.xpath('//label[text()="speciality:"]/parent::div//input').type("Pediatria").type('{enter}');
        //Save the changes
        cy.get(submitButton).click();
        //Assertions
        cy.get('[data-cy="screen-renderer"]').should('be.visible');
        cy.xpath('//strong').should('be.visible');
        navHelper.navigateToCollectionPage();
        admin.searchForCollection(collectionName);
        cy.xpath('//button[@class="btn btn-link"]').first().should('be.visible').click();
        cy.xpath('//button[@class="btn m-0 btn-secondary"]').first().should('be.visible').click();
        cy.wait(1000);
        cy.get("div > span").first().should('be.visible');
    }
    //TCP4-2497
    actionsAndAssertionsTCP42497(name,description){
        process.clickOnAddProcess();
        cy.xpath('//div[@id="template-options"]//h5[text()="Build Your Own"]').should("be.visible").click();
        process.enterProcessName(name);
        process.enterProcessDescription(description);

        //Verify category "Uncategorized" is visible
        cy.xpath("//div[@name='category']//span[text()='Uncategorized']").should('be.visible');
        
        //Verify "removeElement"  is visible and clickable
        cy.get('[aria-label="Remove Element"]').then($removeButton=>{
            if($removeButton.is(':visible')){
                cy.xpath('//div[@aria-label="Category"]//div[@class="multiselect__tags-wrap"]//i').should('be.visible').click();
                cy.get('i[aria-label="Remove Element"]').click();
                cy.xpath('//div[@aria-label="Category"]//span[@class="multiselect__tag"]//span').should('contain','Uncategorized');
                cy.xpath('//button[contains(text(),"Save")]').click();
            }
        });
    }
    //TCP4-2500
    actionsAndAssertionsTCP42500(){
        cy.xpath('//div[@id="fileManager"]//table//tbody//tr[1]').should('contain','DocuemntLoop').and('contain','KB');
        cy.xpath('//div[@id="fileManager"]//table//tbody//tr[2]').should('contain','DocuemntLoop').and('contain','KB');
        cy.xpath('//div[@id="fileManager"]//table//tbody//tr[3]').should('contain','DocuemntLoop').and('contain','KB');
    }
    //TCP4-2486
    actionsAndAssertionsOfTCP42486(requestId,padHeightSignInRecordList){
        //Step 1: Wait the page is load
        cy.xpath('//button[contains(text(),"Submit")]').should('be.visible');

        //Step 2: First sign
        cy.get('[aria-label="New Signature"]').eq(0).click();

        //Step 3: First sign in Record List
        cy.get('[data-cy="add-row"]').click();
        cy.xpath('//div[@data-cy="modal-add"]//div[@label="New Signature"]').should('be.visible');
        cy.xpath('//div[@data-cy="modal-add"]//div[@label="New Signature"]').click();
        cy.xpath('//span[contains(text(),"Signature saved successfully")]').should('be.visible');
        cy.xpath('//span[contains(text(),"Signature saved successfully")]').should('not.exist');
        cy.xpath('//button[contains(text(),"Ok")]').click();

        //Step 4: Second sign in Record List
        cy.get('[data-cy="add-row"]').click();
        cy.xpath('//div[@data-cy="modal-add"]//div[@label="New Signature"]').should('be.visible');
        cy.xpath('//div[@data-cy="modal-add"]//div[@label="New Signature"]').click();
        cy.xpath('//span[contains(text(),"Signature saved successfully")]').should('be.visible');
        cy.xpath('//span[contains(text(),"Signature saved successfully")]').should('not.exist');
        cy.xpath('//button[contains(text(),"Ok")]').click();

        //Step 5: Submit the form
        cy.get('button[aria-label="New Submit"]').click();
        request.verifyTaskIsCompletedB();

        //Step 6: Validations in second task
        cy.visit('/requests/'+requestId);
        request.waitUntilElementIsVisible('selector','#pending >* td:nth-child(1) >a[href^="/tasks"]');
        request.clickOnTaskName(1, 1);

        //Step 7: Wait the page is load
        request.waitUntilElementIsVisible('selector','[data-cy="add-row"]');
        cy.xpath('//div[@data-cy="modal-add"]//div[@label="New Signature"]').invoke("attr", "pad-height").should("eq",padHeightSignInRecordList);
        cy.get('button[aria-label="New Submit"]').click();
        request.verifyTaskIsCompletedB();

        //Step 8: verify that request was completed
        cy.visit('/requests/'+requestId+'/files');
        request.waitUntilElementIsVisible('selector',"#summary > div > div > table > tbody > tr:nth-child(1) > td:nth-child(1)");
        cy.get('#main').scrollTo('right', { duration: 2000 });
        cy.get(".list-group > .card-header").should('contain','Completed');
    }
    actionsAndAssertionsOfTCP42160(requestId,processName){
        //Step 1: Complete task A
        cy.xpath('//input[@data-cy="file-upload-button"]').should('exist');
        cy.xpath('//input[@data-cy="file-upload-button"]').attachFile("images/origenes.jpg");
        cy.xpath('(//img)[4]').should('be.visible');
        cy.xpath('//div[@class="multiselect__select"]').should('be.visible').click();
        cy.xpath('//li[@aria-label="best. "]/span/span[text()="best"]').should('be.visible').click();
        cy.xpath('//input[@aria-label="New Date Picker"]').should('be.visible').type('10/12/2023');
        cy.get('[data-test="date-picker"]').type('{enter}');
        cy.get(':nth-child(6) > .form-group').click();
        cy.xpath('//button[@aria-label="New Submit"]').should('be.visible').click();
        request.verifyTaskIsCompletedB();

        //Step 2: Complete task AA
        navHelper.navigateToRequestsPage();
        request.openRequestByName(processName);
        var taskName = "AA";
        request.openTaskByTaskName(taskName);
        cy.xpath('(//img)[4]').should('be.visible');
        cy.xpath('//span[@class="multiselect__single"]').should('have.text', 'best');
        cy.xpath('//input[@aria-label="New Date Picker"]').should('be.visible');
        cy.xpath('//button[@aria-label="New Submit"]').should('be.visible').click();
        request.verifyTaskIsCompletedB();

        //Step 3: Complete task D Manual
        navHelper.navigateToRequestsPage();
        request.openRequestById(requestId);
        var taskName = "D";
        request.openTaskByTaskName(taskName);
        cy.xpath('(//p)[1]').should('be.visible');
        cy.xpath('//button[contains(text(),"Complete Task")]').click();
        request.verifyTaskIsCompletedB();
        
        //Validations
        cy.visit('/requests/' + requestId);
        cy.xpath('//td[contains(text(),"date")] ').should('be.visible');
        cy.xpath('//td[contains(text(),"fileUpload")] ').should('be.visible');
        cy.xpath('//td[contains(text(),"selectList")] ').should('be.visible');
    }
    actionsAndAssertionsTC43150(requestId,processName){
        cy.xpath('//label[@class="btn btn-secondary text-white"]').should("be.visible");
        //File
        const file11 = 'cloud1.jpeg';
        cy.xpath('//input[@data-cy="file-upload-button"]').first().attachFile(file11);
        cy.xpath('(//img)[4]').should("be.visible");

        //Sign
        cy.get('[data-cy="screen-field-signature"] > .signature-container > .signature > canvas').should("be.visible").click('center');
        cy.get('[data-cy="screen-field-signature"] > .signature-container > .signature > canvas').should("be.visible").click('left');
        cy.get('[data-cy="screen-field-signature"] > .signature-container > .signature > canvas').should("be.visible").click('right');
        //Submit
        cy.xpath("//button[contains(text(),'New Submit')]").should("be.visible").click();

        //Complete task D
        navHelper.navigateToRequestsPage();
        cy.reload();
        request.openRequestByName(processName);
        var taskName = "D";
        request.openTaskByTaskName(taskName);
        cy.xpath('(//img)[4]').should("be.visible");
        cy.get('[data-cy="screen-field-signature"] > .signature-container > .signature > canvas').should("be.visible");
        cy.xpath("//button[contains(text(),'New Submit')]").should("be.visible").click();

        //Verify complete requests with task D
        cy.xpath('//a[@id="summary-tab"]').should("be.visible");
        cy.xpath("//td[text()='signature']").should("be.visible");
        cy.xpath("//td[text()='fileUpload']").should("be.visible");
        //cy.xpath('//div[contains(text(),"User has completed the task D")]').scrollIntoView().should('be.visible');

        //Complete first request, task C
        navHelper.navigateToRequestsPage();
        request.openRequestById(requestId);
        var taskName = "C";
        request.openTaskByTaskName(taskName);
        cy.xpath('(//img)[4]').should("be.visible");
        cy.get('[data-cy="screen-field-signature"] > .signature-container > .signature > canvas').should("be.visible");
        cy.get(":nth-child(2) > .form-group > .btn").should("be.visible").click();

        //Verify complete requests with task C
        cy.xpath('//a[@id="summary-tab"]').should("be.visible");
        cy.xpath("//td[text()='signature']").should("be.visible");
        cy.xpath("//td[text()='fileUpload']").should("be.visible");
        //cy.xpath('//div[contains(text(),"User has completed the task C")]').should('be.visible');
        //cy.xpath('//div[contains(text(),"User has completed the task A")]').should('be.visible');

    }

    verifyDefaultWelcomeScreen(){
        cy.get('#main').should('contain','Welcome Back')
    }
}
