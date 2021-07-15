const joi = require('joi');
const JWTFun = require('fun.framework/functions/general/JWT.fun');
const BaseRule = require('fun.framework/classes/src/BaseRule');

const UserRepository = require('../../../repositories/user.repository');
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
    let schema = JWTFun.decodeBearerScheme(body.authorization);
    await JWTFun.verifyUserToken(schema, userRepository.validJWT);

    return true;
  }

  async debug() {
    return false;
  }
}

module.exports = JWTRule;
