# ProcessMaker Cypress Testing Utilities

This package provides a collection of utilities designed to enhance and simplify the development of tests for ProcessMaker with Cypress, an end-to-end testing framework. These utilities aim to make your ProcessMaker automated testing workflow more efficient and manageable.

## Features

- **Assertion Helpers**: Simplify the process of writing assertions by utilizing ready-to-use helper functions.
- **Custom Commands**: Extend Cypress's built-in commands with additional functionality for common use cases.
- **Pages**: Utilize reusable page objects that encapsulate the structure and behavior of ProcessMaker's pages.
- **Selectors**: Access predefined selectors for ProcessMaker's elements to facilitate test writing.

## Installation

To start using the cypress-utils in your project, you'll need to add it as a dependency. Assuming you have Node.js and npm installed, you can add the package by running:

```bash
npm install --save @processmaker/cypress-utils
```

## Usage

After installing, you can import and use the utilities in your Cypress tests.

First, add some aliases in your cypress.config.js file:

```javascript
module.exports = defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            const options = {
                webpackOptions: {
                    resolve: {
                        alias: {
                            "@helpers": "@processmaker/cypress-utils/helpers",
                            "@pages": "@processmaker/cypress-utils/pages",
                            "@selectors": "@processmaker/cypress-utils/selectors",
                            "@support": "@processmaker/cypress-utils/support"
                        },
                    },
                },
            };
        },
        on("file:preprocessor", webpack(options));
    },
});
```

Then, import and use the utilities in your tests:

```javascript
import { Login } from "@pages/login";

const login = new Login();

describe("Example Test", () => {
    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    });

    it("Loads the requests page", () => {
        cy.visit("/requests");
        cy.url().should("include", "/requests");
    });
});
```
