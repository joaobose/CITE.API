const joi = require('joi');
const BaseValidator = require('fun.framework/classes/src/BaseValidator');
const fun = require('fun.framework/functions/general/errors.fun');

const Errors = require('../../errors');

class CheckTokenValidator extends BaseValidator {
  constructor() {
    super();
    this.name = 'Check token validator';
  }

  async validate(req, res) {
    const validator = joi.object().keys({
      token: joi.string().trim().required()
    });

    const params = {
      token: req.params.token
    };

    await joi
      .validate(params, validator)
      .catch(fun.catch(req, res, new Errors.BadRequestError()));

    return params;
  }
}

module.exports = CheckTokenValidator;
