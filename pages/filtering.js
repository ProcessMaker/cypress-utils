import selectors from "#selectors/filtering.js";

export class Filtering {
    /**
     * This methos open the Filter modal
     * @param {column} this option must be a number according to column number
     * @return nothing returns
     */
    table_openFilterByColumn(column) {
        //this.table_waitForTableData();
        cy.wait(2000);
        cy.get('[data-cy="tasks-table"]').should("be.visible");
        cy.get(selectors.columnHeader.replace("{col}", column)).should("be.visible").trigger(
            "mouseover"
        );
        cy.get(selectors.openFilter.replace("{col}", column)).click({
            force: true,
        });
        cy.get(selectors.filterForm, { timeout: 10000 } ).should("be.visible");
    }

    /**
     * This methos wait until gear icon is disappeared inside the table
     * @param nothing
     * @return nothing returns
     */
    table_waitForTableData() {
        cy.get(selectors.gearIcon).should("not.be.visible");
    }

    /**
     * This method presses the Cancel, Clear or Apply button
     * @param {column} Name of button, it can be Cancel, Clear or Apply
     * @return nothing returns
     */
    table_selectOptionBtnFilter(option) {
        cy.get(selectors.filterFooterBtns).eq(5).should("be.visible");
        cy.get(selectors.filterFooterBtns)
            .eq(5)
            .find("button")
            .contains(option)
            .click();
        //cy.get('[class="jumbotron jumbotron-fluid"]').should("be.visible");
        //cy.get('[class="jumbotron jumbotron-fluid"]').should("not.be.visible");
    }
    /**
     * This method presses the `sort ascending` option when the filter model is opened for a specific column
     * @param None of button, it can be Cancel, Clear or Apply
     * @return nothing returns
     */
    pressSortAscending() {
        cy.get('div[class="pm-filter-form"] fieldset')
            .eq(0)
            .contains("Sort Ascending")
            .as("btnDesc")
            .should("be.visible");
        cy.get("@btnAcs").click();
    }

    /**
     * This method presses the `sort descending` option when the filter model is opened for a specific column
     * @param None of button, it can be Cancel, Clear or Apply
     * @return nothing returns
     */
    pressSortDescending() {
        cy.get('div[class="pm-filter-form"] fieldset')
            .eq(0)
            .contains("Sort Descending")
            .as("btnDesc")
            .should("be.visible");
        cy.get("@btnDesc").click();
    }

    /**
     * This method select a option when the filter model is opened for a specific column
     * @param {option} of button, it can be Cancel, Clear or Apply
     * @return nothing returns
     */
    selectOptionFilter(nro, option) {
        cy.get(selectors.filterForm)
            .first()
            .within(() => {
                cy.get("select").eq(nro).as("field");
                cy.get("@field").should("be.visible");
                cy.get("@field").select(option);
                cy.get("@field").should("have.value", option);
            });
    }

    fillDataOnFilterModal(selector, val) {
        cy.get(selector).clear();
        cy.get(selector).type(val);
        cy.get(selector).should("have.value", val);
    }

    fillBasicFilter(col = 3, option = "=", val = 123) {
        this.table_openFilterByColumn(col);
        this.selectOptionFilter(0, option);
        cy.get('[data-cy="value0"]').type(val).should("have.value", val);
        this.table_selectOptionBtnFilter("Apply");
    }
    clearColumnFilter(col = 3) {
        this.table_openFilterByColumn(col);
        this.table_selectOptionBtnFilter("Clear");
    }
}
