const Sequelize = require('sequelize');

let Notification = global.sequelize.define(
  'Notification',
  {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },

    // role-id for role based and global for global
    channel: {
      allowNull: false,
      type: Sequelize.STRING,
      validate: {
        notEmpty: true
      }
    },

    message: {
      allowNull: false,
      type: Sequelize.STRING,
      validate: {
        notEmpty: true
      }
    },

    localization: Sequelize.STRING
  },
  { tableName: 'notifications' }
);

module.exports = Notification;
