const BaseTransform = require('fun.framework/classes/src/BaseTransform');

class OnlineWifiDeviceTransform extends BaseTransform {
  morph(device) {
    return {
      type: 'onlineWifiDevice',
      relationships: {
        device: { data: device }
      }
    };
  }
}

module.exports = OnlineWifiDeviceTransform;
