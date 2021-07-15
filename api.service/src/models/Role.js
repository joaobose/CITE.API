const Sequelize = require('sequelize');

class Role extends Sequelize.Model {}
Role.init(
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
  { sequelize, tableName: 'roles' }
);

module.exports = Role;
