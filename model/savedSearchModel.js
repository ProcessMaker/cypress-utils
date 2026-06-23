import savedSearchAPI from "@pages/savedSearchAPI";
import savedSearchAction from "@pages/savedSearchV1";

class savedSearchModel {

    createSavedSearchAPI(data) {
        return savedSearchAPI.createSavedSearchAPI(data)
    }

    deleteSavedSearchByIdAPI(id, time=2000) {
        return savedSearchAPI.deleteSavedSearchByIdAPI(id, time)
    }

    openSavedSearchByObject(objSS, type) {
        savedSearchAction.openSavedSearchByObject(objSS, type)
    }

    openSavedSearchById(id, type){
        savedSearchAction.gotoSavedSearchByID(type, id)
    }

    searchSavedSearch(criteria) {
        savedSearchAction.searchSavedSearch(criteria)
    }

    pressNotificationButton(){
        savedSearchAction.pressNotificationButton()
    }

    pressConfigurationButton(){
        savedSearchAction.pressConfigurationButton()
    }

    pressColumnTabSavedSearchById(){
        savedSearchAction.pressColumnsButton()
    }

    pressTab(name){
        savedSearchAction.pressTab(name);
    }

    createChartAPI(savedSearchID, payload){
        savedSearchAPI.createChartAPI(savedSearchID, payload)
    }
    
    updateSavedSearch(savedSearchID, payload){
        savedSearchAPI.updateSavedSearchAPI(savedSearchID, payload)
    }

    sendReportSavedSearch(payload){
        savedSearchAction.pressSendReportButton()
        savedSearchAction.fillSendTo(payload.sendTo.type, payload.sendTo.selector, payload.sendTo.value)
        savedSearchAction.fillEmailSubject(payload.subject.type, payload.subject.selector, payload.subject.value)
        savedSearchAction.fillBody(payload.body.type, payload.body.selector, payload.body.value)        
        savedSearchAction.pressSaveReport(payload.sendReport.type, payload.sendReport.selector)
    }

    createNewSavedSearch(payload){
        return savedSearchAPI.createTableAndPolulate(payload);
    }

    createYamlFile(payload){
        return savedSearchAPI.createYamlFile(payload);
    }
}

export default new savedSearchModel();
