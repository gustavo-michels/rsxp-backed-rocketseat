'use strict';

const { test, trait } = use('Test/Suite')('FortotPassword');

const { subHours, format } = require('date-fns');

/** @typedef {import('@adonisjs/lucid/src/Factory')} Factory */
const Database = use('Database');
const Factory = use('Factory');
const Hash = use('Hash');
const Mail = use('Mail');

trait('Test/ApiClient');
trait('DatabaseTransactions');

test('it should send an email with reset password instructions', async ({
  assert,
  client,
}) => {
  Mail.fake();

  const email = 'test@gmail.com';

  const user = await Factory.model('App/Models/User').create({ email });

  await client
    .post('/forgot')
    .send({ email })
    .end();

  const token = await user.tokens().first();

  const recentEmail = Mail.pullRecent();

  assert.equal(recentEmail.message.to[0].address, email);
  assert.include(token.toJSON(), { type: 'forgotpassword' });

  Mail.restore();
});

test('it should be able to reset password', async ({ assert, client }) => {
  const email = 'test@gmail.com';

  const user = await Factory.model('App/Models/User').create({ email });
  const userToken = await Factory.model('App/Models/Token').make({
    type: 'forgotpassword',
  });

  await user.tokens().save(userToken);

  const response = await client
    .post('/reset')
    .send({
      token: userToken.token,
      password: '123456',
      password_confirmation: '123456',
    })
    .end();

  response.assertStatus(204);

  await user.reload();
  const checkPassword = await Hash.verify('123456', user.password);

  assert.isTrue(checkPassword);
});

test('it canoot reset password after 2h of forgot password request', async ({
  client,
}) => {
  const email = 'test@gmail.com';

  const user = await Factory.model('App/Models/User').create({ email });
  const userToken = await Factory.model('App/Models/Token').make({
    type: 'forgotpassword',
  });

  await user.tokens().save(userToken);

  const dateWithSub = format(subHours(new Date(), 2), 'yyyy-MM-dd HH:mm:ss');

  await Database.table('tokens')
    .where('token', userToken.token)
    .update('created_at', dateWithSub);

  await userToken.reload();

  const response = await client
    .post('/reset')
    .send({
      token: userToken.token,
      password: '123456',
      password_confirmation: '123456',
    })
    .end();

  response.assertStatus(400);
});
