import selectors from "#selectors/tasks"
export class Tasks {

    clickOnToDoButton(){
        cy.xpath(selectors.tasksTable).should('be.visible');
        cy.get(selectors.sidebarCompletedButton).eq(0).click();
    }

    clickOnCompletedButton(){
        cy.xpath(selectors.tasksTable).should('be.visible');
        cy.get(selectors.sidebarCompletedButton).eq(1).click();
    }

    searchByPMQL(query){
    //Click in Field to write Query
        cy.xpath(selectors.tasksTable).should('be.visible');
        cy.get(selectors.searchbar).eq(0).type(query).should('have.value', query);
     //Click in Search Button
        cy.get(selectors.searchButton).eq(0).click();
        
    }
   

    verifyValueInTable(taskName){
        cy.xpath(selectors.tasksTable).should('be.visible');
        cy.xpath(selectors.tasksTable).should('be.visible').should('contain',taskName);
        
    }
    deleteQuery(){
        cy.get(selectors.searchbar).eq(0).clear();
        
    }

    searchTaskName(name){
        cy.get(selectors.searchbar).eq(0).type(name).click();
        cy.get(selectors.searchButton).eq(0).click();
        cy.get(selectors.openTaskButton).eq(0).click();
    }

    openSelfServiceTask(){
        cy.get(selectors.claimTaskSelfService).should('be.visible');
        cy.get(selectors.claimTaskSelfService).click();
        cy.get(selectors.claimTaskSelfService).should('not.exist');
    }

    verifyTitlePage (title) {
        cy.visit('/tasks');
        cy.title().should('eq', title);
    }

    verifySidebarMenuOption(num,option){
        cy.get('.nav-item.filter-bar.justify-content-between.py-2.sidebar-expansion').click();
        cy.get('.nav-item.filter-bar.justify-content-between').eq(num).should('contain',option);
    }
   searchTaskByPMQL(PMQL){
    cy.get('.jumbotron').should("not.be.visible")
    cy.get('a[title="Open Task"]').should('be.visible');
   // cy.wait(5000)
    cy.get('button[title="Advanced Mode"]').click();
    cy.get('input[placeholder="Advanced Search (PMQL)"]').clear().type(PMQL).should;
    //cy.wait(5000)
    cy.get('button[title="Search"]').click();
   }

    pressFormTab() {
        cy.xpath(selectors.formTab).should("be.visible");
        cy.xpath(selectors.formTab).click();
    }

    pressDataTab() {
        cy.xpath(selectors.dataTab).should("be.visible");
        cy.xpath(selectors.dataTab).click();
    }

    obtainAllTasksAPI(requestId) {
        return cy.window().then(win => {
            return win.ProcessMaker.apiClient.get(
                "/tasks?process_request_id="+requestId+"&status=ACTIVE"
            ).then(response => {
                cy.wrap(response.data.data);
            });
        })
    }

    completeTaskAPI(taskId, bodyData){
        return cy.window().then(win => {
            return win.ProcessMaker.apiClient.put(
                "/tasks/"+taskId,
                {
                    "status": "COMPLETED",
                    data: bodyData
                }
            ).then(response => {
                cy.wrap(response.data);
            });
        })
    }

}
