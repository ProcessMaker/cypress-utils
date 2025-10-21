export class AdminAPI {
    /**
     * Retrieves a user by their username from the ProcessMaker API
     * @param {string} username - The username to search for
     * @returns {Promise} A promise that resolves to the user object or undefined if not found
     */
    getUserByUsernameAPI(username){
        return cy.window().then(win => {
            return win.ProcessMaker.apiClient.get('/users', { params: { mention_username: username} }).then(response => {
                const user = response.data.data.find(user => user.username === username);
                return user;
            });
        });
    }

    /**
     * Creates a new user in ProcessMaker via API
     * @param {Object} payload - The user data to create
     * @param {boolean} ignoreTakenError - If true, returns existing user when username is already taken
     * @returns {Promise} A promise that resolves to the created or existing user object
     */
    createUserAPI(payload, ignoreTakenError){
        payload.status = payload.status.toUpperCase();
        return cy.window().then(win => {
            return win.ProcessMaker.apiClient.post('/users', payload)
            .then(response => {
                return response.data;
            })
            .catch(err => {
                if (
                    ignoreTakenError && 
                    err.response.data.message.toLowerCase() === 'the username has already been taken.') {
                        return this.getUserByUsernameAPI(payload.username);
                } else {
                    throw err;
                }
            });
        });
    }

    /**
     * Retrieves a group by its name from the ProcessMaker API
     * @param {string} groupName - The name of the group to search for
     * @returns {Promise} A promise that resolves to the group object or undefined if not found
     */
    getGroupByGroupNameAPI(groupName){
        return cy.window().then(win => {
            return win.ProcessMaker.apiClient.get('/groups', { params: {filter: groupName} }).then(response => {
                const group = response.data.data.find(group => group.name === groupName);
                return group;
            });
        });
    }

    /**
     * Creates a new group in ProcessMaker via API
     * @param {Object} payload - The group data to create
     * @param {boolean} ignoreTakenError - If true, returns existing group when name is already taken
     * @returns {Promise} A promise that resolves to the created or existing group object
     */
    createGroupAPI(payload, ignoreTakenError){
        payload.status = payload.status.toUpperCase();
        return cy.window().then(win => {
            return win.ProcessMaker.apiClient
                .post("/groups", payload) 
                .then((response) => {
                    return response.data;
                })
                .catch(err => {
                    if (ignoreTakenError && err.response.data.message.toLowerCase() === "the name has already been taken.") {
                        return this.getGroupByGroupNameAPI(payload.name);
                    } else {
                        throw err;
                    }
                });
        });
    }

    /**
     * Assigns a user to a group in ProcessMaker via API
     * @param {Object} payload - The assignment data containing user and group information
     * @param {boolean} ignoreTakenError - If true, returns existing group when assignment already exists
     * @returns {Promise} A promise that resolves to the assignment data or existing group object
     */
    assignUserToGroupAPI(payload, ignoreTakenError){
        return cy.window().then(win => {
            return win.ProcessMaker.apiClient
                .post("/group_members", payload)
                .then((response) => {
                    return response.data;
                })
                .catch(err => {
                    if (
                        ignoreTakenError &&
                        err.response.data.message.toLowerCase() === "the name has already been taken.") {
                            return this.getGroupByGroupNameAPI(payload.name);
                    } else {
                        throw err;
                }
            });
        });
    }

    /**
     * Deletes a user from ProcessMaker via API
     * @param {string|number} userID - The ID of the user to delete
     * @returns {Promise} A promise that resolves to a confirmation message
     */
    deleteUserAPI(userID){
        return cy.window().then(win => {
            return win.ProcessMaker.apiClient.delete('/users/'+userID).then(response => {
                console.log(JSON.stringify(response));
                return "user " + userID + " was deleted";
            });
        });
    }

    /**
     * Creates or updates super admin user permissions in ProcessMaker via API
     * @param {Object} payload - The permission data for the super admin user
     * @returns {Promise} A promise that resolves to the user object with updated permissions
     */
    createSuperAdminUserAPI(payload){
        return cy.window().then(win => {
            return win.ProcessMaker.apiClient.put('/permissions', payload).then(response => {
                const user = response.data.data;
                //find(user => user.username === username);
                console.log('Got Existing User: ', user);
                return user;
            });
        });
    }

    /**
     * Generates an access token for a specific user in ProcessMaker via API
     * @param {string|number} userID - The ID of the user to generate a token for
     * @returns {Promise} A promise that resolves to the access token string
     */
    obtainTokenByUserID(userID) {
        let urlApi = "/users/" + userID + "/tokens";
        return cy.window().then(win => {
            return win.ProcessMaker.apiClient.post(urlApi, {"name":"testQA"})
                .then((response) => {
                    console.log("token=" + response.data);
                    return response.data.accessToken;
                })
                .catch((err) => {
                    throw err;
                });
        });
    }
}
