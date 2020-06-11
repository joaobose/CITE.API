const errorFun = require('../../functions/general/errors.fun');

class BaseValidator {
  name = 'Base validator';

  async validate(req, res) {
    return {};
  }

  throw(req, res, error) {
    errorFun.throw(req, res, error);
  }

  catch(req, res, error) {
    errorFun.catch(req, res, error);
  }
}

module.exports = BaseValidator;
