const util = require('util');
const Logger = require('../../logs/logger');
const logger = new Logger();
const User = require('./models/User');
const WifiDevice = require('./models/WifiDevice');
const Project = require('./models/Project');
const Role = require('./models/Role');
const Material = require('./models/Material');

let test = async () => {
  logger.info('Hey bootstrap');

  // ---------- get all users with it's releated entities ------------ //
  let users = await User.findAll({
    include: [
      'wifiDevices',
      'role',
      'managedProjects',
      'applicants',
      'tutor',
      'projects'
    ]
  });
  logger.info('logging users');
  logger.info(
    util.inspect(JSON.parse(JSON.stringify(users)), false, null, true)
  );

  // -------------- get wifiDevices with its owners ---------------- //
  let wifiDevices = await WifiDevice.findAll({
    include: ['owner']
  });

  logger.info('logging wifiDevices');
  logger.info(
    util.inspect(JSON.parse(JSON.stringify(wifiDevices)), false, null, true)
  );

  // ----------- get projects with its related entities ------------- //
  let projects = await Project.findAll({
    include: ['manager', 'members', 'materials']
  });

  logger.info('logging projects');
  logger.info(
    util.inspect(JSON.parse(JSON.stringify(projects)), false, null, true)
  );

  // -------------- get all materials and its usedBy --------------- //
  let materials = await Material.findAll({
    include: ['usedBy']
  });

  logger.info('logging materials');
  logger.info(
    util.inspect(JSON.parse(JSON.stringify(materials)), false, null, true)
  );

  // ----------------- get all roles and its users ----------------- //
  let roles = await Role.findAll({
    include: ['users']
  });

  logger.info('logging roles');
  logger.info(
    util.inspect(JSON.parse(JSON.stringify(roles)), false, null, true)
  );
};

test();
