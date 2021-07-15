const joi = require('joi');
const BaseValidator = require('fun.framework/classes/src/BaseValidator');
const fun = require('fun.framework/functions/general/errors.fun');

const Errors = require('../../errors');

class WifiDeviceIndexValidator extends BaseValidator {
  constructor() {
    super();
    this.name = 'WifiDevice index validator';
  }

  async validate(req, res) {
    return {};
  }
}

module.exports = WifiDeviceIndexValidator;
