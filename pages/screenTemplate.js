import { Login } from "#pages/login"
import selectors from "#selectors/screenTemplate";
import pageConstants from "#helpers/pageConstants";
import promisify from 'cypress-promise'
import { NavigationHelper } from "#helpers/navigationHelper";
import { isThisWeek } from "date-fns";
import "#support/commands";
import {Utility} from "./utility";
import Selectors from "#selectors/screens";

const utility = new Utility();

export class ScreenTemplate {
    

    
    verifyPresenceOfScreenAndImportScreen(screenName, filePath) {
		this.searchForAScreen(screenName);
		cy.get(selectors.screenTableBx)
			.find("td")
			.then(($loadedTable) => {
				if ($loadedTable.length === 1) {
					this.importScreen(filePath);
				} else return;
		})
	}

    searchForAScreen(screenName) {
		cy.get(selectors.screenIndex).should('be.visible');
		cy.get(selectors.noDataAvailable).should('not.exist');
		cy.get(selectors.searchScreen).type(screenName).should('have.value', screenName);
		cy.wait(1500);
	}
    
    searchScreensAndSelectOptions(screenName,option = "config",) 
    {
        cy.xpath(selectors.threePointsBtnXpathScreen).should("be.visible");
        cy.get(selectors.searchInputScreen).type(`${screenName}{enter}`,{delay:100}).should("have.value", screenName);
        cy.get(selectors.searchInputScreen).type('{enter}');
        cy.wait(3000);
        cy.xpath(selectors.threePointsBtnXpathScreen).should("be.visible");
        cy.xpath(selectors.threePointsBtnXpathScreen).first().click();

        switch (option) {
            case "SaveTemplate":
                this.saveAsTemplate();
                break;
        }
    }

    selectMenuOptionRow(nameOption){
        var optionXpath = '//div[@id="categorizedList"]/ul/li/a[@id="nav-sources-tab"]//ancestor::div[@id="categorizedList"]/descendant::div[@id="screenIndex"]//table/tbody/tr//button[@aria-haspopup="menu"]/following-sibling::ul//li//span[contains(text(),"'+nameOption+'")]'
        cy.xpath(optionXpath).should('be.visible');
        cy.xpath(optionXpath).click();
    }

    saveAsTemplate() {
        this.selectMenuOptionRow("Save as Template");
        cy.xpath(selectors.addScreenTemplateModel).should("be.visible");
	}

    createScreenTemplate(nameScreenTemplate, description, category = "", version) {
        cy.wait(2000);
        this.enterScreenTemplateName(nameScreenTemplate, {force:true});
        this.enterScreenTemplateDescription(description, { delay: 200 });
        if (category != "") this.enterScreenTemplateCategory(category);
        if (version != "") this.enterVersionScreenTemplate(version, { delay: 200 });
        this.clickOnSaveTemplate();
    }

    enterScreenTemplateName(nameScreenTemplate) {
        cy.get(selectors.nameScreenTemplate).should("be.visible").type(nameScreenTemplate, { delay: 300 }).should("have.value", nameScreenTemplate, { force: true });
    }
    enterScreenTemplateDescription(description) {
        cy.xpath(selectors.descriptionScreentemplate).type(description).should("have.value", description);
    }
    enterScreenTemplateCategory(category) {
        cy.xpath(selectors.screenTemplateCategory).click();
        cy.xpath(selectors.screenTemplateCategory).type(category, {
            delay: 200,
        });
        cy.xpath(
            selectors.screenTemplateCategory.replace("categoryName", category)).should("be.visible").click();
    }
    enterVersionScreenTemplate(version) {
        cy.get(selectors.versionScreenTemplate).click();
        cy.get(selectors.versionScreenTemplate)
            .type(version, { delay: 100 })
            .should("have.value", version)
            .type("{enter}");
    }

    clickOnSaveTemplate() {
        cy.xpath(selectors.saveCreateScreenTemplate).should("be.visible").click();
        
    }

    searchScreenTemplate(nameScreenTemplate) {
        cy.xpath('//*[@id="nav-myTemplates"]/div').should("be.visible");
        cy.get(selectors.tableScreenTemplate).should("be.visible");
        cy.get('#myTemplatesIndex > #search-bar > :nth-child(1) > .flex-grow-1 > :nth-child(1) > :nth-child(1) > .align-items-start > .search-bar > .search-bar-container > .pmql-input').should('be.visible');
        cy.get('#myTemplatesIndex > #search-bar > :nth-child(1) > .flex-grow-1 > :nth-child(1) > :nth-child(1) > .align-items-start > .search-bar > .search-bar-container > .pmql-input').click().clear();
        cy.get('#myTemplatesIndex > #search-bar > :nth-child(1) > .flex-grow-1 > :nth-child(1) > :nth-child(1) > .align-items-start > .search-bar > .search-bar-container > .pmql-input').type(`${nameScreenTemplate}`,{delay:100}).type('{enter}').should("have.value", nameScreenTemplate);
        cy.get(".jumbotron.jumbotron-fluid").should("not.be.visible");
	}

    searchScreenSharedTemplate(nameScreenTemplate) {
        cy.xpath('//*[@id="nav-publicTemplates"]/div').should("be.visible");
        cy.get(selectors.tableScreenSharedTemplate).should("be.visible");
        cy.xpath(selectors.searchInputScreenTemplatePublic).should('be.visible');
        cy.xpath(selectors.searchInputScreenTemplatePublic).click().clear();
        cy.xpath(selectors.searchInputScreenTemplatePublic).type(`${nameScreenTemplate}`,{delay:100}).type('{enter}').should("have.value", nameScreenTemplate);
        cy.get(".jumbotron.jumbotron-fluid").should("not.be.visible");
	}

    selectMenuOptionRowScreenTemplate(nameOption2) {
        const optionCatXpath2 = `//div[@id="myTemplatesIndex"]//button[@aria-haspopup="menu"]/following-sibling::ul//li//span[contains(text(),"${nameOption2}")]`;
        cy.get("[data-cy='my-templates-table-td-0-3']").first().trigger("mouseover", { force: true });
        cy.xpath(optionCatXpath2).should("be.visible").first().click();
    }

    searchScreenTemplateAndSelectOptionsMyTemplate(
        nameScreenTemplate,
        option2 = "config",
        exportType = "basic",
        passwordOption = "no",
        password = "123456"
    ) {
        
        {
            cy.xpath(selectors.searchInputScreenTemplate).type(`${nameScreenTemplate}{enter}`).should("have.value", nameScreenTemplate);
            cy.get("[data-cy='my-templates-table-td-0-3']").first().trigger("mouseover", { force: true });
            cy.wait(3000);

            cy.xpath(selectors.menuOptionScreenTemplateMyTemplate).should("be.visible");
            cy.xpath(selectors.menuOptionScreenTemplateMyTemplate).first().should('be.visible');
            cy.wait(3000);
            cy.xpath(selectors.menuOptionScreenTemplateMyTemplate).first().click();
            
        }
        switch (option2) {
            case "editTemplate":
                this.editScreenTemplateMyTemplate();
                break;
            case "makePublic":
                this.makePublicMyTemplate();
                break;
            case "configureTemplateMyTemplate":
                this.configureMyTemplate();
                break;
            case "deleteScreenTemplate":
                this.deleteScreenTemplate();
                break;
            case "exportScreenMyTemplate":
                this.exportScreenTemplateMyTemplate();
                break;
        }
    }

    editScreenTemplateMyTemplate() {
        this.selectMenuOptionRowScreenTemplate("Edit Template");
    }

    makePublicMyTemplate() {
        this.selectMenuOptionRowScreenTemplate("Share Template");
    }
    deleteScreenTemplate() {
        this.selectMenuOptionRowScreenTemplate("Delete Template");
    }

    exportScreenTemplateMyTemplate() {
        this.selectMenuOptionRowScreenTemplate("Export Template");
    }
    configureMyTemplate() {
        this.selectMenuOptionRowScreenTemplate("Configure Template");
    }

    searchForPublicScreen(nameScreenTemplate) {
		cy.get(selectors.screenPublicTemplate).should("be.visible");
		cy.get(selectors.noDataAvailable).should("not.exist");
		cy.xpath(selectors.searchInputScreenTemplatePublic).type(nameScreenTemplate).should('have.value', nameScreenTemplate).type('{enter}');
		cy.wait(3500);
	}

    searchForMyTemplateScreen(nameScreenTemplate) {
		cy.get(selectors.screenMyTemplate).should('be.visible');
		cy.get(selectors.noDataAvailable).should('not.exist');
		cy.xpath(selectors.searchInputScreenTemplate).type(nameScreenTemplate).should('have.value', nameScreenTemplate).type('{enter}');
		cy.wait(3500);
	}

    searchScreenTemplateAndSelectOptionsPublic(
        nameScreenTemplate,
        option = "config",
        exportType = "basic",
        passwordOption = "no",
        password = "123456"
    ) {
        
        {
            cy.xpath(selectors.searchInputScreenTemplatePublic).type(`${nameScreenTemplate}{enter}`).should("have.value", nameScreenTemplate);
            cy.get("[data-cy=public-templates-table-td-0-4]").first().trigger("mouseover", { force: true });
            cy.wait(3000);
            cy.xpath(selectors.menuOptionScreenTemplatePublic).should("be.visible");
            cy.xpath(selectors.menuOptionScreenTemplatePublic).first().should('be.visible');
            cy.wait(3000);
            cy.xpath(selectors.menuOptionScreenTemplatePublic).first().click();
        }
                
        switch (option) {
            case "editPublicScreenTemplate":
                this.editScreenTemplatePublic();
                break;
            case "exportPublicScreenTemplate":
                this.exportPublicTemplate();
                break;
            case "deletePublicScreenTemplate":
                this.deletePublicTemplate();
                break;
        }
    }

    editScreenTemplatePublic() {
        this.selectMenuOptionRowScreenTemplatePublic("Edit Template");
    }

    exportPublicTemplate() {
        this.selectMenuOptionRowScreenTemplatePublic("Export Template");
    }

    deletePublicTemplate() {
        this.selectMenuOptionRowScreenTemplatePublic("Delete Template");
    }

    selectMenuOptionRowScreenTemplatePublic(nameOption3) {
        const optionCatXpath3 = `//div[@id="publicTemplatesIndex"]//button[@aria-haspopup="menu"]/following-sibling::ul//li//span[contains(text(),"${nameOption3}")]`;
        cy.xpath(optionCatXpath3).should("be.visible").first().click();
    }

    verifyPresenceOfScreentemplateAndImport(screenTemplateMyTemplate, screenTemplatePath) {
        var editBtn =
        '//div[@id="myTemplatesIndex"]//button[@aria-haspopup="menu"]';
        cy.get("[data-cy='my-templates-table-td-0-3']").first().trigger("mouseover", { force: true });
        cy.wait(3000);
        cy.xpath(editBtn).should("be.visible");
        cy.xpath(selectors.searchInputScreenTemplate)
    .type(`${screenTemplateMyTemplate}`, {delay:60})
    .should("have.value", screenTemplateMyTemplate);
        cy.xpath(selectors.searchInputScreenTemplate).type("{enter}");
        cy.wait(3000);
        cy.get(selectors.totalPaginationScreenMyTemplate)
            .invoke("text")
            .then(($el) => {
                if ($el.trim() == "0 items") {
                    this.importScreenTemplate(screenTemplatePath);
                } else {
                    cy.log("no result");
                }
            });
}

searchForAScreenMyTemplate(screenTemplateMyTemplate) {
    cy.get(selectors.screentemplateIndex).should('be.visible');
    //cy.get(selectors.noDataAvailable).should('not.exist');
    cy.xpath(selectors.searchInputScreenTemplate).type(screenTemplateMyTemplate).should('have.value', screenTemplateMyTemplate);
    }

importScreenTemplate(screenTemplatePath) {
    
    cy.xpath(selectors.ImportButtonMyTemplate).should('be.visible');
	cy.xpath(selectors.ImportButtonMyTemplate).click();

	cy.window().then((win) => {
			const element = win.document.getElementById("import-file");
			element.classList.remove("d-none");
			win.document.querySelector(Selectors.fileBtn).style.visibility = "visible";
			win.document.querySelector(Selectors.fileBtn).style.display = "block";
			win.document.querySelector(Selectors.fileBtn).style.width = "200px";
			win.document.querySelector(Selectors.fileBtn).style.height = "20px";
			win.document.querySelector(Selectors.fileBtn).style.position = "fixed";
			win.document.querySelector(Selectors.fileBtn).style.overflow = "visible";
			win.document.querySelector(Selectors.fileBtn).style.zIndex = "9999999";
			win.document.querySelector(Selectors.fileBtn).style.top = "500px";
			win.document.querySelector(Selectors.fileBtn).style.left = "500px";
			win.document.querySelector(Selectors.fileBtn).style.right = "500px";
			win.document.querySelector(Selectors.fileBtn).style.bottom = "500px";
		});
		cy.get(Selectors.fileBtn).attachFile(screenTemplatePath);
		cy.get(selectors.importBtnScreenMyTemplate).click();
	}

verifyPresenceOfScreenSharedtemplateAndImport(screenTemplateSharedTemplate, screenTemplatePath) {
        var editBtn =
        '//div[@id="publicTemplatesIndex"]//button[@aria-haspopup="menu"]';
        cy.get("[data-cy='public-templates-table-td-0-4']").first().trigger("mouseover", { force: true });
        cy.wait(3000);
        cy.xpath(editBtn).should("be.visible");
        cy.xpath(selectors.searchInputScreenTemplatePublic)
    .type(`${screenTemplateSharedTemplate}`, {delay:60})
    .should("have.value", screenTemplateSharedTemplate);
        cy.xpath(selectors.searchInputScreenTemplatePublic).type("{enter}");
        cy.wait(3000);
        cy.get(selectors.totalPaginationScreenSharedTemplate)
            .invoke("text")
            .then(($el) => {
                if ($el.trim() == "0 items") {
                    this.importScreenSharedTemplate(screenTemplatePath);
                } else {
                    cy.log("no result");
                }
            });
}

    importScreenSharedTemplate(screenTemplatePath) {

        cy.xpath(selectors.ImportButtonSharedTemplate).should('be.visible');
        cy.xpath(selectors.ImportButtonSharedTemplate).click();

        cy.window().then((win) => {
                const element = win.document.getElementById("import-file");
                element.classList.remove("d-none");
                win.document.querySelector(Selectors.fileBtn).style.visibility = "visible";
                win.document.querySelector(Selectors.fileBtn).style.display = "block";
                win.document.querySelector(Selectors.fileBtn).style.width = "200px";
                win.document.querySelector(Selectors.fileBtn).style.height = "20px";
                win.document.querySelector(Selectors.fileBtn).style.position = "fixed";
                win.document.querySelector(Selectors.fileBtn).style.overflow = "visible";
                win.document.querySelector(Selectors.fileBtn).style.zIndex = "9999999";
                win.document.querySelector(Selectors.fileBtn).style.top = "500px";
                win.document.querySelector(Selectors.fileBtn).style.left = "500px";
                win.document.querySelector(Selectors.fileBtn).style.right = "500px";
                win.document.querySelector(Selectors.fileBtn).style.bottom = "500px";
            });
            cy.get(Selectors.fileBtn).attachFile(screenTemplatePath);
            cy.get(selectors.importBtnScreenSharedTemplate).click();
        }
     
    verifyPresenceOfScreenTemplateAndCreate(nameScreenTemplate) {

        cy.xpath('//*[@id="nav-myTemplates-tab"]').should('be.visible').click();
        var editBtn =
        '//div[@id="myTemplatesIndex"]//table/tbody/tr//button[@aria-haspopup="menu"]';
        cy.xpath(editBtn).should("be.visible");
        cy.xpath(selectors.searchInputScreenTemplate).type(`${nameScreenTemplate}`, {delay:100}).should("have.value", nameScreenTemplate);
        cy.xpath(selectors.searchInputScreenTemplate).type('{enter}');
        //cy.xpath(selectors.loadingSpinnerScreen).should('be.visible');
        cy.wait(3000);
        
        //cy.xpath(selectors.loadingSpinnerScreen).should('not.be.visible');
        cy.xpath('//*[@id="nav-sources-tab"]').should('be.visible').click();
        var editBtn2 =
        '//div[@id="screenIndex"]//table/tbody/tr//button[@aria-haspopup="menu"]';
        cy.xpath(editBtn2).should("be.visible");

        cy.xpath('//table[@class="vuetable table table-hover table-responsive text-break"]//tbody//tr', { timeout: 10000 })
        .find("td").then(($loadedTable) => {
        if ($loadedTable.length === 1) {
            
            //this.searchForAScreen(nameScreenTemplate);
            cy.xpath('[aria-label="Screens"]').should("be.visible").click();
            this.createScreenTemplate(nameScreenTemplate);
        } else return;
    });
}

createScreenFromTemplate(name, description, type, typeScreenTemplate, nameTemplate) {
    this.clickOnAddScreen();
    cy.get(Selectors.CategoryTxt).should('have.text','Uncategorized');
    this.enterScreenName(name);
    this.enterScreenDescription(description);
    this.selectTypeScreen(type);
    this.selectTypeTemplate(typeScreenTemplate);
    this.selectTemplate(nameTemplate);
    this.previewTemplate(nameTemplate);
        
}

clickOnAddScreen() {
    cy.get(Selectors.addScreenButton).click();
}
enterScreenName(name) {
    cy.get(Selectors.nameTxtBx).type(name).should('have.value', name);
}
enterScreenDescription(description) {
    cy.get(Selectors.descriptionTxtBx).type(description).should('have.value', description);
}
selectTypeScreen(
    type = " "
    
) {
    {
        cy.xpath(Selectors.arrowTypeScreen).should('be.visible');
        cy.xpath(Selectors.arrowTypeScreen).click();
    }
    switch (type) {
        case "Form":
            this.selectScreenForm();
            break;
        case "Email":
            this.selectScreenEmail();
            break;
        case "Display":
            this.selectScreenDisplay();
            break;
        case "Conversational":
            this.selectScreenConversational();
            break;
    }
}

selectScreenForm() {
    cy.get(Selectors.screenTypeForm).eq(1).click();
}
selectScreenEmail() {
    cy.get(Selectors.screenTypeEmail).click();
}
selectScreenDisplay() {
    cy.get(Selectors.screenTypeDisplay).click();
}
selectScreenConversational() {
    cy.get(Selectors.screenTypeConversational).click();
}

selectTypeTemplate(typeScreenTemplate = " ") 
{
        cy.xpath(selectors.arrowTypeTemplate).should('be.visible');
        cy.xpath(selectors.arrowTypeTemplate).click();
               
    switch (typeScreenTemplate) 
    {
        case "Shared":
            this.selectSharedTemplate();
            break;
        case "My Templates":
            this.selectMyTemplate();
            break;
    }
}

createScreenFromTemplateDefault(name, description, type, typeScreenTemplate) {
    this.clickOnAddScreen();
    cy.get(Selectors.CategoryTxt).should('have.text','Uncategorized');
    this.enterScreenName(name);
    this.enterScreenDescription(description);
    this.selectTypeScreen(type);
    this.selectTypeTemplate(typeScreenTemplate);
    this.selectDefaultTemplate();
    //this.previewTemplate(nameTemplate);
        
}

selectSharedTemplate() {
    cy.get(selectors.sharedTemplateType).eq(1).click();
}

selectMyTemplate() {
    cy.get(selectors.myTemplateType).should('be.visible').click();
}

selectTemplate(nameTemplate) {

    cy.get(selectors.selectScreenTemplate.replace('CustomCard',nameTemplate+'-card')).click({force:true});
    
}

selectDefaultTemplate() {

    cy.get(selectors.selectScreenDefaultTemplate).click({force:true});
    
}
previewTemplate(nameTemplate) {

    cy.get(selectors.previewTemplate.replace('CustomCard',nameTemplate+'-card')).click({force:true});
    cy.get(selectors.buttonViewCSS).should('be.visible').click();
    
}



clickOnSave() {
    cy.get(selectors.saveBtn).should('be.visible').click({force:true});
}




}
