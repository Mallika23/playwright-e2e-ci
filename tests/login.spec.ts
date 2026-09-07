import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';



test("goto Website and check login", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await expect(page).toHaveTitle("Swag Labs");
    await loginPage.login('standard_user', 'secret_sauce');
    
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.getByTestId('title')).toHaveText('Products');


});



test('locked out user test', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');
    await expect(loginPage.errorMessage).toContainText('Epic sadface: Sorry, this user has been locked out.');
    await expect(page).toHaveURL('/');   //negative path 
});

test('invalid user test', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('invalid_user', 'invalid_password');  
    await expect(loginPage.errorMessage).toContainText('Epic sadface: Username and password do not match any user in this service');
})


test('invalid password test', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'invalid_password');  
    await expect(loginPage.errorMessage).toContainText('Epic sadface: Username and password do not match any user in this service');
});


   

