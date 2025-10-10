import { LoginV1 } from "#pages/loginV1"
const login = new LoginV1()

export class LoginModel {

    /**
     * Navigates to the login page
     */
    gotoLogin(){
        login.navigateToUrl()
    }

    /**
     * Navigates to the logout page
     */
    gotoLogout(){
        login.navigateToLogout()
    }

    /**
     * Performs a complete login flow with the provided credentials
     * @param {string} username - The username to login with (defaults to Cypress env variable)
     * @param {string} password - The password to login with (defaults to Cypress env variable)
     */
    login(username = Cypress.env("username"), password = Cypress.env("password")) {
        login.clearCookies()
        login.clearLocalStorage()
        login.navigateToUrl()
        login.usernameFieldIsVisible()
        login.enterUsername(username)
        login.passwordFieldIsVisible()
        login.enterPassword(password)
        login.signInButtonIsVisible()
        login.pressSignInButton()
    }

}