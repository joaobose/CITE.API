const Sequelize = require('sequelize');

let WifiDevice = global.sequelize.define(
  'WifiDevice',
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

    owner: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },

    enabled: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  },
  { tableName: 'WIFI_devices' }
);

module.exports = Role;
