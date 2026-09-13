import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';



test('add to cart test one item', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    const cartCount = await inventoryPage.getCartBadgeCount();
    expect(cartCount).toBe(1);
    await inventoryPage.openHamburgerMenu();
    await inventoryPage.logout();
    await expect(page).toHaveURL('/');
});

test('add to cart test multiple items', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.addItemToCart('Sauce Labs Bike Light');
    const cartCount = await inventoryPage.getCartBadgeCount();
    expect(cartCount).toBe(2);
    await inventoryPage.openHamburgerMenu();
    await inventoryPage.logout();
    await expect(page).toHaveURL('/');
});

 test('add to cart and remove item', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    const cartCount = await inventoryPage.getCartBadgeCount();
    expect(cartCount).toBe(1); 
    await inventoryPage.removeItemFromCart('Sauce Labs Backpack');
    const updatedCartCount = await inventoryPage.getCartBadgeCount();
    expect(updatedCartCount).toBe(0);
    await inventoryPage.openHamburgerMenu();
    await inventoryPage.logout();
    await expect(page).toHaveURL('/'); 
 });

 test('add to cart and remove one item', async ({ page }) =>{
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.addItemToCart('Sauce Labs Bike Light');
    const cartCount = await inventoryPage.getCartBadgeCount();
    expect(cartCount).toBe(2);
    await inventoryPage.removeItemFromCart('Sauce Labs Backpack');
    const updatedCartCount = await inventoryPage.getCartBadgeCount();
    expect(updatedCartCount).toBe(1);
    await inventoryPage.openHamburgerMenu();
    await inventoryPage.logout();
    await expect(page).toHaveURL('/'); 
 });