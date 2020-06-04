const BaseError = require('../../classes/src/BaseError');

let errorCatcher = (req, res, error) => {
  return async (catchedError) => {
    if (!error) {
      error = new BaseError({
        status: 500,
        title: 'genericInternalServerError',
        detail:
          'The server encounter an exception, check meta for internal error details',
        meta: {
          route: req.originalUrl
        }
      });
    }
    error.meta.internalError = catchedError;
    res.status(error.status).json({ errors: [error.compact()] });

    throw error.compact();
  };
};

let errorHandler = (req, res, error) => {
  if (!error) {
    error = new BaseError({
      status: 500,
      title: 'genericInternalServerError',
      detail:
        'The server encounter an exception, check meta for internal error details',
      meta: {
        route: req.originalUrl
      }
    });
  }
  res.status(error.status).json({ errors: [error.compact()] });

  throw error.compact();
};

module.exports.errorCatcher = errorCatcher;
module.exports.errorHandler = errorHandler;
