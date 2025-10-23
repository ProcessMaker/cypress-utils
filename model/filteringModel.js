import { FilteringV1 } from "#pages/filteringV1"
const filter = new FilteringV1()

export class FilteringModel {
    /**
     * Configures a simple filter for a specific column with multiple conditions
     * @param {number} column - The column index to apply the filter to (default: 0)
     * @param {Object} payload - The filter configuration object containing conditions and action.
        payload = {
            conditions:[
                {
                    filter: ">",
                    value: "123",
                },
                {
                    filter: "<",
                    value: "125",
                }
            ],
            action: "Apply"
        }
     * @param {Array} payload.conditions - Array of filter conditions with filter type and value
     * @param {string} payload.action - The action to perform ("Cancel"|"Apply"|"Clear", default: "Cancel")
     */
    configureSimpleFilter(column = 0, payload = {}){
        filter.openFilter(column)
        filter.displayDotFilter(column)
        filter.filterModalIsVisible()
        payload.conditions.forEach(($filtering, $index) => {
            filter.fillFilter($filtering.filter, $index)
            filter.fillValue($filtering.value, $index)
            filter.addNewFilter()
        })
        filter.removeFilter(payload.conditions.length)
        filter.pressButtonModal(payload.action)
    }

    /**
     * Clears any existing filter for a specific column
     * @param {number} column - The column index to clear the filter from (default: 0)
     */
    clearFilterByColumn(column = 0){
        filter.openFilter(column)
        filter.displayDotFilter(column)
        filter.pressButtonModal("Clear")
    }

    /**
     * Sorts a column in ascending or descending order
     * @param {number} column - The column index to sort (default: 0)
     * @param {string} action - The sort action to perform ("Sort Ascending"|"Sort Descending" default: "Sort Ascending")
     */
    pressSortButton(column = 0, action = "Sort Ascending"){
        filter.openFilter(column)
        filter.displayDotFilter(column)
        filter.filterModalIsVisible()
        filter.pressSortButton(action)
    }
}