'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('projectMaterial', [
      // SHANK
      {
        materialId: 1, // Arduino
        projectId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        materialId: 2, // R10K
        projectId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // SUMO
      {
        materialId: 1, // Arduino
        projectId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        materialId: 3, // HS2501
        projectId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        materialId: 4, // mc9s08qe128
        projectId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('projectMaterial', null, {});
  }
};
