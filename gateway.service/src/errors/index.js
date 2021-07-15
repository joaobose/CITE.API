const Auth = require('./Auth');
const JWT = require('./JWT');
const BadRequestError = require('./BadRequestError');
const ResourceNotFoundError = require('./ResourceNotFoundError');
const UnauthorizedError = require('./UnauthorizedError');
const ApiGatewayError = require('./ApiGatewayError');

module.exports = {
  Auth: Auth,
  JWT: JWT,
  BadRequestError: BadRequestError,
  ResourceNotFoundError: ResourceNotFoundError,
  UnauthorizedError: UnauthorizedError,
  ApiGatewayError: ApiGatewayError
};
