const Logger = require('../../../../classes/Logger');
const logger = new Logger();
const BaseError = require('../../../../classes/src/BaseError');
const BaseValidator = require('../../../../classes/src/BaseValidator');
const errorFun = require('../../../general/errors.fun');

/**
 * Decription here
 *
 * @param {Express.Router}   router     The router that will handle the method
 * @param {BaseController}   controller   The controller that will handle the resource
 *
 * @returns {(String) => (String, String, BaseValidator) => ([Middleware])} A high grade funtion that handles a
 *                                                                          http method call.
 */
let method = (router, controller) => {
  return (method) => {
    return (route, handlerMethodName, validator = new BaseValidator()) => {
      return (middlewares = []) => {
        router[method](route, middlewares, async (req, res) => {
          try {
            // get validated params
            logger.info(validator.name + ' validation running');
            let validated = await validator.validate(req, res);
            logger.info('Request is valid, validated by ' + validator.name);

            // call handler
            let handler = controller[handlerMethodName];
            if (handler && typeof handler === 'function') {
              await controller[handlerMethodName](res, res, validated);
              logger.info(
                req.originalUrl + ' response sent with status ' + res.statusCode
              );
            } else {
              errorFun.throw(
                req,
                res,
                new BaseError({
                  status: 500,
                  title: 'invalidHandlerUnderController',
                  detail:
                    handlerMethodName +
                    ' handler does not exist under controller or it is not a callable function',
                  meta: {
                    controller: controller
                  }
                })
              );
            }
          } catch (err) {
            logger.error(err);
          }
        });
      };
    };
  };
};

module.exports = method;
