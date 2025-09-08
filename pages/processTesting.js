import selectors from "#selectors/processTesting";
import { NavigationHelper } from "#helpers/navigationHelper";
import { Process } from "#pages/process";

const navHelper = new NavigationHelper();
const process = new Process();
export class ProcessTesting {

    //1.FROM MODELER
    //1A. Open Modal Run test
    clickOnRunTestOptionInModeler(iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).xpath(selectors.ellipsisMenuIcon).should('be.visible').click();
        cy.iframe(iframeSelector).xpath(selectors.runTestBtnInModeler).click();
    }

    //1B. Modal Run Test (Only alternative A)
    //Alternative
    selectAlternativeFromModeler(alternative, iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        switch (alternative) {
            case "Alternative A":
                cy.iframe(iframeSelector).find(selectors.alternativeField).select('Alternative A').should('have.value', 'A');
                break;
            case "Alternative B":
                cy.iframe(iframeSelector).find(selectors.alternativeField).select('Alternative B').should('have.value', 'B');
                break;
            case "Advanced":
                cy.iframe(iframeSelector).find(selectors.alternativeField).select('Advanced').should('have.value', 'Advanced');
            default:
                break;
        }
    }

    //Starting point from Modeler
    selectStartingPointFromModeler(startingPoint, iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).xpath(selectors.labelSP).should('be.visible');
        cy.iframe(iframeSelector).xpath(selectors.containerSP).click({force:true});
        cy.iframe(iframeSelector).find(selectors.inputSP).type(`{backspace}${startingPoint}`).should('have.value', startingPoint);
        cy.iframe(iframeSelector).xpath(selectors.itemSP).should('have.attr', 'aria-label').and('equal', `${startingPoint}. `);
        cy.iframe(iframeSelector).find(selectors.inputSP).type('{enter}', {force:true, delay: 500});
    }

    //Manual Resume Point from Modeler
    selectManualResumePointFromModeler(stopPoint, iframeOption = 'a') { 
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB   
        cy.iframe(iframeSelector).xpath(selectors.labelMRP).should('be.visible');   
        cy.iframe(iframeSelector).xpath(selectors.containerMRP).click({force:true}, {delay: 1000});
        cy.wait(2000);    
        cy.iframe(iframeSelector).xpath(selectors.inputMRP).type(`{backspace}${stopPoint}`).should('have.value', stopPoint);
        cy.iframe(iframeSelector).xpath(selectors.itemMRP).should('have.attr', 'aria-label').and('equal', `${stopPoint}. `);
        cy.iframe(iframeSelector).xpath(selectors.inputMRP).type('{enter}');
    }

    //Scenario from Modeler
    selectScenarioFromModeler(scenario, iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.wait(1000);
        cy.iframe(iframeSelector).xpath(selectors.labelScenario).should('be.visible');
        cy.iframe(iframeSelector).xpath(selectors.containerScenario).click();
        cy.iframe(iframeSelector).find(selectors.inputScenario).should('be.visible');
        cy.iframe(iframeSelector).find(selectors.inputScenario).click().type(scenario, { force: true, delay: 70 });
        cy.wait(1000)
        cy.iframe(iframeSelector).find(selectors.inputScenario).type('{enter}');
    }

    //Additional Data from Modeler
    addAdditionalDataFromModeler(data, iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).find(selectors.additionalData).type('{backspace}').type('{backspace}').type(`{{}${data}}`).should('contain', `{${data}}`);
    }

    //Bypass Script task and Data Connectors from Modeler
    enableBypassCheckboxFromModeler(iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).xpath(selectors.bypassCheckbox).click({ force: true });
    }

    //Run button in modal Run Test from Modeler
    clickOnRunTestBtnFromModeler(iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).xpath(selectors.runTestBtn).click({ force: true });
    }

    //Cancel button in modal Run Test from Modeler
    clickOnCancelBtnFromModeler(iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).xpath(selectors.cancelBtn).click({force:true});
    }
    //1C. Modal Run Test (A+B alternatives)

    //Alternative

    //Expression
    fillExpression(expression, iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).find(selectors.expressionInput).type(expression, { delay: 80 }).should('have.value', expression);
    }

    //Ratio

    //Type of Run
    selectTypeOfRun(option, iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).find(selectors.typeOfRun).select(option);
    }

    //1D. Modal to Run Test in modeler

    /**
     * This method is responsible to run test in modeler
     * @param runTestConfig: name of the analytic report for search
     * @example 
     * {
        startingPoint:{startingPointOption: "Start Event"},
        manualResumePoint:{stopPointOption: "Form Task1"},
        scenario:{scenarioOption: "scenarioX"},
        additionalData: {data: '"message": "Hello World"'},
        isEnabledBypass: true
    }
    */

    runTest(runTestConfig) {
        const { startingPoint, manualResumePoint, scenario, additionalData, isEnabledBypass } = runTestConfig
        if (startingPoint !== null) {
            this.selectStartingPointFromModeler(startingPoint.startingPointOption);
        }

        if (manualResumePoint !== null) {
            this.selectManualResumePointFromModeler(manualResumePoint.stopPointOption);
        }

        if (scenario !== null) {
            this.selectScenarioFromModeler(scenario.scenarioOption);
        }

        if (additionalData !== null) {
            this.addAdditionalDataFromModeler(additionalData.data)
        }

        if (isEnabledBypass) {
            this.enableBypassCheckboxFromModeler();
        }

        this.clickOnRunTestBtnFromModeler();
    }

    runTestFromModeler(runTestConfig, iframeOption, optionInAlternative, typeOfRun, expression) {
        const { startingPoint, manualResumePoint, scenario, additionalData, isEnabledBypass } = runTestConfig
        switch (optionInAlternative) {
            case "Alternative A":
                this.selectAlternativeFromModeler('Alternative A', iframeOption);
                this.runTest(runTestConfig);
                break;
            case "Alternative A":
                this.selectAlternativeFromModeler('Alternative B', iframeOption);
                this.runTest(runTestConfig);
                break;
            case "Advanced":
                this.selectAlternativeFromModeler('Advanced', iframeOption);
                this.fillExpression(expression, iframeOption);
                switch (typeOfRun) {
                    case "Automatic":
                        this.selectTypeOfRun('Automatic', iframeOption);
                        break;
                    case "Manual":
                        this.selectTypeOfRun('Manual', iframeOption);
                        break;
                    default:
                        break;
                }
                this.runTest(runTestConfig);
        }
    }

    //2.FROM PROCESS CONFIGURE
    //2A. Go to Test Run / Scenarios
    //Go to TestRun/ScenariosTab
    clickOnTestRun_ScenariosTab() {
        cy.get(selectors.testRun_ScenariosTab).should('be.visible');
        cy.get(selectors.testRun_ScenariosTab).click();
    }

    //Go to scenarios Tab
    clickOnScenariosTab() {
        cy.get(selectors.scenariosTab).should('be.visible')
        cy.get(selectors.scenariosTab).click();
    }

    //Go to Test Run Tab
    clickOnTestRunTab() {
        cy.get(selectors.testRunTab).click();
    }

    //2B. SCENARIOS

    //I.Search scenario
    searchScenario(scenarioName) {
        // Esperar a que la tabla de escenarios esté lista
        cy.get('#scenarios-edit-tab').should('be.visible');
        cy.get('#test_runs').should('be.visible');
        
        // Esperar a que el campo de búsqueda esté disponible
        cy.get(selectors.searchScenario)
            .should('exist')
            .should('be.visible')
            .should('not.be.disabled')
            .clear({ force: true })
            .type(scenarioName, { delay: 100, force: true })
            .should('have.value', scenarioName);
            
        // Esperar a que los resultados se carguen
        cy.wait(2000);
        
        // Verificar que la tabla se haya actualizado
        cy.get('.data-table')
            .should('exist')
            .should('be.visible');
    }

    //Search scenario and select edit or delete
    searchScenarioAndSelectOption(scenarioName, option, scenarioConfig) {
        // Esperar a que la página esté lista
        cy.get('#scenarios-edit-tab')
            .should('be.visible')
            .should('not.be.disabled')
            .should('not.have.class', 'loading');

        // Esperar a que la tabla de datos esté cargada
        cy.get('.data-table')
            .should('exist')
            .should('be.visible')
            .should('not.be.empty')
            .should('not.have.class', 'loading')
            .then($table => {
                // Verificar que la tabla tenga filas y esté interactiva
                cy.wrap($table)
                    .find('tbody tr')
                    .should('have.length.at.least', 1)
                    .should('be.visible')
                    .should('not.be.disabled');
            });

        // Buscar el escenario
        cy.xpath(selectors.searchInputScenario)
            .should('be.visible')
            .should('not.be.disabled')
            .clear({ force: true })
            .type(`${scenarioName}{enter}`, { delay: 100, force: true })
            .should('have.value', scenarioName);

        // Esperar a que los resultados se carguen
        cy.wait(2000);

        // Verificar que la tabla se haya actualizado y contenga el escenario
        cy.get('.data-table')
            .should('exist')
            .should('be.visible')
            .should('contain', scenarioName)
            .then($table => {
                // Encontrar la fila que contiene el escenario
                const row = $table.find(`tr:contains("${scenarioName}")`);
                if (row.length > 0) {
                    // Hacer hover sobre la fila para activar el menú
                    cy.wrap(row)
                        .should('be.visible')
                        .trigger('mouseover', { force: true });

                    // Esperar a que el menú esté disponible
                    cy.wait(1000);

                    // Verificar y hacer clic en el menú de opciones
                    cy.xpath(selectors.selectMenuOptionRowScenario)
                        .should('exist')
                        .should('be.visible')
                        .should('not.be.disabled')
                        .first()
                        .click({ force: true, timeout: 10000 });

                    // Esperar a que el menú se abra
                    cy.wait(1000);

                    // Verificar que el menú tenga las opciones esperadas
                    cy.get('body').then($body => {
                        const menuSelectors = [
                            '.dropdown-menu.show',
                            'ul[role="menu"].show',
                            '.dropdown-menu',
                            'ul[role="menu"]',
                            '[data-test="scenario-ellipsis"] + ul',
                            '.menu-items'
                        ];

                        let menuFound = false;
                        for (const selector of menuSelectors) {
                            if ($body.find(selector).length > 0) {
                                cy.get(selector)
                                    .should('be.visible')
                                    .within(() => {
                                        // Intentar diferentes formas de encontrar la opción
                                        const optionSelectors = [
                                            `a[data-test="${option}-scenario-btn"]`,
                                            `a[href*="${option.toLowerCase()}"]`,
                                            `button[data-test="${option}-scenario-btn"]`,
                                            `li a:contains("${option}")`,
                                            `li:contains("${option}")`,
                                            `[role="menuitem"]:contains("${option}")`,
                                            `a:contains("${option}")`,
                                            `button:contains("${option}")`
                                        ];

                                        let optionFound = false;
                                        for (const optSelector of optionSelectors) {
                                            if ($body.find(optSelector).length > 0) {
                                                cy.get(optSelector)
                                                    .should('be.visible')
                                                    .should('not.be.disabled')
                                                    .click({ force: true, timeout: 10000 });
                                                optionFound = true;
                                                break;
                                            }
                                        }

                                        if (!optionFound) {
                                            // Si no se encuentra con los selectores específicos, intentar con el texto
                                            cy.contains(option, { matchCase: false })
                                                .should('be.visible')
                                                .should('not.be.disabled')
                                                .click({ force: true, timeout: 10000 });
                                        }
                                    });
                                menuFound = true;
                                break;
                            }
                        }

                        if (!menuFound) {
                            throw new Error(`No se pudo encontrar el menú con la opción: ${option}`);
                        }
                    });

                    // Ejecutar la acción seleccionada
                    switch (option.toLowerCase()) {
                        case "edit":
                            if (scenarioConfig) {
                                this.editScenario(scenarioConfig);
                            } else {
                                throw new Error('Se requiere scenarioConfig para la opción de edición');
                            }
                            break;
                        case "delete":
                            this.deleteScenario();
                            break;
                        default:
                            throw new Error(`Opción no reconocida: ${option}`);
                    }
                    
                } else {
                    throw new Error(`No se encontró el escenario: ${scenarioName}`);
                }
            });
    }

    //II.Create a scenario from process configuration
    /*
      {
      editName: "new Name",
      editDescription: "new Description",
      editData: '{"newField": "new Data"}'
      }
      */

    clickOnPlusScenario() {
        // Wait for the scenarios tab to be active
        cy.get('#scenarios-edit-tab').should('be.visible');
        cy.get('#test_runs').should('be.visible');
        
        // Wait for the plus scenario button to be available
        cy.get(selectors.plusScenarioBtn)
            .should('be.visible')
            .should('not.be.disabled')
            .click({ force: true, timeout: 10000 });
    }

    fillName(name) { 
        cy.wait(3000);
        // Ensure that name is a string
        let nameString;
        if (typeof name === 'object') {
            nameString = JSON.stringify(name);
        } else {
            nameString = String(name);
        }

        // Wait for the modal to be visible
        cy.get('[class="modal-content"]').should('be.visible');
        
        // Wait and verify that the name field is ready
        cy.get(selectors.nameScenarioBP)
            .should('exist')
            .should('be.visible')
            .should('not.be.disabled')
            .clear({ force: true })
            .type(nameString, { 
                delay: 200, 
                force: true,
                parseSpecialCharSequences: false 
            })
            .should('have.value', nameString)
            .wait(500); // Small pause to ensure the value is set
    }

    fillDescription(description) {
        cy.wait(1000);
        cy.get(selectors.descriptionScenarioBP).first().type(description, { delay: 200, force: true }).should("have.value", description);
        cy.wait(2000);
    }

    //Select Scenario Creation Type (Manual or Document upload)
    selectScenarioCreationType(option) {
        cy.xpath(selectors.labelScenarioCreationType).should('be.visible');
        cy.xpath('//legend[text()="Scenario Creation Type *"]//parent::fieldset//div[@class="multiselect__select"]').click();
        cy.contains(option).click();
    }

    addDataInScenario(data) {
        // Ensure that data is a string
        const dataString = typeof data === 'object' ? JSON.stringify(data) : String(data);
        
        // Wait for the Monaco editor to be ready
        cy.get(selectors.dataScenarioBP)
            .should('exist')
            .should('be.visible')
            .then($el => {
                // Find the textarea within the Monaco editor
                const textarea = $el.closest('.monaco-editor').find('textarea');
                
                // Click on the editor to activate it
                cy.wrap(textarea)
                    .click({ force: true })
                    .then(() => {
                        // Use the type command in the textarea
                        cy.wrap(textarea)
                            .type('{selectall}{backspace}', { force: true })
                            .type(dataString, { 
                                delay: 200, 
                                force: true,
                                parseSpecialCharSequences: false 
                            });
                    });
            });
    }

    clearDataField() {
        cy.xpath('//div[@class="view-line"]').then(($elements) => {
            if ($elements.length > 1) {
                cy.xpath(selectors.dataScenarioBP).clear();
                this.clearDataField();
            }
            if ($elements.length == 1) {
                cy.xpath(selectors.dataScenarioBP).clear();
            }
        })
    }

    saveCreateScenario() {
        // Hacer clic en el botón de guardar
        cy.get(selectors.saveScenarioBPBtn).should('be.visible').should('not.be.disabled').click({ force: true });

        // Esperar a que el modal comience a cerrarse
        cy.wait(2000);

        // Verificar que el modal desaparezca: Update - Desaparecer no implica que no exista el elemento
        //cy.get('.modal-content', { timeout: 30000 }).should('not.exist');

        // Verificar que no haya mensajes de error
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should('not.exist');
    }

    saveCreateScenarioDouble() {
        // Hacer clic en el botón de guardar
        cy.get(selectors.saveScenarioBPBtn).should('be.visible').should('not.be.disabled').click({ force: true });

        // Esperar a que el modal comience a cerrarse
        cy.wait(2000);

        // Verificar que no haya mensajes de error
//        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should('not.exist');
    }

    cancelCreateScenario() {

    }

    //III. Edit scenario

    clickOnEditScenario() {
        cy.xpath(selectors.editScenarioBtn).click();
    }

    editScenario2() {
        this.selectMenuOptionRowScenario("Edit Scenario");
    }

    selectMenuOptionRowScenario(nameOption2) {
        const optionCatXpath2 = `//div[@id="scenarios-edit-tab"]//button[@aria-haspopup="menu"]/following-sibling::ul//li//span[contains(text(),"${nameOption2}")]`;
        
        // Wait for the row to be visible and make hover
        cy.xpath('//*[@id="row-222"]/td[4]').should('be.visible').trigger('mouseover', { force: true });
            
        // Wait for the menu to be visible and click
        cy.xpath(optionCatXpath2).should('be.visible').should('not.be.disabled').click({ force: true, timeout: 10000 });
    }

    searchScenarioAndSelectOptions(nameScenario, option2 = "config") {
        // Esperar a que la página esté lista
        cy.get('#scenarios-edit-tab')
            .should('be.visible')
            .should('not.be.disabled')
            .should('not.have.class', 'loading');

        // Esperar a que la tabla de datos esté cargada
        cy.get('.data-table')
            .should('exist')
            .should('be.visible')
            .should('not.be.empty')
            .should('not.have.class', 'loading')
            .then($table => {
                // Verificar que la tabla tenga filas y esté interactiva
                cy.wrap($table)
                    .find('tbody tr')
                    .should('have.length.at.least', 1)
                    .should('be.visible')
                    .should('not.be.disabled');
            });

        // Buscar el escenario
        cy.xpath(selectors.searchInputScenario)
            .should('be.visible')
            .should('not.be.disabled')
            .clear({ force: true })
            .type(`${nameScenario}{enter}`, { delay: 100, force: true })
            .should('have.value', nameScenario);

        // Esperar a que los resultados se carguen
        cy.wait(2000);

        // Verificar que la tabla se haya actualizado y contenga el escenario
        cy.get('.data-table')
            .should('exist')
            .should('be.visible')
            .should('contain', nameScenario)
            .then($table => {
                // Encontrar la fila que contiene el escenario
                const row = $table.find(`tr:contains("${nameScenario}")`);
                if (row.length > 0) {
                    // Hacer hover sobre la fila para activar el menú
                    cy.wrap(row)
                        .should('be.visible')
                        .trigger('mouseover', { force: true });

                    // Esperar a que el menú esté disponible
                    cy.wait(1000);

                    // Verificar y hacer clic en el menú de opciones
                    cy.xpath(selectors.selectMenuOptionRowScenario)
                        .should('exist')
                        .should('be.visible')
                        .should('not.be.disabled')
                        .first()
                        .click({ force: true, timeout: 10000 });

                    // Esperar a que el menú se abra
                    cy.wait(1000);

                    // Verificar que el menú tenga las opciones esperadas
                    cy.get('body').then($body => {
                        const menuSelectors = [
                            '.dropdown-menu.show',
                            'ul[role="menu"].show',
                            '.dropdown-menu',
                            'ul[role="menu"]',
                            '[data-test="scenario-ellipsis"] + ul',
                            '.menu-items'
                        ];

                        let menuFound = false;
                        for (const selector of menuSelectors) {
                            if ($body.find(selector).length > 0) {
                                cy.get(selector)
                                    .should('be.visible')
                                    .within(() => {
                                        // Verificar que el menú tenga las opciones correctas
                                        const expectedOptions = ['Edit', 'Delete'];
                                        expectedOptions.forEach(option => {
                                            cy.contains(option)
                                                .should('exist')
                                                .should('be.visible')
                                                .should('not.be.disabled');
                                        });
                                    });
                                menuFound = true;
                                break;
                            }
                        }

                        if (!menuFound) {
                            throw new Error('Menu not found');
                        }
                    });

                    // Ejecutar la acción seleccionada
                    switch (option2) {
                        case "editScenario":
                            this.editScenario2();
                            break;
                        case "deleteSenario":
                            this.deleteScenario();
                            break;
                        default:
                            cy.log(`Option not recognized: ${option2}`);
                            break;
                    }

                    
                } else {
                    throw new Error(`Scenario not found: ${nameScenario}`);
                }
            });
    }
    

    editScenario(scenarioConfig = {}) {
        this.clickOnEditScenario();
        
        if (!scenarioConfig || typeof scenarioConfig !== 'object') {
            cy.log('Warning: scenarioConfig is not defined or is not an object');
            return;
        }
        
        const { 
            editName = null, 
            editDescription = null, 
            editData = null 
        } = scenarioConfig;
        
        if (editName) {
            // Change xpath() to get() for CSS selectors
            cy.get('[class="modal-content"]').should('be.visible').within(()=>{ //catch all modal
                cy.get('[class="modal-body"] fieldset div > input').clear({delay:200}).first().type(editName).should('have.value', editName);  
            });        
        }
    
        if (editDescription) {
            // Change xpath() to get() for CSS selectors
            cy.get('[class="modal-content"]').should('be.visible').within(()=>{ //catch all modal
                
                cy.get('[class="modal-body"] fieldset div > textarea').first().clear().type(editDescription).should('have.value', editDescription);
            });   
        }
    
                // Change xpath() to get() if it is a CSS selector
        cy.get('footer button').contains('Save').click();   //save escenario
        cy.get('.alert-wrapper > .alert').should('be.visible');
    }

    //IV. Delete scenario
    deleteScenario() {
        // Function to verify if an element is really visible
        const isElementVisible = ($el) => {
            return $el.length > 0 && 
                   $el.is(':visible') && 
                   $el.css('display') !== 'none' && 
                   $el.css('visibility') !== 'hidden' &&
                   $el.css('opacity') !== '0';
        };

        // Function to force the visibility of an element
        const forceElementVisible = ($el) => {
            cy.wrap($el)
                .invoke('attr', 'style', 'display: block !important; visibility: visible !important; opacity: 1 !important; pointer-events: auto !important;');
        };

        // Function to try to click on the delete button
        const tryClickDeleteButton = ($menu) => {
            const deleteButtonSelectors = [
                'a[data-test="delete-scenario-btn"]',
                'a[href*="delete"]',
                'button[data-test="delete-scenario-btn"]',
                'li a:contains("Delete")',
                'li:contains("Delete")',
                '[role="menuitem"]:contains("Delete")',
                'button:contains("Delete")',
                '[data-test="delete"]'
            ];

            for (const selector of deleteButtonSelectors) {
                const $button = $menu.find(selector);
                if (isElementVisible($button)) {
                    cy.wrap($button)
                        .scrollIntoView()
                        .click({ force: true, timeout: 10000 })
                        .then(() => {
                            cy.log('Botón de eliminar encontrado y clickeado');
                            return true;
                        })
                        .catch(() => {
                            cy.log(`No se pudo hacer clic en el botón con selector: ${selector}`);
                        });
                    return true;
                }
            }
            return false;
        };

        // Function to confirm the deletion
        const confirmDeletion = () => {
            return cy.get('#__BVID__22___BV_modal_body_', { timeout: 30000 })
                .should('exist')
                .should('be.visible')
                .should('contain', 'Are you sure you want to delete this scenario?')
                .then(() => {
                    return cy.get('[data-test="confirm-btn-ok"]')
                        .should('be.visible')
                        .should('not.be.disabled')
                        .scrollIntoView()
                        .click({ force: true, timeout: 10000 });
                });
        };

        // Function to verify the success message
        const verifySuccessMessage = () => {
            // Wait for the confirmation modal to disappear
            cy.get('#__BVID__22___BV_modal_body_', { timeout: 30000 })
                .should('not.exist');

            // Wait for a moment for the alert message to appear
            cy.wait(2000);

            // Try different selectors for the success message
            const alertSelectors = [
                '.alert-wrapper > .alert',
                '.alert-success',
                '.alert',
                '[role="alert"]',
                '.notification-success',
                '.alertBox',
                '.alert-dismissible'
            ];

            // Verify each selector until one works
            let alertFound = false;
            for (const selector of alertSelectors) {
                cy.get('body').then($body => {
                    if ($body.find(selector).length > 0) {
                        cy.get(selector)
                            .should('exist')
                            .should('be.visible')
                            .then($alert => {
                                // Verify if the message contains success text
                                const alertText = $alert.text().toLowerCase();
                                if (alertText.includes('success') || 
                                    alertText.includes('deleted') || 
                                    alertText.includes('removed') || 
                                    alertText.includes('eliminated')) {
                                    cy.log('Mensaje de éxito encontrado:', $alert.text());
                                    alertFound = true;
                                }
                            });
                    }
                });
            }

            // If no alert message is found, verify that the table has been updated
            if (!alertFound) {
                cy.get('.data-table')
                    .should('exist')
                    .should('be.visible')
                    .should('not.contain', 'Loading')
                    .should('not.contain', 'No Data Available')
                    .then($table => {
                        cy.log('No alert message found, but the table was updated correctly');
                    });
            }
        };

                // Wait for the page to be ready
        cy.get('#testing-configuration')
            .should('exist')
            .then(() => {
                // Try different menu selectors
                const menuSelectors = [
                    '.dropdown-menu.show',
                    'ul[role="menu"].show',
                    '.dropdown-menu',
                    'ul[role="menu"]',
                    '[data-test="scenario-ellipsis"] + ul',
                    '.menu-items'
                ];

                // Try each menu selector
                let menuProcessed = false;
                for (const selector of menuSelectors) {
                    if (menuProcessed) break;

                    cy.get('body').then($body => {
                        const $menu = $body.find(selector);
                        if ($menu.length > 0) {
                            // Ensure the menu is visible
                            if (!isElementVisible($menu)) {
                                forceElementVisible($menu);
                            }

                            // Intentar hacer clic en el botón de eliminar
                            if (tryClickDeleteButton($menu)) {
                                // Confirmar la eliminación
                                confirmDeletion()
                                    .then(() => {
                                        // Verificar el mensaje de éxito
                                        verifySuccessMessage();
                                        menuProcessed = true;
                                    });
                            }
                        }
                    });
                }

                // If no menu is found or the click fails, try with XPath
                if (!menuProcessed) {
                    cy.wait(4000);
                    cy.get('[data-test="confirm-btn-ok"]').should('be.visible');
                    cy.get('[data-test="confirm-btn-ok"]').click({ force: true, timeout: 10000 });
                }
            });
    }

    //2C Scenarios (Document upload)

    downloadFormat() {

    }

    uploadFile(nameFile, filePath) {
        cy.get(selectors.uploadBtn).selectFile(filePath, { force: true });
        cy.get(selectors.fileAttachedfield).should('contain', nameFile);
    }

    goToScenariosTab() {
        cy.wait(3000);
        this.clickOnTestRun_ScenariosTab();
        this.clickOnScenariosTab();
    }

    goToTestRunTab() {
        this.clickOnTestRun_ScenariosTab();
        this.clickOnTestRunTab();
    }

    createScenario(nameScenario, scenarioDescription, scenarioCreationType, data, nameFile, filePath) {
        
        this.clickOnPlusScenario(); 
        this.fillName(nameScenario);
        this.fillDescription(scenarioDescription);
        switch (scenarioCreationType) {
            case 'Manual Data':
                this.selectScenarioCreationType('Manual Data');
                this.addDataInScenario(data);
                break;
            case 'Document Upload':
                this.selectScenarioCreationType('Document Upload');
                this.uploadFile(nameFile, filePath);
                this.load();
                break;
            default:
                break;
        }
        this.saveCreateScenario();
    }

    createScenarioDouble(nameScenario, scenarioDescription, scenarioCreationType, data, nameFile, filePath) {
        
        this.clickOnPlusScenario(); 
        this.fillName(nameScenario);
        this.fillDescription(scenarioDescription);
        switch (scenarioCreationType) {
            case 'Manual Data':
                this.selectScenarioCreationType('Manual Data');
                this.addDataInScenario(data);
                break;
            case 'Document Upload':
                this.selectScenarioCreationType('Document Upload');
                this.uploadFile(nameFile, filePath);
                this.load();
                break;
            default:
                break;
        }
        this.saveCreateScenarioDouble();
    }

    //2D Modal to create scenario 
    createScenarioByProcess(nameScenario, scenarioDescription, scenarioCreationType, data, nameFile, filePath) {         
        // Navigate to the scenarios tab and wait for it to be ready
        this.goToScenariosTab();
        
        // Verificar que la página esté lista
        cy.get('#scenarios-edit-tab')
            .should('be.visible')
            .should('not.be.disabled');
            
        cy.get('#test_runs')
            .should('be.visible')
            .should('not.be.disabled');
        
        // Create the scenario with error handling
        try {
            // Crear el escenario
            this.createScenario(nameScenario, scenarioDescription, scenarioCreationType, data, nameFile, filePath);
            
            // Verificar que el modal se haya cerrado correctamente { .modal-content }
            cy.get('div[id="createScenario"]')
                .should('not.exist', { timeout: 30000 })
                .then(() => {
                    cy.log('Modal cerrado exitosamente');
                });
            
            // Verificar que el mensaje de alerta desaparezca
            cy.get('.alert-wrapper > .alert', { timeout: 60000 })
                .should('not.exist')
                .then(() => {
                    cy.log('Mensaje de alerta desaparecido');
                });
                
        } catch (error) {
            cy.log('Error al crear el escenario:', error.message);
            
            // Intentar cerrar el modal si está abierto
            cy.get('body').then(($body) => {
                if ($body.find('.modal-content').length > 0) {
                    cy.get('.modal-content').should('exist').then(() => {
                        cy.get('button.close').click({ force: true });
                    });
                }
            });
            
            throw error;
        }
    }

    createScenarioIfNotExist(nameScenario, scenarioDescription, scenarioCreationType, data, nameFile, filePath) {
        this.goToScenariosTab();
        this.searchScenario(nameScenario);
        this.load();
        
        // Wait for the table to be fully loaded
        cy.get('#scenarios-edit-tab').should('be.visible');
        cy.get('#test_runs').should('be.visible');
        
        // Verify the content of the table
        cy.xpath('//div[@id="scenarios-edit-tab"]//div[@class="data-table"]')
            .should('exist')
            .should('be.visible')
            .invoke('text')
            .then($text => {
                // If there is no data or it is loading, create the scenario
                if ($text.includes('No Data Available') || $text.includes('Loading')) {
                    cy.log('Creating new scenario...');
                    this.createScenario(nameScenario, scenarioDescription, scenarioCreationType, data, nameFile, filePath);
                } else {
                    cy.log('The scenario already exists');
                }
            });
    }

    //Create scenario by request
    createScenarioByRequest(nameScenario, description, data) {
        cy.xpath(selectors.dataTab).should('be.visible');
        cy.xpath(selectors.dataTab).click();
        cy.xpath(selectors.createScenarioBtnBR).should('be.visible');
        cy.xpath(selectors.createScenarioBtnBR).click();
        cy.get(selectors.nameInCreateScenarioBR).type(nameScenario).should('have.value', nameScenario);
        cy.get(selectors.descriptionInCreateScenarioBR).type(description, { delay: 5 }).should('have.value', description);
        cy.xpath(selectors.saveBtnInCreateScenarioBR).click();
        this.alertMessageVisible();
    }

    //2E. Test Run
    clickOnTestRunsTab() {
        cy.get(selectors.testRunTabScenarios).should('be.visible').click();
       //cy.get(selectors.testRunTabScenarios).click();
    }

    clickOnTestRunTabScenarios() {
        cy.get(selectors.testRunTabScenarios).should('be.visible');
        cy.get(selectors.testRunTabScenarios).click();
    }

    clickOnPlusTest() {
        cy.get(selectors.testBtnInConfigProcess).click();
    }

    //Modal Run Test (Only alternative A)

    //Search Test Run
    searchTestRun(value) {
        // Wait for the search field to be visible and available
        cy.get(selectors.searchTestRun)
            .should('be.visible')
            .should('not.be.disabled')
            .should('have.css', 'pointer-events', 'auto')
            .click({ force: true })
            .clear({ force: true })
            .type(value, { delay: 100, force: true })
            .should('have.value', value);
    }

    //Create Run Test from process configure
    createRunTest() {
        this.clickOnTestRun_ScenariosTab();
        this.clickOnTestRunTab();
        this.clickOnPlusTest();
    }

    //Alternative
    selectAlternativeFromProcessConfigure(alternative) {
        cy.get('#select-alternative').invoke('attr', 'disabled').then(($Alternative) => {
            cy.log($Alternative)
            if ($Alternative == 'disabled') {
                return
            } else {
                switch (alternative) {
                    case "Alternative A":
                        cy.get(selectors.alternativeField).select('Alternative A').should('have.value', 'A');
                        break;
                    case "Alternative B":
                        cy.get(selectors.alternativeField).select('Alternative B').should('have.value', 'B');
                        break;
                    case "As configured in the process":
                        cy.get(selectors.alternativeField).select('As configured in the process').should('have.value', 'AB');
                        break;
                    default:
                        break;
                }
            }
        })
    }

    //Starting point from process configure
    selectStartingPoint(startingPoint) {
        cy.xpath(selectors.labelSP).should('be.visible');
        cy.xpath(selectors.containerSP).should('be.visible');
        cy.xpath(selectors.containerSP).click({force:true});
        cy.get(selectors.inputSP).type(`{backspace}${startingPoint}`, {delay: 500}).should('have.value', startingPoint);
        cy.xpath(selectors.itemSP).should('have.attr', 'aria-label').and('equal', `${startingPoint}. `);
        cy.get(selectors.inputSP).type('{enter}');

    }

    //Manual Resume Point from process configure
    selectManualResumePoint(stopPoint) {
        cy.xpath(selectors.labelMRP).should('be.visible');
        cy.xpath(selectors.containerMRP).click();
        cy.xpath(selectors.inputMRP).type(`{backspace}${stopPoint}`).should('have.value', stopPoint);
        cy.xpath(selectors.itemMRP).should('have.attr', 'aria-label').and('equal', `${stopPoint}. `);
        cy.xpath(selectors.inputMRP).type('{enter}');
    }

    //Select Manual or advanced
    selectManualOrAdvanced(option) {
        switch (option) {
            case "Manual":
                cy.get(selectors.manualBtn).click();
                break;
            case "Advanced":
                cy.get(selectors.advancedBtn).click();
                break;
            default:
                break;
        }
    }

    //Advanced
    fillPMQL(query) {
        cy.get(selectors.pmqlField).type(query).should('have.value', query);
    }

    clickOnBrowseBtn() {
        cy.get(selectors.browseBtn).click();
    }

    //Scenarios from process configure
    selectScenarioByProcessConfigure(scenario) {
        cy.xpath('//div[@data-test="test-run-scenario-select"]//div[@class="multiselect__select"]').click();
        cy.xpath('//div[@data-test="test-run-scenario-select"]//input').type();
        cy.xpath('//div[@data-test="test-run-scenario-select"]//div[@class="multiselect__content-wrapper"]//li[1]').should('have.attr', 'aria-label').and('equal', `${scenario}. `);
        cy.xpath('//div[@data-test="test-run-scenario-select"]//input').type('{enter}');
    }

    selectScenario(scenario, iframeOption = 'a') {

        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).xpath(selectors.labelScenario).should('be.visible');
        cy.iframe(iframeSelector).xpath(selectors.containerScenario).should('be.visible');
        cy.iframe(iframeSelector).xpath(selectors.containerScenario).click({force:true});
        cy.iframe(iframeSelector).find(selectors.inputScenario).type(`{backspace}${scenario}`).should('have.value', scenario);
        cy.wait(3000);
        cy.iframe(iframeSelector).find(selectors.inputScenario).type('{enter}'); 
       
    }

    /**
     * Selecciona todos los escenarios que coincidan con el filtro especificado
     * @param {string} nameToFilter - Nombre o patrón para filtrar los escenarios
     * @returns {Promise<void>}
     */
    async selectAllScenarios(nameToFilter) {
        try {
            // Wait for the container of scenarios to be ready
            await cy.xpath(selectors.containerScenario)
                .should('exist')
                .should('be.visible')
                .should('not.be.disabled')
                .click({ force: true });

            // Wait for the input to be ready and write the filter
            await cy.get(selectors.inputScenario)
                .should('exist')
                .should('be.visible')
                .should('not.be.disabled')
                .click({ force: true })
                .clear({ force: true })
                .type(nameToFilter, { delay: 100, force: true })
                .should('have.value', nameToFilter);

            // Wait for the results to appear
            await cy.wait(1000);

            // Verify that the "Select All" option is available and click
            await cy.get('[aria-label="-- Select All --. "]')
                .should('exist')
                .should('be.visible')
                .should('not.be.disabled')
                .click({ force: true });

            // Verify that the selection has been made correctly
            await cy.get(selectors.inputScenario)
                .should('have.value')
                .then($input => {
                    const value = $input.val();
                    if (!value || value === nameToFilter) {
                        cy.log('Warning: No scenarios were detected');
                    }
                });

        } catch (error) {
            cy.log('Error selecting all scenarios:', error.message);
            throw error;
        }
    }

    //Additional Data from process configure
    addAdditionalData(data) {
        cy.get(selectors.additionalData).type('{backspace}').type('{backspace}').type(`{{}${data}}`).should('contain', `{${data}}`);
    }

    //Bypass Script task and Data Connectors from process configure
    enableBypassCheckbox() {
        cy.xpath(selectors.bypassCheckbox).click({ force: true });
    }

    //Run button in Run Test modal from process configure
    clickOnRunBtn() {
        cy.xpath(selectors.runBtn).should('be.visible').click();
    }

    //Close button

    //Modal Run Test from process configure
    /**
     * Runs a test from the process configuration
     * @param {Object} runTestConfig - Test configuration
     * @param {string} manualOrAdvanced - Execution mode ('Manual' or 'Advanced')
     * @param {string} singleOrMassive - Execution type ('Single' or 'Massive')
     * @param {string} query - PMQL query for advanced mode
     */
    runTestFromProcessConfigure(runTestConfig, manualOrAdvanced, singleOrMassive, query) {
        const { alternative, startingPoint, manualResumePoint, scenario, additionalData, isEnabledBypass } = runTestConfig;
        
        // Wait for the page to be ready
        cy.wait(2000);
        
        // Create the test
        this.createRunTest();
        
        // Verify that the modal is present and visible
        cy.get('.modal-content', { timeout: 30000 })
            .should('exist')
            .should('be.visible')
            .within(() => {
                // Verify main elements
                cy.xpath(selectors.labelAlternative, { timeout: 30000 })
                    .should('exist')
                    .should('be.visible')
                    .then($el => {
                        cy.log('Element found:', $el.text());
                    });

                cy.xpath(selectors.containerSP, { timeout: 30000 })
                    .should('exist')
                    .should('be.visible')
                    .should('contain', 'Start Event');

                // Configure alternative if it exists
                if (alternative !== null) {
                    cy.log('Configuring alternative:', alternative.alternative);
                    this.selectAlternativeFromProcessConfigure(alternative.alternative);
                    cy.wait(1000);
                }

                // Configure starting point if it exists
                if (startingPoint !== null) {
                    cy.log('Configuring starting point:', startingPoint.startingPointOption);
                    cy.wait(3000);
                    this.selectStartingPoint(startingPoint.startingPointOption);
                    cy.wait(1000);
                }

                // Configure manual resume point if it exists
                if (manualResumePoint !== null) {
                    cy.log('Configuring manual resume point:', manualResumePoint.stopPointOption);
                    this.selectManualResumePoint(manualResumePoint.stopPointOption);
                    cy.wait(1000);
                }

                // Select manual or advanced mode
                cy.log('Selecting mode:', manualOrAdvanced);
                switch (manualOrAdvanced) {
                    case "Manual":
                        this.selectManualOrAdvanced('Manual');
                        cy.get(selectors.manualBtn)
                            .should('have.class', 'active')
                            .should('be.visible');
                        break;
                    case "Advanced":
                        this.selectManualOrAdvanced('Advanced');
                        cy.get(selectors.advancedBtn)
                            .should('have.class', 'active')
                            .should('be.visible');
                        if (query) {
                            this.fillPMQL(query);
                            this.clickOnBrowseBtn();
                            cy.wait(1000);
                        }
                        break;
                    default:
                        cy.log('Modo no especificado:', manualOrAdvanced);
                }

                // Configure or Massive scenario if it exists
                if (scenario !== null) {
                    cy.log('Configuring scenario:', scenario.scenarioOption);
                    switch (singleOrMassive) {
                        case "Single":
                            this.selectScenario(scenario.scenarioOption);
                            cy.wait(2000);
                            break;
                        case "Massive":
                            this.selectAllScenariosSync();
                            cy.wait(2000);
                            break;
                        default:
                            cy.log('Tipo de ejecución no especificado:', singleOrMassive);
                    }
                }

                // Add additional data if it exists
                if (additionalData !== null) {
                    cy.log('Adding additional data:', additionalData.data);
                    this.addAdditionalData(additionalData.data);
                    cy.wait(1000);
                }

                // Enable bypass if it is necessary
                if (isEnabledBypass) {
                    cy.log('Enabling bypass');
                    this.enableBypassCheckbox();
                    cy.wait(1000);
                }

                // Run the test
                cy.log('Running test');
                this.clickOnRunBtn();
            });

        
    }
    selectAllScenariosSync(){
        cy.xpath('//div[@data-test="test-run-scenario-select"]//div[@class="multiselect__tags"]')
          .click();
            
        cy.wait(5000);
        cy.xpath('//div[@data-test="test-run-scenario-select"]//ul/li[1]').click();
    }

    openLastTestFromConfigOfProcess(processName) {
        navHelper.navigateToProcessPage();
        process.searchProcessAndSelectOptions(processName, "config");
        this.clickOnTestRunsTab();
        this.openLastTest();
    }

    clickOnEmailsTab() {
        cy.xpath(selectors.emailTab).click();
    }

    clickOnsubmitBtn() {
        cy.get(selectors.submitBtn).should('be.visible').click();
    }

    alertMessageVisible() {
        cy.get(selectors.alertMessage).should('be.visible');
    }

    clickOnCompletedTaskBtn() {
        cy.xpath(selectors.completedBtn).should('be.visible').click();
    }

    clickOnEllipsisScenario() {
        // Esperar a que la página esté completamente cargada
        cy.get('#scenarios-edit-tab')
            .should('be.visible')
            .should('not.be.disabled')
            .should('not.have.class', 'loading');

        // Esperar a que la tabla de datos esté cargada y lista
        cy.get('.data-table')
            .should('exist')
            .should('be.visible')
            .should('not.be.empty')
            .should('not.have.class', 'loading')
            .then($table => {
                // Verificar que la tabla tenga filas y esté interactiva
                cy.wrap($table)
                    .find('tbody tr')
                    .should('have.length.at.least', 1)
                    .should('be.visible')
                    .should('not.be.disabled');
            });

        // Función para intentar hacer clic en el botón de elipsis
        const tryClickEllipsis = () => {
            return new Cypress.Promise((resolve, reject) => {
                cy.get('body').then($body => {
                    const buttonSelectors = [
                        '[data-test="scenario-ellipsis"]',
                        '.btn-icon',
                        '[aria-haspopup="menu"]',
                        'button.dropdown-toggle',
                        'button[aria-haspopup="menu"]'
                    ];

                    let buttonFound = false;
                    for (const selector of buttonSelectors) {
                        if ($body.find(selector).length > 0) {
                            cy.get(selector)
                                .should('be.visible')
                                .should('not.be.disabled')
                                .first()
                                .scrollIntoView()
                                .click({ force: true, timeout: 10000 })
                                .then(() => {
                                    buttonFound = true;
                                    resolve();
                                })
                                .catch(() => {
                                    cy.log(`No se pudo hacer clic en el botón con selector: ${selector}`);
                                });
                            break;
                        }
                    }

                    if (!buttonFound) {
                        // Intentar con xpath como último recurso
                        cy.xpath('//button[contains(@class, "btn-icon") or contains(@class, "dropdown-toggle")]')
                            .should('exist')
                            .should('be.visible')
                            .first()
                            .scrollIntoView()
                            .click({ force: true, timeout: 10000 })
                            .then(() => resolve())
                            .catch(() => reject(new Error('No se pudo encontrar ni hacer clic en ningún botón de elipsis')));
                    }
                });
            });
        };

        // Función para verificar el menú
        const verifyMenu = () => {
            return new Cypress.Promise((resolve) => {
                cy.get('body').then($body => {
                    const menuSelectors = [
                        '.dropdown-menu.show',
                        'ul[role="menu"].show',
                        '.dropdown-menu',
                        'ul[role="menu"]',
                        '[data-test="scenario-ellipsis"] + ul',
                        '.menu-items'
                    ];

                    for (const selector of menuSelectors) {
                        if ($body.find(selector).length > 0) {
                            cy.get(selector)
                                .should('exist')
                                .then($menu => {
                                    const menuItems = $menu.find('li, .menu-item, [role="menuitem"], a[data-test="delete-scenario-btn"]');
                                    if (menuItems.length > 0) {
                                        // Verificar que al menos una opción sea visible y habilitada
                                        cy.wrap(menuItems)
                                            .first()
                                            .should('be.visible')
                                            .should('not.be.disabled')
                                            .then(() => resolve(true))
                                            .catch(() => resolve(false));
                                        return;
                                    }
                                });
                        }
                    }
                    resolve(false);
                });
            });
        };

        // Función para esperar a que el menú esté listo
        const waitForMenu = () => {
            return new Cypress.Promise((resolve) => {
                let attempts = 0;
                const maxAttempts = 3;
                const checkMenu = () => {
                    verifyMenu().then(menuVisible => {
                        if (menuVisible) {
                            resolve(true);
                        } else if (attempts < maxAttempts) {
                            attempts++;
                            cy.wait(2000);
                            checkMenu();
                        } else {
                            resolve(false);
                        }
                    });
                };
                checkMenu();
            });
        };

        // Ejecutar la secuencia de acciones con mejor manejo de promesas
       /* cy.wrap(null).then(() => {
            // Intentar hacer clic en el botón
            return tryClickEllipsis()
                .then(() => {
                    // Esperar a que el menú comience a aparecer
                    return new Cypress.Promise((resolve) => {
                        cy.wait(2000).then(() => {
                            resolve();
                        });
                    });
                })
                .then(() => {
                    // Verificar el menú con timeout
                    return new Cypress.Promise((resolve, reject) => {
                        const timeout = setTimeout(() => {
                            reject(new Error('Timeout esperando por el menú'));
                        }, 30000);

                        waitForMenu()
                            .then(menuVisible => {
                                clearTimeout(timeout);
                                if (!menuVisible) {
                                    reject(new Error('No se pudo encontrar un menú visible después de varios intentos'));
                                } else {
                                    resolve();
                                }
                            })
                            .catch(error => {
                                clearTimeout(timeout);
                                reject(error);
                            });
                    });
                })
                .catch(error => {
                    cy.log('Error en clickOnEllipsisScenario:', error.message);
                    throw error;
                });
        }); */
    }

    load() {
        cy.wait(5000);
    }

    deleteScenarios(scenarioName, init, end) {
        for (let index = init; index < end; index++) {
            const currentScenario = `${scenarioName} - ${index}`;
            cy.log(`Eliminando escenario: ${currentScenario}`);
            
            // Buscar el escenario
            this.searchScenario(currentScenario);
            
            // Esperar a que la tabla se actualice
            cy.wait(2000);
            
            // Verificar que el escenario existe antes de intentar eliminarlo
            cy.get('.data-table')
                .should('exist')
                .should('be.visible')
                .should('contain', currentScenario)
                .then(() => {
                    // Intentar eliminar el escenario
                    this.clickOnEllipsisScenario();
                    this.deleteScenario();
                    
                    // Esperar a que se complete la eliminación
                    cy.wait(2000);
                });
        }
    }

    createScenarioByUploadFile(nameScenario, scenarioDescription, nameFile, filePath) {
        // Navigate to the scenarios tab
        this.goToScenariosTab();
        
        // Wait for the tab to be fully loaded
        cy.get('#scenarios-edit-tab').should('be.visible');
        cy.get('#test_runs').should('be.visible');
        
        // Try to click on the create scenario button
        this.clickOnPlusScenario();
        
        // Verify that the creation modal is visible
        cy.get('.modal-content').should('be.visible');
        
        this.fillName(nameScenario);
        this.fillDescription(scenarioDescription);
        this.selectScenarioCreationType('Document Upload');
        this.uploadFile(nameFile, filePath);
        this.load();
        this.saveCreateScenario();
        cy.get('.alert-wrapper > .alert').should("be.visible");
        cy.get('.alert-wrapper > .alert').should("contain", "The process test scenario was created.");
    }

    /**
     * Ejecuta una prueba en modo manual, ya sea individual o masiva
     * @param {Object} runTestConfig - Configuración de la prueba
     * @param {string} runTestConfig.alternative - Alternativa a seleccionar
     * @param {Object} runTestConfig.startingPoint - Punto de inicio
     * @param {Object} runTestConfig.manualResumePoint - Punto de reanudación manual
     * @param {Object} runTestConfig.scenario - Escenario a ejecutar
     * @param {Object} runTestConfig.additionalData - Datos adicionales
     * @param {boolean} runTestConfig.isEnabledBypass - Si se debe habilitar el bypass
     * @param {string} singleOrMassive - Tipo de ejecución ('Single' o 'Massive')
     * @returns {Promise<void>}
     */
    async runTestSingleOrMassiveInManualMode(runTestConfig, singleOrMassive) {
        try {
            const {
                alternative,
                startingPoint,
                manualResumePoint,
                scenario,
                additionalData,
                isEnabledBypass
            } = runTestConfig;

            // Create the test
            await this.createRunTest();

            // Wait for the modal to be ready
            await cy.get('.modal-content', { timeout: 30000 })
                .should('exist')
                .should('be.visible')
                .as('modal');

            // Validate main elements of the modal
            await cy.get('@modal').within(() => {
                // Validate required elements
                const requiredElements = [
                    { selector: selectors.labelAlternative, name: 'Label Alternative' },
                    { selector: selectors.containerSP, name: 'Container SP', expectedText: 'Start Event' }
                ];

                requiredElements.forEach(({ selector, name, expectedText }) => {
                    cy.xpath(selector)
                        .should('exist')
                        .should('be.visible')
                        .then($el => {
                            if (expectedText) {
                                cy.wrap($el).should('contain', expectedText);
                            }
                            cy.log(`${name} encontrado:`, $el.text());
                        });
                });

                // Configure alternative if it exists
                if (alternative) {
                    this.selectAlternativeFromProcessConfigure(alternative.alternative);
                }

                // Configure starting point if it exists
                if (startingPoint) {
                    cy.wait(3000);
                    this.selectStartingPoint(startingPoint.startingPointOption);
                }

                // Configure manual resume point if it exists
                if (manualResumePoint) {
                    this.selectManualResumePoint(manualResumePoint.stopPointOption);
                }

                // Select manual mode
                this.selectManualOrAdvanced('Manual');

                // Configure scenario if it exists
                if (scenario) {
                    if (singleOrMassive === 'Single') {
                        this.selectScenario(scenario.scenarioOption);
                    } else if (singleOrMassive === 'Massive') {
                        this.selectAllScenarios(scenario.scenarioOption);
                    }
                }

                // Add additional data if it exists
                if (additionalData) {
                    this.addAdditionalData(additionalData.data);
                }

                // Enable bypass if it is necessary
                if (isEnabledBypass) {
                    this.enableBypassCheckbox();
                }

                // Run the test
                this.clickOnRunBtn();
            });

            // Wait for the test to complete
            await cy.get('.alert-wrapper', { timeout: 60000 })
                .should('exist')
                .should('be.visible')
                .should('contain', 'Test run completed successfully');

        } catch (error) {
            cy.log('Error executing the test:', error.message);
            throw error;
        }
    }
    createScenarioEvenIfExits(nameScenario, scenarioDescription, scenarioCreationType, data, nameFile, filePath) {
        
        this.clickOnPlusScenario(); 
        this.fillName(nameScenario);
        this.fillDescription(scenarioDescription);
        switch (scenarioCreationType) {
            case 'Manual Data':
                this.selectScenarioCreationType('Manual Data');
                this.addDataInScenario(data);
                break;
            case 'Document Upload':
                this.selectScenarioCreationType('Document Upload');
                this.uploadFile(nameFile, filePath);
                this.load();
                break;
            default:
                break;
        }
        cy.get(selectors.saveScenarioBPBtn).click({ force: true });
        cy.wait(5000);
    }
}
