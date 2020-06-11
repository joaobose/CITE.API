const jwt = require('jsonwebtoken');
const rand = require('random-key');
const BaseRepository = require('../../../classes/src/BaseRepository');
const JWT = require('../models/JWT');

class JWTRepository extends BaseRepository {
  constructor() {
    super(JWT);
  }

  async removeAllTokens(user) {
    await this.model.destroy({ where: { owner_id: user.id } });
  }

  async generateToken(user) {
    let JWTpayload = { user: user.id, iat: Date.now() };
    let secret = rand.generate(255);
    let token = jwt.sign(JWTpayload, secret, {
      expiresIn: '576h'
    });

    await this.create({ owner_id: user.id, secret: secret });
    return token;
  }
}

module.exports = JWTRepository;
