/*
This file is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
You may obtain a copy of the license at https://creativecommons.org/licenses/by-nc/4.0/legalcode.txt
*/

const ASSETS_EXPIRES_IN_LOCAL_STORAGE_KEY = 'assets_expires_in'

/** @returns {string[]} */
function getProtectedAssets() {
    const protecteds = document.getElementsByClassName('protected')
    const assets = []
    for (const protected of protecteds) {
        const src = protected.src;
        const assetName = src.split('/').pop()
        assets.push(assetName)
    }
    return assets
}

/** @returns {void} */
async function setAssets() {
    const assets = getProtectedAssets()

    const assetsExpiresIn = new Date(localStorage.getItem(ASSETS_EXPIRES_IN_LOCAL_STORAGE_KEY)) ?? new Date()
    const now = new Date()
    let urls = {};
    if ((assetsExpiresIn - now) > 0) {
        assets.forEach((asset) => {
            urls[asset] = localStorage.getItem(asset)
        })
    } else {
        const response = await getSignedUrls(assets)
        localStorage.setItem(ASSETS_EXPIRES_IN_LOCAL_STORAGE_KEY, response.expires_in)
        urls = { ...response.urls }
    }

    for (const key in urls) {
        const element = document.querySelector(`[src="${key}"]`)
        element.src = urls[key]
        localStorage.setItem(key, urls[key])
    }
}

setAssets()
