const Sequelize = require('sequelize');

class Material extends Sequelize.Model {}
Material.init(
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

    code: {
      allowNull: false,
      type: Sequelize.STRING,
      validate: {
        notEmpty: true
      }
    },

    available: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  },
  { sequelize, tableName: 'materials' }
);

module.exports = Material;
