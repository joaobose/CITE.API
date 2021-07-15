const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const BaseController = require('fun.framework/classes/src/BaseController');
const Logger = require('fun.framework/classes/Logger');
const logger = new Logger();

const UserRepository = require('../repositories/user.repository');
const JWTRepository = require('../repositories/jwt.repository');
const UserTransform = require('../transforms/user.transform');

const JWTFun = require('fun.framework/functions/general/JWT.fun');
const JWTErrors = require('fun.framework/classes/src/errors/JWT');
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

  /**
   * @api {post} /auth/login login
   * @apiName login
   * @apiGroup Auth
   * @apiVersion 1.0.0
   * @apiDescription Login
   *
   * @apiParam {String} email Email of the user
   * @apiParam {String} password Password of the user
   *
   * @apiSuccess {Object} data The the data of the user
   */
  async login(req, res, validated) {
    //---------------------- getting user data
    let user = await userRepository.getByEmail(validated.email);
    if (!user) this.throw(req, res, new Errors.Auth.WrongCredentialsError());

    //---------------------- auth comparison
    let auth = await bcrypt.compare(validated.password, user.password);
    if (!auth) this.throw(req, res, new Errors.Auth.WrongCredentialsError());

    //---------------------- token management
    await jwtRepository.removeAllTokens(user);
    let token = await jwtRepository.generateToken(user);
    user.token = token;

    //---------------------- sending response
    this.response(res).JSONAPI.data(user, this.transforms.user.item);
  }

  /**
   * @api {post} /token/:token checkToken
   * @apiName checkToken
   * @apiGroup Auth
   * @apiVersion 1.0.0
   * @apiDescription Check if a token exists and it is valid
   *
   */
  async checkToken(req, res, validated) {
    try {
      //---------------------- decoding token
      let decoded = jwt.decode(validated.token);
      if (!decoded) fun.throw(req, res, new JWTErrors.BadJWTError(token));

      //---------------------- validating token
      await JWTFun.http.verifyUserToken(
        req,
        res,
        { token: validated.token, decoded: decoded },
        userRepository.validJWT
      );

      //---------------------- sending response
      this.response(res).express.send();
    } catch {
      fun.throw(req, res, new JWTErrors.BadJWTError(token));
    }
  }
}

module.exports = AuthController;
