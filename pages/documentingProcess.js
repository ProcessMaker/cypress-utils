import selectors from "#selectors/documentingProcess";
import { NavigationHelper } from "#helpers/navigationHelper";
const navHelper = new NavigationHelper();

export class DocumentingProcess {

    //Form modeler
    objectDocumentation(elementName,elementXpath,documentation){
        cy.xpath(elementXpath.replace('nameElem',elementName)).first().should('be.visible').click();
        cy.get('[data-cy="inspector-button"]').should('be.visible').click();
        cy.get(selectors.docButton).click();
        cy.get(selectors.docIframe).then(($iframe) => {
            const $body = $iframe.contents().find('body');
            cy.wrap($body).find('p').clear();
        });
        cy.get(selectors.docIframe).then(($iframe) => {
            const $body = $iframe.contents().find('body');
            cy.wrap($body).find('p').type(documentation);
        });
        cy.get('[data-cy="inspector-close-button"]').click().wait(6000);
    }

}    