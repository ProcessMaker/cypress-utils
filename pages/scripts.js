import Selectors from "#selectors/scripts";

export class Scripts {
    /**
     * This method is responsible to press +Script button
     * @param none
     * @return nothing returns
     */
    pressScriptBtn() {
        cy.xpath(Selectors.newScriptBtn).should("be.visible").click({force:true});
    }

    /**
     * This method is responsible to fill all fields when a Script is created
     * @param name: script's name
     * @param description: script's description
     * @param userName: username
     * @param fullName: fullname
     * @param language: default values to select "php - PHP Executor", "lua - LUA Executor", "javascript - Node Executor" and "javascript-ssr - Node Executor for SSR"
     * @return nothing returns
     */
    fillFields(
        name,
        description,
        userName,
        fullName,
        language,
        timeout,
        retryAttempts,
        retryWaitTime,
        languageSelected=true,
        isProject = false
    ) {
        if(!isProject)
            cy.get(Selectors.CategoryTxt).should("have.text", "Uncategorized");
        cy.xpath(Selectors.NameInputTxtBx)
            .type(name)
            .should("have.value", name);
        cy.get(Selectors.DescriptionTxtBx)
            .type(description)
            .should("have.value", description);
        if(languageSelected)
            cy.xpath(Selectors.languageScript.replace("language",language)).first().click();
        cy.xpath(Selectors.moreOptionsButton).click();
        //If user is different to admin
        if(userName !== 'admin' && userName !== 'Admin'){
            cy.log("dsdsdsd"+ userName );
            cy.xpath(Selectors.SelectBx).click();
            cy.xpath('//div[@name="run_as_user_id"]//div[@class="multiselect__content-wrapper"]//li/span[contains(text(),"No Data Available")]')
                .should('not.be.visible');
            cy.xpath(Selectors.SelectTxtInput).type(userName, { delay: 500 });
            cy.xpath(
                '//div[@name="run_as_user_id"]//div[@class="multiselect__content-wrapper"]//li[1]'
            ).should("have.attr", "aria-label")
                .and("equal", fullName + ". ");
            cy.xpath(
                Selectors.SelectOptionValue.replace("userfullName", fullName)
            ).click();
        }
        cy.xpath(Selectors.timeoutTxt)
            .clear()
            .type(timeout, { delay: 100 })
            .type("{del}")
            .should("have.value", timeout);
        cy.xpath(Selectors.RetryAttemptsTxt)
            .clear()
            .type(retryAttempts, { delay: 100 })
            .type("{del}")
            .should("have.value", retryAttempts);
        cy.xpath(Selectors.RetryWaitTimeTxt)
            .clear()
            .type(retryWaitTime, { delay: 100 })
            .type("{del}")
            .should("have.value", retryWaitTime);
    }

    /**
     * This method is responsible to press save button when a script is created
     * @param none
     * @return nothing returns
     */
    pressSaveScript() {
        cy.xpath(Selectors.CreateSaveBtn).click();
    }

    /**
     * This method is responsible to create a Script
     * @param name: script's name
     * @param description: script's description
     * @param userName: username
     * @param fullName: fullname
     * @param language: default values to select "php - PHP Executor", "lua - LUA Executor", "javascript - Node Executor" and "javascript-ssr - Node Executor for SSR"
     * @param timeout: default value 60,
     * @param retryAttempts: default value 0,
     * @param retryWaitTime: default value 5,
     * @return nothing returns
     */
    createScript(
        name,
        description,
        userName = "admin",
        fullName = "Admin User",
        language = "PHP Executor",
        timeout = 60,
        retryAttempts = 0,
        retryWaitTime = 5
    ) {
        this.pressScriptBtn();
        this.fillFields(
            name,
            description,
            userName,
            fullName,
            language,
            timeout,
            retryAttempts,
            retryWaitTime
        );
        this.pressSaveScript();
        cy.xpath(Selectors.debuggerTxt).should("be.visible");
    }

    addPhpTOScript(scriptValue) {
        cy.wait(2000);
        cy.xpath(Selectors.InputBtn).click();
        cy.xpath(Selectors.InputTxtBx).type(
            "{downArrow}" + scriptValue + "{downArrow}"
        );
        this.clearExtraReturn();
        this.clickOnSaveVersions();
        this.clickOnSave();
        //cy.wait(2000);
    }
    addPhpTOScriptIfNotExists(scriptValue) {
        cy.wait(2000);
        cy.xpath("(//div[@class='view-line'])").first().click("left");
        cy.xpath(Selectors.InputTxtBx)
            .invoke('val')
            .then(sometext => {
                if(!sometext.includes(scriptValue)){
                    cy.xpath(Selectors.InputTxtBx).type('{ctrl}A').type('{del}',{force:true});
                    cy.xpath(Selectors.InputTxtBx).type(scriptValue);
                    cy.wait(2000);
                    this.clickOnSaveVersions();
                    this.clickOnSave();
                    cy.wait(2000);
                }
            });
    }


    clearExtraReturn() {
        cy.xpath(Selectors.InputTxtBx).type(
            "{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}"
        );
    }

    clickOnSaveVersions() {
        cy.xpath(Selectors.saveVersionsBtn).click();
    }

    clickOnSave() {
        cy.xpath(Selectors.SaveBtn).click();
        cy.xpath(Selectors.sucessToastMsg).should("be.visible");
        cy.xpath(Selectors.sucessToastMsg).should("not.exist");
    }

    //Add a Script with name and details @param {string} @return {string}
    addPhpToScriptAndSaveWithNameOfVersion(script, versionName, details) {
        cy.xpath(Selectors.areaInputScript).clear().clear().type(script); //.should('contain',"return ['Hello word'];");
        cy.get(Selectors.runScript).click();
        cy.xpath(Selectors.scriptPublishBtn).click();
        cy.get(Selectors.inputName).type(versionName);
        cy.get(Selectors.inputDetail).type(details);
        cy.xpath(Selectors.saveVersionsBtn).click();
        cy.get(Selectors.alertSuccess).should("be.visible");
        cy.get(Selectors.alertSuccess).should("not.exist");
    }

    // Add a Script without name and details @param {string} @return {string}
    addPhpToScriptAndSaveWithoutNameOfVersion(script) {
        cy.xpath(Selectors.areaInputScript).should("be.visible");
        cy.xpath(Selectors.areaInputScript)
            .as("cleanField")
            .clear({ force: true });
        cy.get("@cleanField").clear();
        cy.get("@cleanField").type(script, { force: true });
        cy.get(Selectors.runScript).click();
        cy.xpath(Selectors.scriptPublishBtn).click();
        cy.xpath(Selectors.saveVersionsBtn).click();
        cy.get(Selectors.alertSuccess).should("be.visible");
        cy.get(Selectors.alertSuccess).should("not.exist");
    }

    editScript() {
        this.selectMenuOptionRow("Edit Script");
    }

    goToConfigScript() {
        this.selectMenuOptionRow("Configure");
    }

    addProject() {
        this.selectMenuOptionRow("Add to Project");
        cy.xpath(Selectors.addProjectModel).should("be.visible");
	}

    showVersioningOnly() {
        cy.get(Selectors.onlyShowNamedVersion).eq(0).check({ force: true });
        cy.get(Selectors.onlyShowVersionLabel).click();
    }

    verifyVersioningWithoutNameNotAppear() {
        cy.get(Selectors.container)
            .should("be.visible")
            .should("not.contain", "Unnamed Version");
    }

    checkSavedAllVersions() {
        cy.xpath("//a[contains(text(),'Version History')]").click();
        cy.get(Selectors.container)
            .should("be.visible")
            .should("contain", "Version_1")
            .should("contain", "Version_2")
            .should("contain", "Unnamed Version");
    }

    checkCopyToLastest() {
        cy.get(Selectors.copyToLatest).click();
        cy.get(Selectors.confirmAndSave).click();
        cy.get(Selectors.currentVersion).should("contain", "Version_1");
    }

    /**
     * This method is responsible to Assign a many values when a script's configure is opened
     * @param scriptName: Name of the script
     * @param scriptPermission: object to assign a user to a script
     * E.g. TCP4-2316
     * let scriptPermission = {user:"admin", firstName:"Admin", lastName:"User", "scriptExecutor":"php - PHP Executor", "description":"test description", timeout:"60", "enableApiAccess":1|0}
     * @return nothing returns
     */
    verifyPresenceOfScriptAndConfigureScript(scriptName, scriptPermission) {
        cy.get(Selectors.searchField)
            .type(scriptName)
            .should("have.value", scriptName);
        cy.get(Selectors.loadingSpinnerScript).should("be.visible");
        cy.get(Selectors.loadingSpinnerScript).should("not.be.visible");
        cy.xpath(Selectors.scriptTable, { timeout: 10000 })
            .find("td")
            .then(($loadedTable) => {
                if ($loadedTable.length === 1) {
                    //variables
                    let userName = scriptPermission.user;
                    let firstName = scriptPermission.firstName;
                    let lastName = scriptPermission.lastName;
                    let fullName = firstName + " " + lastName;
                    let executorName = scriptPermission.scriptExecutor;
                    let scriptDescription = scriptPermission.description;
                    let scriptTimeout = scriptPermission.timeout;
                    let scriptRetryAttempts = scriptPermission.retryAttemps;
                    let scriptRetryWaitTime = scriptPermission.retryWaitTime;
                    let apiAccess = scriptPermission.enableApiAccess;
                    //Press Configure option
                    this.pressThreePointsRow();
                    this.selectMenuOptionRow("Configure");
                    //Assign user
                    cy.xpath(
                        '//label[text()="Run script as"]/ancestor::div[@class="form-group"]//div/span'
                    )
                        .invoke("text")
                        .then(($userN) => {
                            if ($userN !== fullName) {
                                let liuser =
                                    "//li[@aria-label='" + fullName + ". ']";
                                var RunScriptAsField =
                                    '//label[text()="Run script as"]/ancestor::div[@class="form-group"]//div//div[@class="multiselect__tags"]';
                                cy.xpath(RunScriptAsField).type(userName);
                                cy.xpath(liuser).click();
                            }
                        });
                    //Assign  Script Executor
                    cy.xpath(
                        '//label[text()="Script Executor"]/ancestor::div[@class="form-group"]/select'
                    ).select(executorName);

                    //Add description
                    cy.xpath(
                        '//label[text()="Description"]/ancestor::div[@class="form-group"]/textarea'
                    )
                        .clear()
                        .type(scriptDescription);

                    //Add timeout
                    cy.xpath(Selectors.timeoutTxt)
                        .clear()
                        .type(scriptTimeout)
                        .type("{del}");
                    //Add retry attempts
                    cy.xpath(Selectors.RetryAttemptsTxt)
                        .clear()
                        .type(scriptRetryAttempts)
                        .type("{del}");
                    //Add Retry Wait Time
                    cy.xpath(Selectors.RetryWaitTimeTxt)
                        .clear()
                        .type(scriptRetryWaitTime)
                        .type("{del}");

                    //check enable direct Api access
                    if (apiAccess == 1) {
                        cy.xpath(Selectors.directApiOption).check({
                            force: true,
                        });
                    }
                    //save configuration
                    cy.xpath('//button[text()="Save"]').click();
                } else return;
            });
    }

    /**
     * This method is responsible to Search a Script Task and select one action
     * @param scriptName: Name of the script
     * @param action: This values can be "edit", "config", "copy" and "delete"
     * @return nothing returns
     */
    searchScript(scriptName, action = "config") {
        cy.get(Selectors.searchField)
            .type(scriptName, { delay: 500 })
            .should("have.value", scriptName);
        cy.xpath(Selectors.scriptTable, { timeout: 10000 }).then(
            ($loadedTable) => {
                if ($loadedTable.length === 1) {
                    this.pressThreePointsRow();
                    switch (action) {
                        case "edit":
                            this.editScript();
                            break;
                        case "config":
                            this.goToConfigScript();
                            break;
                        case 'addProject':
                            this.addProject();
                            break;
                        case "copy":
                            break;
                        case "delete":
                            break;
                    }
                } else {
                    cy.log("script not found");
                    return;
                }
            }
        );
    }

    /**
     * This method is responsible to do click in the three points in a row
     * @param none
     * @return nothing returns
     */
    pressThreePointsRow() {
        cy.xpath(Selectors.threePointsBtn).should("be.visible").click();
    }

    /**
     * This method is responsible to do click in one option for a row
     * @param nameOption: Name according to for example:'Edit Process', 'Save as Template', 'Configure', 'View Documentation', 'Export', 'Archive'
     * @return nothing returns
     * selectMenuOptionRow('Configure') //this option open the configuration for a process
     */
    selectMenuOptionRow(nameOption) {
        var optionXpath =
            '//div[@id="main"]//ul/li/a[@id="nav-sources-tab"]//ancestor::div[@id="main"]//descendant::div[@id="scriptIndex"]//table/tbody/tr//button[@aria-haspopup="menu"]/following-sibling::ul//li//span[contains(text(),"' +
            nameOption +
            '")]';
        cy.xpath(optionXpath).should("be.visible").first().click();
    }

    /**
     * This method is responsible to verify if a script was created or not
     * @param name: script's name
     * @param description: script's description
     * @param userName: username
     * @param fullName: fullname
     * @param language: default values to select "php - PHP Executor", "lua - LUA Executor", "javascript - Node Executor" and "javascript-ssr - Node Executor for SSR"
     * @param timeout: default value 60,
     * @param retryAttempts: default value 0,
     * @param retryWaitTime: default value 5,
     * @return nothing returns
     */
    verifyIfScriptTaskExists(
        scriptName,
        scriptDescription,
        username,
        fullName,
        language,
        timeout,
        retryAttempts,
        retryWaitTime
    ) {
        var loading =
            "//div[@id='scriptIndex']//div[@class='jumbotron jumbotron-fluid']//i";
        cy.get(Selectors.searchField)
            .should("be.visible")
            .type(scriptName)
            .should("have.value", scriptName)
            .type("{enter}", { delay: 1000 });
        cy.xpath(Selectors.scriptTable, { timeout: 10000 })
            .find("td")
            .then(($loadedTable) => {
                if ($loadedTable.length === 1) {
                    this.createScript(
                        scriptName,
                        scriptDescription,
                        username,
                        fullName,
                        language,
                        timeout,
                        retryAttempts,
                        retryWaitTime
                    );
                } else {
                    cy.xpath(loading).should("not.exist");
                }
            });
    }

    /**
     * This method is responsible to press over RUN button in a Script
     * @param none
     * @return nothing returns
     */
    pressRunButton() {
        cy.get(Selectors.runScript).should("be.visible");
        cy.get(Selectors.runScript).click();
        cy.get("[class='fas fa-spinner fa-spin']").should("exist");
        cy.get("[class='fas fa-spinner fa-spin']").should("not.exist");
    }
    fieldsScriptBlank(timeout=60,retryAttempts=0,retryWaitTime=5) {
        //Verify name field is empty
        cy.xpath(Selectors.NameInputTxtBx).should("have.value", "");

        //Verify description field is empty
        cy.get(Selectors.DescriptionTxtBx).should("have.value", "");

        //Verify category field is empty
        cy.get(Selectors.CategoryTxt).should("have.text", "Uncategorized");
        
        cy.xpath(Selectors.moreOptionsButton).click({force:true});
       
        //Verify Run Script as field has Admin User by default
        cy.xpath("//div[@id='createScript___BV_modal_content_']//span[@class='multiselect__single']")
            .should("have.text", "Admin User");

        //Verify Timeout field is empty
        cy.xpath(Selectors.timeoutTxt).click({force: true});
        cy.xpath(Selectors.timeoutTxt).should("have.value", timeout);

        //Verify Retry Attempts field is empty
        cy.xpath(Selectors.RetryAttemptsTxt).should("have.value", retryAttempts);

        //Verify Retry Wait Time field is empty
        cy.xpath(Selectors.RetryWaitTimeTxt).should("have.value", retryWaitTime);
    }
    clickOnMoreOption(){
        cy.xpath(Selectors.moreOptionsButton).click();
    }
    clickOnCollapseOption(){
        cy.xpath(Selectors.moreCollapseOptionsButton).click();
    }

    /**
    * This method is responsible to validate attributes for images
    * @param src: source attribute for image
    * @param alt: alternative name attribute for image
    * @return nothing returns
    */

    validateImages(src, alt){
        cy.xpath(Selectors.chooseLanguage).should('be.visible', {delay:150});
        cy.xpath(Selectors.imgSrc.replace("srch", src)).should('be.visible');
        cy.xpath(Selectors.imgAlt.replace("altt", alt)).should('be.visible');
    }

     /**
    * This method is responsible for filling the first part of the script modal before the openning of the rest of fields
    * @param name: name of script
    * @param description: description of modal
    * @param project: project associated to modal
    * @param category: category associated to modal
    * @return nothing returns
    */
  
   fillInScriptModalBeforeCollapse(name, description, project, category){
        cy.xpath(Selectors.NameInputTxtBx).should('be.visible');
        cy.xpath(Selectors.NameInputTxtBx).click({force: true}).type(name, {delay:150});
        cy.xpath(Selectors.scriptMustBeUnique).should('be.visible');


        cy.get(Selectors.DescriptionTxtBx).should('be.visible');
        cy.get(Selectors.DescriptionTxtBx).click({force: true}).type(description, {delay:150});
   
        cy.xpath(Selectors.projectLabel).should('be.visible');
        cy.xpath(Selectors.projectInput).click({force: true}).type(project + '{enter}', {delay:550});
        cy.xpath(Selectors.projectTag.replace('tag', project)).should('be.visible');


        cy.xpath(Selectors.categoryLabel).should('be.visible');
        cy.xpath(Selectors.categoryInput).click({force: true}).type(category + '{enter}', {delay:250});
        cy.xpath(Selectors.categoryTag.replace('category', category)).should('be.visible');     
    }
    
    assignUserToRunScriptAs(scriptName,userName){
        this.searchScript(scriptName);
        cy.xpath(Selectors.runScriptAslabel).should('be.visible');
        cy.xpath(Selectors.runScriptAsInput).click({force:true});
        cy.xpath(Selectors.runScriptAsInput).type(userName,{delay:80}).should('have.value',userName);
		cy.xpath(Selectors.runScriptAsWrapper)
			.should('have.attr', 'aria-label')
			.and('contain', `${userName}. `);
		cy.xpath(Selectors.runScriptAsInput).type('{enter}');
        cy.xpath('//button[contains(text(),"Save")]').click();
    }
}
