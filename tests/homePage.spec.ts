import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/homePage'
import { Person } from '../helpers/data/person'
import { Faker, pt_BR } from '@faker-js/faker';

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