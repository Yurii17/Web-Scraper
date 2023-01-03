/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject = any> {
        /**
         * Custom command to ... add your description here
         * @example cy.clickOnMyJourneyInCandidateCabinet()
         */
        clickOnMyJourneyInCandidateCabinet(): Chainable<null>;

        /**
         * Custom command to click attribute.
         * @param el 
         * @param args 
         */
        clickBtn(el: string, ...args: any[]): any;

        /**
         * Custom command to click force true.
         * @param el 
         */
        clickForceTrue(el: string): void;
        
        /**
         * Custom command to assert Checked.
         * @param el 
         */
        assertChecked(el: string): void;

        /**
         * Custom command to select element by value attribute.
         * @param el 
         */
        getByEl(el: string): void;

        /**
         * Custom command to select first element and click.
         * @param el
         */
        firstClick(el: string): void;

        /**
         * Custom command to clear Field by element and assert it.
         * @param el 
         */
        clearField(el: string): void;

        /**
         * Custom command to fill the field with values
         * @param el 
         * @param value 
         */
        fillField(el: string, value: string | number): void

        /**
         * Custom command to fill the first field.
         * @param el 
         * @param value 
         */
        fillFirstField(el: string, value: string | number): void

        /**
         * Custom command to contains some text and click it.
         * @param el 
         */
        containsAndClick(el: string): void

        /**
         * Custom command to assert and contains some text.
         * @param el 
         * @param value 
         */
        waitText(el: string, value: string): void

        /**
         * Custom command to assert and contains first text.
         * @param el 
         * @param value 
         */
        waitFirstText(el: string, value: string): void

        /**
         * Custom command to wait value.
         * @param el 
         * @param value 
         */
        waitValue(el: string, value: string | number): void      

    }
}
