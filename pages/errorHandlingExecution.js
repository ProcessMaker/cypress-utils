import selectors from "#selectors/errorHandling";
import {Scripts} from "./scripts";
//import { ErrorHandling } from "./errorHandling";

const scripts = new Scripts();
//const errorHandling = new ErrorHandling();

export class ErrorHandlingExecution {
    VerifyErrorHandlingConfigurationDataConnector() {
        cy.xpath(selectors.titleErrorHandlingAccordion).should(
            "have.text",
            "Error Handling"
        );
        cy.xpath(selectors.timeoutLabelAccordion).should(
            "have.text",
            "Timeout"
        );
        cy.xpath(selectors.timeOutFieldAccordion).should(
            "have.attr",
            "type",
            "number"
        );
        cy.xpath(selectors.timeOutFieldAccordion).should(
            "have.attr",
            "min",
            "0"
        );
        cy.xpath(selectors.timeOutFieldAccordion).should(
            "have.attr",
            "max",
            "3600"
        );
        cy.xpath(selectors.smallLabelAccordion)
            .eq(0)
            .should(
                "have.text",
                "Set maximum run time in seconds. Leave empty to use data connector default. Set to 0 for no timeout."
            );

        cy.xpath(selectors.retryAttemptsLabelAccordion).should(
            "have.text",
            "Retry Attempts"
        );
        cy.xpath(selectors.retryAttemptsAccordion).should(
            "have.attr",
            "type",
            "number"
        );
        cy.xpath(selectors.retryAttemptsAccordion).should(
            "have.attr",
            "min",
            "0"
        );
        cy.xpath(selectors.retryAttemptsAccordion).should(
            "have.attr",
            "max",
            "50"
        );
        cy.xpath(selectors.smallLabelAccordion)
            .eq(1)
            .should(
                "have.text",
                "Set maximum run retry attempts in seconds. Leave empty to use data connector default. Set to 0 for no retry attempts."
            );

        cy.xpath(selectors.retryWaitTimeLabelAccordion).should(
            "have.text",
            "Retry Wait Time"
        );
        cy.xpath(selectors.retryWaitTimeAccordion).should(
            "have.attr",
            "type",
            "number"
        );
        cy.xpath(selectors.retryWaitTimeAccordion).should(
            "have.attr",
            "min",
            "0"
        );
        cy.xpath(selectors.retryWaitTimeAccordion).should(
            "have.attr",
            "max",
            "3600"
        );
        cy.xpath(selectors.smallLabelAccordion)
            .eq(2)
            .should(
                "have.text",
                "Set maximum run retry wait time in seconds. Leave empty to use data connector default. Set to 0 for no retry wait time."
            );

        cy.xpath(selectors.notificationLabelAccordion).should(
            "have.text",
            "Notify Process Manager"
        );
        cy.xpath(selectors.inAppCheckboxAccordionDataConnector).should(
            "have.attr",
            "type",
            "checkbox"
        );
        cy.xpath(selectors.inAppLabelAccordion).should(($el) => {
            const text = $el.text();
            expect(text).to.include("In-app Notification");
        });

        cy.xpath(selectors.emailCheckboxAccordion).should(
            "have.attr",
            "type",
            "checkbox"
        );
        cy.xpath(selectors.emailLabelAccordion).should(($el) => {
            const text = $el.text();
            expect(text).to.include("Email Notification");
        });
    }

    VerifyErrorHandlingConfigurationScriptTask() {
        cy.xpath(selectors.titleErrorHandlingAccordion).should(
            "have.text",
            "Error Handling"
        );
        cy.xpath(selectors.timeoutLabelAccordion).should(
            "have.text",
            "Timeout"
        );
        cy.xpath(selectors.timeOutFieldAccordion).should(
            "have.attr",
            "type",
            "number"
        );
        cy.xpath(selectors.timeOutFieldAccordion).should(
            "have.attr",
            "min",
            "0"
        );
        cy.xpath(selectors.timeOutFieldAccordion).should(
            "have.attr",
            "max",
            "3600"
        );
        cy.xpath(selectors.smallLabelAccordion)
            .eq(0)
            .should(
                "have.text",
                "Set maximum run time in seconds. Leave empty to use script default. Set to 0 for no timeout."
            );

        cy.xpath(selectors.retryAttemptsLabelAccordion).should(
            "have.text",
            "Retry Attempts"
        );
        cy.xpath(selectors.retryAttemptsAccordion).should(
            "have.attr",
            "type",
            "number"
        );
        cy.xpath(selectors.retryAttemptsAccordion).should(
            "have.attr",
            "min",
            "0"
        );
        cy.xpath(selectors.retryAttemptsAccordion).should(
            "have.attr",
            "max",
            "50"
        );
        cy.xpath(selectors.smallLabelAccordion)
            .eq(1)
            .should(
                "have.text",
                "Set maximum run retry attempts in seconds. Leave empty to use script default. Set to 0 for no retry attempts."
            );

        cy.xpath(selectors.retryWaitTimeLabelAccordion).should(
            "have.text",
            "Retry Wait Time"
        );
        cy.xpath(selectors.retryWaitTimeAccordion).should(
            "have.attr",
            "type",
            "number"
        );
        cy.xpath(selectors.retryWaitTimeAccordion).should(
            "have.attr",
            "min",
            "0"
        );
        cy.xpath(selectors.retryWaitTimeAccordion).should(
            "have.attr",
            "max",
            "3600"
        );
        cy.xpath(selectors.smallLabelAccordion)
            .eq(2)
            .should(
                "have.text",
                "Set maximum run retry wait time in seconds. Leave empty to use script default. Set to 0 for no retry wait time."
            );

        cy.xpath(selectors.notificationLabelAccordion).should(
            "have.text",
            "Notify Process Manager"
        );
        cy.xpath(selectors.inAppCheckboxAccordionScriptTask).should(
            "have.attr",
            "type",
            "checkbox"
        );
        cy.xpath(selectors.inAppLabelAccordion).should(($el) => {
            const text = $el.text();
            expect(text).to.include("In-app Notification");
        });

        cy.xpath(selectors.emailCheckboxAccordionScriptTask).should(
            "have.attr",
            "type",
            "checkbox"
        );
        cy.xpath(selectors.emailLabelAccordion).should(($el) => {
            const text = $el.text();
            expect(text).to.include("Email Notification");
        });
    }

    verifyScriptTaskConfiguration() {
        //verify timeout
        cy.xpath(selectors.scriptTitle).eq(0).should("have.text", "Timeout");
        cy.xpath(selectors.scriptInput).eq(0).should("be.visible");
        cy.xpath(selectors.scriptInput)
            .eq(0)
            .should("have.attr", "type", "number");
        cy.xpath(selectors.scriptInput).eq(0).should("have.attr", "min", 0);
        cy.xpath(selectors.scriptInput).eq(0).should("have.attr", "max", 300);
        cy.xpath(selectors.scriptInput).eq(1).should("be.visible");
        cy.xpath(selectors.scriptInput)
            .eq(1)
            .should("have.attr", "type", "range");
        cy.xpath(selectors.scriptInput).eq(1).should("have.attr", "min", 0);
        cy.xpath(selectors.scriptInput).eq(1).should("have.attr", "max", 300);
        cy.xpath(selectors.scriptMessage
            .replace("message","How many seconds the script should be allowed to run (0 is unlimited)"))
            .should("be.visible");
        //Verify Retry legend
        cy.xpath(selectors.scriptTitle)
            .eq(1)
            .should("have.text", "Retry Attempts");
        cy.xpath(selectors.scriptInput).eq(2).should("be.visible");
        cy.xpath(selectors.scriptInput)
            .eq(2)
            .should("have.attr", "type", "number");
        cy.xpath(selectors.scriptInput).eq(2).should("have.attr", "min", 0);
        cy.xpath(selectors.scriptInput).eq(2).should("have.attr", "max", 10);
        cy.xpath(selectors.scriptInput).eq(3).should("be.visible");
        cy.xpath(selectors.scriptInput)
            .eq(3)
            .should("have.attr", "type", "range");
        cy.xpath(selectors.scriptInput).eq(3).should("have.attr", "min", 0);
        cy.xpath(selectors.scriptInput).eq(3).should("have.attr", "max", 10);
        cy.xpath(selectors.scriptMessage
            .replace("message","Number of times to retry. Leave empty to use script default. Set to 0 for no retry attempts. This setting is only used when running a script task in a process"))
            .should("be.visible");

        //Verify Retry wait Time
        cy.xpath(selectors.scriptTitle)
            .eq(2)
            .should("have.text", "Retry Wait Time");
        cy.xpath(selectors.scriptInput).eq(4).should("be.visible");
        cy.xpath(selectors.scriptInput)
            .eq(4)
            .should("have.attr", "type", "number");
        cy.xpath(selectors.scriptInput).eq(4).should("have.attr", "min", 0);
        cy.xpath(selectors.scriptInput).eq(4).should("have.attr", "max", 3600);
        cy.xpath(selectors.scriptInput).eq(5).should("be.visible");
        cy.xpath(selectors.scriptInput)
            .eq(5)
            .should("have.attr", "type", "range");
        cy.xpath(selectors.scriptInput).eq(5).should("have.attr", "min", 0);
        cy.xpath(selectors.scriptInput).eq(5).should("have.attr", "max", 3600);
        cy.xpath(selectors.scriptMessage
            .replace("message","Seconds to wait before retrying. Leave empty to use script default. Set to 0 for no retry wait time. This setting is only used when running a script task in a process"))
            .should("be.visible");

    }

    verifyDataConnectorConfiguration() {
        //verify timeout
        cy.xpath(selectors.scriptTitle).eq(1).should("have.text", "Timeout");
        cy.xpath(selectors.scriptInput).eq(1).should("be.visible");
        cy.xpath(selectors.scriptInput)
            .eq(1)
            .should("have.attr", "type", "number");
        cy.xpath(selectors.scriptInput).eq(1).should("have.attr", "min", 0);
        cy.xpath(selectors.scriptInput).eq(1).should("have.attr", "max", 300);
        cy.xpath(selectors.scriptInput).eq(2).should("be.visible");
        cy.xpath(selectors.scriptInput)
            .eq(2)
            .should("have.attr", "type", "range");
        cy.xpath(selectors.scriptInput).eq(2).should("have.attr", "min", 0);
        cy.xpath(selectors.scriptInput).eq(2).should("have.attr", "max", 300);
        cy.get('[role="tabpanel"][aria-hidden="false"] fieldset small')
            .eq(0)
            .should(
                "have.text",
                "How many seconds the data connector should be allowed to run (0 is unlimited)."
            );

        //verify Retry Attempts
        cy.xpath(selectors.scriptTitle)
            .eq(2)
            .should("have.text", "Retry Attempts");
        cy.xpath(selectors.scriptInput).eq(2).should("be.visible");
        cy.xpath(selectors.scriptInput)
            .eq(3)
            .should("have.attr", "type", "number");
        cy.xpath(selectors.scriptInput).eq(3).should("have.attr", "min", 0);
        cy.xpath(selectors.scriptInput).eq(3).should("have.attr", "max", 10);
        cy.xpath(selectors.scriptInput).eq(4).should("be.visible");
        cy.xpath(selectors.scriptInput)
            .eq(4)
            .should("have.attr", "type", "range");
        cy.xpath(selectors.scriptInput).eq(4).should("have.attr", "min", 0);
        cy.xpath(selectors.scriptInput).eq(4).should("have.attr", "max", 10);
        cy.get('[role="tabpanel"][aria-hidden="false"] fieldset small')
            .eq(1)
            .should("have.text", "How many times to retry a failed request.");

        //Verify Retry wait Time
        cy.xpath(selectors.scriptTitle)
            .eq(3)
            .should("have.text", "Retry Wait Time");
        cy.xpath(selectors.scriptInput).eq(3).should("be.visible");
        cy.xpath(selectors.scriptInput)
            .eq(5)
            .should("have.attr", "type", "number");
        cy.xpath(selectors.scriptInput).eq(5).should("have.attr", "min", 0);
        cy.xpath(selectors.scriptInput).eq(5).should("have.attr", "max", 3600);
        cy.xpath(selectors.scriptInput).eq(6).should("be.visible");
        cy.xpath(selectors.scriptInput)
            .eq(6)
            .should("have.attr", "type", "range");
        cy.xpath(selectors.scriptInput).eq(6).should("have.attr", "min", 0);
        cy.xpath(selectors.scriptInput).eq(6).should("have.attr", "max", 3600);
        cy.get('[role="tabpanel"][aria-hidden="false"] fieldset small')
            .eq(2)
            .should("have.text", "How many seconds to wait before retrying.");
    }

    verifyErrorScreen() {
        //verify message
        cy.xpath("//span[@class='simple-error-message-title']").should(
            "have.text",
            " We're Sorry "
        );

        cy.xpath("//span[@class='simple-error-message-message']").should(
            "have.text",
            "An error has occurred. Please try again. If the problem persists, please contact your administrator."
        );

        cy.xpath("//div[@class='simple-error-message-main']/p/img").should(
            "have.class",
            "simple-error-message-icon"
        );
        //verify image
        cy.xpath("//div[@class='simple-error-message-main']/p/img")
            .invoke("attr", "src")
            .should(
                "contain",
                "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgxIiBoZWlnaHQ9IjI4MCIgdmlld0JveD0iMCAwIDI4MSAyODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik04NS4wNTYyIDczLjg4NkM4NS4wNTYyIDczLjg4NiAxMTUuMDggOTYuNjcgMTYwLjcyNCA1NC4wNjhDMjAxLjI2IDE2LjIzNDMgMjM0LjM1OSA3NS45Mjc1IDIzNC41OSAxMDQuNTEzQzIzNC44OSAxNDEuNTQzIDE5NC4wNTQgMTcxLjE3MyAyMTMuODcyIDE5NS40OTVDMjMzLjY5IDIxOS44MTcgMTc0LjU3IDI1OS45ODEgMTQyLjcwOCAyMjUuMjIyQzEwMy4wNzIgMTgxLjk4MyA5Mi4zMzQ1IDIxNy4xMTQgNjkuNzQyNSAyMTcuMTE0QzUzLjUyNzggMjE3LjExNCAyMC4yMzc2IDE3Ni44MjUgNDIuNzE4MSAxNDYuODUxQzYxLjYzNTIgMTIxLjYyOSA1MS4zMTgyIDExMy4yNTggNDYuMzIyIDEwNC41MTNDMzkuMTE0OSA5MS45MDIxIDU2LjIzMDQgNTcuNjcxNSA4NS4wNTYyIDczLjg4NloiIGZpbGw9IiNERUVFRkEiLz4KPHBhdGggZD0iTTIwNS41OTIgMTI0LjIzNUMyMDcuMjA2IDEyNC44MzUgMjA4Ljk2OSAxMjQuODc1IDIxMC42NDcgMTI0LjQ4OUMyMTcuNjc3IDEyMi44NzYgMjQxLjg1IDExOC42MDMgMjM3LjY1IDEzNy4zMzVDMjM2LjczNSAxNDEuMDUxIDIyMi41NzggMTYxLjg2NCAyNDIuNzM5IDE2OS40NjJDMjQ0LjIxNyAxNzAuMDI2IDI0NS43NzkgMTcwLjMzNCAyNDcuMzYgMTcwLjM3MkMyNTMuNTY4IDE3MC41IDI2NS44NjkgMTY5LjAzNCAyNzEuMDE3IDE2My43OTRDMjc3LjIzNyAxNTcuNDYzIDI3MC40NDIgMTYwLjQ2NSAyNzAuNDQyIDE2MC40NjVDMjcwLjQ0MiAxNjAuNDY1IDI0Ni43OTggMTcwLjc4MyAyMzguNDQ2IDE1OS44MzZDMjM3LjUxNyAxNTguNjE4IDIzNi45MjUgMTU2Ljg0OSAyMzYuNzU2IDE1NS4zMjZDMjM2LjQ2MiAxNTIuNjg2IDIzNy42MzQgMTQ5LjE5NyAyMzkuMTc0IDE0Ni4xNTlDMjQxLjI1OSAxNDIuMDQ4IDI1MS4yNjYgMTIzLjU1NSAyMjkuNTM5IDExOC4xNjhDMjI0LjUzMyAxMTYuOTc2IDIxNy4yNjMgMTE1LjkwNiAyMDcuODkgMTE5Ljg1MkMyMDIuNDIyIDEyMi4xNTQgMjAzLjYzMyAxMjMuNTA3IDIwNS41OTIgMTI0LjIzNVoiIGZpbGw9IiNCQ0RDRjgiLz4KPHBhdGggZD0iTTIxMC40MyAxMTcuMzMxTDIwNC4xMzcgMTE5LjY4N0MyMDEuOTY1IDEyMC41IDIwMC44NjMgMTIyLjkyIDIwMS42NzYgMTI1LjA5MkwyMDEuOTg4IDEyNS45MjZDMjAyLjgwMSAxMjguMDk4IDIwNS4yMjEgMTI5LjIgMjA3LjM5MyAxMjguMzg3TDIxMy42ODcgMTI2LjAzMkMyMTUuODU5IDEyNS4yMTkgMjE2Ljk2MSAxMjIuNzk5IDIxNi4xNDggMTIwLjYyNkwyMTUuODM2IDExOS43OTNDMjE1LjAyMyAxMTcuNjIgMjEyLjYwMyAxMTYuNTE4IDIxMC40MyAxMTcuMzMxWiIgZmlsbD0iIzE1NzJDMiIvPgo8cGF0aCBkPSJNMTcxLjgwMSAxMjQuMTQ3TDE1MS4wNDYgMTMxLjkxNEMxNDkuOTYgMTMyLjMyMSAxNDkuNDA5IDEzMy41MzEgMTQ5LjgxNSAxMzQuNjE3TDE0OS44OTcgMTM0LjgzNkMxNTAuMzAzIDEzNS45MjIgMTUxLjUxMyAxMzYuNDczIDE1Mi42IDEzNi4wNjZMMTczLjM1NSAxMjguMjk5QzE3NC40NDEgMTI3Ljg5MiAxNzQuOTkyIDEyNi42ODIgMTc0LjU4NSAxMjUuNTk2TDE3NC41MDMgMTI1LjM3N0MxNzQuMDk3IDEyNC4yOTEgMTcyLjg4NyAxMjMuNzQgMTcxLjgwMSAxMjQuMTQ3WiIgZmlsbD0iIzUyQTVFQyIvPgo8cGF0aCBkPSJNMTc3LjU5MyAxMzkuNjI0TDE1Ni44MzggMTQ3LjM5MUMxNTUuNzUyIDE0Ny43OTggMTU1LjIwMSAxNDkuMDA4IDE1NS42MDggMTUwLjA5NEwxNTUuNjg5IDE1MC4zMTNDMTU2LjA5NiAxNTEuMzk5IDE1Ny4zMDYgMTUxLjk1IDE1OC4zOTIgMTUxLjU0M0wxNzkuMTQ3IDE0My43NzZDMTgwLjIzMyAxNDMuMzY5IDE4MC43ODQgMTQyLjE1OSAxODAuMzc4IDE0MS4wNzNMMTgwLjI5NiAxNDAuODU0QzE3OS44OSAxMzkuNzY4IDE3OC42NzkgMTM5LjIxNyAxNzcuNTkzIDEzOS42MjRaIiBmaWxsPSIjNTJBNUVDIi8+CjxwYXRoIGQ9Ik0xOTYuNzU1IDExMy41ODVMMTc5LjkzNCAxMTkuODhDMTc3Ljc2MSAxMjAuNjkzIDE3Ni42NTkgMTIzLjExNCAxNzcuNDcyIDEyNS4yODZMMTgzLjIxNiAxNDAuNjMxQzE4NC4wMjkgMTQyLjgwMyAxODYuNDQ5IDE0My45MDUgMTg4LjYyMSAxNDMuMDkyTDIwNS40NDMgMTM2Ljc5N0MyMDcuNjE1IDEzNS45ODQgMjA4LjcxNyAxMzMuNTY0IDIwNy45MDQgMTMxLjM5MUwyMDIuMTYxIDExNi4wNDZDMjAxLjM0OCAxMTMuODc0IDE5OC45MjggMTEyLjc3MiAxOTYuNzU1IDExMy41ODVaIiBmaWxsPSIjNTJBNUVDIi8+CjxwYXRoIGQ9Ik0xODEuNjcyIDExNy42MUwxNjQuODUgMTIzLjkwNkMxNjIuNjc4IDEyNC43MTkgMTYxLjU3NiAxMjcuMTM5IDE2Mi4zODkgMTI5LjMxMkwxNjkuMjQxIDE0Ny42MTlDMTcwLjA1NCAxNDkuNzkxIDE3Mi40NzQgMTUwLjg5MyAxNzQuNjQ2IDE1MC4wOEwxOTEuNDY4IDE0My43ODVDMTkzLjY0IDE0Mi45NzIgMTk0Ljc0MiAxNDAuNTUxIDE5My45MjkgMTM4LjM3OUwxODcuMDc3IDEyMC4wNzJDMTg2LjI2NCAxMTcuODk5IDE4My44NDQgMTE2Ljc5NyAxODEuNjcyIDExNy42MVoiIGZpbGw9IiMxNTcyQzIiLz4KPHBhdGggZD0iTTE4NC4zMDUgMTEzLjg5NUwxODQuMTczIDExMy45NDRDMTgyLjcyNSAxMTQuNDg2IDE4MS45OSAxMTYuMSAxODIuNTMyIDExNy41NDhMMTkyLjEzMSAxNDMuMTk1QzE5Mi42NzMgMTQ0LjY0MyAxOTQuMjg2IDE0NS4zNzggMTk1LjczNCAxNDQuODM2TDE5NS44NjYgMTQ0Ljc4NkMxOTcuMzE1IDE0NC4yNDQgMTk4LjA0OSAxNDIuNjMxIDE5Ny41MDcgMTQxLjE4MkwxODcuOTA5IDExNS41MzZDMTg3LjM2NyAxMTQuMDg4IDE4NS43NTMgMTEzLjM1MyAxODQuMzA1IDExMy44OTVaIiBmaWxsPSIjMTU3MkMyIi8+CjxwYXRoIGQ9Ik0xMi43ODE2IDEzMC4yOTJDMTIuNzgxNiAxMzAuMjkyIDQ2LjU2NDggMTIwLjc5OCA0MS42NiAxNDIuNjcyQzQwLjgwODMgMTQ2LjEzMyAyOC41NDcyIDE2My45NTMgNDMuMTUyIDE3Mi41MDlDNDYuMjg4IDE3NC4zNDYgNDkuOTA3IDE3NS4xNiA1My41NDEzIDE3NS4xNDFDNjAuMDU3MyAxNzUuMTA3IDcwLjM4NzIgMTczLjg1MyA3NS4wMjc4IDE2OS4xM0M4MS4yNDcxIDE2Mi43OTkgNzQuNDUyNiAxNjUuODAxIDc0LjQ1MjYgMTY1LjgwMUM3NC40NTI2IDE2NS44MDEgNTUuMDUwNCAxNzMuNzgyIDQ1LjA2ODcgMTY3LjQyQzQxLjY2MDQgMTY1LjI0OCA0MC4xMTU1IDE2MS4wNDIgNDEuMDQxMSAxNTcuMTA3QzQxLjUxNDEgMTU1LjE1MyA0Mi4yMzQ1IDE1My4yNjcgNDMuMTg0NyAxNTEuNDk1QzQ1LjM1NTYgMTQ3LjQyOSA1NS4yNzY4IDEyOC44OTEgMzMuNTQ4OCAxMjMuNTA0QzI4LjU0MzYgMTIyLjMxMiAyMS4yNzM4IDEyMS4yNDIgMTEuOTAwMSAxMjUuMTg4QzIuNTI2MzcgMTI5LjEzNSAxMi43ODE2IDEzMC4yOTIgMTIuNzgxNiAxMzAuMjkyWiIgZmlsbD0iI0JDRENGOCIvPgo8cGF0aCBkPSJNNzkuNTcwNCAxNjAuOTA2TDczLjI3NzIgMTYzLjI2MkM3MS4xMDQ4IDE2NC4wNzUgNzAuMDAyOCAxNjYuNDk1IDcwLjgxNTggMTY4LjY2N0w3MS4xMjc4IDE2OS41MDFDNzEuOTQwOCAxNzEuNjczIDc0LjM2MTEgMTcyLjc3NSA3Ni41MzM1IDE3MS45NjJMODIuODI2OCAxNjkuNjA3Qzg0Ljk5OTIgMTY4Ljc5NCA4Ni4xMDEyIDE2Ni4zNzQgODUuMjg4MSAxNjQuMjAxTDg0Ljk3NjIgMTYzLjM2OEM4NC4xNjMxIDE2MS4xOTUgODEuNzQyOSAxNjAuMDkzIDc5LjU3MDQgMTYwLjkwNloiIGZpbGw9IiMxNTcyQzIiLz4KPHBhdGggZD0iTTkwLjIwMzEgMTUwLjU1Mkw4MC44NzYyIDE1NC4wNDNDNzguNzAzNyAxNTQuODU2IDc3LjYwMTcgMTU3LjI3NiA3OC40MTQ4IDE1OS40NDlMODIuOTEyMiAxNzEuNDY1QzgzLjcyNTMgMTczLjYzOCA4Ni4xNDU1IDE3NC43NCA4OC4zMTc5IDE3My45MjdMOTcuNjQ0OCAxNzAuNDM2Qzk5LjgxNzMgMTY5LjYyMyAxMDAuOTE5IDE2Ny4yMDMgMTAwLjEwNiAxNjUuMDNMOTUuNjA4OCAxNTMuMDEzQzk0Ljc5NTcgMTUwLjg0MSA5Mi4zNzU1IDE0OS43MzkgOTAuMjAzMSAxNTAuNTUyWiIgZmlsbD0iIzUyQTVFQyIvPgo8cGF0aCBkPSJNMTA1LjczIDE0MS4zTDkxLjgyMTMgMTQ2LjUwNkM4OS42NDg5IDE0Ny4zMTkgODguNTQ2OSAxNDkuNzM5IDg5LjM2IDE1MS45MTJMOTYuMjExNyAxNzAuMjE5Qzk3LjAyNDggMTcyLjM5MiA5OS40NDUgMTczLjQ5NCAxMDEuNjE3IDE3Mi42OEwxMTUuNTI2IDE2Ny40NzVDMTE3LjY5OSAxNjYuNjYyIDExOC44MDEgMTY0LjI0MiAxMTcuOTg4IDE2Mi4wNjlMMTExLjEzNiAxNDMuNzYyQzExMC4zMjMgMTQxLjU4OSAxMDcuOTAzIDE0MC40ODcgMTA1LjczIDE0MS4zWiIgZmlsbD0iIzE1NzJDMiIvPgo8cGF0aCBkPSJNMTA4LjY3NyAxMzcuNTA5TDEwOC41NDUgMTM3LjU1OEMxMDcuMDk2IDEzOC4xIDEwNi4zNjIgMTM5LjcxNCAxMDYuOTA0IDE0MS4xNjJMMTE2LjUwMiAxNjYuODA5QzExNy4wNDQgMTY4LjI1NyAxMTguNjU4IDE2OC45OTIgMTIwLjEwNiAxNjguNDVMMTIwLjIzOCAxNjguNEMxMjEuNjg2IDE2Ny44NTggMTIyLjQyMSAxNjYuMjQ1IDEyMS44NzkgMTY0Ljc5NkwxMTIuMjggMTM5LjE1QzExMS43MzggMTM3LjcwMiAxMTAuMTI1IDEzNi45NjcgMTA4LjY3NyAxMzcuNTA5WiIgZmlsbD0iIzE1NzJDMiIvPgo8cGF0aCBkPSJNMTQ0LjE5NCAxMjEuMTdDMTQzLjY5MyAxMjEuMTE0IDE0My4yMzMgMTIwLjg2NyAxNDIuOTExIDEyMC40NzlDMTQyLjU5IDEyMC4wOTEgMTQyLjQzMSAxMTkuNTk0IDE0Mi40NjggMTE5LjA5MUwxNDMuNTA2IDEwMC4xMzVDMTQzLjU2OCA5OS4wMDI3IDE0NC41MjQgOTguMTQyNCAxNDUuNjA5IDk4LjI0MjVMMTQ3LjEyMSA5OC4zODI1QzE0OC4yMDYgOTguNDgyNiAxNDguOTgzIDk5LjUwMjUgMTQ4LjgzMSAxMDAuNjI3TDE0Ni4yODEgMTE5LjQ0M0MxNDYuMjIzIDExOS45NDQgMTQ1Ljk3MyAxMjAuNDAzIDE0NS41ODQgMTIwLjcyNUMxNDUuMTk1IDEyMS4wNDcgMTQ0LjY5NyAxMjEuMjA2IDE0NC4xOTQgMTIxLjE3VjEyMS4xN1oiIGZpbGw9IiM1MkE1RUMiLz4KPHBhdGggZD0iTTEzNS4yMzMgMTIyLjgwNEMxMzUuMDc3IDEyMi44NSAxMzQuOTE0IDEyMi44NjUgMTM0Ljc1MiAxMjIuODQ4QzEzNC41OTEgMTIyLjgzIDEzNC40MzQgMTIyLjc4MSAxMzQuMjkyIDEyMi43MDNDMTM0LjE0OSAxMjIuNjI2IDEzNC4wMjQgMTIyLjUyMSAxMzMuOTIyIDEyMi4zOTRDMTMzLjgyIDEyMi4yNjggMTMzLjc0NCAxMjIuMTIyIDEzMy42OTggMTIxLjk2N0wxMjkuOTkyIDExMC4xNzVDMTI5Ljg4NCAxMDkuODQgMTI5LjkxNCAxMDkuNDc1IDEzMC4wNzQgMTA5LjE2MkMxMzAuMjM1IDEwOC44NDggMTMwLjUxMyAxMDguNjExIDEzMC44NDkgMTA4LjUwM0wxMzEuODA4IDEwOC4yMTNDMTMxLjk3MyAxMDguMTY1IDEzMi4xNDYgMTA4LjE1MiAxMzIuMzE2IDEwOC4xNzRDMTMyLjQ4NiAxMDguMTk2IDEzMi42NDkgMTA4LjI1MyAxMzIuNzk2IDEwOC4zNDJDMTMyLjk0MyAxMDguNDMgMTMzLjA3IDEwOC41NDggMTMzLjE2OSAxMDguNjg4QzEzMy4yNjggMTA4LjgyOCAxMzMuMzM3IDEwOC45ODcgMTMzLjM3MSAxMDkuMTU1TDEzNi4xMTggMTIxLjIzN0MxMzYuMTk1IDEyMS41NjEgMTM2LjE0NiAxMjEuOTAzIDEzNS45ODIgMTIyLjE5NEMxMzUuODE4IDEyMi40ODQgMTM1LjU1MSAxMjIuNzAyIDEzNS4yMzMgMTIyLjgwNFYxMjIuODA0WiIgZmlsbD0iIzUyQTVFQyIvPgo8cGF0aCBkPSJNMTMwLjIzMiAxMjkuNjA0QzEyOS41NjggMTMwLjQyNyAxMjguMjMzIDEzMC40MTcgMTI3LjIwNCAxMjkuNTgyTDEwOC45NTMgMTE0Ljc1M0MxMDcuODYzIDExMy44NjcgMTA3LjU0MSAxMTIuNDAxIDEwOC4yNDUgMTExLjUyOUwxMDkuMjI3IDExMC4zMTNDMTA5LjkzMiAxMDkuNDQgMTExLjM3OCAxMDkuNTEyIDExMi40MSAxMTAuNDdMMTI5LjY4IDEyNi41MTVDMTMwLjY1MyAxMjcuNDE5IDEzMC44OTYgMTI4Ljc4MiAxMzAuMjMyIDEyOS42MDRaIiBmaWxsPSIjNTJBNUVDIi8+CjxwYXRoIGQ9Ik0xMzguNjY5IDE2Ny45MDZDMTM5LjEzOSAxNjguMDg4IDEzOS41MiAxNjguNDQ1IDEzOS43MzIgMTY4LjkwMkMxMzkuOTQ1IDE2OS4zNTkgMTM5Ljk3MSAxNjkuODgxIDEzOS44MDcgMTcwLjM1N0wxMzMuOTYyIDE4OC40MTlDMTMzLjYxMyAxODkuNDk4IDEzMi40NjkgMTkwLjA4NSAxMzEuNDQ1IDE4OS43MTFMMTMwLjAxOCAxODkuMTlDMTI4Ljk5NSAxODguODE2IDEyOC41MDQgMTg3LjYzMSAxMjguOTM4IDE4Ni41ODRMMTM2LjIwOSAxNjkuMDQzQzEzNi4zOTQgMTY4LjU3MyAxMzYuNzUyIDE2OC4xOTMgMTM3LjIxMSAxNjcuOTgxQzEzNy42NjkgMTY3Ljc2OSAxMzguMTkxIDE2Ny43NDIgMTM4LjY2OSAxNjcuOTA2VjE2Ny45MDZaIiBmaWxsPSIjNTJBNUVDIi8+CjxwYXRoIGQ9Ik0xNDcuNzUgMTY4LjYxNUMxNDcuOTEyIDE2OC42MSAxNDguMDc0IDE2OC42MzggMTQ4LjIyNiAxNjguNjk2QzE0OC4zNzcgMTY4Ljc1NCAxNDguNTE2IDE2OC44NDEgMTQ4LjYzNCAxNjguOTUzQzE0OC43NTIgMTY5LjA2NCAxNDguODQ3IDE2OS4xOTggMTQ4LjkxMyAxNjkuMzQ2QzE0OC45NzkgMTY5LjQ5NCAxNDkuMDE2IDE2OS42NTQgMTQ5LjAyIDE2OS44MTdMMTQ5LjU5MiAxODIuMTY0QzE0OS42MSAxODIuNTE2IDE0OS40ODkgMTgyLjg2IDE0OS4yNTMgMTgzLjEyMkMxNDkuMDE4IDE4My4zODUgMTQ4LjY4OCAxODMuNTQzIDE0OC4zMzcgMTgzLjU2MkwxNDcuMzM1IDE4My41OTdDMTQ3LjE2MyAxODMuNjAxIDE0Ni45OTMgMTgzLjU3IDE0Ni44MzQgMTgzLjUwNUMxNDYuNjc1IDE4My40NCAxNDYuNTMyIDE4My4zNDMgMTQ2LjQxMiAxODMuMjJDMTQ2LjI5MyAxODMuMDk3IDE0Ni4yIDE4Mi45NTEgMTQ2LjE0IDE4Mi43OUMxNDYuMDggMTgyLjYyOSAxNDYuMDU1IDE4Mi40NTggMTQ2LjA2NCAxODIuMjg3TDE0Ni40OTQgMTY5LjkwNUMxNDYuNTAzIDE2OS41NzEgMTQ2LjYzNyAxNjkuMjUzIDE0Ni44NyAxNjkuMDE0QzE0Ny4xMDMgMTY4Ljc3NSAxNDcuNDE3IDE2OC42MzMgMTQ3Ljc1IDE2OC42MTVWMTY4LjYxNVoiIGZpbGw9IiM1MkE1RUMiLz4KPHBhdGggZD0iTTE1NC4zMjIgMTYzLjMxN0MxNTUuMTc0IDE2Mi42OTEgMTU2LjQ2MyAxNjMuMDQyIDE1Ny4yNDMgMTY0LjExMkwxNzEuMTAzIDE4My4xMUMxNzEuOTMxIDE4NC4yNDUgMTcxLjg2NyAxODUuNzQ0IDE3MC45NjMgMTg2LjQwOEwxNjkuNzAzIDE4Ny4zMzNDMTY4Ljc5OSAxODcuOTk3IDE2Ny40MTggMTg3LjU1OCAxNjYuNjY2IDE4Ni4zNjhMMTU0LjA2NSAxNjYuNDQ0QzE1My4zNTcgMTY1LjMyMyAxNTMuNDcgMTYzLjk0MyAxNTQuMzIyIDE2My4zMTdaIiBmaWxsPSIjNTJBNUVDIi8+Cjwvc3ZnPgo="
            );
    }

    fillScreen() {
        cy.xpath("//input[@name='form_input_1']")
            .as("input")
            .should("be.visible");
        cy.get("@input").type("test1");
        cy.xpath("//button[@aria-label='New Submit']").click();
    }

    verifyNewScriptProperties() {
        //Enable Advanced options
        scripts.clickOnMoreOption();
        //Verify Timeout
        cy.xpath(selectors.scriptTimeout).click();
        cy.xpath(selectors.scriptTimeoutInput).should("be.visible");
        cy.xpath(selectors.scriptTimeoutInput)
            .should("have.attr", "type", "number");
        cy.xpath(selectors.scriptTimeoutInput).should("have.attr", "min", 0);
        cy.xpath(selectors.scriptTimeoutInput).should("have.attr", "max", 300);
        cy.xpath(selectors.scriptTimeoutInput).should("be.visible");
        cy.xpath(selectors.scriptMessage
            .replace('message','How many seconds the script should be allowed to run (0 is unlimited)'))
            .should("be.visible");

        //Verify Retry legend
        cy.xpath(selectors.scriptRetryAtetmpsTitle).click();
        cy.xpath(selectors.scriptRetryAtetmpsInput).should("be.visible");
        cy.xpath(selectors.scriptRetryAtetmpsInput)
            .should("have.attr", "type", "number");
        cy.xpath(selectors.scriptRetryAtetmpsInput).should("have.attr", "min", 0);
        cy.xpath(selectors.scriptRetryAtetmpsInput).should("have.attr", "max", 10);
        cy.xpath(selectors.scriptRetryAtetmpsInput).should("be.visible");
        cy.xpath(selectors.scriptMessage
            .replace('message','Number of times to retry. Leave empty to use script default. Set to 0 for no retry attempts'))
            .should("be.visible");

        //Verify Retry wait Time
        cy.xpath(selectors.scriptRetryWaitTimeTitle).click();
        cy.xpath(selectors.scriptRetryWaitTimeInput).should("be.visible");
        cy.xpath(selectors.scriptRetryWaitTimeInput)
            .should("have.attr", "type", "number");
        cy.xpath(selectors.scriptRetryWaitTimeInput).should("have.attr", "min", 0);
        cy.xpath(selectors.scriptRetryWaitTimeInput).should("have.attr", "max", 3600);
        cy.xpath(selectors.scriptRetryWaitTimeInput).should("be.visible");
        cy.xpath(selectors.scriptMessage
            .replace('message','Seconds to wait before retrying. Leave empty to use script default. Set to 0 for no retry wait time'))
            .should("be.visible");
   }

    verifyDataConnectorCreated() {
        //verify timeout
        cy.xpath(selectors.scriptTitle).eq(1).should("have.text", "Timeout");
        cy.xpath(selectors.scriptInput).eq(0).should("be.visible");
        cy.xpath(selectors.scriptInput)
            .eq(0)
            .should("have.attr", "type", "number");
        cy.xpath(selectors.scriptInput).eq(0).should("have.attr", "min", 0);
        cy.xpath(selectors.scriptInput).eq(0).should("have.attr", "max", 300);
        cy.xpath(selectors.scriptInput).eq(1).should("be.visible");
        cy.xpath(selectors.scriptInput)
            .eq(1)
            .should("have.attr", "type", "range");
        cy.xpath(selectors.scriptInput).eq(1).should("have.attr", "min", 0);
        cy.xpath(selectors.scriptInput).eq(1).should("have.attr", "max", 300);
        cy.get('[id="addEndpoint"] fieldset small[class="form-text text-muted"]')
            .eq(0)
            .should(
                "have.text",
                "How many seconds the data connector should be allowed to run (0 is unlimited)."
            );

        // //verify Retry Attempts
        cy.xpath(selectors.scriptTitle)
            .eq(2)
            .should("have.text", "Retry Attempts");
        cy.xpath(selectors.scriptInput).eq(2).should("be.visible");
        cy.xpath(selectors.scriptInput)
            .eq(2)
            .should("have.attr", "type", "number");
        cy.xpath(selectors.scriptInput).eq(2).should("have.attr", "min", 0);
        cy.xpath(selectors.scriptInput).eq(2).should("have.attr", "max", 10);
        cy.xpath(selectors.scriptInput).eq(3).should("be.visible");
        cy.xpath(selectors.scriptInput)
            .eq(3)
            .should("have.attr", "type", "range");
        cy.xpath(selectors.scriptInput).eq(3).should("have.attr", "min", 0);
        cy.xpath(selectors.scriptInput).eq(3).should("have.attr", "max", 10);
        cy.get('[id="addEndpoint"] fieldset small[class="form-text text-muted"]')
            .eq(1)
            .should("have.text", "How many times to retry a failed request.");

        // //Verify Retry wait Time
        cy.xpath(selectors.scriptTitle)
            .eq(3)
            .should("have.text", "Retry Wait Time");
        cy.xpath(selectors.scriptInput).eq(4).should("be.visible");
        cy.xpath(selectors.scriptInput)
            .eq(4)
            .should("have.attr", "type", "number");
        cy.xpath(selectors.scriptInput).eq(4).should("have.attr", "min", 0);
        cy.xpath(selectors.scriptInput).eq(4).should("have.attr", "max", 3600);
        cy.xpath(selectors.scriptInput).eq(5).should("be.visible");
        cy.xpath(selectors.scriptInput)
            .eq(5)
            .should("have.attr", "type", "range");
        cy.xpath(selectors.scriptInput).eq(5).should("have.attr", "min", 0);
        cy.xpath(selectors.scriptInput).eq(5).should("have.attr", "max", 3600);
        cy.get('[id="addEndpoint"] fieldset small[class="form-text text-muted"]')
            .eq(2)
            .should("have.text", "How many seconds to wait before retrying.");
    }

    verifyBellNumberNotification(nroNotification) {
        cy.xpath(selectors.notificationBell).should(
            "have.text",
            nroNotification
        );
    }

    verifyErrorRequestDataConnector(rows, nro, messageTitle, messageBody) {
        let table = "//div[@id='errors']//table/tbody";
        cy.xpath(table).should("be.visible");
        cy.xpath(table).find("tr").should("have.length", rows);
        //verify row title
        if (messageTitle != "") {
            cy.xpath(table)
                .find("td > h6")
                .eq(nro)
                .should("have.text", messageTitle);
        }
        //verify row body
        cy.xpath(table)
            .find("td > pre")
            .eq(nro)
            .should("have.text", messageBody);
        //verify class body
        cy.xpath(table)
            .find("td > pre")
            .eq(nro)
            .should("have.class", "error-body");
    }

    verifyErrorRequestScriptTask() {
        let table = "//div[@id='errors']//table/tbody";
        cy.xpath(table).should("be.visible");
        cy.xpath(table).find("tr").should("have.length", 3);
        cy.xpath(table)
            .find("td > h6")
            .eq(0)
            .should(
                "have.text",
                "Parse error: syntax error, unexpected 'return' (T_RETURN) in /opt/executor/script.php on line 5"
            );
        cy.xpath(table)
            .find("td > h6")
            .eq(1)
            .should("have.text", "Job failed after 2 total attempts");
        cy.xpath(table)
            .find("td > h6")
            .eq(2)
            .should("have.text", "Job failed after 2 total attempts");
    }

    verifyErrorTask() {
        cy.get(selectors.errorTitleTask).should("have.text", "Error");
        cy.xpath(selectors.rollbackBtn).should(
            "have.attr",
            "id",
            "retryRequestButton"
        );
        cy.xpath(selectors.rollbackBtn).should("have.attr", "type", "button");
        cy.xpath(selectors.rollbackBtn).should("contain.text", "Rollback");
    }

    verifyPreviousTask(taskName, nodeName) {
        var cad = "Rollback to task: " + taskName + " (" + nodeName + ")";
        cy.xpath(
            "//div[@id='details']//ul/li/p[text()='Rollback Request']/following-sibling::small"
        ).should("have.text", cad);
    }

    verifyModalRollback() {
        cy.get(selectors.rollbackModal).should("be.visible");
        cy.get(selectors.rollbackModalTitle).should("have.text", "Confirm");
        cy.get(selectors.rollbackModalbody).should("have.text","Are you sure you want to rollback to the task FormTaskA? Warning! This request will continue as the current published process version.");
        cy.get(selectors.rollbackModalFooterButtons).eq(0).should("have.text", "Cancel");
        cy.get(selectors.rollbackModalFooterButtons).eq(1).should("have.text", "Confirm");
    }

    verifyRetryTask(taskName, fullName) {
        cy.xpath("//div[@id='main']//div[@id='pending']//td").should(
            "be.visible"
        );
        cy.xpath("//div[@id='main']//div[@id='pending']//td/a")
            .eq(1)
            .should("contains.text", taskName);
        cy.xpath(
            "//div[@id='main']//div[@id='pending']//td//div[@class='vertical-view']/span/span"
        ).should("contains.text", fullName);
    }

    verifyRetryHistoryUser(nro, taskName, fullName) {
        cy.get("div[id='request'] div[class$='timeline'] div > div").should(
            "be.visible"
        );
        cy.get("div[id='request'] div[class$='timeline'] div > div")
            .eq(nro)
            .should(
                "contains.text",
                fullName + " has completed the task " + taskName
            );
    }

    verifyRollbackHistoryUser(nro, bpmnName, taskName, fullName) {
        cy.get("div[id='request'] div[class$='timeline'] div > div").should(
            "be.visible"
        );
        cy.get("div[id='request'] div[class$='timeline'] div > div")
            .eq(nro)
            .should(
                "contains.text",
                fullName + " rolled back " + bpmnName + " to " + taskName
            );
    }

    verifyEmailErrorHandling(email, processName, elementBPMN, requestID = 0) {
        const getIframeBody = () => {
            return cy
                .get("iframe[data-test-id='message_view_iframe']")
                .its("0.contentDocument.body")
                .should("not.be.empty")
                .then(cy.wrap);
        };
        //verify email
        cy.xpath(
            "//div[@id='detailsView']//strong[text()='To:']/following-sibling::span/small"
        ).should("contain.text", email);
        //verify title
        getIframeBody()
            .find("table[class='inner-body'] h1")
            .should("have.text", "Execution Error: " + processName);

        //verify process name in the subtitle
        getIframeBody()
            .find("table[class='inner-body'] p")
            .eq(0)
            .should("contains.text", processName);
        //verify element BPMN in the subtitle
        getIframeBody()
            .find("table[class='inner-body'] p")
            .eq(0)
            .should("contains.text", elementBPMN);
        //verify request Id in the subtitle
        if (requestID != 0) {
            getIframeBody()
                .find("table[class='inner-body'] p")
                .eq(0)
                .should("contains.text", requestID);
        }
    }
}
