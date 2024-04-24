import selectors from "#selectors/decisionTask";
import { NavigationHelper } from "#helpers/navigationHelper";
const navHelper = new NavigationHelper();

export class DecisionTask {
    
    clickOnDecisionTask(nameDecisionTask){
        const decisionTaskXpath =
        "//*[text()='nameElem']/ancestor::*[@data-type='processmaker.components.nodes.task.Shape']";
        cy.xpath(decisionTaskXpath.replace('nameElem',nameDecisionTask)).first().should('be.visible').click({force:true});
    }

    changeNameDecisionTask(nameDecisionTask){
        cy.get(selectors.decisionTaskInput).click().clear();
        cy.xpath(selectors.textHelpDecisionTaskInput).should('contain','The Name field is required.');
        cy.get(selectors.decisionTaskInput).type(nameDecisionTask).should('have.value',nameDecisionTask);
        cy.xpath(selectors.textHelpDecisionTaskInput).should('not.be.exist');
    }
    
    clickOnDecisionTables(){
        cy.get(selectors.accordionDecisionTables).click({force:true});
    }

    addTableToDecisionTask(decisionTableName){
        cy.get(selectors.addTable).should('be.visible');
        cy.get(selectors.addTable).click({force:true});
        this.selectTableToDecisionTable(decisionTableName);
        this.saveSelectTable();
    }

    configureTable(){
        cy.get(selectors.configureTable).first().click({force:true});
    }

    openTable(){
        this.configureTable();
        cy.wait(500);
        cy.xpath(selectors.openTable).first().click();
    }

    deleteTableToDecisionTask(){
        cy.get(selectors.deleteTable).first().click({force:true});
        cy.xpath(selectors.confirmDeleteTable).first().should('be.visible').click({force:true});
    }

    selectTableToDecisionTable(nameDecisionTable) {
        cy.xpath(selectors.labelAddDecisioTables)
            .should("be.visible")
            .and("contain", "Tables to run:");
        cy.xpath(selectors.divContainerInSelectTable).should("be.visible");
        cy.xpath(selectors.divContainerInSelectTable).first().click({force: true});
        cy.xpath(selectors.inputInSelectTable).first().should("be.visible");
        cy.xpath(selectors.inputInSelectTable).first().type(nameDecisionTable,{ force: true,delay:200}).should('have.value', nameDecisionTable);
        cy.xpath(selectors.optionInSelectTable).first({ timeout: 15000 })
            .should('have.attr', 'aria-label')
            .and('equal', nameDecisionTable+". ");
        cy.xpath(selectors.inputInSelectTable).first().type('{enter}',{ force: true }); 
    }
    
    saveSelectTable(){
        cy.xpath(selectors.saveInSelectTable).should('be.visible');
        cy.xpath(selectors.saveInSelectTable).first().click({force: true});
        cy.xpath(selectors.saveInSelectTable).should('not.be.visible');
    } 

    cancelSelectTable(){
        cy.xpath(selectors.cancelInSelectTable).first().click({force: true});
    }
    
    clickOnVariableMapping(){
        cy.get(selectors.accordionVariableMapping).click();
    }
    
    addVariableMapping(requestVariable,tableInputVariable,tableOutputVariable,setRequestVariable){
        this.addOutboundData(requestVariable,tableInputVariable);
        this.addResponseMapping(tableOutputVariable,setRequestVariable);
    }

    deleteVariableMapping(index){
        cy.get(selectors.accordionVariableMapping).click();
        this.deleteOutboundData(index);
        this.deleteResponseMapping(index);
    }

    addOutboundData(requestVariable,tableInputVariable){
        //Map to Column
        cy.xpath(selectors.addOutboundData).click();
        //Request Variable
        cy.xpath(selectors.requestVariableInput).type(requestVariable).should('have.value',requestVariable);
        //Table Input Variable
        cy.xpath(selectors.tableInputVariableInput).type(tableInputVariable).should('have.value',tableInputVariable);
        cy.xpath(selectors.saveMapToColumn).click();
    }

    deleteOutboundData(){
        cy.xpath(selectors.deleteOutBoundData).first().click();
        cy.xpath(selectors.confirmDeleteOutBoundData).first().should('be.visible').click();
    }

    addResponseMapping(tableOutputVariable,setRequestVariable){
        //Configure Returned Data
        cy.xpath(selectors.addResponseMapping).click();
        //Table Output Variable
        cy.xpath(selectors.tableOutputVariableInput).type(tableOutputVariable).should('have.value',tableOutputVariable);
        //Set Request Variable
        cy.xpath(selectors.setRequestVariableInput).type(setRequestVariable).should('have.value',setRequestVariable);
        cy.xpath(selectors.saveReturnedData).click();
    }

    deleteResponseMapping(){
        cy.xpath(selectors.deleteResponseMapping).first().click();
        cy.xpath(selectors.confirmDeleteResponseMapping).first().should('be.visible').click();
    }

    deleteAllTables(){
        cy.xpath('//div[@id="collapse-tables-accordion"]//div[@class="col"]/div').then(($tables) => {
            if($tables.children().length>0){
                cy.get('[class="border-top"]').then(($tables)=>{
                    cy.log(`There are: ${$tables.length} tables`);
                    if($tables.length>=1){
                        for (let index = 0; index <$tables.length; index++) {
                            this.deleteTableToDecisionTask();
                        }
                        }
                    }); 
            }
        })
    }

    deleteAllOutboundData(){
        cy.xpath('//div[@id="collapse-mapping-accordion"]//div[@name="outbound_config"]/div[4]').then(($OutData)=>{
        cy.log($OutData.children().length);
            if($OutData.children().length>0){
                cy.xpath('//div[@name="outbound_config"]//div[@class="row border-top"]').then(($OutData)=>{
                    cy.log(`There are: ${$OutData.length} Outbound Data`);
                    if($OutData.length>=1){
                        for (let index = 0; index <$OutData.length; index++) {
                            this.deleteOutboundData();
                        }
                        }
                    }); 
            }
        })
    }

    deleteAllResponseMapping(){
        cy.xpath('//div[@id="collapse-mapping-accordion"]//div[@name="response_config"]/div[4]').then(($RespMap)=>{
        cy.log($RespMap.children().length);
            if($RespMap.children().length>0){
                cy.xpath('//div[@name="response_config"]//div[@class="row border-top"]').then(($RespMap)=>{
                    cy.log(`There are: ${$RespMap.length} Response mapping`);
                    if($RespMap.length>=1){
                        for (let index = 0; index <$RespMap.length; index++) {
                            this.deleteResponseMapping();
                        }
                        }
                    }); 
            }
        })
    }

    publishProcess(){
        cy.get(selectors.publishBtn).click();
        cy.get('[class="modal-content"]').should('be.visible');
        cy.get(selectors.saveAndPublishBtn).should('be.visible');
        cy.get(selectors.saveAndPublishBtn).click({ force: true });
    }

    enableExecuteConditionally(){
        cy.xpath(selectors.executeConditionally).then(($ExecuteConditionally)=>{
            if($ExecuteConditionally.prop('checked') === true){
                cy.log('its enable');
            }
            else{
                cy.xpath(selectors.executeConditionally).click({force:true});
            }
        })
    }

    disableExecuteConditionally(){
        cy.xpath(selectors.executeConditionally).then(($ExecuteConditionally)=>{
            if($ExecuteConditionally.prop('checked') === false){
                cy.log('its disable');
            }
            else{
                cy.xpath(selectors.executeConditionally).click({force:true});
            }
        })
    }
}
