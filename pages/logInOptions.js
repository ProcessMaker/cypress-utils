export class LogInOptions {
    /**
     * Retrieves the configuration for a specific login option using the API
     * @method getConfigurationLogInOptionsAPI
     * @param {string} optionKey - The key of the login option to retrieve
     * @returns {Promise<Object>} A promise that resolves with the option object
     */
    getConfigurationLogInOptionsAPI(optionKey){
        return cy.window().then((win) => {
            return win.ProcessMaker.apiClient.get('/settings', {params: {page:"1",per_page:"25", order_by:"name", order_direction:"ASC", filter:"", pmql:"", group:'Log-In Options'}}).then((response) => {
                const option = response.data.data.find(option => option.key === optionKey);
                return option
            })
        })
    }

    /**
     * Updates the configuration for a specific login option using the API
     * @method updateConfigurationLogInOptionAPI
     * @param {Object} payload - The payload containing the option data
     * @param {boolean|string|null} status - The new status or value for the option
     * @returns {Promise<string>} A promise that resolves with a confirmation message
     */
    updateConfigurationLogInOptionAPI(payload, status){
        payload.config = status;
        return cy.window().then((win) => {
            return win.ProcessMaker.apiClient.put('/settings/' + payload.id, payload).then((response) => {
                return 'update configuration'
            })
        })
    }

    /**
     * Selects and updates multiple login options using the API
     * @method selectConfigurationLogInOptionAPI
     * @param {Array<Object>} options - An array of option objects to update
     */
    selectConfigurationLogInOptionAPI(options){
        options.forEach(($el) => {
            this.getConfigurationLogInOptionsAPI($el.key).then((resp) => {
                this.updateConfigurationLogInOptionAPI(resp, $el.value)
            })
        })
    }

    /**
     * Resets login options to their default values using the API
     * @method resetLogInOptionsAPI
     */
    resetLogInOptionsAPI(){
        const restartOptions = [
            {
                name: "Password set by user",
                key: "password-policies.users_can_change",
                value: true
            },
            {
                name: "Numeric characters",
                key: "password-policies.numbers",
                value: false
            },
            {
                name: "Uppercase characters",
                key: "password-policies.uppercase",
                value: false
            },
            {
                name: "Special characters",
                key: "password-policies.special",
                value: false
            },
            {
                name: "Maximum length",
                key: "password-policies.maximum_length",
                value: null
            },
            {
                name: "Minimum length",
                key: "password-policies.minimum_length",
                value: null
            },
            {
                name: "Password expiration",
                key: "password-policies.expiration_days",
                value: null
            },
            {
                name: "Login failed",
                key: "password-policies.login_attempts",
                value: "5"
            },
            {
                name: "Require Two Step Authentication",
                key: "password-policies.2fa_enabled",
                value: false
            },
            {
                name: "Two Step Authentication Method",
                key: "password-policies.2fa_method",
                value: []
            }
        ];
        this.selectConfigurationLogInOptionAPI(restartOptions);
    }
}