const joi = require('joi');
const BaseValidator = require('fun.framework/classes/src/BaseValidator');
const fun = require('fun.framework/functions/general/errors.fun');

const Errors = require('../../errors');

class LoginValidator extends BaseValidator {
  constructor() {
    super();
    this.name = 'Login validator';
  }

  async validate(req, res) {
    const validator = joi.object().keys({
      email: joi.string().trim().required(),
      password: joi.string().trim().required()
    });

    const params = {
      email: req.fields.email,
      password: req.fields.password
    };

    await joi
      .validate(params, validator)
      .catch(fun.catch(req, res, new Errors.BadRequestError()));

    return params;
  }
}

module.exports = LoginValidator;
