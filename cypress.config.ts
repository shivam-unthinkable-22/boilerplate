import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    supportFile: false,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setupNodeEvents(on, config) {},
  },
});
