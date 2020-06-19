const BaseValidator = require('../../../classes/src/BaseValidator');
const Errors = require('../../errors');
const fun = require('../../../functions/general/errors.fun');
const joi = require('joi');

class UserIndexValidator extends BaseValidator {
  constructor() {
    super();
    this.name = 'User index validator';
  }

  async validate(req, res) {
    return {};
  }
}

module.exports = UserIndexValidator;
