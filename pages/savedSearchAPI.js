class SavedSearchAPI {

  createSavedSearchAPI(data) {
      return cy.window().then(win => {
          return win.ProcessMaker.apiClient.post(
              '/saved-searches',
              data
          ).then(response => {
            console.log(">>>"+response.data)
              return response.data
          });
      });
  }

  deleteSavedSearchByIdAPI(savedSearchID) {
    return cy.window().then(win => {
        return win.ProcessMaker.apiClient.delete(
            '/saved-searches/'+savedSearchID
        ).then(response => {
          console.log(`saved search by ID ${savedSearchID} was deleted > `+response)
        });
    });
  }

  createChartAPI(savedSearchID, payload){
    return cy.window().then(win => {
      return win.ProcessMaker.apiClient.post(
          `/saved-searches/${savedSearchID}/charts`,
          payload
      ).then(response => {
          return response.data
      });
    });
  }

  updateSavedSearchAPI(savedSearchID, payload){
    return cy.window().then(win => {
      return win.ProcessMaker.apiClient.put(
          `/saved-searches/${savedSearchID}`,
          payload
      ).then(response => {
          return response.data
      });
    });
  }
}

export default new SavedSearchAPI();