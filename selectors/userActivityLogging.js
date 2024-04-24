export default {
    userActivityLoggingLabel: "//b[contains(text(),'element')]",
    userActivityLoggingSpan: "//span[contains(text(),'element')]",
    userActivityLoggingHref: "//a[contains(text(),'element')]",
    securityLog:"(//span[contains(text(),'log')]/ancestor::tr/td[@class='vuetable-slot']/span/button)[1]",
    userLineEllipsis: '//span[text()="admin"]/ancestor::tr/td/div//button/i',
    securityLogsMenu: '//a[text()="Security Logs"]',
    processNameConfirmation: "//span[contains(text(), 'process')]",
    requestIdConfirmation: '(//ol/li/a)[3]',
 };
 