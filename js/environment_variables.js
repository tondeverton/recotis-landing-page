/**
 * @type {Object}
 * @property {string} bffHost
 * @property {number} minimumContactNameLength
 * @property {number} minimumContactSubjectLength
 * @property {number} minimumContactMessageLength
 * @property {number} defaultDebounceTimeout
 * @property {number} textAreaDebounceTimeout
 */
window.__env = {}

/** @returns {string} */
function getBffHost() {
    return window.__env?.bffHost ?? 'http://localhost:8080'
}

/** @returns {number} */
function getMinimumContactNameLength() {
    return window.__env?.minimumContactNameLength ?? 2
}

/** @returns {number} */
function getMinimumContactSubjectLength() {
    return window.__env?.minimumContactSubjectLength ?? 5
}

/** @returns {number} */
function getMinimumContactMessageLength() {
    return window.__env?.minimumContactMessageLength ?? 7
}

/** @returns {number} */
function getDefaultDebounceTimeout() {
    return window.__env?.defaultDebounceTimeout ?? 300
}

/** @returns {number} */
function getTextAreaDebounceTimeout() {
    return window.__env?.textAreaDebounceTimeout ?? 600
}
