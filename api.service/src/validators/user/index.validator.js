const joi = require('joi');
const BaseValidator = require('fun.framework/classes/src/BaseValidator');
const fun = require('fun.framework/functions/general/errors.fun');

const Errors = require('../../errors');

class UserIndexValidator extends BaseValidator {
  constructor() {
    super();
    this.name = 'User index validator';
  }

  async validate(req, res) {
    const validator = joi.object().keys({
      page: joi.number().integer()
    });

    const params = {
      page: req.query.page
    };

    await validator
      .validateAsync(params)
      .catch(fun.catch(req, res, new Errors.BadRequestError()));

    return params;
  }
}

module.exports = UserIndexValidator;
