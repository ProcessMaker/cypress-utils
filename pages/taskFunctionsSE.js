import { Requests } from "./requests";
import { Header } from "./header";
import { NavigationHelper } from "#helpers/navigationHelper";
import { Login } from "./login";
import { ScreenFunctionsSE } from "./screenFunctionsSE";
import {Utility} from "./utility";

const utility = new Utility();
let navHelper = new NavigationHelper();
const request = new Requests();
const header = new Header();
const login = new Login();
const screenFunctionsSE = new ScreenFunctionsSE();

export class TaskFunctionsSE {
    /**-------------------------  Intemsify RAOS-process -------------------------**/
    startPersonalAccountTaskRAOSIntensify(parameterList){
        let xpathButton701= "//button[contains(text(),'Continue')]";
        switch (parameterList.pathOption) {
            case "Complete In-Person":
                break;
            case "Pre-fill and Send to Client":
                break;
            case "Send Blank":
                xpathButton701 = "//button[contains(text(),'Send link to Client')]";
                break;
        }
        screenFunctionsSE.screenRAOSBankerInitiateBAL_701_703(parameterList.pathOption,parameterList.isTrust,parameterList.users);

        cy.xpath(xpathButton701).should('be.visible').click();
        if(parameterList.pathOption==="Send Blank"){
            cy.xpath("(//a[contains(text(),'Return to Dashboard')])[1]").should('be.visible');
        }
    }
    accountApplicationSubProcessRAOSIntensify(users,pathName){
        let xpathButton704= "(//button[contains(text(),'Continue')])[2]";
        let xpathButton706 = "//button[contains(text(),'Continue')]";
        let xpathButton707 = "//button[contains(text(),'CONTINUE')]";
        let xpathButton708 = "//button[contains(text(),'Submit')]";
        let sendToBlank = false;
        let messageFinal;
        switch(pathName){
            case "Complete In-Person":
                messageFinal="//h5[text()='Application submitted!']";
                break;
            case "Pre-fill and Send to Client":
                xpathButton704 = "(//button[contains(text(),'Continue')])[3]";
                xpathButton707 = "//button[contains(text(),'Send To Client')]";
                messageFinal="//h5[text()='Application has been sent to the client!']";
                break;
            case "Send Blank":
                sendToBlank = true;
                messageFinal= "//h3[contains(text(),'This request is complete')]";
                break;
        }
        screenFunctionsSE.screenRAOSPeopleBAL_704(users,xpathButton704,sendToBlank,pathName);
        if(pathName === "Complete In-Person")
            screenFunctionsSE.screenRAOSBusinessAccountBAL_705(users,xpathButton704);
        screenFunctionsSE.screenRAOSPersonalAccountApplicationTrustBAL_706(xpathButton706);
        screenFunctionsSE.screenRAOSPersonalAccountApplicationProductsBAL_707(xpathButton707,sendToBlank,pathName);
        if(pathName !== "Pre-fill and Send to Client")
            screenFunctionsSE.screenRAOSPersonalAccountApplicationDisclosuresBAL_707(xpathButton708);
        cy.xpath(messageFinal).should('be.visible');
        cy.wait(3000);
    }
    accountApplicationSubProcessUserRAOSIntensify(users){
        cy.xpath("(//button[contains(text(),'Continue')])[2]").scrollIntoView().should('be.visible').click();
        cy.xpath("//button[contains(text(),'Continue')]").scrollIntoView().should('be.visible').click();
        cy.xpath("//button[contains(text(),'CONTINUE')]").scrollIntoView().should('be.visible').click();
        let xpathButton708 = "//button[contains(text(),'Submit')]";
        screenFunctionsSE.screenRAOSPersonalAccountApplicationDisclosuresBAL_707(xpathButton708);

        let messageFinal= "//h3[contains(text(),'This request is complete')]";
        cy.xpath(messageFinal).should('be.visible');
        cy.wait(3000);
    }
    sendAccountOwnersVerificationSubProcessRAOSIntensify(){
        cy.xpath("//a[contains(text(),'Wait for Data Verifications')]").should('be.visible').click();
        cy.xpath("//button[contains(text(),'Complete Task')]").should('be.visible').click();
        cy.wait(3000);
    }
    accountApplicationReviewSubProcessRAOSIntensify(requestId,users,pathName="Not Send Blank"){
        cy.xpath("//a[contains(text(),'Application Summary')]").should('be.visible').click();

        let reviewApplicationButtton = "//button[contains(text(),'Review Application')]";
        let declineApplicationButtton = "//button[contains(text(),'Decline Application')]";
        let editApplicationButtton = "//button[contains(text(),'Edit Products and Services')]";

        screenFunctionsSE.screenRAOSPersonalAccountApplicationReviewApplicationSummaryBAL_709(reviewApplicationButtton);

        let buttonXpath = "//button[contains(text(),'Continue')]";
        screenFunctionsSE.screenRAOSPersonalAccountApplicationDueDiligenceBAL_713(buttonXpath);
        screenFunctionsSE.screenRAOSPersonalAccountApplicationProductsReviewBAL_714(buttonXpath);
        screenFunctionsSE.screenRAOSPersonalAccountApplicationServicesBAL_715(buttonXpath);

        declineApplicationButtton = "//button[contains(text(),'Decline Application')]";
        let exceptionalApprovalButtton = "//button[contains(text(),'Exceptional Approval')]";
        if(pathName === "Send Blank" || pathName === "Pre-fill and Send to Client"){
            screenFunctionsSE.screenRAOSPersonalAccountApplicationSummaryBAL_716(exceptionalApprovalButtton,users,true);
        }else{
            screenFunctionsSE.screenRAOSPersonalAccountApplicationSummaryBAL_716(exceptionalApprovalButtton,users);
        }

        utility.logout();
        utility.goToRequest(requestId);
        utility.loginExecutiveUser();
        cy.xpath("//a[contains(text(),'EM Approval')]").should('be.visible').click();
        buttonXpath = "//button[contains(text(),'Approve')]";
        screenFunctionsSE.screenRAOSEMApprovalBAL_723(buttonXpath);
    }
    jhaBoardAccountSubProcessRAOSIntensify(){
        cy.xpath("//a[contains(text(),'Retry Account Reserve')]").should('be.visible').click();
        cy.xpath("//button[contains(text(),'Claim Task')]").should('be.visible').click();
        cy.xpath("//button[contains(text(),'Claim Task')]").should('not.exist');
        cy.xpath("//h3[text()='Review Account Application']").should('be.visible');
        cy.xpath("(//h5[text()='People'])[2]").click();
    }
    /**----------------------- Intemsify RAOS-process Fin ------------------------**/
    /**------------------------Intensify CAOS-Process -------------------------**/
    startBusinessAccountTaskCAOSIntensify(){
        screenFunctionsSE.screenCAOSBusinessBankerInitiateBAL_683();
        cy.xpath("//button[contains(text(),'Continue')]").should('be.visible').click();
    }
    startBusinessAccountSendBlankTaskCAOSIntensify(){
        screenFunctionsSE.screenCAOSBusinessBankerInitiateBAL_681();
        cy.xpath("//button[contains(text(),'Send link to Client')]").should('be.visible').click();
        cy.wait(3000);
    }
    startBusinessAccountPreFillTaskCAOSIntensify(){
        screenFunctionsSE.screenCAOSBusinessBankerInitiateBAL_682();
        cy.xpath("//button[contains(text(),'Continue')]").should('be.visible').click();   
    }
    accountAplicationTaskCAOSIntensify(){
        screenFunctionsSE.screenCAOSAccountApplicationBusinessesBAL_684();
        cy.xpath("//button[contains(text(),'Complete Section')]").should('be.visible').click();
        cy.wait(3000);
        screenFunctionsSE.screenCAOSAccountApplicationPeopleBAL_685();
        cy.xpath("(//button[contains(text(),'complete section')])[1]").should('be.visible').click();
        cy.wait(3000);
        screenFunctionsSE.screenCAOSAccountApplicationReviewKYCResultBAL_686();
        cy.xpath("//button[contains(text(),'Continue')]").should('be.visible').click();
        cy.wait(3000);
        screenFunctionsSE.screenCAOSAccountApplicationProductsBAL_687();
        cy.xpath("//button[contains(text(),'complete section')]").should('be.visible').click();
        cy.wait(3000);
        screenFunctionsSE.screenCAOSAccountApplicationServicesBAL_688();
        cy.xpath("//button[contains(text(),'Complete Section')]").should('be.visible').click();
        cy.wait(3000);
        screenFunctionsSE.screenCAOSAccountApplicationDocumentsBAL_689();
        cy.xpath("//button[contains(text(),'Complete Section')]").should('be.visible').click();
        cy.wait(3000);
        screenFunctionsSE.screenCAOSAccountApplicationFinalizeAndSignBAL_690();
        cy.xpath("//button[contains(text(),'Submit Application')]").should('be.visible').click();
    }
    accountAplicationTaskSendBlankCAOSIntensify(){
        screenFunctionsSE.screenCAOSAccountApplicationBusinessesBAL_684();
        cy.xpath("//button[contains(text(),'Complete Section')]").should('be.visible').click();
        cy.wait(4000);
        screenFunctionsSE.screenCAOSAccountApplicationPeopleBAL_685();
        cy.xpath("(//button[contains(text(),'complete section')])[2]").should('be.visible').click();
        cy.wait(4000);
        screenFunctionsSE.screenCAOSAccountApplicationProductsBAL_687();
        cy.xpath("//button[contains(text(),'complete section')]").should('be.visible').click();
        cy.wait(4000);
        screenFunctionsSE.screenCAOSAccountApplicationServicesBAL_688();
        cy.xpath("//button[contains(text(),'Complete Section')]").should('be.visible').click();
        cy.wait(4000);
        screenFunctionsSE.screenCAOSAccountApplicationDocumentsBAL_689();
        cy.xpath("//button[contains(text(),'Complete Section')]").should('be.visible').click();
        cy.wait(4000);
        screenFunctionsSE.screenCAOSAccountApplicationFinalizeAndSignBAL_690();
        cy.xpath("//button[contains(text(),'Submit Application')]").should('be.visible').click();
    }
    accountAplicationTaskPreFillCAOSIntensify(){
        screenFunctionsSE.screenCAOSAccountApplicationBusinessesBAL_684();
        cy.xpath("//button[contains(text(),'Complete Section')]").should('be.visible').click();

        screenFunctionsSE.screenCAOSAccountApplicationPeopleBAL_685();
        cy.xpath("(//button[contains(text(),'complete section')])[2]").should('be.visible').click();
        
        screenFunctionsSE.screenCAOSAccountApplicationProductsBAL_687();
        cy.xpath("//button[contains(text(),'complete section')]").should('be.visible').click();
        
        screenFunctionsSE.screenCAOSAccountApplicationServicesBAL_688();
        cy.xpath("//button[contains(text(),'Complete Section')]").should('be.visible').click();
        
        screenFunctionsSE.screenCAOSAccountApplicationDocumentsBAL_689();
        cy.xpath("//button[contains(text(),'Complete Section')]").should('be.visible').click();
        
        screenFunctionsSE.screenCAOSAccountApplicationFinalizeAndSignPreFillBAL_690();
        cy.xpath("//button[contains(text(),'Send To Client')]").should('be.visible').click();
    }
    accountAplicationTaskPreFillReviewCAOSIntensify(){
        cy.xpath("//h4[text()='Business Information']").should('be.visible');
        cy.xpath("//button[contains(text(),'Complete Section')]").scrollIntoView();
        cy.xpath("//button[contains(text(),'Complete Section')]").should('be.visible');
        cy.xpath("//button[contains(text(),'Complete Section')]").click();
        cy.wait(2000);
        cy.xpath("//h4[text()='People Information']").should('be.visible');
        cy.xpath("(//button[contains(text(),'complete section')])[2]").scrollIntoView();
        cy.xpath("(//button[contains(text(),'complete section')])[2]").should('be.visible');
        cy.wait(2000);
        cy.xpath("(//button[contains(text(),'complete section')])[2]").click();
        
        cy.xpath("//h4[text()='Product Selection']").should('be.visible');
        cy.xpath("//button[contains(text(),'complete section')]").scrollIntoView();
        cy.xpath("//button[contains(text(),'complete section')]").should('be.visible');
        cy.wait(2000);
        cy.xpath("//button[contains(text(),'complete section')]").click();
        
        cy.xpath("//h4[text()='Services and Security']").should('be.visible');
        cy.get(":nth-child(5) > .form-group > :nth-child(1) > div > .bg-light").scrollIntoView();
        cy.xpath("//button[contains(text(),'Complete Section')]").should('be.visible');
        cy.wait(2000);
        cy.xpath("//button[contains(text(),'Complete Section')]").click();
        
        screenFunctionsSE.screenCAOSAccountApplicationDocumentsBAL_689();
        cy.xpath("//button[contains(text(),'Complete Section')]").should('be.visible').click();
        
        screenFunctionsSE.screenCAOSAccountApplicationFinalizeAndSignBAL_690();
        cy.xpath("//button[contains(text(),'Submit Application')]").should('be.visible').click();
    }
    accountApplicationReviewAndEditTaskCAOSIntensify(){
        screenFunctionsSE.screenCAOSAccountApplicationReviewSummaryBankerBAL_692();
        cy.xpath("//button[contains(text(),'Edit Products and Services')]").should('be.visible').click();
        screenFunctionsSE.screenCAOSBankerReviewEditApplicationBAL_693();
        cy.xpath("//button[contains(text(),'Send to Client')]").should('be.visible').click();
    }
    accountApplicationReviewAuthorizationForChangeTaskCAOSIntensify(){
        screenFunctionsSE.screenCAOSAccountApplicationReviewAuthorizationForChange();
        cy.wait(2000);
        cy.xpath("//button[contains(text(),'Submit')]").should("be.visible").click();
    }
    accountApplicationReviewSummaryBeforeEditTaskCAOSIntensify(){
        screenFunctionsSE.screenCAOSAccountApplicationEditReviewSummaryBankerBAL_692();
        cy.xpath("//button[contains(text(),'BSA Review')]").should('be.visible').click();
    }
    accountApplicationReviewBSAReviewTaskCAOSIntensify(){
        screenFunctionsSE.screenCAOSAccountApplicationBSAReviewBAL_695();
        cy.xpath("//button[contains(text(),'Decline')]").should('be.visible').click();
    }
    accountApplicationReviewTaskCAOSIntensify(){
        screenFunctionsSE.screenCAOSAccountApplicationReviewSummaryBankerBAL_692();
        cy.xpath("//button[contains(text(),'BSA Review')]").should('be.visible').click();
    }
    accountApplicationReviewBSAApproveReviewTaskCAOSIntensify(){
        screenFunctionsSE.screenCAOSAccountApplicationBSAReviewBAL_695();
        cy.xpath("//button[contains(text(),'Approve')]").should('be.visible').click();
    }
    accountApplicationReviewSecondPartTaskCAOSIntensify(){
        screenFunctionsSE.screenCAOSAccountApplicationReviewDueDiligenceBAL_696();
        cy.xpath("//button[contains(text(),'Continue')]").should('be.visible').click();
        screenFunctionsSE.screenCAOSAccountApplicationReviewRiskRatingBAL_697();
        cy.xpath("//button[contains(text(),'Continue')]").should('be.visible').click();
        screenFunctionsSE.screenCAOSAccountApplicationReviewProductsBAL_698();
        cy.xpath("//button[contains(text(),'Continue')]").should('be.visible').click();
        screenFunctionsSE.screenCAOSAccountApplicationReviewServicesBAL_699();
        cy.xpath("//button[contains(text(),'Complete Review')]").should('be.visible').click();
        screenFunctionsSE.screenCAOSAccountApplicationReviewBankerReviewSummaryBAL_700();
        cy.xpath("//button[contains(text(),'Approve')]").should('be.visible').click();
    }
    createPortalProfileTaskCAOSIntensify(){
        screenFunctionsSE.screenCAOSCreatePortalProfileBAL_691();
    }
    createPortalProfilePreFillTaskCAOSIntensify(){
        screenFunctionsSE.screenCAOSCreatePortalProfilePreFillBAL_691();
    }
    /**------------------------Intensify CAOS-Process End ---------------------**/
}
