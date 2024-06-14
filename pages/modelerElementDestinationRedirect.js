import selectors from "#selectors/modelerElementDestinationRedirect";

import { NavigationHelper } from "#helpers/navigationHelper";

const navHelper = new NavigationHelper();

export class ModelerElementDestinationRedirect {

    selectOptionInElementDestination(option,iframe){
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
            case 'Summary Screen':
                this.selectElementDestination(iframe,'Summary Screen');
                break;
            
            default:
                break;
        }
   
    }

    selectElementDestination(iframe,option){
        let iframeA = '[id="alternative_a"]'
        let iframeB = '[id="alternative_b"]'
        switch (iframe) {
            case 'a':
                this.selectOption(option,iframeA)
                break;
            case 'b':
                this.selectOption(option,iframeB)
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
