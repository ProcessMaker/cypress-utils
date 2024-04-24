export class RequiredExecution {
    verifyRequiredFieldInsideMultiColumn() {
        const inputLine =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test1_qa"]//label[contains(text(),"varA")]';
        cy.xpath(inputLine)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(inputLine)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");

        const checkbox =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test1_qa"]//label[contains(text(),"varD")]';
        cy.xpath(checkbox)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(checkbox)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");

        const datePicker =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test1_qa"]//label[contains(text(),"varG")]';
        cy.xpath(datePicker)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(datePicker)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");

        const selectList =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test1_qa"]//label[contains(text(),"varJ")]';
        cy.xpath(selectList)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(selectList)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");

        const textarea =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test1_qa"]//label[contains(text(),"varM")]';
        cy.xpath(textarea)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(textarea)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");
    }

    verifyRequiredIfInsideMulticolum() {
        const inputLine2 =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test1_qa"]//label[contains(text(),"condition")]';
        cy.xpath(inputLine2).type(1);

        const inputLine =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test1_qa"]//label[contains(text(),"varB")]';
        cy.xpath(inputLine)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(inputLine)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");

        const checkbox =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test1_qa"]//label[contains(text(),"varE")]';
        cy.xpath(checkbox)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(checkbox)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");

        const datePicker =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test1_qa"]//label[contains(text(),"varH")]';
        cy.xpath(datePicker)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(datePicker)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");

        const selectList =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test1_qa"]//label[contains(text(),"varK")]';
        cy.xpath(selectList)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(selectList)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");

        const textarea =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test1_qa"]//label[contains(text(),"varN")]';
        cy.xpath(textarea)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(textarea)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");
    }

    verifyRequiredUnlessConditionInsideMulticolum() {
        const inputLine =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test1_qa"]//label[contains(text(),"varC")]';
        cy.xpath(inputLine)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(inputLine)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");

        const checkbox =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test1_qa"]//label[contains(text(),"varF")]';
        cy.xpath(checkbox)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(checkbox)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");

        const datePicker =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test1_qa"]//label[contains(text(),"varI")]';
        cy.xpath(datePicker)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(datePicker)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");

        const selectList =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test1_qa"]//label[contains(text(),"varL")]';
        cy.xpath(selectList)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(selectList)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");

        const textarea =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test1_qa"]//label[contains(text(),"varO")]';
        cy.xpath(textarea)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(textarea)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");
    }

    verifyRequiredIfInsideMultiColumn() {
        const inputLine2 =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test1_qa"]//label[contains(text(),"var_input2")]';
        cy.xpath(inputLine2).type(1);

        const inputLine =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test1_qa"]//label[contains(text(),"var2")]';
        cy.xpath(inputLine)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(inputLine)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");

        const checkbox =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test1_qa"]//label[contains(text(),"var5")]';
        cy.xpath(checkbox)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(checkbox)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");

        const datePicker =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test1_qa"]//label[contains(text(),"var8")]';
        cy.xpath(datePicker)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(datePicker)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");

        const selectList =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test1_qa"]//label[contains(text(),"var11")]';
        cy.xpath(selectList)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(selectList)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");

        const textarea =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test1_qa"]//label[contains(text(),"var14")]';
        cy.xpath(textarea)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(textarea)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");
    }

    verifyRequiredWithMultiColumn() {
        const inputLine =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test3_qa"]//label[contains(text(),"var1")]';
        cy.xpath(inputLine)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(inputLine)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");

        const checkbox =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test3_qa"]//label[contains(text(),"var2")]';
        cy.xpath(checkbox)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(checkbox)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");

        const datePicker =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test3_qa"]//label[contains(text(),"var3")]';
        cy.xpath(datePicker)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(datePicker)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");

        const selectList =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test3_qa"]//label[contains(text(),"var4")]';
        cy.xpath(selectList)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(selectList)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");

        const textarea =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test3_qa"]//label[contains(text(),"var5")]';
        cy.xpath(textarea)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(textarea)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");
    }

    verifyRequiredIfWithMultiColumn() {
        const inputLine2 =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test3_qa"]//label[contains(text(),"condition")]';
        cy.xpath(inputLine2).first().type(1);

        const inputLine =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test3_qa"]//label[contains(text(),"varA")]';
        cy.xpath(inputLine)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(inputLine)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");

        const checkbox =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test3_qa"]//label[contains(text(),"varB")]';
        cy.xpath(checkbox)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(checkbox)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");

        const datePicker =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test3_qa"]//label[contains(text(),"varC")]';
        cy.xpath(datePicker)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(datePicker)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");

        const selectList =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test3_qa"]//label[contains(text(),"varD")]';
        cy.xpath(selectList)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(selectList)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");

        const textarea =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test3_qa"]//label[contains(text(),"varE")]';
        cy.xpath(textarea)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(textarea)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");
    }

    verifyRequiredUnlessWithMultiColumn() {
        const inputLine2 =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test3_qa"]//label[contains(text(),"condition")]';
        cy.xpath(inputLine2).first().type(1);

        const inputLine =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test3_qa"]//label[contains(text(),"varF")]';
        cy.xpath(inputLine)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(inputLine)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");

        const checkbox =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test3_qa"]//label[contains(text(),"varG")]';
        cy.xpath(checkbox)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(checkbox)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");

        const datePicker =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test3_qa"]//label[contains(text(),"varH")]';
        cy.xpath(datePicker)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(datePicker)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");

        const selectList =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test3_qa"]//label[contains(text(),"varI")]';
        cy.xpath(selectList)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(selectList)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");

        const textarea =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test3_qa"]//label[contains(text(),"varK")]';
        cy.xpath(textarea)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(textarea)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");
    }

    verifyRequiredSubmitWithoutMultiColumn() {
        const submitBtn =
            '//div[@id="tabContent"]//div[@id="tab-form"]//button[@aria-label="New Submit"]';
        cy.xpath(submitBtn).click();

        const inputLine =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test3_qa"]//label[contains(text(),"var1")]//following-sibling::div[@class="invalid-feedback"]';
        cy.xpath(inputLine).should("have.text", "Field is required");

        const checkbox =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test3_qa"]//label[contains(text(),"var2")]//following-sibling::div[@class="invalid-feedback"]';
        cy.xpath(checkbox).should("have.text", "Field is required");

        const datePicker =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test3_qa"]//label[contains(text(),"var3")]//following-sibling::div[@class="invalid-feedback d-block"]/div';
        cy.xpath(datePicker).should("have.text", "Field is required");

        const selectList =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test3_qa"]//label[contains(text(),"var4")]//following-sibling::div[@class="invalid-feedback d-block"]/div';
        cy.xpath(selectList).should("have.text", "Field is required");

        const textarea =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test3_qa"]//label[contains(text(),"var5")]//following-sibling::div[@class="invalid-feedback"]';
        cy.xpath(textarea).should("have.text", "Field is required");
    }

    verifyRequiredIfSubmitWithouthMultiColumn() {
        const inputLine2 =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test3_qa"]//label[contains(text(),"condition")]';
        cy.xpath(inputLine2).first().type(1);

        const submitBtn =
            '//div[@id="tabContent"]//div[@id="tab-form"]//button[@aria-label="New Submit"]';
        cy.xpath(submitBtn).click();

        const inputLine =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test3_qa"]//label[contains(text(),"varA")]//following-sibling::div[@class="invalid-feedback"]';
        cy.xpath(inputLine).should("have.text", "Field is required");

        const checkbox =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test3_qa"]//label[contains(text(),"varB")]//following-sibling::div[@class="invalid-feedback"]';
        cy.xpath(checkbox).should("have.text", "Field is required");

        const datePicker =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test3_qa"]//label[contains(text(),"varC")]//following-sibling::div[@class="invalid-feedback d-block"]/div';
        cy.xpath(datePicker).should("have.text", "Field is required");

        const selectList =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test3_qa"]//label[contains(text(),"varD")]//following-sibling::div[@class="invalid-feedback d-block"]/div';
        cy.xpath(selectList).should("have.text", "Field is required");

        const textarea =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test3_qa"]//label[contains(text(),"varE")]//following-sibling::div[@class="invalid-feedback"]';
        cy.xpath(textarea).should("have.text", "Field is required");
    }

    verifyRequiredUnlessSubmitWithoutMultiColumn() {
        const inputLine2 =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test3_qa"]//label[contains(text(),"conB")]';
        cy.xpath(inputLine2).first().type(1);

        const submitBtn =
            '//div[@id="tabContent"]//div[@id="tab-form"]//button[@aria-label="New Submit"]';
        cy.xpath(submitBtn).click();

        const inputLine =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test3_qa"]//label[contains(text(),"varF")]//following-sibling::div[@class="invalid-feedback"]';
        cy.xpath(inputLine).should("have.text", "Field is required");

        const checkbox =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test3_qa"]//label[contains(text(),"varG")]//following-sibling::div[@class="invalid-feedback"]';
        cy.xpath(checkbox).should("have.text", "Field is required");

        const datePicker =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test3_qa"]//label[contains(text(),"varH")]//following-sibling::div[@class="invalid-feedback d-block"]/div';
        cy.xpath(datePicker).should("have.text", "Field is required");

        const selectList =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test3_qa"]//label[contains(text(),"varI")]//following-sibling::div[@class="invalid-feedback d-block"]/div';
        cy.xpath(selectList).should("have.text", "Field is required");

        const textarea =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test3_qa"]//label[contains(text(),"varK")]//following-sibling::div[@class="invalid-feedback"]';
        cy.xpath(textarea).should("have.text", "Field is required");
    }

    verifyRequiredNestedScreenWithoutMultiColumn() {
        const inputLine =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test5_qa"]//div[@name="test3_qa"]//label[contains(text(),"var1")]';
        cy.xpath(inputLine)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(inputLine)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");

        const checkbox =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test5_qa"]//div[@name="test3_qa"]//label[contains(text(),"var2")]';
        cy.xpath(checkbox)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(checkbox)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");

        const datePicker =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test5_qa"]//div[@name="test3_qa"]//label[contains(text(),"var3")]';
        cy.xpath(datePicker)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(datePicker)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");

        const selectList =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test5_qa"]//div[@name="test3_qa"]//label[contains(text(),"var4")]';
        cy.xpath(selectList)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(selectList)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");

        const textarea =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test5_qa"]//div[@name="test3_qa"]//label[contains(text(),"var5")]';
        cy.xpath(textarea)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(textarea)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");
    }

    verifyRequiredIfNestedScreenWithoutMultiColumn() {
        const inputLine2 =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test5_qa"]//div[@name="test3_qa"]//label[contains(text(),"condition")]';
        cy.xpath(inputLine2).first().type(1);

        const inputLine =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test5_qa"]//div[@name="test3_qa"]//label[contains(text(),"var1")]';
        cy.xpath(inputLine)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(inputLine)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");

        const checkbox =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test5_qa"]//div[@name="test3_qa"]//label[contains(text(),"var2")]';
        cy.xpath(checkbox)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(checkbox)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");

        const datePicker =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test5_qa"]//div[@name="test3_qa"]//label[contains(text(),"var3")]';
        cy.xpath(datePicker)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(datePicker)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");

        const selectList =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test5_qa"]//div[@name="test3_qa"]//label[contains(text(),"var4")]';
        cy.xpath(selectList)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(selectList)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");

        const textarea =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test5_qa"]//div[@name="test3_qa"]//label[contains(text(),"var5")]';
        cy.xpath(textarea)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(textarea)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");
    }

    verifyRequiredUnlessNestedScreenWithoutMultiColumn() {
        const inputLine2 =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test5_qa"]//div[@name="test3_qa"]//label[contains(text(),"conB")]';
        cy.xpath(inputLine2).first().type(1);

        const inputLine =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test5_qa"]//div[@name="test3_qa"]//label[contains(text(),"var1")]';
        cy.xpath(inputLine)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(inputLine)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");

        const checkbox =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test5_qa"]//div[@name="test3_qa"]//label[contains(text(),"var2")]';
        cy.xpath(checkbox)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(checkbox)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");

        const datePicker =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test5_qa"]//div[@name="test3_qa"]//label[contains(text(),"var3")]';
        cy.xpath(datePicker)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(datePicker)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");

        const selectList =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test5_qa"]//div[@name="test3_qa"]//label[contains(text(),"var4")]';
        cy.xpath(selectList)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(selectList)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");

        const textarea =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test5_qa"]//div[@name="test3_qa"]//label[contains(text(),"var5")]';
        cy.xpath(textarea)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(textarea)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");
    }

    verifyRequiredNestedScreenInsideMultiColumn() {
        const inputLine =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test1_qa_nested"]//div[@name="test1_qa"]//label[contains(text(),"varA")]';
        cy.xpath(inputLine)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(inputLine)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");

        const checkbox =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test1_qa_nested"]//div[@name="test1_qa"]//label[contains(text(),"varD")]';
        cy.xpath(checkbox)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(checkbox)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");

        const datePicker =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test1_qa_nested"]//div[@name="test1_qa"]//label[contains(text(),"varG")]';
        cy.xpath(datePicker)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(datePicker)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");

        const selectList =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test1_qa_nested"]//div[@name="test1_qa"]//label[contains(text(),"varJ")]';
        cy.xpath(selectList)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(selectList)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");

        const textarea =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test1_qa_nested"]//div[@name="test1_qa"]//label[contains(text(),"varM")]';
        cy.xpath(textarea)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(textarea)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");
    }

    verifyRequiredIfNestedScreenInsideMultiColumn() {
        const inputLine2 =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test1_qa_nested"]//div[@name="test1_qa"]//label[contains(text(),"condition")]';
        cy.xpath(inputLine2).first().type(1);

        const inputLine =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test1_qa_nested"]//div[@name="test1_qa"]//label[contains(text(),"varB")]';
        cy.xpath(inputLine)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(inputLine)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");

        const checkbox =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test1_qa_nested"]//div[@name="test1_qa"]//label[contains(text(),"varE")]';
        cy.xpath(checkbox)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(checkbox)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");

        const datePicker =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test1_qa_nested"]//div[@name="test1_qa"]//label[contains(text(),"varH")]';
        cy.xpath(datePicker)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(datePicker)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");

        const selectList =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test1_qa_nested"]//div[@name="test1_qa"]//label[contains(text(),"varK")]';
        cy.xpath(selectList)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(selectList)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");

        const textarea =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test1_qa_nested"]//div[@name="test1_qa"]//label[contains(text(),"varN")]';
        cy.xpath(textarea)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(textarea)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");
    }

    verifyRequiredUnlessNestedScreenInsideMultiColumn() {
        const inputLine2 =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test1_qa_nested"]//div[@name="test1_qa"]//label[contains(text(),"condition")]';
        cy.xpath(inputLine2).first().type(2);

        const inputLine =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test1_qa_nested"]//div[@name="test1_qa"]//label[contains(text(),"varC")]';
        cy.xpath(inputLine)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(inputLine)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");

        const checkbox =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test1_qa_nested"]//div[@name="test1_qa"]//label[contains(text(),"varF")]';
        cy.xpath(checkbox)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(checkbox)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");

        const datePicker =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test1_qa_nested"]//div[@name="test1_qa"]//label[contains(text(),"varI")]';
        cy.xpath(datePicker)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(datePicker)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");

        const selectList =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test1_qa_nested"]//div[@name="test1_qa"]//label[contains(text(),"varL")]';
        cy.xpath(selectList)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(selectList)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");

        const textarea =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test1_qa_nested"]//div[@name="test1_qa"]//label[contains(text(),"varO")]';
        cy.xpath(textarea)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(textarea)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");
    }

    verifyRequiredSubmitWithMultiColumn() {
        const submitBtn =
            '//div[@id="tabContent"]//div[@id="tab-form"]//button[@aria-label="New Submit"]';
        cy.xpath(submitBtn).click();

        const inputLine =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test1_qa"]//label[contains(text(),"varA")]//following-sibling::div[@class="invalid-feedback"]';
        cy.xpath(inputLine).should("have.text", "Field is required");

        const checkbox =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test1_qa"]//label[contains(text(),"varD")]//following-sibling::div[@class="invalid-feedback"]';
        cy.xpath(checkbox).should("have.text", "Field is required");

        const datePicker =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test1_qa"]//label[contains(text(),"varG")]//following-sibling::div[@class="invalid-feedback d-block"]';
        cy.xpath(datePicker).should("have.text", "Field is required");

        const selectList =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test1_qa"]//label[contains(text(),"varJ")]//following-sibling::div[@class="invalid-feedback d-block"]';
        cy.xpath(selectList).should("have.text", "Field is required");

        const textarea =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test1_qa"]//label[contains(text(),"varM")]//following-sibling::div[@class="invalid-feedback"]';
        cy.xpath(textarea).should("have.text", "Field is required");
    }

    verifyRequiredIfSubmitWithMultiColumn() {
        const inputLine2 =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test1_qa"]//label[contains(text(),"condition")]';
        cy.xpath(inputLine2).first().type(1);

        const submitBtn =
            '//div[@id="tabContent"]//div[@id="tab-form"]//button[@aria-label="New Submit"]';
        cy.xpath(submitBtn).click();

        const inputLine =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test1_qa"]//label[contains(text(),"varB")]//following-sibling::div[@class="invalid-feedback"]';
        cy.xpath(inputLine).should("have.text", "Field is required");

        const checkbox =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test1_qa"]//label[contains(text(),"varE")]//following-sibling::div[@class="invalid-feedback"]';
        cy.xpath(checkbox).should("have.text", "Field is required");

        const datePicker =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test1_qa"]//label[contains(text(),"varH")]//following-sibling::div[@class="invalid-feedback d-block"]';
        cy.xpath(datePicker).should("have.text", "Field is required");

        const selectList =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test1_qa"]//label[contains(text(),"varK")]//following-sibling::div[@class="invalid-feedback d-block"]';
        cy.xpath(selectList).should("have.text", "Field is required");

        const textarea =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test1_qa"]//label[contains(text(),"varN")]//following-sibling::div[@class="invalid-feedback"]';
        cy.xpath(textarea).should("have.text", "Field is required");
    }

    verifyRequiredUnlessSubmitWithMultiColumn() {
        const inputLine2 =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test1_qa"]//label[contains(text(),"condition")]';
        cy.xpath(inputLine2).first().type(2);

        const submitBtn =
            '//div[@id="tabContent"]//div[@id="tab-form"]//button[@aria-label="New Submit"]';
        cy.xpath(submitBtn).click();

        const inputLine =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test1_qa"]//label[contains(text(),"varC")]//following-sibling::div[@class="invalid-feedback"]';
        cy.xpath(inputLine).should("have.text", "Field is required");

        const checkbox =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test1_qa"]//label[contains(text(),"varF")]//following-sibling::div[@class="invalid-feedback"]';
        cy.xpath(checkbox).should("have.text", "Field is required");

        const datePicker =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test1_qa"]//label[contains(text(),"varI")]//following-sibling::div[@class="invalid-feedback d-block"]/div';
        cy.xpath(datePicker).should("have.text", "Field is required");

        const selectList =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test1_qa"]//label[contains(text(),"varL")]//following-sibling::div[@class="invalid-feedback d-block"]/div';
        cy.xpath(selectList).should("have.text", "Field is required");

        const textarea =
            '//div[@id="tabContent"]//div[@id="tab-form"]//div[@name="test1_qa"]//label[contains(text(),"varO")]//following-sibling::div[@class="invalid-feedback"]';
        cy.xpath(textarea).should("have.text", "Field is required");
    }

    verifyWERequiredFields() {
        //nested screen and loop required
        const varF =
            '//div[@id="web-entry-app"]//div[@id="tab-form"]//div[@name="we_screenP"]//label[contains(text(),"varF")]';
        const varG =
            '//div[@id="web-entry-app"]//div[@id="tab-form"]//div[@name="we_screenP"]//label[contains(text(),"varG")]';
        const varH =
            '//div[@id="web-entry-app"]//div[@id="tab-form"]//div[@name="we_screenP"]//label[contains(text(),"varH")]';
        const varI =
            '//div[@id="web-entry-app"]//div[@id="tab-form"]//div[@name="we_screenP"]//label[contains(text(),"varI")]';
        const varJ =
            '//div[@id="web-entry-app"]//div[@id="tab-form"]//div[@name="we_screenP"]//label[contains(text(),"varJ")]';

        cy.xpath(varF)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(varF)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");
        cy.xpath(varG)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(varG)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");
        cy.xpath(varH)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(varH)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");
        cy.xpath(varI)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(varI)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");
        cy.xpath(varJ)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(varJ)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");

        //nested screen and loop
        //required unless
        const varP =
            '//div[@id="web-entry-app"]//div[@id="tab-form"]//div[@name="we_screenP"]//label[contains(text(),"varP")]';
        const varQ =
            '//div[@id="web-entry-app"]//div[@id="tab-form"]//div[@name="we_screenP"]//label[contains(text(),"varQ")]';
        const varR =
            '//div[@id="web-entry-app"]//div[@id="tab-form"]//div[@name="we_screenP"]//label[contains(text(),"varR")]';
        const varS =
            '//div[@id="web-entry-app"]//div[@id="tab-form"]//div[@name="we_screenP"]//label[contains(text(),"varS")]';
        const varT =
            '//div[@id="web-entry-app"]//div[@id="tab-form"]//div[@name="we_screenP"]//label[contains(text(),"varT")]';

        //first loop
        cy.xpath(varP)
            .prev("span")
            .eq(0)
            .should("have.class", "required-asterisk");
        cy.xpath(varP)
            .prev("span")
            .eq(0)
            .should("have.attr", "title", "required");
        cy.xpath(varQ)
            .prev("span")
            .eq(0)
            .should("have.class", "required-asterisk");
        cy.xpath(varQ)
            .prev("span")
            .eq(0)
            .should("have.attr", "title", "required");
        cy.xpath(varR)
            .prev("span")
            .eq(0)
            .should("have.class", "required-asterisk");
        cy.xpath(varR)
            .prev("span")
            .eq(0)
            .should("have.attr", "title", "required");
        cy.xpath(varS)
            .prev("span")
            .eq(0)
            .should("have.class", "required-asterisk");
        cy.xpath(varS)
            .prev("span")
            .eq(0)
            .should("have.attr", "title", "required");
        cy.xpath(varT)
            .prev("span")
            .eq(0)
            .should("have.class", "required-asterisk");
        cy.xpath(varT)
            .prev("span")
            .eq(0)
            .should("have.attr", "title", "required");

        //second loop
        cy.xpath(varP)
            .prev("span")
            .eq(1)
            .should("have.class", "required-asterisk");
        cy.xpath(varP)
            .prev("span")
            .eq(1)
            .should("have.attr", "title", "required");
        cy.xpath(varQ)
            .prev("span")
            .eq(1)
            .should("have.class", "required-asterisk");
        cy.xpath(varQ)
            .prev("span")
            .eq(1)
            .should("have.attr", "title", "required");
        cy.xpath(varR)
            .prev("span")
            .eq(1)
            .should("have.class", "required-asterisk");
        cy.xpath(varR)
            .prev("span")
            .eq(1)
            .should("have.attr", "title", "required");
        cy.xpath(varS)
            .prev("span")
            .eq(1)
            .should("have.class", "required-asterisk");
        cy.xpath(varS)
            .prev("span")
            .eq(1)
            .should("have.attr", "title", "required");
        cy.xpath(varT)
            .prev("span")
            .eq(1)
            .should("have.class", "required-asterisk");
        cy.xpath(varT)
            .prev("span")
            .eq(1)
            .should("have.attr", "title", "required");

        // required if
        const condition = '//div[@name="we_screenP"]//input[@name="condition"]';
        const varK =
            '//div[@id="web-entry-app"]//div[@id="tab-form"]//div[@name="we_screenP"]//label[contains(text(),"varK")]';
        const varL =
            '//div[@id="web-entry-app"]//div[@id="tab-form"]//div[@name="we_screenP"]//label[contains(text(),"varL")]';
        const varM =
            '//div[@id="web-entry-app"]//div[@id="tab-form"]//div[@name="we_screenP"]//label[contains(text(),"varM")]';
        const varN =
            '//div[@id="web-entry-app"]//div[@id="tab-form"]//div[@name="we_screenP"]//label[contains(text(),"varN")]';
        const varO =
            '//div[@id="web-entry-app"]//div[@id="tab-form"]//div[@name="we_screenP"]//label[contains(text(),"varO")]';

        //first loop
        cy.xpath(condition).eq(0).type(1);
        cy.wait(1000);
        cy.xpath(varK)
            .prev("span")
            .eq(0)
            .should("have.class", "required-asterisk");
        cy.xpath(varK)
            .prev("span")
            .eq(0)
            .should("have.attr", "title", "required");
        cy.xpath(varL)
            .prev("span")
            .eq(0)
            .should("have.class", "required-asterisk");
        cy.xpath(varL)
            .prev("span")
            .eq(0)
            .should("have.attr", "title", "required");
        cy.xpath(varM)
            .prev("span")
            .eq(0)
            .should("have.class", "required-asterisk");
        cy.xpath(varM)
            .prev("span")
            .eq(0)
            .should("have.attr", "title", "required");
        cy.xpath(varN)
            .prev("span")
            .eq(0)
            .should("have.class", "required-asterisk");
        cy.xpath(varN)
            .prev("span")
            .eq(0)
            .should("have.attr", "title", "required");
        cy.xpath(varO)
            .prev("span")
            .eq(0)
            .should("have.class", "required-asterisk");
        cy.xpath(varO)
            .prev("span")
            .eq(0)
            .should("have.attr", "title", "required");

        //second loop
        cy.xpath(condition).eq(1).type(1);
        cy.wait(1000);
        cy.xpath(varK)
            .prev("span")
            .eq(1)
            .should("have.class", "required-asterisk");
        cy.xpath(varK)
            .prev("span")
            .eq(1)
            .should("have.attr", "title", "required");
        cy.xpath(varL)
            .prev("span")
            .eq(1)
            .should("have.class", "required-asterisk");
        cy.xpath(varL)
            .prev("span")
            .eq(1)
            .should("have.attr", "title", "required");
        cy.xpath(varM)
            .prev("span")
            .eq(1)
            .should("have.class", "required-asterisk");
        cy.xpath(varM)
            .prev("span")
            .eq(1)
            .should("have.attr", "title", "required");
        cy.xpath(varN)
            .prev("span")
            .eq(1)
            .should("have.class", "required-asterisk");
        cy.xpath(varN)
            .prev("span")
            .eq(1)
            .should("have.attr", "title", "required");
        cy.xpath(varO)
            .prev("span")
            .eq(1)
            .should("have.class", "required-asterisk");
        cy.xpath(varO)
            .prev("span")
            .eq(1)
            .should("have.attr", "title", "required");

        //form
        const varA =
            '//div[@id="web-entry-app"]//div[@id="tab-form"]//div[@name="we_screenP"]//label[contains(text(),"varA")]';
        const varB =
            '//div[@id="web-entry-app"]//div[@id="tab-form"]//div[@name="we_screenP"]//label[contains(text(),"varB")]';
        const varC =
            '//div[@id="web-entry-app"]//div[@id="tab-form"]//div[@name="we_screenP"]//label[contains(text(),"varC")]';
        const varD =
            '//div[@id="web-entry-app"]//div[@id="tab-form"]//div[@name="we_screenP"]//label[contains(text(),"varD")]';
        const varE =
            '//div[@id="web-entry-app"]//div[@id="tab-form"]//div[@name="we_screenP"]//label[contains(text(),"varE")]';

        cy.xpath(varA)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(varA)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");
        cy.xpath(varB)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(varB)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");
        cy.xpath(varC)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(varC)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");
        cy.xpath(varD)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(varD)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");
        cy.xpath(varE)
            .prev("span")
            .first()
            .should("have.class", "required-asterisk");
        cy.xpath(varE)
            .prev("span")
            .first()
            .should("have.attr", "title", "required");
    }

    verifyWERequiredFieldsMessage() {
        //press button
        const btn =
            '//div[@id="web-entry-app"]//div[@id="tab-form"]//div[@name="we_screenP"]//button[contains(text(),"New Submit")]';
        cy.xpath(btn).eq(1).click();
        const varA =
            '//div[@id="web-entry-app"]//div[@id="tab-form"]//div[@name="we_screenP"]//label[contains(text(),"varA")]//following-sibling::div[@class="invalid-feedback"]';
        const varB =
            '//div[@id="web-entry-app"]//div[@id="tab-form"]//div[@name="we_screenP"]//label[contains(text(),"varB")]//following-sibling::div[@class="invalid-feedback"]';
        const varC =
            '//div[@id="web-entry-app"]//div[@id="tab-form"]//div[@name="we_screenP"]//label[contains(text(),"varC")]//following-sibling::div[@class="invalid-feedback d-block"]';
        const varD =
            '//div[@id="web-entry-app"]//div[@id="tab-form"]//div[@name="we_screenP"]//label[contains(text(),"varD")]//following-sibling::div[@class="invalid-feedback d-block"]';
        const varE =
            '//div[@id="web-entry-app"]//div[@id="tab-form"]//div[@name="we_screenP"]//label[contains(text(),"varE")]//following-sibling::div[@class="invalid-feedback"]';

        const varF =
            '//div[@id="web-entry-app"]//div[@id="tab-form"]//div[@name="we_screenP"]//label[contains(text(),"varF")]//following-sibling::div[@class="invalid-feedback"]';
        const varG =
            '//div[@id="web-entry-app"]//div[@id="tab-form"]//div[@name="we_screenP"]//label[contains(text(),"varG")]//following-sibling::div[@class="invalid-feedback"]';
        const varH =
            '//div[@id="web-entry-app"]//div[@id="tab-form"]//div[@name="we_screenP"]//label[contains(text(),"varH")]//following-sibling::div[@class="invalid-feedback d-block"]';
        const varI =
            '//div[@id="web-entry-app"]//div[@id="tab-form"]//div[@name="we_screenP"]//label[contains(text(),"varI")]//following-sibling::div[@class="invalid-feedback d-block"]';
        const varJ =
            '//div[@id="web-entry-app"]//div[@id="tab-form"]//div[@name="we_screenP"]//label[contains(text(),"varJ")]//following-sibling::div[@class="invalid-feedback"]';

        const varP =
            '//div[@id="web-entry-app"]//div[@id="tab-form"]//div[@name="we_screenP"]//label[contains(text(),"varP")]//following-sibling::div[@class="invalid-feedback d-block"]';
        const varQ =
            '//div[@id="web-entry-app"]//div[@id="tab-form"]//div[@name="we_screenP"]//label[contains(text(),"varQ")]//following-sibling::div[@class="invalid-feedback"]';
        const varR =
            '//div[@id="web-entry-app"]//div[@id="tab-form"]//div[@name="we_screenP"]//label[contains(text(),"varR")]//following-sibling::div[@class="invalid-feedback"]';
        const varS =
            '//div[@id="web-entry-app"]//div[@id="tab-form"]//div[@name="we_screenP"]//label[contains(text(),"varS")]//following-sibling::div[@class="invalid-feedback"]';
        const varT =
            '//div[@id="web-entry-app"]//div[@id="tab-form"]//div[@name="we_screenP"]//label[contains(text(),"varT")]//following-sibling::div[@class="invalid-feedback d-block"]';

        const varK =
            '//div[@id="web-entry-app"]//div[@id="tab-form"]//div[@name="we_screenP"]//label[contains(text(),"varK")]//following-sibling::div[@class="invalid-feedback"]';
        const varL =
            '//div[@id="web-entry-app"]//div[@id="tab-form"]//div[@name="we_screenP"]//label[contains(text(),"varL")]//following-sibling::div[@class="invalid-feedback d-block"]';
        const varM =
            '//div[@id="web-entry-app"]//div[@id="tab-form"]//div[@name="we_screenP"]//label[contains(text(),"varM")]//following-sibling::div[@class="invalid-feedback"]';
        const varN =
            '//div[@id="web-entry-app"]//div[@id="tab-form"]//div[@name="we_screenP"]//label[contains(text(),"varN")]//following-sibling::div[@class="invalid-feedback d-block"]';
        const varO =
            '//div[@id="web-entry-app"]//div[@id="tab-form"]//div[@name="we_screenP"]//label[contains(text(),"varO")]//following-sibling::div[@class="invalid-feedback"]';

        //loop 1 - required
        cy.xpath(varF).eq(0).should("have.text", "Field is required");
        cy.xpath(varG).eq(0).should("have.text", "Field is required");
        cy.xpath(varH).eq(0).should("have.text", "Field is required");
        cy.xpath(varI).eq(0).should("have.text", "Field is required");
        cy.xpath(varJ).eq(0).should("have.text", "Field is required");
        //loop 2 - required
        cy.xpath(varF).eq(1).should("have.text", "Field is required");
        cy.xpath(varG).eq(1).should("have.text", "Field is required");
        cy.xpath(varH).eq(1).should("have.text", "Field is required");
        cy.xpath(varI).eq(1).should("have.text", "Field is required");
        cy.xpath(varJ).eq(1).should("have.text", "Field is required");

        //loop 1 - required unless
        cy.xpath(varP).eq(0).should("have.text", "Field is required");
        cy.xpath(varQ).eq(0).should("have.text", "Field is required");
        cy.xpath(varR).eq(0).should("have.text", "Field is required");
        cy.xpath(varS).eq(0).should("have.text", "Field is required");
        cy.xpath(varT).eq(0).should("have.text", "Field is required");
        //loop 2 - required unless
        cy.xpath(varP).eq(1).should("have.text", "Field is required");
        cy.xpath(varQ).eq(1).should("have.text", "Field is required");
        cy.xpath(varR).eq(1).should("have.text", "Field is required");
        cy.xpath(varS).eq(1).should("have.text", "Field is required");
        cy.xpath(varT).eq(1).should("have.text", "Field is required");

        //loop 1 - required if
        const condition = '//div[@name="we_screenP"]//input[@name="condition"]';
        cy.xpath(condition).eq(0).type(1);
        cy.xpath(condition).eq(1).type(1);
        cy.wait(1000);
        cy.xpath(varK).eq(0).should("have.text", "Field is required");
        cy.xpath(varL).eq(0).should("have.text", "Field is required");
        cy.xpath(varM).eq(0).should("have.text", "Field is required");
        cy.xpath(varN).eq(0).should("have.text", "Field is required");
        cy.xpath(varO).eq(0).should("have.text", "Field is required");
        //loop 2 - required if
        cy.xpath(varK).eq(1).should("have.text", "Field is required");
        cy.xpath(varL).eq(1).should("have.text", "Field is required");
        cy.xpath(varM).eq(1).should("have.text", "Field is required");
        cy.xpath(varN).eq(1).should("have.text", "Field is required");
        cy.xpath(varO).eq(1).should("have.text", "Field is required");

        //form required
        cy.xpath(varA).should("have.text", "Field is required");
        cy.xpath(varB).should("have.text", "Field is required");
        cy.xpath(varC).should("have.text", "Field is required");
        cy.xpath(varD).should("have.text", "Field is required");
        cy.xpath(varE).should("have.text", "Field is required");

        //form
        const conA = '//div[@name="we_screenP"]//input[@name="conA"]';
        cy.xpath(conA).type(1);

        const lineInput =
            '//div[@id="web-entry-app"]//div[@id="tab-form"]//div[@name="we_screenP"]//label[contains(text(),"New Input")]//following-sibling::div[@class="invalid-feedback"]';
        const textarea =
            '//div[@id="web-entry-app"]//div[@id="tab-form"]//div[@name="we_screenP"]//label[contains(text(),"New Textarea")]//following-sibling::div[@class="invalid-feedback"]';
        const datePicker =
            '//div[@id="web-entry-app"]//div[@id="tab-form"]//div[@name="we_screenP"]//label[contains(text(),"New Date Picker")]//following-sibling::div[@class="invalid-feedback d-block"]';

        cy.xpath(lineInput).should("have.text", "Field is required");
        cy.xpath(textarea).should("have.text", "Field is required");
        cy.xpath(datePicker).should("have.text", "Field is required");
    }
}
