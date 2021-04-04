'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('roles', [
      {
        name: 'board',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'member',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'applicant',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('roles', null, {});
  }
};
