const BaseController = require('fun.framework/classes/src/BaseController');
const Logger = require('fun.framework/classes/Logger');
const logger = new Logger();

const Errors = require('../errors');
const IOTService = require('../services/iot.service');

class GatewayController extends BaseController {
  /**
   * Example route to showcase service request chaining
   */
  async publicConnected(req, res, validated) {
    //---------------------- calling IOT request
    const iotService = new IOTService({ req, res });
    const data = await iotService.connected();

    //--------------------- sending response
    this.response(res).JSONAPI.data(data);
  }
}

module.exports = GatewayController;
