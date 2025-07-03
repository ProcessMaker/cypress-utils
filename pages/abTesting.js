import { NavigationHelper } from "#helpers/navigationHelper";
import selectors from "#selectors/abTesting";
import { Process } from "#pages/process";

const navHelper = new NavigationHelper();
const process = new Process();

export class ABTesting {
    //AB alternatives
    enableAlternativeB() {
        this.load();
        cy.iframe(selectors.iframeA).find(selectors.menuAB).invoke('text').then($text => {
            cy.log($text)
            if ($text.includes('Alternative B')) {
                return;
            } else {
                this.clickOnPlusBtn();
                this.clickOnConfirmEnableBtn({ force: true });
            }
        })
        this.load();
    }

    clickOnPlusBtn() {
        cy.iframe(selectors.iframeA).find(selectors.plusTab).should('be.visible');
        cy.iframe(selectors.iframeA).find(selectors.plusTab).click({ force: true, delay: 1000 });
    }

    clickOnConfirmEnableBtn() {
        cy.iframe(selectors.iframeA).find('[class="modal-content"]').should('be.visible');
        cy.wait(2000);
        cy.iframe(selectors.iframeA).find(selectors.confirmEnableBtn).should('be.visible');
        cy.iframe(selectors.iframeA).find(selectors.confirmEnableBtn).click({ force: true, delay: 1000 });
    }

    clickOnConfirmDeleteBtn() {
        cy.iframe(selectors.iframeA).find('[class="modal-content"]').should('be.visible');
        cy.wait(2000);
        cy.iframe(selectors.iframeA).find(selectors.confirmDeleteBtn).should('be.visible');
        cy.iframe(selectors.iframeA).find(selectors.confirmDeleteBtn).click({ force: true, delay: 1000 });
    }

    replaceAlternativeAWithDataOfAlternativeB(iframeOption) {
        this.clickOnAlternativeA(iframeOption);
        this.clickOnReplaceAlternative();
        this.load();
        
    }

    replaceAlternativeBWithDataOfAlternativeA(iframeOption) {
        this.clickOnAlternativeB(iframeOption);
        this.clickOnReplaceAlternative(iframeOption);
        this.load();
    }

    confirmReplaceAlternative(iframeOption = 'a'){
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).find(selectors.confirmReplaceAlt).click();
        this.load();
    }

    clickOnAlternativeA(iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).find(selectors.alternativeA_Tab).click({ force: true });
    }

    clickOnAlternativeB(iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).find(selectors.alternativeB_Tab).click();
    }

    clickOnReplaceAlternative(iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).find(selectors.replaceAlternativeBtn).first().click();
        this.confirmReplaceAlternative(iframeOption);
    }

    deleteAlternativeB() {
        cy.iframe(selectors.iframeA).find(selectors.deleteAltB_Btn).first().click();
        this.clickOnConfirmDeleteBtn();
    }

    deleteAlternativeB_ifExist() {
        cy.iframe(selectors.iframeA).find(selectors.menuAB).invoke('text').then($text => {
            if ($text.includes('Alternative B')) {
                this.deleteAlternativeB();
            }
        })
    }

    clickOnInspectorBtn(iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        
        // Cargar la página primero
        this.load();
        
        // Esperar a que el botón inspector esté listo
        cy.iframe(iframeSelector).find(selectors.menuInspectorBtn)
            .should('exist', { timeout: 15000 })
            .should('be.visible', { timeout: 10000 })
            .should('not.be.disabled', { timeout: 5000 })
            .click({ force: true, timeout: 10000 });
    }

    //Publish New Version
    publishNewVersion(option, iframeOption, alternative, version, description) {
        this.clickOnPublishBtn(iframeOption);
        this.load();
        switch (option) {
            case 'withoutAB':
                break;
            case 'onlySelectAlternative':
                this.selectAlternative(alternative, iframeOption);
                break;
            case 'versionDescriptionAndAlternative':
                this.fillVersion(version);
                this.fillDescription(description);
                this.selectAlternative(alternative, iframeOption);
                break;
            default:
                break;
        }
        this.clickOnPublishBtnInModal(iframeOption);
    }

    alert(iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).find('[.alert-wrapper > .alert]').should('be.visible');
    }
    //iframeOption could be "A" or "B"
    clickOnPublishBtn(iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).find(selectors.publishBtn).click({ force: true });
        cy.iframe(iframeSelector).find('[class="modal-dialog modal-lg modal-dialog-centered"]').should('be.visible');
    }

    saveLaunchPadModal(iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).find(selectors.modalLaunchpad).should('be.visible');
        cy.iframe(iframeSelector).find(selectors.labelLaunchpad).should('contain', 'Launchpad Settings')
        cy.iframe(iframeSelector).find(selectors.saveBtnInLaunchpadSettingModal).should('be.visible');
        cy.wait(3000);
        cy.iframe(iframeSelector).find(selectors.saveBtnInLaunchpadSettingModal).click({ force: true });
    }

    selectAlternativeA(iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).find(selectors.alternativeA_Btn).should('be.visible');
        cy.iframe(iframeSelector).find(selectors.alternativeA_Btn).click();
    }

    selectAlternativeB(iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).find(selectors.alternativeB_Btn).should('be.visible');
        cy.iframe(iframeSelector).find(selectors.alternativeB_Btn).click();
    }

    selectAlternativeAB(iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).find(selectors.alternativeAB_Btn).should('be.visible');
        cy.iframe(iframeSelector).find(selectors.alternativeAB_Btn).click();
    }

    clickOnPublishBtnInModal(iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).find(selectors.publishBtnInModal).click({ force: true });
    }

    clickOnSaveAndPublish(iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).find(selectors.saveAndPublish).click({ force: true });
    }

    selectAlternative(alternative, iframeOption) {
        switch (alternative) {
            case 'Alternative A':
                this.selectAlternativeA(iframeOption);
                break;
            case 'Alternative B':
                this.selectAlternativeB(iframeOption);
                break;
            case 'Alternative A+B':
                this.selectAlternativeAB(iframeOption);
                break;
            default:
                break;
        }
    }

    fillVersion(version) {
        cy.iframe(selectors.iframeA).find(selectors.version).click();
        cy.iframe(selectors.iframeA).find(selectors.version).type(version, { delay: 60 }).should('have.value', version);
    }

    fillDescription(description) {
        cy.iframe(selectors.iframeA).find(selectors.description).click();
        cy.iframe(selectors.iframeA).find(selectors.description).type(description, { delay: 60 }).should('have.value', description);
    }


    selectSimpleOrAdvanced(option, expression, iframeOption) {
        switch (option) {
            case 'simple':
                this.moveScrollbar();
                break;
            case 'advanced':
                this.clickOnAdvanced(iframeOption);
                this.fillExpression(expression, iframeOption);
                break;
            default:
                break;
        }
    }

    configureABsettingsFromModeler(option, expression, iframeOption) {
        this.clickOnPublishBtn(iframeOption);
        this.selectAlternative('Alternative A+B', iframeOption);
        cy.wait(1000);
        this.clickOnAbSettings(iframeOption);
        this.selectSimpleOrAdvanced(option, expression, iframeOption);
        this.clickOnSaveAndPublish(iframeOption);
    }

    clickOnAbSettings(iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).find(selectors.ABsettingsBtn).click();
    }

    moveScrollbar(iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).find(selectors.scrollBar).as('range').invoke('val', 25).trigger('change');
    }

    clickOnAdvanced(iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).find(selectors.advancedBtn).click();
    }

    fillExpression(expression, iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).find(selectors.expressionInput).click().clear().type(expression, { ðelay: 60 });
    }

    goToseeProcessABTestingConfiguration() {
        this.clickOnPublishBtn();
        this.selectAlternativeAB();
        this.clickOnAbSettings();
        cy.iframe(selectors.iframeA).find('[class="fas fa-cog px-2"]').click();
    }

    //AB Testing from configuration of process
    configureABsettingsFromProcessConfiguration(processName, option, expression) {
        navHelper.navigateToProcessPage();
        process.searchProcessAndSelectOptions(processName, "config");
        this.clickOnABTestingConfigurationTab();
        this.selectSimpleOrAdvanced(option, expression);
        this.clickOnSaveAndPublish();
    }

    clickOnABTestingConfigurationTab() {
        cy.get(selectors.ABTestingTab).click();
    }

    //Modeler elements
    clickOnAddBtn() {
        cy.iframe(selectors.iframeA).find(selectors.addBtn).click();
    }

    dragAndDropElementToPaper() {
        cy.iframe(selectors.iframeA).find(selectors.addBtn).click();
    }

    dragElement() {
        cy.iframe(selectors.iframeA).find(`[data-test="processmaker-modeler-start-event"]`).drag(`[data-test="paper"]`);
        const dataTransfer = new DataTransfer;
        cy.iframe(selectors.iframeA).find(`[data-test="processmaker-modeler-start-event"]`)
            .trigger('dragstart', { dataTransfer })
        cy.iframe(selectors.iframeA).find(`[data-test="paper"]`)
            .trigger('dragenter', { force: true })
            .trigger('dragover', { dataTransfer, force: true })
            .trigger('drop', { dataTransfer, force: true })
        cy.iframe(selectors.iframeA).find(`[data-test="processmaker-modeler-start-event"]`)
            .trigger('dragend')
    }

    waitUntilElementIsVisible(type, selectorXPath, maxAttempts = 10, attempts = 0) {
        if (attempts > maxAttempts) {
            throw new Error("Timed out waiting for report to be generated");
        }
        if (type === 'selector') {
            cy.wait(3000);
            cy.iframe(selectors.iframeA)
                .then($body => {
                    if ($body.find(selectorXPath).length <= 0) {
                        // Mejorar el reload con manejo de carga de página
                        cy.reload({ timeout: 30000 });
                        
                        // Esperar a que la página se cargue completamente después del reload
                        cy.url().should('not.include', 'about:blank', { timeout: 15000 });
                        cy.get('body').should('not.contain', 'Loading...', { timeout: 15000 });
                        
                        // Esperar a que el iframe esté listo después del reload
                        cy.iframe(selectors.iframeA).should('exist', { timeout: 30000 });
                        cy.wait(3000);
                        
                        this.waitUntilElementIsVisible(type, selectorXPath, maxAttempts, attempts + 1);
                    }
                })
        }
    }

    //Close modal Run test in AB testing
    closeModal(iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).find('[class="modal-content"]').find(selectors.closeModalPublish).click();
    }

    clickOnStartEvent(nameElement, iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        const elementLocator = '[data-type="processmaker.components.nodes.startEvent.Shape"]'
        cy.iframe(iframeSelector).find(elementLocator.replace('nameElem', nameElement)).first().should('be.visible').click({ force: true });
    }

    clickOnTask(nameElement, iframeOption = 'a'){
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB;
        
        // Enhanced wait for iframe to be loaded and modeler to be ready
        cy.iframe(iframeSelector).should('exist', { timeout: 45000 }); // Increased for high concurrency
        cy.wait(5000); // Increased wait for modeler stabilization
        
        // Check if modeler is fully loaded with multiple indicators
        cy.iframe(iframeSelector).find('[data-cy="inspector-button"]').should('exist', { timeout: 30000 });
        cy.iframe(iframeSelector).find('[data-test="paper"]').should('exist', { timeout: 20000 });
        
        // Wait for modeler to stabilize (avoid checking for loading elements that might persist)
        cy.wait(3000);
        
        // Normalize the task name for better matching
        const normalizedName = nameElement.trim();
        const normalizedNameLower = normalizedName.toLowerCase();
        
        // First, let's get all available tasks for better diagnosis
        cy.log(`=== DIAGNÓSTICO: Buscando tarea "${normalizedName}" en iframe ${iframeOption.toUpperCase()} ===`);
        
        cy.iframe(iframeSelector).find('[data-type="processmaker.components.nodes.task.Shape"]')
            .should('exist', { timeout: 15000 })
            .then($tasks => {
                const taskTexts = [];
                $tasks.each((i, task) => {
                    const text = Cypress.$(task).text().trim();
                    if (text) {
                        taskTexts.push(text);
                        cy.log(`Tarea disponible ${i + 1}: "${text}"`);
                    }
                });
                
                cy.log(`Total de tareas encontradas en iframe ${iframeOption.toUpperCase()}: ${taskTexts.length}`);
                
                // Check for exact matches first
                const exactMatches = taskTexts.filter(text => 
                    text === normalizedName || 
                    text.toLowerCase() === normalizedNameLower
                );
                
                if (exactMatches.length > 0) {
                    cy.log(`✓ Encontrada coincidencia exacta: "${exactMatches[0]}"`);
                } else {
                    // Check for partial matches
                    const partialMatches = taskTexts.filter(text => 
                        text.toLowerCase().includes(normalizedNameLower) ||
                        normalizedNameLower.includes(text.toLowerCase()) ||
                        text.toLowerCase().includes(normalizedName.split(' ')[0].toLowerCase()) ||
                        text.toLowerCase().includes(normalizedName.split(' ').pop().toLowerCase())
                    );
                    
                    if (partialMatches.length > 0) {
                        cy.log(`⚠ Encontradas coincidencias parciales: ${partialMatches.join(', ')}`);
                        cy.log(`Intentando usar la primera coincidencia parcial: "${partialMatches[0]}"`);
                        // Use the first partial match
                        this.clickOnTaskByText(partialMatches[0], iframeOption);
                        return;
                    } else {
                        // Try to find similar tasks by removing suffix (A/B)
                        const baseName = normalizedName.replace(/[AB]$/, ''); // Remove A or B suffix
                        const similarTasks = taskTexts.filter(text => {
                            const taskBaseName = text.replace(/[AB]$/, ''); // Remove A or B suffix
                            return taskBaseName.toLowerCase() === baseName.toLowerCase();
                        });
                        
                        if (similarTasks.length > 0) {
                            cy.log(`⚠ Encontradas tareas similares (sin sufijo A/B): ${similarTasks.join(', ')}`);
                            cy.log(`Intentando usar la primera tarea similar: "${similarTasks[0]}"`);
                            this.clickOnTaskByText(similarTasks[0], iframeOption);
                            return;
                        }
                        
                        // If still no matches, try the other iframe
                        const otherIframeOption = iframeOption === 'a' ? 'b' : 'a';
                        cy.log(`✗ No se encontraron coincidencias en iframe ${iframeOption.toUpperCase()}`);
                        cy.log(`Intentando buscar en iframe ${otherIframeOption.toUpperCase()}...`);
                        
                        // Try the other iframe
                        this.clickOnTaskInOtherIframe(normalizedName, otherIframeOption);
                        return;
                    }
                }
            });
        
        // If we reach here, we have exact matches, proceed with normal selector logic
        this.clickOnTaskByText(normalizedName, iframeOption);
    }

    /**
     * Método auxiliar para buscar la tarea en el otro iframe
     * @param {string} taskName - Nombre de la tarea a buscar
     * @param {string} iframeOption - Opción del iframe ('a' o 'b')
     */
    clickOnTaskInOtherIframe(taskName, iframeOption) {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB;
        
        cy.log(`=== BUSCANDO EN IFRAME ${iframeOption.toUpperCase()} ===`);
        
        // Check if the other iframe exists and has tasks
        cy.iframe(iframeSelector).should('exist', { timeout: 30000 });
        
        cy.iframe(iframeSelector).find('[data-type="processmaker.components.nodes.task.Shape"]')
            .should('exist', { timeout: 15000 })
            .then($tasks => {
                const taskTexts = [];
                $tasks.each((i, task) => {
                    const text = Cypress.$(task).text().trim();
                    if (text) {
                        taskTexts.push(text);
                        cy.log(`Tarea disponible en iframe ${iframeOption.toUpperCase()} ${i + 1}: "${text}"`);
                    }
                });
                
                cy.log(`Total de tareas en iframe ${iframeOption.toUpperCase()}: ${taskTexts.length}`);
                
                // Check for exact matches
                const exactMatches = taskTexts.filter(text => 
                    text === taskName || 
                    text.toLowerCase() === taskName.toLowerCase()
                );
                
                if (exactMatches.length > 0) {
                    cy.log(`✓ Encontrada coincidencia exacta en iframe ${iframeOption.toUpperCase()}: "${exactMatches[0]}"`);
                    this.clickOnTaskByText(exactMatches[0], iframeOption);
                    return;
                }
                
                // Check for partial matches
                const partialMatches = taskTexts.filter(text => 
                    text.toLowerCase().includes(taskName.toLowerCase()) ||
                    taskName.toLowerCase().includes(text.toLowerCase())
                );
                
                if (partialMatches.length > 0) {
                    cy.log(`⚠ Encontradas coincidencias parciales en iframe ${iframeOption.toUpperCase()}: ${partialMatches.join(', ')}`);
                    this.clickOnTaskByText(partialMatches[0], iframeOption);
                    return;
                }
                
                // If still no matches, throw error with all available tasks from both iframes
                cy.log(`✗ No se encontró la tarea "${taskName}" en ningún iframe`);
                
                // Get tasks from the original iframe for comparison
                const originalIframeOption = iframeOption === 'a' ? 'b' : 'a';
                const originalIframeSelector = originalIframeOption === 'a' ? selectors.iframeA : selectors.iframeB;
                
                cy.iframe(originalIframeSelector).find('[data-type="processmaker.components.nodes.task.Shape"]')
                    .then($originalTasks => {
                        const originalTaskTexts = [];
                        $originalTasks.each((i, task) => {
                            const text = Cypress.$(task).text().trim();
                            if (text) originalTaskTexts.push(text);
                        });
                        
                        // Use cy.fail() instead of throw for better Cypress error handling
                        cy.fail(`Task "${taskName}" not found in any iframe. Available tasks in iframe A: ${originalTaskTexts.join(', ')}, iframe B: ${taskTexts.join(', ')}`);
                    });
            });
    }

    /**
     * Método auxiliar mejorado para hacer clic en una tarea usando el texto exacto
     * @param {string} taskText - Texto exacto de la tarea
     * @param {string} iframeOption - Opción del iframe ('a' o 'b')
     */
    clickOnTaskByText(taskText, iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB;
        
        cy.log(`=== INTENTANDO HACER CLIC EN TAREA: "${taskText}" ===`);
        
        // Enhanced approach using jQuery and CSS selectors instead of XPath
        cy.iframe(iframeSelector).then($iframe => {
            // Wait for tasks to be available
            cy.wrap($iframe).find('[data-type="processmaker.components.nodes.task.Shape"]')
                .should('exist', { timeout: 30000 })
                .then($tasks => {
                    let foundTask = null;
                    let taskIndex = -1;
                    
                    // Search for the task by text content
                    $tasks.each((index, task) => {
                        const $task = Cypress.$(task);
                        const taskTextContent = $task.text().trim();
                        
                        cy.log(`Verificando tarea ${index + 1}: "${taskTextContent}"`);
                        
                        // Check for exact match
                        if (taskTextContent === taskText) {
                            foundTask = $task;
                            taskIndex = index;
                            cy.log(`✓ Coincidencia exacta encontrada en índice ${index + 1}`);
                            return false; // Break the loop
                        }
                        
                        // Check for case-insensitive match
                        if (taskTextContent.toLowerCase() === taskText.toLowerCase()) {
                            foundTask = $task;
                            taskIndex = index;
                            cy.log(`✓ Coincidencia (case-insensitive) encontrada en índice ${index + 1}`);
                            return false; // Break the loop
                        }
                        
                        // Check for contains match
                        if (taskTextContent.toLowerCase().includes(taskText.toLowerCase()) ||
                            taskText.toLowerCase().includes(taskTextContent.toLowerCase())) {
                            foundTask = $task;
                            taskIndex = index;
                            cy.log(`✓ Coincidencia parcial encontrada en índice ${index + 1}`);
                            return false; // Break the loop
                        }
                    });
                    
                    if (foundTask) {
                        cy.log(`Haciendo clic en tarea "${taskText}" (índice ${taskIndex + 1})`);
                        
                        // Use Cypress to click the found task
                        cy.wrap(foundTask)
                            .should('be.visible', { timeout: 15000 })
                            .should('not.be.disabled', { timeout: 10000 })
                            .click({ force: true, timeout: 20000 })
                            .then(() => {
                                cy.log(`✓ Éxito: Clic realizado en tarea "${taskText}"`);
                            });
                    } else {
                        // If not found, try alternative approach with CSS selectors
                        cy.log(`No se encontró la tarea "${taskText}" con el método principal, intentando método alternativo...`);
                        
                        // Alternative approach: search in child elements that contain text
                        cy.wrap($iframe).find('[data-type="processmaker.components.nodes.task.Shape"]')
                            .then($taskShapes => {
                                let foundTask = null;
                                
                                // Search through all task shapes and their child elements
                                $taskShapes.each((index, taskShape) => {
                                    const $taskShape = Cypress.$(taskShape);
                                    
                                    // Look for text in child elements (text elements, labels, etc.)
                                    const $textElements = $taskShape.find('text, tspan, .joint-label, [class*="label"], [class*="text"]');
                                    
                                    $textElements.each((textIndex, textElement) => {
                                        const textContent = Cypress.$(textElement).text().trim();
                                        cy.log(`Verificando texto en elemento hijo ${textIndex + 1}: "${textContent}"`);
                                        
                                        if (textContent === taskText || 
                                            textContent.toLowerCase() === taskText.toLowerCase() ||
                                            textContent.toLowerCase().includes(taskText.toLowerCase()) ||
                                            taskText.toLowerCase().includes(textContent.toLowerCase())) {
                                            foundTask = $taskShape;
                                            cy.log(`✓ Encontrada tarea con texto en elemento hijo: "${textContent}"`);
                                            return false; // Break the loop
                                        }
                                    });
                                    
                                    if (foundTask) {
                                        return false; // Break the outer loop
                                    }
                                });
                                
                                if (foundTask) {
                                    cy.log(`Haciendo clic en tarea encontrada con método alternativo`);
                                    cy.wrap(foundTask)
                                        .should('be.visible', { timeout: 15000 })
                                        .click({ force: true, timeout: 20000 })
                                        .then(() => {
                                            cy.log(`✓ Éxito: Clic realizado en tarea "${taskText}" (método alternativo)`);
                                        });
                                } else {
                                    // If still not found, try a more aggressive search
                                    cy.log(`Intentando búsqueda más agresiva...`);
                                    
                                    // Search for any element containing the text
                                    cy.wrap($iframe).find('*')
                                        .contains(taskText, { matchCase: false })
                                        .should('exist', { timeout: 10000 })
                                        .should('be.visible', { timeout: 10000 })
                                        .click({ force: true, timeout: 20000 })
                                        .then(() => {
                                            cy.log(`✓ Éxito: Clic realizado en tarea "${taskText}" (búsqueda agresiva)`);
                                        });
                                }
                            });
                        
                        // If the alternative method fails, Cypress will automatically throw an error
                        // and we can handle it in the calling method
                    }
                });
        });
    }

    clickOnEndEvent(nameElement, iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        const elementLocator = "//*[text()='nameElem']/ancestor::*[@data-type='processmaker.components.nodes.endEvent.Shape']"
        cy.iframe(iframeSelector).xpath(elementLocator.replace('nameElem', nameElement)).first().should('be.visible');
        cy.iframe(iframeSelector).xpath(elementLocator.replace('nameElem', nameElement)).first().click({ force: true });
    }

    deleteElement(iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).find(selectors.deleteIcon).should('be.visible');
        cy.iframe(iframeSelector).find(selectors.deleteIcon).click({ force: true });
    }

    discardChanges(iframeOption = 'a') {
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).xpath('//div[@data-cy="ellipsis-menu"]//button').should('be.visible').click({ force: true });
        cy.iframe(iframeSelector).contains('Discard Draft').click({ force: true });
        cy.iframe(iframeSelector).xpath(selectors.discardBtn).click({ force: true });
    }

    changeNameOfProcess(newName) {
        cy.get(selectors.nameInput).clear().type(newName).should('have.value', newName);
        cy.get(selectors.saveConfiguration).should('be.visible');
        cy.get(selectors.saveConfiguration).click();
        cy.get(selectors.confirmSaveConfiguration).should('be.visible');
        cy.get(selectors.confirmSaveConfiguration).click();
    }

    load() {
        // Espera inicial
        cy.wait(3000);
        
        // Esperar a que la página esté completamente cargada
        cy.get('body').should('not.contain', 'Loading...', { timeout: 15000 });
        
        // Esperar a que cualquier navegación se complete
        cy.url().should('not.include', 'about:blank', { timeout: 10000 });
        
        // Esperar a que el documento esté listo
        cy.document().should('have.property', 'readyState', 'complete', { timeout: 15000 });
        
        // Espera adicional para estabilizar
        cy.wait(2000);
    }

     /**
     * Opens a Web Entry in A/B testing environment.
     *
     * @param {string} iframeOption - The iframe option to select. Defaults to 'a'.
     * @param {boolean} isAuth - Determines if authentication is required before visiting the Web Entry URL. Defaults to false.
     * @param {string|null} name - The specific name of the Web Entry to select. If null, the first available Web Entry is selected. Defaults to null.
     */
    openWebEntryInABtesting(iframeOption = 'a', isAuth = false, name = null) {
        const iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB;

        // Select the Web Entry shape based on the provided name or the first available one
        const webEntryShape = cy.iframe(iframeSelector)
            .find('[data-type="processmaker.components.nodes.startEvent.Shape"]')
            .contains(name || 'Start Event')
            .should('be.visible');

        webEntryShape.click({ force: true });

        // Open the inspector and access the Web Entry URL
        cy.iframe(iframeSelector).xpath('//button[@data-cy="inspector-button"]')
            .should("be.visible").click();
        cy.iframe(iframeSelector).find("[id='accordion-button-webentry']").click();

        // Retrieve the Web Entry URL and handle authentication if necessary
        cy.iframe(iframeSelector).find("[id='webentry-entry-url']").invoke('val').then(urlValue => {
            if (!isAuth) {
                // Usar el método safeVisit para el logout
                this.safeVisit('/logout');
                
                // Verificar que estamos en la página de login
                cy.url().should('include', '/login', { timeout: 15000 });
                cy.title().should('eq', 'Login - ProcessMaker', { timeout: 10000 });
            }
            
            // Usar el método safeVisit para la URL del web entry
            if (urlValue && urlValue.trim() !== '') {
                this.safeVisit(urlValue);
            } else {
                cy.log('Advertencia: La URL del Web Entry está vacía o indefinida');
            }
        });
    }

    renameStartEventName(nameElement,newName,iframeOption = 'a'){
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        this.clickOnStartEvent(nameElement, iframeOption);
        cy.iframe(iframeSelector).xpath('//div[@id="collapse-inspector-accordion-start-event"]//input[@name="name"]').clear().type(newName);
    }

    remaneTaskName(nameElement,newName,taskType,iframeOption = 'a'){
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        
        // Use the improved clickOnTask method
        this.clickOnTask(nameElement, iframeOption);
        
        // Wait for inspector to be ready
        cy.wait(2000);
        
        // Enhanced approach: find the name input more flexibly
        cy.log(`Renombrando tarea "${nameElement}" a "${newName}" (tipo: ${taskType})`);
        
        // Wait for inspector to be fully loaded
        cy.iframe(iframeSelector).find('[data-cy="inspector-button"]').should('be.visible', { timeout: 15000 });
        
        // Enhanced approach: try to find and fill the name input with multiple strategies
        cy.iframe(iframeSelector).then($iframe => {
            // Strategy 1: Look for input with name="name"
            const $nameInput = $iframe.find('input[name="name"]');
            
            if ($nameInput.length > 0) {
                cy.log('Encontrado input con name="name", usando estrategia 1');
                cy.wrap($nameInput)
                    .should('be.visible', { timeout: 10000 })
                    .should('not.be.disabled', { timeout: 5000 })
                    .clear({ force: true })
                    .type(newName, { delay: 100, force: true })
                    .should('have.value', newName)
                    .then(() => {
                        cy.log(`✓ Éxito: Nombre cambiado a "${newName}" (estrategia 1)`);
                    });
            } else {
                // Strategy 2: Look for input in accordion sections
                const $accordionInput = $iframe.find('[id*="accordion"] input[type="text"]');
                
                if ($accordionInput.length > 0) {
                    cy.log('Encontrado input en acordeón, usando estrategia 2');
                    cy.wrap($accordionInput.first())
                        .should('be.visible', { timeout: 10000 })
                        .should('not.be.disabled', { timeout: 5000 })
                        .clear({ force: true })
                        .type(newName, { delay: 100, force: true })
                        .should('have.value', newName)
                        .then(() => {
                            cy.log(`✓ Éxito: Nombre cambiado a "${newName}" (estrategia 2)`);
                        });
                } else {
                    // Strategy 3: Look for any text input
                    const $textInput = $iframe.find('input[type="text"], input[type="input"]');
                    
                    if ($textInput.length > 0) {
                        cy.log('Encontrado input de texto, usando estrategia 3');
                        cy.wrap($textInput.first())
                            .should('be.visible', { timeout: 10000 })
                            .should('not.be.disabled', { timeout: 5000 })
                            .clear({ force: true })
                            .type(newName, { delay: 100, force: true })
                            .should('have.value', newName)
                            .then(() => {
                                cy.log(`✓ Éxito: Nombre cambiado a "${newName}" (estrategia 3)`);
                            });
                    } else {
                        // No input found, provide diagnostic information
                        cy.log('No se encontró ningún input de texto, proporcionando diagnóstico...');
                        
                        const inputInfo = [];
                        $iframe.find('input').each((i, input) => {
                            const $input = Cypress.$(input);
                            const type = $input.attr('type') || 'sin-tipo';
                            const name = $input.attr('name') || 'sin-nombre';
                            const id = $input.attr('id') || 'sin-id';
                            const placeholder = $input.attr('placeholder') || 'sin-placeholder';
                            inputInfo.push(`Input ${i + 1}: type="${type}", name="${name}", id="${id}", placeholder="${placeholder}"`);
                        });
                        
                        if (inputInfo.length === 0) {
                            cy.fail(`No se encontró ningún input en el inspector. Verifica que el inspector esté abierto y la tarea esté seleccionada.`);
                        } else {
                            cy.fail(`No se pudo encontrar el input de nombre. Inputs disponibles: ${inputInfo.join(', ')}`);
                        }
                    }
                }
            }
        });
    }

    goToEndPage(){
        cy.get(selectors.bodyPageInSummary).should('be.visible');
        cy.get(selectors.bodyPageInSummary)
        .click({ force: true })
        .type("{meta+downarrow}",{force:true});
    }

    /**
    * This method configures assignment rules for task control in the process modeler
    * @param elementName: element
    * @param assignmentConfig: type to assign rules like: User/Group, Previous Task Assignee, Requester Started, Process Variable,Rule Expression, Process Manager
    * for example:
    *   abTesting.verifyAssignmentRulesInTask({
            elementName: "Form task",
            assignmentType: "User/Groups",
            userGroup: 'Group1',
            variableName: "Groups",
            value: "value",
        });
    */

    configureAssignmentRulesInTask(assignmentConfig,iframeOption = 'a') {
        const { elementName, assignmentType, userGroup, variableName,value } = assignmentConfig
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        
        // Use the improved clickOnTask method instead of direct xpath
        this.clickOnTask(elementName, iframeOption);
        this.load();
        this.clickOnInspectorBtn(iframeOption);
        this.clickOnAssignmentRules(iframeOption);
        switch (assignmentType) {
            case 'Users/Groups':
                cy.iframe(iframeSelector).find(selectors.selectList).select('Users / Groups').should('have.value',"user_group");
                cy.iframe(iframeSelector).xpath(selectors.spinnerUserGroups).should('not.be.visible');
                this.selectUserOrGroup('Assigned Users/Groups',userGroup,iframeOption);
                break;
            case 'Previous Task Assignee':
                cy.iframe(iframeSelector).find(selectors.selectList).select('Previous Task Assignee').should('have.value',"previous_task_assignee");
                break;
            case 'Requester Started':
                cy.iframe(iframeSelector).find(selectors.selectList).select('Request Starter').should('have.value',"requester");
                break;
            case 'Process Variable':
                cy.iframe(iframeSelector).find(selectors.selectList).select('Process Variable').should('have.value',"process_variable");
                this.fillProcessVariable(variableName,value,iframeOption)
                break;
            case 'Rule Expression':
                cy.iframe(iframeSelector).find(selectors.selectList).select('Rule Expression').should('have.value',"rule_expression");
                this.selectUserOrGroup('Default Assignment',userGroup,iframeOption);
                break;
            case 'Process Manager':
                cy.iframe(iframeSelector).find(selectors.selectList).select('Process Manager').should('have.value',"process_manager");
                break;
            default:
                break;
            }
        this.publishNewVersion('withoutAB');
    }
    
    clickOnAssignmentRules(iframeOption = 'a'){
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).find(selectors.asssignmentRuleAcordion).first().should('be.visible');
        cy.iframe(iframeSelector).find(selectors.asssignmentRuleAcordion).first().click();
    }

    selectUserOrGroup(label,userGroup,iframeOption = 'a'){
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        const userGroupSelected = `//label[text()="${label}"]/parent::div//div[@class='multiselect__tags']//span`;
        this.load();
        cy.iframe(iframeSelector).xpath(userGroupSelected).invoke('text')
                .then($text => {
                    if (!$text.includes(userGroup)) {
                        cy.iframe(iframeSelector).xpath(`//label[text()="${label}"]/parent::div//div[@class="multiselect__tags"]`).should('be.visible');
                        cy.iframe(iframeSelector).xpath(`//label[text()="${label}"]/parent::div//div[@class="multiselect__tags"]`).click();
                        cy.iframe(iframeSelector).xpath(`//label[text()="${label}"]/parent::div//li/span[contains(text(),"No Data Available")]`)
                            .should('not.be.visible');
                        this.load();
                        cy.iframe(iframeSelector).xpath(`//label[text()="${label}"]/parent::div//input`).clear({force:true});
                        let len = (userGroup.length)-1;
                        cy.iframe(iframeSelector).xpath(`//label[text()="${label}"]/parent::div//input`).type(userGroup.substring(0,len),{delay:250}).should('have.value', userGroup.substring(0,len));
                        this.load();
                        cy.iframe(iframeSelector).xpath(`//label[text()="${label}"]/parent::div//input`).type(userGroup.charAt(len),{delay:300}).should('have.value', userGroup);
                        this.load();
                        cy.iframe(iframeSelector).xpath(`(//span[contains(text(),"userGroup")]/ancestor::div[@class="multiselect__content-wrapper"])[1]`.replace("userGroup",userGroup)).click();
                    }
                });
    }
    
    fillProcessVariable(variableName,value,iframeOption = 'a'){
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        switch (variableName) {
                case 'Users':
                    cy.iframe(iframeSelector).xpath(selectors.variableNameUsers).click();
                    cy.iframe(iframeSelector).xpath(selectors.variableNameUsers).type(value,{delay:80}).should('have.value',value);
                    break;
                case 'Groups':
                    cy.iframe(iframeSelector).xpath(selectors.variableNameGroups).click();
                    cy.iframe(iframeSelector).xpath(selectors.variableNameGroups).type(value,{delay:80}).should('have.value',value);
                    break;
                default:
                    break;
            }
    }

    loadSpinner(iframeOption = 'a'){
        let iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB
        cy.iframe(iframeSelector).find(selectors.spinner)
        .should("have.attr", "style", "display: none;");
    }

    /**
     * Método mejorado para esperar a que la página esté completamente cargada
     * Ayuda a prevenir errores "(page load)--waiting for new page to load--"
     */
    waitForPageLoad() {
        // Esperar a que el documento esté listo
        cy.document().should('have.property', 'readyState', 'complete', { timeout: 30000 });
        
        // Esperar a que cualquier navegación se complete
        cy.url().should('not.include', 'about:blank', { timeout: 20000 });
        
        // Esperar a que la página esté completamente cargada y estable
        cy.get('body').should('not.contain', 'Loading...', { timeout: 20000 });
        
        // Espera adicional para estabilizar
        cy.wait(3000);
    }

    /**
     * Método mejorado para manejar navegación con verificación de carga de página
     * @param {string} url - La URL a visitar
     * @param {Object} options - Opciones adicionales para cy.visit
     */
    safeVisit(url, options = {}) {
        const defaultOptions = {
            timeout: 30000,
            failOnStatusCode: false,
            ...options
        };
        
        cy.visit(url, defaultOptions);
        this.waitForPageLoad();
    }

    /**
     * Método para listar todas las tareas disponibles en el modelador
     * Útil para diagnóstico cuando no se encuentra una tarea específica
     * @param {string} iframeOption - Opción del iframe ('a' o 'b')
     */
    listAvailableTasks(iframeOption = 'a') {
        const iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB;
        
        cy.log('=== DIAGNÓSTICO: Listando tareas disponibles ===');
        
        cy.iframe(iframeSelector).find('[data-type="processmaker.components.nodes.task.Shape"]')
            .should('exist', { timeout: 15000 })
            .then($tasks => {
                const taskTexts = [];
                $tasks.each((i, task) => {
                    const text = Cypress.$(task).text().trim();
                    if (text) {
                        taskTexts.push(text);
                        cy.log(`Tarea ${i + 1}: "${text}"`);
                    }
                });
                
                if (taskTexts.length === 0) {
                    cy.log('No se encontraron tareas en el modelador');
                } else {
                    cy.log(`Total de tareas encontradas: ${taskTexts.length}`);
                    cy.log(`Tareas disponibles: ${taskTexts.join(', ')}`);
                }
            });
    }

    /**
     * Método mejorado para hacer clic en una tarea con diagnóstico automático
     * @param {string} nameElement - Nombre de la tarea a buscar
     * @param {string} iframeOption - Opción del iframe ('a' o 'b')
     */
    clickOnTaskWithDiagnostic(nameElement, iframeOption = 'a') {
        cy.log(`Intentando hacer clic en tarea: "${nameElement}"`);
        
        // Primero listar las tareas disponibles para diagnóstico
        this.listAvailableTasks(iframeOption);
        
        // Luego intentar hacer clic en la tarea
        this.clickOnTask(nameElement, iframeOption);
    }

    /**
     * Método para manejar variaciones comunes de nombres de tareas
     * @param {string} nameElement - Nombre de la tarea a buscar
     * @param {string} iframeOption - Opción del iframe ('a' o 'b')
     */
    clickOnTaskWithVariations(nameElement, iframeOption = 'a') {
        const variations = this.generateTaskNameVariations(nameElement);
        
        cy.log(`Intentando hacer clic en tarea con variaciones: "${nameElement}"`);
        cy.log(`Variaciones a probar: ${variations.join(', ')}`);
        
        // Try each variation until one works
        for (let i = 0; i < variations.length; i++) {
            const variation = variations[i];
            cy.log(`Probando variación ${i + 1}: "${variation}"`);
            
            try {
                this.clickOnTask(variation, iframeOption);
                cy.log(`✓ Éxito con variación: "${variation}"`);
                return; // Exit if successful
            } catch (error) {
                cy.log(`✗ Falló variación "${variation}": ${error.message}`);
                if (i === variations.length - 1) {
                    // Last variation failed, throw error
                    throw new Error(`All variations failed for task "${nameElement}". Tried: ${variations.join(', ')}`);
                }
            }
        }
    }

    /**
     * Genera variaciones comunes de nombres de tareas
     * @param {string} nameElement - Nombre original de la tarea
     * @returns {Array} Array de variaciones del nombre
     */
    generateTaskNameVariations(nameElement) {
        const variations = [];
        const normalized = nameElement.trim();
        
        // Add original name
        variations.push(normalized);
        
        // Common variations for "FormTask"
        if (normalized.toLowerCase() === 'formtask') {
            variations.push('Form Task');
            variations.push('Form task');
            variations.push('form task');
            variations.push('formtask');
            variations.push('FormTask');
            variations.push('FORM TASK');
        }
        
        // Common variations for "Form Task"
        if (normalized.toLowerCase() === 'form task') {
            variations.push('FormTask');
            variations.push('formtask');
            variations.push('Form task');
            variations.push('form task');
            variations.push('FORM TASK');
        }
        
        // Add space-separated variations
        if (!normalized.includes(' ')) {
            // If no spaces, try adding spaces between camelCase
            const withSpaces = normalized.replace(/([A-Z])/g, ' $1').trim();
            if (withSpaces !== normalized) {
                variations.push(withSpaces);
                variations.push(withSpaces.toLowerCase());
                variations.push(withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1).toLowerCase());
            }
        }
        
        // Add lowercase and uppercase variations
        variations.push(normalized.toLowerCase());
        variations.push(normalized.toUpperCase());
        variations.push(normalized.charAt(0).toUpperCase() + normalized.slice(1).toLowerCase());
        
        // Remove duplicates while preserving order
        return [...new Set(variations)];
    }

    /**
     * Método específico para manejar tareas con sufijos A/B
     * @param {string} baseTaskName - Nombre base de la tarea (sin sufijo A/B)
     * @param {string} iframeOption - Opción del iframe ('a' o 'b')
     */
    clickOnTaskWithSuffix(baseTaskName, iframeOption = 'a') {
        const normalizedBaseName = baseTaskName.trim();
        
        cy.log(`=== BUSCANDO TAREA CON SUFIJO: "${normalizedBaseName}" en iframe ${iframeOption.toUpperCase()} ===`);
        
        // Generate possible task names with A/B suffixes
        const possibleNames = [
            `${normalizedBaseName}A`,
            `${normalizedBaseName}B`,
            `${normalizedBaseName} A`,
            `${normalizedBaseName} B`,
            normalizedBaseName // Also try without suffix
        ];
        
        cy.log(`Nombres posibles a buscar: ${possibleNames.join(', ')}`);
        
        // Try each possible name
        for (let i = 0; i < possibleNames.length; i++) {
            const taskName = possibleNames[i];
            cy.log(`Probando nombre ${i + 1}: "${taskName}"`);
            
            try {
                this.clickOnTask(taskName, iframeOption);
                cy.log(`✓ Éxito con nombre: "${taskName}"`);
                return; // Exit if successful
            } catch (error) {
                cy.log(`✗ Falló nombre "${taskName}": ${error.message}`);
                if (i === possibleNames.length - 1) {
                    // Last name failed, try the other iframe
                    const otherIframeOption = iframeOption === 'a' ? 'b' : 'a';
                    cy.log(`Intentando en el otro iframe: ${otherIframeOption.toUpperCase()}`);
                    
                    for (let j = 0; j < possibleNames.length; j++) {
                        const otherTaskName = possibleNames[j];
                        try {
                            this.clickOnTask(otherTaskName, otherIframeOption);
                            cy.log(`✓ Éxito con nombre "${otherTaskName}" en iframe ${otherIframeOption.toUpperCase()}`);
                            return;
                        } catch (otherError) {
                            cy.log(`✗ Falló nombre "${otherTaskName}" en iframe ${otherIframeOption.toUpperCase()}: ${otherError.message}`);
                            if (j === possibleNames.length - 1) {
                                throw new Error(`Task "${normalizedBaseName}" not found with any suffix (A/B) in any iframe. Tried: ${possibleNames.join(', ')}`);
                            }
                        }
                    }
                }
            }
        }
    }

    /**
     * Método para listar todas las tareas disponibles en ambos iframes
     * @param {string} iframeOption - Opción del iframe ('a' o 'b')
     */
    listAllTasksInBothIframes() {
        cy.log('=== DIAGNÓSTICO COMPLETO: Listando tareas en ambos iframes ===');
        
        // List tasks in iframe A
        this.listAvailableTasks('a');
        
        // List tasks in iframe B
        this.listAvailableTasks('b');
        
        cy.log('=== FIN DEL DIAGNÓSTICO ===');
    }

    /**
     * Método para manejar errores cuando no se encuentra una tarea
     * @param {string} taskName - Nombre de la tarea que no se encontró
     * @param {string} iframeOption - Opción del iframe ('a' o 'b')
     */
    handleTaskNotFoundError(taskName, iframeOption = 'a') {
        cy.log(`=== ERROR: Tarea "${taskName}" no encontrada ===`);
        
        // List all available tasks for diagnosis
        this.listAllTasksInBothIframes();
        
        // Try to find similar tasks
        const normalizedTaskName = taskName.toLowerCase();
        cy.log(`Buscando tareas similares a "${taskName}"...`);
        
        // Check both iframes for similar tasks
        ['a', 'b'].forEach(iframe => {
            const iframeSelector = iframe === 'a' ? selectors.iframeA : selectors.iframeB;
            
            cy.iframe(iframeSelector).find('[data-type="processmaker.components.nodes.task.Shape"]')
                .then($tasks => {
                    const similarTasks = [];
                    $tasks.each((i, task) => {
                        const text = Cypress.$(task).text().trim();
                        if (text && (
                            text.toLowerCase().includes(normalizedTaskName) ||
                            normalizedTaskName.includes(text.toLowerCase()) ||
                            text.toLowerCase().includes(normalizedTaskName.split(' ')[0]) ||
                            text.toLowerCase().includes(normalizedTaskName.split(' ').pop())
                        )) {
                            similarTasks.push(text);
                        }
                    });
                    
                    if (similarTasks.length > 0) {
                        cy.log(`Tareas similares en iframe ${iframe.toUpperCase()}: ${similarTasks.join(', ')}`);
                    }
                });
        });
        
        // Use cy.fail() for proper Cypress error handling
        cy.fail(`Task "${taskName}" not found. Use listAllTasksInBothIframes() to see available tasks.`);
    }

    /**
     * Método para diagnosticar la estructura del DOM de las tareas
     * Útil para entender dónde está el texto en los elementos SVG
     * @param {string} iframeOption - Opción del iframe ('a' o 'b')
     */
    diagnoseTaskDOMStructure(iframeOption = 'a') {
        const iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB;
        
        cy.log(`=== DIAGNÓSTICO DE ESTRUCTURA DOM: IFRAME ${iframeOption.toUpperCase()} ===`);
        
        cy.iframe(iframeSelector).find('[data-type="processmaker.components.nodes.task.Shape"]')
            .should('exist', { timeout: 15000 })
            .then($taskShapes => {
                cy.log(`Total de tareas encontradas: ${$taskShapes.length}`);
                
                $taskShapes.each((index, taskShape) => {
                    const $taskShape = Cypress.$(taskShape);
                    const taskId = $taskShape.attr('id') || `task-${index + 1}`;
                    
                    cy.log(`\n--- TAREA ${index + 1} (ID: ${taskId}) ---`);
                    
                    // Get the main task text
                    const mainText = $taskShape.text().trim();
                    cy.log(`Texto principal: "${mainText}"`);
                    
                    // Look for text in child elements
                    const $textElements = $taskShape.find('text, tspan, .joint-label, [class*="label"], [class*="text"]');
                    cy.log(`Elementos de texto encontrados: ${$textElements.length}`);
                    
                    $textElements.each((textIndex, textElement) => {
                        const $textElement = Cypress.$(textElement);
                        const textContent = $textElement.text().trim();
                        const elementTag = $textElement.prop('tagName').toLowerCase();
                        const elementClass = $textElement.attr('class') || 'sin-clase';
                        
                        if (textContent) {
                            cy.log(`  Elemento ${textIndex + 1}: <${elementTag} class="${elementClass}"> "${textContent}"`);
                        }
                    });
                    
                    // Look for any other elements that might contain text
                    const $allChildren = $taskShape.find('*');
                    cy.log(`Total de elementos hijos: ${$allChildren.length}`);
                    
                    // Check for elements with text content that might not be text elements
                    $allChildren.each((childIndex, childElement) => {
                        const $child = Cypress.$(childElement);
                        const childText = $child.text().trim();
                        const childTag = $child.prop('tagName').toLowerCase();
                        const childClass = $child.attr('class') || 'sin-clase';
                        
                        if (childText && childText !== mainText && childText.length > 0) {
                            cy.log(`  Hijo con texto: <${childTag} class="${childClass}"> "${childText}"`);
                        }
                    });
                });
            });
        
        cy.log(`=== FIN DEL DIAGNÓSTICO DOM ===`);
    }

    /**
     * Método para diagnosticar la estructura del inspector
     * Útil para entender dónde están los inputs de nombre y otros elementos
     * @param {string} iframeOption - Opción del iframe ('a' o 'b')
     */
    diagnoseInspectorStructure(iframeOption = 'a') {
        const iframeSelector = iframeOption === 'a' ? selectors.iframeA : selectors.iframeB;
        
        cy.log(`=== DIAGNÓSTICO DE ESTRUCTURA DEL INSPECTOR: IFRAME ${iframeOption.toUpperCase()} ===`);
        
        // Wait for inspector to be available
        cy.iframe(iframeSelector).find('[data-cy="inspector-button"]').should('be.visible', { timeout: 15000 });
        
        // Click on inspector if not already open
        cy.iframe(iframeSelector).find('[data-cy="inspector-button"]').click();
        
        cy.wait(2000);
        
        // Find all inputs in the inspector
        cy.iframe(iframeSelector).find('input').then($inputs => {
            cy.log(`Total de inputs encontrados en el inspector: ${$inputs.length}`);
            
            $inputs.each((index, input) => {
                const $input = Cypress.$(input);
                const type = $input.attr('type') || 'sin-tipo';
                const name = $input.attr('name') || 'sin-nombre';
                const id = $input.attr('id') || 'sin-id';
                const placeholder = $input.attr('placeholder') || 'sin-placeholder';
                const value = $input.attr('value') || 'sin-valor';
                const className = $input.attr('class') || 'sin-clase';
                
                cy.log(`Input ${index + 1}:`);
                cy.log(`  - type: "${type}"`);
                cy.log(`  - name: "${name}"`);
                cy.log(`  - id: "${id}"`);
                cy.log(`  - placeholder: "${placeholder}"`);
                cy.log(`  - value: "${value}"`);
                cy.log(`  - class: "${className}"`);
            });
        });
        
        // Find all accordion sections
        cy.iframe(iframeSelector).find('[id*="accordion"]').then($accordions => {
            cy.log(`\nTotal de secciones de acordeón encontradas: ${$accordions.length}`);
            
            $accordions.each((index, accordion) => {
                const $accordion = Cypress.$(accordion);
                const accordionId = $accordion.attr('id') || 'sin-id';
                const accordionClass = $accordion.attr('class') || 'sin-clase';
                
                cy.log(`Acordeón ${index + 1}:`);
                cy.log(`  - id: "${accordionId}"`);
                cy.log(`  - class: "${accordionClass}"`);
                
                // Look for inputs within this accordion
                const $accordionInputs = $accordion.find('input');
                cy.log(`  - inputs dentro del acordeón: ${$accordionInputs.length}`);
                
                $accordionInputs.each((inputIndex, accordionInput) => {
                    const $accordionInput = Cypress.$(accordionInput);
                    const inputName = $accordionInput.attr('name') || 'sin-nombre';
                    const inputType = $accordionInput.attr('type') || 'sin-tipo';
                    
                    cy.log(`    Input ${inputIndex + 1}: name="${inputName}", type="${inputType}"`);
                });
            });
        });
        
        // Find all labels that might be related to name inputs
        cy.iframe(iframeSelector).find('label').then($labels => {
            cy.log(`\nTotal de labels encontrados: ${$labels.length}`);
            
            $labels.each((index, label) => {
                const $label = Cypress.$(label);
                const labelText = $label.text().trim();
                const labelFor = $label.attr('for') || 'sin-for';
                
                if (labelText.toLowerCase().includes('name') || labelText.toLowerCase().includes('nombre')) {
                    cy.log(`Label ${index + 1}: text="${labelText}", for="${labelFor}"`);
                }
            });
        });
        
        cy.log(`=== FIN DEL DIAGNÓSTICO DEL INSPECTOR ===`);
    }
}
