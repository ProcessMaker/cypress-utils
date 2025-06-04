import selectors from "#selectors/smartInbox";
export class SmartInbox {

    /**
     * Searches for a task by name in the smart inbox
     * @param {string} taskName - The name of the task to search for
     */
    searchTask(taskName){
        cy.xpath(selectors.tableRow).should('be.visible');
        cy.get(selectors.searchTask).type(taskName);
        cy.get(selectors.pressSelectOptionSaveSearch).type('{enter}');
        cy.get(selectors.loadingSpinnerTask).should('be.visible');
        cy.get(selectors.loadingSpinnerTask).should('not.be.visible');
        cy.xpath(selectors.tableCell + "//*[contains(text(),'"+taskName+"')]").should('be.visible');
    }
    /**
     * Marks a task as priority in the smart inbox
     * @param {string} taskName - The name of the task to mark as priority
     * @param {number} priorityCol - The column number for priority (default: 2)
     */
    taskAsPriority(taskName, priorityCol = 2){
        cy.xpath(selectors.tasksTable + "//*[contains(text(),'"+taskName+"')]").should('be.visible');
        cy.xpath('(//tbody//td["'+ priorityCol +'"]//img)[1]').should('be.visible').click();
        cy.get(selectors.loadingSpinnerTask).should('be.visible');
        cy.get(selectors.loadingSpinnerTask).should('not.be.visible');
        cy.get(selectors.priorityImage).should('be.visible');
    }

    /**
     * Clicks the clear task button in the smart inbox
     */
    pressClearTaskButton() {
        cy.xpath(selectors.clearDraftBtn)
            .as("clearTaskBtn")
            .should("be.visible");
        cy.get("@clearTaskBtn").click();
    }

    /**
     * Marks a task as priority by clicking on the specified row and column
     * @param {number} row - The row number (default: 0)
     * @param {number} col - The column number (default: 2)
     */
    markPriorityTask(row = 0, col = 2) {
        cy.get(selectors.tableBodyRow).eq(row).find(selectors.tableCellSpan).as("result");
        cy.get("@result").should("be.visible");
        cy.get("@result").eq(col).click();
        cy.get(selectors.jumbotron).should("be.visible");
        cy.get("@result").find("img").should("have.attr", "alt", "priority");
    }

    /**
     * Unmarks a task's priority by clicking on the specified row and column
     * @param {number} row - The row number (default: 0)
     * @param {number} col - The column number (default: 2)
     */
    unmarkPriorityTask(row = 0, col = 2) {
        cy.get(selectors.tableBodyRow).eq(row).find(selectors.tableCellSpan).as("result");
        cy.get("@result").should("be.visible");
        cy.get("@result").eq(col).click();
        cy.get(selectors.jumbotron).should("be.visible");
        cy.get("@result").find("img").should("have.attr", "alt", "no-priority");
    }

    /**
     * Clicks the inbox rules button and verifies the rules table is visible
     */
    pressInboxRulesBtn() {
        cy.get(selectors.inboxRulesBtn)
            .as("inboxRulesBtn")
            .should("be.visible");
        cy.get("@inboxRulesBtn").click();
        cy.get(selectors.inboxRuleTable).should("be.visible");
    }

    /**
     * Clicks the rules tab and verifies the rules table is visible
     */
    pressRulesTab() {
        cy.xpath(selectors.rulesTab).as("rulesTab").should("be.visible");
        cy.get("@rulesTab").click();
        cy.get(selectors.inboxRuleTable).should("be.visible");
    }

    /**
     * Clicks the execution log tab and verifies the rules table is visible
     */
    pressExecutionLogTab() {
        cy.xpath(selectors.executionLogTab).as("logTab").should("be.visible");
        cy.get("@logTab").click();
        cy.get(selectors.inboxRuleTable).should("be.visible");
    }

    /**
     * Clicks the create rule button and verifies the new rule title is visible
     */
    pressCreateRule() {
        cy.xpath(selectors.createRuleBtn)
            .as("createRuleBtn")
            .should("be.visible");
        cy.get("@createRuleBtn").click();
        cy.get(selectors.newInboxRuleTitle).should("have.text", "New Inbox Rule");
    }

    /**
     * Clicks a button at the specified index
     * @param {number} nro - The index of the button to click
     */
    pressBtn(nro){
        cy.get(selectors.optionNroBtn).as("btn").should("be.visible");
        cy.get("@btn").eq(nro).click();
    }

    /**
     * Selects an option from the save search dropdown
     * @param {string} option - The option text to select
     */
    pressSelectOptionSaveSearch(option) {
        cy.get(selectors.optionSaveSearch).contains(option).click();
    }

    /**
     * Writes a name in the rule name field
     * @param {string} name - The name to write in the rule name field
     */
    writeRuleName(name) {
        cy.get(selectors.ruleNameField).clear().type(name);
        cy.get(selectors.ruleNameField).should("have.value", name);
    }

    /**
     * Writes a deactivation date in the date field
     * @param {string} dateVar - The date to write in the deactivation date field
     */
    writeDesactivationDate(dateVar) {
        cy.get(selectors.desactivationDateField).clear().type(dateVar);
        cy.get(selectors.desactivationDateField).should("have.value", dateVar);
    }

    /**
     * Clicks the save button in the smart inbox rule configuration
     */
    saveBtnSmartInbox() {
        cy.get(selectors.saveBtnRuleConfiguration).click();
    }

    /**
     * Clicks the cancel button in the smart inbox rule configuration
     */
    cancelBtnSmartInbox() {
        cy.get(selectors.saveBtnRuleConfiguration).click();
    }

    /**
     * Waits for and verifies the success message when creating a rule
     * @param {string} ruleName - The name of the rule that was created
     */
    waitMessageSuccessCreateRuleInbox(ruleName) {
        cy.log(ruleName);
        cy.get(selectors.modalCreateRule).within(() => {
            cy.get("b").should("have.text", "Rule successfully created");
            cy.get("span").should(
                "have.text",
                "Please take a look at it in the 'Rules' section located within your Inbox."
            );
        });
    }

    /**
     * Performs an action on the first inbox rule in the table
     * @param {string} action - The action to perform (e.g., "Delete")
     */
    actionInboxRule(action) {
        cy.get(selectors.rowTableInboxRule).first().trigger("mouseover");
        cy.get(
            selectors.actionInboxRule.replace("selectOption", action)
        ).click();
    }

    /**
     * Confirms an action on an inbox rule
     * @param {string} action - The action to confirm (e.g., "Delete")
     */
    confirmActionInboxRule(action) {
        let nro;
        if (action == "Delete") {
            nro = 0;
        } else {
            nro = 1;
        }
        cy.get(selectors.confirmActionInboxRule).eq(nro).click();
    }

    /**
     * Searches for an inbox rule by name
     * @param {string} name - The name of the rule to search for
     */
    searchInboxRule(name) {
        cy.get(selectors.searchInboxRule).as("search").should("be.visible");
        cy.get("@search").clear().type(name, { delay: 400 });
        cy.get("@search").should("have.value", name);
    }

    /**
     * Searches for an inbox rule and performs an action if found
     * @param {string} inboxRuleName - The name of the rule to search for
     * @param {string} action - The action to perform if the rule is found
     */
    searchInboxRuleAndAction(inboxRuleName, action) {
        this.searchInboxRule(inboxRuleName);
        cy.get(selectors.totalPaginationInboxRule)
            .eq(1)
            .invoke("text")
            .then(($el) => {
                if ($el.trim() == "0 items") {
                    cy.log("no result");
                } else {
                    this.actionInboxRule(action);
                }
            });
    }

    /**
     * Deletes a rule using the API
     * @param {string} ruleId - The ID of the rule to delete
     * @returns {Promise} A promise that resolves with the deleted rule data
     */
    deleteRuleAPI(ruleId) {
        if (ruleId !== undefined) {
            return cy.window().then((win) => {
                return win.ProcessMaker.apiClient
                    .delete("tasks/rules/" + ruleId)
                    .then((response) => {
                        console.log("delete Rule");
                        return response.data.data;
                    });
            });
        } else {
            return "The rules does not exist";
        }
    }

    /**
     * Gets a rule by name using the API
     * @param {string} ruleName - The name of the rule to find
     * @returns {Promise} A promise that resolves with the found rule
     */
    getRuleByNameAPI(ruleName) {
        return cy.window().then((win) => {
            return win.ProcessMaker.apiClient
                .get("/tasks/rules", { params: { filter: ruleName } })
                .then((response) => {
                    const rule = response.data.data.find(
                        (rule) => rule.name === ruleName
                    );
                    console.log("test rule: ", rule);
                    return rule;
                })
                .catch((err) => {
                    throw err;
                });
        });
    }

    /**
     * Verifies if a rule exists and creates it if it doesn't
     * @param {string} inboxName - The name of the inbox rule
     * @param {string} message - The success message to verify
     * @param {string} saveSearchName - The name of the save search to use
     */
    verifyIfExistRule(inboxName, message, saveSearchName) {
        this.searchInboxRule(inboxName);
        cy.get(selectors.totalPaginationInboxRule)
            .eq(1)
            .scrollIntoView()
            .invoke("text")
            .then(($el) => {
                const count = parseInt($el.trim());
                if (count === 0) {
                    this.pressCreateRule();
                    this.pressBtn(2);
                    this.pressSelectOptionSaveSearch(saveSearchName);
                    this.writeRuleName(inboxName);
                    this.saveBtnSmartInbox();
                    this.waitMessageSuccessCreateRuleInbox(message);
                } else {
                    cy.log("the rule name there is exist");
                }
            });
    }

    /**
     * Clicks the clear draft task button
     */
    pressClearDraftTask() {
        cy.xpath(selectors.clearDraftBtn).should("be.visible");
        cy.xpath(selectors.clearDraftBtn).click();
    }

    /**
     * Closes the modal that appears after successfully creating a rule
     */
    closeModalSuccessfullyCreated() {
        cy.get(selectors.closeBtnModalCreateRule).click();
    }
}
