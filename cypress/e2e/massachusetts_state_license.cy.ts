//@ts-check
import {isEqual} from 'lodash';

const enum VerificationError {
    NoLicenseFoundError = 'NoLicenseFoundError',
    NameDoesNotMatchLicenseError = 'NameDoesNotMatchLicenseError',
    NumberDoesNotMatchLicenseError = 'NumberDoesNotMatchLicenseError',
    MultipleLicensesFoundError = 'MultipleLicensesFoundError',
}

const enum Endpoint {
    SEARCH = '/api-public/search',
}

type PhysicianData = {
    firstName: string,
    lastName: string,
    licenseNumber: string
}

type OutputLicense = {
    name?: string,
    licenseNumber?: string,
    licenseStatus?: string,
    expirationDate?: string,
    error?: string
}

Cypress.on('uncaught:exception', () => {
    return false
})

describe('Scrape https://findmydoctor.mass.gov', () => {

    let dataSuite: PhysicianData[];

    before(() => {
        cy.fixture('input').then((data: PhysicianData[]) => dataSuite = data);
    })

    it(`Scrape licenses`, () => {
        const outputLicenses: OutputLicense[] = [];
        for (const license of dataSuite) {
            const outputLicense: OutputLicense = {};
            let canOpenLicense = true;
            cy.request('POST', Endpoint.SEARCH, {
                licenseMetaId: null,
                licenseNumber: license.licenseNumber,
                searchType: "BY_LICENSE_NUMBER",
            }).then(response => {
                const searchResults = response.body.results;
                if (searchResults.totalDataCount == 0) {
                    outputLicense.error = `${VerificationError.NoLicenseFoundError}: by number ${license.licenseNumber}`;
                    canOpenLicense = false;
                } else if (!searchResults.data[0].fullName.includes(license.firstName) && !searchResults.data[0].fullName.includes(license.lastName)) {
                    outputLicense.error = `${VerificationError.NameDoesNotMatchLicenseError}: actual - ${searchResults.data[0].fullName}, expected - ${license.firstName} ${license.lastName}`;
                }
            }).then(() => {
                cy.request('POST', Endpoint.SEARCH, {
                    firstName: license.firstName,
                    lastName: license.lastName,
                    searchType: "BY_PHYSICIAN_NAME",
                }).then(response => {
                    const searchResults = response.body.results;
                    if (searchResults.totalDataCount == 0) {
                        outputLicense.error = `${VerificationError.NoLicenseFoundError}: by name ${license.firstName} ${license.lastName}, ${JSON.stringify(searchResults)}`;
                    } else if (searchResults.totalDataCount > 1) {
                        outputLicense.error = `${VerificationError.MultipleLicensesFoundError}: by name ${license.firstName} ${license.lastName}, ${JSON.stringify(searchResults)}`;
                    } else if (!isEqual(searchResults.data[0].licenseNumber, license.licenseNumber)) {
                        outputLicense.error = `${VerificationError.NumberDoesNotMatchLicenseError}: actual - ${searchResults.data[0].licenseNumber}, expected - ${license.licenseNumber}`;
                    }
                });
            }).then(() => {
                if (canOpenLicense) {
                    cy.visit(`/profiles/${license.licenseNumber}`);
                    cy.getValueFromLabel('Licensee Name:')
                        .then((value: string) => outputLicense.name = value);
                    cy.getValueFromLabel('License Number:')
                        .then((value: string) => outputLicense.licenseNumber = value);
                    cy.getValueFromLabel('License Status:')
                        .then((value: string) => outputLicense.licenseStatus = value);
                    cy.getValueFromLabel('License Expiration Date:')
                        .then((value: string) => {
                            outputLicense.expirationDate = new Date(Date.parse(value)).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit'
                            });
                        });
                    cy.screenshot(`license-${license.licenseNumber}-screenshot`);
                }
                if (outputLicense.error) {
                    outputLicenses.push({error: outputLicense.error});
                } else {
                    outputLicenses.push(outputLicense);
                }
            });
        }
        cy.writeFile(`cypress/output/data.json`, outputLicenses);
    })
})
