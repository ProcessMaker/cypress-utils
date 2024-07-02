import selectors from "#selectors/header";
import promisify from 'cypress-promise'
export class Header {

    clickOnAddRequest() {
        cy.get(selectors.addRequestBtn).click();
        cy.xpath(selectors.loadingProcesses).should('not.exist');
        cy.wait(2000);
    }

    searchWithProcessName(processName) {
        cy.get(selectors.searchWithProceesNameTxtBx).type(processName).should('have.value', processName);
    }

    clickOnStart(processName) {
        cy.wait(2000);
        cy.xpath(selectors.startBtnBasedOnProcessName.replace('processName', processName)).click();
        cy.title().should('eq', 'Request Detail - ProcessMaker');
        // const requestId = await promisify(cy.url().then(url => {
        //     return url.split('/')[4].trim();
        // }))
        //cy.wait(2000);
        //return requestId;
    }

    logout() {
        cy.get(selectors.usercIconBtn).as("icon").should("be.visible");
        cy.get("@icon").click();
        cy.xpath(selectors.logOutBtn, {timeout: 1000}).as("btn").should("be.visible");
        cy.get("@btn").invoke("attr", "aria-label").should("eq", "Log Out");
        cy.get("@btn").click();
        cy.get(selectors.userNameTxtBxL, {timeout: 1000}).as("userName").should("be.visible");
    }

    async getRequestID() {
        const requestId = await promisify(cy.url().then(url => {
            return url.split('/')[4].trim();
        }))
        return requestId;
    }

    choseLanguage(language) {
        cy.get('#language').select(language).should('have.value', language);
        cy.get(selectors.saveBtnInProfile).click();
        cy.reload();
    }

    viewNotifications(){
        cy.wait(5000);
        cy.get(selectors.notification).click();
        cy.get(selectors.notificationList).should("be.visible");
    }
    openLastNotification(){
        cy.xpath(selectors.lastNotification).should("be.visible");
        cy.xpath(selectors.labelLastNotification).click({ force: true });
    }
    viewAllNotifications(){
        cy.get(".border-top > .btn-outline-secondary").click();
    }
    dismissAllNotifications() {
        cy.xpath('//div[@class="notification-popover"]//footer').then(
            ($element) => {
                cy.log($element[0].innerText);
                if ($element[0].innerText.includes("DISMISS ALL")) {
                    cy.get(".border-top > .btn-outline-secondary").click();
                    cy.log("dismiss all clicked");
                } else {
                    cy.log("dismiss button not found");
                }
                cy.log("termino");
            }
        );

        // if (
        //     cy.get(".border-top > .btn-outline-secondary").should("not.be.visible")
        // ) {
        //    return;
        // } else {
        //     cy.get(".border-top > .btn-outline-secondary").click();
        // }
    }

}
