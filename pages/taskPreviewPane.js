import selectors from "#selectors/taskPreviewPane";

export class taskPreviewPane{
    searchForTaskAndProcessFilterOneStatus(status){
        cy.xpath(taskFilter).should('be.visible').click({force:true});
        cy.xpath('//select[@data-cy="value0"]').select(status);
        cy.xpath(applyFilterButton)
                   .should('be.visible')
                   .click();
    } 
}
