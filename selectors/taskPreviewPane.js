export default {
    taskFilter: '//span[text()="Status"]/ancestor::th/div[".pm-table-filter-button"]/div/button',
    applyFilterButton: '//button[contains(text(),"Apply")]',
    eyeTaskPreview: "//a[contains(text(),'task')]/ancestor::tr/td/div['.pm-task-row-buttons']/div['.pm-floating-buttons']",
    eyeButton: '//a[contains(text(),"task")]/ancestor::tr/td/div[".pm-task-row-buttons"]/div[".pm-floating-buttons"]/span/button["#openPreviewButton0"]',
    inProgressRemoveElement:'//span[text()="In Progress"]/ancestor::span/i[@aria-label="Remove Element"]',
    taskFilterStatus: '//input[@id="process_status_options_filter"]',
    labelSelected: "//div/span/span[contains(text(),'label')]"
}
    