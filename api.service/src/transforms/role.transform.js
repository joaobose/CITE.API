const BaseTransform = require('fun.framework/classes/src/BaseTransform');

class RoleTransform extends BaseTransform {
  morph(role) {
    return {
      id: role.id,
      type: 'role',
      attributes: {
        name: role.name
      }
    };
  }
}

module.exports = RoleTransform;
