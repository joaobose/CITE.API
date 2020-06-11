const http = require('./http/http.fun');

let rest = (router, controller) => {
  return (restValidators) => {
    return (middlewares) => {
      // index - GET
      http(router, controller).get(
        '/',
        'index',
        new restValidators.index()
      )(middlewares);

      // store - POST
      http(router, controller).post(
        '/',
        'store',
        new restValidators.store()
      )(middlewares);

      // show - GET
      http(router, controller).get(
        '/:id',
        'show',
        new restValidators.show()
      )(middlewares);

      // update - PUT
      http(router, controller).put(
        '/:id',
        'update',
        new restValidators.update()
      )(middlewares);

      // destroy - DELETE
      http(router, controller).delete(
        '/:id',
        'destroy',
        new restValidators.destroy()
      )(middlewares);
    };
  };
};

module.exports = rest;
