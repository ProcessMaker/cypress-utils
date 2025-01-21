import { NavigationHelper } from "#helpers/navigationHelper";
import selectors from "#selectors/rpa";
import { Process } from "#pages/process";

const navHelper = new NavigationHelper();
const process = new Process();

export class RPA {

    clickOnUiPath(){
      cy.wait(1000);
      cy.xpath('//*[@class="fas fa-puzzle-piece"]').click({force: true});
      cy.xpath('//div[contains(text(),"UiPath")]').should('be.visible');
      cy.xpath('//div[contains(text(),"UiPath")]').click({force: true});
    }

    deleteOrganizationName(){

        let optionConfigXpath = '//div[contains(text(),"optionName")]/ancestor::tr//button[@aria-label="Clear"]';
        let optionColumnXpath = '//div[contains(text(),"optionColumn")]/ancestor::tr/td[2]';
        cy.xpath(optionConfigXpath.replace('optionName','Organization Name')).click();
        
      }

    deleteClientID(){

        let optionConfigXpath = '//div[contains(text(),"optionName")]/ancestor::tr//button[@aria-label="Clear"]';
        let optionColumnXpath = '//div[contains(text(),"optionColumn")]/ancestor::tr/td[2]';
        cy.xpath(optionConfigXpath.replace('optionName','Client ID')).click();
        
      }

    deleteClientSecret(){

        let optionConfigXpath = '//div[contains(text(),"optionName")]/ancestor::tr//button[@aria-label="Clear"]';
        let optionColumnXpath = '//div[contains(text(),"optionColumn")]/ancestor::tr/td[2]';
        cy.xpath(optionConfigXpath.replace('optionName','Client Secret')).click();
        
      }  
    
    deleteTenantID(){

        let optionConfigXpath = '//div[contains(text(),"optionName")]/ancestor::tr//button[@aria-label="Clear"]';
        let optionColumnXpath = '//div[contains(text(),"optionColumn")]/ancestor::tr/td[2]';
        cy.xpath(optionConfigXpath.replace('optionName','Tenant ID')).click();
        
      }

    deleteSelectFolder(){

        let optionConfigXpath = '//div[contains(text(),"optionName")]/ancestor::tr//button[@aria-label="Clear"]';
        let optionColumnXpath = '//div[contains(text(),"optionColumn")]/ancestor::tr/td[2]';
        cy.xpath(optionConfigXpath.replace('optionName','Select Available Folders')).click();
        
      }


    copyOrganizationName(){

        let optionConfigXpath = '//div[contains(text(),"optionName")]/ancestor::tr//button[@aria-label="Copy to Clipboard"]';
        let optionColumnXpath = '//div[contains(text(),"optionColumn")]/ancestor::tr/td[2]';
        cy.xpath(optionConfigXpath.replace('optionName','Organization Name')).click();
        
      }

    copyClientID(){

        let optionConfigXpath = '//div[contains(text(),"optionName")]/ancestor::tr//button[@aria-label="Copy to Clipboard"]';
        let optionColumnXpath = '//div[contains(text(),"optionColumn")]/ancestor::tr/td[2]';
        cy.xpath(optionConfigXpath.replace('optionName','Client ID')).click();
        
      }

    copyClientSecret(){

        let optionConfigXpath = '//div[contains(text(),"optionName")]/ancestor::tr//button[@aria-label="Copy to Clipboard"]';
        let optionColumnXpath = '//div[contains(text(),"optionColumn")]/ancestor::tr/td[2]';
        cy.xpath(optionConfigXpath.replace('optionName','Client Secret')).click();
        
      }  
    
    copyTenantID(){

        let optionConfigXpath = '//div[contains(text(),"optionName")]/ancestor::tr//button[@aria-label="Copy to Clipboard"]';
        let optionColumnXpath = '//div[contains(text(),"optionColumn")]/ancestor::tr/td[2]';
        cy.xpath(optionConfigXpath.replace('optionName','Tenant ID')).click();
        
      }

      addSelectFolder(rpaFolderName){

        let optionConfigXpath = '//div[contains(text(),"optionName")]/ancestor::tr//button[@aria-label="Edit"]';
        let optionColumnXpath = '//div[contains(text(),"optionColumn")]/ancestor::tr/td[2]';
        
        cy.xpath(optionConfigXpath.replace('optionName','Select Available Folders')).click();
        cy.xpath(selectors.SelectFolderDropdown).should('be.visible');
        cy.xpath(selectors.SelectFolderDropdown).click();
        cy.get(selectors.SelectFolderTxtBx).type(rpaFolderName, {delay: 100}).type('{enter}'); 
        cy.get('.btn-secondary').click();
      }

      clickSaveSelectAvailableFolders(){
        cy.get('.btn-secondary').click();
      }

    copyRedirectURL(){

        let optionConfigXpath = '//div[contains(text(),"optionName")]/ancestor::tr//button[@aria-label="Copy to Clipboard"]';
        let optionColumnXpath = '//div[contains(text(),"optionColumn")]/ancestor::tr/td[2]';
        cy.xpath(optionConfigXpath.replace('optionName','Redirect URL')).click();
        
      }

    searchItemRPA(item) {
        //var editBtn ='//*[@id="categories-listing"]//button[@aria-haspopup="menu"]';
        //cy.get('#projectsCategorizedList').should("be.visible");
        //cy.xpath(editBtn).should("be.visible");
        cy.xpath(selectors.searchItemRPA).should("be.visible");
        cy.xpath(selectors.searchItemRPA).type(`${item}{enter}`).should("have.value", item);
        cy.xpath(selectors.searchItemRPA).type(' ').type('{backspace}');
            
    }

  addRPAfolder(RPAfolderName) {
     //cy.wait(2000);
    cy.xpath(selectors.RPAfolderDropdown).should('be.visible');
    cy.xpath(selectors.RPAfolderDropdown).click();
    cy.get(selectors.RPAfolderTxtBx).type(RPAfolderName).should('have.value', RPAfolderName);
    cy.xpath(selectors.RPADropdownOption.replace('RPAfolderName', RPAfolderName)).click({ force: true });
    
  }

  addRPAprocess(RPAprocessName) {
    //cy.wait(2000);
    cy.xpath(selectors.RPAprocessDropdown).should('be.visible');
    cy.xpath(selectors.RPAprocessDropdown).click();
    cy.get(selectors.RPAprocessTxtBx).type(RPAprocessName).should('have.value', RPAprocessName);
    cy.xpath(selectors.RPADropdownOptionProcess.replace('RPAprocessName', RPAprocessName)).click({ force: true });
    
}

  addRPAmachine(RPAmachineName) {
  //cy.wait(2000);
  cy.xpath(selectors.RPAmachineDropdown).should('be.visible');
  cy.xpath(selectors.RPAmachineDropdown).click();
  cy.get(selectors.RPAmachineTxtBx).type(RPAmachineName).should('have.value', RPAmachineName);
  cy.xpath(selectors.RPAmachineDropdownOption.replace('RPAmachineName', RPAmachineName)).click({ force: true });
  
}

addRPAbot(RPAbot) {
  //cy.wait(2000);
  cy.xpath(selectors.RPAbotDropdown).should('be.visible');
  cy.xpath(selectors.RPAbotDropdown).click();
  cy.get(selectors.RPAbotTxtBx).type(RPAbot).should('have.value', RPAbot);
  cy.xpath(selectors.RPAbotDropdownOption.replace('RPAbot', RPAbot)).click({ force: true });
  
}
  
  }
