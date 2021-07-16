const joi = require('joi');

module.exports = joi.object().keys({
  name: joi.string().required(),
  description: joi.string().required(),
  startedAt: joi.date().allow(null).required(),
  trelloBoard: joi.string().allow(null).required(),
  driveFolder: joi.string().allow(null).required(),
  status: joi
    .string()
    .valid('queued', 'inProgress', 'cancelled', 'finished')
    .required()
});
