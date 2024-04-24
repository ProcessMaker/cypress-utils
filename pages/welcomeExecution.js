import {Welcome} from "#pages/welcome";
import {NavigationHelper} from "#helpers/navigationHelper";
import {PMProjects} from "#pages/pmProjects";
import selectors from "#selectors/welcome";

const welcome = new Welcome();
const navHelper = new NavigationHelper();
const pmProject = new PMProjects();

export class welcomeExecution {
    verifyDesignerAsset() {
        cy.get('[class="assets p-3 mb-3"]').should('be.visible').should('contain','ASSETS')
    }
    verifyDesignerProjects() {
        cy.get('[class="project"]').should('be.visible').should('contain','MY PROJECTS')
    }
    verifyDesignerRecentAssetsFromMyProjects() {
        cy.get('[class="project"]').should('be.visible').should('contain','RECENT ASSETS FROM MY PROJECTS')
    }
    // Welcome designer: ASSETS
    verifyDefaultDesignerAsset() {
        cy.xpath(selectors.avatar).should("be.visible");
        cy.xpath(selectors.assetsProcesses).should("be.visible");
        cy.xpath(selectors.assetsScreens).should("be.visible");
        cy.xpath(selectors.assetsScripts).should("be.visible");
        cy.xpath(selectors.assetsDecisionTables).should("be.visible");
        cy.xpath(selectors.assetsDataConnectors).should("be.visible");
        cy.get('[class="assets p-3 mb-3"]')
            .should("be.visible")
            .should("contain", "ASSETS");
    }
    // Welcome designer: MY PROJECTS
    verifyDefaultDesignerProjects() {
        cy.xpath(selectors.avatar).should("be.visible");
        cy.get('[class="project"]')
            .should("be.visible")
            .should("contain", "MY PROJECTS");
    }
    // Welcome designer: MY PROJECTS
    verifyDefaultPageProjects() {
        cy.xpath("//span[text()='Recent Projects']").should('be.visible');
    }
    // Welcome designer: RECENT ASSETS FROM MY PROJECTS
    verifyDesignerRecentAssetsFromMyProjects() {
        cy.xpath(selectors.avatar).should("be.visible");
        cy.get('[class="project"]')
            .should("be.visible")
            .should("contain", "RECENT ASSETS FROM MY PROJECTS");
    }
    // Welcome designer: MY PROJECTS
    verifyDefaultPageRecentAssetsFromMyProjects() {
        cy.xpath("//span[text()='Recent Assets']").should('be.visible');
    }
    // Welcome home: MY TASKS
    myTasks(processName) {
        cy.xpath(selectors.myTasks).should("be.visible");
        cy.xpath(selectors.tasks).should("be.visible");
        cy.xpath(selectors.requests).should("be.visible");
        cy.xpath(selectors.due).should("be.visible");
        cy.xpath(selectors.menuTaskExpansion).should(
            "have.class",
            "fas fa-external-link-alt custom-icon"
        );
        cy.xpath(selectors.searchTask).should("be.visible").click();
        cy.xpath(selectors.inputTask)
            .should("be.visible")
            .click()
            .type(processName)
            .should("have.value", processName)
            .type("{enter}");
        cy.xpath(selectors.eyeHardcoded)
            .should("be.visible")
            .click((err, runnable) => {
                return false;
            });
    }
    // Welcome home: MY REQUESTS
    myRequests(processName) {
        cy.xpath(selectors.myRequests).should("be.visible");
        cy.xpath(selectors.numberRequest).should("be.visible");
        cy.xpath(selectors.nameRequest).should("be.visible");
        cy.xpath(selectors.statusRequest).should("be.visible");
        cy.xpath(selectors.searchRequest).should("be.visible").click();
        cy.xpath(selectors.inputRequest)
            .click()
            .type(processName)
            .should("have.value", processName)
            .type("{enter}");
        cy.xpath(
            selectors.hrefRequestHarcoded.replace("processName", processName)
        ).should("have.attr", "href");
        cy.xpath(selectors.menuRequestExpansion).should(
            "have.class",
            "fas fa-external-link-alt custom-icon"
        );
    }
    // Welcome home: START NEW REQUEST
    startNewRequest(processName) {
        cy.xpath(selectors.searchRequestProcess).should("be.visible").click();
        cy.xpath(selectors.inputProcess)
            .click()
            .type(processName)
            .type("{enter}");
        cy.xpath(
            selectors.processFoundHarcodedStartFound.replace(
                "process",
                processName
            )
        ).should("be.visible");
    }
    // Welcome home: ANALYTICS CHART
    analyticsChart() {
        cy.xpath('//span[contains(text(),"Analytics Chart")]').should(
            "be.visible"
        );

        cy.iframe('.embed-responsive-item')
                        .find('canvas')
                        .should('have.attr', "data-zr-dom-id", "zr_0");
        cy.iframe('.embed-responsive-item')
                        .find('span')
                        .contains("Duration")
                        .click();
        cy.iframe('.embed-responsive-item')
                        .find('canvas')
                        .should('have.attr', "data-zr-dom-id", "zr_0");
    }

    exploreAssets() {
        //Processes
        navHelper.navigateToDesignerPage();
        welcome.hoverOption(0);
        welcome.exploreOption("New Process");
        navHelper.navigateToDesignerPage();
        welcome.hoverOption(0);
        welcome.exploreOption("View All Processes");
        cy.xpath("//button['.btn custom-button mb-2 btn-secondary btn-sm btn-block']/p[contains(text(),'View All Processes')]").click();
        cy.xpath('//li/a[contains(text(),"Archived Processes")]').should('be.visible');

        //Screens
        navHelper.navigateToDesignerPage();
        welcome.hoverOption(1);
        welcome.exploreOption("New Screen");
        navHelper.navigateToDesignerPage();
        welcome.hoverOption(1);
        welcome.exploreOption("View All Screens");
        cy.xpath("//button['.btn custom-button mb-2 btn-secondary btn-sm btn-block']/p[contains(text(),'View All Screens')]").click();
        cy.xpath('//button[@aria-label="Create Screen"]').should('be.visible');
                
        //Scripts
        navHelper.navigateToDesignerPage();
        welcome.hoverOption(2);
        welcome.exploreOption("New Script");
        navHelper.navigateToDesignerPage();
        welcome.hoverOption(2);
        welcome.exploreOption("View All Scripts");
        cy.xpath("//button['.btn custom-button mb-2 btn-secondary btn-sm btn-block']/p[contains(text(),'View All Scripts')]").click();
        cy.xpath('//button[@aria-label="Create Script"]').should('be.visible');
                
        //Decision Tables
        navHelper.navigateToDesignerPage();
        welcome.hoverOption(3);
        welcome.exploreOption("New Decision Table");
        navHelper.navigateToDesignerPage();
        welcome.hoverOption(3);
        welcome.exploreOption("View All Decision Tables");
        cy.xpath("//button['.btn custom-button mb-2 btn-secondary btn-sm btn-block']/p[contains(text(),'View All Decision Tables')]").click();
        cy.xpath('//button[@aria-label="Create Table"]').should('be.visible');
                
        //Data Connectors
        navHelper.navigateToDesignerPage();
        welcome.hoverOption(4);
        welcome.exploreOption("New Data Connector");
        navHelper.navigateToDesignerPage();
        welcome.hoverOption(4);
        welcome.exploreOption("View All Data Connectors");
        cy.xpath("//button['.btn custom-button mb-2 btn-secondary btn-sm btn-block']/p[contains(text(),'View All Data Connectors')]").click();
        cy.xpath('//button[@aria-label="Create Data Connector"]').should('be.visible');
    }
        
    searchAndOpenProjects(project) {
        var nameOption = 'Open';
        navHelper.navigateToDesignerPage();
        cy.xpath('//div[contains(text(),"My Projects")]/ancestor::nav/ul[".navbar-nav justify-content-end"]/div/button/i[".fas fa-search"]').click();
        cy.xpath('//div[contains(text(),"My Projects")]/ancestor::nav/ul[".navbar-nav justify-content-end"]/div/input').click().type(project, {delay:350});
        cy.xpath('//div[contains(text(),"My Projects")]/ancestor::nav/ul[".navbar-nav justify-content-end"]/div/input').type('{enter}');
        cy.xpath(("//th[contains(text(),'Name')]/ancestor::div[@data-cy='processes-table']/table/tbody/tr/td/a[contains(text(),'project')]").replace('project', project)).should('be.visible');
        cy.xpath("//button['.btn dropdown-toggle btn-outlined-secondary static-header']/span[contains(text(),'Options')]").should('be.visible').click();
        cy.xpath('//ul[@class="dropdown-menu dropdown-menu-right show"]//li//span[contains(text(),"'+nameOption+'")]').click();
    }
            
    assetListValidation(assetList){
        pmProject.assetSetValidationInProject(assetList);
    }
    
    assetValidationInDesignerValidation(assetList){
        welcome.assetSetValidationInDesignerProject(assetList);
    }        
}
