const express = require('express');
const app = express();
const server = require('http').Server(app);
const formidableMiddleware = require('express-formidable');
const Logger = require('./logs/logger');
const fun = require('./functions/app.fun');

// ---------------------- parse args ----------------------- //
let args = fun.parseArgs(process);

// --------------------- parsing body ----------------------- //
app.use(formidableMiddleware());

// ------------------------ logger -------------------------- //
const logger = new Logger(args.name);

// --------------------- db connection ---------------------- //
require('./src/database/connection');
require('./src/database/bootstrap'); // WILL REMOVE LATER

// ------------------ starting the server ------------------- //
fun.start(server, args.name, args.port, logger);

// -------------------- testing export ----------------------- //
module.exports = server;
