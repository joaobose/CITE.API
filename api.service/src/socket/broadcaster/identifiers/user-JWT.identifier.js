const BaseIdentifier = require('fun.framework/classes/src/BaseIdentifier');
const JWTFun = require('fun.framework/functions/general/JWT.fun');

class UserJWTIdentifier extends BaseIdentifier {
  async body(data) {
    return JWTFun.decodeBearerScheme(data.authorization);
  }

  async identify(body) {
    return body.decoded.user;
  }
}

module.exports = UserJWTIdentifier;
