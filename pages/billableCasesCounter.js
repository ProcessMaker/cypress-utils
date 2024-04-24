import selectors from "#selectors/billableCasesCounter";

export class billableCasesCounter {
   /**
   * This method is responsible for menus and hrefs validations
   * @return nothing returns
   */
   validateMenusAndHrefs(){
          cy.xpath(selectors.defaultReportsOption)
              .should('have.attr', 'href').and('contains','package-analytics-reporting');
          cy.xpath(selectors.customReportsOption)
              .should('have.attr', 'href').and('contains','package-custom-analytics');
   }  

   /**
   * This method is responsible for validations for titles
   * @return nothing returns
   */
   validateTitles(attribute, title){
          cy.iframe('.embed-responsive-item')
                  .find(attribute)
                  .contains(title)
                  .scrollIntoView({ easing: 'linear' })
                  .should('be.visible');     
   }
  
   /**
   * This method is responsible for validations for graphics
   * @return nothing returns
   */
   validateGraphics(attribute, title){
          cy.iframe('.embed-responsive-item')
                  .find(attribute).eq(1)
                  .scrollIntoView({ easing: 'linear' })
                  .should('be.visible');     
   }

   /**
   * This method is responsible for hover on titles
   * @return nothing returns
   */
   hoverOnTitle(){
           cy.xpath(selectors.customReportsOption)
                  .should('be.visible')
                  .trigger('mouseover').invoke('show');   
   }

   /**
   * This method is responsible for hidden options
   * @return nothing returns
   */
   clickonHiddenOption(){
      cy.iframe('.embed-responsive-item')
                  .find(selectors.menuOptions)
                  .should('be.visible')
                  .click()
   }

   /**
   * This method is responsible for CSV option explore
   * @return nothing returns
   */
   clickOnCSV(){
      cy.iframe('.embed-responsive-item')
                  .find(selectors.dashboardVisualDropdownExport)
                  .should('be.visible')
                  .click();
   }

  /**
  * This method is responsible for hover and explore titles for menu options
  * @return nothing returns
  */
  reportOptionsHoverAndToolTipShow(){
    cy.get(selectors.verticalMenuDefaultReports).trigger('mouseover').invoke('show');
    cy.contains('Default Reports').should('be.visible');
    cy.get(selectors.verticalMenuCustomReport).trigger('mouseover').invoke('show');
    cy.contains('Custom Reports').should('be.visible');
  }   
}
