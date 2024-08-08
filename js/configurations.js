/*
This file is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
You may obtain a copy of the license at https://creativecommons.org/licenses/by-nc/4.0/legalcode.txt
*/

const TOKEN_LOCAL_STORAGE_KEY_NAME = 'token'

/** @returns {Promise<string>} */
async function getToken() {
    return sessionStorage.getItem(TOKEN_LOCAL_STORAGE_KEY_NAME)
        ?? generateToken().then(token => {
            sessionStorage.setItem(TOKEN_LOCAL_STORAGE_KEY_NAME, token)
            return token
        }).catch(error => {
            throw new Error(`Error while getting token: ${error}`)
        })
}

function startupSetupConfiguration() {
    document.addEventListener('contextmenu', (event) => event.preventDefault())

    getToken()
}

