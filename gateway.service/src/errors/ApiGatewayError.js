const BaseError = require('fun.framework/classes/src/BaseError');

class ApiGatewayError extends BaseError {
  constructor(reason) {
    let feed = {
      status: 400,
      title: 'apiGatewayError',
      detail: 'There was an error at the API Gateway',
      meta: {
        reason: reason
      }
    };
    super(feed);
  }
}

module.exports = ApiGatewayError;
