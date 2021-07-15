const bcrypt = require('bcrypt');
const R = require('ramda');
const BCRYPT_SALT_ROUNDS = 11;

const BaseController = require('fun.framework/classes/src/BaseController');
const Logger = require('fun.framework/classes/Logger');
const logger = new Logger();

const UserRepository = require('../repositories/user.repository');
const UserTransform = require('../transforms/user.transform');
const RoleTransform = require('../transforms/role.transform');
const ProjectTransform = require('../transforms/project.transform');

const Broadcaster = require('../socket/broadcaster/broadcaster');
const Errors = require('../errors');
const userRepository = new UserRepository();

class UserController extends BaseController {
  constructor() {
    super();

    this.transforms = {
      user: new UserTransform(),
      role: new RoleTransform(),
      project: new ProjectTransform()
    };

    this.broadcaster = new Broadcaster();
  }

  /**
   * @api {get} /users/ getAllUsers
   * @apiName getAllUsers
   * @apiGroup User
   * @apiVersion 1.0.0
   * @apiDescription Get all users
   *
   * @apiHeader {Header} Authorization JWT Bearer security token.
   * @apiHeader {Header} x-gateway-secret The secret attached at the Gateway API
   *
   * @apiSuccess {Array} data The array of users
   *
   */
  async index(req, res, validated) {
    //---------------------- getting users data
    let users = await userRepository.all();

    //---------------------- sending response
    this.response(res).JSONAPI.data(users, this.transforms.user.collection);
  }

  /**
   * @api {get} /users/:id getUser
   * @apiName getUser
   * @apiGroup User
   * @apiVersion 1.0.0
   * @apiDescription Get a user
   *
   * @apiHeader {Header} Authorization JWT Bearer security token.
   * @apiHeader {Header} x-gateway-secret The secret attached at the Gateway API
   *
   * @apiSuccess {Object} data The user
   *
   */
  async show(req, res, validated) {
    //---------------------- getting user data
    let user = await userRepository.show(validated.id);
    if (!user) this.throw(req, res, new Errors.ResourceNotFoundError());

    //---------------------- sending response
    this.response(res).JSONAPI.data(user, this.transforms.user.item);
  }

  /**
   * @api {post} /users createUser
   * @apiName createUser
   * @apiGroup User
   * @apiVersion 1.0.0
   * @apiDescription Creates a user
   *
   * @apiHeader {Header} Authorization JWT Bearer security token.
   * @apiHeader {Header} x-gateway-secret The secret attached at the Gateway API
   *
   * @apiParam {String} name First name of the user
   * @apiParam {String} lastname Last name of the user
   * @apiParam {String} description A short profile description of the user
   * @apiParam {String} email User's email
   * @apiParam {Number} roleId The id of the User's role on the CITE lab's
   * @apiParam {String} password User's password
   *
   * @apiSuccess {Object} data A reference to the new user
   *
   */
  async store(req, res, validated) {
    //---------------------- creating user
    validated.password = await bcrypt.hash(
      validated.password,
      BCRYPT_SALT_ROUNDS
    );
    let user = await userRepository.create(validated);

    //---------------------- sending response
    this.response(res, 201).JSONAPI.reference(user.id, 'user');
  }

  /**
   * @api {put} /users/:id updateUser
   * @apiName updateUser
   * @apiGroup User
   * @apiVersion 1.0.0
   * @apiDescription Updates a user
   *
   * @apiHeader {Header} Authorization JWT Bearer security token.
   * @apiHeader {Header} x-gateway-secret The secret attached at the Gateway API
   *
   * @apiParam {String} [name] First name of the user
   * @apiParam {String} [lastname] Last name of the user
   * @apiParam {String} [description] A short profile description of the user
   *
   * @apiSuccess {Object} data A reference to the updated user
   *
   */
  async update(req, res, validated) {
    //---------------------- updating user
    let [affectedRows] = await userRepository.update(validated.id, validated);

    //---------------------- sending response
    this.response(res).JSONAPI.reference(validated.id, 'user', {
      meta: {
        affectedRows: affectedRows
      }
    });
  }

  /**
   * @api {delete} /users/:id deleteUser
   * @apiName deleteUser
   * @apiGroup User
   * @apiVersion 1.0.0
   * @apiDescription Deletes a user.
   *
   * @apiHeader {Header} Authorization JWT Bearer security token.
   * @apiHeader {Header} x-gateway-secret The secret attached at the Gateway API
   *
   * @apiSuccess {Object} meta Metadata with the affected rows
   *
   */
  async destroy(req, res, validated) {
    //---------------------- deleting user
    let affectedRows = await userRepository.delete(validated.id);

    //---------------------- sending response
    this.response(res).JSONAPI.meta({
      affectedRows: affectedRows
    });
  }

  /**
   * @api {get} /users/:id/role getRole
   * @apiName getRole
   * @apiGroup User
   * @apiVersion 1.0.0
   * @apiDescription Gets an user's role
   *
   * @apiHeader {Header} Authorization JWT Bearer security token.
   * @apiHeader {Header} x-gateway-secret The secret attached at the Gateway API
   *
   * @apiSuccess {Object} data The user's role
   *
   */
  async role(req, res, validated) {
    //---------------------- getting role data
    let role = await userRepository.role(validated.id);

    //---------------------- sending response
    this.response(res).JSONAPI.data(role, this.transforms.role.item);
  }

  /**
   * @api {get} /users/:id/with?relationships=projects,managedProjects,role,applicants getUserWith
   * @apiName getUserWith
   * @apiGroup User
   * @apiVersion 1.0.0
   * @apiDescription Gets a user with the requested relationships
   *
   * @apiHeader {Header} Authorization JWT Bearer security token.
   * @apiHeader {Header} x-gateway-secret The secret attached at the Gateway API
   *
   * @apiSuccess {Object} data The user with the requested relationships
   *
   */
  async showWith(req, res, validated) {
    //---------------------- getting user data
    let user = await userRepository.showWith(validated.id, validated.with);
    if (!user) this.throw(req, res, new Errors.ResourceNotFoundError());

    //---------------------- sending response
    this.response(res).JSONAPI.data(user, this.transforms.user.item);
  }

  /**
   * @api {post} /users/announcement broadcastAnnouncement
   * @apiName broadcastAnnouncement
   * @apiGroup User
   * @apiVersion 1.0.0
   * @apiDescription Broadcast an anoucement to a given channel. Only users with the board role can call this method.
   *
   * @apiHeader {Header} Authorization JWT Bearer security token.
   * @apiHeader {Header} x-gateway-secret The secret attached at the Gateway API
   *
   * @apiParam {String} channel Name of the given channel
   * @apiParam {String} message The message to broadcast
   *
   */
  async announcement(req, res, validated) {
    //---------------------- broadcasting
    this.broadcaster.broadcast(validated.channel, 'announcement', {
      message: validated.message
    });

    //---------------------- sending response
    this.response(res).express.send();
  }
}

module.exports = UserController;
