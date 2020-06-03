'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('project_member', [
      // SHANk
      {
        member_id: 1, // Joao
        project_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        member_id: 3, // Noya
        project_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        member_id: 6, // Bose Diaz
        project_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // SUMO
      {
        member_id: 1, // Joao
        project_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        member_id: 2, // Ricardo
        project_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        member_id: 3, // Noya - manager
        project_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        member_id: 7, // Elon musk
        project_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('project_member', null, {});
  }
};
