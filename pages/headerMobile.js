import selectors from "../selectors/headerMobile"
export class HeaderMobile {
    /**
     * Method used to search a process and press `start` button from mobile view
     * @param processName, Process name to create a Case
     * @param nroStartEvent, A process can have many start events, then this parameter select one of them
     */
    createCaseMobile(processName, nroStartEvent = 0){
        cy.get(selectors.createCaseMobile).should("be.visible").click();
        cy.get(selectors.panelCreateCase).eq(1).should("be.visible").within(() => {
            cy.get(selectors.searchFieldCreateCase).type(processName, {delay:100});
            cy.get(selectors.startButtonCreateCase).eq(nroStartEvent).click();
        });
        cy.get(selectors.HeaderMobile).should('be.visible');
    }

    /**
     * header can select the option two options change to desktop view or logout 
     * @param {option} option 
     */
    selectOptionUser(option = "Log Out") {
        let optionSelected = 1;
        cy.get(selectors.headerUserButton).should("be.visible").click();
        switch(option){
            case "Switch to Desktop View":
                optionSelected = 0;
                break;
            default: 
                optionSelected = 1;
        }
        cy.get(selectors.headerOptionList).should("be.visible").eq(optionSelected).click();
        cy.url().should("contain", "/login");
    }

    /**
     * Select a tab in mobile version
     * @param {tabName} tabName should be Tasks, Cases, or default Processes tab 
     */

    selectTab(tabName){
        switch(tabName){
            case "Tasks":
                cy.get(selectors.tabs).eq(0).click();
                cy.url().should("contain", "/tasks");
                break;
            case "Cases":
                cy.get(selectors.tabs).eq(1).click();
                cy.url().should("contain", "/cases");
                break;
            default:
                cy.get(selectors.tabs).eq(2).click();
                cy.url().should("contain", "/process-browser");
        }
        
    }

    /**
     * Press back arroy button when a screen is displayed
     */
    pressBackArroyTask() {
        cy.get(selectors.backArroyButtonTask).should("be.visible").click();
    }

    /**
     * Press `Prev` button when a screen is displayed
     */
    pressPrevButtonTask() {
        cy.get(selectors.prevButtonTask).should("be.visible").click();
    }

    /**
     * Press `Next` button when a screen is displayed
     */
    pressNextButtonTask() {
       cy.get(selectors.nextButtonTask).should("be.visible").click();
    }

    /**
     * Press `info` button when a screen is displayed
     */
    pressInfoButtonTask() {
        cy.get(selectors.infoButtonTask).should("be.visible").click();
    }
}
