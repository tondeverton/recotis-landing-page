/*
This file is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
You may obtain a copy of the license at https://creativecommons.org/licenses/by-nc/4.0/legalcode.txt
*/

const { defineConfig } = require('cypress')

module.exports = defineConfig({
    e2e: {
        specPattern: './cypress/specs/*.spec.js',
        video: true,
        viewportWidth: 1920,
        viewportHeight: 1080,
        supportFile: false
    },
})