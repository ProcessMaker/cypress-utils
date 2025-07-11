import selectors from "#selectors/processLaunchPad";
import {Process} from "./process";

const process = new Process();

export class ProcessLaunchpad {
    /**
     * This method is responsible to save the configurations to launch pad from  modeler
     * @param parameters: parameters to launchpad
     * @return nothing returns
     */
    saveLaunchPadSetting(parameters) {
        process.clickOnSave();
        this.fillFieldsSetting(parameters);
    }
    saveLauchpPad(){
        cy.xpath(selectors.settings_saveConfiguration).click();
        cy.wait(3000);
        cy.xpath(selectors.settings_saveConfiguration).should('not.exist',{ timeout: 15000 });
    }
    cancelLauchpPad(){
        cy.xpath(selectors.settings_cancelConfiguration).click();
    }
    fillFieldsSetting(parameter){
        cy.xpath('//span[contains(text(),"Default Launchpad Chart")]').should('be.visible');
        cy.get(selectors.settings_descriptions).should("be.visible");
        if(parameter.icon !== "Search"){
            cy.xpath(selectors.settings_selectListIcon).click();
            cy.xpath(selectors.settings_inputIcon).type(parameter.icon).should("have.value",parameter.icon);
            cy.wait(2000);
            cy.xpath(selectors.settings_inputIcon).type("{enter}");
        }
        cy.get(selectors.settings_dragButton).click();
        cy.xpath(selectors.settings_uploadImage).attachFile(parameter.image[0]);
        cy.xpath(selectors.settings_uploadImage).attachFile(parameter.image[1]);
        cy.xpath(selectors.settings_uploadImage).attachFile(parameter.image[2]);
        cy.xpath(selectors.settings_uploadImage).attachFile(parameter.image[3]);
        cy.wait(3000);
    }
    verifyFieldsSetting(parameter){
        cy.get(selectors.settings_descriptions).should("be.visible");
        cy.get(selectors.settings_descriptions).should("have.value",parameter.description);
        cy.xpath(selectors.settings_selectListIcon).should("be.visible");
        cy.xpath(selectors.settigns_textIcon).should('contain.text',parameter.icon);
    }
    openPublish(){
        process.clickOnSave();
    }
    openCategoryFromLaunchPad(category,findCategory=true){
        cy.get(selectors.launch_searchProcess).should("be.visible").clear();
        cy.get(selectors.launch_searchProcess).type(category).should("have.value",category);
        cy.get(selectors.launch_searchProcessButton).click();
        if(findCategory)
            cy.xpath(selectors.launch_cardCategory.replace("categoryName",category)).should("be.visible");
        else
            cy.xpath(selectors.launch_cardCategory.replace("categoryName",category)).should("not.exist");
    }
    searchProcessOfCategory(nameProcess){
        this.searchProcess(nameProcess);
        cy.xpath(selectors.launch_cardProcess.replace("processName",nameProcess)).click({force:true});
        cy.xpath(selectors.launch_startProcessButton).should("be.visible");
    }
    clikOnElipsisMenu(){
        cy.xpath(selectors.launch_elipsis).first().should('be.visible').click();
    }
    selectOptionOfElipsis(option="Edit Launchpad"){
        cy.xpath(selectors.optionLaunchPad.replace("option",option)).click();
    }
    verifyOptionEllipsis(userType){
        if(userType === "admin"){
            cy.xpath("//*[contains(text(),'Open in Modeler')]").should("exist");
            cy.xpath("//*[contains(text(),'Edit Launchpad')]").should("exist");
            cy.xpath("//*[contains(text(),'Save as Template')]").should("exist");
            cy.xpath("//*[contains(text(),'Save as PM Block')]").should("exist");
            cy.xpath("//*[contains(text(),'Add to Project')]").should("exist");
            cy.xpath("//*[contains(text(),'Configure')]").should("exist");
            cy.xpath("//*[contains(text(),'View Documentation')]").should("exist");
            cy.xpath("//*[contains(text(),'Archive')]").should("exist");
            cy.xpath("//*[contains(text(),'Export')]").should("exist");
            cy.xpath("//*[contains(text(),'Download BPMN')]").should("exist");
        }else{
            if (userType === "participant"){
                cy.xpath("//*[contains(text(),'Open in Modeler')]").should("not.exist");
                cy.xpath("//*[contains(text(),'Save as Template')]").should("not.exist");
                cy.xpath("//*[contains(text(),'Save as PM Block')]").should("not.exist");
                cy.xpath("//*[contains(text(),'Configure')]").should("not.exist");
                cy.xpath("//*[contains(text(),'Archive')]").should("not.exist");
                cy.xpath("//*[contains(text(),'Export')]").should("not.exist");
                cy.xpath("//*[contains(text(),'Download BPMN')]").should("not.exist");
            }
        }
    }
    startRequestByLaunchPadSingle(){
        cy.wait(3000);
        cy.xpath(selectors.launch_startProcessButton).should("be.visible");
        cy.xpath(selectors.launch_startProcessButton).click();
    }
    findProcess(process, category){
        cy.xpath(selectors.processCategoryLabel.replace('element', category)).should('be.visible');
        cy.xpath(selectors.processCategoryLabel.replace('element', category)).click();
        cy.xpath(selectors.processLabel.replace('label',process)).should('be.visible');
    }
    bookmarkIconSelect(process){
        let iconSelector = '//*[contains(@class,"header")]//*[contains(@class,"fa-bookmark")]';
        //cy.xpath(selectors.bookmarkSelection.replace('label',process)).invoke('attr','class')
        cy.xpath(iconSelector).invoke('attr','class')
            .then(($class)=>{
                cy.log("This is the value of the class"+ $class);
                if($class.includes('unmarked')){
                    cy.xpath(iconSelector)
                        .should('be.visible')
                        .click();
                    cy.get(selectors.bookMarkedSuccessAlert).should('be.visible');
                }
            });
    }
    clickSelectedProcess(process){
        cy.xpath(selectors.processLabel.replace('label',process)).should('be.visible');
        cy.xpath(selectors.processLabel.replace('label',process)).should('be.visible').click();
    }
    clickOnEllipsisMenu(force = false) {
        // wait for the ellipsis button to be visible
        cy.xpath(selectors.ellipsisMenu)
            .should('be.visible')
            .should('not.be.disabled')
            .then($el => {
                // verify if the element is in the viewport
                const rect = $el[0].getBoundingClientRect();
                const isInViewport = (
                    rect.top >= 0 &&
                    rect.left >= 0 &&
                    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
                );

                // if the element is not in the viewport, scroll to it
                if (!isInViewport) {
                    cy.wrap($el).scrollIntoView();
                }

                // click with force option
                cy.wrap($el).click({ force: force });
            });

        // verify that the menu opened correctly using a more specific selector
        cy.get('body').then($body => {
            if ($body.find('.dropdown-menu.show').length > 0) {
                cy.get('.dropdown-menu.show')
                    .should('be.visible')
                    .should('have.class', 'show');
            } else {
                cy.xpath('//div[contains(@class, "dropdown-menu") and contains(@class, "show")]')
                    .should('be.visible')
                    .should('have.class', 'show');
            }
        });
    }
    validateEllipsisMenu(optionList=[]){
        let len = optionList.length;
        for (var i = 0; i < len; i++) {
            cy.xpath((selectors.optionMenuElement).replace('option', optionList[i])).should('exist');
        }
    }
    selectSpecificStartEvent(start, position=1){
        position = position-1;
        this.startRequestByLaunchPadSingle();
        cy.xpath(selectors.startEvent.replace('start', start)).eq(position).should('be.visible');
        cy.xpath(selectors.startEvent.replace('start', start)).eq(position).click();
    }
    checkCategoriesAndProcessAssociation(process, elementArray=[]){
        let len = elementArray.length;
        for (var i = 0; i < len; i++) {
            this.openCategoryFromLaunchPad(elementArray[i]);
            // cy.xpath(selectors.processCategoryLabel.replace('element', elementArray[i])).should('be.visible');
            // cy.xpath(selectors.processCategoryLabel.replace('element', elementArray[i])).click();
            // cy.xpath(selectors.processLabel.replace('label',process)).should('be.visible');
        }
    }
    checkProcessImages(number){
        cy.xpath("//div['.carousel-inner']/div[@role='listitem']/img").should('have.length',number);
    }
    openAllProcesses(){
        cy.xpath(selectors.launch_category.replace('category','All Process'))
            .should("be.visible")
            .click();
        cy.wait(2000);

    }
    openMyBookMarks(){
        cy.xpath('//*[@id="category-menu"]//*[contains(text(),"My Bookmarks")]')
            .should("be.visible")
            .click();
        cy.wait(2000);
    }

    searchProcess(nameProcess,findProcess=true){
        cy.get(selectors.launch_searchProcess).should("be.visible");
        cy.wait(3000);
        cy.get(selectors.launch_searchProcess).type(nameProcess).should("have.value",nameProcess);
        cy.wait(3000);
        cy.get(selectors.launch_searchProcessButton).click();
        if(findProcess)
            cy.xpath(selectors.launch_cardProcess.replace("processName",nameProcess)).should("be.visible");
        else
            cy.xpath(selectors.launch_cardProcess.replace("processName",nameProcess)).should("not.exist");
    }

    unBookmarkIconSelect(process){
        let iconSelector = '//*[contains(@class,"header")]//*[contains(@class,"fa-bookmark")]';
        cy.xpath(iconSelector).invoke('attr','class')
            .then(($class)=>{
                cy.log("This is the value of the class"+ $class);
                if(!$class.includes('unmarked')){
                    cy.xpath(iconSelector).click({force:true});
                    cy.get(selectors.bookMarkedSuccessAlert).should('be.visible');
                }
            });
    }
    deleteImageCarousel(numImaages){
        cy.xpath('(//img[@alt="No Image"])['+numImaages+']').should('be.visible');
        let deleteI=true;
        cy.xpath('//div[contains(@class,"modal-content")]//div[contains(@class,"thumbnails")]/div[@class="images-container"]/div')
            .then(($elemts)=>{
                cy.log("Dfsfsdfsdf"+$elemts.length);
                if($elemts.length === 1){
                    const imageIsVisible = Cypress.$('img[alt="No Image"]').is(':visible');
                    if(!imageIsVisible)
                        deleteI = false;
                }
                if(deleteI){
                    for (let i = 0; i <$elemts.length ; i++) {
                        cy.xpath('(//img[@alt="No Image"])[2]').should('be.visible').trigger('mouseover');
                        cy.xpath("(//div[contains(@class,'modal-content')]//div[contains(@class,'thumbnail')]//i)[1]")
                            .should('be.visible')
                            .click();
                        cy.xpath('//button[contains(text(),"Delete")]').click();
                        cy.wait(1000);
                    }
                    cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should('not.exist');
                }
            })
    }

    clickOnMenuOptionLaunchPad(option){
        cy.xpath(selectors.optionLaunchPad.replace('option',option)).should('be.visible');
        cy.xpath(selectors.optionLaunchPad.replace('option',option)).click();
    }
 
    attachVideo(video){
        cy.xpath(selectors.dragAndClickHere).should('be.visible');
        cy.xpath(selectors.dragAndClickHere).click({force:true});
        cy.xpath(selectors.embedVideo).should('be.visible');
        cy.xpath(selectors.embedVideo).click({force:true});
        cy.xpath(selectors.urlVideo).type(video, {force:true});
        cy.xpath(selectors.buttonApply).click();
    }  

    deleteVideos(){
        cy.xpath(selectors.videoLink).click();
        cy.xpath(selectors.trashIcon).click();
        cy.xpath(selectors.deleteVideo).click();
        cy.xpath(selectors.embedMediaDeleteAlert).should('be.visible');
    }
    
    selectLaunchScreen(screen){
        cy.xpath('//div/input[@placeholder="Type to search Screen"]/parent::*[@class="multiselect__tags"]').click();       
        cy.xpath(selectors.inputLaunchScreen).type(screen,{delay:100}).should('have.value', screen);
        cy.xpath(selectors.inputLaunchScreen).type(' ').type('{backspace}');
        cy.wait(5000);
        //cy.xpath('//li[@aria-label="'+screen+'. "]').should('be.visible');
        cy.xpath(selectors.inputLaunchScreen).type('{enter}');
    } 

    click_accordeonProcessBrowser(name){
        cy.xpath('//div[contains(text(), "' + name + '")]').should("be.visible").click();
    }

    click_optionInsideAccordeonProcessBrowser(option){
        cy.xpath('//div[@class="list-group"]//div[contains(text(),"' + option + '")]').should("be.visible").click();
    }
    waitLaunchPageLoad(){
        cy.get('[id="pie-chart"]').should('be.visible');
        cy.wait(2000);
    }
    verifyModalSettingsIsOpen(){
        cy.xpath(selectors.modalSettings).should('be.visible');
        cy.wait(5000);
        cy.xpath('//*[@aria-placeholder="Select Icon"]/parent::div//*[contains(@src,"/img/launchpad-images")]').should('be.visible');
        cy.xpath('//*[contains(@class,"alert d-none d-lg-block")]').should('not.exist');
    }
} 
