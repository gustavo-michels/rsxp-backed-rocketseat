'use strict';

const { test, trait } = use('Test/Suite')('Workshop');

/** @typedef {import('@adonisjs/lucid/src/Factory')} Factory */
const Factory = use('Factory');
const Workshop = use('App/Models/Workshop');

trait('Test/ApiClient');
trait('DatabaseTransactions');
trait('Auth/Client');

test('it should be able to create workshops', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create();

  const response = await client
    .post('/workshops')
    .loginVia(user, 'jwt')
    .send({
      title: 'Utilizando Node.js para construir APIs seguras e performáticas',
      description:
        'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?',
      user_id: user.id,
      section: 1,
    })
    .end();

  response.assertStatus(201);
  assert.exists(response.body.id);
});

test('it should be able to list workshops', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create();

  const workshop = await Factory.model('App/Models/Workshop').make();

  await user.workshops().save(workshop);

  const response = await client
    .get('/workshops')
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);
  assert.equal(response.body[0].title, workshop.title);
  assert.equal(response.body[0].user.id, user.id);
});

test('it should be able to show a single workshop', async ({
  assert,
  client,
}) => {
  const user = await Factory.model('App/Models/User').create();

  const workshop = await Factory.model('App/Models/Workshop').create();

  await user.workshops().save(workshop);

  const response = await client
    .get(`/workshops/${workshop.id}`)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);
  assert.equal(response.body.title, workshop.title);
  assert.equal(response.body.user.id, user.id);
});

test('it should be able to update a workshop', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create();

  const workshop = await Factory.model('App/Models/Workshop').create({
    title: 'Old Title',
  });

  const response = await client
    .put(`/workshops/${workshop.id}`)
    .loginVia(user, 'jwt')
    .send({ ...workshop.toJSON(), title: 'New Title' })
    .end();

  response.assertStatus(200);
  assert.equal(response.body.title, 'New Title');
});

test('it should be able to delete a workshop', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create();

  const workshop = await Factory.model('App/Models/Workshop').create({});

  const response = await client
    .delete(`/workshops/${workshop.id}`)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(204);

  const checkWorkshop = await Workshop.find(workshop.id);

  assert.isNull(checkWorkshop);
});
