/**
 * @typedef {Object} SendEmailRequest
 * @property {string} name
 * @property {string} email
 * @property {string} subject
 * @property {string} message
 */

/**
 * @typedef {Object} SignedUrlsResponse
 * @property {Map<string, string>} urls
 * @property {string} expires_in
 */

const REQUEST_TIMEOUT = 5000

/**
 * @param {string} path 
 * @param {Object} body 
 * @param {AbortSignal?} signal 
 * @returns {Promise<any>}
 */
async function postRequest(path, body, signal) {
    const token = await getToken().then(t => t)
    return fetch(`${getBffHost()}${path}`, {
        method: 'POST',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': "application/json"
        },
        body: JSON.stringify({ ...body }),
        signal
    }).then(response => {
        if (response.ok)
            return response

        throw new Error(`HTTP Error! Status: ${response.status}`)
    })
}

/**
 * @param {SendEmailRequest} body 
 * @returns {Promise<void>}
 */
async function sendEmail(body) {
    const abortController = new AbortController()
    return execPromiseIn(postRequest(
        '/email',
        {
            name: body.name,
            email: body.email,
            subject: body.subject,
            message: body.message
        },
        abortController.signal
    ), REQUEST_TIMEOUT, () => abortController.abort())
}

/**
 * @param {string[]} assets 
 * @returns {Promise<SignedUrlsResponse>}
 */
async function getSignedUrls(assets) {
    const abortController = new AbortController()
    return execPromiseIn(
        postRequest(
            '/signed-urls',
            { assets },
            abortController.signal
        ).then(response => response.json()),
        REQUEST_TIMEOUT,
        () => abortController.abort()
    )
}
