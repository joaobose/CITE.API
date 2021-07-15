const R = require('ramda');
const find = require('local-devices');

const BaseController = require('fun.framework/classes/src/BaseController');
const Logger = require('fun.framework/classes/Logger');
const logger = new Logger();

const OnlineWifiDeviceTransform = require('../transforms/online-wifi-device.transform');

const Errors = require('../errors');

const APIService = require('../services/api.service');
const apiService = new APIService();

const BaseError = require('fun.framework/classes/src/BaseError');

class OnlineWifiDeviceController extends BaseController {
  constructor() {
    super();

    this.transforms = {
      onlineWifiDevice: new OnlineWifiDeviceTransform()
    };
  }

  /**
   * @api {get} /onlineWifiDevices/connected connected
   * @apiName connected
   * @apiGroup OnlineWifiDevice
   * @apiVersion 1.0.0
   * @apiDescription Get all the wifi devices that are currently connected to the lab's wifi network that belong to a registered lab's member
   *
   * @apiHeader {Header} Authorization JWT Bearer security token.
   * @apiHeader {Header} x-gateway-secret The secret attached at the Gateway API
   *
   * @apiSuccess {Array} data Returns an array of connected devices
   *
   */
  async connected(req, res, validated) {
    //---------------------- getting connected mac addresses
    let devices = await find();
    let macs = devices.map((d) => d.mac.toUpperCase().replace(/:/g, '-'));

    //---------------------- getting registered devices
    let registeredWifiDevices = await apiService
      .wifiDevices()
      .catch((reason) => {
        delete req.headers['x-gateway-secret'];
        let [error] = reason.response.data.errors;
        this.throw(req, res, new BaseError(error));
      });

    //---------------------- filtering to get connected devices
    let onlineWifiDevices = registeredWifiDevices.filter(
      (registered) =>
        macs.includes(registered.attributes.MAC) &&
        registered.attributes.enabled
    );

    //--------------------- sending response
    this.response(res).JSONAPI.data(
      onlineWifiDevices,
      this.transforms.onlineWifiDevice.collection
    );
  }
}

module.exports = OnlineWifiDeviceController;
