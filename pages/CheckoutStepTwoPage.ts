import { Page, Locator } from '@playwright/test';
import { CheckoutCompletePage } from './CheckoutCompletePage';

export class CheckoutStepTwoPage {

    readonly page: Page;
    readonly itemNames: Locator;
    readonly subtotalLabel: Locator;
    readonly taxLabel: Locator;
    readonly totalLabel: Locator;
    readonly finishButton: Locator;
    readonly cancelButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.itemNames = page.getByTestId('inventory-item-name');
        this.subtotalLabel = page.getByTestId('subtotal-label');
        this.taxLabel = page.getByTestId('tax-label');
        this.totalLabel = page.getByTestId('total-label');
        this.finishButton = page.getByTestId('finish');
        this.cancelButton = page.getByTestId('cancel');
    }

    async getItemNames(): Promise<string[]> {
        return this.itemNames.allTextContents();
    }

    async finish(): Promise<CheckoutCompletePage> {
        await this.finishButton.click();
        return new CheckoutCompletePage(this.page);
    }
}
