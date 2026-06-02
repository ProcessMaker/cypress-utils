class qaShould {

  returnElement(type, element){
    switch (type) {
      case "css":
        return cy.get(element)
      case "xpath":
        return cy.xpath(element)
      default:
        cy.log(`Error: The type ${type} or ${element} is not defined`);
  }
  }
  elementIsVisible(type, element) {
    this.returnElement(type, element).should("be.visible")
  }

  elementHaveText(type, element, value) {
    this.returnElement(type, element).invoke('text').should("have.text", value);
  }

  elementToEqual(type, element, value) {
    this.returnElement(type, element).should($el=>{
      expect($el.text().trim()).to.equal(value);
    })
  }

  elementToContain(type, element, value) {
    this.returnElement(type, element).should($el=>{
      expect($el.text().trim()).to.contain(value)
    })
  }

  elementContainText(type, element, subString){
    this.returnElement(type, element).should("contain.text", subString)
  }
}

export default new qaShould();
