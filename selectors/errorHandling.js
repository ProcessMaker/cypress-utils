export default {
    errorHandlingAccordionTitleDataConnector:
        "//div[@name='data-source-task-service']//div[@label='Error Handling']",
    errorHandlingAccordionTitleScript:
        "//div[@name='Script Task']//div[@label='Error Handling']",
    titleErrorHandlingAccordion:
        "//div[@aria-label='Error Handling']/button/span",
    timeoutLabelAccordion:
        "//div[@aria-label='Error Handling']//label[@for='timeout']",
    timeOutFieldAccordion:
        "//div[@label='Error Handling']//input[@id='timeout']",
    dataConnectorElement:
        "//*[text()='dataConnectorName']/ancestor::*[@data-type='processmaker.components.nodes.task.Shape']",
    inspectorButton: "//button[@data-cy='inspector-button']",
    retryAttemptsLabelAccordion:
        "//div[@aria-label='Error Handling']//label[@for='retry_attempts']",
    retryAttemptsAccordion:
        "//div[@label='Error Handling']//input[@id='retry_attempts']",
    retryWaitTimeLabelAccordion:
        "//div[@aria-label='Error Handling']//label[@for='retry_wait_time']",
    retryWaitTimeAccordion:
        "//div[@label='Error Handling']//input[@id='retry_wait_time']",
    notificationLabelAccordion:
        "//div[@aria-label='Error Handling']//label[text()='Notify Process Manager']",
    inAppCheckboxAccordionDataConnector:
        "//div[@name='data-source-task-service']//input[@id='switch_inapp']",
    inAppCheckboxAccordionScriptTask:
        "//div[@name='Script Task']//input[@id='switch_inapp']",
    inAppLabelAccordion:
        "//div[@aria-label='Error Handling']//label[@for='switch_inapp']",
    inAppLabelAccordionScriptTask:
        "//div[@aria-label='Script Task']//label[@for='switch_inapp']",
    emailCheckboxAccordion:
        "//div[@name='data-source-task-service']//input[@id='switch_email']",
    emailCheckboxAccordionScriptTask:
        "//div[@name='Script Task']//input[@id='switch_email']",
    emailLabelAccordion:
        "//div[@aria-label='Error Handling']//label[@for='switch_email']",
    //emailLabelAccordionScriptTask:
    //   "//div[@aria-label='Error Handling']//label[@for='switch_email']",
    smallLabelAccordion: "//div[@aria-label='Error Handling']//small",
    scriptTitle: "//fieldset//legend",
    scriptTimeout:"//label[contains(text(),'Timeout')]",
    scriptRetryAtetmpsTitle:"//label[contains(text(),'Retry Attempts')]",
    scriptRetryWaitTimeTitle:"//label[contains(text(),'Retry Wait Time')]",
    scriptTimeoutInput:"//input[@id='inputTimeout']",
    scriptRetryAtetmpsInput:"//input[@id='inputRetryAttempts']",
    scriptRetryWaitTimeInput:"//input[@id='inputRetryWaitTime']",
    scriptInput: "//fieldset//legend/following-sibling::div//input",
    scriptMessage: "//*[contains(text(),'message')]",
    notificationBell: "//li[@id='navbar-notifications-button']//button//span",
    errorTitleTask: '[id="details"] ul div[class="card-header text-status canceled-style"] span',
    rollbackBtn:
        "//div[@id='details']//ul/li/p[text()='Rollback Request']/following-sibling::button",
    rollbackModal: "div[class^='modal-dialog'] div[class='modal-content']",
    rollbackModalTitle: "div[class^='modal-dialog'] div[class='modal-content'] > header > h5",
    rollbackModalbody: "div[class^='modal-dialog'] div[class='modal-content'] > div[class='modal-body'] > div",
    rollbackModalFooterButtons: "div[class^='modal-dialog'] div[class='modal-content'] > footer > button",
};
