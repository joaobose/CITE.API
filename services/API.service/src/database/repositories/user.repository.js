const BaseRepository = require('../../../classes/src/BaseRepository');
const User = require('../models/User');
const JWT = require('../models/JWT');

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
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
   * @returns {String} The name of the user role.
   */
  async role(id) {
    let instance = await this.model.findOne({
      where: { id: id },
      include: ['role'],
      attributes: { exclude: ['*'] }
    });
    return instance ? instance.role.name : null;
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
