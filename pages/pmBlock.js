import { Login } from "#pages/login"
import { Process } from "#pages/process"
import selectors from "#selectors/process";
import pageConstants from "#helpers/pageConstants";
import promisify from 'cypress-promise'
import { NavigationHelper } from "#helpers/navigationHelper";
import { isThisWeek } from "date-fns";
import "#support/commands";
import {Utility} from "./utility";

const utility = new Utility();

export class PMBlock {


    /**
     * This method is responsible to create a process
     * @param name: name of the new pm block
     * @param description: description about of the new pmblock
     * @param category: Select a PMBlock Category
     * @param username: Select a username to be a process manager
     * @return nothing returns
     */


    createPMBlock(name, description, category = "", icon = "", username = "") {
        this.enterPMBlockName(name);
        this.enterPMBlockDescription(description);
        if (category != "") this.enterPMBlockCategory(category);
        if (username != "") this.enterPMBlockManager(username);
        if (icon != "") this.enterIcon(icon);
        this.clickOnSaveInAddPublish();


    }
    clickOnSaveInAddPublish() {
        cy.xpath(selectors.saveBtnPublish).should("be.visible").click();
    }

    enterPMBlockManager(username) {
        cy.xpath(selectors.managerFieldXpath).click();
        cy.xpath(selectors.managerFieldTxtXpath)
            .type(username, { delay: 100 })
            .should("have.value", username)
            .type("{enter}");
    }

    enterIcon(icon) {
        cy.xpath(selectors.iconFieldXpath).click();
        cy.xpath(selectors.iconFieldTxtXpath)
            .type(icon, { delay: 100 })
            .should("have.value", icon)
            .type("{enter}");
    }
    enterPMBlockCategory(category) {
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
    enterPMBlockName(name) {
        cy.get(selectors.nameTxtBx)
            .should("be.visible")
            .type(name, { delay: 200 })
            .should("have.value", name);
    }

    enterPMBlockDescription(description) {
        cy.get(selectors.descriptionTxtBx).type(description).should("have.value", description);
    }

    searchForPMBlock(pmblockName, option = "edit") {
        cy.xpath(selectors.searchInputPmblock).type(`${pmblockName}{enter}`).should("have.value", pmblockName);
        cy.xpath('//div[@id="main"]//div[@id="pmBlockList"]//tbody//button[@aria-haspopup="menu"]').first().click({ force: true });
        switch (option) {
            case "edit":
                this.editPmblock();
                break;
            case "config":
                this.goToConfigPmblock();
                break;
            case "archive":
                this.archivePmblock();
                break;
            
            }
    }
    searchForAPMBlock(pmblockName) {
        cy.get(selectors.PMBlockList).should("be.visible");
        cy.xpath(selectors.tablePMBlocks).should("be.visible");
        cy.xpath(selectors.searchInputPmblock).should("be.visible");
        cy.xpath(selectors.searchInputPmblock).click().clear();
        cy.xpath(selectors.searchInputPmblock).type(`${pmblockName}`,{delay:100}).type('{enter}').should("have.value", pmblockName);
        cy.get(".jumbotron.jumbotron-fluid").should("not.be.visible"); 		
	}
    searchPmblockAndSelectOptions(
        pmblockName,
        option = "config",
        exportType = "basic",
        passwordOption = "no",
        password
    ) {
        cy.xpath(selectors.threePointsBtnXpathPmblock).should("be.visible");
        cy.xpath(selectors.searchInputPmblock).type(`${pmblockName}{enter}`,{delay:100}).should("have.value", pmblockName);
        cy.xpath(selectors.searchInputPmblock).type('{enter}');
        cy.wait(2000);
        //cy.xpath(selectors.threePointsBtnXpathPmblock).should("be.visible");
        cy.xpath(selectors.threePointsBtnXpathPmblock).first().should("be.visible");
        cy.xpath(selectors.threePointsBtnXpathPmblock).first().click();

        switch (option) {
            case "edit":
                this.editPmblock();
                break;
            case "config":
                this.goToConfigPmblock();
                break;
            case "archive":
                this.archivePmblock();
                break;
            
            }
    }
    searchPMBlockModeler(pmblockName) {
        cy.xpath(selectors.searchPMBlockModeler).type(`${pmblockName}{enter}`).should("have.value", pmblockName);
    }

    editPmblock() {
        this.selectMenuOptionRow("Edit PM Block");
    }

    goToConfigPmblock() {
        this.selectMenuOptionRow("Configure PM Block");
    }

    archivePmblock() {
        this.selectMenuOptionRow("Archive PM Block");
    }

    selectMenuOptionRow(nameOption){
        var optionXpath = '//li//span[contains(text(),"'+nameOption+'")]'
         
        cy.xpath(optionXpath).should('be.visible');
        cy.xpath(optionXpath).first().click();
    }
    searchPmblockArchived(
        pmblockName,
        option = "config",
        exportType = "basic",
        passwordOption = "no",
        password
    ) {
        cy.xpath(selectors.threePointsBtnXpathPmblockArchived).should("be.visible");
        cy.xpath(selectors.searchInputPmblockArchived).type(`${pmblockName}{enter}`).should("have.value", pmblockName);
        cy.xpath(selectors.threePointsBtnXpathPmblockArchived).first().click();
        switch (option) {
            case "export":
                this.exportPmblock();
                break;
            case "restore":
                this.restorePmblock();
                break;

            }
    }
    exportPmblock() {
        this.selectMenuOptionRowArchived("Export PM Block");
    }

    restorePmblock() {
        this.selectMenuOptionRowArchived("Restore PM Block");
    }

    selectMenuOptionRowArchived(nameOption){
        var optionXpath = '//div[@id="pmCategorizedList"]/ul/li/a[@id="nav-sources-tab"]//ancestor::div[@id="pmCategorizedList"]/descendant::div[@id="archivedPmBlock"]//table/tbody/tr//button[@aria-haspopup="menu"]/following-sibling::ul//li//span[contains(text(),"'+nameOption+'")]'

        cy.xpath(optionXpath).should('be.visible');
        cy.xpath(optionXpath).first().click();
    }

    importPMBlock(pmblockPath) {
        cy.xpath(selectors.importButtonPMBlocks).first().click();
        cy.xpath(selectors.tittleImportPMBlocks).first().should("have.text", "Import PM Block").should("be.visible");
        cy.xpath(selectors.inputToFileUploadPMBlocks).attachFile(pmblockPath);
        //cy.xpath(selectors.importBtnPMBlocks).parent().should("not.have.attr", "disabled", "disabled");
        cy.xpath(selectors.importBtnPMBlocks).click();
        cy.get(selectors.loadingPMBlockSpinner).should("not.exist");
    }
    clickOnImportButton() {
        cy.get(selectors.importProcessBtn).click();
        cy.get(selectors.browseBtn).should("be.visible");
    }

    
   VerifyPresenceOfPMBlockAndImportPMBlock(pmblockName, pmblockPath) {
    var editBtn =
    '//div[@id="pmBlockList"]//table/tbody/tr//button[@aria-haspopup="menu"]';
    cy.xpath(editBtn).should("be.visible");
    cy.xpath(selectors.searchInputPmblock).type(`${pmblockName}`, {delay:60}).should("have.value", pmblockName);
    cy.xpath(selectors.searchInputPmblock).type('{enter}');
    cy.wait(2000);
    cy.xpath(selectors.loadingSpinnerPMBlock).should("not.be.visible");
    cy.xpath('//*[@id="pmBlockList"]/div[2]/div/table/tbody/tr', { timeout: 10000 }).find("td").then(($loadedTable) => {
    if ($loadedTable.length === 1) {
        this.importPMBlock(pmblockPath);
    } else return;
});
}
    
    addInboundConfiguration(content) {
        this.enterJson(content);
        this.clickOnSaveInAddPublish();
    }
    enterJson(content) {
        cy.get(selectors.contentInbound).should("be.visible").type(content, { delay: 200 }).should("have.value", content);
    }

}
