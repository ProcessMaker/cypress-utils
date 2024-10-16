import selectors from "#selectors/projects";
import "#support/commands";
import {Scripts} from "./scripts";

const scripts = new Scripts();
export class PMProjects {
    /**
     * This method is responsible to create a new Project.
     * @param name: name of the new PM Projects
     * @param categories: categories of the new PM Projects
     * @return {void}
     */
    createPMProject(name, categories = "", members = "") {
        //cy.xpath('//button[@class="btn mb-3 mb-md-0 ml-md-2 btn-secondary"]').should("be.visible").click();
        this.enterPMProjectName(name);
        categories && this.enterPMProjectCategory(categories);
        members && this.enterPMProjectMembers(members);
        this.clickOnSaveProjects();
    }
    clickOnSaveProjects() {
        cy.xpath(selectors.addButtonProject).click();
    }

    selectProjectInProcess(name) {
        cy.xpath(selectors.projectCategoryFieldXpath)
            .first()
            .should("be.visible");
        cy.xpath(selectors.projectCategoryFieldXpath).click();
        cy.xpath(selectors.projectCategoryFieldXpath).type(name);
        cy.xpath(selectors.projectCategoryFieldXpath).type("{enter}", {delay: 120});
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(2000);
    }
    selectProjectInScreen(name) {
        cy.xpath(selectors.projectCategoryFieldXpath)
            .first()
            .should("be.visible");
            cy.xpath(selectors.projectCategoryFieldXpath).click();
            cy.xpath(selectors.projectCategoryFieldXpath).should("be.visible").type(name, {delay: 100});         
            cy.xpath(selectors.projectName.replace('projectName', name)).should('be.visible').first().click({force: true});
    }
    selectProjectInScript(name) {
        cy.xpath(selectors.projectCategoryFieldXpath)
            .first()
            .should("be.visible");
            cy.xpath(selectors.projectCategoryFieldXpath).click();
            cy.xpath(selectors.projectCategoryFieldXpath).should("be.visible").type(name, {delay: 100});         
            cy.xpath(selectors.projectName.replace('projectName', name)).should('be.visible').first().click({force: true});

    }
    selectProjectInDataConnector(name) {
        cy.xpath(selectors.projectCategoryFieldXpath)
            .first()
            .should("be.visible");
        cy.xpath(selectors.projectCategoryFieldXpath).click();
        cy.xpath(selectors.projectCategoryFieldXpath).should("be.visible").type(name, {delay: 100});
        cy.xpath(selectors.projectName.replace('projectName', name)).should('be.visible').first().click({force: true});
    }

    selectProjectInDecisionTable(name) {
        cy.xpath(selectors.projectCategoryFieldXpath)
            .first()
            .should("be.visible");
        cy.xpath(selectors.projectCategoryFieldXpath).click();
        cy.xpath(selectors.projectCategoryFieldXpath).should("be.visible").type(name, {delay: 100});
        cy.xpath(selectors.projectName.replace('projectName', name)).should('be.visible').first().click({force: true});
    }

    selectAssetInsideProject(name) {
        cy.xpath(selectors.projectCategoryFieldXpath)
            .first()
            .should("be.visible");
            cy.xpath(selectors.projectAsset).click();
            cy.xpath(selectors.projectAsset).should("be.visible").type(name, {delay: 100});         
            cy.xpath(selectors.projectName.replace('projectName', name)).should('be.visible').first().click({force: true});
    }
    enterPMProjectCategory(categories) {
        const categoryList = categories.split(",");
        categoryList.forEach((category) => {
            cy.xpath(selectors.projectCategoryFieldXpath).click();
            cy.xpath(selectors.projectCategoryFieldXpath).type(
                `${category}{enter}`,
                {
                    delay: 200,
                }
            );
        });
    }

    enterPMProjectMembers(members, selector = selectors.projectMembersSelect) {
        const membersList = members.split(",");
        membersList.forEach((member) => {
            cy.get(selector).click();
            cy.get(selector).type(`${member}{enter}`, {
                delay: 200,
            });
        });
    }

    enterPMProjectName(name) {
        cy.xpath(selectors.nameAddProject).should("be.visible").type(name, { delay: 200 }).should("have.value", name);
    }

    createCategoryProjects(categoryName) {
        this.createCategoryProject();
        this.enterCategoryName(categoryName);
        this.clickOnSaveCategoryProjects();
    }

    enterCategoryName(categoryName) {
        cy.xpath(selectors.nameCategory)
            .should("be.visible")
            .type(categoryName, { force: true })
            .should("have.value", categoryName);
    }

    createCategoryProject() {
        cy.xpath(selectors.createCategoryProject).click();
    }
    clickOnSaveCategoryProjects() {
        cy.xpath(selectors.saveBtnCatProjects).click();
    }

    searchCategoryProjects(categoryName) {
        var editBtn =
            '//*[@id="categories-listing"]//button[@aria-haspopup="menu"]';
        cy.get('#projectsCategorizedList').should("be.visible");
        cy.xpath(editBtn).should("be.visible");
        cy.xpath(selectors.searchCatProjects).should("be.visible");
        cy.xpath(selectors.searchCatProjects).type(`${categoryName}{enter}`).should("have.value", categoryName);
        cy.xpath(selectors.searchCatProjects).type(' ').type('{backspace}');
        cy.xpath(editBtn).first().click({ force: true });
        
    }

    selectMenuOptionRowCategory(nameOption) {
        var optionCatXpath =
            '//*[@id="categories-listing"]/div[2]/div[2]/table/tbody/tr[1]/td[6]/following-sibling::ul//li//span[contains(text(),"' +
            nameOption +
            '")]';
        cy.xpath(optionCatXpath).should("be.visible");
        cy.xpath(optionCatXpath).first().click();
    }

    searchProjects(name) {
        const tableProject = '[data-cy="project-listing-table"]';
        const editBtnProject =
            '//*[@id="projectList"]/div[2]/div/table/tbody//button[@aria-haspopup="menu"]';

        cy.get(tableProject).should("be.visible");
        cy.xpath(selectors.searchProjects).should("be.visible");
        cy.xpath(selectors.searchProjects).type(`${name}{enter}`).should("have.value", name);
        cy.xpath(selectors.searchProjects).type(' ').type('{backspace}');
        cy.xpath(editBtnProject).first().click({ force: true });
        this.selectMenuOptionRowProjects("Open");
    }

    selectMenuOptionRowProjects(nameOption2) {
        const optionCatXpath2 = `//*[@id="projectList"]/div[2]/div/table/tbody//button[@aria-haspopup="menu"]/following-sibling::ul//li//span[contains(text(),"${nameOption2}")]`;
        cy.xpath(optionCatXpath2).should("be.visible").first().click();
    }

    selectMenuOptionScreenProjects(nameOptionScreen) {
        const optionCatXpath2 = `//div[@data-cy="asset-listing-table"]//button[@aria-haspopup="menu"]/following-sibling::ul//li//span[contains(text(),"${nameOptionScreen}")]`;
        cy.xpath(optionCatXpath2).should("be.visible").first().click();
    }

    selectMenuOptionScriptProjects(nameOptionScript) {
        const optionCatXpath2 = `//div[@data-cy="asset-listing-table"]//button[@aria-haspopup="menu"]/following-sibling::ul//li//span[contains(text(),"${nameOptionScript}")]`;
        cy.xpath(optionCatXpath2).should("be.visible").first().click();
    }

    searchProjectsAndSelectOptions(
        projectName,
        option = "config",
        exportType = "basic",
        passwordOption = "no",
        password = "123456"
    ) {
        
        {
            cy.xpath(selectors.threePointsBtnXpathProjects).should("be.visible");
            cy.xpath(selectors.searchProjects).type(`${projectName}{enter}`).should("have.value", projectName);
            //cy.get(selectors.loadingSpinnerProcess).should("be.visible");
            cy.xpath(selectors.threePointsBtnXpathProjects).should("be.visible");
            cy.xpath(selectors.threePointsBtnXpathProjects).first().should("be.visible");
            cy.xpath(selectors.threePointsBtnXpathProjects).first().click({force:true});
        
        }
        //cy.xpath('//td//a[contains(text(),"'+projectName+'")]').should("be.visible");
        
        switch (option) {
            case "open":
                this.openProject();
                break;
            case "config":
                this.goToConfigProject();
                break;
            case "delete":
                this.deleteProject();
                break;
            case "export":
                this.exportProject(
                    projectName,
                    exportType,
                    passwordOption,
                    password
                );
                break;
            default:
                throw new Error("Invalid option provided");
        }
    }

    openProject() {
        this.selectMenuOptionRowProjects("Open");
    }

    goToConfigProject() {
        //cy.xpath(selectors.configctrlBtn).click();
        this.selectMenuOptionRowProjects("Configure");
    }

    deleteProject() {
        this.selectMenuOptionRowProjects("Delete");
    }

    editScreen() {
        this.selectMenuOptionScreenProjects("Edit Screen");
    }

    configScreen() {
        this.selectMenuOptionScreenProjects("Configure");
    }
    addScreenProject() {
        this.selectMenuOptionScreenProjects("Add to Project");
    }
    exportAssetInProject() {
        this.selectMenuOptionScreenProjects("Export");
    }
    deleteAssetInProject() {
        this.selectMenuOptionScreenProjects("Delete");
    }

    editScript() {
        this.selectMenuOptionScriptProjects("Edit Script");
    }
    configScript() {
        this.selectMenuOptionScriptProjects("Configure");
    }
    addScriptProject() {
        this.selectMenuOptionScriptProjects("Add to Project");
    }
    deleteScriptProject() {
        this.selectMenuOptionScriptProjects("Delete");
    }

    exportProject(
        projectName,
        exportType = "basic",
        passwordOption = "no",
        password = "123456"
    ) {
        this.selectMenuOptionRowProjects("Export");
        if (exportType === "basic") {
            this.performBasicExport();
        } else {
            this.performCustomExport({ passwordOption, password });
        }
        cy.url().should("include", "/designer/projects/");
        const snakeCaseName = this.toSnakeCase(projectName);
        const expectedFilename = `${snakeCaseName}.json`;
        cy.readFile(`cypress/downloads/${expectedFilename}`).should("exist");
    }
    performBasicExport() {
        cy.xpath(selectors.exportButton).click();
    }
    performCustomExport({ passwordOption, password }) {
        if (passwordOption === "yes") {
            this.setPassword(password);
        }
        cy.xpath(selectors.exportButton).click();
    }
    setPassword(password) {
        cy.xpath(selectors.setPasswordFieldXpath).type(password, { delay: 50 });
        cy.xpath(selectors.confirmPasswordFieldXpath).type(password, {
            delay: 50,
        });
    }
    createCategories(numCategories) {
        const createdCategories = [];
        for (let i = 0; i < numCategories; i++) {
            const name = "Category " + Math.floor(Math.random() * 1000000);
            this.createCategoryProjects(name);
            createdCategories.push(name);
        }

        return createdCategories.join(", ");
    }
    importProjects(projectPath) {
        cy.xpath(selectors.importButtonProject).first().click();
        cy.xpath(selectors.inputToFileUploadProjects).attachFile(projectPath);
        cy.xpath(selectors.importBtnProjects)
            .parent()
            .should("not.have.attr", "disabled", "disabled");
        cy.xpath(selectors.importBtnProjects).click();
        cy.get(selectors.loadingProcessSpinner).should("not.exist");
    }
    clickOnImportButton() {
        cy.get(selectors.importProcessBtn).click();
        cy.get(selectors.browseBtn).should("be.visible");
    }

    clickOnAddProjectButton() {
        cy.xpath(selectors.addProject).should("be.visible").click();
    }

    toSnakeCase(str) {
        return str
            .toLowerCase()
            .replace(/ /g, "_")
            .replace(/[^a-z0-9_]/g, "");
    }

    assetSetValidationInProject(assetList=[]){
        let len = assetList.length;
        for (var i = 0; i < len; i++) {
        cy.xpath(("//td/a[contains(text(),'asset')]").replace('asset',assetList[i])).should('be.visible');
        }
    }

    verifyPresenceOfProjectAndImportProject(nameProject, projectPath) {
            var editBtn =
            '//div[@id="projectsCategorizedList"]/ul/li/a[@id="nav-sources-tab"]//ancestor::div[@id="projectsCategorizedList"]/descendant::div[@id="projectList"]//table/tbody/tr//button[@aria-haspopup="menu"]';
            cy.xpath(editBtn).should("be.visible");
            cy.xpath(selectors.searchProjects)
        .type(`${nameProject}`, {delay:60})
        .should("have.value", nameProject);
        cy.xpath(selectors.searchProjects).type('{enter}');
        cy.wait(2000);
        cy.xpath(selectors.loadingSpinnerProject).should("not.be.visible");
        cy.xpath('//table[@class="vuetable table table-hover table-responsive text-break"]//tbody//tr', { timeout: 10000 })
        .find("td")
        .then(($loadedTable) => {
            if ($loadedTable.length === 1) {
                this.importProjects(projectPath);
            } else return;
        });
    }
    verifyPresenceOfProjectAndCreate(project) {
        var editBtn =
        '//div[@id="main"]//div[@id="projectList"]//tbody//button[@aria-haspopup="menu"]';
        cy.xpath(editBtn).should("be.visible");
        cy.xpath(selectors.searchProjects).type(`${project}`, {delay:60}).should("have.value", project);
        cy.xpath(selectors.searchProjects).type('{enter}');
        cy.xpath(selectors.loadingSpinnerProject).should('be.visible');
        cy.wait(3000);
        cy.xpath(selectors.loadingSpinnerProject).should('not.be.visible');
        cy.xpath('//table[@class="vuetable table table-hover table-responsive text-break"]//tbody//tr', { timeout: 10000 })
        .find("td").then(($loadedTable) => {
        if ($loadedTable.length === 1) {
            cy.xpath('//button[@class="btn mb-3 mb-md-0 ml-md-2 btn-secondary"]').should("be.visible").click();
            this.createPMProject(project);
        } else return;
    });
}
    addAssetScriptInProjects(nameScript,descriptionScript){
        cy.get(selectors.addAssetButton).should("be.visible").click();
        cy.xpath(selectors.addScriptAssetButton).click();
        cy.get(selectors.newAssetButton).click();
        cy.xpath("//div[@id='createScript___BV_modal_content_']//input[@name='title']").should("be.visible");
        scripts.fillFields(
            nameScript,
            descriptionScript,
            "admin",
            "Admin User",
            "PHP Executor",
            60,
            4,
            10,
            true,
            true
        );
        scripts.pressSaveScript();
    }

    searchAssetInProject(nameAssert){
        cy.get("[aria-label='Advanced Search (PMQL)']").should("be.visible");
        cy.get("[aria-label='Advanced Search (PMQL)']").type(nameAssert).should("have.value",nameAssert);
        cy.get("[aria-label='Advanced Search (PMQL)']").type("{enter}");
        cy.wait(3000);
    }

    searchAsset(nameAssert){
        cy.get("[aria-label='Search PM']").should("be.visible");
        cy.get("[aria-label='Search PM']").type(nameAssert).should("have.value",nameAssert);
        cy.get("[aria-label='Search PM']").type("{enter}");
        
        cy.wait(3000);
    }

    searchAssetScreenAndSelectOptions(
        nameAssert,
        option = "config",
        exportType = "basic",
        passwordOption = "no",
        password = "123456"
    ) {
        cy.xpath(selectors.searchAssetScreenInProject)
            .type(`${nameAssert}{enter}`,{ delay: 100 })
            .should("have.value", nameAssert);
        cy.xpath(selectors.threePointsScreenProjects).should("be.visible");
        cy.xpath(selectors.threePointsScreenProjects).first().should("be.visible");
        cy.xpath(selectors.projectsearch.replace('project', nameAssert)).should('be.visible');
        cy.xpath(selectors.threePointsScreenProjects).first().click();
        switch (option) {
            case "EditScreen":
                this.editScreen();
                break;
            case "ConfigScreen":
                this.configScreen();
                break;
            case "addScreenProject":
                this.addScreenProject();
                break;
            case "exportAsset":
                this.exportAssetInProject();
                break;
            case "deleteScreenAsset":
                    this.deleteAssetInProject();
                    break; 

        }
    }

    searchAssetScriptAndSelectOptions(
        nameAssert,
        option = "config",
        exportType = "basic",
        passwordOption = "no",
        password = "123456"
    ) {
        cy.xpath(selectors.searchAssetScriptInProject)
            .type(`${nameAssert}{enter}`,{ delay: 100 })
            .should("have.value", nameAssert);
        cy.xpath(selectors.threePointsScriptProjects).should("be.visible");
        cy.xpath(selectors.threePointsScriptProjects).first().should("be.visible");
        cy.xpath(selectors.projectsearch.replace('project', nameAssert)).should('be.visible');
        cy.xpath(selectors.threePointsScriptProjects).first().click();
        switch (option) {
            case "EditScript":
                this.editScript();
                break;
            case "ConfigScript":
                this.configScript();
                break;
            case "addScreenProject":
                this.addScriptProject();
                break;
            case "DeleteProject":
                this.deleteScriptProject();
                break;
        }
    }
}
