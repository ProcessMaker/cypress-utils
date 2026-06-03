import selector from "#selectors/savedSearchV1";

class savedSearchAction {

    gotoSavedSearchByID(type="requets", id) {
      let url
      if(type = "requests")
        url = `/requests/saved-searches/${id}`
      else
        url = `/tasks/saved-searches/${id}`
      cy.visit(url)
    }

    openSavedSearchByObject(objSS, type) {
        objSS.then((objSS) => {
            this.gotoSavedSearchByID(type, objSS.id)
        })
    }

    getSaveSearchTab() {
        return cy.get(selector.tabList)
    }

    getColumnTabSaveSearch(){
        return cy.get(selector.columnTab)
    }

    getSearchSavedSeachField() {
        return cy.get(selector.searchField)
    }

    getPressSendReportButton() {
        return cy.get(selector.sendReportBtn)
    }

    getPressScheduleReportsButton() {
        return cy.get(selector.scheduleReportBtn)
    }

    getNotificationButton() {
        return cy.get(selector.notificationBtn)
    }

    getConfigurationButton() {
        return cy.get(selector.configurationBtn)
    }
    //accepts "Data" or "Charts"
    pressTab(tabName) {
        const index = (tabName == "Data") ? 0 : 1;
        this.getSaveSearchTab().eq(index).click()
    }

    searchSavedSearch(criteria) {
        this.getSearchSavedSeachField().clear().type(criteria)
        this.getSearchSavedSeachField().type('{enter}')
    }
    pressSendReportButton() {
        this.getPressSendReportButton().click()
    }
    pressScheduleReportsButton() {
        this.getPressScheduleReportsButton().click()
    }
    pressNotificationButton() {
        this.getNotificationButton().click()
    }
    pressConfigurationButton() {
        this.getConfigurationButton().click()
    }

    pressColumnsButton(){
        this.getColumnTabSaveSearch().click()
    }

    addNameChartConfig(nameChart){
        cy.get("div[class='saved-search-chart-config'] input[name='title']").type(nameChart)
    }
    selectChartTypeConfig(type){
        let chartType
        switch(type){
            case "vertical":
                chartType = cy.get("div[class='saved-search-chart-config'] canvas[id='bar-chart']")
            break
            case "Line":
                chartType = cy.get("div[class='saved-search-chart-config'] canvas[id='line-chart']")
            break
            case "Pie":
                chartType = cy.get("div[class='saved-search-chart-config'] canvas[id='pie-chart']")
            break
            case "Doughnut":
                chartType = cy.get("div[class='saved-search-chart-config'] canvas[id='doughnut-chart']")
            break
            case "Count":
                chartType = cy.get("div[class='saved-search-chart-config'] div.count-chart-preview")
            break
            case "List":
                chartType = cy.get("div[class='saved-search-chart-config'] div.list-chart-preview")
            break
            default:
                //"bar (horizontal)"
                chartType = cy.get("div[class='saved-search-chart-config'] canvas[id='horizontalbar-chart']")
            break
        }
        chartType.click()
    }
    selectGeneralTabChartConfig(){
        cy.get("div[class='saved-search-chart-config'] a[id='general-tab']").click()
    }
    selectSourceTabChartConfig(){
        cy.get("div[class='saved-search-chart-config'] a[id='data-tab']").click()
    }
    selectDisplayTabChartConfig(){
        cy.get("div[class='saved-search-chart-config'] a[id='display-tab']").click()
    }
}

export default new savedSearchAction();