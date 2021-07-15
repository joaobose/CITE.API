'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('projects', {
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

      description: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notEmpty: true
        }
      },

      managerId: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },

      startedAt: Sequelize.DATE,

      trelloBoard: Sequelize.STRING(255),

      driveFolder: Sequelize.STRING(255),

      status: Sequelize.ENUM('queued', 'inProgress', 'cancelled', 'finished'),

      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('projects');
  }
};
