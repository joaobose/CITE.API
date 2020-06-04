const util = require('util');
const Logger = require('../../logs/logger');
const logger = new Logger();
const User = require('./models/User');
const WifiDevice = require('./models/WifiDevice');
const Project = require('./models/Project');
const Role = require('./models/Role');
const Material = require('./models/Material');
const BaseRepository = require('./repositories/base.repository');

let reposTest = async () => {
  logger.info('Bootstrap reposTest');

  // creating the repo
  let userRepository = new BaseRepository(User);

  // updating a user
  let update = await userRepository.update(2, {});
  logger.info(update);

  // showing the changes and testing show
  logger.info(
    util.inspect(
      JSON.parse(JSON.stringify(await userRepository.show(2))),
      false,
      null,
      true
    )
  );

  // creating a user
  let newUser = await userRepository.create({
    name: 'John',
    lastname: 'Doe',
    email: 'johndoe@gmail.com',
    role_id: 3,
    description: 'HEHEHE',
    photo: null,
    tutor_id: 1,
    password: '$2b$11$PO4Xp7lp2rRd8xtDqqtemeRTWftezNM8MZX60Fwkg9yYDmFbDAOGW'
  });
  logger.info(
    util.inspect(JSON.parse(JSON.stringify(newUser)), false, null, true)
  );

  // deleting a user
  let del = await userRepository.delete(4);
  logger.info(del);

  // showing all users
  let all = await userRepository.all();
  logger.info(util.inspect(JSON.parse(JSON.stringify(all)), false, null, true));
};

let ORMTest = async () => {
  logger.info('Bootstrap ORMTest');

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

// ORMTest();
reposTest();
