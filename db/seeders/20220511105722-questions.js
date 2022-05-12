'use strict';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { faker } = require('@faker-js/faker');

const questions = [...Array(20)].map(() => ({
  title: faker.lorem.sentence(),
  description: faker.lorem.paragraph(),
  number_of_answers: 0,
  created_at: new Date(),
  created_by: 4,
  updated_at: new Date(),
  updated_by: 4,
  deleted_at: null,
  deleted_by: null,
}));

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Questions', questions, {});
  },
  down(queryInterface) {
    return queryInterface.bulkDelete('Questions', null, {});
  },
};
