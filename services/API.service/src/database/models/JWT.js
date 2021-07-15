const Sequelize = require('sequelize');

let JWT = global.sequelize.define(
  'JWT',
  {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },

    ownerId: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },

    secret: {
      allowNull: false,
      type: Sequelize.STRING(255)
    },

    valid: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  },
  { tableName: 'JWT' }
);

module.exports = JWT;
