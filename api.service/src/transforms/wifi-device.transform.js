const BaseTransform = require('fun.framework/classes/src/BaseTransform');
const UserTransform = require('./user.transform');

class WifiDeviceTransform extends BaseTransform {
  constructor() {
    super();
    this.transforms = {
      user: new UserTransform()
    };
  }

  morph(wifiDevice) {
    return {
      id: wifiDevice.id,
      type: 'wifiDevice',
      attributes: {
        description: wifiDevice.description,
        MAC: wifiDevice.MAC,
        enabled: wifiDevice.enabled
      },
      relationships: {
        ...(wifiDevice.owner && {
          owner: { data: this.transforms.user.item(wifiDevice.owner) }
        })
      }
    };
  }
}

module.exports = WifiDeviceTransform;
