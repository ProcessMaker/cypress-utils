// import selectors from "#selectors/pagination"

function obtainValue(selector, option = 1){
    return cy.get(selector + ' span[class="pagination-total"]')
        .eq(option)
        .scrollIntoView()
        .then(($el) => {
            if(option == 0 )
                expect($el).to.be.contains.text("of");
            else
                expect($el).to.be.contains.text("item");
                
            return $el
                .text()
                .trim()
                .replace(/[^0-9]/g, "");
        });
}
export class Pagination {
    selectSelector(page) {
        let selector = "";
        switch(page) {
            case "data-sources":
                // selector = '[data-cy="datasource-pagination"]';// span[class="pagination-total"]
                // break;
            case "decision-tables":
                selector = '[data-cy="datasource-pagination"]';
                break;
            case "processes":
                selector = '[data-cy="process-pagination"]';
                break;
            case "scripts":
                selector = '[data-cy="scripts-table"] [class="pagination"]';
                break;
            case "screens":
                selector = '[id="screenIndex"] [class="pagination"]';
                break;
            default:
                selector = '[class="pagination"]';
        }
        return selector;
    }

    /**
     * This method press an option in the pagination as first, previous, next and last button in order to change the paginations
     * @param buttonName: name of the option button
     * @return nothing
    */
    pressButtonPagination(buttonName = "next", page){
        let p = this.selectSelector(page);
        let nroButton;
        switch(buttonName) {
            case "first":
                nroButton = 0;
                break;
            case "last":
                nroButton = 3;
                break;
            case "previous":
                nroButton = 1;
                break;
            default:
                nroButton = 2;
        }
        cy.get(p).first().scrollIntoView().within(() => {
            cy.get("button").eq(nroButton).click();
        });
        cy.get('.jumbotron').should("not.be.visible");
    }

    /**
     * This method return a pagination total value according to pagination
     * @param nothing
     * @return an integer value, you need catch that value with a .then(($val) => { let total = JSON.stringify($val)}) from your test 
    */
    returnPaginationTotal(page) {
        let selector = this.selectSelector(page);
        return obtainValue(selector, 0);
    }

    /**
     * This method return a total items
     * @param page, the values are related to pages
     * @return an integer value, you need catch that value with a .then(($val) => { let item = JSON.stringify($val)}) from your test 
    */
    returnItemTotal(page){
        let selector = this.selectSelector(page);
        return obtainValue(selector, 1);
    }

    /**
     * This method selects an option as 15 items, 30 items or 
     * @param nothing
     * @return an integer value, you need catch that value with a .then(($val) => { let v = JSON.stringify($val)}) from your test 
    */
    selectPerPageField(option = 0, page) {
        let p = this.selectSelector(page);
        cy.get(p).first().scrollIntoView().within(() => {
            cy.get("button").eq(4).click();
            cy.get(".dropdown-menu").should("be.visible");
            cy.get("a").eq(option).click();
        });
        cy.get('.jumbotron').should("not.be.visible");
    }
}
