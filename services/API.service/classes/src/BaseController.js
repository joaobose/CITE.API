const errorFun = require('../../functions/general/errors.fun');
const R = require('ramda');
const JSONAPIFun = require('../../functions/JSONAPI/JSONAPI.fun');

class BaseController {
  throw(req, res, error) {
    errorFun.throw(req, res, error);
  }

  catch(req, res, error) {
    errorFun.catch(req, res, error);
  }

  response(res, code = 200) {
    return {
      express: res.status(code),
      JSONAPI: JSONAPIFun(res, code)
    };
  }
}

module.exports = BaseController;
