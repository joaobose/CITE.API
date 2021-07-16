const BaseRepository = require('fun.framework/classes/src/BaseRepository');

const User = require('../models/User');
const WifiDevice = require('../models/WifiDevice');

class WifiDeviceRepository extends BaseRepository {
  constructor() {
    super(WifiDevice);
  }

  async all() {
    return await this.model.findAll({
      include: ['owner']
    });
  }
}

module.exports = WifiDeviceRepository;
