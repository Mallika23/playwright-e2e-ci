import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';

// NOT part of the suite (see testIgnore in playwright.config.ts).
// Run on demand to regenerate a trace/screenshot/video for the README:
//   npx playwright test --config=playwright.demo.config.ts --headed
test('DEMO: intentionally wrong assertion, for trace-viewer capture', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  const inventoryPage = new InventoryPage(page);
  await inventoryPage.addItemToCart('Sauce Labs Backpack');

  // Wrong on purpose: 1 item was added, not 5 — real login/add-to-cart happens
  // for real, then this fails cleanly so trace/screenshot/video all fire.
  await expect(inventoryPage.cartBadge).toHaveText('5');
});