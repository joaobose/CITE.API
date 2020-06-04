const BaseRepository = require('../../../classes/BaseRepository');
const User = require('../models/User');

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  async projects(id) {}

  async managedProjects(id) {}

  async role(id) {}

  async applicants(id) {}

  async tutor(id) {}

  async wifiDevices(id) {}

  async showWithValidJWT(id) {}
}

module.exports = UserRepository;
