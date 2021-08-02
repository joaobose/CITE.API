const BaseService = require('fun.framework/classes/src/BaseService');
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/services.config.json')[env];

class IOTService extends BaseService {
  constructor({ req, res } = {}) {
    super('iot.service', config['iot.service'], { req, res });
  }

  async connected() {
    return (await this.get(`/onlineWifiDevices/connected`)).data.data;
  }

  async getHeaders() {
    return {
      'x-gateway-secret': config.authSecret
    };
  }
}

module.exports = IOTService;
