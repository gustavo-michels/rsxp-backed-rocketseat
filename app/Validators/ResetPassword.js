'use strict';

class ResetPassword {
  get rules() {
    return {
      token: 'string|required',
      password: 'string|required|confirmed',
    };
  }
}

module.exports = ResetPassword;
