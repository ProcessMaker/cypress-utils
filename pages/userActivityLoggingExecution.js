import {userActivityLogging} from "#pages/userActivityLogging";
import {NavigationHelper} from "#helpers/navigationHelper";
import {Admin} from "./admin";
import {Requests} from "./requests";
import selectorsDataConnectors from "#selectors/dataConnectors";
import selectorsAdmin from "#selectors/admin";
import selectors from "#selectors/userActivityLogging";

const request = new Requests();
const navHelper = new NavigationHelper();
const userActivity = new userActivityLogging();
const admin = new Admin();

export class userActivityLoggingExecution{
    securityLogsDataConnectorCreatedCheck(nameConnector) {
       userActivity.accessToSecurityLogs();
       userActivity.accessToSpecificSecurityLog('DataConnectorCreated');
       userActivity.checkLabelsSecurityLogsLabels(["Name:", "Created At:", "Description:","Type:", "Authtype:", "Category:"]);
       userActivity.checkLabelsSecurityLogsSpan(["DescriptionTest","REST","NONE","Uncategorized"]);
       userActivity.checkLabelsSecurityLogsHref([nameConnector]);
       cy.xpath(selectorsDataConnectors.inputName).should('have.value',nameConnector);
       cy.xpath(selectorsDataConnectors.inputDescription).should('have.value','DescriptionTest');
   }

   securityLogsDataConnectorUpdatedCheck(nameConnector) {
       userActivity.accessToSecurityLogs();
       userActivity.accessToSpecificSecurityLog('DataConnectorUpdated');
       userActivity.checkLabelsSecurityLogsLabels(["Name:", "- Name:", "+ Name:","Last Modified:", "- Description:", "+ Description:"]);
       userActivity.checkLabelsSecurityLogsSpan([nameConnector,"TestConnector","DescriptionTest","NewDescription"]);
       userActivity.checkLabelsSecurityLogsHref(["TestConnector"]);
   }

   securityLogsDataConnectorDeletedCheck() {
       userActivity.accessToSecurityLogs();
       userActivity.accessToSpecificSecurityLog('DataConnectorDeleted');
       userActivity.checkLabelsSecurityLogsLabels(["Name:", "Deleted At:", "Description:"]);
       userActivity.checkLabelsSecurityLogsSpan(["TestConnector","NewDescription"]);
   }

   securityLogsCollectionCreatedCheck() {
       userActivity.accessToSecurityLogs();
       userActivity.accessToSpecificSecurityLog('CollectionCreated');
       userActivity.checkLabelsSecurityLogsLabels(["Name:", "Created At:", "Description:","Edit Screen:", "View Screen:", "Create Screen:"]);
       userActivity.checkLabelsSecurityLogsSpan(["2288DisplayScreen"]);
       userActivity.checkLabelsSecurityLogsHref(["CollectionTest"]);
       cy.xpath(selectorsAdmin.collectionTitle).should('have.value','CollectionTest');
       cy.xpath(selectorsAdmin.collectionDescription).should('have.value','DescriptionTest');
    }

   securityLogsCollectionUpdatedCheck() {
       userActivity.accessToSecurityLogs();
       userActivity.accessToSpecificSecurityLog('CollectionUpdated');
       userActivity.checkLabelsSecurityLogsLabels(["Name:", "- Name:", "+ Name:","Updated At:", "- Description:", "+ Description:"]);
       userActivity.checkLabelsSecurityLogsSpan(["CollectionTest","New Collection","DescriptionTest","New Description"]);
       userActivity.checkLabelsSecurityLogsHref(["New Collection"]);
       cy.xpath(selectorsAdmin.collectionTitle).should('have.value','New Collection');
       cy.xpath(selectorsAdmin.collectionDescription).should('have.value','New Description');
    }


    securityLogsCollectionDeletedCheck() {
        userActivity.accessToSecurityLogs();
        userActivity.accessToSpecificSecurityLog('CollectionDeleted');
        userActivity.checkLabelsSecurityLogsLabels(["Name:", "Deleted At:"]);
        userActivity.checkLabelsSecurityLogsSpan(["New Collection"]);
        }

    securityLogsTokenCreated(username) {
        userActivity.accessToSecurityLogs();
        userActivity.searchByEvent("TokenCreated");
        userActivity.accessToSpecificSecurityLog('TokenCreated');
        cy.get('[id="showLogInfo"] [class="modal-content"]').should("be.visible");
        userActivity.checkLabelsSecurityLogsLabels(["Name:","Created At:","Id:","User:"]);
        userActivity.checkLabelsSecurityLogsSpan(["API Token",username]);
    }

    securityLogsRequestAction(processName,requestId) {
        cy.xpath('//input[@aria-label="New Input"]').click().type('Nirvana');
        cy.xpath('//button[@aria-label="New Submit"]').click();
        request.verifyTaskIsCompleted();
        //Review Activity Loggin
        navHelper.navigateToAdminUserPage();
        admin.searchUserAndEdit('admin');
        userActivity.accessToSecurityLogs();
        userActivity.accessToSpecificSecurityLog('RequestAction');
        userActivity.checkLabelsSecurityLogsLabels(["Action:", "Process:", "Request:"]);
        userActivity.checkLabelsSecurityLogsSpan(["COMPLETED"]);
        cy.url().then(url => {
        userActivity.checkLabelsSecurityLogsHref([processName]);
        cy.visit(url);
        cy.xpath(selectors.securityLogsMenu).click();
        userActivity.accessToSpecificSecurityLog('RequestAction');
        userActivity.checkLabelsSecurityLogsHref([requestId]);
        cy.xpath(selectors.requestIdConfirmation).contains(requestId);
   });

    }

    securityLogsAuthClientCreated(){
        userActivity.accessToSecurityLogs();
        userActivity.accessToSpecificSecurityLog('AuthClientCreated');
        userActivity.checkLabelsSecurityLogsLabels(["Name:","Created At:", "Revoked:","Provider:", "Redirect:", "Personal Access Client:"]);
        userActivity.checkLabelsSecurityLogsSpan(["http://www.google.com"]);
        userActivity.checkLabelsSecurityLogsHref(["TCP4-2905_Jerusalem"]);
    }

    securityLogsAuthClientUpdated(nameAuth) {
        userActivity.accessToSecurityLogs();
        userActivity.accessToSpecificSecurityLog("AuthClientUpdated");
        userActivity.checkLabelsSecurityLogsLabels(["Name:", "- Name:", "+ Name:","Last Modified:"]);
        userActivity.checkLabelsSecurityLogsSpan([nameAuth, "Athens"]);
        userActivity.checkLabelsSecurityLogsHref(["Athens"]);
    }

    securityLogsAuthClientDeleted(){
        userActivity.accessToSecurityLogs();
        userActivity.accessToSpecificSecurityLog('AuthClientDeleted');
        userActivity.checkLabelsSecurityLogsLabels(["Name:","Deleted At:"]);
        userActivity.checkLabelsSecurityLogsSpan(["Athens"]);
    }

    securityLogsGroupCreatedCheck() {
        userActivity.accessToSecurityLogs();
        userActivity.accessToSpecificSecurityLog('GroupCreated');
        userActivity.checkLabelsSecurityLogsLabels(["Name:", "Created At:", "Description:"]);
        userActivity.checkLabelsSecurityLogsSpan(["Description"]);
        userActivity.checkLabelsSecurityLogsHref(["GroupTest"]);
    }

    securityLogsGroupUpdatedCheck(GroupTest,newGroupname) {
        userActivity.accessToSecurityLogs();
        userActivity.accessToSpecificSecurityLog('GroupUpdated');
        userActivity.checkLabelsSecurityLogsLabels(["Name:", "- Name:", "+ Name:","Last Modified:", "- Description:", "+ Description:"]);
        userActivity.checkLabelsSecurityLogsSpan([GroupTest, newGroupname, "Description", "Write"]);
        userActivity.checkLabelsSecurityLogsHref([newGroupname]);
    }

    securityLogsGroupDeletedCheck(newGroupname) {
        userActivity.accessToSecurityLogs();
        userActivity.accessToSpecificSecurityLog('GroupDeleted');
        userActivity.checkLabelsSecurityLogsLabels(["Name:", "Deleted At:"]);
        userActivity.checkLabelsSecurityLogsSpan([newGroupname]);
    }

    securityLogsDataConnectorResourceActionCheck(name){
        userActivity.accessToSecurityLogs();
        userActivity.searchByEvent("DataConnectorResourceAction");
        userActivity.accessToSpecificSecurityLog('DataConnectorResourceAction');
        userActivity.checkLabelsSecurityLogsLabels(["Name:","Created At:","Description:", "Action:", "Method:", "DataConnector:"]);
        userActivity.checkLabelsSecurityLogsSpan(["test QA", "Resource Created", "GET", name]);
        userActivity.checkLabelsSecurityLogsHref(["list"]);
        cy.xpath(selectorsDataConnectors.textareaDescription).should('have.value','test QA');
        cy.xpath(selectorsDataConnectors.inputURL).should('have.value', 'http://api.worldbank.org/v2/country?format=json');
    }

    securityLogsDataConnectorVerifyResource(resourceName, labels, span) {
        userActivity.accessToSecurityLogs();
        userActivity.searchByEvent("DataConnectorResourceAction");
        userActivity.accessToSpecificSecurityLog(resourceName);
        userActivity.checkLabelsSecurityLogsLabels(labels);
        userActivity.checkLabelsSecurityLogsSpan(span);
    }

    securityLogsDataCustomizeUiUpdated() {
        userActivity.accessToSecurityLogs();
        userActivity.accessToSpecificSecurityLog('CustomizeUiUpdated');
        userActivity.checkLabelsSecurityLogsLabels(["Name:", "Last Modified:"]);
        userActivity.checkLabelsSecurityLogsHref(["Customize Ui"]);
    }

    securityLogsEnvironmentVariablesCreatedCheck(name){
        userActivity.accessToSecurityLogs();
        userActivity.accessToSpecificSecurityLog('EnvironmentVariablesCreated');
        userActivity.checkLabelsSecurityLogsLabels(["Name:", "Created At:", "Description:"]);
        userActivity.checkLabelsSecurityLogsSpan(["description-TCP43101"]);
        //userActivity.checkLabelsSecurityLogsHref([name]);
    }
    
    securityLogsEnvironmentVariablesUpdatedCheck(name,newName){
        userActivity.accessToSecurityLogs();
        userActivity.searchByEvent("EnvironmentVariablesUpdated");
        userActivity.accessToSpecificSecurityLog('EnvironmentVariablesUpdated');
        userActivity.checkLabelsSecurityLogsLabels(["Name:", "- Name:", "+ Name:","Last Modified:", "- Description:", "+ Description:"]);
        userActivity.checkLabelsSecurityLogsSpan([name,newName,"description-TCP43101","updated variable TCP43101"]);
        userActivity.checkLabelsSecurityLogsHref([newName]);
    }
    
    securityLogsEnvironmentVariablesDeletedCheck(newName){
        userActivity.accessToSecurityLogs();
        userActivity.accessToSpecificSecurityLog('EnvironmentVariablesDeleted');
        userActivity.checkLabelsSecurityLogsLabels(["Name:", "Deleted At:", "Description:"]);
        userActivity.checkLabelsSecurityLogsSpan([newName,"description-TCP43101"]);
    }    
}
