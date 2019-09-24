'use strict';

const { rule } = use('Validator');
const Antl = use('Antl');

class Workshop {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      title: 'required',
      description: 'required',
      section: [rule('required'), rule('in', [1, 2, 3])],
      user_id: 'required|exists:users,id',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = Workshop;
