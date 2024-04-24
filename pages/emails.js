import selectors from "#selectors/admin"
import promisify from 'cypress-promise'
import { NavigationHelper } from "#helpers/navigationHelper";

//note VPN connection can cause some problems with the login for mailT

export class ExternalEmails {
    loginMailTrap(userMT = Cypress.env('mailTrapUser'), passMT = Cypress.env('mailTrapPassword')){
        const sentArgs = { user: userMT, password: passMT};
        cy.origin('https://mailtrap.io', { args: sentArgs }, ({ user, password }) => {
            cy.visit('/signin');
            cy.get('input[id="user_email"]').type(user);
            cy.contains('a','Next').click();
            cy.get('input[id="user_password"]').type(password);
            cy.contains('input','Log In').click();
        });
    }

    goToInboxesMenuMailTrap(){
        cy.xpath(
            "//nav[@data-test-id='menu-nav-block']/ul/li[@data-test-id='Email Testing']"
        )
            .should("be.visible")
            .click();
        cy.xpath('//nav[@aria-label="Global menu navigation"]//span[text()="Inboxes"]').click();
    }

    searchInboxInTheListMailTrap(){
        var nameInbox = Cypress.env('serverEmailName');
        var listInbox = '//h2[text()="testing servers"]//ancestor::div/div[@class="inboxes_list"]//span[@class="inbox_name" and text()="'+nameInbox+'"]';
        cy.xpath(listInbox).click();
    }
    
    searchEmailBySubjectAndOpenMailTrap(subjectName, nro = 0){
        cy.xpath('//input[@placeholder="Search..."]').type(subjectName);
        cy.xpath('//div[@data-test-id="messages_list"]/ul/li/a/span[text()="'+subjectName+'"]').eq(nro).click();
        cy.xpath('//div[@class="mail_info"]//h1').should('contain.text', subjectName)
    }

    selectEmailInbox(emailInbox) {
        cy.xpath(
            "//div//h2[text()='testing servers']/ancestor::div/div[@class='inboxes_list']//a[@title='" +
                emailInbox +
                "']"
        )
            .should("be.visible")
            .click();
    }

}
