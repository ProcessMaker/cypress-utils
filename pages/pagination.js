// import selectors from "#selectors/pagination"
export class Pagination {
    pressButtonPagination(buttonName = "next"){
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
            case "default":
                nroButton = 2;
        }
        cy.get('[class="pagination"]').scrollIntoView().within(() => {
            cy.find("button").eq(nroButton).click();
        });
    }

    selectOptionPagination() {
        cy.get('[class="pagination"]').scrollIntoView().within(() => {
            cy.find('span[]').eq(nroButton).click();
        });
    }

    returnItemTotal(){
        cy.get('[class="pagination"]').scrollIntoView().within(() => {
            cy.find('span[class="pagination-total"]').eq(1).then(($el) => {
                expect($el).to.be.contains.text("items");
                return $el
                    .text()
                    .trim()
                    .replace(/[^0-9]/g, "");
            })
        });
    }
}
