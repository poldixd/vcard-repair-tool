Cypress.Commands.add('uploadFixture', (fileName, mimeType) => {
  cy.fixture(fileName, null).then((contents) => {
    cy.get('input[type="file"]').selectFile(
      {
        contents,
        fileName,
        mimeType,
      },
      { force: true }
    )
  })
})
