import { type Locator, type Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly elements: {
        registerLink: Locator,
        loginLink: Locator,
        myAccountLink: Locator
    };

    constructor(page: Page) {
        this.page = page;
        this.elements = {
            registerLink: page.locator('li', { hasText: 'Register' }),
            loginLink: page.locator('li', { hasText: 'Log in' }),
            myAccountLink: page.locator('li', { hasText: 'Wishlist (0)' })

        };
    }

    async goTo() {
        await this.page.goto('https://demo.nopcommerce.com/');
    };
};