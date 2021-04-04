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

    role_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },

    tutor_id: Sequelize.INTEGER(11)
  },
  { tableName: 'users' }
);

// --------------------- Relationships ---------------------- //

// ----------------------- JWT (1:m) ------------------------ //
User.hasMany(JWT, { as: 'JWT', foreignKey: 'owner_id' });
JWT.belongsTo(User, { as: 'owner', foreignKey: 'owner_id' });

// -------------------- WifiDevice (1:m) --------------------- //
User.hasMany(WifiDevice, { as: 'wifiDevices', foreignKey: 'owner_id' });
WifiDevice.belongsTo(User, { as: 'owner', foreignKey: 'owner_id' });

// ------------------ Project manager (1:m) ------------------ //
User.hasMany(Project, { as: 'managedProjects', foreignKey: 'manager_id' });
Project.belongsTo(User, { as: 'manager', foreignKey: 'manager_id' });

// ------------------------ Role (m:1) ----------------------- //
Role.hasMany(User, { as: 'users', foreignKey: 'role_id' });
User.belongsTo(Role, { as: 'role', foreignKey: 'role_id' });

// ----------------------- Tutor (m:1) ----------------------- //
User.hasMany(User, { as: 'applicants', foreignKey: 'tutor_id' });
User.belongsTo(User, { as: 'tutor', foreignKey: 'tutor_id' });

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
