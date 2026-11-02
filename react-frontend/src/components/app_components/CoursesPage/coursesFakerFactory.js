
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
courseName: faker.lorem.sentence(""),
description: faker.lorem.sentence(""),
instructor: faker.lorem.sentence(""),
startDate: faker.date.soon(),
endDate: faker.date.soon(),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
