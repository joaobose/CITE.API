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

    material_id: Sequelize.INTEGER(11),
    project_id: Sequelize.INTEGER(11)
  },
  { tableName: 'project_material' }
);

module.exports = ProjectMaterial;
