import savedSearchAPI from "@pages/savedSearchAPI";
import savedSearchAction from "@pages/savedSearchV1";

class savedSearchModel {

    createSavedSearchAPI(data) {
        return savedSearchAPI.createSavedSearchAPI(data)
    }

    deleteSavedSearchByIdAPI(id) {
        return savedSearchAPI.deleteSavedSearchByIdAPI(id)
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

}

export default new savedSearchModel();
