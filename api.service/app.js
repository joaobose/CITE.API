const express = require('express');
const app = express();
const server = require('http').Server(app);
const formidableMiddleware = require('express-formidable');
const loggingMiddleware = require('./src/middleware/logging.middleware');

const Logger = require('fun.framework/classes/Logger');
const fun = require('fun.framework/functions/app.fun');

//---------------------- parse args ------------------------//
let args = fun.parseArgs(process);

//--------------------- parsing body -----------------------//
app.use(formidableMiddleware());

//------------------------ logger --------------------------//
const logger = new Logger(args.name);

//----------------------- logging --------------------------//
app.use(loggingMiddleware);

//--------------------- db connection ----------------------//
require('./src/database/connection');

//------------------------ routes --------------------------//
const authRouter = require('./src/routes/auth.routes');
app.use('/api.service/auth', authRouter);
const userRouter = require('./src/routes/user.routes');
app.use('/api.service/user', userRouter);

//------------------------- docs ---------------------------//
app.use('/api.service/', express.static(`${__dirname}/src/docs`));

//------------------------ public --------------------------//
app.use('/api.service/public/', express.static(`${__dirname}/src/public`));

//------------------------ socket --------------------------//
const io = require('socket.io')(server);
const Socket = require('fun.framework/classes/src/socket/Socket');
const ApplicationBroadcaster = require('./src/socket/broadcaster/broadcaster');
new Socket(io, new ApplicationBroadcaster(), null);

//----------------------- Scheduler ------------------------//
const ApplicationScheduler = require('./src/scheduler/scheduler');
const appScheduler = new ApplicationScheduler();
if (args.listen) appScheduler.start();

//------------------ starting the server -------------------//
fun.start(server, args.name, args.port, logger, args.listen);

//-------------------- testing export ----------------------//
module.exports = app;
