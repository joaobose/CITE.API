const bcrypt = require('bcrypt');
const R = require('ramda');
const BCRYPT_SALT_ROUNDS = 11;
const BaseController = require('../../classes/src/BaseController');
const UserRepository = require('../database/repositories/user.repository');
const UserTransform = require('../transforms/user.transform');
const RoleTransform = require('../transforms/role.transform');
const ProjectTransform = require('../transforms/project.transform');
const Logger = require('../../classes/Logger');
const Errors = require('../errors');
const logger = new Logger();
const userRepository = new UserRepository();

class UserController extends BaseController {
  constructor() {
    super();

    this.transforms = {
      user: new UserTransform(),
      role: new RoleTransform(),
      project: new ProjectTransform()
    };
  }

  async index(req, res, validated) {
    //--------------------- getting users data ---------------------//
    let users = await userRepository.all();

    //---------------------- sending response ----------------------//
    this.response(res).JSONAPI.data(users, this.transforms.user.collection);
  }

  async show(req, res, validated) {
    //---------------------- getting user data ---------------------//
    let user = await userRepository.show(validated.id);
    if (!user) {
      this.throw(
        req,
        res,
        new Errors.ResourceNotFoundError({
          requested: { id: validated.id, type: 'user' }
        })
      );
    }

    //---------------------- sending response ----------------------//
    this.response(res).JSONAPI.data(user, this.transforms.user.item);
  }

  async store(req, res, validated) {
    //----------------------- creating user ------------------------//
    validated.password = await bcrypt.hash(
      validated.password,
      BCRYPT_SALT_ROUNDS
    );
    let user = await userRepository.create(validated);

    //---------------------- sending response ----------------------//
    this.response(res, 201).JSONAPI.reference(user.id, 'user');
  }

  async update(req, res, validated) {
    //----------------------- updating user ------------------------//
    let affectedRows = await userRepository.update(validated.id, validated);

    //---------------------- sending response ----------------------//
    this.response(res).JSONAPI.reference(validated.id, 'user', {
      meta: {
        affectedRows: affectedRows[0]
      }
    });
  }

  async destroy(req, res, validated) {
    //----------------------- deleting user ------------------------//
    let affectedRows = await userRepository.delete(validated.id);

    //---------------------- sending response ----------------------//
    this.response(res).JSONAPI.meta({
      affectedRows: affectedRows
    });
  }

  async role(req, res, validated) {
    //--------------------- getting role data ----------------------//
    let role = await userRepository.role(validated.id);

    //---------------------- sending response ----------------------//
    this.response(res).JSONAPI.data(role, this.transforms.role.item);
  }

  async showWith(req, res, validated) {
    //---------------------- getting user data ---------------------//
    let user = await userRepository.showWith(validated.id, validated.with);
    if (!user) {
      this.throw(
        req,
        res,
        new Errors.ResourceNotFoundError({
          requested: { id: validated.id, type: 'user' }
        })
      );
    }

    //------------------------- transforming -----------------------//
    let transformed = this.transforms.user.item(user);
    R.forEach((item) => {
      transformed.relationships[item.rel] = {
        data: this.transforms[item.entity].arbitrary(user[item.rel])
      };
    }, validated.relationships);

    //---------------------- sending response ----------------------//
    this.response(res).JSONAPI.data(transformed);
  }
}

module.exports = UserController;
