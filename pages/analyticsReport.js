import selectors from "#selectors/analyticsReport";

export class analyticsReport {
     /**
     * This method is responsible for the creation of an analytic report
     * @param name: name of the analytic report
     * @param description: description of the analytic report
     * @param link: link of the analytic report
     * @return nothing returns
     */

    createAnalyticsReport(name, description, link){
        cy.xpath(selectors.addReports).click();
        cy.xpath(selectors.chartName).type(name).should('have.value',name);
        cy.xpath(selectors.chartDescription).type(description).should('have.value',description);
        cy.xpath(selectors.chartLink).type(link).should('have.value',link);
        cy.xpath(selectors.addButton).click();
    }

    /**
     * This method is responsible for the update of an analytic report
     * @param name: name of the analytic report for search
     * @param newName: new name for analytic report
     * @param newDescription: new description for analytic report
     * @param newLink: new link for analytic report
     * @return nothing returns
     */

    updateAnalyticsReport(name, newName, newDescription, newLink){
        cy.xpath(selectors.searchBox).clear().type(name).type('{enter}');
        cy.xpath((selectors.analyticsConfigure).replace('name', name)).should('be.visible').click();
        cy.xpath(selectors.chartName).clear().type(newName).should('have.value',newName);
        cy.xpath(selectors.chartDescription).clear().type(newDescription).should('have.value',newDescription);
        cy.xpath(selectors.chartLink).clear().type(newLink).should('have.value',newLink);
        cy.xpath(selectors.saveButton).click(); 
    }

    /**
     * This method is responsible for the delete of an analytic report
     * @param name: name of the analytic report for search
     * @return nothing returns
     */

    deleteAnalyticsReport(name){
        cy.xpath(selectors.searchBox).clear().type(name).type('{enter}');
        cy.xpath((selectors.analyticsDelete).replace('name', name)).should('be.visible').click();
        cy.xpath(selectors.questionDeleteMessage).should('be.visible');
        cy.xpath((selectors.questionDeleteMessageName).replace('report',name)).should('be.visible');
        cy.xpath(selectors.confirmDeleteAnalytics).click();
    }

    /**
     * This method is responsible for the verification of data of the analytic report
     * @param name: name of the analytic report for search
     * @param description: description of the analytic report
     * @param link: link of the analytic report
     * @return nothing returns
     */

    verifyAnalyticsReport(name, description, link){
        cy.xpath(selectors.searchBox).clear().type(name).type('{enter}');
        cy.xpath((selectors.analyticsConfigure).replace('name', name)).should('be.visible').click();
        cy.xpath(selectors.chartName).should('have.value',name);
        cy.xpath(selectors.chartDescription).should('have.value',description);
        cy.xpath(selectors.chartLink).should('have.value',link);
    }

    /**
     * This method is responsible for the verification the Analytics default report
     * @param name: name of the analytic report for search
     * @param description: description of the analytic report
     * @param link: link of the analytic report
     * @return nothing returns
     */

    verifyAnalyticsDefault(name) {
        cy.contains(name).should('be.visible');
    }
}
