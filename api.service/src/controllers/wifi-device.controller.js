const BaseController = require('fun.framework/classes/src/BaseController');
const Logger = require('fun.framework/classes/Logger');
const logger = new Logger();

const WifiDeviceRepository = require('../repositories/wifi-device.repository');
const WifiDeviceTransform = require('../transforms/wifi-device.transform');

const Errors = require('../errors');

const wifiDeviceRepository = new WifiDeviceRepository();

class WifiDeviceController extends BaseController {
  constructor() {
    super();

    this.transforms = {
      wifiDevice: new WifiDeviceTransform()
    };
  }

  async index(req, res, validated) {
    //---------------------- getting wifi-devices data
    let wifiDevices = await wifiDeviceRepository.all();

    //---------------------- sending response
    this.response(res).JSONAPI.data(
      wifiDevices,
      this.transforms.wifiDevice.collection
    );
  }
}

module.exports = WifiDeviceController;
