const joi = require('joi');
const BaseValidator = require('fun.framework/classes/src/BaseValidator');
const fun = require('fun.framework/functions/general/errors.fun');

const Errors = require('../../errors');

class UserStoreValidator extends BaseValidator {
  constructor() {
    super();
    this.name = 'User store validator';
  }

  async validate(req, res) {
    const validator = joi.object().keys({
      email: joi.string().trim().required(),
      password: joi.string().trim().required(),
      name: joi.string().required(),
      lastname: joi.string().required(),
      description: joi.string().required(),
      role_id: joi.number().integer().required()
    });

    const params = {
      email: req.fields.email,
      password: req.fields.password,
      name: req.fields.name,
      lastname: req.fields.lastname,
      description: req.fields.description,
      role_id: req.fields.role_id
    };

    await joi
      .validate(params, validator)
      .catch(fun.catch(req, res, new Errors.BadRequestError()));

    return params;
  }
}

module.exports = UserStoreValidator;
