'use strict';

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

Factory.blueprint('App/Models/User', (faker, i, data = {}) => ({
  name: faker.name(),
  title: 'CTO - Rocketseat',
  email: faker.email(),
  password: faker.string(),
  ...data,
}));

Factory.blueprint('App/Models/Token', (faker, i, data = {}) => ({
  token: faker.string({ length: 24 }),
  type: data.type || 'refreshtoken',
}));

Factory.blueprint('App/Models/Workshop', (faker, i, data = {}) => ({
  title: faker.sentence({ words: 7 }),
  description: faker.paragraph(),
  section: faker.integer({ min: 1, max: 3 }),
  ...data,
}));
