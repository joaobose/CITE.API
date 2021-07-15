const BaseRepository = require('fun.framework/classes/src/BaseRepository');

const User = require('../models/User');
const JWT = require('../models/JWT');

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  async showWith(id, include) {
    return await this.model.findOne({
      where: { id: id },
      include: include,
      attributes: { exclude: ['password'] }
    });
  }

  async getByEmail(email) {
    return await this.model.findOne({
      where: { email: email }
    });
  }

  async projects(id) {
    let instance = await this.model.findOne({
      where: { id: id },
      include: ['projects'],
      attributes: { exclude: ['*'] }
    });
    return instance ? instance.projects : null;
  }

  async managedProjects(id) {
    let instance = await this.model.findOne({
      where: { id: id },
      include: ['managedProjects'],
      attributes: { exclude: ['*'] }
    });
    return instance ? instance.managedProjects : null;
  }

  async role(id) {
    let instance = await this.model.findOne({
      where: { id: id },
      include: ['role'],
      attributes: { exclude: ['*'] }
    });
    return instance ? instance.role : null;
  }

  async applicants(id) {
    let instance = await this.model.findOne({
      where: { id: id },
      include: ['applicants'],
      attributes: { exclude: ['*'] }
    });
    return instance ? instance.applicants : null;
  }

  async tutor(id) {
    let instance = await this.model.findOne({
      where: { id: id },
      include: ['tutor'],
      attributes: { exclude: ['*'] }
    });
    return instance ? instance.tutor : null;
  }

  async wifiDevices(id) {
    let instance = await this.model.findOne({
      where: { id: id },
      include: ['wifiDevices'],
      attributes: { exclude: ['*'] }
    });
    return instance ? instance.wifiDevices : null;
  }

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

    if (!!instance) {
      let [jwt] = instance.JWT;
      return jwt || null;
    } else return null;
  }
}

module.exports = UserRepository;
