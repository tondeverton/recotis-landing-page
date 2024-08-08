/*
This file is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
You may obtain a copy of the license at https://creativecommons.org/licenses/by-nc/4.0/legalcode.txt
*/

describe('Fill form and submit', () => {
    const devices = [
        { name: 'Desktop', width: 1920, height: 1080 },
        { name: 'iPad PRO portrait', width: 1024, height: 1366 },
        { name: 'iPad PRO landscape', width: 1366, height: 1024 },
        { name: 'iPhone PRO', width: 390, height: 844 },
    ]

    devices.forEach((device) => {
        context(`Testing on ${device.name}`, () => {
            beforeEach(() => {
                cy.viewport(device.width, device.height)

                cy.visit('./index.html')
            })

            it('Fill form and send', () => {
                cy.get('#contactme').focus()

                cy.get('#contact-name').type('Everton Pereira')
                cy.get('#contact-subject').type('Some subject')
                cy.get('#contact-message').type('Some big message')
                cy.get('#contact-email').type('me@tondeverton.com')

                cy.get('form .button').click()

                cy.contains('Thank you Everton,', { timeout: 3000 })
            })
        })
    })
})