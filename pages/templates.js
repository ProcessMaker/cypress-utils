import selectors from "#selectors/templates";
import "#support/commands";
import {Utility} from "./utility";

const utility = new Utility();

export class Templates {
    /**
     * This method is responsible to import a template
     * @param templatePath: name of the new PM Projects
     * @return : nothing return
     */
    importTemplates(templatePath) {
        cy.xpath(selectors.importButtonTemplates).should('be.visible');
        cy.xpath(selectors.importButtonTemplates).click();
        cy.xpath(selectors.inputToFileUploadTemplates).attachFile(templatePath);
        cy.xpath(selectors.importBtnTemplates)
            .parent()
            .should("not.have.attr", "disabled", "disabled");
        cy.xpath(selectors.importBtnTemplates).click();       
    }

    clickOnImportButton() {
        cy.get(selectors.importProcessBtn).click();
        cy.get(selectors.browseBtn).should("be.visible");
    }

    clickOnAddProjectButton() {
        cy.xpath(selectors.addTemplates).should("be.visible").click();
    }

    searchTemplateAndSelectOptions(
        templateName,
        option = "config",
        exportType = "basic"
    ) {
        // Esperar a que la tabla esté completamente cargada
        cy.get('#templatesIndex', { timeout: 60000 })
            .should('exist')
            .should('be.visible')
            .should('not.have.class', 'loading')
            .should('have.css', 'opacity', '1')
            .then($container => {
                cy.log('Contenedor de tabla encontrado');
                // Verificar que el contenedor tiene dimensiones válidas
                const rect = $container[0].getBoundingClientRect();
                if (rect.width === 0 || rect.height === 0) {
                    throw new Error('El contenedor de la tabla tiene dimensiones inválidas');
                }
            });
        
        // Buscar la plantilla
        cy.xpath(selectors.searchBoxTemplate)
            .should('be.visible')
            .should('not.be.disabled')
            .should('have.css', 'opacity', '1')
            .clear()
            .wait(1000)
            .type(templateName, { delay: 650 })
            .should("have.value", templateName)
            .type('{enter}')
            .then($input => {
                cy.log('Búsqueda realizada para:', templateName);
                // Verificar que el input tiene el valor correcto
                if ($input.val() !== templateName) {
                    throw new Error(`El valor del campo de búsqueda no coincide: ${$input.val()} !== ${templateName}`);
                }
            });
        
        // Esperar a que el spinner de carga desaparezca y la tabla esté lista
        cy.wait(2000); // Esperar un momento para que la búsqueda comience
        cy.get('.jumbotron.jumbotron-fluid', { timeout: 30000 })
            .should('not.be.visible')
            .then(() => {
                cy.log('Spinner de carga desaparecido');
                // Esperar a que la tabla esté lista
                cy.get('#templatesIndex table', { timeout: 30000 })
                    .should('exist')
                    .should('be.visible')
                    .should('have.css', 'opacity', '1')
                    .then($table => {
                        cy.log('Tabla encontrada');
                        
                        // Verificar que la tabla tiene dimensiones válidas
                        const rect = $table[0].getBoundingClientRect();
                        if (rect.width === 0 || rect.height === 0) {
                            throw new Error('La tabla tiene dimensiones inválidas');
                        }
                        
                        // Verificar que hay filas en la tabla
                        const rows = $table.find('tr');
                        if (rows.length > 0) {
                            cy.log('Filas encontradas:', rows.length);
                            
                            // Encontrar y hacer clic en el botón del menú
                            cy.wrap($table)
                                .find('button[aria-haspopup="menu"]')
                                .first()
                                .should("be.visible")
                                .should('not.be.disabled')
                                .should('have.css', 'opacity', '1')
                                .click({force: true})
                                .then($button => {
                                    cy.log('Botón de menú clickeado');
                                    // Verificar que el botón está en un estado válido
                                    if ($button.prop('disabled')) {
                                        throw new Error('El botón del menú está deshabilitado después del clic');
                                    }
                                });

                            // Seleccionar la opción apropiada
                            switch (option) {
                                case "documentation":
                                    this.goTodocumentationTemplate();
                                    break;
                                case "edit":
                                    this.goToEditTemplate();
                                    break;
                                case "export":
                                    this.downloadTemplate(templateName, exportType);
                                    break;
                                case "config":
                                    this.goToConfigTemplate();
                                    break;
                                case "delete":
                                    this.goToDeleteTemplate();
                                    break;
                                default:
                                    cy.log('Opción no reconocida:', option);
                                    throw new Error(`Opción no reconocida: ${option}`);
                            }
                        } else {
                            cy.log('No se encontraron filas en la tabla');
                            throw new Error(`Template "${templateName}" not found in the table`);
                        }
                    });
            });
    }
    goTodocumentationTemplate(){
        this.selectMenuOptionRow("Template Documentation");
    }
    goToEditTemplate() {
        this.selectMenuOptionRow("Edit Template");
    }
    goToConfigTemplate() {
        this.selectMenuOptionRow("Configure Template");
    }
    downloadTemplate() {
        this.selectMenuOptionRow("Export Template");
    }

    selectMenuOptionRow(nameOption) {
        var optionXpath =
            '//div[@id="categorizedList"]/ul/li/a[@id="nav-sources-tab"]//ancestor::div[@id="categorizedList"]/descendant::div[@id="nav-templates"]//table/tbody/tr//button[@aria-haspopup="menu"]/following-sibling::ul//li//span[contains(text(),"' +
            nameOption +
            '")]';
        cy.xpath(optionXpath).should("be.visible");
        cy.xpath(optionXpath).first().click();
    }
    /**
     * This method is responsible to import a template if this is not exists
     * @param templateName: Name of the process
     * @param templatePath: Path of the process
     * @param parametersMapList: object list with config to process
     * @return nothing returns
     */
    verifyPresenceOfTemplateAndImportTemplate(
        templateName,
        templatePath,
        ) {
            var editBtn =
            '//div[@id="categorizedList"]/ul/li/a[@id="nav-sources-tab"]//ancestor::div[@id="categorizedList"]/descendant::div[@id="nav-templates"]//table/tbody/tr//button[@aria-haspopup="menu"]';
            cy.xpath(editBtn).should("be.visible");
            cy.xpath(selectors.searchBoxTemplate).type(`${templateName}`,{delay:150}).should("have.value", templateName);
            cy.xpath(selectors.searchBoxTemplate).type('{enter}');
            cy.get('[id="nav-templates"]>* [class="jumbotron jumbotron-fluid"]').should("not.be.visible");
            cy.xpath(selectors.templateTableBody, { timeout: 10000 })
            .then(($loadedTable) => {
                if ($loadedTable.find("tr").length <= 0) {
                    this.importTemplates(templatePath);
                    //Exception in import with configurations already exists
                    let modalSelector = "[id='importProccess___BV_modal_header_']";
                    utility.waitUntilElementAppear(modalSelector, 1);
                    cy.get("body").then($body => {
                        if ($body.find(modalSelector).length > 0) {
                            cy.xpath('//button[contains(text(),"Import as New")]').click();
                            cy.xpath('//button[contains(text(),"Import as New")]').should('not.exist');
                        }
                    })
                }
                if($loadedTable.find("tr").length===1){
                    cy.xpath(selectors.templateTable, { timeout: 10000 })
                    .find("td")
                    .then(($loadedTable) => {
                        if ($loadedTable.length === 1) {
                        this.importProcess(filePath, password);
                        //Exception in import with configurations already exists
                        let modalSelector = "[id='importProccess___BV_modal_header_']";
                        utility.waitUntilElementAppear(modalSelector, 1);
                        cy.get('body').then($body => {
                            if ($body.find(modalSelector).length > 0) {
                            cy.xpath('//button[contains(text(),"Import as New")]').click();
                            cy.xpath('//button[contains(text(),"Import as New")]').should('not.exist');
                        }
                    })
                    cy.xpath(selectors.importingBtn).should("not.exist");
                }
            });
        }
    });
}

    createProcessFromTemplate(templateName) {
        cy.get('#selectTemplate___BV_modal_body_').should('be.visible');
        cy.xpath(selectors.useTemplate).should('be.visible');
        //this.enterProcessName(templateName);
        //this.enterProcessDescription(description);
        //if (category != "") this.enterProcessCategory(category);
        //if (username != "") this.enterProcessManager(username);
        this.clickOnSaveInAddProcessModal();
        //cy.xpath(selectors.processRailBottomXpath).should("be.visible");
    }
    
    clickOnSaveInAddProcessModal() {
        cy.xpath(selectors.saveBtnInPopUp).click();
    }
    enterProcessName(templateName) {
        cy.get(selectors.nameTxtBx)
            .should("be.visible")
            .type(templateName, { delay: 200 })
            .should("have.value", templateName);
    }

    enterProcessDescription(description) {
        cy.get(selectors.descriptionTxtBx)
            .type(description)
            .should("have.value", description);
    }

    enterProcessManager(username) {
        cy.xpath(selectors.managerFieldXpath).click();
        cy.xpath(selectors.managerFieldTxtXpath)
            .type(username, { delay: 100 })
            .should("have.value", username)
            .type("{enter}");
    }

    enterProcessCategory(category) {
        cy.xpath(selectors.processCategoryFieldXpath).click();
        cy.xpath(selectors.processCategoryInputXpath).type(category, {
            delay: 200,
        });
        cy.xpath(
            selectors.selectCategoryListXpath.replace("categoryName", category)
        )
            .should("be.visible")
            .click();
    }
    searchTemplateFromProcess(templateName) {
        cy.xpath('//*[@aria-controls="nav-templates"]').should('be.visible');
        cy.xpath('//input[@class="pl-0 form-control"]').should("be.visible").type(templateName,{delay:300});
        cy.xpath('//input[@class="pl-0 form-control"]').type('{backspace}');
        cy.xpath('//div[@class="card template-select-card"]').should("be.visible",{delay:300});
        cy.xpath('//div[@class="card template-select-card"]').click();
        cy.xpath('//span[@class="badge category-badge mb-2 mr-1 badge-secondary badge-pill"]').should("be.visible");
	}
    
    /**
     * 
     * @param {string} path - template file path
     * @param {string} mode - `copy` or `update` options can be assigned
     */
    importTemplateAPI(path, mode = "copy") {
        let formData = new FormData();
        let win;
        return cy.fixture(path, null)
            .then(Cypress.Blob.arrayBufferToBlob)
            .then((fileBlob) => {
                formData.append("file", fileBlob);
                return cy.window();
            })
            .then((cyWin) => {
                win = cyWin;
                return win.ProcessMaker.apiClient.post('/templates/process/import/validation', formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
            })
            .then((response) => {
                const options = {};
                Object.keys(response.data.manifest).forEach(uuid => {
                    options[uuid] = {"mode": mode,"discardedByParent":false,"saveAssetsMode":"saveAllAssets"}
                });
                const optionsBlob = new Blob([JSON.stringify(options)], {
                    type: "application/json",
                });
                formData.append("options", optionsBlob);
                return win.ProcessMaker.apiClient.post('/template/process/do-import', formData);
            })
            .then(response => {
                return response.data.processId;
            });
    }

    //Create a template from a process
    createTemplatefromProcess(templateName,Description, version){
        cy.get(selectors.nameTxtBx).should('be.visible').type(templateName, {delay:200});
        cy.get(selectors.descriptionTemp).should('be.visible').type(Description, {delay:200});
        cy.get(selectors.versionTemp).should('be.visible').type(version);
        cy.get(selectors.saveTemp).should('be.visible').click();
    }

    load() {
        cy.wait(5000);
    }
}
