const Sequelize = require('sequelize');

class Notification extends Sequelize.Model {}
Notification.init(
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
  { sequelize, tableName: 'notifications' }
);

module.exports = Notification;
