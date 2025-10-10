export class SetScreenControlHelper{
    setInputControl_cssSelector($selector, $value){
        cy.get($selector).should('be.visible').type($value).should('have.value', $value);
    }
    
    pressSubmitButton_cssSelector($selector){
        cy.get($selector).should('be.visible').click();
    }    
}