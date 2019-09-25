'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash');

const Env = use('Env');

class User extends Model {
  static boot() {
    super.boot();

    this.addHook('beforeSave', async userInstance => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password);
      }
    });
  }

  static get computed() {
    return ['avatar_url'];
  }

  getAvatarUrl({ avatar }) {
    return `${Env.get('APP_URL')}/files/${avatar}`;
  }

  static get hidden() {
    return ['password'];
  }

  tokens() {
    return this.hasMany('App/Models/Token');
  }

  workshops() {
    return this.hasMany('App/Models/Workshop');
  }
}

module.exports = User;
