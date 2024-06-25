//import { NavigationHelper } from "#helpers/navigationHelper";
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
                cy.get('input[id="username"]').type(username);
                cy.get('input[id="password"]').type(password);
                cy.get('button[type="submit"]').click();
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
