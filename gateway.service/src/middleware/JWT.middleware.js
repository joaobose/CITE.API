const fun = require('fun.framework/functions/general/errors.fun');
const JWTFun = require('fun.framework/functions/general/JWT.fun');
const Logger = require('fun.framework/classes/Logger');
const logger = new Logger();

const BaseError = require('fun.framework/classes/src/BaseError');

const APIService = require('../services/api.service');
const apiService = new APIService();

module.exports = async (req, res, next) => {
  try {
    logger.debug('running Bearer scheme authorization ...');

    //--------------------- getting schema
    let schema = JWTFun.http.decodeBearerScheme(req, res);

    //--------------------- validating schema
    await apiService.checkJWT(schema.token).catch((reason) => {
      delete req.headers['x-gateway-secret'];
      let [error] = reason.response.data.errors;
      fun.throw(req, res, new BaseError(error));
    });

    logger.debug('Request authorized by Bearer scheme');
    next();
  } catch (err) {
    fun.internal(req, res, err);
  }
};
