import selectors from "#selectors/processMap";

export class processMapExecution {
    verifyZoomBoxIsPresent() {
        cy.xpath(selectors.zoomBoxXpath).should("be.visible");
        cy.xpath(selectors.zoomOutXpath).should("be.visible");
        cy.xpath(selectors.zoomOutXpath).should(
            "have.attr",
            "title",
            "Zoom Out"
        );
        cy.xpath(selectors.zoomResetXpath).should("be.visible");
        cy.xpath(selectors.zoomResetXpath).should(
            "have.attr",
            "title",
            "Reset to initial scale"
        );
        cy.xpath(selectors.zoomInXpath).should("be.visible");
        cy.xpath(selectors.zoomInXpath).should("have.attr", "title", "Zoom In");
    }

    verifyZoomOutButton() {
        cy.xpath(selectors.zoomOutXpath).click();
        cy.xpath(selectors.zoomOutXpath).click();
        cy.xpath(selectors.zoomResetXpath).should("have.text", "80%");
        cy.xpath(selectors.zoomResetXpath).click();
    }

    verifyZoomInButton() {
        cy.xpath(selectors.zoomInXpath).click();
        cy.xpath(selectors.zoomInXpath).click();
        cy.xpath(selectors.zoomResetXpath).should("have.text", "120%");
        cy.xpath(selectors.zoomResetXpath).click();
    }

    verifyResetButton() {
        this.verifyZoomInButton()
        cy.xpath(selectors.zoomResetXpath).click();
        cy.xpath(selectors.zoomResetXpath).should("have.text", "100%");
        this.verifyZoomOutButton();
        cy.xpath(selectors.zoomResetXpath).click();
        cy.xpath(selectors.zoomResetXpath).should("have.text", "100%");
    }

    verifyTitleProcessMap(processName) {
        const name = processName + " In-Flight Map";
        cy.xpath(selectors.titleProcessMapXpath).should("contain", name);
    }

    verifyOverviewTab(index) {
        const tabListXpath = '//ul[@id="requestTab"]//a';
        cy.xpath(tabListXpath)
            .eq(index)
            .should("have.attr", "href", "#overview");
        cy.xpath(tabListXpath).eq(index).should("have.attr", "role", "tab");
        cy.xpath(tabListXpath)
            .eq(index)
            .should("have.attr", "aria-selected", "false");
        cy.xpath(tabListXpath).eq(index).should("contain", "Overview");
        cy.xpath(tabListXpath)
            .eq(index)
            .should("have.attr", "data-toggle", "tab");
    }

    verifyLegent() {
        cy.xpath(selectors.mapLegendXpath).should("be.visible");
        cy.xpath(selectors.mapLegendXpath)
            .find("p > span")
            .eq(0)
            .should("have.class", "line in-progress-line");
        cy.xpath(selectors.mapLegendXpath)
            .find("p")
            .eq(0)
            .should("contain", "In Progress");
        cy.xpath(selectors.mapLegendXpath)
            .find("p > span")
            .eq(1)
            .should("have.class", "line completed-line");
        cy.xpath(selectors.mapLegendXpath)
            .find("p")
            .eq(1)
            .should("contain", "Completed");
        cy.xpath(selectors.mapLegendXpath)
            .find("p > span")
            .eq(2)
            .should("have.class", "line idle-line");
        cy.xpath(selectors.mapLegendXpath)
            .find("p")
            .eq(2)
            .should("contain", "Pending / Not Executed");
    }

    fillSimpleScreen(val1, val2) {
        cy.xpath('//input[@data-cy="screen-field-form_input_1"]').type(val1);
        cy.xpath('//input[@data-cy="screen-field-form_input_2"]').type(val2);
        cy.xpath('//button[@aria-label="New Submit"]').should('be.visible').click();
    }

    verifyTooltip(taskName, status, completedBy) {
        const normalizeText = (s) => s.toLowerCase();
        cy.xpath("//span[@class='text-info']").should("have.text", taskName);
        cy.xpath("//span[text()='Status:']").should("have.text", "Status:");
        cy.xpath(
            "//span[text()='Status:']//following-sibling::span[@class='text-secondary']"
        ).then(($identifier) => {
            const idText = normalizeText($identifier.text());
            expect(idText).to.equal(status);
        });
        cy.xpath("//span[text()='Completed By:']").should(
            "have.text",
            "Completed By:"
        );
        cy.xpath(
            "//span[text()='Completed By:']//following-sibling::span[@class='text-secondary']"
        ).should("have.text", completedBy);
    }

    verifyTooltipLine(lineName, nroFlow, no_read = 0) {
        if (no_read == 0) {
            let message = "The path was repeated " + nroFlow + " time";
            cy.xpath("//span[@class='text-info']").should(
                "have.text",
                lineName
            );
            cy.xpath("//span[@class='tooltip-data-title']").should(
                "contain",
                message
            );
        } else {
            let message = "No information found.";
            cy.xpath("//span[@class='text-info']").should(
                "have.text",
                lineName
            );
            cy.xpath("//span[@class='tooltip-data-title']").should(
                "contain",
                message
            );
        }
    }

    fillscreenLoop(val1, val2, val3) {
        if (val1 == 1) {
            cy.xpath(
                '//input[@data-cy="screen-field-form_checkbox_1"]'
            ).check();
        }
        cy.xpath('//input[@data-cy="screen-field-form_input_1"]').type(val2);
        cy.xpath('//textarea[@data-cy="screen-field-form_text_area_1"]').type(
            val3
        );
        cy.xpath('//button[@aria-label="New Submit"]').click();
    }

    verifyTaskTooltipWithoutAssign(taskName) {
        cy.xpath("//span[@class='text-info']").should("have.text", taskName);
    }

    pressCompleteTaskForManualTask() {
        cy.xpath(
            "//div[@class='card-footer']/button[contains(text(),'Complete Task')]"
        )
            .should("be.visible")
            .click();
        cy.xpath("//span[text()='Task Completed Successfully']").should("be.visible"); 
    }

    verifyTaskColor(varTaskName, color, strokeWidth) {
        const taskElementXpath = selectors.colorLineTask;
        cy.xpath(selectors.zoomBoxXpath).should("be.visible");
        cy.xpath(taskElementXpath.replace("bpmnTask", varTaskName))
            .first()
            .should("be.visible");
        cy.xpath(taskElementXpath.replace("bpmnTask", varTaskName))
            .first()
            .should("have.attr", "stroke", color);
        cy.xpath(taskElementXpath.replace("bpmnTask", varTaskName))
            .first()
            .should("have.attr", "stroke-width", strokeWidth);
    }

    verifyLineColor(varFlowName, color, strokeWidth) {
        const taskElementXpath = selectors.colorFlowXpath;
        cy.xpath(selectors.zoomBoxXpath).should("be.visible");
        cy.xpath(taskElementXpath.replace("lineName", varFlowName))
            .eq(1)
            .should("be.visible");
        cy.xpath(taskElementXpath.replace("lineName", varFlowName))
            .eq(1)
            .should("have.attr", "stroke", color);
        cy.xpath(taskElementXpath.replace("lineName", varFlowName))
            .eq(1)
            .should("have.attr", "stroke-width", strokeWidth);
    }
}
