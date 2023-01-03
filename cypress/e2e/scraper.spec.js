import scraperPage from './scraperPage';

describe('web scraper', () => {
    beforeEach(() => {
        cy.visit('/');
    });   

    it('scrap by valid input data', () => {
        cy.fixture('input.json').then(function (data) {
            scraperPage.fillByInputDataForm(data.firstName, data.lastName, data.licenseNumber);
        });
        scraperPage.ifLicenseExist('cypress/output/data.json');
    });

    it('scrap by invalid input data', () => {
        cy.fixture('input.json').then(function (data) {
            scraperPage.fillByInputDataForm(data.firstName, data.lastName, '1231231');
        });
        scraperPage.ifLicenseExist('cypress/output/data.json');
    });

  
})