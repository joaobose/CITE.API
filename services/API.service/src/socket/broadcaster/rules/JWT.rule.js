const joi = require('joi');
const jwt = require('jsonwebtoken');
const BaseRule = require('fun.framework/classes/src/BaseRule');

const UserRepository = require('../../../database/repositories/user.repository');
const userRepository = new UserRepository();

class JWTRule extends BaseRule {
  constructor() {
    super();
    this.name = 'JWT Bearer authorization rule';
  }

  async body(data) {
    const validator = joi.object().keys({
      authorization: joi.string().trim().required()
    });
    const body = {
      authorization: data.authorization
    };
    await joi.validate(body, validator);

    return body;
  }

  async predicate(body) {
    // ---------------------- getting the Auth -------------------- //
    let auth = body.authorization.trim();
    let authSplit = auth.split(' ');

    // ------------------- validating auth scheme ------------------ //
    let authScheme = authSplit[0];
    if (authScheme != 'Bearer') return false;

    // ------------------ validating the token --------------------- //
    let token = authSplit[1];
    if (!token) return false;

    // ------------------ decoding the Auth JWT -------------------- //
    let decoded = jwt.decode(token);
    if (!decoded) return false;

    // ----------------- validate decoded user id ------------------ //
    if (isNaN(decoded.user)) return false;

    // --------------- getting the valid JWT secret ---------------- //
    let validJWT = await userRepository.validJWT(decoded.user);
    if (!validJWT) return false;

    // -------------------- verifying the JWT ---------------------- //
    jwt.verify(token, validJWT.secret);

    return true;
  }

  async debug() {
    return false;
  }
}

module.exports = JWTRule;
