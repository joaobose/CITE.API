const Sequelize = require('sequelize');

let Project = global.sequelize.define(
  'Project',
  {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },

    name: {
      allowNull: false,
      type: Sequelize.STRING,
      validate: {
        notEmpty: true
      }
    },

    description: {
      allowNull: false,
      type: Sequelize.STRING,
      validate: {
        notEmpty: true
      }
    },

    manager: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },

    startedAt: Sequelize.DATE,

    trelloBoard: Sequelize.STRING(255),

    driveFolder: Sequelize.STRING(255),

    status: Sequelize.ENUM('queued', 'inProgress', 'cancelled', 'finished')
  },
  { tableName: 'projects' }
);

module.exports = Project;
