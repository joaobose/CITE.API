const BaseTransform = require('../../classes/src/BaseTransform');

class TestTransform extends BaseTransform {
  morph(object) {
    return {
      token: object.token
    };
  }
}

module.exports = TestTransform;
