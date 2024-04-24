export default {
    bellIcon: "//li[@id='navbar-notifications-button']",
    dismissAllBtn:
        "//div[@class='notification-popover']/footer/button[text()='Dismiss All']",
    badgeInfo: "//div[@id='notificationMenu']//span[@id='info-large']",
    notificationFrame: "//div[@class='notification-popover']",
    trashNotificationBtn:
        "//div[@class='popover-body']//button[@title='Dismiss Alert']",
    notificationList: "//div[@class='popover-body']//ul/li",
    searchBox: "//input[@id='search-box']",
    notificationTableRow: "//div[@class='data-table']//tbody/tr",
    //notificationBadge: "//div[@id='notificationMenu']//button",
    //new selector
    inboxTab:
        "//div[@class='notification-popover']//div[@class='tabs']//a[contains(text(),'Inbox')]",
    inboxTabCounter:
        "//div[@class='notification-popover']//div[@class='tabs']//a[contains(text(),'Inbox')]//preceding-sibling::span",
    notificationTab:
        "//div[@class='notification-popover']//div[@class='tabs']//a[contains(text(),'Notifications')]",
    notificationTabCounter:
        "//div[@class='notification-popover']//div[@class='tabs']//a[contains(text(),'Notifications')]//preceding-sibling::span",
    commentsTab:
        "//div[@class='notification-popover']//div[@class='tabs']//a[contains(text(),'Comments')]",
    commentsTabCounter:
        "//div[@class='notification-popover']//div[@class='tabs']//a[contains(text(),'Comments')]//preceding-sibling::span",
    notificationLists:
        "//div[@class='notification-popover']/div[starts-with(@title,'/tasks/')]",
    generalCount:
        "//button[@id='notification-menu-button']//span[@class='message-count']",
    selectMessageNotification:
        "//div[@class='notification-popover']//div[contains(@title,'/type/')]//div[@class='message-title']",
    openAllNotifications:
        "//div[@class='notification-popover']//a[@href='/notifications']",
    commentsBtnModeler:
        "//div[@aria-label='Toolbar']//button/span[text()='Comments']",
    commentsBtn: '//button[@id="comments-tab"]',
    textareaCommentsModeler:
        "//div[@class='pan-comment-designer']//div[@class='pan-cmt-box']//textarea",
    textareaComments:
        '//div[@id="comments"]//div[@class="mentionable"]//textarea',
    commentsActionsModeler:
        "//div[@class='pan-comment-designer']//div[@class='pan-cmt-bar2']/button[text()='option']",
    commentsActions:
        "//div[@id='comments']//div[@class='pan-cmt-bar2']/button[text()='option']",
    closeCommentsModeler:
        "//div[@class='pan-comment-designer']//button[@class='pan-cmt-bar-button']",
    closeComments:
        "//div[@class='pan-comment-request']//button[@class='pan-cmt-bar-button']",
};
