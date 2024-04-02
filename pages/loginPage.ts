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

    async inputCredentials(userEmail: any, userPassword: any) {
        
        if (userEmail) {
            await this.elements.email.clear();
            await this.elements.email.fill(userEmail);
        } 

        if (userPassword) {
            await this.elements.password.clear();
            await this.elements.password.fill(userPassword);
        } 
    };

    async submitCredentials() {
        await this.elements.btnLogin.click();
    };
};