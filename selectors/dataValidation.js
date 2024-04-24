export default {
    toggleDataVisualizationInTask:
        "//div[@id='tabContent']//input[@id='show_tree']",
    containerToggleInTask:
        "//div[@id='tabContent']//div[@class='flex-container']",
    toggleDataVisualizationInDataConnector: "//input[@id='show_tree']",
    containerToggleInDataConnector: "//div[@class='flex-container']",
    jsonViewDataConnector: "//div[@class='editor']",
    dataPreviewBtnScreenPreview: "//button[@data-toggle='collapse']/button /i",
    headerPanelScreenPreview: "//div[@id='data-preview']//header/h5",
    firstLinesMonacoScreenPreview:
        "//div[@id='data-preview___BV_modal_body_']//div[@class='view-lines monaco-mouse-cursor-text']/div",
    panelContainerScreePreview:
        "//div[@id='data-preview']//div[@id='data-preview___BV_modal_body_']",
    countPanelScreenPreview:
        "//div[@id='data-preview']//div[@id='data-preview___BV_modal_body_']//div[@class='col-6']",
    iframeDataVisualization: "iframe[data-cy='treeViewFrame']",
    scriptConfigurationBtnScriptTask:
        "button[aria-controls='tree-view-sidebar']",
    panelDataVisualizationScriptTask: "[class='b-sidebar-body']",
    toggleScriptTask: "//div[@class='sidebar-header']//input[@id='tree_view']",
    panelDataVisualizationScrip: "//div[@aria-controls='output']//button",
};
