import selectors from "#selectors/taskCollapsable"
import { NavigationHelper } from "#helpers/navigationHelper";
const navHelper = new NavigationHelper();

export class TaskCollapsable {

	verifyPresenceOfTaskCollapsible() {
	    cy.xpath(selectors.detailsTab).should('be.visible');
	    cy.xpath(selectors.commentsTab).should('be.visible');
	    cy.get(selectors.collapseButton).should('be.visible'); 
	}

	verifyInProgressforTaskCollapsibleAllToggledOn(){
	  cy.xpath(selectors.detailsTab).should('be.visible');
	  cy.xpath(selectors.commentsTab).should('be.visible');
      cy.xpath(selectors.cancelRequest).should('be.visible');
      cy.xpath(selectors.inProgress).should('be.visible');
      cy.xpath(selectors.participants).should('be.visible');
      cy.xpath(selectors.inProgressSince).should('be.visible');
      cy.xpath(selectors.requestedBy).should('be.visible');
      cy.xpath(selectors.adminUserIcon).should('have.length', 4);
	}

	verifyOpenTaskforTaskCollapsibleAllToggledOn(){
	   cy.xpath(selectors.reassignButton).should('be.visible');
       cy.xpath(selectors.openLabel).should('be.visible');
       cy.xpath(selectors.dueIn).should('be.visible');
       cy.xpath(selectors.autoSave).should('be.visible');
       cy.xpath(selectors.assignedTo).should('be.visible');
       cy.xpath(selectors.adminUserIcon).should('have.length', 3);
       cy.xpath(selectors.escalateManagerButton).should('be.visible');
       cy.xpath(selectors.requestTitle).should('have.length', 2);
       cy.xpath(selectors.requestedBy).should('be.visible');
   }

   verifyInProgressforTaskCollapsibleAllToggledOff(){   
		cy.xpath(selectors.detailsTab).should('be.visible');
		cy.xpath(selectors.commentsTab).should('be.visible');
		cy.xpath(selectors.cancelRequest).should('be.visible');
		cy.xpath(selectors.inProgress).should('be.visible');
        cy.xpath(selectors.participants).should('be.visible');
        cy.xpath(selectors.inProgressSince).should('be.visible');
        cy.xpath(selectors.requestedBy).should('be.visible');
        cy.xpath(selectors.adminUserIcon).should('have.length', 4);
   }

   verifyOpenTaskforTaskCollapsibleAllToggledOff(){
		cy.xpath(selectors.reassignButton).should('be.visible');
		cy.xpath(selectors.openLabel).should('be.visible');
		cy.xpath(selectors.dueIn).should('be.visible');
		cy.xpath(selectors.autoSave).should('be.visible');
		cy.xpath(selectors.assignedTo).should('be.visible');
		cy.xpath(selectors.adminUserIcon).should('have.length', 3);
		cy.xpath(selectors.requestTitle).should('have.length', 2);
		cy.xpath(selectors.requestedBy).should('be.visible');
	}

    verifyCompletedforTaskCollapsibleAllToggledOn(){
        cy.xpath(selectors.reassignButton).should('be.visible');
        cy.xpath(selectors.openLabel).should('be.visible');
        cy.xpath(selectors.dueIn).should('be.visible');
        cy.xpath(selectors.autoSave).should('be.visible');
        cy.xpath(selectors.assignedTo).should('be.visible');
        cy.xpath(selectors.adminUserIcon).should('have.length', 3);
        cy.xpath(selectors.escalateManagerButton).should('be.visible');
        cy.xpath(selectors.requestTitle).should('have.length', 2);
        cy.xpath(selectors.requestedBy).should('be.visible');
    } 

    verifyCompletedforTaskCollapsibleAllToggledOff(){
        cy.xpath(selectors.reassignButton).should('be.visible');
        cy.xpath(selectors.openLabel).should('be.visible');
        cy.xpath(selectors.dueIn).should('be.visible');
        cy.xpath(selectors.autoSave).should('be.visible');
        cy.xpath(selectors.assignedTo).should('be.visible');
        cy.xpath(selectors.adminUserIcon).should('have.length', 3);
        cy.xpath(selectors.requestTitle).should('have.length', 2);
        cy.xpath(selectors.requestedBy).should('be.visible');
     }
 
     verifyCompletedRequestforTaskCollapsibleAllToggledOff(){
         cy.xpath(selectors.detailsTab).should('be.visible');
         cy.xpath(selectors.commentsTab).should('be.visible');
         cy.xpath(selectors.completed).should('be.visible');
         cy.xpath(selectors.participants).should('be.visible');
         cy.xpath(selectors.completedOn).should('be.visible');
         cy.xpath(selectors.requestedBy).should('be.visible');
         cy.xpath(selectors.adminUserIcon).should('have.length', 5);
    }

    writeEditAndDeleteComments(requestId){
         cy.xpath(selectors.detailsTab).should('be.visible');
         cy.xpath(selectors.commentsTab).should('be.visible');
         cy.xpath(selectors.commentsTab).click({force:true});
         cy.xpath(selectors.addComment).type("Buddhism");
         cy.xpath(selectors.comment).click();
         cy.xpath(selectors.commentDetails).click();
         cy.xpath('//div/span[contains(text(),"Admin User:")]').should('have.length', 1);
         cy.xpath('//div/span[contains(text(),"Buddhism")]').should('be.visible');
         cy.xpath(selectors.edit).click();
         cy.xpath(selectors.addComment).clear();
         cy.xpath(selectors.addComment).type("Jainismus");
         cy.xpath(selectors.editTitle).click();
         cy.xpath(selectors.delete).click();
         cy.xpath(selectors.confirmButton).click();
    }

    verifyButtonsInTaskCollapsable(buttonName){
	    cy.xpath(selectors.taskCollapsibleBtn.replace('option',buttonName))
            .should('be.visible');
    }
    verifyButtonsInTaskCollapsableNotExists(buttonName){
        cy.xpath(selectors.taskCollapsibleBtn.replace('option',buttonName))
            .should('not.exist');
    }
    clickOnButtonsTaskCollapsible(buttonName){
        cy.xpath(selectors.taskCollapsibleBtn.replace('option',buttonName))
            .click();
        cy.xpath('//button[contains(text(),"Confirm")]')
            .should('be.visible')
            .click();
    }
}
