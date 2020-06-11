const http = require('./http/http.fun');
const group = require('./group.fun');
const rest = require('./rest.fun');

let routes = (router, controller) => {
  return {
    http: http(router, controller),
    group: group(router, controller),
    rest: rest(router, controller)
  };
};

module.exports = routes;
