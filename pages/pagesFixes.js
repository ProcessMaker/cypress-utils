import selectors from "#selectors/pagesFixes";
import { NavigationHelper } from "#helpers/navigationHelper";
import { Screens } from "./screens";

const navHelper = new NavigationHelper();
const screens = new Screens();

export class PagesFix {
    //Menu dropdown
    clickOnDropdownMenu() {
        cy.get(selectors.dropdownMenuBtn).should('be.visible');
        cy.get(selectors.dropdownMenuBtn).click();
    }

    clickOnSeeAllPagesBtn() {
        cy.get(selectors.seeAllPageBtn).click({ force: true });
    }

    clickOnCreatePageBtn() {
        cy.get(selectors.createPageBtn).click({ force: true });
    }

    typeNameInCreateNewPage(pageName) {
        cy.xpath('//h5[contains(text(),"Create New Page")]').should('be.visible');
        cy.xpath('//label[contains(text(),"Page Name")]').should('be.visible');
        cy.get(selectors.pageNameInput).should('be.visible');
        cy.get(selectors.pageNameInput).click();
        cy.wait(500);
        cy.get(selectors.pageNameInput).type(pageName, { delay: 60 }).should('have.value', pageName);
    }

    clickOnSaveBtn() {
        cy.xpath(selectors.saveBtn).should('be.visible').click();
    }

    seeAllPages() {
        this.clickOnDropdownMenu();
        this.clickOnSeeAllPagesBtn();
    }

    createPageFromMenuDropdown(pageName) {
        this.clickOnDropdownMenu();
        this.clickOnCreatePageBtn();
        this.typeNameInCreateNewPage(pageName);
        this.clickOnSaveBtn();
    }

    openPage(namePage) {
        cy.get(`[data-test="page-${namePage}"]`).click({ force: true });
    }

    clickOnTabPage(position) {
        cy.wait(1000)
        cy.xpath(`//span[@data-test="tab-${position}"]//parent::a`).click({ force: true });

    }

    //Modal Edit Pages
    searchPage(pageName) {
        cy.get(selectors.searchPages).should('be.visible');
        cy.get(selectors.searchPages).clear();
        cy.get(selectors.searchPages).type(pageName, { delay: 60 }).type('{enter}').should('have.value', pageName);
    }

    searchPageInScreen(screenName, pageName) {
        navHelper.navigateToScreensPage();
        screens.searchScreen(screenName, 'edit');
        this.clickOnDropdownMenu();
        this.clickOnSeeAllPagesBtn();
        this.searchPage(pageName);
    }

    clickOnAddPageInModal() {
        cy.xpath(selectors.addPageInModal).should('be.visible');
        cy.xpath(selectors.addPageInModal).click();
    }      

    createPageFromModal(pageName) {
        this.clickOnDropdownMenu();
        this.clickOnSeeAllPagesBtn();
        this.clickOnAddPageInModal();
        cy.wait(500);
        this.typeNameInCreateNewPage(pageName);
        this.clickOnSaveBtn();
    }

    clickOnEditPageBtn() {
        cy.xpath(selectors.editBtn).should('be.visible')
        cy.xpath(selectors.editBtn).click();
    }

    clickOnDoneBtn() {
        cy.xpath(selectors.confirmEditBtn).should('be.visible').click();
    }

    editPageName(newPageName) {
        this.clickOnEditPageBtn();
        cy.xpath(selectors.editPageName).click();
        cy.xpath(selectors.editPageName).clear();
        cy.xpath(selectors.editPageName).type(newPageName, { delay: 60 }).should('have.value', newPageName);
    }

    clickOnDeletePageBtn() {
        cy.xpath(selectors.deleteBtn).should('be.visible')
        cy.xpath(selectors.deleteBtn).click();
    }

    confirmDeletePage() {
        cy.xpath(selectors.confirmDeleteBtn).should('be.visible')
        cy.xpath(selectors.confirmDeleteBtn).click();
    }

    deletePage() {
        this.clickOnDeletePageBtn();
        this.confirmDeletePage();
    }

    searchPageAndSelectOption(pageName, option, newPageName) {
        this.searchPage(pageName);
        switch (option) {
            case "edit":
                this.editPageName(newPageName);
                break;
            case "delete":
                this.deletePage();
                break;
        }
        this.clickOnDoneBtn();
    }

    clickOnUndoBtn() {
        cy.xpath(selectors.undoBtn).should('be.visible').click();
    }

    clickOnRedoBtn() {
        cy.xpath(selectors.redoBtn).should('be.visible').click();
    }

    clickOnCalcsBtn() {
        cy.xpath(selectors.calcsBtn).should('be.visible').click();
    }

    dragItem(idSource, IdTarget) {
        const dataTransfer = new DataTransfer;
        cy.get(`[data-test="item-${idSource}"]`)
            .trigger('dragstart', { dataTransfer })
        cy.get(`[data-test="item-${IdTarget}"]`)
            .trigger('dragenter')
            .trigger('dragover', { dataTransfer })
            .trigger('drop', { dataTransfer })
        cy.get(`[data-test="item-${idSource}"]`)
            .trigger('dragend')
    }
}
