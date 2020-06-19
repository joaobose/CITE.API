const R = require('ramda');
const BaseValidator = require('../../../classes/src/BaseValidator');
const Errors = require('../../errors');
const fun = require('../../../functions/general/errors.fun');
const joi = require('joi');

class UserUpdateValidator extends BaseValidator {
  constructor() {
    super();
    this.name = 'User update validator';
  }

  async validate(req, res) {
    const validator = joi.object().keys({
      id: joi.number().integer().required(),
      name: joi.string().optional(),
      lastname: joi.string().optional(),
      description: joi.string().optional()
    });

    const params = R.pick(['name', 'lastname', 'description'], req.fields);
    params.id = req.params.id;

    await joi
      .validate(params, validator)
      .catch(fun.catch(req, res, new Errors.BadRequestError()));

    return params;
  }
}

module.exports = UserUpdateValidator;
