const Sequelize = require('sequelize');

class WifiDevice extends Sequelize.Model {}
WifiDevice.init(
  {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },

    description: {
      allowNull: false,
      type: Sequelize.STRING,
      validate: {
        notEmpty: true
      }
    },

    MAC: {
      allowNull: false,
      type: Sequelize.STRING,
      validate: {
        notEmpty: true
      }
    },

    ownerId: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },

    enabled: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  },
  { sequelize, tableName: 'WIFIDevices' }
);

module.exports = WifiDevice;
