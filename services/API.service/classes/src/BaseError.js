const uuid = require('uuid/v1');
const R = require('ramda');

class BaseError {
  id = undefined;
  links = undefined;
  status = 500;
  code = undefined;
  title = 'genericInternalServerError';
  detail = undefined;
  source = undefined;
  meta = {};

  constructor(feed) {
    this.id = uuid();

    R.pipe(
      R.keys,
      R.filter((property) => R.has(property)(this)),
      R.forEach((property) => {
        this[property] = feed[property];
      })
    )(feed);
  }

  compact() {
    return R.pipe(
      R.keys,
      R.filter((property) => this[property]),
      R.map((property) => {
        return R.objOf(property, this[property]);
      }),
      R.mergeAll
    )(this);
  }
}

module.exports = BaseError;
