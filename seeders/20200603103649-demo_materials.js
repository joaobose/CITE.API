'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('materials', [
      {
        code: 'Arduino-UNOR3',
        description: 'Arduino UNOR3 board',
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: 'R10K',
        description: '10K omh resistance',
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: 'HS2501',
        description: 'Ultrasonic sensor',
        available: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: 'mc9s08qe128',
        description: 'Fucking nightmare',
        available: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('materials', null, {});
  }
};
