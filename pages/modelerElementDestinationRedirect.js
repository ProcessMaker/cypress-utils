import selectors from "#selectors/modelerElementDestinationRedirect";
import selectorsAB from "#selectors/abTesting";
import { NavigationHelper } from "#helpers/navigationHelper";
import {ABTesting} from "#pages/abTesting";
const navHelper = new NavigationHelper();
const abTesting = new ABTesting();

export class ModelerElementDestinationRedirect {
    //Element Destination for TASKS
    configureElementDestinationInTask(nameElement,optionConfig, iframeOption = 'a'){
        abTesting.clickOnTask(nameElement, iframeOption);
        abTesting.clickOnInspectorBtn(iframeOption);
        this.selectOptionInTask(optionConfig,iframeOption);
        abTesting.publishNewVersion('withoutAB', iframeOption);
    }
  
    /**
     * This method selects an option in Element destination field in TASK control
     * @param option: name of option (Example: Task Source,Task List,Process Launchpad,Welcome Screen,Custom Dashboard,External URL)
     * @param iframe: (iframe A: 'a', iframe B: 'b')
    */

    selectOptionInTask(optionConfig,iframeOption = 'a'){
        const { option, dashboardName, url } = optionConfig
        let iframeSelector = iframeOption === 'a' ? selectorsAB.iframeA : selectorsAB.iframeB
        cy.iframe(iframeSelector).xpath(selectors.labelElementDestination).should('be.visible');
        switch (option) {
            case 'Task Source':
                this.selectElementDestination('Task Source',iframeOption);
                break;
            case 'Task List':
                this.selectElementDestination('Task List',iframeOption);
                break;
            case 'Process Launchpad':
                this.selectElementDestination('Process Launchpad',iframeOption);
                break;
            case 'Welcome Screen':
                this.selectElementDestination('Welcome Screen',iframeOption);
                    break;
            case 'Custom Dashboard':
                this.selectElementDestination('Custom Dashboard',iframeOption);
                this.selectDashboardInModeler(dashboardName,iframeOption);
                break;
            case 'External URL':
                this.selectElementDestination('External URL',iframeOption);
                this.selectExternalURLInModeler(url,iframeOption);
                break;
            default:
                break;
        }
    }

    selectDashboardInModeler(dashboardName,iframeOption = 'a'){
        let iframeSelector = iframeOption === 'a' ? selectorsAB.iframeA : selectorsAB.iframeB
        cy.iframe(iframeSelector).xpath(selectors.labelDashboard).should('be.visible');
        cy.iframe(iframeSelector).find(selectors.dashboardInput).click({force:true});
        cy.iframe(iframeSelector).find(selectors.dashboardInput).type(dashboardName,{delay:60}).should('have.value',dashboardName);
		cy.iframe(iframeSelector).xpath(selectors.wrapperDashboard)
			.should('have.attr', 'aria-label')
			.and('contain', dashboardName+ '. ');
		cy.iframe(iframeSelector).find(selectors.dashboardInput).type('{enter}');
    }

    selectExternalURLInModeler(url,iframeOption = 'a'){
        let iframeSelector = iframeOption === 'a' ? selectorsAB.iframeA : selectorsAB.iframeB
        cy.iframe(iframeSelector).xpath(selectors.labelURL).should('be.visible');
        cy.iframe(iframeSelector).find(selectors.urlInput).should('be.visible');
        cy.iframe(iframeSelector).find(selectors.urlInput).type(url,{delay:50}).should('have.value',url);
    }

    //Element Destination for END EVENT
    configureElementDestinationInEndEvent(nameElement, optionConfig, iframeOption = 'a'){
        abTesting.clickOnEndEvent(nameElement, iframeOption);
        abTesting.clickOnInspectorBtn(iframeOption);
        this.selectOptionInEndEvent(optionConfig,iframeOption);
        abTesting.publishNewVersion('withoutAB', iframeOption);
    }

    /**
     * This method selects an option in Element destination field END EVENT control
     * @param option: name of option (Example: Summary Screen,Task List,Process Launchpad,Welcome Screen,Dashboard,External URL,Another Process)
     * @param iframe: iframe (iframe A: 'a', iframe B: 'b')
    */

    selectOptionInEndEvent(optionConfig,iframeOption = 'a'){
        const { option, dashboardName, url } = optionConfig
        let iframeSelector = iframeOption === 'a' ? selectorsAB.iframeA : selectorsAB.iframeB
        cy.iframe(iframeSelector).xpath(selectors.labelElementDestination).should('be.visible');
        switch (option) {
            case 'Summary Screen':
                this.selectElementDestination('Summary Screen',iframeOption);
                break;
            case 'Task List':
                this.selectElementDestination('Task List',iframeOption);
                break;
            case 'Process Launchpad':
                this.selectElementDestination('Process Launchpad',iframeOption);
                break;
            case 'Welcome Screen':
                this.selectElementDestination('Welcome Screen',iframeOption);
                    break;
            case 'Custom Dashboard':
                this.selectElementDestination('Custom Dashboard',iframeOption);
                this.selectDashboardInModeler(dashboardName,iframeOption);
                break;
            case 'External URL':
                this.selectElementDestination('External URL',iframeOption);
                this.selectExternalURLInModeler(url,iframeOption);
                break;
            case 'Another Process':
                this.selectElementDestination('Another Process',iframeOption);
                this.selectAnotherProcessInModeler(ProcessName,iframeOption)
                break;
            default:
                break;
        }
    }

    selectAnotherProcessInModeler(ProcessName,iframeOption = 'a'){
        let iframeSelector = iframeOption === 'a' ? selectorsAB.iframeA : selectorsAB.iframeB
        cy.iframe(iframeSelector).xpath(selectors.labelProcess).should('be.visible');
        cy.iframe(iframeSelector).find(selectors.processInput).should('be.visible');
        cy.iframe(iframeSelector).find(selectors.dashboardInput).click();
        cy.iframe(iframeSelector).find(selectors.processInput).type(ProcessName,{delay:60}).should('have.value',ProcessName);
        cy.iframe(iframeSelector).xpath(selectors.selectProcess).click();
		cy.iframe(iframeSelector).xpath(selectors.wrapperProcess)
			.should('have.attr', 'aria-label')
			.and('contain', ProcessName+ '. ');
		cy.iframe(iframeSelector).xpath(selectors.processInput).type('{enter}');
    }

    selectElementDestination(option,iframeOption = 'a'){
        switch (iframeOption) {
            case 'a':
                this.selectOption(option,selectorsAB.iframeA)
                break;
            case 'b':
                this.selectOption(option,selectorsAB.iframeB)
                break;
            default:
                break;
        }
    }
    selectOption(option,iframe) {
        cy.iframe(iframe)
            .find(selectors.elementDestinationList)
            .click();
        cy.iframe(iframe)
            .contains(option)
            .click();
    }
}
