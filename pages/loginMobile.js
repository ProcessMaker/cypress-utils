import selectors from "../selectors/loginMobile";
export class LoginMobile {
    /**
     * method to login with credentials, by default uses admin user.
     * @param {username} username 
     * @param {password} password 
     */
    LoginMobile(username = Cypress.env("username"), password = Cypress.env("password")){
        cy.visit("/");
        cy.get("form")
            .scrollIntoView()
            .within(() => {
                cy.get(selectors.usernameTxt).type(username);
                cy.get(selectors.passwordTxt).type(password);
                cy.get(selectors.loginBtn).click();
            });
    }

    /**
     * Use viewport in order to change the screen size
     * @param {size} size, value can be an array or a string according to https://docs.cypress.io/api/commands/viewport#Arguments  
     */
    checkResolution(size) {
        if (Cypress._.isArray(size)) {
            cy.log("is array");
            cy.viewport(size[0], size[1]);
        } else {
            cy.viewport(size);
        }
    }
    
}
