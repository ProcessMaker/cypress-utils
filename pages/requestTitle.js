import selectors from "#selectors/requestTitle";
import { NavigationHelper } from "#helpers/navigationHelper";
import { Process } from "./process";

const navHelper = new NavigationHelper();
const process = new Process();

export class RequestTitle {

    //REQUEST TITLE IN CONFIGURATION OF PROCESS
    //Case title
    configureCaseTitle(caseTitle){
        cy.get(selectors.caseTitleField).should('be.visible').click().clear();
        cy.get(selectors.caseTitleField).type(caseTitle);
        cy.xpath('//div[@aria-label="Category"]//span[text()="Uncategorized"]').should('be.visible');
        cy.xpath('//div[@id="nav-config"]//button[text()="Save"]').should('be.visible').click({force: true});
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should('be.visible');
    }

    //REQUEST TITLE IN REQUEST PAGE
    
    //MODAL FILTER
    clickOnFilter(){
        cy.get(selectors.filterBtn).should('be.visible').click();
    }

    selectProcess(process){
        cy.xpath(selectors.labelProcess).should('be.visible');
        cy.xpath(selectors.containerProcess).click();
        cy.xpath(selectors.inputProcess).should('be.visible');
        cy.xpath(selectors.inputProcess).type(`{backspace}${process}`,{ force: true,delay:300}).should('have.value',process);
        cy.xpath(selectors.itemProcess).should('have.attr', 'aria-label').and('equal', `${process}. `);
        cy.xpath(selectors.inputProcess).type('{enter}');
    }

    selectStatus(status){
        cy.xpath(selectors.labelStatus).should('be.visible');
        cy.xpath(selectors.containerStatus).click();
        cy.xpath(selectors.inputStatus).should('be.visible');
        cy.xpath(selectors.inputStatus).type(`{backspace}${status}`,{ force: true,delay:300}).should('have.value',status);
        cy.xpath(selectors.itemStatus).should('have.attr', 'aria-label').and('equal', `${status}. `);
        cy.xpath(selectors.inputStatus).type('{enter}');
        
    }

    selectRequester(requester){
        cy.xpath(selectors.labelRequester).should('be.visible');
        cy.xpath(selectors.containerRequester).click();
        cy.xpath(selectors.inputRequester).should('be.visible');
        cy.xpath(selectors.inputRequester).type(`{backspace}${requester}`,{ force: true,delay:300}).should('have.value',requester);
        cy.xpath(selectors.itemRequester).should('have.attr', 'aria-label').and('equal', `${requester}. `);
        cy.xpath(selectors.inputRequester).type('{enter}');
    }

    selectParticipants(participants){
        cy.xpath(selectors.labelParticipants).should('be.visible');
        cy.xpath(selectors.containerParticipants).click();
        cy.xpath(selectors.inputParticipants).should('be.visible');
        cy.xpath(selectors.inputParticipants).type(`{backspace}${participants}`,{ force: true,delay:300}).should('have.value',participants);
        cy.xpath(selectors.itemParticipants).should('have.attr', 'aria-label').and('equal', `${participants}. `);
        cy.xpath(selectors.inputParticipants).type('{enter}');
    }

    selectCaseTitle(caseTitle){
        cy.xpath(selectors.labelCaseTitle).should('be.visible');
        cy.xpath(selectors.containerCaseTitle).click();
        cy.xpath(selectors.inputCaseTitle).should('be.visible');
        cy.xpath(selectors.inputCaseTitle).type(`{backspace}${caseTitle}`,{ force: true,delay:300}).should('have.value',caseTitle);
        cy.xpath(selectors.itemCaseTitle).should('have.attr', 'aria-label').and('equal', `${caseTitle}. `);
        cy.xpath(selectors.inputCaseTitle).type('{enter}');
    }

    clickOnApplyBtn(){
        cy.xpath(selectors.applyBtn).should('be.visible');
        cy.xpath(selectors.applyBtn).click();
    }

    clickOnResetBtn(){
        cy.xpath(selectors.resetBtn).should('be.visible');
        cy.xpath(selectors.resetBtn).click();
    }

    filter(filterConfig){
        const {process, status, requester, participants,caseTitle }= filterConfig

        if(process !== null) {
            this.selectProcess(process.processOption);
        }

        if(status !== null) {
            this.selectManualResumePoint(status.statusOption);
        }

        if(requester !== null) {
            this.selectScenario(requester.requesteOption);

        }

        if(participants !== null) {
            this.selectParticipants(participants.participantOption);
        }

        if(caseTitle ) {
            this.selectCaseTitle(caseTitle.caseTitleOption);
        }

        this. clickOnApplyBtn();
    }

    //SEARCH FIELD
    search(PMQL){
        cy.get(selectors.searchInput).should('be.visible');
        cy.get(selectors.searchInput).type(`${PMQL}`, { delay: 100 }).should("have.value", PMQL);
        cy.get(selectors.searchInput).type('{enter}', { force: true, delay: 200 })
        cy.get(selectors.jumbotron).should('not.be.visible');
        cy.wait(2000);
    }

    clearSearchInput(){
        cy.xpath(selectors.clearBtn).should('be.visible');
        cy.xpath(selectors.clearBtn).click();
        cy.get(selectors.jumbotron).should('be.visible');
        cy.get(selectors.jumbotron).should('not.be.visible');
    }

    //TABLE 
    clickOnOpenRequestBtn(){
        cy.get(selectors.openRequest).should('be.visible');
        cy.get(selectors.openRequest).click();
    }

    selectItemsPerPage(option,numberItems){
        cy.xpath(selectors.itemPerPage).should('be.exist');
        cy.xpath(selectors.itemPerPage).select(option,{force: true});
        cy.xpath(selectors.itemPerPage).should('have.value',option);
        cy.get(selectors.jumbotron).should('be.visible');
        cy.get(selectors.jumbotron).should('not.be.visible');
        cy.xpath(selectors.table).find('tr').then(($Rows) => {  
        expect($Rows).to.have.length(numberItems);
        }); 
    }

    verifyCaseTitleInColumn(caseTitle){
        this.verifyTitleinColumn(1,/case title/i);
        cy.xpath(selectors.bodyTable).should('contain', caseTitle);
    }

    verifyTaskNameInColumn(taskName){
        cy.get('[id="table-container"]').should('be.visible');
        this.verifyTitleinColumn(3,/task/i);
        cy.xpath('//table[@aria-label="custom-pm-table"]//tbody').should('contain', taskName);
    }

    cleanFilters(){
        for (let index = 0; index < 8;  index++) {
            if (index==3) {
                continue;  
            }
            cy.get('[id="table-container"]').should('be.visible');
            cy.get(`[id="pm-cff-button-pm-table-column-${index}"]`).click({force: true});
            cy.xpath(`//button[contains(text(),"Clear")]`).last().click({ force: true, timeout: 1000 });
            cy.get('[class="popover-body"]').should('not.exist');
        }
    }

    verifyTitleinColumn = function(numColumn,regex){
        cy.xpath(`//th[@id="-column-${numColumn}"]//div[@style="display: inline-block;"]`).invoke('text').then(($value)=>{
        expect($value).to.match(regex);
        }) 
    }

    clickOnSubmitBtn() {
        cy.get('button[aria-label="New Submit"]').should('be.visible');
        cy.get('button[aria-label="New Submit"]').click();
    }

    clickOnButton(label) {
        cy.get(`button[aria-label="${label}"]`).should('be.visible')
        cy.get(`button[aria-label="${label}"]`).click();
    }
}
