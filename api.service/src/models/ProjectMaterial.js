const Sequelize = require('sequelize');

class ProjectMaterial extends Sequelize.Model {}
ProjectMaterial.init(
  {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },

    materialId: Sequelize.INTEGER(11),
    projectId: Sequelize.INTEGER(11)
  },
  { sequelize, tableName: 'projectMaterial' }
);

module.exports = ProjectMaterial;
