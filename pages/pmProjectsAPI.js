export class PMProjectsAPI {
    getProjectByTitleAPI(projectTitle) {
        return cy.window().then(win => {
            return win.ProcessMaker.apiClient.get('/projects', { params: { title: projectTitle } }).then(response => {
                const project = response.data.data.find(project => project.title === projectTitle);
                return project;
            });
        });
    }
    
    createProjectAPI(payload, ignoreTakenError) {
        const formData = new FormData();
        formData.append('title', payload.title);
        formData.append('categories', payload.categories);
        formData.append('user_id', payload.user_id);
        formData.append('members', payload.members);
        return cy.window().then(win => {
            return win.ProcessMaker.apiClient.post('/projects', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
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
