const Sequelize = require('sequelize');

class ProjectMember extends Sequelize.Model {}
ProjectMember.init(
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
  { sequelize, tableName: 'projectMember' }
);

module.exports = ProjectMember;
