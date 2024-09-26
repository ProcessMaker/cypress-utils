import selectors from "#selectors/slideShow"

export class SlideShow {
    /**
     * This method is responsible to select an open configuration of an element
     * @param elementType: Could be "Start Event, Manual Task, Form Task"
     * @param elementName: This is tye name of the control
     * @return nothing returns
     */
    selectAndOpenConfiguration(elementType, elementName){
        switch (elementType) {
            case "Start Event":
                cy.xpath(selectors.elementSelectorStartEvent.replace('elementName',elementName)).eq(0).click({force:true});
                break;
            case "Manual Task":
                cy.xpath(selectors.elementSelectorTask.replace('elementName',elementName)).eq(0).click({force:true});
                break;
            case "Form Task":
                cy.xpath(selectors.elementSelectorTask.replace('elementName',elementName)).eq(0).click({force:true});
                break;
        }
    }
    /**
     * This method is responsible to upload image to slide show if not exits
     * @return nothing returns
     */
    uploadImageToSlideShowIfNotExits(image,valid=true){
        cy.xpath(selectors.settigns_fotoLabel).should('exist');

        cy.get('body')
            .then(($body) => {
                if ($body.find('input[type="file"]').length) {
                    // input was found, do something else here
                    cy.log('ewwwwwwww');
                    this.uploadImageToSlideShow(image);
                    if (valid){
                        cy.xpath('//div[@label="Image Slide Show"]//*[contains(@class,"justify-center items-center")]')
                            .should('be.visible');
                        cy.xpath('//div[@label="Image Slide Show"]//*[contains(@class,"justify-center items-center")]')
                            .should('not.be.visible');
                        cy.wait(2000);
                    }
                }
            });
    }
    /**
     * This method is responsible to upload image to slide show
     * @return nothing returns
     */
    uploadImageToSlideShow(image){
        cy.xpath(selectors.settings_uploadImage).attachFile(image);
    }
    /**
     * This method is responsible to verify if one image was upload in slide show
     * @return nothing returns
     */
    verifyImageInSlideShow(){
        cy.xpath(selectors.settings_uploadImage).should('not.exist');
        cy.get(selectors.settings_image).should('exist');
    }
    /**
     * This method is responsible to delete one image in slide show if there is one image
     * @return nothing returns
     */
    deleteImageInSlideShowIfExits(){
        cy.get('[label="Image Slide Show"]').should('exist');

        cy.get('body')
            .then(($body) => {
                if ($body.find(selectors.settings_deleteImage).length) {
                    // input was found, do something else here
                    cy.log('delete');
                    this.deleteImageInSlideShow();
                }else{
                    cy.log('LON'+$body.find(selectors.settings_deleteImage).length);
                }
            });
    }
    /**
     * This method is responsible to delete one image in slide show
     * @return nothing returns
     */
    deleteImageInSlideShow(){
        cy.wait(5000);
        cy.get(selectors.settings_deleteImage)
            .should('exist')
            .click({force:true});
        cy.xpath(selectors.settings_uploadImage).should('exist');
        cy.wait(2000);
    }
    /**
     * This method is responsible to verify that image is not visible
     * @return nothing returns
     */
    verifyImageInSlideShowIsNotVisible(){
        cy.get(selectors.settings_image).should('not.exist');
    }
    /**
     * This method is responsible to verify that image is not visible
     * @return nothing returns
     */
    verifyControlsNotHaveSlideShow(){
        cy.xpath(selectors.settings_uploadImage).should('not.exist');
        cy.get(selectors.settings_image).should('not.exist');
    }
    /**
     * This method is responsible to open slide show modal
     * @return nothing returns
     */
    clickOnSlideShowButton(){
        cy.get(selectors.slideShowButton)
            .should('exist')
            .click();
        cy.wait(5000);
    }
    enableSlideShowSharing(){
        cy.get(selectors.modal_enableSharing).should('exist')
            .check({force:true});
        cy.xpath('(//a[contains(text(),"Open Slideshow Mode")])[1]').should('be.visible');
    }
    disableSlideShowSharing(){
        cy.get(selectors.modal_enableSharing).eq(0).uncheck({force:true});
    }
    saveSlideShowModal(){
        cy.log('entro');
        cy.wait(4000);
        cy.xpath(selectors.modal_save).should('be.enabled').click();
        cy.get(selectors.modal_alertSucces).should('be.visible')
    }
    /**
     * This method is responsible to fill data in slide show modal
     * @param data: this is the data to fille the modal EJE. "alternative, emails"
     * @return nothing returns
     */
    fillSlideShowModal(data){
        if(data.sharing)
            this.enableSlideShowSharing();
        else
            this.disableSlideShowSharing();

        this.saveSlideShowModal();
    }
    openSlideShowMode(){
        cy.xpath('(//a[contains(text(),"Open Slideshow Mode")])[1]').should('have.attr', 'href')
            .then((href) => {
                cy.visit(href);
            });
    }
    waitSLideModalLoad(){
        cy.log('finish to load');
        cy.get('[id="selectAlternatives"]').should('have.value', 'A');
    }
    clickOnCopyLink(){
        cy.xpath(selectors.modal_copyLink).should('be.visible').click({force:true});
    }
    typeEmailToSendLink(email){
        cy.xpath(selectors.modal_sendEmailInput)
            .type(email)
            .should('have.value',email);
    }
    verifyEmailInputEmpty(email){
        cy.xpath(selectors.modal_sendEmailInput)
            .should('not.have.value',email);
    }
    closeModalSlideShow(){
        cy.xpath(selectors.modal_closeModal).click({force:true});
    }
}
