'use strict';

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.get('/', () => ({ greeting: 'Hello world in JSON' }));

Route.post('/sessions', 'SessionController.store').validator('Session');
Route.post('/forgot', 'ForgotPasswordController.store').validator(
  'ForgotPassword'
);
Route.post('/reset', 'ResetPasswordController.store').validator(
  'ResetPassword'
);

Route.group(() => {
  Route.get('/workshops', 'WorkshopController.index');
  Route.post('/workshops', 'WorkshopController.store').validator('Workshop');
}).middleware('auth');
