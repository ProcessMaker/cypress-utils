import selectors from "#selectors/userActivityLogging";
import selectorsAdmin from "#selectors/admin";

export class userActivityLogging{

   /**
    * This method is responsible to check validations in Security Logs
    * @param elementList: object of elements to verify for labels
    * @return nothing returns
    */

   checkLabelsSecurityLogsLabels(elementList=[]) {
       let len = elementList.length;
       for (var i = 0; i < len; i++) {
           cy.xpath(selectors.userActivityLoggingLabel.replace('element',elementList[i])).should('be.visible');           
       }
   }

   /**
    * This method is responsible to access Security Logs
    * @return nothing returns
    */

   accessToSecurityLogs(){
       cy.xpath(selectors.securityLogsMenu).should("be.visible");
       cy.xpath(selectors.securityLogsMenu).click();
   }

   /**
    * This method is responsible to access Security Logs
    * @log log to be searched in Security Logs
    * @return nothing returns
    */

   accessToSpecificSecurityLog(log){
       const xpath = selectors.securityLog.replace('log', log);
       cy.xpath(xpath).should('be.visible');
       cy.xpath(selectors.securityLog.replace('log', log)).click();
   }

   /**
    * This method is responsible to check validations in Security Logs for span selectors
    * @param elementArray: object of elements to verify
    * @return nothing returns
    */

   checkLabelsSecurityLogsSpan(elementArray=[]){
       let len = elementArray.length;
       for (var i = 0; i < len; i++) {
           cy.xpath(selectors.userActivityLoggingSpan.replace('element', elementArray[i])).should('have.text', elementArray[i]);           
       }
   }

   /**
    * This method is responsible to check validations in Security Logs for href selectors
    * @param elementList: object of elements to verify
    * @return nothing returns
    */

   checkLabelsSecurityLogsHref(elementList=[]){
       let len = elementList.length;
       for (var i = 0; i < len; i++) {
           cy.xpath(selectors.userActivityLoggingHref.replace('element',elementList[i]))
           .should('be.visible').should("have.attr","href");
           cy.xpath(selectors.userActivityLoggingHref.replace('element',elementList[i])).click();
       }
   }

    /**
     * This method is responsible to search by a specific event
     * @param event: event name such as: TokenCreated, FolderAccessed
     * @return nothing returns
     */
    searchByEvent(event) {
        cy.get("textarea[class='pmql-input']")
            .as("search")
            .should("be.visible");
        cy.get("@search")
            .type(event, { delay: 200 })
            .should("have.value", event);
        cy.get("@search").type("{enter}");
        cy.get('[id="nav-logs"] [class="data-table"] tbody')
            .find("td")
            .its("length")
            .should("be.greaterThan", 0);
    }
}
