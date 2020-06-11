const BaseValidator = require('../../../../../classes/src/BaseValidator');
const Errors = require('../../../../errors');
const fun = require('../../../../../functions/general/errors.fun');
const joi = require('joi');

class UserDestroyValidator extends BaseValidator {
  constructor() {
    super();
    this.name = 'User destroy validator';
  }

  async validate(req, res) {
    const validator = joi.object().keys({
      id: joi.number().integer().required()
    });

    const params = {
      id: req.params.id
    };

    await joi
      .validate(params, validator)
      .catch(fun.catch(req, res, new Errors.BadRequestError()));

    return params;
  }
}

module.exports = UserDestroyValidator;
