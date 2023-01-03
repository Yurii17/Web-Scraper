const enum VerificationError {
  NoLicenseFoundError = 'NoLicenseFoundError',
  NameDoesNotMatchLicenseError = 'NameDoesNotMatchLicenseError',
  NumberDoesNotMatchLicenseError = 'NumberDoesNotMatchLicenseError',
  MultipleLicensesFoundError = 'MultipleLicensesFoundError',
}

describe('empty spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
})