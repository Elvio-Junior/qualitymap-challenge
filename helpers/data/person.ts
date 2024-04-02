import { Faker } from '@faker-js/faker';

export class Person {
    readonly sexType;
    readonly firstName;
    readonly lastName;
    readonly email;
    readonly birthDay;
    readonly birthMonth;
    readonly birthYear;
    readonly companyName;

    constructor(faker: Faker, dateBirthdate: Date) {
        this.sexType = faker.person.sexType(),
        this.firstName = faker.person.firstName(this.sexType),
        this.lastName = faker.person.lastName(),
        this.email = faker.internet.email(),
        this.birthDay = dateBirthdate.getDay().toString(),
        this.birthMonth = dateBirthdate.getMonth().toString(),
        this.birthYear = dateBirthdate.getFullYear().toString(),
        this.companyName = faker.company.name()
    }
};