export class ProcessAPI {
    /**
     * Imports a process from a file using the ProcessMaker API
     * @param {string} path - The path to the process file to import
     * @param {string} mode - The import mode ('copy' by default)
     * @param {string} pass - Optional password for encrypted processes
     * @returns {Promise<number>} - A promise that resolves to the process ID
     */
    importProcessAPI(path, mode = 'copy', pass = "") {
        let formData = new FormData();
        let win;
        return cy.fixture(path, null)
            .then(Cypress.Blob.arrayBufferToBlob)
            .then(fileBlob => {
                formData.append('file', fileBlob);
                return cy.window();
            })
            .then(cyWin => {
                win = cyWin;
                if(pass != ""){
                    formData.append('password', pass);
                }
                return win.ProcessMaker.apiClient.post('/processes/import/validation', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            })
            .then(response => {
                const options = {};
                Object.keys(response.data.manifest).forEach(uuid => {
                    options[uuid] = {"mode": mode,"discardedByParent":false,"saveAssetsMode":"saveAllAssets"}
                });
                const optionsBlob = new Blob([JSON.stringify(options)], {
                    type: 'application/json'
                });
                formData.append('options', optionsBlob);
                return win.ProcessMaker.apiClient.post('/import/do-import', formData);
            })
            .then(response => {
                return response.data.processId;
            });
    }

    /**
     * Configures/updates a process using the ProcessMaker API
     * @param {string|number} processId - The ID of the process to configure
     * @param {Object} config - Configuration object to merge with existing process data
     * @returns {Promise<Object>} - A promise that resolves to the API response
     */
    configureProcessAPI(processId, config)
    {
        return cy.window().then(win => {
            const params = {};
            return win.ProcessMaker.apiClient.get('/processes/' + processId, { params }).then(response => {
                let process = response.data; 
                console.log("PUTTING", processId, {...process, ...config});
                return win.ProcessMaker.apiClient.put('/processes/' + processId, {...process, ...config});
            });
        });
    }

    /**
     * Modifies the BPMN definition of a process using a callback function
     * @param {string|number} processId - The ID of the process to modify
     * @param {Function} callback - Function that receives the BPMN string and returns the modified BPMN
     * @returns {Promise<Object>} - A promise that resolves to the API response
     */
    modifyBpmnAPI(processId, callback)  
    {
        return cy.window().then(win => {
            return win.ProcessMaker.apiClient.get(
                '/processes/' + processId + '/bpmn',
                { responseType: 'blob' }
            ).then(response => {
                return response.data.text();
            }).then(bpmn => {
                const modifiedBpmn = callback(bpmn);
                return this.configureProcessAPI(processId, { bpmn: modifiedBpmn });
            });
        });
    }

    /**
     * Starts a process instance using the ProcessMaker API
     * @param {string|number} processId - The ID of the process to start
     * @param {string} nodeId - The node ID where the process should start
     * @param {Object} data - Optional data to pass to the process instance
     * @returns {Promise<number>} - A promise that resolves to the process instance ID
     */
    startProcessAPI(processId, nodeId, data = {}) {
        return cy.window().then(win => {
            return win.ProcessMaker.apiClient.post(
                'process_events/' + processId,
                data,
                {
                    params: { event: nodeId }
                }
            ).then(response => {
                cy.wrap(response.data.id);
            });
        })   
    }

    /**
     * Creates a new process category using the ProcessMaker API
     * @param {Object} payload - The category data to create
     * @param {boolean} ignoreTakenError - Whether to ignore "name already taken" errors and return existing category
     * @returns {Promise<Object>} - A promise that resolves to the created or existing category object
     */
    createCategoryAPI(payload,ignoreTakenError){
        return cy.window().then(win => {
            // wait for ProcessMaker to be available
            return new Cypress.Promise((resolve) => {
                const checkProcessMaker = () => {
                    if (win.ProcessMaker && win.ProcessMaker.apiClient) {
                        resolve(win.ProcessMaker.apiClient.post('/process_categories', payload)
                            .then(response => {
                                const category = response.data.data;
                                console.log('THIS IS RESULT OF CATEGORY: ', category);
                                return category;
                            })
                            .catch(err => {
                                if (
                                    ignoreTakenError && 
                                    err.response.data.message.toLowerCase() === 'The Name has already been taken.') {
                                        return this.getCategoryByNameAPI(payload.name);
                                } else {
                                    throw err;
                                }
                            }));
                    } else {
                        setTimeout(checkProcessMaker, 100);
                    }
                };
                checkProcessMaker();
            });
        });
    }

    /**
     * Retrieves a process category by its name using the ProcessMaker API
     * @param {string} categoryName - The name of the category to retrieve
     * @returns {Promise<Object>} - A promise that resolves to the category object or undefined if not found
     */
    getCategoryByNameAPI(categoryName){
        return cy.window().then(win => {
            return win.ProcessMaker.apiClient.get('/process_categories', { params: {filter: categoryName} }).then(response => {
                const category = response.data.data.find(category => category.name === categoryName);
                return category;
            });
        });
    }

    /**
     * Deletes a process category by its ID using the ProcessMaker API
     * @param {string|number} categoryID - The ID of the category to delete
     * @returns {Promise<string>} - A promise that resolves with a confirmation message
     */
    deleteCategoryByIdAPI(categoryID){
        return cy.window().then(win => {
            return win.ProcessMaker.apiClient.delete('/process_categories/'+categoryID).then(response => {
                //console.log(JSON.stringify(response));
                return "category " + categoryID + " was deleted";
            });
        });
    }
}
