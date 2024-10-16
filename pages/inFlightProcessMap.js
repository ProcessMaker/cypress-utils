import selectors from "#selectors/processMap";

export class ProcessMap {
    /**
     * This method is responsible to click over Overview tab inside a Request
     * @param nothing
     * @return nothing returns
     */
    pressOverviewTab() {
        cy.xpath(selectors.overviewTabXpath).should("be.visible").click();
        cy.xpath(selectors.overviewTabXpath).click();
    }

    /**
     * This method is responsible to open the Iframe for display elements inside the Canvas when Overview tab is selected inside a Request
     * @param Id_process: This is the Process ID
     * @param Id_request: This is the Request ID
     * @return nothing returns
     */
    openIframe(Id_process, Id_request) {
        var url = "/modeler/" + Id_process + "/inflight/" + Id_request;
        cy.visit(url);
        cy.url().should("include", url);
    }

    /**
     * This method is responsible to open a tooltip to a Task inside the Canvas when Overview tab is selected inside a Request
     * @param taskName: Name for a BPMN element
     * @return nothing returns
     */
    openTooltipBox(varTaskName) {
        const taskElementXpath = selectors.taskBpmnXpath;
        cy.xpath(selectors.zoomBoxXpath).should("be.visible");
        cy.xpath(taskElementXpath.replace("bpmnTask", varTaskName))
            .first()
            .should("be.visible")
            .click();
        cy.xpath(selectors.tooltipXpath).should("be.visible");
    }

    /**
     * This method is responsible to open a tooltip to a Flow inside the Canvas when Overview tab is selected inside a Request
     * @param varLineName: Name for a BPMN flow element
     * @return nothing returns
     */
    openTooltipLine(varLineName) {
        const lineElementXpath = selectors.flowBpmnXpath;
        cy.xpath(lineElementXpath.replace("lineName", varLineName))
            .first()
            .should("be.visible")
            .click({force: true});
        cy.xpath(selectors.tooltipXpath).should("be.visible");
    }
}
