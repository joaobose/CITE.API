let R = require('ramda');
let method = require('./method.fun');

let http = (router, controller) => {
  return {
    post: R.curry(method(router, controller)('post')),
    get: R.curry(method(router, controller)('get')),
    put: R.curry(method(router, controller)('put')),
    patch: R.curry(method(router, controller)('patch')),
    delete: R.curry(method(router, controller)('delete'))
  };
};

module.exports = http;
