export class RecommendationEngine {
    /**
     * 
     * @param {string} buttonName: accepted values `priority`, `reassign`, `ellipsisOption` and `close recommendation` (default option)
     */
    pressReassignButtonFromTask(buttonName, option=""){
        cy.get('[class="recommendation"]')
            .should("be.visible")
            .within(() => {
                switch(buttonName){
                    case "priority":
                        cy.get('[class="recommendation-actions"] button')
                            .eq(0)
                            .click();
                        break;
                    case "reassign":
                            cy.get('[class="recommendation-actions"] button')
                                .eq(1)
                                .click();
                        break;
                    case "ellipsisOption":
                            cy.get('[class="recommendation-actions"] button i')
                                .should("have.class", "fa fa-ellipsis-v")
                                .click();
                            //select option
                            
                        break;
                    default:
                        //close Recommendation
                        cy.get('[class="recommendation-actions"] a > i')
                            .should("have.class", '[class="fa fa-times"]')
                            .click();
                }
            });
    }
}