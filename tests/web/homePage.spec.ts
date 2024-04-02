import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/homePage';

test.describe('Suite Test Home Page', async () => {

    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        homePage.goTo();
    });

    test('Cenário 1: Acessar a Home do Site', async () => {
        await expect(homePage.elements.registerLink).toBeVisible();
        await expect(homePage.elements.loginLink).toBeVisible();
    });
})  