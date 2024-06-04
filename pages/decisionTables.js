import selectors from "#selectors/decisionTables";
import { NavigationHelper } from "#helpers/navigationHelper";
const navHelper = new NavigationHelper();

export class DecisionTable {
    goToDecisionTab() {
        cy.get(selectors.tabDecisionTables).click();
    }

    goToCategoryTab() {
        cy.get(selectors.tabCategory).click();
    }

    //1.MAIN TABLE: DECISION TABLES
    //1.1 Search Decision table
    searchDecisionTable(decisionTableName) {
        cy.xpath(selectors.searchDTinput).should("be.visible").click();
        cy.xpath(selectors.searchDTinput).type(`${decisionTableName}{enter}`, { delay: 100 }).type(' {backspace}').should('have.value', decisionTableName);
        cy.get(selectors.loadingSpinnerDT).should('be.visible');
    }
    //1.2 +Table
    clickOnAddDecisionTable() {
        cy.get(selectors.addDTbutton).should('be.visible').click();
    }

    //Create Decision Table
    modalCreateDecisionTable({ nameValue, descriptionValue, category, option = "onlyRequiredFields" }) {
        this.clickOnAddDecisionTable();
        switch (option) {
            case "onlyRequiredFields":
                cy.xpath(selectors.uncategorized).should('be.visible');
                this.typeField(selectors.addDTnameField, nameValue);
                this.typeField(selectors.addDTdescriptionField, descriptionValue);
                break;
            case "allFields":
                cy.xpath(selectors.uncategorized).should('be.visible');
                this.typeField(selectors.addDTnameField, nameValue);
                this.typeField(selectors.addDTdescriptionField, descriptionValue);
                this.selectCategory(category);
                break;
        }
        this.clickOnSave();
    }

    selectCategory(nameCategory) {
        cy.xpath(selectors.labelCategory).should("be.visible").and("contain", "Category");
        cy.xpath(selectors.divContainerOptionCategory).click();
        cy.get(selectors.inputCategory).type(nameCategory).should('have.value', nameCategory);
        cy.xpath(selectors.wrapperCategory)
            .should('have.attr', 'aria-label')
            .and('equal', nameCategory + ". ");
        cy.get(selectors.inputCategory).type('{enter}');
    }

    verifyPresenceOfDecisionTableAndCreateDT(decisionTableName, { nameValue, descriptionValue, category, option = "onlyRequiredFields" }) {
        cy.xpath(selectors.menuDT).first().should('be.visible');
        this.searchDecisionTable(decisionTableName);
        cy.wait(2000);
        cy.xpath(selectors.tableDT)
            .find('td')
            .then(($loadedTable) => {
                if ($loadedTable.length === 1) {
                    this.modalCreateDecisionTable({ nameValue, descriptionValue, category, option: "onlyRequiredFields" });
                }
                else return;
            });
    }

    //1.3 Table
    //Menu options Decision Table
    searchDecisionTableAndSelectOptions(decisionTableName, option) {
        cy.xpath(selectors.tableDT).should('be.visible');
        cy.xpath(selectors.menuDT).should('be.visible');
        this.searchDecisionTable(decisionTableName);
        cy.xpath(selectors.menuDT).first().click();
        switch (option) {
            case "edit":
                this.clickOnEditDecisionTable();
                break;
            case "configure":
                this.clickOnConfigureDecisionTable();
                break;
            case "copy":
                this.clickOnCopyDecisionTable();
                break;
            case "export":
                this.clickOnExportDecisionTable();
                break;
            case "addToProject":
                this.clickOnAddToProjectDecisionTable();
                break;
            case "delete":
                this.clickOnDeleteDecisionTable();
                break;
        }
    }

    clickOnEditDecisionTable() {
        cy.xpath(selectors.editDTbutton).first().should('be.visible').click();
    }

    clickOnConfigureDecisionTable() {
        cy.xpath(selectors.configureDTbutton).first().should('be.visible').click();
    }

    clickOnCopyDecisionTable() {
        cy.xpath(selectors.copyDTbutton).first().should('be.visible').click();
    }

    clickOnAddToProjectDecisionTable() {
        cy.xpath(selectors.addToProjectDTbutton).first().should('be.visible').click();
    }

    clickOnExportDecisionTable() {
        cy.xpath(selectors.exportDTbutton).first().should('be.visible').click();
    }

    clickOnDeleteDecisionTable() {
        cy.xpath(selectors.deleteDTbutton).first().should('be.visible').click();
    }

    copyTable(decisionTableName, newNameDecisionTable) {
        this.searchDecisionTableAndSelectOptions(decisionTableName, 'copy');
        cy.get('#name').clear().type(newNameDecisionTable, { delay: 60 }).should('have.value', newNameDecisionTable);
        this.clickOnSave();
    }

    //1.3.1 Edit Decision Table
    //1.3.1.1 Table Inputs - Outputs
    //Edit Label
    editLabel(valueLabel, indexColumn) {
        cy.xpath('//th[text()="Description"]').should('be.visible');
        cy.xpath(`//div[@id="mainbody"]//table//tr[1]//th[${indexColumn}]`).type('{selectAll}').clear();
        cy.xpath(`//div[@id="mainbody"]//table//tr[1]//th[${indexColumn}]`).type(valueLabel).should('contain', valueLabel);
    }
    //Edit Variable
    editVariable(valueVariable, indexColumn) {
        cy.xpath('//th[text()="Description"]').should('be.visible');
        cy.xpath(`//div[@id="mainbody"]//table//tr[2]//td[${indexColumn}]`).type('{selectAll}').clear();
        cy.xpath(`//div[@id="mainbody"]//table//tr[2]//td[${indexColumn}]`).type(valueVariable).should('contain', valueVariable);
    }
    //Edit Cell
    editCell(value, indexRow, indexColumn) {
        cy.xpath('//table//tbody').should('contain', 'Description');
        cy.xpath(`//div[@id="mainbody"]//table//tr[2+${indexRow}]//td[1+${indexColumn}]`).click().type('{backspace}');
        cy.xpath(`//div[@id="mainbody"]//table//tr[2+${indexRow}]//td[1+${indexColumn}]`).type(value).should('contain', value);
    }
    //Inputs
    addInputsToRigthtAndValidate(dotColumn, numberColumnsToAdd) {
        for (let i = 0; i < numberColumnsToAdd; i++) {
            this.addColumn(dotColumn + i);
            cy.xpath(`//tbody//th[${dotColumn + i + 1}]`).should('contain', `Input Label ${i + 2}`);
        }
    }

    addInputsToLeftAndValidate(dotColumn, numberColumnsToAdd) {
        for (let i = 0; i < numberColumnsToAdd; i++) {
            this.addColumn(dotColumn);
            cy.xpath(`//tbody//th[${dotColumn + 1}]`).should('contain', `Input Label ${i + 2}`);
        }
    }

    //Outputs
    addOutputsToRigthtAndValidate(dotColumn, numberColumnsToAdd) {
        for (let i = 0; i < numberColumnsToAdd; i++) {
            this.addColumn(dotColumn + i);
            cy.xpath(`//tbody//th[${dotColumn + i + 1}]`).should('contain', `Output Label ${i + 2}`);
        }
    }

    addOutputsToLeftAndValidate(dotColumn, numberColumnsToAdd) {
        for (let i = 0; i < numberColumnsToAdd; i++) {
            this.addColumn(dotColumn);
            cy.log(dotColumn)
            cy.xpath(`//tbody//th[${dotColumn + 1}]`).should('contain', `Output Label ${i + 3}`);
        }
    }

    //ROWS (dotRowBotton is dot at the bottom of row )
    addRow(dotRowBottom) {
        cy.xpath(`//table//tr[2+${dotRowBottom}]//td[1]/div[@class="tdDivDot"]`).click();
    }

    addRowsAndValidation(dotRow, numberRowsToAdd) {
        for (let i = 0; i < numberRowsToAdd; i++) {
            this.addRow(dotRow + i);
            cy.xpath(`//tbody//tr[2+${dotRow + i}]//td[1]`).should('contain', `${dotRow + i}`);
        }
    }

    openMenuRow(numRow) {
        cy.xpath(`//table//tr[${2 + numRow}]//td[1]`).rightclick();
        cy.get(selectors.menuRow).should('be.visible');
    }

    addRowAbove(numRow) {
        this.openMenuRow(numRow);
        cy.xpath(selectors.addRowAbove).click();
    }

    addRowBelow(numRow) {
        this.openMenuRow(numRow);
        cy.xpath(selectors.addRowBelow).click();
    }

    moveRowAbove(numRow) {
        this.openMenuRow(numRow);
        cy.xpath(selectors.moveRowAbove).click();
    }

    moveRowBelow(numRow) {
        this.openMenuRow(numRow);
        cy.xpath(selectors.moveRowBelow).click();
    }

    removeRow(numRow) {
        this.openMenuRow(numRow);
        cy.xpath(selectors.removeRow).click();
        cy.xpath('//button[contains(text(),"Confirm")]').click();
    }

    //COLUMNS
    addColumn(indexColumn) {
        cy.xpath(`//div[@id="mainbody"]//table//tr[1]//th[${indexColumn}]/div[@class="thDivDot"]`).click();
    }

    openMenuColumn(labelColumn) {
        cy.xpath(`//div[contains(text(),"${labelColumn}")]//parent::th`).rightclick();
        cy.get(selectors.menuColumn).should('be.visible');
    }

    addColumnLeft(abelColumn) {
        this.openMenuColumn(abelColumn);
        cy.xpath(selectors.addColumnLeft).click();
    }

    addColumnRight(labelColumn) {
        this.openMenuColumn(labelColumn);
        cy.xpath(selectors.addColumnRight).click();
    }

    moveColumnLeft(labelColumn) {
        this.openMenuColumn(labelColumn);
        cy.xpath(selectors.moveColumnLeft).click();
    }

    moveColumnRight(labelColumn) {
        this.openMenuColumn(labelColumn);
        cy.xpath(selectors.moveColumnRight).click();
    }

    removeColumn(labelColumn) {
        this.openMenuColumn(labelColumn);
        cy.xpath(selectors.removeColumn).click();
        cy.xpath('//button[contains(text(),"Confirm")]').click();
    }

    //1.3.1.2 Top menu
    importDMNinEditDecisionTable(filePath) {
        cy.get(selectors.importButtonInEditDT).click();
        cy.get('[class="uploader"]').should('contain', 'Drag file here');
        cy.xpath(selectors.importDMNBtn).should('be.visible');
        cy.xpath(selectors.selectFileFromComputer).attachFile(filePath);
        cy.xpath(selectors.importDMNBtn).click();
    }

    exportDMNinEditDecisionTable() {
        cy.get(selectors.exportButtonInEditDT).click();
    }

    saveInEditDecisionTable() {
        cy.get(selectors.saveButtonInEditDT).click();
    }

    closeInEditDecisionTable() {
        cy.get(selectors.closeButtonInEditDT).click();
    }

    //1.3.1.3 Autosave
    //1.3.1.4 Preview
    clickOnRunBtn() {
        cy.wait(1000)
        cy.xpath(selectors.runBtn).should('be.visible');
        cy.xpath(selectors.runBtn).click({ force: true });
    }

    clickOnSampleInput() {
        cy.get(selectors.sampleInput).should('be.visible');
        cy.get(selectors.sampleInput).click();
    }

    clickOnOutput() {
        cy.get(selectors.output).should('be.visible');
        cy.get(selectors.output).click();
    }

    clickOnFileImport() {
        cy.get(selectors.fileImport).click({ force: true });
    }
    //Sample Input preview
    writeValueInsideQuotes(inputVarName, value) {
        cy.xpath(`//span[text()=\'"${inputVarName}"\']/following-sibling::span[2]`).type(value, { delay: 100 });
    }

    writeValueWithoutQuotes(inputVarName, value) {
        cy.xpath(`//span[text()=\'"${inputVarName}"\']/following-sibling::span[2]`).type(`{backspace}${value}{del}`);
    }

    assignStringValueToVariableInSampleInput(inputVarName, value) {
        this.writeValueInsideQuotes(inputVarName, value);
    }

    assignNumberValueToVariableInSampleInput(inputVarName, value) {
        this.writeValueWithoutQuotes(inputVarName, value);
    }

    assignBooleanValueToVariableInSampleInput(inputVarName, value) {
        this.writeValueWithoutQuotes(inputVarName, value);
    }

    assignDateValueToVariableInSampleInput(inputVarName, value) {
        this.writeValueInsideQuotes(inputVarName, value);
    }

    assignDateTimeValueToVariableInSampleInput(inputVarName, value) {
        this.writeValueInsideQuotes(inputVarName, value);
    }

    assignTimeValueToVariableInSampleInput(inputVarName, value) {
        this.writeValueInsideQuotes(inputVarName, value);
    }

    addNewInputVarAndValueInSampleInput(lastValue, keyValue) {
        cy.xpath(`//span[text()[normalize-space()='"${lastValue}"']]`).type(`{end},\n${keyValue}`);
    }
    addKeyValueInSampleInput(keyValue) {
        cy.get('.view-lines').click().type('{backspace}').type('{backspace}').type(',').type('{enter}');
        cy.get('.view-lines').type(`${keyValue}}`, { delay: 200 });
    }

    //Output preview

    //File Import

    clickOnDownloadFormat() {
        cy.xpath(selectors.downloadFormatBtn).should('be.visible');
        cy.xpath(selectors.downloadFormatBtn).click();
    }

    clickOnUploadFile() {
        cy.get(selectors.uploadFileBtn).click({ force: true });
    }

    deleteUploadFile() {
        cy.xpath(selectors.deleteUploadedFile).should('be.visible');
        cy.xpath(selectors.deleteUploadedFile).click();
    }

    clickOnLoadBtn() {
        cy.xpath(selectors.loadBtn).should('be.visible');
        cy.xpath(selectors.loadBtn).click({ force: true });
    }

    clickOnCancelBtn() {
        cy.xpath(selectors.cancelBtn).should('be.visible');
        cy.xpath(selectors.cancelBtn).click();
    }

    confirmUploadFile() {
        cy.xpath(selectors.confirmBtn).should('be.visible');
        cy.xpath(selectors.confirmBtn).click();
    }

    uploadFile(filePath, fileName) {
        cy.get(selectors.uploadFile).selectFile(filePath, { force: true });
        cy.get(selectors.nameFileUploaded).should('contain', fileName);
        this.clickOnLoadBtn();
        cy.xpath(selectors.labelConfirm).should('be.visible');
        this.confirmUploadFile();
    }

    //1.3.1.5 Type of data
    selectOption(variableType) {
        cy.xpath(`//div[@class="context-menu"]//ul//li[normalize-space()="${variableType}"]`).should('be.visible');
        cy.xpath(`//div[@class="context-menu"]//ul//li[normalize-space()="${variableType}"]`).click();
    }

    selectTypeOfVariable(numColumn, variableType) {
        cy.get('[title="Right click to switch."]').eq(`${numColumn}-1`).rightclick();
        switch (variableType) {
            case "boolean":
                this.selectOption('boolean');
                break;
            case "date":
                this.selectOption('date');
                break;
            case "datetime":
                this.selectOption('datetime');
                break;
            case "number":
                this.selectOption('number');
                break;
            case "string":
                this.selectOption('string');
                break;
            case "time":
                this.selectOption('time');
                break;
            case "formula":
                this.selectOption('formula');
                break;
            default:
                break;
        }
    }

    openFormulaModal() {
        cy.xpath(selectors.formulaBtn).click();
        cy.get(selectors.modalFormula).should('be.visible');
        cy.xpath(selectors.labelFormula).should('be.visible');
    }

    editFormula(numColumn, formula) {
        this.selectTypeOfVariable(numColumn, 'formula');
        this.openFormulaModal();
        cy.wait('[class="card-body"]').should('be.visible');
        cy.xpath('(//div[@class="editor"]//div[@class="view-lines monaco-mouse-cursor-text"]//span)[2]').type(formula).should('have.value', formula);
        this.clickOnOkBtnInModalFormula();
    }

    clickOnOkBtnInModalFormula() {
        cy.xpath(selectors.okBtn).should('be.visible');
        cy.xpath(selectors.okBtn).click();
    }

    clickOnCancelBtnInModalFormula() {
        cy.xpath(selectors.cancelBtn).should('be.visible');
        cy.xpath(selectors.cancelBtn).click();
    }

    //This method adds variables defined in Formula and assigns each one a value for testing
    addVariableFromFormulaToSampleInput() {
        this.addNewInputVarAndValueInSampleInput(lastValue, keyValue);
    }

    //1.3.2 Configure Decision Table
    configureNameOfDecisionTable(newNameDT) {
        this.updateField(selectors.nameFieldInconfigureDT, newNameDT);
    }

    configureDescriptionOfDecisionTable(newDescriptionDT) {
        this.updateField(selectors.descriptionFieldInconfigureDT, newDescriptionDT);
    }

    saveInConfigureDT() {
        cy.xpath(selectors.saveButtonInconfigureDT).click();
    }

    cancelInConfigureDT() {
        cy.xpath(selectors.cancelButtonInconfigureDT).click();
    }

    configureDecisionTable({ newNameDT, descriptionDT, category, option }) {
        switch (option) {
            case "name":
                this.configureNameOfDecisionTable(newNameDT);
                break;
            case "description":
                this.configureDescriptionOfDecisionTable(descriptionDT);
                break;
            case "category":
                this.selectCategory(category);
                break;
            case "nameAndDescription":
                this.configureNameOfDecisionTable(newNameDT);
                this.configureDescriptionOfDecisionTable(descriptionDT);
                break;
            case "all":
                this.configureNameOfDecisionTable(newNameDT);
                this.configureDescriptionOfDecisionTable(descriptionDT);
                this.selectCategory(category);
                break;
        }
        this.saveInConfigureDT();
    }

    //1.3.3 Copy Decision Table
    copyDecisionTable(){
        this.clickOnSave();
        cy.get(selectors.alert).should('contain','The Table was duplicated.');
    }

    //1.3.4 Add to project
    //1.3.5 Export Decision Table (in JSON format)
    exportDecisionTable(decisionTableName) {
        this.searchDecisionTableAndSelectOptions(decisionTableName, 'export');
        cy.xpath('//button[contains(text(),"Download")]').click();
    }

    verifyDecisionTableInDownloadsFolder(path, nameDecisionTable) {
        cy.readFile(path).should("exist");
        cy.readFile(path).its("decisionTable").its("name").should("eq", nameDecisionTable);
    }
    //1.3.6 Delete Decision Table
    deleteDecisionTable() {
        cy.xpath(selectors.confirmDeleteButton).click();
        cy.get(selectors.alert).should('contain','The Decision Table was deleted.');
    }

    //1.3 Import Decision Table
    clickOnImportDecisionTable() {
        cy.get(selectors.importDTbutton).click();
    }

    importDecisionTable(filePath){
        this.clickOnImportDecisionTable();
        cy.get('[id="importTable"]').find('h5').should('contain','Import Decision Table');
        cy.xpath(selectors.importBtn).should('be.visible');
        cy.get(selectors.inputToFileUpload).attachFile(filePath);
        cy.xpath(selectors.importBtn).click();
    }

    verifyPresenceOfDecisionTableAndImportDT(decisionTableName, filePath) {
        this.searchDecisionTable(decisionTableName);
        cy.wait(2000);
        cy.xpath(selectors.tableDT)
            .find('td')
            .then(($loadedTable) => {
                if ($loadedTable.length === 1) {
                    this.importDecisionTable(filePath);
                }
                else return;
            });
    }

    //1.5 Pagination Decision tables
    selectItemsPerPageOnPaginationDT(option, numberItems) {
        cy.xpath(selectors.selectPaginationInDT).should('be.exist');
        cy.xpath(selectors.selectPaginationInDT).select(option, { force: true });
        cy.xpath(selectors.selectPaginationInDT).should('have.value', option);
        cy.get(selectors.loadingSpinnerDT).should('be.visible');
        cy.get(selectors.loadingSpinnerDT).should('not.be.visible');
        cy.xpath(selectors.tableDT).find('tr').then(($Rows) => {
            expect($Rows).to.have.length(numberItems);
        });
    }

    countTotalPages() {
        cy.xpath('(//i[@class="fas fa-angle-double-right"])[1]').should('be.visible').click();
        this.loadJumbotron();
        cy.xpath('(//div[@class="pagination-nav-item item active large"])[1]').invoke('text').then(($finalPage) => {
            cy.log(`Total Page is: ${parseInt($finalPage)}`);
        });
    }

    countTotalItemInTable() {
        cy.xpath(selectors.tableDT).find('tr').then(($items) => {
            cy.log(`Total items is: ${$items.length}`);
        });
    }

    completedItemsInCurrentPage() {
        let timeStamp = new Date().getTime();
        navHelper.navigateToDecisionTables();
        this.clickOnLastPage();
        this.loadJumbotron();
        cy.xpath(selectors.tableDT).find('tr').then(($items) => {
            cy.log(`Total rows is: ${$items.length}`);
            cy.log(`Need to create: ${10 - $items.length} rows`);
            for (let index = 0; index < 10 - $items.length; index++) {
                navHelper.navigateToDecisionTables();
                this.modalCreateDecisionTable({ nameValue: "DT" + index + timeStamp, descriptionValue: "Description", option: "onlyRequiredFields" });
            }
        });
    }

    addItems(numberItems, { decisionTableName, description, option = "onlyRequiredFields" }) {
        for (let index = 0; index < numberItems; index++) {
            this.modalCreateDecisionTable({ nameValue: decisionTableName + index, descriptionValue: description, option: "onlyRequiredFields" })
            navHelper.navigateToDecisionTables();
        }
    }

    clickOnLastPage() {
        cy.xpath('(//i[@class="fas fa-angle-double-right"])[1]').scrollIntoView().should('be.visible').click({ force: true });
        cy.get(selectors.loadingSpinnerDT).should('be.visible');
        cy.get(selectors.loadingSpinnerDT).should('not.be.visible');
    }

    clickOnFirstPage() {
        cy.xpath('(//i[@class="fas fa-angle-double-left"])[1]').should('be.visible').click();
    }


    //3.Basic to MODALS
    typeField(locator, value) {
        cy.xpath(locator).should("be.visible");
        cy.xpath(locator).type(value).should('have.value', value);
    }

    updateField(locator, value) {
        cy.xpath(locator).click().clear().type(value).should('have.value', value);
    }

    clickOnSave() {
        cy.xpath(selectors.addDTsaveButton).click();
    }

    clickOnCancel() {
        cy.xpath(selectors.addDTcancelButton).click();
    }

    verifyDecisionTableWasCreated(nameValue) {
        cy.get('i[class="fas fa-save"]').should('be.visible');
        cy.url().then(url => {
            let idDT = url.split('/')[6].trim();
            cy.url().should('eq', `${Cypress.config().baseUrl}/designer/decision-tables/table-builder/${idDT}/edit`);
        });
        cy.get('[id="main"]').should('contain', nameValue);
    }

    verifyPresenceOfDecisionTable(decisionTableName) {
        cy.xpath(selectors.menuDT).first().should('be.visible');
        this.searchDecisionTable(decisionTableName);
        this.loadJumbotron();
        cy.xpath(selectors.tableDT)
            .find('td')
            .then(($loadedTable) => {
                if ($loadedTable.length > 1) {
                    cy.log('Decision Table exist')
                }
                else return;
            });
    }

    loadJumbotron() {
        cy.get('#decisionTableIndex > .data-table > .jumbotron > .container > :nth-child(1)').should("be.visible");
        cy.get('#decisionTableIndex > .data-table > .jumbotron > .container > :nth-child(1)').should("not.be.visible");
    }

    loadClear() {
        cy.wait(2000);
    }

    loadPreview() {
        cy.wait(2000);
    }

    //2.MAIN TABLE: CATEGORIES
    //2.1 Search Category
    searchCategory(categoryName) {
        cy.xpath(selectors.searchCategoryInput).should("be.visible").click()
        cy.xpath(selectors.searchCategoryInput).type(categoryName).should('have.value', categoryName);
        cy.xpath(selectors.searchCategoryButton).click();
        cy.get(selectors.loadingSpinnerDT).should('be.visible');
        cy.get(selectors.loadingSpinnerDT).should('not.be.visible');
    }

    //2.2 +Category
    clickOnAddCategory() {
        cy.get(selectors.addCategoryButton).click();
    }
    modalCreateCategory(nameValue, option = 'active') {
        //Click on Add Decision Table
        this.clickOnAddCategory();
        //Fill Category Name
        this.typeField(selectors.nameFieldInCreateCategory, nameValue);
        //Select Status active or inactive 
        this.selectStatus(option);
        this.clickOnSave();
    }

    selectStatus(Status) {
        switch (Status) {
            case "active":
                cy.get('select[id="status"]').select('Active').should('have.value', 'ACTIVE')
                break;
            case "inactive":
                cy.get('select[id="status"]').select('Inactive').should('have.value', 'INACTIVE')
                break;
        }
    }

    //2.3 Table category
    searchCategoryAndSelectOptions(categoryName, option) {
        cy.xpath(selectors.editDTbutton).should("be.visible");
        cy.xpath(selectors.exportDTbutton).should("be.visible");
        cy.xpath(selectors.searchCategoryInput)
            .type(categoryName)
            .should("have.value", categoryName);
        cy.get(selectors.loadingSpinnerDT).should('be.visible');
        cy.get(selectors.loadingSpinnerDT).should('not.be.visible');
        switch (option) {
            case "edit":
                this.clickOnEditCategory();
                break;
            case "delete":
                this.clickOnDeleteCategory();
                break;
        }
    }

    //2.3.1 Edit category
    clickOnEditCategory() {
        cy.xpath(selectors.editCategorybutton).first().should('be.visible').click();
    }

    editCategoryName(newNameToCategory) {
        this.updateField(selectors.nameFieldInCreateCategory, newNameToCategory);
    }

    modalEditCategory({ newNameToCategory, newStatus, optionToEdit = 'onlyName' }) {
        switch (optionToEdit) {
            case "onlyName":
                this.editCategoryName(newNameToCategory);
                break;
            case "onlyStatus":
                this.selectStatus(newStatus);
                break;
            case "nameAndStatus":
                this.editCategoryName(newNameToCategory);
                this.selectStatus(newStatus);
        }
        this.clickOnSave();
    }

    //2.3.2 Delete category
    clickOnDeleteCategory() {
        cy.xpath(selectors.deleteCategorybutton).first().should('be.visible').click();
    }

    deleteCategoryTable() {
        cy.xpath(selectors.confirmDeleteButton).click();
    }

    //2.4 Pagination Category
    selectItemsPerPageOnPaginationCategory(option, numberItems) {
        cy.xpath(selectors.selectPaginationInCategory).select(option).should('have.value', option);
        cy.get(selectors.loadingSpinnerDT).should('be.visible');
        cy.get(selectors.loadingSpinnerDT).should('not.be.visible');
        cy.xpath(selectors.tableCategory).find('tr').then(($Rows) => {
            expect($Rows).to.have.length(numberItems);
        });
    }
}
