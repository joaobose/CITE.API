const BaseRepository = require('fun.framework/classes/src/BaseRepository');

const User = require('../models/User');
const JWT = require('../models/JWT');

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  /**
   * Gets an user instance with an arbitrary number of relationships
   *
   * @access     public
   * @memberof   UserRepository
   *
   * @param {Number} id The id of the user instance.
   *
   * @returns {User} An user instance.
   */
  async showWith(id, include) {
    let instance = await this.model.findOne({
      where: { id: id },
      include: include,
      attributes: { exclude: ['password'] }
    });
    return instance;
  }

  /**
   * Gets an User instance by email
   *
   * @access     public
   * @memberof   UserRepository
   *
   * @param {string} email The email of the user instance.
   *
   * @returns {User} An user instance.
   */
  async getByEmail(email) {
    let instance = await this.model.findOne({
      where: { email: email }
    });
    return instance;
  }

  /**
   * Gets all the projects associated with an user instance.
   *
   * @access     public
   * @memberof   UserRepository
   *
   * @param {Number} id The id of the user instance.
   *
   * @returns {[Project]} An array of projects.
   */
  async projects(id) {
    let instance = await this.model.findOne({
      where: { id: id },
      include: ['projects'],
      attributes: { exclude: ['*'] }
    });
    return instance ? instance.projects : null;
  }

  /**
   * Gets all the managedProjects associated with an user instance.
   *
   * @access     public
   * @memberof   UserRepository
   *
   * @param {Number} id The id of the user instance.
   *
   * @returns {[Project]} An array of projects.
   */
  async managedProjects(id) {
    let instance = await this.model.findOne({
      where: { id: id },
      include: ['managedProjects'],
      attributes: { exclude: ['*'] }
    });
    return instance ? instance.managedProjects : null;
  }

  /**
   * Gets the role name of an user instance.
   *
   * @access     public
   * @memberof   UserRepository
   *
   * @param {Number} id The id of the user instance.
   *
   * @returns {Role} The role of the user.
   */
  async role(id) {
    let instance = await this.model.findOne({
      where: { id: id },
      include: ['role'],
      attributes: { exclude: ['*'] }
    });
    return instance ? instance.role : null;
  }

  /**
   * Gets all the applicants associated with an user instance.
   *
   * @access     public
   * @memberof   UserRepository
   *
   * @param {Number} id The id of the user instance.
   *
   * @returns {[User]} An array of users
   */
  async applicants(id) {
    let instance = await this.model.findOne({
      where: { id: id },
      include: ['applicants'],
      attributes: { exclude: ['*'] }
    });
    return instance ? instance.applicants : null;
  }

  /**
   * Gets associated tutor of an user instance.
   *
   * @access     public
   * @memberof   UserRepository
   *
   * @param {Number} id The id of the user instance.
   *
   * @returns {User} An user instance.
   */
  async tutor(id) {
    let instance = await this.model.findOne({
      where: { id: id },
      include: ['tutor'],
      attributes: { exclude: ['*'] }
    });
    return instance ? instance.tutor : null;
  }

  /**
   * Gets all the wifiDevices associated with an user instance.
   *
   * @access     public
   * @memberof   UserRepository
   *
   * @param {Number} id The id of the user instance.
   *
   * @returns {[WifiDevice]} An array of wifiDevices
   */
  async wifiDevices(id) {
    let instance = await this.model.findOne({
      where: { id: id },
      include: ['wifiDevices'],
      attributes: { exclude: ['*'] }
    });
    return instance ? instance.wifiDevices : null;
  }

  /**
   * Gets the valid JWT an user instance.
   *
   * @access     public
   * @memberof   UserRepository
   *
   * @param {Number} id The id of the user instance.
   *
   * @returns {JWT} A JWT instance.
   */
  async validJWT(id) {
    let instance = await this.model.findOne({
      where: { id: id },
      include: {
        model: JWT,
        as: 'JWT',
        where: { valid: true },
        attributes: { include: ['secret'] }
      },
      attributes: { exclude: ['*'] }
    });

    if (instance) {
      return instance.JWT.length != 0 ? instance.JWT[0] : null;
    }
    return null;
  }
}

module.exports = UserRepository;
