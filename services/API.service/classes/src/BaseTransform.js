const R = require('ramda');
const autoBind = require('auto-bind');

class BaseTransform {
  constructor() {
    autoBind(this);
  }

  morph(object) {
    return object;
  }

  item(item) {
    return this.morph(item);
  }

  collection(collection) {
    return R.map((item) => this.morph(item), collection);
  }
}

module.exports = BaseTransform;
