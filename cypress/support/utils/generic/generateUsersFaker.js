import { faker } from '@faker-js/faker';

export const generateUsers = function (num) {
    let users = [];
    for (let i = 0; i < num; i++) {
        users.push({
            "fName": faker.person.firstName(),
            "lName": faker.person.lastName(),
            "gender": faker.person.sex().toLowerCase(),
            "email": faker.internet.email()
        });
    };
    return users
}