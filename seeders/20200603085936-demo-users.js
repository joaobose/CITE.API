'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        name: 'Joao',
        lastname: 'Joao',
        email: 'joaobose@gmail.com',
        roleId: 1,
        description: 'Even a broken clock is right twice a day!',
        photo: null,
        tutorId: null,
        password:
          '$2b$11$PO4Xp7lp2rRd8xtDqqtemeRTWftezNM8MZX60Fwkg9yYDmFbDAOGW',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ricardo',
        lastname: 'Silva',
        email: 'ricardosc1997@gmail.com',
        roleId: 1,
        description: 'Hallo!',
        photo: null,
        tutorId: null,
        password:
          '$2b$11$PO4Xp7lp2rRd8xtDqqtemeRTWftezNM8MZX60Fwkg9yYDmFbDAOGW',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Gabriel',
        lastname: 'Noya',
        email: 'gabrielnoya95@gmail.com',
        roleId: 2,
        description: "there's no bad bussiness, just bad minds",
        photo: null,
        tutorId: null,
        password:
          '$2b$11$PO4Xp7lp2rRd8xtDqqtemeRTWftezNM8MZX60Fwkg9yYDmFbDAOGW',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Leonardo',
        lastname: 'Cabrera',
        email: 'leoclb2528@gmail.com',
        roleId: 2,
        description: "That's your opinion, HEH!",
        photo: null,
        tutorId: null,
        password:
          '$2b$11$PO4Xp7lp2rRd8xtDqqtemeRTWftezNM8MZX60Fwkg9yYDmFbDAOGW',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Juan Manuel',
        lastname: 'Nuñez',
        email: 'jumanuba@gmail.com',
        roleId: 2,
        description: 'Pon a cargar los controles del play, coño',
        photo: null,
        tutorId: null,
        password:
          '$2b$11$PO4Xp7lp2rRd8xtDqqtemeRTWftezNM8MZX60Fwkg9yYDmFbDAOGW',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bose',
        lastname: 'Diaz',
        email: 'joaodesing2301@gmail.com',
        roleId: 3,
        description: "Rip and Tear, until it's done!",
        photo: null,
        tutorId: 1,
        password:
          '$2b$11$PO4Xp7lp2rRd8xtDqqtemeRTWftezNM8MZX60Fwkg9yYDmFbDAOGW',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Elon',
        lastname: 'Musk',
        email: 'elonmusk@gmail.com',
        roleId: 3,
        description: 'Memelord and CEO',
        photo: null,
        tutorId: 1,
        password:
          '$2b$11$PO4Xp7lp2rRd8xtDqqtemeRTWftezNM8MZX60Fwkg9yYDmFbDAOGW',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Zion',
        lastname: 'Williamson',
        email: 'zionm@gmail.com',
        roleId: 3,
        description: 'Dunk!',
        photo: null,
        tutorId: 2,
        password:
          '$2b$11$PO4Xp7lp2rRd8xtDqqtemeRTWftezNM8MZX60Fwkg9yYDmFbDAOGW',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Stephen',
        lastname: 'Curry',
        email: 'stepcrr@gmail.com',
        roleId: 3,
        description: "I'm Steph",
        photo: null,
        tutorId: 2,
        password:
          '$2b$11$PO4Xp7lp2rRd8xtDqqtemeRTWftezNM8MZX60Fwkg9yYDmFbDAOGW',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
