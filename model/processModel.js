import { ProcessV1 } from "../pages/processV1"; 
const processPage = new ProcessV1()

export class ProcessModel {
    /**
     * Publishes a process with optional version data
     * @param {Object} processData = {"versionName":"test qa", "versionDescription": "this is a description"} - Object containing versionName and versionDescription
     * @param {number} onlySaved - Flag to determine if only saved data should be used (1 = true, other = false)
     */
    publishProcess(processData = {}, onlySaved = 1){
        processPage.pressPublishButton()
        processPage.publishVersionModalIsVisible()

        if(onlySaved != 1){
            processPage.addModalVersionName(processData.versionName)
            processPage.addModalDescription(processData.versionDescription)
        }
        processPage.pressModalPublishButton()
    }

    /**
     * Opens a process by its ID and alternative version
     * @param {string} processID - The unique identifier of the process
     * @param {string} alternative - The alternative version to open (default: "A")
     */
    openProcessByIdAndAlternative(processID, alternative="A"){
        processPage.openProcessByIdAndAlternative(processID, alternative)
    }

    /**
     * Opens the inspector button to view process details
     */
    openInspectorButton(){
        processPage.openInspectorButton()
    }

    /**
     * Selects a specific task within the process modeler
     * @param {string} taskName - The name of the task to select
     */
    selectTaskInsideModeler(taskName){
        processPage.selectTaskInsideModeler(taskName)
    }

    /**
     * Discards a draft by selecting the appropriate option from the ellipsis menu
     * @param {string} option - The option to select from the ellipsis menu
     */
    selectDiscardDraftOptionEllipsis(option){
        processPage.pressOptionEllipsis()
        processPage.selectOptionEllipsis(option)
        processPage.pressDiscardButtonModal()
    }

}