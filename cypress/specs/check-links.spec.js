describe('Visit landing page and check external links', () => {
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

            it('Check LinkedIn, BeHence and Instagram on default page', () => {
                cy.get('a[href="https://www.instagram.com/recotis.art"]')
                    .should('be.visible')
                    .and('have.attr', 'target', '_blank')
                //TODO: Behance cy.contains('a[href="https://www.instagram.com/recotis.art"]')
                cy.get('a[href="https://www.linkedin.com/in/renatacotis"]')
                    .should('be.visible')
                    .and('have.attr', 'target', '_blank')
            })

            it('Check LinkedIn, BeHence and Instagram on page footer', () => {
                cy.scrollTo('bottom')
                cy.get('a[href="https://www.instagram.com/recotis.art"]')
                    .should('be.visible')
                    .and('have.attr', 'target', '_blank')
                //TODO: Behance cy.contains('a[href="https://www.instagram.com/recotis.art"]')
                cy.get('a[href="https://www.linkedin.com/in/renatacotis"]')
                    .should('be.visible')
                    .and('have.attr', 'target', '_blank')
            })
        })
    })
})