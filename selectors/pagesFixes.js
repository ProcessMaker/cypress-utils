export default {
    undoBtn: '//button[contains(text(),"Undo")]',
    redoBtn: '//button[contains(text(),"Redo")]',
    calcsBtn: '//button[contains(text(),"Calcs")]',
    dropdownMenuBtn: '[data-test="page-dropdown"]',
    createPageBtn: '[data-test="add-page"]',
    seeAllPageBtn: '[data-test="see-all-pages"]',
    searchPages: '[data-test="search"]',
    editBtn: '//div[@class="border rounded-lg sortable-item-action"]//i[@class="fas fa-edit"]//parent::button',
    deleteBtn: '//div[@class="border rounded-lg sortable-item-action"]//i[@class="fas fa-trash-alt"]//parent::button',
    editPageName: '//div[@class="rounded sortable-item-name"]//input',
    pageNameInput: '[data-cy="add-page-name"]',
    saveBtn: '//button[contains(text(),"SAVE")]',
    addPageInModal: '//i[@class="fa fa-plus"]//parent::button',
    confirmEditBtn: '//button[contains(text(),"DONE")]',
    confirmDeleteBtn: '//div[contains(text(),"Delete")]//parent::button',
    closeModalBtn:'button[aria-label="Close"]'
}