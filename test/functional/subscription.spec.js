'use strict';

const { test, trait } = use('Test/Suite')('Subscription');

/** @typedef {import('@adonisjs/lucid/src/Factory')} Factory */
const Factory = use('Factory');

const Hash = use('Hash');

trait('Test/ApiClient');
trait('DatabaseTransactions');
trait('Auth/Client');

test('user should be able to subscribe to workshop', async ({
  assert,
  client,
}) => {
  const user = await Factory.model('App/Models/User').create();
  const workshop = await Factory.model('App/Models/Workshop').create();

  const response = await client
    .post(`/workshops/${workshop.id}/subscriptions`)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(201);

  const subscriptionWorkshop = await user.subscriptions().first();

  assert.equal(subscriptionWorkshop.id, workshop.id);
});

test('user should not be able to subscribe to two workshops in the same section', async ({
  assert,
  client,
}) => {
  const user = await Factory.model('App/Models/User').create();

  const workshop1 = await Factory.model('App/Models/Workshop').create({
    section: 1,
  });
  const workshop2 = await Factory.model('App/Models/Workshop').create({
    section: 1,
  });

  await user.subscriptions().attach(workshop1.id);

  const response = await client
    .post(`/workshops/${workshop2.id}/subscriptions`)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);

  const subscriptions = await user.subscriptions().count();

  assert.equal(subscriptions[0]['count(*)'], 1);
});

test('workshop can only receive 48 subscriptions', async ({
  assert,
  client,
}) => {
  const originalHashMake = Hash.make;

  Hash.make = () => 'hash_fake';

  const users = await Factory.model('App/Models/User').createMany(48);
  const usersIds = users.map(user => user.id);

  Hash.make = originalHashMake;

  const workshop = await Factory.model('App/Models/Workshop').create();
  const user = await Factory.model('App/Models/User').create();

  await workshop.subscriptions().attach(usersIds);

  const response = await client
    .post(`/workshops/${workshop.id}/subscriptions`)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(400);

  const subscriptions = await workshop.subscriptions().count();

  assert.equal(subscriptions[0]['count(*)'], 48);
});

test('user should unsubscribe from a workshop', async ({ client, assert }) => {
  const user = await Factory.model('App/Models/User').create();
  const workshop = await Factory.model('App/Models/Workshop').create();

  await user.subscriptions().attach(workshop.id);

  const response = await client
    .delete(`/workshops/${workshop.id}/subscriptions`)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(204);

  const subscriptionWorkshop = await user.subscriptions().first();

  assert.isNull(subscriptionWorkshop);
});
