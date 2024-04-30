import Selectors from "#selectors/screens"
import { NavigationHelper } from "#helpers/navigationHelper";
export class Screens {

	clickOnAddScreen() {
		cy.get(Selectors.addScreenButton).click();
	}

	clickNewScreen() {
		cy.get(Selectors.newAssetButton).click();
	}

	enterScreenName(name) {
		cy.get(Selectors.nameTxtBx).type(name).should('have.value', name);
	}

	enterScreenDescription(description) {
		cy.get(Selectors.descriptionTxtBx).type(description).should('have.value', description);
	}

	selectScreenType(type) {
		cy.xpath(Selectors.arrowTypeScreen).click();

		//cy.xpath(Selectors.typeDropDown).click();
	}

	clickOnSave() {
		cy.get(Selectors.saveBtn).should('be.visible').click();
	}
	clickOnPublishSave() {
		cy.xpath(Selectors.savePublishBtn).should('be.visible').click();
	}

	createScreen(name, description, type) {
		this.clickOnAddScreen();
		cy.get(Selectors.CategoryTxt).should('have.text','Uncategorized');
		this.enterScreenName(name);
		this.enterScreenDescription(description);
		this.selectTypeScreen(type);
		this.clickOnSave();
		cy.get(Selectors.savePublishVersionsBtn).should('be.visible');
		
	}

	selectTypeScreen(
        type = " ",
        
    ) {
        
        {
            cy.xpath(Selectors.arrowTypeScreen).should('be.visible');
            cy.xpath(Selectors.arrowTypeScreen).click();

        }
                
        switch (type) {
            case "Form":
                this.selectScreenForm();
                break;
            case "Email":
                this.selectScreenEmail();
                break;
            case "Display":
                this.selectScreenDisplay();
                break;
			case "Conversational":
                this.selectScreenConversational();
                break;
        }
    }

	selectScreenForm() {
        cy.get(Selectors.screenTypeForm).eq(1).click();
    }
	selectScreenEmail() {
        cy.get(Selectors.screenTypeEmail).click();
    }
	selectScreenDisplay() {
        cy.get(Selectors.screenTypeDisplay).click();
    }
	selectScreenConversational() {
        cy.get(Selectors.screenTypeConversational).click();
    }


	saveTheChanges(type) {
		if (type == 'Conversational') {
			this.clickOnSaveScreen();
			cy.xpath(Selectors.sucessToastMsg).should('be.visible');
			cy.xpath(Selectors.sucessToastMsg).should('not.exist');
		} else {
			this.clickOnSaveVersions();
			this.clickOnSave();
			cy.xpath(Selectors.sucessToastMsg).should('be.visible');
			cy.xpath(Selectors.sucessToastMsg).should('not.exist');
			//cy.wait(2000);
		}
	}

	createScreenFromProject(name, description, type) {
		this.clickNewScreen();
		cy.get(Selectors.CategoryTxt).should('have.text','Uncategorized');
		this.enterScreenName(name);
		this.enterScreenDescription(description);
		this.selectScreenType(type);
		this.clickOnSave();
		if (type == 'Conversational') {
			cy.get(Selectors.saveScreenBtn).should('be.visible');
		} else {
			cy.get(Selectors.savePublishVersionsBtn).should('be.visible');
		}
	}

	saveTheChanges(type) {
		if (type == 'Conversational') {
			this.clickOnSaveScreen();
			cy.xpath(Selectors.sucessToastMsg).should('be.visible');
			cy.xpath(Selectors.sucessToastMsg).should('not.exist');
		} else {
			this.clickOnSaveVersions();
			this.clickOnSave();
			cy.xpath(Selectors.sucessToastMsg).should('be.visible');
			cy.xpath(Selectors.sucessToastMsg).should('not.exist');
			//cy.wait(2000);
		}
	}

	saveTheChangesWithVersioning(versionName, additionalDetails) {
		this.clickOnSaveVersions();
		cy.get(Selectors.versionNameTxtBx).type(versionName).should('have.value', versionName);
		cy.get(Selectors.aditionalDetailsTxtArea).type(additionalDetails);
		this.clickOnPublishSave();
		cy.get(Selectors.alertSuccess).should('be.visible');
		cy.get(Selectors.alertSuccess).should('not.exist');
	}

	clickOnSaveScreen() {
		cy.get(Selectors.saveScreenBtn).click();
	}

	clickOnSaveVersions() {
		cy.get(Selectors.savePublishVersionsBtn).click();
	}

	addScreen(screenData, timeStamp) {
		this.createScreen(timeStamp + screenData.name, screenData.description, screenData.type);
		this.addControlls(screenData.controlls, timeStamp);
		this.saveTheChanges(screenData.type);
	}

	addControl(controlName) {
		cy.window().then((win) => {
			win.testing.addControlByLabel(controlName);
		})
	}

	setVariableName(name) {
		if (name != null) {
			cy.get(Selectors.varaibleNameTxtBx).click().focused().clear();
			cy.get(Selectors.varaibleNameTxtBx).type(name).should('have.value', name);
		}
	}

	clickOnDataSource() {
		cy.get(Selectors.dataSourceSectionBtn).click();
	}

	selectTheDataSource(source) {
		cy.get(Selectors.dataSourceDropDown).select(source);
	}

	checkAllowMultipleSelections(check) {
		if (check) {
			cy.xpath(Selectors.allowMultipleSelections).check();
		}
	}

	selectTypeOfReturnedValue(option) {
		cy.get(Selectors.typeOfReturnedValue).select(option);
	}

	fillOptionsVaraible(options_varaible) {
		cy.get(Selectors.optionsVaraibleTxtBx).click().focused().clear();
		cy.get(Selectors.optionsVaraibleTxtBx).type(options_varaible).should('have.value', options_varaible);
	}

	addLineInputControl(data) {
		this.addControl(data.name);
		this.setVariableName(data.varaible_name);
		this.setLabelName(data.label_name);
		if (data.validation_rule != null) {
			this.addvalidationrule(data);
		}
	}

	addSelectListControl(data, timeStamp) {
		switch (data.datasource.data_source) {
			case 'Data Connector':
				this.addControl(data.name);
				this.setVariableName(data.varaible_name);
				this.setLabelName(data.label_name);
				this.clickOnDataSource();
				this.selectTheDataSource(data.datasource.data_source);
				this.fillOptionsVaraible(data.datasource.options_varaible);
				this.checkAllowMultipleSelections(data.datasource.allow_multiple_selections);
				this.selectTypeOfReturnedValue(data.datasource.return_value);
				this.setValueForDataSource(data.datasource.value);
				this.setContentValue(data.datasource.content); if (data.datasource.data_connector == "BooksCollection") {
					this.selectDataConnector(data.datasource.data_connector);
				} else {
					this.selectDataConnector(data.datasource.data_connector + timeStamp);
				}
				this.selectTheEndPoint(data.datasource.endPoint);
				break;
			case 'Request Data':
				this.addControl(data.name);
				this.setVariableName(data.varaible_name);
				this.setLabelName(data.label_name);
				this.clickOnDataSource();
				this.selectTheDataSource(data.datasource.data_source);
				this.fillOptionsVaraible(data.datasource.options_varaible);
				this.fillOptionLabelShown(data.datasource.option_label_shown);
				if (data.datasource.return_value == "Object") {
					this.selectTypeOfReturnedValue(data.datasource.return_value);
				} else {
					this.fillVariableDataProperty(data.datasource.variable_data_property);
				}
				break;
			case 'Provide Values':
				this.addControl(data.name);
				this.setVariableName(data.varaible_name);
				this.setLabelName(data.label_name);
				this.clickOnDataSource();
				for (var i = 0; i < data.datasource.options.length; i++) {
					this.addOptionsToProvideValues(data.datasource.options[i].value, data.datasource.options[i].content);
				}
				break;
		}

	}

	addRichTextControl(data) {
		this.addControl(data.name);
		this.enterRichTextContent(data.content);
	}

	enterRichTextContent(content) {
		cy.get(Selectors.richTextContentTxtArea).click().focused().clear();
		cy.get(Selectors.richTextContentTxtArea).type(content, {
			parseSpecialCharSequences: false
		});
	}

	setContentValue(content) {
		cy.get(Selectors.contentTxtBx).click().focused().clear();
		cy.get(Selectors.contentTxtBx).type(content).should('have.value', content);
	}

	selectDataConnector(option) {
		cy.get(Selectors.dataConnectorDropDown).select(option);
	}

	selectTheEndPoint(endPointOption) {
		cy.get(Selectors.endPointDropDown).select(endPointOption);
		cy.wait(1000);

	}

	addControlls(controllsData, timeStamp) {
		for (var i = 0; i < controllsData.length; i++) {
			switch (controllsData[i].name) {
				case 'Line Input':
					this.addLineInputControl(controllsData[i]);
					break;
				case 'Select List':
					this.addSelectListControl(controllsData[i], timeStamp);
					break;
				case 'Rich Text':
					this.addRichTextControl(controllsData[i]);
					break;
				case 'Submit Button':
					this.addSubmitButtonControl(controllsData[i]);
					break;
				case 'Date Picker':
					this.addDatePickerControl(controllsData[i]);
					break;
				case 'File Upload':
					this.addFileUploadControl(controllsData[i]);
					break;
				case 'File Preview':
					this.addFilePreviewControl(controllsData[i]);
					break;
				case 'Record List':
					this.addRecordListControl(controllsData[i]);
					break;
				case 'Checkbox':
					this.addCheckBoxControl(controllsData[i]);
					break;
				case 'File Download':
					this.addFileDownloadControl(controllsData[i]);
					break;
				case 'Nested Screen':
					this.addNestedScreenControl(controllsData[i], timeStamp);
					break;
				case 'Textarea':
					this.addTextareaControl(controllsData[i]);
					break;
				case 'watchers':
					this.addwatchers(controllsData[i], timeStamp);
					break;
				case 'Photo/Video':
					this.addPhotoVideo(controllsData[i]);
					break;

			}
		}
	}


	addSubmitButtonControl(data) {
		this.addControl(data.name);
		this.setVariableName(data.varaible_name);
	}

	addDatePickerControl(data) {
		this.addControl(data.name);
		this.setVariableName(data.varaible_name);
		this.setLabelName(data.label_name);
		this.setDataTypeForDatePicker(data.data_type);
		if (data.validation_rule != null) {
			this.addvalidationrule(data);
		}

	}

	setLabelName(name) {
		if (name != null) {
			cy.get(Selectors.labelNameTxtBx).click().focused().clear();
			cy.get(Selectors.labelNameTxtBx).type(name).should('have.value', name);
		}
	}

	addFileUploadControl(data) {
        this.addControl(data.name);
        this.setVariableName(data.varaible_name);
        this.setLabelName(data.label_name);
        this.checkAllowMultipleUploads(data.allow_multiple_uploads);
	}

	setDataTypeForDatePicker(type) {
		cy.xpath(Selectors.dateDropDownbtn).click();
		cy.xpath(Selectors.dateValueBx.replace('type', type)).click();
	}

	addFilePreviewControl(data) {
		this.addControl(data.name);
		this.setVariableName(data.varaible_name);
		this.setLabelName(data.label_name);
	}

	fillOptionsVaraible(options_varaible) {
		cy.get(Selectors.optionsVaraibleTxtBx).click().focused().clear();
		cy.get(Selectors.optionsVaraibleTxtBx).type(options_varaible).should('have.value', options_varaible);
	}

	fillOptionLabelShown(option_label_shown) {
		cy.get(Selectors.optionsLabelTxtBx).click().focused().clear();
		cy.get(Selectors.optionsLabelTxtBx).type(option_label_shown).should('have.value', option_label_shown);

	}

	fillVariableDataProperty(variable_data_property) {
		cy.get(Selectors.variableDataProTxtBx).click().focused().clear();
		cy.get(Selectors.variableDataProTxtBx).type(variable_data_property).should('have.value', variable_data_property);
	}

	searchScreen(screenName, option = 'edit') {
		cy.get(Selectors.loadingSpinnerScreen).should('not.be.visible');
		cy.wait(2000);
		cy.get(Selectors.searchInputBox).first().type(screenName).should('have.value', screenName);
		cy.get(Selectors.loadingSpinnerScreen).should('be.visible');
		this.pressThreePointsTable();
		switch (option) {
			case 'edit':
				this.editScreen();
				break;
			case 'config':
				this.goToConfigScreen();
				break;
			case 'delete': break;
			case 'addProject':
				this.addProject();
		}
	}

	editScreen() {
		this.selectMenuOptionRow("Edit Screen")
		cy.get(Selectors.savePublishVersionsBtn).should('be.visible');
	}

	goToConfigScreen() {
		this.selectMenuOptionRow("Configure")
		cy.get(Selectors.versionHistoryTab).should('be.visible');
	}

	addProject() {
        this.selectMenuOptionRow("Add to Project");
        cy.xpath(Selectors.addProjectModel).should("be.visible");
	}

	selectVersion() {
		cy.get(Selectors.versionHistoryTab).click();
		this.showVersioningOnly();

	}

	showVersioningOnly() {
		cy.get(Selectors.onlyShowVersionLabel).click();
	}

	getXPATHOfVersionScreen(numberVersion) {
		var xpath = "";
		for (var i = 1; i <= numberVersion; i++) {
			if (i == 1) {
				xpath = Selectors.copyVersionLink;
			} else {
				xpath = xpath + Selectors.copyNextVersionLink;
			}
		}
		return xpath;
	}

	copyVersionScreen(numberVersion) {
		this.selectVersion();
		var xpathCopy = this.getXPATHOfVersionScreen(numberVersion);
		cy.xpath(xpathCopy).click();
		cy.get(Selectors.confirmSaveVersionBtn).should('be.visible').click();
	}

	countElementsInScreen(cantControlls) {
		cy.get(Selectors.contentTable).find(Selectors.element).its('length').should('eq', cantControlls);
	}

	addRecordListControl(data) {
		this.addControl(data.name);
		this.setVariableName(data.varaible_name);
		this.setLabelName(data.label_name);
		cy.get(Selectors.columnBtn).click();
		for (let i = 0; i < data.column.length; i++) {
			this.setColumnsDataForRecordList(data.column[i].column_header, data.column[i].value);
		}
	}


	setColumnsDataForRecordList(column, value) {
		cy.get(Selectors.addIconBtn).click();
		cy.get(Selectors.columnInputTxtBx).type(column).should('have.value', column);
		cy.get(Selectors.valueInputTxtBx).type(value).should('have.value', value);
		cy.get(Selectors.saveBtnForColumn).click();
	}

	addOptionsToProvideValues(value, content) {
		cy.get(Selectors.optionBtn).click();
		cy.get(Selectors.optionValueInput).type(value).should('have.value', value);
		cy.get(Selectors.optioncontentInput).type(content).should('have.value', content);
		cy.get(Selectors.optionsaveBtn).click();
		cy.xpath(Selectors.optionVerifyBtn.replace('content', content)).should('be.visible');
	}

	addInternalScreen(internalScreenData, timeStamp) {
		this.createNewPage(internalScreenData.name + timeStamp);
		this.addControlls(internalScreenData.controlls, timeStamp);
		this.clickOnSaveVersions();
		this.clickOnSave();
		cy.xpath(Selectors.sucessToastMsg).should('be.visible');
		cy.xpath(Selectors.sucessToastMsg).should('not.exist');
	}

	createNewPage(data) {
		cy.get(Selectors.pageBtn).click();
		cy.get(Selectors.pageInputTxtBx).type(data).should('have.value', data);
		cy.xpath(Selectors.pageSaveBtn).click();
	}

	searchForAScreen(screenName) {
		cy.get(Selectors.screenIndex).should('be.visible');
		cy.get(Selectors.noDataAvaiable).should('not.exist');
		cy.get(Selectors.searchScreen).type(screenName).should('have.value', screenName);
		cy.wait(1500);
	}

	clickOnEditScreen(screenName) {
		cy.xpath(Selectors.editBtn.replace("screenName", screenName)).should('be.visible').click();
	}

	addPageToRecordList(page, i) {
		cy.xpath(Selectors.selectBtnValue).select('0').should('have.value', '0');
		//cy.wait(1000);
		cy.xpath(Selectors.recordListTxt.replace('A', i)).should('be.visible').click();
		cy.get(Selectors.configBtn).click();
		cy.xpath(Selectors.editableChckBx).click();
		cy.xpath(Selectors.recordFormInput).click();
		cy.xpath(Selectors.recordFormValue.replace("page", page)).click();
		this.clickOnSaveVersions();
		this.clickOnSave();
		cy.xpath(Selectors.sucessToastMsg).should('be.visible');
		cy.xpath(Selectors.sucessToastMsg).should('not.exist');
	}

	addCheckBoxControl(data) {
		this.addControl(data.name);
		this.setVariableName(data.varaible_name);
		this.setLabelName(data.label_name);
		if (data.validation_rule != null) {
			this.addvalidationrule(data);
		}
	}

	addPhotoVideo(data) {
		this.addControl(data.name);
		this.setVariableName(data.varaible_name);
		this.setLabelName(data.label_name);
		this.addConfigurationToPhoToVideo(data.capture_type, data.file_name);
		if (data.validation_rule != null) {
			this.addvalidationrule(data);
		}
	}

	addConfigurationToPhoToVideo(captureTypePhotoVideo,fileNamePhotoVideo){
        cy.xpath(Selectors.clickOnConfire).click()
        
        
        if(captureTypePhotoVideo != null){
            cy.xpath(Selectors.captureTypePhotoVideo).select(captureTypePhotoVideo);
        }
        if(fileNamePhotoVideo != null){
            cy.xpath(Selectors.fileNamePhotoVideo).clear().type(fileNamePhotoVideo);
        }
    }

	addFileDownloadControl(data) {
		this.addControl(data.name);
		this.setVariableNameForFileDownload(data.varaible_name);
		this.setLabelName(data.label_name);
	}

	setVariableNameForFileDownload(name) {
		if (name != null) {
			cy.get(Selectors.varaibleNameTxtBxFD).clear();
			cy.get(Selectors.varaibleNameTxtBxFD).type(name).should('have.value', name);
		}
	}

	verifyPresenceOfScreenAndImportScreen(screenName, filePath) {
		this.searchForAScreen(screenName);
		cy.get(Selectors.screenTabelBx)
			.find("td")
			.then(($loadedTable) => {
				if ($loadedTable.length === 1) {
					this.importScreen(filePath);
				} else return;
		})
	}
 
	importScreen(filePath) {
		cy.get(Selectors.importPlusBtn).should('be.visible');
		cy.get(Selectors.importPlusBtn).click();

		cy.window().then((win) => {
			const element = win.document.getElementById("import-file");
			element.classList.remove("d-none");
			win.document.querySelector(Selectors.fileBtn).style.visibility = "visible";
			win.document.querySelector(Selectors.fileBtn).style.display = "block";
			win.document.querySelector(Selectors.fileBtn).style.width = "200px";
			win.document.querySelector(Selectors.fileBtn).style.height = "20px";
			win.document.querySelector(Selectors.fileBtn).style.position = "fixed";
			win.document.querySelector(Selectors.fileBtn).style.overflow = "visible";
			win.document.querySelector(Selectors.fileBtn).style.zIndex = "9999999";
			win.document.querySelector(Selectors.fileBtn).style.top = "500px";
			win.document.querySelector(Selectors.fileBtn).style.left = "500px";
			win.document.querySelector(Selectors.fileBtn).style.right = "500px";
			win.document.querySelector(Selectors.fileBtn).style.bottom = "500px";
		});
		cy.get(Selectors.fileBtn).attachFile(filePath);
		cy.xpath(Selectors.importBtn).click();
		cy.get(Selectors.listScreensBtn).should('be.visible');
		cy.get(Selectors.listScreensBtn).click();
	}
	addvalidationrule(data) {
		cy.xpath(Selectors.clickonaddrule).click();
		cy.xpath(Selectors.clickonaddruleDrpDwn).click();
		if (data.validation_rule == "After Date") {
			cy.xpath(Selectors.clickAddRuleInputTxtBx).type(data.validation_rule);
			cy.xpath(Selectors.selectrule.replace('name', data.validation_rule)).click();
			cy.xpath(Selectors.saveBtn).click();
			cy.xpath(Selectors.addRuleInputTxtBx).type(data.value);
			cy.xpath(Selectors.clickonUpdateBtn).click();
		}
		else if (data.validation_rule == "After or Equal to Date") {
			cy.xpath(Selectors.clickAddRuleInputTxtBx).type(data.validation_rule);
			cy.xpath(Selectors.selectrule.replace('name', data.validation_rule)).click();
			cy.xpath(Selectors.saveBtn).click();
			cy.xpath(Selectors.addRuleInputTxtBx).type(data.value);
			cy.xpath(Selectors.clickonUpdateBtn).click();
		}
		else if (data.validation_rule == "Before Date") {
			cy.xpath(Selectors.clickAddRuleInputTxtBx).type(data.validation_rule);
			cy.xpath(Selectors.selectrule.replace('name', data.validation_rule)).click();
			cy.xpath(Selectors.saveBtn).click();
			cy.xpath(Selectors.addRuleInputTxtBx).type(data.value);
			cy.xpath(Selectors.clickonUpdateBtn).click();
		}
		else if (data.validation_rule == "Before or Equal to Date") {
			cy.xpath(Selectors.clickAddRuleInputTxtBx).type(data.validation_rule);
			cy.xpath(Selectors.selectrule.replace('name', data.validation_rule)).click();
			cy.xpath(Selectors.saveBtn).click();
			cy.xpath(Selectors.addRuleInputTxtBx).type(data.value);
			cy.xpath(Selectors.clickonUpdateBtn).click();
		}
		else if (data.validation_rule == "Between Min & Max") {
			cy.xpath(Selectors.clickAddRuleInputTxtBx).type(data.validation_rule);
			cy.xpath(Selectors.selectrule.replace('name', data.validation_rule)).click();
			cy.xpath(Selectors.saveBtn).click();
			cy.xpath(Selectors.minValueInputTxtBx).type(data.min);
			cy.xpath(Selectors.maxValueInputTxtBx).type(data.max);
			cy.xpath(Selectors.clickonUpdateBtn).click();
		}
		else if (data.validation_rule == "In") {
			cy.xpath(Selectors.clickAddRuleInputTxtBx).type(data.validation_rule);
			cy.xpath(Selectors.selectrule.replace('name', data.validation_rule)).click();
			cy.xpath(Selectors.saveBtn).click();
			cy.xpath(Selectors.InvalueInputTxtBx).type(data.value);
			cy.xpath(Selectors.clickonUpdateBtn).click();
		}
		else if (data.validation_rule == "Not In") {
			cy.xpath(Selectors.clickAddRuleInputTxtBx).type(data.validation_rule);
			cy.xpath(Selectors.selectrule.replace('name', data.validation_rule)).click();
			cy.xpath(Selectors.saveBtn).click();
			cy.xpath(Selectors.InvalueInputTxtBx).type(data.value);
			cy.xpath(Selectors.clickonUpdateBtn).click();
		}
		else if (data.validation_rule == "Max Length") {
			cy.xpath(Selectors.clickAddRuleInputTxtBx).type(data.validation_rule);
			cy.xpath(Selectors.selectrule.replace('name', data.validation_rule)).click();
			cy.xpath(Selectors.saveBtn).click();
			cy.xpath(Selectors.maxLengthInputTxtBx).type(data.value);
			cy.xpath(Selectors.clickonUpdateBtn).click();
		}
		else if (data.validation_rule == "Min Length") {
			cy.xpath(Selectors.clickAddRuleInputTxtBx).type(data.validation_rule);
			cy.xpath(Selectors.selectrule.replace('name', data.validation_rule)).click();
			cy.xpath(Selectors.saveBtn).click();
			cy.xpath(Selectors.minInputTxtBx).type(data.value);
			cy.xpath(Selectors.clickonUpdateBtn).click();
		}
		else if (data.validation_rule == "Regex") {
			cy.xpath(Selectors.clickAddRuleInputTxtBx).type(data.validation_rule);
			cy.xpath(Selectors.selectrule.replace('name', data.validation_rule)).click();
			cy.xpath(Selectors.saveBtn).click();
			cy.xpath(Selectors.regexInputTxtBx).type(data.value);
			cy.xpath(Selectors.clickonUpdateBtn).click();
		}
		else if (data.validation_rule == "Required If") {
			cy.xpath(Selectors.clickAddRuleInputTxtBx).type(data.validation_rule);
			cy.xpath(Selectors.selectrule.replace('name', data.validation_rule)).click();
			cy.xpath(Selectors.saveBtn).click();
			cy.xpath(Selectors.ValidationInputTxtBx).type(data.value);
			cy.wait(2000);
			cy.xpath(Selectors.VrblvalueInputTxtBx).type(data.value1);
			cy.xpath(Selectors.clickonUpdateBtn).click();
		}
		else if (data.validation_rule == "Required Unless") {
			cy.xpath(Selectors.clickAddRuleInputTxtBx).type(data.validation_rule);
			cy.xpath(Selectors.selectrule.replace('name', data.validation_rule)).click();
			cy.xpath(Selectors.saveBtn).click();
			cy.xpath(Selectors.ValidationInputTxtBx).type(data.value);
			cy.xpath(Selectors.VrblvalueInputTxtBx).type(data.value1);
			cy.xpath(Selectors.clickonUpdateBtn).click();
		}
		else if (data.validation_rule == "Same") {
			cy.xpath(Selectors.clickAddRuleInputTxtBx).type(data.validation_rule);
			cy.xpath(Selectors.selectrule.replace('name', data.validation_rule)).click();
			cy.xpath(Selectors.saveBtn).click();
			cy.xpath(Selectors.ValidationInputTxtBx).type(data.value);
			//cy.xpath(Selectors.clickonDropDwnshow.replace('name',data.value)).click();
			cy.xpath(Selectors.clickonUpdateBtn).click();
		}
		else if (data.validation_rule == "Date") {
			cy.xpath(Selectors.clickAddRuleInputTxtBx).type(data.validation_rule);
			cy.xpath(Selectors.dateselectrule).click();
			cy.xpath(Selectors.saveBtn).click();
		}
		else {
			cy.xpath(Selectors.clickAddRuleInputTxtBx).type(data.validation_rule);
			cy.xpath(Selectors.selectrule.replace('name', data.validation_rule)).should('be.visible').click({ force: true });
			cy.xpath(Selectors.saveBtn).click();
		}
	}
    addNestedScreenControl(data, timeStamp) {
        this.addControl(data.name);
        if(data.NestedScreen != null){
            this.addnestedscreen(timeStamp + data.NestedScreen);
        }
        if (data.visibility != null) {
            cy.xpath(Selectors.clickonAdvanced).click();
            cy.xpath(Selectors.clickonVisibilityTxtBx).type(data.visibility_rule);
        }
    }
    addnestedscreen(name) {
        cy.xpath(Selectors.nestedscreenDrpDwnBtn).click();
        cy.xpath(Selectors.nestedscreenInputTxtBX).type(name);
        cy.wait(1500);
        cy.xpath(Selectors.selectnestedscreen.replace('name', name)).click();

    }
	addTextareaControl(data) {
		this.addControl(data.name);
        if (data.validation_rule != null) {
            this.addvalidationrule(data);
        }
        this.addTextareaReadOnly(data.read_only);
        this.addConfigurationToTextArea(data.place_holder, data.helper_text, data.rich_textBtn, data.rows);
        this.addAvancedRules(data.default_value, data.visibility_rule, data.css_name, data.aria_label, data.tab_order);
        this.addTextColorandBackgroundColor(data.text_color, data.background_color);
	}
    addTextareaReadOnly(ReadOnly){
        if(ReadOnly != null){
            cy.xpath(Selectors.clickOnReadOnlyCheckBox).click();
        }
    }
    addConfigurationToTextArea(placeholder, helperText, RichtextBtn, rows){
        cy.xpath(Selectors.clickOnConfire).click()
        if(placeholder != null){
            cy.xpath(Selectors.placeholderInput).clear().type(placeholder);
        }
        if(helperText != null){
            cy.xpath(Selectors.helperTextInput).clear().type(helperText);
        }
        if(RichtextBtn != null){
            cy.xpath(Selectors.richTextcheckBox).click();
        }
        if(rows != null){
            cy.xpath(Selectors.rowsInput).clear().type(rows);
        }
    }
    addAvancedRules(defaultValue, VisibilityRule, CssName, arialabel, Taborder){
        cy.xpath(Selectors.clickonAdvanced).click();
        if(defaultValue != null){
            cy.xpath(Selectors.defaultValueInput).clear().type(defaultValue);
        }
        if(VisibilityRule != null){
            cy.xpath(Selectors.VisibilityRuleInput).clear().type(VisibilityRule);
        }
        if(CssName != null){
            cy.xpath(Selectors.cssNameInput).clear().type(CssName);
        }
        if(arialabel != null){
            cy.xpath(Selectors.arialabelInput).clear().type(arialabel);
        }
        if(Taborder != null){
            cy.xpath(Selectors.taborderInput).clear().type(Taborder);
        }
    }
    addTextColorandBackgroundColor(textColor, backGroundcolor){
        cy.xpath(Selectors.designBtn).click();
        if(textColor != null){
            cy.xpath(Selectors.textcolorBtn.replace('textcolor', textColor)).click();
        }
        if(backGroundcolor != null){
            cy.xpath(Selectors.backGroundcolorBtn.replace('backgroundcolor', backGroundcolor)).click();
        }
    }

	addwatchers(data, timeStamp) {
		cy.xpath(Selectors.clickonwatchers).click();
		for (let i = 0; i < data.watchers.length; i++) {
			this.addwatcherstoscreen(data.watchers[i], timeStamp);
		}
		//cy.wait(6000);
		cy.xpath(Selectors.closethewatchers).should('be.visible').click();

	}
	addwatcherstoscreen(data, timeStamp) {
		var name = timeStamp + data.script;
		cy.xpath(Selectors.watcherScrnVerify).should('be.visible');
		cy.xpath(Selectors.clickonaddwatcher).click();
		cy.xpath(Selectors.clickonwatcherNmTxtBx).type(data.name);
		cy.xpath(Selectors.clickonvaraibleDrpDw).click();
		cy.xpath(Selectors.clickonvaraibleTxtBx).type(data.varaible_name);
		cy.xpath(Selectors.selectTheVaraible.replace('name', data.varaible_name)).click();
		cy.xpath(Selectors.enableSynchronously).click();
		cy.xpath(Selectors.clickonSourceBtn).click();
		cy.xpath(Selectors.clickonSourceDrpDwn).click();
		cy.xpath(Selectors.clickonSourceInptTxtBx).type(name);
		cy.xpath(Selectors.selectSrcript.replace('name', name)).should('be.visible').click();
		cy.xpath(Selectors.clickonOutput).click();
		cy.xpath(Selectors.clickonOutputTxtBx).type(data.output);
		cy.xpath(Selectors.clickonWatchersSaveBtn).click();
	}

	/** datepicker actions
	 * Select a Day
	 * @param {string}
	 **/
	selectDay(day) {
        let selectorDay = '//*[@class="vdpTable"]//tbody//td[not(contains(@class,"outOfRange"))]/*[text()="'+day+'"]';

        cy.wait(1000).then(()=>{
            cy.xpath(selectorDay).as('btn');
            cy.get('@btn')
                .should('be.visible')
                .click();
        });
	}

	/**
	 * close a picker works for calendar and timer
	 **/
	closePicker() {
		cy.get(Selectors.pressCloseBtn).should('be.visible');
		cy.get(Selectors.pressCloseBtn).click();
	}

	/**
	 * Open the picker to select a time or calendar
	 **/
	openOptionTimeCalendar() {
		cy.get(Selectors.changeCalentarTimer).should('be.visible');
		cy.get(Selectors.changeCalentarTimer).click();
	}

	/**
	 * Increment a hour
	 **/
	IncrementHour() {
		cy.get(Selectors.pressIncrementHours).should('be.visible');
		cy.get(Selectors.pressIncrementHours).click();
	}

	/**
	 * Decrement a hour
	 **/
	decrementHour() {
		cy.get(Selectors.pressDecrementHours).should('be.visible');
		cy.get(Selectors.pressDecrementHours).click();
	}

	/**
	 * Select a custom hour, select a value from 00 to 23
	 * @param {string}
	 **/
	selectHour(hour) {
		cy.get(Selectors.pressCustomHour)
            .should('be.visible')
            .clear()
            .type(hour);
	}

	/**
	 * Increment a minute
	 **/
	incrementMinute() {
		cy.get(Selectors.pressIncrementMinute).should('be.visible');
		cy.get(Selectors.pressIncrementMinute).click();
	}

	/**
	 * Decrement a minute
	 **/
	decrementMinute() {
		cy.get(Selectors.pressDecrementMinute).should('be.visible');
		cy.get(Selectors.pressDecrementMinute).click();
	}

	/**
	 * Select a custom minute, select a value from 00 to 55 (multiple of five)
	 * @param {string}
	 **/
	selectMinute(minute) {
		cy.get(Selectors.pressCustomMinute)
            .clear()
            .type(minute)
	}

	/**
	 * previous month or year
	 **/
	previousMonthYear() {
		cy.get(Selectors.pressPrevious).eq(0).should('be.visible');
		cy.get(Selectors.pressPrevious).eq(0).click();
	}

	/**
	 * next month or year
	 **/
	nextMonthYear() {
		cy.get(Selectors.pressNext).eq(0).should('be.visible');
		cy.get(Selectors.pressNext).eq(0).click();
	}

	/**
	 * select a group of Months
	 **/
	selectMonth(month) {
		cy.get('[class="vdpPeriodControl"]> select').eq(0)
            .select(month)
	}

	/**
	 * select a group of Years
	 **/
	selectYear(year) {
        cy.get('[class="vdpPeriodControl"]> select').eq(1)
            .select(year.toString());
	}

	/**
	 * select a value between Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec
	 * @param {string}
	 **/
	selectCustomMonth(month) {
		cy.get(Selectors.selectCustomMonth).should('be.visible');
		cy.contains(Selectors.selectCustomMonth, month).click();
	}

	/**
	 * select a year
	 * @param {string}
	 **/
	selectCustomYear(year) {
		cy.get(Selectors.selectCustomYear).should('be.visible');
		cy.contains(Selectors.selectCustomYear, year).click();
	}

	/**
	 * function to add a date in the datepicker control
	 * @param {string}
	 * @param {string}
	 * @param {string}
	 **/
	useCustomDate(year, month, day) {
        const months = new Map([
            ["Jan", '0'],
            ["Feb", '1'],
            ["Mar", '2'],
            ["Apr", '3'],
            ["May", '4'],
            ["Jun", '5'],
            ["Jul", '6'],
            ["Aug", '7'],
            ["Sep", '8'],
            ["Oct", '9'],
            ["Nov", '10'],
            ["Dec", '11']
        ]);
		this.selectMonth(months.get(month));
		this.selectYear(year);
		this.selectDay(day);
	}

	/**
	 * function to add a date and time in the datepicker control(the time must multiple of five)
	 * @param {string}
	 * @param {string}
	 * @param {string}
	 * @param {string}
	 * @param {string}
	 **/
	useCustomDateTime(year, month, day, hour, minute) {
        this.useCustomDate(year,month,day);
        this.selectHour(hour);
        this.selectMinute(minute);
	}

	setValueForDataSource(value) {
		if (value != null) {
			cy.get(Selectors.valueTxtBx).clear();
			cy.get(Selectors.valueTxtBx).type(value).should('have.value', value);
		}
	}
    changeDataConnectorForSelectList(pageName, collectionName, endPointVal, type) {
        cy.get(Selectors.navPageBtn).select(pageName);
        //click on select list
        cy.xpath(Selectors.selctBx).click();
        //open the datasource option
        cy.get(Selectors.dataSourceSectionBtn).click();
        //click on dataconnector
        cy.get(Selectors.dataConnectorDropDown).select(collectionName);
        //select the ListAll
        cy.get(Selectors.endPointDropDown).select(endPointVal);
        //save the screen
        this.saveTheChanges(type);
    }
    AddJSONCodeToSelectList(data, i) {
        cy.xpath(Selectors.recordListTxt.replace('A', i)).click();
        this.clickOnDataSource();
        cy.xpath(Selectors.clickonEditasJson).click();
        cy.wait(2000);
        cy.xpath(Selectors.clickonTxtJson).click();
        cy.xpath(Selectors.clickonTxtJson).type('{backspace}{backspace}');
        cy.xpath(Selectors.clickonTxtJson).type(data);
        this.clickOnSaveVersions();
        this.clickOnSave();

    }

    copyAndSaveTheScreen() {
        cy.xpath(Selectors.clickOnCopyBtn).click();
        cy.get(Selectors.clickOnSaveBTn).click();
    }

    clickOnReadOnlyInLineInput(i) {
        cy.xpath(Selectors.recordListTxt.replace('A', i)).click();
        cy.wait(2000);
        cy.xpath(Selectors.clickOnReadOnly).click();
        this.clickOnSaveVersions();
        this.clickOnSave();
        cy.wait(2000);
    }

    editWatcher(watcherName, name) {
        cy.xpath(Selectors.searchWatcher).type(watcherName).should('have.value', watcherName);
        cy.xpath(Selectors.verifyWatcher.replace("watcherName", watcherName)).should('be.visible');
        cy.xpath(Selectors.editWatcher).click();
        //cy.get(Selectors.nameWatcher).contains(watcherName);
        cy.xpath(Selectors.srcBtn).click();
        cy.xpath(Selectors.srcBtn2).click();
        cy.xpath(Selectors.watcherNameTxtBX).type(name).should('have.value', name);
        cy.xpath(Selectors.selectSrcValue.replace("name", name)).click();
        cy.xpath(Selectors.selectSrcValue.replace("name", name)).should('be.visible');
        cy.xpath(Selectors.saveWatcher).click();
        cy.xpath(Selectors.verifyPopUp).should('be.visible');
    }
    verifyPresenceOfWatcherAndCreateWithDataC(watcherData){

	    cy.xpath(Selectors.clickonwatchers).click();
        let name = watcherData.name;
        const watcherXpath = "//td[text()='w1']";
        cy.wait(2000);
        cy.get('[data-cy="watchers-table"]')
            .then($table => {
                if ($table.find('tr').length <= 1) {
                    this.addwatcherWithDCtoscreen(watcherData);
                }
            });
        cy.xpath(Selectors.closethewatchers).should('be.visible').click();
    }

    addwatcherWithDCtoscreen(watcherData) {
        let name = watcherData.name;
        let variable_name= watcherData.variable_name;
        let source = watcherData.source;
        let resource = watcherData.resource;
        let output = watcherData.output;
        cy.xpath(Selectors.watcherScrnVerify).should('be.visible');
        cy.xpath(Selectors.clickonaddwatcher).click();
        cy.xpath(Selectors.clickonwatcherNmTxtBx).type(name);
        cy.xpath(Selectors.clickonvaraibleDrpDw).click();
        cy.xpath(Selectors.clickonvaraibleTxtBx).type(variable_name);
        cy.xpath(Selectors.selectTheVaraible.replace('name', variable_name)).click();
        cy.xpath(Selectors.enableSynchronously).click();
        cy.xpath(Selectors.clickonSourceBtn).click();
        cy.xpath(Selectors.clickonSourceDrpDwn).click();
        cy.xpath(Selectors.clickonSourceInptTxtBx).type(source);
        cy.xpath(Selectors.selectSrcript.replace('name', source)).should('be.visible').click();
        cy.xpath('//div[@data-cy="watchers-watcher-endpoint"]//div[@class="multiselect__select"]')
            .should('be.visible').click();
        cy.xpath(Selectors.selectTheVaraible.replace('name', resource)).click();
        cy.xpath(Selectors.clickonOutput).click();
        cy.xpath("//label[text()='Output Variable Property Mapping']/parent::div//button[text()[normalize-space()='+ Property']]")
            .click();
        cy.xpath("//input[@type='text'][@name='value']").should('be.visible').type(output.source);
        cy.xpath("//input[@type='text'][@name='key']").should('be.visible').type(output.variable);
        cy.xpath(Selectors.clickonWatchersSaveBtn).click();
    }
    checkAllowMultipleUploads(check) {
        if (check) {
            cy.xpath(Selectors.allowMultipleUploads).click();
        }
    }

	/**
     * This method is responsible to show you task configuration
     * @param taskName: name of task in the modeler. Ej: task1
     * @return nothing returns
     * screen.verifyScreenNameAndObtainLink(taskName);
     */

	verifyScreenNameAndObtainLink(taskName) {
        const elementTaskXapth = "(//*[text()='taskName'])[1]";
        const screenURL =  "//label[text()='Screen for Input']/parent::div/a"
		
        cy.xpath(elementTaskXapth.replace('taskName', taskName)).first().should('be.visible').click();
        cy.wait(2000);
        cy.xpath(screenURL).should('have.attr', 'href')
			.then((href) => {
					cy.visit(href)
		  })
    }

	pressThreePointsTable() {
		cy.xpath(Selectors.threePointsBtn).should("be.visible");
		cy.xpath(Selectors.threePointsBtn).click();
	}

	/**
    * This method is responsible to do click in one option for a row
    * @param nameOption: Name according to for example:'Edit Process', 'Save as Template', 'Configure', 'View Documentation', 'Export', 'Archive'
    * @return nothing returns
    * selectMenuOptionRow('Configure') //this option open the configuration for a process
    */
    selectMenuOptionRow(nameOption){
        var optionXpath = '//div[@id="screenIndex"]//tbody/tr//button[@aria-haspopup="menu"]/following-sibling::ul//li//span[contains(text(),"'+nameOption+'")]'
        cy.xpath(optionXpath).should('be.visible');
        cy.xpath(optionXpath).first().click();
    }

	/**
    * This method is responsible to do click in the Preview button
    * @param none
    * @return nothing returns
    */
	pressPreviewBtn() {
		cy.get(Selectors.screenPreviewBtn).should("be.visible");
		cy.get(Selectors.screenPreviewBtn).click();
	}

	/**
    * This method is responsible to do click in the Design button
    * @param none
    * @return nothing returns
    */
	pressDesingBtn() {
		cy.get(Selectors.screenDesignBtn).should("be.visible");
		cy.get(Selectors.screenDesignBtn).click();
	}

	translationsScreenModify(screenName,labelName){
		cy.get('[data-cy="input-search"]').should('be.visible').type(screenName, {delay:500});
		cy.xpath("//span[text()='"+screenName+"']").should('be.visible').click();
		cy.get('[aria-controls="collapse-2"]').should('be.visible').click();
		cy.get('[data-cy="controls-FormInput"]').drag('[data-cy="editor-content"]', 'bottom');
		cy.get('[data-cy=screen-element-container]').eq(3).click();
		cy.get('[data-cy="inspector-label"]').clear().type(labelName);
		cy.xpath('//button[@class="btn text-uppercase btn-primary btn-sm"]').click();
		cy.xpath('//div[@class="modal-footer"]/button[@class="btn btn-primary"]').click();
	}

	verifyPreconditionScreen(screenName,labelName){
		cy.wait(3000);
		cy.get('[data-cy="input-search"]').click().type(screenName);
		cy.wait(2000);
		cy.xpath("//span[text()='"+screenName+"']").click();
		cy.get('body').then($body => {
            if($body.find(":nth-child(4) > [data-cy='screen-element-container']")){
                cy.get('[data-cy=screen-element-container]').eq(3).click();
				cy.get('[data-cy="inspector-label"]').invoke('val').then((val) => {
					if(val === labelName){
						cy.wait(2000);
						cy.get('[title="Delete Control"]').click();
					}
				});					
            }
        });	
		cy.xpath('//button[@class="btn text-uppercase btn-primary btn-sm"]').click();
		cy.xpath('//div[@class="modal-footer"]/button[@class="btn btn-primary"]').click();	
	}
	
	publishScreenWithoutVersion() {
		cy.get('button[title="Publish"]').click();
		cy.xpath('//div[@class="modal-dialog modal-md"]//button[contains(text(),"Publish")]').click();
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should('be.visible');
	}
}
