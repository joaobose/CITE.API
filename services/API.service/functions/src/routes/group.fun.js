let R = require('ramda');

let group = (router, controller) => {
  return (middlewares) => {
    return (routes) => {
      R.forEach((route) => {
        route(middlewares);
      }, routes);
    };
  };
};

module.exports = group;
