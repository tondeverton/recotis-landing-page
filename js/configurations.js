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

