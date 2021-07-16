const joi = require('joi');

module.exports = joi.object().keys({
  name: joi.string().required(),
  lastname: joi.string().required(),
  email: joi.string().email().required(),
  description: joi.string().required(),
  photo: joi.string().allow(null).required()
});
