import selectors from "#selectors/taskPreviewPane";

export class taskPreviewPane{
    searchForTaskAndProcessFilterOneStatus(process,status){
        cy.xpath(selectors.taskFilter).should('be.visible').click();
        cy.xpath(selectors.taskFilterRequest).click({force:true}).type(process, {delay:250}).should('have.value', process);
        cy.xpath(selectors.taskFilterRequest).type('{enter}', {force:true});
        cy.xpath(selectors.labelSelected.replace('label', process)).should('be.visible');
        switch(status){
            case 'In Progress':
                cy.xpath(selectors.labelSelected.replace('label', status)).should('be.visible');
                cy.xpath(selectors.applyFilterButton)
                    .should('be.visible')
                    .click();                
                break;
            case 'Self Service':
                cy.xpath(selectors.inProgressRemoveElement)
                    .should('be.visible')
                    .click();
                cy.xpath(selectors.taskFilterStatus)
                    .click({force:true})
                    .type(status)
                    .type('{enter}');
                cy.xpath(selectors.labelSelected.replace('label', status)).should('be.visible');
                cy.xpath(selectors.applyFilterButton)
                    .should('be.visible')
                    .click();
                break;
            case 'Completed':
                cy.xpath(selectors.inProgressRemoveElement)
                    .should('be.visible')
                    .click();
                cy.xpath(selectors.taskFilterStatus)
                    .click({force:true})
                    .type(status)
                    .type('{enter}');
                cy.xpath(selectors.labelSelected.replace('label', status)).should('be.visible');
                cy.xpath(selectors.applyFilterButton)
                    .should('be.visible')
                    .click();
                
                break;
        }
    }
}
