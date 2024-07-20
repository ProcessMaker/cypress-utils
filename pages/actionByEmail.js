import selectors from "#selectors/actionByEmail"

export class ActionByEmail {
    /**
     * This method is responsible to open Email notifications of a task form in the modeler
     * @return nothing returns
     */
    checkEmailNotifications(){
        cy.get(selectors.emailNotificationAccordion).click();
        cy.xpath(selectors.ABE_Label).should('be.visible');
    }
    /**
     * This method is responsible to check Action By Email
     * @return nothing returns
     */
    checkActionByEmail(){
        cy.get(selectors.ABE_check)
            .should('be.visible')
            .check();
    }

    /**
     * This method is responsible to check Action By Email
     * @return nothing returns
     */
    unCheckActionByEmail(){
        cy.get(selectors.ABE_check)
            .should('be.visible')
            .uncheck();
    }

    /**
     * This method is responsible to verify the option in Action By email Notifications enable
     * @return nothing returns
     */
    verifyEmailNotificationsOptions(){
        cy.xpath(selectors.ABE_Label).should('exist');
        cy.get(selectors.ABE_subjectInput).should('exist');
        cy.get(selectors.ABE_requireLoginCheck).should('exist');
    }
    /**
     * This method is responsible to verify the option in Action By email Notifications disable
     * @return nothing returns
     */
    verifyEmailNotificationsOptionsDisable(){
        cy.xpath(selectors.ABE_Label).should('exist');
        cy.get(selectors.ABE_subjectInput).should('not.be.visible');
        cy.get(selectors.ABE_requireLoginCheck).should('not.be.visible');
    }
}
