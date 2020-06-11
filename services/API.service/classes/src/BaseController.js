const errorFun = require('../../functions/general/errors.fun');

class BaseController {
  throw(req, res, error) {
    errorFun.throw(req, res, error);
  }

  catch(req, res, error) {
    errorFun.catch(req, res, error);
  }
}

module.exports = BaseController;
