export class DefaultScreenInterstitial {
    selectStartEvent(StartEventName) {
        const startEvent =
            "//div[@data-test='paper']//*[text()='" +
            StartEventName +
            "']/ancestor::*[@data-type='processmaker.components.nodes.startEvent.Shape']";
        cy.xpath(startEvent).should("be.visible");
        cy.xpath(startEvent).click();
    }

    verifyScreenInterstitial() {
        cy.xpath(
            "//div[@aria-label='Screen Interstitial']//span[@class='multiselect__single']"
        ).should("be.visible");
        cy.xpath(
            "//div[@aria-label='Screen Interstitial']//span[@class='multiselect__single']"
        ).should("contain.text", "Screen Interstitial");
    }

    verifyScreenInterstitialinTask() {
        cy.xpath(
            "//div[@id='tab-form']//div[@name='Screen Interstitial']"
        ).should("be.visible");
        cy.xpath(
            "//div[@id='tab-form']//div[@name='Screen Interstitial']//p"
        ).should("have.text", "We're getting the next task for you...");
    }

    fillData() {
        cy.xpath("//input[@name='form_input_1']")
            .should("be.visible")
            .type("test QA");
        cy.xpath("//button[@aria-label='New Submit']").click();
    }

    //Loading Submit button

    verifySubmitBtnProperties(submitBtnName) {
        const btnName =
            "//div[@data-cy='editor-content']//button[contains(text(),'" +
            submitBtnName +
            "')]";
        const loadingGroup =
            "//div[@id='Configuration']/div[@data-cy='inspector-loading']";
        const labelGroup =
            "//div[@id='Configuration']/div[@data-cy='inspector-loadingLabel']";
        cy.xpath(btnName).should("be.visible");
        cy.xpath(btnName).click({ force: true });
        cy.xpath("//button[@data-cy='accordion-Variable']").click();
        cy.xpath("//button[@data-cy='accordion-Configuration']").click();
        //Verify loading Submit property
        cy.xpath(loadingGroup)
            .find("input[class='form-check-input']")
            .should("have.attr", "type", "checkbox");
        cy.xpath(loadingGroup)
            .find("label[class='form-check-label']")
            .should("have.text", "Loading Submit Button");
        cy.xpath(loadingGroup)
            .find("small[class='form-text text-muted']")
            .should("have.text", "Loading Submit Button");
        //Verify loading label
        cy.xpath(labelGroup).find("label").should("have.text", "Loading Label");
        cy.xpath(labelGroup).find("input").should("be.visible");
    }

    pressLoadingSubmit(submitName) {
        const btn = "//button[@aria-label='" + submitName + "']";
        cy.xpath(btn).should("be.visible");
        cy.xpath(btn).click();
    }

    verifyIfSubmitEnable(submitName) {
        const btn = "//button[@aria-label='" + submitName + "']";
        cy.xpath(btn).should("have.class", "btn btn-primary");
        cy.xpath(btn).should("not.have.class", "btn btn-primary disabled");
        cy.xpath("//div[@name='qa-screen1']//h1/strong").click();
    }

    verifyIfSubmitDisable(submitName) {
        const btn = "//button[@aria-label='" + submitName + "']";
        cy.xpath(btn).should("have.class", "btn btn-primary disabled");
    }

    verifyLoadingSubmit(submitName, submitMessage) {
        const btn = "//button[@aria-label='" + submitName + "']";
        cy.xpath(btn)
            .find("span")
            .should("have.class", "spinner-border spinner-border-sm");
        cy.xpath(btn).should("contains.text", submitMessage);
    }

    verifyLoadingSubmitBtn(
        submitName,
        submitMessage,
        screenName,
        title,
        we = 0
    ) {
        const screen = "//div[@name='" + screenName + "']";
        this.pressLoadingSubmit(submitName);
        this.verifyLoadingSubmit(submitName, submitMessage);
        switch (we) {
            case 1:
                cy.xpath(screen).should("be.visible");
                cy.xpath(screen).find("span").should("have.text", title);
                break;
            case 2:
                cy.url().should("include", title);
                break;
            default:
                cy.xpath(screen).should("be.visible");
                cy.xpath(screen).find("h1 > strong").should("have.text", title);
                break;
        }
    }

    fillInput(controlName, value = "test QA") {
        const varControl = "//*[@data-cy='screen-field-" + controlName + "']";
        cy.xpath(varControl).should("be.visible").type(value);
    }

    fillDateTime(controlName, value = "2024-10-09") {
        const varControl = "//input[@name='" + controlName + "']";
        cy.xpath(varControl).should("be.visible").type(value);
    }

    fillSelectList(controlName, option) {
        const varControl = "//div[@data-cy='screen-field-" + controlName + "']";
        const opt =
            "//div[@class='multiselect__content-wrapper']//ul//li[@id='" +
            option +
            "']";
        cy.xpath(varControl).click();
        cy.xpath(varControl).find("input").type("processmaker").type("{enter}");
    }

    fillCheckbox(controlName) {
        const varControl = "//*[@data-cy='screen-field-" + controlName + "']";
        cy.xpath(varControl).check();
    }

    validateRequiredFieldMessage(nro) {
        var message;
        const alertMessage =
            "//div[@class='alert-wrapper']/div[@aria-live='polite']";
        if (nro == 1) {
            message = "There is a validation error in your form.";
        } else {
            message = "There are " + nro + " validation errors in your form.";
        }
        cy.xpath(alertMessage).find("span").should("be.visible");
        cy.xpath(alertMessage).find("span").should("have.text", message);
        cy.xpath(alertMessage).should("not.exist");
    }

    validateRequiredFieldMessageWebEntry() {
        cy.on("window:alert", (text) => {
            expect(text).to.eq("There are 5 validation errors in your form.");
        });
        cy.xpath("//div[text()='Field is required']").should("have.length", 5);
    }

    verifyLoadingSubmitBtnWebEntry(
        submitName,
        submitMessage,
        screenName,
        title
    ) {
        const screen = "//div[@name='" + screenName + "']";
        const btn = "//button[@aria-label='" + submitName + "']";
        cy.xpath(btn).should("be.visible");
        cy.xpath(btn).click({ force: true });
        this.verifyLoadingSubmit(submitName, submitMessage);
        cy.xpath(screen).should("be.visible");
        cy.xpath(screen).find("h1 > strong").should("have.text", title);
    }

    verifyLoadingSubmitBtnTask(submitName, submitMessage, screenName, title) {
        const screen = "//div[@name='" + screenName + "']";
        const btn = "//button[@aria-label='" + submitName + "']";
        cy.xpath(btn).as("submit").should("be.visible");
        cy.get("@submit").click({ force: true });
        this.verifyLoadingSubmit(submitName, submitMessage);
        cy.xpath("//span[text()='Task Completed Successfully']").should(
            "be.visible"
        );
        cy.xpath("//span[text()='Task Completed Successfully']").should(
            "not.exist"
        );
        cy.xpath(screen).should("be.visible");
        cy.xpath(screen).find("h1 > strong").should("have.text", title);
    }
}
