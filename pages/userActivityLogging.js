import selectors from "#selectors/userActivityLogging";
import selectorsAdmin from "#selectors/admin";

export class userActivityLogging{
    /**
     * This method is responsible to search by a specific event
     * @param event: event name such as: TokenCreated, FolderAccessed
     * @return nothing returns
     */
    searchByEvent(event) {
        cy.get("textarea[class='pmql-input']")
            .as("search")
            .should("be.visible");
        cy.get("@search")
            .type(event, { delay: 200 })
            .should("have.value", event);
        cy.get("@search").type("{enter}");
        cy.get('[id="nav-logs"] [class="data-table"] tbody')
            .find("td")
            .its("length")
            .should("be.greaterThan", 0);
    }

    /**
     * Clicks on the `User Activity` tab
     * @method pressUserActivityTab
     */
    pressUserActivityTab(){
        cy.get('[class="nav nav-tabs"] [id="nav-logs-tab"]').should('be.visible').click()
    }

    /**
     * Presses the play button on a specific row in the activity log
     * @method pressPlayButton
     * @param {number} [row=0] - The row index of the play button to click
     */
    pressPlayButton(row=0){
        cy.wait(3000)
        cy.get('[id="nav-logs"] table > tbody td > span > button').should('exist').eq(row).click();
    }

    /**
     * Validates the content of the activity log modal
     * @method validateActivityLogModal
     * @param {Object} data - The data object containing expected values for validation
     * @param {string} data.title - The expected title of the modal
     * @param {Array<string>} data.labels - The expected labels in the modal
     * @param {Array<string>} data.valueName - The expected names in the modal
     * @param {Array<string>} data.values - The expected values in the modal
     */
    validateActivityLogModal(data){
        cy.get('[id="showLogInfo"] [class="modal-content"]').should('be.visible').within(() => {    
            //verify title
            cy.get('header > h5 > p').invoke('text').then(($title)=>{
                expect($title.trim().replace(/\s+/g, "")).to.eq(data.title)
            })
            //verify labels
            cy.get('[class="modal-body"] p > b').each(($el, index)=>{
                if(data.labels[index] != "-")
                    expect($el.text().trim()).to.be.eq(data.labels[index])
            });
            //varify name title
            if(data.title.toLowerCase().indexOf('deleted') === -1 && data.valueName[0]!= "-"){
                cy.get('[class="modal-body"] p > a').each(($el, index)=>{
                    if(data.valueName[index] != "-")
                        expect($el.text().trim()).to.be.eq(data.valueName[index])
                });
            }
            //verify values
            cy.get('[class="modal-body"] p > span').each(($el, index)=>{
                if(data.values[index] != "-")
                    expect($el.text().trim()).to.be.eq(data.values[index])
            });
        })
    }

    /**
     * Opens a URL from the activity log modal
     * @method openURLfromModal
     */
    openURLfromModal(){
        cy.get('[id="showLogInfo"] [class="modal-content"]').should('be.visible').within(() => {
            cy.get('[class="modal-body"] p > a').should('be.visible').click()
        })
    }
}
