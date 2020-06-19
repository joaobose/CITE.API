const bcrypt = require('bcrypt');
const BCRYPT_SALT_ROUNDS = 11;
const BaseController = require('../../classes/src/BaseController');
const UserRepository = require('../database/repositories/user.repository');
const JWTRepository = require('../database/repositories/jwt.repository');
const Logger = require('../../classes/Logger');
const Errors = require('../errors');
const logger = new Logger();
const userRepository = new UserRepository();
const jwtRepository = new JWTRepository();

class AuthController extends BaseController {
  async login(req, res, validated) {
    //---------------------- getting user data ---------------------//
    let user = await userRepository.getByEmail(validated.email);
    if (!user) {
      this.throw(req, res, new Errors.Auth.WrongCredentialsError());
    }

    //----------------------- auth comparison ----------------------//
    let auth = await bcrypt.compare(validated.password, user.password);
    if (!auth) {
      this.throw(req, res, new Errors.Auth.WrongCredentialsError());
    }

    //---------------------- token management ----------------------//
    await jwtRepository.removeAllTokens(user);
    let token = await jwtRepository.generateToken(user);

    //------------------------ transforming ------------------------//
    user = JSON.parse(JSON.stringify(user));
    delete user.password;
    user.token = token;

    //---------------------- sending response ----------------------//
    res.json({
      data: user
    });
  }
}

module.exports = AuthController;
