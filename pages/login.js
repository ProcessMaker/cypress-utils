/// <reference types="cypress" />
import selectors from "#selectors/login"
import headerSelectors from "#selectors/header";
export class Login {

  navigateToUrl() {
    cy.visit("/login");
  }

  clickOnLogin(){
    cy.get(selectors.loginBtn).click();
  }

  login(username = Cypress.env("username"), password = Cypress.env("password")) {
    this.enterUsername(username);
    this.enterPassword(password);
    this.clickOnLogin();
    cy.xpath('//*[@id="navbar1"]').should('be.visible');
    cy.get(headerSelectors.userAvatarBtn).should('be.visible');
  }

    //web Entry login with credentials
    loginWEAuthenticated(username = Cypress.env("username"), password = Cypress.env("password")) {
        this.enterUsername(username);
        this.enterPassword(password);
        this.clickOnLogin();

        cy.get(selectors.webEntryForm).should('be.visible');
    }
  
  loginPasswordChanged(username = Cypress.env("username"), password = Cypress.env("password")) {
    this.enterUsername(username);
    this.enterPassword(password);
    this.clickOnLogin();

    cy.get('.mb-3').should('be.visible');
  }

  setNewPassword(name,password){
    cy.get('#password').type(password);
    cy.get('#confpassword').type(password);
    cy.get('.pt-3 > .btn').click();
    this.login(name,password);
  }

  enterUsername(username) {
    cy.get(selectors.usernameTxtBx).type(username).should('have.value', username);
  }

  enterPassword(password) {
    cy.get(selectors.passwordTxtBx).type(password).should('have.value', password);
  }

  loginWithDifferentUser(username, password) {
    this.enterUsername(username);
    this.enterPassword(password);
    this.clickOnLogin();
    //cy.xpath(selectors.userTitleBtn).should('be.visible');
  }

  changeLanguageToEnglishAndDateType(){
    cy.get(selectors.userIcon).click();
    cy.xpath(selectors.editUser).click();
    cy.get(selectors.languageBtn).select('en');
    cy.get(selectors.dateFormatBtn).select('Y-m-d H:i');
    cy.xpath(selectors.saveBtn).click();
   }

}
