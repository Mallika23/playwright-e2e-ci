import { Page, Locator } from "@playwright/test";
import { CartPage } from './CartPage';
import { productSlug } from './slug';

export class InventoryPage {

    readonly page: Page;
    readonly cartBadge: Locator;
    readonly cartLink: Locator;
    readonly sortDropdown: Locator;
    readonly hamburgerMenuButton: Locator;
    readonly logoutLink: Locator;
    readonly itemPrices: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartBadge = page.getByTestId('shopping-cart-badge');
        this.cartLink = page.getByTestId('shopping-cart-link');
        this.sortDropdown = page.getByTestId('product-sort-container');
        this.hamburgerMenuButton = page.getByRole('button', { name: 'Open Menu' });
        this.logoutLink = page.getByTestId('logout-sidebar-link');
        this.itemPrices = page.getByTestId('inventory-item-price');
    }

    async goToCart(): Promise<CartPage> {
        await this.cartLink.click();
        return new CartPage(this.page);
    }

    async addItemToCart(productName: string) {
        await this.page.getByTestId(`add-to-cart-${productSlug(productName)}`).click();
    }

    async removeItemFromCart(productName: string) {
        await this.page.getByTestId(`remove-${productSlug(productName)}`).click();
    }

    async sortByFilter(sortOption: string) {
        await this.sortDropdown.selectOption(sortOption);
    }

    async openHamburgerMenu() {
        await this.hamburgerMenuButton.click();
    }

    async logout() {
        await this.logoutLink.click();
    }

    async getCartBadgeCount(): Promise<number> {
        const count = await this.cartBadge.count();
        if (count === 0) return 0;
        const badgeText = await this.cartBadge.textContent();
        return badgeText ? parseInt(badgeText) : 0;
    }

    async getItemNames(): Promise<string[]> {
        return this.page.getByTestId('inventory-item-name').allTextContents();
    }

    async getItemPrices(): Promise<number[]> {
        const prices = await this.itemPrices.allTextContents();
        return prices.map(p => parseFloat(p.replace('$', '')));
    }
}
