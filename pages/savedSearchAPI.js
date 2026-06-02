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
}

export default new SavedSearchAPI();