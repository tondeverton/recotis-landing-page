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