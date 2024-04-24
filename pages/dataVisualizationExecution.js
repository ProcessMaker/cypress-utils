import selectors from "#selectors/dataValidation";
export class DataVisualizationExecution {
    verifyIconsAndToggleBtnInTask() {
        cy.xpath(selectors.containerToggleInTask)
            .find("i > img")
            .eq(0)
            .should("have.attr", "alt", "codeViewIcon");
        cy.xpath(selectors.containerToggleInTask)
            .find("i > img")
            .eq(1)
            .should("have.attr", "alt", "treeViewIcon");
    }

    verifyScreenPanel() {
        cy.xpath(selectors.panelContainerScreePreview).should("be.visible");
        cy.xpath(selectors.countPanelScreenPreview).should("have.length", 2);
        //verify monaco first lines
        cy.xpath(selectors.firstLinesMonacoScreenPreview).should(
            "have.length",
            26
        );
        cy.get(selectors.iframeDataVisualization).should("be.visible");
    }

    verifyIframeDataVisualization(nodes) {
        //verify iframe
        const getIframeDocument = () => {
            return cy
                .get(selectors.iframeDataVisualization)
                .its("0.contentDocument")
                .should("exist");
        };

        const getIframeBody = () => {
            return getIframeDocument()
                .its("body")
                .should("not.be.undefined")
                .should("not.be.null")
                .then(cy.wrap);
        };
        getIframeBody().find("[cursor='initial']").should("be.visible");
        getIframeBody().find("[cursor='initial']").should("have.length", nodes);
    }

    verifyIconsAndToggleBtnInDataConnector() {
        cy.xpath(selectors.containerToggleInDataConnector)
            .find("i > img")
            .eq(0)
            .should("have.attr", "alt", "codeViewIcon");
        cy.xpath(selectors.containerToggleInDataConnector)
            .find("i > img")
            .eq(1)
            .should("have.attr", "alt", "treeViewIcon");
    }

    fillScreen(username) {
        cy.xpath("//input[@name='form_input_1']").should("be.visible");
        cy.xpath("//input[@name='form_input_1']").type("test1");
        cy.xpath("//div[@class='multiselect__tags']").click();
        cy.xpath("//input[@placeholder='Select...']").type(username);
        cy.xpath(
            "//div[@class='multiselect__content-wrapper']//span[text()='" +
                username +
                "']"
        ).click();
        cy.xpath("//button[@aria-label='New Submit']").click();
    }

    verifyIconAndToggleBtnCompleteRequest() {
        cy.xpath("//div[@class='flex-container']").should("be.visible");
        cy.xpath("//div[@class='flex-container']")
            .find("i > img")
            .eq(0)
            .should("have.attr", "alt", "codeViewIcon");
        cy.xpath("//div[@class='flex-container']")
            .find("i > img")
            .eq(1)
            .should("have.attr", "alt", "treeViewIcon");
    }
}
