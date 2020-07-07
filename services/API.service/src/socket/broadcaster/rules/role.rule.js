const joi = require('joi');
const jwt = require('jsonwebtoken');
const BaseRule = require('../../../../classes/src/BaseRule');
const UserRepository = require('../../../database/repositories/user.repository');
const userRepository = new UserRepository();

class RoleRule extends BaseRule {
  constructor(validatedRole) {
    super();
    this.validatedRole = validatedRole;
    this.name = this.validatedRole + ' role rule';
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

    // -------------------- validate user role --------------------- //
    let role = await userRepository.role(decoded.user);
    if (!role) return false;

    return role.name == this.validatedRole;
  }

  async debug() {
    return false;
  }
}

module.exports = RoleRule;
