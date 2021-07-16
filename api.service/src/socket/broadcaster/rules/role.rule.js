const joi = require('joi');
const JWTFun = require('fun.framework/functions/general/JWT.fun');
const BaseRule = require('fun.framework/classes/src/BaseRule');

const UserRepository = require('../../../repositories/user.repository');
const userRepository = new UserRepository();

class RoleRule extends BaseRule {
  constructor(validatedRole) {
    super();
    this.validatedRole = validatedRole;
    this.name = `${this.validatedRole} role rule`;
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
    let schema = JWTFun.decodeBearerScheme(body.authorization);
    let userId = JWTFun.validateUserIdentifierFromSchema(schema);

    //-------------------- validate user role
    let role = await userRepository.role(userId);

    return !!role && role.name == this.validatedRole;
  }

  async debug() {
    return false;
  }
}

module.exports = RoleRule;
