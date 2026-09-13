import { Page, Locator } from '@playwright/test';

export class CheckoutCompletePage {

    readonly page: Page;
    readonly completeHeader: Locator;
    readonly backToProductsButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.completeHeader = page.getByTestId('complete-header');
        this.backToProductsButton = page.getByTestId('back-to-products');
    }

    async backHome() {
        await this.backToProductsButton.click();
    }

    async generateReceipt(): Promise<string> {
        const receipt = await this.page.evaluate(() => {
            const items = Array.from(document.querySelectorAll('.inventory_item_name')).map(item => item.textContent);
            const subtotal = document.querySelector('.summary_subtotal_label')?.textContent;
            const tax = document.querySelector('.summary_tax_label')?.textContent;
            const total = document.querySelector('.summary_total_label')?.textContent;

            return `Receipt:\nItems: ${items.join(', ')}\n${subtotal}\n${tax}\n${total}`;
        });
        return receipt;
    }
}
