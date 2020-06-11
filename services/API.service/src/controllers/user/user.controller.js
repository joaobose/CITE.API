const bcrypt = require('bcrypt');
const BCRYPT_SALT_ROUNDS = 11;
const BaseController = require('../../../classes/src/BaseController');
const UserRepository = require('../../database/repositories/user.repository');
const Logger = require('../../../classes/Logger');
const Errors = require('../../errors');
const logger = new Logger();
const userRepository = new UserRepository();

class UserController extends BaseController {
  async index(req, res, validated) {
    //--------------------- getting users data ---------------------//
    let users = await userRepository.all();

    //------------------------ transforming ------------------------//
    users = users.map((user) => {
      let transformed = JSON.parse(JSON.stringify(user));
      delete transformed.password;
      return transformed;
    });

    //---------------------- sending response ----------------------//
    res.json({
      data: users
    });
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

    //------------------------ transforming ------------------------//
    user = JSON.parse(JSON.stringify(user));
    delete user.password;

    //---------------------- sending response ----------------------//
    res.json({
      data: user
    });
  }

  async store(req, res, validated) {
    //----------------------- creating user ------------------------//
    validated.password = await bcrypt.hash(
      validated.password,
      BCRYPT_SALT_ROUNDS
    );
    let user = await userRepository.create(validated);

    //---------------------- sending response ----------------------//
    res.status(201).json({
      data: {
        id: user.id,
        type: 'user',
        links: { self: '/user/' + user.id }
      }
    });
  }

  async update(req, res, validated) {
    //----------------------- updating user ------------------------//
    let affectedRows = await userRepository.update(validated.id, validated);

    //---------------------- sending response ----------------------//
    res.json({
      data: {
        id: validated.id,
        type: 'user',
        links: { self: '/user/' + validated.id }
      },
      meta: {
        affectedRows: affectedRows[0]
      }
    });
  }

  async destroy(req, res, validated) {
    //----------------------- deleting user ------------------------//
    let affectedRows = await userRepository.delete(validated.id);

    //---------------------- sending response ----------------------//
    res.json({
      meta: {
        affectedRows: affectedRows
      }
    });
  }
}

module.exports = UserController;
