const R = require('ramda');

class BaseTransform {
  morph(object) {
    return object;
  }

  item(item) {
    return this.morph(item);
  }

  collection(collection) {
    return R.map((item) => {
      return this.morph(item);
    }, collection);
  }
}

module.exports = BaseTransform;
