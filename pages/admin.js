import selectors from "#selectors/admin"
import promisify from 'cypress-promise'
import { NavigationHelper } from "#helpers/navigationHelper";

var date = new Date();
const navHelper = new NavigationHelper();
export class Admin {

	searchForCollection(collectionName,option="edit") {
		cy.get(selectors.RecordsBtn).should('be.visible');
		cy.get(selectors.searchInputBox).type(collectionName).should('have.value', collectionName);
		cy.xpath(selectors.searchctrl).click({
			multiple: true
		});
		cy.wait(5000);
		cy.xpath(selectors.collectionNameInput.replace('collectionName', collectionName)).should('be.visible');
		switch (option) {
            case "edit": this.openRecordCollection(collectionName);break;
            case "delete": this.deleteCollection(collectionName);break;
            case "config": this.goToConfigCollection(collectionName);break;
        }
	}

	deleteCollection(collectionName){
        cy.xpath(selectors.deleteCollectionBtn.replace('collectionName', collectionName)).click({ force: true });
        cy.xpath(selectors.confirXPATH).should('be.visible').click();
    }

    openRecordCollection(collectionName){
        cy.xpath(selectors.RecordBtnForGivenCollection.replace('collectionName', collectionName)).click({ force: true });
    }

    goToConfigCollection(collectionName){
        cy.xpath(selectors.configCollectionBtn.replace('collectionName', collectionName)).click({ force: true });
    }

	creatACollection(name, description, createScreen, viewScreen, editScreen) {
        cy.get(selectors.newCollectionBtn).click();
        cy.get(selectors.nameInputTxtBx).type(name).should('have.value', name);
        cy.get(selectors.descriptionInputTxtBx).type(description).should('have.value', description);
        this.addCreateScreenToCollection(createScreen);
        this.addViewScreenToCollection(viewScreen);
        this.addEditScreenToCollection(editScreen);      
        cy.xpath(selectors.collectionsaveBtn).click();
        cy.get(selectors.newRecordBtn).should('be.visible');
    } 

	addRecordstoBookCollection(name) {
		this.addingDataToBookCollection(new Date().toLocaleDateString('en-GB'), "title1", "author1", "1000");
		//cy.xpath(selectors.collectionNameInput.replace('name', name)).click();
		cy.go('back');
		cy.go('back');
		this.addingDataToBookCollection(new Date().toLocaleDateString('en-GB'), "title2", "author2", "4000");
		//cy.xpath(selectors.collectionNameInput.replace('name', name)).click();
		cy.go('back');
		cy.go('back');
		this.addingDataToBookCollection(new Date().toLocaleDateString('en-GB'), "title3", "author3", "3000");
		//cy.xpath(selectors.collectionNameInput.replace('name', name)).click();
		cy.go('back');
		cy.go('back');
		this.addingDataToBookCollection(new Date().toLocaleDateString('en-GB'), "title4", "author4", "2000");
	}

	addingDataToBookCollection(date, title, author, price) {
		cy.get(selectors.newRecordBtn).click();
		cy.xpath(selectors.dateinputTxtBx).type(date).should('have.value', date);
		cy.get(selectors.titleInputTxtBx).type(title).should('have.value', title);
		cy.get(selectors.authorInputTxtBx).type(author).should('have.value', author);
		cy.get(selectors.priceInputTxtBx).type(price).should('have.value', price);
		cy.get(selectors.submitBtn).click();
		cy.get(selectors.navEditBtn).should('be.visible');
		//cy.wait(3000);
	}
	addCreateScreenToCollection(screenName) {
		cy.xpath(selectors.createscreenForInputDropdown).click();
		cy.get(selectors.createscreenInputTxtBx).type(screenName).should('have.value', screenName);
		cy.xpath(selectors.screenDropdownOption.replace('screenName', screenName)).should('be.visible').first().click({force: true});
		// cy.xpath(selectors.screenForInputDropdown).should('have.value', screenName);
	}

	addViewScreenToCollection(screenName) {
		cy.xpath(selectors.viewScreenForInputDropdown).click();
		cy.get(selectors.viewScreenInputTxtBx).type(screenName).should('have.value', screenName);
		cy.xpath(selectors.screenDropdownOption.replace('screenName', screenName)).should('be.visible').click({force: true});
		// cy.xpath(selectors.screenForInputDropdown).should('have.value', screenName);
	}

	addEditScreenToCollection(screenName) {
		cy.xpath(selectors.editScreenForInputDropdown).click();
		cy.get(selectors.editScreenInputTxtBx).type(screenName).should('have.value', screenName);
		cy.xpath(selectors.screenDropdownOption.replace('screenName', screenName)).last().should('be.visible').click({force: true});
		// cy.xpath(selectors.screenForInputDropdown).should('have.value', screenName);
	}

	createUser(username, firstName, lastName, jobTitle, status, email, password) {
        cy.get(selectors.newUserBtn).click();
		//fll data to user
		cy.get(selectors.usernameInputTxtBox).type(username).should('have.value', username);
		cy.get(selectors.firstNameInputTxtBox).type(firstName).should('have.value', firstName);
		cy.get(selectors.lastNameInputTxtBox).type(lastName).should('have.value', lastName);
		cy.get(selectors.jobTitleInputTxtBox).type(jobTitle).should('have.value', jobTitle);
		cy.get(selectors.statusDropdown).select(status);
		cy.get(selectors.emailInputTxtBox).type(email).should('have.value', email);
		cy.get(selectors.passwordInputTxtBox).type(password).should('have.value', password);
		cy.get(selectors.confirmPasswordInputTxtBox).type(password);

		cy.get(selectors.saveUserBtn).click();
		cy.xpath(selectors.profileUserLabel).should('be.visible');
	}

    getUserByUsernameAPI(username){
        return cy.window().then(win => {
            return win.ProcessMaker.apiClient.get('/users', { params: { mention_username: username} }).then(response => {
                const user = response.data.data.find(user => user.username === username);
                // console.log('Got Existing User: ', user);
                // return cy.wrap(user);
                return user;
            });
        });
    }

    createUserAPI(payload, ignoreTakenError){
        payload.status = payload.status.toUpperCase();
        return cy.window().then(win => {
            return win.ProcessMaker.apiClient.post('/users', payload)
            .then(response => {
                // console.log("Created new User: ", response.data.data);
                // return cy.wrap(response.data.data);
                return response.data.data;
            })
            .catch(err => {
                if (
                    ignoreTakenError && 
                    err.response.data.message.toLowerCase() === 'the username has already been taken.') {
                        return this.getUserByUsernameAPI(payload.username);
                } else {
                    throw err;
                }
            });
        });
    }

    getGroupByGroupNameAPI(groupName){
        return cy.window().then(win => {
            return win.ProcessMaker.apiClient.get('/groups', { params: {filter: groupName} }).then(response => {
                const group = response.data.data.find(group => group.name === groupName);
                return group;
            });
        });
    }

    createGroupAPI(payload, ignoreTakenError){
        payload.status = payload.status.toUpperCase();
        return cy.window().then(win => {
            return win.ProcessMaker.apiClient
                .post("/groups", payload) 
                .then((response) => {
                    return response.data.data;
                })
                .catch(err => {
                    if (ignoreTakenError && err.response.data.message.toLowerCase() === "the name has already been taken.") {
                        return this.getGroupByGroupNameAPI(payload.name);
                    } else {
                        throw err;
                    }
                });
        });
    }

    assignUserToGroupAPI(payload, ignoreTakenError){
        return cy.window().then(win => {
            return win.ProcessMaker.apiClient
                .post("/group_members", payload)
                .then((response) => {
                    return response.data.data;
                })
                .catch(err => {
                    if (
                        ignoreTakenError &&
                        err.response.data.message.toLowerCase() === "the name has already been taken.") {
                            return this.getGroupByGroupNameAPI(payload.name);
                    } else {
                        throw err;
                }
            });
        });
    }

	createGroup(name, description){
		cy.get(selectors.newGroupBtn).click();
        //fill data to group
		cy.get(selectors.nameGroupInputTxtBox).type(name).should('have.value',name);
		cy.get(selectors.descriptionGroupTextareaBox).type(description).should('have.value',description);
		cy.xpath(selectors.saveGroupBtn).click();
		cy.get(selectors.groupDetailsTab).should('be.visible');
	}

	addUserToGroup(fullName){
		cy.xpath(selectors.userTab).should('be.visible').click();
		cy.get(selectors.newUserToGroupBtn).should('be.visible').click();
		cy.xpath('//div[@class="modal-content"]').should('be.visible');
		cy.get(selectors.newUserToGroupBtn).should('be.visible').click({force : true});
		cy.xpath('//div[@class="modal-content"]//label[@for="users"]/following-sibling::div//div[@class="multiselect__tags"]').click();
		cy.get(selectors.usersInputTxtBox).type(fullName,{delay:100}).wait(3000).should('have.value',fullName).then(() => {
			cy.get(selectors.usersInputTxtBox).type('{enter}');
		});
        cy.get(selectors.saveUserToGroupBtn).click({ force: true });
		cy.get(selectors.newUserToGroupBtn).should('be.visible');
	}

    verifyUserInGroup(nameGroup, firstNameUser) {
        this.searchGroupAndEdit(nameGroup);
        cy.xpath(selectors.userTab).should('be.visible').click();
        //Verify user in group
        cy.get('input[id="users-filter"]').should('be.visible');
        cy.get('input[id="users-filter"]').type(firstNameUser, { delay: 20 }).type('{enter}').should('have.value', firstNameUser);
        cy.get('[id="nav-users"]').should('contain', firstNameUser);
    }

	addPermissionProcessToGroup(permission){
		cy.xpath(selectors.groupTab).click();
		cy.xpath(selectors.permissionProcessTab).click();
		var editCreate = false;
		for (let key in permission) {
			let op = permission[key];
			switch (op) {
				case 'create':
					if(!editCreate){
						cy.xpath(selectors.createProcessPermissionLabel).click();
						editCreate = true;
					}
					break;
				case 'edit':
					if(!editCreate){
						cy.xpath(selectors.editProcessPermissionLabel).click();
						editCreate = true;
					}
					break;
				case 'view':
					cy.xpath(selectors.viewProcessPermissionLabel).click();
					break;
			}
		}
		cy.get(selectors.savePermissionGroupBtn).click();

	}

	addingDataToStudentCollection(date, ci, name, lastName, phone) {
		cy.get(selectors.newRecordBtn).click();
		cy.xpath(selectors.studentDateInputTxtBx).type(date).should('have.value', date);
		cy.get(selectors.CIInputTxt).type(ci).should('have.value', ci);
		cy.get(selectors.studentNameInputTxtBx).type(name).should('have.value', name);
		cy.get(selectors.lastNameInputTxtBx).type(lastName).should('have.value', lastName);
		cy.get(selectors.phoneNumberInputTxtBx).type(phone).should('have.value', phone);
		cy.get(selectors.selectlistBtn).click();
		cy.xpath(selectors.selectOption).click();
		cy.get(selectors.submitBtn).click();
		cy.get(selectors.navEditBtn).should('be.visible');
	}

	searchForUser(userName) {
		cy.xpath(selectors.userInputTxtBx).type(userName).should('have.value', userName);
		// cy.xpath(selectors.userTxt.replace('userName', userName)).should('be.visible')
	}

	searchUserName(name){
		cy.xpath(selectors.searchUserField).eq(0).type(name).click();
		cy.xpath(selectors.searchButton).eq(0).click();
		cy.get(selectors.editUserButton).eq(0).click();
	}

	deleteUser(name){
		cy.xpath(selectors.searchUserField).type(name, { delay: 300 });
        cy.xpath('//div[@id="main"]//tbody//button[@aria-haspopup="menu"]').should('be.visible').click();
		cy.xpath('//span[text()="Delete User"]').should('be.visible').click();
		cy.xpath("//button[contains(text(),'Confirm')]").eq(0).click();
        cy.xpath("//a[contains(text(),'Deleted Users')]").should('be.visible');
        cy.xpath("//a[contains(text(),'Deleted Users')]").click();
        cy.get('.alert-wrapper > .alert').should('be.visible');
    }

    updateUser(name){
        cy.xpath(selectors.searchUserField).eq(0).type(name, { delay: 300 });
        cy.xpath('//div[@id="main"]//tbody//button[@aria-haspopup="menu"]').should('be.visible').click();
        cy.xpath('//span[text()="Edit User"]').click();
        cy.get('#phone').type('22747395');
        cy.get('#cell').type('+59173015789');
        cy.xpath("(//button[contains(text(),'Save')])[1]").click({force:true});
    }

    readUser(){
        cy.xpath("(//button[contains(text(),'Save')])[1]").scrollIntoView();
        cy.xpath("(//button[contains(text(),'Save')])[1]").click({force:true});
    }

	selectLanguage(language){
		//cy.xpath(selectors.selectListLanguage).should('have.value', 'en');
		cy.get('select[id="language"]').select(language);
		cy.xpath(selectors.selectListLanguage).should('have.value', language);
		cy.get(selectors.saveUserBtn).click();
		cy.reload();
	}

	openPermissionTab(option){
		cy.get(selectors.tabPermissions).click();
		switch(option){
			case 'en':
				cy.xpath('//*[@id="accordionPermissions"]/div[3]/div[1]/div/button/div[1]').should('contain.text', 'Auth Clients');
				cy.xpath('//*[@id="accordionPermissions"]/div[4]/div[1]/div/button/div[1]').should('contain.text', 'Collections');
				cy.xpath('//*[@id="accordionPermissions"]/div[5]/div[1]/div/button/div[1]').should('contain.text', 'Comments');
				cy.xpath('//*[@id="accordionPermissions"]/div[6]/div[1]/div/button/div[1]').should('contain.text', 'Data Connectors');
				cy.xpath('//*[@id="accordionPermissions"]/div[7]/div[1]/div/button/div[1]').should('contain.text', 'Environment Variables');
				cy.xpath('//*[@id="accordionPermissions"]/div[8]/div[1]/div/button/div[1]').should('contain.text', 'Files (API)');
				cy.xpath('//*[@id="accordionPermissions"]/div[9]/div[1]/div/button/div[1]').should('contain.text', 'Groups');
				cy.xpath('//*[@id="accordionPermissions"]/div[10]/div[1]/div/button/div[1]').should('contain.text', 'Notifications (API)');
				cy.xpath('//*[@id="accordionPermissions"]/div[11]/div[1]/div/button/div[1]').should('contain.text', 'Processes');
				cy.xpath('//*[@id="accordionPermissions"]/div[12]/div[1]/div/button/div[1]').should('contain.text', 'Requests');
				cy.xpath('//*[@id="accordionPermissions"]/div[13]/div[1]/div/button/div[1]').should('contain.text', 'Saved Search');
				cy.xpath('//*[@id="accordionPermissions"]/div[14]/div[1]/div/button/div[1]').should('contain.text', 'Screens');
				cy.xpath('//*[@id="accordionPermissions"]/div[15]/div[1]/div/button/div[1]').should('contain.text', 'Scripts');
				//cy.xpath('//*[@id="accordionPermissions"]/div[16]/div[1]/div/button/div[1]').should('contain.text', 'Security Logs');
				//cy.xpath('//*[@id="accordionPermissions"]/div[17]/div[1]/div/button/div[1]').should('contain.text', 'Settings');
				//cy.xpath('//*[@id="accordionPermissions"]/div[18]/div[1]/div/button/div[1]').should('contain.text', 'Signals');
				cy.xpath('//*[@id="accordionPermissions"]/div[19]/div[1]/div/button/div[1]').should('contain.text', 'Task Assignments (API)');
				cy.xpath('//*[@id="accordionPermissions"]/div[20]/div[1]/div/button/div[1]').should('contain.text', 'Translations');
				cy.xpath('//*[@id="accordionPermissions"]/div[21]/div[1]/div/button/div[1]').should('contain.text', 'Users');
				cy.xpath('//*[@id="accordionPermissions"]/div[22]/div[1]/div/button/div[1]').should('contain.text', 'Version History');
				cy.xpath('//*[@id="accordionPermissions"]/div[23]/div[1]/div/button/div[1]').should('contain.text', 'Vocabularies');
				//cy.xpath('//*[@id="accordionPermissions"]/div[24]/div[1]/div/button/div[1]').should('contain.text', 'Webhooks');
				break;
			case 'es':
				cy.xpath('//*[@id="accordionPermissions"]/div[3]/div[1]/div/button/div[1]').should('contain.text', 'Clientes autenticados');
				cy.xpath('//*[@id="accordionPermissions"]/div[4]/div[1]/div/button/div[1]').should('contain.text', 'Colecciones');
				cy.xpath('//*[@id="accordionPermissions"]/div[5]/div[1]/div/button/div[1]').should('contain.text', 'Comentarios');
				cy.xpath('//*[@id="accordionPermissions"]/div[6]/div[1]/div/button/div[1]').should('contain.text', 'Orígenes de datos');
				cy.xpath('//*[@id="accordionPermissions"]/div[7]/div[1]/div/button/div[1]').should('contain.text', 'Variables de entorno');
				cy.xpath('//*[@id="accordionPermissions"]/div[8]/div[1]/div/button/div[1]').should('contain.text', 'Archivos (API)');
				cy.xpath('//*[@id="accordionPermissions"]/div[9]/div[1]/div/button/div[1]').should('contain.text', 'Grupos');
				cy.xpath('//*[@id="accordionPermissions"]/div[10]/div[1]/div/button/div[1]').should('contain.text', 'Notificaciones (API)');
				cy.xpath('//*[@id="accordionPermissions"]/div[11]/div[1]/div/button/div[1]').should('contain.text', 'Procesos');
				cy.xpath('//*[@id="accordionPermissions"]/div[12]/div[1]/div/button/div[1]').should('contain.text', 'Solicitudes');
				cy.xpath('//*[@id="accordionPermissions"]/div[13]/div[1]/div/button/div[1]').should('contain.text', 'Búsqueda guardada');
				cy.xpath('//*[@id="accordionPermissions"]/div[14]/div[1]/div/button/div[1]').should('contain.text', 'Pantallas');
				cy.xpath('//*[@id="accordionPermissions"]/div[15]/div[1]/div/button/div[1]').should('contain.text', 'Scripts');
				//cy.xpath('//*[@id="accordionPermissions"]/div[16]/div[1]/div/button/div[1]').should('contain.text', 'Security Logs');
				//cy.xpath('//*[@id="accordionPermissions"]/div[17]/div[1]/div/button/div[1]').should('contain.text', 'Settings');
				//cy.xpath('//*[@id="accordionPermissions"]/div[18]/div[1]/div/button/div[1]').should('contain.text', 'Signals');
				cy.xpath('//*[@id="accordionPermissions"]/div[19]/div[1]/div/button/div[1]').should('contain.text', 'Asignaciones de tareas (API)');
				cy.xpath('//*[@id="accordionPermissions"]/div[20]/div[1]/div/button/div[1]').should('contain.text', 'Traducciones');
				cy.xpath('//*[@id="accordionPermissions"]/div[21]/div[1]/div/button/div[1]').should('contain.text', 'Usuarios');
				cy.xpath('//*[@id="accordionPermissions"]/div[22]/div[1]/div/button/div[1]').should('contain.text', 'Historial de versiones');
				cy.xpath('//*[@id="accordionPermissions"]/div[23]/div[1]/div/button/div[1]').should('contain.text', 'Vocabularios');
				//cy.xpath('//*[@id="accordionPermissions"]/div[24]/div[1]/div/button/div[1]').should('contain.text', 'Webhooks');
				break;
			case 'fr':
				cy.xpath('//*[@id="accordionPermissions"]/div[3]/div[1]/div/button/div[1]').should('contain.text', 'Clients authentifiés');
				cy.xpath('//*[@id="accordionPermissions"]/div[4]/div[1]/div/button/div[1]').should('contain.text', 'Collections');
				cy.xpath('//*[@id="accordionPermissions"]/div[5]/div[1]/div/button/div[1]').should('contain.text', 'Commentaires');
				cy.xpath('//*[@id="accordionPermissions"]/div[6]/div[1]/div/button/div[1]').should('contain.text', 'Sources de données');
				cy.xpath('//*[@id="accordionPermissions"]/div[7]/div[1]/div/button/div[1]').should('contain.text', "Variables d'environnement");
				cy.xpath('//*[@id="accordionPermissions"]/div[8]/div[1]/div/button/div[1]').should('contain.text', 'Fichiers (API)');
				cy.xpath('//*[@id="accordionPermissions"]/div[9]/div[1]/div/button/div[1]').should('contain.text', 'Groupes');
				cy.xpath('//*[@id="accordionPermissions"]/div[10]/div[1]/div/button/div[1]').should('contain.text', 'Notifications (API)');
				cy.xpath('//*[@id="accordionPermissions"]/div[11]/div[1]/div/button/div[1]').should('contain.text', 'Processus');
				cy.xpath('//*[@id="accordionPermissions"]/div[12]/div[1]/div/button/div[1]').should('contain.text', 'Demandes');
				cy.xpath('//*[@id="accordionPermissions"]/div[13]/div[1]/div/button/div[1]').should('contain.text', 'Recherche sauvegardée');
				cy.xpath('//*[@id="accordionPermissions"]/div[14]/div[1]/div/button/div[1]').should('contain.text', 'Écrans');
				cy.xpath('//*[@id="accordionPermissions"]/div[15]/div[1]/div/button/div[1]').should('contain.text', 'Scripts');
				//cy.xpath('//*[@id="accordionPermissions"]/div[16]/div[1]/div/button/div[1]').should('contain.text', 'Security Logs');
				//cy.xpath('//*[@id="accordionPermissions"]/div[17]/div[1]/div/button/div[1]').should('contain.text', 'Settings');
				//cy.xpath('//*[@id="accordionPermissions"]/div[18]/div[1]/div/button/div[1]').should('contain.text', 'Signals');
				cy.xpath('//*[@id="accordionPermissions"]/div[19]/div[1]/div/button/div[1]').should('contain.text', 'Attributions de tâches (API)');
				cy.xpath('//*[@id="accordionPermissions"]/div[20]/div[1]/div/button/div[1]').should('contain.text', 'Traductions');
				cy.xpath('//*[@id="accordionPermissions"]/div[21]/div[1]/div/button/div[1]').should('contain.text', 'Utilisateurs');
				cy.xpath('//*[@id="accordionPermissions"]/div[22]/div[1]/div/button/div[1]').should('contain.text', 'Historique des versions');
				cy.xpath('//*[@id="accordionPermissions"]/div[23]/div[1]/div/button/div[1]').should('contain.text', 'Vocabulaires');
				//cy.xpath('//*[@id="accordionPermissions"]/div[24]/div[1]/div/button/div[1]').should('contain.text', 'Webhooks');
				break;
			case 'de':
				cy.xpath('//*[@id="accordionPermissions"]/div[3]/div[1]/div/button/div[1]').should('contain.text', 'Authentifizierter Kunde');
				cy.xpath('//*[@id="accordionPermissions"]/div[4]/div[1]/div/button/div[1]').should('contain.text', 'Sammlungen');
				cy.xpath('//*[@id="accordionPermissions"]/div[5]/div[1]/div/button/div[1]').should('contain.text', 'Kommentare');
				cy.xpath('//*[@id="accordionPermissions"]/div[6]/div[1]/div/button/div[1]').should('contain.text', 'Datenquellen');
				cy.xpath('//*[@id="accordionPermissions"]/div[7]/div[1]/div/button/div[1]').should('contain.text', 'Umgebungsvariablen');
				cy.xpath('//*[@id="accordionPermissions"]/div[8]/div[1]/div/button/div[1]').should('contain.text', 'Dateien (API)');
				cy.xpath('//*[@id="accordionPermissions"]/div[9]/div[1]/div/button/div[1]').should('contain.text', 'Gruppen');
				cy.xpath('//*[@id="accordionPermissions"]/div[10]/div[1]/div/button/div[1]').should('contain.text', 'Benachrichtigungen (API)');
				cy.xpath('//*[@id="accordionPermissions"]/div[11]/div[1]/div/button/div[1]').should('contain.text', 'Prozesse');
				cy.xpath('//*[@id="accordionPermissions"]/div[12]/div[1]/div/button/div[1]').should('contain.text', 'Anfragen');
				cy.xpath('//*[@id="accordionPermissions"]/div[13]/div[1]/div/button/div[1]').should('contain.text', 'Gespeicherte Suche');
				cy.xpath('//*[@id="accordionPermissions"]/div[14]/div[1]/div/button/div[1]').should('contain.text', 'Ansichten');
				cy.xpath('//*[@id="accordionPermissions"]/div[15]/div[1]/div/button/div[1]').should('contain.text', 'Skripte');
				//cy.xpath('//*[@id="accordionPermissions"]/div[16]/div[1]/div/button/div[1]').should('contain.text', 'Security Logs');
				//cy.xpath('//*[@id="accordionPermissions"]/div[17]/div[1]/div/button/div[1]').should('contain.text', 'Settings');
				//cy.xpath('//*[@id="accordionPermissions"]/div[18]/div[1]/div/button/div[1]').should('contain.text', 'Signals');
				cy.xpath('//*[@id="accordionPermissions"]/div[19]/div[1]/div/button/div[1]').should('contain.text', 'Aufgabenzuweisungen (API)');
				cy.xpath('//*[@id="accordionPermissions"]/div[20]/div[1]/div/button/div[1]').should('contain.text', 'Übersetzungen');
				cy.xpath('//*[@id="accordionPermissions"]/div[21]/div[1]/div/button/div[1]').should('contain.text', 'Benutzer');
				cy.xpath('//*[@id="accordionPermissions"]/div[22]/div[1]/div/button/div[1]').should('contain.text', 'Versionsgeschichte');
				cy.xpath('//*[@id="accordionPermissions"]/div[23]/div[1]/div/button/div[1]').should('contain.text', 'Vokabulare');
				//cy.xpath('//*[@id="accordionPermissions"]/div[24]/div[1]/div/button/div[1]').should('contain.text', 'Webhooks');
				break;
		}
	}

	openInformationTab(){
		cy.get(selectors.tabInformation).click();
	}


   async getUserId(userName){
    const userval = await promisify(cy.xpath(selectors.userIdInput.replace('userName',userName)).invoke('text').then((userID) =>{
         //cy.log(userID);
         return userID;
            }))
            return userval;
        }

	enableCollectionSignals() {
		//cy.xpath(selectors.configBtn).click();
		cy.get(selectors.createSignalBtn).click();
		cy.get(selectors.updateSignalBtn).click();
		cy.get(selectors.deleteSignalBtn).click();
		cy.xpath(selectors.collectionSaveBtnSignl).click();

	}

    verifyTitlePage (title) {
        cy.visit('/admin/users');
        cy.title().should('eq', title);
    }
    verifySidebarMenuOption(num,option){
        cy.get(selectors.expandSidebarMenu).click();
        cy.get(selectors.optionInSidebar).eq(num).should('contain',option);
    }
    addPermissionToUser(permission='superAdmin',permissionMap={}){
        cy.get(selectors.permissionTabUser).click();
        switch (permission) {
            case "superAdmin":
                cy.xpath(selectors.makeSuperAdmin).should('be.visible').click();
                break;
            case "admin":
                cy.xpath(selectors.makeAdmin).should('be.visible').click();
                break;
            case "specific":
            	this.assignSpecificPemrissionToUser(permissionMap);
            	break;

        }        
        cy.get(selectors.userPermissionSaveButton).click();
        cy.get(selectors.userPermissionMessage).should("have.text", "User Permissions Updated Successfully");
    }

    addAllPermissionToUser(permission='admin',permissionMap={}){
        cy.get(selectors.permissionTabUser).click();
        switch (permission) {
            case "superAdmin":
                cy.xpath(selectors.makeSuperAdmin).should('be.visible').click();
                break;
            case "admin":
                cy.xpath(selectors.makeAdmin).should('be.visible').click();
                break;
            case "specific":
            	this.assignAllPermissionToUser(permissionMap);
            	break;

        }        
        cy.get(selectors.userPermissionSaveButton).click();
        cy.get(selectors.userPermissionMessage).should("have.text", "User Permissions Updated Successfully");
    }

	switchChangePassword(){
		cy.get(':nth-child(6) > .grouped > .custom-control').click('left');
		cy.get(selectors.saveUserBtn).click();
	}

    openUserSignalTab(){
        cy.xpath("//span[contains(text(),'User Settings')]").should('be.visible').click();
        cy.xpath("//div[contains(text(),'User Signals')]").should('be.visible').click();
    }

    setCreateSignal(){
        cy.xpath("//text()[contains(.,'Select whether a signal should be thrown when a user is created')]/ancestor::tbody[@role='rowgroup']//tr[1]//label").click({force: true});
    }

    setDeleteSignal(){
        cy.xpath("//text()[contains(.,'Select whether a signal should be thrown when a user is deleted')]/ancestor::tbody[@role='rowgroup']//tr[2]//label").click({force: true});
    }

    setUpdateSignal(){
        cy.xpath("//text()[contains(.,'Select whether a signal should be thrown when a user is updated')]/ancestor::tbody[@role='rowgroup']//tr[4]//label").click({force: true});
    }

    setReadSignal(){
        cy.xpath("//text()[contains(.,'Select whether a signal should be thrown when a user is read')]/ancestor::tbody[@role='rowgroup']//tr[3]//label").click({force: true});
    }

    addDashboard(name, screen, description) {
        cy.get('button[aria-label="Create Configuration Dashboard"]').should('be.visible');
        cy.get('button[aria-label="Create Configuration Dashboard"]').click();
        cy.xpath("//legend[text()='Name']/following-sibling::div/input").should('be.visible');
        cy.xpath("//legend[text()='Name']/following-sibling::div/input").type(name,{delay:50}).should('have.value',name);
        cy.xpath("//legend[text()='Screen']/following-sibling::div//div[@class='multiselect__spinner']").should('not.be.visible');
        cy.xpath("//legend[text()='Screen']/following-sibling::div//div[@class='multiselect__select']").click();
		cy.xpath("//legend[text()='Screen']/following-sibling::div//input").type(screen,{delay:50}).should('have.value',screen);
		cy.xpath("//legend[text()='Screen']/following-sibling::div//div[@class='multiselect__content-wrapper']//li[1]")
			.should('have.attr', 'aria-label')
			.and('contain', screen+ '. ');
		cy.xpath("//legend[text()='Screen']/following-sibling::div//input").type('{enter}');
        cy.xpath("//legend[contains(text(),'Description')]/following-sibling::div//textarea").type(description);
        cy.xpath("//button[text()='Save']").should('be.visible').click();
    }

    deleteDashboard(nameDashboard) {
        cy.get('[placeholder="Search"]').should('be.visible');
        cy.get('[placeholder="Search"]')
            .type(nameDashboard)
            .wait(1000)
            .type(" ")
            .wait(3000);

        cy.get(".vuetable-body").should("contain", nameDashboard);
        cy.xpath('//div[@id="main"]//tbody//button[@aria-haspopup="menu"]').first().click();
        cy.xpath('//span[normalize-space()="Delete"]').click();
        cy.xpath('//div[text()="Are you sure you want to delete this dashboard?"]').should("be.visible");
        cy.get('[class="btn m-0 btn-secondary"]').click();
    }

    addMenuIfNotExist(name, description) {
        let tableXpath = '//*[@class="data-table"]//tbody';
        cy.get(".nav-link").contains("Menu").click();
        cy.wait(3000);
        cy.get('[placeholder="Search"]')
            .click()
            .type(name)
            .should('have.value',name);
        cy.wait(3000);
        cy.xpath(tableXpath)
            .then(($rowsTable) => {
                if($rowsTable.find("tr").length===1) {
                    cy.xpath(tableXpath, {timeout: 10000})
                        .find("td")
                        .then(($loadedTable) => {
                            if ($loadedTable.length === 1) {
                                cy.get('[aria-label="Create Menu"]').click();
                                cy.get(".form-control").eq(1).type(name);
                                cy.get(".form-control").eq(2).type(description);
                                cy.contains(".btn.btn-secondary.ml-3", "Save").click();
                            }
                        });
                }
            });
    }

    deleteMenu(nameMenu) {
        let buttonMenu = '//*[@class="data-table"]//td/*[contains(text(),"menu")]/ancestor::tr//button';
        cy.get(".nav-link").contains("Menu").click();
        this.searchMenu(nameMenu);
        cy.xpath(buttonMenu.replace('menu',nameMenu)).first().click();
        cy.xpath('//span[normalize-space()="Delete"]').click();
        cy.xpath('//button[contains(text(),"Confirm")]').click();
    }

    searchMenu(name) {
        cy.wait(3000);
        cy.get('[placeholder="Search"]')
            .clear()
            .click()
            .type(name)
            .should('have.value',name);
        cy.wait(2000);
        cy.xpath('//*[@class="data-table"]//td/*[contains(text(),"menu")]'.replace('menu',name)).eq(0)
            .should('be.visible');
    }

    editMenu(linkName, url) {
        cy.xpath(
            '//button//span[@class="text-capitalize screen-toolbar-button"]'
        ).click();
        cy.xpath('//span[normalize-space()="Edit Menu"]').click();
        cy.get('[aria-label="Create Link"]').click();
        cy.get("#package-dynamic-ui-menu-link-add___BV_modal_content_")
            .children()
            .eq(1)
            .children()
            .eq(0)
            .children()
            .eq(0)
            .type(linkName);
        cy.get("#package-dynamic-ui-menu-link-add___BV_modal_content_")
            .children()
            .eq(1)
            .children()
            .eq(3)
            .children()
            .eq(0)
            .type(url);
        cy.get(
            "#package-dynamic-ui-menu-link-add___BV_modal_footer_ > .w-100 > .btn-secondary"
        ).click();
    }

    searchGroupAndEdit(nameGroup) {
        cy.get('[placeholder="Search"]').should("be.visible");
        cy.get('[placeholder="Search"]')
            .click()
            .type(nameGroup, {delay:60})
            .type(" ")
            .type("{backspace}");
        cy.get(".jumbotron.jumbotron-fluid").should("be.visible");
        cy.get(".jumbotron.jumbotron-fluid").should("not.be.visible");
        cy.get('[class="container-fluid"] table tbody tr td')
            .its("length")
            .then(($el) => {
                if ($el === 8) {
                    cy.xpath('//div[@id="main"]//table/tbody/tr//button[@aria-haspopup="menu"]').should('be.visible').click();
                    cy.xpath('//a//span[text()="Edit Group"]').should('be.visible').click();
                    cy.get(selectors.groupDetailsTab).should('be.visible');
                }
        });
    }

    /**
     * This method is responsible for search an user
     * @param nameUser: name of user
     * @return nothing returns
     */
    searchUserAndEdit(nameUser) {
        const editBtnXPATH = "//span[normalize-space()='Edit User']";
        let tableXPATH = "//*[@id='users-listing']//table//tbody//tr[1]";
        cy.xpath(tableXPATH).should("be.visible");
        cy.get('[placeholder="Search"]').should("be.visible");
        cy.get('[placeholder="Search"]').first().click().type(nameUser,{delay:50});
        cy.get('[placeholder="Search"]')
            .eq(0)
            .click()
            .type(" ")
            .type("{backspace}");
        cy.get(".jumbotron.jumbotron-fluid").should("be.visible");
        cy.get(".jumbotron.jumbotron-fluid").should("not.be.visible");
        cy.get('[placeholder="Search"]').should("have.value", nameUser);
        let userRowXPATH = '//*[@id="users-listing"]//table//tr/td/*[text()="nameUser"]/ancestor::tr/td//button';
        cy.xpath(userRowXPATH.replace('nameUser',nameUser)).first().should("be.visible").click();
        cy.xpath(editBtnXPATH,{ timeout: 10000 })
            .should('be.visible').click();
    }
    //Select "MyDashboard" In Home Page
    selectMyDashboardInHomePage() {
        cy.get("#dynamic-ui").should("be.visible");
        cy.xpath("//label[text()='Home Page']/parent::div//div[@class='multiselect__select']").click();
        cy.xpath("//label[text()='Home Page']/parent::div//input")
            .type("My Dashboard", { delay: 300 })
            .wait(3000)
            .should("have.value", "My Dashboard");

        cy.xpath(
            "//label[text()='Home Page']/parent::div//div[@class='multiselect__content-wrapper']//li[1]"
        )
            .should("have.attr", "aria-label")
            .and('equal', "My Dashboard. ");
        cy.xpath("//label[text()='Home Page']/parent::div//input").type(
            "{enter}"
        );
    }
    //Select "Default" In Home Analytics
    selectDefaultDashboardInHomeAnalytics() {
        cy.get("#dynamic-ui").should("be.visible");
        cy.xpath("//label[text()='Home Analytics']/parent::div//div[@class='multiselect__select']").click();
        cy.xpath("//label[text()='Home Analytics']/parent::div//input").type("Default").should('have.value',"Default");

        cy.xpath("//label[text()='Home Analytics']/parent::div//div[@class='multiselect__content-wrapper']//li[1]")
            .should('have.attr', 'aria-label')
            .and('equal', "Default.");
        cy.xpath("//label[text()='Home Analytics']/parent::div//input").type('{enter}');
    }
    //Select "MyDashboard" In Home Analytics
    selectMyDashboardInHomeAnalytics(nameDashboard) {
        cy.get("#dynamic-ui").should("be.visible");
        cy.xpath("//label[text()='Home Analytics']/parent::div//div[@class='multiselect__select']").click();
        cy.xpath("//label[text()='Home Analytics']/parent::div//input").type(nameDashboard, { delay: 50 }).should('have.value',nameDashboard);

        cy.xpath("//label[text()='Home Analytics']/parent::div//div[@class='multiselect__content-wrapper']//li[1]")
            .should('have.attr', 'aria-label')
            .and('equal', nameDashboard + ". ");
        cy.xpath("//label[text()='Home Analytics']/parent::div//input").type('{enter}');
    }
    //Assign dashboard to User
    selectDashboardToUser(nameDashboard) {
    	cy.xpath("//label[text()='Dashboard']/parent::div//div[@class='multiselect__tags']").should('be.visible');
		cy.xpath("//label[text()='Dashboard']/parent::div//div[@class='multiselect__tags']").click();
		cy.xpath("//label[text()='Dashboard']/parent::div//input").type(nameDashboard).should('have.value',nameDashboard);

		cy.xpath("//label[text()='Dashboard']/parent::div//div[@class='multiselect__content-wrapper']//li[1]")
			.should('have.attr', 'aria-label')
			.and('equal', nameDashboard+". ");
		cy.xpath("//label[text()='Dashboard']/parent::div//input").type('{enter}');
    }
    //Assign Menu to User
    selectMenuToUser(nameMenu) {
        cy.get("#dynamic-ui")
            .children()
            .eq(2)
            .children()
            .eq(1)
            .click()
            .type(nameMenu)
            .contains(nameMenu)
            .click();
    }
    selectDefaultInHomePage() {
        cy.get("#dynamic-ui").scrollIntoView().should("be.visible");
        cy.xpath("//label[text()='Home Page']/parent::div//div[@class='multiselect__select']").click();
        cy.xpath("//label[text()='Home Page']/parent::div//input").type("Default").should('have.value',"Default");
		cy.xpath("//label[text()='Home Page']/parent::div//div[@class='multiselect__content-wrapper']//li[1]")
			.should('have.attr', 'aria-label')
			.and('equal', "Default. ");
		cy.xpath("//label[text()='Home Page']/parent::div//input").type('{enter}');
    }
    saveChagesInProfile() {
        cy.get("#saveUser").click();
        cy.get(
            '[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]'
        ).should("be.visible");
    }
    verifyPresenceOfCollectionAndImportCollection(collectionName, filePath) {
        this.loadPage();
        cy.get(selectors.searchInputBox).type(collectionName).should('have.value', collectionName);
        cy.wait(5000);
        cy.xpath(selectors.collectionTable, { timeout: 10000 })
            .find('td')
            .then(($loadedTable) => {
                if ($loadedTable.length === 1) {
                    this.importCollection(filePath);
                }
                else return;
            });
    }
    importCollection(filePath) {
        cy.get(selectors.importCollectionBtn).click();
        cy.get(selectors.importBtn).should('be.visible');
        cy.get(selectors.inputToFileUpload).attachFile(filePath);
        cy.get(selectors.importBtn).click();
        cy.get(selectors.loadingCollectionSpinner).should('not.exist');
        navHelper.navigateToAdminPage();
        cy.wait(6000);
        navHelper.navigateToCollectionPage();
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-danger"]').should('not.exist');
        cy.wait(2000);
    }

    clickOnImportButton() {
        cy.get(selectors.importCollectionBtn).click();
        cy.get(selectors.browseBtn).should('be.visible');
    }

    /**
     * This method is responsible for removing all active columns from a collection
     * @param nameColumnsList: name of the column list to be removed
     * @return nothing returns
     */
    deleteAllActiveColumnsFromCollection(nameColumnsList){
	    cy.xpath(selectors.collectionColumnsTab).click();
	    const len = nameColumnsList.length;
	    for(var i=0; i<len; i++){
            this.deleteActiveColumnFromCollection(nameColumnsList[i]);
        }
    }

    /**
     * This method is responsible for removing an active columns from a collection
     * @param nameColumn: name of the column to be removed
     * @return nothing returns
     */
    deleteActiveColumnFromCollection(nameColumn){
	    cy.xpath(selectors.activeColumns_coulumnLinkDelete.replace('nameColumn', nameColumn)).should('be.visible').click();
        cy.xpath(selectors.activeColumns_coulumnLinkDelete.replace('nameColumn', nameColumn)).should('not.be.visible');
    }

    /**
     * This method is responsible for reset to default configuration from a collection
     * @return nothing returns
     */
    resetToDefaultColumnsCollection(){
	    cy.xpath(selectors.activeColumns_resetToDefaultBtn).click();
	    cy.xpath("//button[text()='Confirm']").should('be.visible').click();
    }

    /**
     * This method is responsible for save changes on colecction configuration
     * @return nothing returns
     */
    saveChangesOnConfigCollection(){
	    cy.xpath("(//div[@class='d-flex justify-content-end']//button[text()='Save'])[1]").should('be.visible').click();
	    cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should('be.visible');
    }

    /**
     * This method is responsible for add a new column in collection configuration
     * @param label: value to label input
     * @param field: value to field input
     * @param format: value to format select list
     * @return nothing returns
     */
    addActiveColumnInCollection(label, field, format){
	    cy.xpath(selectors.activeColumns_addCustomColumnLink).click();
	    cy.xpath(selectors.customColumn_field).should('be.visible');
        cy.xpath(selectors.customColumn_label).type(label).should('have.value',label);
        cy.xpath(selectors.customColumn_field).type(field).should('have.value',field);
        cy.xpath('//legend[text()="Format"]/parent::fieldset//div[@class="multiselect__tags"]').click();
        cy.xpath('//legend[text()="Format"]/parent::fieldset//input').type(format).type('{enter}');
        cy.xpath(selectors.customColumn_save).click();
    }
    /**
     * This method is responsible for get tocket an user in PM4
     * @param userName: name of users
     * @return bearer token
     */
    async userGetToken(userName = 'admin'){
        this.searchUserAndEdit(userName);
        cy.get('[id="nav-tokens-tab"]').click();
        cy.xpath('//button[@aria-label="New Token"]').should('be.visible').click();
        return (await promisify (cy.get('[id="generated-token"]').should('be.visible')
            .invoke('val').then((val) => {
                const url = val;
                cy.log("URL Token",url).then(() =>{
                    return url;
                })
            })));
    }

    //Select "MyDashboard" in Home Page
    selectMyDashboardInHomePageOfGroup() {
        cy.get(selectors.groupDetailsTableContent).should("be.visible");
        cy.xpath(selectors.labelHomePage, { timeout: 5000 })
            .should("be.visible")
            .should("contain", "Home Page");
        cy.xpath(selectors.divContainerOptionHomePage).click();
        cy.xpath(selectors.inputOptionHomePage).should("be.visible");
        cy.xpath(selectors.inputOptionHomePage).type("My Dashboard", { delay: 60 }).should('have.value', "My Dashboard");
        cy.xpath('//span[text()="My Dashboard"]/ancestor::ul[@id="listbox-1"]//li[1]')
            .should('have.attr', 'aria-label')
            .and('equal', "My Dashboard. ");
        cy.wait(2000); 
        cy.xpath(selectors.inputOptionHomePage).type('{enter}', { force: true });
    }
    
    //Assign dashboard to to Group
    selectDashboardToGroup(nameDashboard) {
        cy.xpath(selectors.labelDashboard, { timeout: 5000 })
            .should("be.visible")
            .and("contain", "Dashboard");
        cy.xpath(selectors.divContainerOptionDashboard).should("be.visible");
        cy.xpath(selectors.divContainerOptionDashboard).click();
        cy.xpath(selectors.inputOptionDashboard).should("be.visible");
        cy.xpath(selectors.inputOptionDashboard).type(nameDashboard, { delay: 60 }).should('have.value', nameDashboard);
        cy.xpath('//label[text()="Dashboard"]/parent::div//div[@class="multiselect__content-wrapper"]//li[1]')
            .should('have.attr', 'aria-label')
            .and('equal', nameDashboard+". ");
        cy.xpath(selectors.inputOptionDashboard).type('{enter}', { force: true });
    }
    //Assign Menu to Group
    selectMenuToGroup(nameMenu) {
        cy.xpath(selectors.labelMenu).should("be.visible")
            .and("contain", "Top Menu");
        cy.xpath(selectors.divContainerOptionTopMenu).click();
        cy.xpath(selectors.inputOptionTopMenu).type(nameMenu).should('have.value', nameMenu);
        cy.xpath('//label[text()="Top Menu"]/parent::div//div[@class="multiselect__content-wrapper"]//li[1]')
            .should('have.attr', 'aria-label')
            .and('equal', nameMenu+". ");
        cy.xpath(selectors.inputOptionTopMenu).type('{enter}');

    }
    saveChagesInGroupDetails() {
        cy.get(selectors.saveGroupDetailsBtn).should('be.visible');
        cy.get(selectors.saveGroupDetailsBtn).click({ force: true });
    }

    verifyDashboardAssignedToGroup(nameGroup, nameDashboard) {
        navHelper.navigateToAdminGroupPage();
        this.searchGroupAndEdit(nameGroup);
        cy.wait(1000);
        cy.xpath('//label[contains(text(),"Dashboard")]', { timeout: 10000 }).should('be.visible');
        cy.get(':nth-child(1) > .multiselect > .multiselect__tags').should('be.visible');
        cy.get(':nth-child(1) > .multiselect > .multiselect__tags').should('contain', 'My Dashboard');
        cy.get(':nth-child(2) > :nth-child(2) > .multiselect > .multiselect__tags').should('be.visible');
        cy.get(':nth-child(2) > :nth-child(2) > .multiselect > .multiselect__tags').should('contain', nameDashboard);
    }

    deleteAllMenus() {
        cy.xpath(selectors.rowInMenuTable)
            .find("td")
            .then(($rowM) => {
                if ($rowM.length === 1) {
                    return;
                } else {
                    cy.get(selectors.columnInTable).then(($columnMenu) => {
                        let len = $columnMenu.length / 2;
                        for (var i = 0; i < len; i++) {
                            this.deleteFirstRow();
                            navHelper.navigateToAdminCustomizePage();
                            cy.get(".nav-link").contains("Menu").click();
                        }
                    });
                }
            });
    }
    deleteAllDashboards() {
        cy.xpath(selectors.rowInDashboardTable)
            .find("td")
            .then(($rowD) => {
                if ($rowD.length === 1) {
                    return;
                } else {
                    cy.get(selectors.columnInTable).then(($columnDash) => {
                        let len = $columnDash.length / 2;
                        for (var i = 0; i < len; i++) {
                            this.deleteFirstRow();
                            navHelper.navigateToAdminCustomizePage();
                            cy.get(".nav-link").contains("Dashboard").click();
                        }
                    });
                }
            });
    }
    deleteFirstRow() {
        cy.get(selectors.deleteBtnInTable).first().click();
        cy.get(selectors.confirmDeleteBtn).click();
    }

    createGroupAddingUsers(testname4, testname2, testname1) { //create group
        cy.xpath(selectors.clickonGroupBtn).click();
        cy.wait(3000);
        cy.xpath(selectors.GroupPagevisible).should('be.visible');
        cy.xpath(selectors.clickonplsGroup).click();
        cy.wait(2000);
        cy.xpath(selectors.groupNameBtn).type(testname4);
        cy.xpath(selectors.descriptionBtn).type(testname4);
        cy.xpath(selectors.groupsaveBtn).click();
        cy.wait(3000);
        cy.xpath(selectors.clickonGroupBtn).click();
        cy.xpath(selectors.groupSearchInpBx).type(testname4);
        cy.xpath(selectors.searchBtn).click();
        cy.xpath(selectors.verifyGroupName).should('contain', testname4);
        cy.xpath(selectors.clickGroupEditBt).click();
        cy.xpath(selectors.CrtGrpPageVsb).should('be.visible');
        cy.xpath(selectors.clickonUserBtn).click();
        cy.xpath(selectors.userPageVsble).should('be.visible');
        cy.xpath(selectors.crtuserBtn).click();
        cy.xpath(selectors.selectUserBtn).type(testname2);
        cy.xpath(selectors.userInputText.replace('testname1', testname2)).click({ multiple: true });
        cy.xpath(selectors.clickonSaveBtn).click();
        cy.xpath(selectors.clickonGroup).click();

        cy.xpath(selectors.clickonsaveBtn2).click();
    }

    addPublicFileInFileManager() {
        cy.get(selectors.addPublicFileBtn).click();
    }
    selectFileInFileManager(filePath) {
        cy.get(selectors.selectFileBtn).attachFile(filePath);
        cy.xpath('//div[@class="uploader-list"]/ul/li/div[@status="uploading"]').should('be.visible')
        cy.xpath('//div[@class="uploader-list"]/ul/li/div[@status="uploading"]').should('not.be.exist',{ timeout: 10000 })
    }
    doneUploadPublicFile(){
        cy.get(selectors.doneBtn).click();
        cy.xpath('//div[@class="container text-center"]/div[@class="icon-container"]').should('be.visible');
        cy.xpath('//div[@class="container text-center"]/div[@class="icon-container"]').should('not.exist',{ timeout: 10000 })
    }

    createFolder(folderName){
        cy.xpath('//div[@class="modal-content"]//header//h5[text()="Create Folder"]').should('be.visible');
        cy.get('input[placeholder="Untitled folder"]').type(folderName, {delay:100});
        cy.xpath('//div[@class="modal-content"]//footer//button[text()="Create"]').click();
        cy.xpath('//div[@class="container text-center"]/div[@class="icon-container"]').should('be.visible');
        cy.xpath('//div[@class="container text-center"]/div[@class="icon-container"]').should('not.exist')
    }
    
    /**
     * This method is responsible to search a User. If the user not exist then it will be created
     * @param username: value to label input
     * @param firstName: value to field input
     * @param lastName: value to format select list
     * @param jobTitle: value to format select list
     * @param status: value to format select list
     * @param email: value to format select list
     * @param password: value to format select list
     * @return nothing returns
     */
     createUserIfNotExist(username, firstName, lastName, jobTitle, status, email, password) {
       //search user
       cy.xpath(selectors.threePointsBtnXpath).should('be.visible');
       cy.get(selectors.searchInputBox).first().type(username).should('have.value', username);
       cy.get('#users-listing > div.container-fluid > div > div.jumbotron.jumbotron-fluid').first().should('be.visible');
       cy.wait(2000)
       cy.xpath('//div[@id="users-listing"]/div[2]/div/div[2]/table/tbody/tr', { timeout: 10000 })
       .find('td')
           .then((loadedTable) => {
               cy.log(loadedTable)
               if(loadedTable.length === 1){
                   this.createUser(username, firstName, lastName, jobTitle, status, email, password)
               }
               else return;
           });
    }

    createUserWithScreenPermissionIfNotExist(username, firstName, lastName, jobTitle, status, email, password) {
        //search user
        cy.xpath(selectors.threePointsBtnXpath).should('be.visible');
        cy.get(selectors.searchInputBox).first().type(username).should('have.value', username);
        cy.get('#users-listing > div.container-fluid > div > div.jumbotron.jumbotron-fluid').first().should('be.visible');
        cy.wait(2000)
        cy.xpath('//div[@id="users-listing"]/div[2]/div/div[2]/table/tbody/tr', { timeout: 10000 })
        .find('td')
            .then((loadedTable) => {
                cy.log(loadedTable)
                if(loadedTable.length === 1){
                    this.createUser(username, firstName, lastName, jobTitle, status, email, password)
                    
                    cy.get('#nav-profile-tab').should('be.visible');
                    cy.get('#nav-profile-tab').click();
                    cy.xpath('//div[contains(text(),"Screens")]').scrollIntoView();
                    
                    cy.xpath('//div[contains(text(),"Screens")]').should('be.visible');
                    cy.xpath('//div[contains(text(),"Screens")]').click();
                    cy.xpath('//label[contains(text(),"Create Screen Categories")]').should('be.visible').click();
                    cy.xpath('//label[contains(text(),"Create Screens")]').should('be.visible').click();
                    cy.xpath('//label[contains(text(),"Delete Screen Categories")]').should('be.visible').click();
                    cy.xpath('//label[contains(text(),"Delete Screens")]').should('be.visible').click();
                    cy.xpath('//label[contains(text(),"Edit Screen Categories")]').should('be.visible').click();
                    cy.xpath('//label[contains(text(),"Export Screens")]').should('be.visible').click();
                    cy.xpath('//label[contains(text(),"Import Screens")]').should('be.visible').click();
                    cy.xpath('//label[contains(text(),"View Screen Categories")]').should('be.visible').click();
                    cy.xpath('//label[contains(text(),"View Screens")]').should('be.visible').click();
                    cy.xpath('//*[@id="savePermissions"]').should('be.visible').click();
                }
                else return;
            });
     }

    /**
     * This method is for granting custom permissions to a user(For now it works for COMMENTS and NOTIFICATIONS,but it can be expanded for more sections, following the same logic)
     * @param permission: It is a permission that you want to enable.
     * For example if I want to enable the "create", "delete" and "view" permissions in the Comments section,
       You must enter the following:{ name: "Comments", create: 1, edit: 0, delete: 1, view: 1 }
     */

       addSpecificPermissionsToUser(permission) {
        cy.get(selectors.permissionTabUser).click();
        permission.forEach((element) => {
            cy.log(element.name);
            cy.xpath(`//div[text()='${element.name}']`).click();
            cy.wait(1000);
            switch (element.name) {
                case "Notifications (API)":
                    element.create &&
                        cy.get(selectors.createNotificationsPermission).click();
                    element.delete &&
                        cy.get(selectors.deleteNotificationPermission).click();
                    element.edit &&
                        cy.get(selectors.editNotificationPermission).click();
                    element.view &&
                        cy.get(selectors.viewNotificationPermission).click();
                    break;
                case "Comments":
                    element.create &&
                        cy.get(selectors.createCommentsPermission).click();
                    element.delete &&
                        cy.get(selectors.deleteCommentsPermission).click();
                    element.edit &&
                        cy.get(selectors.editCommentsPermission).click();
                    element.view &&
                        cy.get(selectors.viewCommentsPermission).click();
                    break;
                case "Username and Password":
                    element.editUserAndPassword &&
                    cy.get(selectors.editUserAndPasswordPermission).click();
                break;    
                case "Users":
                    element.create &&
                        cy.get(selectors.createUsersPermission).click();
                    element.delete &&
                        cy.get(selectors.deleteUsersPermission).click();
                    element.editPersonalProfile &&
                        cy.get(selectors.editPersonalProfilePermission).click();    
                    element.edit &&
                        cy.get(selectors.editUsersPermission).click();
                    element.viewOtherUsersProfile &&
                        cy.get(selectors.viewOtherUsersProfilePermission).click();
                    element.view &&
                        cy.get(selectors.viewUsersPermission).click();
                    break;
                case "Processes":
                    element.archiveProcesses &&
                        cy.get(selectors.archiveProcessesPermission).check({force:true});
                    element.createProcessCategories &&
                        cy.get(selectors.createProcessCategoriesPermission).check({force:true});
                    element.createProcesses &&
                        cy.get(selectors.createProcessesPermission).check({force:true});
                    element.deleteProcessCategories &&
                        cy.get(selectors.deleteProcessCategoriesPermission).check({force:true});
                    element.editProcessCategories &&
                        cy.get(selectors.editProcessCategoriesPermission).check({force:true});
                    element.editProcesses &&
                        cy.get(selectors.editProcessesPermission).check({force:true});
                    element.exportProcesses &&
                        cy.get(selectors.exportProcessesPermission).check({force:true});
                    element.importProcesses &&
                        cy.get(selectors.importProcessesPermission).check({force:true});
                    element.viewProcessCategories&&
                        cy.get(selectors.viewProcessCategoriesPermission).check({force:true});
                    element.viewProcesses &&
                        cy.get(selectors.viewProcessesPermission).check({force:true});
                    break;
                default:
                    break;
            }
            cy.get('[id="savePermissions"]').click();
        });
    }

    /**
	 * This method is responsible to delete group
	 * @param nameGroup: group name
	 * @return nothing returns
	 */
	deleteGroup(nameGroup){
		cy.get(selectors.searchGroup).should("be.visible");
        cy.get(selectors.searchGroup).click();
        cy.get(selectors.searchGroup).type(nameGroup, { delay: 100 }).should('have.value', nameGroup);
        cy.wait(1000)
        cy.get(selectors.searchGroup).type(" ").type("{backspace}");
        cy.wait(1000)
		cy.get(selectors.loadingGroup).should("not.be.visible");
		cy.get(selectors.groupPagination)
			.should("be.visible")
			.and("contain", "1 - 1 of 1 Group");
        cy.xpath((selectors.groupEllipsis).replace('group', nameGroup)).click();
		cy.xpath(selectors.groupDelete).click();
		cy.xpath(selectors.confirmButtonGroup).click();
	}
    goToEditMenu(){
        cy.xpath(
            '//button//span[@class="text-capitalize screen-toolbar-button"]'
        ).click();
        cy.xpath('//span[normalize-space()="Edit Menu"]').click();
    }
    addLinkToMenu(linkText, iconName, color, url) {
        //Add Link
        cy.get('button[aria-label="Create Link"]').click();
        //text
        cy.xpath('//legend[text()="Link Text"]/parent::fieldset//input')
            .should("be.visible")
            .click();
        cy.xpath('//legend[text()="Link Text"]/parent::fieldset//input').type(
            linkText
        );
        //icon
        cy.xpath(
            '//legend[text()="Icon"]/parent::fieldset//div[@class="multiselect__select"]'
        ).click();
        cy.xpath(
            '//legend[contains(text(),"Icon")]/parent::fieldset//div[@class="multiselect__content-wrapper"]//i[@class="fas fa-fw fa-' +
                iconName +
                '"]'
        ).click();
        cy.xpath(
            '//div[@class="modal-content"]//legend[text()="Icon"]//following-sibling::div//div[@class="multiselect__tags"]//span/i'
        ).should("have.class", "fas fa-fw fa-" + iconName);
        cy.xpath(
            '//div[@class="modal-content"]//legend[text()="Icon"]//following-sibling::div//span/i'
        ).should("have.class", "fas fa-fw fa-" + iconName);
        //color variant
        cy.get('[class="custom-select"]')
            .select(color)
            .should("have.value", color);
        //URL
        cy.xpath('//legend[text()="URL"]/parent::fieldset//input')
            .should("be.visible")
            .click();
        cy.xpath('//legend[text()="URL"]/parent::fieldset//input').type(url);
        //Check Open in new window
        cy.get('[type="checkbox"]').click({ force: true });
        //save
        cy.xpath(
            '//footer[@class="modal-footer"]//button[@class="btn btn-secondary ml-3"]'
        ).click();
    }

    /**
     * This method is responsible to create and configure a email server
     * @param serverEmailType: is a object as {type:'smtp',aliasEmail:nameAliasEmail,senderEmail: 'testqa@mailtrap.com',senderName: 'testqa@mailtrap.com',serverHost: 'smtp.mailtrap.io',serverPort: '25',option: 'tls',user: 'XXXXXXXXXXXXXx',password: 'XXXXXXXXX'};
     * @return nothing returns
     */
    createMailServer(serverEmailType){
        var ServerHost = Cypress.env("defaultMailTrap").serverHost;
        cy.get('[data-target="#collapseOne1"]').as("emailTitle").should("be.visible");
        cy.get('@emailTitle').invoke("attr", "aria-expanded").then(($op) => {
            if($op === "true"){ 
                cy.get("@emailTitle").click();
            }
        });
        cy.get('[id="collapseOne1"]').as("listEmail").should("have.class", "collapse show");
        cy.get("@listEmail").click();

        cy.xpath('//div[contains(text(),"Email Default Settings")]').click();      
        cy.xpath('//table/tbody//div[contains(text(),"Server Host")]/ancestor::tr/td[@aria-colindex="2"]').invoke('text').then(elem => {
            if(elem.trim() === ServerHost){
                cy.log('email server exits: '+ ServerHost);
            }else{
                switch(serverEmailType){
                    case "smtp":
                        //variables
                        var aliasServerEmailTxt= Cypress.env("defaultMailTrap").aliasEmail;
                        var senderEmailTxt = Cypress.env("defaultMailTrap").senderEmail;
                        var senderNameTxt = Cypress.env("defaultMailTrap").senderName;
                        var serverHostTxt = Cypress.env("defaultMailTrap").serverHost;
                        var serverPortTxt = Cypress.env("defaultMailTrap").serverPort;
                        var secureOption = Cypress.env("defaultMailTrap").secureOption;
                        var userAccount = Cypress.env("defaultMailTrap").userAccount;
                        var userAccountPass = Cypress.env("defaultMailTrap").userAccountPass;
                        let optionConfigXpath = '//table/tbody//div[contains(text(),"optionName")]/ancestor::tr//button[@aria-label="Edit"]';
                        let optionColumnXpath = '//table/tbody//div[contains(text(),"optionColumn")]/ancestor::tr/td[2]';
                        //edit sender email
                        cy.xpath(optionConfigXpath.replace('optionName','Sender Email')).click();
                        cy.xpath('//div[@class="modal-content"]').should('be.visible');
                        cy.xpath('//div[@class="modal-content"]//div/input').clear().type(senderEmailTxt).should('have.value',senderEmailTxt);
                        cy.xpath('//div[@class="modal-content"]//footer//button[contains(text(),"Save")]').click();
                        cy.xpath('//div[@role="alert"]').should('exist');
                        cy.xpath('//div[@role="alert"]').should('not.exist');
                        cy.xpath(optionColumnXpath.replace('optionColumn','Sender Email')).should('have.contain',senderEmailTxt);
        
                        //edit sender name
                        cy.xpath(optionConfigXpath.replace('optionName','Sender Name')).click();
                        cy.xpath('//div[@class="modal-content"]').should('be.visible');
                        cy.xpath('//div[@class="modal-content"]//div/input').clear().type(senderNameTxt);
                        cy.xpath('//div[@class="modal-content"]//footer//button[contains(text(),"Save")]').click();
                        cy.xpath('//div[@role="alert"]').should('exist');
                        cy.xpath('//div[@role="alert"]').should('not.exist');
                        cy.xpath(optionColumnXpath.replace('optionColumn','Sender Name')).should('have.contain',senderNameTxt);
        
                        //edit server host
                        cy.xpath(optionConfigXpath.replace('optionName','Server Host')).click();
                        cy.xpath('//div[@class="modal-content"]').should('be.visible');
                        cy.xpath('//div[@class="modal-content"]//div/input').clear().type(serverHostTxt);
                        cy.xpath('//div[@class="modal-content"]//footer//button[contains(text(),"Save")]').click();
                        cy.xpath('//div[@role="alert"]').should('exist');
                        cy.xpath('//div[@role="alert"]').should('not.exist');
                        cy.xpath(optionColumnXpath.replace('optionColumn','Server Host')).should('have.contain',serverHostTxt);
        
                        //edit server port
                        cy.xpath(optionColumnXpath.replace('optionColumn','Server Port')).invoke('text').then(($port)=>{
                            cy.log("port="+$port+"/");
                            if($port.trim() !== serverPortTxt){
                                cy.xpath(optionConfigXpath.replace('optionName','Server Port')).click();
                                cy.xpath('//div[@class="modal-content"]').should('be.visible');
                                cy.xpath('//div[@class="modal-content"]//div/input').clear().type(serverPortTxt);
                                cy.xpath('//div[@class="modal-content"]//footer//button[contains(text(),"Save")]').click();
                                cy.xpath('//div[@role="alert"]').should('exist');
                                cy.xpath('//div[@role="alert"]').should('not.exist');
                            }
                            cy.xpath(optionColumnXpath.replace('optionColumn','Server Port')).should('have.contain',serverPortTxt);
                        });
        
                        //edit server secure option
                        cy.xpath(optionColumnXpath.replace('optionColumn','Use secure connection')).invoke('text').then(($option)=>{
                            cy.log("port="+$option+"/");
                            if($option.trim() !== secureOption){
                                cy.xpath(optionConfigXpath.replace('optionName','Use secure connection')).click();
                                cy.xpath('//div[@class="modal-content"]').should('be.visible');
                                cy.xpath('//label[text()="'+secureOption+'"]').click();
                                cy.xpath('//div[@class="modal-content"]//footer//button[contains(text(),"Save")]').click();
                                cy.xpath('//div[@role="alert"]').should('exist');
                                cy.xpath('//div[@role="alert"]').should('not.exist');
                            }
                            cy.xpath(optionColumnXpath.replace('optionColumn','Use secure connection')).should('have.contain',secureOption);
                        });
        
                        //edit user account
                        cy.xpath(optionColumnXpath.replace('optionColumn','User Account')).invoke('text').then(($option)=>{
                            if($option.trim() !== userAccount){
                                cy.xpath(optionConfigXpath.replace('optionName','User Account')).click();
                                cy.xpath('//div[@class="modal-content"]').should('be.visible');
                                cy.xpath('//div[@class="modal-content"]//div/input').clear().type(userAccount);
                                cy.xpath('//div[@class="modal-content"]//footer//button[contains(text(),"Save")]').click();
                                cy.xpath('//div[@role="alert"]').should('exist');
                                cy.xpath('//div[@role="alert"]').should('not.exist');
                            }
                            cy.xpath(optionColumnXpath.replace('optionColumn','User Account')).should('have.contain',userAccount);
                        });
        
                        //edit password account
                        cy.xpath(optionConfigXpath.replace('optionName','User Password')).click();
                        cy.xpath('//div[@class="modal-content"]').should('be.visible');
                        cy.xpath('//div[@class="modal-content"]//div/input').clear().type(userAccountPass);
                        cy.xpath('//div[@class="modal-content"]//footer//button[contains(text(),"Save")]').click({force:true});
                        cy.xpath('//div[@role="alert"]').should('not.exist');
        
                        break;
                    case "sendmail":
                        //press edit Email Server button
                        cy.xpath('//div[@aria-hidden="false"]//tr[@aria-rowindex="2"]//button[@aria-label="Edit"]').click();
                        cy.xpath('//div[@class="modal-content"]').should('be.visible');
                        cy.xpath('//label[text()="'+emailServerType+'"]').click();
                        break;
                    case "mailgun":
                        break;
                    case "postmark":
                        break;
                    case "ses":
                        break;
                }
            }  
        })
    }

    /**
     * This method is responsible to verify if a email server exists or not
     * @param serverEmailType: is the type of the configuration like: (smtp, sendmail, mailgun, postmark)
     * @return nothing returns
     */
    createEmailServerIfNotExist(serverEmailType){
        var senderEmail = Cypress.env("defaultMailTrap.senderEmail");
        cy.xpath('//div[@id="settings"]//ul[@role="tablist"]//li//a[contains(text(),"Email")]').then((elem)=>{
            const nroTabs = elem.length;
            for(let $i=1;$i<nroTabs;$i++){
                cy.xpath('//div[@id="settings"]//ul[@role="tablist"]//li//a[contains(text(),"Email")]').eq($i).click();
                cy.xpath('//div[@aria-hidden="false"]//div[contains(text(),"Sender Email")]/ancestor::tr/td[@aria-colindex="2"]').invoke('text')
                    .then(elem => {
                        if(elem.trim() === senderEmail){
                            $i = nroTabs;
                            cy.log('email server exits: '+serverEmailType);
                        }else{
                            if($i === (nroTabs-1)){
                                this.createMailServer(serverEmailType);
                            }
                        }
                    });
            }
        })
    }
    createGroupIfNotExist(nameGroup,description) {
        //search group
        cy.get('[placeholder="Search"]').should("be.visible").click().type(nameGroup).should('have.value',nameGroup);
        cy.wait(5000)
        //cy.get('[placeholder="Search"]').should("be.visible").click().type(nameGroup).should('have.value',nameGroup);
        //    cy.wait(5000)
        cy.xpath('//div[@class="data-table"]//tbody//tr')
            .find('td')
            .then((loadedTable) => {
                cy.log(loadedTable)
                if(loadedTable.length > 1){  
                    return;
                }
                else {
                     this.createGroup(nameGroup,description)
                }
            });
    }

   /**
    * This method was created to create an auth client
    * @param name: name of the auth client
    * @param website: redirect website
    * @return nothing returns
    */

    createAuthClient(name, website){
        cy.xpath(selectors.authClientButton).should('be.visible').click();
        cy.xpath(selectors.AuthName).click().type(name).should('have.value', name);
        cy.xpath(selectors.AuthGrant).click({force: true});
        cy.xpath(selectors.redirect).type(website);
        cy.xpath(selectors.buttonSaveAuth).click({force: true});
    }
    
    /**
    * This method was created to update an auth client
    * @param name: name of the auth client
    * @param newName: name for update
    * @return nothing returns
    */

    updateAuthClient(name,newName = 'userName'){
        cy.xpath(selectors.authClientButton).should('be.visible');
        this.searchAuthClient(name);
        cy.xpath(selectors.AuthName).clear().click().type(newName).should('have.value', newName);
        cy.xpath(selectors.buttonSaveAuth).click({force: true});
    }

    /**
    * This method was created to delete an auth client
    * @param name: name of the auth client
    * @return nothing returns
    */
    
    deleteAuthClient(name){
        cy.xpath(selectors.authClientButton).should('be.visible');
        this.searchAuthClient(name,false);
        cy.xpath(selectors.deleteMenuAuth).first().should('be.visible').click();
        cy.xpath(selectors.confirmAuth).click();
    }

    searchAuthClient(name,optionEdit=true){
        let searchUserAuthXpath = '//input[@id="search-box"]';
        let optionButtonXpath = '//*[contains(text(),"name")]/ancestor::tr//*[contains(text(),"Options")]';
        let editAuthXpath = '//a//*[contains(text(),"Edit Auth Client")]';
        cy.xpath(searchUserAuthXpath).should('be.visible')
            .type(name)
            .should('have.value',name)
            .type('{enter}');
        cy.xpath(optionButtonXpath.replace('name',name)).eq(0)
            .should('be.visible')
            .click();
        if(optionEdit){
            cy.xpath(editAuthXpath)
                .should('be.visible')
                .click();
        }
    }
    
    /**
    * This method is responsible to do click in one option for a row
    * @param nameOption: Name according to for example:'Edit Group' or 'Delete Group'
    * @return nothing returns
    */
    selectMenuGroupOptionRow(nameOption){
        var optionXpath = '//div[@id="listGroups"]//td//ul[@role="menu"]//span[contains(text(),"'+nameOption+'")]';
        cy.xpath(optionXpath).should('have.text', nameOption).first().click();
    }

    /**
    * This method is responsible to verify if a user already is assigned to a group
    * @param groupName: Group Name to search and add users
    * @param userName: User Name to add in the Group
    * @return nothing returns
    */
    addUserIfNotExistToGroup(groupName, userName){
        this.searchGroupAndEdit(groupName);
		cy.xpath(selectors.userTab).should('be.visible').click();
        //search user
        cy.xpath('//input[@id="users-filter"]')
            .type(userName, { delay: 300 })
            .should("have.value", userName);
        cy.xpath('//div[@class="data-table"]//tbody//tr').first()
            .find('td')
            .then((loadedTable) => {
                cy.xpath("//div[@class='data-table']//tbody//tr/td").first().should("be.visible");
                if(loadedTable.length > 1){
                    return;
                }else{
                    cy.get(selectors.newUserToGroupBtn).should('be.visible').click();
		            cy.xpath('//div[@class="modal-content"]').should('be.visible');
                    cy.xpath('//div[@class="modal-content"]//label[@for="users"]/following-sibling::div//div[@class="multiselect__tags"]').click();
                    cy.get(selectors.usersInputTxtBox)
                        .type(userName, { delay: 500 })
                        .should("have.value", userName);
                    cy.get(selectors.usersInputTxtBox).type('{enter}');
                    cy.get(selectors.saveUserToGroupBtn).click();
                    cy.xpath('//tbody/tr/td[contains(text(),"' + userName + '")]').should("be.visible");
                }
            });
	}

    /**
     * This method is responsible to search a User. If the user not exist then it will be created in order to create other Super Admin user
     * @param username: value to label input
     * @param firstName: value to field input
     * @param lastName: value to format select list
     * @param jobTitle: value to format select list
     * @param status: value to format select list
     * @param email: value to format select list
     * @param password: value to format select list
     * @return nothing returns
     */
    createSuperAdminUserIfNotExist(username, firstName, lastName, jobTitle, status, email, password) {
        //search user
        cy.xpath(selectors.threePointsBtnXpath).should('be.visible');
        cy.get(selectors.searchInputBox).first().type(username).should('have.value', username);
        cy.get('#users-listing > div.container-fluid > div > div.jumbotron.jumbotron-fluid').first().should('be.visible');
        cy.wait(2000)
        cy.xpath('//div[@id="users-listing"]/div[2]/div/div[2]/table/tbody/tr', { timeout: 10000 })
        .find('td')
            .then((loadedTable) => {
                cy.log(loadedTable)
                if(loadedTable.length === 1){
                    this.createUser(username, firstName, lastName, jobTitle, status, email, password)
                    this.addPermissionToUser();
                }
                else return;
            });
    }

    /**
     * This method is responsible to search a User. If the user not exist then it will be created in order to create other Super Admin user
     * @param username: value to label input
     * @param firstName: value to field input
     * @param lastName: value to format select list
     * @param jobTitle: value to format select list
     * @param status: value to format select list
     * @param email: value to format select list
     * @param password: value to format select list
     * @param permission: value with kind of permission like: "superAdmin: by default, admin, or participant"
     * @return nothing returns
     */
    createUserIfNotExistWithPermission(username, firstName, lastName, jobTitle, status, email, password,permission,permissionMap={}) {
        //search user
        cy.xpath(selectors.threePointsBtnXpath).should('be.visible');
        cy.get(selectors.searchInputBox).first().type(username).should('have.value', username);
        cy.get('#users-listing > div.container-fluid > div > div.jumbotron.jumbotron-fluid').first().should('be.visible');
        cy.wait(2000)
        cy.xpath('//div[@id="users-listing"]/div[2]/div/div[2]/table/tbody/tr', { timeout: 10000 })
            .find('td')
            .then((loadedTable) => {
                cy.log(loadedTable)
                if(loadedTable.length === 1){
                    this.createUser(username, firstName, lastName, jobTitle, status, email, password)
                    this.addPermissionToUser(permission,permissionMap);
                }
                else return;
            });
    }

    createUserIfNotExistWithAllPermission(username, firstName, lastName, jobTitle, status, email, password,permission,permissionMap={}) {
        //search user
        cy.xpath(selectors.threePointsBtnXpath).should('be.visible');
        cy.get(selectors.searchInputBox).first().type(username).should('have.value', username);
        cy.get('#users-listing > div.container-fluid > div > div.jumbotron.jumbotron-fluid').first().should('be.visible');
        cy.wait(2000)
        cy.xpath('//div[@id="users-listing"]/div[2]/div/div[2]/table/tbody/tr', { timeout: 10000 })
            .find('td')
            .then((loadedTable) => {
                cy.log(loadedTable)
                if(loadedTable.length === 1){
                    this.createUser(username, firstName, lastName, jobTitle, status, email, password)
                   cy.wait(3000);
                    this.addAllPermissionToUser(permission,permissionMap);
                }
                else return;
            });
    }
    /**
     * This method is responsible for anable Use Randomly-Generated IDs for Links in collection package
     * @return nothing returns
     */
    enableRandomlyGenerated(){
	    cy.xpath('(//label[@class="custom-control-label"])[1]').should('be.visible').click();
    }

    /**
     * This method is responsible to create a default email server
     * @param serverEmailType: is the type of the configuration like: (smtp, sendmail, mailgun, postmark)
     * @return nothing returns
     */
    createDefaultEmailServerIfNotConfigured(serverEmailType){
        var ServerHost = Cypress.env("defaultEmailSettings").serverHost;
        cy.get('[data-target="#collapseOne1"]').as("emailTitle").should("be.visible");
        cy.get('@emailTitle').invoke("attr", "aria-expanded").then(($op) => {
            if($op === "true"){ 
                cy.get("@emailTitle").click();
            }
        });
        cy.get('[id="collapseOne1"]').as("listEmail").should("have.class", "collapse show");
        cy.get("@listEmail").click();

        cy.xpath('//div[contains(text(),"Email Default Settings")]').click();      
        cy.xpath('//table/tbody//div[contains(text(),"Server Host")]/ancestor::tr/td[@aria-colindex="2"]').invoke('text')
            .then(elem => {
                if(elem.trim() === ServerHost){
                    cy.log('email server exits: '+ serverEmailType);
                }else{
                    var senderEmailTxt = Cypress.env("defaultEmailSettings").senderEmail;
                    var senderNameTxt = Cypress.env("defaultEmailSettings").senderName;
                    var serverHostTxt = Cypress.env("defaultEmailSettings").serverHost;
                    var serverPortTxt = Cypress.env("defaultEmailSettings").serverPort;
                    var secureOption = Cypress.env("defaultEmailSettings").secureOption;
                    var userAccount = Cypress.env("defaultEmailSettings").userAccount;
                    var userAccountPass = Cypress.env("defaultEmailSettings").userAccountPass;
                    let optionConfigXpath = '//table/tbody//div[contains(text(),"optionName")]/ancestor::tr//button[@aria-label="Edit"]';
                    let optionColumnXpath = '//table/tbody//div[contains(text(),"optionColumn")]/ancestor::tr/td[2]';

                    //edit sender email
                    cy.xpath(optionConfigXpath.replace('optionName','Sender Email')).click();
                    cy.xpath('//div[@class="modal-content"]').should('be.visible');
                    cy.xpath('//div[@class="modal-content"]//div/input').clear().type(senderEmailTxt).should('have.value',senderEmailTxt).type(" ");
                    cy.xpath('//div[@class="modal-content"]//footer//button[contains(text(),"Save")]').click();
                    cy.xpath('//div[@role="alert"]').should('exist');
                    cy.xpath('//div[@role="alert"]').should('not.exist');
                    cy.xpath(optionColumnXpath.replace('optionColumn','Sender Email')).should('have.contain',senderEmailTxt);

                    //edit sender name
                    cy.xpath(optionConfigXpath.replace('optionName','Sender Name')).click();
                    cy.xpath('//div[@class="modal-content"]').should('be.visible');
                    cy.xpath('//div[@class="modal-content"]//div/input').clear().type(senderNameTxt);
                    cy.xpath('//div[@class="modal-content"]//footer//button[contains(text(),"Save")]').click();
                    cy.xpath('//div[@role="alert"]').should('exist');
                    cy.xpath('//div[@role="alert"]').should('not.exist');
                    cy.xpath(optionColumnXpath.replace('optionColumn','Sender Name')).should('have.contain',senderNameTxt);

                    //edit server host
                    cy.xpath(optionConfigXpath.replace('optionName','Server Host')).click();
                    cy.xpath('//div[@class="modal-content"]').should('be.visible');
                    cy.xpath('//div[@class="modal-content"]//div/input').clear().type(serverHostTxt);
                    cy.xpath('//div[@class="modal-content"]//footer//button[contains(text(),"Save")]').click();
                    cy.xpath('//div[@role="alert"]').should('exist');
                    cy.xpath('//div[@role="alert"]').should('not.exist');
                    cy.xpath(optionColumnXpath.replace('optionColumn','Server Host')).should('have.contain',serverHostTxt);

                    //edit server port
                    cy.xpath(optionColumnXpath.replace('optionColumn','Server Port')).invoke('text').then(($port)=>{
                        cy.log("port="+$port+"/");
                        if($port.trim() !== serverPortTxt){
                            cy.xpath(optionConfigXpath.replace('optionName','Server Port')).click();
                            cy.xpath('//div[@class="modal-content"]').should('be.visible');
                            cy.xpath('//div[@class="modal-content"]//div/input').clear().type(serverPortTxt);
                            cy.xpath('//div[@class="modal-content"]//footer//button[contains(text(),"Save")]').click();
                            cy.xpath('//div[@role="alert"]').should('exist');
                            cy.xpath('//div[@role="alert"]').should('not.exist');
                        }
                        cy.xpath(optionColumnXpath.replace('optionColumn','Server Port')).should('have.contain',serverPortTxt);
                    });

                    //edit server secure option
                    cy.xpath(optionColumnXpath.replace('optionColumn','Use secure connection')).invoke('text').then(($option)=>{
                        cy.log("port="+$option+"/");
                        if($option.trim() !== secureOption){
                            cy.xpath(optionConfigXpath.replace('optionName','Use secure connection')).click();
                            cy.xpath('//div[@class="modal-content"]').should('be.visible');
                            cy.xpath('//label[text()="'+secureOption+'"]').click();
                            cy.xpath('//div[@class="modal-content"]//footer//button[contains(text(),"Save")]').click();
                            cy.xpath('//div[@role="alert"]').should('exist');
                            cy.xpath('//div[@role="alert"]').should('not.exist');
                        }
                        cy.xpath(optionColumnXpath.replace('optionColumn','Use secure connection')).should('have.contain',secureOption);
                    });

                    //edit user account
                    cy.xpath(optionColumnXpath.replace('optionColumn','User Account')).invoke('text').then(($option)=>{
                        if($option.trim() !== userAccount){
                            cy.xpath(optionConfigXpath.replace('optionName','User Account')).click();
                            cy.xpath('//div[@class="modal-content"]').should('be.visible');
                            cy.xpath('//div[@class="modal-content"]//div/input').clear().type(userAccount);
                            cy.xpath('//div[@class="modal-content"]//footer//button[contains(text(),"Save")]').click();
                            cy.xpath('//div[@role="alert"]').should('exist');
                            cy.xpath('//div[@role="alert"]').should('not.exist');
                        }
                        cy.xpath(optionColumnXpath.replace('optionColumn','User Account')).should('have.contain',userAccount);
                    });

                    //edit password account
                    cy.xpath(optionConfigXpath.replace('optionName','User Password')).click();
                    cy.xpath('//div[@class="modal-content"]').should('be.visible');
                    cy.xpath('//div[@class="modal-content"]//div/input').clear().type(userAccountPass);
                    cy.xpath('//div[@class="modal-content"]//footer//button[contains(text(),"Save")]').click({force:true});
                    cy.xpath('//div[@role="alert"]').should('not.exist');
                }
            });
    }
    createSuperAdminUserAPI(payload){
        return cy.window().then(win => {
            return win.ProcessMaker.apiClient.put('/permissions', payload).then(response => {
                const user = response.data.data;
                //find(user => user.username === username);
                console.log('Got Existing User: ', user);
                return user;
            });
        });
    }

    obtainTokenByUserID(userID) {
        let urlApi = "/users/" + userID + "/tokens";
        return cy.window().then(win => {
            return win.ProcessMaker.apiClient.post(urlApi, {"name":"testQA"})
                .then((response) => {
                    console.log("token=" + response.data);
                    return response.data.accessToken;
                })
                .catch((err) => {
                     throw err;
                });
        });
    }
    /**
     * This method is responsible for return the format of timezone of the user logged
     * @return return timezone
     */
    async getFormatDate(){
        navHelper.navigateToProfile();
        cy.get('[id="firstname"]').should('be.visible');
        return (await promisify (cy.get('[id="datetime_format"]')
            .invoke('val').then((val) => {
                let timezone = val;
                timezone = timezone.split('(')[0];
                timezone = timezone.toUpperCase();
                cy.log("Time Zone is",val).then(() =>{
                    return timezone;
                })
            })));
    }
    /**
     * This method is responsible for change to fomrata of date the user created and write on the date picker
     * @param M: Month values 1-12
     * @param D: Day values 1-31
     * @param Y: Year values of four digits
     * @param H: Hour values od two digits
     * @param I: Minutes values od two digits
     * @param cadFormat: string with formta of timezone
     * @param datepicker: name of the datepicker
     * @param pos: position of the date picker
     * @return nothing to return
     */
    changeWriteTimeZone(M,D,Y,H,I,cadFormat,datepicker,pos=1){
        pos=pos-1;
        let timezone_format;
        let selectorDatePicker = '[data-cy="screen-field-'+datepicker+'"]>* input';
        timezone_format = cadFormat.replaceAll('M', M).replaceAll('D', D).replaceAll('Y', Y)
            .replaceAll('H', H).replaceAll('I', I);

        cy.get(selectorDatePicker).eq(pos)
            .click().then(($elem)=>{
            cy.wait(2000);
            cy.wrap($elem)
                .type(timezone_format)
                .type('{enter}')
                .type('{esc}');
        });
    }
    changeWriteDateZone(M,D,Y,H='00',I='00',cadFormat,datepicker,pos=1){
        pos=pos-1;
        let timezone_format;
        let selectorDatePicker = '[data-cy="screen-field-'+datepicker+'"]>* input';
        timezone_format = cadFormat.replaceAll('M', M).replaceAll('D', D).replaceAll('Y', Y)
            .replaceAll('H', H).replaceAll('I', I);

        cy.get(selectorDatePicker).eq(pos)
            .click().then(($elem)=>{
                cy.wait(2000);
                cy.wrap($elem)
                    .type(timezone_format)
                    .type('{enter}')
        });
    }

/**
     * This method is responsible to create a connection for IDP Server
     * @param serverIDPType: is the type of the configuration like: (client ID, client Secret, host URL, token)
     * @return nothing returns
     */

createIDPIfNotConfigured(serverIDPType){
    var ServerIDP = Cypress.env("defaultIDPSettings").hostURL;

    cy.get('[data-target="#collapseOne2"]').click();
    cy.xpath('//div[contains(text(),"IDP")]').should('be.visible');
    cy.xpath('//div[contains(text(),"IDP")]').click();
    cy.xpath('//*[@class="settings-listing data-table"]//div[contains(text(),"Host URL")]/ancestor::tr/td[@aria-colindex="2"]').invoke('text')
        .then(elem => {
            if(elem.trim() === ServerIDP){
                cy.log('IDP configuration exists: '+ serverIDPType);
            }else{
                var clientIDTxt = Cypress.env("defaultIDPSettings").clientID;
                var clientSecretTxt = Cypress.env("defaultIDPSettings").clientSecret;
                var hostURLTxt = Cypress.env("defaultIDPSettings").hostURL;
                var tokenURLTxt = Cypress.env("defaultIDPSettings").tokenURL;
                let optionConfigXpath = '//div[contains(text(),"optionName")]/ancestor::tr//button[@aria-label="Edit"]';
                let optionColumnXpath = '//div[contains(text(),"optionColumn")]/ancestor::tr/td[2]';


                //edit client ID
                cy.xpath(optionConfigXpath.replace('optionName','Client ID')).click();
                cy.xpath('//div[@class="modal-content"]').should('be.visible');
                cy.xpath('//div[@class="modal-content"]//div/input').clear().type(clientIDTxt).should('have.value',clientIDTxt).type(" ");
                cy.xpath('//div[@class="modal-content"]//footer//button[contains(text(),"Save")]').click();
                cy.xpath('//div[@role="alert"]').should('exist');
                cy.xpath('//div[@role="alert"]').should('not.exist');
                cy.xpath(optionColumnXpath.replace('optionColumn','Client ID')).should('have.contain',clientIDTxt);
           
                //edit Client Secret
                cy.xpath(optionConfigXpath.replace('optionName','Client Secret')).click();
                cy.xpath('//div[@class="modal-content"]').should('be.visible');
                cy.xpath('//div[@class="modal-content"]//div/input').clear().type(clientSecretTxt);
                cy.xpath('//div[@class="modal-content"]//footer//button[contains(text(),"Save")]').click({force:true});
                cy.xpath('//div[@role="alert"]').should('not.exist');


                //edit server host
                cy.xpath(optionConfigXpath.replace('optionName','Host URL')).click();
                cy.xpath('//div[@class="modal-content"]').should('be.visible');
                cy.xpath('//div[@class="modal-content"]//div/input').clear().type(hostURLTxt);
                cy.xpath('//div[@class="modal-content"]//footer//button[contains(text(),"Save")]').click();
                cy.xpath('//div[@role="alert"]').should('exist');
                cy.xpath('//div[@role="alert"]').should('not.exist');
                cy.xpath(optionColumnXpath.replace('optionColumn','Host URL')).should('have.contain',hostURLTxt);


                //edit token
                cy.xpath(optionConfigXpath.replace('optionName','Token URL')).click();
                cy.xpath('//div[@class="modal-content"]').should('be.visible');
                cy.xpath('//div[@class="modal-content"]//div/input').clear().type(tokenURLTxt).should('have.value',tokenURLTxt).type(" ");
                cy.xpath('//div[@class="modal-content"]//footer//button[contains(text(),"Save")]').click();
                cy.xpath('//div[@role="alert"]').should('exist');
                cy.xpath('//div[@role="alert"]').should('not.exist');
                cy.xpath(optionColumnXpath.replace('optionColumn','Token URL')).should('have.contain',tokenURLTxt);
                                
                }
           
                            
        });

        
}
 

            createRPAIfNotConfigured(serverRPAType){
                var ServerRPA = Cypress.env("defaultRPASettings").tenantID;
            
                cy.get('[data-target="#collapseOne2"]').click();
                cy.xpath('//div[contains(text(),"Robotic Process Automation")]').should('be.visible');
                cy.xpath('//div[contains(text(),"Robotic Process Automation")]').click();
                cy.xpath('//*[@class="settings-listing data-table"]//div[contains(text(),"Tenant ID")]/ancestor::tr/td[@aria-colindex="2"]').invoke('text')
                    .then(elem => {
                        if(elem.trim() === ServerRPA){
                            cy.log('RPA configuration exists: '+ serverRPAType);
                        }else{
                            var organizationName = Cypress.env("defaultRPASettings").organizationName;
                            var clientIDTxt = Cypress.env("defaultRPASettings").clientIDRPA;
                            var clientSecretTxt = Cypress.env("defaultRPASettings").clientSecretRPA;
                            var tenantIDTxt = Cypress.env("defaultRPASettings").tenantID; 
                            
                            let optionConfigXpath = '//div[contains(text(),"optionName")]/ancestor::tr//button[@aria-label="Edit"]';
                            let optionColumnXpath = '//div[contains(text(),"optionColumn")]/ancestor::tr/td[2]';
            
                            //edit organization name
                            cy.xpath(optionConfigXpath.replace('optionName','Organization Name')).click();
                            cy.xpath('//div[@class="modal-content"]').should('be.visible');
                            cy.xpath('//div[@class="modal-content"]//div/input').clear().type(organizationName).should('have.value',organizationName);
                            cy.xpath('//div[@class="modal-content"]//footer//button[contains(text(),"Save")]').click();
                            cy.xpath('//div[@role="alert"]').should('exist');
                            cy.xpath('//div[@role="alert"]').should('not.exist');
                            cy.xpath(optionColumnXpath.replace('optionColumn','Organization Name')).should('have.contain',organizationName);
                    
                            
                            //edit client ID
                            cy.xpath(optionConfigXpath.replace('optionName','Client ID')).click();
                            cy.xpath('//div[@class="modal-content"]').should('be.visible');
                            cy.xpath('//div[@class="modal-content"]//div/input').clear().type(clientIDTxt).should('have.value',clientIDTxt).type(" ",{force:true});
                            cy.xpath('//div[@class="modal-content"]//footer//button[contains(text(),"Save")]').click();
                            cy.xpath('//div[@role="alert"]').should('exist');
                            cy.xpath('//div[@role="alert"]').should('not.exist');
                            cy.xpath(optionColumnXpath.replace('optionColumn','Client ID')).should('have.contain',clientIDTxt);
                       
                            //edit Client Secret
                            cy.xpath(optionConfigXpath.replace('optionName','Client Secret')).click();
                            cy.xpath('//div[@class="modal-content"]').should('be.visible');
                            cy.xpath('//div[@class="modal-content"]//div/input').clear().type(clientSecretTxt);
                            cy.xpath('//div[@class="modal-content"]//footer//button[contains(text(),"Save")]').click({force:true});
                            cy.xpath('//div[@role="alert"]').should('not.exist');
            
            
                            //edit Tenant ID
                            cy.xpath(optionConfigXpath.replace('optionName','Tenant ID')).click();
                            cy.xpath('//div[@class="modal-content"]').should('be.visible');
                            cy.xpath('//div[@class="modal-content"]//div/input').clear().type(tenantIDTxt);
                            cy.xpath('//div[@class="modal-content"]//footer//button[contains(text(),"Save")]').click();
                            cy.xpath('//div[@role="alert"]').should('exist');
                            cy.xpath('//div[@role="alert"]').should('not.exist');
                            cy.xpath(optionColumnXpath.replace('optionColumn','Tenant ID')).should('have.contain',tenantIDTxt);
                   
                                  
}
        
                                 
                    });
     
                 
    }        

	assignSpecificPemrissionToUser(permission){
    	let permissionCategoryXPATH = '//button[contains(@data-target,"category")]';
		let permissionXPATH = '//div[@id="accordionPermissions"]//label[contains(text(),"permission")]/parent::div/input';

		cy.xpath(permissionCategoryXPATH.replace('category',permission.category)).click();
		cy.wait(2000);
		cy.xpath(permissionXPATH.replace('permission',permission.permission))
			.invoke('attr', 'value')
			.then($value=>{
				cy.xpath(permissionXPATH.replace('permission',permission.permission)).check($value,{force: true});
			});
	}

    assignAllPermissionToUser(permission){
    	let permissionCategoryXPATH = '//button[contains(@data-target,"category")]';
		let permissionXPATH = '//div[@id="accordionPermissions"]//label[contains(text(),"permission")]/parent::div/input';

		cy.xpath(permissionCategoryXPATH.replace('category',permission.category)).click();
		cy.wait(2000);
		cy.xpath(permissionXPATH.replace('permission',permission.permission))
			.invoke('attr', 'value')
			.then($value=>{
				cy.xpath(permissionXPATH.replace('permission',permission.permission)).check($value,{force: true});
			});
	}

    loadPage() {
        cy.wait(5000);
    }
    //Functions to Admin Settings tab
    waitPageAdminSettingsLoad(){
        cy.get(selectors.settigns_leftMenu).should('be.visible');
    }
    clickOnMenuOption(menu){
        cy.xpath(selectors.settigns_optionMenu.replace('optionMenu',menu)).first().click();
    }
    clickOnCategoryOption(category){
        cy.xpath(selectors.settigns_optionCategory.replace('optionCategory',category)).click({force:true});
    }
    closeCategoryOption(category,menu){
        let categoryXPATH = '//*[@id="menu"]//*[contains(@class,"menu-header")]/span[contains(text(),"category")]/ancestor::div[contains(@id,"heading")]';
        categoryXPATH = categoryXPATH.replace('category',category);
        cy.xpath(categoryXPATH).trigger('mouseover');
        cy.xpath(categoryXPATH).click();
        cy.xpath(selectors.settigns_optionMenu.replace('optionMenu',menu)).should('not.be.visible');
    }
    //Functions work with any category in Admin Settings Email, Integrations, Log-In
    searchCriteriaAdminSettings(value){
        let tdXPATH = '//*[@id="settings"]//table//tbody//tr[1]/td[1]/*[1]';
        cy.xpath(selectors.settigns_tbody).should('be.visible');
        cy.get(selectors.settigns_search).type(value)
            .should('have.value',value)
            .type('{enter}');
        cy.wait(5000);
        cy.xpath(tdXPATH.replace('value',value)).should('contain',value);
    }
    clearSearchAdminSettings(){
        cy.get(selectors.settigns_closeSearch).click();
        cy.wait(3000);
        cy.get(selectors.settigns_search).should('have.attr', 'placeholder')
            .and('contain', 'Search here');
    }
    mouseHover(option,button,message){
        let optionConfigXpath = '//table/tbody//div[contains(text(),"Option")]/ancestor::tr//button[contains(@aria-label,"Button")]/parent::span';
        let toolTipSelector = '[class="tooltip-inner"]';

        optionConfigXpath = optionConfigXpath.replace('Option',option).replace('Button',button);
        //cy.xpath(optionConfigXpath).trigger('mouseover').invoke('show');
        cy.xpath(optionConfigXpath).invoke('show');
        cy.get(toolTipSelector).should('have.value',message);
    }
    openLastMenuOfEmailCategory(){
        let menuXPATH = '//*[@aria-labelledby="headingOne1"]//*[contains(@class,"list-item")]';
        cy.xpath(menuXPATH).then(($list)=>{
            let Ar = [];
            for (let i=0; i<$list.length;i++){
                cy.wrap($list[i]).invoke('text')
                    .then(($sometext) =>{
                        Ar[i]=$sometext;
                        if(i===($list.length-1)){
                            let y = Array.from(Ar, (x) => x.trim().split(" ")[2]);
                            let z = y.sort(function(a, b){return a - b});
                            cy.xpath(menuXPATH+'[contains(text(),"Email Server '+z[(z.length-1)]+'")]').click();
                            cy.wait(2000);
                        }
                    });
            }
        });
    }
    clickNewMailDriver(){
        cy.xpath(selectors.connectorAndAddEmailServer)
            .should('be.visible')
            .click();
        cy.wait(3000);
    }
    deleteEmailServer(){
        cy.xpath(selectors.deleteEmail).click();
        cy.xpath('//button[contains(text(),"Confirm")]')
            .should('be.visible').click();
        cy.wait(4000);
    }
    checkSSOConnectionIfNotIsActive(sso){
        let checkXPATH = '//table/tbody//div[contains(text(),"sso")]/ancestor::tr//input[@type="checkbox"]';
        cy.xpath(checkXPATH.replace('sso',sso)).check({force:true});
    }
    uncheckSSOConnectionIfNotIsActive(sso){
        let checkXPATH = '//table/tbody//div[contains(text(),"sso")]/ancestor::tr//input[@type="checkbox"]';
        cy.xpath(checkXPATH.replace('sso',sso)).uncheck({force:true});
    }
}
