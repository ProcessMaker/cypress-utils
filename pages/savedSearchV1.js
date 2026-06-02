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

}

export default new savedSearchAction();