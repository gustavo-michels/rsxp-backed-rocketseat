'use strict';

const Helpers = use('Helpers');

const { randomBytes } = require('crypto');
const { promisify } = require('util');

class ProfileController {
  async update({ request, auth }) {
    const data = request.only(['name', 'title', 'bio', 'github', 'linkedin']);
    const password = request.input('password');

    const user = await auth.getUser();

    const avatar = request.file('avatar');

    if (avatar) {
      const random = await promisify(randomBytes)(8);
      const randomfilename = random.toString('hex');

      await avatar.move(Helpers.tmpPath('uploads'), {
        name: `${new Date().getTime() + randomfilename}.${avatar.subtype}`,
      });

      if (!avatar.moved()) {
        return avatar.error();
      }

      user.avatar = avatar.fileName;
    }
    user.merge(data);

    if (password) {
      user.password = password;
    }

    await user.save();

    return user;
  }
}

module.exports = ProfileController;
