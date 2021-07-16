const Sequelize = require('sequelize');
const Material = require('./Material');

class Project extends Sequelize.Model {}
Project.init(
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

    managerId: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },

    startedAt: Sequelize.DATE,

    trelloBoard: Sequelize.STRING(255),

    driveFolder: Sequelize.STRING(255),

    status: Sequelize.ENUM('queued', 'inProgress', 'cancelled', 'finished')
  },
  { sequelize, tableName: 'projects' }
);

//------------------------------------- Relationships

//---------- Project Material (n:m)

// usedBy
Material.belongsToMany(Project, {
  as: 'usedBy',
  through: 'projectMaterial',
  foreignKey: 'materialId',
  otherKey: 'projectId'
});

// materials
Project.belongsToMany(Material, {
  as: 'materials',
  through: 'projectMaterial',
  foreignKey: 'projectId',
  otherKey: 'materialId'
});

module.exports = Project;
