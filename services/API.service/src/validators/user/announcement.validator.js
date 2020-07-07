const BaseValidator = require('../../../classes/src/BaseValidator');
const Broadcaster = require('../../socket/broadcaster/broadcaster');
const Errors = require('../../errors');
const fun = require('../../../functions/general/errors.fun');
const joi = require('joi');

class AnnouncementValidator extends BaseValidator {
  constructor() {
    super();
    this.name = 'User announcement validator';
    this.broadcaster = new Broadcaster();
  }

  async validate(req, res) {
    const validator = joi.object().keys({
      channel: joi.string().required(),
      message: joi.string().required()
    });

    const params = {
      channel: req.fields.channel,
      message: req.fields.message
    };

    await joi
      .validate(params, validator)
      .catch(fun.catch(req, res, new Errors.BadRequestError()));

    if (!this.broadcaster.searchChannel(params.channel)) {
      let reason = params.channel + ' channel is not registered for broadcast';
      fun.throw(req, res, new Errors.BadRequestError(reason));
    }

    return params;
  }
}

module.exports = AnnouncementValidator;
