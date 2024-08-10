import { defineConfig } from "cypress";

export default defineConfig({
  watchForFileChanges:false,
  defaultCommandTimeout:10000,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:5173',
    env: {
      VITE_BASE_URL: 'http://localhost:8080/',
    },
  },
});
