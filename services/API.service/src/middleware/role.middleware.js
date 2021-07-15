const fun = require('fun.framework/functions/general/errors.fun');
const JWTFun = require('fun.framework/functions/general/JWT.fun');
const Logger = require('fun.framework/classes/Logger');
const logger = new Logger();

const UserRepository = require('../database/repositories/user.repository');
const userRepository = new UserRepository();

const Errors = require('../errors');

module.exports = (validatedRole) => async (req, res, next) => {
  try {
    logger.debug(`running ${validatedRole} role authorization ...`);

    //--------------------- validate schema
    let schema = JWTFun.http.decodeBearerScheme(req, res);
    let userId = JWTFun.http.validateUserIdentifierFromSchema(req, res, schema);

    //-------------------- validate user role
    let role = await userRepository.role(userId);
    if (!role) {
      let reason = 'User does not belong to a role';
      fun.throw(req, res, new Errors.UnauthorizedError(reason));
    }

    if (role.name != validatedRole) {
      let reason = `User does not belong to ${validatedRole} role`;
      fun.throw(req, res, new Errors.UnauthorizedError(reason));
    }

    logger.debug(`Request authorized by ${validatedRole} role scheme`);
    next();
  } catch (err) {
    fun.internal(req, res, err);
  }
};
