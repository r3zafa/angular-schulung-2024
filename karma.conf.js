process.env.CHROME_BIN = require('puppeteer').executablePath();
console.warn(process.env.CHROME_BIN);
module.exports = function (config) {
  config.set({
    basePath: "",
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: false,
    restartOnFileChange: true,
    singleRun: false,
    concurrency: Infinity,
    captureTimeout: 210000,
    browserDisconnectTolerance: 3,
    browserDisconnectTimeout: 210000,
    browserNoActivityTimeout: 210000,
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    frameworks: [
      "jasmine",
      '@angular-devkit/build-angular'
    ],
    reporters: [
      "progress",
      "kjhtml",
      'coverage'
    ],
    plugins: [
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-jasmine-html-reporter"),
      require("karma-firefox-launcher"),
      require("@angular-devkit/build-angular/plugins/karma"),
      'karma-coverage'
    ],
    browsers: [
      "Chrome",
      'ChromeHeadless'
    ],
    customLaunchers: {
      ChromeHeadless: {
        base: "Chrome",
        flags: ["--no-sandbox", '--disable-dev-shm-usage'],
      },
      FirefoxHeadless: {
        base: "Firefox",
        flags: ["--headless"],
      },
    },
    coverageReporter: {
      type: 'html', // You can also specify other formats like 'lcov', 'text-summary', etc.
      dir: 'coverage/',
    },
  });
};
