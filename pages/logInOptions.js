import selectors from "#selectors/logInOptions";
import { NavigationHelper } from "#helpers/navigationHelper";
const navHelper = new NavigationHelper();

export class logInOption {

    goToLoginOptionTab(){
        cy.contains('Log-In & Auth').should('be.visible').click({ force: true });
        cy.contains('Log-In Options').should('be.visible').click({ force: true });
    }

    alertSucces(){
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should('be.visible');
    }

    enablePasswordSetByUser(){
        cy.xpath('//div[contains(text(),"Password set by user")]').should('be.visible');
        cy.xpath(selectors.passwordSetByUserBtn).then(($PasswordSetByUser)=>{
            if($PasswordSetByUser.prop('checked') === true){
                cy.log('its enable');
            }
            else{
                cy.xpath(selectors.passwordSetByUserBtn).click({force: true});
                this.alertSucces(); 
            }
        })
    }

    enableNumericCharacters(){
        cy.xpath('//div[contains(text(),"Numeric characters")]').should('be.visible');
        cy.xpath(selectors.numericCharactersBtn).then(($numericCharacters)=>{
            if($numericCharacters.prop('checked') === true){
                cy.log('its enable');
            }
            else{
                cy.xpath(selectors.numericCharactersBtn).click({force: true});
                this.alertSucces();
            }
        })
    }

    enableUppercaseCharacters(){
        cy.xpath('//div[contains(text(),"Uppercase characters")]').should('be.visible');
        cy.xpath(selectors.uppercaseCharactersBtn).then(($UppercaseCharacters)=>{
            if($UppercaseCharacters.prop('checked') === true){
                cy.log('its enable');
            }
            else{
                cy.xpath(selectors.uppercaseCharactersBtn).click({force: true});
                this.alertSucces();
            }
        })
    }

    enableSpecialCharacters(){
        cy.xpath('//div[contains(text(),"Special characters")]').should('be.visible');
        cy.xpath(selectors.specialCharactersBtn).then(($specialCharacters)=>{
            if($specialCharacters.prop('checked') === true){
                cy.log('its enable');
            }
            else{
                cy.xpath(selectors.specialCharactersBtn).click({force: true});
                this.alertSucces();
            }
        })
    }

    enableRequireTwoStepAuthentication(){
        cy.xpath('//div[contains(text(),"Require Two Step Authentication")]').should('be.visible');
        cy.xpath(selectors.requireTwoStepAuthenticationBtn).then(($2FA)=>{
            if($2FA.prop('checked') === true){
                cy.log('its enable');
            }
            else{
                cy.xpath(selectors.requireTwoStepAuthenticationBtn).click({force: true});
                this.alertSucces();
            }
        })
    }

    disablePasswordSetByUser(){
        cy.xpath('//div[contains(text(),"Password set by user")]').should('be.visible');
        cy.xpath(selectors.passwordSetByUserBtn).then(($PasswordSetByUser)=>{
            if($PasswordSetByUser.prop('checked') === false){
                cy.log('its disable');
            }
            else{
                cy.xpath(selectors.passwordSetByUserBtn).click({force: true});
                this.alertSucces();
            }
        })
    }

    disableNumericCharacters(){
        cy.xpath('//div[contains(text(),"Numeric characters")]').should('be.visible');
        cy.xpath(selectors.numericCharactersBtn).then(($numericCharacters)=>{
            if($numericCharacters.prop('checked') === false){
                cy.log('its disable');
            }
            else{
                cy.xpath(selectors.numericCharactersBtn).click({force: true});
                this.alertSucces();
            }
        })
    }

    disableUppercaseCharacters(){
        cy.xpath('//div[contains(text(),"Uppercase characters")]').should('be.visible');
        cy.xpath(selectors.uppercaseCharactersBtn).then(($UppercaseCharacters)=>{
            if($UppercaseCharacters.prop('checked') === false){
                cy.log('its disable');
            }
            else{
                cy.xpath(selectors.uppercaseCharactersBtn).click({force: true});
                this.alertSucces();
            }
        })
    }

    disableSpecialCharacters(){
        cy.xpath('//div[contains(text(),"Special characters")]').should('be.visible');
        cy.xpath(selectors.specialCharactersBtn).then(($specialCharacters)=>{
            if($specialCharacters.prop('checked') === false){
                cy.log('its disable');
            }
            else{
                cy.xpath(selectors.specialCharactersBtn).click({force: true});
                this.alertSucces();
            }
        })
    }

    editMaximumLength(maxValue){
        cy.xpath('//div[contains(text(),"Maximum length")]').should('be.visible');
        cy.xpath('//div[contains(text(),"Maximum length")]//parent::td//following-sibling::td[1]//div//div').then(($minLenght)=>{     
        if($minLenght.prop('innerText') === maxValue.toString()){
            cy.log('contain value');
        }
        else{
            cy.xpath(selectors.editMaximumLengthBtn).should('be.visible').click();
            cy.xpath(selectors.editMaximumLengthInput).should('be.visible').clear().type(maxValue).should('have.value',maxValue);
            cy.xpath(selectors.saveBtn).click();
            }
        })  
    }

    cleanMaximumLength(){
        cy.xpath('//div[contains(text(),"Maximum length")]').should('be.visible');
        cy.xpath('//div[contains(text(),"Maximum length")]//parent::td//following-sibling::td[1]//div//div').then(($maxLenght)=>{
            if($maxLenght.prop('innerText') === 'Empty' || $maxLenght.prop('innerText') === '0' ){
                cy.log('its Empty');
            }
            else{
                this.editMaximumLength(0);
            }
        })
    }

    editMinimumLength(minValue){
        cy.xpath('//div[contains(text(),"Minimum length")]').should('be.visible');
        cy.xpath('//div[contains(text(),"Minimum length")]//parent::td//following-sibling::td[1]//div//div').then(($minLenght)=>{     
        if($minLenght.prop('innerText') === minValue.toString()){
            cy.log('contain value');
        }
        else{
                cy.xpath(selectors.editMinimumLengthBtn).should('be.visible').click();
                cy.xpath(selectors.editMinimumLengthInput).should('be.visible').clear().type(minValue).should('have.value',minValue);
                cy.xpath(selectors.saveBtn).click();
            }
        })
    }

    cleanMinimumLength(){
        cy.xpath('//div[contains(text(),"Minimum length")]').should('be.visible');
        cy.xpath('//div[contains(text(),"Minimum length")]//parent::td//following-sibling::td[1]//div//div').then(($minLenght)=>{
            if($minLenght.prop('innerText') === 'Empty' || $minLenght.prop('innerText') === '0' ){
                cy.log('its Empty');
            }
            else{
                this.editMinimumLength(0);
            }
        })
    }

    editLoginFailed(attempts){
        cy.xpath('//div[contains(text(),"Login failed")]').should('be.visible');
        cy.xpath('//div[contains(text(),"Login failed")]//parent::td//following-sibling::td[1]//div//div').then(($value)=>{     
            if($value.prop('innerText') === attempts.toString()){
                cy.log('contain value');
            }
            else{
                cy.xpath(selectors.editLoginFailedBtn).should('be.visible').click();
                cy.xpath(selectors.editLoginFailedInput).should('be.visible').clear().type(attempts).should('have.value',attempts);
                cy.xpath(selectors.saveBtn).click();
            }
        })       
    }

    cleanLoginFailed(){
        cy.xpath('//div[contains(text(),"Login failed")]').should('be.visible');
        cy.xpath('//div[contains(text(),"Login failed")]//parent::td//following-sibling::td[1]//div//div').then(($maxLenght)=>{
            if($maxLenght.prop('innerText') === 'Empty' || $maxLenght.prop('innerText') === '0' ){
                cy.log('its Empty');
            }
            else{
                this.editLoginFailed(0);
            }
        })
    }

    disableRequireTwoStepAuthentication(){
        cy.xpath('//div[contains(text(),"Require Two Step Authentication")]').should('be.visible');
        cy.xpath(selectors.requireTwoStepAuthenticationBtn).then(($2FA)=>{
            if($2FA.prop('checked') === false){
                cy.log('its disable');
            }
            else{
                cy.xpath(selectors.requireTwoStepAuthenticationBtn).click({force: true});
                this.alertSucces();
            }
        })
    }

    resetLogInOptions(){
        navHelper.navigateToSettings();
        this.goToLoginOptionTab();
        this.enablePasswordSetByUser();
        this.disableNumericCharacters();
        this.disableUppercaseCharacters();
        this.disableSpecialCharacters();
        this.cleanMaximumLength(0);
        this.cleanMinimumLength(0);
        this.editLoginFailed(5);
        this.disableRequireTwoStepAuthentication();
    }

    loginFailed(attempts,userName,incorrectPassword){
        for (let index = 0; index < attempts+1; index++) {
            cy.get('[align="center"]').should('be.visible');
            cy.get('#username').should('be.visible');
            cy.get('#username').click().clear();
            cy.get('#username').type(userName,{delay:60}).should('have.value', userName);
            cy.get('#password').should('be.visible');
            cy.get('#password').click().clear();
            cy.get('#password').type(incorrectPassword,{delay:60}).should('have.value', incorrectPassword);
            cy.get('[type="submit"]').click();
            cy.log(index);
        }
    }

    fillPasswordInCreateUser(password){
        navHelper.navigateToAdminUserPage();
        cy.get('button[aria-label="Create User"]').click();
        cy.get('#password').should('be.visible');
        this.retryTypingText('#password',password);
        cy.get('#confpassword').should('be.visible');
        this.retryTypingText('#confpassword',password);
        cy.get('#saveUser').click();
        cy.wait(1000);
    }

    waitUntilHelperTextAppearInCreateUser(password,xpath,helperText,maxAttempts=35, attempts=0){
        if (attempts > maxAttempts) {
            throw new Error("Not found");
        }
        this.fillPasswordInCreateUser(password);
        cy.xpath('//label[contains(text(),"Confirm Password")]//parent::div').then($boxHelp=>{
            cy.log($boxHelp.find('div').text());       
            if ($boxHelp.find('div').text()!== helperText) { 
                cy.wait(3000);
                cy.reload();
                this.fillPasswordInCreateUser(password);
                this.waitUntilHelperTextAppearInCreateUser(password,xpath,helperText,maxAttempts, attempts+1);
            }
        })
    }

    fillPasswordInEditUser(password){
        cy.get('#password').should('be.visible');
        this.retryTypingText('#password',password);
        cy.get('[id="confPassword"]').should('be.visible');
        this.retryTypingText('[id="confPassword"]',password);
        cy.get('#saveUser').click();
        cy.wait(1000);
    }

    waitUntilHelperTextAppearInEditUser(password,xpath,helperText,maxAttempts=35, attempts=0){
        if (attempts > maxAttempts) {
            throw new Error("Not found");
        }
        this.fillPasswordInEditUser(password);
        cy.xpath('//label[contains(text(),"Confirm Password")]//parent::div').then($boxHelp=>{
            cy.log($boxHelp.find('div').text());       
            if ($boxHelp.find('div').text()!== helperText) { 
                cy.wait(3000);
                cy.reload();
                this.fillPasswordInEditUser(password);
                this.waitUntilHelperTextAppearInEditUser(password,xpath,helperText,maxAttempts, attempts+1);
            }
        })
    }
    
    fillPasswordInUserProfile(password){
        cy.get('#password').should('be.visible');
        this.retryTypingText('#password',password);
        cy.get('[id="confPassword"]').should('be.visible');
        this.retryTypingText('[id="confPassword"]',password);
        cy.xpath('//button[contains(text(),"Save")]').click();
        cy.wait(1000);
    }

    waitUntilHelperTextAppearInUserProfile(password,xpath,helperText,maxAttempts=35, attempts=0){
        if (attempts > maxAttempts) {
            throw new Error("Not found");
        }
        this.fillPasswordInUserProfile(password);
        cy.xpath('//label[contains(text(),"Confirm Password")]//parent::div').then($boxHelp=>{
            cy.log($boxHelp.find('div').text());       
            if ($boxHelp.find('div').text()!== helperText) { 
                cy.wait(3000);
                cy.reload();
                this.fillPasswordInUserProfile(password);
                this.waitUntilHelperTextAppearInUserProfile(password,xpath,helperText,maxAttempts, attempts+1);
            }
        })
    }

    retryTypingText(selector,text,maxAttempts=10,attempts=0){
        cy.get(selector).type(text,{delay:50});
            if (attempts > maxAttempts) {
                throw new Error("Failed");
            }
            cy.get(selector).invoke('val').then(($value)=>{
            if ($value!== text) { 
                cy.get(selector).click().clear();
                this.retryTypingText(selector,text,maxAttempts,attempts+1);
            }
            else{
                cy.get(selector).should('have.value',text);
            }
        })
    }    
}
