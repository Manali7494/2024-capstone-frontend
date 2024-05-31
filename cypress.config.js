const { defineConfig } = require('cypress');

module.exports = defineConfig({
  component: {
    specPattern: 'cypress/component/**/*.{js,jsx,ts,tsx}',
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
    },
    baseUrl: 'http://localhost:3000',
  },
});
