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
        cy.xpath(selectors.importButtonTemplates).first().click();
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
        cy.xpath(selectors.threePointsBtnXpathTemplate).should("be.visible");
        cy.xpath('//*[@id="templatesIndex"]').should('be.visible');
        
        cy.xpath(selectors.searchBoxTemplate)
            .type(`${templateName}`,{delay: 500})
            .should("have.value", templateName);
        cy.xpath(selectors.searchBoxTemplate).type('{enter}');
            cy.get('[id="nav-templates"]>* [class="jumbotron jumbotron-fluid"]').should("not.be.visible");
        cy.xpath(selectors.threePointsBtnXpathTemplate).first().click({ force: true });

        switch (option) {
            case "documentation":
                this.documentationTemplate();
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
        }
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
            cy.xpath(selectors.searchBoxTemplate).type(`${templateName}`,{delay:100}).should("have.value", templateName);
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
        cy.xpath('//*[@class="w-100 d-block"]').should('be.visible');
        cy.xpath('//input[@class="pl-0 form-control"]').should("be.visible").type(templateName,{delay:300});
        cy.xpath('//input[@class="pl-0 form-control"]').type('{backspace}');
        cy.xpath('//div[@class="card template-select-card"]').should("be.visible",{delay:300}).click();
        cy.xpath('//span[@class="badge category-badge mb-2 mr-1 badge-secondary badge-pill"]').should("be.visible");
	}
}
