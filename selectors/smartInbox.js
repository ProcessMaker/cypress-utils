export default {
    //Smart Inbox Priority and Drafts
    inboxTab: '[id="inbox-tab"]',
    priorityTab: '[id="priority-tab"]',
    draftsTab: '[id="drafts-tab"]',

    loadingSpinnerTask:
        "#inbox > div > div.data-table > div:nth-child(1) > div.jumbotron.jumbotron-fluid",
    searchTask: 'textarea[aria-label="Advanced Search (PMQL)"]',
    inboxRulesBtn: 'div[id="search-bar"] button[id="idPopoverInboxRules"]',
    inboxRuleTable: '[role="tabpanel"][aria-hidden="false"] table',
    rulesTab:
        '//div[@id="inbox-rules"]//ul[@role="tablist"]//li/a[text()="Rules"]',
    executionLogTab:
        '//div[@id="inbox-rules"]//ul[@role="tablist"]//li/a[text()="Execution Log"]',
    createRuleBtn:
        '//img[@alt="Create Rule"]/ancestor::button[contains(text(),"Create Rule")]',
    optionNroBtn: '[id="inbox-rules"] [class="pm-panel-wch filters"] button',
    optionSaveSearch: '[id="inbox-rules"] [class="pm-panel-wch filters"] ul[role="menu"] li',
    pagination: '[class="pagination"]',
    ruleNameField: 'input[placeholder="Enter your name"]',
    desactivationDateField: 'input[placeholder="YYYY-MM-DD"]',
    saveBtnRuleConfiguration: 'fieldset button[class="btn btn-primary"]',
    cancelBtnRuleConfiguration: 'fieldset button[class="btn btn-secondary"]',
    messageCreateRule: ".alert-success > span",
    modalCreateRule: '[class="modal-content"]',
    closeBtnModalCreateRule: ".modal-content .modal-header > button",
    searchInboxRule: 'textarea[placeholder="Search here"]',
    totalPaginationInboxRule: 'span[class="pagination-total"]',
    rowTableInboxRule: 'div[role="tabpanel"][aria-hidden="false"] table tbody tr',
    actionInboxRule: 'div[data-cy="inboxRulesRowButtons0"] button img[alt="selectOption"]',
    confirmActionInboxRule: 'div[class="popover-body"] div[class="col"] button',
    clearDraftBtn: '//div[@id="details"]//button[contains(text(),"Clear Draft")]',
    tasksTable: '//*[@data-cy="tasks-table"]',
    tableRow: '//tbody//tr',
    tableCell: '//table//td',
    jumbotron: '[class="jumbotron jumbotron-fluid"]',
    priorityImage: '[alt="priority"]',
    noPriorityImage: '[alt="no-priority"]',
    newInboxRuleTitle: '[id="inbox-rules"] h4',
    tableBodyRow: 'tbody tr',
    tableCellSpan: 'td span'
};
