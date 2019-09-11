'use strict';

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.get('/', () => ({ greeting: 'Hello world in JSON' }));

Route.post('/sessions', 'SessionController.store');
Route.post('/forgot', 'ForgotPasswordController.store');
Route.post('/reset', 'ResetPasswordController.store');
