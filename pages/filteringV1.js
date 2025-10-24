import selectors from "#selectors/filtering.js";

export class FilteringV1 {

    /**
     * Opens the filter dropdown for a specific column by triggering mouseover event
     * @param {number} column - Column index (default: 0)
     */
    openFilter(column = 0){
        cy.get(selectors.openFilter).eq(column).should('be.visible').trigger('mouseover')
    }

    /**
     * Displays the three dots filter menu for a specific column
     * @param {number} column - Column index (default: 0)
     */
    displayDotFilter(column = 0){
        cy.get(selectors.threeDots).eq(column).click({force:true})
    }

    /**
     * Verifies that the filter modal is visible on the page
     */
    filterModalIsVisible(){
        cy.get(selectors.modalFilter).should('be.visible')
    }

    /**
     * Clicks a button within the filter modal
     * @param {string} buttonName - Button name to click ("Cancel"|"Apply"|"Clear", default: "Cancel")
     */
    pressButtonModal(buttonName = "Cancel"){
        cy.get(selectors.filterForm).within(() => {
            cy.contains('button', buttonName).click()
        })
    }

    /**
     * Clicks the sort button with the specified action
     * @param {string} action - Sort action ("Sort Ascending"|"Sort Descending", default: "Sort Ascending")
     */
    pressSortButton(action = "Sort Ascending"){
        cy.get(selectors.sortButton).eq(0).contains('button', action).click()
    }

    /**
     * Fills the filter option dropdown for a specific row
     * @param {string} option - Filter option to select (default: "=")
     * @param {number} row - Row index (default: 0)
     */
    fillFilter(option = "=", row = 0){
        cy.get(selectors.optionFilter.replace('{row}', row)).select(option)
    }

    /**
     * Fills the filter value input field for a specific row
     * @param {string} value - Value to type in the input field (default: "")
     * @param {number} row - Row index (default: 0)
     */
    fillValue(value = "", row = 0){
        cy.get(selectors.valueFilter.replace('{row}', row)).type(value)
        
    }

    /**
     * Removes a filter for a specific row by clicking the remove button
     * @param {number} row - Row index (default: 0)
     */
    removeFilter(row = 0){
        cy.get(selectors.removeButtonModal.replace('{row}', row)).click()
    }

    /**
     * Adds a new filter row by clicking the add new filter button
     */
    addNewFilter(){
        cy.get(selectors.addNewFilterButton).parent().parent("button").click()
    }
}
