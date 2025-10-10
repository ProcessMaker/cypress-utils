export class TasksAPI {

    /**
     * Retrieves all active tasks for a specific process request
     * @param {string|number} requestId - The ID of the process request
     * @returns {Cypress.Chainable} A Cypress chainable that resolves to the tasks data
     */
    obtainAllTasksAPI(requestId) {
        return cy.window().then(win => {
            return win.ProcessMaker.apiClient.get(
                "/tasks?process_request_id="+requestId+"&status=ACTIVE"
            ).then(response => {
                cy.wrap(response.data.data);
            });
        })
    }

    /**
     * Completes a task by updating its status to COMPLETED
     * @param {string|number} taskId - The ID of the task to complete
     * @param {Object} bodyData - The data to be submitted with the task completion
     * @returns {Cypress.Chainable} A Cypress chainable that resolves to the response data
     */
    completeTaskAPI(taskId, bodyData){
        return cy.window().then(win => {
            return win.ProcessMaker.apiClient.put(
                "/tasks/"+taskId,
                {
                    "status": "COMPLETED",
                    data: bodyData
                }
            ).then(response => {
                cy.wrap(response.data);
            });
        })
    }
}
