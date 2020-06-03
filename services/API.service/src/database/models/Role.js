const Sequelize = require('sequelize');

let Role = global.sequelize.define(
  'Role',
  {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },

    name: {
      allowNull: false,
      type: Sequelize.STRING(255)
    }
  },
  { tableName: 'roles' }
);

module.exports = Role;
