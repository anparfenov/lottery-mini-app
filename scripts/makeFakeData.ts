import { faker } from '@faker-js/faker';

export function createRandomProduct() {
  return {
    id: faker.datatype.uuid(),
    name: faker.commerce.product(),
    dateCreated: faker.date.past(),
    price: faker.commerce.price(),
    imageSrc: faker.image.fashion(),
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

