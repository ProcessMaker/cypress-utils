import selectors from "#selectors/smartInbox";
export class SmartInbox {

    searchTask(taskName){
        cy.xpath('//tbody//tr').should('be.visible');
        cy.get(selectors.searchTask).type(taskName);
        cy.get(selectors.searchTask).type('{enter}');
        cy.get(selectors.loadingSpinnerTask).should('be.visible');
        cy.get(selectors.loadingSpinnerTask).should('not.be.visible');
        cy.xpath("//table//td//*[contains(text(),'"+taskName+"')]").should('be.visible');
    }
    taskAsPriority(taskName, priorityCol = 2){
        cy.xpath("//*[@data-cy='tasks-table']//*[contains(text(),'"+taskName+"')]").should('be.visible');
        cy.xpath('(//tbody//td["'+ priorityCol +'"]//img)[1]').should('be.visible').click();
        cy.get(selectors.loadingSpinnerTask).should('be.visible');
        cy.get(selectors.loadingSpinnerTask).should('not.be.visible');
        cy.get('[alt="priority"]').should('be.visible');
    }

    pressClearTaskButton() {
        cy.xpath(selectors.clearDraftBtn)
            .as("clearTaskBtn")
            .should("be.visible");
        cy.get("@clearTaskBtn").click();
    }

    markPriorityTask(row = 0, col = 2) {
        cy.get("tbody tr").eq(row).find("td span").as("result");
        cy.get("@result").should("be.visible");
        cy.get("@result").eq(col).click();
        cy.get('[class="jumbotron jumbotron-fluid"]').should("be.visible");
        cy.get("@result").find("img").should("have.attr", "alt", "priority");
    }

    unmarkPriorityTask(row = 0, col = 2) {
        cy.get("tbody tr").eq(row).find("td span").as("result");
        cy.get("@result").should("be.visible");
        cy.get("@result").eq(col).click();
        cy.get('[class="jumbotron jumbotron-fluid"]').should("be.visible");
        cy.get("@result").find("img").should("have.attr", "alt", "no-priority");
    }

    pressInboxRulesBtn() {
        cy.get(selectors.inboxRulesBtn)
            .as("inboxRulesBtn")
            .should("be.visible");
        cy.get("@inboxRulesBtn").click();
        cy.get(selectors.inboxRuleTable).should("be.visible");
    }

    pressRulesTab() {
        cy.xpath(selectors.rulesTab).as("rulesTab").should("be.visible");
        cy.get("@rulesTab").click();
        cy.get(selectors.inboxRuleTable).should("be.visible");
    }

    pressExecutionLogTab() {
        cy.xpath(selectors.executionLogTab).as("logTab").should("be.visible");
        cy.get("@logTab").click();
        cy.get(selectors.inboxRuleTable).should("be.visible");
    }

    pressCreateRule() {
        cy.xpath(selectors.createRuleBtn)
            .as("createRuleBtn")
            .should("be.visible");
        cy.get("@createRuleBtn").click();
        cy.get('[id="inbox-rules"] h4').should("have.text", "New Inbox Rule");
    }

    pressBtn(nro){
        cy.get(selectors.optionNroBtn).as("btn").should("be.visible");
        cy.get("@btn").eq(nro).click();
    }

    pressSelectOptionSaveSearch(option) {
        cy.get(selectors.optionSaveSearch).contains(option).click();
        cy.get(selectors.pagination).should("be.visible");
    }

    writeRuleName(name) {
        cy.get(selectors.ruleNameField).clear().type(name);
        cy.get(selectors.ruleNameField).should("have.value", name);
    }

    writeDesactivationDate(dateVar) {
        cy.get(selectors.desactivationDateField).clear().type(dateVar);
        cy.get(selectors.desactivationDateField).should("have.value", dateVar);
    }

    saveBtnSmartInbox() {
        cy.get(selectors.saveBtnRuleConfiguration).click();
    }

    cancelBtnSmartInbox() {
        cy.get(selectors.saveBtnRuleConfiguration).click();
    }

    waitMessageSuccessCreateRuleInbox(ruleName) {
        //cy.get(selectors.messageCreateRule).as("message").should("be.visible");
        //cy.get("@message").should("have.text", ruleName);
        cy.log(ruleName);
        cy.get(selectors.modalCreateRule).within(() => {
            cy.get("img").should(
                "have.attr",
                "src",
                "/img/check-circle-lg.svg"
            );
            cy.get("img").should(
                "have.attr",
                "alt",
                "Rule successfully created"
            );
            cy.get("b").should("have.text", "Rule successfully created");
            cy.get("span").should(
                "have.text",
                'Check it out in the "Rules" section of your inbox.'
            );
        });
    }

    actionInboxRule(action) {
        cy.get(selectors.rowTableInboxRule).first().trigger("mouseover");
        cy.get(
            selectors.actionInboxRule.replace("selectOption", action)
        ).click();
    }

    confirmActionInboxRule(action) {
        let nro;
        if (action == "Delete") {
            nro = 0;
        } else {
            nro = 1;
        }
        cy.get(selectors.confirmActionInboxRule).eq(nro).click();
    }

    searchInboxRule(name) {
        cy.get(selectors.searchInboxRule).as("search").should("be.visible");
        cy.get("@search").clear().type(name, { delay: 200 });
        cy.get("@search").should("have.value", name);
    }

    searchInboxRuleAndAction(inboxRuleName, action) {
        this.searchInboxRule(inboxRuleName);
        cy.get(selectors.totalPaginationInboxRule)
            .invoke("text")
            .then(($el) => {
                if ($el.trim() == "0 items") {
                    cy.log("no result");
                } else {
                    this.actionInboxRule(action);
                }
            });
    }

    deleteRuleAPI(ruleId) {
        if (ruleId !== undefined) {
            return cy.window().then((win) => {
                return win.ProcessMaker.apiClient
                    .delete("tasks/rules/" + ruleId)
                    .then((response) => {
                        console.log("delete Rule");
                        // return cy.wrap(response.data.data);
                        return response.data.data;
                    });
            });
        } else {
            return "The rules does not exist";
        }
    }

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

    verifyIfExistRule(inboxName, message, saveSearchName) {
        this.searchInboxRule(inboxName);
        cy.get(selectors.totalPaginationInboxRule)
            .first()
            .scrollIntoView()
            .invoke("text")
            .then(($el) => {
                if ($el.trim() == "0 items") {
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

    pressClearDraftTask() {
        cy.xpath(selectors.clearDraftBtn).should("be.visible");
        cy.xpath(selectors.clearDraftBtn).click();
    }

    closeModalSuccessfullyCreated() {
        cy.get(selectors.closeBtnModalCreateRule).click();
    }
}
