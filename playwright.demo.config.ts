import { defineConfig } from '@playwright/test';
import baseConfig from './playwright.config';

export default defineConfig(baseConfig, {
  testDir: './tests/demo',
  testIgnore: [],   // clear the inherited exclusion — this config's only job is to run it
});