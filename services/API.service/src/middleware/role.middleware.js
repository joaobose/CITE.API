const jwt = require('jsonwebtoken');
const UserRepository = require('../database/repositories/user.repository');
const Logger = require('../../classes/Logger');
const logger = new Logger();
const userRepository = new UserRepository();
const Errors = require('../errors');
const fun = require('../../functions/general/errors.fun');

module.exports = (validatedRole) => async (req, res, next) => {
  try {
    logger.info('running ' + validatedRole + ' role authorization ...');

    // ---------------------- getting the Auth -------------------- //
    let auth = req.get('Authorization');
    if (!auth) {
      let reason = 'Missing authorization';
      fun.throw(req, res, new Errors.UnauthorizedError(reason));
    }
    auth = auth.trim();
    let authSplit = auth.split(' ');

    // ------------------- validating auth scheme ------------------- //
    let authScheme = authSplit[0];
    if (authScheme != 'Bearer') {
      let reason = 'Wrong auth scheme, expected Bearer. given: ' + authScheme;
      fun.throw(req, res, new Errors.UnauthorizedError(reason));
    }

    // ------------------ validating the token --------------------- //
    let token = authSplit[1];
    if (!token) {
      fun.throw(req, res, new Errors.JWT.MissingJWTError());
    }

    // ------------------ decoding the Auth JWT -------------------- //
    let decoded = jwt.decode(token);
    if (!decoded) {
      fun.throw(req, res, new Errors.JWT.BadJWTError(token));
    }

    // ----------------- validate decoded user id ------------------ //
    if (isNaN(decoded.user)) {
      fun.throw(req, res, new Errors.JWT.BadJWTError(token));
    }

    // -------------------- validate user role --------------------- //
    let role = await userRepository.role(decoded.user);
    if (!role) {
      let reason = 'User does not belong to a role';
      fun.throw(req, res, new Errors.UnauthorizedError(reason));
    }

    if (role.name != validatedRole) {
      let reason = 'User does not belong to ' + validatedRole + ' role';
      fun.throw(req, res, new Errors.UnauthorizedError(reason));
    }

    logger.info('Request authorized by ' + validatedRole + ' role scheme');
    next();
  } catch (err) {
    logger.error(err);
  }
};
