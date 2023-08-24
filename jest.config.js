const config = {
    preset: 'jest-puppeteer',
      reporters: [
          "default",
          ["jest-html-reporters", {
            "publicPath": "/test-results",
            "filename": "Lou-Geh-Supermarket-Test-Results.html",
            "openReport": true
          }]
        ]
  };
  
  module.exports = config;