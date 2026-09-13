import { Page, Locator } from '@playwright/test';
import { CheckoutStepOnePage } from './CheckoutStepOnePage';
import { productSlug } from './slug';

export class CartPage {

    readonly page: Page;
    readonly itemNames: Locator;
    readonly checkoutButton: Locator;
    readonly continueShoppingButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.itemNames = page.getByTestId('inventory-item-name');
        this.checkoutButton = page.getByTestId('checkout');
        this.continueShoppingButton = page.getByTestId('continue-shopping');
    }

    async removeItem(productName: string) {
        await this.page.getByTestId(`remove-${productSlug(productName)}`).click();
    }

    async getItemNames(): Promise<string[]> {
        return this.itemNames.allTextContents();
    }

    async checkout(): Promise<CheckoutStepOnePage> {
        await this.checkoutButton.click();
        return new CheckoutStepOnePage(this.page);
    }
}
