const axios = require('axios');

class BaseService {
  async get(url, options) {
    return await axios.get(url, options);
  }
}

module.exports = BaseService;
