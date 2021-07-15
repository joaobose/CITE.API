# CITE.API

CITE.API is a RESTful API project that uses the lastest version of `fun.framework`.

## Project overview

CITE stands for _Centro de investigacion de tecnologia electronica_ (_Electronic Tecnology Investigation Center_). CITE is an investigation student aggrupation focused on electronics at _Simón Bolivar University, Venezuela._ This API was developed to assist the administration of CITE's laboratory at our University.

In CITE's lab there are 3 types of members. _Applicants_, _Regular members_ (_aka: Members_) and _Board members_.

Many projects are developed by CITE's. Each project has a list of _members_ that work on it, a _manager_ member and list of materials.

Aditionally, each member has a set of Wifi capable devices. One can know if a member is present in the lab by checking the Wifi router. This API also manage the _WifiDevices_ resource.

## ORM, Models, Migrations and Seeds

We are using sequelize as our _ORM_. All of our models use the sequelize standards. We also have _Migrations_ and _Seeds_.

We are using the repository pattern provided by `fun.framework` to interact with the database. It also worth noticing that `fun.framework` repositories assume your are using sequelize as _ORM_.

## Resources

The `User` resource is completly implemented in this API. You can explore this resource to know what `fun.framework` has to offer. The rest of the resources (such as `Material` and `Project`) are yet to be implemented.

We recommend you to start checking the workflow from the `User` router, you can find it at `/api.service/src/routes/user.routes.js`.

## Authentication and Auth router

This API uses _JWT Bearer token authentication schema_. We created an `Auth` router so that users can login with email and password. You can find the router at `/api.service/src/routes/auth.routes.js`.

The authentication middleware is located at `/api.service/src/middlewares/JWT.middleware.js`.

## Broadcaster

`fun.framework` offers a _Channel based socket.io broadcaster_. The broadcaster gets started in the `app.js` of a service.

```javascript
const io = require('socket.io')(server);
const Socket = require('fun.framework/classes/src/socket/Socket');
const ApplicationBroadcaster = require('./src/socket/broadcaster/broadcaster');
new Socket(io, new ApplicationBroadcaster(), null);
```

The `io` acts as a singleton between all socket related parts of the service. The `null` value on `new Socket(io, new ApplicationBroadcaster(), null);` is for a future coming `EventCatcher`.

Now we will explain how the broadcaster works and how to use it.

### Rules

The channels are controlled by `Rules`. A `Rule` is a _predicate_ that gets evaluated over a _body_. For example, let's look at the `role.rule.js` used in this API:

```javascript
const joi = require('joi');
const JWTFun = require('fun.framework/functions/general/JWT.fun');
const BaseRule = require('fun.framework/classes/src/BaseRule');

const UserRepository = require('../../../database/repositories/user.repository');
const userRepository = new UserRepository();

class RoleRule extends BaseRule {
  constructor(validatedRole) {
    super();
    this.validatedRole = validatedRole;
    this.name = `${this.validatedRole} role rule`;
  }

  async body(data) {
    const validator = joi.object().keys({
      authorization: joi.string().trim().required()
    });
    const body = {
      authorization: data.authorization
    };
    await joi.validate(body, validator);

    return body;
  }

  async predicate(body) {
    let schema = JWTFun.decodeBearerScheme(body.authorization);
    let userId = JWTFun.validateUserIdentifierFromSchema(schema);

    //-------------------- validate user role
    let role = await userRepository.role(userId);

    return !!role && role.name == this.validatedRole;
  }

  async debug() {
    return false;
  }
}

module.exports = RoleRule;
```

This rule gets an authorization from the body, finds the associated user and evaluates to `true` if the user's role is the same that the rule is validating.

The `body` method validates the structure of the given body. If an error gets thrown inside this method the rule evaluates as _rejected_.

The `predicate` method receives the validated body and returns a boolean. if the methods returns `false` or an error gets thrown the rule evaluates as _rejected_. Otherwise, the rule evaluates as _passed_.

### Channels

The broadcaster channels are defined in the `./src/socket/broadcaster/broadcaster`. Each channel has a name and an array of `Rules`.

Users can connect to the broadcaster by emitting the `subscribe-client` event via socket.io with an object as the body of the event.

When the server receives a `subscribe-client` from a given socket, for each channel defined in the `broadcaster`, the array or `Rules` gets evaluated one by one with the content of the `subscribe-client` as body. If all rules evaluate as _passed_, the socket is joined to the channel.

When a socket is joined to a channel, all events emmited to that channel will get sent to the socket.

Let's take a look to the `broadcaster` of `CITE.API`:

```javascript
const Broadcaster = require('fun.framework/classes/src/socket/Broadcaster');
const fun = require('fun.framework/functions/src/socket/broadcaster.fun');

const JWTRule = require('./rules/JWT.rule');
const RoleRule = require('./rules/role.rule');

class ApplicationBroadcaster extends Broadcaster {
  channels() {
    return [
      fun.channel('public'),
      fun.channel('board', [new JWTRule(), new RoleRule('board')]),
      fun.channel('member', [new JWTRule(), new RoleRule('member')]),
      fun.channel('applicant', [new JWTRule(), new RoleRule('applicant')])
    ];
  }
}

module.exports = ApplicationBroadcaster;
```

Let's say _Jhon Doe_ is an user with the role `board` on `CITE`. If _Jhon Doe_ emits the event `subscribe-client` with the data:

```json
{ "authorization": "Bearer <TOKEN>" }
```

And the given token is valid. _Jhon Doe_'s socket will get joined to the `public` and the `board` channels.

### Emmiting broadcasts

Once you have defined your channels, you can emmit events _(aka: broadcast)_ to those channels using the `ApplicationBroadcaster` class:

```javascript
const Broadcaster = require('./src/socket/broadcaster/broadcaster');
let broadcaster = new Broadcaster();

broadcaster.broadcast('public', 'reminder', {
  message: 'Windows sucks as OS!'
});
broadcaster.broadcast('board', 'reminder', {
  message: 'Using Windows is a bad example to our applicants!'
});
```

## Schedules

`fun.framework` also offers a _scheduler_. The scheduler allows you to program _schedules_ that will get executed automatically. A `Schedule` can have three non exclusive components: a _cronjob_, a _interval_ and a _timeout_.

The _cronjob_ component behaves exactly as a traditional cronjob, the main difference is that this _cronjob_ runs inside the server process. The _interval_ component behaves as a javascript `setInterval`. And the _timeout_ component behaves as a javascript `setTimeout`.

You can define what to execute in each component by declaring the `<component>Callback` method. If `<component>Callback` is defined on the `Schedule` class, then that conponent will be executed. For example, let's take a look to the following schedule:

```javascript
const BaseSchedule = require('fun.framework/classes/src/scheduler/BaseSchedule');
const Logger = require('fun.framework/classes/Logger');
const logger = new Logger();

class ExampleSchedule extends BaseSchedule {
  async cronCallback() {
    logger.debug('This behaves as a cronjob');
  }

  async intervalCallback() {
    logger.debug('This behavers as a javascript setInterval');
  }

  async timeoutCallback() {
    logger.debug('This behaves as a javascript setTimeout');
  }
}

module.exports = ExampleSchedule;
```

After you define your `Schedules`, you can _schedule_ them using the `scheduler` located at `./src/scheduler/scheduler.js`:

```javascript
const Scheduler = require('fun.framework/classes/src/scheduler/Scheduler');
const fun = require('fun.framework/functions/src/scheduler/scheduler.fun');

const MinuteSchedule = require('./schedules/minute.schedule');
const SecondsSchedule = require('./schedules/seconds.schedule');
const ExampleSchedule = require('./schedules/example.schedule');

class ApplicationScheduler extends Scheduler {
  schedules() {
    return [
      fun.schedule(ExampleSchedule, 'example', {
        timeout: 500,
        interval: 15000,
        cron: '*/50 * * * *'
      }),
      fun.schedule(MinuteSchedule, 'minuteCron', {
        cron: '*/1 * * * *'
      }),
      fun.schedule(SecondsSchedule, 'secondsCron', {
        cron: '30 * * * * *'
      })
    ];
  }
}

module.exports = ApplicationScheduler;
```

The `fun.schedule` function receives a `Schedule` class, the alias of the schedule, and the parameters of the schedule.

You have three posible parameters, `timeout`, `interval` and `cron`, each one defines how ofter _(or how early)_ the schedule components will execute.

If you definied the `<component>Callback` method you have to pass the `<component>` parameter when calling `fun.schedule`, otherwise the component will not execute.

In this projects, the scheduler gets started at the services `app.js`:

```javascript
const ApplicationScheduler = require('./src/scheduler/scheduler');
const appScheduler = new ApplicationScheduler();
if (args.listen) appScheduler.start();
```

You can do it whenever you want as long as you call the `start()` method.

## Running the project

### 0. Install node and npm

**ubuntu:**
follow this tutorial: https://computingforgeeks.com/how-to-install-nodejs-on-ubuntu-debian-linux-mint/

### 1. Install mysql

**ubuntu:**

```

sudo apt-get update
sudo apt install mysql-server
sudo mysql_secure_installation

```

Say yes to everything and set your password.

### 2. Create local mysql database and user

**ubuntu:**

```

sudo mysql -u root -p

```

then after the mysql shell opens run:

```

create database CITE_API_db;
create database CITE_API_db_test;
create user '<YOUR USER>'@'localhost' IDENTIFIED BY '<YOUR PASSWORD>';
grant all privileges on * . * to '<YOUR USER>'@'localhost';

```

then open `api.service/config/config.json` and replace:

```json
{
  "development": {
    "username": "<YOUR USER>",
    "password": "<YOUR PASSWORD>",
    "database": "CITE_API_db",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "logging": false,
    "timezone": "+00:00"
  },
  "test": {
    "username": "<YOUR USER>",
    "password": "<YOUR PASSWORD>",
    "database": "CITE_API_db_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "logging": false,
    "timezone": "+00:00"
  },
  "production": {
    "username": "<YOUR USER>",
    "password": "<YOUR PASSWORD>",
    "database": "CITE_API_db",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "logging": false,
    "timezone": "+00:00"
  }
}
```

_Remember that you must replace `<YOUR USER>` and `<YOUR PASSWORD>` with your user and password (can be anything you like)._

### 3. Install sequelize-cli

```
sudo npm install sequelize-cli -g
sudo npm install sequelize -g
sudo npm install mysql2 -g
```

### 4. Install servers dependencies

Run the following commands within each service:

```
npm install
```

### 5. Migrate and seed the database

Run the following within each service root:

```
npm run dev-db:reset
```

### 6. Start the servers

Run the following at the repo root:

```
node start
```

## Runing tests

Run the following within each service root:

```
npm run test
```
