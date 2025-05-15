export class Emails {

    /**
     * Edits a specific setting based on the option name and value provided.
     * @param {string} optionName - The name of the setting to edit.
     * @param {string} value - The new value for the setting.
     */
    editSetting(optionName, value) {
        let optionConfigXpath = '//table/tbody//div[contains(text(),"optionName")]/ancestor::tr//button[@aria-label="Edit"]';
        let optionColumnXpath = '//table/tbody//div[contains(text(),"optionColumn")]/ancestor::tr/td[2]';
        cy.xpath(optionConfigXpath.replace('optionName', optionName)).click();
        cy.xpath('//div[@class="modal-content"]').should('be.visible');
        if(optionName == "Use secure connection"){
            cy.wait(2000)
            cy.xpath('//div[@class="modal-content"]//div/label[contains(text(), "' + value + '")]/preceding-sibling::input').click({force:true});
        }else{
            cy.xpath('//div[@class="modal-content"]//div/input').clear().type(value).should('have.value', value);
        }
        cy.xpath('//div[@class="modal-content"]//footer//button[contains(text(),"Save")]').click();
        cy.xpath('//div[@role="alert"]').should('exist');
        cy.xpath('//div[@role="alert"]').should('not.exist');
        if(optionName != "User Password")
            cy.xpath(optionColumnXpath.replace('optionColumn', optionName)).should('have.contain', value);
    }

    /**
     * Configures the email server settings using the provided email settings object.
     * @param {Object} emailSettings - The settings for the email server.
     */
    configEmailServer(emailSettings) {
        let optionColumnXpath = '//table/tbody//div[contains(text(),"optionColumn")]/ancestor::tr/td[2]';
        this.editSetting('Mailer alias name', emailSettings.aliasEmail);
        this.editSetting('Sender Email', emailSettings.senderEmail);
        this.editSetting('Sender Name', emailSettings.senderName);
        this.editSetting('Server Host', emailSettings.serverHost);
        cy.xpath(optionColumnXpath.replace('optionColumn', 'Server Port')).invoke('text').then(($port) => {
            cy.log("port=" + $port + "/");
            if ($port.trim() !== emailSettings.serverPort) {
                this.editSetting('Server Port', emailSettings.serverPort);
            }
        });
        cy.xpath(optionColumnXpath.replace('optionColumn', 'Use secure connection')).invoke('text').then(($option) => {
            cy.log("port=" + $option + "/");
            if ($option.trim() !== emailSettings.secureOption) {
                this.editSetting('Use secure connection', emailSettings.secureOption);
            }
        });
        cy.xpath(optionColumnXpath.replace('optionColumn', 'User Account')).invoke('text').then(($option) => {
            if ($option.trim() !== emailSettings.userAccount) {
                this.editSetting('User Account', emailSettings.userAccount);
            }
        });
        this.editSetting('User Password', emailSettings.userAccountPass);
    }

    /**
     * Obtains the HTML body of an email by its message ID using the Mailtrap API.
     * @param {string} accountId - The Mailtrap account ID.
     * @param {string} inboxId - The Mailtrap inbox ID.
     * @param {string} messageId - The ID of the message to retrieve.
     * @returns {Promise} - A promise that resolves with the email body.
     */
    mailtrapObtainHtmlEmailbyMessageIdAPI(accountId, inboxId, messageId, token) {
        return cy.request({
            method: 'GET',
            url: `https://mailtrap.io/api/accounts/${accountId}/inboxes/${inboxId}/messages/${messageId}/body.htmlsource`,
            headers: {
            'Accept': 'application/json',
            'Api-Token': token,
            },
        });
    };

    /**
     * Verifies if an email with the specified subject has arrived in the inbox.
     * @param {string} accountId - The Mailtrap account ID.
     * @param {string} inboxId - The Mailtrap inbox ID.
     * @param {string} subject - The subject of the email to search for.
     * @returns {Promise} - A promise that resolves to true if the email arrived, false otherwise.
     */
    mailtrapVerifyIfEmailArrived(accountId, inboxId, subject) {
        return this.mailtrapSearchEmailBySubjectAPI(accountId, inboxId, subject).then((e)=>{
            if(e.body.length > 0){
                return true
            }else{
                return false
            }
        });
    }

    /**
     * Searches for emails by subject using the Mailtrap API.
     * @param {string} accountId - The Mailtrap account ID.
     * @param {string} inboxId - The Mailtrap inbox ID.
     * @param {string} subject - The subject to search for.
     * @returns {Promise} - A promise that resolves with the search results.
     */
    mailtrapSearchEmailBySubjectAPI(accountId, inboxId, subject, token) {
        return cy.request({
            method: 'GET',
            url: `https://mailtrap.io/api/accounts/${accountId}/inboxes/${inboxId}/messages?search=${subject}`,
            headers: {
                'Accept': 'application/json',
                'Api-Token': token,
            },
        });
    };

    /**
     * Obtains attached files from an email by its message ID using the Mailtrap API.
     * @param {string} accountId - The Mailtrap account ID.
     * @param {string} inboxId - The Mailtrap inbox ID.
     * @param {string} messageId - The ID of the message to retrieve attachments from.
     * @returns {Promise} - A promise that resolves with the attachments.
     */
    mailtrapObtainAttachedFileByMessageIdAPI(accountId, inboxId, messageId, token) {
        return cy.request({
            method: 'GET',
            url: `https://mailtrap.io/api/accounts/${accountId}/inboxes/${inboxId}/messages/${messageId}/attachments`,
            headers: {
                'Accept': 'application/json',
                'Api-Token': token,
            },
        });
    };

    /**
     * Presses the button to create a new email server in the UI.
     */
    pressCreateEmailServerButton(){
        cy.get('[id="collapseOne1"] div').contains('Email Default Settings').should('be.visible').click();
        cy.get('[data-cy="EMAIL_CONNECTOR_ADD_MAIL_SERVER"]').should('be.visible').click();
        cy.get('[class="jumbotron jumbotron-fluid"]').should("be.visible");
        cy.get('[class="jumbotron jumbotron-fluid"]').should("not.be.visible");
    }

    /**
     * Checks if a specific email setting exists in the UI.
     * @param {string} senderEmail - The email address to check for.
     * @returns {Promise} - A promise that resolves to true if the setting exists, false otherwise.
     */
    existEmailSetting(senderEmail) {
        return new Promise((resolve) => {
            let existEmail = false;
            cy.get('[id="collapseOne1"] div div').each(($el) => {
                cy.wrap($el).click();
                cy.get('[aria-rowindex="3"] [class="setting-text"] div').should("be.visible").then(($test) => {
                    let cad = $test.text().trim().replace(/\s/g, '');
                    if (cad == senderEmail) {
                        existEmail = true;
                    }
                });
            }).then(() => {
                resolve(existEmail);
            });
        });
    }

    /**
     * Creates a new email server if it does not already exist.
     * @param {Object} emailSettings - The settings for the email server to create.
     */
    createEmailServerIfNotExist(emailSettings){
        this.existEmailSetting(emailSettings.senderEmail).then((exists) => {
            if (!exists) {
                this.pressCreateEmailServerButton();
                this.configEmailServer(emailSettings);
            }
        });
    }
}
