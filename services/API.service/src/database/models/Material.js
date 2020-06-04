const Sequelize = require('sequelize');

let Material = global.sequelize.define(
  'Material',
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
  { tableName: 'materials' }
);

module.exports = Material;
