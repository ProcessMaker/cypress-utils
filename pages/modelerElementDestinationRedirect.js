import selectors from "#selectors/modelerElementDestinationRedirect";
import selectorsAB from "#selectors/abTesting";
import { NavigationHelper } from "#helpers/navigationHelper";


const navHelper = new NavigationHelper();

export class ModelerElementDestinationRedirect {

    /**
     * This method selects an option in Element destination field in TASK control
     * @param option: name of option (Example: Task Source,Task List,Process Launchpad,Welcome Screen,Custom Dashboard,External URL)
     * @param iframe: (iframe A: 'a', iframe B: 'b')
     * @return nothing returns
    */

    selectOptionInTask(option,iframe){
        //cy.iframe(iframeSelector).xpath(labelElementDestination).should('be.visible');
        switch (option) {
            case 'Task Source':
                this.selectElementDestination(iframe,'Task Source');
                break;
            case 'Task List':
                this.selectElementDestination(iframe,'Task List');
                break;
            case 'Process Launchpad':
                this.selectElementDestination(iframe,'Process Launchpad');
                break;
            case 'Welcome Screen':
                this.selectElementDestination(iframe,'Welcome Screen');
                    break;
            case 'Custom Dashboard':
                this.selectElementDestination(iframe,'Custom Dashboard');
                break;
            case 'External URL':
                this.selectElementDestination(iframe,'External URL');
                break;
            default:
                break;
        }
    }


    selectDashboard(){

    }

    /**
     * This method selects an option in Element destination field END EVENT control
     * @param option: name of option (Example: Summary Screen,Task List,Process Launchpad,Welcome Screen,Dashboard,External URL,'Another Process')
     * @param iframe: iframe (iframe A: 'a', iframe B: 'b')
     * @return nothing returns
    */
    selectOptionInEndEvent(option,iframe){
        //cy.iframe(iframeSelector).xpath(labelElementDestination).should('be.visible');
        switch (option) {
            case 'Summary Screen':
                this.selectElementDestination(iframe,'Summary Screen');
                break;
            case 'Task List':
                this.selectElementDestination(iframe,'Task List');
                break;
            case 'Process Launchpad':
                this.selectElementDestination(iframe,'Process Launchpad');
                break;
            case 'Welcome Screen':
                this.selectElementDestination(iframe,'Welcome Screen');
                    break;
            case 'Dashboard':
                this.selectElementDestination(iframe,'Dashboard');
                break;
            case 'External URL':
                this.selectElementDestination(iframe,'External URL');
                break;
            case 'Another Process':
                this.selectElementDestination(iframe,'Another Process');
                break;
            default:
                break;
        }
   
    }

    selectElementDestination(iframe,option){
        switch (iframe) {
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

    remaneTaskName(nameElement,newName,taskType,iframeOption = 'a'){
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        let formTask = '//div[@id="collapse-inspector-accordion-task"]//input[@name="name"]'
        let manualTask = '//div[@id="collapse-inspector-accordion-manual-task"]//input[@name="name"]'
        this.clickOnTask(nameElement, iframeOption);
        switch (taskType) {
            case 'Form':
                cy.iframe(iframeSelector).xpath(formTask).clear();
                cy.iframe(iframeSelector).xpath(formTask).type(newName);
                break;
            case 'Manual':
                cy.iframe(iframeSelector).xpath(manualTask).clear();
                cy.iframe(iframeSelector).xpath(manualTask).type(newName);
                break;
            default:
                break;
        }
    }


}
