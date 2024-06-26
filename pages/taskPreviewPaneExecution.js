import {NavigationHelper} from "#helpers/navigationHelper";
import {taskPreviewPane} from "#pages/taskPreviewPane";

const navHelper = new NavigationHelper();
const taskPreview = new taskPreviewPane();

export class taskPreviewPaneExecution{       
    ExecutionTCP43112TaskA(){
        navHelper.navigateToTasksPage();
        taskPreview.searchForTaskAndProcessFilterOneStatus('Task Preview Pane Data Connector','Self Service');
        cy.xpath('(//td[contains(text(),"Self Service")])[1]').should('be.visible');
        cy.xpath('(//a[contains(text(),"A")]/ancestor::tr/td/span/i)[1]')
            .should('be.visible');
        cy.xpath('(//a[contains(text(),"A")]/ancestor::tr/td/span/i)[1]').click((err, runnable) => {
            return false
        });
        cy.frameLoaded('#tasksFrame1');
        cy.iframe('#tasksFrame1')
            .find('button').eq(0)
            .should('be.visible')
            .click({force:true});
        navHelper.navigateToTasksPage();
        taskPreview.searchForTaskAndProcessFilterOneStatus('Task Preview Pane Data Connector','In Progress');
        cy.xpath('(//a[contains(text(),"A")]/ancestor::tr/td/span/i)[1]').click((err, runnable) => {
            return false
        });
        cy.frameLoaded('#tasksFrame1');
        cy.iframe('#tasksFrame1')
            .find('button').eq(0)
            .should('be.visible')
            .click({force:true});
        cy.iframe('#tasksFrame1')
            .find('input').eq(0).type('Bolivia',{force:true})
            .should('have.value', 'Bolivia').type('{enter}',{force:true});
        cy.iframe('#tasksFrame1')
            .find('input').eq(1).type('Chile',{force:true})
            .should('have.value', 'Chile').type('{enter}', {force:true});
        cy.iframe('#tasksFrame1')
            .find('button').eq(2)
            .should('be.visible')
            .click({force:true});
        cy.reload();
    }
    
    ExecutionTCP43112TaskB(){
        navHelper.navigateToTasksPage();
        taskPreview.searchForTaskAndProcessFilterOneStatus('Task Preview Pane Data Connector','In Progress');
        cy.xpath('(//a[contains(text(),"B")]/ancestor::tr/td/span/i)[1]').click((err, runnable) => {
            return false
        });
        cy.iframe('#tasksFrame1')
            .find('.multiselect__single').eq(0)
            .should('have.text', 'Bolivia');
        cy.iframe('#tasksFrame1')
            .find('.multiselect__single').eq(1)
            .should('have.text', 'Chile');
        cy.iframe('#tasksFrame1')
            .find('.multiselect__single').eq(2)
            .should('have.text', 'Bolivia');
        cy.iframe('#tasksFrame1')
            .find('p').eq(0)
            .should('have.text', 'BOL');
        cy.iframe('#tasksFrame1')
            .find('p').eq(1)
            .should('have.text', 'Bolivia');
        cy.iframe('#tasksFrame1')
            .find('p').eq(2)
            .should('contain.text', 'Latin America & Caribbean');
        cy.iframe('#tasksFrame1')
            .find('p').eq(3)
            .should('have.text', 'La Paz');
        cy.iframe('#tasksFrame1')
            .find('button').eq(5)
            .should('be.visible')
            .click({force:true});
        cy.reload();
    }

    ExecutionTCP43196Task(){
        navHelper.navigateToTasksPage();
        taskPreview.searchForTaskAndProcessFilterOneStatus(
            "TCP4-2931 Verify Request and Process",
            "In Progress"
        );
        cy.xpath(
            '(//a[contains(text(),"Form Task")]/ancestor::tr/td/span/i)[1]'
        ).click(() => {
            return false;
        });
        cy.frameLoaded('#tasksFrame1');
        cy.iframe('#tasksFrame1')
            .find('input').eq(0)
            .type('Test input',{force:true})
            .should('have.value', 'Test input')
            .type('{enter}',{force:true});
        cy.iframe('#tasksFrame1')
            .find('button').eq(0)
            .should('be.visible')
            .click({force:true});
    }

    ExecutionTCP43198TaskA(processName){
        navHelper.navigateToTasksPage();
        taskPreview.searchForTaskAndProcessFilterOneStatus(processName,'In Progress');
        cy.xpath('(//td[contains(text(),"In Progress")])[1]').should('be.visible');
        cy.xpath('(//a[contains(text(),"FormTaskA")]/ancestor::tr/td/span/i)[1]')
            .should('be.visible');
        cy.xpath('(//a[contains(text(),"FormTaskA")]/ancestor::tr/td/span/i)[1]').click((err, runnable) => {
            return false
        });

        cy.frameLoaded('#tasksFrame1');
        cy.iframe('#tasksFrame1')
            .find('input').eq(1)
            .should('be.visible')
            .type("test", { force: true })
            .should('have.value', 'test')
            .type("{enter}", { force: true });
        cy.iframe('#tasksFrame1')
            .find('textarea').eq(0)
            .should('be.visible')
            .type('test123',{force:true})
            .should('have.value', 'test123')
        cy.iframe('#tasksFrame1')
            .find('button').eq(0)
            .should('be.visible')
            .click({ force: true });
    }

    ExecutionTCP43198TaskManual(processName){
        navHelper.navigateToTasksPage();
        taskPreview.searchForTaskAndProcessFilterOneStatus(processName,'In Progress');
        cy.xpath('(//td[contains(text(),"In Progress")])[1]').should('be.visible');
        cy.xpath('(//a[contains(text(),"ManualTaskA")]/ancestor::tr/td/span/i)[1]')
            .should('be.visible');
        cy.xpath('(//a[contains(text(),"ManualTaskA")]/ancestor::tr/td/span/i)[1]').click((err, runnable) => {
            return false
        });

        cy.frameLoaded('#tasksFrame1');
        cy.iframe('#tasksFrame1')
            .find('button').eq(0)
            .should('be.visible')
            .click({ force: true });
    }

    ExecutionTCP43197TaskA(processName){
        navHelper.navigateToTasksPage();
        taskPreview.searchForTaskAndProcessFilterOneStatus(processName,'In Progress');
        cy.xpath('(//a[contains(text(),"FormTaskA")]/ancestor::tr/td/span/i)[1]').click((err, runnable) => {
            return false;
        });
        cy.frameLoaded('#tasksFrame1');
        cy.iframe('#tasksFrame1')
            .find('input').eq(0)
            .type('test input',{force:true})
            .should('have.value', 'test input')
            .type('{enter}',{force:true});
        cy.iframe('#tasksFrame1')
            .find('button').eq(0)
            .should('be.visible')
            .click({force:true});
    }
               
    ExecutionTCP43197TaskB(processName){
        navHelper.navigateToTasksPage();
        taskPreview.searchForTaskAndProcessFilterOneStatus(processName,'In Progress');
        cy.xpath('(//a[contains(text(),"FormTaskB")]/ancestor::tr/td/span/i)[1]').click((err, runnable) => {
            return false
        });
        cy.frameLoaded('#tasksFrame1');
        cy.iframe('#tasksFrame1')
          .find('input').eq(0)
          .should('have.value', 'test input')
          .type('{enter}',{force:true});
        cy.iframe('#tasksFrame1')
          .find('button').eq(0)
          .should('be.visible')
          .click({force:true});
    }   
    
    ExecutionTCP43216FormTask(processName){
        navHelper.navigateToTasksPage();
        taskPreview.searchForTaskAndProcessFilterOneStatus(processName,'In Progress');
        cy.xpath('(//a[contains(text(),"TCP43216FormTask")]/ancestor::tr/td/span/i)[1]').click((err, runnable) => {
            return false
        });
        cy.frameLoaded('#tasksFrame1');
        cy.iframe('#tasksFrame1')
            .find('.multiselect__input').eq(0)
            .type('International',{force:true})
            .should('have.value', 'International')
            .type('{enter}',{force:true});
        cy.iframe('#tasksFrame1')
          .find('div.form-group').eq(6)
          .contains('Country');
        cy.iframe('#tasksFrame1')
          .find('.multiselect__input').eq(1)
          .type('Brazil',{force:true})
          .should('have.value', 'Brazil')
          .type('{enter}',{force:true});
        cy.wait(3000);        
        cy.iframe('#tasksFrame1')
          .find('.multiselect__input').eq(2)
          .type('Acre',{force:true})
          .should('have.value', 'Acre')
          .type('{enter}',{force:true});
        cy.iframe('#tasksFrame1')
          .find('button').eq(0)
          .should('be.visible')
          .click({force:true});
    } 
    
    ExecutionTCP43216ManualTask(processName){
        navHelper.navigateToTasksPage();
        taskPreview.searchForTaskAndProcessFilterOneStatus(processName,'In Progress');
        cy.xpath('(//a[contains(text(),"TCP43216ManualTask")]/ancestor::tr/td/span/i)[1]').click((err, runnable) => {
            return false
        });
        cy.frameLoaded('#tasksFrame1');
        cy.iframe('#tasksFrame1')
          .find('p').eq(0)
          .contains('international');
        cy.iframe('#tasksFrame1')
          .find('p').eq(1)
          .contains('BR');
        cy.iframe('#tasksFrame1')
          .find('p').eq(2)
          .contains('Acre'); 
        cy.iframe('#tasksFrame1')
          .find('p').eq(3)
          .contains('AC');   
        cy.iframe('#tasksFrame1')
          .find('button').eq(0)
          .should('be.visible')
          .click({force:true});
    }

    ExecutionTCP43216ConversationalTask(processName){
        navHelper.navigateToTasksPage();
        taskPreview.searchForTaskAndProcessFilterOneStatus(processName,'In Progress');
        cy.xpath('(//a[contains(text(),"TCP43216ConversationalTask")]/ancestor::tr/td/span/i)[1]').click((err, runnable) => {
            return false
        });
        cy.frameLoaded('#tasksFrame1');
        cy.iframe('#tasksFrame1')
          .find('p').eq(0)
          .contains('international');
        cy.iframe('#tasksFrame1')
          .find('p').eq(1)
          .contains('BR');
        cy.iframe('#tasksFrame1')
          .find('p').eq(2)
          .contains('Acre'); 
        cy.iframe('#tasksFrame1')
          .find('p').eq(3)
          .contains('AC');   
        cy.iframe('#tasksFrame1')
        cy.frameLoaded('#tasksFrame1');
        cy.iframe('#tasksFrame1')
          .find('input').eq(0)
          .type('Bolivia',{force:true})
          .should('have.value', 'Bolivia')
          .type('{enter}',{force:true});
        cy.iframe('#tasksFrame1')
          .find('button').eq(0)
          .should('be.visible')
          .click({force:true});
    }
}
