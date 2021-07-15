'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('projects', [
      {
        name: 'Shank',
        description: 'Maze solver robot',
        managerId: 1,
        startedAt: new Date('2017-11-11'),
        trelloBoard: null,
        driveFolder: null,
        status: 'inProgress',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sumo pontiff',
        description: 'Sumo battle robot',
        managerId: 3,
        startedAt: new Date('2019-01-21'),
        trelloBoard: null,
        driveFolder: null,
        status: 'inProgress',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('projects', null, {});
  }
};
