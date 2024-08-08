/*
This file is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
You may obtain a copy of the license at https://creativecommons.org/licenses/by-nc/4.0/legalcode.txt
*/

/**
 * @typedef {Object} InputValidation
 * @property {boolean} isValid
 * @property {boolean} isEmpty
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const VALID_INPUT_CLASS_NAME = 'valid'
const INVALID_INPUT_CLASS_NAME = 'invalid'
const SHOW_POPUP_MESSAGE_SENT_CLASS_NAME = 'show'
const BLOCK_OVERFLOW_CLASS_NAME = 'overflow-hidden'
const POPUP_MESSAGE_SENT_CLASS_NAME = 'popup'
const POPUP_MESSAGE_FAIL_CLASS_NAME = 'fail'
const BUTTON_CLOSE_POPUP_MESSAGE_SENT_CLASS_NAME = 'close'
const FORM_LOADING_CLASS_NAME = 'loading'

/** @type {HTMLFormElement} */
const form = document.getElementById('contact-me-form')
/** @type {HTMLInputElement} */
const contactName = document.getElementById('contact-name')
/** @type {HTMLInputElement} */
const contactSubject = document.getElementById('contact-subject')
/** @type {HTMLAreaElement} */
const contactMessage = document.getElementById('contact-message')
/** @type {HTMLInputElement} */
const contactEmail = document.getElementById('contact-email')
/** @type {HTMLDivElement} */
const popupContainerMessageSent = document.getElementById('popup-container-message-sent')
/** @type {HTMLDivElement} */
const popupMessageSent = document.querySelector('#popup-container-message-sent .popup')
/** @type {HTMLSpanElement} */
const popupContactName = document.getElementById('popup-contact-name')
/** @type {HTMLAnchorElement} */
const popupMessageSentMailTo = document.querySelector('#popup-container-message-sent p:nth-child(2) a')
/** @type {HTMLButtonElement} */
const closeButtonPopupMessageSent = document.querySelector('#popup-container-message-sent .button.close')
/** @type {HTMLButtonElement} */
const formButton = document.querySelector('form .button')

function debounce(func, delay = getDefaultDebounceTimeout()) {
    let timeout

    return (...args) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => func.apply(this, args), delay)
    }
}

/**
 * @param {HTMLInputElement} formInput 
 * @param {function(string): boolean} isValid 
 * @returns {InputValidation}
 */
function validateInput(formInput, isValid) {
    let inputValue = formInput.value.trim()
    if (inputValue === '') {
        formInput.classList.remove(VALID_INPUT_CLASS_NAME, INVALID_INPUT_CLASS_NAME)
        formInput.value = ''
        return { isValid: false, isEmpty: true }
    }

    let isEmpty = false

    if (isValid(inputValue)) {
        formInput.classList.add(VALID_INPUT_CLASS_NAME)
        formInput.classList.remove(INVALID_INPUT_CLASS_NAME)
        return { isValid: true, isEmpty }
    }

    formInput.classList.add(INVALID_INPUT_CLASS_NAME)
    formInput.classList.remove(VALID_INPUT_CLASS_NAME)
    return { isValid: false, isEmpty }
}

/** @returns {InputValidation} */
function validateContactName() {
    return validateInput(contactName, (value) => value.length >= getMinimumContactNameLength())
}

/** @returns {InputValidation} */
function validateContactSubject() {
    return validateInput(contactSubject, (value) => value.length >= getMinimumContactSubjectLength())
}

/** @returns {InputValidation} */
function validateContactMessage() {
    return validateInput(contactMessage, (value) => value.length >= getMinimumContactMessageLength())
}

/** @returns {InputValidation} */
function validateContactEmail() {
    return validateInput(contactEmail, (value) => EMAIL_PATTERN.test(value))
}

function validateForm() {
    const { isValid: isContactNameValid, isEmpty: isContactNameEmpty } = validateContactName()
    if (!isContactNameValid || isContactNameEmpty) {
        contactName.focus()
        return
    }
    const { isValid: isContactSubjectValid, isEmpty: isContactSubjectEmpty } = validateContactSubject()
    if (!isContactSubjectValid || isContactSubjectEmpty) {
        contactSubject.focus()
        return
    }
    const { isValid: isContactMessageValid, isEmpty: isContactMessageEmpty } = validateContactMessage()
    if (!isContactMessageValid || isContactMessageEmpty) {
        contactMessage.focus()
        return
    }
    const { isValid: isContactEmailValid, isEmpty: isContactEmailEmpty } = validateContactEmail()
    if (!isContactEmailValid || isContactEmailEmpty) {
        contactEmail.focus()
        return
    }

    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
}

function closePopupMessageSent() {
    popupContainerMessageSent.classList.remove(SHOW_POPUP_MESSAGE_SENT_CLASS_NAME)
    document.body.classList.remove(BLOCK_OVERFLOW_CLASS_NAME)
}

function openPopupMessageSent() {
    popupContainerMessageSent.classList.add(SHOW_POPUP_MESSAGE_SENT_CLASS_NAME)
    document.body.classList.add(BLOCK_OVERFLOW_CLASS_NAME)
}

function resetForm() {
    form.reset()
    contactName.classList.remove(VALID_INPUT_CLASS_NAME)
    contactSubject.classList.remove(VALID_INPUT_CLASS_NAME)
    contactMessage.classList.remove(VALID_INPUT_CLASS_NAME)
    contactEmail.classList.remove(VALID_INPUT_CLASS_NAME)
}

function bindContactNameIntoPopup() {
    popupContactName.textContent = ` ${contactName.value.split(' ')[0]}`
}

async function formSubmit(event) {
    event.preventDefault()

    const name = contactName.value
    const email = contactEmail.value
    const subject = contactSubject.value
    const message = contactMessage.value

    form.classList.add(FORM_LOADING_CLASS_NAME)
    formButton.disabled = true

    await sendEmail({ name, email, subject, message }).then(() => {
        popupContainerMessageSent.classList.remove(POPUP_MESSAGE_FAIL_CLASS_NAME)
        bindContactNameIntoPopup()
        resetForm()
    }).catch((error) => {
        popupContainerMessageSent.classList.add(POPUP_MESSAGE_FAIL_CLASS_NAME)
        popupMessageSentMailTo.href = popupMessageSentMailTo.href
            .concat('?subject=').concat(encodeURI(subject))
            .concat('&body=').concat(encodeURI(message))
        console.error(`Error while sending email. [statusCode=${error?.status}]`)
    })

    openPopupMessageSent()
    form.classList.remove(FORM_LOADING_CLASS_NAME)
    formButton.disabled = false
}

function keepPopupMessageSentFocused(event) {
    const isPopupActive = document.activeElement.classList.contains(POPUP_MESSAGE_SENT_CLASS_NAME)
    if (isPopupActive && (event.key === 'Tab' || event.keyCode === 9) && event.shiftKey) {
        event.preventDefault()
        closeButtonPopupMessageSent.focus()
    }
    const isCloseButtonActive = document.activeElement.classList.contains(BUTTON_CLOSE_POPUP_MESSAGE_SENT_CLASS_NAME)
    if (isCloseButtonActive && (event.key === 'Tab' || event.keyCode === 9) && !event.shiftKey) {
        event.preventDefault()
        popupMessageSent.focus()
    }
}

function startupAddFormInputListeners() {
    contactName.addEventListener('input', debounce((event) => {
        event.preventDefault()
        validateContactName()
    }))
    contactSubject.addEventListener('input', debounce((event) => {
        event.preventDefault()
        validateContactSubject()
    }))
    contactMessage.addEventListener('input', debounce((event) => {
        event.preventDefault()
        validateContactMessage()
    }, getTextAreaDebounceTimeout()))
    contactEmail.addEventListener('input', debounce((event) => {
        event.preventDefault()
        validateContactEmail()
    }, getTextAreaDebounceTimeout()))
}

window.validateInput = validateInput
