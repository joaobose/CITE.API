const Sequelize = require('sequelize');
const JWT = require('./JWT');
const WifiDevice = require('./WifiDevice');
const Project = require('./Project');
const Role = require('./Role');

class User extends Sequelize.Model {}
User.init(
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

    lastname: {
      allowNull: false,
      type: Sequelize.STRING,
      validate: {
        notEmpty: true
      }
    },

    email: {
      allowNull: false,
      unique: true,
      type: Sequelize.STRING,
      validate: {
        isEmail: true
      }
    },

    password: {
      allowNull: false,
      type: Sequelize.STRING(255),
      validate: {
        notEmpty: true
      }
    },

    description: {
      type: Sequelize.STRING(255),
      defaultValue: 'Praise saint bad bunny'
    },

    photo: Sequelize.STRING(255),

    roleId: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },

    tutorId: Sequelize.INTEGER(11)
  },
  { sequelize, tableName: 'users' }
);

//------------------------------------- Relationships

//----------- JWT (1:m)
User.hasMany(JWT, { as: 'JWT', foreignKey: 'ownerId' });
JWT.belongsTo(User, { as: 'owner', foreignKey: 'ownerId' });

//----------- WifiDevice (1:m)
User.hasMany(WifiDevice, { as: 'wifiDevices', foreignKey: 'ownerId' });
WifiDevice.belongsTo(User, { as: 'owner', foreignKey: 'ownerId' });

//----------- Project manager (1:m)
User.hasMany(Project, { as: 'managedProjects', foreignKey: 'managerId' });
Project.belongsTo(User, { as: 'manager', foreignKey: 'managerId' });

//----------- Role (m:1)
Role.hasMany(User, { as: 'users', foreignKey: 'roleId' });
User.belongsTo(Role, { as: 'role', foreignKey: 'roleId' });

//----------- Tutor (m:1)
User.hasMany(User, { as: 'applicants', foreignKey: 'tutorId' });
User.belongsTo(User, { as: 'tutor', foreignKey: 'tutorId' });

//----------- Project Member (n:m)

// projects
User.belongsToMany(Project, {
  as: 'projects',
  through: 'projectMember',
  foreignKey: 'memberId',
  otherKey: 'projectId'
});

// members
Project.belongsToMany(User, {
  as: 'members',
  through: 'projectMember',
  foreignKey: 'projectId',
  otherKey: 'memberId'
});

module.exports = User;
