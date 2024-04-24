import selectors from "#selectors/dataValidation";
export class DataVisualization {
    /**
     * This method do a click in toggle to active the Data visualization in the Tasks page
     * @param none
     * @return nothing returns
     */
    pressToggleInTask() {
        cy.xpath(selectors.toggleDataVisualizationInTask).should(
            "have.attr",
            "data-cy",
            "treeViewToggle"
        );
        cy.xpath(selectors.toggleDataVisualizationInTask).click({
            force: true,
        });
        cy.xpath(selectors.toggleDataVisualizationInTask).should(
            "have.attr",
            "data-cy",
            "treeViewToggle-checked"
        );
    }

    /**
     * This method do a click in toggle to active the Data visualization in the Designer > Data Connector
     * @param none
     * @return nothing returns
     */
    pressToggleInDataConnector() {
        cy.xpath(selectors.toggleDataVisualizationInDataConnector).should(
            "have.attr",
            "data-cy",
            "treeViewToggle"
        );

        cy.xpath(selectors.toggleDataVisualizationInDataConnector).click({
            force: true,
        });

        cy.xpath(selectors.toggleDataVisualizationInDataConnector).should(
            "have.attr",
            "data-cy",
            "treeViewToggle-checked"
        );
    }

    /**
     * This method do a click in toggle to active the Data visualization in the Screen page
     * @param none
     * @return nothing returns
     */
    openModalDataVisualizationInScreen() {
        cy.wait(2000);
        cy.xpath(selectors.dataPreviewBtnScreenPreview).should("be.visible");
        cy.xpath(selectors.dataPreviewBtnScreenPreview).click();
        cy.xpath(selectors.headerPanelScreenPreview).should(
            "have.text",
            "Output Preview Panel"
        );
    }

    /**
     * This method open the Data visualization's panel for a Script Task
     * @param none
     * @return nothing returns
     */
    openModalDataVisualizationScriptTask() {
        cy.get(selectors.scriptConfigurationBtnScriptTask).should("be.visible");
        cy.get(selectors.scriptConfigurationBtnScriptTask).click();
        cy.get(selectors.panelDataVisualizationScriptTask).should("be.visible");
    }

    /**
     * This method do a click in toggle to active the Data visualization in the Script Tasks
     * @param none
     * @return nothing returns
     */
    pressToggleScriptTask() {
        cy.xpath(selectors.toggleScriptTask).should("have.css", "opacity", "0");
        cy.xpath(selectors.toggleScriptTask).click({ force: true });
        cy.wait(15000);
    }

    /**
     * This method do a click in button to open the panel in the Script
     * @param none
     * @return nothing returns
     */
    openModalDataVisualizationInScript() {
        cy.xpath(selectors.panelDataVisualizationScrip).should("be.visible");
        cy.xpath(selectors.panelDataVisualizationScrip).click();
        cy.xpath(selectors.headerPanelScreenPreview).should(
            "have.text",
            "Output Preview Panel"
        );
    }
}
