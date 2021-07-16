'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('WIFIDevices', [
      {
        description: 'Joao MBP',
        ownerId: 1,
        MAC: '8C-85-90-38-79-65',
        enabled: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: 'Joao Samsung A50',
        ownerId: 1,
        MAC: '62-F2-E6-E6-AD-59',
        enabled: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: 'MSI GS66',
        ownerId: 5,
        MAC: '1F-7E-DC-A9-EE-5F',
        enabled: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: 'THpi PS4',
        ownerId: 1,
        MAC: '8F-7A-EF-A9-CC-5F',
        enabled: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: 'MSI GS66 but slower and fat',
        ownerId: 2,
        MAC: '1A-22-BB-9F-FF-00',
        enabled: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: 'Joao 200$ laptop',
        ownerId: 1,
        MAC: '17-08-CE-00-EE-21',
        enabled: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('WIFIDevices', null, {});
  }
};
