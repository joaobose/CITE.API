const joi = require('joi');
const BaseValidator = require('fun.framework/classes/src/BaseValidator');
const fun = require('fun.framework/functions/general/errors.fun');

const Errors = require('../../errors');

class UserShowValidator extends BaseValidator {
  constructor() {
    super();
    this.name = 'User show validator';
  }

  async validate(req, res) {
    const validator = joi.object().keys({
      id: joi.number().integer().required()
    });

    const params = {
      id: req.params.id
    };

    await validator
      .validateAsync(params)
      .catch(fun.catch(req, res, new Errors.BadRequestError()));

    return params;
  }
}

module.exports = UserShowValidator;
