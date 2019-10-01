'use strict';

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.get('/', () => ({ greeting: 'Hello world in JSON' }));

Route.get('files/:file', 'FileController.show');

Route.post('/sessions', 'SessionController.store').validator('Session');
Route.post('/forgot', 'ForgotPasswordController.store').validator(
  'ForgotPassword'
);
Route.post('/reset', 'ResetPasswordController.store').validator(
  'ResetPassword'
);

Route.group(() => {
  Route.put('/profile', 'ProfileController.update').validator('Profile');

  Route.get('/workshops', 'WorkshopController.index');
  Route.get('/workshops/:id', 'WorkshopController.show');

  Route.post('/workshops', 'WorkshopController.store').validator('Workshop');
  Route.put('/workshops/:id', 'WorkshopController.update').validator(
    'Workshop'
  );
  Route.delete('/workshops/:id', 'WorkshopController.destroy');

  Route.post(
    '/workshops/:workshop_id/subscriptions',
    'SubscriptionController.store'
  );
  Route.delete(
    '/workshops/:workshop_id/subscriptions',
    'SubscriptionController.destroy'
  );
}).middleware('auth');
