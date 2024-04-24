import selectors from "#selectors/notification";

export class Notification {
    /**
     * This method is responsible to open the notifications when 'bell' icon is pressed
     * @param none
     * @return nothing returns
     */
    openFrameNotification() {
        cy.xpath(selectors.bellIcon).as("bell").should("be.visible");
        cy.get("@bell").click();
        cy.get("@bell")
            .find("button")
            .should("have.attr", "aria-expanded", "true");
    }

    /**
     * This method is responsible to press 'Inbox' tab inside of Notification frame
     * @param none
     * @return nothing returns
     */
    pressInboxTab() {
        cy.xpath(selectors.inboxTab).should("be.visible");
        cy.xpath(selectors.inboxTab).click();
    }

    /**
     * This method is responsible to press 'Notifications' tab inside of Notification frame
     * @param none
     * @return nothing returns
     */
    pressNotificationsTab() {
        cy.xpath(selectors.notificationTab).should("be.visible");
        cy.xpath(selectors.notificationTab).click();
    }

    /**
     * This method is responsible to press 'Comments' tab inside of Notification frame
     * @param none
     * @return nothing returns
     */
    pressCommentsTab() {
        cy.xpath(selectors.commentsTab).should("be.visible");
        cy.xpath(selectors.commentsTab).click();
    }

    /**
     * This method is responsible to press over a 'Task' according to name
     * @param nro: Number in the list
     * @param name: message according to Task name and action. E.G.: Task Form Task C reassigned to firstName lastName
     * @return nothing returns
     */
    openTaskFromNotificationFrame(name, type = "tasks", nro = 0, click = 0) {
        cy.xpath(selectors.selectMessageNotification.replace("type", type))
            .eq(nro)
            .as("elem")
            .should("have.text", name);
        if (click == 0) {
            cy.get("@elem").click();
            cy.url().should("include", "/" + type);
        }
    }

    /**
     * This method is responsible to press over notification button and open the notification page
     * @param none
     * @return nothing returns
     */
    pressViewAllButton() {
        cy.xpath(selectors.openAllNotifications).should("be.visible").click();
        cy.url().should("include", "/notifications");
    }

    cleanNotification() {
        cy.wait(500);
        this.openFrameNotification();
        cy.xpath("//div[@class='notification-popover']").should("be.visible");
    }

    deleteAllNotifications(retry = 2) {
        for (var i = 1; i <= retry; i++) {
            this.cleanNotification();
        }
    }

    /**
     * This method is responsible to open the url in the notification page
     * @param requestID: This value opens the request page with the specific Request ID
     * @return nothing returns
     */
    pressFirstNotificationOnPopup(requestID) {
        cy.xpath(selectors.notificationList).should("be.visible");
        cy.xpath(selectors.notificationList).find("a").first().click();
        cy.url().should("include", "/requests/" + requestID);
    }

    /**
     * This method is responsible to wait until a notification arrived every 5 seconds.
     * @param attempts: # to try , 0 by defauls
     * @param maxAttempts: #max of attempts to wait for a notification
     * @return nothing returns
     */
    waitForNotification(attempts = 0, maxAttempts = 10, nroNotification = 1) {
        cy.xpath(selectors.generalCount).then(($el) => {
            const nro = $el.text();
            if (nro < nroNotification && attempts < maxAttempts) {
                cy.wait(3000);
                cy.reload();
                this.waitForNotification(attempts + 1, maxAttempts, nroNotification);
            } else {
                if ( attempts == maxAttempts){
                    cy.log("Wrong nro Notification, you are waiting for " + nroNotification + ". However, only " + nro + " notification arrived");
                } else {
                    cy.log("Notification arrived: " + nro);
                }
            }
        });
    }

    /**
     * This method is responsible to click over `comments` button in the modeler, task or request in order to open the comment frame.
     * @param option: modeler or default
     * @return nothing returns
     */
    pressCommentButton(option) {
        let btn;
        switch (option) {
            case "modeler":
                btn = selectors.commentsBtnModeler;
                break;
            default:
                btn = selectors.commentsBtn;
                break;
        }
        cy.xpath(btn).should("be.visible");
        cy.xpath(btn).click();
    }

    /**
     * This method is responsible to click over x button in the modeler, task or request in order to close the comment frame.
     * @param option: modeler or default
     * @return nothing returns
     */
    closeCommentButton(option) {
        let btn;
        switch (option) {
            case "modeler":
                btn = selectors.commentsBtnModeler;
                break;
            default:
                btn = selectors.commentsBtn;
                break;
        }
        cy.xpath(btn).should("be.visible");
        cy.xpath(btn).click();
    }
    /**
     * This method is responsible to click over x button in the modeler, task or request in order to close the comment frame.
     * @param option: modeler or default
     * @param button: this field accepts values such as: Refresh, Cancel and Comments
     * @return nothing returns
     */
    pressOptionComment(option, button) {
        let btn;
        switch (option) {
            case "modeler":
                btn = selectors.commentsActionsModeler.replace(
                    "option",
                    button
                );
                break;
            default:
                btn = selectors.commentsActions.replace("option", button);
                break;
        }
        cy.xpath(btn).should("be.visible");
        cy.xpath(btn).click();
    }

    sendComment(option, message) {
        let m;
        switch (option) {
            case "modeler":
                m = selectors.textareaCommentsModeler;
                break;
            default:
                m = selectors.textareaComments;
                break;
        }
        cy.xpath(m).should("be.visible");
        cy.xpath(m).type(message);
        this.pressOptionComment(option, "Comment");
    }
}
