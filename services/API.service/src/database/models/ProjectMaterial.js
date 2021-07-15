const Sequelize = require('sequelize');

let ProjectMaterial = global.sequelize.define(
  'ProjectMaterial',
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
  { tableName: 'projectMaterial' }
);

module.exports = ProjectMaterial;
