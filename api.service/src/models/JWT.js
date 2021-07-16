const Sequelize = require('sequelize');

class JWT extends Sequelize.Model {}
JWT.init(
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
  { sequelize, tableName: 'JWT' }
);

module.exports = JWT;
