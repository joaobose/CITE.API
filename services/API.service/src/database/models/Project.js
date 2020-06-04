const Sequelize = require('sequelize');
const Material = require('./Material');

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

    manager_id: {
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

// ----------------------- Relationships ---------------------- //

// ------------------- Project Material (n:m) ------------------ //

// usedBy
Material.belongsToMany(Project, {
  as: 'usedBy',
  through: 'project_material',
  foreignKey: 'material_id',
  otherKey: 'project_id'
});

// materials
Project.belongsToMany(Material, {
  as: 'materials',
  through: 'project_material',
  foreignKey: 'project_id',
  otherKey: 'material_id'
});

module.exports = Project;
