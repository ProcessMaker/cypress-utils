import EndTestEmail from "@pages/EndTestEmail"

class EndTestEmailModel {
  verifyFirstEndTestEmail(email){
    EndTestEmail.verifyFirstEndTestEmail(email)
  }
  
  deleteEmailEndTest(email){
    EndTestEmail.deleteEmails(email)
  }
}
export default new EndTestEmailModel();