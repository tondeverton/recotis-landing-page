/*
This file is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
You may obtain a copy of the license at https://creativecommons.org/licenses/by-nc/4.0/legalcode.txt
*/

/**
 * @param {Promise} promise 
 * @param {number} msTimeout 
 * @param {function()} timeoutExpiredCallback
 */
async function execPromiseIn(promise, msTimeout, timeoutExpiredCallback = null) {
    const timeout = new Promise((_, reject) => {
        const id = setTimeout(() => {
            clearTimeout(id)

            const error = new Error('Promise time out')
            if (typeof reject === 'function')
                reject(error)
            else
                throw error

            if (typeof timeoutExpiredCallback === 'function')
                timeoutExpiredCallback()
        }, msTimeout)
    })

    return Promise.race([promise, timeout])
}

window.execPromiseIn = execPromiseIn