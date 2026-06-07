class EndTestEmail {
  returnEndTestMainElement(){
        return cy.get("div.email_list div.email_item")
  }

  returnSubjectEndTest(){
    return cy.get("div.email_subject")
  }

  returnFromEndTest(){
    return cy.get("div.email_from")
  }

  verifyFirstEndTestEmail(emailData){
    cy.session("Verify email endTest", () => {
      cy.visit("https://app.endtest.io/")
      cy.wait(emailData.time)
      cy.visit(`https://app.endtest.io/mailbox?email=${emailData.email}`)
      this.returnEndTestMainElement().should("be.visible").first().then(($el)=>{
        cy.wrap($el).within(() => {
          this.returnSubjectEndTest().then(($subject)=>{
            expect(emailData.subject).to.include($subject.text().trim())
          })
          this.returnFromEndTest().then(($email)=>{
            expect($email.text().trim()).to.be.eq(emailData.from)
          })
        })
      })
    }); 
  }
}

export default new EndTestEmail();