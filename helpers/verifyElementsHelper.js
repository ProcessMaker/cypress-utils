export class VerifyElementHelper{
    
    /**
     * Validates that a specific element (by index) contains the expected text
     * @param {string} cssSelectorInput - CSS selector for the element
     * @param {string} valueInput - Expected text value
     * @param {number} nro - Element index (default: 0)
     */
    validateFieldByTextNroElement(cssSelectorInput, valueInput, nro = 0){
        cy.get(cssSelectorInput).eq(nro).should('have.text', valueInput)
    }
    
    /**
     * Validates that an element contains the expected text
     * @param {string} cssSelectorInput - CSS selector for the element
     * @param {string} valueInput - Expected text value
     */
    validateFieldByText(cssSelectorInput, valueInput){
        cy.get(cssSelectorInput).should('have.text', valueInput)
    }
    
    /**
     * Validates that a specific element (by index) has the expected value
     * @param {string} cssSelectorInput - CSS selector for the element
     * @param {string} valueInput - Expected value
     * @param {number} nro - Element index (default: 0)
     */
    validateFieldByValueNroElement(cssSelectorInput, valueInput, nro = 0){
        cy.get(cssSelectorInput).eq(nro).should('have.value', valueInput)
    }
    
    /**
     * Validates that an element has the expected value
     * @param {string} cssSelectorInput - CSS selector for the element
     * @param {string} valueInput - Expected value
     */
    validateFieldByValue(cssSelectorInput, valueInput){
        cy.get(cssSelectorInput).should('have.value', valueInput)
    }
    
    /**
     * Validates that an element is visible on the page
     * @param {string} cssSelectorElement - CSS selector for the element
     */
    validateElementIsVisible(cssSelectorElement){
        cy.get(cssSelectorElement).should("be.visible")
    }
    
    /**
     * Validates that a specific element (by index) is visible on the page
     * @param {string} cssSelectorElement - CSS selector for the element
     * @param {number} nro - Element index (default: 0)
     */
    validateElementIsVisibleNroElement(cssSelectorElement, nro = 0){
        cy.get(cssSelectorElement).eq(nro).should("be.visible")
    }
    
    /**
     * Validates that the current URL contains the specified value
     * @param {string} valueURL - Expected URL fragment
     */
    validateURLByContains(valueURL){
        cy.url().then(($url) => {
            expect($url).to.be.contains(valueURL)
        })
    }
    
    /**
     * Performs a static wait for the specified time
     * @param {number} timeWait - Time to wait in milliseconds
     */
    staticWait(timeWait){
        cy.wait(timeWait)
    }
    
    /**
     * Validates that an element does not exist on the page
     * @param {string} cssSelectorElement - CSS selector for the element
     */
    elementNotExist(cssSelectorElement){
        cy.get(cssSelectorElement).should('not.exist')
    }
    
    /**
     * Validates that a checkbox or radio button is not checked
     * @param {string} cssSelectorElement - CSS selector for the element
     */
    elementIsNotChecked(cssSelectorElement){
        cy.get(cssSelectorElement).should('not.be.checked')
    }
    
    /**
     * Validates that the number of elements matches the expected count
     * @param {string} element - CSS selector for the elements
     * @param {number} counterValue - Expected number of elements
     */
    verifyCountElement(element, counterValue){
        cy.get(element).its('length').should("eq",counterValue)
    }
    
    /**
     * Validates that an element is disabled
     * @param {string} cssSelectorElement - CSS selector for the element
     */
    verifyElementIsDisabled(cssSelectorElement){
        cy.get(cssSelectorElement).should("be.disabled")
    }
    
    /**
     * Validates that a specific element (by index) is disabled
     * @param {string} cssSelectorElement - CSS selector for the element
     * @param {number} nro - Element index (default: 0)
     */
    verifyElementIsDisabledNRO(cssSelectorElement, nro=0){
        cy.get(cssSelectorElement).eq(nro).should("be.disabled")
    }
}