import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test('Full checkout process test', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    const cartPage = await inventoryPage.goToCart();

    const checkoutStepOnePage = await cartPage.checkout();
    await checkoutStepOnePage.fillInfo('John', 'Doe', '12345');
    const checkoutStepTwoPage = await checkoutStepOnePage.continueToOverview();
    const checkoutCompletePage = await checkoutStepTwoPage.finish();

    await expect(checkoutCompletePage.completeHeader).toHaveText('Thank you for your order!');
    await checkoutCompletePage.backHome();
    await expect(page).toHaveURL(/inventory\.html/);
});

test('Missing information in checkout step one test', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    const cartPage = await inventoryPage.goToCart();
    const checkoutStepOnePage = await cartPage.checkout();

    await checkoutStepOnePage.fillInfo('', 'Doe', '12345');
    await checkoutStepOnePage.continueToOverview();
    await expect(checkoutStepOnePage.errorMessage).toContainText('Error: First Name is required');

    await checkoutStepOnePage.fillInfo('John', '', '12345');
    await checkoutStepOnePage.continueToOverview();
    await expect(checkoutStepOnePage.errorMessage).toContainText('Error: Last Name is required');

    await checkoutStepOnePage.fillInfo('John', 'Doe', '');
    await checkoutStepOnePage.continueToOverview();
    await expect(checkoutStepOnePage.errorMessage).toContainText('Error: Postal Code is required');
});
