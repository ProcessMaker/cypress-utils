import selectors from "#selectors/guideTemplate";
import "#support/commands";

export class GuideTemplate {
    /**
     * This method is responsible to create a new Project.
     * @param name: name of the new PM Projects
     * @param categories: categories of the new PM Projects
     * @return {void}
     */
    
    createGuideTemplate() {

        this.enterShowGuideTemplate();
        //categories && this.enterPMProjectCategory(categories);
        //this.clickOnSaveProjects();
    }

    enterShowGuideTemplate() {
        cy.xpath(selectors.showTemplate).click();
    }

    searchForCategory(catName) {
        cy.get(selectors.catList).should("be.visible");
        cy.xpath(selectors.searchInputCat).type(`${catName}{enter}`).should("have.value", catName);		
        cy.wait(1000);
	}

}
