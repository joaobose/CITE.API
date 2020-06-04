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

    member_id: Sequelize.INTEGER(11),
    project_id: Sequelize.INTEGER(11)
  },
  { tableName: 'project_member' }
);

module.exports = ProjectMember;
