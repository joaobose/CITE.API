const jwt = require('jsonwebtoken');
const UserRepository = require('../database/repositories/user.repository');
const Logger = require('../../classes/Logger');
const logger = new Logger();
const userRepository = new UserRepository();
const Errors = require('../errors');
const fun = require('../../functions/general/errors.fun');

module.exports = async (req, res, next) => {
  try {
    logger.info('validating JWT ...');

    // ------------------- getting the Auth JWT -------------------- //
    let token = req.get('Authorization');
    if (!token) {
      fun.thrower(req, res, new Errors.JWT.MissingJWTError());
    }

    // ------------------ decoding the Auth JWT -------------------- //
    let decoded = jwt.decode(token);
    if (!decoded) {
      fun.thrower(req, res, new Errors.JWT.BadJWTError(token));
    }

    // ----------------- validate decoded user id ------------------ //
    if (isNaN(decoded.user)) {
      fun.thrower(req, res, new Errors.JWT.BadJWTError(token));
    }

    // --------------- getting the valid JWT secret ---------------- //
    let validJWT = await userRepository.validJWT(decoded.user);
    if (!validJWT) {
      fun.thrower(req, res, new Errors.JWT.InvalidJWTError(token));
    }

    // -------------------- verifying the JWT ----------------------- //
    try {
      jwt.verify(token, validJWT.secret);
    } catch {
      fun.thrower(req, res, new Errors.JWT.InvalidJWTError(token));
    }

    logger.info('JWT validated');
    next();
  } catch (err) {
    logger.error(err);
  }
};
