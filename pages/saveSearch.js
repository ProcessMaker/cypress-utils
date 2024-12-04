import selectors from "#selectors/saveSearch"
export class SaveSearchs {
    clickOnProcessesName(namesave) {
        //select one process
        cy.xpath('//button[@class="btn btn-outline-secondary mr-1 d-flex align-items-center"]').first().click();
        cy.xpath('(//label[text()="Process"]/parent::div//div[@class="multiselect__tags"])[1]').should("be.visible").click();
        cy.get('#option-0-3')
            .should("be.visible")
            .click();
        cy.get('[class="btn btn-primary btn-sm"]')
            .should("be.visible")
            .click();
        //create save search
        cy.xpath('//button[@title="Save Search"]')
            .should("be.visible")
            .click();
        cy.get('[name="title"]')
            .click()
            .type(namesave,{delay:100})
            .should('have.value', namesave);
        cy.get('#save-search-modal___BV_modal_footer_ > .btn-secondary')
            .should("be.visible")
            .click();
    } 
    //search view save search
    viewSaveSearch(namesave) {
        cy.xpath("//input[@type='text'][@placeholder='Search']")
            .should('be.visible')
            .first()
            .type(namesave, {delay: 100})
            .should("have.value",namesave);
        cy.wait(2000);
        cy.get(selectors.viewsearch)
            .should("be.visible")
            .first()
            .click();
    }
    //send report
    sendReportSaveSearch(email,subject,body) {
        cy.get(selectors.sendreport)
            .should("be.visible")
            .click();
        cy.get(selectors.sendto)
            .type(email,{delay:100})
            .should("have.value",email);
        cy.get(selectors.emailsubject)
            .type(subject,{delay:100})
            .should("have.value",subject);
        cy.get(selectors.emailbody)
            .type(body,{delay:100})
            .should("have.value",body);
        cy.get(selectors.send)
            .should("be.visible")
            .click();
    }
    //scheduled reports
    /**
     * Configura un reporte programado para una búsqueda guardada
     * @param {Object} config - Configuración del reporte programado
     * @param {string} config.email - Dirección de correo del destinatario
     * @param {string} config.subject - Asunto del correo
     * @param {string} config.body - Cuerpo del correo
     * @param {string} config.frequency - Frecuencia del reporte (daily, weekly, monthly) - Opcional
     * @param {string} config.time - Hora del envío (formato HH:mm) - Opcional
     */
    scheduledReports(email, subject, body, frequency = 'daily', time = '09:00') {
        // Configurar el reporte programado
        cy.get(selectors.scheduled).should('be.visible').click();
        cy.get(selectors.addscheduled).should('be.visible').click();

        // Seleccionar frecuencia
        cy.get(selectors.selectday)
            .should('be.visible')
            .click();

        // Configurar hora
        cy.xpath("//label[contains(text(),'Time')]")
            .should('be.visible');
        cy.xpath(selectors.selecttime)
            .should('exist')
            .should('be.visible');
        cy.get('[aria-label="clock"]').click();
        
        // Esperar que el dropdown esté visible
        cy.get('[class="dropdown-menu show"]')
            .should('be.visible');

        // Seleccionar hora específica
        cy.xpath(selectors.selecthour)
            .should('be.visible')
            .first()
            .click();
        cy.xpath(selectors.closehour)
            .should('be.visible')
            .click();
        cy.wait(1000);
        // Llenar formulario
        cy.xpath(selectors.sendto2)
            .first()
            .type(email, { delay: 100 })
            .should('have.value', email);
        
        cy.get(selectors.subject)
            .eq(2)
            .type(subject, { delay: 100 })
            .should('have.value', subject);
        
        cy.get(selectors.body)
            .eq(3)
            .type(body, { delay: 100 })
            .should('have.value', body);

        // Guardar configuración
        cy.get(selectors.saveschedule)
            .should('be.visible')
            .click();

        // Regresar a la búsqueda guardada
        cy.get('.breadcrumb > :nth-child(3) > a')
            .should('be.visible')
            .click();
        
        cy.get(':nth-child(3) > .btn')
            .first()
            .should('be.visible')
            .click();
    }
    //Configurations
    configurationsSaveSearch() {
        cy.xpath(selectors.configure)
            .should("be.visible")
            .click();
        cy.get(selectors.sharedwithgroups)
            .should("be.visible")
            .click();
        cy.get(selectors.saveconfiguration)
            .should("be.visible")
            .click();
    }

   /**
    This method creates a Save Search from Request > Save Search
     * @param name: Assign a name for the Save Search
     * @param iconName: the correct name must be assigned. E.g. iconName: clipboard because the class="fas fa-fw fa-clipboard"
     * @param userName: this field searches by username
     * @param groupName: group name
     * @param completeUserName: this name is needed because the user will be selected in the User list 
     * @return: nothing value
    */
    createSaveSearch(name,iconName, userName="", groupName="", completeUserName=""){
        cy.get('button[title="Save Search"]').should('be.visible');
        cy.get('button[title="Save Search"]').click();
        cy.get('[aria-label="Close"]')
            .first()
            .click();
       cy.get('button[title="Save Search"]').click();
        cy.xpath('//legend[text()="Share With Users"]/parent::fieldset//div[@class="multiselect__spinner"]').should('not.be.visible');
        cy.xpath('//legend[text()="Share With Groups"]/parent::fieldset//div[@class="multiselect__spinner"]').should('not.be.visible');
        cy.xpath("//label[contains(text(),'Name')]/parent::div//input").should('be.visible');
        cy.xpath("//label[contains(text(),'Name')]/parent::div//input").type(name);
        cy.xpath('//label[contains(text(),"Icon")]/parent::div//div[@class="multiselect__select"]').click();
        cy.xpath('//label[contains(text(),"Icon")]/parent::div//div[@class="multiselect__content-wrapper"]//i[@class="fas fa-fw fa-'+iconName+'"]').click();
        cy.xpath('//div[@class="modal-content"]//label[text()="Icon"]//following-sibling::div//div[@class="multiselect__tags"]//span/i').should('have.class','fas fa-fw fa-'+iconName);
        if(userName !== ""){
            cy.xpath("//legend[text()='Share With Users']/following-sibling::div//div[@class='multiselect__tags']").click();
            cy.xpath("//legend[text()='Share With Users']/following-sibling::div//div[@class='multiselect__tags']//input").type(userName).should('have.value',userName);
            cy.xpath("//legend[text()='Share With Users']/following-sibling::div//div[@class='multiselect__content-wrapper']/ul/li/span/span").should('have.text',completeUserName);
            cy.xpath('//div[@class="modal-content"]//label[text()="Share With Users"]//following-sibling::div/div[@class="multiselect__content-wrapper"]/ul/li/span/span').click();
        }
        if(groupName !== ""){
            cy.xpath("//legend[text()='Share With Groups']/following-sibling::div//div[@class='multiselect__tags']").click();
            cy.xpath("//legend[text()='Share With Groups']/following-sibling::div//div[@class='multiselect__tags']//input").type(groupName,{force:true});
            cy.xpath('//legend[text()="Share With Groups"]//following-sibling::div//div[@class="multiselect__content-wrapper"]/ul/li/span/span').should('have.text',groupName);
            cy.xpath('//legend[text()="Share With Groups"]//following-sibling::div//div[@class="multiselect__content-wrapper"]/ul/li/span/span').click();
        }
        cy.xpath('//footer[@id="save-search-modal___BV_modal_footer_"]/button[text()="Save"]').click(); 
    }

    enableNotification(){
        cy.get('[title="Enable Notifications"]')
            .should("be.exist")
            .click();
    }
    waitForSaveSearch(saveSearchName){
        cy.xpath("//input[@placeholder='Search']")
            .first()
            .click()
            .type(' ',{delay:100});
        cy.xpath('((//div[@class="data-table"]//table//tbody//tr)[1]//span)[1]').invoke('text').then(($name)=>{
            if($name !== saveSearchName){
                cy.wait(3000);
                this.waitForSaveSearch(saveSearchName);
            }
        });
    }
    pressOptionSaveSearch(action="view"){
        switch(action){
            case "hide":
                cy.xpath(selectors.hideButton).first().click();
                break;
            case "view":
                cy.xpath(selectors.viewButton).first().click();
                break;
            case "configure":
                cy.xpath(selectors.configureButton).first().click();
                break;
            case "delete":
                cy.xpath(selectors.deleteButton).first().click();
                break;
            default:
                break;
        }
    }
    openTheSaveSearchConfiguration(){
        cy.xpath(selectors.clickOnSaveSearchCnfgrtn).click();
        cy.xpath(selectors.verifySaveSearchConfgrtPg).should('be.visible');
    }
    addColumnsToSaveSearch(label,feild,format){
        cy.xpath(selectors.clickOnColumns).click();
        cy.xpath(selectors.clickOnAddCustmClmns).click();
        cy.xpath(selectors.verifyAddClmnspop).should('be.visible');
        cy.xpath(selectors.clickOnLabelTxtBx).type(label);
        cy.xpath(selectors.clickOnFeildTxtBx).type(feild);
        cy.xpath(selectors.clickOnFormatDrpDwn).click();
        cy.xpath(selectors.clickOnFormatInputBx).type(format);
        cy.xpath(selectors.clickOnFormatInputBx).type('{enter}');
        cy.xpath(selectors.enableTheSortable).click();
        cy.xpath(selectors.clickOnSaveBtn).click();
        cy.xpath(selectors.saveTheAddColumns).click();
    }
    clickOnSaveSearchName(){
        cy.xpath(selectors.clickOnSaveSearchName).click();
    }
    createChartsToSaveSearch(name,chart_type){
        cy.xpath(selectors.clickOnChartsOptn).click();
        cy.xpath(selectors.clickOnPlusChartsBtn)
            .should('be.visible')
            .click();
        cy.wait(2000);
        cy.xpath(selectors.clickOnNameTxtBx)
            .type(name,{delay:100});
        switch(chart_type){
            case "Horizental":
                const a=1;
                cy.xpath(selectors.selectChartType.replace('A',a)).click();
                break;
            case "Vertical":
                const b=2;
                cy.xpath(selectors.selectChartType.replace('A',b)).click();
                break;
            case "Line":
                const c=3;
                cy.xpath(selectors.selectChartType.replace('A',c)).click();
                break;
            case "Pie":
                const d=4;
                cy.xpath(selectors.selectChartType.replace('A',d)).click();
                break;
            case "Doughnut":
                const e=5;
                cy.xpath(selectors.selectChartType.replace('A',e)).click();
                break;
            case "Count":
                const f=6;
                cy.xpath(selectors.selectChartType.replace('A',f)).click();
                break;
            case "List":
                const g=7;
                cy.xpath(selectors.selectChartType.replace('A',g)).click();
                break;
        }
    }
    createSourceForCharts(series,metric,metric_type){
        cy.xpath(selectors.clickOnSourceOptn).click();
        cy.xpath(selectors.clickOnSeriesDrpDwn).should('be.visible');
        cy.xpath(selectors.clickOnSeriesDrpDwn).click();
        cy.xpath(selectors.clickOnSeriesInptBx).type(series,{delay:100});
        cy.xpath(selectors.clickOnSeriesValue.replace('name',series))
            .should('be.visible')
            .click();
        cy.wait(2000);
        cy.xpath(selectors.clickOnMetricDrpDwn).click();
        cy.xpath(selectors.clickOnMetricInptBx).type(metric,{delay:100});
        cy.xpath(selectors.clickOnMetricValue.replace('name',metric))
        .should('be.visible')
        .click();
        cy.wait(2000);
        cy.xpath(selectors.clickOnSumBtn).click();
        switch(metric_type){
            case "Average":
                cy.xpath(selectors.clickOnMetricType.replace('name',metric_type)).click();
                break;
            case "Count":
                cy.xpath(selectors.clickOnMetricType.replace('name',metric_type)).click();
                break;
            case "Minimum":
                cy.xpath(selectors.clickOnMetricType.replace('name',metric_type)).click();
                break;
            case "Maximum":
                cy.xpath(selectors.clickOnMetricType.replace('name',metric_type)).click();
                break;
            case "Sum":
                cy.xpath(selectors.clickOnMetricType.replace('name',metric_type)).click();
                break;
        }
        cy.xpath(selectors.saveTheSource).click();
        cy.wait(3000);
    }
    //Delete save search from My save search
    deleteSaveSearchFromMy(nameSaveSearch){
        cy.visit('/requests/saved-searches');
        cy.get('input[placeholder="Search"]')
            .first()
            .type(nameSaveSearch,{delay:100});
        this.pressOptionSaveSearch('delete');
        cy.get('[class="modal-title"]').should('be.visible');
        cy.get('[class="btn m-0 btn-secondary"]')
            .should('be.visible')
            .click();
    }
}
