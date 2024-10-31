import selectors from "#selectors/fileManager"
export class FileManager {

    createFolder(nameFolder){
        cy.xpath(selectors.folderBtn).should('be.visible');
        cy.xpath(selectors.folderBtn).click();
        cy.xpath(selectors.nameFolderField).type(' ').type('{backspace}');
        cy.xpath(selectors.nameFolderField).should('be.visible').type(nameFolder);
        cy.xpath(selectors.createBtn).click();
    }

    pressPublicFileBtn(){
        cy.xpath(selectors.publicFileBtn).click();
    }

    openFolder(folderName){
        var searchFolder = "//span[text()='"+folderName+"']";
        cy.xpath(searchFolder).should('be.visible');
        cy.xpath(searchFolder).click();
    }

    uploadFile(fileUpload,mimeFile,timeFile = 12000){
        cy.xpath(selectors.titleModal).should('be.visible');
        cy.intercept({
            method:'POST',
            url:'/api/1.0/file-manager'
        }).as('upload');
        cy.wait(2000);
        let fileName = fileUpload;
        cy.fixture(fileName, 'binary')
            .then(Cypress.Blob.binaryStringToBlob)
            .then(fileContent => {
            cy.xpath(selectors.selectFileBtn).attachFile({ fileContent, fileName, mimeType: mimeFile, encoding:'utf8' });
        });
        cy.wait('@upload', { requestTimeout: timeFile }).its('response.statusCode').should('eq', 200);
        cy.xpath('//div[@class="upload"]').should('be.visible');
        cy.xpath('//div[@class="modal-body"]//ul/li').should('have.contain',fileUpload);
    }

    pressDoneBtn(){
        cy.xpath(selectors.doneBtn).click();
        cy.xpath(selectors.settingIcon).should('be.visible');
        cy.xpath(selectors.settingIcon).should('not.exist');
    }

    /**
     * 
     * @param {*} row nro row in order to open the floating menu 
     * @param {*} val posible values= Open, Download
     */
    pressTooltip(row = 0, val) {
        let btn;
        switch(val){
            case "Open":
                btn = "file-open";
            break;
            case "Download":
                btn = "file-download";
            break;
            default:
                btn = "file-preview";
        }
        cy.get('[class="floating-menu"]').eq(row).invoke("show").within(() => {
            cy.get('button[id*="' + btn + '-"]').should("be.visible").click({force:true});
        });
    }

}
