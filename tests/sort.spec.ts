import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test('sort items by za', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.sortByFilter('za');
    const itemNames = await inventoryPage.getItemNames();
    const sortedItemNames = [...itemNames].sort((a, b) => b.localeCompare(a));
    expect(itemNames).toEqual(sortedItemNames);
});

test('sort items by lohi', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.sortByFilter('lohi');
    const itemPrices = await inventoryPage.getItemPrices();
    const sortedItemPrices = [...itemPrices].sort((a, b) => a - b);
    expect(itemPrices).toEqual(sortedItemPrices);
});
