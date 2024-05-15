import { Requests } from "./requests";
import {Header} from "./header";
import { NavigationHelper } from "#helpers/navigationHelper";
import { Login} from "./login";
import { Tasks } from "./tasks";
import { Screens } from "./screens";
import selectors from "#selectors/projects";
import selectorsPB from "#selectors/process";
import { Process } from "./process";
import { SaveSearchs } from "./saveSearch";
import { Admin } from "./admin";
import { FileManager } from "./fileManager";
import { requests } from "#selectors/requests";
import {PMBlock} from "./pmBlock";
import {PMProjects} from "./pmProjects";
import { Scripts } from "./scripts";
import { Dataconnectors } from "./dataConnectors";
import { DecisionTable } from "./decisionTables";
import { Templates } from "./templates";
import selectorTemplate from "#selectors/templates";
//import { template } from "cypress/types/lodash";

let navHelper = new NavigationHelper();
const request = new Requests();
const header = new Header();
const login = new Login();
const tasks = new Tasks();
const screen = new Screens();
const process = new Process();
const admin = new Admin();
const saveSearch = new SaveSearchs();
const fileManager = new FileManager();
const pmBlock = new PMBlock();
const pmProjects = new PMProjects();
const screens = new Screens();
const scripts = new Scripts();
const dataconnector = new Dataconnectors();
const decisionTables = new DecisionTable();
const templates = new Templates();
const selectorTemplates = new Templates();

export class ExecutionConnectors {
    actionsAndAssertionsOfTCP42961(processName){
        const timeStamp = new Date().getTime();
        let pmblockName = `${timeStamp}TCP4-2961 PM Block with Send Email`;
        let pmblockDescription = "Description for  Test Case TCP4-2961";

        //Step 1: Got to Designer
        navHelper.navigateToProcessPage();

        //Step 2: Search th process
        process.searchProcessAndSelectOptions(processName, "pmBlock");

        //Step 3: Create a PMBlock
        pmBlock.createPMBlock(pmblockName,pmblockDescription);

        //Step 4: Go to tab Pm Block
        navHelper.navigateToPmBlock();

        //Step 5: Search the  pmblock created
        pmBlock.searchPmblockAndSelectOptions(pmblockName, "edit");

        //Step 6: Verify that pmblock contain components Send Emails
        cy.get('[data-type="processmaker.components.nodes.task.Shape"]').eq(1).contains("ComponentSendEmail").should("be.visible");
        cy.get('[data-type="processmaker.components.nodes.task.Shape"]').eq(2).contains("Send Email").should("be.visible");
    }
    actionsAndAssertionsOfTCP42929(processName) {
        const timeStamp = new Date().getTime();
        let pmblockName = `${timeStamp}TCP4-2929 PM Block for Edit`;
        let pmblockDescription = "Description for  Test Case TCP4-2929";

        //Step 3: Got to Designer
        navHelper.navigateToProcessPage();

        //Step 4: Search
        process.searchProcessAndSelectOptions(processName, "pmBlock");

        // Step 5: Create a PMBlock
        pmBlock.createPMBlock(pmblockName, pmblockDescription);

        // Step 6: Go to tab Pm Block
        navHelper.navigateToPmBlock();

        // Step 7. Search the  pmblock created
        pmBlock.searchPmblockAndSelectOptions(pmblockName, "edit");

        //Step 8: Verifies that the pmblock layout has been edited
        cy.get('[data-type="processmaker.components.nodes.task.Shape"]').eq(1).contains("FormTaskForEdit").click();
        cy.xpath('//*[@id="delete-button"]').should('be.visible').click();
        //cy.get('[data-type="processmaker.components.nodes.task.Shape"]').eq(1).contains("FormTask").should('be.visible');

    }
    actionsAndAssertionsOfTCP43036() {
        cy.xpath('//*[@id="Sidebaricon"]/a').should("be.visible");
    }

    actionsAndAssertionsOfTCP43058() {
        const timeStamp = new Date().getTime();
        let processName = "Process to assign to a project";
        let projectName = `${timeStamp}TCP4-3058 New PM Project for  Open`;

        //Step 1: Click on Projects URL
        navHelper.navigateToPmProjects();

        //Step 2: Click on tab projects
        cy.xpath('//*[@id="nav-sources-tab"]').should("be.visible").click();

        //Step 3: CLick on Add Project
        cy.xpath('//button[@class="btn mb-3 mb-md-0 ml-md-2 btn-secondary"]')
            .should("be.visible")
            .click();

        //Step 4: Click on Add Project
        pmProjects.createPMProject(projectName);

        //Step 5: Click on Verify created project
        pmProjects.searchProjects(projectName);
    }
    actionsAndAssertionsOfTCP43089() {
        var categoryName = "TCP4-3089 category Project " + new Date().getTime();

        //Step 1: Click on tab Category
        cy.xpath('//*[@id="nav-categories-tab"]').should("be.visible").click();

        //Step 2: Click on Create Category
        pmProjects.createCategoryProjects(categoryName);

        //Step 3: Verify that the category has been created
        pmProjects.searchCategoryProjects(categoryName);
    }

    actionsAndAssertionsOfTCP43093() {
        const timeStamp = new Date().getTime();
        let projectName = `${timeStamp}TCP4-3093 New PM Project`;

        //Step 3: Click on tab projects
        cy.xpath('//*[@id="nav-sources-tab"]').should("be.visible").click();

        //Step 4: CLick on Add Project
        cy.xpath('//button[@class="btn mb-3 mb-md-0 ml-md-2 btn-secondary"]')
            .should("be.visible")
            .click();

        //Step 5: Click on Add Project
        pmProjects.createPMProject(projectName);

        //Step 6: Click on Verify created  project
        pmProjects.searchProjects(projectName);
    }
    actionsAndAssertionsOfTCP42911(processName) {
        const timeStamp = new Date().getTime();
        let pmblockName = `${timeStamp}TCP4-2911 PM Block for Archive`;
        let pmblockDescription = "Description for  Test Case TCP4-2911";

        //Step 1: Got to Designer
        navHelper.navigateToProcessPage();

        //Step 2: Search
        process.searchProcessAndSelectOptions(processName, "pmBlock");

        // Step 3: Create a PMBlock
        pmBlock.createPMBlock(pmblockName, pmblockDescription);

        // Step 4: Go to tab Pm Block
        navHelper.navigateToPmBlock();

        // Step 5. Search the  pmblock created

        pmBlock.searchPmblockAndSelectOptions(pmblockName, "archive");
        cy.xpath('//button[text()="Confirm"]').click();

        // Step 6 clik on Archive PMBlock
        navHelper.navigateToArchivePmBlock();

        // Step 7 search PM Block Archived
        pmBlock.searchPmblockArchived(pmblockName);

    }
    actionsAndAssertionsOfTCP42962(processName){
        const timeStamp = new Date().getTime();
        let pmblockName = `${timeStamp}TCP4-2962 PM Block with Action by Email`;
        let pmblockDescription = "Description for  Test Case TCP4-2962";

        //Step 1: Got to Designer
        navHelper.navigateToProcessPage();

        //Step 2: Search th process
        process.searchProcessAndSelectOptions(processName, "pmBlock");

        //Step 3: Create a PMBlock
        pmBlock.createPMBlock(pmblockName, pmblockDescription);

        //Step 4: Go to tab Pm Block
        navHelper.navigateToPmBlock();

        //Step 5: Search the  pmblock created
        pmBlock.searchPmblockAndSelectOptions(pmblockName, "edit");

        //Step 6: Verify that pmblock contain components Send Emails
        cy.get('[data-type="processmaker.components.nodes.task.Shape"]').eq(1).contains("ActionsByEmail").should("be.visible");
    }
    actionsAndAssertionsOfTCP42967(processName){
        const timeStamp = new Date().getTime();
        let pmblockName = `${timeStamp}TCP4-2967 PM Block with Slack Connectors`;
        let pmblockDescription = "Description for  Test Case TCP4-2967";

        //Step 1: Got to Designer
        navHelper.navigateToProcessPage();

        //Step 2: Search th process
        process.searchProcessAndSelectOptions(processName, "pmBlock");

        //Step 3: Create a PMBlock
        pmBlock.createPMBlock(pmblockName, pmblockDescription);

        //Step 4: Go to tab Pm Block
        navHelper.navigateToPmBlock();

        //Step 5: Search the  pmblock created
        pmBlock.searchPmblockAndSelectOptions(pmblockName, "edit");

        //Step 6: Verify that pmblock contain components Slack Notification
        cy.get('[data-type="processmaker.components.nodes.task.Shape"]')
            .eq(1)
            .contains("SlackNotification")
            .should("be.visible");
    }
    actionsAndAssertionsOfTCP42965(processName){
        const timeStamp = new Date().getTime();
        let pmblockName = `${timeStamp}TCP4-2965 PM Block with Web Entry`;
        let pmblockDescription = "Description for  Test Case TCP4-2965";

        //Step 1: Got to Designer
        navHelper.navigateToProcessPage();

        //Step 2: Search th process
        process.searchProcessAndSelectOptions(processName, "pmBlock");

        //Step 3: Create a PMBlock
        pmBlock.createPMBlock(pmblockName, pmblockDescription);

        //Step 4: Go to tab Pm Block
        navHelper.navigateToPmBlock();

        //Step 5: Search the  pmblock created
        pmBlock.searchPmblockAndSelectOptions(pmblockName, "edit");

        //Step 6: Verify that pmblock contain components Task Web Entry
        cy.get('[data-type="processmaker.components.nodes.task.Shape"]').eq(0).contains("WebEntry").should("be.visible");
    }
    actionsAndAssertionsOfTCP43153() {
        var categoryName = new Date().getTime()+"TCP4-3153 delete Category Project";

        //Step 1: Click on tab Category
        cy.xpath('//*[@id="nav-categories-tab"]').should("be.visible").click();

        //Step 2: Click on Create Category
        pmProjects.createCategoryProjects(categoryName);

        //Step 3: Verify that the category has been created
        pmProjects.searchCategoryProjects(categoryName);

        //Step 4: CLick on Ellipsis menu Category
        cy.get('[data-cy="category-ellipsis"]').first().should("be.visible");
        cy.get('[data-cy="category-ellipsis"]').first().click();

        //Step 5: Click on Category Tab
        navHelper.navigateToPmProjects();
        cy.xpath('//*[@id="nav-categories-tab"]').should("be.visible").click();

        //Step 6: Search Category created and  deleted
        pmProjects.searchCategoryProjects(categoryName);
        cy.get('[data-cy="category-ellipsis"]').first().should("be.visible");
        cy.get('[data-cy="category-ellipsis"]').first().click();
        cy.xpath(selectors.deleteCategory).first().should("be.visible");
        cy.xpath(selectors.deleteCategory).first().click();

        //Step 7: Confirm Delete Category
        cy.xpath(selectors.confirmDeleteCategory).should('be.visible').click();
    }
    actionsAndAssertionsOfTCP43037() {
        let projectName = "!@#$%^&*()";

        //Step 1: Click on tab projects
        cy.xpath('//*[@id="nav-sources-tab"]')
            .should("be.visible").click();

        //Step 2: Click on Add Project
        cy.xpath('//button[@class="btn mb-3 mb-md-0 ml-md-2 btn-secondary"]')
            .should("be.visible")
            .click();

        //Step 3: Click on Add Project
        pmProjects.createPMProject(projectName);

        //Step 4: Click on Verify that not  created  Projects  with  special character
        cy.xpath('//div[@class="d-block invalid-feedback"]')
            .should("be.visible");
    }

    actionsAndAssertionsOfTCP43053(name) {
        var filePath = "screens_data/screenDisplay_TCP4-3053.json";
        var form_screen = "screenDisplay_TCP4-3053";

        //Step 1: Search a screen created
        navHelper.navigateToScreensPage();

        //Step 2:Import a  Screen
        screens.verifyPresenceOfScreenAndImportScreen(form_screen, filePath);
        navHelper.navigateToScreensPage();

        //Step 3: Search screen for add a  project
        screens.searchScreen(form_screen, "addProject");

       //Step 4: Select project in Screen
        pmProjects.selectProjectInScreen(name);

        // Step 5: Click on Assign
        cy.xpath(selectors.assignProjects).should("be.visible").click();
        cy.get('#nav-collapse > div > div',{timeout: 10000}).should("be.visible");

        //Step 6: verify that the screen of type display is added to the project
        navHelper.navigateToPmProjects();
        pmProjects.searchProjectsAndSelectOptions(name, "open");
        cy.xpath('//*[contains(text(),"screenDisplay_TCP4-3053")]').should("be.visible");

    }
    actionsAndAssertionsOfTCP43155(name) {
        var filePath = "screens_data/screenEmail_TCP4-3155.json";
        var form_screen = "screenEmail_TCP4-3155";

        //Step 1: Search a screen created
        navHelper.navigateToScreensPage();

        //Step 2:Import a  Screen
        screens.verifyPresenceOfScreenAndImportScreen(form_screen, filePath);
        navHelper.navigateToScreensPage();

        //Step 3: Search screen for add a  project
        screens.searchScreen(form_screen, "addProject");

       //Step 4: Select project in Screen
        pmProjects.selectProjectInScreen(name);

        // Step 5: Click on Assign
        cy.xpath(selectors.assignProjects).should("be.visible").click({force:true});
        cy.get('#nav-collapse > div > div',{timeout: 10000}).should("be.visible");
        
        //Step 6: verify that the screen of type display is added to the project
        navHelper.navigateToPmProjects();
        pmProjects.searchProjects(name);
        cy.xpath('//*[contains(text(),"screenEmail_TCP4-3155")]').should("be.visible");
    }
    actionsAndAssertionsOfTCP43156(name) {
        var filePath = "screens_data/screenConversational_TCP4-3156.json";
        var form_screen = "screenConversational_TCP4-3156";

        //Step 1: Search a screen created
        navHelper.navigateToScreensPage();

        //Step 2:Import a  Screen
        screens.verifyPresenceOfScreenAndImportScreen(form_screen, filePath);
        navHelper.navigateToScreensPage();

        //Step 3: Search screen for add a  project
        screens.searchScreen(form_screen, "addProject");

        //Step 4: Select project in Screen
        pmProjects.selectProjectInScreen(name);
        cy.xpath(selectors.assignProjects).first().should("be.visible");
        cy.xpath(selectors.assignProjects)
            .should("be.visible")
            .click({ force: true });

        //Step 5: verify that the process is added to the project
        navHelper.navigateToPmProjects();
        pmProjects.searchProjectsAndSelectOptions(name, "open");
        cy.xpath('//*[contains(text(),"screenConversational_TCP4-3156")]').should("be.visible");
    }
    actionsAndAssertionsOfTCP42930(processName){
        const timeStamp = new Date().getTime();
        let pmblockName = `${timeStamp}TCP4-2930 Verify that PMBlock configuration`;
        let pmblockDescription = "Description for  Test Case TCP4-2930";

        //Step 1: Go to Designer
        navHelper.navigateToProcessPage();

        //Step 2: Search the process
        process.searchProcessAndSelectOptions(processName, "pmBlock");

        //Step 3: Create a PMBlock
        pmBlock.createPMBlock(pmblockName, pmblockDescription);

        //Step 4: Go to tab PmBlock
        navHelper.navigateToPmBlock();

        //Step 5: Search the  PmBlock Create
        pmBlock.searchPmblockAndSelectOptions(pmblockName, "config");

        //Step 6: Verify that we are on the PmBlock configuration screen
        cy.xpath('//*[@id="formPmBlock"]').should("be.visible");
    }
    actionsAndAssertionsOfTCP43170(name) {
        const timeStamp = new Date().getTime();
        const nameScript = `ScriptTCP4-3170-${timeStamp}`;
        const descriptionScript = `Description-${timeStamp}`;
        const nameUser = "Admin";

        //Step 1: Create Script
        navHelper.navigateToScriptPage();
        scripts.createScript(nameScript, descriptionScript, nameUser);

        //Step 2: Search created script
        navHelper.navigateToScriptPage();
        scripts.searchScript(nameScript, "addProject");

        //Step 3: Select project in Script
        pmProjects.selectProjectInScript(name);
        cy.xpath(selectors.assignProjects).should("be.visible");
        cy.xpath(selectors.assignProjects).click({force:true});
        cy.get('[class="modal-content"]').should("be.visible",{timeout: 15000});
        cy.xpath('//button[@aria-label="Close"]').should("be.visible").click({ force: true });
        cy.get('#nav-collapse > div > div',{timeout: 10000}).should("be.visible");

        //Step 4: verify that the process is added to the project
        navHelper.navigateToPmProjects();
        pmProjects.searchProjectsAndSelectOptions(name, "open");
        request.waitUntilElementIsVisible('selector','[data-cy="asset-listing-table"]');
        cy.get('.search-bar > .search-bar-container > .pmql-input').should('be.visible');
        cy.get('.search-bar > .search-bar-container > .pmql-input').type(nameScript,{delay:20}).type('{enter}').should('have.value',nameScript);
        cy.xpath('//tbody[@class="vuetable-body"]//tr//a').should('contain',nameScript);
     }
    actionsAndAssertionsOfTCP42946() {
        let pmblockName = "pmblockSimple";
        let pmblockPath = "pmblocks/pmblocksimple.json";

        //Step 1: Import PM Block
        pmBlock.importPMBlock(pmblockName, pmblockPath);
        cy.get(selectorsPB.savePMBlock).click();

        //Step 2: CLick on PM Block
        navHelper.navigateToPmBlock(pmblockName);

        //Step 3: Open the PMBlock  Imported
        pmBlock.searchPmblockAndSelectOptions(pmblockName, "edit");

        //Step 4: verify fortm task in PM Block
        cy.get('[data-type="processmaker.components.nodes.task.Shape"]').eq(0).contains("Form Task").should("be.visible");
    }
    actionsAndAssertionsOfTCP43160() {
        let pmblockName = "TCP4-3160 PMBlock with Manual Task";
        let pmblockPath = "pmblocks/tcp4-3160_pmblock_with_manual_task.json";

        //Step 1: Import PM Block
        pmBlock.importPMBlock(pmblockName, pmblockPath);
        cy.get(selectorsPB.savePMBlock).click();

        //Step 2: CLick on PM Block
        navHelper.navigateToPmBlock(pmblockName);

        //Step 3: Open the PMBlock  Imported
        pmBlock.searchPmblockAndSelectOptions(pmblockName, "edit");

        //Step 4: verify fortm task in Pm Block
        cy.get('[data-type="processmaker.components.nodes.task.Shape"]').eq(0).contains("ManualTask1").should("be.visible");
        cy.get('[data-type="processmaker.components.nodes.task.Shape"]').eq(1).contains("ManualTask2").should("be.visible");
    }
    actionsAndAssertionsOfTCP43161() {
        let pmblockName = "PMBlock with Script Task TCP4-3161";
        let pmblockPath = "pmblocks/pmblock_with_script_task_tcp4-3161.json";

        //Step 1: Import PM Block
        pmBlock.VerifyPresenceOfPMBlockAndImportPMBlock(pmblockName, pmblockPath);
        //cy.get(selectorsPB.savePMBlock).click();

        //Step 2: CLick on PM Block
        navHelper.navigateToPmBlock(pmblockName);

        //Step 3: Open the PMBlock  Imported
        pmBlock.searchPmblockAndSelectOptions(pmblockName, "edit");

        //Step 4: verify fortm task in Pm Block
        cy.get('[data-type="processmaker.components.nodes.task.Shape"]')
            .eq(0)
            .contains("ScriptTask")
            .should("be.visible");
    }
    actionsAndAssertionsOfTCP43162() {
        let pmblockName = "TCP4-3162 PmBlock with Thread";
        let pmblockPath = "pmblocks/tcp4-3162_pmblock_with_thread.json";

        //Step 1: Import PM Block
        pmBlock.importPMBlock(pmblockName, pmblockPath);
        cy.get(selectorsPB.savePMBlock).click();

        //Step 2: CLick on PM Block
        navHelper.navigateToPmBlock(pmblockName);

        //Step 3: Open the PMBlock  Imported
        pmBlock.searchPmblockAndSelectOptions(pmblockName, "edit");

        //Step 4: verify fortm task in Pm Block
        cy.get('[data-type="processmaker.components.nodes.task.Shape"]').eq(0).contains("Sub Process").should("be.visible");
    }
    actionsAndAssertionsOfTCP43183(name) {
        let timeStamp = new Date().getTime();
        let dataConnectorName = "TCP4-3183-Data Connector" + timeStamp;
        let dataConnectorDescription = "TCP4-3183";
        let dataconnectorType = "No Auth";

        //Step 1: Create Data connector
        navHelper.navigateToDataConnectorPage();
        dataconnector.createADataConnector(dataConnectorName, dataConnectorDescription, dataconnectorType);

        //Step 2: Search created Data Connector and Add to Project
        navHelper.navigateToDataConnectorPage();
        dataconnector.searchDataConnectorAndSelectAction(dataConnectorName, "Add to Project");

        //Step 3: Click on Assign
        pmProjects.selectProjectInDataConnector(name);
        cy.xpath(selectors.assignProjects).should("be.visible");
        cy.xpath(selectors.assignProjects).click({ force: true });
        cy.get('[class="modal-content"]').should("be.visible");
        cy.get('#nav-collapse > div > div',{timeout: 10000}).should("be.visible");

        //Step 4: verify that the process is added to the project
        navHelper.navigateToPmProjects();
        pmProjects.searchProjectsAndSelectOptions(name, "open");
        request.waitUntilElementIsVisible('selector','[data-cy="asset-listing-table"]');
        cy.get('.search-bar > .search-bar-container > .pmql-input').should('be.visible');
        cy.get('.search-bar > .search-bar-container > .pmql-input').type(dataConnectorName,{delay:20}).type('{enter}').should('have.value',dataConnectorName);
        cy.xpath('//tbody[@class="vuetable-body"]//tr//a').should('contain',dataConnectorName);
     }
    actionsAndAssertionsOfTCP42963(processName){
        const timeStamp = new Date().getTime();
        let pmblockName = `${timeStamp}TCP4-2963 PM Block with PDF`;
        let pmblockDescription = "Description for  Test Case TCP4-2963";

        //Step 1: Got to Designer
        navHelper.navigateToProcessPage();

        //Step 2: Search th process
        process.searchProcessAndSelectOptions(processName, "pmBlock");

        //Step 3: Create a PMBlock
        pmBlock.createPMBlock(pmblockName, pmblockDescription);

        //Step 4: Go to tab Pm Block
        navHelper.navigateToPmBlock();

        //Step 5: Search the  pmblock created
        pmBlock.searchPmblockAndSelectOptions(pmblockName, "edit");

        //Step 6: Verify that pmblock contain components PDF Generated
        cy.get('[data-type="processmaker.components.nodes.task.Shape"]').eq(1).contains("PDF Generator").should("be.visible");
    }
    actionsAndAssertionsOfTCP42964(processName){
        const timeStamp = new Date().getTime();
        let pmblockName = `${timeStamp}TCP4-2964 PM Block with IDP`;
        let pmblockDescription = "Description for  Test Case TCP4-2964";

        //Step 1: Got to Designer
        navHelper.navigateToProcessPage();

        //Step 2: Search th process
        process.searchProcessAndSelectOptions(processName, "pmBlock");

        //Step 3: Create a PMBlock
        pmBlock.createPMBlock(pmblockName, pmblockDescription);

        //Step 4: Go to tab Pm Block
        navHelper.navigateToPmBlock();

        //Step 5: Search the  pmblock created
        pmBlock.searchPmblockAndSelectOptions(pmblockName, "edit");

        //Step 6: Verify that pmblock contain components IDP
        cy.get('[data-type="processmaker.components.nodes.task.Shape"]').eq(1).contains("IntelligentDocumentProcessing").should("be.visible");
    }
    actionsAndAssertionsOfTCP42966(processName){
        const timeStamp = new Date().getTime();
        let pmblockName = `${timeStamp}TCP4-2966 PM Block with Decision Table`;
        let pmblockDescription = "Description for  Test Case TCP4-2966";

        //Step 1: Got to Designer
        navHelper.navigateToProcessPage();

        //Step 2: Search th process
        process.searchProcessAndSelectOptions(processName, "pmBlock");

        //Step 3: Create a PMBlock
        pmBlock.createPMBlock(pmblockName, pmblockDescription);

        //Step 4: Go to tab Pm Block
        navHelper.navigateToPmBlock();

        //Step 5: Search the  pmblock created
        pmBlock.searchPmblockAndSelectOptions(pmblockName, "edit");

        //Step 6: Verify that pmblock contain components IDP
        cy.get('[data-type="processmaker.components.nodes.task.Shape"]').eq(1).contains("DecisionTask").should("be.visible");
    }
    actionsAndAssertionsOfTCP43103(name) {
        let processName = "Process  simple  for projects";
        let processPath = "processes/process__simple__for_projects.json";

        //Step 1: Got to Designer
        navHelper.navigateToProcessPage();

        //Step 2: Import process
        process.verifyPresenceOfProcessAndImportProcess(
            processName,
            processPath
        );

        // Step 3: Assign project  in Process
        navHelper.navigateToProcessPage();
        process.searchProcessAndSelectOptions(processName, "addToProject");

        //Step 4: Click on Assign
        pmProjects.selectProjectInProcess(name);
        
        cy.xpath(selectors.assignProjects).first().should("be.visible");
        cy.xpath(selectors.assignProjects).click();

        //Step 5: verify that the process is added to the project
        navHelper.navigateToProcessPage();
        navHelper.navigateToPmProjects();
        pmProjects.searchProjectsAndSelectOptions(name, "open");

        //Step 6: Verify that the process was assigned to the project
        //cy.xpath('//*[contains(text(),"Process")]').should("be.visible");
    }
    actionsAndAssertionsOfTCP43179(name) {
        let timeStamp = new Date().getTime();
        let decisionTableName =`DecisionTableTCP4-3179${timeStamp}`;
        let description=`TCP4-3179${timeStamp}`;

        //Step 1: Create Decision Table
        navHelper.navigateToDecisionTables();
        decisionTables.modalCreateDecisionTable({nameValue:decisionTableName,descriptionValue:description});
        decisionTables.verifyDecisionTableWasCreated(decisionTableName);

        //Step 2: Go to Decision table
        navHelper.navigateToDecisionTables();

        //Step 3: Select Add To Project in Decision table
        decisionTables.searchDecisionTableAndSelectOptions(decisionTableName, "addToProject");

        //Step 4: Select project in Decision Table
        pmProjects.selectProjectInDecisionTable(name);
        cy.xpath(selectors.assignProjects).should("be.visible");
        cy.xpath(selectors.assignProjects).click({ force: true });
        cy.get('#nav-collapse > div > div').should("be.visible");

        //Step 5: verify that the process is added to the project
        navHelper.navigateToPmProjects();
        pmProjects.searchProjectsAndSelectOptions(name, "open");
        request.waitUntilElementIsVisible('selector','[data-cy="asset-listing-table"]');
        cy.get('.search-bar > .search-bar-container > .pmql-input').should('be.visible');
        cy.get('.search-bar > .search-bar-container > .pmql-input').type(decisionTableName,{delay:20}).type('{enter}').should('have.value',decisionTableName);
        cy.xpath('//tbody[@class="vuetable-body"]//tr//a').should('contain',decisionTableName);
     }
     actionsAndAssertionsOfTCP43051() {
        const projectName = "Project 373211";
        const projectPath = "projects/project_373211.json";

        //Step 1: Import Project
        pmProjects.importProjects(projectPath);

        //Step 2: Click on Projects
        navHelper.navigateToPmProjects();

        //Step 3: Search the Project Imported
        pmProjects.searchProjectsAndSelectOptions(projectName, "open");
    }
    actionsAndAssertionsOfTCP42954() {
        //Step 1: Verify that process contains  two pmblocks
        cy.get('[data-type="processmaker.components.nodes.task.Shape"]').eq(1).contains("PMBlock1").should("be.visible");
        cy.wait(500);
        cy.get('[data-type="processmaker.components.nodes.task.Shape"]').eq(2).contains("PMBlock2").should("be.visible");
   }
    actionsAndAssertionsOfTCP43173(processName) {
        let pmblockName1 = "Calculator";
        let pmblockName2 = "Currency";
        let pmblockName3 = "Financial Assistant";

        //Step 1: Search the  PmBlock for  default Calculator
        pmBlock.searchForAPMBlock(pmblockName1);

        //Step 2: verify that the default pmblock Calculator is in the list of pmblocks
        cy.xpath('//*[contains(text(),"Calculator")]').should("be.visible");

        //Step 3: Go to Projects
        navHelper.navigateToPmBlock();

        //Step 4: Search the  PmBlock for  default Currency
        pmBlock.searchForAPMBlock(pmblockName2);

        //Step 5: verify that the default pmblock Currency is in the list of pmblocks
        cy.xpath('//*[contains(text(),"Currency")]').should("be.visible");

        //Step 3: Go to Projects
        navHelper.navigateToPmBlock();

        //Step 4: Search the  PmBlock for  default Financial Assistant 
        pmBlock.searchForAPMBlock(pmblockName3);

        //Step 5: verify that the default pmblock Currency is in the list of pmblocks
        cy.xpath('//*[contains(text(),"Financial Assistant")]').should("be.visible");
    }

    actionsAndAssertionsOfTCP43214(){
        const templatePath = "templates/Template_Action By Email.json";
        const templateName = "Template Action By Email";

        //Step 1: Click on Import Template 
        templates.importTemplates(templatePath);

        //Step 2: Click on Template tab 
        navHelper.navigateToTemplatePage();

        //Step3: search the  tenplate imported
        templates.searchTemplateAndSelectOptions(templateName, "config");

        //Step4: verify that template is  imported correctly
        cy.xpath('//*[contains(text(),"Template Action By Email")]').should('be.visible');
        

    }

    actionsAndAssertionsOfTCP43215(){
        cy.reload();
        request.waitUntilElementIsVisible('selector','g > text >tspan');
        cy.get('g > text >tspan').contains('Data').should('be.visible');
    }

    actionsAndAssertionsTCP43217(nameProcess, version){
        navHelper.navigateToProcessPage();
        process.searchProcessAndSelectOptions(nameProcess,"Template");
        var templateName = new Date().getTime()+"TCP4-3217";
        var Description = new Date().getTime()+"Description TCP4-3217";
        //Step 1: Create process as a Template
        process.publishTemplate(templateName, Description, version);
        //Step 2: Review template created
        cy.get("#nav-templates-tab").should('be.visible').click();
        templates.searchTemplateAndSelectOptions(templateName,"edit");
    }

    actionsAndAssertionsTCP43224(nameProcess, version){
        var templateName = new Date().getTime()+"TCP4-3224";
        var Description = new Date().getTime()+"TCP4-3224";
        
        navHelper.navigateToProcessPage();
        process.searchProcessAndSelectOptions(nameProcess,"Template");
        
        //Step 1: Create process as a Template
        process.publishTemplate(templateName, Description, version);
        //Step 2: Review template created and verify send email task
        cy.get("#nav-templates-tab").should('be.visible').click();
        templates.searchTemplateAndSelectOptions(templateName,"edit");
        cy.get('g > text >tspan').contains('Send').should('be.visible');

        }

    actionsAndAssertionsTCP43218(nameProcess, version){
        navHelper.navigateToProcessPage();
        process.searchProcessAndSelectOptions(nameProcess,"Template");
        var templateName = new Date().getTime()+"TCP4-3218";
        var Description = new Date().getTime()+"TCP4-3218";
        //Step 1: Create process as a Template
        process.publishTemplate(templateName, Description, version);
        //Step 2: Review template created
        cy.get("#nav-templates-tab").click();
        templates.searchTemplateAndSelectOptions(templateName, "Config");
    }
    actionsAndAssertionsOfTCP43221() {
        cy.reload();
        request.waitUntilElementIsVisible('selector','g > text >tspan');
        cy.get('g > text >tspan').contains('PDF').should('be.visible');
    }
    actionsAndAssertionsTCP43230(nameProcess, version){
        navHelper.navigateToProcessPage();
        process.searchProcessAndSelectOptions(nameProcess,"Template");
        var templateName = new Date().getTime()+"TCP4-3230";
        var Description = new Date().getTime()+"TCP4-3230";

        //Step 1: Create process as a Template
        process.publishTemplate(templateName, Description, version);

        //Step 2: Review template created
        cy.get("#nav-templates-tab").click();
        //process.searchTemplate(templateName);

        //Step 3: Verify that template  contains Decision Table
        templates.searchTemplateAndSelectOptions(templateName, "edit");
        cy.reload();
        request.waitUntilElementIsVisible('selector','g > text >tspan');
        cy.get('g > text >tspan').contains('Data').should('be.visible');
    }
    actionsAndAssertionsTCP43225(nameProcess, version) {
        navHelper.navigateToProcessPage();
        process.searchProcessAndSelectOptions(nameProcess,"Template");
        var templateName = new Date().getTime()+"TCP4-3225";
        var Description = new Date().getTime()+"TCP4-3225";

        //Step 1: Create process as a Template
        process.publishTemplate(templateName, Description, version);

        //Step 2: Review template created
        cy.get("#nav-templates-tab").click();
        //process.searchTemplate(templateName);

        //Step 3: Verify that template  contains Decision Table
        templates.searchTemplateAndSelectOptions(templateName, "edit");
        cy.reload();
        request.waitUntilElementIsVisible('selector','g > text >tspan');
        cy.get('g > text >tspan').contains('Decision').should('be.visible');
    }

    actionsAndAssertionsOfTCP43222(){
        //cy.wait(3000);
        //cy.reload();
        request.waitUntilElementIsVisible('selector','g > text >tspan');
        cy.get('g > text >tspan').contains('Send').should('be.visible');
    }

    actionsAndAssertionsTCP43223(nameProcess, version){
        navHelper.navigateToProcessPage();
        process.searchProcessAndSelectOptions(nameProcess,"Template");
        var templateName = new Date().getTime()+"TCP4-3223";
        var Description = new Date().getTime()+"TCP4-3223";
        
        //Step 1: Create process as a Template
        process.publishTemplate(templateName, Description, version);
        
        //Step 2: Review template created
        cy.get("#nav-templates-tab").click();
        templates.searchTemplateAndSelectOptions(templateName,"Config");
        }
    actionsAndAssertionsOfTCP43232() {
        // Ste 1: Verify that template contains IDP
        cy.reload();
        request.waitUntilElementIsVisible('selector','g > text >tspan');
        cy.get('g > text >tspan').contains('Intelligent').should('be.visible');
        }
    actionsAndAssertionsOfTCP43233() {
        //Step 1: Verify that template contains Data Connectors
        request.waitUntilElementIsVisible("selector", "g > text >tspan");
        cy.get('g > text >tspan').contains('Data').should('be.visible');
    }
    actionsAndAssertionsOfTCP43234() {
        //Step 1: Verify that template contains Decision Task
        request.waitUntilElementIsVisible("selector", "g > text >tspan");
        cy.get('g > text >tspan').contains('Decision').should('be.visible');
    }
    actionsAndAssertionsTCP43235(nameProcess, version) {
        navHelper.navigateToProcessPage();
        process.searchProcessAndSelectOptions(nameProcess,"Template");
        var templateName = new Date().getTime()+"TCP4-3235";
        var Description = new Date().getTime()+"TCP4-3235";

        //Step 1: Create process as a Template
        process.publishTemplate(templateName, Description, version);

        //Step 2: Review template created
        cy.get("#nav-templates-tab").click();
        //process.searchTemplate(templateName);

        //Step 3: Verify that template  contains Decision Table
        templates.searchTemplateAndSelectOptions(templateName, "edit");
        cy.reload();
        request.waitUntilElementIsVisible('selector','g > text >tspan');
        cy.get('g > text >tspan').contains('PMBlock1-A').should('be.visible');
    }
    actionsAndAssertionsTCP43236(nameProcess3, version) {
        navHelper.navigateToProcessPage();
        process.searchProcessAndSelectOptions(nameProcess3,"Template");
        var templateName = "TCP4-3236-" + new Date().getTime();
        var Description = "TCP4-3236 Description";

        //Step 1: Create process as a Template
        process.publishTemplate(templateName, Description, version);

        //Step 2: Review template created
        cy.get("#nav-templates-tab").click();

        //Step 3: Verify that template  contains Pmblock and two Threads
        templates.searchTemplateAndSelectOptions(templateName, "edit");
        cy.reload();
        request.waitUntilElementIsVisible('selector','g > text >tspan');
        cy.get('g > text >tspan').contains('PMBlock1-A').should('be.visible');
        request.waitUntilElementIsVisible('selector','g > text >tspan');
        cy.get('g > text >tspan').contains('SubProcess1').should('be.visible');
        request.waitUntilElementIsVisible('selector','g > text >tspan');
        cy.get('g > text >tspan').contains('SubProcess2').should('be.visible');
    }
    actionsAndAssertionsTCP43237(nameProcess, version){
        navHelper.navigateToProcessPage();
        process.searchProcessAndSelectOptions(nameProcess,"Template");
        var templateName = new Date().getTime()+"TCP4-3237";
        var Description = new Date().getTime()+"TCP4-3237";

        //Step 1: Create process as a Template
        process.publishTemplate(templateName, Description, version);

        //Step 2: Review template created
        cy.get("#nav-templates-tab").click();
        
        //Step 3: Verify that template  contains Decision Table
        templates.searchTemplateAndSelectOptions(templateName, "export");
        cy.get('.alert > span').contains('exported').should('be.visible');
    }
    actionsAndAssertionsOfTCP43238(templateName) {
        var timeStamp = new Date().getTime();
        var processName = "TCP4-3238 Template Threads"+timeStamp;
        //Ste 1: Search template imported
        navHelper.navigateToProcessPage();
        process.clickOnAddProcess();
               
        //Step2: Create the  process from template
        templates.searchTemplateFromProcess(templateName);
        //Click on use Template
        cy.xpath('//button[@class="btn btn-primary btn-sm right"]').should("be.visible").click();
        cy.xpath('//input[@name="name"]').clear();
        process.enterProcessName(processName);
        process.clickOnSaveInAddProcessModal();
        //Step 3: Verify that process can be created from templated
        navHelper.navigateToProcessPage();
        process.searchProcessAndSelectOptions(processName,"edit");
        cy.get('[data-type="processmaker.components.nodes.task.Shape"]').eq(0).contains("Sub Process").should("be.visible");

    }
    actionsAndAssertionsOfTCP43392() {
        
        //Step 1: Create Screen Form inside Project
        cy.wait(2000);
        var screenName = "TCP4-3392Screen" + new Date().getTime();
        cy.xpath('//div[contains(text(),"New Screen")]').should('be.visible');
        cy.get('input[name="title"]').type(screenName,{delay:50});
        cy.get('textarea[name="description"]').type("Description TCP4-3392");
        cy.xpath("//a[contains(text(),'Save')]").click();
        cy.xpath('//*[@class="btn text-uppercase btn-primary btn-sm"]').click();
        cy.xpath('//button[text()="Publish"]').click();

        //Verify that screen is created inside project
        cy.get(selectors.assetListingTable).find(".asset_title.asset_type_screen").should("exist");
        cy.get('textarea[aria-label="Advanced Search (PMQL)"]').should('be.visible').type(screenName);
        cy.get('textarea[aria-label="Advanced Search (PMQL)"]').type('{enter}');
        cy.xpath('//tr//td[2]//a[contains(text(),"'+screenName+'")]').should('be.visible');
        
    }
    
    actionsAndAssertionsOfTCP43393() {
        
        //Step 1: Create Screen Display
        cy.wait(2000);
        const screenName = "TCP4-3393 Screen " + new Date().getTime();
        cy.get('input[name="title"]').type(screenName);
        cy.get('textarea[name="description"]').type("Description TCP4-3392");
        cy.get('[class="multiselect screen-type-select mt-2"] div[class="multiselect__select"]').click();
        cy.get('#option-1-2 > .multiselect__option > .type-container').click({force:true});
        cy.xpath('//a[contains(text(),"Save")]').click();
        cy.xpath('//button[@class="btn text-uppercase btn-primary btn-sm"]').click();
        cy.xpath('//button[text()="Publish"]').click();

        // Step 2: Verify that after saving the created screen display, the list of project assets is shown
        cy.get(selectors.assetListingTable).find(".asset_title.asset_type_screen").should("exist");
        cy.get('textarea[aria-label="Advanced Search (PMQL)"]').should('be.visible').type(screenName);
        cy.get('textarea[aria-label="Advanced Search (PMQL)"]').type('{enter}');
        cy.xpath('//tr//td[2]//a[contains(text(),"'+screenName+'")]').should('be.visible');
        }

    actionsAndAssertionsOfTCP43394() {
        //Step 1: Create Screen email
        cy.wait(2000);
        const screenName = "TCP4-3394 Screen " + new Date().getTime();
        cy.get('input[name="title"]').type(screenName);
        cy.get('textarea[name="description"]').type("Description TCP4-3394");
        cy.get('[class="multiselect screen-type-select mt-2"] div[class="multiselect__select"]').click();
        cy.get('#option-1-1 > .multiselect__option > .type-container').click({force:true});
        cy.xpath('//a[contains(text(),"Save")]').click();
        cy.xpath('//button[@class="btn text-uppercase btn-primary btn-sm"]').click();
        cy.xpath('//button[text()="Publish"]').click();

        // Step 2: Verify that after saving the created screen email, the list of project assets is shown
        cy.get(selectors.assetListingTable).find(".asset_title.asset_type_screen").should("exist");
        cy.get('textarea[aria-label="Advanced Search (PMQL)"]').should('be.visible').type(screenName);
        cy.get('textarea[aria-label="Advanced Search (PMQL)"]').type('{enter}');
        cy.xpath('//tr//td[2]//a[contains(text(),"'+screenName+'")]').should('be.visible');
    }
        
   
    actionsAndAssertionsOfTCP43395() {
        //Step 1: Create Screen Display
        cy.wait(2000);
        const screenName = "TCP4-3394 Screen " + new Date().getTime();
        cy.get('input[name="title"]').type(screenName);
        cy.get('textarea[name="description"]').type("Description TCP4-3395");
        cy.get('[class="multiselect screen-type-select mt-2"] div[class="multiselect__select"]').click();
        cy.get('#option-1-3 > .multiselect__option > .type-container').click({force:true});
        cy.xpath('//a[contains(text(),"Save")]').click();
        cy.xpath('//button[@class="btn text-uppercase btn-primary btn-sm"]').click();
        cy.xpath('//button[text()="Publish"]').click();

        // Step 2: Verify that after saving the created screen display, the list of project assets is shown
        cy.get(selectors.assetListingTable).find(".asset_title.asset_type_screen").should("exist");
        cy.get('textarea[aria-label="Advanced Search (PMQL)"]').should('be.visible').type(screenName);
        cy.get('textarea[aria-label="Advanced Search (PMQL)"]').type('{enter}');
        cy.xpath('//tr//td[2]//a[contains(text(),"'+screenName+'")]').should('be.visible');
    }

    actionsAndAssertionsOfTCP43391() {
        // Step1: Select the "Build your own" option.
         cy.get("div.card.button-card h5.m-0")
         .contains("Build Your Own")
         .click();

        // Step 2: Fill inputs and save Process.
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(2000);
        const processName = "TCP4-3391 Process " + new Date().getTime();
        cy.get('input[name="name"]').type(processName);
        cy.get('textarea[name="description"]').type("TCP4-3391 Description");
        cy.get(
         'footer.modal-footer button.btn.btn-secondary:contains("Save")'
        ).click();
        cy.get('[data-cy="publish-btn"]').click();
        cy.xpath('//button[text()="Save"]').click();

        // Step 2: Verify that after saving the created screen display, the list of project assets is shown
        cy.get(selectors.assetListingTable)
            .find(".asset_title.asset_type_process")
            .should("exist");
    }

    actionsAndAssertionsOfTCP43396() {
        // Step 1: Select the "Create New Script" option.
        let scriptName = "TCP4-3396 Script " + new Date().getTime();
        cy.xpath('//input[@name="title"]').should('be.visible');
        cy.xpath('//input[@name="title"]').type(scriptName,{delay:40}).should('have.value',scriptName);
        cy.get('textarea[name="description"]').type("TCP4-3396 Description");
        cy.xpath('//span[contains(text(),"php TCP43396")]').click();

        //Step 2: Click on Save Script
        cy.xpath('//button[contains(text(),"Save")]').click();
        cy.xpath('//button[@class="btn text-capitalize pl-3 pr-3 btn-secondary btn-sm"]').should("be.visible");
        cy.xpath('//button[@class="btn text-uppercase btn-primary btn-sm"]').click();
        cy.get('[class="modal-title"]').should("be.visible");
        cy.xpath('//button[text()="Publish"]').click();

        // Step 3: Verify that after saving the created screen display, the list of project assets is shown
        cy.get('[class="col-sm-12"]').should("be.visible");
        cy.get(selectors.assetListingTable).find(".asset_title.asset_type_script").should("exist");
    }
    actionsAndAssertionsOfTCP43418() {

        // Step 1: Select the "Create New Script" option.

        cy.wait(2000);
        var scriptName = "TCP4-3418 Script " + new Date().getTime();
        cy.xpath('//input[@name="title"]').type(scriptName);
        cy.get('textarea[name="description"]').type("TCP4-3418 Description");
        cy.wait(2000);
        cy.xpath('(//span[contains(text(),"Python")])[1]').click();
        //cy.xpath('//span[contains(text(),"php")]').click();
        cy.wait(3000);

        //Step 2: Click on Save Script
        cy.get(
            'footer.modal-footer button.btn.btn-secondary:contains("Save")'
        ).click();
        cy.xpath('//button[@class="btn text-capitalize pl-3 pr-3 btn-secondary btn-sm"]').should("be.visible");
        cy.xpath('//button[@class="btn text-uppercase btn-primary btn-sm"]').click();
        cy.get('[class="modal-title"]').should("be.visible");
        cy.xpath('//button[text()="Publish"]').click();

        // Step 3: Verify that after saving the created screen display, the list of project assets is shown
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(3000);
        cy.get('[class="col-sm-12"]').should("be.visible");
        cy.get(selectors.assetListingTable).find(".asset_title.asset_type_script").should("exist");
    }
    actionsAndAssertionsOfTCP43419() {
        // Step 1: Select the "Create New Script" option.
        let  scriptName = "TCP4-3419 Script " + new Date().getTime();
        cy.xpath('//input[@name="title"]').should('be.visible');
        cy.xpath('//input[@name="title"]').type(scriptName,{delay:40}).should('have.value',scriptName);
        cy.get('textarea[name="description"]').type("TCP4-3419 Description");
        cy.xpath('(//span[contains(text(),"javaScript TCP43419")])[1]//ancestor::div[@class="card-body"]').click();
        
        //Step 2: Click on Save Script
        cy.xpath('//button[contains(text(),"Save")]').click();
        cy.xpath('//button[@class="btn text-capitalize pl-3 pr-3 btn-secondary btn-sm"]').should("be.visible");
        cy.xpath('//button[contains(text(),"Publish")]').should('be.visible');
        cy.xpath('//button[contains(text(),"Publish")]').click();
        cy.get('[class="modal-title"]').should("be.visible");
        cy.xpath('//button[text()="Publish"]').click();
        
        // Step 3: Verify that after saving the created screen display, the list of project assets is shown
        cy.get('[class="col-sm-12"]').should("be.visible");
        cy.get(selectors.assetListingTable).find(".asset_title.asset_type_script").should("exist");
    }
    actionsAndAssertionsOfTCP43398() {

        // Step 1: Select the "Create New Script" option.

        cy.wait(2000);
        var decisionTableName = "TCP4-3398 Decision Table " + new Date().getTime();
        cy.xpath('//input[@name="name"]').type(decisionTableName);
        cy.xpath('//textarea[@name="description"]').type("TCP4-3398 Description");
        cy.wait(3000);

        //Step 2: Click on Save Script
        cy.xpath('//button[contains(text(),"Save")]').click();
        
        // Step 3:  SAve in Content decioisn table 
        cy.xpath('//button[@class="btn btn-primary btn-sm"]').click();

        cy.get(selectors.assetListingTable).find(".asset_title.asset_type_decision_table").should("exist");
    }
    actionsAndAssertionsTCP43219(processName, version){
        navHelper.navigateToProcessPage();
        process.searchProcessAndSelectOptions(processName,"Template");
        var templateName = new Date().getTime()+"-TCP4-3219";
        var Description = "TCP4-3219 description";
        //Step 1: Create process as a Template
        process.publishTemplate(templateName, Description, version);
        //Step 2: Review template created
        cy.get("#nav-templates-tab").click();
        templates.searchTemplateAndSelectOptions(templateName,"Config");
        }
}
