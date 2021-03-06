'use strict';

const Antl = use('Antl');
class Session {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      email: 'email|required',
      password: 'string|required',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = Session;
