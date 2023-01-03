import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'yurii.lobas',
  viewportWidth: 1920,
  viewportHeight: 1080,
  waitForAnimations: true,
  animationDistanceThreshold: 100,
  chromeWebSecurity: false,
  screenshotsFolder: 'cypress/output',
  reporter: 'mochawesome',
  reporterOptions: {
    mochaFile: 'results/my-test-output-[hash].xml',
    reporterEnabled: 'mochawesome-reporter, mocha-junit-reporter',
    cypressMochawesomeReporterReporterOptions: {
      reportDir: 'cypress/reports',
      charts: true,
      overwrite: false,
      reportPageTitle: 'My Test Suite',
      embeddedScreenshots: true,
      inlineAssets: true
    }
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://findmydoctor.mass.gov/',
    specPattern: 'cypress/e2e/**/*.{spec.js,jsx,ts,tsx}',
  },
});
