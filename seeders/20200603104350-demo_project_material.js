'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('project_material', [
      // SHANK
      {
        material_id: 1, // Arduino
        project_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        material_id: 2, // R10K
        project_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // SUMO
      {
        material_id: 1, // Arduino
        project_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        material_id: 3, // HS2501
        project_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        material_id: 4, // mc9s08qe128
        project_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('project_material', null, {});
  }
};
