/*
This file is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
You may obtain a copy of the license at https://creativecommons.org/licenses/by-nc/4.0/legalcode.txt
*/

require('../public/scripts/form_validation')

describe('Check function validateInput', () => {
    let mockHtmlInputElement;
    beforeEach(() => {
        mockHtmlInputElement = jest.fn()
        mockHtmlInputElement.classList = {
            add: jest.fn(),
            remove: jest.fn()
        }
    })

    test('Given parameters formInput as a element without value and any isValid function should return isValid equal to false and isEmpty equal to true', () => {
        mockHtmlInputElement.value = ''

        const inputValidation = validateInput(mockHtmlInputElement)

        expect(inputValidation.isValid).toBe(false)
        expect(inputValidation.isEmpty).toBe(true)
    })

    test('Given parameters formInput as a element with value containg only spaces and any isValid function should return isValid equal to false and isEmpty equal to true', () => {
        mockHtmlInputElement.value = '          '

        const inputValidation = validateInput(mockHtmlInputElement)

        expect(inputValidation.isValid).toBe(false)
        expect(inputValidation.isEmpty).toBe(true)
    })

    test('Given parameters formInput as a element without value and any isValid function should remove classes .valid and .invalid', () => {
        mockHtmlInputElement.value = ''

        validateInput(mockHtmlInputElement)

        expect(mockHtmlInputElement.classList.remove).toHaveBeenNthCalledWith(1, 'valid', 'invalid')
    })

    test('Given parameters formInput as a element with not blank value and isValid as function:true should returns isValid equal true and isEmpty equal false', () => {
        mockHtmlInputElement.value = 'any value'

        const inputValidation = validateInput(mockHtmlInputElement, () => true)

        expect(inputValidation.isValid).toBe(true)
        expect(inputValidation.isEmpty).toBe(false)
    })

    test('Given parameters formInput as a element with not blank value and isValid as function:true should add class .valid and remove class .invalid', () => {
        mockHtmlInputElement.value = 'any value'

        validateInput(mockHtmlInputElement, () => true)

        expect(mockHtmlInputElement.classList.add).toHaveBeenNthCalledWith(1, 'valid')
        expect(mockHtmlInputElement.classList.remove).toHaveBeenNthCalledWith(1, 'invalid')
    })

    test('Given parameters formInput as a element with not blank value and isValid as function:false should returns isValid equal false and isEmpty equal false', () => {
        mockHtmlInputElement.value = 'any value'

        const inputValidation = validateInput(mockHtmlInputElement, () => false)

        expect(inputValidation.isValid).toBe(false)
        expect(inputValidation.isEmpty).toBe(false)
    })

    test('Given parameters formInput as a element with not blank value and isValid as function:false should remove class .valid and add class .invalid', () => {
        mockHtmlInputElement.value = 'any value'

        validateInput(mockHtmlInputElement, () => false)

        expect(mockHtmlInputElement.classList.remove).toHaveBeenNthCalledWith(1, 'valid')
        expect(mockHtmlInputElement.classList.add).toHaveBeenNthCalledWith(1, 'invalid')
    })

    test('Given parameters formInput as a element with not blank value and isValid as function should call isValid with value from formInput as parameter', () => {
        const expectedValue = 'any value'
        mockHtmlInputElement.value = expectedValue
        const isValid = jest.fn()

        validateInput(mockHtmlInputElement, isValid)

        expect(isValid).toHaveBeenNthCalledWith(1, expectedValue)
    })
})