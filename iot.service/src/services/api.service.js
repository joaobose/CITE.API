const BaseService = require('./base.service');
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/services.config.json')[env];

class APIService extends BaseService {
  url = config['api.service'];
  authHeader = config.authSecret;

  constructor() {
    super();
  }

  async wifiDevices() {
    const res = await this.get(`${this.url}/wifiDevices`, {
      headers: this.getHeaders()
    });
    return res.data.data;
  }

  getHeaders() {
    return {
      'x-gateway-secret': this.authHeader
    };
  }
}

module.exports = APIService;
