import { Login } from "#pages/login"
import { Process } from "#pages/process"
import selectors from "#selectors/idp";
import pageConstants from "#helpers/pageConstants";
import promisify from 'cypress-promise'
import { NavigationHelper } from "#helpers/navigationHelper";
import { isThisWeek } from "date-fns";
import "#support/commands";
import {Utility} from "./utility";

const utility = new Utility();

export class IDP {
    selectAvalableFolders() {
        cy.xpath(selectors.selectAvailableFoldersEdit).should('be.visible').click();
        cy.get('.multiselect__select').click();
        
    }

    searchFolders(folderName) {
        var editBtn =
            '//*[@class="settings-listing data-table"]//div[contains(text(),"Select Available Folders")]/ancestor::tr//button[@aria-label="Edit"]';
        cy.xpath(editBtn).should("be.visible").click();
        cy.xpath(selectors.selectListFolders).type(`${folderName}{enter}`);
    }
    enterSelectDocumentType(documentType) {
        cy.xpath(selectors.documentTypeXpath)
            .type(documentType,{force:true});
        cy.wait(3000);
        cy.xpath(selectors.documentTypeXpath)
            .should("have.value", documentType);
        cy.xpath('(//div[@class="multiselect__content-wrapper"]//li[1])[1]')
            .should('have.attr', 'aria-label')
            .and('equal', documentType+". ");
        cy.xpath(selectors.documentTypeXpath).type("{enter}");
        cy.xpath('(//input[@placeholder="Type to search"])[1]/following-sibling::span')
            .should('have.text',documentType);
    }

    enterSelectDestination(destination) {
        cy.xpath(selectors.destinationXpath).click({force:true});
        cy.xpath(selectors.destinationXpath).clear().type(destination, { delay: 150 }, {force:true}).should("have.value", destination).type("{enter}",{force:true});
    }
    enableUseRequestVariableDocumentType(){
        cy.xpath(selectors.useRequestVariableDocumentType).check({force:true});
    }

    enableUseRequestVariableDestinationFolder(){
        cy.xpath(selectors.userRequestVariableSelectDestination).then(($RequestVariableDestinationFolder)=>{
                if (
                    $RequestVariableDestinationFolder.prop("checked") === true
                ) {
                    cy.log("its enable");
                } else {
                    cy.xpath(
                        selectors.userRequestVariableSelectDestination
                    ).click({ force: true });
            }
        })
    }

    disableUseRequestVariableDocumentType(){
        cy.xpath(selectors.useRequestVariableDocumentType).uncheck({force:true});
    }

    disableUseRequestVariableDestinationFolder(){
        cy.xpath(selectors.userRequestVariableSelectDestination).then(($RequestVariableDestinationFolder)=>{
                if ($RequestVariableDestinationFolder.prop("checked") === false) {
                    cy.log("its disable");
                } else {
                    cy.xpath(selectors.userRequestVariableSelectDestination).click({
                        force: true,
                    });
            }
        })
    }
}
