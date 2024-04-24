export default {
    overviewTabXpath:
        '//div[@id="request"]//ul[@id="requestTab"]//a[@id="overview-tab"]',
    tooltipXpath: '//div[@data-test="body-container"]//div[@id="tooltip"]',
    titleProcessMapXpath: '//div[@id="overview"]//h4',
    iframeProcessMapXpath: '//div[@id="overview"]//iframe',
    mapLegendXpath: '//div[@id="map-legend"]',
    zoomBoxXpath: '//div[@class="zoom-box"]',
    zoomInXpath: '//button[@data-cy="zoom-in-control"]',
    zoomOutXpath: '//button[@data-cy="zoom-out-control"]',
    zoomResetXpath: '//button[@data-cy="zoom-reset-control"]',
    taskBpmnXpath:
        "//*[text()='bpmnTask']/ancestor::*[@data-type='processmaker.components.nodes.task.Shape']",
    flowBpmnXpath:
        "//*[text()='lineName']/ancestor::*[@data-type='standard.Link']",
    colorLineTask:
        "//*[text()='bpmnTask']/ancestor::*[@data-type='processmaker.components.nodes.task.Shape']/*[name()='path']",
    colorFlowXpath:
        "//*[text()='lineName']/ancestor::*[@data-type='standard.Link']/*[name()='path']",
};
