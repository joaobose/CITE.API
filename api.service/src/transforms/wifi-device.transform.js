const BaseTransform = require('fun.framework/classes/src/BaseTransform');
const UserTransform = require('./user.transform');

class WifiDeviceTransform extends BaseTransform {
  constructor() {
    super({ async: true });
    this.transforms = {
      user: new UserTransform()
    };
  }

  async morph(wifiDevice) {
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
          owner: { data: await this.transforms.user.item(wifiDevice.owner) }
        })
      }
    };
  }
}

module.exports = WifiDeviceTransform;
