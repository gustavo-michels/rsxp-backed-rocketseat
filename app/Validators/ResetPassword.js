'use strict';

const Antl = use('Antl');
class ResetPassword {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      token: 'string|required',
      password: 'string|required|confirmed',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = ResetPassword;
