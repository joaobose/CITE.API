const Sequelize = require('sequelize');

let User = global.sequelize.define(
  'User',
  {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },

    name: {
      allowNull: false,
      type: Sequelize.STRING,
      validate: {
        notEmpty: true
      }
    },

    lastname: {
      allowNull: false,
      type: Sequelize.STRING,
      validate: {
        notEmpty: true
      }
    },

    email: {
      allowNull: false,
      unique: true,
      type: Sequelize.STRING,
      validate: {
        isEmail: true
      }
    },

    password: {
      allowNull: false,
      type: Sequelize.STRING(255),
      validate: {
        notEmpty: true
      }
    },

    description: {
      type: Sequelize.STRING(255),
      defaultValue: 'Praise saint bad bunny'
    },

    photo: Sequelize.STRING(255),

    role: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },

    tutor: Sequelize.INTEGER(11)
  },
  { tableName: 'users' }
);

module.exports = User;
