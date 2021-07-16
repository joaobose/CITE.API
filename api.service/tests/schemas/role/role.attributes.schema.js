const joi = require('joi');

module.exports = joi.object().keys({
  name: joi.string().valid('board', 'member', 'applicant').required()
});
