const express = require('express');
const app = express();
const server = require('http').Server(app);
const formidableMiddleware = require('express-formidable');
const loggingMiddleware = require('./src/middleware/logging.middleware');
const Logger = require('./classes/Logger');
const fun = require('./functions/app.fun');

// ---------------------- parse args ----------------------- //
let args = fun.parseArgs(process);

// --------------------- parsing body ----------------------- //
app.use(formidableMiddleware());

// ------------------------ logger -------------------------- //
const logger = new Logger(args.name);

// ----------------------- logging -------------------------- //
app.use(loggingMiddleware);

// --------------------- db connection ---------------------- //
require('./src/database/connection');

// ------------------------ routes -------------------------- //
const authRouter = require('./src/routes/auth.routes');
app.use('/auth', authRouter);
const userRouter = require('./src/routes/user.routes');
app.use('/user', userRouter);

// ------------------ starting the server ------------------- //
fun.start(server, args.name, args.port, logger);

// -------------------- testing export ----------------------- //
module.exports = server;
