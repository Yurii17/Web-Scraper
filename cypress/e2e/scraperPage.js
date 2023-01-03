class scraperPage {
    /**
     * 
     * @param {string} firstName 
     * @param {string} lastName 
     * @param {string} licenseNumber 
     */
    fillByInputDataForm(firstName, lastName, licenseNumber) {
        cy.fillField('#physician-first-name-input', firstName);
        cy.fillField('#physician-last-name-input', lastName);
        cy.get('#mat-radio-3').click();
        cy.fillField('#physician-license-number-input', licenseNumber);
        cy.clickBtn('button');
    }

    /**
     * 
     * @param {string} fileOutput 
     */
    ifLicenseExist(fileOutput) {
        cy.wait(2000);
        cy.get('body').then(($body) => {
            if ($body.find('.ag-center-cols-clipper :nth-child(1) span').length > 0) {
                cy.get('.ag-center-cols-clipper :nth-child(1) span').then(($selector) => {
                    if ($selector) {
                        cy.get('hyperlink-cell-renderer > a').invoke('removeAttr', 'target').click();
                        this.writesDataToFile(fileOutput);
                        cy.screenshot('screenshot')
                    }
                })               
            } else {
                cy.get('[class="no-result-container"]').first().invoke('text').then((text) => {
                    cy.writeFile(fileOutput, { 
                        error: text,
                    });
                }) 
            }
        })
    }

    /**
     * 
     * @param {string} fileOutput 
     */
    writesDataToFile(fileOutput) {
        cy.get('[class="profile-section-value"]').as('el')
        cy.get('@el').eq(0).first().invoke('text').then((text) => {
            cy.writeFile(fileOutput, { 
                name: text,
            });
        });

        cy.get('@el').eq(3).first().invoke('text').then((text) => {
            cy.readFile(fileOutput).then((obj) => {
                obj.licenseNumber = (text)
                cy.writeFile(fileOutput, obj)
            })
        });

        cy.get('@el').eq(4).first().invoke('text').then((text) => {
            cy.readFile(fileOutput).then((obj) => {
                obj.licenseStatus = (text)
                cy.writeFile(fileOutput, obj)
            })
        });

        cy.get('@el').eq(8).first().invoke('text').then((text) => {
            cy.readFile(fileOutput).then((obj) => {
                var today = new Date(text);
                obj.expirationDate = (today.toLocaleDateString())
                cy.writeFile(fileOutput, obj)
            })
        })
    }

}

export default new scraperPage