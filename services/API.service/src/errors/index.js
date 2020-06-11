const JWT = require('./JWT');
const Auth = require('./Auth');
const BadRequestError = require('./BadRequestError');
const ResourceNotFoundError = require('./ResourceNotFoundError');

module.exports = {
  JWT: JWT,
  Auth: Auth,
  BadRequestError: BadRequestError,
  ResourceNotFoundError: ResourceNotFoundError
};
