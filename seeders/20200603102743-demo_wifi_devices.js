'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('WIFI_devices', [
      {
        description: 'Joao MBP',
        owner_id: 1,
        MAC: '71-80-EC-B0-D1-5E',
        enabled: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: 'MSI GS66',
        owner_id: 5,
        MAC: '1F-7E-DC-A9-EE-5F',
        enabled: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: 'THpi PS4',
        owner_id: 1,
        MAC: '8F-7A-EF-A9-CC-5F',
        enabled: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: 'MSI GS66 but slower and fat',
        owner_id: 2,
        MAC: '1A-22-BB-9F-FF-00',
        enabled: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: 'Joao 200$ laptop',
        owner_id: 1,
        MAC: '17-08-CE-00-EE-21',
        enabled: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('WIFI_devices', null, {});
  }
};
