import { type Locator, type Page, expect } from '@playwright/test';

export class RegisterResultPage {
    readonly page: Page;
    readonly elements: {
        registerMessage: Locator,
        btnConfirm: Locator
    };

    constructor(page: Page) {
        this.page = page;
        this.elements = {
            registerMessage: page.getByText('Your registration completed'),
            btnConfirm: page.getByRole('link', { name: 'Continue'})
        };
    };

};