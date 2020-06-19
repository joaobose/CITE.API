const http = require('./http/http.fun');
const group = require('./group.fun');
const rest = require('./rest.fun');
const R = require('ramda');

let routes = (router, controller) => {
  return R.mergeAll([
    http(router, controller),
    {
      group: group(router, controller),
      rest: rest(router, controller)
    }
  ]);
};

module.exports = routes;
