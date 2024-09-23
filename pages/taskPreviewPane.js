import selectors from "#selectors/taskPreviewPane";

export class taskPreviewPane{
    searchForTaskAndProcessFilterOneStatus(status){
        cy.xpath(selectors.taskFilter).should('be.visible').click({force:true});
        cy.xpath('//select[@data-cy="value0"]').select(status);
        cy.xpath(selectors.applyFilterButton)
                   .should('be.visible')
                   .click();
    } 
}
