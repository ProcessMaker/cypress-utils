export class PMProjectsAPI {
    /**
     * Retrieves a project by its title from the ProcessMaker API
     * @param {string} projectTitle - The title of the project to search for
     * @returns {Promise<Object>} The project object if found, undefined otherwise
     */
    getProjectByTitleAPI(projectTitle) {
        return cy.window().then(win => {
            return win.ProcessMaker.apiClient.get('/projects', { params: { filter: projectTitle } }).then(response => {
                const project = response.data.data.find(project => project.title === projectTitle);
                return project;
            });
        });
    }
    
    /**
     * Creates a new project via the ProcessMaker API
     * @param {Object} payload - The project data to create in this format
     * {
     *   title: "name_project",
     *   categories: categoryID,
     *   user_id: userID,
     *   members: '{"users":["1"], "groups":["1"]}'
     * };
     * @param {boolean} ignoreTakenError - If true, returns existing project when name is already taken
     * @returns {Promise<Object>} The created project data or existing project if name is taken
     * @throws {Error} If project creation fails and ignoreTakenError is false
     */
    createProjectAPI(payload, ignoreTakenError = true) {
        const formData = new FormData();
        formData.append('title', payload.title);
        formData.append('categories', payload.categories);
        formData.append('user_id', payload.user_id);
        formData.append('members', payload.members);
        return cy.window().then(win => {
            return win.ProcessMaker.apiClient.post('/projects', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                return response.data;
            }).catch(err => {
                if (ignoreTakenError && err.response.data.message.toLowerCase() === 'the name has already been taken.') {
                    return this.getProjectByTitleAPI(payload.title);
                } else {
                    throw err;
                }
            });
        });
    }
}
