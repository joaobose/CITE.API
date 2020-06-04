'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('JWT', {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },

      owner_id: {
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
      },

      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('JWT');
  }
};
