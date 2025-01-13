import selectors from "#selectors/requests"
import promisify from 'cypress-promise';
import { NavigationHelper } from "#helpers/navigationHelper";

let navHelper = new NavigationHelper();
export class Requests {
    clickOnTaskName(rowIndex, coloumnIndex) {
        cy.xpath(selectors.taskOption).should('be.visible').click({force:true});
        cy.xpath((selectors.tasksTableCell.replace('rowIndex', rowIndex).replace('coloumnIndex', coloumnIndex)) + '//a').should('be.visible').click({ force: true });
    }

    async waitUntilTheRequestIsCompleted(timeOut) {
        var status;
        for (var i = 0; i < timeOut / 5; i++) {
            const text = await promisify(cy
                .get('h4')
                .then(el => el.text())
            )
            cy.log(text);
            if (text == 'Completed') {
                return true;
            }
            cy.wait(5000);
            cy.reload();
        }
        return false;
    }


    processIsInprogress(requestId) {
        cy.visit('/requests/' + requestId);
        cy.xpath("//h4[text()='In Progress']").should('be.visible');
    }

    openRequestById(requestId) {
        cy.wait(2000);
        cy.visit('/requests/' + requestId);
        cy.xpath("(//div[@id='pending']//*[@class='vuetable-slot'])[1]").should('be.visible');
    }

    openRequestByName(processName) {
        navHelper.navigateToInprogressRequests();
        this.addRequestNameToSelectList(processName);
        cy.xpath(selectors.requestInputOption.replace('processName', processName))
            .should('be.visible').click();
        cy.xpath("(//*[@class='vuetable-slot'])[1]").should('be.visible');
        this.getRequestID();
    }

    addRequestNameToSelectList(processName) {
        cy.get(selectors.filterTextArea).should('be.visible');
        cy.get(selectors.filterTextArea).type(processName,{delay:100}).should('have.value', processName);
        cy.get(selectors.filterTextArea).type('{enter}');
    }

    async getRequestID() {
        const requestId = await promisify(cy.url().then(url => {
            return url.split('/')[4].trim();
        }))
        return requestId;
    }


    verifyTaskIsCompleted() {
        cy.xpath(selectors.taskAlertTxt).should('be.visible');
        cy.xpath(selectors.taskAlertTxt).should('not.exist');
    }
    verifyTaskIsCompletedB() {
        cy.wait(2000);
        cy.xpath(selectors.taskAlertTxt).should('not.exist');
    }
    verifyTaskIsCompletedWithoutMessage() {
        cy.get('[data-cy="tasks-table"]').should('be.visible');
        cy.xpath(selectors.taskAlertTxt).should('not.exist');
    }
    clickOnSubmitButton() {
        cy.get(selectors.submitBtn).click({ force: true });
    }

    openTask(taskName) {
        cy.xpath(selectors.taskValueTxt.replace('taskName', taskName)).should('be.visible');
        cy.xpath(selectors.taskValueTxt.replace('taskName', taskName)).click();

    }
    verifyRequestisCompleted(requestId) {
        cy.visit('/requests/' + requestId);
        var p = 5;
        for (var i = 0; i < p; i++) {
            cy.get('.list-group > .card-header').then(el => {
                var text = el.text();
                if (text == 'Completed') {
                    p = 0;
                }
                else {
                    cy.wait(5000);
                    cy.reload();
                }
            })

        }
        cy.get(selectors.verifyRequestIsCompleted).should('be.visible');
    }
    manualtaskcomplete() {
        cy.get(selectors.manualtaskcompleteBtn).click();
    }
    verifytaskiscompleted() {
        cy.xpath(selectors.verifyTaskIsCompleted).should('be.visible');
        cy.wait(1000);
    }
    gotocompletedrequest(name) {
        cy.wait(2000);
        cy.xpath(selectors.clickonrequestpage).click();
        cy.xpath(selectors.verifyrequestpage).should('be.visible');
        cy.xpath(selectors.clickoncompleted).click();
        cy.xpath(selectors.verifyCmpltdrequestpage).should('be.visible');
        cy.xpath(selectors.clickonPrcssDrpDwn).click();
        cy.xpath(selectors.clickonPrcssSrchBx).type(name);
        cy.xpath(selectors.clickonPrcssSrchBx).type('{enter}');
        cy.wait(3000);
        cy.xpath(selectors.clickonSearchBtn).click();
        cy.xpath(selectors.verifyPrcssCmpltd).should('be.visible');
        cy.xpath(selectors.openCmpltdPrcss).click();
    }
    clickonfilemanager() {
        cy.xpath(selectors.clickonfilemanager).click();
    }

    /**
     * This method is responsible for start a request in a process with many start events
     * @param processName: name of process to start a request
     * @param nroButton: number of start button
     * @return nothing returns
     */
    openNewRequestByNumberStartButton(processName, nroButton) {
        const processRow = "//span[text()='processName']/parent::div/parent::div[@class='row']";

        cy.get('button[id="navbar-request-button"]').click();
        cy.get('[id="requests-modal"]>* [class="process-list"]').should('exist');
        cy.get('input[class="form-control"]').type(processName).should('have.value',processName);
        cy.wait(3000);
        cy.get('[id="requests-modal"]>* [class="process-list"]').should('exist');
        cy.xpath(selectors.request_searchProcessRow.replace('processName',processName), { timeout: 10000 })
            .then(() => {
                this.pressStartBTN(processName, nroButton);
            });
    }

    //Press Start button to start a Request
    pressStartBTN(processName, nroButton) {
        cy.wait(3000);
        cy.xpath(selectors.request_startButtonRow.replace('processName',processName)).eq(nroButton).should('be.visible').click();
        cy.get('.list-group > .card-header').should('be.visible');
    }

    //Open the task according to Task Name after that a Request was created.
    openTaskByTaskName(taskName) {
        var taskXpath = '//div[@id="requestTabContent"]//div[@id="pending"]//a[contains(text(),"taskName")]';
        cy.xpath(taskXpath.replace('taskName',taskName)).should('be.visible');
        cy.xpath(taskXpath.replace('taskName',taskName)).click();
    }

    verifyTitlePage(title) {
        cy.visit('/requests');
        cy.title().should('eq', title);
    }
    verifySidebarMenuOption(num, option) {
        cy.get('.nav-item.filter-bar.justify-content-between.py-2.sidebar-expansion').click();
        cy.get('.nav-item.filter-bar.justify-content-between').eq(num).should('contain', option);
    }

    /**
     * This method is responsible for start a request according to process with unique start event
     * @param processname: name of process to start a request
     * @return nothing returns
     */
    openNewRequest(processname) {
        //Click on +CASE
        cy.get('button[id="navbar-request-button"]').should("be.visible");
        cy.get('button[id="navbar-request-button"]').click();
        cy.xpath('//div[@id="requests-modal"]//*[contains(@class,"modal-content")]').should('be.visible');
        //Verify that list finish to load
        cy.get('[id="requests-modal"]>* [class="process-list"]').should('exist');
        //Write the Process name
        cy.get('input[class="form-control"]').type(processname).should('have.value',processname);
        cy.wait(3000);
        cy.get('[id="requests-modal"]>* [class="process-list"]').should('exist');
        //Click on the Start Button
        cy.xpath(selectors.request_searchProcessRow.replace('processName',processname), { timeout: 10000 })
            .then(() => {
                cy.xpath(selectors.request_startButtonRow.replace('processName',processname)).should('be.visible');
                cy.wait(2000);
                cy.xpath(selectors.request_startButtonRow.replace('processName',processname)).click();
                cy.title().should('contain', '- ProcessMaker');
            });
        cy.get('.list-group > .card-header').should('be.visible');
    }

    openRequestByNameForCompletedProcess(processName) {
        navHelper.navigateToCompletedRequests();
        this.addRequestNameToSelectList(processName);
        cy.xpath(selectors.requestInputOption.replace('processName', processName)).click();
        cy.xpath('//div[@id="details"]//span[text()="Completed"]').should('be.visible');
    }

    /**
     * This method is responsible wait until a text is visible in a component
     * @param type: type of selector, this could be "selector, xpath"
     * @param selectorXPath: selector or xpath of element like: (//div['id=user'], [data.cy="id2"])
     * @param text: text that the element should to ave
     * @param maxAttempts: # to try , 10 by defauls
     * @param attempts: it is not change
     * @return nothing returns
     */
    waitUntilTextcontainText(type,selectorXPath,text,maxAttempts=10, attempts=0){
        if(selectorXPath==='varHeader')
            selectorXPath= selectors.headerCompleted;
        if (attempts > maxAttempts) {
            throw new Error("Timed out waiting for report to be generated");
        }
        if(type === 'selector'){
            cy.get(selectorXPath).should('be.visible').invoke('text')
                .then($val => {
                    if ($val !== text) {  // do your condition check synchronously
                        cy.wait(3000);
                        cy.reload();
                        this.waitUntilTextcontainText(type,selectorXPath,text,maxAttempts, attempts+1);
                    }
                })
        }else{
            cy.xpath(selectorXPath).should('be.visible').invoke('text')
                .then($val => {
                    if ($val !== text) {  // do your condition check synchronously
                        cy.wait(3000);
                        cy.reload();
                        this.waitUntilTextcontainText(type,selectorXPath,text,maxAttempts, attempts+1);
                    }
                })
        }

    }
    openProcessInTaskPage(name,formTaskName){
        cy.xpath(selectors.searchProcessDrpDwn).click();
        cy.xpath(selectors.searchProcessTxtBx).type(name);
        cy.xpath(selectors.searchProcessTxtBx).type('{enter}');
        cy.wait(2000);
        cy.xpath(selectors.searchTaskNameTxtBx).type(formTaskName);
        cy.wait(2000);
        cy.xpath(selectors.searchTaskNameTxtBx).type('{enter}');
        cy.xpath(selectors.clickonSearchBtn).click();
        cy.xpath(selectors.openTheProcess).should('be.visible').click();
    }

    /**
     * This method is responsible to wait until elemnt is visible
     * @param type: type of selector, this could be "selector, xpath"
     * @param selectorXPath: selector or xpath of element like: (//div['id=user'], [data.cy="id2"])
     * @param maxAttempts: # to try , 10 by default
     * @param attempts: it is not change
     * @return nothing returns
     */
    waitUntilElementIsVisible(type,selectorXPath,maxAttempts=18, attempts=0){
        if (attempts > maxAttempts) {
            throw new Error("Timed out waiting for report to be generated");
        }
        if(type === 'selector'){
            cy.wait(3000);
            cy.xpath('//body')
                .then($body => {
                    if ($body.find(selectorXPath).length <= 0) {
                        cy.reload();
                        this.waitUntilElementIsVisible(type,selectorXPath,maxAttempts, attempts+1);
                    }
                })
        }

    }
    openRequestByNameForAllCompletedProcess(processName) {
        navHelper.navigateToCompletedRequests();
        this.addRequestNameToSelectList(processName);
        // cy.xpath(selectors.requestInputOption.replace('processName', processName)).click();
        // cy.xpath(selectors.completedTxt).should('be.visible');
    }
    openInPogressProcessInInProgress(processName){
        navHelper.navigateToInprogressRequests();
        this.addRequestNameToSelectList(processName);
        cy.xpath(selectors.requestInputOption.replace('processName', processName)).click({force:true});
    }

    openInPogressProcessInAllRequests(processName){
        navHelper.navigateToAllRequests();
        this.addRequestNameToSelectList(processName);
        cy.xpath(selectors.requestInputOption.replace('processName', processName)).click({force:true});
    }
    openAllRequestByName(processName) {
        navHelper.navigateToInprogressRequests();
        this.addRequestNameToSelectList(processName);
        // cy.xpath(selectors.requestInputOption.replace('processName', processName)).click();
        // cy.xpath("(//*[@class='vuetable-slot'])[1]").should('be.visible');
        // this.getRequestID();
    }

    /**
     * This method is responsible to wait until element cant are visible
     * @param type: type of selector, this could be "selector, xpath"
     * @param selector: selector or xpath of element like: (//div['id=user'], [data.cy="id2"])
     * @param maxAttempts: # to try , 10 by default
     * @param attempts: it is not change
     * @param cant: number of elemenst to be visible
     * @return nothing returns
     */
    waitUntilElementIsVisibleCant(type,selector,cant,maxAttempts=10, attempts=0){
        if (attempts > maxAttempts) {
            throw new Error("Timed out waiting for report to be generated");
        }
        if(type === 'selector'){
            cy.wait(3000);
            cy.xpath('//body')
                .then($body => {
                    if ($body.find(selector).length < cant) {
                        cy.reload();
                        this.waitUntilElementIsVisibleCant(type,selector,cant,maxAttempts, attempts+1);
                    }
                })
        }
    }
    searchProcessInAllRequest(PMQL,processName){
        cy.get('[aria-label="Advanced Search (PMQL)"]')
            .should('be.visible')
            .click();
        cy.get('textarea[aria-label="Advanced Search (PMQL)"]')
            .should('be.visible')
            .type(PMQL,{delay:100})
            .should('have.value',PMQL)
            .type('{enter}');
        cy.get('i[class="fa fa-search ml-3 pmql-icons"]')
            .should('be.visible')
            .click();
        cy.xpath('//tbody//td[3]//div[@class="pm-table-truncate"]')
            .should('contain',processName);
    }
    
    /**
     * This method is responsible to do click over Data tab when a Request is completed
     * @param None: None
     * @return nothing returns
     */
    pressDataTab() {
        cy.xpath("//ul[@id='requestTab']//a[@id='editdata-tab']").should(
            "be.visible"
        );
        cy.xpath("//ul[@id='requestTab']//a[@id='editdata-tab']").click();
    }

    /**
    * This method is responsible for start a request when the start event has the interstitial activated
    * @param processname: name of process to start a request
    * @return nothing returns
    */
    openNewRequestInterstitial(processname) {
       //Click on +CASE
        cy.get('button[id="navbar-request-button"]').should("be.visible");
        cy.get('button[id="navbar-request-button"]').click();
        cy.xpath('//div[@id="requests-modal"]//*[contains(@class,"modal-content")]').should('be.visible');
        //Verify that list finish to load
        cy.get('[id="requests-modal"]>* [class="process-list"]').should('exist');
       //Write the Process name
       cy.get(selectors.request_search_input).type(processname).should('have.value',processname);
       cy.wait(3000);
       cy.get('[id="requests-modal"]>* [class="process-list"]').should('exist');
       //Click on the Start Button
       cy.xpath(selectors.request_searchProcessRow.replace("processName", processname),{ timeout: 10000 })
           .then(() => {
               cy.xpath(selectors.request_startButtonRow.replace('processName',processname)).should('be.visible');
               cy.wait(2000);
               cy.xpath(selectors.request_startButtonRow.replace('processName',processname)).click();
               cy.url().should("include", "/tasks/");
           });
    }
    /**
     * This method is responsible for click on card of Cases
     * @param cardName: name card ("My Cases","In Progress","Completed","All Cases")
     * @return nothing returns
     */
    clickOnMyCasesCard(cardName){
        cy.xpath(selectors.cardRequests.replace("name",cardName))
            .should('be.visible')
            .click();
    }
}
