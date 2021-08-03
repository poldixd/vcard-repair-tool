const path = require("path");

describe('Repair Tool', () => {
    beforeEach(() => {
        cy.reload().visit('/')
    })

    it('can render', () => {
        cy.contains('Datei mit Ziehen-und-Ablegen hochladen oder hier klicken')
            .should('not.contain', 'Fehler')
    })

    it('checks it the uploaded file has the correct mime type', () => {
        cy.get('input[type="file"]').attachFile('text_file.txt')
        cy.contains('Die hochgeladene Datei ist kein elektronische Visitenkarte')
    })

    it('checks it the uploaded vcf/file is to small', () => {
        cy.get('input[type="file"]').attachFile('small.vcf')
        cy.contains('Die hochgeladene Datei ist zu klein')
    })

    it('checks it the uploaded vcf is valid', () => {
        cy.get('input[type="file"]').attachFile('invalid.vcf')
        cy.contains('Die hochgeladene Datei enthält kein elektronische Visitenkarte')
    })

    it('checks it the uploaded vcf can converted', () => {
        cy.get('input[type="file"]').attachFile('valid.vcf')

        cy.contains('Download Vcard')

        cy.get('button').click()

        cy.readFile(path.join(Cypress.config('downloadsFolder'), 'valid_repariert.vcf'))
            .should('eq', "BEGIN:VCARD\r\nVERSION:3.0\r\nSOURCE:https://foo.bar\r\nPROFILE:VCARD\r\nFN;CHARSET=utf-8:FooBar\r\nN;CHARSET=utf-8:FooBar\r\nEMAIL;TYPE=internet;CHARSET=utf-8:foo@foo.bar\r\nURL:https://foo.bar\r\nREV:2021-08-02T12:51:57Z\r\nEND:VCARD")
    })
})