import { type Locator, type Page, expect } from '@playwright/test';
import { Person } from '../helpers/data/person';

export class CustomerInfoPage {
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
            newsLetterOption: page.locator('[id="Newsletter"]')
        };
    }

    async assertElements(person: Person){

        person.sexType == 'male' ? await expect(this.elements.genderMale).toBeChecked() : await expect(this.elements.genderFemale).toBeChecked();
        await expect(this.elements.firstName).toHaveValue(person.firstName);
        await expect(this.elements.lastName).toHaveValue(person.lastName);
        await expect(this.elements.birthDay).toContainText(person.birthDay);
        await expect(this.elements.birthMonth).toHaveValue(person.birthMonth);
        await expect(this.elements.birthYear).toContainText(person.birthYear);
        await expect(this.elements.email).toHaveValue(person.email);
        await expect(this.elements.companyDetails).toHaveValue(person.companyName);
        await expect(this.elements.newsLetterOption).toBeChecked();
    };

};