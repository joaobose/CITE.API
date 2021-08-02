const fun = require('fun.framework/functions/general/errors.fun');
const JWTFun = require('fun.framework/functions/general/JWT.fun');
const Logger = require('fun.framework/classes/Logger');
const logger = new Logger();

const APIService = require('../services/api.service');

module.exports = async (req, res, next) => {
  try {
    logger.debug('running Bearer scheme authorization ...');

    //--------------------- getting schema
    let schema = JWTFun.http.decodeBearerScheme(req, res);

    //--------------------- validating schema
    const apiService = new APIService({ req, res });
    await apiService.checkJWT(schema.token);

    logger.debug('Request authorized by Bearer scheme');
    next();
  } catch (err) {
    fun.internal(req, res, err);
  }
};
