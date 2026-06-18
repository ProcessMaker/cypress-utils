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

  deleteSavedSearchByIdAPI(savedSearchID, staticTime=2000) {
    cy.wait(staticTime)
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
  /* payload must be in this format 
  payload = {
    "yaml_file_name": "name_savedSearch.yaml",
    "saved_search_ids": ID_SAVED_SEARCH 
  }
  add `SAVED_SEARCH_ADVANCED_CONFIGURATION_ENDPOINT_ENABLED=true` variable in the .env file before use this method
  */ 
  createTableAndPolulate(payload){
    return cy.window().then(win => {
      return win.ProcessMaker.apiClient.post(
          `/saved-searches/advanced-configurations/`,
          payload
      ).then(response => {
          return response.data
      });
    });
  }

  /* payload must be in this format 
  payload = {
    "saved_search_id": 620,
    "yaml_file_name": "qa_ss620.yaml",
    "creation_schedule":{
        "date":"2026-10-08",
        "time":"14:00",
        "timezone":"UTC"
    }
  }
  add `SAVED_SEARCH_ADVANCED_CONFIGURATION_ENDPOINT_ENABLED=true` variable in the .env file before use this method
  */ 
  createYamlFile(payload){
    return cy.window().then(win => {
      return win.ProcessMaker.apiClient.post(
          `/saved-searches/advanced-configurations/yaml-files`,
          payload
      ).then(response => {
          return response.data
      });
    });
  }
}

export default new SavedSearchAPI();