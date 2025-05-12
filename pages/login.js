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
    // Verify that we are on the login page
    cy.url().should('include', '/login');
    
    // Clean and write the credentials
    this.enterUsername(username);
    this.enterPassword(password);
    
    // Go to click on login button
    this.clickOnLogin();
    
    // Wait for the page to load completely
    cy.wait(2000);
    
    // Verify that the login was successful
    cy.get('body').then($body => {
      // Verify if there are error messages
      if ($body.find('.alert-danger').length > 0) {
        throw new Error('Error in login: Invalid credentials');
      }
    });
    
    // Verify that the navbar is present and visible
    cy.get('#navbar1', { timeout: 30000 })
      .should('exist')
      .should('be.visible')
      .should('have.css', 'opacity', '1')
      .then($navbar => {
        // Verify that the navbar has valid dimensions
        const rect = $navbar[0].getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) {
          throw new Error('The navbar has invalid dimensions');
        }
      });
    
    // Verify that the user avatar is present
    cy.get(headerSelectors.userAvatarBtn, { timeout: 30000 })
      .should('exist')
      .should('be.visible')
      .should('have.css', 'opacity', '1')
      .then($avatar => {
        // Verify that the avatar has valid dimensions
        const rect = $avatar[0].getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) {
          throw new Error('The user avatar has invalid dimensions');
        }
      });
    
    // Verify that the URL changed after the login
    cy.url().should('not.include', '/login');
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
