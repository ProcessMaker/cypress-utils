import selectors from "#selectors/errorHandling";
//import { Dataconnectors } from "#pages/dataConnectors";

//const dataConnector = new Dataconnectors();

export class ErrorHandling {
    /*
     * This method open the accordion for Error Handling of a Data Connector in the modeler
     * @param none
     * @return nothing returns
     */
    clickErrorReportingAccordionDataConnector() {
        cy.xpath(selectors.errorHandlingAccordionTitleDataConnector)
            .should("be.visible")
            .click();
    }

    /*
     * This method open the accordion for Error Handling of a Task Script in the modeler
     * @param none
     * @return nothing returns
     */
    clickErrorReportingAccordionScriptTask() {
        cy.xpath(selectors.errorHandlingAccordionTitleScript)
            .should("be.visible")
            .click();
    }

    /*
     * This method open the accordion for a Data Connector
     * @param varDataConnectorName: Data Connector element's name in the modeler
     * @return nothing returns
     */
    clickOverDataConnectornAndOpenAccordion(varDataConnectorName) {
        const dataSource = selectors.dataConnectorElement;
        cy.xpath(dataSource.replace("dataConnectorName", varDataConnectorName))
            .first()
            .should("be.visible")
            .click();
        cy.xpath(selectors.inspectorButton).should("be.visible").click();
    }

    /*
     * This method to set values in the Error Handling accordion in the modeler for a Data Connector
     * @param varTimeOut,
     * @param varAttempts,
     * @param varWaitTime,
     * @param inappNotification = 0,
     * @param emailNotification = 0
     * @return nothing returns
     */
    configErrorHandlingDataConnector(
        varTimeOut,
        varAttempts,
        varWaitTime,
        inappNotification = 0,
        emailNotification = 0
    ) {
        cy.xpath(selectors.timeOutFieldAccordion)
            .should("be.visible")
            .type(varTimeOut);

        cy.xpath(selectors.retryAttemptsAccordion)
            .should("be.visible")
            .type(varAttempts);

        cy.xpath(selectors.retryWaitTimeAccordion)
            .should("be.visible")
            .type(varWaitTime);
        if (inappNotification != 0) {
            cy.xpath(selectors.inAppCheckboxAccordion)
                .should("be.visible")
                .click();
        }
        if (emailNotification != 0) {
            cy.xpath(selectors.emailCheckboxAccordion)
                .should("be.visible")
                .click();
        }
    }

    /*
     * This method works to check the option for a Data Connector or Script Task
     * @param option, this variable could be "In-App" or "Email"
     * @param element, this variable could be "ScriptTask" or "DataConnector"
     * @return nothing returns
     */
    checkErrorHandlingNotification(option, element) {
        var elementBPMN;
        if (element == "ScriptTask") {
            elementBPMN = selectors.inAppCheckboxAccordionScriptTask;
        } else {
            elementBPMN = selectors.inAppCheckboxAccordionDataConnector;
        }
        if (option == "In-App") {
            cy.xpath(elementBPMN).check({ force: true });
        }
        if (option == "Email") {
            cy.xpath(elementBPMN).check({ force: true });
        }
    }

    /*
     * This method works to uncheck the option for a Data Connector or Script Task
     * @param option, this variable could be "In-App" or "Email"
     * @param element, this variable could be "ScriptTask" or "DataConnector"
     * @return nothing returns
     */
    uncheckErrorHandlingNotification(option, element) {
        var elementBPMN;
        if (element == "ScriptTask") {
            elementBPMN = selectors.inAppCheckboxAccordionScriptTask;
        } else {
            elementBPMN = selectors.inAppCheckboxAccordionDataConnector;
        }
        if (option == "In-App") {
            cy.xpath(elementBPMN).uncheck({ force: true });
        }
        if (option == "Email") {
            cy.xpath(elementBPMN).uncheck({ force: true });
        }
    }

    /* This method presses over Rollback button when a script task or data connector had a error
     * @param none
     * @return nothing returns
     */
    pressRollBackBtn() {
        cy.xpath(selectors.rollbackBtn).should("be.visible");
        cy.xpath(selectors.rollbackBtn).should("contain.text", "Rollback");
        cy.xpath(selectors.rollbackBtn).click();
    }

    /* This method presses over Rollback button when a script task or data connector had a error
     * @param none
     * @return nothing returns
     */
    pressConfirmOptionRollBackModal() {
        cy.get(selectors.rollbackModal).should("be.visible");
        cy.get(selectors.rollbackModalFooterButtons)
            .contains("Confirm")
            .click();
    }
}
