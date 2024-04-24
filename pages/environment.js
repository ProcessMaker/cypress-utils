import selectors from "#selectors/environment";

export class Environment {
    /**
     * This method was created to create an environment variable
     * @param name: name of the environment variable
     * @param description: description of the environment variable
     * @return nothing returns
     */

    createEnvironmentVariable(name, description, value = "Test QA") {
        cy.xpath(selectors.createEnvironmentVariable)
            .should("be.visible")
            .click();
        cy.get(selectors.nameInputEnvironmentVariable)
            .click()
            .type(name)
            .should("have.value", name);
        cy.get(selectors.descriptionTextAreaEnviromentVariable)
            .click()
            .type(description)
            .should("have.value", description);
        cy.get(selectors.valueTextAreaEnviromentVariable)
            .type(value)
            .should("have.value", value);
        cy.xpath(selectors.saveEnvironmentVariable)
            .should("be.visible")
            .click();
    }

    /**
     * This method was created to update an environment variable
     * @param name: name of the environment variable
     * @param newName: new name of the environment variable
     * @param newDescription: new description of the environment variable
     * @return nothing returns
     */

    updateEnvironmentVariable(newName, newDescription, newValue) {
        cy.get(selectors.editNameField)
            .clear()
            .click()
            .type(newName)
            .should("have.value", newName);
        cy.get(selectors.editDescriptionField)
            .clear()
            .click()
            .type(newDescription)
            .should("have.value", newDescription);
        cy.get(selectors.editValueField)
            .clear()
            .click()
            .type(newValue)
            .should("have.value", newValue);
        cy.xpath(selectors.editSaveBtn).should("be.visible").click();
    }

    /**
     * This method was created to delete an environment variable
     * @param name: name of the auth client
     * @return nothing returns
     */

    deleteEnvironmentVariable() {
        cy.xpath(selectors.confirmDeleteEnviromentVariable)
            .should("be.visible")
            .click();
    }

    /**
     * This method was created to verify if an environment variable exist or not
     * @param name: name of the environment variable
     * @return nothing returns
     */
    verifyIfExistEnvironmentVariableAndCreateVariable(
        name,
        description,
        value
    ) {
        cy.get('input[id="search-box"]').should("be.visible");
        cy.get('input[id="search-box"]')
            .type(name, { delay: 200 })
            .should("have.value", name);
        cy.wait(2000); //wait until table is updated
        cy.get('div[data-cy="env-table"] tbody tr', { timeout: 10000 })
            .find("td")
            .then(($loadedTable) => {
                if ($loadedTable.length === 1) {
                    this.createEnvironmentVariable(name, description, value);
                } else return;
            });
    }

    /**
     * This method was created to search an environment variable
     * @param name: name of the environment variable
     * @param action: select options to edit or delete an environment variable
     * @return nothing returns
     */
    searchEnvironmentVariableAndSelectAction(
        name,
        action,
        newName = "",
        newDescription = "",
        newValue = ""
    ) {
        cy.get('input[id="search-box"]').should("be.visible");
        cy.get('input[id="search-box"]')
            .clear()
            .type(name, { delay: 200 })
            .should("have.value", name);
            cy.wait(2000); //wait until table is updated
        cy.get('div[data-cy="env-table"] tbody tr', { timeout: 10000 })
            .find("td")
            .then(($loadedTable) => {
                cy.log("test--->"+$loadedTable.length);
                if ($loadedTable.length === 5) {
                    this.selectOption(action);
                    switch (action) {
                        case "Edit Variable":
                            this.updateEnvironmentVariable(
                                newName,
                                newDescription,
                                newValue
                            );
                            break;
                        case "Delete":
                            this.deleteEnvironmentVariable();
                            break;
                    }
                } else return;
            });
    }

    /**
     * This method was created to search an environment variable
     * @param option: this option should be between `Edit Variable` or `Delete`
     * @param nro: by default is used the first occurency
     * @return nothing returns
     */
    selectOption(option, nro = 0) {
        cy.get(selectors.optionModal).should("be.visible");
        cy.get(selectors.optionModal).click();
        cy.xpath(selectors.option.replace("selectOption", option))
            .eq(nro)
            .click();
    }
}
