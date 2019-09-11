'use strict';

class Session {
  get rules() {
    return {
      email: 'email|required',
      password: 'string|required',
    };
  }
}

module.exports = Session;
