import { type Locator, type Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly elements: {
        email: Locator,
        password: Locator,
        btnLogin: Locator
    };

    constructor(page: Page) {
        this.page = page;
        this.elements = {
            email: page.locator('[id="Email"]'),
            password: page.locator('[id="Password"]'),
            btnLogin: page.getByRole('button', { name: 'Log in' })
        };
    }

    async goTo() {
        await this.page.goto('https://demo.nopcommerce.com/');
    };
};