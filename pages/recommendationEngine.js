import selectors from "#selectors/recommendationEngine"
export class RecommendationEngine {
    /**
     * @param {string} buttonName: accepted values `priority`, `reassign`, `ellipsisOption` and `close recommendation` (default option)
     * @param {string} option: related to select one option in the list as `Create a Rule based on this suggestion`, `Dismiss this suggestion` and `dismiss all`
     */
    pressReassignButtonFromTask(buttonName, option=""){
        cy.get(selectors.recommendationMessage)
            .should("be.visible")
            .within(() => {
                switch(buttonName){
                    case "priority":
                        cy.get(selectors.recommendationButton)
                            .eq(0)
                            .click();
                        break;
                    case "reassign":
                            cy.get(selectors.recommendationButton)
                                .eq(1)
                                .click();
                        break;
                    case "ellipsisOption":
                            cy.get(selectors.recommendationEllipsisButton)
                                .should("have.class", "fa fa-ellipsis-v")
                                .click();
                            //select option
                            cy.get(selectors.recommendationEllipsisOption)
                                .should("be.visible")
                                .contains(option)
                                .click();
                        break;
                    default:
                        //close Recommendation
                        cy.get(selectors.recommendationMessageClose)
                            .should("have.class", '[class="fa fa-times"]')
                            .click();
                }
            });
    }
    /**
     * Press link in Home page
     */
    pressLinkFromHome(){
        cy.get(selectors.recommendationMessageHomePage)
            .should("be.visible")
            .within(() => {
                cy.get(selectors.recommendationLinkHomePage).click();
            });
    }

    /**
     * Select a option in the ellipsis in order to execute `Dismiss This Suggestion` or `Dismiss All` in Home page
     * @param {string} option, accepted value: `Dismiss all`
     */
    pressOptionsFromHome(option){
        cy.get(selectors.recommendationMessageHomePage)
            .should("be.visible")
            .within(() => {
                cy.get(selectors.recommendationEllipsisButtonHomePage)
                    .should("be.visible")
                    .click();
                switch(option){
                    case "Dismiss All":
                        cy.get(selectors.recommendationEllipsisOption)
                            .eq(1)
                            .click();
                        break;
                    default:
                        cy.get(selectors.recommendationEllipsisOption)
                            .eq(0)
                            .click();
                }
            });
    }
}