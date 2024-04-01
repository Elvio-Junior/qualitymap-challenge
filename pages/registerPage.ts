import { type Locator, type Page, expect } from '@playwright/test';

export class RegisterPage {
    readonly page: Page;
    readonly elements: {
        genderMale: Locator,
        genderFemale: Locator,
        firstName: Locator,
        lastName: Locator,
        birthDay: Locator,
        birthMonth: Locator,
        birthYear: Locator,
        email: Locator,
        companyDetails: Locator,
        newsLetterOption: Locator,
        password: Locator,
        confirmPassword: Locator,
        btnRegister: Locator,
        firstNameError: Locator,
        lastNameError: Locator,
        emailError: Locator,
        passwordError: Locator,
        confirmPasswordError: Locator
    };

    constructor(page: Page) {
        this.page = page;
        this.elements = {
            genderMale: page.locator('[id="gender-male"]'),
            genderFemale: page.locator('[id="gender-female"]'),
            firstName: page.locator('[id="FirstName"]'),
            lastName: page.locator('[id="LastName"]'),
            birthDay: page.locator('select[name="DateOfBirthDay"]'),
            birthMonth: page.locator('select[name="DateOfBirthMonth"]'),
            birthYear: page.locator('select[name="DateOfBirthYear"]'),
            email: page.locator('[id="Email"]'),
            companyDetails: page.locator('[id="Company"]'),
            newsLetterOption: page.locator('[id="Newsletter"]'),
            password: page.locator('[id="Password"]'),
            confirmPassword: page.locator('[id="ConfirmPassword"]'),
            btnRegister: page.locator('[id="register-button"]'),
            firstNameError: page.locator('[id="FirstName-error"]'),
            lastNameError: page.locator('[id="LastName-error"]'),
            emailError: page.locator('[id="Email-error"]'),
            passwordError: page.locator('[id="Password-error"]'),
            confirmPasswordError: page.locator('[id="ConfirmPassword-error"]'),
        };
    }

    async assertElements(){
        await expect(this.elements.genderMale).toBeVisible();
        await expect(this.elements.genderFemale).toBeVisible();
        await expect(this.elements.firstName).toBeVisible();
        await expect(this.elements.lastName).toBeVisible();
        await expect(this.elements.birthDay).toBeVisible();
        await expect(this.elements.birthMonth).toBeVisible();
        await expect(this.elements.birthYear).toBeVisible();
        await expect(this.elements.email).toBeVisible();
        await expect(this.elements.companyDetails).toBeVisible();
        await expect(this.elements.newsLetterOption).toBeVisible();
        await expect(this.elements.password).toBeVisible();
        await expect(this.elements.confirmPassword).toBeVisible();
        await expect(this.elements.btnRegister).toBeVisible();
    };

    async assertErrorMessage(registerLocator: Locator, messageError: string){
        await expect(registerLocator).toBeVisible();
        await expect(registerLocator).toHaveText(messageError);
    };

    async fillFieldValue(registerLocator: Locator, value: string) {
        await registerLocator.clear();
        await registerLocator.fill(value);
    };
};