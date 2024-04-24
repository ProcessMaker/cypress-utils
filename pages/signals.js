import selectors from "#selectors/signals";
import { Requests } from "./requests";

const request = new Requests();

export class Signals {
    createSignal(name, id) {
        cy.xpath(selectors.addSignalButton).click();
        cy.xpath(selectors.nameSignal).type(name);
        cy.xpath(selectors.idSignal).type(id);
        cy.xpath(selectors.saveSignalButton).click();
        cy.xpath('(//span[@title="Edit"]/button)[1]').should('be.enabled');
    }

    searchSignal(signalName, signalId){
        cy.get('#search-box').should('be.visible').type(signalName, {delay:500});
        cy.get('#search-box').type(' ');
        cy.get('#search-box').type('{backspace}');
        cy.get('#search-box').type('{enter}');
        cy.xpath("//td[contains(text(),'"+signalName+"')]").should('have.text', signalId);
    }
}
