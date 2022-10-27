import { faker } from '@faker-js/faker';

export function createRandomProduct() {
  return {
    id: faker.datatype.uuid(),
    title: faker.commerce.product(),
    dateCreated: faker.date.past(),
    priceStart: Number(faker.commerce.price()),
    priceStep: 10,
    ownerId: faker.datatype.uuid(),
  };
}

export function makeFakeData() {
    const res = []
    for(let i = 0; i < 100; i++) {
        res.push(createRandomProduct());
    }
    return res;
}

