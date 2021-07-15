const Sequelize = require('sequelize');

let ProjectMember = global.sequelize.define(
  'ProjectMember',
  {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },

    memberId: Sequelize.INTEGER(11),
    projectId: Sequelize.INTEGER(11)
  },
  { tableName: 'projectMember' }
);

module.exports = ProjectMember;
