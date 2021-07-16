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

//------------------------ routes --------------------------//
const onlineWifiDeviceRouter = require('./src/routes/online-wifi-device.routes');
app.use('/onlineWifiDevices', onlineWifiDeviceRouter);

//------------------------- docs ---------------------------//
app.use('/docs', express.static(`${__dirname}/src/docs`));

//------------------------ public --------------------------//
app.use('/public/', express.static(`${__dirname}/src/public`));

//------------------ starting the server -------------------//
fun.start(server, args.name, args.port, logger, args.listen);

//-------------------- testing export ----------------------//
module.exports = app;
