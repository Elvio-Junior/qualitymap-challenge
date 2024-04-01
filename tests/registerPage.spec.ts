import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/homePage'
import { Person } from '../helpers/data/person'
import { Faker, pt_BR } from '@faker-js/faker';
import { RegisterPage } from '../pages/registerPage';
import { RegisterResultPage } from '../pages/registerResultPage';
import { registerPageMessages } from '../helpers/registerPage/registerPageMessages';
import { invalidEmails } from '../helpers/data/invalidEmails';
import { passwords } from '../helpers/data/passwords';

test.describe('Suite Test Register Page', async () => {

    let homePage: HomePage;
    let registerPage: RegisterPage;
    let registerResultPage: RegisterResultPage
    let person: Person;
    let faker: Faker;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        registerPage = new RegisterPage(page);
        registerResultPage = new RegisterResultPage(page);
        faker = new Faker({ locale: pt_BR })
        person = new Person(faker, faker.date.birthdate( {min: 18, max: 70, mode: 'age'}))
        homePage.goTo();
        homePage.elements.registerLink.click();
    });

    test('Cenário 1: Acessar a pagina de Register', async () => {
        await registerPage.assertElements();
    });

    test('Cenário 2: Clicar no botão Register sem preenchimento de informações', async () => {
        await registerPage.elements.btnRegister.click();

        await registerPage.assertErrorMessage(registerPage.elements.firstNameError, registerPageMessages.firstNameRequired);
        await registerPage.assertErrorMessage(registerPage.elements.lastNameError, registerPageMessages.lastNameRequired);
        await registerPage.assertErrorMessage(registerPage.elements.emailError, registerPageMessages.emailRequired);
        await registerPage.assertErrorMessage(registerPage.elements.passwordError, registerPageMessages.passwordRequired);
        await registerPage.assertErrorMessage(registerPage.elements.confirmPasswordError, registerPageMessages.passwordRequired);
    });

    invalidEmails.forEach(function (invalidEmail) {
        test(`Cenário 3: Preencher email erroneamente. Valor ${invalidEmail}`, async () => {
            await registerPage.fillFieldValue(registerPage.elements.email, invalidEmail);
            await registerPage.elements.btnRegister.click();
            await registerPage.assertErrorMessage(registerPage.elements.emailError, registerPageMessages.wrongEmail);
        });
    });

    test('Cenário 4: Preencher somente password erroneamente', async () => {
        await registerPage.fillFieldValue(registerPage.elements.password, passwords.invalid);
        await registerPage.elements.btnRegister.click();
        await registerPage.assertErrorMessage(registerPage.elements.passwordError, registerPageMessages.passwordRules);
    });

    test('Cenário 5: Preencher somente confirm password erroneamente', async () => {
        await registerPage.fillFieldValue(registerPage.elements.confirmPassword, passwords.invalid);
        await registerPage.elements.btnRegister.click();
        await registerPage.assertErrorMessage(registerPage.elements.confirmPasswordError, registerPageMessages.passwordNotMatch);
    });

    test('Cenário 6: Preencher password e confirm password diferentes', async () => {
        await registerPage.fillFieldValue(registerPage.elements.password, passwords.invalid);
        await registerPage.fillFieldValue(registerPage.elements.confirmPassword, passwords.difent);
        await registerPage.elements.btnRegister.click();
        await registerPage.assertErrorMessage(registerPage.elements.confirmPasswordError, registerPageMessages.passwordNotMatch);
    });

    test('Cenário 7: Preencher somente First Name', async () => {
        await registerPage.fillFieldValue(registerPage.elements.firstName, person.firstName);

        await registerPage.elements.btnRegister.click();

        await expect(registerPage.elements.firstNameError).toBeHidden();
        await registerPage.assertErrorMessage(registerPage.elements.lastNameError, registerPageMessages.lastNameRequired);
        await registerPage.assertErrorMessage(registerPage.elements.emailError, registerPageMessages.emailRequired);
        await registerPage.assertErrorMessage(registerPage.elements.passwordError, registerPageMessages.passwordRequired);
        await registerPage.assertErrorMessage(registerPage.elements.confirmPasswordError, registerPageMessages.passwordRequired);
    });

    test('Cenário 8: Preencher somente First Name / Last Name', async () => {
        await registerPage.fillFieldValue(registerPage.elements.firstName, person.firstName);
        await registerPage.fillFieldValue(registerPage.elements.lastName, person.lastName);

        await registerPage.elements.btnRegister.click();

        await expect(registerPage.elements.firstNameError).toBeHidden();
        await expect(registerPage.elements.lastNameError).toBeHidden();
        await registerPage.assertErrorMessage(registerPage.elements.emailError, registerPageMessages.emailRequired);
        await registerPage.assertErrorMessage(registerPage.elements.passwordError, registerPageMessages.passwordRequired);
        await registerPage.assertErrorMessage(registerPage.elements.confirmPasswordError, registerPageMessages.passwordRequired);
    });
    
    test('Cenário 9: Preencher somente First Name / Last Name / Email', async () => {
        await registerPage.fillFieldValue(registerPage.elements.firstName, person.firstName);
        await registerPage.fillFieldValue(registerPage.elements.lastName, person.lastName);
        await registerPage.fillFieldValue(registerPage.elements.email, person.email);

        await registerPage.elements.btnRegister.click();

        await expect(registerPage.elements.firstNameError).toBeHidden();
        await expect(registerPage.elements.lastNameError).toBeHidden();
        await expect(registerPage.elements.emailError).toBeHidden();
        await registerPage.assertErrorMessage(registerPage.elements.passwordError, registerPageMessages.passwordRequired);
        await registerPage.assertErrorMessage(registerPage.elements.confirmPasswordError, registerPageMessages.passwordRequired);
    });

    test('Cenario 10: Registro salvo com sucesso', async () => {

        person.sexType == 'male' ? await registerPage.elements.genderMale.check() : await registerPage.elements.genderFemale.check() 

        await registerPage.fillFieldValue(registerPage.elements.firstName, person.firstName);
        await registerPage.fillFieldValue(registerPage.elements.lastName, person.lastName);
        await registerPage.fillFieldValue(registerPage.elements.email, person.email);
        await registerPage.elements.birthDay.selectOption(person.birthDay);
        await registerPage.elements.birthMonth.selectOption(person.birthMonth);
        await registerPage.elements.birthYear.selectOption(person.birthYear);
        await registerPage.fillFieldValue(registerPage.elements.companyDetails, person.companyName);
        await registerPage.fillFieldValue(registerPage.elements.password, passwords.valid);
        await registerPage.fillFieldValue(registerPage.elements.confirmPassword, passwords.valid);
        
        await registerPage.elements.btnRegister.click();
        
        await expect(registerResultPage.elements.registerMessage).toBeVisible();
        await expect(registerResultPage.elements.btnConfirm).toBeVisible();
    });

});