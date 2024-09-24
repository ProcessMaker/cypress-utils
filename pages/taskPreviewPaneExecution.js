import {NavigationHelper} from "#helpers/navigationHelper";
import {taskPreviewPane} from "#pages/taskPreviewPane";
import selectors from "#selectors/taskPreviewPane";

const navHelper = new NavigationHelper();
const taskPreview = new taskPreviewPane();

export class taskPreviewPaneExecution{       
    ExecutionTCP43112TaskA(){
       navHelper.navigateToTasksPage();
       taskPreview.searchForTaskAndProcessFilterOneStatus('Self Service');
       cy.xpath(selectors.eyeTaskPreview.replace('task','Task Preview Pane A')).eq(0).trigger('mouseover', {force:true}).invoke('show');
       cy.xpath(selectors.eyeButton.replace('task','Task Preview Pane A')).eq(0).should('be.visible').click();      
       cy.frameLoaded(".iframe");
       cy.iframe(".iframe")
           .find('button').eq(0)
           .should('be.visible')
           .click({force:true});
       navHelper.navigateToTasksPage();
       taskPreview.searchForTaskAndProcessFilterOneStatus('In Progress');
       cy.xpath(selectors.eyeTaskPreview.replace('task','Task Preview Pane A')).eq(0).trigger('mouseover', {force:true}).invoke('show');
       cy.xpath(selectors.eyeButton.replace('task','Task Preview Pane A')).eq(0).should('be.visible').click();       
       cy.frameLoaded(".iframe");
       cy.iframe(".iframe")
           .find('button').eq(0)
           .should('be.visible')
           .click({force:true});
       cy.iframe(".iframe")
           .find('input').eq(0).type('Bolivia',{force:true})
           .should('have.value', 'Bolivia').type('{enter}',{force:true});
       cy.iframe('.iframe')
           .find('input').eq(1).type('Chile',{force:true})
           .should('have.value', 'Chile').type('{enter}', {force:true});
       cy.iframe('.iframe')
           .find('button').eq(2)
           .should('be.visible')
           .click({force:true});
       cy.reload();    
    }
    
    ExecutionTCP43112TaskB(){
        navHelper.navigateToTasksPage();
        taskPreview.searchForTaskAndProcessFilterOneStatus('In Progress');
        cy.iframe('.iframe')
            .find('.multiselect__single').eq(0)
            .should('have.text', 'Bolivia');
        cy.iframe('.iframe')
            .find('.multiselect__single').eq(1)
            .should('have.text', 'Chile');
        cy.iframe('.iframe')
            .find('.multiselect__single').eq(2)
            .should('have.text', 'Bolivia');
        cy.iframe('.iframe')
            .find('p').eq(0)
            .should('have.text', 'BOL');
        cy.iframe('.iframe')
            .find('p').eq(1)
            .should('have.text', 'Bolivia');
        cy.iframe('.iframe')
            .find('p').eq(2)
            .should('contain.text', 'Latin America & Caribbean');
        cy.iframe('.iframe')
            .find('p').eq(3)
            .should('have.text', 'La Paz');
        cy.iframe('.iframe')
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

    ExecutionTCP43198TaskA(){
        navHelper.navigateToTasksPage();
        taskPreview.searchForTaskAndProcessFilterOneStatus('In Progress');
        cy.xpath(selectors.eyeTaskPreview.replace('task','FormTaskA')).eq(0).trigger('mouseover', {force:true}).invoke('show');
        cy.xpath(selectors.eyeButton.replace('task','FormTaskA')).eq(0).should('be.visible').click();    
        cy.frameLoaded(".iframe");
        cy.iframe(".iframe")
            .find('input').eq(1)
            .should('be.visible')
            .type("test", { force: true })
            .should('have.value', 'test')
            .type("{enter}", { force: true });
        cy.iframe(".iframe")
            .find('textarea').eq(0)
            .should('be.visible')
            .type('test123',{force:true})
            .should('have.value', 'test123')
        cy.iframe(".iframe")
            .find('button').eq(0)
            .should('be.visible')
            .click({ force: true });
    }

    ExecutionTCP43198TaskManual(){
        navHelper.navigateToTasksPage();
        taskPreview.searchForTaskAndProcessFilterOneStatus('In Progress');
        cy.xpath(selectors.eyeTaskPreview.replace('task','ManualTaskA')).eq(0).trigger('mouseover', {force:true}).invoke('show');
        cy.xpath(selectors.eyeButton.replace('task','ManualTaskA')).eq(0).should('be.visible').click();    
        cy.frameLoaded(".iframe");
        cy.iframe(".iframe")
               .find('button').eq(0)
               .should('be.visible')
               .click({ force: true });
    }

    ExecutionTCP43197TaskA(){
        navHelper.navigateToTasksPage();
        taskPreview.searchForTaskAndProcessFilterOneStatus('In Progress');
        cy.xpath(selectors.eyeTaskPreview.replace('task','FormTaskA')).eq(0).trigger('mouseover', {force:true}).invoke('show');
        cy.xpath(selectors.eyeButton.replace('task','FormTaskA')).eq(0).should('be.visible').click();     
        cy.frameLoaded(".iframe");
        cy.iframe(".iframe")
          .find('input').eq(0)
          .type('test input',{force:true})
          .should('have.value', 'test input')
          .type('{enter}',{force:true});
        cy.iframe('.iframe')
          .find('button').eq(0)
          .should('be.visible')
          .click({force:true});
    }
               
    ExecutionTCP43197TaskB(){
        navHelper.navigateToTasksPage();
        taskPreview.searchForTaskAndProcessFilterOneStatus('In Progress');
        cy.xpath(selectors.eyeTaskPreview.replace('task','FormTaskB')).eq(0).trigger('mouseover', {force:true}).invoke('show');
        cy.xpath(selectors.eyeButton.replace('task','FormTaskB')).eq(0).should('be.visible').click();     
        cy.frameLoaded(".iframe");
        cy.iframe(".iframe")
          .find('input').eq(0)
          .should('have.value', 'test input')
          .type('{enter}',{force:true});
        cy.iframe(".iframe")
          .find('button').eq(0)
          .should('be.visible')
          .click({force:true});
    }   
    
    ExecutionTCP43216FormTask(){
      navHelper.navigateToTasksPage();
      taskPreview.searchForTaskAndProcessFilterOneStatus('In Progress');
      cy.xpath(selectors.eyeTaskPreview.replace('task','TCP43216FormTask')).eq(0).trigger('mouseover', {force:true}).invoke('show');
      cy.xpath(selectors.eyeButton.replace('task','TCP43216FormTask')).eq(0).should('be.visible').click();    
      cy.frameLoaded(".iframe");
      cy.iframe(".iframe")
          .find('.multiselect__input').eq(0)
          .type('International',{force:true})
          .should('have.value', 'International')
          .type('{enter}',{force:true});
      cy.iframe(".iframe")
        .find('div.form-group').eq(6)
        .contains('Country');
      cy.iframe(".iframe")
        .find('.multiselect__input').eq(1)
        .type('Brazil',{force:true})
        .should('have.value', 'Brazil')
        .type('{enter}',{force:true});
      cy.wait(8000);       
      cy.iframe(".iframe")
        .find('.multiselect__input').eq(2)
        .type('Acre',{force:true})
        .should('have.value', 'Acre')
        .type('{enter}',{force:true});
      cy.iframe(".iframe")
        .find('button').eq(0)
        .should('be.visible')
        .click({force:true});
    } 
    
    ExecutionTCP43216ManualTask(){
      navHelper.navigateToTasksPage();
      taskPreview.searchForTaskAndProcessFilterOneStatus('In Progress');
      cy.xpath(selectors.eyeTaskPreview.replace('task','TCP43216ManualTask')).eq(0).trigger('mouseover', {force:true}).invoke('show');
      cy.xpath(selectors.eyeButton.replace('task','TCP43216ManualTask')).eq(0).should('be.visible').click();    
      cy.frameLoaded(".iframe");
      cy.iframe(".iframe")
        .find('p').eq(0)
        .contains('international');
      cy.iframe(".iframe")
        .find('p').eq(1)
        .contains('BR');
      cy.iframe(".iframe")
        .find('p').eq(2)
        .contains('Acre');
      cy.iframe(".iframe")
        .find('p').eq(3)
        .contains('AC');  
      cy.iframe(".iframe")
        .find('button').eq(0)
        .should('be.visible')
        .click({force:true});
    }

    ExecutionTCP43216ConversationalTask(){
      navHelper.navigateToTasksPage();
      taskPreview.searchForTaskAndProcessFilterOneStatus('In Progress');
      cy.xpath(selectors.eyeTaskPreview.replace('task','TCP43216ConversationalTask')).eq(0).trigger('mouseover', {force:true}).invoke('show');
      cy.xpath(selectors.eyeButton.replace('task','TCP43216ConversationalTask')).eq(0).should('be.visible').click();    
      cy.frameLoaded(".iframe");
      cy.iframe(".iframe")
        .find('p').eq(0)
        .contains('international');
      cy.iframe(".iframe")
        .find('p').eq(1)
        .contains('BR');
      cy.iframe(".iframe")
        .find('p').eq(2)
        .contains('Acre');
      cy.iframe(".iframe")
        .find('p').eq(3)
        .contains('AC');  
      cy.iframe(".iframe")
      cy.frameLoaded(".iframe");
      cy.iframe(".iframe")
        .find('input').eq(0)
        .type('Bolivia',{force:true})
        .should('have.value', 'Bolivia')
        .type('{enter}',{force:true});
      cy.iframe(".iframe")
        .find('button').eq(0)
        .should('be.visible')
        .click({force:true});
    }
}
