const bcrypt = require('bcrypt');
const BCRYPT_SALT_ROUNDS = 11;

const BaseController = require('fun.framework/classes/src/BaseController');
const Logger = require('fun.framework/classes/Logger');
const logger = new Logger();

const UserRepository = require('../database/repositories/user.repository');
const JWTRepository = require('../database/repositories/jwt.repository');
const UserTransform = require('../transforms/user.transform');

const Errors = require('../errors');

const userRepository = new UserRepository();
const jwtRepository = new JWTRepository();

class AuthController extends BaseController {
  constructor() {
    super();

    this.transforms = {
      user: new UserTransform()
    };
  }

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
    user.token = token;

    //---------------------- sending response ----------------------//
    this.response(res).JSONAPI.data(user, this.transforms.user.item);
  }
}

module.exports = AuthController;
