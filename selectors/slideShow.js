export default {
    //modeler controls
    elementSelectorStartEvent: '//*[contains(text(),"elementName")]/ancestor::*[@data-type="processmaker.components.nodes.startEvent.Shape"]',
    elementSelectorTask: '//*[contains(text(),"elementName")]/ancestor::*[@data-type="processmaker.components.nodes.task.Shape"]',

    //settings slide show
    settings_uploadImage: '//input[@type="file"]',
    settings_image: '[role="list"]>* img',
    settings_deleteImage: '[role="list"]>* [fill="none"]',
    settigns_fotoLabel: 'label[for="cover-photo"]',

    //slide show modal
    slideShowButton: '[title="Slideshow"]',
    modal_enableSharing: '[class="modal-content"]>* [type="checkbox"]',
    modal_save: '//*[@class="modal-content"]//*[contains(text(),"Save")]/parent::button',
    modal_alertSucces: '[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]',
    modal_copyLink: '//*[contains(text(),"Copy Link")]',
    modal_sendEmailInput: '//label[contains(text(),"Send")]/parent::div//input',
    modal_closeModal: '[class="modal-dialog"]>* svg[fill="none"]'

}