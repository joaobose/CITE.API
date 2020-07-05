const R = require('ramda');
const BaseTransform = require('../../classes/src/BaseTransform');

class UserTransform extends BaseTransform {
  morph(user) {
    return {
      id: user.id,
      type: 'user',
      attributes: {
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        description: user.description,
        photo: user.photo,
        token: user.token
      },
      relationships: {
        role: {
          data: { id: user.role_id, type: 'role' },
          links: { related: '/user/' + user.id + '/role' }
        }
      },
      links: {
        self: '/user/' + user.id
      }
    };
  }
}

module.exports = UserTransform;
