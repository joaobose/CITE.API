'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('projectMember', [
      // SHANk
      {
        memberId: 1, // Joao
        projectId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        memberId: 3, // Noya
        projectId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        memberId: 6, // Bose Diaz
        projectId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // SUMO
      {
        memberId: 1, // Joao
        projectId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        memberId: 2, // Ricardo
        projectId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        memberId: 3, // Noya - manager
        projectId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        memberId: 7, // Elon musk
        projectId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('projectMember', null, {});
  }
};
