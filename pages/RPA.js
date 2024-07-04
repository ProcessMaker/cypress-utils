import { NavigationHelper } from "#helpers/navigationHelper";
import selectors from "#selectors/rpa";
import { Process } from "#pages/process";

const navHelper = new NavigationHelper();
const process = new Process();

export class RPA {

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
        //cy.xpath(editBtn).first().click({ force: true });
        
    }  
    
           }
