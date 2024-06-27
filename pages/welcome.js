import selectors from "#selectors/welcome";

export class Welcome {
    hoverOption(option){
        cy.get('p >span>p').eq(option).trigger('mouseover');
    }
    exploreOption(option) {
        cy.xpath(selectors.optionButtonDesigner.replace('option',option)).should('be.visible');
    }
    assetSetValidationInDesignerProject(assetList=[]){
    let len = assetList.length;
    for (var i = 0; i < len; i++) {
            cy.xpath(selectors.assetVerification.replace('asset',assetList[i])).should('be.visible');
        }
    }
    /**
     * This method is responsible to verify the headers of columns in dashboards MY TASK MY CASES
     * @param options: List the options that want to verify like (Case#, Case Title)
     * @return nothing returns
     */
    verifyOptionsCard(options){
        let len = options.length;
        for (var i=0; i<len; i++){
            cy.xpath(selectors.headerCard.replace('textHeader',options[i])).should('be.visible');
        }
    }
    /**
     * This method is responsible to verify the items in one dorop down
     * @param options: List the options that want to verify like (As Requester, Self Service)
     * @return nothing returns
     */
    verifyOptionsDropdown(options){
        let len = options.length;
        for (var i=0; i<len; i++) {
            cy.xpath(selectors.dropdownItem.replace('itemName',options[i])).should('be.visible');
        }
    }
    /**
     * This method is responsible to select Self Service in My Task
     * @param option: List the options that want to verify like (As Requester, Self Service)
     * @return nothing returns
     */
    selectOptionMyTaskMyCases(option){
        cy.xpath(selectors.viewAllWelcome).click();
        cy.xpath(selectors.dropdownItem.replace('itemName',option)).should('be.visible').click();
    }
    /**
     * This method is responsible to search a process in welcome screen
     * @param criteria: criteria to search om dashboard
     * @param dashboardNum: num of dashboard My Task:0 My Cases:1
     * @return nothing returns
     */
    searchNewRequest(criteria, dashboardNum){
        cy.xpath("//button[contains(text(),'Start')]").should('be.visible');
        cy.xpath(selectors.searchBtn).eq(dashboardNum).click();
        cy.get(selectors.searchInput).should('be.visible').type(criteria).should('have.value',criteria);
        cy.wait(2000);
        cy.get(selectors.searchInput).type('{enter}');
        cy.wait(4000);
    }
    /**
     * This method is responsible to search a process in welcome screen
     * @param criteria: criteria to search om dashboard
     * @param dashboardNum: num of dashboard My Task:0 My Cases:1
     * @return nothing returns
     */
    searchMyTaskMyCases(criteria, dashboardNum){
        let tableSelector = "(//table[@class='pm-table-filter']/tbody/tr[1])["+dashboardNum+"]";
        cy.xpath("//tbody//img[contains(@alt,'priority')]").should('be.visible');
        cy.xpath(selectors.searchBtn).eq(dashboardNum-1).click();
        cy.get(selectors.searchInput).should('be.visible').type(criteria).should('have.value',criteria);
        cy.wait(2000);
        cy.get(selectors.searchInput).type('{enter}');
        cy.xpath(tableSelector+'//a[contains(@href,"/'+criteria+'")]',{ timeout: 15000 }).should('be.visible');
    }
    /**
     * This method is responsible for open the task by eye button
     * @param criteria: Criteria to make hover in the dashboard
     * @return nothing returns
     */
    openByEyeButton(criteria){
        this.searchMyTaskMyCases(criteria,1);
        cy.xpath("(//table[@class='pm-table-filter']/tbody/tr[1])[1]//a[contains(@href,'/"+criteria+"')]")
            .trigger('mouseover');
        cy.xpath('//button/*[@class="fas fa-eye"]').should('be.visible').click({force:true});
        cy.wait(5000);
    }
}
