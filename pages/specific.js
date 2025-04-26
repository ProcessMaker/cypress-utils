import { Requests } from "./requests";
import { Header } from "#pages/header";
import { NavigationHelper } from "#helpers/navigationHelper";
import { Login } from "#pages/login";
import { Admin } from "#pages/admin";
import { Screens } from "#pages/screens";
import {SaveSearchs} from "#pages/saveSearch";
import requests from "#selectors/requests";
import notificationSelectors from "#selectors/notification"
import {Notification} from "#pages/notification";

let navHelper = new NavigationHelper();
const request = new Requests();
const header = new Header();
const login = new Login();
const adminP = new Admin();
const screensP = new Screens();
const saveSearch = new SaveSearchs();
const notification = new Notification();

export class Specific {

    actionsAndAssertionsCreateRequestTCP42231(processName,integer,percentage){
        const inputIntegerSelector= '[data-cy="screen-field-lineInputInteger"]';
        const inputPercentageSelector= '[data-cy="screen-field-lineInputPercentage"]';
        const submitSelector = '.form-group > .btn';

        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        request.clickOnTaskName(1, 1);

        // Create Request
        cy.get(inputIntegerSelector).should('be.visible');
        cy.get(inputIntegerSelector).type(integer);
        cy.get(inputPercentageSelector).type(percentage);
        cy.get(submitSelector).click();

        //Verify that request is completed
        request.waitUntilTextcontainText('selector','varHeader', "Completed");
    }
    actionsAndAssertionsCreateAllRequestTCP42231(name){
        // Create Request 1
        this.actionsAndAssertionsCreateRequestTCP42231(name,5,70);

        // Create Request 2
        this.actionsAndAssertionsCreateRequestTCP42231(name,8,20);

        // Create Request 3
        this.actionsAndAssertionsCreateRequestTCP42231(name,9,60);

        // Create Request 4
        this.actionsAndAssertionsCreateRequestTCP42231(name,11,110);

        // Create Request 5
        this.actionsAndAssertionsCreateRequestTCP42231(name,1,50);
    }
    actionsAndAssertionsOfTCP42231(name,timeStamp,nameSaveSearch){

        navHelper.navigateToCompletedRequests();
        cy.xpath('(//a[@title="Open Request"])[1]').should('be.visible');
        cy.xpath('//div[@aria-label="Process"]//div[@class="multiselect__tags"]').click();
        cy.xpath('//div[@aria-label="Process"]//div[@class="multiselect__tags"]//input').type(name).should('have.value', name);
        cy.xpath('//div[@aria-label="Process"]//div[@class="multiselect__content-wrapper"]//li[1]')
            .should('have.attr', 'aria-label') // yields the "href" attribute
            .and('equal', name + ". ");
        cy.xpath('//div[@aria-label="Process"]//div[@class="multiselect__tags"]//input').type('{enter}');
        cy.get('[title="Search"]').click();
        cy.get('[class="jumbotron jumbotron-fluid"]').should('be.visible');
        cy.xpath('(//a[@title="Open Request"])[1]').should('be.visible');

        const group = 'Administrators';

        //Create Save Search
        saveSearch.createSaveSearch(nameSaveSearch,"trophy","",group);
        cy.wait(3000);

        //Open the Save Search
        navHelper.navigateToSavedSearchs();
        saveSearch.viewSaveSearch(nameSaveSearch);

        //open Configuration
        saveSearch.openTheSaveSearchConfiguration();
        const label1 = "Input Integer";
        const feild1 = "data.lineInputInteger";
        const format1 = "Integer";
        //add Columns
        saveSearch.addColumnsToSaveSearch(label1,feild1,format1);
        const label2 = "Input Percentage";
        const feild2 = "data.lineInputPercentage";
        const format2 = "Percentage";
        saveSearch.addColumnsToSaveSearch(label2,feild2,format2);
        //create Chart1
        const chartname1 = "2231-11-first-"+timeStamp;
        const chart_type1 = "Vertical";
        saveSearch.clickOnSaveSearchName();
        saveSearch.createChartsToSaveSearch(chartname1,chart_type1);
        //add source
        const series_name1 = "Input Integer";
        const metric_name1 = "Input Integer";
        const metric_type1 = "Average";
        saveSearch.createSourceForCharts(series_name1,metric_name1,metric_type1);
        //create chart 2

        const chartname2 = "2231-second-"+timeStamp;
        const chart_type2 = "Line";
        saveSearch.createChartsToSaveSearch(chartname2,chart_type2);
        //add source
        const series_name2 = "Input Percentage";
        const metric_name2 = "Input Percentage";
        saveSearch.createSourceForCharts(series_name2,metric_name2,metric_type1);

        //Verify chart completed
        let tdChart1Xpath = '//div[text()="'+chartname1+'"]/ancestor::div[@class="saved-search-chart mb-3 col-md-6"]//canvas//tbody/tr/td[1]';
        let tdChart2Xpath = '//div[text()="'+chartname2+'"]/ancestor::div[@class="saved-search-chart mb-3 col-md-6"]//canvas//tbody/tr/td[1]';
        //Verify values in the Integer Chart
        //Verify chart have value = 1
        cy.xpath(tdChart1Xpath).contains(1);
        //Verify chart have value = 11
        cy.xpath(tdChart1Xpath).contains(11);
        //Verify chart have value = 5
        cy.xpath(tdChart1Xpath).contains(5);
        //Verify chart have value = 8
        cy.xpath(tdChart1Xpath).contains(8);
        //Verify chart have value = 9
        cy.xpath(tdChart1Xpath).contains(9);

        //Verify values in the Percentage Chart
        //Verify chart have value = 70
        cy.xpath(tdChart2Xpath).contains(70);
        //Verify chart have value = 20
        cy.xpath(tdChart2Xpath).contains(20);
        //Verify chart have value = 60
        cy.xpath(tdChart2Xpath).contains(60);
        //Verify chart have value = 110
        cy.xpath(tdChart2Xpath).contains(110);
        //Verify chart have value = 50
        cy.xpath(tdChart2Xpath).contains(50);

    }

    actionsAndAssertionsOfTCP42227(requestId) {
        cy.get('input[name="input"]').should('be.visible');
        cy.get('input[name="input"]').type("Test");
        cy.get('button[aria-label="Submit"]').click();
        cy.xpath("(//button[contains(@class, 'select-list-options')])[1]").click();
        cy.xpath("(//button[contains(@class, 'select-list-options')])[2]").click();
        cy.xpath("(//button[contains(@class, 'select-list-options')])[3]").click();
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space()='I am done selecting']]").click();

        cy.xpath("(//button[contains(@class, 'select-list-options')])[1]").click();
        request.verifyTaskIsCompletedB();
        cy.wait(5000);
        request.verifyRequestisCompleted(requestId);
        cy.get('#file-manager-tab').click();
        cy.get('#fileManager tbody[role="rowgroup"] tr[data-pk]').should('have.length', 3);
    }

    actionsAndAssertionsOfTCP42248(requestId) {
        //Complete form A
        cy.get('[class="multiselect__select"]').should('be.visible').click();
        cy.get('[class="multiselect__content-wrapper"]').should('be.visible');
        //add option to select list
        cy.xpath('//div[@class="multiselect__content-wrapper"]//li[1]').click();
        //click on submit button
        cy.xpath('//button[@class="btn btn-primary"]').click();

        //verify task is completed
        request.verifyTaskIsCompletedB();

        //open request by ID
        request.openRequestById(requestId);

        request.clickOnTaskName(1, 1);
        //Verify that value was recovered
        //cy.xpath('//div[@class="multiselect__tags"]//span[contains(text(),"Latin America & Caribbean")]').should('be.visible');
        //click on submit button
        cy.xpath('//button[@class="btn btn-primary"]').click();
        //verify task is completed
        request.verifyTaskIsCompletedB();

        //Go to Inprogress
        //open request by ID
        request.openRequestById(requestId);
        request.clickOnTaskName(1, 1);
        //click on submit button
        cy.get('[class="multiselect__tags"]').should('be.visible').click();
        cy.xpath('//div[@class="multiselect__tags"]//input').type('title1').should('have.value', 'title1');
        cy.xpath('//div[@class="multiselect__tags"]//input').type('{enter}');
        //click on submit button
        cy.xpath('//button[@class="btn btn-primary"]').should('be.visible').click();
        request.verifyTaskIsCompletedB();

        //verify the process is completed
        request.verifyRequestisCompleted(requestId);
        cy.xpath("//div[contains(text(),'has completed the task ConnectorA')]").click();
        cy.xpath("//div[contains(text(),'has completed the task ConnectorA')]").should('be.visible');
        cy.xpath("//div[contains(text(),'has completed the task A')]").should('be.visible');
        cy.xpath("//div[contains(text(),'has completed the task B')]").should('be.visible');
        cy.xpath("//div[contains(text(),'has completed the task ConnectorB')]").should('be.visible');
        cy.xpath("//div[contains(text(),'has completed the task C')]").should('be.visible');
    }

    actionsAndAssertionsOfTCP42311(requestId, processName) {
        //Step 1: Complete the form
        cy.get('[name="form_input_1"]').should('be.visible');
        cy.get('[data-cy="screen-field-form_input_1"]')
            .type('<html><head><title>Este es solo un ejemplo</title></head> <body>Aqui se encuentra el contenido de la web</body>'
                ,{delay:100});
        cy.xpath('(//input[@type="file"])[1]').attachFile("sample.pdf");
        cy.get('.uploader-file-name').contains("sample.pdf");
        cy.xpath('(//input[@type="file"])[2]').attachFile('drone.jpg');
        cy.xpath('(//*[@class="uploader-file-name"])[2]').contains("drone.jpg");
        cy.get('[data-cy="screen-field-form_input_2"]')
            .type('<html><head><title>Este es solo un ejemplo</title></head> <body>Aqui se encuentra el contenido de la web</body>'
                ,{delay:100});
        cy.wait(2000);
        cy.xpath('//button[text()[normalize-space()="New Submit"]]').click();
        request.verifyTaskIsCompletedB();

        //Step 2: Open the by request is
        request.openRequestById(requestId);
        request.waitUntilElementIsVisible('selector', '#pending >* td:nth-child(1) >a[href^="/tasks"]');
        request.clickOnTaskName(1, 1);

        //Step 3: Complete Manual task
        cy.xpath("(//p[text()='Este es solo un ejemplo Aqui se encuentra el contenido de la web'])[1]").should('be.visible');
        cy.get('[data-cy="screen-field-file_upload_1"]').should('exist');
        cy.xpath("(//p[text()='Este es solo un ejemplo Aqui se encuentra el contenido de la web'])[2]").should('exist');
        cy.xpath("//div[@data-cy='screen-field-file_upload_2']//img[1]").should('exist');
        cy.xpath('//button[text()[normalize-space()="Complete Task"]]').click();
        request.verifyTaskIsCompletedB();

        request.verifyRequestisCompleted(requestId);
        cy.get('[id="file-manager-tab"]').should('be.visible').click();
        cy.xpath('(//*[@title="View"])[3]').click();
    }

     actionsAndAssertionsOfTCP42078(requestId) {
        //Step 1: Complete the form task
        cy.get('[data-cy="screen-field-form_select_list_1"]').should('be.visible');
        cy.xpath('(//*[@class="multiselect__select"])[1]').click();
        cy.xpath('(//*[@role="option"]//span[text()="paola1"])[1]').click();
        cy.get('[data-cy="add-row"]').click();
        cy.xpath('//button[contains(text(),"Ok")]').should('be.visible');
        cy.xpath('(//div[@class="modal-content"]//span[text()="paola1"])[1]').then($header => {
             if (!$header.is(':visible')){
                 cy.xpath('(//label[text()="requestData"]/following-sibling::div//div[@class="multiselect__tags"])[2]').click();
             }
         });
        cy.xpath('(//*[@role="option"]//span[text()="paola1"])[2]').should('be.visible');
        cy.xpath('(//*[@role="option"]//span[text()="paola2"])[2]').should('be.visible');
        cy.xpath('(//*[@role="option"]//span[text()="paola3"])[2]').should('be.visible');
        cy.xpath('(//*[@role="option"]//span[text()="paola2"])[2]').click();
        cy.xpath('//button[text()="Ok"]').click();
        cy.xpath('//button[text()[normalize-space()="New Submit"]]').click();
        request.verifyTaskIsCompletedB();
        cy.visit('/requests/'+requestId);
        request.waitUntilTextcontainText('selector','varHeader', "Completed");
    }

    actionsAndAssertionsOfTCP42112(requestId, form_screen1) {
        //verify presence of Claim Now button
        cy.xpath("//button[text()[normalize-space()='Claim Task']]").should('be.visible');
        //click on Claim Now button
        cy.xpath("//button[text()[normalize-space()='Claim Task']]").click().should('not.exist');
        //Verify presence of assigned screen
        cy.get("[name='form_screen1']".replace('form_screen1', form_screen1)).should('be.visible');
        //write text in input
        cy.get("[name='form_screen1'] input".replace('form_screen1', form_screen1)).should('be.visible').click({ force: true }).type("test").should('have.value', "test");
        //click on submit button
        request.clickOnSubmitButton();
        //verify process is completed
        request.verifyRequestisCompleted(requestId);
    }


     actionsAndAssertionsOfTCP42212(requestId) {
        //Complete conversational screen
        cy.xpath("//button[text()[normalize-space()='Japan']]").should('be.visible').click();
        //Select group
        cy.get("[aria-label='Submit']").click();
        //Write text in input field
        cy.get("[name='input']").type("nice").should('have.value', "nice");
        //click on submit button
        cy.get('[class="fas fa-paper-plane"]').click();

        //verify task is completed
        request.verifyTaskIsCompletedB();
        request.verifyRequestisCompleted(requestId);

        //Verify data of request completed
        cy.xpath("//div[contains(text(),'has completed the task Groups')]").click();
        //Verify form task is completed
        cy.xpath("//div[contains(text(),'has completed the task Groups')]").should('exist');
        //verify form task is completed
        cy.xpath("//div[contains(text(),'has completed the task Form Task')]").should('exist');
        //verify task A is completed
        cy.xpath("//div[contains(text(),'has completed the task A')]").should('exist');
        //verify script task  B is completed
        cy.xpath("//div[contains(text(),'has completed the task B')]").should('exist');
        //verify script task C is completed
        cy.xpath("//div[contains(text(),'has completed the task C')]").should('exist');
    }

    actionsAndAssertionsOfTCP42113(requestId,user,pass) {
        //Step 1: Log out & Log in with user
        login.navigateToUrl();
        login.login(user,pass);

        //Step 2: Verify tha request was started by user created
        request.openRequestById(requestId);
        request.clickOnTaskName(1, 1);

        //Step 3: Complete the form
        cy.get('[data-cy="screen-field-text"]').should("be.visible");
        cy.get('[data-cy="screen-field-text"]').type("test").should('have.value', "test");

        //Step 4: Click on submit button
        cy.xpath('//button[contains(text(),"Submit")]').click();
        request.waitUntilTextcontainText('selector','varHeader', "Completed");
    }

    actionsAndAssertionsOfTCP42222(requestId){
        //write a text in  line input
        const selectListXpath = "//label[text()='New Select List']/parent::div//div[@class='multiselect__tags']";
        const inputLineXpath = "//label[text()='New Select List']/parent::div//input";
        const okBtnXPath = "//button[text()='Ok']";
        cy.get("[name='aa']").type("test").should('have.value', "test");
        //click on check box
        cy.get("[name='checkbox']").check({force:true});
        //click on add element
        cy.xpath("//button[@data-cy='add-row']").click();
        //select a book
        cy.get('input[data-cy="screen-field-selectlist"]').first().check({force:true});
        //click on ok
        cy.xpath(okBtnXPath).click();
        //verify the book is added
        cy.xpath("//td[@role='cell']").should('be.visible');

        //click on add element
        cy.xpath("//button[@data-cy='add-row']").click();
        //select a book
        cy.get('input[data-cy="screen-field-selectlist"]').eq(1).check({force:true});
        //click on ok
        cy.xpath(okBtnXPath).click();
        //verify the book is added
        cy.xpath("//td[text()[normalize-space()='book2']]").should('be.visible');

        //upload a file
        cy.get('[type="file"]').attachFile("sample.pdf");
        cy.xpath('//span[contains(text(),"success")]').should('exist');
        //click on submit
        cy.xpath('//div[@default-submit="true"]//button[1]').click();
        //verify task is completed
        request.verifyTaskIsCompletedB();
        cy.wait(5000);
        cy.wait(5000);
        cy.wait(5000);

        navHelper.navigateToRequestsPage();
        cy.visit('/requests/' + requestId);
        //verify the process is completed
        request.waitUntilTextcontainText('selector','varHeader', "Completed",25);

        //click on file manger
        cy.xpath('//a[@href="#fileManager"]').click();
        //verify the pdf file1
        cy.xpath('//div[@id="fileManager"]//tr//*[contains(text(),"(1)")]').should('exist');
        //verify the pdf file2
        cy.xpath('//div[@id="fileManager"]//tr//*[contains(text(),"(c)")]').should('exist');
        //verify the pdf file3
        cy.xpath('//div[@id="fileManager"]//tr//*[contains(text(),"(d)")]').should('exist');
        //verify the pdf file4
        cy.xpath('//div[@id="fileManager"]//tr//*[contains(text(),"(e)")]').should('exist');
        //verify the pdf file5
        cy.xpath('//div[@id="fileManager"]//tr//*[contains(text(),"(f)")]').should('exist');
        //verify the pdf file6
        cy.xpath('//div[@id="fileManager"]//tr//*[contains(text(),"(test)")]').should('exist');

        //verify the admin user task is completed
        cy.xpath("//*[text()[normalize-space()='Admin User has completed the task Form Task']]").should('exist');
        //verify the admin user as completed task A
        cy.xpath("//*[text()[normalize-space()='Admin User has completed the task A']]").should('exist');
        //verify the admin user as completed task B
        cy.xpath("//*[text()[normalize-space()='Admin User has completed the task B']]").should('exist');
        //verify the admin user as completed task C
        cy.xpath("//*[text()[normalize-space()='Admin User has completed the task C']]").should('exist');
        //verify the admin user as completed task D
        cy.xpath("//*[text()[normalize-space()='Admin User has completed the task D']]").should('exist');
        //verify the admin user as completed task E
        cy.xpath("//*[text()[normalize-space()='Admin User has completed the task E']]").should('exist');
        //verify the admin user as completed task F
        cy.xpath("//*[text()[normalize-space()='Admin User has completed the task F']]").should('exist');
    }

    async actionsAndAssertionsOfTCP42241(requestId, collection1, name, collection2) {
        //request part->click on submit button
        cy.xpath('//button[@class="btn btn-primary"]').click();
        //verify task is completed
        cy.xpath("//div[text()='Task Completed Successfully']").should('be.visible');
        //go to collection page
        navHelper.navigateToCollectionPage();
        //search for collection
        admin.searchForCollection(collection1);
        //click on edit record
        cy.get("[id='addUserCollection']").click();
        //write text in input
        cy.get("[type='text']").type("test");
        //click on submit button
        cy.xpath("//button[@class='btn btn-primary']").click();
        //go to inprogress
        navHelper.navigateToInprogressRequests();
        //open request by id
        request.openRequestById(requestId);
        //open task
        request.clickOnTaskName(1, 1);
        //click on complete task
        cy.xpath("//button[@class='btn btn-primary']").click();
        //verify task is completed
        cy.xpath("//div[text()='Task Completed Successfully']").should('be.visible');
        //verify the process is completed
        request.processIsCompleted(requestId);
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task A']]").should('be.visible');
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task Form Task']]").should('be.visible');
        cy.wait(6000);


        //request part for second scenario
        navHelper.navigateToProcessPage();
        header.clickOnAddRequest();
        header.searchWithProcessName(name);
        //var requestId = await header.clickOnStart(name);
        request.clickOnTaskName(1, 1);
        //click on submit button
        cy.xpath('//button[@class="btn btn-primary"]').click();
        //verify task is completed
        cy.xpath("//div[text()='Task Completed Successfully']").should('be.visible');
        //go to collection page
        navHelper.navigateToCollectionPage();
        //search for collection
        admin.searchForCollection(collection2);
        //click on edit record
        cy.get("[id='addUserCollection']").click();
        //write text in input
        cy.get("[type='text']").type("testB");
        //click on submit button
        cy.xpath("//button[@class='btn btn-primary']").click();
        //go to inprogress
        navHelper.navigateToInprogressRequests();
        //open request by id
        request.openRequestById(requestId);
        //open task
        request.clickOnTaskName(1, 1);
        //click on complete task
        cy.xpath("//button[@class='btn btn-primary']").click();
        //verify task is completed
        cy.xpath("//div[text()='Task Completed Successfully']").should('be.visible');
        //verify the process is completed
        request.processIsCompleted(requestId);
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task B']]").should('be.visible');
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task Form Task']]").should('be.visible');
    }

    actionsAndAssertionsOfTCP42243(requestId) {
        //request part
        //click on add item
        cy.xpath('(//*[@data-cy="loop-loop-add"])[1]').should('be.visible');
        cy.xpath('(//*[@data-cy="loop-loop-add"])[1]').click();
        cy.wait(5000);
        //verify watcher is working
        cy.xpath("//p[text()='ASSAM is ASSAM KERELA is KERELA ORRISA is ORRISA']").should('be.visible');
        //click on submit button
        cy.xpath('//button[@class="btn btn-primary"]').click();
        request.verifyTaskIsCompletedB();

        //Open the request
        request.openRequestById(requestId);

        //open task
        request.waitUntilElementIsVisible('selector', '#pending >* td:nth-child(1) >a[href^="/tasks"]');
        request.clickOnTaskName(1, 1);

        //click on complete task
        cy.xpath("//button[@class='btn btn-primary']").click();
        request.verifyTaskIsCompletedB();

        //verify the process is completed
        request.verifyRequestisCompleted(requestId);
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task A']]").should('exist');
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task B']]").should('exist');
    }

    actionsAndAssertionsOfTCP42202(requestId) {
        //click on complete task
        cy.xpath("//button[text()[normalize-space()='Complete Task']]").click();
        //verify Task is completed Sucessfully
        request.verifyTaskIsCompleted();
        //go to inprogress
        navHelper.navigateToInprogressRequests();
        //open request by id
        request.openRequestById(requestId);
        cy.wait(1000);
        cy.reload();
        //verify the A task is not present
        cy.xpath("(//*[text()[normalize-space()='Admin User has completed the task A']])[1]").should('be.visible');
        //verify the A task is not present
        cy.xpath("(//*[text()[normalize-space()='Admin User has completed the task B']])[2]").should('be.visible');
        //verify the AA task is not present
        cy.xpath("(//*[text()[normalize-space()='Admin User has completed the task AA']])[1]").should('be.visible');
        //verify the BB task is not present
        cy.xpath("//*[text()[normalize-space()='Admin User has completed the task BB']]").should('be.visible');
        //verify the AA task is not present
        cy.xpath("(//*[text()[normalize-space()='Admin User has completed the task AA']])[2]").should('be.visible');
    }

    async actionsAndAssertionsOfTCP42281(requestId, form_screen) {
        //request part for first scenario
        cy.get('[name="form_screen"]'.replace('form_screen', form_screen)).should('be.visible');
        cy.get('[name="aa"]').click()
        cy.get('[name="bb"]').click()
        //click on submit button
        request.clickOnSubmitButton();
        //verify task is complted
        request.verifyTaskIsCompleted();
        //Go to Inprogress
        navHelper.navigateToInprogressRequests();
        //open request by id
        request.openRequestById(requestId);
        //open a task
        request.clickOnTaskName(1, 1);
        cy.get('[name="form_screen"]'.replace('form_screen', form_screen)).should('be.visible');
        //click on submit button
        request.clickOnSubmitButton();
        //verify task is  completed
        request.verifyTaskIsCompleted();
        //Go to Inprogress
        navHelper.navigateToInprogressRequests();
        //open request by id
        request.openRequestById(requestId);
        //open a task
        request.openTask('CC');
        cy.get('[name="form_screen"]'.replace('form_screen', form_screen)).should('be.visible');
        //click on submit button
        request.clickOnSubmitButton();
        //verify task is  completed
        request.verifyTaskIsCompleted();
        //verify the process is completed
        request.processIsCompleted(requestId);
        //Verify the Script A is completed
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task Script A']]").should('be.visible');
        //verify the AA is completed
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task AA']]").should('be.visible');
        //Verify the Script B is completed
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task Script B']]").should('be.visible');
        //verify the BB is completed
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task BB']]").should('be.visible');
        //Verify AAA is true
        cy.xpath("//div[text()[normalize-space()='AAA: aa == true']]").should('be.visible');
        //verify the CC is completed
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task CC']]").should('be.visible');


        //request part for second scenario
        cy.get('[name="form_screen"]'.replace('form_screen', form_screen)).should('be.visible');
        cy.get('[name="bb"]').click()
        //click on submit button
        request.clickOnSubmitButton();
        //verify task is complted
        request.verifyTaskIsCompleted();
        //Go to Inprogress
        navHelper.navigateToInprogressRequests();
        //open request by id
        request.openRequestById(requestId);
        //open a task
        request.clickOnTaskName(1, 1);
        cy.get('[name="form_screen"]'.replace('form_screen', form_screen)).should('be.visible');
        //click on submit button
        request.clickOnSubmitButton();
        //verify task is  completed
        request.verifyTaskIsCompleted();
        //Go to Inprogress
        navHelper.navigateToInprogressRequests();
        //open request by id
        request.openRequestById(requestId);
        //open a task
        request.openTask('DD');
        cy.get('[name="form_screen"]'.replace('form_screen', form_screen)).should('be.visible');
        //click on submit button
        request.clickOnSubmitButton();
        //verify task is  completed
        request.verifyTaskIsCompleted();
        //verify the process is completed
        request.processIsCompleted(requestId);
        //Verify the Script A is completed
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task Script A']]").should('be.visible');
        //verify the AA is completed
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task AA']]").should('be.visible');
        //Verify the Script B is completed
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task Script B']]").should('be.visible');
        //verify the BB is completed
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task BB']]").should('be.visible');
        //Verify AAA is true
        cy.xpath("//div[text()[normalize-space()='AAA: aa == true']]").should('be.visible');
        //verify the DD is completed
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task DD']]").should('be.visible');

        //request part for Third scenario
        cy.get('[name="form_screen"]'.replace('form_screen', form_screen)).should('be.visible');
        cy.get('[name="aa"]').click()
        cy.get('[name="bb"]').click()
        //click on submit button
        request.clickOnSubmitButton();
        //verify task is complted
        request.verifyTaskIsCompleted();
        //Go to Inprogress
        navHelper.navigateToInprogressRequests();
        //open request by id
        request.openRequestById(requestId);
        //open a task
        request.clickOnTaskName(1, 1);
        cy.get('[name="form_screen"]'.replace('form_screen', form_screen)).should('be.visible');
        //click on submit button
        request.clickOnSubmitButton();
        //verify task is  completed
        request.verifyTaskIsCompleted();
        //Go to Inprogress
        navHelper.navigateToInprogressRequests();
        //open request by id
        request.openRequestById(requestId);
        //open a task
        request.openTask('EE');
        cy.get('[name="form_screen"]'.replace('form_screen', form_screen)).should('be.visible');
        //click on submit button
        request.clickOnSubmitButton();
        //verify task is  completed
        request.verifyTaskIsCompleted();
        //verify the process is completed
        request.processIsCompleted(requestId);
        //Verify the Script A is completed
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task Script A']]").should('be.visible');
        //verify the AA is completed
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task AA']]").should('be.visible');
        //Verify the Script B is completed
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task Script B']]").should('be.visible');
        //verify the BB is completed
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task BB']]").should('be.visible');
        //Verify AAA is true
        cy.xpath("//div[text()[normalize-space()='AAA: aa == true']]").should('be.visible');
        //verify the EE is completed
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task EE']]").should('be.visible');

    }

    actionsAndAssertionsOfTCP42193(requestId, form_screen, display_screen) {
        var date = new Date().toLocaleDateString('en-GB');
        //verify screen name
        // cy.get['[name="form_screen"]'.replace('form_screen', form_screen)];
        //add date to the date picker
        cy.xpath('(//*[@type="text"])[1]').type(date).should('have.value', date);
        //add 1 in var1 line input
        cy.get('[data-cy="screen-field-Var1"]').type("1").should('have.value', "1");
        //add value to the line input
        cy.xpath('(//*[@data-cy="screen-field-form_input_1"])[1]').type("test case").should('have.value', "test case");
        //enable check box
        cy.xpath('(//*[@data-cy="screen-field-form_checkbox_1"])[1]').click();
        //add value to the line input
        cy.xpath('(//*[@data-cy="screen-field-form_input_1"])[2]').type("test case 2").should('have.value', "test case 2");
        //enable check box
        cy.xpath('(//*[@data-cy="screen-field-form_checkbox_1"])[2]').click();
        //click on +
        cy.get('[data-cy="loop-loop_1-add"]').click();
        //write text in line input
        cy.xpath('(//*[@data-cy="screen-field-form_input_1"])[3]').type("test case").should('have.value', "test case");
        //click on submit button
        request.clickOnSubmitButton();
        //verify task is completed
        request.verifyTaskIsCompleted();
        //wait for 2 min
        cy.wait(120000);
        //go to all requests
        navHelper.navigateToAllRequests();
        //open request by id
        request.openRequestById(requestId);
        //refresh the page
        cy.reload();
        //open manual task
        request.openTask("Manual Task");
        //verify screen name
        //cy.get['[name="display_screen"]'.replace('display_screen', display_screen)];
        //verify the date
        // cy.xpath("//div[@id='tabContent']/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]").should('be.visible');
        //verify the 1 value
        cy.xpath('//p[text()="1"]').should('be.visible');
        //verify testcase is present
        cy.xpath("(//p[text()='test case'])[1]").should('be.visible');
        //verify testcase 2 is present
        cy.xpath("//p[text()='test case 2']").should('be.visible');
        //verify testcase is present 
        cy.xpath("(//p[text()='test case'])[2]").should('be.visible');
        //click on complete task
        cy.get('[class="btn btn-primary"]').click();
        //verify task is completed
        request.verifyTaskIsCompleted();
        //verify the process is completed
        request.verifyRequestisCompleted();
    }


    async actionsAndAssertionsOfTCP42293(form_screen, display_screen, name) {
        //go to url
        cy.visit('webentry/511/node_1');
        //verify screen name
        cy.get['[name="form_screen"]'.replace('form_screen', form_screen)];
        //upload a file
        cy.wait(2000);
        cy.xpath('(//input[@type="file"])[1]').attachFile("drone.jpg");
        //cy.wait(2000);
        //click on submit button
        request.clickOnSubmitButton();
        //verify screen name
        cy.get['[name="display_screen"]'.replace('display_screen', display_screen)];
        //verify the download file option is showing
        cy.get('[aria-label="New File Download"]').should('be.visible');
        //verify the file preview name
        cy.xpath('//div[normalize-space(text())="drone.jpg"]').should('be.visible');
        //go to in progress request
        navHelper.navigateToInprogressRequests();
        //open the request by name
        // var requestId = await request.openRequestByName(name);
        //request.openRequestByName(name);
        //verify screen name
        cy.get['[name="form_screen"]'.replace('form_screen', form_screen)];
        //verify the file review
        cy.get('[style="flex: 1 1 0%;"]').should('be.visible');
        //click on submit button
        request.clickOnSubmitButton();
        //verify task is completed
        request.verifyTaskIsCompleted();
        //verify the process is completed
        request.processIsCompleted();

    }

    actionsAndAssertionsOfTCP42275(name) {
        //Wait the request is completed
        request.waitUntilTextcontainText('selector','varHeader','Completed');

        const d = new Date();
        const dia= d.getDate();
        let result = dia % 2;
        cy.log(result);
        if (result === 0) {
            //verify script A
            cy.xpath("(//td[contains(text(),'Script A')])[1]").should('be.visible');
            //verify script B
        }
        else {
            //verify script A
            cy.xpath("(//td[contains(text(),'Script A')])[1]").should('be.visible');
            //verify script B
            //verify script C
            cy.xpath("(//td[contains(text(),'Script C')])[1]").should('be.visible');
            cy.reload();
            //verify script D
            cy.xpath("(//td[contains(text(),'Script D')])[1]").should('be.visible');
            //verify script E
            cy.xpath("(//td[contains(text(),'Script E')])[1]").should('be.visible');
        }
    }

    actionsAndAssertionsOfTCP42366(processId) {

        //Step 1: Wait the page is laod and click on submit button
        cy.xpath('//button[@aria-label="New Submit"]').should('be.visible').click();

        cy.get('[name=request-id]').invoke('attr', 'content').should('not.be.empty');
        //Step 2: Get the number of requests
        cy.get("[name='request-id']").invoke('attr', 'content').then((requestId)=> {

            //Step 3: Log in
            login.navigateToUrl();
            login.login();

            cy.visit('/requests/' + requestId);
            request.waitUntilTextcontainText('selector', 'varHeader', 'Completed');
            //verify the web entry is completed
            cy.xpath("//div[contains(text(),'started this request from a web entry')]").should('be.visible');
            ////verify the Data Connector B is completed
            cy.xpath("//div[contains(text(),'has completed the task DCB')]").should('be.visible');
            //Verify the Script B is completed
            cy.xpath("//div[contains(text(),'has completed the task Script A')]").should('be.visible');
            //Verify the Script C is completed
            cy.xpath("//div[contains(text(),'has completed the task Script C')]").should('be.visible');
        });
    }

    actionsAndAssertionsOfTCP42440(requestId, processName) {
        //click on yes
        cy.xpath("//input[@value='Yes']").should('be.visible').click();
        //verify before data is visible
        cy.xpath("//label[text()='Before Date TODAY']").should('be.visible');
        //add date
        cy.xpath("(//label[text()='Before Date TODAY']/following::input)[1]").click({force:true});
        screensP.useCustomDate("2022", "Jul", "20");
        //click on submit button
        cy.xpath('//button[@aria-label="New Submit"]').click();
        //verify task is completed
        request.verifyTaskIsCompletedB();

        //verify the process is completed
        request.verifyRequestisCompleted(requestId);

        //request  part of second scenario
        navHelper.navigateToTasksPage();
        request.openNewRequest(processName);

        cy.url().then(url => {
            request.waitUntilElementIsVisible('selector', '#pending >* td:nth-child(1) >a[href^="/tasks"]');
            var requestId = url.split('/')[4].trim();
            request.clickOnTaskName(1, 1);
            cy.xpath("//input[@value='No']").should('be.visible');
            //click on No
            cy.xpath("//input[@value='No']").click();
            //verify before date is not visible
            cy.xpath("//label[text()='Before Date TODAY']").should('not.be.visible');
            //click on submit button
            cy.xpath('//button[@aria-label="New Submit"]').click();
            //verify task is completed
            request.verifyTaskIsCompletedB();
            request.verifyRequestisCompleted(requestId);
        });
    }

    actionsAndAssertionsOfTCP42384(requestId) {
        //create request part
        cy.xpath("//input[@name = 'form_input_1']").should('be.visible').type("yes");
        cy.xpath("//button[@aria-label = 'Submit']").click();
        cy.xpath("//div[text()[normalize-space()='yes']]").should('be.visible');

        cy.xpath("//input[@name = 'form_input_2']").type("8");
        cy.xpath("//button[@aria-label = 'Submit']").click();
        cy.xpath("//div[text()[normalize-space()='8']]").should('be.visible');

        cy.xpath("//button[@aria-label = 'Submit']").click();
        cy.xpath("//button[text()[normalize-space()='yes']]").click();
        
        request.verifyTaskIsCompletedB();

        //form task 1
        request.openRequestById(requestId);
        cy.wait(5000);
        cy.get('#pending >* td:nth-child(1) >a[href^="/tasks"]').should('have.length',3)

        cy.xpath("//a[text()[normalize-space()='Form Task 1']]").should('be.visible');
        cy.xpath("//a[text()[normalize-space()='Form Task 2']]").should('be.visible');
        cy.xpath("//a[text()[normalize-space()='Form Task 3']]").should('be.visible');

        request.clickOnTaskName(1, 1);
        cy.xpath("//input[@name = 'form_input_1']").should('be.visible')
        cy.xpath("//input[@name = 'form_input_1']").type("yes");
        cy.xpath("//button[@aria-label = 'Submit']").click();

        cy.xpath("//input[@name = 'form_input_2']").type("8");
        cy.xpath("//button[@aria-label = 'Submit']").click();

        cy.xpath("//button[@aria-label = 'Submit']").click();
        cy.xpath("//button[text()[normalize-space()='yes']]").click();
        request.verifyTaskIsCompletedB();

        //form task 2
        request.openRequestById(requestId);
        request.waitUntilElementIsVisible('selector', '#pending >* td:nth-child(1) >a[href^="/tasks"]');
        request.clickOnTaskName(1, 1);

        cy.xpath("//input[@name = 'form_input_1']").should('be.visible');
        cy.xpath("//input[@name = 'form_input_1']").type("yes");
        cy.xpath("//button[@aria-label = 'Submit']").click();

        cy.xpath("//input[@name = 'form_input_2']").type("8");
        cy.xpath("//button[@aria-label = 'Submit']").click();

        cy.xpath("//button[@aria-label = 'Submit']").click();
        cy.xpath("//button[text()[normalize-space()='yes']]").click();
        request.verifyTaskIsCompletedB();

        //form task 3
        request.openRequestById(requestId);
        request.waitUntilElementIsVisible('selector', '#pending >* td:nth-child(1) >a[href^="/tasks"]');
        request.clickOnTaskName(1, 1);

        cy.xpath("//input[@name = 'form_input_1']").should('be.visible');
        cy.xpath("//input[@name = 'form_input_1']").type("yes");
        cy.xpath("//button[@aria-label = 'Submit']").click();

        cy.xpath("//input[@name = 'form_input_2']").type("8");
        cy.xpath("//button[@aria-label = 'Submit']").click();

        cy.xpath("//button[@aria-label = 'Submit']").click();
        cy.xpath("//button[text()[normalize-space()='yes']]").click();
        request.verifyTaskIsCompletedB();

        request.verifyRequestisCompleted(requestId);
        cy.xpath("//div[text()[normalize-space() = 'Admin User has completed the task Form Task']]").should('exist');
        cy.xpath("//div[text()[normalize-space() = 'Admin User has completed the task Form Task 1']]").should('exist');
        cy.xpath("//div[text()[normalize-space() = 'Admin User has completed the task Form Task 2']]").should('exist');
        cy.xpath("//div[text()[normalize-space() = 'Admin User has completed the task Form Task 3']]").should('exist');

    }
    actionsAndAssertionsOfTCP42175(requestId) {
        //Step 1: Complete Form Task
        //accepted field
        screensP.fillConversational('10','The accepted must be accepted.');
        screensP.fillConversational('test','The accepted must be accepted.');
        screensP.fillConversational('yes');
        cy.xpath('//div[text()[normalize-space()="yes"]]').should('be.visible');

        //date after date field
        screensP.fillConversational('2020-10-10','The date - after date must be after 2020-10-10.');
        screensP.fillConversational('2018-08-19','The date - after date must be after 2020-10-10.');
        screensP.fillConversational('2020-10-11');
        cy.xpath('//div[text()[normalize-space()="2020-10-11"]]').should('be.visible');

        // date time After or equal to date field
        screensP.fillConversational('2018-08-19','The datetime - After or Equal To Date must be equal or after 2020-10-10.');
        screensP.fillConversational('2021-10-10');
        cy.xpath('//div[text()[normalize-space()="2021-10-10"]]').should('be.visible');

        //test alpha field
        screensP.fillConversational('@#sad','The text - Alpha field must contain only alphabetic characters.');
        screensP.fillConversational('12','The text - Alpha field must contain only alphabetic characters.');
        screensP.fillConversational('testcase');
        cy.xpath('//div[text()[normalize-space()="testcase"]]')
            .should('be.visible');

        //integer-alpha numeric field
        screensP.fillConversational('@!A','The integer - Alpha numeric field must be alphanumeric.');
        screensP.fillConversational('123456789');
        cy.xpath('//div[text()[normalize-space()="123456789"]]')
            .should('be.visible');

        ///date before date field
        screensP.fillConversational('2020-10-10','The date - before date must be before 2020-10-10.');
        screensP.fillConversational('2021-08-09','The date - before date must be before 2020-10-10.');
        screensP.fillConversational('2019-12-12');
        cy.xpath('//div[text()[normalize-space()="2019-12-12"]]').should('be.visible');

        //DateTime-before or equal to date field
        screensP.fillConversational('2020-12-12','The dateTime - Before or Equal to Date must be equal or before 2020-10-10.');
        screensP.fillConversational('2010-10-10');
        cy.xpath('//div[text()[normalize-space()="2010-10-10"]]').should('be.visible');

        // text Between Min & Max 3 - 7 field
        screensP.fillConversational('testlimhng','Must have a value between 3,7');
        screensP.fillConversational('qe','Must have a value between 3,7');
        screensP.fillConversational('3');
        cy.xpath('//div[text()[normalize-space()="3"]]').should('be.visible');

        //date date field
        screensP.fillConversational('1234-9','The date date must be a valid date.');
        screensP.fillConversational('1998-10-10');
        cy.xpath('//div[text()[normalize-space()="1998-10-10"]]').should('be.visible');

        //test email field
        screensP.fillConversational('abcd@user','The text email format is invalid.');
        screensP.fillConversational('erth4436@gmail.com');
        cy.xpath('//div[text()[normalize-space()="erth4436@gmail.com"]]').should('be.visible');
        cy.wait(2000);

        //integer in 9 field
        screensP.fillConversational('21','The selected integer - IN - 9 is invalid.');
        screensP.fillConversational('9');
        cy.xpath('//div[text()[normalize-space()="9"]]').should('be.visible');

        //password field
        screensP.fillConversational('password12');
        cy.xpath('//div[text()[normalize-space()="password12"]]').should('be.visible');

        //integer min-length5 field
        screensP.fillConversational('12345');
        cy.xpath('//div[text()[normalize-space()="12345"]]').should('be.visible');

        //text not in 5 field
        screensP.fillConversational('5','The selected text - not in 5 is invalid.');
        screensP.fillConversational('3');
        cy.xpath('//div[text()[normalize-space()="3"]]').should('be.visible');

        //required if field
        screensP.fillConversational('test');
        cy.xpath('//div[text()[normalize-space()="test"]]').should('be.visible');

        //required unless field
        screensP.fillConversational('test case required unless');
        cy.xpath('//div[text()[normalize-space()="test case required unless"]]').should('be.visible');

        //same before field
        screensP.fillConversational('yes');
        cy.xpath('//div[text()[normalize-space()="yes"]]').should('be.visible');

        //URL
        screensP.fillConversational('yes','The URL format is invalid.');
        screensP.fillConversational('https://ecosia.org');

        //regex(XYZ) field
        screensP.fillConversational('xyz');
        cy.xpath('//div[text()[normalize-space()="xyz"]]').should('be.visible');

        //list field
        cy.xpath("//a[@href='https://ecosia.org']").should('be.visible');
        cy.xpath("//span[text()='list']").should('be.visible');
        cy.xpath("//button[text()[normalize-space()='one']]").click();

        cy.xpath("//div[text()='Task Completed Successfully']").should('be.visible');
        cy.wait(2000);
        request.openRequestById(requestId);
        request.clickOnTaskName(1, 1);
        cy.xpath("//p[text()='yes']").should('be.visible');
        cy.xpath("//p[text()='2020-10-11']").should("be.visible");
        cy.xpath("//p[text()='2021-10-10']").should("be.visible");
        cy.xpath("//p[text()='testcase']").should("be.visible");
        cy.xpath("//p[text()='123456789']").should("be.visible");
        cy.xpath("//p[text()='2019-12-12']").should("be.visible");
        cy.xpath("//p[text()='2010-10-10']").should("be.visible");
        cy.xpath("//p[text()='3']").should("be.visible");
        cy.xpath("//p[text()='1998-10-10']").should("be.visible");
        cy.xpath("//p[text()='erth4436@gmail.com']").should("be.visible");
        cy.xpath("//p[text()='9']").should("be.visible");
        cy.xpath("//p[text()='password12']").should("be.visible");
        cy.xpath("//p[text()='12345']").should("be.visible");
        cy.xpath("(//p[text()='3'])[2]").should("be.visible");
        cy.xpath("//p[text()='test']").should("be.visible");
        cy.xpath("//p[text()='test case required unless']").should("be.visible");
        cy.xpath("//p[text()='yes']").should("be.visible");
        cy.xpath("//p[text()='https://ecosia.org']").should("be.visible");
        cy.xpath("//p[text()='xyz']").should("be.visible");
        cy.xpath("//p[text()='one']").should("be.visible");

        request.manualtaskcomplete();
        request.verifyRequestisCompleted(requestId);
    }
    actionsAndAssertionsOfTCP453922(requestId) {
        //request part click on enable visibility
        cy.xpath('//input[@data-cy="screen-field-visibility"]/following-sibling::label[1]').should('be.visible').click();

        //verify the new input control is present
        cy.xpath('//input[@data-cy="screen-field-form_input_1"]').should('be.visible');

        // verify the varA control is present
        cy.xpath('(//input[@data-cy="screen-field-varA"])[1]').should('be.visible');

        //verify the varB control is present
        cy.xpath('(//input[@data-cy="screen-field-varB"])[1]').should('be.visible');

        //verify the select list 1 control is present
        cy.xpath('(//div[@data-cy="screen-field-form_select_list_1"]//div)[1]').should('be.visible');

        //verify the select list 2 control is present
        cy.xpath('(//div[@data-cy="screen-field-form_select_list_2"]//div)[1]').should('be.visible');

        //verify the ADD control is present
        cy.xpath('//button[@data-cy="add-row"]').should('be.visible');

        // click on enable validation
        cy.xpath('(//label[@class="custom-control-label"])[1]').click();

        //verify the new input field is required
        cy.xpath('//input[@data-cy="screen-field-form_input_1"]/following-sibling::div[text()="Field is required"]')
            .should('be.visible');

        //verify the varA filed is required
        cy.xpath('//input[@data-cy="screen-field-varA"]/following-sibling::div[text()="Field is required"]').should('be.visible');

        //verify the varB filed is required
        cy.xpath('//input[@data-cy="screen-field-varB"]/following-sibling::div[text()="Field is required"]').should('be.visible');

        //click on add row
        cy.xpath('//button[@data-cy="add-row"]').click();

        //verify the varC filed is required
        cy.xpath('(//input[@data-cy="screen-field-varC"]/following-sibling::div[text()="Field is required"])[1]').should('be.visible');

        //click on cancel
        cy.xpath('(//button[text()="Cancel"])[1]').click();
        cy.wait(2000);
        //Verify the select list 1 field is required
        cy.xpath('(//div[text()="Field is required"])[6]').should('be.visible');

        //Verify the select list 2 field is required
        cy.xpath('(//div[text()="Field is required"])[7]').should('be.visible');

        //click on plus
        cy.xpath('(//i[@class="fas fa-plus"])[2]').click();

        //click on add
        cy.xpath('//button[@data-cy="add-row"]').click();

        //write text in varc
        cy.xpath('(//*[@data-cy="screen-field-varC"])[1]').type('varc');

        //click on ok
        cy.xpath('//button[text()="Ok"]').click();
        cy.wait(2000);

        //click on 2 plus
        cy.xpath('//button[@data-cy="loop-loop_3-add"]//i[1]').click();

        //verify the selectlist 3 field is required
        cy.xpath('(//div[text()="Field is required"])[8]').should('be.visible');

        //verify the selectlist 4 field is required
        cy.xpath('(//div[text()="Field is required"])[9]').should('be.visible');

        //new input
        cy.xpath('//input[@data-cy="screen-field-form_input_1"]').type('new input');

        //enter the vara
        cy.xpath('(//input[@data-cy="screen-field-varA"])[1]').type('vara1');

        //enter the value of vara
        cy.xpath('(//input[@data-cy="screen-field-varA"])[2]').type('vara2');

        //enter the value of varb1
        cy.xpath('(//input[@data-cy="screen-field-varB"])[1]').type('varb1');

        //enter the value of varb2
        cy.xpath('(//input[@data-cy="screen-field-varB"])[2]').type('varb2');

        //click
        cy.xpath('(//div[@data-cy="screen-field-form_select_list_1"]//input)[1]')
            .click({force:true})
            .type('Option 1');
        cy.wait(2000);
        cy.xpath('(//div[@data-cy="screen-field-form_select_list_1"]//input)[1]')
            .type('{enter}');

        //select option 2
        cy.xpath('(//div[@data-cy="screen-field-form_select_list_2"]//input)[1]')
            .click({force:true})
            .type('Option 2');
        cy.wait(2000);
        cy.xpath('(//div[@data-cy="screen-field-form_select_list_2"]//input)[1]')
            .type('{enter}');

        //select option 3
        cy.xpath('(//div[@data-cy="screen-field-form_select_list_1"]//input)[2]')
            .click({force:true})
            .type('Option 3');
        cy.wait(2000);
        cy.xpath('(//div[@data-cy="screen-field-form_select_list_1"]//input)[2]')
            .type('{enter}');

        //select option 3
        cy.xpath('(//div[@data-cy="screen-field-form_select_list_2"]//input)[2]')
            .click({force:true})
            .type('Option 3');
        cy.wait(2000);
        cy.xpath('(//div[@data-cy="screen-field-form_select_list_2"]//input)[2]')
            .type('{enter}');

        //verify the new input field is required is disappear
        cy.xpath("//input[@data-cy='screen-field-form_input_1']/following-sibling::div[text()='Field is required']").should('not.exist');

        //verify the varA filed is required is disapper
        cy.xpath("//input[@data-cy='screen-field-varB']/following-sibling::div[text()='Field is required']").should('not.exist');

        //Verify the select list 1 field is required is disappear
        cy.xpath('(//div[text()="Field is required"])[6]').should('not.exist');

        //Verify the select list 2 field is required
        cy.xpath("(//div[text()='Field is required'])[7]").should('not.exist');

        //verify the selectlist 3 field is required
        cy.xpath('(//div[text()="Field is required"])[8]').should('not.exist');

        //verify the selectlist 4 field is required
        cy.xpath("(//div[text()='Field is required'])[9]").should('not.exist');

        //new submit
        cy.xpath("//button[text()[normalize-space()='New Submit']]").click();
        request.verifyTaskIsCompletedB();
        
        //request page
        request.openRequestById(requestId);
        request.clickOnTaskName(1, 1);

        //verify the new input data is present
        cy.xpath("//input[@data-cy='screen-field-form_input_1']").should('have.value', 'new input');

        //verify the varA data is present
        cy.xpath("(//input[@data-cy='screen-field-varA'])[1]").should('have.value', 'vara1');

        //verify the varA 2 data is present
        cy.xpath("(//input[@data-cy='screen-field-varA'])[2]").should('have.value', 'vara2');

        //verify the varB data is present
        cy.xpath("(//input[@data-cy='screen-field-varB'])[1]").should('have.value', 'varb1');

        //verify the varB 2 data is present
        cy.xpath("(//input[@data-cy='screen-field-varB'])[2]").should('have.value', 'varb2');

        //verify the varc data is present
        cy.xpath("//button[@data-cy='edit-row']//i[1]").should('be.visible');

        //verify select list1 data is present
        cy.xpath('(//span[@class="multiselect__single"])[1]').should('contain', 'Option');

        //verify select list2 data is present
        cy.xpath('(//span[@class="multiselect__single"])[2]').should('contain', 'Option');

        //verify select list3 data is present
        cy.xpath('(//span[@class="multiselect__single"])[3]').should('contain', 'Option');

        //verify select list4 data is present
        cy.xpath('(//span[@class="multiselect__single"])[4]').should('contain', 'Option');

        //clear value new input
        cy.xpath('//input[@data-cy="screen-field-form_input_1"]').clear();

        //verify the new input field is required
        cy.xpath("//input[@data-cy='screen-field-form_input_1']/following-sibling::div[text()='Field is required']")
            .should('be.visible');

        //clear input vara
        cy.xpath("(//input[@data-cy='screen-field-varA'])[1]").clear();

        //verify the vara field is required
        cy.xpath("//input[@data-cy='screen-field-varA']/following-sibling::div[text()='Field is required']")
            .should('be.visible');

        //clear vara1 input
        cy.xpath("(//input[@data-cy='screen-field-varA'])[2]").clear();

        //verify( the varA 2 field is required
        cy.xpath("(//input[@data-cy='screen-field-varA']/following-sibling::div[text()='Field is required'])[2]")
            .should('be.visible');

        //clear varb input
        cy.xpath("(//input[@data-cy='screen-field-varB'])[1]").clear();

        //verify the var B  field is required
        cy.xpath("//input[@data-cy='screen-field-varB']/following-sibling::div[text()='Field is required']")
            .should('be.visible');

        //clear varb2 input
        cy.xpath("(//input[@data-cy='screen-field-varB'])[2]").clear();

        //verify the varb field is required
        cy.xpath("(//input[@data-cy='screen-field-varB'])[2]").should('be.visible');

        //verify the new input data is present
        cy.xpath("//input[@data-cy='screen-field-form_input_1']").type('INPUT');

        //verify the varA data is present
        cy.xpath("(//input[@data-cy='screen-field-varA'])[1]").type('vara1');

        //verify the varA 2 data is present
        cy.xpath("(//input[@data-cy='screen-field-varA'])[2]").type( 'vara2');

        //verify the varB data is present
        cy.xpath("(//input[@data-cy='screen-field-varB'])[1]").type( 'varb1');

        //verify the varB 2 data is present
        cy.xpath("(//input[@data-cy='screen-field-varB'])[2]").type( 'varb2');
        //click on submit button
        cy.xpath("//button[text()[normalize-space()='New Submit']]").click();
        request.verifyTaskIsCompletedB();
    }
    
    actionsAndAssertionsOfTCP42192(requestId, name, screen) {
        //Step 1: Complete the form 1
        cy.xpath('(//input[@name="form_input_1"])[1]').should('be.visible');
        cy.xpath('(//input[@name="form_input_1"])[1]').type('Form');
        cy.xpath('(//input[@name="form_input_1"])[1]').type('Nested Screen');
        cy.get('[type="checkbox"]').first().check();
        cy.get('[name="form_text_area_1"]').type('text area nested');
        cy.get('[class="multiselect__select"]').click();
        cy.get('[aria-label="One. "]').click();
        cy.get(':nth-child(3) > .form-group > .btn').click();
        request.verifyTaskIsCompletedB();

        //Step 2: Wait to PDF will be generated
        cy.visit('/requests/'+requestId);
        request.waitUntilTextcontainText('selector','varHeader','Completed');
        request.clickonfilemanager();
        var file = "//span[text()='name']";
        cy.xpath(file.replace('name', screen)).should('be.visible');
        cy.get('[title="View"]').click();

    }
    actionsAndAssertionsOfTCP42422(requestId) {
        //Step 1: Complete the task form 1
        cy.xpath("//button[text()[normalize-space()='Add']]").should('be.visible').click();
        cy.xpath("(//input[@name='text'])[1]").type("check enabled");
        cy.xpath("(//input[@name='Check'])[1]").check();
        cy.xpath("//button[text()='Ok']").click();
        cy.wait(2000);
        cy.xpath("(//td[@class='table-column']/following-sibling::td)[1]").should('contain', 'true');

        //click on add button of record list
        cy.xpath("//button[text()[normalize-space()='Add']]").click();
        cy.xpath("(//input[@name='text'])[1]").type("check disabled");
        cy.xpath("//button[text()='Ok']").click();
        cy.wait(2000);
        cy.xpath("(//td[@class='table-column']/following-sibling::td)[3]").should('contain', 'false');

        //click on new submit
        cy.xpath("//button[text()[normalize-space()='New Submit']]").click();
        request.verifyTaskIsCompletedB();

        //Open the second task
        request.openRequestById(requestId);
        request.waitUntilElementIsVisible('selector', '#pending >* td:nth-child(1) >a[href^="/tasks"]');
        request.clickOnTaskName(1, 1);

        //Step 2: Complete the task form 2
        cy.xpath("(//td[@role='cell'])[2]").should('be.visible').should('contain', 'true');
        cy.xpath("(//td[@class='table-column']/following-sibling::td)[3]").should('contain', 'false');
        cy.xpath("//button[text()[normalize-space()='New Submit']]").click();
        request.verifyTaskIsCompletedB();
    }

    actionsAndAssertionsOfTCP42441(requestId) {
        cy.xpath("(//div[text()='Field must be accepted'])[1]").should('be.visible');
        cy.xpath("(//input[@class='form-check-input is-invalid'])[1]").check();
        cy.xpath("//div[@data-cy='screen-field-form_date_picker_1']//input").click();
        screensP.useCustomDate("2024", "May", "13");
        cy.xpath("//label[text()='input_1']/following::input[1]").type("yes");
        cy.xpath("(//input[@type='checkbox'])[2]").click();
        cy.xpath("(//div[text()='Must be after 2020-02-20'])[1]").should('be.visible');
        cy.xpath("//div[@data-cy='screen-field-form_date_picker_2']//input").click();
        screensP.useCustomDate("2021", "Jun", "11");
        cy.xpath("(//div[@class='invalid-feedback d-block']//div)[1]").should('not.have.value', "Must be after 2020-02-20");
        cy.xpath("(//div[text()='Must be after 2020-02-20'])[1]").should('be.visible');
        cy.xpath("//label[text()='input_2']/following::input[1]").type("2022-02-20");
        cy.xpath("(//div[@class='invalid-feedback'])[1]").should('not.have.value', "Must be after 2020-02-20");
        //checkbox 3
        //cy.wait(3000);
        cy.xpath("//div[text()='Field is required'][1]").should('be.visible');
        cy.xpath("(//input[@type='checkbox'])[3]").click();
        cy.xpath("(//div[@class='invalid-feedback']//div)[1]").should('not.have.value', "Field is required");
        //datepicker 3
        //cy.wait(3000);
        cy.xpath("//div[text()='Must be equal or after 2020-02-20']").should('be.visible')
        cy.xpath("//label[text()='date_picker_3']/following::input[1]").click();
        screensP.useCustomDate("2020", "Feb", "20");
        cy.xpath("(//div[@class='invalid-feedback d-block']//div)[1]").should('not.have.value', "Must be equal or after 2020-02-20");
        // input 3
        //cy.wait(3000);
        cy.xpath("(//div[text()='Field is required'])[1]").should('be.visible');
        cy.xpath("//label[text()='input_3']/following::input[1]").type("234");
        cy.xpath("//div[text()='Accepts only alphabet characters']").should('be.visible');
        cy.xpath("(//div[text()='Field is required'])[1]").should('be.visible');
        cy.xpath("//label[text()='input_3']/following::input[1]").clear().type("test");
        cy.xpath("(//div[@class='invalid-feedback'])[1]").should('not.have.value', "Accepts only alphabet characters");
        cy.xpath("(//div[@class='invalid-feedback'])[1]").should('not.have.value', "Field is required");
        //checkbox 4
        //cy.wait(3000);
        cy.xpath("//label[text()='checkbox_4']").click();
        //cy.xpath("(//div[text()='Field is required'])[1]").should('not.have.value',"Field is required");
        cy.xpath("//div[text()='Must be same as form_checkbox_4']").should('be.visible');
        //datepicker4
        //cy.wait(3000);
        cy.xpath("//div[text()='Must be before 2020-02-20']").should('be.visible');
        cy.xpath("//label[text()='date_picker_4']/following::input[1]").click();
        screensP.useCustomDate("2019", "Feb", "20");
        cy.xpath("(//div[@class='invalid-feedback d-block']//div)[1]").should('not.have.value', "Must be before 2020-02-20");
        //input 4
        //cy.wait(3000);
        cy.xpath("//label[text()='input_4']/following-sibling::input").type("@!");
        cy.xpath("//div[text()='Accepts only alphanumerics']").should("be.visible");
        cy.xpath("//label[text()='input_4']/following-sibling::input").clear().type("test");
        cy.xpath("(//div[@class='invalid-feedback'])[1]").should('not.have.value', "Accepts only alphanumerics");
        //check box 5
        //cy.wait(3000);
        cy.xpath("//div[text()='Must be same as form_checkbox_4']").should('be.visible');
        cy.xpath("//label[text()='checkbox_5']").click();
        cy.xpath("//div[@class='invalid-feedback']//div[1]").should('not.exist');
        //datepicker 5
        //cy.wait(3000);
        cy.xpath("//div[text()='Must be equal or before 2020-02-20']").should('be.visible');
        cy.xpath("//label[text()='date_picker_5']/following::input[1]").click();
        screensP.useCustomDate("2020", "Feb", "20");
        //input 5
        //cy.wait(3000);
        cy.xpath("//label[text()='input_5']/following-sibling::input").type("test");
        cy.xpath("//div[text()='Must be a valid email address']").should('be.visible');
        cy.xpath("//label[text()='input_5']/following-sibling::input").clear().type("test@test.com");
        cy.xpath("(//div[@class='invalid-feedback'])[1]").should('not.have.value', "Must be a valid email address");
        //input 6
        //cy.wait(3000);
        cy.xpath("(//div[text()='Invalid value'])[1]").should('be.visible');
        cy.xpath("//label[text()='input_6']/following-sibling::input").type("20");
        cy.xpath("(//div[text()='Invalid value'])[1]").should('not.have.value', "Invalid value");
        //input 7
        //cy.wait(3000);
        cy.xpath("//label[text()='input_7']/following-sibling::input").type(1234567);
        cy.xpath("//div[text()='Must have at most 5']").should('be.visible');
        cy.xpath("//label[text()='input_7']/following-sibling::input").clear().type('test');
        cy.xpath("(//div[@class='invalid-feedback'])[2]").should('not.have.value', "Must have at most 5");
        //input 8
        //cy.wait(3000);
        cy.xpath("//label[text()='input_8']/following-sibling::input").type("123");
        cy.xpath("//div[text()='Must have at least 4']").should('be.visible');
        cy.xpath("//label[text()='input_8']/following-sibling::input").clear().type("test");
        cy.xpath("(//div[@class='invalid-feedback'])[2]").should('not.have.value', "Must have at least 4");
        //input 9
        //cy.wait(3000);
        cy.xpath("//label[text()='nput_9']/following-sibling::input").type("20");
        cy.xpath("(//div[text()='Invalid value'])[1]").should('be.visible');
        cy.xpath("//label[text()='nput_9']/following-sibling::input").clear().type("21");
        cy.xpath("(//div[@class='invalid-feedback'])[1]").should('not.have.value', 'Invalid value');
        //input 10
        //cy.wait(3000);
        cy.xpath("//div[text()='Invalid value']").should("be.visible");
        cy.xpath("//label[text()='input_10']/following-sibling::input").type("test");
        cy.xpath("(//div[@class='invalid-feedback'])[1]").should('not.have.value', "Invalid value");
        //input 11
        //cy.wait(3000);
        cy.xpath("(//div[text()='Field is required'])[1]").should('be.visible');
        cy.xpath("//label[text()='input_11']/following-sibling::input").type('test');
        cy.xpath("(//div[@class='invalid-feedback'])[1]").should('not.have.value', "Field is required");
        cy.xpath("//input[@name='form_input_12']/following-sibling::div[1]").should('be.visible');
        //cy.wait(3000);
        //input 12
        cy.xpath("(//div[text()='Field is required'])[1]").should('be.visible');
        //cy.wait(3000);
        cy.xpath("(//div[text()='Field is required'])[2]").should('be.visible');
        //cy.wait(5000);
        cy.xpath("//label[text()='input_12']/following-sibling::input").type("test");
        //cy.wait(3000);
        cy.xpath("(//div[@class='invalid-feedback'])[1]").should('not.exist');
        //cy.wait(3000);
        cy.xpath("(//div[@class='invalid-feedback'])[2]").should('not.exist');
        //cy.wait(3000);
        //input 13
        cy.xpath("//label[text()='input_13']/following-sibling::input").type("test");
        //cy.wait(3000);
        cy.xpath("//div[text()='Must be same as form_input_13']").should('be.visible');

        //input 14
        cy.xpath("//div[text()='Must be same as form_input_13']").should('be.visible');
        //cy.wait(3000);
        cy.xpath("//label[text()='input_14']/following-sibling::input").type('test');
        cy.xpath("//div[text()='Must be same as form_input_13']").should('not.exist');
        //input 15
        cy.xpath("//label[text()='input_15']/following-sibling::input").type("yuopkjmn");
        //cy.wait(3000);
        cy.xpath("//div[text()='Must be a valid URL']").should('be.visible');
        //cy.wait(3000);
        cy.xpath("//label[text()='input_15']/following-sibling::input").clear().type("https://qualitlabs-qa.processmaker.net/");
        //cy.wait(3000);
        cy.xpath("//div[text()='Must be a valid URL']").should('not.exist');
        cy.xpath("//button[text()[normalize-space()='New Submit']]").click();
        request.verifyTaskIsCompletedB();
    }

    actionsAndAssertionsOfTCP42211(requestId) {
        //Step 1: Complete the Form A
        cy.xpath("//input[@data-cy='screen-field-checkbox1']").should('be.visible');
        cy.xpath("//input[@data-cy='screen-field-checkbox1']").click();
        cy.get("[data-cy='screen-field-date']>* input").eq(1)
            .should('be.visible')
            .click();
        screensP.useCustomDate('2022','Nov','20');
        cy.xpath("//p[text()='シラニカトナ']").should('contain', 'シラニカトナ');
        cy.xpath("//input[@data-cy='screen-field-checkbox']").click();
        cy.xpath("//p[text()='ASSAM is ASSAM KERELA is KERELA ORRISA is ORRISA']").should('be.visible')
        cy.wait(3000);
        cy.xpath("//button[text()[normalize-space()='Add']]").click();
        cy.wait(1000);
        cy.xpath("(//span[text()='Administrators'])[1]").then($header => {
            if (!$header.is(':visible')){
                cy.xpath('(//label[text()="New Select List"]/following-sibling::div//div[@class="multiselect__tags"])[1]').click();
            }
        });
        cy.xpath("(//span[text()='Administrators'])[1]").click();
        cy.xpath("//button[text()='Ok']").click();
        cy.xpath("(//button[@class='btn btn-primary'])[2]").should('be.visible');
        cy.xpath("(//button[text()[normalize-space()='New Submit']])[2]").click();
        request.verifyTaskIsCompletedB();

        //Step 2: Open the second task
        request.openRequestById(requestId);
        request.waitUntilElementIsVisible('selector', '#pending >* td:nth-child(1) >a[href^="/tasks"]');
        request.clickOnTaskName(1, 1);
        cy.xpath("(//button[text()[normalize-space()='New Submit']])[1]").click();
        request.verifyTaskIsCompletedB();

        request.verifyRequestisCompleted(requestId);
    }
    actionsAndAssertionsOfTCP42288(requestId){
        const addRecordBTn = "[data-cy='add-row']";
        const selectListXpath = "//label[text()='Select List']/parent::div//div[@class='multiselect__tags']";
        const inputLineXpath = "//label[text()='Select List']/parent::div//input";
        const okBtnXPath = "//button[text()='Ok']";

        //First Record List

        //Add a record list 1
        cy.get(addRecordBTn).should('be.visible').click();
        cy.xpath(selectListXpath).first().should('be.visible').click();
        cy.wait(2000);
        cy.xpath(inputLineXpath).first().type('title1').should('have.value','title1');
        cy.xpath(inputLineXpath).first().type('{enter}');
        //add file
        cy.get("[type='file']").attachFile("drone.jpg");
        cy.xpath('//*[@data-cy="screen-field-fileUpload"]//span[contains(text(),"success")]').should('exist');
        //add signature
        cy.xpath("(//div[@class='signature pl-0']//canvas)[1]").click();
        cy.xpath("//span[text()='success']").should('be.visible');
        //click on ok
        cy.xpath(okBtnXPath).click();

        //Add a record list 2
        cy.get(addRecordBTn).should('be.visible').click();
        cy.xpath(selectListXpath).first().should('be.visible').click();
        cy.wait(3000);
        cy.xpath(inputLineXpath).first().type('title2').should('have.value','title2');
        cy.xpath(inputLineXpath).first().type('{enter}');
        //add file
        cy.get("[type='file']").attachFile("data.json");
        cy.xpath('//*[@data-cy="screen-field-fileUpload"]//span[contains(text(),"success")]').should('exist');
        //add signature
        cy.xpath("(//div[@class='signature pl-0']//canvas)[1]").click();
        cy.xpath("//span[text()='success']").should('be.visible');
        //click on ok
        cy.xpath(okBtnXPath).click();

        //Add a loop 1
        cy.get('[data-cy="loop-loop-add"]').should('be.visible').click();

        //Second Record list
        //Add a record list 1
        cy.get(addRecordBTn).eq(1).should('be.visible').click();
        cy.xpath(selectListXpath).eq(2).should('be.visible').click();
        cy.wait(3000);
        cy.xpath(inputLineXpath).eq(2).type('title2').should('have.value','title2');
        cy.xpath(inputLineXpath).eq(2).type('{enter}');
        //add file
        cy.get("[type='file']").eq(2).attachFile("drone.jpg");
        cy.xpath('//*[@data-cy="screen-field-fileUpload"]//span[contains(text(),"success")]').should('exist');
        cy.xpath("//span[text()='success']").should('be.visible');
        //add signature
        cy.xpath("(//div[@class='signature pl-0']//canvas)[3]").click();
        //click on ok
        cy.xpath(okBtnXPath).eq(1).click();

        //Add a record list 2
        cy.get(addRecordBTn).eq(1).should('be.visible').click();
        cy.xpath(selectListXpath).eq(2).should('be.visible').click();
        cy.wait(5000);
        cy.xpath(inputLineXpath).eq(2).type('title3').should('have.value','title3');
        cy.xpath(inputLineXpath).eq(2).type('{enter}');
        //add file
        cy.get("[type='file']").eq(2).attachFile("data.json");
        cy.xpath('//*[@data-cy="screen-field-fileUpload"]//span[contains(text(),"success")]').should('exist');
        cy.xpath("//span[text()='success']").should('be.visible');
        //add signature
        cy.xpath("(//div[@class='signature pl-0']//canvas)[3]").click();
        //click on ok
        cy.xpath(okBtnXPath).eq(1).click();

        //Add a loop 2
        cy.xpath('(//*[@data-cy="loop-loop-add"])[1]').should('be.visible');
        cy.xpath('(//*[@data-cy="loop-loop-add"])[1]').click();

        // Third Record List

        //Add a record list 1
        cy.get(addRecordBTn).eq(2).should('be.visible').click();
        cy.xpath(selectListXpath).eq(4).should('be.visible').click();
        cy.wait(4000);
        cy.xpath(inputLineXpath).eq(4).type('title3').should('have.value','title3');
        cy.xpath(inputLineXpath).eq(4).type('{enter}');
        //add file
        cy.get("[type='file']").eq(4).attachFile("drone.jpg");
        cy.xpath("//span[text()='success']").should('be.visible');
        //add signature
        cy.xpath("(//div[@class='signature pl-0']//canvas)[5]").click();
        //click on ok
        cy.xpath(okBtnXPath).eq(2).click();

        //Add a record list 2
        cy.get(addRecordBTn).eq(2).should('be.visible').click();
        cy.xpath(selectListXpath).eq(4).should('be.visible').click();
        cy.wait(4000);
        cy.xpath(inputLineXpath).eq(4).type('title4').should('have.value','title4');
        cy.xpath(inputLineXpath).eq(4).type('{enter}');
        //add file
        cy.get("[type='file']").eq(4).attachFile("drone.jpg");
        cy.xpath("//span[text()='success']").should('be.visible');
        //add signature
        cy.xpath("(//div[@class='signature pl-0']//canvas)[5]").click();
        //click on ok
        cy.xpath(okBtnXPath).eq(2).click();

        //click on submit button
        cy.get('[id="main"]').scrollTo('bottom');
        cy.xpath('//button[text()[normalize-space()="New Submit"]]').should('be.visible');
        cy.wait(1000);
        cy.xpath('//button[text()[normalize-space()="New Submit"]]').click();
        request.verifyTaskIsCompletedB();

        cy.visit('/requests/'+requestId);
        request.waitUntilElementIsVisible('selector', '#pending >* td:nth-child(1) >a[href^="/tasks"]');
        
        //open manual task
        request.clickOnTaskName(1, 1);
        cy.xpath("//td[contains(text(),'title1')]").should('be.visible');
        //verify the author1 is showing
        cy.xpath('//td[normalize-space(text())="author1"]').should('be.visible');
        //verify the value 2 in loop1
        cy.xpath('//td[normalize-space(text())="title2"]').eq(0).should('be.visible');
        //verify the author2 is showing
        cy.xpath('//td[normalize-space(text())="author2"]').eq(0).should('be.visible');
        
        //verify the value 2 in loop1
        cy.xpath('//td[normalize-space(text())="title2"]').eq(1).should('exist');
        //verify the author2 is showing
        cy.xpath('//td[normalize-space(text())="author2"]').eq(1).should('exist');

        cy.xpath("//td[contains(text(),'title3')]").eq(1).should('be.visible');
        //verify the author1 is showing
        cy.xpath('//td[normalize-space(text())="author3"]').eq(1).should('be.visible');
        //verify the value 2 in loop1
        cy.xpath('//td[normalize-space(text())="title4"]').eq(0).should('be.visible');
        //verify the author2 is showing
        cy.xpath('//td[normalize-space(text())="author4"]').eq(0).should('be.visible');

        cy.xpath("//button[contains(text(),'Complete Task')]").click();
        request.verifyTaskIsCompletedB();
    }

    actionsAndAssertionsOfTCP42154(requestId, name1, name2) {
        //Step 1: Complete the process 1
        cy.xpath("//input[@data-cy='screen-field-form_input_1']").should('be.visible');
        cy.xpath("//input[@data-cy='screen-field-form_input_1']").type("qwert");
        cy.xpath("//textarea[@data-cy='screen-field-form_text_area_1']").type("abcdefghjjbffnwfewyfwh");
        cy.xpath("//button[@class='btn btn-primary']").click();
        request.verifyTaskIsCompletedB();

        //Step 2: Verify that process 2 was started
        navHelper.navigateToAllRequests();

        request.addRequestNameToSelectList(name2);
        cy.xpath('(//*[contains(text(),"21542-Process")]/ancestor::tr/td//a[contains(@href,"/requests")])[1]')
            .should('be.visible');
    }

    actionsAndAssertionsOfTCP42152(requestId, name, timeStamp) {
        //request part 1
        cy.xpath("//input[@class='form-control']").type("input11");
        cy.xpath("//button[@class='btn btn-primary']").click();
        request.verifyTaskIsCompleted();
        cy.wait(5000);

        //requestpart 2
        header.clickOnAddRequest();
        cy.wait(4000);
        header.searchWithProcessName(name);
        header.clickOnStart(name);
        cy.url().then(url => {
            request.clickOnTaskName(1, 1);
            var requestId = url.split('/')[4].trim();
            cy.xpath("//input[@class='form-control']").type("input12");
            cy.xpath("//button[@class='btn btn-primary']").click();
            request.verifyTaskIsCompleted();
            cy.wait(5000);
        });
        //requestpart 3
        header.clickOnAddRequest();
        cy.wait(4000);
        header.searchWithProcessName(name);
        header.clickOnStart(name);
        cy.url().then(url => {
            request.clickOnTaskName(1, 1);
            var requestId = url.split('/')[4].trim();
            cy.xpath("//input[@class='form-control']").type("input13");
            cy.xpath("//button[@class='btn btn-primary']").click();
            request.verifyTaskIsCompleted();
            cy.wait(5000);
        });
        //requestpart 4
        header.clickOnAddRequest();
        cy.wait(4000);
        header.searchWithProcessName(name);
        header.clickOnStart(name);
        cy.url().then(url => {
            request.clickOnTaskName(1, 1);
            var requestId = url.split('/')[4].trim();
            cy.xpath("//input[@class='form-control']").type("input14");
            cy.xpath("//button[@class='btn btn-primary']").click();
            request.verifyTaskIsCompleted();
            cy.wait(5000);
        });

        //requestpart 5
        header.clickOnAddRequest();
        cy.wait(4000);
        header.searchWithProcessName(name);
        header.clickOnStart(name);
        cy.url().then(url => {
            request.clickOnTaskName(1, 1);
            var requestId = url.split('/')[4].trim();
            cy.xpath("//input[@class='form-control']").type("input15");
            cy.xpath("//button[@class='btn btn-primary']").click();
            request.verifyTaskIsCompleted();
            cy.wait(5000);

            const testname1 = 'Automation-Username' + timeStamp;
            const testname2 = 'Automation-Firstname' + timeStamp;
            const testname3 = 'Automation-Lastname' + timeStamp;
            const testname4 = 'Automation-Groupname' + timeStamp;
            //create user
            navHelper.navigateToAdminUserPage();
            adminP.createUser(testname1, testname2, testname3, "QA","Active","abcd7890@gmail.com","H12345678");
            navHelper.navigateToAdminGroupPage();
            adminP.createGroupAddingUsers(testname4, testname2, testname1);

            //request page
            navHelper.navigateToRequestsPage();
            cy.wait(3000);
            cy.xpath("(//div[@class='multiselect__tags'])[1]").type(name);
            cy.xpath("(//div[@class='multiselect__tags'])[1]").type('{enter}');
            cy.wait(2000);
            cy.xpath("//i[@class='fas fa-search']").click();
            cy.xpath("//button[contains(@class,'btn btn-save-search')]").click();
            cy.xpath("//h5[text()='Save Search']").should('be.visible');
            const Savescreen = 'Automation-saveScreenName' + timeStamp
            cy.xpath("//label[text()='Name']/following::input[1]").type(Savescreen);
            cy.wait(3000);
            cy.xpath("//legend[text()[normalize-space()='Share With Groups']]//parent::fieldset//div[@class='multiselect__tags']").click();
            cy.xpath("//input[@placeholder='Select Groups']").type(timeStamp);
            cy.xpath("//input[@placeholder='Select Groups']").type('{enter}');
            cy.xpath("//button[text()='Save']").click();
            cy.wait(2000);
            cy.get('[class="d-print-none"]').scrollTo('bottom');
            var val3 = "//a[contains(@aria-label,'name')]";
            cy.xpath(val3.replace('name', Savescreen)).should('be.visible');
            cy.xpath(val3.replace('name', Savescreen)).click();
            cy.xpath("//li[@role='heading']").should('be.visible');
            cy.xpath("//a[@class='nav-link']//i[@class='fas fa-fw fa-chart-line']").click();
            const val2 = 'A2152-chart' + timeStamp;
            cy.xpath("//button[@class='btn w-100 btn-secondary']").should('be.visible');
            cy.xpath("//button[@class='btn w-100 btn-secondary']").click();
            cy.wait(2000);
            cy.xpath("(//input[@class='form-control'])[1]").type(val2);
            cy.xpath("(//p[@class='m-0 p-0'])[1]").click();
            cy.xpath("(//a[@data-toggle='tab'])[2]").click();
            cy.xpath("(//span[text()[normalize-space()='Column']])[1]").click();
            cy.xpath("(//div[text()='Status '])[1]").click();
            cy.xpath("(//div[@class='multiselect__select'])[2]").click();
            cy.xpath("(//div[text()='Started '])[2]").click();
            cy.xpath("(//div[@class='multiselect__select'])[3]").click();
            cy.xpath("//div[text()='Count of Records ']").click();
            cy.xpath("//button[text()[normalize-space()='Save']]").click();
            cy.xpath("//button[contains(@class,'btn card-header-button')]/following-sibling::div[1]").should('be.visible');
        });
    }

    actionsAndAssertionsOfTCP42172(processId) {
        //verify screen name
        cy.get('[name="CommentType"]').should('be.visible');
        cy.get('[name="CommentType"]').type('test web entry');
        cy.get('[data-cy="screen-field-Enable"]').click({force:true});
        cy.get('[class="btn btn-primary"]').click();
        cy.xpath("//strong[text()='Completed!!!!!!']").should('be.visible');

        cy.get('[name=request-id]').invoke('attr', 'content').should('not.be.empty');

        //Step 3: Get the number of requests
        cy.get("[name='request-id']").invoke('attr', 'content').then((requestId)=>{

            //Step 4: Log in
            login.navigateToUrl();
            login.login();

            cy.visit('/requests/'+requestId);
            request.waitUntilElementIsVisible('selector', '#pending >* td:nth-child(1) >a[href^="/tasks"]');
            request.clickOnTaskName(1, 1);
            cy.xpath("//button[normalize-space(text())='New Submit']").should('be.visible');
            notification.pressCommentButton();
            notification.sendComment(
                "Task",
                "testcase comments with WE"
            );
            cy.xpath("//button[normalize-space(text())='New Submit']").click();
            request.verifyTaskIsCompletedB();

            cy.visit('/requests/'+requestId);
            notification.pressCommentButton();
            cy.xpath('//div[contains(text(),"testcase comments with WE")]').should('exist');

        });
    }

    actionsAndAssertionsOfTCP42171(requestId){
        //Step 2: Wait the scren is load
        cy.get('[data-cy="screen-field-CommentType"]').should('be.visible');
        cy.get('[data-cy="screen-field-CommentType"]').type("comment Type");
        cy.get('[data-cy="screen-field-Enable"]').check({force:true});

        notification.pressCommentButton();
        notification.sendComment(
            "Task",
            "testcase comments"
        );
        cy.xpath("//button[text()[normalize-space()='New Submit']]").click();
        request.verifyTaskIsCompletedB();
        cy.wait(2000);

        //Complete the task reactions
        request.openRequestById(requestId);
        request.waitUntilElementIsVisible('selector', '#pending >* td:nth-child(1) >a[href^="/tasks"]');
        notification.pressCommentButton();
        cy.get('[class="pan-cmt-cont-item-icons-display-button"]').eq(2).should('be.visible').click();
        let m = notificationSelectors.textareaComments;
        cy.xpath(m).should("be.visible");
        cy.xpath(m).type('Edit message');
        notification.pressOptionComment('task', "Reply");

        request.clickOnTaskName(1, 1);
        cy.get('[data-cy="screen-field-CommentType"]').should('be.visible');
        cy.get('.form-group > .btn').click();
        request.verifyTaskIsCompletedB();
        cy.wait(2000);

        //Complete the task voting
        request.openRequestById(requestId);
        request.waitUntilElementIsVisible('selector', '#pending >* td:nth-child(1) >a[href^="/tasks"]');
        notification.pressCommentButton();
        request.clickOnTaskName(1, 1);
        cy.get('[data-cy="screen-field-CommentType"]').should('be.visible');
        cy.xpath("//button[text()[normalize-space()='New Submit']]").click();
        request.verifyTaskIsCompletedB();
        cy.wait(2000);

        //Complete the task Edit
        request.openRequestById(requestId);
        request.waitUntilElementIsVisible('selector', '#pending >* td:nth-child(1) >a[href^="/tasks"]');
        notification.pressCommentButton();
        cy.get('[class="pan-cmt-cont-item-icons-display-button"]').eq(0)
            .should('be.visible')
            .click();
        cy.xpath(notificationSelectors.textareaComments).clear();
        m = notificationSelectors.textareaComments;
        cy.xpath(m).type('Edit message');
        notification.pressOptionComment('task', "Edit");
        request.clickOnTaskName(1, 1);
        cy.xpath("//button[text()[normalize-space()='New Submit']]").click();
        request.verifyTaskIsCompletedB();
        cy.wait(2000);

        //Complete the task delete
        request.openRequestById(requestId);
        request.waitUntilElementIsVisible('selector', '#pending >* td:nth-child(1) >a[href^="/tasks"]');
        notification.pressCommentButton();
        cy.get('[class="pan-cmt-cont-item-icons-display-button"]').eq(1)
            .should('be.visible')
            .click();
        cy.xpath("//button[text()='Confirm']").should('be.visible').click();
        cy.wait(4000);
        request.clickOnTaskName(1, 1);
        cy.xpath("//button[text()[normalize-space()='New Submit']]").should('be.visible').click();
        request.verifyRequestisCompleted(requestId);
    }

    actionsAndAssertionsOfTCP42404(requestId){
        //Step 1: Complete the form 1
        cy.xpath("//button[@data-cy = 'add-row']").should('be.visible');
        cy.wait(2000);
        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("1");
        cy.get('input[type="file"]').attachFile('images/1.jfif');
        cy.xpath('//span[contains(text(),"success")]').should('exist');
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("2");
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should('not.exist');
        cy.get('input[type="file"]').attachFile('images/2.jfif');
        cy.xpath('//span[contains(text(),"success")]').should('exist');
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("3");
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should('not.exist');
        cy.get('input[type="file"]').attachFile('images/3.jfif');
        cy.xpath('//span[contains(text(),"success")]').should('exist');
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("4");
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should('not.exist');
        cy.get('input[type="file"]').attachFile('images/4.jfif');
        cy.xpath('//span[contains(text(),"success")]').should('exist');
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("5");
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should('not.exist');
        cy.get('input[type="file"]').attachFile('images/5.jfif');
        cy.xpath('//span[contains(text(),"success")]').should('exist');
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("6");
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should('not.exist');
        cy.get('input[type="file"]').attachFile('images/6.jfif');
        cy.xpath('//span[contains(text(),"success")]').should('exist');
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("7");
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should('not.exist');
        cy.get('input[type="file"]').attachFile('images/7.png');
        cy.xpath('//span[contains(text(),"success")]').should('exist');
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("8");
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should('not.exist');
        cy.get('input[type="file"]').attachFile('images/8.jfif');
        cy.xpath('//span[contains(text(),"success")]').should('exist');
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("9");
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should('not.exist');
        cy.get('input[type="file"]').attachFile('images/9.jfif');
        cy.xpath('//span[contains(text(),"success")]').should('exist');
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("10");
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should('not.exist');
        cy.get('input[type="file"]').attachFile('images/10.jfif');
        cy.xpath('//span[contains(text(),"success")]').should('exist');
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("11");
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should('not.exist');
        cy.get('input[type="file"]').attachFile('images/11.jfif');
        cy.xpath('//span[contains(text(),"success")]').should('exist');
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("12");
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should('not.exist');
        cy.get('input[type="file"]').attachFile('images/12.jfif');
        cy.xpath('//span[contains(text(),"success")]').should('exist');
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("13");
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should('not.exist');
        cy.get('input[type="file"]').attachFile('images/13.jfif');
        cy.xpath('//span[contains(text(),"success")]').should('exist');
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("14");
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should('not.exist');
        cy.get('input[type="file"]').attachFile('images/14.jfif');
        cy.xpath('//span[contains(text(),"success")]').should('exist');
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("15");
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should('not.exist');
        cy.get('input[type="file"]').attachFile('images/15.jfif');
        cy.xpath('//span[contains(text(),"success")]').should('exist');
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("16");
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should('not.exist');
        cy.get('input[type="file"]').attachFile('images/16.jfif');
        cy.xpath('//span[contains(text(),"success")]').should('exist');
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("17");
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should('not.exist');
        cy.get('input[type="file"]').attachFile('images/17.jfif');
        cy.xpath('//span[contains(text(),"success")]').should('exist');
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("18");
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should('not.exist');
        cy.get('input[type="file"]').attachFile('images/18.jfif');
        cy.xpath('//span[contains(text(),"success")]').should('exist');
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("19");
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should('not.exist');
        cy.get('input[type="file"]').attachFile('images/19.jfif');
        cy.xpath('//span[contains(text(),"success")]').should('exist');
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("20");
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should('not.exist');
        cy.get('input[type="file"]').attachFile('images/20.jfif');
        cy.xpath('//span[contains(text(),"success")]').should('exist');
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("21");
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should('not.exist');
        cy.get('input[type="file"]').attachFile('images/21.jfif');
        cy.xpath('//span[contains(text(),"success")]').should('exist');
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("22");
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should('not.exist');
        cy.get('input[type="file"]').attachFile('images/22.jfif');
        cy.xpath('//span[contains(text(),"success")]').should('exist');
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("23");
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should('not.exist');
        cy.get('input[type="file"]').attachFile('images/23.jfif');
        cy.xpath('//span[contains(text(),"success")]').should('exist');
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("24");
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should('not.exist');
        cy.get('input[type="file"]').attachFile('images/24.jfif');
        cy.xpath('//span[contains(text(),"success")]').should('exist');
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("25");
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should('not.exist');
        cy.get('input[type="file"]').attachFile('images/25.jfif');
        cy.xpath('//span[contains(text(),"success")]').should('exist');
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("26");
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should('not.exist');
        cy.get('input[type="file"]').attachFile('images/26.jfif');
        cy.xpath('//span[contains(text(),"success")]').should('exist');
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("27");
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should('not.exist');
        cy.get('input[type="file"]').attachFile('images/27.jfif');
        cy.xpath('//span[contains(text(),"success")]').should('exist');
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("28");
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should('not.exist');
        cy.get('input[type="file"]').attachFile('images/28.jfif');
        cy.xpath('//span[contains(text(),"success")]').should('exist');
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("29");
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should('not.exist');
        cy.get('input[type="file"]').attachFile('images/29.jfif');
        cy.xpath('//span[contains(text(),"success")]').should('exist');
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("30");
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should('not.exist');
        cy.get('input[type="file"]').attachFile('images/30.jfif');
        cy.xpath('//span[contains(text(),"success")]').should('exist');
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.wait(2000);
        cy.xpath("//button[@aria-label='New Submit']").click();
        request.verifyTaskIsCompletedB();

        //Step 2: Open by request id
        request.openRequestById(requestId);
        request.waitUntilElementIsVisible('selector', '#pending >* td:nth-child(1) >a[href^="/tasks"]');
        request.clickOnTaskName(1, 1);

        //Step 3: Complete the form 2
        cy.xpath("//button[@aria-label='New Submit']").should('exist');
        cy.xpath("//button[@aria-label='New Submit']").click();

        //Step 4: Open the request completed
        request.verifyRequestisCompleted(requestId);

        cy.xpath("//td[text()='upload_documents_grid_cash_drawer_setup.0.name']").should('exist');
        cy.xpath("//td[text()='upload_documents_grid_cash_drawer_setup.1.name']").should('exist');
        cy.xpath("//td[text()='upload_documents_grid_cash_drawer_setup.2.name']").should('exist');
        cy.xpath("//td[text()='upload_documents_grid_cash_drawer_setup.3.name']").should('exist');
        cy.xpath("//td[text()='upload_documents_grid_cash_drawer_setup.4.name']").should('exist');
        cy.xpath("//td[text()='upload_documents_grid_cash_drawer_setup.5.name']").should('exist');
        cy.xpath("//td[text()='upload_documents_grid_cash_drawer_setup.6.name']").should('exist');
        cy.xpath("//td[text()='upload_documents_grid_cash_drawer_setup.7.name']").should('exist');
        cy.xpath("//td[text()='upload_documents_grid_cash_drawer_setup.8.name']").should('exist');
        cy.xpath("//td[text()='upload_documents_grid_cash_drawer_setup.9.name']").should('exist');
        cy.xpath("//td[text()='upload_documents_grid_cash_drawer_setup.10.name']").should('exist');
        cy.xpath("//td[text()='upload_documents_grid_cash_drawer_setup.11.name']").should('exist');
        cy.xpath("//td[text()='upload_documents_grid_cash_drawer_setup.12.name']").should('exist');
        cy.xpath("//td[text()='upload_documents_grid_cash_drawer_setup.13.name']").should('exist');
        cy.xpath("//td[text()='upload_documents_grid_cash_drawer_setup.14.name']").should('exist');
        cy.xpath("//td[text()='upload_documents_grid_cash_drawer_setup.15.name']").should('exist');
        cy.xpath("//td[text()='upload_documents_grid_cash_drawer_setup.16.name']").should('exist');
        cy.xpath("//td[text()='upload_documents_grid_cash_drawer_setup.17.name']").should('exist');
        cy.xpath("//td[text()='upload_documents_grid_cash_drawer_setup.18.name']").should('exist');
        cy.xpath("//td[text()='upload_documents_grid_cash_drawer_setup.19.name']").should('exist');
        cy.xpath("//td[text()='upload_documents_grid_cash_drawer_setup.20.name']").should('exist');
        cy.xpath("//td[text()='upload_documents_grid_cash_drawer_setup.21.name']").should('exist');
        cy.xpath("//td[text()='upload_documents_grid_cash_drawer_setup.22.name']").should('exist');
        cy.xpath("//td[text()='upload_documents_grid_cash_drawer_setup.23.name']").should('exist');
        cy.xpath("//td[text()='upload_documents_grid_cash_drawer_setup.24.name']").should('exist');
        cy.xpath("//td[text()='upload_documents_grid_cash_drawer_setup.25.name']").should('exist');
        cy.xpath("//td[text()='upload_documents_grid_cash_drawer_setup.26.name']").should('exist');
        cy.xpath("//td[text()='upload_documents_grid_cash_drawer_setup.27.name']").should('exist');
        cy.xpath("//td[text()='upload_documents_grid_cash_drawer_setup.28.name']").should('exist');
        cy.xpath("//td[text()='upload_documents_grid_cash_drawer_setup.29.name']").should('exist');

        cy.xpath("//div[text()[normalize-space() = 'Admin User has completed the task AA']]").should('exist');
        cy.xpath("//div[text()[normalize-space() = 'Admin User has completed the task BB']]").should('exist');
    }

    actionsAndAssertionsOfTCP42138(processId) {
        //go to url
        cy.visit('/webentry/' + processId + '/node_1');
        //verify screen name

        cy.xpath("//button[text()[normalize-space()='Add']]").click();
        cy.xpath('(//input[@data-cy="screen-field-input1"])[1]').type('Recordlist1 input1');
        cy.xpath('(//textarea[@name="textArea1"])[1]').type('Recordlist1 textarea1',{delay:100});
        cy.wait(2000);
        cy.xpath("//button[text()='Ok']").click();

        //second recordlist
        cy.xpath("//button[text()[normalize-space()='Add']]").click();
        cy.xpath('(//input[@data-cy="screen-field-input1"])[1]').type('Recordlist2 input1');
        cy.xpath('(//textarea[@name="textArea1"])[1]').type('Recordlist2 textarea1', {delay:100});
        cy.wait(2000);
        cy.xpath("//button[text()='Ok']").click();

        //third recordlist
        cy.xpath("//button[text()[normalize-space()='Add']]").click();
        cy.xpath('(//input[@data-cy="screen-field-input1"])[1]').type('Recordlist3 input1');
        cy.xpath('(//textarea[@name="textArea1"])[1]').type('Recordlist3 textarea1',{delay:100});
        cy.wait(2000);
        cy.xpath("//button[text()='Ok']").click();
        //first loop
        cy.get('[name="input2"]').type('loop1 input2');
        cy.get('[name="textArea2"]').type('loop1 input2',{delay:100});
        cy.wait(2000);
        cy.get('[class="fas fa-plus"]').click();
        //second loop
        cy.xpath('(//input[@name="input2"])[2]').type('loop2 input2');
        cy.xpath('(//textarea[@name="textArea2"])[2]').type('loop2 input2',{delay:100});
        cy.wait(2000);
        cy.get('[class="fas fa-plus"]').click();
        //third loop
        cy.xpath('(//input[@name="input2"])[3]').type('loop3 input2');
        cy.xpath('(//textarea[@name="textArea2"])[3]').type('loop3 input2',{delay:100});
        cy.wait(2000);
        cy.get('[class="fas fa-plus"]').click();
        //fourth loop
        cy.xpath('(//input[@name="input2"])[4]').type('loop4 input2');
        cy.xpath('(//textarea[@name="textArea2"])[4]').type('loop4 input2',{delay:100});
        cy.wait(2000);
        cy.xpath("//button[normalize-space(text())='New Submit']").click();
        cy.wait(3000);

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

            cy.xpath('(//div[@class="multiselect__select"])[1]').should('be.visible');
            cy.xpath('(//div[@class="multiselect__select"])[1]').click();
            cy.xpath("//li//span[text()='Recordlist1 input1']").should('be.visible');
            cy.xpath("//li//span[text()='Recordlist2 input1']").should('be.visible');
            cy.xpath("//li//span[text()='Recordlist3 input1']").should('be.visible');
            cy.xpath("//li//span[text()='Recordlist2 input1']").click();
            cy.xpath('(//div[@class="multiselect__select"])[2]').click();
            cy.xpath("//li//span[text()='Recordlist1 textarea1']").should('be.visible');
            cy.xpath("//li//span[text()='Recordlist2 textarea1']").should('be.visible');
            cy.xpath("//li//span[text()='Recordlist3 textarea1']").should('be.visible');
            cy.xpath("//li//span[text()='Recordlist2 textarea1']").click();
            cy.xpath('(//div[@class="multiselect__select"])[3]').click();
            cy.xpath("//li//span[contains(text(),'2022')]").should('be.visible');
            cy.xpath("//li//span[contains(text(),'2022')]").should('be.visible');
            cy.xpath("//li//span[contains(text(),'2022')]").should('be.visible');
            cy.get('[data-cy="screen-field-selectRecoverDate"]>* input').type('{enter}');
            cy.xpath('(//div[@class="multiselect__select"])[4]').click();
            cy.xpath("//li//span[contains(text(),'2022-07-13T')]").should('be.visible');
            cy.xpath("//li//span[contains(text(),'2022-07-13T')]").should('be.visible');
            cy.xpath("//li//span[contains(text(),'2022-07-13T')]").should('be.visible');
            cy.get('[data-cy="screen-field-selectRecoverDateTime"]>* input').type('{enter}');
            cy.xpath('(//div[@class="multiselect__select"])[5]').click();
            cy.xpath("//li//span[text()='loop1 input2']").should('be.visible');
            cy.xpath("//li//span[text()='loop2 input2']").should('be.visible');
            cy.xpath("//li//span[text()='loop3 input2']").should('be.visible');
            cy.xpath("//li//span[text()='loop4 input2']").should('be.visible');
                cy.get('[data-cy="screen-field-selectRecoverInput1"]>* input').eq(0).type('{enter}')
            cy.xpath('(//div[@class="multiselect__select"])[6]').click();
            cy.xpath("//li//span[text()='loop1 input2']").should('be.visible');
            cy.xpath("//li//span[text()='loop2 input2']").should('be.visible');
            cy.xpath("//li//span[text()='loop3 input2']").should('be.visible');
                cy.get('[data-cy="screen-field-selectRecoverTextarea1"]>* input').eq(0).type('{enter}');
            cy.xpath('(//div[@class="multiselect__select"])[7]').click();
            cy.xpath('//li//span[text()="2022-07-01"]').should('be.visible');
            cy.xpath('//li//span[text()="2022-07-01"]').should('be.visible');
            cy.xpath('//li//span[text()="2022-07-01"]').should('be.visible');
            cy.xpath('//li//span[text()="2022-07-01"]').should('be.visible');
                cy.get('[data-cy="screen-field-selectRecoverDate1"]>* input').type('{enter}');
            cy.xpath('(//div[@class="multiselect__select"])[8]').click();
            cy.xpath('//li//span[contains(text(),"2022-07-13T")]').should('be.visible');
            cy.xpath("//li//span[contains(text(),'2022-07-13T')]").should('be.visible');
            cy.xpath("//li//span[contains(text(),'2022-07-13T')]").should('be.visible');
            cy.xpath("//li//span[contains(text(),'2022-07-13T')]").should('be.visible');
                cy.get('[data-cy="screen-field-selectRecoverDateTime1"]>* input').type('{enter}');
            cy.get('[data-cy="loop-loop_3-add"]').click();
            cy.xpath('(//div[@class="multiselect__select"])[9]').click();
            cy.xpath("//li//span[text()='loop1 input2']").should('be.visible');
            cy.xpath("//li//span[text()='loop2 input2']").should('be.visible');
            cy.xpath("//li//span[text()='loop3 input2']").should('be.visible');
            cy.xpath("//li//span[text()='loop4 input2']").should('be.visible');
                cy.get('[data-cy="screen-field-selectRecoverInput1"]>* input').eq(1).type('{enter}');
            cy.xpath('(//div[@class="multiselect__select"])[10]').click();
            cy.xpath("//li//span[text()='loop1 input2']").should('be.visible');
            cy.xpath("//li//span[text()='loop2 input2']").should('be.visible');
            cy.xpath("//li//span[text()='loop3 input2']").should('be.visible');
            cy.xpath("//li//span[text()='loop4 input2']").should('be.visible');
                cy.get('[data-cy="screen-field-selectRecoverTextarea1"]>* input').eq(1).type('{enter}');
            cy.xpath('(//div[@class="multiselect__select"])[11]').click();
            cy.xpath('//li//span[text()="2022-07-01"]').should('be.visible');
            cy.xpath('//li//span[text()="2022-07-01"]').should('be.visible');
            cy.xpath('//li//span[text()="2022-07-01"]').should('be.visible');
            cy.xpath('//li//span[text()="2022-07-01"]').should('be.visible');
                cy.get('[data-cy="screen-field-selectRecoverDate1"]>* input').eq(1).type('{enter}');
            cy.xpath('(//div[@class="multiselect__select"])[12]').click();
            cy.xpath('//li//span[contains(text(),"2022-07-13T")]').should('be.visible');
            cy.xpath("//li//span[contains(text(),'2022-07-13T')]").should('be.visible');
            cy.xpath("//li//span[contains(text(),'2022-07-13T')]").should('be.visible');
            cy.xpath("//li//span[contains(text(),'2022-07-13T')]").should('be.visible');
                cy.get('[data-cy="screen-field-selectRecoverDateTime1"]>* input').eq(1).type('{enter}');
            cy.get('[data-cy="loop-loop_3-add"]').click();
            cy.xpath('(//div[@class="multiselect__select"])[13]').click();
            cy.xpath("//li//span[text()='loop1 input2']").should('be.visible');
            cy.xpath("//li//span[text()='loop2 input2']").should('be.visible');
            cy.xpath("//li//span[text()='loop3 input2']").should('be.visible');
            cy.xpath("//li//span[text()='loop4 input2']").should('be.visible');
                cy.get('[data-cy="screen-field-selectRecoverInput1"]>* input').eq(2).type('{enter}');
            cy.xpath('(//div[@class="multiselect__select"])[14]').click();
            cy.xpath("//li//span[text()='loop1 input2']").should('be.visible');
            cy.xpath("//li//span[text()='loop2 input2']").should('be.visible');
            cy.xpath("//li//span[text()='loop3 input2']").should('be.visible');
            cy.xpath("//li//span[text()='loop4 input2']").should('be.visible');
                cy.get('[data-cy="screen-field-selectRecoverTextarea1"]>* input').eq(2).type('{enter}');
            cy.xpath('(//div[@class="multiselect__select"])[15]').click();
            cy.xpath('//li//span[text()="2022-07-01"]').should('be.visible');
            cy.xpath('//li//span[text()="2022-07-01"]').should('be.visible');
            cy.xpath('//li//span[text()="2022-07-01"]').should('be.visible');
            cy.xpath('//li//span[text()="2022-07-01"]').should('be.visible');
                cy.get('[data-cy="screen-field-selectRecoverDate1"]>* input').eq(2).type('{enter}');
            cy.xpath('(//div[@class="multiselect__select"])[16]').click();
            cy.xpath('//li//span[contains(text(),"2022-07-13T")]').should('be.visible');
            cy.xpath("//li//span[contains(text(),'2022-07-13T')]").should('be.visible');
            cy.xpath("//li//span[contains(text(),'2022-07-13T')]").should('be.visible');
            cy.xpath("//li//span[contains(text(),'2022-07-13T')]").should('be.visible');
                cy.get('[data-cy="screen-field-selectRecoverDateTime1"]>* input').eq(2).type('{enter}');
            //last loop
            cy.get('[data-cy="loop-loop_3-add"]').click();
            cy.xpath('(//div[@class="multiselect__select"])[17]').click();
            cy.xpath("//li//span[text()='loop1 input2']").should('be.visible');
            cy.xpath("//li//span[text()='loop2 input2']").should('be.visible');
            cy.xpath("//li//span[text()='loop3 input2']").should('be.visible');
            cy.xpath("//li//span[text()='loop4 input2']").should('be.visible');
                cy.get('[data-cy="screen-field-selectRecoverInput1"]>* input').eq(3).type('{enter}');
            cy.xpath('(//div[@class="multiselect__select"])[18]').click();
            cy.xpath("//li//span[text()='loop1 input2']").should('be.visible');
            cy.xpath("//li//span[text()='loop2 input2']").should('be.visible');
            cy.xpath("//li//span[text()='loop3 input2']").should('be.visible');
            cy.xpath("//li//span[text()='loop4 input2']").should('be.visible');
                cy.get('[data-cy="screen-field-selectRecoverTextarea1"]>* input').eq(3).type('{enter}');
            cy.xpath('(//div[@class="multiselect__select"])[19]').click();
            cy.xpath('//li//span[text()="2022-07-01"]').should('be.visible');
            cy.xpath('//li//span[text()="2022-07-01"]').should('be.visible');
            cy.xpath('//li//span[text()="2022-07-01"]').should('be.visible');
            cy.xpath('//li//span[text()="2022-07-01"]').should('be.visible');
                cy.get('[data-cy="screen-field-selectRecoverDate1"]>* input').eq(3).type('{enter}');
            cy.xpath('(//div[@class="multiselect__select"])[20]').click();
            cy.xpath('//li//span[contains(text(),"2022-07-13T")]').should('be.visible');
            cy.xpath("//li//span[contains(text(),'2022-07-13T')]").should('be.visible');
            cy.xpath("//li//span[contains(text(),'2022-07-13T')]").should('be.visible');
            cy.xpath("//li//span[contains(text(),'2022-07-13T')]").should('be.visible');
                cy.get('[data-cy="screen-field-selectRecoverDateTime1"]>* input').eq(3).type('{enter}');
            cy.xpath("//button[text()[normalize-space()='New Submit']]").click();
            request.verifyRequestisCompleted(requestId);
        });
    }

    actionsAndAssertionsOfTCP42065(requestId){
        cy.wait(9000);
        cy.xpath('//label[text()="accepted"]/following::input[1]').type('10');
        cy.xpath('//button[@class="btn input-submit btn-link"]').click();
        cy.xpath('//div[text()[normalize-space()="The accepted must be accepted."]]')
            .should('be.visible');

        cy.xpath('//label[text()="accepted"]/following::input[1]').clear().type('test');
        cy.xpath('//button[@class="btn input-submit btn-link"]').click();
        cy.xpath('//div[text()[normalize-space()="The accepted must be accepted."]]')
            .should('be.visible');

        cy.xpath('//label[text()="accepted"]/following::input[1]').clear().type('yes');
        cy.xpath('//button[@class="btn input-submit btn-link"]').click();
        cy.xpath('//div[text()[normalize-space()="yes"]]').should('be.visible')

        //date -after date
        cy.xpath('//label[text()="date - after date"]/following::input[1]').type('2020-10-10');
        cy.xpath('//button[@class="btn input-submit btn-link"]').click();
        cy.xpath('//div[text()[normalize-space()="The date - after date must be after 2020-10-10."]]')
            .should('be.visible');

        cy.xpath('//label[text()="date - after date"]/following::input[1]').clear().type('2018-08-19');
        cy.xpath('//button[@class="btn input-submit btn-link"]').click();
        cy.xpath('//div[text()[normalize-space()="The date - after date must be after 2020-10-10."]]')
            .should('be.visible');

        cy.xpath('//label[text()="date - after date"]/following::input[1]').clear().type('2020-10-11');
        cy.xpath('//button[@class="btn input-submit btn-link"]').click();
        cy.xpath('//div[text()[normalize-space()="2020-10-11"]]').should('be.visible');

        //datetime - After or Equal To Date

        cy.xpath('//label[text()="datetime - After or Equal To Date"]/following::input[1]').type('2018-08-19');
        cy.xpath('//button[@class="btn input-submit btn-link"]').click();
        cy.xpath('//div[text()[normalize-space()="The datetime - After or Equal To Date must be equal or after 2020-10-10."]]')
            .should('be.visible');

        cy.xpath('//label[text()="datetime - After or Equal To Date"]/following::input[1]').clear().type('2021-10-10');
        cy.xpath('//button[@class="btn input-submit btn-link"]').click();
        cy.xpath('//div[text()[normalize-space()="2021-10-10"]]')
            .should('be.visible');

        //test alpha
        cy.xpath('//label[text()="text - Alpha"]/following::input[1]').type('@#sad');
        cy.xpath('//button[@class="btn input-submit btn-link"]').click();
        cy.xpath('//div[text()[normalize-space()="The text - Alpha field must contain only alphabetic characters."]]')
            .should('be.visible');

        cy.xpath('//label[text()="text - Alpha"]/following::input[1]').clear().type('12');
        cy.xpath('//button[@class="btn input-submit btn-link"]').click();
        cy.xpath('//div[text()[normalize-space()="The text - Alpha field must contain only alphabetic characters."]]')
            .should('be.visible');

        cy.xpath('//label[text()="text - Alpha"]/following::input[1]').clear().type('testcase');
        cy.xpath('//button[@class="btn input-submit btn-link"]').click();
        cy.xpath('//div[text()[normalize-space()="testcase"]]')
            .should('be.visible');

        //integer-alpha numeric

        cy.xpath('//label[text()="integer - Alpha numeric"]/following::input[1]').type('@!A');
        cy.xpath('//button[@class="btn input-submit btn-link"]').click();
        cy.xpath('//div[text()[normalize-space()="The integer - Alpha numeric field must be alphanumeric."]]')
            .should('be.visible');

        cy.xpath('//label[text()="integer - Alpha numeric"]/following::input[1]').clear().type('123456789');
        cy.xpath('//button[@class="btn input-submit btn-link"]').click();
        cy.xpath('//div[text()[normalize-space()="123456789"]]')
            .should('be.visible');

        ///date before date

        cy.xpath('//label[text()="date - before date"]/following::input[1]').type('2020-10-10');
        cy.xpath('//button[@class="btn input-submit btn-link"]').click();
        cy.xpath('//div[text()[normalize-space()="The date - before date must be before 2020-10-10."]]').should('be.visible');

        cy.xpath('//label[text()="date - before date"]/following::input[1]').clear().type('2021-08-09');
        cy.xpath('//button[@class="btn input-submit btn-link"]').click();
        cy.xpath('//div[text()[normalize-space()="The date - before date must be before 2020-10-10."]]').should('be.visible');

        cy.xpath('//label[text()="date - before date"]/following::input[1]').clear().type('2019-12-12');
        cy.xpath('//button[@class="btn input-submit btn-link"]').click();
        cy.xpath('//div[text()[normalize-space()="2019-12-12"]]').should('be.visible');

        //DateTime-before or equal to date

        cy.xpath('//span[text()="dateTime - Before or Equal to Date"]/following::input[1]').type('2020-12-12');
        cy.xpath('//button[@class="btn input-submit btn-link"]').click();
        cy.xpath('//div[text()[normalize-space()="The dateTime - Before or Equal to Date must be equal or before 2020-10-10."]]')
            .should('be.visible');

        cy.xpath('//span[text()="dateTime - Before or Equal to Date"]/following::input[1]').clear().type('2010-10-10');
        cy.xpath('//button[@class="btn input-submit btn-link"]').click();
        cy.xpath('//div[text()[normalize-space()="2010-10-10"]]').should('be.visible');

        // text Between Min & Max 3 - 8

        cy.xpath('//span[text()="text Between Min & Max 3 - 8"]/following::input[1]').type('testlimhng');
        cy.xpath('//button[@class="btn input-submit btn-link"]').click();
        cy.xpath('//div[text()[normalize-space()="Must have a value between 3,8"]]')
            .should('be.visible');

        cy.xpath('//span[text()="text Between Min & Max 3 - 8"]/following::input[1]').clear().type('qe');
        cy.xpath('//button[@class="btn input-submit btn-link"]').click();
        cy.xpath('//div[text()[normalize-space()="Must have a value between 3,8"]]')
            .should('be.visible');

        cy.xpath('//span[text()="text Between Min & Max 3 - 8"]/following::input[1]').clear().type('3');
        cy.xpath('//button[@class="btn input-submit btn-link"]').click();
        cy.xpath('//div[text()[normalize-space()="3"]]').should('be.visible');

        //date date

        cy.xpath('//span[text()="date Date"]/following::input[1]').type('1234-9')
        cy.xpath('//button[@class="btn input-submit btn-link"]').click();
        cy.xpath('//div[text()[normalize-space()="The date Date must be a valid date."]]')
            .should('be.visible');

        cy.xpath('//span[text()="date Date"]/following::input[1]').clear().type('1998-10-10');
        cy.xpath('//button[@class="btn input-submit btn-link"]').click();
        cy.xpath('//div[text()[normalize-space()="1998-10-10"]]').should('be.visible');

        //test email

        cy.xpath('//span[text()="text email"]/following::input[1]').type('abcd@user');
        cy.xpath('//button[@class="btn input-submit btn-link"]').click();
        cy.xpath('//div[text()[normalize-space()="The text email format is invalid."]]')
            .should('be.visible');

        cy.xpath('//span[text()="text email"]/following::input[1]').clear().type('erth4436@gmail.com');
        cy.xpath('//button[@class="btn input-submit btn-link"]').click();
        cy.xpath('//div[text()[normalize-space()="erth4436@gmail.com"]]').should('be.visible');

        //Integer IN 9

        cy.xpath('//span[text()="integer - IN - 8"]/following::input[1]').type('21');
        cy.xpath('//button[@class="btn input-submit btn-link"]').click();
        cy.xpath('//div[text()[normalize-space()="The selected integer - IN - 8 is invalid."]]')
            .should('be.visible');

        cy.xpath('//span[text()="integer - IN - 8"]/following::input[1]').clear().type('8');
        cy.xpath('//button[@class="btn input-submit btn-link"]').click();
        cy.xpath('//div[text()[normalize-space()="8"]]').should('be.visible');

        //password

        cy.xpath('//span[text()="password - Max Length7"]/following::input[1]').type('admin12');
        cy.xpath('//button[@class="btn input-submit btn-link"]').click();
        cy.xpath('//div[text()[normalize-space()="admin12"]]').should('be.visible');

        //integer min-length4
        cy.xpath('//span[text()="integer - min length 4"]/following::input[1]').type('12');
        cy.xpath('//button[@class="btn input-submit btn-link"]').click();
        cy.xpath("//div[text()[normalize-space()='The integer - min length 4 must be at least 4 characters.']]").should('be.visible');
        cy.xpath('//span[text()="integer - min length 4"]/following::input[1]').clear().type('12345');
        cy.xpath('//button[@class="btn input-submit btn-link"]').click();
        cy.xpath('//div[text()[normalize-space()="12345"]]').should('be.visible');

        //text not in 5

        cy.xpath('//span[text()="text - not in 5"]/following::input[1]').type('5');
        cy.xpath('//button[@class="btn input-submit btn-link"]').click();
        cy.xpath('//div[text()[normalize-space()="The selected text - not in 5 is invalid."]]').should('be.visible');

        cy.xpath('//span[text()="text - not in 5"]/following::input[1]').clear().type('3');
        cy.xpath('//button[@class="btn input-submit btn-link"]').click();
        cy.xpath('//div[text()[normalize-space()="3"]]').should('be.visible');

        // regex(hello)

        cy.xpath('//span[text()="regex(hello)"]/following::input[1]').type('hello');
        cy.xpath('//button[@class="btn input-submit btn-link"]').click();
        cy.xpath('//div[text()[normalize-space()="hello"]]').should('be.visible');

        //required
        cy.xpath('//label[text()="required"]/following::input[1]').type('yes');
        cy.xpath('//button[@class="btn input-submit btn-link"]').click();
        // required if

        cy.xpath('//span[text()="required if"]/following::input[1]').type('test');
        cy.xpath('//button[@class="btn input-submit btn-link"]').click();
        cy.xpath('//div[text()[normalize-space()="test"]]').should('be.visible');

        //required unless

        cy.xpath('//span[text()="required Unless"]/following::input[1]').type('test case required unless');
        cy.xpath('//button[@class="btn input-submit btn-link"]').click();
        cy.xpath('//div[text()[normalize-space()="test case required unless"]]').should('be.visible');

        //same before
        cy.xpath('//span[text()="same before"]/following::input[1]').type('test');
        cy.xpath('//button[@class="btn input-submit btn-link"]').click();
        cy.xpath("//div[text()[normalize-space()='The same before and accepted fields must match.']]").should('be.visible');
        cy.xpath('//span[text()="same before"]/following::input[1]').clear().type('yes');
        cy.xpath('//button[@class="btn input-submit btn-link"]').click();
        cy.xpath('//div[text()[normalize-space()="yes"]]').should('be.visible');

        //URL
        cy.xpath('//span[text()="URL"]/following::input[1]').type('yes');
        cy.xpath('//button[@class="btn input-submit btn-link"]').click();
        cy.xpath('//div[text()[normalize-space()="The URL format is invalid."]]').should('be.visible');

        cy.xpath('//span[text()="URL"]/following::input[1]').clear().type('https://ecosia.org');
        cy.xpath('//button[@class="btn input-submit btn-link"]').click();

        //request.verifyTaskIsCompleted();
        cy.wait(4000);
        request.verifyRequestisCompleted(requestId);
    }
    actionsAndAssertionsOfTCP42134(requestId){
        //select  option 1
        cy.get('[data-cy="screen-field-optionTest"]').should('be.visible').click();
        cy.get('[data-cy="screen-field-optionTest"]>* input').type('three').should('have.value','three');
        cy.wait(2000);
        cy.get('[data-cy="screen-field-optionTest"]>* input').type('{enter}');
        cy.get('[class="form-control"]').should('have.value','three');

        //select option 2
        cy.get('[data-cy="screen-field-optionTest"]').click();
        cy.get('[data-cy="screen-field-optionTest"]>* input').type('one').should('have.value','one');
        cy.wait(2000);
        cy.get('[data-cy="screen-field-optionTest"]>* input').type('{enter}');
        cy.xpath('(//input[@class="form-control"])[2]').should('have.value','one');

        //select option 3
        cy.get('[data-cy="screen-field-optionTest"]').click();
        cy.get('[data-cy="screen-field-optionTest"]>* input').type('two').should('have.value','two');
        cy.wait(2000);
        cy.get('[data-cy="screen-field-optionTest"]>* input').type('{enter}');
        cy.xpath('(//input[@class="form-control"])[3]').should('have.value','two');

        //verify selectlist selected option visible or not
        cy.xpath("//span[@class='multiselect__tag'][1]/span").should('contain','three');
        cy.xpath("//span[@class='multiselect__tag'][2]/span").should('contain','one');
        cy.xpath("//span[@class='multiselect__tag'][3]/span").should('contain','two');
        cy.xpath("(//i[@class='fas fa-plus'])[2]").should('exist');
        cy.xpath("(//i[@class='fas fa-minus'])[1]").should('exist');
        cy.xpath("//button[@class='btn btn-primary']").click();

        //request.verifyTaskIsCompleted();
        request.verifyTaskIsCompletedB();
    }
    actionsAndAssertionsOfTCP42413(requestId) {
        cy.xpath("(//button[@data-cy='add-row'])[4]").should('be.visible');
        cy.xpath("(//button[@data-cy='add-row'])[5]").should('be.visible');
        cy.xpath("(//button[@data-cy='add-row'])[6]").should('be.visible');
        cy.xpath("//input[@name='aa']").click();
        cy.xpath("(//button[@data-cy='add-row'])[1]").should('be.visible');
        //click on checkbox cc
        cy.xpath("//input[@name='cc']").click();
        cy.xpath("(//button[@data-cy='add-row'])[3]").should('be.visible');
        //click On Checkbox ee
        cy.xpath("//input[@name='ee']").click();
        cy.xpath("(//button[@data-cy='add-row'])[5]").should('not.be.visible');
        //add record to recordlist 1
        cy.xpath("(//button[@data-cy='add-row'])[1]").click();
        cy.xpath("//li[@id='option-0-0']/span[1]/ancestor::div[@name='Verify Record Lists and Visibility a']//label").click();
        cy.xpath("//li[@id='option-0-0']/span[1]/ancestor::div[@name='Verify Record Lists and Visibility a']//div[@class='multiselect__tags']").click();
        cy.xpath("//li[@id='option-0-0']/span[1]").should('be.visible');
        cy.xpath("//li[@id='option-0-0']/span[1]").click();
        cy.xpath("(//button[text()='Ok'])[1]").click();
        //add record to record list 2
        cy.xpath("(//button[normalize-space(text())='Add'])[3]").click();
        cy.xpath("//li[@id='option-4-1']/span[1]/ancestor::div[@name='Verify Record Lists and Visibility a']//label").click();
        cy.xpath("//li[@id='option-4-1']/span[1]/ancestor::div[@name='Verify Record Lists and Visibility a']//div[@class='multiselect__tags']").click();
        cy.xpath("//li[@id='option-4-1']/span[1]").should('be.visible');
        cy.xpath("//li[@id='option-4-1']/span[1]").click();
        cy.xpath("(//button[text()='Ok'])[3]").click();
        // add record to record list 3
        cy.xpath("(//button[normalize-space(text())='Add'])[4]").click();
        cy.xpath("//li[@id='option-6-2']/span[1]/ancestor::div[@name='Verify Record Lists and Visibility a']//label").click();
        cy.xpath("//li[@id='option-6-2']/span[1]/ancestor::div[@name='Verify Record Lists and Visibility a']//div[@class='multiselect__tags']").click();
        cy.xpath("//li[@id='option-6-2']/span[1]").should('be.visible');
        cy.xpath("//li[@id='option-6-2']/span[1]").click();
        cy.xpath("(//button[text()='Ok'])[4]").click();
        // add record to record list 4
        cy.xpath("(//button[normalize-space(text())='Add'])[6]").click();
        cy.xpath("//li[@id='option-10-1']/span[1]/ancestor::div[@name='Verify Record Lists and Visibility a']//label").click();
        cy.xpath("//li[@id='option-10-1']/span[1]/ancestor::div[@name='Verify Record Lists and Visibility a']//div[@class='multiselect__tags']").click();
        cy.xpath("//li[@id='option-10-1']/span[1]").should('be.visible');
        cy.xpath("//li[@id='option-10-1']/span[1]").click();
        cy.xpath("(//button[text()='Ok'])[6]").click();
        cy.xpath("//button[normalize-space(text())='New Submit']").click();
        request.verifyTaskIsCompletedB();
        // task BB
        request.openRequestById(requestId);
        request.clickOnTaskName(1, 1);
        cy.xpath("(//p[text()='true'])[1]").should('contain', 'true');
        cy.xpath("(//p[text()='false'])[1]").should('contain', 'false');
        cy.xpath("(//p[text()='true'])[2]").should('contain', 'true');
        cy.xpath("(//p[text()='false'])[2]").should('contain', 'false');
        cy.xpath("(//p[text()='true'])[3]").should('contain', 'true');
        cy.xpath("(//p[text()='false'])[3]").should('contain', 'false');
        cy.xpath("//span[text()='New Input']").should('be.visible');
        cy.xpath("(//input[@type='text'])[1]").type('input');
        cy.xpath("//i[@class='fas fa-paper-plane']").click();
        request.verifyTaskIsCompletedB();

        // manual task
        request.openRequestById(requestId);
        request.clickOnTaskName(1, 1);
        //first record list
        cy.xpath("(//h4[text()='New Record List'])[1]").click();
        cy.xpath("//table//td[normalize-space(text())='title1']").should('be.visible');
        cy.xpath("//table//td[normalize-space(text())='author1']").should('be.visible');
        cy.xpath("//table//td[normalize-space(text())='1000']").should('be.visible');

        //second record list verify
        cy.xpath("(//h4[text()='New Record List'])[2]").should('be.visible');
        cy.xpath("(//div[normalize-space(text())='This record list is empty or contains no data.'])[1]").should('be.visible');

        //third record list verify
        cy.xpath("(//h4[text()='New Record List'])[3]").click();
        cy.xpath("(//table//td[normalize-space(text())='title2'])[1]").should('be.visible');
        cy.xpath("(//table//td[normalize-space(text())='author2'])[1]").should('be.visible');
        cy.xpath("(//table//td[normalize-space(text())='4000'])[1]").should('be.visible');

        //fourth record list verify
        cy.xpath("(//h4[text()='New Record List'])[4]").click();
        cy.xpath("//table//td[normalize-space(text())='title3']").should('be.visible');
        cy.xpath("//table//td[normalize-space(text())='author3']").should('be.visible');
        cy.xpath("//table//td[normalize-space(text())='3000']").should('be.visible');

        //fivth record list verify
        cy.xpath("(//h4[text()='New Record List'])[5]").should('be.visible');
        cy.xpath("(//div[normalize-space(text())='This record list is empty or contains no data.'])[2]").should('be.visible');
        //fourth record list
        cy.xpath("(//h4[text()='New Record List'])[6]").should('be.visible');
        cy.xpath("(//table//td[normalize-space(text())='title2'])[2]").should('be.visible');
        cy.xpath("(//table//td[normalize-space(text())='author2'])[2]").should('be.visible');
        cy.xpath("(//table//td[normalize-space(text())='4000'])[2]").should('be.visible');

        cy.xpath("(//p[text()='true'])[1]").should('contain', 'true');
        cy.xpath("(//p[text()='false'])[1]").should('contain', 'false');
        cy.xpath("(//p[text()='true'])[2]").should('contain', 'true');
        cy.xpath("(//p[text()='false'])[2]").should('contain', 'false');
        cy.xpath("(//p[text()='true'])[3]").should('contain', 'true');
        cy.xpath("(//p[text()='false'])[3]").should('contain', 'false');
        request.manualtaskcomplete();
        request.verifyTaskIsCompletedB();
    }

    actionsAndAssertionsOfTCP42425(requestId){
        //Step 1: Complete the Form 1
        cy.xpath("//button[@data-cy = 'add-row']").should('be.visible');
        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Date'])[1]").click();
        screensP.useCustomDate("2022", "Mar", "20");
        cy.xpath("(//input[@aria-label = 'DateTime'])[1]").click();
        screensP.useCustomDateTime('2022','Aug','18','11','25');

        cy.xpath("(//input[@name = 'check1'])[1]").click();
        cy.xpath("(//div[@class = 'multiselect__select'])[1]").click();
        cy.xpath('(//li[@id="option-0-0"]//span)[1]').click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("Test Name");
        cy.xpath("//button[text() = 'Ok']").click();
        cy.wait(2000);

        cy.xpath('((//div[@class="row mb-2 ml-0 mr-0"])[1]/following-sibling::table//td)[1]').should('contain.text','2022');
        cy.xpath('((//div[@class="row mb-2 ml-0 mr-0"])[1]/following-sibling::table//td)[2]').should('contain.text','2022');
        cy.xpath('((//div[@class="row mb-2 ml-0 mr-0"])[1]/following-sibling::table//td)[3]').should('contain','Test Name');
        cy.xpath('((//div[@class="row mb-2 ml-0 mr-0"])[1]/following-sibling::table//td)[4]').should('contain','var1');
        cy.xpath('((//div[@class="row mb-2 ml-0 mr-0"])[1]/following-sibling::table//td)[5]').should('contain','true');
        cy.xpath('((//div[@class="row mb-2 ml-0 mr-0"])[2]/following-sibling::table//td)[1]').should('contain.text','2022');
        cy.xpath('((//div[@class="row mb-2 ml-0 mr-0"])[2]/following-sibling::table//td)[2]').should('contain.text','2022');
        cy.xpath('((//div[@class="row mb-2 ml-0 mr-0"])[2]/following-sibling::table//td)[3]').should('contain','Test Name');
        cy.xpath('((//div[@class="row mb-2 ml-0 mr-0"])[2]/following-sibling::table//td)[4]').should('contain','var1');
        cy.xpath('((//div[@class="row mb-2 ml-0 mr-0"])[2]/following-sibling::table//td)[5]').should('contain','true');
        //second record
        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Date'])[1]").click();
        screensP.useCustomDate("2022", "Mar", "20");
        cy.xpath("(//input[@aria-label = 'DateTime'])[1]").click();
        screensP.useCustomDateTime('2022','Aug','18','11','25');
        cy.xpath("(//div[@class = 'multiselect__select'])[1]").click();
        cy.xpath('//li[@id="option-2-2"]/span[1]').click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("Test Name 2");
        cy.xpath("//button[text() = 'Ok']").click();
        cy.wait(2000);
        cy.xpath('((//div[@class="row mb-2 ml-0 mr-0"])[1]/following-sibling::table//td)[7]').should('contain.text','2022');
        cy.xpath('((//div[@class="row mb-2 ml-0 mr-0"])[1]/following-sibling::table//td)[8]').should('contain.text','2022');
        cy.xpath('((//div[@class="row mb-2 ml-0 mr-0"])[1]/following-sibling::table//td)[9]').should('contain','Test Name 2')
        cy.xpath('((//div[@class="row mb-2 ml-0 mr-0"])[1]/following-sibling::table//td)[10]').should('contain','var3')
        cy.xpath('((//div[@class="row mb-2 ml-0 mr-0"])[1]/following-sibling::table//td)[11]').should('contain','false')
        cy.xpath('((//div[@class="row mb-2 ml-0 mr-0"])[2]/following-sibling::table//td)[6]').should('contain.text','2022')
        cy.xpath('((//div[@class="row mb-2 ml-0 mr-0"])[2]/following-sibling::table//td)[7]').should('contain.text','2022')
        cy.xpath('((//div[@class="row mb-2 ml-0 mr-0"])[2]/following-sibling::table//td)[8]').should('contain','Test Name 2')
        cy.xpath('((//div[@class="row mb-2 ml-0 mr-0"])[2]/following-sibling::table//td)[9]').should('contain','var3')
        cy.xpath('((//div[@class="row mb-2 ml-0 mr-0"])[2]/following-sibling::table//td)[10]').should('contain','false')
        //Third record
        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Date'])[1]").click();
        screensP.useCustomDate("2020", "Mar", "20");
        cy.xpath("(//input[@aria-label = 'DateTime'])[1]").click();
        screensP.useCustomDateTime('2020','Aug','18','11','25');
        cy.xpath("(//input[@name = 'check1'])[1]").click();
        cy.xpath("(//div[@class = 'multiselect__select'])[1]").click();
        cy.xpath('//li[@id="option-3-3"]/span[1]').click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("Test Name 3");
        cy.xpath("//button[text() = 'Ok']").click();
        cy.wait(2000);
        cy.xpath('((//div[@class="row mb-2 ml-0 mr-0"])[1]/following-sibling::table//td)[13]').should('contain.text','2020');
        cy.xpath('((//div[@class="row mb-2 ml-0 mr-0"])[1]/following-sibling::table//td)[14]').should('contain.text','2020');
        cy.xpath('((//div[@class="row mb-2 ml-0 mr-0"])[1]/following-sibling::table//td)[15]').should('contain','Test Name 3')
        cy.xpath('((//div[@class="row mb-2 ml-0 mr-0"])[1]/following-sibling::table//td)[16]').should('contain','var4')
        cy.xpath('((//div[@class="row mb-2 ml-0 mr-0"])[1]/following-sibling::table//td)[17]').should('contain','true')
        cy.xpath('((//div[@class="row mb-2 ml-0 mr-0"])[2]/following-sibling::table//td)[11]').should('contain.text','2020')
        cy.xpath('((//div[@class="row mb-2 ml-0 mr-0"])[2]/following-sibling::table//td)[12]').should('contain.text','2020')
        cy.xpath('((//div[@class="row mb-2 ml-0 mr-0"])[2]/following-sibling::table//td)[13]').should('contain','Test Name 3')
        cy.xpath('((//div[@class="row mb-2 ml-0 mr-0"])[2]/following-sibling::table//td)[14]').should('contain','var4')
        cy.xpath('((//div[@class="row mb-2 ml-0 mr-0"])[2]/following-sibling::table//td)[15]').should('contain','true')
        cy.xpath("//button[@aria-label = 'New Submit']").click();
        //second Form task
        request.verifyTaskIsCompletedB();

        //Step 2: Open by request ID
        request.openRequestById(requestId);
        request.waitUntilElementIsVisible('selector', '#pending >* td:nth-child(1) >a[href^="/tasks"]');
        request.clickOnTaskName(1, 1);

        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Date'])[1]").click();
        screensP.useCustomDate("2019", "Mar", "20");
        cy.xpath("(//input[@aria-label = 'DateTime'])[1]").click();
        screensP.useCustomDateTime('2019','Aug','18','11','25');
        cy.xpath("(//input[@name = 'check1'])[1]").click();
        cy.xpath("(//div[@class = 'multiselect__select'])[1]").click();
        cy.xpath('(//li[@id="option-0-1"]//span)[1]').click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("Test Name Secound Task");
        cy.xpath("//button[text() = 'Ok']").click();
        cy.xpath('((//div[@class="row mb-2 ml-0 mr-0"])[1]/following-sibling::table//td)[19]').should('contain.text','2019');
        cy.xpath('((//div[@class="row mb-2 ml-0 mr-0"])[1]/following-sibling::table//td)[20]').should('contain.text','2019');
        cy.xpath('((//div[@class="row mb-2 ml-0 mr-0"])[1]/following-sibling::table//td)[21]').should('contain','Test Name Secound Task')
        cy.xpath('((//div[@class="row mb-2 ml-0 mr-0"])[1]/following-sibling::table//td)[22]').should('contain','var2')
        cy.xpath('((//div[@class="row mb-2 ml-0 mr-0"])[1]/following-sibling::table//td)[23]').should('contain','true')
        cy.xpath('((//div[@class="row mb-2 ml-0 mr-0"])[2]/following-sibling::table//td)[16]').should('contain.text','2019')
        cy.xpath('((//div[@class="row mb-2 ml-0 mr-0"])[2]/following-sibling::table//td)[17]').should('contain.text','2019')
        cy.xpath('((//div[@class="row mb-2 ml-0 mr-0"])[2]/following-sibling::table//td)[18]').should('contain','Test Name Secound Task')
        cy.xpath('((//div[@class="row mb-2 ml-0 mr-0"])[2]/following-sibling::table//td)[19]').should('contain','var2')
        cy.xpath('((//div[@class="row mb-2 ml-0 mr-0"])[2]/following-sibling::table//td)[20]').should('contain','true')
        cy.xpath("//button[@aria-label = 'New Submit']").click();

        request.verifyRequestisCompleted(requestId);
    }

    actionsAndAssertionsOfTCP42382(requestId,form_screen){
        //Step 1: Complete the Form 1
        cy.get('[data-cy="add-row"]').should('be.visible');
        cy.get('[data-cy="add-row"]').click();
        cy.xpath('(//input[@name="form_input_1"])[1]').type('test record list');
        cy.xpath('(//input[@name="form_input_2"])[1]').type('test input loop');
        cy.xpath('(//input[@aria-label="New Date Picker"])[1]').type('2022-07-19 14:25{enter}');
        cy.xpath('(//i[@class="fas fa-plus"])[3]').click();
        cy.get('[name="form_input_3"]').type('test existing array');
        cy.xpath('(//input[@aria-label="New Date Picker"])[2]').type('2022-07-20 11:12{enter}');
        cy.xpath('(//input[@name="form_input_2"])[1]').click({force:true});
        cy.xpath("//button[text()='Ok']").click();
        cy.xpath('(//button[@aria-label="New Submit"])[3]').click();
        request.verifyTaskIsCompletedB();

        //Step 2: Open the request by id
        request.openRequestById(requestId);
        request.waitUntilElementIsVisible('selector', '#pending >* td:nth-child(1) >a[href^="/tasks"]');
        request.clickOnTaskName(1, 1);

        //Step 3: Complet the Form 2
        cy.get('[data-cy="add-row"]').should('be.visible');
        cy.get('[class="fas fa-edit"]').click();
        cy.xpath("//button[text()='Save']").click();
        cy.xpath('(//button[@aria-label="New Submit"])[3]').click();
        request.verifyTaskIsCompletedB();
        
        request.verifyRequestisCompleted(requestId);
        cy.xpath("(//div[text()[normalize-space()='Admin User has completed the task Form Task']])[1]").should('be.visible');
        cy.xpath("(//div[text()[normalize-space()='Admin User has completed the task Form Task']])[2]").should('be.visible');
    }

    actionsAndAssertionsOfTCP42257(requestId) {
        cy.xpath("//textarea[@name = 'form_text_area_1']").should('be.visible');
        cy.xpath("//textarea[@name = 'form_text_area_1']").type("test text area",{delay:100});
        cy.xpath("//textarea[@placeholder = 'PlaceHOLDER Text Area']").should('be.visible');
        cy.xpath("//textarea[@readonly='readonly']").should('be.visible');
        cy.xpath("//small[text()[normalize-space() = 'Helper Text']]").should('be.visible');
        cy.get('[class="tox-edit-area__iframe"]').then($iframe => {
            const iframe1 = $iframe.contents().find('body');
            cy.wrap(iframe1)
                .click()
                .type('text area rich text')
        });
        cy.xpath("//textarea[@name = 'form_text_area_6']").should('have.value', 'Default Value');
        cy.get('[name = "form_text_area_7"]').should('not.be.visible');
        cy.xpath("//textarea[@name = 'form_text_area_8']").type("text aria label");
        cy.xpath("//textarea[@name = 'form_text_area_10']").type('test');
        cy.xpath("//button[@aria-label = 'New Submit']").click();
        request.verifyTaskIsCompletedB();
        
        request.openRequestById(requestId);
        request.waitUntilElementIsVisible('selector', '#pending >* td:nth-child(1) >a[href^="/tasks"]');
        request.clickOnTaskName(1, 1);
        
        cy.xpath("//button[@aria-label = 'New Submit']").click();
        request.verifyTaskIsCompletedB();
        
        request.verifyRequestisCompleted(requestId);
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task Form Task']]").should('be.visible');
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task Form Task']]").should('be.visible');
    }
    actionsAndAssertionsOfTCP42273(requestId) {
        //Step 1: Complete the Form 1
        cy.xpath("//input[@name = 'var1']").should('be.visible');
        cy.xpath("//input[@name = 'var1']").type('1');
        cy.xpath("//input[@name = 'var1']").should('have.value','1');
        cy.xpath("//button[@aria-label = 'New Submit']").click();
        request.verifyTaskIsCompletedB();

        //Step 2: Wait that the intermediate event complete 1 min
        cy.wait(60000);

        //Step 3: Open the task by request
        request.openRequestById(requestId);
        request.waitUntilElementIsVisible('selector', '#pending >* td:nth-child(1) >a[href^="/tasks"]');
        request.clickOnTaskName(1, 1);

        //Step 4: Open the task by request
        cy.xpath("//input[@name = 'var1']").clear().type('2');
        cy.xpath("//button[@aria-label = 'New Submit']").click();
        request.verifyTaskIsCompletedB();

        //Step 5: Open the task by request
        request.openRequestById(requestId);
        request.waitUntilElementIsVisible('selector', '#pending >* td:nth-child(1) >a[href^="/tasks"]');
        request.clickOnTaskName(1, 1);

        //Step 6: Complete the form 2
        cy.xpath("//input[@name = 'form_input_1']").should('be.visible');
        cy.xpath("//input[@name = 'form_input_1']").type('QA-Testing');
        cy.xpath("//button[@aria-label = 'New Submit']").click();
        request.verifyTaskIsCompletedB();

        request.verifyRequestisCompleted(requestId);
        cy.xpath("//div[text()[normalize-space()= 'Admin User has completed the task Form Task']]").should('be.visible');
        cy.xpath("//div[text()[normalize-space()= 'Exclusive Gateway: var1==1']]").should('be.visible');
        cy.xpath("//div[text()[normalize-space()= 'Exclusive Gateway: var1==2']]").should('be.visible');
        cy.xpath("//div[text()[normalize-space()= 'Admin User has completed the task Form Task 2']]").should('be.visible');
    }

    actionsAndAssertionsOfTCP42271(requestId) {
        //Step 1: Complete the form 1
        cy.xpath("(//div[@class = 'multiselect__select'])[1]").should('be.visible');
        cy.xpath("(//div[@class = 'multiselect__select'])[1]").click();
        cy.get('[data-cy="screen-field-cash_drawer_setup_steps"]>* input').type('Yes',{delay:100})
            .should('have.value','Yes');
        cy.wait(2000);
        cy.get('[data-cy="screen-field-cash_drawer_setup_steps"]>* input').type('{enter}');
        cy.xpath("//button[@aria-label = 'New Submit']").click();
        cy.wait(3000);
        request.verifyTaskIsCompletedB();

        //Step 2: Open the by request id
        request.openRequestById(requestId);
        request.waitUntilElementIsVisible('selector','#pending >* td:nth-child(1) >a[href^="/tasks"]');
        request.clickOnTaskName(1, 1);

        //Step 3: Complete the Review task
        cy.wait(2000);
        cy.xpath("(//div[@class = 'multiselect__select'])[1]").should('exist');
        cy.xpath("(//div[@class = 'multiselect__select'])[1]").click();
        cy.get('[data-cy="screen-field-cash_drawer_setup_do_you_approve"]>* input').type('No',{delay:100})
            .should('have.value','No');
        cy.wait(2000);
        cy.get('[data-cy="screen-field-cash_drawer_setup_do_you_approve"]>* input').type('{enter}');
        cy.xpath("//textarea[@data-cy = 'screen-field-cash_drawer_setup_requester_comment']").type('yes',{delay:100});
        cy.wait(3000);
        cy.xpath("//button[@aria-label = 'Reload']").click();
        request.verifyTaskIsCompletedB();

        //Step 4: Open the by request id
        request.openRequestById(requestId);
        request.waitUntilElementIsVisible('selector','#pending >* td:nth-child(1) >a[href^="/tasks"]');
        request.clickOnTaskName(1, 1);

        //Step 5: Complete the Form
        cy.xpath("//button[@aria-label = 'New Submit']").should('exist');
        cy.xpath("//button[@aria-label = 'New Submit']").click();
        request.verifyTaskIsCompletedB();

        //Step 6: Open the by request id
        request.openRequestById(requestId);
        request.waitUntilElementIsVisible('selector','#pending >* td:nth-child(1) >a[href^="/tasks"]');
        request.clickOnTaskName(1, 1);

        //Step 7: Complete the Review task
        cy.wait(2000);
        cy.xpath("(//div[@class = 'multiselect__select'])[1]").should('exist');
        cy.xpath("(//div[@class = 'multiselect__select'])[1]").click();
        cy.get('[data-cy="screen-field-cash_drawer_setup_do_you_approve"]>* input').type('Yes',{delay:100})
            .should('have.value','Yes');
        cy.wait(2000);
        cy.get('[data-cy="screen-field-cash_drawer_setup_do_you_approve"]>* input').type('{enter}');
        cy.xpath("//textarea[@data-cy = 'screen-field-cash_drawer_setup_requester_comment']").type('yess');
        cy.wait(3000);
        cy.xpath("//button[@aria-label = 'Finish case']").should('be.enabled');
        cy.xpath("//button[@aria-label = 'Finish case']").click();
        request.verifyTaskIsCompletedB();

        //Step 7: Verify task is completed
        request.verifyRequestisCompleted(requestId);

        cy.xpath("//div[normalize-space(text()) = 'Admin User has completed the task Script Task']").should('exist');
        cy.xpath("//div[normalize-space(text()) = 'Admin User has completed the task Fill Out Request']").should('exist');
        cy.xpath("//div[normalize-space(text()) = 'Admin User has completed the task Review Request']").should('exist');
        cy.xpath("//div[normalize-space(text()) = 'Admin User has completed the task Fill Out Request']").should('exist');
        cy.xpath("//div[normalize-space(text()) = 'Admin User has completed the task Review Request']").should('exist');
        cy.xpath("//div[normalize-space(text()) = 'Daily Work Process Complete?: No']").should('exist');
    }
    actionsAndAssertionsOfTCP42302(requestId){
        cy.xpath("//label[text()='enable']").click();
        cy.xpath("//label[text()='select1']").should('be.visible');
        cy.xpath("//label[text()='select2']").should('be.visible');
        cy.xpath("//label[text()='select3']").should('be.visible');
        cy.xpath('(//div[@class="multiselect__select"])[1]').click();
        cy.xpath('//li[@id="option-0-1"]//span[text()="Two"]').click();
        cy.get('[name="select1.content"]').should('have.value','Two');
        cy.xpath('(//div[@class="multiselect__select"])[2]').click();
        cy.xpath('//li[@id="option-1-0"]//span[text()="Luke Skywalker"]').click();
        cy.xpath('(//input[@name="name"])[1]').should('have.value',"Luke Skywalker");
        cy.xpath('(//div[@class="multiselect__select"])[2]').click();
        cy.xpath('//li[@id="option-1-3"]//span[text()="Darth Vader"]').click();
        cy.xpath('(//input[@name="name"])[2]').should('have.value',"Darth Vader");
        cy.xpath('(//div[@class="multiselect__select"])[3]').click();
        cy.xpath('//li//span[text()="ana"]').click();
        cy.xpath('//input[@name="lastName"]').should('have.value','mauricio');
        cy.xpath('(//div[@class="multiselect__select"])[3]').click();
        cy.xpath('//li//span[text()="Sofia"]').click();
        cy.xpath('(//input[@name="lastName"])[2]').should('have.value','Suarez');
        cy.xpath('(//button[@aria-label="New Submit"])[1]').click();
        request.verifyTaskIsCompletedB()
        request.openRequestById(requestId);
        request.clickOnTaskName(1,1);
        cy.get('[name="select1.content"]').should('have.value','Two');
        cy.xpath('(//input[@name="name"])[1]').should('have.value',"Luke Skywalker");
        cy.xpath('(//input[@name="name"])[2]').should('have.value',"Darth Vader");
        cy.xpath('(//input[@name="lastName"])[1]').should('have.value','mauricio');
        cy.xpath('(//input[@name="lastName"])[2]').should('have.value','Suarez');
        cy.xpath('(//button[@aria-label="New Submit"])[1]').click();
        request.verifyTaskIsCompletedB()
    }
    actionsAndAssertionsOfTCP42294(name,processId){
        cy.wait(2000);
        //Step 1: go to url
        cy.visit('/webentry/' + processId + '/node_2');

        //Complete the WE
        cy.get('[name="accepted"]').should('be.visible');
        cy.get('[name="accepted"]').type('yes');
        cy.get('[name="afterdate"]').type('2022-04-29');
        cy.get('[name="afterorequaltodate"]').type('2022-10-15');
        cy.get('[name="alpha"]').type('test');
        cy.get('[name="alphanumeric"]').type('user113');
        cy.get('[name="beforedate"]').type('2021-01-20');
        cy.get('[name="beforeorequaldate"]').type('2021-10-29');
        cy.get('[name="betweenminmax"]').type('7');
        cy.get('[name="date"]').type('2021-10-10');
        cy.get('[name="email"]').type('abc@gmail.com');
        cy.get('[name="maxlength"]').type('tester1');
        cy.get('[name="minlength"]').type('tester1');
        cy.get('[name="regex"]').type('2020-10-10');
        cy.get('[name="required"]').type('test');
        cy.get('[name="requiredif"]').type('test');
        cy.get('[name="requiredunless"]').type('test');
        cy.get('[name="same"]').type('test');
        cy.get('[name="url"]').type('https://release.testing.processmaker.net/modeler/554');
        cy.xpath("(//button[contains(@class,'btn btn-primary')])[2]").click();


        cy.get('[name=request-id]').invoke('attr', 'content').should('not.be.empty');

        //Step 3: Get the number of requests
        cy.get("[name='request-id']").invoke('attr', 'content').then((requestId)=> {

            //Step 4: Log in
            login.navigateToUrl();
            login.login();

            //Step 5: Open the requests
            cy.visit('/requests/' + requestId);
            request.waitUntilElementIsVisible('selector', '#pending >* td:nth-child(1) >a[href^="/tasks"]');
            request.clickOnTaskName(1, 1);

            cy.get('[name="accepted"]').should('have.value','yes');
            cy.get('[name="afterdate"]').should('contain.value','2022');
            cy.get('[name="afterorequaltodate"]').should('contain.value','2022');
            cy.get('[name="alpha"]').should('have.value','test');
            cy.get('[name="alphanumeric"]').should('have.value','user113');
            cy.get('[name="beforedate"]').should('contain.value','2021');
            cy.get('[name="beforeorequaldate"]').should('contain.value','2021');
            cy.get('[name="betweenminmax"]').should('have.value','7');
            cy.get('[name="date"]').should('contain.value','2021-10-10');
            cy.get('[name="email"]').should('have.value','abc@gmail.com');
            cy.get('[name="maxlength"]').should('have.value','tester1');
            cy.get('[name="minlength"]').should('have.value','tester1');
            cy.get('[name="regex"]').should('contain.value','2020');
            cy.get('[name="required"]').should('have.value','test');
            cy.get('[name="requiredif"]').should('have.value','test');
            cy.get('[name="requiredunless"]').should('have.value','test');
            cy.get('[name="same"]').should('have.value','test');
            //click on plus
            cy.get('[title="Add Item"]').click();
            cy.get('#main').scrollTo('bottom');
            cy.xpath('(//input[@name="accepted"])[2]').type('yes');
            cy.xpath('(//input[@name="afterdate"])[2]').type('2022-04-29');
            cy.xpath('(//input[@name="afterorequaltodate"])[2]').type('2022-10-15');
            cy.xpath('(//input[@name="alpha"])[2]').type('test');
            cy.xpath('(//input[@name="alphanumeric"])[2]').type('user113');
            cy.xpath('(//input[@name="beforedate"])[2]').type('2021-01-20');
            cy.xpath('(//input[@name="beforeorequaldate"])[2]').type('2021-10-29');
            cy.xpath('(//input[@name="betweenminmax"])[2]').type('7');
            cy.xpath('(//input[@name="date"])[2]').type('2021-10-10');
            cy.xpath('(//input[@name="email"])[2]').type('abc@gmail.com');
            cy.xpath('(//input[@name="maxlength"])[2]').type('tester1');
            cy.xpath('(//input[@name="minlength"])[2]').type('tester1');
            cy.xpath('(//input[@name="regex"])[2]').type('2020-10-10');
            cy.xpath('(//input[@name="required"])[2]').type('test');
            cy.xpath('(//input[@name="requiredif"])[2]').type('test');
            cy.xpath('(//input[@name="requiredunless"])[2]').type('test');
            cy.xpath('(//input[@name="same"])[2]').type('test');
            cy.xpath('(//input[@name="url"])[2]').type('https://release.testing.processmaker.net/modeler/554');
            cy.xpath("(//button[contains(@class,'btn btn-primary')])[2]").click();
            request.verifyTaskIsCompletedB();

            request.verifyRequestisCompleted(requestId);
        });
    }
    actionsAndAssertionsOfTCP42295(requestId,name){

        //Step 1: Complete the Form 1
        cy.xpath('(//div[@class="multiselect__select"])[1]').should('be.visible');
        cy.xpath('(//div[@class="multiselect__select"])[1]').click();
        cy.wait(2000);
        cy.xpath('//li[@id="option-0-0"]//span[text()="carlos"]').click();
        cy.get('[name="value"]').should('have.value','carlos');
        
        cy.xpath('(//div[@class="multiselect__select"])[1]').click();
        cy.wait(2000);
        cy.xpath('//li[@id="option-0-1"]//span[text()="maria"]').click();
        cy.xpath('(//input[@name="value"])[2]').should('have.value','maria');
        
        cy.xpath('(//div[@class="multiselect__select"])[1]').click();
        cy.wait(2000);
        cy.xpath('//li[@id="option-0-2"]//span[text()="ada"]').click();
        cy.xpath('(//input[@name="value"])[3]').should('have.value','ada');
        
        cy.xpath('(//div[@class="multiselect__select"])[1]').click();
        cy.wait(2000);
        cy.xpath('//li[@id="option-0-3"]//span[text()="abed"]').click();
        cy.xpath('(//input[@name="value"])[4]').should('have.value','abed');
        
        cy.xpath('(//div[@class="multiselect__select"])[2]').click();
        cy.wait(2000);
        cy.xpath('//li[@id="option-1-0"]//span[text()="carla"]').click();
        cy.xpath('(//input[@name="value"])[5]').should('have.value','A');
        cy.xpath('(//input[@name="content"])[1]').should('have.value','carla');
        
        cy.xpath('(//div[@class="multiselect__select"])[2]').click();
        cy.wait(2000);
        cy.xpath('//li[@id="option-1-1"]//span[text()="andres"]').click();
        cy.xpath('(//input[@name="value"])[6]').should('have.value','B');
        cy.xpath('(//input[@name="content"])[2]').should('have.value','andres');
        
        cy.xpath('(//div[@class="multiselect__select"])[2]').click();
        cy.wait(2000);
        cy.xpath('//li[@id="option-1-2"]//span[text()="keila"]').click();
        cy.xpath('(//input[@name="value"])[7]').should('have.value','C');
        cy.xpath('(//input[@name="content"])[3]').should('have.value','keila');
        
        //recordlist
        cy.get('[data-cy="add-row"]').click();
        cy.xpath('(//input[@name="option"])[1]').type('1');
        cy.xpath("//button[text()='Ok']").click();
        cy.wait(2000);
        cy.get('[data-cy="add-row"]').click();
        cy.xpath('(//input[@name="option"])[1]').type('2');
        cy.xpath("//button[text()='Ok']").click();
        cy.wait(2000);
        cy.get('[data-cy="add-row"]').click();
        cy.xpath('(//input[@name="option"])[1]').type('3');
        cy.xpath("//button[text()='Ok']").click();
        cy.wait(2000);
        cy.get('[data-cy="add-row"]').click();
        cy.xpath('(//input[@name="option"])[1]').type('4');
        cy.xpath("//button[text()='Ok']").click();
        cy.wait(2000);
        cy.get('[data-cy="add-row"]').click();
        cy.xpath('(//input[@name="option"])[1]').type('5');
        cy.xpath("//button[text()='Ok']").click();
        cy.wait(2000);
        cy.get('[data-cy="add-row"]').click();
        cy.xpath('(//input[@name="option"])[1]').type('6');
        cy.xpath("//button[text()='Ok']").click();
        cy.wait(2000);
        cy.get('[data-cy="add-row"]').click();
        cy.xpath('(//input[@name="option"])[1]').type('7');
        cy.xpath("//button[text()='Ok']").click();
        cy.wait(2000);
        cy.get('[data-cy="add-row"]').click();
        cy.xpath('(//input[@name="option"])[1]').type('8');
        cy.xpath("//button[text()='Ok']").click();
        cy.wait(2000);
        
        cy.xpath('(//li[@role="presentation"])[1]').should('exist');
        cy.xpath('(//li[@role="presentation"])[2]').should('exist');
        cy.xpath('(//li[@role="presentation"])[3]').should('exist');
        cy.xpath('(//li[@role="presentation"])[4]').should('exist');
        cy.xpath('(//li[@role="presentation"])[5]').should('exist');
        cy.xpath('(//li[@role="presentation"])[6]').should('exist');
        cy.xpath("//td[text()[normalize-space()='1']]").should('exist');
        cy.xpath("//td[text()[normalize-space()='2']]").should('exist');
        cy.xpath("//td[text()[normalize-space()='3']]").should('exist');
        cy.xpath("//td[text()[normalize-space()='4']]").should('exist');
        cy.xpath("//td[text()[normalize-space()='5']]").should('exist');
        cy.xpath("//button[text()='2']").click();
        cy.xpath("//td[text()[normalize-space()='6']]").should('exist');
        cy.xpath("//td[text()[normalize-space()='7']]").should('exist');
        cy.xpath("//td[text()[normalize-space()='8']]").should('exist');
        cy.xpath('(//button[@data-cy="remove-row"])[3]').click();
        cy.xpath("//button[text()='Delete']").click();
        cy.xpath("//td[text()[normalize-space()='6']]").should('exist');
        cy.xpath("//td[text()[normalize-space()='7']]").should('exist');
        cy.xpath('(//button[@role="menuitem"])[1]').click();
        cy.xpath("//td[text()[normalize-space()='1']]").should('exist');
        cy.xpath("//td[text()[normalize-space()='2']]").should('exist');
        cy.xpath("//td[text()[normalize-space()='3']]").should('exist');
        cy.xpath("//td[text()[normalize-space()='4']]").should('exist');
        cy.xpath("//td[text()[normalize-space()='5']]").should('exist');
        cy.xpath("//button[text()[normalize-space()='New Submit']]").click();
        request.verifyTaskIsCompletedB();
        
        request.openRequestById(requestId);
        request.waitUntilElementIsVisible('selector', '#pending >* td:nth-child(1) >a[href^="/tasks"]');
        request.clickOnTaskName(1,1);
        
        cy.xpath('(//input[@name="value"])[1]').should('have.value','carlos');
        cy.xpath('(//input[@name="value"])[2]').should('have.value','maria');
        cy.xpath('(//input[@name="value"])[3]').should('have.value','ada');
        cy.xpath('(//input[@name="value"])[4]').should('have.value','abed');
        cy.xpath('(//input[@name="value"])[5]').should('have.value','A');
        cy.xpath('(//input[@name="content"])[1]').should('have.value','carla');
        cy.xpath('(//input[@name="value"])[6]').should('have.value','B');
        cy.xpath('(//input[@name="content"])[2]').should('have.value','andres');
        cy.xpath('(//input[@name="value"])[7]').should('have.value','C');
        cy.xpath('(//input[@name="content"])[3]').should('have.value','keila');
        cy.xpath("//td[text()[normalize-space()='1']]").should('exist');
        cy.xpath("//td[text()[normalize-space()='2']]").should('exist');
        cy.xpath("//td[text()[normalize-space()='3']]").should('exist');
        cy.xpath("//td[text()[normalize-space()='4']]").should('exist');
        cy.xpath("//td[text()[normalize-space()='5']]").should('exist');
        cy.xpath('(//li[@role="presentation"])[1]').should('exist');
        cy.xpath('(//li[@role="presentation"])[2]').should('exist');
        cy.xpath('(//li[@role="presentation"])[3]').should('exist');
        cy.xpath('(//li[@role="presentation"])[4]').should('exist');
        cy.xpath('(//li[@role="presentation"])[5]').should('exist');
        cy.xpath('(//li[@role="presentation"])[6]').should('exist');
        cy.xpath("//button[text()='2']").click();
        cy.xpath("//td[text()[normalize-space()='6']]").should('exist');
        cy.xpath("//td[text()[normalize-space()='7']]").should('exist');
        cy.xpath("//button[text()[normalize-space()='New Submit']]").click();
        request.verifyTaskIsCompletedB();
        
        request.openRequestByName(name);
        request.waitUntilElementIsVisible('selector', '#pending >* td:nth-child(1) >a[href^="/tasks"]');
        request.clickOnTaskName(1,1);
        
        cy.xpath('(//input[@name="value"])[1]').should('have.value','carlos');
        cy.xpath('(//input[@name="value"])[2]').should('have.value','maria');
        cy.xpath('(//input[@name="value"])[3]').should('have.value','ada');
        cy.xpath('(//input[@name="value"])[4]').should('have.value','abed');
        cy.xpath('(//input[@name="value"])[5]').should('have.value','A');
        cy.xpath('(//input[@name="content"])[1]').should('have.value','carla');
        cy.xpath('(//input[@name="value"])[6]').should('have.value','B');
        cy.xpath('(//input[@name="content"])[2]').should('have.value','andres');
        cy.xpath('(//input[@name="value"])[7]').should('have.value','C');
        cy.xpath('(//input[@name="content"])[3]').should('have.value','keila');
        cy.get('[id="main"]').scrollTo('bottom');
        cy.xpath("//td[text()[normalize-space()='1']]").should('exist');
        cy.xpath("//td[text()[normalize-space()='2']]").should('exist');
        cy.xpath("//td[text()[normalize-space()='3']]").should('exist');
        cy.xpath("//td[text()[normalize-space()='4']]").should('exist');
        cy.xpath("//td[text()[normalize-space()='5']]").should('exist');
        cy.xpath('(//li[@role="presentation"])[1]').should('exist');
        cy.xpath('(//li[@role="presentation"])[2]').should('exist');
        cy.xpath('(//li[@role="presentation"])[3]').should('exist');
        cy.xpath('(//li[@role="presentation"])[4]').should('exist');
        cy.xpath('(//li[@role="presentation"])[5]').should('exist');
        cy.xpath('(//li[@role="presentation"])[6]').should('exist');
        cy.xpath("//button[text()='2']").click();
        cy.xpath("//td[text()[normalize-space()='6']]").should('exist');
        cy.xpath("//td[text()[normalize-space()='7']]").should('exist');
        cy.xpath("//button[text()[normalize-space()='New Submit']]").click();
        request.verifyRequestisCompleted(requestId);
    }
    actionsAndAssertionsOfTCP42445(){

        //Step 1: Verify that PDF will be generated
        cy.wait(80000);

        request.waitUntilTextcontainText('selector','varHeader', "Completed");
        cy.get('#file-manager-tab').click();
        cy.xpath('(//*[@title="View"])[1]').click();
        cy.wait(2000);
        cy.get('[allowfullscreen="allowfullscreen"]').then($iframe => {
            const iframe1 = $iframe.contents().find('div').eq(16);
            cy.wrap(iframe1).should('be.visible');
        });
        cy.go('back');
        cy.xpath('(//*[@title="View"])[2]').click();
        cy.wait(2000);
        cy.get('[allowfullscreen="allowfullscreen"]').then($iframe => {
            const iframe2 = $iframe.contents().find('div').eq(16);
            cy.wrap(iframe2).should('be.visible');
        });
        cy.go('back');
        cy.xpath('(//*[@title="View"])[3]').click();
        cy.wait(2000);
        cy.get('[allowfullscreen="allowfullscreen"]').then($iframe => {
            const iframe3 = $iframe.contents().find('div').eq(16);
            cy.wrap(iframe3).should('be.visible');
        });
        cy.go('back');
        cy.xpath('(//*[@title="View"])[4]').click();
        cy.wait(2000);
        cy.get('[allowfullscreen="allowfullscreen"]').then($iframe => {
            const iframe4 = $iframe.contents().find('div').eq(16);
            cy.wrap(iframe4).should('be.visible');
        });
        cy.go('back');
        cy.xpath('(//*[@title="View"])[5]').click();
        cy.wait(2000);
        cy.get('[allowfullscreen="allowfullscreen"]').then($iframe => {
            const iframe5 = $iframe.contents().find('div').eq(16);
            cy.wrap(iframe5).should('be.visible');
        });
    }
    actionsAndAssertionsOfTCP42240(requestId){
        cy.xpath("//input[@name = 'form_checkbox_1']").should('be.visible');
        cy.xpath("//input[@name = 'form_checkbox_1']").check({force: true} );
        cy.xpath("//input[@name = 'form_checkbox_3']").should('be.checked');
        cy.get("input[data-cy='screen-field-form_checkbox_4']").check({force: true} );

        cy.xpath("(//input[@name = 'form_checkbox_5'])[1]").check({force: true} );
        cy.xpath("(//input[@name = 'form_checkbox_7'])[1]").should('be.checked');
        cy.get("input[data-cy='screen-field-form_checkbox_6']").check({force: true} );

        //Add new record on the loop
        cy.xpath("//button[@data-cy = 'loop-loop_1-add']").click();

        cy.xpath("(//input[@name = 'form_checkbox_5'])[2]").check({force: true});
        cy.xpath("(//input[@name = 'form_checkbox_7'])[2]").should('be.checked');
        cy.get("input[data-cy='screen-field-form_checkbox_6']").eq(1).check({force: true});

        //Add new record on second the loop
        cy.xpath("//button[@data-cy = 'loop-loop_2-add']").click();

        cy.xpath("//input[@name = 'form_checkbox_9']").check({force: true} );
        cy.xpath("//input[@name = 'form_checkbox_11']").should('be.checked');
        cy.get("input[data-cy='screen-field-form_checkbox_10']").check({force: true} );

        //Add new record on second the loop
        cy.xpath("//button[@data-cy = 'loop-loop_2-add']").click();

        cy.xpath("(//input[@name = 'form_checkbox_9'])[2]").check({force: true});
        cy.xpath("(//input[@name = 'form_checkbox_11'])[2]").should('be.checked');
        cy.get("input[data-cy='screen-field-form_checkbox_10']").eq(1).check({force: true});

        //Add new record on record list
        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").should('be.visible');
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        //Add new record on record list
        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").should('be.visible');
        cy.xpath("(//input[@name = 'form_checkbox_13'])[1]").check({force: true} );
        cy.xpath("(//input[@name = 'form_checkbox_15'])[1]").should('be.checked');

        cy.get("input[data-cy='screen-field-form_checkbox_16']").eq(0).check({force:true});
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.wait(2000);

        //Submit the form
        cy.xpath("//button[@aria-label = 'New Submit']").click();
        request.verifyTaskIsCompletedB();

        //Open request by ID
        request.openRequestById(requestId);
        request.waitUntilElementIsVisible('selector', '#pending >* td:nth-child(1) >a[href^="/tasks"]');
        request.clickOnTaskName(1, 1);

        //Complete the second form
        cy.get('[data-cy="screen-field-form_checkbox_1"]').should('be.visible');
        cy.xpath("//button[@aria-label = 'New Submit']").click();
        request.verifyTaskIsCompletedB();

        request.verifyRequestisCompleted(requestId);

        //Verify the summary data
        cy.xpath("(//tr//td[text()[normalize-space() = 'true']])[1]").should('exist');
        cy.xpath("(//tr//td[text()[normalize-space() = 'true']])[2]").should('exist');
        cy.xpath("(//tr//td[text()[normalize-space() = 'true']])[3]").should('exist');
        cy.xpath("(//tr//td[text()[normalize-space() = 'false']])[1]").should('exist');
        cy.xpath("(//tr//td[text()[normalize-space() = 'true']])[4]").should('exist');
        cy.xpath("(//tr//td[text()[normalize-space() = 'true']])[5]").should('exist');
        cy.xpath("(//tr//td[text()[normalize-space() = 'true']])[6]").should('exist');
        cy.xpath("(//tr//td[text()[normalize-space() = 'false']])[2]").should('exist');
        cy.xpath("(//tr//td[text()[normalize-space() = 'true']])[7]").should('exist');
        cy.xpath("(//tr//td[text()[normalize-space() = 'true']])[8]").should('exist');
        cy.xpath("(//tr//td[text()[normalize-space() = 'true']])[9]").should('exist');
        cy.xpath("(//tr//td[text()[normalize-space() = 'false']])[3]").should('exist');

        cy.xpath("(//div[text()[normalize-space() = 'Admin User has completed the task Form Task']])[1]").should('exist');
    }
    actionsAndAssertionsOfTCP42296(requestId) {

        //Step 1: Completed the form 1
        cy.get('input[type="file"]').should('exist');
        cy.get('input[type="file"]').attachFile('drone.jpg');
        cy.xpath("//span[text()='success']").should('be.visible');
        cy.get('input[type="file"]').attachFile('images/1.jfif');
        cy.xpath("//span[text()='success']").should('have.length',2);
        cy.get('input[type="file"]').attachFile('images/4.jfif');
        cy.xpath("//span[text()='success']").should('have.length',3);
        cy.xpath("//button[@aria-label = 'New Submit']").click();
        request.verifyTaskIsCompletedB();

        //Step 2: Open by request id
        request.openRequestById(requestId);
        request.waitUntilElementIsVisible('selector', '#pending >* td:nth-child(1) >a[href^="/tasks"]');
        request.clickOnTaskName(1, 1);

        //Step 3: Complete the Form 2
        cy.xpath('//button[contains(text(),"Download")]').should('be.visible');
        cy.xpath('(//button[text()[normalize-space()="New Submit"]])[2]').click();
        request.verifyTaskIsCompletedB();

        request.verifyRequestisCompleted(requestId);
        cy.xpath("//td[text()='fileUpload.0.file']").should('be.visible');
        cy.xpath("//td[text()='fileUpload.1.file']").should('be.visible');
        cy.xpath("//div[text()[normalize-space() = 'Admin User has completed the task AA']]").should('be.visible');
        cy.xpath("//div[text()[normalize-space() = 'Admin User has completed the task BB']]").should('be.visible');
    }
    actionsAndAssertionsOfTCP42208(requestId){
        cy.xpath("(//div[@class='signature pl-0']/child::canvas)[1]").should('be.visible');
        cy.xpath("(//div[@class='signature pl-0']/child::canvas)[1]").click();
        cy.xpath("//*[contains(text(),'Signature saved successfully')]").should('be.visible');
        cy.xpath("(//div[@class='signature pl-0']/child::canvas)[2]").click();
        cy.xpath("//*[contains(text(),'Signature saved successfully')]").should('be.visible');
        cy.xpath("(//div[@class='signature pl-0']/child::canvas)[3]").click();
        cy.xpath("//*[contains(text(),'Signature saved successfully')]").should('be.visible');
        cy.xpath("(//div[@class='signature pl-0']/child::canvas)[4]").click();
        cy.xpath("//*[contains(text(),'Signature saved successfully')]").should('be.visible');
        cy.xpath("(//div[@class='signature pl-0']/child::canvas)[5]").click();
        cy.xpath("//*[contains(text(),'Signature saved successfully')]").should('be.visible');
        cy.xpath("(//div[@class='signature pl-0']/child::canvas)[6]").click();
        cy.xpath("//*[contains(text(),'Signature saved successfully')]").should('be.visible');
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should('not.exist');
        cy.get('button[aria-label="New Submit"]').click();

        request.verifyTaskIsCompletedB();

        //verify request is completed
        cy.visit('/requests/' + requestId);
        request.waitUntilTextcontainText('selector','varHeader', "Completed");
        cy.xpath("//li[@class='nav-item']/a[@id='forms-tab']").click();
        cy.xpath("//i[@class='fas fa-search-plus fa-lg fa-fw']").click();
    }

    actionsAndAssertionsOfTCP42066_Operations(a, b){
        const inputASelector = '[data-cy="screen-field-varA"]';
        const inputBSelector = '[data-cy="screen-field-varB"]';
        const selectOpXpath = '//div[@data-cy="screen-field-operation"]/div[@class="multiselect__tags"]';
        const inputSelectOpXpath = '//div[@data-cy="screen-field-operation"]/div[@class="multiselect__tags"]//input';
        const resSelector = '[data-cy="screen-field-varR"]';
        const selectBookXpath = '//div[@data-cy="screen-field-form_select_list_1"]/div[@class="multiselect__tags"]';
        const inputSelectBookXpath = '//div[@data-cy="screen-field-form_select_list_1"]/div[@class="multiselect__tags"]//input';
        const cantBookXapth = '(//input[@data-cy="screen-field-cant"])';
        const totalSelector = '[data-cy="screen-field-total"]';
        const submitSelector = 'button[class="btn btn-success"]';

        // Wait the page is loaded
        cy.get(inputASelector).should('be.visible');

        // Verify Addition operation (+)
        cy.get(inputASelector).type(a);
        cy.get(inputBSelector).type(b);
        cy.xpath(selectOpXpath).click();
        cy.xpath(inputSelectOpXpath).type('Addition').should('have.value', 'Addition');
        cy.xpath(inputSelectOpXpath).type('{enter}');
        const resS = a + b;
        cy.get(resSelector).should('have.value', resS);

        // Verify Subtraction operation (-)
        cy.xpath(selectOpXpath).click();
        cy.xpath(inputSelectOpXpath).type('Subtraction').should('have.value', 'Subtraction');
        cy.xpath(inputSelectOpXpath).type('{enter}');
        const resR = a - b;
        cy.get(resSelector).should('have.value', resR);

        // Verify Multiplication operation (*)
        cy.xpath(selectOpXpath).click();
        cy.xpath(inputSelectOpXpath).type('Multiplication').should('have.value', 'Multiplication');
        cy.xpath(inputSelectOpXpath).type('{enter}');
        const resM = a * b;
        cy.get(resSelector).should('have.value', resM);

        // Verify Division operation (/)
        cy.xpath(selectOpXpath).click();
        cy.xpath(inputSelectOpXpath).type('Division').should('have.value', 'Division');
        cy.xpath(inputSelectOpXpath).type('{enter}');
        const resD = a / b;
        cy.get(resSelector).should('have.value', resD);
    }

    actionsAndAssertionsOfTCP42066_1Scenario(requestId){
        const selectBookXpath = '//div[@data-cy="screen-field-form_select_list_1"]/div[@class="multiselect__tags"]';
        const inputSelectBookXpath = '//div[@data-cy="screen-field-form_select_list_1"]/div[@class="multiselect__tags"]//input';
        const cantBookXapth = '(//input[@data-cy="screen-field-cant"])';
        const totalSelector = '[data-cy="screen-field-total"]';
        const submitSelector = 'button[class="btn btn-success"]';
        // Wait the page is loaded
        cy.xpath(selectBookXpath).should('be.visible');

        // Verify the Operations Aritmetics
        this.actionsAndAssertionsOfTCP42066_Operations(70,5);

        //Select a book
        cy.xpath(selectBookXpath).click();
        cy.xpath(inputSelectBookXpath).type('Don Quijote').should('have.value', 'Don Quijote');
        cy.xpath(inputSelectBookXpath).type('{enter}');
        cy.xpath(cantBookXapth+'[1]').should('be.visible');
        cy.xpath(cantBookXapth+'[1]').type(2);
        cy.get(totalSelector).should('have.value',200);

        //Submit button
        cy.get(submitSelector).click();
        request.verifyTaskIsCompletedB();

        //Open the request
        cy.visit('/requests/' + requestId);
        cy.xpath("//a[contains(text(),'Form Task 1')]").should('be.visible');
        cy.xpath("//a[contains(text(),'Form Task 1')]").click();
        cy.get(totalSelector).should('have.value',200);
        cy.get('[data-cy="screen-field-buy"]>div[class="multiselect__tags"]').click();
        cy.get('[data-cy="screen-field-buy"]>div[class="multiselect__tags"]>input').type('no').should('have.value','no');
        cy.get('[data-cy="screen-field-buy"]>div[class="multiselect__tags"]>input').type('{enter}');
        cy.get(submitSelector).click();
        request.verifyTaskIsCompletedB();

        //Open the request
        cy.visit('/requests/' + requestId);
        cy.xpath("(//a[contains(text(),'Form Task Start')])[1]").should('be.visible');
        cy.xpath("(//a[contains(text(),'Form Task Start')])[1]").click();
        //Select a book
        cy.xpath(selectBookXpath).should('be.visible');
        cy.xpath(selectBookXpath).click();
        cy.xpath(inputSelectBookXpath).type('El principito').should('have.value', 'El principito');
        cy.xpath(inputSelectBookXpath).type('{enter}');
        cy.xpath(cantBookXapth+'[2]').should('be.visible');
        cy.xpath(cantBookXapth+'[2]').type(3);
        cy.get(totalSelector).should('have.value',560);
        //Submit button
        cy.get(submitSelector).click();
        request.verifyTaskIsCompletedB();

        //Open the request
        cy.visit('/requests/' + requestId);
        cy.xpath("//a[contains(text(),'Form Task 3')]").should('be.visible');
        cy.xpath("//a[contains(text(),'Form Task 3')]").click();
        cy.get(totalSelector).should('have.value',560);
        cy.get('[data-cy="screen-field-buy"]>div[class="multiselect__tags"]').should('be.visible').click();
        cy.get('[data-cy="screen-field-buy"]>div[class="multiselect__tags"]>input').type('yes').should('have.value','yes');
        cy.get('[data-cy="screen-field-buy"]>div[class="multiselect__tags"]>input').type('{enter}');
        //Submit button
        cy.get(submitSelector).click();
        request.verifyTaskIsCompletedB();


        //Open the request
        cy.visit('/requests/' + requestId);
        cy.xpath("//a[contains(text(),'Task Buy')]").should('be.visible');
        cy.xpath("//a[contains(text(),'Task Buy')]").click();
        cy.get('[data-cy="screen-field-Name"]').should('be.visible');
        cy.get('[data-cy="screen-field-Name"]').type('Name').should('have.value','Name');
        cy.get('[data-cy="screen-field-form_input_2"]').type('name@gamil.com').should('have.value','name@gamil.com');
        cy.get('[data-cy="screen-field-form_input_3"]').type('Bolognia calliri #100').should('have.value','Bolognia calliri #100');
        //Submit button
        cy.get(submitSelector).click();
        request.verifyTaskIsCompletedB();
        cy.visit('/requests/' + requestId);
        //Open Completed tab
        cy.xpath("//a[text()='Completed']").should('be.visible').click();
        request.waitUntilTextcontainText('selector','varHeader','Completed');

        //Verify that Form Task Start was completed
        cy.xpath("(//a[contains(text(),'Form Task Start')])[1]").should('be.visible');
        //Verify that Form Task 1 was completed
        cy.xpath("(//a[contains(text(),'Form Task 1')])[1]").should('be.visible');
        //Verify that Form Task Start was completed
        cy.xpath("(//a[contains(text(),'Form Task Start')])[2]").should('be.visible');
        //Verify that Form Task 3 was completed
        cy.xpath("(//a[contains(text(),'Form Task 3')])[1]").should('be.visible');
        //Verify that Task Buy was completed
        cy.xpath("(//a[contains(text(),'Task Buy')])[1]").should('be.visible');

    }

    actionsAndAssertionsOfTCP42066_2Scenario(requestId){
        const selectBookXpath = '//div[@data-cy="screen-field-form_select_list_1"]/div[@class="multiselect__tags"]';
        const inputSelectBookXpath = '//div[@data-cy="screen-field-form_select_list_1"]/div[@class="multiselect__tags"]//input';
        const cantBookXapth = '(//input[@data-cy="screen-field-cant"])';
        const totalSelector = '[data-cy="screen-field-total"]';
        const submitSelector = 'button[class="btn btn-success"]';

        // Wait the page is loaded
        cy.xpath(selectBookXpath).should('be.visible');

        // Verify the Operations Aritmetics
        this.actionsAndAssertionsOfTCP42066_Operations(450,3);

        //Select a book
        cy.xpath(selectBookXpath).click();
        cy.xpath(inputSelectBookXpath).type('Don Quijote').should('have.value', 'Don Quijote');
        cy.xpath(inputSelectBookXpath).type('{enter}');
        cy.xpath(cantBookXapth+'[1]').should('be.visible');
        cy.xpath(cantBookXapth+'[1]').type(5);
        cy.get(totalSelector).should('have.value',500);

        //Submit button
        cy.get(submitSelector).click();
        request.verifyTaskIsCompletedB();

        //Open the request
        cy.visit('/requests/' + requestId);
        cy.xpath("//a[contains(text(),'Form Task 2')]").should('be.visible');
        cy.xpath("//a[contains(text(),'Form Task 2')]").click();
        cy.get(totalSelector).should('have.value',500);
        cy.get('[data-cy="screen-field-buy"]>div[class="multiselect__tags"]').click();
        cy.get('[data-cy="screen-field-buy"]>div[class="multiselect__tags"]>input').type('yes').should('have.value','yes');
        cy.get('[data-cy="screen-field-buy"]>div[class="multiselect__tags"]>input').type('{enter}');
        cy.get(submitSelector).click();
        request.verifyTaskIsCompletedB();

        //Open the request
        cy.visit('/requests/' + requestId);
        cy.xpath("//a[contains(text(),'Task Buy')]").should('be.visible');
        cy.xpath("//a[contains(text(),'Task Buy')]").click();
        cy.get('[data-cy="screen-field-Name"]').should('be.visible');
        cy.get('[data-cy="screen-field-Name"]').type('Name').should('have.value','Name');
        cy.get('[data-cy="screen-field-form_input_2"]').type('name@gamil.com').should('have.value','name@gamil.com');
        cy.get('[data-cy="screen-field-form_input_3"]').type('Bolognia calliri #100').should('have.value','Bolognia calliri #100');
        //Submit button
        cy.get(submitSelector).click();
        request.verifyTaskIsCompletedB();
        cy.visit('/requests/' + requestId);

        //Open Completed tab
        cy.xpath("//a[text()='Completed']").should('be.visible').click();
        request.waitUntilTextcontainText('selector','varHeader','Completed');

        //Verify that Form Task Start was completed
        cy.xpath("//a[contains(text(),'Form Task Start')]").should('be.visible');
        //Verify that Form Task 2 was completed
        cy.xpath("(//a[contains(text(),'Form Task 2')])[1]").should('be.visible');
        //Verify that Task Buy was completed
        cy.xpath("(//a[contains(text(),'Task Buy')])[1]").should('be.visible');
    }

    actionsAndAssertionsOfTCP42066_3Scenario(requestId) {
        const selectBookXpath = '//div[@data-cy="screen-field-form_select_list_1"]/div[@class="multiselect__tags"]';
        const inputSelectBookXpath = '//div[@data-cy="screen-field-form_select_list_1"]/div[@class="multiselect__tags"]//input';
        const cantBookXapth = '(//input[@data-cy="screen-field-cant"])';
        const totalSelector = '[data-cy="screen-field-total"]';
        const submitSelector = 'button[class="btn btn-success"]';

        // Wait the page is loaded
        cy.xpath(selectBookXpath).should('be.visible');

        // Verify the Operations Aritmetics
        this.actionsAndAssertionsOfTCP42066_Operations(260,4);

        //Select a book
        cy.xpath(selectBookXpath).click();
        cy.xpath(inputSelectBookXpath).type('El conde').should('have.value', 'El conde');
        cy.xpath(inputSelectBookXpath).type('{enter}');
        cy.xpath(cantBookXapth + '[1]').should('be.visible');
        cy.xpath(cantBookXapth + '[1]').type(3);
        cy.get(totalSelector).should('have.value', 168);

        //Select a Second book
        cy.xpath(selectBookXpath).click();
        cy.xpath(inputSelectBookXpath).type('Harry potter').should('have.value', 'Harry potter');
        cy.xpath(inputSelectBookXpath).type('{enter}');
        cy.xpath(cantBookXapth + '[2]').should('be.visible');
        cy.xpath(cantBookXapth + '[2]').type(2);
        cy.get(totalSelector).should('have.value', 415);

        //Select a Third book
        cy.xpath(selectBookXpath).click();
        cy.xpath(inputSelectBookXpath).type('El principito').should('have.value', 'El principito');
        cy.xpath(inputSelectBookXpath).type('{enter}');
        cy.xpath(cantBookXapth + '[3]').should('be.visible');
        cy.xpath(cantBookXapth + '[3]').type(2);
        cy.get(totalSelector).should('have.value', 655);

        //Submit button
        cy.get(submitSelector).click();
        request.verifyTaskIsCompletedB();

        //Open the request
        cy.visit('/requests/' + requestId);
        cy.xpath("//a[contains(text(),'Form Task 3')]").should('be.visible');
        cy.xpath("//a[contains(text(),'Form Task 3')]").click();
        cy.get(totalSelector).should('have.value', 655);
        cy.get('[data-cy="screen-field-buy"]>div[class="multiselect__tags"]').click();
        cy.get('[data-cy="screen-field-buy"]>div[class="multiselect__tags"]>input').type('yes').should('have.value', 'yes');
        cy.get('[data-cy="screen-field-buy"]>div[class="multiselect__tags"]>input').type('{enter}');
        cy.get(submitSelector).click();
        request.verifyTaskIsCompletedB();

        //Open the request
        cy.visit('/requests/' + requestId);
        cy.xpath("//a[contains(text(),'Task Buy')]").should('be.visible');
        cy.xpath("//a[contains(text(),'Task Buy')]").click();
        cy.get('[data-cy="screen-field-Name"]').should('be.visible');
        cy.get('[data-cy="screen-field-Name"]').type('Name').should('have.value', 'Name');
        cy.get('[data-cy="screen-field-form_input_2"]').type('name@gamil.com').should('have.value', 'name@gamil.com');
        cy.get('[data-cy="screen-field-form_input_3"]').type('Bolognia calliri #100').should('have.value', 'Bolognia calliri #100');
        //Submit button
        cy.get(submitSelector).click();
        request.verifyTaskIsCompletedB();
        cy.visit('/requests/' + requestId);
        //Open Completed tab
        cy.xpath("//a[text()='Completed']").should('be.visible').click();
        request.waitUntilTextcontainText('selector','varHeader','Completed');

        //Verify that Form Task Start was completed
        cy.xpath("//a[contains(text(),'Form Task Start')]").should('be.visible');
        //Verify that Form Task 2 was completed
        cy.xpath("(//a[contains(text(),'Form Task 3')])[1]").should('be.visible');
        //Verify that Task Buy was completed
        cy.xpath("(//a[contains(text(),'Task Buy')])[1]").should('be.visible');
    }
    actionsAndAssertionsOfTCP42137(requestId){
        //Complete Task 1
        cy.get('[data-cy="add-row"]').should('be.visible');
        cy.get('[data-cy="add-row"]').click();
        cy.xpath('(//input[@name="input1"])[1]').type('Recordlist1 input1');
        cy.xpath('(//textarea[@name="textArea1"])[1]').type('Recordlist1 textarea1',{delay:300});
        cy.wait(2000);
        cy.xpath("//button[text()='Ok']").click();
        cy.get('[data-cy="add-row"]').click();
        cy.xpath('(//input[@name="input1"])[1]').type('Recordlist2 input1');
        cy.xpath('(//textarea[@name="textArea1"])[1]').type('Recordlist2 textarea1',{delay:300});
        cy.wait(2000);
        cy.xpath("//button[text()='Ok']").click();
        cy.get('[data-cy="add-row"]').click();
        cy.xpath('(//input[@name="input1"])[1]').type('Recordlist3 input1');
        cy.xpath('(//textarea[@name="textArea1"])[1]').type('Recordlist3 textarea1',{delay:300});
        cy.wait(2000);
        
        cy.xpath("//button[text()='Ok']").click();
        
        cy.get('[name="input2"]').type('loop1 input2');
        cy.get('[name="textArea2"]').type('loop1 textarea2');
        
        
        cy.xpath('(//i[@class="fas fa-plus"])[2]').click();
        cy.xpath('(//input[@name="input2"])[2]').type('loop2 input 2');
        cy.xpath('(//textarea[@name="textArea2"])[2]').type('loop2 textarea 2',{delay:300});
        
        
        cy.xpath('(//i[@class="fas fa-plus"])[2]').click();
        cy.xpath('(//input[@name="input2"])[3]').type('loop3 input 2');
        cy.xpath('(//textarea[@name="textArea2"])[3]').type('loop3 textarea 2',{delay:300});
        
        
        cy.xpath('(//i[@class="fas fa-plus"])[2]').click();
        cy.xpath('(//input[@name="input2"])[4]').type('loop4 input 2');
        cy.xpath('(//textarea[@name="textArea2"])[4]').type('loop4 textarea 2',{delay:300});
        cy.wait(2000);
        
        cy.get('button[aria-label="New Submit"]').click();
        request.verifyTaskIsCompletedB();

        //Complete Task 2
        cy.visit('/requests/' + requestId);
        cy.xpath("//a[contains(text(),'Form Task 2')]").should('be.visible');
        request.clickOnTaskName(1,1);
        cy.xpath('(//div[@class="multiselect__select"])[1]').should('be.visible');
        cy.xpath('(//div[@class="multiselect__select"])[1]').click();
        cy.wait(2000);
        cy.xpath('//li//span[text()="Recordlist1 input1"]').should('be.visible');
        cy.xpath('//li//span[text()="Recordlist2 input1"]').should('be.visible');
        cy.xpath('//li//span[text()="Recordlist3 input1"]').should('be.visible');
        cy.xpath('//li//span[text()="Recordlist3 input1"]').click();
        cy.xpath('(//div[@class="multiselect__select"])[2]').click();
        cy.wait(2000);
        cy.xpath('//li//span[text()="Recordlist1 textarea1"]').should('be.visible');
        cy.xpath('//li//span[text()="Recordlist2 textarea1"]').should('be.visible');
        cy.xpath('//li//span[text()="Recordlist3 textarea1"]').should('be.visible');
        cy.xpath('//li//span[text()="Recordlist2 textarea1"]').click();
        cy.xpath('(//div[@class="multiselect__select"])[3]').click();
        cy.wait(2000);
        cy.xpath('(//li//span[text()="2022-07-13"])[1]').should('be.visible');
        cy.xpath('(//li//span[text()="2022-07-13"])[2]').should('be.visible');
        cy.xpath('(//li//span[text()="2022-07-13"])[3]').should('be.visible');
        cy.xpath('(//li//span[text()="2022-07-13"])[2]').click();
        cy.xpath('(//div[@class="multiselect__select"])[4]').click();
        cy.wait(2000);
        cy.xpath('(//li//span[contains(text(),"2022-07-12T")])[1]').should('be.visible');
        cy.xpath('(//li//span[contains(text(),"2022-07-12T")])[2]').should('be.visible');
        cy.xpath('(//li//span[contains(text(),"2022-07-12T")])[3]').should('be.visible');
        cy.xpath('(//li//span[contains(text(),"2022-07-12T")])[2]').click();

        //Add Loop
        cy.get('[data-cy="loop-loop_2-add"]').click();
        cy.xpath('(//div[@class="multiselect__select"])[5]').click();
        cy.wait(2000);
        cy.xpath('(//li//span[text()="Recordlist1 input1"])[2]').should('be.visible');
        cy.xpath('(//li//span[text()="Recordlist2 input1"])[2]').should('be.visible');
        cy.xpath('(//li//span[text()="Recordlist3 input1"])[2]').should('be.visible');
        cy.xpath('(//li//span[text()="Recordlist3 input1"])[2]').click();
        cy.xpath('(//div[@class="multiselect__select"])[6]').click();
        cy.wait(2000);
        cy.xpath('(//li//span[text()="Recordlist1 textarea1"])[2]').should('be.visible');
        cy.xpath('(//li//span[text()="Recordlist2 textarea1"])[2]').should('be.visible');
        cy.xpath('(//li//span[text()="Recordlist3 textarea1"])[2]').should('be.visible');
        cy.xpath('(//li//span[text()="Recordlist2 textarea1"])[2]').click();
        cy.xpath('(//div[@class="multiselect__select"])[7]').click();
        cy.wait(2000);
        cy.xpath('(//li//span[text()="2022-07-13"])[4]').should('be.visible');
        cy.xpath('(//li//span[text()="2022-07-13"])[5]').should('be.visible');
        cy.xpath('(//li//span[text()="2022-07-13"])[6]').should('be.visible');
        cy.xpath('(//li//span[text()="2022-07-13"])[5]').click();
        cy.xpath('(//div[@class="multiselect__select"])[8]').click();
        cy.wait(2000);
        cy.xpath('(//li//span[contains(text(),"2022-07-12T")])[4]').should('be.visible');
        cy.xpath('(//li//span[contains(text(),"2022-07-12T")])[5]').should('be.visible');
        cy.xpath('(//li//span[contains(text(),"2022-07-12T")])[6]').should('be.visible');
        cy.xpath('(//li//span[contains(text(),"2022-07-12T")])[5]').click();

        //Add Data to loop
        cy.get('[data-cy="loop-loop_2-add"]').click();
        cy.xpath('(//div[@class="multiselect__select"])[9]').click();
        cy.wait(2000);
        cy.xpath('(//li//span[text()="Recordlist1 input1"])[3]').should('be.visible');
        cy.xpath('(//li//span[text()="Recordlist2 input1"])[3]').should('be.visible');
        cy.xpath('(//li//span[text()="Recordlist3 input1"])[3]').should('be.visible');
        cy.xpath('(//li//span[text()="Recordlist3 input1"])[3]').click();
        cy.xpath('(//div[@class="multiselect__select"])[10]').click();
        cy.wait(2000);
        cy.xpath('(//li//span[text()="Recordlist1 textarea1"])[3]').should('be.visible');
        cy.xpath('(//li//span[text()="Recordlist2 textarea1"])[3]').should('be.visible');
        cy.xpath('(//li//span[text()="Recordlist3 textarea1"])[3]').should('be.visible');
        cy.xpath('(//li//span[text()="Recordlist2 textarea1"])[3]').click();
        cy.xpath('(//div[@class="multiselect__select"])[11]').click();
        cy.wait(2000);
        cy.xpath('(//li//span[text()="2022-07-13"])[7]').should('be.visible');
        cy.xpath('(//li//span[text()="2022-07-13"])[8]').should('be.visible');
        cy.xpath('(//li//span[text()="2022-07-13"])[9]').should('be.visible');
        cy.xpath('(//li//span[text()="2022-07-13"])[8]').click();
        cy.xpath('(//div[@class="multiselect__select"])[12]').click();
        cy.wait(2000);
        cy.xpath('(//li//span[contains(text(),"2022-07-12T")])[7]').should('be.visible');
        cy.xpath('(//li//span[contains(text(),"2022-07-12T")])[8]').should('be.visible');
        cy.xpath('(//li//span[contains(text(),"2022-07-12T")])[9]').should('be.visible');
        cy.xpath('(//li//span[contains(text(),"2022-07-12T")])[8]').click();

        //Add Data to Recovered Data of Loop
        cy.xpath('(//div[@class="multiselect__select"])[13]').click();
        cy.wait(2000);
        cy.xpath('//li//span[text()="loop1 input2"]').should('be.visible');
        cy.xpath('//li//span[text()="loop2 input 2"]').should('be.visible');
        cy.xpath('//li//span[text()="loop3 input 2"]').should('be.visible');
        cy.xpath('//li//span[text()="loop4 input 2"]').should('be.visible');
        cy.xpath('//li//span[text()="loop3 input 2"]').click();
        cy.xpath('(//div[@class="multiselect__select"])[14]').click();
        cy.wait(2000);
        cy.xpath('//li//span[text()="loop1 textarea2"]').should('be.visible');
        cy.xpath('//li//span[text()="loop2 textarea 2"]').should('be.visible');
        cy.xpath('//li//span[text()="loop3 textarea 2"]').should('be.visible');
        cy.xpath('//li//span[text()="loop4 textarea 2"]').should('be.visible');
        cy.xpath('//li//span[text()="loop3 textarea 2"]').click();
        cy.xpath('(//div[@class="multiselect__select"])[15]').click();
        cy.wait(2000);
        cy.xpath('(//li//span[text()="2022-07-26"])[1]').should('be.visible');
        cy.xpath('(//li//span[text()="2022-07-26"])[2]').should('be.visible');
        cy.xpath('(//li//span[text()="2022-07-26"])[3]').should('be.visible');
        cy.xpath('(//li//span[text()="2022-07-26"])[4]').should('be.visible');
        cy.xpath('(//li//span[text()="2022-07-26"])[3]').click();//tercer
        cy.xpath('(//div[@class="multiselect__select"])[16]').click();
        cy.wait(2000);
        cy.xpath('(//li//span[contains(text(),"2022-07-24T")])[1]').should('be.visible');
        cy.xpath('(//li//span[contains(text(),"2022-07-24T")])[2]').should('be.visible');
        cy.xpath('(//li//span[contains(text(),"2022-07-24T")])[3]').should('be.visible');
        cy.xpath('(//li//span[contains(text(),"2022-07-24T")])[4]').should('be.visible');
        cy.xpath('(//li//span[contains(text(),"2022-07-24T")])[3]').click();//tercero
        cy.xpath('//button[text()[normalize-space()="New Submit"]]').click();
        request.verifyRequestisCompleted(requestId);
    }

    actionsAndAssertionsOfTCP42385(requestId){
        //Step 3: Complete Form Task 1
        cy.xpath('//*[contains(text(),"New Textarea")]').should('be.visible');
        cy.xpath('(//*[@class="tox-edit-area__iframe"])[1]').then($iframe => {
            const iframe1 = $iframe.contents().find('body');
            cy.wrap(iframe1)
                .click()
                .type('first textarea{selectAll}');
            cy.xpath("(//button[@aria-label = 'Bold'])[1]").should('be.visible').click();
            cy.xpath("(//button[@aria-label = 'Italic'])[1]").should('be.visible').click();
            cy.xpath("(//span[@role='presentation'])[2]").should('be.visible').click();
            //cy.xpath("//div[@title = 'Yellow']").should('be.visible').click();
            cy.wrap(iframe1)
                .click()
        });
        cy.xpath('(//*[@class="tox-edit-area__iframe"])[2]').then($iframe => {
            const iframe2 = $iframe.contents().find('body');
            cy.wrap(iframe2)
                .click()
                .type('first loop textarea{selectAll}');
            cy.xpath("(//button[@aria-label = 'Bold'])[2]").should('be.visible').click();
            cy.xpath("(//button[@aria-label = 'Italic'])[2]").should('be.visible').click();
            cy.xpath("(//span[@role='presentation'])[4]").should('be.visible').click();
            //cy.xpath("//div[@title = 'Green']").should('be.visible').click();
            cy.wrap(iframe2)
                .click()
        });

        //Step 4: Add a new Item
        cy.xpath("(//button[@title = 'Add Item'])[1]").should('be.visible').click();
        cy.xpath('(//*[@class="tox-edit-area__iframe"])[3]').then($iframe => {
            const iframe3 = $iframe.contents().find('body');
            cy.wrap(iframe3)
                .click()
                .type('second loop textarea{selectAll}');
            cy.xpath("(//button[@aria-label = 'Bold'])[3]").should('be.visible').click();
            cy.xpath("(//button[@aria-label = 'Italic'])[3]").should('be.visible').click();
            cy.xpath("(//span[@role='presentation'])[6]").should('be.visible').click();
            //cy.xpath("//div[@title = 'Red']").should('be.visible').click();
            cy.wrap(iframe3)
                .click()
        });

        //Step 5: Add a new Item
        cy.xpath("(//button[@title = 'Add Item'])[1]").click();
        cy.xpath('(//*[@class="tox-edit-area__iframe"])[4]').then($iframe => {
            const iframe4 = $iframe.contents().find('body');
            cy.wrap(iframe4)
                .click()
                .type('third loop textarea{selectAll}');
            cy.xpath("(//button[@aria-label = 'Bold'])[4]").should('be.visible').click();
            cy.xpath("(//button[@aria-label = 'Italic'])[4]").should('be.visible').click();
            cy.xpath("(//span[@role='presentation'])[8]").should('be.visible').click();
            //cy.xpath("//div[@title = 'Dark Purple']").should('be.visible').click();
            cy.wrap(iframe4)
                .click()
        });
        cy.xpath("//input[@name = 'form_input_1']").type('1');
        // cy.wait(3000);
        // cy.reload();

        //Step 6: Add a new Item
        cy.xpath("(//button[@title = 'Add Item'])[2]").should('be.visible').click();
        cy.xpath("(//input[@name = 'form_input_1'])[2]").type('2');

        //Step 7: Add a new Item
        cy.xpath("(//button[@title = 'Add Item'])[2]").should('be.visible').click();
        cy.xpath("(//input[@name = 'form_input_1'])[3]").type('3');

        //Step 8: Add a new Item
        cy.xpath("(//button[@title = 'Add Item'])[2]").should('be.visible').click();
        cy.xpath("(//input[@name = 'form_input_1'])[4]").type('4');
        cy.xpath("(//input[@name = 'form_input_1'])[4]").should('have.value','4');

        //Step 9: Send Submit button
        cy.xpath("//button[@aria-label = 'New Submit']").should('be.visible');
        cy.xpath("//button[@aria-label = 'New Submit']").should('be.enabled').click();
        cy.wait(4000);
        request.verifyTaskIsCompletedB();

        //Step 10: Complete Form Task 2
        cy.visit('/requests/' + requestId);
        request.waitUntilElementIsVisible('selector', '#pending >* td:nth-child(1) >a[href^="/tasks"]');
        request.clickOnTaskName(1, 1);

        //Step 11: Review form
        cy.xpath("//input[@name = 'form_input_1']").should('have.value', '1');
        cy.xpath("(//input[@name = 'form_input_1'])[2]").should('have.value', '2');
        cy.xpath("(//input[@name = 'form_input_1'])[3]").should('have.value', '3');
        cy.xpath("(//input[@name = 'form_input_1'])[4]").should('have.value', '4');
        cy.xpath("//button[@aria-label = 'New Submit']").should('be.visible').click();
        request.verifyTaskIsCompletedB();

        //Step 12: Review the request completed
        request.waitUntilTextcontainText('selector','varHeader','Completed');
        cy.xpath("//td[text()='loop_1.0.form_text_area_1']/following-sibling::td").should('be.visible');
        cy.xpath("//td[text()='loop_1.1.form_text_area_1']/following-sibling::td").should('be.visible');
        cy.xpath("//td[text()='loop_1.2.form_text_area_1']/following-sibling::td").should('be.visible');
        cy.xpath("//td[text()='loop_2.0.form_input_1']/following-sibling::td").should('be.visible');
        cy.xpath("//td[text()='loop_2.1.form_input_1']/following-sibling::td").should('be.visible');
        cy.xpath("//td[text()='loop_2.2.form_input_1']/following-sibling::td").should('be.visible');
        cy.xpath("//td[text()='loop_2.3.form_input_1']/following-sibling::td").should('be.visible');
        cy.xpath("//td[text()='form_text_area_2']/following-sibling::td").should('be.visible');
        cy.xpath("//div[contains(text(),'has completed the task Form Task')]").should('be.visible');
        cy.xpath("//div[contains(text(),'has completed the task Form Task 2')]").should('be.visible');
        cy.xpath("//div[contains(text(),'has completed the task Script Task')]").should('be.visible');
    }
}
