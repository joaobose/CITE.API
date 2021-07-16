'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
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

      roleId: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },

      tutorId: Sequelize.INTEGER(11),

      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
