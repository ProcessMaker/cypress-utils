import selectors from "#selectors/login"
import { VerifyElementHelper } from "#helpers/verifyElementsHelper"
const helper = new VerifyElementHelper(); 

export class LoginV1 {

  /**
   * Navigates to the login page
   */
  navigateToUrl() {
    cy.visit("/login")
  }

  /**
   * Navigates to the logout page
   */
  navigateToLogout(){
    cy.visit("/logout")
  }

  /**
   * Clicks the sign in button
   */
  pressSignInButton(){
    cy.get(selectors.loginBtn).click();
  }

  /**
   * Enters the provided username in the username field
   * @param {string} username - The username to enter
   */
  enterUsername(username) {
    cy.get(selectors.usernameTxtBx).type(username)
  }

  /**
   * Enters the provided password in the password field
   * @param {string} password - The password to enter
   */
  enterPassword(password) {
    cy.get(selectors.passwordTxtBx).type(password)
  }

  /**
   * Clears the content of the username field
   */
  clearUsernameField(){
    cy.get(selectors.usernameTxtBx).clear()
  }

  /**
   * Clears the content of the password field
   */
  clearPasswordField(){
    cy.get(selectors.passwordTxtBx).clear()
  }

  /**
   * Verifies that the username field is visible on the page
   */
  usernameFieldIsVisible(){
    helper.validateElementIsVisible(selectors.usernameTxtBx)
  }

  /**
   * Verifies that the password field is visible on the page
   */
  passwordFieldIsVisible(){
    helper.validateElementIsVisible(selectors.passwordTxtBx)
  }

  /**
   * Verifies that the sign in button is visible on the page
   */
  signInButtonIsVisible(){
    helper.validateElementIsVisible(selectors.loginBtn)
  }

  /**
   * Clears all browser cookies
   */
  clearCookies(){
    cy.clearCookies()
  }

  /**
   * Clears all data from browser's local storage
   */
  clearLocalStorage(){
    cy.clearLocalStorage();
  }
}
