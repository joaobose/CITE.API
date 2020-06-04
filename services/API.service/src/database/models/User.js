const Sequelize = require('sequelize');
const JWT = require('./JWT');
const WifiDevice = require('./WifiDevice');
const Project = require('./Project');
const Role = require('./Role');

let User = global.sequelize.define(
  'User',
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

    role: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },

    tutor: Sequelize.INTEGER(11)
  },
  { tableName: 'users' }
);

// --------------------- Relationships ---------------------- //

// ----------------------- JWT (1:m) ------------------------ //
User.hasMany(JWT, { as: 'JWT', foreignKey: 'owner' });
JWT.belongsTo(User, { as: 'owner', foreignKey: 'owner' });

// -------------------- WifiDevice (1:m) --------------------- //
User.hasMany(WifiDevice, { as: 'wifiDevices', foreignKey: 'owner' });
WifiDevice.belongsTo(User, { as: 'owner', foreignKey: 'owner' });

// ------------------ Project manager (1:m) ------------------ //
User.hasMany(Project, { as: 'managedProjects', foreignKey: 'manager' });
Project.belongsTo(User, { as: 'manager', foreignKey: 'manager' });

// ------------------------ Role (m:1) ----------------------- //
Role.hasMany(User, { as: 'users', foreignKey: 'role' });
User.belongsTo(Role, { as: 'role', foreignKey: 'role' });

// ----------------------- Tutor (m:1) ----------------------- //
User.hasMany(User, { as: 'applicants', foreignKey: 'tutor' });
User.belongsTo(User, { as: 'tutor', foreignKey: 'tutor' });

// ------------------- Project Member (n:m) ------------------ //

// projects
User.belongsToMany(Project, {
  as: 'projects',
  through: 'project_member',
  foreignKey: 'member_id',
  otherKey: 'project_id'
});

// members
Project.belongsToMany(User, {
  as: 'members',
  through: 'project_member',
  foreignKey: 'project_id',
  otherKey: 'member_id'
});

module.exports = User;
