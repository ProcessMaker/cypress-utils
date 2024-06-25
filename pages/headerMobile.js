//import { NavigationHelper } from "#helpers/navigationHelper";
export class HeaderMobile {
    /**
     * Method used to search a process and press `start` button from mobile view
     * @param processName, Process name to create a Case
     * @param nroStartEvent, A process can have many start events, then this parameter select one of them
     */
    createCaseMobile(processName, nroStartEvent = 0){
        cy.get('button[id="navbar-request-button-mobile"]').should("be.visible").click();
        cy.get('div[class="modal-content"]').eq(1).should("be.visible").within(() => {
            cy.get('[data-test="new-request-modal-search-input"]').type(processName, {delay:100});
            cy.get('button[data-test="new-request-modal-process-start-button"]').eq(nroStartEvent).click();
        });
        cy.get('div[id="navbarTaskMobile"]').should('be.visible');
    }

    /**
     * header can select the option two options change to desktop view or logout 
     * @param {option} option 
     */
    selectOptionUser(option = "Log Out") {
        let optionSelected = 1;
        cy.get('[class="content-nav"] a button[type="buttom"]').should("be.visible").click();
        switch(option){
            case "Switch to Desktop View":
                optionSelected = 0;
                break;
            default: 
                optionSelected = 1;
        }
        cy.get('div a[class="dropdown-item"]').should("be.visible").eq(optionSelected).click();
        cy.url().should("contain", "/login");
    }

    /**
     * Select a tab in mobile version
     * @param {tabName} tabName should be Tasks, Cases, or default Processes tab 
     */

    selectTab(tabName){
        switch(tabName){
            case "Tasks":
                cy.get('li[role="presentation"]').eq(0).click();
                cy.url().should("contain", "/tasks");
                break;
            case "Cases":
                cy.get('li[role="presentation"]').eq(1).click();
                cy.url().should("contain", "/cases");
                break;
            default:
                cy.get('li[role="presentation"]').eq(2).click();
                cy.url().should("contain", "/process-browser");
        }
        
    }

    /**
     * Press back arroy button when a screen is displayed
     */
    pressBackArroyTask() {
        cy.get('[id="navbarTaskMobile"] button i[class="fas fa-arrow-left"]').should("be.visible").click();
    }

    /**
     * Press `Prev` button when a screen is displayed
     */
    pressPrevButtonTask() {
        cy.get('[id="navbarTaskMobile"] button i[class="fas fa-chevron-left mr-1"]').should("be.visible").click();
    }

    /**
     * Press `Next` button when a screen is displayed
     */
    pressNextButtonTask() {
       cy.get('[id="navbarTaskMobile"] button i[fas fa-chevron-right ml-1]').should("be.visible").click();
    }

    /**
     * Press `info` button when a screen is displayed
     */
    pressInfoButtonTask() {
        cy.get('[id="navbarTaskMobile"] button i[class="fas fa-info-circle"]').should("be.visible").click();
    }
}
